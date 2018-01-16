TEX = texi2pdf

all:
	$(TEX) collocore/core.tex
	if [ ! -d 'out' ];    \
		then mkdir 'out'; \
	fi
	if [ ! -d 'src' ];    \
		then mkdir 'src'; \
	fi
	if [ ! -d 'src/include' ];    \
		then mkdir 'src/include'; \
	fi
	mv core.pdf out/render.pdf
	make clean

run:
	if [ ! -r 'out/render.pdf' ];    \
		then echo '\n\nNOTHING TO DISPLAY, BUILD FIRST!'; \
		else open out/render.pdf ;\
	fi

clean:
	rm -fv *.aux *.bbl *.blg *.lof \
	*.out *.pdf *.snm *.vrb *.toc  \
	*.log *.lol *.lot *.nav *.bak  \
	*.loa *.thm
