import * as helpers from '../common/helpers.js';

// remove div with class paywall
helpers.removeFirstElementByClassName( "paywall" );

// remove div with class ArticleRoadblock__Container-sc-14g5y47-0
helpers.removeFirstElementByClassName( "ArticleRoadblock__Container-sc-14g5y47-0" );

// put back text
function runEmbedded() {
    // Put here whatever your script needs to do.

    var adds;
    var t;
    var u;

    if ( __NEXT_DATA__.props != null ) {
	adds = __NEXT_DATA__.props.pageProps.articleResponse.data.attributes.body;
    }

    t = document.getElementsByClassName("css-k3zb6l-Paragraph")[0].parentNode;

    // compare what's there (t) and adds - add what's missing

    // i is initialized to where the first adds element that has "content"
    var i = 0;
    for ( ; i < adds.length; i++ ) {
	if ( adds[i].content != null ) {
	    break;
	}
    }	

    var append_pt;

    // u should index into t.children on where to start checking for shown content
    var k;
    var l = 0;
    for ( k = 0; k < t.children.length; k++ ) {
	for ( l = 0; l < t.children[k].classList.length; l++ ) {
	    if ( t.children[k].classList[l] == "css-k3zb6l-Paragraph" ) {
		// k is it
		break;
	    }
	}
	if ( l < t.children[k].classList.length ) {
	    break;
	}
    }
    if ( k < t.children.length ) {
	u = k;
    } else {
	// no paragraphs
	u = 1;
    }

    // compare length
    var dlen = 20;

    // custom - pass in adds[i] and textNode, return true if match or false if not match
    function compareP( pArray, tNode ) {
	// put together pArray text elements
	var pText = pArray.reduce( ( acc, element ) => acc + element.text, "" );
	var clen = Math.min( dlen, pText.length, tNode.textContent.length );
	if  ( tNode.textContent.substr(0,clen) == pText.substr(0,clen) ) {
	    return true;
	}
	else {
	    return false;
	}
    }
    
    // start comparing - advancing adds[i] and t.children/u
    var j;
    var arrayText;
    for ( j = u; j < t.children.length; j++ ) {
	if ( compareP( adds[i].content, t.children[j] )) {
	    i++;
	}
    }

    // append_pt is where to append text; could be complicated 
    append_pt = t;
    
    // put together content from adds[i] and add <p> node

    for ( ; i < adds.length; i++ ) {
	// console.log("here");
	if ( adds[i].type == "paragraph" ) {
	    // console.log("here-text");
	    var text_node = document.createElement("P");
   	    text_node.classList.add( "css-k3zb6l-Paragraph", "e1e4oisd0" );
	    var pText = adds[i].content.reduce( ( acc, element ) => acc + element.text, "" );
	    text_node.innerHTML = pText;
	    append_pt.appendChild(text_node);
	}
	// console.log("exit for loop");
    }
	
}


function embed(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
}

embed(runEmbedded);



