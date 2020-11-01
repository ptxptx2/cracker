// remove modal-scrollable and connext-modal-backdrop class
d = document.getElementsByClassName("modal-scrollable");
if ( d != null && d[0] != null ) {
    d[0].parentNode.removeChild(d[0]);
}

d = document.getElementsByClassName("connext-modal-backdrop");
if ( d != null && d[0] != null ) {
    d[0].parentNode.removeChild(d[0]);
}

// allow scroll
a = document.getElementsByTagName("BODY");
if ( a != null && a[0] != null) {
    a[0].classList.remove("modal-open");
}
// fix if error on any step


