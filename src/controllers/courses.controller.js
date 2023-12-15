import courseModel from "../models/course.model.js";
import mongoose from "mongoose";
import userModel from "../models/user.model.js";

async function createCourse(request, response) {
  try {
    const { courseName, courseCode, teacherId } = request.body;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).send("Invalid teacher ID");
    }

    if (userModel.findById(teacherId).role !== "teacher") {
      return res.status(400).send("The user is not a teacher");
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
    const { courseCode, teacherId } = request.body;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).send("Invalid teacher ID");
    }

    if (userModel.findById(teacherId).role !== "teacher") {
      return res.status(400).send("The user is not a teacher");
    }

    await courseModel.deleteOne({ courseCode: courseCode });

    return response
      .status(200)
      .send({ message: "Course deleted successfully" });
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function addStudentToCourse(request, response) {
  try {
    const { courseId, studentId, teacherId } = request.params;

    const course = await courseModel.findById(courseId);

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).send("Invalid teacher ID");
    }

    if (userModel.findById(teacherId).role !== "teacher") {
      return res.status(400).send("The user is not a teacher");
    }

    if (!course) {
      return response.status(404).send("Course not found");
    }

    if (course.teacherId !== teacherId) {
      return res
        .status(400)
        .send("The teacher is not in charge of this course");
    }

    if (course.students.includes(studentId)) {
      return response
        .status(400)
        .send("Student already enrolled in this course");
    }

    course.students.push(studentId);
    await course.save();

    response.status(200).send("Student added to course successfully");
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function removeStudentFromCourse(request, response) {
  try {
    const { courseId, studentId, teacherId } = request.params;

    const course = await courseModel.findById(courseId);

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).send("Invalid teacher ID");
    }

    if (userModel.findById(teacherId).role !== "teacher") {
      return res.status(400).send("The user is not a teacher");
    }

    if (!course) {
      return response.status(404).send("Course not found");
    }

    if (course.teacherId !== teacherId) {
      return res
        .status(400)
        .send("The teacher is not in charge of this course");
    }

    const studentIndex = course.students.indexOf(studentId);
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
    const { studentId } = request.params;

    const courses = await courseModel.find({ students: studentId });

    if (courses.length === 0) {
      return res.status(404).send("No courses found for this student");
    }

    response.status(200).send({ courses });
  } catch (err) {
    response.status(500).send({ error });
  }
}

async function getTeacherCourses(request, response) {
  try {
    const { teacherId } = request.params;

    const courses = await courseModel.find({ teacherId: teacherId });

    if (courses.length === 0) {
      return res.status(404).send("No courses found for this teacher");
    }

    response.status(200).send({ courses });
  } catch (err) {
    response.status(500).send({ error });
  }
}

async function getStudentCourseAttendances(request, response) {
  try {
    const { courseId, studentId } = request.params;

    const course = await courseModel.findById(courseId);

    if (!course) {
      return response.status(404).send("Course not found");
    }

    if (!course.students.includes(studentId)) {
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
};
