import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            trim: true,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: [6, "Password must be atleast 6 chars"],
            maxLength: [64, "Password must be atleast 20 chars"],
        },
        picture: {
            type: String,
            default: "/avatar.png",
        },
        role: {
            type: [String],
            default: ["Subscriber"],
            enum: ["Subscriber", "Instructor", "Admin"],
        },
        stripe_account_id: "",
        stripe_seller: {},
        stripeSession: {},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);
