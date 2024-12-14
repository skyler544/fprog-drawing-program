NAME := drawing-app
TSC  := ./node_modules/.bin/tsc

all: run

run: compile build
	docker run -p 8080:80 -v $(PWD)/dist/drawing.js:/usr/share/nginx/html/drawing.js --name $(NAME) $(NAME)

build:
	docker build -t $(NAME) .

compile: install
	$(TSC)

install:
	npm install

clean:
	-docker rm -f $(NAME)
	-docker rmi -f $(NAME)

stop:
	docker stop $(NAME)
