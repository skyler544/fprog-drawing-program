NAME := drawing-app

all: run

run: build
	docker start $(NAME) || \
	docker run -p 8080:80 --name $(NAME) $(NAME)

build:
	docker build -t $(NAME) .

clean: stop
	docker rm $(NAME)
	docker rmi $(NAME)

stop:
	docker stop $(NAME)
