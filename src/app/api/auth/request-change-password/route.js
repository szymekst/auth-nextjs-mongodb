import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ForgotPasswordSchema } from "@/utils/zodSchemas";
import { Resend } from "resend";
import crypto from "crypto";

import User from "@/models/User";
import Token from "@/models/Token";

const resend = new Resend(process.env.RESEND_API_KEY);

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

        await resend.emails.send({
            from: "NoReply <noreply@noreply.pl>",
            to: email,
            subject: "Request to change password",
            html: `
                    <p>Click link to change password:</p>
                    <a href="${process.env.NEXTAUTH_URL}/change-password?token=${token}">
                    <button style="padding:10px 20px; background:#0070f3; color:white;">Potwierdź konto</button>
                    </a>
                    `,
        });

        return NextResponse.json({
            message: "E-Mail to reset password has been sent",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
