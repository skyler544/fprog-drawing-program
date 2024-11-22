# Drawing Polygons

This application draws polygons using HTML 5 canvas and vanilla JavaScript.

## Building

This application is containerized with Docker. The `Makefile` provides a quick interface for starting and stopping the application.

- `make` --- Build the Docker image and start the application
- `make stop` --- Stop the running container.
- `make clean` --- Stop the running container, then remove it and the built image.

## Usage

Visit the running application at `localhost:8080`. Left clicks start and end lines, while right clicks end shapes. The undo and redo buttons do what you would expect.

![State Diagram](./state-diagram.png?raw=true "State Diagram")
