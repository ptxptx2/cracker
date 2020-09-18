// remove sign-in-gate

d = document.getElementById("sign-in-gate");
if ( d != null ) {
    d.parentNode.removeChild(d);
}


/* d = document.getElementsByClassName("js-article__body");
if ( d != null ) {
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
