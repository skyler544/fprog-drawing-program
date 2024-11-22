all: run

run: build
	docker run -p 8080:80 --name drawing-app drawing-app

build:
	docker build -t drawing-app .

clean:
	docker rm -f drawing-app
	docker rmi drawing-app
