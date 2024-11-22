NAME := drawing-app-two

all: run

run: build
	docker run -p 8080:80 -v $(PWD)/drawing.js:/usr/share/nginx/html/drawing.js --name $(NAME) $(NAME)

build:
	docker build -t $(NAME) .

clean:
	-docker rm -f $(NAME)
	-docker rmi -f $(NAME)

stop:
	docker stop $(NAME)
