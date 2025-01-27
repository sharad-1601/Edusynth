const mongoose = require ("mongoose")
const bcrypt = require ("bcrypt")

const userSchema = new mongoose.Schema({
  email:{
      type: String,
      unique: true,
      required: true,
  },password:{
      type:String,
      required: true,
  },first_name:{
      type:String,
      required: true,
  },last_name:{
      type:String,
      required: true,
  },dob:{
      type:String,
      required: true,
  },gender:{
      type:String,
      enum:["male","female"],
      required: true,
  },user_role:{
      type: String,
      enum: ["user","admin"],
      default: "user",
  }
})
userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 11)
  next()
})

userSchema.methods.matchPassword = async function(password){
  return bcrypt.compare(password,this.password)
}

const User = mongoose.model("User",userSchema)
module.exports = User;