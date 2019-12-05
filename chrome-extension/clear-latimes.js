// delete reg-overlay div class
d = document.getElementById("reg-overlay");
d.parentNode.removeChild(d);

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


