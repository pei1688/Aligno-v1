"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Navbar = () => {
  const { user } = useKindeBrowserClient()
  
  
  return (
    <nav className="h-[3rem] flex items-center w-full justify-between bg-aligno-800">
      <Link href="/" className="text-2xl flex items-center gap-4">
        <Image src={"/logo.svg"} alt="logo" width={35} height={35} />
        <h1 className="font-semibold">ALIGNO</h1>
      </Link>
      {user ? (
        <Link href={"/workspace"}>
          <Button variant="transparent">
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
