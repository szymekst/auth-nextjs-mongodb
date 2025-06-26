import React from "react";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";

const ReturnButton = () => {
    return (
        <Link
            href={"/"}
            className="mb-7 grid h-[39px] w-[39px] place-items-center rounded-[10px] border-[1px] border-gray-100 transition-all hover:bg-gray-100"
        >
            <FaAngleLeft />
        </Link>
    );
};

export default ReturnButton;
