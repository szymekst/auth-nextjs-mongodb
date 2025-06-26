import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/utils/zodSchemas";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    const parsed = LoginSchema.safeParse(credentials);
                    if (!parsed.success) {
                        throw new Error("Data validation failed");
                    }

                    await connectMongoDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        throw new Error("Account does not exist");
                    }

                    if (!user.isActive) {
                        throw new Error(
                            "Account is not active. <br /> Sign up again to send a new verification email!"
                        );
                    }

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!passwordsMatch) {
                        throw new Error("Incorrect password");
                    }

                    return user;
                } catch (error) {
                    console.error("Error: ", error);
                    throw new Error(error.message);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
