import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    date: { 
        type: Date, 
        required: true,
    },
    studentsPresent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);
const attendanceModel = mongoose.model('Attendance', attendanceSchema);

export default attendanceModel;