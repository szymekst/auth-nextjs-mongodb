"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema, ForgotPasswordData } from "@/utils/zodSchemas";
import AuthButton from "@/components/authComponents/AuthButton";
import SpinnerIcon from "@/assets/svg/SpinnerIcon.svg";
import ReturnButton from "@/components/authComponents/ReturnButton";
import { CiMail } from "react-icons/ci";

const ForgotPasswordForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<ForgotPasswordData>({
        resolver: zodResolver(ForgotPasswordSchema),
        shouldFocusError: false,
    });

    const rootErrorRef = useRef<HTMLDivElement | null>(null);

    const email = watch("email");

    const isDisabled = !email;

    useEffect(() => {
        if (errors.root) {
            rootErrorRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [errors.root]);

    const onSubmit = async (data: ForgotPasswordData) => {
        try {
            const res = await fetch("/api/auth/request-change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                }),
            });

            if (!res.ok) {
                const json = await res.json();
                setError("root", {
                    type: "server",
                    message: json.message || "Something went wrong!",
                });
            }
        } catch (error: any) {
            setError("root", {
                type: "manual",
                message:
                    error?.message ||
                    "Failed to connect to API. <br /> Contact the site administrator!",
            });
            return;
        }
    };

    return (
        <div className="container mx-auto flex min-h-dvh max-w-[400px] items-center px-5 py-8">
            {isSubmitSuccessful ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2">
                    <CiMail size={50} />
                    <h1 className="text-3xl text-black/90">Almost finished!</h1>
                    <p className="text-center text-sm">
                        We sent an email with request to reset your password.{" "}
                        <br /> Check {email} to reset your password!
                    </p>

                    <AuthButton content="Go to log in" href="/" />
                </div>
            ) : (
                <div className="flex flex-1 flex-col">
                    <ReturnButton />
                    <div className="mb-9">
                        <h1 className="text-3xl text-black/90">
                            Forgot Password?
                        </h1>
                        <p className="mt-3 text-black/70">
                            Don&#39;t worry! It happens to the best. Please
                            enter the email address assigned to your account
                        </p>
                    </div>

                    <form
                        className="mb-9 flex flex-col gap-[22px]"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="auth-label">
                            <label htmlFor="email">E-Mail</label>
                            <input
                                {...register("email")}
                                id="email"
                                type="text"
                                placeholder="Enter your email address"
                                className="auth-input"
                            />
                            {errors.email && (
                                <p className="text-red text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        {isSubmitting ? (
                            <div className="bg-green mt-4 cursor-not-allowed rounded-[10px] py-[12px] text-center font-semibold text-white">
                                <SpinnerIcon className="fill-gray inline h-8 w-8 animate-spin text-white" />
                            </div>
                        ) : (
                            <AuthButton
                                content="Send request"
                                isDisabled={isDisabled}
                            />
                        )}
                    </form>
                    <Link className="mb-9 text-center text-sm" href={"/"}>
                        Remember password?{" "}
                        <span className="text-green hover:text-green/90 font-semibold transition-all">
                            Log in
                        </span>
                    </Link>
                    {errors.root && (
                        <div
                            ref={rootErrorRef}
                            className="bg-red rounded-[10px] p-2 text-center text-sm text-white"
                            dangerouslySetInnerHTML={{
                                __html: errors.root?.message || "null",
                            }}
                        ></div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ForgotPasswordForm;
