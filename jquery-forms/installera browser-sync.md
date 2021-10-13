1. Installera Node.js från typ https://nodejs.org/en/download/
2. Installera `browser-sync` med 
```
> npm install -g browser-sync
```
3. Starta `browser-sync` i din katalog ange vilka filer som ska "watchas" och vilken fil som är startfilen med:

På Windows
``` 
> browser-sync.cmd start --server --files "*.*" --index "namn på startfil.html"
``` 

På Mac/Linux/Unix
``` 
> browser-sync start --server --files "*.*" --index "namn på startfil.html"
``` 