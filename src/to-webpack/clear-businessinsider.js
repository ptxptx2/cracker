import * as helpers from '../common/helpers.js';

// remove "tp-modal" class
// // remove "view-offer" class
// remove "tp-backdrop" class
helpers.removeElementById("checkout-container");
helpers.removeFirstElementByClassName("tp-modal");
helpers.removeFirstElementByClassName("tp-backdrop");

// remove class "tp-modal-open" from body
var d = document.getElementsByClassName("tp-modal-open");
while ( d.length > 0 ) {
    d[0].classList.remove("tp-modal-open");
    d = document.getElementsByClassName("tp-modal-open");
};

// change style position:fixed in body
d = document.getElementsByTagName("BODY");
if ( d != null && d.length > 1 ) {
    d[0].style = "position:none;"
}

// display: block for div id piano-inline-content-wrapper
d = document.getElementById("piano-inline-content-wrapper");
if ( d != null ) {
    d.style = "display: block";
}
