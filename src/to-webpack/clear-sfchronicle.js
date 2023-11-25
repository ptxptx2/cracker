import * as helpers from '../common/helpers.js';

// remove class fancybox-overlay from div
// remove class fancybox-lock from html
// add style=overflow:scroll to body and html
// add display:none to fancybox-desktop

helpers.removeClassNameFromFirstElement( 'fancybox-overlay', 'DIV' );
helpers.removeClassNameFromFirstElement( 'fancybox-lock', 'HTML' );

// remove modals

helpers.removeElementById( 'modals' );

var d;

d = document.getElementsByTagName("BODY");
d[0].style.overflow = "scroll";
d[0].style.position = "relative";

d = document.getElementsByTagName("HTML");
d[0].style.overflow = "scroll";

d = document.getElementsByClassName("fancybox-desktop");
if ( d[0].tagName == "DIV" ) {
    d[0].style.display = "none";
}

// copy from <> to <article>

var t;
var u;

// get additional text
var scriptElements = document.getElementsByTagName("SCRIPT");
var addsText;
var i;
for ( i = 0; i < scriptElements.length; i++ ) {
    if ( scriptElements[i].type == "application/ld+json" ) {
	addsText = scriptElements[i].textContent['articleBody'];
	break;
    }
}
// parse additional text
var adds = Array();
if ( addsText != null ) {
    // find last <p> under <article>
    var article = document.getElementsByTagName("ARTICLE");
    var j;
    if ( article != null ) {
	for ( j = article[0].children.length - 1; j < 0; j-- ) {
	    if ( article[0].children[j].tagName == "P" ) {
		break;
	    }
	}
	var lastText = article[0].children[j].innerHTML;
    }
    
}




if ( window.Fusion.globalContent != null ) {
	adds = window.Fusion.globalContent.content_elements;
    }
    else {
	adds = __NEXT_DATA__.props.pageProps.globalContent.content_elements;
    } 

