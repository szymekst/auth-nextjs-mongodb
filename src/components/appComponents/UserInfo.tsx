"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserInfo = () => {
    const { data: session } = useSession();
    const router = useRouter();
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-8 bg-gray flex flex-col gap-2 my-6">
                <div>
                    Name:{" "}
                    <span className="font-bold">{session?.user?.name}</span>
                </div>
                <div>
                    E-mail:{" "}
                    <span className="font-bold">{session?.user?.email}</span>
                </div>
                <button
                    className="bg-red text-white font-bold px-6 py-2 mt-3 cursor-pointer"
                    onClick={async () => {
                        const data = await signOut({
                            redirect: false,
                            callbackUrl: "/",
                        });

                        router.push(data.url);
                    }}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default UserInfo;
