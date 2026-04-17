"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Navbar = () => {
  const { user } = useKindeBrowserClient();

  return (
    <nav className="flex h-[3rem] w-full items-center justify-between px-8 md:px-16 bg-aligno-700">
      <Link href="/" className="flex items-center gap-3 text-xl">
        <Image src={"/logo.svg"} alt="logo" width={28} height={28} />
        <span className="font-semibold">ALIGNO</span>
      </Link>
      {user ? (
        <Link href={"/workspace"}>
          <Button className="bg-blue-600 text-white transition-colors hover:bg-blue-700">
            前往您的工作區
          </Button>
        </Link>
      ) : (
        <Button
          asChild
          variant="outline"
          className="border-blue-600 text-blue-600 transition-colors hover:bg-blue-100"
        >
          <LoginLink>登入</LoginLink>
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
