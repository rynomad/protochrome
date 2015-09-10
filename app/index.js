var http = require("http-chrome")

function get_from_ndn(url, res){
  /* do the ndn stuff, send back to res stream */
  console.log("got ndn request")
  var url = unescape(url.substr(2))
  res.write("<html><body> The actual NDN stuff isn't here yet<br>" +
            "You requested "+ url +"<br>" +
            "if you did it from the omnibox, try clicking " +
            "<a href='web+ndn:/test/link/with/web+ndn'>here</a> " +
            "to verify the protocol handler via html" +
            "</body></html>");
  res.end()
}

window.server = http.createServer(function(req, res){
  // is it an ndn protocol request?
  if (req.url.indexOf("/?") === 0)
    get_from_ndn(req.url, res);
  // if not, just register the protocol handler to the current port, chrome will ask permission the first time
  else
    res.write("<html><body><script> navigator.registerProtocolHandler('web+ndn',document.origin+'?%s','ndn')</script></body></html>");
    res.end()
})

server.listen(5000)
