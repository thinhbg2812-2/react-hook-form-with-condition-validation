"use client";
import { FormFieldInput } from "@/components/custom/FormFieldInput";
import FormFieldSelect from "@/components/custom/FormFieldSelect";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  createEditFormSchema,
  CreateEditPostForm,
  POST_TYPE,
} from "./createEdit.type";
import { JOB_TITLE_OPTIONS } from "./options";
import PostKind from "./PostKind";

const FormWithCondition = () => {
  const method = useForm<CreateEditPostForm>({
    resolver: zodResolver(createEditFormSchema),
    defaultValues: useMemo(() => {
      const obj = {
        quantity: 1,
        type: POST_TYPE.SPECIALIZED.toString(),
      };
      return obj;
    }, []),
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = method;
  console.log("🚀 ~ FormWithCondition ~ errors:", errors);
  const typeValue = watch("type");

  const onSubmit = (data: unknown) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    return {};
  };

  return (
    <div>
      <Button onClick={() => handleSubmit(onSubmit)()}>Đăng tin</Button>

      <FormProvider {...method}>
        <PostKind />

        {typeValue === POST_TYPE.SPECIALIZED.toString() && (
          <div>
            <FormFieldInput
              fieldTitle={
                <div>
                  Vị trí tuyển dụng <span className="text-red-400">*</span>
                </div>
              }
              nameInSchema="jobOpening"
              id="jobOpening"
              placeholder="Vị trí tuyển dụng"
            />
          </div>
        )}
        {typeValue === POST_TYPE.SPECIALIZED.toString() && (
          <div>
            <FormFieldSelect
              options={JOB_TITLE_OPTIONS}
              fieldTitle={
                <div>
                  Cấp bậc <span className="text-red-400">*</span>
                </div>
              }
              nameInSchema="jobTitle"
              placeholder="Cấp bậc"
            />
          </div>
        )}

        <FormFieldInput
          fieldTitle={
            <div>
              Kinh nghiệm <span className="text-red-400">*</span>
            </div>
          }
          nameInSchema="experience"
          id="experience"
          placeholder="Kinh nghiệm"
        />
      </FormProvider>
    </div>
  );
};

export default FormWithCondition;
