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
    t = document.getElementsByClassName("css-53u6y8")[0];

    // compare what's there (t) and adds - add what's missing

    // i is initialized to where the first adds element that has "content"
    var i = 0;
//    for ( ; i < adds.length; i++ ) {
//	if ( adds[i].content != null ) {
//	    break;
//	}
//    }	

    var append_pt;

    // figure out where to append it
    
    append_pt = t;
    
    // go through other article text to be added

    // skip first 2 entries where adds[i].__typename = "ParagraphBlock"
    //var paragraph_cnt = 0;
    //for ( ; i < adds.length; i++ ) {
//	if ( adds[i].__typename == "ParagraphBlock" ) {
//	    paragraph_cnt++;
//	    if ( paragraph_cnt == 2 ) {
//		break;
//	    }
//	}
//    }

    // add any adds[i].__typename = "ParagraphBlock"
    // progress to first ParagraphBlock
//    for ( ; i < adds.length; i++ ) {
//	if ( adds[i].__typename == "ParagraphBlock" ) {
//	    break;
//	}
//    }
    
    // compare text to see where in adds to start appending
    var dlen = 20;
    for ( var j = 0; j < t.children.length; j++ ) {
	if ( t.children[j].nodeName == "P" ) {
	    // find first possible ParagraphBlock to add
	    for ( ; i < adds.length; i++ ) {
		if ( adds[i].__typename == "ParagraphBlock" ) {
		    break;
		}
	    }
	    // compare ParagraphBlock to t.children[j].text
	    var clen = Math.min( dlen, adds[i].content[0].text.length, t.children[j].textContent.length );
	    if ( adds[i].content[0].text.substr(0,clen) == t.children[j].textContent.substr(0,clen) ) {
		// skip if already there
		i++;
	    }
	    else {
		break;
		// assume start adding at i - possibly not have gone through all of t.children
	    }
	}
    }
    
    // does not deal with adds[x].content[y].format?
    
    for ( ; i < adds.length; i++ ) {
	// console.log("here");
	if ( adds[i].__typename == "ParagraphBlock" ) {
	// console.log("here-text");
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

