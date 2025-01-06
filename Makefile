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

test: install
	npm test

install:
	@if [ ! -d "node_modules" ]; then \
		npm install; \
	fi

clean:
	docker compose down
	rm -rf dist node_modules

extra-clean: clean
	docker compose down --rmi all
	docker image prune -af

stop:
	docker compose stop
