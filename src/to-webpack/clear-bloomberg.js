import * as helpers from '../common/helpers.js';

// remove reg-ui-client

if ( !helpers.removeElementById("reg-ui-client") ) {
}    

// remove sign-in-gate

if ( !helpers.removeElementById("fortress-paywall-container-root") ) {
}    

/* 
var d = document.getElementsByClassName("article-content");
if ( d[0] != null ) {
    // iterate over divs of d to remove blur class
    for ( var i = 0; i < d[0].children.length; i++ ) {
	var e = d[0].children[i];
	if ( e.getAttribute("class") != null && e.getAttribute("class").indexOf('blur') != -1 ) {
	    e.classList.remove("blur");
	    break;
	}
    }
}

d = document.getElementsByTagName("body");
if ( d != null ) {
    for ( i = 0; i<d.length; i++) {
	if ( d[i].getAttribute("data-paywall-overlay-status") != null ) {
	    d[i].setAttribute("data-paywall-overlay-status",  "hide" );
	    break;
	}
    }
}

// take content and put in html
// 55 is ArticleBody
var db = "";
var db2 = "";
d = document.getElementsByTagName("script");
if ( d != null ) {
    for (i=0; i<d.length; i++) {
	console.log(i, d[i].getAttribute("data-component-props"));
	if ( d[i].getAttribute("data-component-props") == "ArticleBody" ) {
	    // console.log(i, JSON.parse(d[i].getInnerHTML()).body );
	    db = JSON.parse(d[i].getInnerHTML())
	    if ( db != null ) {
		db2 = db.body;
		if ( db2 == null ) {
		    db2 = db.story.body;
		}
	    }		
	    break;
	}
    }
}


// db2 is the complete article

// copy to article body 1
if (false) {
d = document.getElementsByTagName("div");
if ( d != null ) {
    for (i=0; i<d.length; i++) {
	// console.log(i, f[i].getAttribute("data-component-root"));
	if ( d[i].getAttribute("data-component-root") != null && d[i].getAttribute("data-component-root") == "ArticleBody" ) {
	    var div_node = document.createElement("DIV");
	    div_node.classList.add( "body-copy-v2");
	    div_node.innerHTML = db2;
	    d[i].appendChild(div_node);
	    break;
	}
    }
}
}
*/

/*
// copy to article body 2
d = document.getElementsByClassName("body-content");

// get rid of existing children there before putting in all of db2

if (d.length > 0) {
    for ( var i=d[0].children.length; i > 0; i-- ) {
	d[0].removeChild(d[0].children[i-1]);
    }

    var div_node = document.createElement("P");
    div_node.classList.add( "cracker");
    div_node.innerHTML = db2;
    d[0].appendChild(div_node);
}

// need to set all <P> inside class "cracker" to have bottom margin at 24px
var p_start = document.getElementsByClassName("cracker");
if ( p_start != null && p_start[0] != null ) {
    for ( var i = 0; i < p_start[0].childNodes.length; i++) {
	if ( p_start[0].childNodes[i].tagName == "P" ) {
	    p_start[0].childNodes[i].style.margin = "24px 0";
	}
    }
}
*/

/*
// remove blur - by removing class "nearly-transparent-text-blur__84099cbc"

//d = document.getElementsByClassName("nearly-transparent-text-blur__84099cbc");
//d[0].classList.remove("nearly-transparent-text-blur__84099cbc");
helpers.removeClassNameFromElementsByClassName( "nearly-transparent-text-blur__84099cbc", "nearly-transparent-text-blur__84099cbc" );

// add to <body> style="overflow: scroll"
d = document.getElementsByTagName("body");
if ( d != null ) {
    d[0].style.overflow = "scroll";
}
*/

/* 
// find img and load higher resolution version
var d = document.getElementsByClassName("lazy-img__image");
if ( d != null ) {
    var newsrc;
    for ( var i = 0; i < d.length; i++ ) {
	if ( d[i].src.includes("60x-1") ) {
	    newsrc = d[i].src.replace("60x-1", "640x-1");
	} else {
	    newsrc = d[i].src.replace("150x-1", "640x-1");
	}
	d[i].src = newsrc;
    }
}
*/

// helpers.removeClassNameFromElementsByClassName( "lazy-img__image", "lazy-img__image");

helpers.removeClassNameFromElementsByClassNamePattern( "body-content", "styles_articleBlur_" );
helpers.removeClassNameFromElementsByClassNamePattern( "styles_body__G_0n2", "styles_articleBlur_" );

