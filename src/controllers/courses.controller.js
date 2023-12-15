import courseModel from "../models/course.model.js";
import mongoose from "mongoose";
import userModel from "../models/user.model.js";

async function createCourse(request, response) {
  try {
    const { courseName, courseCode } = request.body;
    const teacherId = request.id;

    const { role } = await userModel.findById(teacherId).exec();
    if (role !== "teacher") {
      return response.status(400).send("The user is not a teacher");
    }

    const course = await courseModel.create({
      courseName: courseName,
      courseCode: courseCode,
      teacherId: new mongoose.Types.ObjectId(teacherId),
    });

    return response
      .status(200)
      .send(
        `The course ${course.courseName}, with code: ${courseCode} has been created successfully`
      );
  } catch (error) {
    response.status(500).send(error.message);
  }
}

async function deleteCourse(request, response) {
  try {
    const { courseCode } = request.params;
    const teacherId = request.id;

    const { role } = await userModel.findById(teacherId).exec();
    if (role !== "teacher") {
      return response.status(400).send("The user is not a teacher");
    }

    await courseModel.deleteOne({ courseCode: courseCode });

    return response
      .status(200)
      .send({ message: "Course deleted successfully" });
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function getStudentsFromCourse(request, response) {
  try {
    const { courseCode } = request.params;
    const teacherId = request.id;

    const { role } = await userModel.findById(teacherId).exec();
    if (role !== "teacher") {
      return response.status(400).send("The user is not a teacher");
    }

    const course = await courseModel.findOne({ courseCode: courseCode });

    if (!course) {
      return response.status(404).send("Course not found");
    }

    const students = await userModel.find({ _id: course.students });

    if (students.length === 0) {
      return response.status(404).send("No students found for this course");
    }

    response.status(200).send({ students });
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function addStudentToCourse(request, response) {
  try {
    const { courseCode, studentDni } = request.body;
    const teacherId = request.id;

    const course = await courseModel.findOne({ courseCode: courseCode });
    const { role } = await userModel.findById(teacherId).exec();
    const student = await userModel.findOne({ dni: studentDni }).exec();

    if (role !== "teacher") {
      return response.status(400).send("The user is not a teacher");
    }

    if (!course) {
      return response.status(404).send("Course not found");
    }

    if (course.students.includes(student._id)) {
      return response
        .status(400)
        .send("Student already enrolled in this course");
    }

    course.students.push(student._id);
    await course.save();

    response.status(200).send("Student added to course successfully");
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function removeStudentFromCourse(request, response) {
  try {
    const { courseCode, studentDni } = request.body;

    const course = await courseModel.findOne({ courseCode: courseCode });
    const teacherId = request.id;
    const student = await userModel.findOne({ dni: studentDni }).exec();

    const { role } = await userModel.findById(teacherId).exec();
    if (role !== "teacher") {
      return response.status(400).send("The user is not a teacher");
    }

    if (!course) {
      return response.status(404).send("Course not found");
    }

    const studentIndex = course.students.indexOf(student._id);
    if (studentIndex > -1) {
      course.students.splice(studentIndex, 1);
      await course.save();
      response.status(200).send("Student removed from course successfully");
    } else {
      response.status(404).send("Student not found in this course");
    }
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function getStudentCourses(request, response) {
  try {
    const studentId = request.id;

    const courses = await courseModel.find({ students: studentId });

    if (courses.length === 0) {
      return res.status(404).send("No courses found for this student");
    }

    response.status(200).send({ courses });
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
}

async function getTeacherCourses(request, response) {
  try {
    const teacherId = request.id;

    const courses = await courseModel.find({ teacherId: teacherId });

    if (courses.length === 0) {
      return res.status(404).send("No courses found for this teacher");
    }

    response.status(200).send({ courses });
  } catch (err) {
    response.status(500).send({ err });
  }
}

async function getStudentCourseAttendances(request, response) {
  try {
    const { courseCode } = request.params;

    const studentId = request.id;

    const course = await courseModel.findOne({ courseCode: courseCode });

    if (!course) {
      return response.status(404).send("Course not found");
    }

    if (
      !course.students.some((student) => student.toHexString.equals(studentId))
    ) {
      return response.status(404).send("Student not found in this course");
    }

    const attendances = course.courseAttendances.filter((attendance) =>
      attendance.studentsAttendances.has(studentId.toString())
    );

    let attendanceRecord = [];

    attendances.forEach((attendance) => {
      const isPresent = attendance.studentsAttendances.get(studentId.toString())
        ? 1
        : 0;
      attendanceRecord.push(isPresent);
    });

    response.status(200).send({ attendanceRecord });
  } catch (error) {
    response.status(500).send({ error });
  }
}

export {
  createCourse,
  deleteCourse,
  addStudentToCourse,
  removeStudentFromCourse,
  getStudentCourses,
  getTeacherCourses,
  getStudentCourseAttendances,
  getStudentsFromCourse,
};
