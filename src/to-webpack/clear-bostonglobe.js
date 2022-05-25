import * as helpers from '../common/helpers.js';

// delete meter-paywall 
// delete meter-social-connect meter-social-connect--visible

helpers.removeFirstElementByClassName("meter-paywall");
helpers.removeFirstElementByClassName("meter-social-connect");

// allow scroll
var a = document.getElementsByTagName("BODY");
if ( a != null && a[0] != null) {
    a[0].classList.remove("overflow_x_hidden");
    a[0].style = "";
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

// embed(runEmbedded);


