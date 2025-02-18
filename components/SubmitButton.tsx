"use client";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = ({
  children,
  className,
  disabled,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "work"
    | "popover"
    | "transparent";
}) => {
  return (
    <Button
      type="submit"
      disabled={disabled}
      variant={variant}
      className={className}
    >
      {disabled ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          建立中...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
