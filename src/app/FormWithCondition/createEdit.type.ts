
import { z } from 'zod';
// import * as yup from 'yup';

export enum POST_TYPE {
  SPECIALIZED = 0,
  GENERAL = 1,
}


export const ZOD_MESSAGES = {
  required: 'Bắt buộc',
  email: 'Email không đúng định dạng',
  password: 'Mật khẩu không khớp',
  passwordNotMatch: 'Mật khẩu không khớp',
  invalidPhone: 'Số điện thoại không đúng định dạng',
  passwordLength: 'Mật khẩu phải có ít nhất 6 ký tự',
};



const commonKeysFormSchema = z.object({
  type: z.enum([
    POST_TYPE.SPECIALIZED.toString(),
    POST_TYPE.GENERAL.toString(),
  ]),
  jobOpening: z.string().optional(),
  jobTitle: z.string().optional(),


  experience: z.string({
    message: ZOD_MESSAGES.required,
  }),
});

// const conditionKeysFormSchema = z.object({});

export const createEditFormSchema = commonKeysFormSchema.superRefine(
  ({ type, jobTitle,  }, refineMentContext) => {
    if (type === '0' && !jobTitle) {
      return refineMentContext.addIssue({
        code: 'custom',
        message: 'jobOpening,jobTitle is required',
        path: ['jobTitle'],
      });
    }

    return refineMentContext;
  },
);


export type CreateEditPostForm = z.infer<typeof createEditFormSchema>;
