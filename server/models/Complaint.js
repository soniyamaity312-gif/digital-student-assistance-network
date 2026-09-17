import mongoose from "mongoose";


// =====================================================
// REPLY SCHEMA
// =====================================================

const replySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  user_name: {
    type: String,
    required: true
  },

  user_role: {
    type: String,
    enum: ["student", "staff", "admin"],
    required: true
  },

  message: {
    type: String,
    required: true
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});


// =====================================================
// COMPLAINT SCHEMA
// =====================================================

const complaintSchema = new mongoose.Schema({

  // Student who created the complaint
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  student_name: {
    type: String,
    default: ""
  },


  // Department selected by student
  department_name: {
    type: String,
    required: true
  },

  department_id: {
    type: String,
    default: ""
  },


  // Complaint information
  subject: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },


  // Automatically detected / assigned priority
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },


  // Complaint status
  status: {
    type: String,
    enum: ["pending", "in_progress", "resolved"],
    default: "pending"
  },


  // Staff assigned by Admin
  assigned_staff_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  assigned_staff_name: {
    type: String,
    default: ""
  },


  // Conversation between Student / Staff / Admin
  replies: [replySchema],


  // Creation date
  created_at: {
    type: Date,
    default: Date.now
  }

});


// =====================================================
// JSON RESPONSE
// =====================================================

complaintSchema.set("toJSON", {
  virtuals: true,

  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    return ret;
  }
});


const Complaint = mongoose.model(
  "Complaint",
  complaintSchema
);

export default Complaint;