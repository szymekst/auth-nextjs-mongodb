"use client";
import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangePasswordSchema } from "@/utils/zodSchemas";
import Link from "next/link";
import ReturnButton from "@/components/authComponents/ReturnButton";
import AuthButton from "@/components/authComponents/AuthButton";
import SpinnerIcon from "@/assets/svg/SpinnerIcon.svg";
import { CiMail } from "react-icons/ci";

const ChangePasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
        resolver: zodResolver(ChangePasswordSchema),
        shouldFocusError: false,
    });

    const rootErrorRef = useRef(null);

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const isDisabled = !password || !confirmPassword;

    const onSubmit = async (data) => {
        try {
            const res = await fetch("/api/auth/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                }),
            });

            if (!res.ok) {
                const json = await res.json();
                setError("root", {
                    type: "server",
                    message: json.message || "Something went wrong!",
                });
            }
        } catch (error) {
            setError("root", {
                type: "manual",
                message:
                    res.error ||
                    "Failed to connect to API. <br /> Contact the site administrator!",
            });
            return;
        }
    };

    useEffect(() => {
        if (errors.root) {
            rootErrorRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [errors.root]);

    return (
        <div className="container mx-auto flex min-h-dvh max-w-[400px] items-center px-5 py-8">
            {isSubmitSuccessful ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2">
                    <CiMail size={50} />
                    <h1 className="text-3xl text-black/90">
                        Password changed!
                    </h1>
                    <p className="text-center text-sm">
                        Now you can log in with your new password.
                    </p>

                    <AuthButton content="Go to log in" href="/" />
                </div>
            ) : (
                <div className="flex flex-1 flex-col">
                    <ReturnButton />
                    <div className="mb-9">
                        <h1 className="text-3xl text-black/90">
                            Change password
                        </h1>
                        <p className="mt-3 text-black/70">
                            Please type something you’ll remember
                        </p>
                    </div>

                    <form
                        className="mb-9 flex flex-col gap-[22px]"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="auth-label">
                            <label htmlFor="password">
                                Create a new password
                            </label>
                            <input
                                {...register("password")}
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="auth-input"
                            />
                            {errors.password && (
                                <p className="text-red text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div className="auth-label">
                            <label htmlFor="confirmPassword">
                                Confirm password
                            </label>
                            <input
                                {...register("confirmPassword")}
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                className="auth-input"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red text-sm">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                        {isSubmitting ? (
                            <div className="bg-green mt-4 cursor-not-allowed rounded-[10px] py-[12px] text-center font-semibold text-white">
                                <SpinnerIcon className="fill-gray inline h-8 w-8 animate-spin text-white" />
                            </div>
                        ) : (
                            <AuthButton
                                content="Change"
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
                                __html: errors.root.message,
                            }}
                        ></div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChangePasswordForm;
