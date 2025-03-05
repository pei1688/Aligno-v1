"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCreateWorkspaceFormModal } from "@/hook/useCreateWorkspaceFormModal";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import Image from "next/image";

interface UserProps {
  user: KindeUser<Record<string, any>>;
}

const CreateWorkspace = ({ user }: UserProps) => {
  const wsModal = useCreateWorkspaceFormModal();
  return (
    <div className="w-full space-y-4 lg:w-[600px]">
      <div className="h-[300px] w-full">
        <div className="relative h-full w-full">
          <Image
            src={"/img/work.jpg"}
            alt="work"
            sizes="auto"
            className="rounded-md object-cover shadow-md"
            fill
          />
          <p className="absolute left-6 top-36 font-semibold text-aligno-600">
            <span className="text-3xl">ALIGNO</span>
            <br />
            <span className="text-md">打造屬於你的待辦事項🙂</span>
            <br />
            <span className="text-md">自訂選項</span>
          </p>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-aligno-200 md:text-2xl">
        歡迎回來,{user.given_name}
        {user.family_name}
      </h2>
      <Separator className="my-8 border-t-[0.5px] border-solid border-aligno-400/50" />
      <div className="flex items-center">
        <p className="text-lg">立即建立屬於你的工作區!</p>
        <Button
          variant="link"
          className="text-lg font-semibold text-lime-500"
          onClick={wsModal.onOpen}
        >
          建立工作區
        </Button>
      </div>
    </div>
  );
};

export default CreateWorkspace;
