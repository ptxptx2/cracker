// html and body - remove position style and overlfow style
var d = document.getElementsByTagName("BODY");
d[0].classList.remove("tp-modal-open");

// delete reg-overlay div class
var d = document.getElementById("checkout-container");
d.parentNode.removeChild(d);




