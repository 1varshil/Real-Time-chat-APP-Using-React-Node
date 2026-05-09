import User from "../models/user.model.js";

export const getCurrentUser = async(req,res) => {
    try {
        let userId = req.userId;
        console.log("userId in currentuser controller :", userId);
        if(!userId || userId === "undefined"){
            return res.status(401).json({message: "Unauthorized hai bhai "});
        }

        let user = await User.findById(userId).select("-password");
        if(!user){ 
            return res.status(404).json({message: "User not found"});
        }
        console.log("Current User:", user);
        return res.status(200).json(user);
    } catch (error) {
        
    }
}