var id = "";/* set this variable once you've installed the app (it's labeled ID in chrome://extensions)
            (once deployed this will be hard coded and unchanging) */

chrome.omnibox.onInputStarted.addListener(function(){
  chrome.management.launchApp( id , function onAppLaunched(){
    //our http server should be listening now

    chrome.omnibox.onInputEntered.addListener(function(uri){
      if (uri.indexOf("/") == 0)
        uri = uri.substr(1);

      uri = "web+ndn://" + uri;

        chrome.tabs.query({active: true, currentWindow:true},function(tabIds){
          var tabId = tabIds[0].id;
          chrome.tabs.update(tabId, {url : uri}, function tabUpdateCallback(){
            console.log("updated!")
          })
        })

    })
  })
})
