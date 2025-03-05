"use client";
import { updateUser } from "@/aciotns/user/updateUser";
import { UpdateUserSchema } from "@/aciotns/user/updateUser/schema";
import ErrorMessage from "@/components/form/Form-Error";
import { FormInput } from "@/components/form/Form-Input";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
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
    control,
    trigger,
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
    <div className="mx-auto flex w-full max-w-2xl flex-col space-y-4 px-16">
      <h2 className="text-3xl font-semibold">管理你的個人資料</h2>
      <Separator className="my-4 border-t-[0.5px] border-solid border-white/30" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-6">
          <div className="flex flex-1 flex-col space-y-2">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="firstName"
                  label="姓"
                  placeholder="輸入姓"
                  className=""
                  {...field}
                />
              )}
            />
          </div>
          <ErrorMessage errormessage={errors.firstName?.message} />
          <div className="flex flex-1 flex-col space-y-2">
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="lastName"
                  label="名字"
                  placeholder="輸入名字"
                  className=""
                  {...field}
                />
              )}
            />
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
