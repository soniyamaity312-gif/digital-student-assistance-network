import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user_name: { type: String, required: true },
  user_role: { type: String, enum: ['student', 'staff', 'admin'], required: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const complaintSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  student_name: { type: String, default: '' },
  department_name: { type: String, required: true },
  department_id: { type: String, default: '' },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['pending', 'in_progress', 'resolved'], default: 'pending' },
  replies: [replySchema],
  created_at: { type: Date, default: Date.now }
});

complaintSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    return ret;
  }
});

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
