"use client";

import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
interface AuthButtonProps {
  isLoggedIn: boolean;
}

export const AuthButton = ({ isLoggedIn }: AuthButtonProps) => {
  return (
    <Button
      variant="transparent"
      className="mt-6 bg-blue-600 text-white hover:bg-blue-700"
    >
      {isLoggedIn ? (
        <Link href="/workspace">前往您的看板</Link>
      ) : (
        <LoginLink authUrlParams={{ post_login_redirect_url: "/workspace" }}>
          開始免費試用
        </LoginLink>
      )}
    </Button>
  );
};

export default AuthButton;
