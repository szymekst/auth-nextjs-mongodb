import bcrypt from "bcryptjs";
import crypto from "crypto";
import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { RegisterSchema } from "@/utils/zodSchemas";

import { sendEmail } from "@/lib/sendEmail";
import VerifyAcountEmail from "@/emails/verifyAccountEmail";

import User from "@/models/User";
import Token from "@/models/Token";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const parsed = RegisterSchema.safeParse(body);
        if (!parsed.success) {
            const fieldErrors = parsed.error.flatten().fieldErrors;

            return NextResponse.json(
                { message: fieldErrors || "Something went wrong!" },
                { status: 400 }
            );
        }

        await connectMongoDB();

        const { name, email, password } = parsed.data;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (!existingUser.isActive) {
                await Token.deleteOne({
                    userId: existingUser._id,
                    type: "emailVerification",
                });
                await User.deleteMany({ _id: existingUser._id });
            } else {
                return NextResponse.json(
                    { message: "Email already in use." },
                    { status: 409 }
                );
            }
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            isActive: false,
        });

        const token = crypto.randomBytes(32).toString("hex");

        await Token.create({
            userId: newUser._id,
            email: newUser.email,
            token,
            type: "emailVerification",
        });

        await sendEmail({
            to: newUser.email,
            subject: `${process.env.EMAIL_FROM} - Verify your account!`,
            userName: newUser.name,
            token: token,
            template: "verifyAccount",
        });

        return NextResponse.json(
            { message: "User registered. Verify account to Log in." },
            { status: 201 }
        );
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return NextResponse.json(
            { message: "Unable to connect to the database!" },
            { status: 500 }
        );
    }
}
