export function removeFirstElementByClassName ( classname, parentOffset=0 ) {
    if ( classname == null || parentOffset < 0) {
	return 0
    }
    var d = document.getElementsByClassName(classname);
    for ( ; parentOffset > 0; parentOffset-- ) {
	try {
	    d[0] = d[0].parentNode;
	}
	catch {
	    break;
	}
    }
    if ( d[0] == null ) {
	return 0;
    }
    else {
	return removeFirstElement(d);
    }
}

export function removeElementsByClassName ( classname ) {
    if ( classname == null ) {
	return 0
    }
    while ( removeFirstElementByClassName( classname ) ) {
    }
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

export function replaceAllTagClassName( tagName, oldClassName, newClassName ) {
    if ( tagName == null || oldClassName  == null || newClassName  == null ) {
	return 0
    }
    // replace all oldClassName with newClassName
    var d = document.getElementsByClassName(oldClassName);
    if ( d.length > 0 ) {
	// iterate over elements to filter for tag names
	for ( var i = 0; i < d.length; i++ ) {
	    if ( d[i].tagName == tagName ) {
		d[i].classList.remove(oldClassName);
		d[i].classList.add(newClassName);
	    }
	}
    }
}

export function removeClassNameFromFirstElement( className, tagName ) {
    if ( tagName == null || className  == null ) {
	return 0
    }
    var d = document.getElementsByClassName(className);
    if ( d.length > 0 ) {
	// iterate over elements to filter for tag names
	for ( var i = 0; i < d.length; i++ ) {
	    if ( d != null && d.length > 0 ) {
		if ( d[i].tagName == tagName ) {
		    d[i].classList.remove(className);
		    break;
		}
	    }
	}
    }
}

export function removeClassNameFromElementById( className, id ) {
    if ( id == null || className  == null ) {
	return 0
    }
    var d = document.getElementById(id);
    if ( d != null && d.length > 0 ) {
	d.classList.remove(className);
    }
}

export function removeClassNameFromElementsByClassName( classNameRemove, classNameSearch  ) {
    if ( classNameRemove == null || classNameSearch  == null ) {
	return 0
    }
    var d = document.getElementsByClassName(classNameSearch);
    if ( d != null && d.length > 0 ) {
	// do it from the end of the list
	for ( var i = d.length-1; i >= 0; i-- ) {
	    d[i].classList.remove(classNameRemove);
	}
    }
}

export function removeClassNameFromElementsByClassNamePattern( className, classNameRemoveRegex ) {
    if ( classNameRemoveRegex == null || className  == null ) {
	return 0
    }
    var d = document.getElementsByClassName(className);
    if ( d.length > 0 ) {
	var pattern = classNameRemoveRegex;
	var re = new RegExp(pattern,"gi");	
	// iterate over elements to filter for class names
	for ( var i = 0; i < d.length; i++ ) {
	    if ( d[i] != null ) {
		// iterate over className of element
		for ( var j = 0; j < d[i].classList.length; j++ ) {
		    if ( d[i].classList[j].match(re) ) {
			d[i].classList.remove(d[i].classList[j]);
			break;
		    }
		}
	    }
	}
    }
}

export function removeFirstElementByTagNameAndIdPattern( tagName, idRegex ) {
    if ( tagName == null || idRegex  == null ) {
	return 0
    }
    var d = document.getElementsByTagName(tagName);
    if ( d.length > 0 ) {
	var pattern = idRegex;
	var re = new RegExp(pattern,"gi");	
	// iterate over elements to filter for tag names
	for ( var i = 0; i < d.length; i++ ) {
	    if ( d != null && d.length > 0 ) {
		if ( d[i].id.match(re) ) {
		    removeElement(d[i]);
		    break;
		}
	    }
	}
    }
}

    
export function setInnerHTML( elm, html ) {
  elm.innerHTML = html;
  Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes)
      .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

export function setStyleByClassName( className, styleProperty, styleSetting ) {
    if ( className == null || styleProperty  == null || styleSetting  == null ) {
	return 0
    }
    var d = document.getElementsByClassName(className);
    if ( d != null && d.length > 0 ) {
	for ( var i = 0; i < d.length; i++ ) {
	    d[i].style[styleProperty] = styleSetting;
	}
    }
}

export function setStyleByTagName( tagName, styleProperty, styleSetting ) {
    if ( tagName == null || styleProperty  == null || styleSetting  == null ) {
	return 0
    }
    var d = document.getElementsByTagName(tagName);
    if ( d != null && d.length > 0 ) {
	for ( var i = 0; i < d.length; i++ ) {
	    d[i].style[styleProperty] = styleSetting;
	}
    }
}

export function setStyleAttributeByTagName( tagName, styleProperty, styleSetting ) {
    if ( tagName == null || styleProperty  == null || styleSetting  == null ) {
	return 0
    }
    var d = document.getElementsByTagName(tagName);
    if ( d != null && d.length > 0 ) {
	for ( var i = 0; i < d.length; i++ ) {
	    d[i].setAttribute("style", styleProperty + ": " + styleSetting + ";" );
	}
    }
}
