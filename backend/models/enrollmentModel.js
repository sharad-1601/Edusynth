const mongoose = require ("mongoose")

const enrollmentSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course' 
  },userEmail:{
    type: String,
    ref:'User.email',
    required: true
  },courseCrn:{
    type:Number,
    ref:'Course.crn',
    required: true
  },status:{
    type:String,
    enum:["enrolled","withdrawal_pending","dropped"],
    default: "enrolled"
  }
});

const enrollment = mongoose.model("enrollments",enrollmentSchema)
module.exports = enrollment;