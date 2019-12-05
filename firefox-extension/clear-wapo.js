// we dig deeper ad

// remove iframe div
var d = document.getElementsByTagName("IFRAME");
for ( i = 0; i < d.length; i++ ) {
    if ( (d[i].src.indexOf( 'subscribe.washingtonpost.com' ) != -1 ) ) {
	e = d[i].parentElement.parentElement;
	e.parentNode.removeChild(e);	
	// do it once
	break;
    }
}

// html and body - remove position style and overlfow style
var d = document.getElementsByTagName("BODY");
d[0].style.overflow = "scroll";
d[0].style.position = "static";
d[0].parentElement.style.overflow = "scroll";


// put back text
function runEmbedded() {
    // Put here whatever your script needs to do.
    adds = window.Fusion.globalContent.content_elements;
    t = document.getElementsByClassName("teaser-content")[0].children[0];

    // skip text already there
    var j = 0;
    for ( i = 0; j < t.children.length; i++ ) {
	if (adds[i].type == "text" ) {
	    j++;
	}
    }
    for ( ; i < adds.length; i++ ) {
	if ( adds[i].type == "text" ) {
            var div_node = document.createElement("DIV");
	    var text_node = document.createElement("P");
	    text_node.innerHTML = adds[i].content;
//    	    var the_text = document.createTextNode(adds[i].content);
//    	    text_node.appendChild(the_text);
	    text_node.classList.add( "font--body", "font-copy",  "color-gray-darkest", "ma-0", "pad-bottom-md",  "undefined" );
	    div_node.appendChild(text_node);
	    t.appendChild(div_node);
	}
    }
    var oUrl = document.querySelector("meta[property='og:url']").getAttribute("content");
    window.history.pushState("","", oUrl);
}


function embed(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
}

embed(runEmbedded);

