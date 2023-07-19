import { config } from "~/lib/config.ts";
import { channel } from "~/lib/rabbitmq/channel.ts";
import { logger } from "~/lib/logger.ts";

await channel.bindQueue({
  queue: config.RABBITMQ_QUEUE_NAME,
  routingKey: config.RABBITMQ_ROUTING_KEY,
  exchange: config.RABBITMQ_EXCHANGE_NAME,
});

logger.info(
  `Queue "${config.RABBITMQ_QUEUE_NAME}" bound to exchange "${config.RABBITMQ_EXCHANGE_NAME}" with routing key "${config.RABBITMQ_ROUTING_KEY}".`,
);
