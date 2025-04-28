import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });

  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

router.post("/register", async(req, res) => {
    console.log("Register route hit");
    try{
        const {email,username, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({ message: "All fields are required"});
        }

        if(username.length < 3){
            return res.status(400).json({ message: "Username should be at least 3 characters long"});
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Email format is invalid" });
          }

          if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters long" });
          }          
        
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists"});
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists"});
        }

        //get random avatar
        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

        const user = new User({
            email,
            username,
            password,
            profileImage
    
        });

        await user.save();

        const token = generateToken(user._id);

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                createdAt: user.createdAt
            }
        })

    } catch (error){
        console.log("Error in register route", error);
        res.status(500).json({ message: "Internal server error"});

    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "All fields are required" });

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Credentials not valid" });

        // Check if password is correct
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Credentials not valid" });


        const token = generateToken(user._id);
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                createdAt: user.createdAt
                }
                }
                );

    } catch (error) {
        console.log("Error in login route", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router;