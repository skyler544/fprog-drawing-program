LATEX := latexmk -interaction=nonstopmode
PDF   := -shell-escape -f -pdf

all: build

clean-build: clean build

build:
	$(LATEX) $(PDF)

watch:
	$(LATEX) $(PDF) -pvc

clean:
	$(LATEX) -c

clean-all:
	$(LATEX) -C
