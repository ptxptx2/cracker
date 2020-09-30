// remove sign-in-gate

d = document.getElementById("graphics-paywall-overlay");
if ( d != null ) {
    d.parentNode.removeChild(d);
}


d = document.getElementsByTagName("html");
if ( d != null ) {
    for ( i = 0; i<d.length; i++) {
	if ( d[i].getAttribute("data-paywall-overlay-status") != null ) {
	    d[i].setAttribute("data-paywall-overlay-status",  "hide" );
	}
    }
}

d = document.getElementsByTagName("body");
if ( d != null ) {
    for ( i = 0; i<d.length; i++) {
	if ( d[i].getAttribute("data-paywall-overlay-status") != null ) {
	    d[i].setAttribute("data-paywall-overlay-status",  "hide" );
	}
    }
}

