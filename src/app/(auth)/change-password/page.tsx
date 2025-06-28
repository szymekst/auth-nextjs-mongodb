import ChangePasswordForm from "@/components/authComponents/ChangePasswordForm";
import { sessionRedirect } from "@/lib/sessionRedirect";

const ChangePassword = async () => {
    await sessionRedirect();
    return <ChangePasswordForm />;
};

export default ChangePassword;
