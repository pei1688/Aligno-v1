"use client";
import { forwardRef } from "react";
import { Textarea } from "../ui/textarea";
import ErrorMessage from "./Form-Error";
import { Label } from "../ui/label";

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  register: any;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  errormessage?: string;
  className?: string;
  defaultValue?: string;
  labelClassName?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      register,
      onKeyDown,
      errormessage,
      className,
      defaultValue,
      labelClassName,
      ...props
    },
    ref,
  ) => {
    //解構register內部的
    const { ref: registerRef, ...rest } = register(id);

    // 合併傳入的 ref、react-hook-form 的 registerRef
    const mergedRef = (el: HTMLTextAreaElement | null) => {
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
          el;
      }
      registerRef(el);
    };

    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={id} className={labelClassName}>
            {label}
          </Label>
        )}
        <Textarea
          id={id}
          ref={mergedRef}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          defaultValue={defaultValue}
          className={className}
          {...rest}
          {...props}
        />
        <ErrorMessage errormessage={errormessage} />
      </div>
    );
  },
);

FormTextarea.displayName = "FormTextarea";
