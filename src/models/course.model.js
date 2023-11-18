import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: true,
      unique: true,
    },
    courseName: {
      type: String,
      required: true,
      unique: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }],
    courseTests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: false }],
  },
  { timestamps: true }
);
const courseModel = mongoose.model('Course', courseSchema);

export default courseModel;