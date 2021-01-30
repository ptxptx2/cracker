export function removeFirstElementByClassName ( classname ) {
    if ( classname == null ) {
	return 0
    }
    var d = document.getElementsByClassName(classname);
    return removeFirstElement(d);
}

export function removeFirstElementByTagName ( tagname ) {
    if ( tagname == null ) {
	return 0
    }
    var d = document.getElementsByTagName(tagname);
    return removeFirstElement(d);
}

export function removeElementById( id ) {
    if ( id == null ) {
	return 0
    }
    var d = document.getElementById(id);
    return removeElement(d);
}


export function removeFirstElementByAttributeAndClass( attrname, attrvalue, classname ) {
    if ( attrname == null || classname  == null ) {
	return 0
    }
    var d = document.getElementsByClassName(classname);
    // loop through all elements matching the classname to see if the attribute matches, then delete
    if ( d != null && d.length > 0 ) {
	for ( var i = 0; i < d.length; i++) {
	    if ( d[i].hasAttribute(attrname) ) {
		if ( attrvalue == null || d[i].attributes[attrname].value == attrvalue ) {
		    return removeElement(d[i])
		}
	    }
	}
	return 0;
    }
}

export function removeFirstElement(elements) {
    if ( elements != null && elements.length != 0 ) {
	return removeElement(elements[0]);
    }
}

export function removeElement(element) {
    // return 0 if not deleted; 1 otherwise
    if ( element != null ) {
	element.parentNode.removeChild( element );
	return 1;
    }
    else {
	return 0;
    }
}

