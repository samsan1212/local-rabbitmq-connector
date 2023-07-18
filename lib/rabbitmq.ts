import { connect } from "https://deno.land/x/amqp/mod.ts";
import { config } from "~/lib/config.ts";

export const connection = await connect({
  hostname: config.RABBITMQ_HOST,
  port: config.RABBITMQ_PORT,
});
