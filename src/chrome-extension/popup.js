  let changeColor = document.getElementById('changeColor');

  chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  });

  changeColor.onclick = function(element) {
      chrome.tabs.query({active: true, currentWindow: true},
			function(tabs) {
			    var url = new URL( tabs[0].url );
			    console.log( url.hostname );
			    switch (url.hostname) {
				case "www.smdailyjournal.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-smjournal.js"} );
			            break;
 			        case "www.nytimes.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-nytimes.js"} );
			            break;
 			        case "www.theatlantic.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-theatlantic.js"} );
			            break;
 			        case "www.theguardian.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-theguardian.js"} );
			            break;
 			        case "www.thedailybeast.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-thedailybeast.js"} );
			            break;
				case "www.latimes.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-latimes.js"} );
			            break;
			        case "www.foreignpolicy.com":
			        case "foreignpolicy.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-foreignpolicy.js"} );
			            break;
				case "www.sandiegouniontribune.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-latimes.js"} );
			            break;
				case "www.chicagotribune.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-latimes.js"} );
			            break;
				case "www.washingtonpost.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-wapo.js"} );
			            break;
				case "www.mediaite.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-mediaite.js"} );
			            break;
			        default:
				    console.log( "unrecognized : ", tabs[0].url );
			    }
			    this.close();
                     });
  };


/* 
fix icon
console.log does not seem to work
*/
