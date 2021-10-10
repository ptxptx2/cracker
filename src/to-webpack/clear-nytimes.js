import * as helpers from '../common/helpers.js';

// remove gateway-content
helpers.removeElementById("gateway-content");

// remove gateway_outer_wrapper
helpers.removeFirstElementByClassName("gateway_outer_wrapper");

// remove fade
helpers.removeFirstElementByClassName("css-gx5sib");

// allow scroll
var a = document.getElementsByClassName("css-mcm29f");
if ( a != null && a[0] != null) {
    a[0].style.overflow = "scroll";
    // remove black stripe
    a = document.getElementsByClassName("css-1bd8bfl");
    a[0].style.visiblity = "hidden";
    a[0].style.display = "none";
}


    // set site-content to position:static
var d = document.getElementById("site-content");
if ( d != null ) {
    d.style.position = 'static';
}

// remove extra continue button
// pl = document.getElementsByClassName("css-ujhzpp-form-Form");
// pl[0].parentNode.removeChild(pl[0]);
// pl = document.getElementsByClassName("css-ujhzpp-form-Form");
// pl[0].parentNode.removeChild(pl[0]);


// using Array.prototype.filter, to filter the elements returned by
// 'document.querySelectorAll()'
var nl = document.querySelectorAll('[id*=newsletter]');
var i;
for ( i=0; i<nl.length; i++ ) {
    nl[i].parentNode.removeChild(nl[i]);
};

