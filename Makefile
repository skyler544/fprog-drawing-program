NAME := drawing-app
TSC  := ./node_modules/.bin/tsc
APP  := /usr/share/nginx/html/app

all: run

shell: compile run
	docker exec -it $(NAME) sh

run: compile
	docker compose up -d

build: compile
	docker compose build

compile: install
	$(TSC)

watch: install
	$(TSC) -w

install:
	@if [ ! -d "node_modules" ]; then \
		npm install; \
	fi

clean:
	docker compose down
	rm -rf dist node_modules

stop:
	docker compose stop
