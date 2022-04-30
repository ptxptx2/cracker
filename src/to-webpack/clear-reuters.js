import * as helpers from '../common/helpers.js';

// remove div with class=article-limit-wall__article-limit-wall-wrapper__3FE3N

// remove iframe div

// remove div class=ArticleLimitWall__article-limit-wall-wrapper__KYEhc article-body__limit-wall__3PXu_


// put back text
function runEmbedded() {
    // Put here whatever your script needs to do.

    var adds;
    var t;
    var i;
    var j;

    if ( window.Fusion.globalContent != null ) {
	adds = window.Fusion.globalContent.result.content_elements;
    }
    t = document.getElementsByClassName("paywall-article")[0];

    // assume always first paragraph displayed already
    i = 1;
    j = 1;

    for ( ; i < adds.length; i++ ) {
	if ( adds[i].type == "paragraph" ) {
	    var text_node = document.createElement("P");
	    text_node.innerHTML = adds[i].content;
	    text_node.classList.add( "text__text__1FZLe", "text__dark-grey__3Ml43", "text__regular__2N1Xr", "text__large__nEccO", "body__base__22dCE", "body__large_body__FV5_X", "article-body__element__2p5pI" );
	    t.appendChild(text_node);
	}
    }

}


function embed(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
}

embed(runEmbedded);



