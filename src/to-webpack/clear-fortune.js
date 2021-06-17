import * as helpers from '../common/helpers.js';

var d;
var e;

// add "display:none" for class tp-container-inner to remove paywall

d = document.getElementsByClassName("tp-container-inner")
if ( d != null && d.length != 0 ) {
    d[0].style = "display: none;";
}

// for class paywall, remove style

d = document.getElementsByClassName("paywall")
if ( d != null && d.length != 0 ) {
    d[0].style = "";
}


