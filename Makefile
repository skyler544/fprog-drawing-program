NAME := drawing-app
TSC  := ./node_modules/.bin/tsc
APP  := /usr/share/nginx/html/app

all: run

shell: run
	docker exec -it $(NAME) sh

run:
	docker compose up -d

build:
	docker compose build

compile: install
	$(TSC)

install:
	@if [ ! -d "node_modules" ]; then \
		npm install; \
	fi


clean:
	docker compose down

stop:
	docker compose stop
