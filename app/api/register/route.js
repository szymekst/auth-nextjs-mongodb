import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "Email already in use." },
                { status: 409 } // conflict status
            );
        } else {
            await User.create({ name, email, password: hashedPassword });
            return NextResponse.json(
                { message: "User registered." },
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
