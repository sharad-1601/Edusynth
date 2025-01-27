const mongoose = require ("mongoose")

const courseSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true
  },crn:{
    type: Number,
    required: true,
    unique: true
  },description:{
    type: String,
    required: true,
  },picture:{
    type: String
  }
})


const Course = mongoose.model("Course",courseSchema)
module.exports = Course;