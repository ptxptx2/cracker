import * as helpers from '../common/helpers.js';

// remove iframe with id like "offer-0*"
helpers.removeFirstElementByTagNameAndIdPattern("IFRAME", "^offer-0");

// remove class slate-roadblock and slate-roadblock--in-article from aside tag

helpers.removeClassNameFromFirstElement( "slate-roadblock", "ASIDE");
helpers.removeClassNameFromFirstElement( "slate-roadblock--in-article", "ASIDE");


// 20230615
helpers.removeClassNameFromFirstElement( "tp-scroll-prevented", "HTML");
helpers.removeClassNameFromFirstElement( "tp-modal-open", "BODY");
helpers.removeClassNameFromFirstElement( "tp-body-scroll-prevented", "BODY");
helpers.removeFirstElementByClassName("tp-modal");
helpers.removeFirstElementByClassName("tp-active");
