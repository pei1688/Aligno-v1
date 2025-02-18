import CardModalProvider from "@/components/providers/CardModalProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

const PlatFormLayout = async ({ children }: { children: React.ReactNode }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <main>
      <QueryProvider>
        <CardModalProvider />
        <Toaster position="bottom-right" />
        {children}
      </QueryProvider>
    </main>
  );
};

export default PlatFormLayout;
