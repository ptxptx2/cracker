// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// browser.pageAction.onClicked.addListener(() => {
//  browser.tabs.update({url: CATGIFS});
// });

browser.webRequest.onBeforeRequest.addListener(
        function(details) {
	    return {cancel: (details.url.indexOf("9af97774e9.js") != -1)
		    || (details.url.indexOf("head.min.js") != -1)
//                || (details.url.indexOf("get-paywall") != -1)
//		    || (details.url.indexOf("react.js") != -1)
		   } ;
        },
       {urls: ["*://www.washingtonpost.com/*"]},
        ["blocking"]
);

// block certain urls for nytimes

chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
	    return {cancel: (details.url.indexOf("*") != -1)
                || (details.url.indexOf("adsbygoogle.js") != -1)
//		    || (details.url.indexOf("react.js") != -1)
		   } ;
        },
       {urls: ["*://cdn.optimizely.com/*", "*://cdn3.optimizely.com/*", "*://errors.client.optimizely.com/*",
               "*://nytimes.com/ads/*", "*://www.nytimes.com/ads/*",
               "*://www.googletagmanager.com/*"
              ]},
        ["blocking"]
);



