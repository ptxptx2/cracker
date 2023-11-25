import * as helpers from '../common/helpers.js';

// remove c-nudge__container c-gate__container
helpers.removeFirstElementByClassName("c-gate__container");

// remove Gate_root__3hCZo
helpers.removeFirstElementByClassName("Gate_root__3hCZo");

// allow scroll
var d = document.getElementsByTagName("BODY");
d[0].classList.remove("with-gate");
d[0].classList.remove("Gate_withGate__23WdV");

// fix if error on any step

// 20220206
//

// remove paywall
helpers.removeFirstElementByClassName("Paywall_root__ciuNi");

// allow scroll
var d = document.getElementsByTagName("BODY");
d[0].classList.remove("Gate_withGate__5Ql7N");
d[0].style.overflow = "scroll";

// remove injected gate
helpers.removeFirstElementByClassName("c-gate__container");

// 20220717
//

// remove class InjectedGate_root__2z3Ef and GateToast_root__mzwlN
helpers.removeFirstElementByClassName("ArticleInjector_clsAvoider__pXehw");
// helpers.removeFirstElementByClassName("GateToast_root__mzwlN");
// helpers.removeFirstElementByClassName("GateToast_root__xdcuI");

// 20231024 update

helpers.removeFirstElementByClassName("LostInventoryMessage_root__YllYq");

var k = document.querySelector("div[class^='InjectedBoldGate_root']");
if ( k != null ) {
    helpers.removeElement(k);
}
var k = document.querySelector("div[class^='InjectedGate_root']");
if ( k != null ) {
    helpers.removeElement(k);
}
var k = document.querySelector("aside[class^='GateToast_root']");
if ( k != null ) {
    helpers.removeElement(k);
}


// add content to last p with class ArticleParagraph_root__wy3UI on <section class=ArticleBody_root__nZ4AR>
function runEmbedded() {
    // Put here whatever your script needs to do.

    // get the text to be added
    var adds_json = __NEXT_DATA__.props.pageProps.urqlState;
    var adds;
    var keys = Object.keys(adds_json);
    var i;
    var j;

    // find the one with article.content
    for ( i = 0; i < keys.length; i++ ) {
	console.log( keys[i], JSON.parse(adds_json[keys[i]].data) );
	j = JSON.parse(adds_json[keys[i]].data);
	if ( j.article != null ) {
	    if ( j.article.content != null ) {
		adds = j.article.content;
		break;
	    }
	}
    }
    
    // find where to add
    var possibleClassNames = [ "ArticleBody_root__nZ4AR", "ArticleBody_root__2gF81" ];
    var t;
    for ( k = 0; k < possibleClassNames.length; k++ ) {
	t = document.getElementsByClassName(possibleClassNames[k]);
	if ( t.length > 0 ) {
	    break;
	}
    }
    
    
    // set i to start of adds to append
    // -- set i to count t[0].children until no more ArticleParagraph_root__wy3UI or ArticleRelatedContentModule_root__BBa6g
    // var i = 4;
    var i = 0;
    for ( j = 0 ; i < adds.length && j < t[0].children.length; j++ ) {
	if ( adds[i].__typename == "ArticleParagraphContent" || adds[i].__typename == "ArticleRelatedContentModule" ) {
	    if (
		t[0].children[j].className.includes("ArticleParagraph_root__wy3UI") ||
		t[0].children[j].className.includes("ArticleRelatedContentModule_root__BBa6g") ||
		t[0].children[j].className.includes("ArticleParagraph_root__4mszW")
	       )
		i++;
	}
    }
    
    for ( ; i < adds.length; i++ ) {
	if ( adds[i].__typename == "ArticleParagraphContent" ) {
	    p_node = document.createElement("P");
	    p_node.classList.add( "ArticleParagraph_root__wy3UI" );
	    p_node.classList.add( "ArticleParagraph_root__4mszW" );
	    p_node.innerHTML = adds[i].innerHtml;
	    t[0].appendChild( p_node );
	}
    }
				
}

function embed(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
}

embed(runEmbedded);

// remove subscription ad

helpers.removeElementsByClassName( "LostInventoryMessage_root__Ue8tC" );

