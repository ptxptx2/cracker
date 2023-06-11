import * as helpers from '../common/helpers.js';

// remove reg-ui-client

if ( !helpers.removeElementById("reg-ui-client") ) {
}    

// remove sign-in-gate

if ( !helpers.removeElementById("fortress-paywall-container-root") ) {
}    

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


// copy to article body 2
d = document.getElementsByClassName("body-content");

// get rid of existing children there before putting in all of db2

for ( var i=d[0].children.length; i > 0; i-- ) {
    d[0].removeChild(d[0].children[i-1]);
}

var div_node = document.createElement("P");
div_node.classList.add( "cracker");
div_node.innerHTML = db2;
d[0].appendChild(div_node);

// need to set all <P> inside class "cracker" to have bottom margin at 24px
var p_start = document.getElementsByClassName("cracker");
if ( p_start != null && p_start[0] != null ) {
    for ( var i = 0; i < p_start[0].childNodes.length; i++) {
	if ( p_start[0].childNodes[i].tagName == "P" ) {
	    p_start[0].childNodes[i].style.margin = "24px 0";
	}
    }
}



// remove blur - by removing class "nearly-transparent-text-blur__84099cbc"

//d = document.getElementsByClassName("nearly-transparent-text-blur__84099cbc");
//d[0].classList.remove("nearly-transparent-text-blur__84099cbc");
helpers.removeClassNameFromElementsByClassName( "nearly-transparent-text-blur__84099cbc", "nearly-transparent-text-blur__84099cbc" );


// add to <body> style="overflow: scroll"
d = document.getElementsByTagName("body");
if ( d != null ) {
    d[0].style.overflow = "scroll";
}

// find img and load higher resolution version
d = document.getElementsByClassName("lazy-img__image");
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

helpers.removeClassNameFromElementsByClassName( "lazy-img__image", "lazy-img__image");
