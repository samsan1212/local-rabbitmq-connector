# Local RabbitMQ Connector

## Pre-requisites

- [Deno](https://deno.land/#installation), for running the server

## Usage

Run the server with `deno run`

```bash
# e.g. run consumer
$ deno run -A ./src/consumer.ts
```

or run it by `deno task`

```bash
$ deno task consume
```

## Run with excutable file

compile the server with `deno compile`

```bash
$ make compile
```

You can run the the excutable file under `bin` folder.

```bash
# e.g. run consumer
$ ./bin/consumer
```