"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterData } from "@/utils/zodSchemas";

import { CiMail } from "react-icons/ci";
import SpinnerIcon from "@/assets/svg/SpinnerIcon.svg";
import AuthButton from "./AuthButton";
import ReturnButton from "./ReturnButton";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<RegisterData>({
        resolver: zodResolver(RegisterSchema),
        shouldFocusError: false,
    });

    const rootErrorRef = useRef<HTMLDivElement | null>(null);

    const name = watch("name");
    const email = watch("email") || "example@gmail.com";
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const isDisabled = !name || !email || !password || !confirmPassword;

    useEffect(() => {
        if (errors.root) {
            rootErrorRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [errors.root]);

    const onSubmit = async (data: RegisterData) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                }),
            });

            if (!res.ok) {
                const json = await res.json();

                if (typeof json.message === "object") {
                    const fieldErrors = json.message;
                    Object.entries(fieldErrors).forEach(([field, messages]) => {
                        setError(field as keyof RegisterData, {
                            type: "server",
                            message: (messages as string[])[0],
                        });
                    });
                } else {
                    setError("root", {
                        type: "server",
                        message: json.message || "Something went wrong!",
                    });
                }
            }
        } catch (error) {
            setError("root", {
                type: "manual",
                message:
                    "Failed to connect to API. <br /> Contact the site administrator!",
            });
        }
    };

    return (
        <div className="container mx-auto flex min-h-dvh max-w-[400px] items-center px-5 py-12">
            {isSubmitSuccessful ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2">
                    <CiMail size={50} />
                    <h1 className="text-3xl text-black/90">Almost finished!</h1>
                    <p className="text-center text-sm">
                        We sent an email with a verification link. <br /> Check{" "}
                        {email} to complete registration!
                    </p>

                    <AuthButton content="Go to log in" href="/" />
                </div>
            ) : (
                <div className="flex flex-1 flex-col">
                    <ReturnButton />
                    <h1 className="mb-9 text-3xl text-black/90">Sign Up</h1>
                    <form
                        className="mb-9 flex flex-col gap-[22px]"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="auth-label">
                            <label htmlFor="name">Name</label>
                            <input
                                className={`auth-input ${errors.name ? "border-red placeholder-red" : ""}`}
                                {...register("name")}
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                            />
                            {errors.name && (
                                <p className="text-red text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="auth-label">
                            <label htmlFor="email" className="text-sm">
                                E-Mail
                            </label>
                            <input
                                className={`auth-input ${errors.email ? "border-red placeholder-red" : ""}`}
                                {...register("email")}
                                id="email"
                                type="text"
                                placeholder="Enter your email address"
                            />
                            {errors.email && (
                                <p className="text-red text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="auth-label">
                            <label htmlFor="password">Create a password</label>
                            <input
                                className={`auth-input ${errors.password ? "border-red placeholder-red" : ""}`}
                                {...register("password")}
                                id="password"
                                type="password"
                                placeholder="Enter your password"
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
                                className={`auth-input ${errors.confirmPassword ? "border-red placeholder-red" : ""}`}
                                {...register("confirmPassword")}
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
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
                                content={"Register"}
                                isDisabled={isDisabled}
                            />
                        )}
                    </form>
                    <Link className="mb-9 text-center text-sm" href={"/"}>
                        Already have an account?{" "}
                        <span className="text-green hover:text-green/90 font-semibold transition-all">
                            Log in
                        </span>
                    </Link>

                    {errors.root && (
                        <div
                            ref={rootErrorRef}
                            className="bg-red rounded-[10px] p-2 text-center text-sm text-white"
                            dangerouslySetInnerHTML={{
                                __html: errors.root?.message || "",
                            }}
                        ></div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RegisterForm;
