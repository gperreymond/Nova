.PHONY: default up down tests

default: up

up:
	docker-compose pull;
	docker-compose up -d;

down:
	docker-compose down;

tests:
	npm run test:standard;
	npm run test:coverage;
	npm run coverage:publish;
