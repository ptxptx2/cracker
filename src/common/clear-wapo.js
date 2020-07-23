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
    if ( (d[i].src.indexOf( 'www.washingtonpost.com/subscribe' ) != -1 ) )  {
	e = d[i].parentElement;
	e.parentNode.removeChild(e);	
	// do it once
	break;
   }
}

// remove paywall
var g = null;
g = document.getElementById("paywall-default");
if ( g != null ) {
    g.parentNode.removeChild(g);	
}
else {
    g = document.getElementsByClassName("paywall-overlay")
    if ( g != null ) {
	g[0].parentNode.removeChild(g[0])
    }
    else {
	g = document.getElementById("__next");
	if ( g == null ) {
	    g = document.getElementById("fusion-app");
	}    
	if ( g != null ) {
	    for ( i = 0; i < g.children.length; i++ ) {
		p = g.children[i];
		if ( p.getAttribute("data-qa") != null && p.getAttribute("data-qa").indexOf('paywall') != -1 ) {
		    p.parentNode.removeChild(p);	
		    // do it once
		    break;
		}
		for ( j = 0; j < p.children.length; j++ ) {
		    q = p.children[j];
 		    for ( k = 0; k < q.children.length; k++ ) {
			r = q.children[k];
			if ( r.getAttribute("id") != null ) {
			    if (r.id.indexOf('paywall') != -1 ) {
				r.parentNode.removeChild(r);
				// do it once
				break;
			    }
			}
		    }
		}
	    }
	}
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
    if ( window.Fusion.globalContent != null ) {
	adds = window.Fusion.globalContent.content_elements;
    }
    else {
	adds = __NEXT_DATA__.props.pageProps.globalContent.content_elements;
    }
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
	    text_node.classList.add( "font--body", "font-copy",  "color-gray-darkest", "ma-0", "pb-md" );
	    div_node.appendChild(text_node);
	    t.appendChild(div_node);
	}
	else if ( adds[i].type == "raw_html" ) {
            var div_node = document.createElement("DIV");
	    var html_node = document.createElement("DIV");
	    html_node.innerHTML = adds[i].content;
	    div_node.appendChild(html_node);
	    t.appendChild(div_node);
	}
	else if ( adds[i].type == "image" ) {
            var div_node = document.createElement("DIV");
            var fig_node = document.createElement("FIGURE");
	    var img_node = document.createElement("IMG");
            var fig_caption_node = document.createElement("FIGCAPTION");
            fig_node.classList.add("center", "mb-md", "ml-neg-gutter", "mr-neg-gutter", "ml-auto-ns", "mr-auto-ns", "hide-for-print");
            if ( adds[i].resized_urls != null ) {
		img_node.src = adds[i].resized_urls.large;
	    }
	    else {
		img_node.src = adds[i].url;
	    }
	    if ( adds[i].caption != null ) {
		img_node.alt = adds[i].caption;
	    }
            img_node.width = adds[i].width;
            img_node.classList.add("mw-100");
            fig_node.appendChild(img_node);
            fig_caption_node.classList.add("left", "ml-gutter", "mr-gutter", "mr-auto-ns", "ml-auto-ns", "gray-dark", "font--subhead", "font-xxxs", "mt-xs", "mb-sm");
	    if ( adds[i].caption != null ) {
		fig_caption_node.innerHTML = adds[i].caption;
	    }
            fig_node.appendChild(fig_caption_node);
            div_node.appendChild(fig_node);
            t.appendChild(div_node);
	}
//	else if ( adds[i].type == "video" ) {
//	    
//	}
	else if ( adds[i].type == "header" ) {
            var div_node = document.createElement("DIV");
	    var text_node = document.createElement("H3");
	    text_node.innerHTML = adds[i].content;
//    	    var the_text = document.createTextNode(adds[i].content);
//    	    text_node.appendChild(the_text);
	    text_node.classList.add( "font--body", "font-copy",  "color-gray-darkest", "ma-0", "pad-bottom-md",  "undefined" );
	    div_node.appendChild(text_node);
	    t.appendChild(div_node);
	}
	else if ( adds[i].type == "oembed_response-prev" ) {
	    var div_node = document.createElement("DIV");
	    var oembed_node = document.createElement("DIV");
	    if ( adds[i].subtype == "twitter" ) {
		// <div data-oembed-type="twitter" class="">
		oembed_node.setAttribute( "data-oembed-type", adds[i].subtype );
		// <twitter-widget class="twitter-tweet twitter-tweet-rendered" id="twitter-widget-0" style="position: static; visibility: visible; display: block; transform: rotate(0deg); max-width: 100%; width: 500px; min-width: 220px; margin-top: 10px; margin-bottom: 10px;" data-tweet-id="408983789830815744">
		// </twitter-widget>
		var twitter_node = document.createElement("TWITTER-WIDGET")
		twitter_node.classList.add( "twitter-tweet", "twitter-tweet-rendered" );
		twitter_node.setAttribute( "id", "twitter-widget-0" );

		twitter_node.innerHTML = adds[i].html;

// <script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
	    }
	    oembed_node.appendChild(twitter_node);
	    div_node.appendChild(oembed_node);
	    t.appendChild(div_node);
	}
	else if ( adds[i].type == "oembed_response" ) {
	    
	    // "<blockquote class="twitter-tweet">
	    //		<p lang="en" dir="ltr"> Tesla stock price is too high imo</p>&mdash; Elon Musk (@elonmusk) <a href="https://twitter.com/elonmusk/status/1256239815256797184?ref_src=twsrc%5Etfw">May 1, 2020</a>
	    // </blockquote>
// <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
// "

	    var bq_node = document.createElement("DIV");
	    bq_node.innerHTML = adds[i].raw_oembed.html
    
	    t.appendChild(bq_node);
	    window.twttr.widgets.load( bq_node );
	}
		
    }
    var oUrl = document.querySelector("meta[property='og:url']").getAttribute("content");
    window.history.pushState("","", oUrl);
//    window.twittr.widgets.load();
}


function embed(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
}

embed(runEmbedded);



