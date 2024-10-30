"use client";
import { FormFieldInput } from "@/components/custom/FormFieldInput";
import FormFieldSelect from "@/components/custom/FormFieldSelect";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Final01, FinalSchema01, POST_TYPE } from "./createEdit.type";
import { JOB_TITLE_OPTIONS } from "./options";
import PostKind from "./PostKind";

const FormWithCondition = () => {
  const method = useForm<Final01>({
    resolver: zodResolver(FinalSchema01),
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
  const [submitSuccess, setSubmitSuccess] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
