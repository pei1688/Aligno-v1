"use client";
import { updateUser } from "@/aciotns/user/updateUser";
import { UpdateUserSchema } from "@/aciotns/user/updateUser/schema";
import ErrorMessage from "@/components/form/ErrorMessage";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UserProps {
  id: string;
  given_name: string | null;
  family_name: string | null;
  picture?: string | null;
  email: string | null;
}
interface UserDataProps {
  firstName: string | null;
  lastName: string | null;
}

const UserForm = ({
  user,
  userData,
}: {
  user: UserProps;
  userData: UserDataProps;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      firstName: userData.firstName as string,
      lastName: userData.lastName as string,
    },
  });
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (data: { firstName: string; lastName: string }) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    startTransition(async () => {
      try {
        await updateUser(formData);
        toast.success("更新使用者成功");
      } catch (error) {
        toast.error("更新使用者失敗");
      }
    });
  };
  return (
    <div className="px-16 flex flex-col space-y-4 max-w-2xl w-full mx-auto">
      <h2 className="font-semibold text-3xl">管理你的個人資料</h2>
      <Separator className="my-4 border-white/30 border-t-[0.5px] border-solid" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-6">
          <div className="flex-1">
            <Label htmlFor="firstName">姓</Label>
            <Input type="text" id="firstName" {...register("firstName")} />
          </div>
          <ErrorMessage errormessage={errors.firstName?.message} />
          <div className="flex-1">
            <Label htmlFor="lastName">名字</Label>
            <Input type="text" id="lastName" {...register("lastName")} />
          </div>
          <ErrorMessage errormessage={errors.lastName?.message} />
        </div>
        <div className="mt-4">
          <Label htmlFor="email">電子信箱</Label>
          <Input type="text" id="email" defaultValue={user.email!} disabled />
        </div>
        <SubmitButton disabled={isPending}>儲存</SubmitButton>
      </form>
    </div>
  );
};

export default UserForm;
