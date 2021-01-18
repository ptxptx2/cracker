// remove "tp-modal" class
// // remove "view-offer" class
// remove "tp-backdrop" class
d = document.getElementsByClassName("tp-modal");
if ( d != null && d.length > 0) {
    d[0].parentNode.removeChild(d[0]);
}
d = document.getElementsByClassName("tp-backdrop");
if ( d != null && d.length > 0) {
    d[0].parentNode.removeChild(d[0]);
}

// remove class "tp-modal-open" from body
d = document.getElementsByClassName("tp-modal-open");
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
