"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const VerifyEmail = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();
    const [status, setStatus] = useState("idle");

    const handleVerify = async () => {
        const res = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });

        if (res.ok) {
            setStatus("success");
            setTimeout(() => router.push("/"), 2000);
        } else {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-2xl font-semibold mb-4">
                Potwierdź swoje konto
            </h1>
            <button
                onClick={handleVerify}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
                Potwierdź konto
            </button>
            {status === "success" && (
                <p className="text-green-600 mt-4">
                    Konto aktywne! Przekierowanie...
                </p>
            )}
            {status === "error" && (
                <p className="text-red-600 mt-4">
                    Błąd tokenu lub konto już aktywne.
                </p>
            )}
        </div>
    );
};

export default VerifyEmail;
