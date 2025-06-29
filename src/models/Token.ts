import mongoose, { models, Schema } from "mongoose";

const tokenSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        email: { type: String, required: true },
        token: { type: String, unique: true, required: true },
        type: {
            type: String,
            enum: ["emailVerification", "passwordReset"],
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 60 * 30,
        },
    },
    { timestamps: false }
);

const Token = models.Token || mongoose.model("Token", tokenSchema);

export default Token;
