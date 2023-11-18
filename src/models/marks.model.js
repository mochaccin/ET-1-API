import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    studentId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    tests: [
      {
        testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
        marksObtained: Number,
      },
    ],
  },
  { timestamps: true }
);
const marksModel = mongoose.model('Marks', marksSchema);

export default marksModel;