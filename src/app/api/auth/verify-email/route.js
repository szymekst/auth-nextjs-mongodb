import { connectMongoDB } from "@/src/lib/mongodb";
import User from "@/src/models/users";

export async function POST(req) {
    const body = await req.json();
    const { token } = body;

    if (!token) {
        return new Response(JSON.stringify({ error: "Brak tokenu" }), {
            status: 400,
        });
    }

    await connectMongoDB();

    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
        return new Response(JSON.stringify({ error: "Nieprawidłowy token" }), {
            status: 400,
        });
    }

    user.isActive = true;
    user.emailVerificationToken = undefined;
    await user.save();

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
    });
}
