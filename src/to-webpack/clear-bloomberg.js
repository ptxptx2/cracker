import * as helpers from '../common/helpers.js';

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
d = document.getElementsByTagName("script");
if ( d != null ) {
    for (i=0; i<d.length; i++) {
	// console.log(i, d[i].getAttribute("data-component-props"));
	if ( d[i].getAttribute("data-component-props") == "ArticleBody" ) {
	    // console.log(i, JSON.parse(d[i].getInnerHTML()).body );
	    db = JSON.parse(d[i].getInnerHTML()).body;
	    break;
	}
    }
}
d = document.getElementsByTagName("div");
if ( d != null ) {
    for (i=0; i<d.length; i++) {
	// console.log(i, f[i].getAttribute("data-component-root"));
	if ( d[i].getAttribute("data-component-root") != null && d[i].getAttribute("data-component-root") == "ArticleBody" ) {
	    var div_node = document.createElement("DIV");
	    div_node.classList.add( "body-copy-v2");
	    div_node.innerHTML = db;
	    d[i].appendChild(div_node);
	    break;
	}
    }
}

