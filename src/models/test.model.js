import mongoose from 'mongoose';

const testSchema = new mongoose.Schema(
  {
    testNumber: {
      type: Number,
      required: true,
    },
    testName: { 
        type: String, 
        required: true,
    },
    testWeightage: {
      type: Number,
      required: true
    },
  },
  { timestamps: true }
);
const testModel = mongoose.model('Test', testSchema);

export default testModel;