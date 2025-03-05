import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOut } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

interface UserProps {
  id: string;
  given_name: string | null;
  family_name: string | null;
  picture?: string | null;
  email: string | null;
}

const UserProfile = ({ user }: { user: UserProps }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            src={user?.picture || "/default-avatar.png"}
            alt="@shadcn"
          />
          <AvatarFallback>{user.given_name}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end" className="py-6 text-aligno-300">
        <h2 className="my-4 px-1 text-xs">帳號</h2>
        <div className="flex gap-x-4 px-1">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={user?.picture || "/default-avatar.png"}
              alt="@shadcn"
              className="h-full w-full object-cover"
            />
            <AvatarFallback>{user.given_name}</AvatarFallback>
          </Avatar>
          <p className="flex flex-col items-start gap-y-2">
            <span>
              {user.family_name} {user.given_name}
            </span>
            <span className="text-xs"> {user.email}</span>
          </p>
        </div>
        <Separator className="my-4 border-t-[0.5px] border-solid border-white/30" />
        <Button
          asChild
          variant="transparent"
          size="none"
          className="flex w-full items-center p-1"
        >
          <PopoverClose asChild>
            <Link href={"/user"}>個人檔案</Link>
          </PopoverClose>
        </Button>
        <Separator className="my-4 border-t-[0.5px] border-solid border-white/30" />
        <Button
          asChild
          variant="transparent"
          size="none"
          className="flex w-full items-center p-1"
        >
          <LogoutLink>
            <LogOut className="h-4 w-4" />
            登出
          </LogoutLink>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
