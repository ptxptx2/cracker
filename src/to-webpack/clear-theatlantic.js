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
helpers.removeFirstElementByClassName("InjectedGate_root__2z3Ef");
helpers.removeFirstElementByClassName("GateToast_root__mzwlN");

// add content to last p with class ArticleParagraph_root__wy3UI on <section class=ArticleBody_root__nZ4AR>
function runEmbedded() {
    // Put here whatever your script needs to do.

    var adds_json = __NEXT_DATA__.props.pageProps.urqlState;
    var adds;
    // assumes only 1 of type BlogArticle
    var keys = Object.keys(adds_json);
    var i;
    var j;
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
    
    var t = document.getElementsByClassName("ArticleBody_root__nZ4AR");

    var i = 4;
    for ( ; i < adds.length; i++ ) {
	if ( adds[i].__typename == "ArticleParagraphContent" ) {
	    p_node = document.createElement("P");
	    p_node.classList.add( "ArticleParagraph_root__wy3UI" );
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

