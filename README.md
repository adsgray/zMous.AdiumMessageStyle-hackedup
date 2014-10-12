# zMous Adium Theme with JS Hacks

## Why?

I like this theme but wanted to be able to have certain types of messages
(build failres, etc) displayed with a different style.

The only way I could find to do this was with the terrible JavaScript
setTimeout madness. 

The reason it iterates over all nodes in the DOM is that I couldn't
find a way to have my JavaScript function execute:
* only when a new message is received
* and only operate on the HTML node of that message

Also have not managed to get the selector with _not_ in it to work. I have no
idea what HTML/JS engine is used internally by Adium.

I am not sure how slow it's going to be when there are lots of messages in the
view.

