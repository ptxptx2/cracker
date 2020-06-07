// remove "in" class, set style to display-none for subscription-modal
var d = document.getElementById("subscription-modal");
d.classList.remove("in");
d.style.display = "none";

// remove "in" class for modal-backdrop
var d = document.getElementsByClassName("modal-backdrop");
d[0].classList.remove("in");
d[0].style.position = 'static';

// remove modal-open class from body
var d = document.getElementsByClassName("modal-open");
d[0].classList.remove("modal-open");

// remove hide class
var d = document.getElementsByClassName("hide");
while ( d.length > 0 ) {
    d[0].classList.remove("hide");
    d = document.getElementsByClassName("hide");
};

// do not show subscription-required
var a = document.getElementsByClassName("subscription-required");
a[0].style.display = "none";

// do not show redacted-overlay
var a = document.getElementsByClassName("redacted-overlay");
a[0].style.display = "none";

// remove sticky-anchor
var d = document.getElementById("sticky-anchor");
d.parentNode.removeChild(d);

// fix if error on any step

