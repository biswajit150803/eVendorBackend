const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const Pin = require("../models/Pin");
const nodemailer=require("nodemailer");
//hawker
const register = async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const data1=await User.findOne({username:req.body.username})
    const data2=await User.findOne({email:req.body.email})
    if(!data1&&!data2){
    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      url: req.body.url,
      aadhar: req.body.aadhar,
      blocked: false,
    });
    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user._id);
    return;
  }
  else{
    res.status(400).json("already used");
    return;
  }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    //!user && res.status(400).json("Wrong username or password");
    if(!user){
      res.status(400).json("Wrong username or password");
      return;
    }
    if(user.blocked){
      res.status(400).json("You are blocked");
      return;
    }
    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if(!validPassword){
      res.status(400).json("Wrong username or password");
      return;
    }
    console.log(validPassword);
    //!validPassword && res.status(400).json("Wrong username or password");

    //send response
    res
      .status(200)
      .json({
        _id: user._id,
        username: user.username,
        url: user.url,
        blocked: user.blocked,
      });
  } catch (err) {
    res.status(500).json(err);
    console.log(res);
  }
};

const block = async (req, res) => {
  //api/users
  const orders = await User.updateOne(
    {
      username: req.body.username,
    },
    {
      blocked: true,
    },
    {
      upsert: true,
    }
  );
  const orders2 = await Pin.updateOne(
    {
      username: req.body.username,
    },
    {
      blocked: true,
    },
    {
      upsert: true,
    }
  );
  console.log(orders2);
};

const admin = async (req, res) => {
  User.find().then((foundNotes) => res.json(foundNotes));
};

const updateHawkername = async(req,res) => {
  let data=await User.findOne({username:req.body.newname});
  if(data){
    res.status(400);
  }else{
    User.updateOne(
      { username:req.body.HUser },
      {
        username:req.body.newname
      },
      function (err, raw) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          console.log(raw);
          res.status(200);
          res.send();
        }
      }
    );
  }
};
const updatepass =async(req,res) =>{
  const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong username or password");

    //validate password
    const validPassword = await bcrypt.compare(
      req.body.oldpassword,
      user.password
    );
    !validPassword && res.status(400).json("Wrong username or password");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newpassword, salt);
    
    User.updateOne(
      { username:req.body.username },
      {
        password: hashedPassword
      },
      function (err, raw) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          console.log("DOOOOONNEEEE");
          console.log(raw);
          res.status(200);
          res.send();
        }
      }
    );


}
const updateHawkerurl = async(req,res) => {
  
    User.updateOne(
      { username:req.body.HUser },
      {
        url:req.body.url
      },
      function (err, raw) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          console.log("DOOOOONNEEEE");
          console.log(raw);
          res.status(200);
          res.send();
        }
      }
    );
};


var setotp;
const mailer=async(req, res) => {
  const  emailed  = req.body.emailed; // Assuming you're expecting an "email" field in the request
  console.log(emailed)
  // Generate an OTP (you can use a library like `otp-generator`)
  const otp = Math.floor(100000 + Math.random() * 900000);
console.log(emailed,otp)
setotp=otp;
  // Send the OTP via email
  sendOTPViaEmail(emailed, otp);
  

  res.json({ message: "Email OTP sent successfully" });
};

// Function to send OTP via email
function sendOTPViaEmail(emailed, otp) {
  try{
  // Configure a Nodemailer transporter to send emails
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "arnabc857@gmail.com",
      pass: "dratvdvupxdmlpmb",
    },
  });

    // Email content and configuration (customize this based on your email service)
    const mailOptions = {
      from: "arnabc857@gmail.com",
      to: emailed,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
  catch(err)
  {
    console.log(err)
  }
}

const verifyOtp=async(req, res) => {
  const { getotp } = req.body; // Assuming you're expecting an "otp" field in the request

  // Retrieve the stored OTP associated with the user's email or phone number
  // Compare it with the OTP provided by the user
  // Implement your own verification logic here
  
  const storedOTP = setotp; // Replace with the actual stored OTP
  console.log("Set otp",setotp)
  console.log("get otp",getotp)
  console.log("stored otp",storedOTP)
  if (getotp == storedOTP) {
    res.json({ success: true, message: "OTP verified successfully" });
  } else {
    res.json({ success: false, message: "Invalid OTP" });
  }
}


module.exports = { register, login, block, admin,updatepass,updateHawkerurl,updateHawkername,mailer,verifyOtp };
