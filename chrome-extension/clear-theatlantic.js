// remove c-nudge__container c-gate__container
d = document.getElementsByClassName("c-gate__container");
if ( d != null && d[0] != null ) {
    d[0].parentNode.removeChild(d[0]);
}

// allow scroll
var d = document.getElementsByTagName("BODY");
d[0].classList.remove("with-gate");


// fix if error on any step
