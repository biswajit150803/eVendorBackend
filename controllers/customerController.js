const User = require("../models/userSchema");
const router = require("express").Router();
const bcrypt = require("bcrypt");

const createCustomer=async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      //save user and respond
      const user = await newUser.save();
      res.status(200).json(user._id);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

const loginCustomer= async (req, res) => {
    try {
      //find user
      const username=req.body.username;
      const password=req.body.password;
      const user = await User.findOne({ username: username });
      console.log(user);
      if (user==null){
          res.status(400).json("Wrong username or password");
      }
      else{
      //validate password
      const validPassword = await bcrypt.compare(
        password,
        user.password
      );
      if(!validPassword){
        res.status(400).json("Wrong username or password");
        return;
      }
      //!validPassword && res.status(400).json("Wrong username or password");
  
      //send response
      res.status(200).json({ _id: user._id, username: user.username });
      }
    } catch (err) {
      res.status(500).json(err);
      console.log(res)
    }
  };
  const updateCustomername = async(req,res) => {
    let data=await User.findOne({username:req.body.newname});
    if(data){
      res.status(400);
    }else{
      User.updateOne(
        { username:req.body.CUser },
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


module.exports={createCustomer,loginCustomer,updateCustomername,updatepass};