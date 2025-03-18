"use client";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { motion } from "motion/react";
const Heading = () => {
  return (
    <header className="px-4 py-10 lg:py-20 text-left sm:px-6 md:px-8">
      <div className="relative inline-block mb-8">
        <h1 className="relative font-medium leading-[1.4] text-5xl">
          隨時隨地管理、整理並完成
          <span className="relative inline-block">
            您的任務
            <svg
              width="200"
              height="12"
              viewBox="0 0 263 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 sm:left-[55%] lg:left-[60%]"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
                d="M1 8.99999C62 4.33332 199.6 -2.20001 262 8.99999"
                stroke="#e47f45"
                strokeWidth="5"
              />
            </svg>
          </span>
        </h1>
      </div>
      <h2 className="text-lg sm:text-xl">
        讓工作井然有序，透過 Aligno 提升效率，告別混亂！
      </h2>

      <Button
        variant="transparent"
        className="mt-6 flex w-full justify-center rounded-sm bg-blue-500 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600 hover:shadow-lg md:w-auto md:justify-start"
      >
        <LoginLink>開始免費試用</LoginLink>
      </Button>
    </header>
  );
};

export default Heading;
