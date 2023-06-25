export function master_switch2() {
    (async () => {
	console.log(document.location.host);
	var hostname = document.location.host;

	// everything in master-lib.js
	/*
	let run_script = "master-lib.js";
	const src = chrome.runtime.getURL(run_script);
	console.log( src );
	let cMain = await import(src);
	let run_f = determine_function(hostname,cMain);
	run_f();
	*/

	// load only the script that's needed
	let run_script = determine_script(hostname);
	const src = chrome.runtime.getURL(run_script);
	console.log( src );
	let cMain = await import(src);
	cMain.main_clear()();
	
    })();
};


export function master_switch(tab) {
    // based on tab, get host
    let hostname = (new URL(tab.url)).hostname;
    console.log("inside master_switch");
    // console.log(tab);
    // console.log(tab.url);
    console.log(hostname);
    // find script to execute
    let run_script = determine_script(hostname);
    // run script
    chrome.scripting.executeScript({
	    target: { "tabId": tab.id },
	    files: [run_script]
    });
    // this.close();
};

// how to have one function that is called from both popup.js and content_script 

/*
      console.log(
           "Is chrome.runtime available here?",
               typeof chrome.runtime.sendMessage == "function",
  );
*/


// determine script to import based on host

function determine_script(host) {
    // console.log("inside determine_script");
    switch (host) {
    case "www.bizjournals.com":
	return( "clear-bizjournals.js" );
	break;
    case "www.bloomberg.com":
	return( "clear-bloomberg.js" );
	break;
    case "www.bostonglobe.com":
	return( "clear-bostonglobe.js" );
	break;
    case "markets.businessinsider.com":
    case "www.businessinsider.com":
	return( "clear-businessinsider.js" );
	break;
    case "www.eastbaytimes.com":
	return( "clear-eastbaytimes.js" );
	break;
    case "www.forbes.com":
	return( "clear-forbes.js" );
	break;
    case "www.foreignpolicy.com":
    case "foreignpolicy.com":
	return( "clear-foreignpolicy.js" );
	break;
    case "www.fortune.com":
    case "fortune.com":
	return( "clear-fortune.js" );
	break;
    case "www.foxbusiness.com":
	return( "clear-foxbusiness.js" );
	break;
    case "www.houstonchronicle.com":
	return( "clear-sfchronicle.js" );
	break;
    case "www.latimes.com":
	return( "clear-latimes.js" );
	break;
    case "www.mediaite.com":
	return( "clear-mediaite.js" );
	break;
    case "www.messari.io":
    case "messari.io":
	return( "clear-messari.js" );
	break;
    case "www.metro.co.uk":
    case "metro.co.uk":
	return( "clear-metroco.js" );
	break;
    case "www.nationalgeographic.com":
	return( "clear-nationalgeographic.js" );
	break;
    case "www.nbcnews.com":
	return( "clear-nbcnews.js" );
	break;
    case "www.newyorker.com":
	return( "clear-newyorker.js" );
	break;
    case "www.nytimes.com":
    case "cooking.nytimes.com":
	return( "clear-nytimes.js" );
	break;
    case "www.reuters.com":
	return( "clear-reuters.js" );
	break;
    case "www.sandiegouniontribune.com":
	return( "clear-latimes.js" );
	break;
    case "www.scmp.com":
	return( "clear-scmp.js" );
	break;
    case "www.sfchronicle.com":
	return( "clear-sfchronicle.js" );
	break;
    case "www.sfgate.com":
	return( "clear-sfgate.js" );
	break;
    case "slate.com":
    case "www.slate.com":
	return( "clear-slate.js" );
 	break;
    case "www.sltrib.com":
	return( "clear-sltrib.js" );
	break;
    case "www.smdailyjournal.com":
	return( "clear-smjournal.js" );
	break;
    case "www.star-telegram.com":
	return( "clear-startelegram.js" );
	break;
    case "www.theatlantic.com":
	return( "clear-theatlantic.js" );
	break;
    case "www.thedailybeast.com":
	return( "clear-thedailybeast.js" );
	break;
    case "www.theguardian.com":
	return( "clear-theguardian.js" );
	break;
    case "www.theintercept.com":
    case "theintercept.com":
	return( "clear-theintercept.js" );
	break;
    case "www.vanityfair.com":
	return( "clear-vanityfair.js" );
	break;
    case "www.washingtonpost.com":
	return( "clear-wapo.js" );
	break;
    default:
	return("noscript");
    }
}

function determine_function(host,cMain) {
    switch (host) {
    case "www.bizjournals.com":
	return cMain.clear_bizjournals();
    case "www.bloomberg.com":
	return cMain.clear_bloomberg();
    case "www.bostonglobe.com":
	return cMain.clear_bostonglobe();
    case "markets.businessinsider.com":
    case "www.businessinsider.com":
	return cMain.clear_businessinsider();
    case "www.eastbaytimes.com":
	return cMain.clear_eastbaytimes();
    case "www.forbes.com":
	return cMain.clear_forbes();
    case "www.foreignpolicy.com":
    case "foreignpolicy.com":
	return cMain.clear_foreignpolicy();
    case "www.fortune.com":
    case "fortune.com":
	return cMain.clear_fortune();
    case "www.houstonchronicle.com":
	return cMain.clear_sfchronicle();
    case "www.latimes.com":
	return cMain.clear_latimes();
    case "www.mediaite.com":
	return cMain.clear_mediaite();
    case "www.messari.io":
    case "messari.io":
	return cMain.clear_messari();
    case "www.metro.co.uk":
    case "metro.co.uk":
	return cMain.clear_metroco();
    case "www.nationalgeographic.com":
	return cMain.clear_nationalgeographic();
    case "www.nbcnews.com":
	return cMain.clear_nbcnews();
    case "www.newyorker.com":
	return cMain.clear_newyorker();
    case "www.nytimes.com":
    case "cooking.nytimes.com":
	return cMain.clear_nytimes();
    case "www.reuters.com":
	return cMain.clear_reuters();
    case "www.sandiegouniontribune.com":
	return cMain.clear_latimes();
    case "www.scmp.com":
	return cMain.clear_scmp();
    case "www.sfchronicle.com":
	return cMain.clear_sfchronicle();
    case "www.sfgate.com":
	return cMain.clear_sfgate();
    case "slate.com":
    case "www.slate.com":
	return cMain.clear_slate();
    case "www.sltrib.com":
	return cMain.clear_sltrib();
    case "www.smdailyjournal.com":
	return cMain.clear_smjournal();
    case "www.star-telegram.com":
	return cMain.clear_startelegram();
    case "www.theatlantic.com":
	return cMain.clear_theatlantic();
    case "www.thedailybeast.com":
	return cMain.clear_thedailybeast();
    case "www.theguardian.com":
	return cMain.clear_theguardian();
    case "www.theintercept.com":
    case "theintercept.com":
	return cMain.clear_theintercept();
    case "www.vanityfair.com":
	return cMain.clear_vanityfair();
    case "www.washingtonpost.com":
	return cMain.clear_wapo();
    default:
	return null;
    }
}

