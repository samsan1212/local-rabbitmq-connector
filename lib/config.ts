import * as yup from "https://cdn.skypack.dev/yup@^1.1?dts";
import { load } from "https://deno.land/std@0.193.0/dotenv/mod.ts";
import { fromFileUrl } from "https://deno.land/std@0.193.0/path/mod.ts";

import type { ValidationError } from "https://cdn.skypack.dev/yup@^1.1?dts";

await load({
  envPath: fromFileUrl(new URL("../.env", import.meta.url)),
  export: true,
  examplePath: null,
});

const envSchema = yup.object({
  RABBITMQ_PORT: yup.number().transform((val: unknown) =>
    isNaN(val as number) ? undefined : val
  ).required(),
  RABBITMQ_HOST: yup.string().required(),
  RABBITMQ_QUEUE_NAME: yup.string().required(),
});

export const config = await envSchema.validate({
  RABBITMQ_PORT: Deno.env.get("RABBITMQ_PORT"),
  RABBITMQ_HOST: Deno.env.get("RABBITMQ_HOST"),
  RABBITMQ_QUEUE_NAME: Deno.env.get("RABBITMQ_QUEUE_NAME"),
}).catch((err: ValidationError) => {
  throw new Error(err.message);
});
