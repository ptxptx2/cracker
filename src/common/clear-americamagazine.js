function removeElementById( id ) {
    d = document.getElementById(id);
    if ( d != null ) {
	d.parentNode.removeChild(d);
    }
}
   

function removeClassByClassName( classname ) {
    d = document.getElementsByClassName(classname);
    if ( d != null && d.length != 0) {
	d[0].classList.remove( classname );
    }
}

function setStyle( position, relative ) {
    return 0;
}

// remove view-offer
removeElementById( "view-offer" );

// remove modal classnames
removeClassByClassName( "tp-modal-open" );
removeClassByClassName( "tp-modal" );

position: relative;

// remove pop up
d = document.getElementById("checkout-container");
if ( d != null ) {
    d.parentNode.removeChild(d);
}


// delete metering-modal
d = document.getElementsByTagName("metering-modal");
if ( d != null && d.length != 0) {
    d[0].parentNode.removeChild(d[0]);
}




// the "window..." command does not work directly

function runEmbedded() {
    // Put here whatever your script needs to do. For example:
    window.trb.registration.utils.page.thaw();
}

function embed(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
}

embed(runEmbedded);


