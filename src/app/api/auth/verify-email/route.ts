import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/User";
import Token from "@/models/Token";

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json(
                { message: "Lack of Token" },
                { status: 400 }
            );
        }

        await connectMongoDB();

        const foundToken = await Token.findOne({
            token,
            type: "emailVerification",
        });

        if (!foundToken) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 400 }
            );
        }

        const user = await User.findById(foundToken.userId);

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        user.isActive = true;
        await user.save();

        await Token.deleteOne({ _id: foundToken._id });

        return NextResponse.json(
            { message: "Account activated" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
