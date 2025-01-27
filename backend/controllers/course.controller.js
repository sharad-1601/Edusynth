const Course = require("../models/courseModel")

exports.addCourse = async (req,res) =>{
  const {name, crn, description, picture} = req.body

  const existing_course = await Course.findOne({$or:[{crn},{name}]})

  if(existing_course) return res.status(409).json({message: "Course already exists!"})

  const course = new Course();
  course.name = name
  course.crn = crn
  course.description = description
  if(picture) course.picture = picture
  await course.save();
  
  res.status(201).json(course)
}