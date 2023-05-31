let cracker = document.getElementById('cracker');

chrome.storage.sync.get('color', function(data) {
    cracker.style.backgroundColor = data.color;
    cracker.setAttribute('value', data.color);
});

cracker.onclick = function(element) {
    console.log('cracker.onclick');
    (async () => {

	// import master-switch
	const src = chrome.runtime.getURL("./master-switch.js");
	const switchMain = await import(src);
	
	let queryOptions = { active: true, lastFocusedWindow: true };
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	let [tab] = await chrome.tabs.query(queryOptions,);
	// console.log(tab);

	switchMain.master_switch(tab);
	window.close();
    })();
    
};


/* 
fix icon
console.log does not seem to work
*/
