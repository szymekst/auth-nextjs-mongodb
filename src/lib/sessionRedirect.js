import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const sessionRedirect = async (target = "/dashboard") => {
    const session = await getServerSession(authOptions);
    if (session) redirect(target);
};
