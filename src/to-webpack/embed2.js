// change it so that the script to call can be passed in as a message from popup.js

console.log("in embed2");

function runEmbedded2( scriptName ) {
    // Put here whatever your script needs to do.
    console.log("in embed2 function call");

    function injectScript(file_path, tag) {
	var node = document.getElementsByTagName(tag)[0];
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', file_path);
	node.appendChild(script);
    }

    injectScript(chrome.runtime.getURL(scriptName), 'body' );


//    if ( window.__preloadedData.initialData != null && window.__preloadedData.initialData.data.article.sprinkledBody.content != null ) {
//	adds = window.__preloadedData.initialData.data.article.sprinkledBody.content;
//    }
//    console.log(adds);

}

// Optional: Listen for messages to invoke the function
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "callCrackerScript") {
    runEmbedded2( message.scriptName ); // Call the function
    sendResponse({ status: "Function executed" });
  }
});

