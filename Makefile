run:
	@npm run dev

start-db:
	@docker run --rm -d -p 27017:27017 \
		-v coasters-db-data:/data/db \
		--name coasters-db mongo

.PHONY: run start-db