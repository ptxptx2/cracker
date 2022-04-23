// v1

function runEmbedded() {
    // Put here whatever your script needs to do. 
    // get sections to add
    doc = document.getElementsByClassName("Mobiledoc");
    adds = window.__INITIAL_STATE__.body.sections;
    if ( adds != null ) {
	for (i=3; i < adds.length; i++) {
	    if (adds[i].length >= 3) {
		var node = document.createElement(adds[i][1]);
    		var all_text = ''
		for (j=0; j<adds[i][2].length; j++) {
    		    all_text = all_text.concat( adds[i][2][j][3] );
    		    all_text = all_text.concat( ' ' ); 
    		}
    		var textnode = document.createTextNode(all_text);
    		node.appendChild(textnode);
    		doc[0].appendChild(node);
	    }
	}
    }
}

function embed(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
}

// remove Body__paywall-container
d = document.getElementsByClassName("Body__paywall-container");
if ( d != null && d.length > 0 ) {
    d[0].parentNode.removeChild(d[0]);
    embed(runEmbedded);
}

// v2
// remove checkout-container
helpers.removeElementById("checkout-container");
helpers.removeElementById("bottom_ribbon_modal_wrapper");

// body to overflow
d = document.getElementsByTagName("BODY");
if ( d != null && d.length != 0) {
    d[0].style.overflow = "auto";
}

// v3
helpers.removeElementById("bottom_ribbon_modal_expand_wrapper");
helpers.removeClassNameFromFirstElement( "is-locked", "MAIN" );
