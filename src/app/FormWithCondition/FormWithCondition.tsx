"use client";
import { FormFieldInput } from "@/components/custom/FormFieldInput";
import FormFieldSelect from "@/components/custom/FormFieldSelect";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
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
  const typeValue = watch("type");
  console.log("🚀 ~ FormWithCondition ~ errors:", errors);
  const a1 = "";
  const [submitSuccess, setSubmitSuccess] = useState(0);
  const onSubmit = (data: unknown) => {
    setSubmitSuccess(submitSuccess + 1);
    return {};
  };

  return (
    <div className="space-y-3">
      <Input />
      <Button onClick={() => handleSubmit(onSubmit)()}>SUBMIT FORM</Button>
      <FormProvider {...method}>
        <PostKind />

        {typeValue === POST_TYPE.SPECIALIZED.toString() && (
          <div>
            <FormFieldInput
              fieldTitle={
                <div>
                  Specialist <span className="text-red-400">*</span>
                </div>
              }
              nameInSchema="jobOpening"
              id="jobOpening"
              placeholder="Specialist"
            />
          </div>
        )}
        {typeValue === POST_TYPE.SPECIALIZED.toString() && (
          <div>
            <FormFieldSelect
              options={JOB_TITLE_OPTIONS}
              fieldTitle={
                <div>
                  JobTitle <span className="text-red-400">*</span>
                </div>
              }
              nameInSchema="jobTitle"
              placeholder=""
            />
          </div>
        )}

        <FormFieldInput
          fieldTitle={
            <div>
              EXP <span className="text-red-400">*</span>
            </div>
          }
          nameInSchema="experience"
          id="experience"
          placeholder="EXP"
        />
      </FormProvider>
      Submit Count: {submitSuccess}
    </div>
  );
};

export default FormWithCondition;
