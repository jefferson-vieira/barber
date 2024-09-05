.DEFAULT_GOAL := help

# https://postd.cc/auto-documented-makefile/
.PHONY: help
help: ## Show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: db
db: ## Start database
	@docker compose up -d --no-recreate postgres

.PHONY: dev
dev: ## Run dev
	@$(MAKE) db
	@npx next dev

.PHONY: lint
lint: ## Run lint
	@npx tsc --noEmit
	@npx next lint
