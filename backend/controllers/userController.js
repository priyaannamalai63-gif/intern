const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");



// SIGNUP API LOGIC
const signupUser = async (req, res) => {
  console.log("REQ BODY:", req.body);
  try{
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password,10);

  const user = new User({
    name,
    email,
    password:hashedPassword
  });
  await user.save();

 //status code 201=new resource created
  res.status(201).json({
    message:"signup successful"
  });
}catch (error) {
  //if dublicate value(11000)send status code 400(user send wrong input)
  if(error.code ===11000){
    return res.status(400).json({
      message:"email already exist"
    });
  }

  //500=internal server error
  res.status(500).json({
    message:"server error"
  });
}
};


// LOGIN API LOGIC
const loginUser = async (req, res) => {
  try{
  const { email, password } = req.body;

  const user = await User.findOne({ email });


//401=unauthorized
  if (!user) {
    return res.status(401).json({
      message:"invalid email or password"
    });
  }

//comparing password
const isMatch= await bcrypt.compare(password,user.password);

if(!isMatch){
  return res.status(401).json({
    message:"invalid email or password"
  });
}
const token = generateToken(user._id);

console.log("LOGIN REACHED, TOKEN:", token);
console.log("ABOUT TO CREATE SESSION");

const Session =require("../models/Session");
await Session.deleteMany({ userId: user._id});
await Session.create({
  userId:user._id,
  token:token
})



  //200 = request successfull
  res.status(200).json({
    message:"login successfull",
    token: token
  });
}catch(error){
  res.status(500).json({
    message:"server error"

  });
}

 
};



//verify API
const getProfile = (req,res) => {
  res.status(200).json({
    message:"you are authorized",
    userId: req.userId
  });
  };

module.exports = { signupUser, loginUser, getProfile };