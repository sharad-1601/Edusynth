const { json } = require("express")
const User = require("../models/userModel")
const jwt = require ("jsonwebtoken")

exports.register = async (req,res)=>{
  const {email, password, first_name, last_name, dob, gender, user_role} = req.body

  const existing_user = await User.findOne({email})
  
  if(existing_user) return res.status(409).json({message: "Email already exists!"})

  // const user = await User.create((email, password, first_name, last_name, dob, gender, user_role))
  
  const user = new User();

  user.email = email;
  user.password = password;
  user.first_name = first_name;
  user.last_name = last_name;
  user.dob = dob;
  user.gender = gender;
  if (user_role) user.user_role = user_role;
  await user.save();

  const { password: hashedPassword, ...newUser } = user.toJSON()
  res.status(201).json(newUser);
}


exports.login = async (req, res)=>{
  const {email, password} = req.body;
  const user = await User.findOne({email});

  if(!user) return res.status(404).json({message: "Invalid Credentials"})

  const is_matched = user.matchPassword(password);
  if(!is_matched) return res.status(404).json({message: "Invalid Credentials"})


  user.password= undefined
  const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.SECRET_KEY);  

  res.json({token})
}