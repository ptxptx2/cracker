// This is the main content_script to automatically execute scripts.

(async () => {
    const src = chrome.runtime.getURL("./master-switch.js");
    const contentMain = await import(src);
    contentMain.master_switch();
})();

// put back popup.js
// infrastructure to autorun
// timing of autorun seems off

/* 
2- popup
runembedded not working - ?? 
fix up clear-*.js

clean up manifest.json

master-clear.js - content script
popup.js - button script

service worker / messaging concept

load master-switch.js 
- pick script / function based on hostname
- send message to screen to execute script

// might not be needed
master-lib
- helper load
- webpacked version of all clear*js files

// cleanup
grunt errors

*/
