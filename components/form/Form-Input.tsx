"use client";

import { forwardRef, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  disabled?: boolean;
  onBlur?: () => void;
  onCustomBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      disabled,
      onBlur,
      onCustomBlur,
      onKeyDown,
      className,
      placeholder,
      label,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    // 組合 onBlur 事件
    const handleBlur = () => {
      if (onBlur) onBlur(); // 調用 React Hook Form 的 onBlur
      if (onCustomBlur) onCustomBlur(); // 調用自定義的 onBlur 邏輯
    };

    // 處理 onKeyDown 事件
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (onKeyDown) onKeyDown(e);
      if (e.key === "Enter") {
        e.preventDefault();
        inputRef.current?.blur();
      }
    };
    //不再需要額外value透過react form的controller來控制
    return (
      <>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Input
          type="text"
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={className}
          ref={(e) => {
            inputRef.current = e;
            if (typeof ref === "function") ref(e);
            else if (ref) ref.current = e;
          }}
          {...rest}
        />
      </>
    );
  },
);

FormInput.displayName = "FormInput";
