# MedAI Docker Management Makefile

.PHONY: help build up down restart logs clean dev prod

# Default target
help:
	@echo "MedAI Docker Management Commands:"
	@echo ""
	@echo "Development:"
	@echo "  dev          - Start development environment"
	@echo "  dev-build    - Build development images"
	@echo "  dev-down     - Stop development environment"
	@echo "  dev-logs     - Show development logs"
	@echo ""
	@echo "Production:"
	@echo "  prod         - Start production environment"
	@echo "  prod-build   - Build production images"
	@echo "  prod-down    - Stop production environment"
	@echo "  prod-logs    - Show production logs"
	@echo ""
	@echo "General:"
	@echo "  build        - Build all images with BuildKit"
	@echo "  build-fast   - Build all images in parallel"
	@echo "  build-frontend - Build only frontend"
	@echo "  build-backend  - Build only backend"
	@echo "  up           - Start all services"
	@echo "  down         - Stop all services"
	@echo "  restart      - Restart all services"
	@echo "  logs         - Show logs for all services"
	@echo "  clean        - Clean up containers and volumes"
	@echo "  clean-all    - Clean up everything including images"

# Development commands
dev:
	docker-compose -f docker-compose.dev.yml up -d

dev-build:
	docker-compose -f docker-compose.dev.yml build

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

dev-restart:
	docker-compose -f docker-compose.dev.yml restart

# Production commands
prod:
	docker-compose up -d

prod-build:
	docker-compose build

prod-down:
	docker-compose down

prod-logs:
	docker-compose logs -f

prod-restart:
	docker-compose restart

# General commands
build:
	DOCKER_BUILDKIT=1 docker-compose build

build-fast:
	DOCKER_BUILDKIT=1 docker-compose build --parallel --no-cache

build-frontend:
	DOCKER_BUILDKIT=1 docker-compose build frontend

build-backend:
	DOCKER_BUILDKIT=1 docker-compose build backend

up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose restart

logs:
	docker-compose logs -f

# Database commands
db-migrate:
	docker-compose exec backend alembic upgrade head

db-migrate-dev:
	docker-compose -f docker-compose.dev.yml exec backend alembic upgrade head

db-shell:
	docker-compose exec db psql -U medai_user -d medai_db

db-shell-dev:
	docker-compose -f docker-compose.dev.yml exec db psql -U medai_user -d medai_db

# Cleanup commands
clean:
	docker-compose down -v
	docker-compose -f docker-compose.dev.yml down -v
	docker system prune -f

clean-all:
	docker-compose down -v --rmi all
	docker-compose -f docker-compose.dev.yml down -v --rmi all
	docker system prune -af

# Status commands
status:
	docker-compose ps

status-dev:
	docker-compose -f docker-compose.dev.yml ps

# Shell access
backend-shell:
	docker-compose exec backend bash

frontend-shell:
	docker-compose exec frontend sh

backend-shell-dev:
	docker-compose -f docker-compose.dev.yml exec backend bash

frontend-shell-dev:
	docker-compose -f docker-compose.dev.yml exec frontend sh
