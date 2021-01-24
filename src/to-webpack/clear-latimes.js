import * as helpers from '../common/helpers.js';

// overflow to display
d = document.getElementsByTagName("BODY");
if ( d != null && d.length != 0) {
    d[0].style.overflow = "scroll";
}

// delete reg-overlay div class
helpers.removeElementById("reg-overlay");

// delete ncm-container div class
helpers.removeFirstElementByClassName("ncm-container");

// delete metering-modal
helpers.removeFirstElementByTagName("metering-modal");


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


