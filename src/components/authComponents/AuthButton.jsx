import React from "react";
import Link from "next/link";

const AuthButton = ({ content, href = "", isDisabled = false, onClick }) => {
    const btnClasses =
        "w-full text-center bg-green enabled:hover:bg-green/90 mt-4 cursor-pointer rounded-[10px] py-[18px] font-semibold text-white transition-all disabled:cursor-not-allowed disabled:brightness-90";

    return href.length > 0 ? (
        <Link
            className={`${btnClasses} ${isDisabled ? "pointer-events-none" : ""}`}
            href={href}
        >
            {content}
        </Link>
    ) : (
        <button disabled={isDisabled} className={btnClasses} onClick={onClick}>
            {content}
        </button>
    );
};

export default AuthButton;
