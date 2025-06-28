"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthButton from "@/components/authComponents/AuthButton";
import { IconContext } from "react-icons";
import { FaRegCheckCircle } from "react-icons/fa";
import SpinnerIcon from "@/assets/svg/SpinnerIcon.svg";

const VerifyEmailForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");

    const handleVerify = async () => {
        setIsLoading(true);
        const res = await fetch("/api/auth/verify-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });

        const data = await res.json();
        if (res.ok) {
            setMessage(data.message);
            setStatus("success");
        } else {
            setMessage(data.message);
            setStatus("error");
        }
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto flex min-h-dvh max-w-[400px] items-center px-5 py-8">
            {status === "success" ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2">
                    <IconContext.Provider value={{ className: "text-green" }}>
                        <FaRegCheckCircle size={50} />
                    </IconContext.Provider>
                    <h1 className="text-3xl text-black/90">
                        Account activated!
                    </h1>
                    <p className="text-center text-sm">
                        Now you can login to your account!
                    </p>
                    <AuthButton content="Go to log in" href="/" />
                </div>
            ) : (
                <div className="flex flex-1 flex-col">
                    <h1 className="mb-3.5 text-center text-3xl text-black/90">
                        One more step...
                    </h1>
                    <p className="mb-6 text-center text-black/70">
                        Press the button below to activate your account.
                    </p>
                    {isLoading ? (
                        <div className="bg-green mt-4 cursor-not-allowed rounded-[10px] py-[12px] text-center font-semibold text-white">
                            <SpinnerIcon className="fill-gray inline h-8 w-8 animate-spin text-white" />
                        </div>
                    ) : (
                        <AuthButton
                            content="Verify"
                            onClick={handleVerify}
                            isDisabled={isLoading}
                        />
                    )}
                    {status === "error" && (
                        <p className="bg-red mt-9 rounded-[10px] p-2 text-center text-sm text-white">
                            {message}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default VerifyEmailForm;
