import { Eye, EyeClosed, Lock } from 'iconoir-react';
import { forwardRef, useState } from 'react';
import { InputProps, ShadcnInput } from '@/components/ui/shadcnInput';
import { cn } from '@/lib/utils';

type Props = {
  placeholder?: string;
  wrapperClassName?: string;
  noPrefix?: boolean;
} & InputProps;

const InputPassword = forwardRef<HTMLInputElement, Props>(
  ({ placeholder = '', wrapperClassName, noPrefix, ...inputProps }, ref) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
      <div
        className={cn(
          'flex w-full items-center rounded-[3px] border border-gray-8E8E93 bg-white',
          wrapperClassName,
        )}
      >
        {!noPrefix && (
          <div className="ml-3 flex items-center justify-center">
            <Lock className="h-[22px] w-[22px]" />
          </div>
        )}
        <ShadcnInput
          ref={ref}
          placeholder={placeholder}
          {...inputProps}
          type={isShowPassword ? 'text' : 'password'}
        />
        <div
          className="mr-3 flex cursor-pointer items-center justify-center"
          onClick={() => setIsShowPassword((pre) => !pre)}
        >
          {!isShowPassword ? (
            <EyeClosed className="h-[22px] w-[22px]" />
          ) : (
            <Eye className="h-[22px] w-[22px]" />
          )}{' '}
        </div>
      </div>
    );
  },
);
InputPassword.displayName = 'InputPassword';

export default InputPassword;
