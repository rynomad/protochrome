

This is a shell for a chrome extension/app pair that will handle ndn:// uri schemes from both the omnibox and html image/css/etc tags. The pattern could be repurposed for any scenario where you want to handle a custom protocol in Chrome without having to operate a static remote domain.

How it works
----

The extension detects the 'ndn' keyword being typed into the omnibox... once the user enables the extension and starts typing, the extension launches the app

The app runs a Node style http server on port 5000 (this is hardcoded until a more elegant solution is found) which serves as a local http proxy to ndn (or any other protocol/process)

Now that the app is loaded, it will continue to serve requests for the "web+ndn" protocol for the rest of the browser session, whether they're entered in the omnibox or via image/script/css/etc tag.


Installation
------
- clone and install dependencies

```
   //if you don't have it already
   npm install -g browserify

   git clone git@github.com:rynomad/chrome-ndn
   cd chrome-ndn
   npm install

   browserify app/index.js > app/background.js

```

- open chrome:
- navigate to chrome://extensions
- enable developer mode (upper right corner)
- click "load unpacked extension"
- get into the 'app' folder and click open
- copy and paste the 'ID' of the app into the id string in extension/index.js, save
- click "load unpacked extension" again
- get into the 'extension' folder and click open
- restart chrome

Testing
----

open chrome and navigate to localhost:5000.... nothing should happen.

- now enter 'ndn' + TAB into the omnibox
- start typing a uri.
- IMPORTANT: since this is a minimum demo, there's no post install hook to register the protocol handler, so the first time you do this, after you've started typing a url (ie after the app is launched) but before you press enter, open a new tab and go back to localhost:5000... you'll get an empty white screen but chrome will ask your permission to register the protocol handler (if it doens't pop up, there's sometimes a little double-tilted-square icon in right hand side of the omnibox). Allow it
- now press enter
- you should be redirected to a page served from the app
- subsequent attempts to use web+ndn protocol in any context should route through the app :)
- Remember: the first use in any browser session requires the extension.



type
