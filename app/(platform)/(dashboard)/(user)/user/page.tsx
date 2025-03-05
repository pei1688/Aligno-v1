import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserForm from "./_components/UserForm";
import db from "@/lib/db";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const UserPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return <p>請登入後查看用戶資料</p>;
  }

  const userData = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: { firstName: true, lastName: true },
  });
  return (
    <div>
      <div className="flex flex-col">
        <div className="flec flex items-center gap-x-4 p-16 py-8">
          <div className="relative h-[60px] w-[60px]">
            <Image
              src={user.picture || "https://avatar.vercel.sh/rauchg"}
              alt="vercel"
              className="rounded-full object-cover"
              fill
            />
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-xl font-semibold">{user.given_name}</p>
            <div className="flex items-center text-xs text-aligno-300">
              @{userData?.firstName}
              {userData?.lastName}
            </div>
          </div>
        </div>
        <div className="px-16">
          <span className="text-sm">個人檔案</span>
          <Separator className="mb-8 mt-2 border-t-[0.5px] border-solid border-white/30" />
        </div>
      </div>
      <UserForm user={user} userData={userData!} />
    </div>
  );
};

export default UserPage;
