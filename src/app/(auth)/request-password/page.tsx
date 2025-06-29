import RequestPasswordForm from "@/components/authComponents/RequestPasswordForm";
import { sessionRedirect } from "@/lib/sessionRedirect";

const ForgotPassword = async () => {
    await sessionRedirect();
    return <RequestPasswordForm />;
};

export default ForgotPassword;
