import "~/lib/rabbitmq/init.ts";

import { channel } from "~/lib/rabbitmq/channel.ts";
import { config } from "~/lib/config.ts";
import { logger } from "~/lib/logger.ts";

await channel.consume(
  { queue: config.RABBITMQ_QUEUE_NAME },
  async (args, props, data) => {
    const payloadStr = new TextDecoder().decode(data);
    let payload: string | Record<string, unknown>;

    try {
      payload = JSON.parse(payloadStr);
    } catch {
      payload = payloadStr;
    }

    logger.info(
      `Message: \n${
        JSON.stringify(
          { args, props, ...(payload && { payload }) },
          null,
          config.PRETTY_LOGS ? 2 : undefined,
        )
      }\n`,
    );
    await channel.ack({ deliveryTag: args.deliveryTag });
  },
);

logger.info(`Consuming messages from queue "${config.RABBITMQ_QUEUE_NAME}"`);
