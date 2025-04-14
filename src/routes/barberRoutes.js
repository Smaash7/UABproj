import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Barber from "../models/Barber.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, async (req,res) => {

    try {
        const { title, caption, rating, image} = req.body;
        if (!title || !caption || !rating || !image) {
            return res.status(400).json({ message: "Please fill in all fields" });
            }
        
            //upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            const ImageUrl = uploadResponse.secure_url
            
            // save to the database
            const newBarber = new Barber({
                title,
                caption,
                rating,
                image: ImageUrl,
                user: req.user._id,   
            });

            await newBarber.save();
            res.status(201).json(newBarber)

    } catch (error) {
        console.log("Error crreating barber", error);
        res.status(500).json({ message: error.message });
        
    }
});

export default router;