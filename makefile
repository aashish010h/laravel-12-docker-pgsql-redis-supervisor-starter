# =============================================
# 🛠  DEVELOPMENT ENVIRONMENT MAKEFILE
# =============================================

# --------------------------
# 🏷  CONTAINER CONFIGURATION
# --------------------------
APP_CONTAINER=app
NGINX_CONTAINER=nginx
POSTGRES_CONTAINER=postgres
REDIS_CONTAINER=redis
DEV_COMPOSE_OVERRIDE=docker-compose.override.yml

# --------------------------
# 🔐  POSTGRES CREDENTIALS
# --------------------------
POSTGRES_DB=$(shell grep DB_DATABASE .env | cut -d '=' -f2)
POSTGRES_USER=$(shell grep DB_USERNAME .env | cut -d '=' -f2)
POSTGRES_PASSWORD=$(shell grep DB_PASSWORD .env | cut -d '=' -f2)

# =============================================
# 🎯  TARGETS / COMMANDS
# =============================================

.PHONY: help up prod stop down restart restart-container stop-container \
        php artisan composer npm bash logs psql redis test

## 📜 Display all available commands with descriptions
help:
	@echo "\n\033[1m🔥  Available Commands 🔥\033[0m"
	@echo "--------------------------------------------------------------"
	@echo "\033[1m💻  Environment Management:\033[0m"
	@echo "  make up             - Start development environment"
	@echo "  make prod           - Start production environment"
	@echo "  make stop           - Stop all containers"
	@echo "  make down           - Remove containers and volumes"
	@echo "  make restart        - Restart all containers"
	@echo "  make restart-container CONTAINER=name - Restart specific container"
	@echo "  make stop-container CONTAINER=name    - Stop specific container"
	@echo "\n\033[1m🛠  Development Tools:\033[0m"
	@echo "  make php <cmd>      - Run PHP command in app container"
	@echo "  make artisan <cmd>  - Run Artisan command"
	@echo "  make composer <cmd> - Run Composer command"
	@echo "  make npm <cmd>      - Run NPM command"
	@echo "  make test           - Run PHPUnit tests"
	@echo "\n\033[1m🔍  Debugging:\033[0m"
	@echo "  make bash           - Open shell in app container"
	@echo "  make logs container - View container logs"
	@echo "  make psql           - Connect to PostgreSQL"
	@echo "  make redis          - Connect to Redis CLI\n"

## 🚀 Start development environment (with override)
up:
	docker-compose -f docker-compose.yml -f $(DEV_COMPOSE_OVERRIDE) up -d

## 🏭 Start production environment
prod:
	docker-compose -f docker-compose.yml up -d

## ⏹ Stop all containers
stop:
	docker-compose stop

## 🧹 Remove containers and volumes
down:
	docker-compose down -v

## 🔄 Restart all containers
restart:
	docker-compose restart

## 🔄 Restart specific container (usage: make restart-container CONTAINER=nginx)
restart-container:
	docker-compose restart $(CONTAINER)

## ⏹ Stop specific container (usage: make stop-container CONTAINER=postgres)
stop-container:
	docker-compose stop $(CONTAINER)

## 🐘 Run PHP command (usage: make php -v)
php:
	docker-compose exec -u www-data $(APP_CONTAINER) php $(filter-out $@,$(MAKECMDGOALS))

## 🎭 Run Artisan command (usage: make artisan migrate)
artisan:
	docker-compose exec -u www-data $(APP_CONTAINER) php artisan $(filter-out $@,$(MAKECMDGOALS))

## 🎼 Run Composer command (usage: make composer install)
composer:
	docker-compose exec -u www-data $(APP_CONTAINER) composer $(filter-out $@,$(MAKECMDGOALS))

## 📦 Run NPM command (usage: make npm run dev)
npm:
	docker-compose exec -u www-data $(APP_CONTAINER) npm $(filter-out $@,$(MAKECMDGOALS))

## 💻 Open shell in app container
bash:
	docker-compose exec -u www-data $(APP_CONTAINER) bash

## 📜 View container logs (usage: make logs nginx)
logs:
	docker-compose logs -f $(filter-out $@,$(MAKECMDGOALS))

## 🐘 Connect to PostgreSQL (uses .env credentials)
psql:
	docker-compose exec -e PGPASSWORD=$(POSTGRES_PASSWORD) $(POSTGRES_CONTAINER) psql -U $(POSTGRES_USER) -d $(POSTGRES_DB)

## 🔥 Connect to Redis CLI
redis:
	docker-compose exec $(REDIS_CONTAINER) redis-cli

## 🧪 Run tests
test:
	docker-compose exec -u www-data $(APP_CONTAINER) php artisan test

## 🎯 Catch-all target to prevent errors
%:
	@: