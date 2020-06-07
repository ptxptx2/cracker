// remove blocking div
var g = document.getElementsByClassName("fEy1Z2XT"); 

if ( g[0] != null ) {
    g[0].parentNode.removeChild(g[0]);	
}

// change overflow to scroll for html and body

var d = document.getElementsByTagName("BODY");
d[0].style.overflow = "scroll";
d[0].parentElement.style.overflow = "scroll";
