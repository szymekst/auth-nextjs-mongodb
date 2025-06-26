import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ForgotPasswordSchema } from "@/utils/zodSchemas";
import crypto from "crypto";

import { sendEmail } from "@/lib/sendEmail";
import ChangePasswordEmail from "@/emails/changePasswordEmail";

import User from "@/models/User";
import Token from "@/models/Token";

export async function POST(req) {
    try {
        const { email } = await req.json();

        const parsed = ForgotPasswordSchema.safeParse({ email });
        if (!parsed.success) {
            return NextResponse.json(
                { message: "Data validation failed" },
                { status: 400 }
            );
        }

        await connectMongoDB();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                {
                    message: "E-Mail does not have an assigned account",
                },
                { status: 404 }
            );
        }

        const token = crypto.randomBytes(32).toString("hex");

        await Token.create({
            userId: user._id,
            email: user.email,
            token,
            type: "passwordReset",
        });

        await sendEmail({
            to: user.email,
            subject: `${process.env.EMAIL_FROM} - Request to change password`,
            emailToHtml: (
                <ChangePasswordEmail userName={user.name} token={token} />
            ),
        });

        return NextResponse.json({
            message: "E-Mail to reset password has been sent",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
