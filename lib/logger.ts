import { pino } from "npm:pino@8";
import PinoPretty from "npm:pino-pretty@10";

import type { PinoPretty as PinoPrettyNs } from "npm:pino-pretty@10";

const logDir = new URL("../logs", import.meta.url).pathname;

const output = await Deno.open(`${logDir}/debug.log`, {
  create: true,
  append: true,
});

const outputWriter = output.writable.getWriter();
await outputWriter.ready;

export const logger = pino(
  (PinoPretty as unknown as () => PinoPrettyNs.PrettyStream)(),
);
