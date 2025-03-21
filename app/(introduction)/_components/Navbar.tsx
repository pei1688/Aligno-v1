"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Navbar = () => {
  const { user } = useKindeBrowserClient();

  return (
    <nav className="flex h-[3rem] w-full items-center justify-between bg-aligno-600 px-8 shadow-lg md:px-16 ">
      <Link href="/" className="flex items-center gap-4 text-2xl">
        <Image src={"/logo.svg"} alt="logo" width={35} height={35} />
        <h1 className="font-semibold">ALIGNO</h1>
      </Link>
      {user ? (
        <Link href={"/workspace"}>
          <Button variant="transparent" className="bg-aligno-500">
            前往您的工作區
          </Button>
        </Link>
      ) : (
        <Button asChild variant="transparent">
          <LoginLink>登入</LoginLink>
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
