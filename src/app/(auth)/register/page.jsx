import React from "react";
import RegisterForm from "@/components/authComponents/RegisterForm";
import { sessionRedirect } from "@/lib/sessionRedirect";

const Register = async () => {
    await sessionRedirect();
    return <RegisterForm />;
};

export default Register;
