function execScript( tab, content_script ) {
    chrome.scripting.executeScript({
	target: { tabId: tab },
	files: [ content_script ]
    });
}

let cracker = document.getElementById('cracker');

  chrome.storage.sync.get('color', function(data) {
    cracker.style.backgroundColor = data.color;
    cracker.setAttribute('value', data.color);
  });

      cracker.onclick = function(element) {

	  console.log("cracker.onclick");
	  let queryOptions = { active: true, lastFocusedWindow: true };
	  chrome.tabs.query(queryOptions, ([tab]) => {
	      if (chrome.runtime.lastError)
		  console.error(chrome.runtime.lastError);
	      // `tab` will either be a `tabs.Tab` instance or `undefined`.
	      //	      callback(tab)
	      console.log(tab);
	      var url = new URL( tab.url );
	      console.log( url.hostname );
	      switch (url.hostname) {
		  // check
 	      case "www.barrons.com":
		  extScript = "clear-barrons.js";
		  break;
 	      case "www.bizjournals.com":
		  execScript( tab.id, "clear-bizjournals.js" );
		  break;
		  // check
 	      case "www.bloomberg.com":
		  extScript = "clear-bloomberg.js";
		  break;
	      case "www.bostonglobe.com":
		  execScript( tab.id, "clear-bostonglobe.js" );
		  break;
		  // check
	      case "markets.businessinsider.com":
	      case "www.businessinsider.com":
		  execScript( tab.id, "clear-businessinsider.js" );
		  break;
		  // check
	      case "www.chicagotribune.com":
		  execScript( tab.id, "clear-chicagotribune.js" );
		  break;
		  // check
	      case "www.cnbc.com":
		  execScript( tab.id, "clear-cnbc.js" );
		  break;
		  // check
   	      case "www.dailymail.co.uk":
		  execScript( tab.id, "clear-dailymail.js" );
		  break;
		  // check
   	      case "www.deadline.com":
   	      case "deadline.com":
		  execScript( tab.id, "clear-deadline.js" );
		  break;
		  // check
 	      case "*.eater.com":
		  extScript = "clear-eater.js";
		  break;
	      case "www.forbes.com":
		  execScript( tab.id, "clear-forbes.js" );
		  break;
		  // check
	      case "www.foreignpolicy.com":
	      case "foreignpolicy.com":
		  execScript( tab.id, "clear-foreignpolicy.js" );
		  break;
		  // check
	      case "www.fortune.com":
	      case "fortune.com":
		  execScript( tab.id, "clear-fortune.js" );
		  break;
		  // check
	      case "www.foxbusiness.com":
		  execScript( tab.id, "clear-foxbusiness.js" );
		  break;
		  // check
	      case "www.haaretz.com":
		  execScript( tab.id, "clear-haaretz.js" );
		  break;
		  // check
	      case "www.houstonchronicle.com":
		  execScript( tab.id, "clear-sfchronicle.js" );
		  break;
		  // check
	      case "www.latimes.com":
		  execScript( tab.id, "clear-latimes.js" );
		  break;
		  // check
	      case "www.mediaite.com":
		  execScript( tab.id, "clear-mediaite.js" );
		  break;
		  // check
	      case "www.messari.io":
	      case "messari.io":
		  execScript( tab.id, "clear-messari.js" );
		  break;
		  // check
	      case "www.metro.co.uk":
	      case "metro.co.uk":
		  execScript( tab.id, "clear-metroco.js" );
		  break;
		  // check
 	      case "www.nationalgeographic.com":
		  execScript( tab.id, "clear-nationalgeographic.js" );
		  break;
		  // check
	      case "www.nbcnews.com":
		  execScript( tab.id, "clear-nbcnews.js" );
		  break;
		  // check
 	      case "www.newyorker.com":
		  execScript( tab.id, "clear-newyorker.js" );
		  break;
		  // check
 	      case "www.nymag.com":
 	      case "nymag.com":
		  execScript( tab.id, "clear-nymag.js" );
		  break;
		  // check
 	      case "www.nytimes.com":
 	      case "cooking.nytimes.com":
		  extScript = "clear-nytimes.js";
		  break;
 	      case "www.outsideonline.com":
		  extScript = "clear-outsideonline.js";
		  break;
	      case "www.rappler.com":
		  execScript( tab.id, "clear-rappler.js" );
		  break;
		  // check
	      case "www.reuters.com":
		  execScript( tab.id, "clear-reuters.js" );
		  break;
		  // check
	      case "www.sandiegouniontribune.com":
		  execScript( tab.id, "clear-latimes.js" );
		  break;
		  // check
	      case "www.scmp.com":
		  execScript( tab.id, "clear-scmp.js" );
		  break;
		  // check
	      case "www.seekingalpha.com":
	      case "seekingalpha.com":
		  execScript( tab.id, "clear-seekingalpha.js" );
		  break;
		  // check
	      case "www.sfchronicle.com":
		  execScript( tab.id, "clear-sfchronicle.js" );
		  break;
	      case "slate.com":
	      case "www.slate.com":
		  execScript( tab.id, "clear-slate.js" );
 		  break;
	      case "www.smdailyjournal.com":
		  execScript( tab.id, "clear-smjournal.js" );
		  break;
		  // check
	      case "www.star-telegram.com":
		  execScript( tab.id, "clear-startelegram.js" );
		  break;
		  // check
	      case "www.theatlantic.com":
		  execScript( tab.id, "clear-theatlantic.js" );
		  break;
		  // check
	      case "www.thedailybeast.com":
		  execScript( tab.id, "clear-thedailybeast.js" );
		  break;
		  // check
 	      case "www.theguardian.com":
		  execScript( tab.id, "clear-theguardian.js" );
		  break;
		  // check
 	      case "www.theintercept.com":
 	      case "theintercept.com":
		  execScript( tab.id, "clear-theintercept.js" );
		  break;
		  // check
 	      case "www.vanityfair.com":
		  execScript( tab.id, "clear-vanityfair.js" );
		  break;
		  // check
	      case "www.washingtonpost.com":
		  execScript( tab.id, "clear-wapo.js" );
		  break;
	      default:
		  console.log( "unrecognized : ", tabs[0].url );
	      }
	      chrome.tabs.sendMessage(tab.id, { action: "callCrackerScript", scriptName: extScript }, (response) => {
		  if (chrome.runtime.lastError) {
		      console.error("Error:", chrome.runtime.lastError.message);
		  } else {
		      console.log("Response from content script:", response.status);
		  }
	      });
          });
      };


/*
  case "www.eastbaytimes.com":
		  execScript( tab.id, "clear-eastbaytimes.js" );
		  break;

  case "www.sfgate.com":
		  execScript( tab.id, "clear-sfgate.js" );
		  break;

  case "www.sltrib.com":
		  execScript( tab.id, "clear-sltrib.js" );
		  break;

*/
