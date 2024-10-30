import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type Props = {
  nameInSchema: string;
  placeholder: string;
  fieldTitle?: ReactNode;
  prefix?: ReactNode;
  options: { value: string; label: string }[];
  wrapperClassName?: string;
  readOnly?: boolean;
};

const FormFieldSelect = ({
  fieldTitle,
  nameInSchema,
  placeholder,
  prefix,
  options = [],
  wrapperClassName,
  readOnly,
}: Props) => {
  const form = useFormContext();

  const fieldTitleNoSpaces =
    typeof fieldTitle === 'string' ? fieldTitle.replaceAll(' ', '-') : '';

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className={'flex w-full flex-col justify-between'}>
          {fieldTitle && (
            <FormLabel className={`text-base`} htmlFor={fieldTitleNoSpaces}>
              {fieldTitle}
            </FormLabel>
          )}
          <div className={`flex w-full flex-col gap-2`}>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={readOnly}
              >
                <SelectTrigger className={cn('h-11', wrapperClassName)}>
                  <div className="group flex items-center gap-2">
                    {prefix && prefix}
                    <SelectValue placeholder={placeholder} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormFieldSelect;
