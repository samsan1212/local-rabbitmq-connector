import { connection } from "~/lib/rabbitmq.ts";
import { config } from "~/lib/config.ts";
import { logger } from "~/lib/logger.ts";

const channel = await connection.openChannel();

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

    logger.info(`Args:\n${JSON.stringify(args, null, 2)}\n`);
    logger.info(`Props:\n${JSON.stringify(props, null, 2)}\n`);
    if (payload) logger.info(`Payload:\n${JSON.stringify(payload, null, 2)}\n`);
    await channel.ack({ deliveryTag: args.deliveryTag });
  },
);
