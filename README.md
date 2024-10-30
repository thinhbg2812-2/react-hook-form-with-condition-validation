This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started


With RHF + ZOD validation can have a look at link below for more information

*https://github.com/colinhacks/zod/discussions/938*

Zod's refine/superRefine will only run after the schema is fully verified (otherwise, the data parameter of refine wouldn't match the expected schema and would need to be typed as unknown). If you want the refinement to occur even if experience hasn't been validated yet, you need to move it to a nested object. See this thread for more details.


First, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
