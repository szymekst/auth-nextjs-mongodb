import VerifyEmailForm from "@/components/authComponents/VerifyEmailForm";
import { sessionRedirect } from "@/lib/sessionRedirect";

const VerifyEmail = async () => {
    await sessionRedirect();
    return <VerifyEmailForm />;
};

export default VerifyEmail;
