export function removeFirstElementByClassName ( classname ) {
	var d = document.getElementsByClassName(classname);
	if ( d != null && d.length != 0 ) {
	    d[0].parentNode.removeChild( d[0] );
	    return 1;
	}
	else {
	    return 0;
	}
}

export function removeElementById( id ) {
	var d = document.getElementById(id);
	if ( d != null ) {
	    d.parentNode.removeChild( d );
	    return 1;
	}
	else {
	    return 0;
	}
}


    
