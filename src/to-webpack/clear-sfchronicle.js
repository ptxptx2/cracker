import * as helpers from '../common/helpers.js';

// remove class fancybox-overlay from div
// remove class fancybox-lock from html
// add style=overflow:scroll to body and html
// add display:none to fancybox-desktop

helpers.removeClassNameFromFirstElement( 'fancybox-overlay', 'DIV' );
helpers.removeClassNameFromFirstElement( 'fancybox-lock', 'HTML' );

var d;

d = document.getElementsByTagName("BODY");
d[0].style.overflow = "scroll";

d = document.getElementsByTagName("HTML");
d[0].style.overflow = "scroll";

d = document.getElementsByClassName("fancybox-desktop");
if ( d[0].tagName == "DIV" ) {
    d[0].style.display = "none";
}
