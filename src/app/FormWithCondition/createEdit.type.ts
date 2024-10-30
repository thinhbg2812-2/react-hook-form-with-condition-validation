
import { z } from 'zod';
// import * as yup from 'yup';

export enum POST_TYPE {
  SPECIALIZED = 0,
  GENERAL = 1,
}


export const ZOD_MESSAGES = {
  required: 'Bắt buộc',

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


export const createEditFormSchema = commonKeysFormSchema.superRefine(
  ({ type, jobTitle,jobOpening  }, refineMentContext) => {
    if (type === '0' && !jobTitle) {
       refineMentContext.addIssue({
        code: 'custom',
        message: 'jobOpening,jobTitle is required',
        path: ['jobTitle'],
      });
    }
    if (type === '0' && !jobOpening) {
       refineMentContext.addIssue({
        code: 'custom',
        message: 'jobOpening,jobTitle is required',
        path: ['jobOpening'],
      });
    }

  },
);


export type CreateEditPostForm = z.infer<typeof createEditFormSchema>;
