import RequestPasswordForm from "@/components/authComponents/RequestPasswordForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ForgotPassword = async () => {
    const session = await getServerSession(authOptions);
    if (session) redirect("/dashboard");
    return <RequestPasswordForm />;
};

export default ForgotPassword;
