import * as helpers from '../common/helpers.js';

// remove gateway-content
helpers.removeElementById("gateway-content");

// remove gateway_outer_wrapper
helpers.removeFirstElementByClassName("gateway_outer_wrapper");

// remove fade
helpers.removeFirstElementByClassName("css-gx5sib");

// allow scroll
var a = document.getElementsByClassName("css-mcm29f");
if ( a != null && a[0] != null ) {
    a[0].style.overflow = "scroll";
    // remove black stripe
    a = document.getElementsByClassName("css-1bd8bfl");
    if ( a != null && a[0] != null ) {
	a[0].style.visiblity = "hidden";
	a[0].style.display = "none";
    }
}


// set site-content to position:static
var d = document.getElementById("site-content");
if ( d != null ) {
    d.style.position = 'static';
}

// remove extra continue button
// pl = document.getElementsByClassName("css-ujhzpp-form-Form");
// pl[0].parentNode.removeChild(pl[0]);
// pl = document.getElementsByClassName("css-ujhzpp-form-Form");
// pl[0].parentNode.removeChild(pl[0]);


// using Array.prototype.filter, to filter the elements returned by
// 'document.querySelectorAll()'
var nl = document.querySelectorAll('[id*=newsletter]');
var i;
for ( i=0; i<nl.length; i++ ) {
    nl[i].parentNode.removeChild(nl[i]);
};

// for cooking.nytimes.com

// clear element with class nytc---growler---container
helpers.removeFirstElementByClassName("nytc---modal-window---windowContainer");

// remove tag = html, class = nytc---modal-window---noScroll
helpers.removeClassNameFromFirstElement("nytc---modal-window---noScroll", "HTML" );

// remove tag = body, class = nytc---modal-window---noScroll
helpers.removeClassNameFromFirstElement("nytc---modal-window---noScroll", "BODY" );

// remove expanded message window
helpers.removeClassNameFromFirstElement("expanded", "DIV");

// put back text
function runEmbedded() {
    // Put here whatever your script needs to do.

    var adds;
    var t;
    var u;

    if ( window.__preloadedData.initialData.data.article.sprinkledBody.content != null ) {
	adds = window.__preloadedData.initialData.data.article.sprinkledBody.content;
    }
    
    // adjusted to find other article-body
    // some articles have multiple grid-body class so not reliable; grid-article is 0 or 1;
    // so t should just be one up from teaser content
    t = document.getElementsByClassName("css-53u6y8");

    // compare what's there (t) and adds - add what's missing

    // i is initialized to where the first adds element that has "content"
    var i = 0;
//    for ( ; i < adds.length; i++ ) {
//	if ( adds[i].content != null ) {
//	    break;
//	}
//    }	

    var append_pt = null;

    // figure out where to append it
    
    // go through other article text to be added

    // compare text to see where in adds to start appending
    var dlen = 20;
    var escape = 0;
    var j, k;
    for ( k = 0; k < t.length; k++ ) {
	for ( j = 0; j < t[k].children.length; j++ ) {
	    // keep going until there's no more evys1bk0 class (first one that's not)
	    if ( t[k].children[j].nodeName == "P" ) {
		if ( !t[k].children[j].className.includes("evys1bk0") ) {
		    append_pt = t[k].children[j-1];
		    escape = 1;
		    break;
		}
		// find first possible ParagraphBlock to add
		for ( ; i < adds.length; i++ ) {
		    if ( adds[i].__typename == "ParagraphBlock" ) {
			break;
		    }
		}
		// compare ParagraphBlock to t.children[j].text
		var clen = Math.min( dlen, adds[i].content[0].text.length, t[k].children[j].textContent.length );
		if ( adds[i].content[0].text.substr(0,clen) == t[k].children[j].textContent.substr(0,clen) ) {
		    // skip if already there
		    i++;
		}
		else {
		    escape = 1;
		    break;
		    // assume start adding at i - possibly not have gone through all of t.children
		}
	    }
	}
	console.log( k, j );
	if ( escape == 1 ) {
	    console.log( 'escape');
	    break;
	}
    }

    // set append_pt if it's at the end of t.children
    if ( append_pt == null ) {
	append_pt = t[k-1].children[j-1];
    }
    
    // does not deal with adds[x].content[y].format?

    // add extra line if not escaped
    for ( ; i < adds.length; i++ ) {
	if ( adds[i].__typename == "ParagraphBlock" ) {
	    // put extra spacing
	    if ( !escape ) {
		var text_node = document.createElement("P");
		text_node.classList.add( "css-at9mc1" );
		append_pt.appendChild(text_node);
		escape = 1;
	    }
	    var text_node = document.createElement("P");
	    for ( var j = 0; j < adds[i].content.length; j++ ) {
		
		text_node.innerHTML = text_node.innerHTML + adds[i].content[j].text;
	    }
   	    text_node.classList.add( "css-at9mc1", "evys1bk0" );
	    append_pt.appendChild(text_node);
	}
    }
	
}


function embed(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
}

embed(runEmbedded);

