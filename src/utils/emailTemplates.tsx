import ChangePasswordEmail from "@/emails/changePasswordEmail";
import VerifyAcountEmail from "@/emails/verifyAccountEmail";

const emailTemplates = {
    changePassword: ChangePasswordEmail,
    verifyAccount: VerifyAcountEmail,
};

export default emailTemplates;
