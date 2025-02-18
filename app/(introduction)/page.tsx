import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import GuestPage from "./_components/page/GuestPage";
import { redirect } from "next/navigation";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (user) {
    redirect("/workspace");
  }
  return (
    
    <div className="flex min-h-[calc(100vh-3rem)] justify-center bg-gradient-to-br from-aligno-400 to-aligno-600">
      <GuestPage />
    </div>
  );
}
