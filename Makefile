.PHONY: compile compile_all_platforms

compile_all_platforms:
	@echo "Compiling..."
	@deno compile --allow-net --allow-env --allow-write --allow-read --allow-sys ./src/consumer.ts --target aarch64-apple-darwin -o ./bin/consumer-aarch64_apple_darwin
	@deno compile --allow-net --allow-env --allow-write --allow-read --allow-sys ./src/consumer.ts --target x86_64-apple-darwin -o ./bin/consumer-x86_64_apple_darwin
	@deno compile --allow-net --allow-env --allow-write --allow-read --allow-sys ./src/consumer.ts --target x86_64-unknown-linux-gnu -o ./bin/consumer-x86_64_unknown_linux_gnu
	@echo "Done."

compile:
	@echo "Compiling..."
	@deno compile --allow-net --allow-env --allow-write --allow-read --allow-sys ./src/consumer.ts -o ./bin/consumer
	@echo "Done."