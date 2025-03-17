import * as helpers from '../common/helpers.js';

// remove sign-in-gate

// v1
if ( !helpers.removeElementById("sign-in-gate") ) {
}    

/* 
d = document.getElementById("sign-in-gate");
if ( d != null ) {
    d.parentNode.removeChild(d);
}
*/

// v2
if ( !helpers.removeElementsByClassName("signin-gate") ) {
}    

/* 
d = document.getElementsByClassName("signin-gate");
if ( d != null && d.length > 0) {
    d[0].parentNode.removeChild(d[0]);
}
*/


if ( !helpers.setStyleByClassName("js-article__body", "display", "block") ) {
}    
/*
d = document.getElementsByClassName("js-article__body");
if ( d != null && d.length > 0 ) {
    d[0].style.display = "block";
}
*/

// add removal of money thing - class css-34t5a0
if ( !helpers.removeElementsByClassName("css-34t5a0") ) {
}    

/* 
d = document.getElementsByClassName("js-article__body");
if ( d != null && d.length > 0 ) {
    for ( i = 0; i<d.length; i++) {
	if ( d[i].attributes["itemprop"] != null ) {
	    d[i].style.display = "block";
	}
	else {
	    d[i].style.display = "none"
	}
    }
}
*/


// add removal of banner
helpers.removeElementsByClassName("dcr-1hebmgj");
helpers.removeElementsByClassName("dcr-1d5d3o3");

helpers.removeElementsByClassName("dcr-wc4h92");
helpers.removeElementById( "sp_message_container_1257129");

