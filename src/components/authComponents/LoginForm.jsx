"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/utils/zodSchemas";
import SpinnerIcon from "@/assets/svg/SpinnerIcon.svg";
import AuthButton from "../authComponents/AuthButton";
import ReturnButton from "./ReturnButton";

const LoginForm = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(LoginSchema) });

    const rootErrorRef = useRef(null);

    const email = watch("email");
    const password = watch("password");

    const isDisabled = !email || !password;

    useEffect(() => {
        if (errors.root) {
            rootErrorRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [errors.root]);
    const onSubmit = async (data) => {
        try {
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (res.error) {
                setError("root", {
                    type: "manual",
                    message: res.error || "Invalid Credentials!",
                });
                return;
            }

            router.push("/dashboard");
        } catch (error) {
            setError("root", {
                type: "manual",
                message:
                    res.error ||
                    "Something went wrong! <br /> Contact the site administrator!",
            });
            return;
        }
    };

    return (
        <div className="container mx-auto flex min-h-dvh max-w-[400px] items-center px-5 py-8">
            <div className="flex flex-1 flex-col">
                <ReturnButton />
                <h1 className="mb-9 text-3xl text-black/90">Log in</h1>
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
                    <div className="auth-label">
                        <label htmlFor="password">Password</label>
                        <input
                            {...register("password")}
                            id="password"
                            type="password"
                            className="auth-input"
                            placeholder="Enter your password"
                        />
                        <Link
                            href={"/request-password"}
                            className="self-end text-right"
                        >
                            Forgot password?
                        </Link>
                        {errors.password && (
                            <p className="text-red text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    {isSubmitting ? (
                        <div className="bg-green mt-4 cursor-not-allowed rounded-[10px] py-[12px] text-center font-semibold text-white">
                            <SpinnerIcon className="fill-gray inline h-8 w-8 animate-spin text-white" />
                        </div>
                    ) : (
                        <AuthButton content="Login" isDisabled={isDisabled} />
                    )}
                </form>
                <Link className="mb-9 text-center text-sm" href={"/register"}>
                    Don't have an account?{" "}
                    <span className="text-green hover:text-green/90 font-semibold transition-all">
                        Sign up
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
        </div>
    );
};

export default LoginForm;
