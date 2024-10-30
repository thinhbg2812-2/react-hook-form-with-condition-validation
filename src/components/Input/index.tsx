import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { InputProps, ShadcnInput } from "../ui/input";

type Props = Omit<InputProps, "prefix"> & {
  prefix?: ReactNode;
  suffix?: ReactNode;
  wrapperClassName?: string;
  prefixClassName?: string;
  suffixClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      prefix,
      placeholder = "",
      suffix,
      wrapperClassName,
      prefixClassName,
      suffixClassName,
      ...inputProps
    },
    ref
  ) => {
    return (
      <div
        className={`flex w-full items-center rounded-[3px] border-[1px] border-gray-8E8E93 bg-white ${wrapperClassName}`}
      >
        {prefix && (
          <div
            className={cn(
              `ml-3 flex items-center justify-center self-stretch`,
              prefixClassName
            )}
          >
            {prefix}
          </div>
        )}
        <ShadcnInput placeholder={placeholder} {...inputProps} ref={ref} />
        {suffix && (
          <div
            className={cn(
              "mr-3 flex items-center justify-center self-stretch",
              suffixClassName
            )}
          >
            {suffix}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
