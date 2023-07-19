import { config } from "~/lib/config.ts";
import { channel } from "~/lib/rabbitmq/channel.ts";

import { logger } from "~/lib/logger.ts";

await channel.declareExchange({
  exchange: config.RABBITMQ_EXCHANGE_NAME,
  type: "x-delayed-message",
  arguments: {
    "x-delayed-type": "topic",
  },
});

logger.info(`Exchange "${config.RABBITMQ_EXCHANGE_NAME}" declared`);
