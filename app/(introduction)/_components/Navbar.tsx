"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Navbar = () => {
  const { user } = useKindeBrowserClient();

  return (
    <nav className="flex h-[3rem] w-full items-center justify-between border-b border-gray-100 bg-white px-8 md:px-16">
      <Link href="/" className="flex items-center gap-3 text-xl">
        <Image src={"/logo.svg"} alt="logo" width={28} height={28} />
        <span className="font-semibold text-aligno-800">ALIGNO</span>
      </Link>
      {user ? (
        <Link href={"/workspace"}>
          <Button className="bg-aligno-800 text-white hover:bg-aligno-600 transition-colors">
            前往您的工作區
          </Button>
        </Link>
      ) : (
        <Button
          asChild
          variant="outline"
          className="border-aligno-600 text-aligno-700 hover:bg-gray-50 transition-colors"
        >
          <LoginLink>登入</LoginLink>
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
