import { connection } from "~/lib/rabbitmq/connection.ts";

export const channel = await connection.openChannel();