// put back text
function runEmbedded() {
    // Put here whatever your script needs to do.

    var adds;
    var t;
    var u;

    if ( __NEXT_DATA__.props != null ) {
	adds = __NEXT_DATA__.props.pageProps.story.body.content;
    }
    
    // adjusted to find other article-body
    // t = document.getElementsByClassName("grid-body")[0]
    // some articles have multiple grid-body class so not reliable; grid-article is 0 or 1;
    // so t should just be one up from teaser content
    t = document.getElementsByClassName("teaser-content")[0].parentNode;

    // compare what's there (t) and adds - add what's missing

    // i is initialized to where the first adds element that has "content"
    var i = 0;
    for ( ; i < adds.length; i++ ) {
	if ( adds[i].content != null ) {
	    break;
	}
    }	

    var append_pt;
    var i_orig;

    // get teaser-content, then go through article-body there and offset adds
    var k;
    for ( k = 0; k < t.children.length; k++ ) {
	for ( var l = 0; l < t.children[k].classList.length; l++ ) {
	    if ( t.children[k].classList[l] == "teaser-content" ) {
		// k is it
		break;
	    }
	}
	if ( l < t.children[k].classList.length ) {
	    break;
	}
    }
    if ( k < t.children.length ) {
	u = t.children[k];
    } else {
	// no teaser-content
	u = t.children[1];
    }
    // at this point, u should be teaser-content

    for ( j = 0; j < u.children.length; j++ ) {
	// if t.children[j]."data-qa" != 'subscribe-promo' then count
	if ( u.children[j].children[0] && u.children[j].children[0].getAttribute("data-qa") != "subscribe-promo" ) {
	    i++;
	}
    }

    // if no subscribe-promo....
    
    append_pt = u.children[j-1];
    
    // go through other article body that's not in teaser-content - find matching adds content
    // start at t.children[3]; t.children[2] is an empty div
    i_orig = i;
    for ( j = 3; j < t.children.length; j++ ) {
	// if not article-body, skip
	// if t.children[j]."data-qa" != 'subscribe-promo' then count
	if ( t.children[j] && t.children[j].getAttribute("data-qa") == "article-body" ) {
	    if ( t.children[j].children[0].getAttribute("data-qa") != "subscribe-promo" ) {
		i++;
	    }
	}
    }
    // if there are any article-body found
    if ( i_orig != i ) {
	append_pt = t;
    }
    // how about end of article-body vs some other elements - need to insert !!
    // currently only works if 0 article-body outside of teaser-content OR all content is there in article-body

    for ( ; i < adds.length; i++ ) {
	// console.log("here");
	if ( adds[i].type == "text" ) {
	// console.log("here-text");
            var div_node = document.createElement("DIV");
	    var text_node = document.createElement("P");
	    //	    div_node.classList.add( "w-700", "mr-auto-ns", "ml-auto-ns" );
   	    div_node.classList.add( "article-body", "grid-center", "grid-body" );
	    text_node.innerHTML = adds[i].content;
//    	    var the_text = document.createTextNode(adds[i].content);
//    	    text_node.appendChild(the_text);
	    text_node.classList.add( "font--body", "font-copy",  "color-gray-darkest", "ma-0", "pb-md" );
	    div_node.appendChild(text_node);
	    append_pt.appendChild(div_node);
	}
	else if ( adds[i].type == "raw_html" ) {
	// console.log("here-raw_html");
            var div_node = document.createElement("DIV");
	    var html_node = document.createElement("DIV");
	    html_node.innerHTML = adds[i].content;
	    Array.from(html_node.querySelectorAll("script")).forEach( oldScript => {
		const newScript = document.createElement("script");
		Array.from(oldScript.attributes).forEach( attr => newScript.setAttribute(attr.name, attr.value) );
		newScript.appendChild(document.createTextNode(oldScript.innerHTML));
		oldScript.parentNode.replaceChild(newScript, oldScript);
	    })
	    // html_node.innerHTML = adds[i].content;
	    div_node.appendChild(html_node);
	    append_pt.appendChild(div_node);
	    
	}
	else if ( adds[i].type == "image" ) {
	// console.log("here-image");
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
            append_pt.appendChild(div_node);
	}
//	else if ( adds[i].type == "video" ) {
//	    
//	}
	else if ( adds[i].type == "header" ) {
	// console.log("here-header");
            var div_node = document.createElement("DIV");
	    var text_node = document.createElement("H3");
	    text_node.innerHTML = adds[i].content;
//    	    var the_text = document.createTextNode(adds[i].content);
//    	    text_node.appendChild(the_text);
	    text_node.classList.add( "font--body", "font-copy",  "color-gray-darkest", "ma-0", "pad-bottom-md",  "undefined" );
	    div_node.appendChild(text_node);
	    append_pt.appendChild(div_node);
	}
	else if ( adds[i].type == "oembed_response-prev" ) {
	// console.log("here-oembed-rp");
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

		// <script oasync="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
	    }
	    oembed_node.appendChild(twitter_node);
	    div_node.appendChild(oembed_node);
	    append_pt.appendChild(div_node);
	}
	else if ( adds[i].type == "oembed_response" ) {
	// console.log("here-oembed-response");	    
	    // "<blockquote class="twitter-tweet">
	    //		<p lang="en" dir="ltr"> Tesla stock price is too high imo</p>&mdash; Elon Musk (@elonmusk) <a href="https://twitter.com/elonmusk/status/1256239815256797184?ref_src=twsrc%5Etfw">May 1, 2020</a>
	    // </blockquote>
// <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
// "

	    var bq_node = document.createElement("DIV");
	    bq_node.innerHTML = adds[i].raw_oembed.html + "<BR><BR>"
    
	    append_pt.appendChild(bq_node);
	    try {
		window.twttr.widgets.load( bq_node );
	    }
	    catch (err) {
	    }
	    
	}
		
	else if ( adds[i].type == "oembed_response-new" ) {
	// console.log("here-oembed-rp_new");	    
	    
	    // <div className="mw-99 flex justify-center mb-sm">
                // <AmpOembed rawOembed={rawOembed} subtype={subtype} />
                // </div>

	    var bq_node = document.createElement("DIV");
	    bq_node.classList.add( "mw-99", "flex", "justify-center", "mb-sm" );

	    var amp_node = document.createElementNS( ".", "AmpOembed" )
	    amp_node.setAttributeNS( ".", "rawOembed", adds[i].raw_oembed );
	    amp_node.setAttributeNS( ".", "subtype", adds[i].subtype );
	    bq_node.appendChild(amp_node);

	    append_pt.appendChild(bq_node);
	    
	}
	// console.log("exit for loop");
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

// embed(runEmbedded);

