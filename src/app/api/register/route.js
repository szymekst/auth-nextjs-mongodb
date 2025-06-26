import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "resend";
import { connectMongoDB } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/src/models/users";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 12);
        const token = crypto.randomBytes(32).toString("hex");

        await connectMongoDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "Email already in use." },
                { status: 409 } // conflict status
            );
        } else {
            await User.create({
                name,
                email,
                password: hashedPassword,
                emailVerificationToken: token,
            });

            await resend.emails.send({
                from: "Pettie <noreply@pettie.pl>",
                to: email,
                subject: "Pettie - Potwierdź swoje konto!",
                html: `
                    <p>Kliknij poniższy link, aby aktywować konto:</p>
                    <a href="${process.env.NEXTAUTH_URL}/verify?token=${token}">
                    <button style="padding:10px 20px; background:#0070f3; color:white;">Potwierdź konto</button>
                    </a>
                    `,
            });

            return NextResponse.json(
                { message: "User registered. Verify account to LogIn." },
                { status: 201 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}
