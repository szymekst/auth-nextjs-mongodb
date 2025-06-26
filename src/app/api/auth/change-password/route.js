import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ChangePasswordSchema } from "@/utils/zodSchemas";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import Token from "@/models/Token";

export async function POST(req) {
    try {
        const { token, password, confirmPassword } = await req.json();

        if (!token) {
            return NextResponse.json(
                { message: "Missing token" },
                { status: 400 }
            );
        }

        if (!password) {
            return NextResponse.json(
                { message: "Missing password" },
                { status: 400 }
            );
        }

        const parsed = ChangePasswordSchema.safeParse({
            password,
            confirmPassword,
        });
        if (!parsed.success) {
            return NextResponse.json(
                { message: "Data validation failed" },
                { status: 400 }
            );
        }

        await connectMongoDB();

        const foundToken = await Token.findOne({
            token,
            type: "passwordReset",
        });

        if (!foundToken) {
            return NextResponse.json(
                { message: "Invalid or expired token" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await User.findByIdAndUpdate(foundToken.userId, {
            password: hashedPassword,
        });

        await Token.deleteOne({
            _id: foundToken._id,
            type: "passwordReset",
        });

        return NextResponse.json(
            { message: "Password has been changed, you can log in" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
