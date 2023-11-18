import courseModel from '../models/course.model.js';
import mongoose from 'mongoose';

async function createCourse(request, response) {
    try {
      const { courseName, courseCode, teacherId } = request.body;

        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            return res.status(400).send('Invalid teacher ID');
        }
    
        const course = await courseModel.create({
        courseName: courseName,
        courseCode: courseCode,
        teacherId: new mongoose.Types.ObjectId(teacherId),
        });
        
        return response.status(200).send({ course });
  
    } catch (error) {
      response.status(500).send(error.message);
    }
}

async function deleteCourse(request, response) {

    try {
      
      const courseCode = request.body.courseCode;
  
      await courseModel.deleteOne({ courseCode: courseCode })
    
      return response.status(200).send({ message: 'Course deleted' });
  
    } catch (error) {
      response.status(500).send({ error });
    }
  }

async function addStudentToCourse(request, response) {
    try {
        const { courseId, studentId } = request.params;
       
        const course = await courseModel.findById(courseId);

        if (!course) {
            return response.status(404).send('Course not found');
        }

        if (course.students.includes(studentId)) {
            return response.status(400).send('Student already enrolled in this course');
        }
        
        course.students.push(studentId);
        await course.save();

        response.status(200).send('Student added to course successfully');
    } catch (error) {
        response.status(500).send({ error });
    }

}

async function removeStudentFromCourse(request, response) {
    try {
        const { courseId, studentId } = request.params;

        const course = await courseModel.findById(courseId);

        if (!course) {
            return response.status(404).send('Course not found');
        }

        const studentIndex = course.students.indexOf(studentId);
        if (studentIndex > -1) {
            course.students.splice(studentIndex, 1);
            await course.save();
            response.status(200).send('Student removed from course successfully');
        } else {
            response.status(404).send('Student not found in this course');
        }

    } catch (error) {
        response.status(500).send({ error });
    }
}

async function getCoursesByStudentId(request, response) {
    try {
        const { studentId } = request.params;

        const courses = await courseModel.find({ students: studentId });
        
        if (courses.length === 0) {
            return res.status(404).send('No courses found for this student');
        }

        response.status(200).send({ courses });

    } catch (err) {
        response.status(500).send({ error });
    }
  }
export { createCourse, deleteCourse, addStudentToCourse, removeStudentFromCourse, getCoursesByStudentId }