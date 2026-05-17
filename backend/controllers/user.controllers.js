import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
        let userId = req.userId;
        console.log("userId in currentuser controller :", userId);
        if (!userId || userId === "undefined") {
            return res.status(401).json({ message: "Unauthorized hai bhai " });
        }

        let user = await User
            .findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("Current User:", user);
        return res.status(200).json(user);
    } catch (error) {

    }
}

export const editProfile = async (req, res) => {
    try {
        const { name } = req.body;
        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path);
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (image) updateData.image = image;

        let user = await User.findByIdAndUpdate(req.userId, updateData, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in edit profile :", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        let users = await User.find({ _id: { $ne: req.userId } }).select("-password");
        console.log("Other users :", users);
        return res.status(200).json(users);
    } catch (error) {
        console.log("Error in get other users :", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}