// inject mutator code
console.log('here in content-wapo.js');

// load proper images

// find all divs that are inline-photo
// look for IMG with class placeholder
// remove class, change value of src

/* 
pl = document.getElementsByClassName("inline-photo");
for ( i = 0; i < pl.length; i++ ) {
    for ( j = 0; j < pl[i].childNodes.length; j++ ) {
	if ( (pl[i].childNodes[j].nodeName == 'IMG')
	     && (pl[i].childNodes[j].className.indexOf('placeholder') != -1) ) {
	    pl[i].childNodes[j].className = '';
	    pl[i].childNodes[j].src = pl[i].childNodes[j].attributes['data-hi-res-src'].nodeValue;
	}
    }
}

*/


pl = document.getElementsByClassName("unprocessed");
for ( i = 0; i < pl.length; i++ ) {
    if ( (pl[i].nodeName == 'IMG')
	 && (pl[i].className.indexOf('placeholder') != -1) ) {
	 pl[i].src = pl[i].attributes['data-hi-res-src'].nodeValue;
    }
}

i = 0;
while ( pl.length > i) {
    if ( (pl[i].nodeName == 'IMG')
	 && (pl[i].className.indexOf('placeholder') != -1) ) {
	 pl[i].className = '';
    }
    else {
         i++;
    }
}    

// different style - look for pg-visual and put hi-res in for img

pl = document.getElementsByClassName("lazyld");
for ( i = 0; i < pl.length; i++ ) {
    if ( (pl[i].nodeName == 'IMG') ) {
	 pl[i].src = pl[i].attributes['data-hi-res-src'].nodeValue;
    }
}



// url does not change until on window onload but is change later
/*

// put back page url

function runEmbedded() {
    var oUrl = document.querySelector("meta[property='og:url']").getAttribute("content");
    window.history.pushState("","", oUrl);
}


function embed(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
}

window.onload=function(){
    console.log("page load!");
    embed(runEmbedded);
}
window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
    console.log(l );
    console.log(m );
});

window.addEventListener('locationchange', function(){
  var l = document.querySelector("meta[property='og:url']").getAttribute("content");
 var m = document.URL;
  console.log('url changed');
    console.log(l );
    console.log(m );
})

history.pushState = ( f => function pushState(){
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
})(history.pushState);

history.replaceState = ( f => function replaceState(){
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
})(history.replaceState);

window.addEventListener('popstate',()=>{
    window.dispatchEvent(new Event('locationchange'))
});
*/

var oldLocation = location.href;
fid = setInterval(function() {
        if(location.href != oldLocation) {
            console.log( '==>', oldLocation, ' changed to ', location.href );
            window.history.pushState("","", oldLocation);
            clearInterval(fid);
//            oldLocation = location.href;
      }
  }, 1000); // check every second

/*
    var oUrl = document.querySelector("meta[property='og:url']").getAttribute("content");
    window.history.pushState("","", oUrl);
*/

// at this point, url is still correct

// basically, find the event for when the URL changes; change it back
