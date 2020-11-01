// delete meter-paywall
d = document.getElementsByClassName("meter-paywall");
if ( d != null && d.length != 0) {
    d[0].parentNode.removeChild(d[0]);
}

// allow scroll
a = document.getElementsByTagName("BODY");
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

embed(runEmbedded);


