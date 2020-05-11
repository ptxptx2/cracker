// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// NOT REFERENCED CURRENTLY

'use strict';

var url = new URL( document.URL );
var sti = "";
console.log( url.hostname );

switch (url.hostname) {
};

if (sti !== "") {
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL(sti);
    s.onload = function() {
	this.remove();
    };
    (document.head || document.documentElement).appendChild(s);    // inject script
}

// loads as pre the document -- need versions for pre and post

