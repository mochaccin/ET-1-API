import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    courseTests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }],
  },
  { timestamps: true }
);
const courseModel = mongoose.model('Course', courseSchema);

export default courseModel;