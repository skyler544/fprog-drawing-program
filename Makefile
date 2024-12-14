NAME := drawing-app
TSC  := ./node_modules/.bin/tsc
APP  := /usr/share/nginx/html/app

all: run

shell: run
	docker exec -it $(NAME) sh

run: compile build
	docker run -d -p 8080:80 -v $(PWD)/dist:$(APP) --name $(NAME) $(NAME)

build:
	docker build -t $(NAME) .

compile: install
	$(TSC)

install: node_modules
	npm install

clean:
	-docker rm -f $(NAME)
	-docker rmi -f $(NAME)

stop:
	docker stop $(NAME)
