const User = require("../models/User.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


//register controller
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Each Field required",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "User Already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",  //https
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      message: "User Registered Successfully",
      data: { id: newUser._id, name: newUser.name, email: newUser.email ,token},
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//login controller
const login = async (req,res)=>{
  const {email,password}=req.body;  
      try {
        const newUser = await User.findOne({email}).select('-password');
         const hashPassword = await bcrypt.compare(password,newUser.password)
        if(!newUser || !hashPassword){
          return res.status(401).json({
            message:"Invalid Credentials"
          })
        }
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.status(200).json({
      message:"login Successfully",
      data:{token,...newUser}
    })
      } catch (error) {
        res.status(500).json({
          message:"Server Error .!Something went wrong",
          error:error.message
        })
      }
}

module.exports = {register,login};
