import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";

// Register User
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

// Login User
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(req.body);
        const user = await User.findOne({ email });
        if (!user)
            return res
                .status(400)
                .json({ succes: false, message: "No user found" });
        const match = await comparePassword(password, user.password);
        if (!match)
            return res
                .status(400)
                .json({ succes: false, message: "Password is incorrect" });
        // create jsonwebtoken
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        // exclude hashed password
        user.password = undefined;
        //send token by cookie
        res.cookie("token", token, { httpOnly: true });
        // send user
        res.json({ success: true, message: "User data", data: user });
    } catch (error) {
        console.log("Login error ", error);
        res.status(400).json({ succes: false, message: "Error.Try Again" });
    }
};

// Logout user

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ succes: true, message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
    }
};

// get current user
export const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.auth._id)
            .select("-password")
            .exec();
        console.log("User", user);
        return res.json({
            succes: true,
            ok: true,
            message: "Got User successfully",
        });
    } catch (error) {
        console.log(error);
    }
};
