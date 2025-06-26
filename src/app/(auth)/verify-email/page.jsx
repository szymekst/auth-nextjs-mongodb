import React from "react";
import VerifyEmailForm from "@/components/authComponents/VerifyEmailForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const VerifyEmail = async () => {
    const session = await getServerSession(authOptions);
    if (session) redirect("/dashboard");
    return <VerifyEmailForm />;
};

export default VerifyEmail;
