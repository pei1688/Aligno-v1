import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";

const Navbar = async () => {
  return (
    <nav className="h-[3rem] px-4 flex items-center w-full justify-between bg-aligno-800">
      <Link href="/" className="text-2xl flex items-center gap-4">
        <Image src={"/logo.svg"} alt="logo" width={35} height={35} />
        <h1 className="font-semibold">ALIGNO</h1>
      </Link>

      <Button asChild variant="transparent">
        <LoginLink>登入</LoginLink>
      </Button>
    </nav>
  );
};

export default Navbar;
