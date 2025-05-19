import mongoose from 'mongoose';

const AcquisitionSchema = new mongoose.Schema({
  acquirer: String,
  acquired: String,
  dealAmount: Number,
  dealDate: Date,
});

export default mongoose.models.Acquisition || mongoose.model("Acquisition", AcquisitionSchema);
