import { multistream, pino } from "npm:pino@8";
import PinoPretty from "npm:pino-pretty@10";
import { config } from "~/lib/config.ts";
import { ensureDir } from "~/utils/fs/ensure_dir.ts";

import type { PinoPretty as PinoPrettyNs } from "npm:pino-pretty@10";
import type { StreamEntry } from "npm:pino@8";

const logDir = new URL("../../logs", import.meta.url).pathname;

await ensureDir(logDir);

export const logger = pino(
  { level: "debug" },
  multistream([
    ...(config.PRETTY_LOGS
      ? [{
        stream: (PinoPretty as unknown as () => PinoPrettyNs.PrettyStream)(),
      }]
      : [{
        stream: {
          write: (data: string) => {
            console.log(data);
          },
        },
      }]),
    PinoStreamAdapter(),
  ]),
);

export function PinoStreamAdapter(): StreamEntry {
  return {
    stream: {
      write: (data: string) => {
        const logFile = Deno.openSync(`${logDir}/debug.log`, {
          create: true,
          append: true,
        });
        logFile.writeSync(new TextEncoder().encode(data));
        logFile.close();
      },
    },
    level: "debug",
  };
}
