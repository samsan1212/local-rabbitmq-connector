import { config } from "~/lib/config.ts";
import { channel } from "~/lib/rabbitmq/channel.ts";
import { logger } from "~/lib/logger.ts";

await channel.declareQueue({
  queue: config.RABBITMQ_QUEUE_NAME,
  durable: true,
});

logger.info(`Queue "${config.RABBITMQ_QUEUE_NAME}" declared`);
