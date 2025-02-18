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
    <div className="w-full  lg:w-[600px] space-y-4 hidden lg:block">
      <div className="relative w-full h-[300px]">
        <div>
          <Image
            src={"/img/work.jpg"}
            alt="work"
            className="object-cover relative"
            fill
          />
          <p className="absolute top-36 left-6 text-aligno-600 font-semibold">
            <span className=" text-3xl">ALIGNO</span>
            <br />
            <span className="text-md">打造屬於你的待辦事項🙂</span>
            <br />
            <span className="text-md">自訂選項</span>
          </p>
        </div>
      </div>
      <h2 className="text-xl md:text-2xl font-semibold text-aligno-200">
        歡迎回來,{user.given_name}
        {user.family_name}
      </h2>
      <Separator className="my-8 border-aligno-400/50 border-t-[0.5px] border-solid" />
      <div className="flex items-center">
        <p className=" text-lg">立即建立屬於你的工作區!</p>
        <Button
          variant="link"
          className="text-lime-500 text-lg font-semibold"
          onClick={wsModal.onOpen}
        >
          建立工作區
        </Button>
      </div>
    </div>
  );
};

export default CreateWorkspace;
