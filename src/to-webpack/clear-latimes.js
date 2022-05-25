import * as helpers from '../common/helpers.js';

// overflow to display
var d = document.getElementsByTagName("BODY");
if ( d != null && d.length != 0) {
    d[0].style.overflow = "scroll";
}

// delete reg-overlay div class
helpers.removeElementById("reg-overlay");

// delete fc-ab-root
helpers.removeFirstElementByClassName("fc-ab-root");

// delete ncm-container div class
helpers.removeFirstElementByClassName("ncm-container");

// delete metering-modal
helpers.removeFirstElementByTagName("metering-modal");

// remove the class subscriber- content
helpers.removeClassNameFromFirstElement( "subscriber-content", "DIV" );

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

// not there anymore - so commenting out
// embed(runEmbedded);


