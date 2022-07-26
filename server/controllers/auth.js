import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/auth";

export const register = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        // Fields Validation
        if (!name)
            return res
                .status(400)
                .json({ success: false, message: "Name is required" });
        if (!password || password.length < 8)
            return res.status(400).json({
                success: false,
                message: "Password is required and must be atleast 8 chars",
            });
        // Check if it is existing user
        const userExist = await User.findOne({ email });
        console.log("IS user EXIST ? ", userExist);
        if (userExist)
            return res
                .status(400)
                .json({ success: false, message: "Email is taken" });
        // Hash the password
        const hashedPassword = await hashPassword(password);
        // Now , create a user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        console.log(user);
        return res.json({ succes: true, message: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Error.Try Again..." });
    }
};
