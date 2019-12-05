// remove gateway-content
d = document.getElementById("gateway-content");
if ( d != null ) {
    d.parentNode.removeChild(d);
}
// allow scroll
a = document.getElementsByClassName("css-mcm29f");
if ( a != null ) {
    a[0].style.overflow = "scroll";
    // remove black stripe
    a = document.getElementsByClassName("css-1bd8bfl");
    a[0].style.visiblity = "hidden";
    a[0].style.display = "none";
}

    // set site-content to position:static
d = document.getElementById("site-content");
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
for ( i=0; i<nl.length; i++ ) {
    nl[i].parentNode.removeChild(nl[i]);
};



// fix if error on any step
