# sal.
Stem and leaf plots in JavaScript.

![screenshot](/screenshot.png)

I was inspired by my old [Statistics for Archaeologists book](http://www.amazon.com/Statistics-Archaeologists-Interdisciplinary-Contributions-Archaeology/dp/1441960716wq2) to make something like this. I found [this gist](https://gist.github.com/jeroenjanssens/6395842) helpful when I got stuck. This is a very simple implementation that only uses whole numbers for the stems and rounds all leaves to be single digits. Sal can be required in node and exposes a single global variable, sal, when used in the browser. This exists primarily as a coding excersize for me at this point.

#### TODO:
- support variable base value
- support back-to-back plots
