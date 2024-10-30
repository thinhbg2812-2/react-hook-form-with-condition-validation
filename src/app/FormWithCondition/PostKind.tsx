import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { POST_TYPE } from "./createEdit.type";

const PostKind = () => {
  const { control, setValue } = useFormContext();

  // const onChange = (value: string) => {
  //   if (value === POST_TYPE.SPECIALIZED.toString()) {
  //     setValue("type", value);
  //     setValue("jobOpening", "");
  //     setValue("jobTitle", "");
  //   } else {
  //     setValue("type", value);
  //     setValue("jobOpening", "");
  //     setValue("jobTitle", "");
  //   }
  // };

  return (
    <div>
      <FormField
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                defaultValue={POST_TYPE.SPECIALIZED.toString()}
                onValueChange={field.onChange}
                className="!mt-4 flex gap-4"
              >
                <Label
                  htmlFor="option-one"
                  className={cn(
                    "flex cursor-pointer items-center gap-x-2 rounded-full border border-solid border-primary px-6 py-2",
                    field.value.toString() === POST_TYPE.SPECIALIZED.toString()
                      ? "bg-primary-75"
                      : ""
                  )}
                >
                  <RadioGroupItem
                    value={POST_TYPE.SPECIALIZED.toString()}
                    id="option-one"
                    className="text-primary"
                  />
                  SPECIALIZED
                </Label>

                <Label
                  htmlFor="option-two"
                  className={cn(
                    "flex cursor-pointer items-center gap-x-2 rounded-full border border-solid border-primary px-6 py-2",
                    field.value.toString() === POST_TYPE.GENERAL.toString()
                      ? "bg-primary-75"
                      : ""
                  )}
                >
                  <RadioGroupItem
                    value={POST_TYPE.GENERAL.toString()}
                    id="option-two"
                    className="text-primary"
                  />
                  GENERAL
                </Label>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default PostKind;
