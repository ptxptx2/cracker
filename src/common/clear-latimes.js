// overflow to display
d = document.getElementsByTagName("BODY");
if ( d != null && d.length != 0) {
    d[0].style.overflow = "scroll";
}

// delete reg-overlay div class
d = document.getElementById("reg-overlay");
if ( d != null ) {
    d.parentNode.removeChild(d);
}
// delete ncm-container div class
d = document.getElementsByClassName("ncm-container");
if ( d != null && d.length != 0) {
    d[0].parentNode.removeChild(d[0]);
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


