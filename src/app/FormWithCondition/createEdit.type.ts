import { z } from "zod";
// import * as yup from 'yup';

export enum POST_TYPE {
  SPECIALIZED = 0,
  GENERAL = 1,
}

export const ZOD_MESSAGES = {
  required: "Bắt buộc",
};

// JobOpening is required when type is SPECIALIZED
// METHOD 1: intersection + discriminatedUnion

const commonKeysFormSchema = z.object({
  experience: z.string({
    message: ZOD_MESSAGES.required,
  }),
});

const type1 = z.object({
  type: z.literal(POST_TYPE.SPECIALIZED.toString()),
  jobOpening: z.string({
    message: ZOD_MESSAGES.required,
  }),
  jobTitle: z.string({
    message: ZOD_MESSAGES.required,
  }),
});

const type2 = z.object({
  type: z.literal(POST_TYPE.GENERAL.toString()),
  jobTitle: z.string().optional(),
});

const totalType = z.discriminatedUnion("type", [type1, type2]);
export const FinalSchema01 = z.intersection(commonKeysFormSchema, totalType);
export type Final01 = z.infer<typeof FinalSchema01>;

// METHOD 2: superRefine
const conditionKeysFormSchema = z.object({
  type: z.enum([
    POST_TYPE.SPECIALIZED.toString(),
    POST_TYPE.GENERAL.toString(),
  ]),
  jobOpening: z.string().optional(),
  jobTitle: z.string().optional(),
});
export const Final02 = commonKeysFormSchema.merge(conditionKeysFormSchema);

export const FinalSchema02 = Final02.superRefine(
  ({ type, jobTitle, jobOpening }, refineMentContext) => {
    if (type === "0" && !jobTitle) {
      refineMentContext.addIssue({
        code: "custom",
        message: "jobOpening,jobTitle is required",
        path: ["jobTitle"],
      });
    }
    if (type === "0" && !jobOpening) {
      refineMentContext.addIssue({
        code: "custom",
        message: "jobOpening,jobTitle is required",
        path: ["jobOpening"],
      });
    }
  }
);
export type Final02 = z.infer<typeof FinalSchema02>;
