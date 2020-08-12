###### index
Index.js is used to serve all language files as an object.
Below is a list of folder specific files

###### body
 html bodies for 404 or other error codes

###### forms
 cards (e.g.login) and frames use this.
 A frame is just a card that doesnt work as overlay but somewhere in the page template itself as a fast way to include forms.

###### head
 used for html head tag

 ###### routes
 index for React uses these when routing. This allows same route to translate into other languages for example Login/ -> Einloggen/

 ###### testing
 for developing reasons only

###### functions
storedLanguage() is used by React index file and gets/sets sessionStorage language.

