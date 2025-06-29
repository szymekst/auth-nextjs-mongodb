import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: "user" },
        isActive: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
