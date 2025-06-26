import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "resend";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

import User from "@/src/models/users";
import Token from "@/models/Token";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
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

        await resend.emails.send({
            from: "NoReply <noreply@noreply.pl>",
            to: email,
            subject: "Verify Email!",
            html: `
                    <p>Click to verify:</p>
                    <a href="${process.env.NEXTAUTH_URL}/verify-email?token=${token}">
                    <button style="padding:10px 20px; background:#0070f3; color:white;">Potwierdź konto</button>
                    </a>
                    `,
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
