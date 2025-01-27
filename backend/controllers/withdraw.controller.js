const Enrollment = require("../models/enrollmentModel")
exports.courseWithdraw= async(req,res)=>{
  const {courseId} = req.body;
  userId = req.user._id
  
  await Enrollment.updateOne(
    {userId: userId, courseId: courseId, status: "enrolled" }, 
    {$set:{status:"withdrawal_pending"}}
  )
  res.status(202).json({message:"Request sent!"})
}

exports.listPendingWithdrawals=async(req,res)=>{
  const pending_withdrawals = await Enrollment.find({ status: "withdrawal_pending" })
  res.status(200).json(pending_withdrawals)
}

exports.courseDrop= async(req,res)=>{
  const {courseId, userId} = req.body;
  
  await Enrollment.updateOne(
    {userId: userId, courseId: courseId}, 
    {$set:{status:"dropped"}}
  )
  res.status(200).json({message:"Request approved!"})
}

exports.courseWithdrawDecline= async(req,res)=>{
  const {courseId, userId} = req.body;
  
  await Enrollment.updateOne(
    {userId: userId, courseId: courseId}, 
    {$set:{status:"enrolled"}}
  )
  res.status(200).json({message:"Request declined!"})
}

