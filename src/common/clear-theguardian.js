// remove sign-in-gate

// v1
d = document.getElementById("sign-in-gate");
if ( d != null ) {
    d.parentNode.removeChild(d);
}

// v2
d = document.getElementsByClassName("signin-gate");
if ( d != null && d.length > 0) {
    d[0].parentNode.removeChild(d[0]);
}

d = document.getElementsByClassName("js-article__body");
if ( d != null && d.length > 0 ) {
    d[0].style.display = "block";
}

/* 
d = document.getElementsByClassName("js-article__body");
if ( d != null && d.length > 0 ) {
    for ( i = 0; i<d.length; i++) {
	if ( d[i].attributes["itemprop"] != null ) {
	    d[i].style.display = "block";
	}
	else {
	    d[i].style.display = "none"
	}
    }
}
*/



// fix if error on any step
