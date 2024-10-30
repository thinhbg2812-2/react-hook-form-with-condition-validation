import { SelectProps } from '@radix-ui/react-select';
import React from 'react';
import {
  Select as ShadSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = Omit<SelectProps, 'onValueChange'> & {
  onChange?: (value: string) => void;
  prefix?: React.ReactNode;
  options?: { value: string; label: string }[];
  placeholder?: string;
};

const Select = ({
  onChange,
  prefix,
  options = [],
  placeholder,
  ...props
}: Props) => (
  <ShadSelect onValueChange={onChange} {...props}>
    <SelectTrigger>
      <div className="group flex items-center gap-2">
        {prefix ?? null}
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
  </ShadSelect>
);

export default Select;
