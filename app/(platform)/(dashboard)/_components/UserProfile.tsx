import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOut } from "lucide-react";
import {
  Popover,
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
        <h2 className="my-4 text-xs px-1">帳號</h2>
        <div className="px-1 flex gap-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={user?.picture || "/default-avatar.png"}
              alt="@shadcn"
              className="w-full h-full object-cover"
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
        <Separator className="my-4 border-white/30 border-t-[0.5px] border-solid" />
        <Button
          asChild
          variant="transparent"
          size="none"
          className="w-full p-1 flex items-center"
        >
          <Link href={"/user"}>個人檔案</Link>
        </Button>
        <Separator className="my-4 border-white/30 border-t-[0.5px] border-solid" />
        <Button
          asChild
          variant="transparent"
          size="none"
          className="w-full p-1 flex items-center"
        >
          <LogoutLink>
            <LogOut className="w-4 h-4" />
            登出
          </LogoutLink>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
