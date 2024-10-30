"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import Input from "../Input";

type Props = {
  fieldTitle?: ReactNode;
  nameInSchema: string;
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  id?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  wrapperClassName?: string;
  layout?: "horizontal" | "vertical";
  labelClassName?: string;
};

export function FormFieldInput({
  fieldTitle,
  nameInSchema,
  placeholder,
  readOnly,
  id,
  prefix,
  suffix,
  wrapperClassName,
  layout = "vertical",
  labelClassName,
}: Props) {
  const form = useFormContext();

  const fieldTitleNoSpaces =
    typeof fieldTitle === "string" ? fieldTitle.replaceAll(" ", "-") : "";

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem
          className={cn(
            `w-full`,
            layout === "horizontal" && "flex flex-row space-y-0"
          )}
        >
          {fieldTitle && (
            <FormLabel
              className={`text-base ${labelClassName}`}
              htmlFor={fieldTitleNoSpaces}
            >
              {fieldTitle}
            </FormLabel>
          )}

          <div className={`flex w-full flex-col gap-2`}>
            <FormControl>
              <Input
                {...field}
                id={id || fieldTitleNoSpaces}
                wrapperClassName={wrapperClassName}
                className="w-full"
                placeholder={placeholder}
                readOnly={readOnly}
                disabled={readOnly}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
                prefix={prefix}
                suffix={suffix}
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
