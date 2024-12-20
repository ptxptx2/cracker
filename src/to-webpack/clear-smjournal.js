import * as helpers from '../common/helpers.js';

// remove "in" class, set style to display-none for subscription-modal
// var d = document.getElementById("subscription-modal");
// d.classList.remove("in");
helpers.removeClassNameFromElementById( "in", "subscription-modal");
var d = document.getElementById("subscription-modal");
if ( d != null ) {
    d.style.display = "none";
}

// remove "in" class for modal-backdrop
// var d = document.getElementsByClassName("modal-backdrop");
// d[0].classList.remove("in");
helpers.removeClassNameFromElementById( "in", "modal-backdrop");
var d = document.getElementsByClassName("modal-backdrop");
if ( d.length > 0 ) {
    d[0].style.position = 'static';
}

// remove modal-open class from body
// var d = document.getElementsByClassName("modal-open");
// d[0].classList.remove("modal-open");
helpers.removeClassNameFromElementsByClassName( "modal-open", "modal-open");

// remove hide class
// var d = document.getElementsByClassName("hide");
// while ( d.length > 0 ) {
//     d[0].classList.remove("hide");
//     d = document.getElementsByClassName("hide");
// };
helpers.removeClassNameFromElementsByClassName( "hide", "hide" );

// do not show subscription-required
var a = document.getElementsByClassName("subscription-required");
if ( a.length > 0 ) {
    a[0].style.display = "none";
}

// do not show redacted-overlay
var a = document.getElementsByClassName("redacted-overlay");
if ( a.length > 0 ) {
    a[0].style.display = "none";
}

// remove sticky-anchor
// var d = document.getElementById("sticky-anchor");
// d.parentNode.removeChild(d);
helpers.removeElementById( "sticky-anchor" );

// fix if error on any step

// 20220801

// set style display: block (from display:none) where class = subscriber-only
helpers.setStyleByClassName( "subscriber-only", "display", "block" );
