  let changeColor = document.getElementById('changeColor');

  changeColor.onclick = function(element) {
      chrome.tabs.query({active: true, currentWindow: true},
			function(tabs) {
			    var url = new URL( tabs[0].url );
			    console.log( url.hostname );
			    switch (url.hostname) {
				case "www.bloomberg.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-bloomberg.js"} );
			            break;
				case "www.bostonglobe.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-bostonglobe.js"} );
			            break;
				case "markets.businessinsider.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-businessinsider.js"} );
			            break;
				case "www.eastbaytimes.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-eastbaytimes.js"} );
			            break;
				case "www.forbes.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-forbes.js"} );
			            break;
			        case "www.foreignpolicy.com":
			        case "foreignpolicy.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-foreignpolicy.js"} );
				case "www.latimes.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-latimes.js"} );
			            break;
				case "www.mediaite.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-mediaite.js"} );
			            break;
 			        case "www.nytimes.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-nytimes.js"} );
			            break;
				case "www.sandiegouniontribune.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-latimes.js"} );
			            break;
				case "www.smdailyjournal.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-smjournal.js"} );
			            break;
 			        case "www.theatlantic.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-theatlantic.js"} );
			            break;
 			        case "www.thedailybeast.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-thedailybeast.js"} );
			            break;
 			        case "www.theguardian.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-theguardian.js"} );
			            break;
				case "www.washingtonpost.com":
			            chrome.tabs.executeScript( tabs[0].id,
							   { file: "clear-wapo.js"} );
			            break;
			        default:
				    console.log( "unrecognized : ", tabs[0].url );
			    }
			    this.close();
                     });
  };


/* 
fix icon
*/
