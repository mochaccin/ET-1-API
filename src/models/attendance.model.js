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
    studentsAttendances: {
      type: Map,
      of: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);
const attendanceModel = mongoose.model('Attendance', attendanceSchema);

export default attendanceModel;