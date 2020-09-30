// remove body classes
d = document.getElementsByClassName("adblock-on");
if ( d != null && d.length != 0) {
    d[0].classList.remove("tp-modal-open");
    d[0].classList.remove("adblock-on");
}


d = document.getElementsByClassName("tp-modal");
if ( d[0] != null ) {
    d[0].parentNode.removeChild(d[0]);
}

d = document.getElementsByClassName("tp-backdrop");
if ( d[0] != null ) {
    d[0].parentNode.removeChild(d[0]);
}

// fix if error on any step
