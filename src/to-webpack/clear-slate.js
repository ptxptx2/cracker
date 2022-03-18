import * as helpers from '../common/helpers.js';

// remove iframe with id like "offer-0*"
helpers.removeFirstElementByTagNameAndIdPattern("IFRAME", "^offer-0");

// remove class slate-roadblock and slate-roadblock--in-article from aside tag

helpers.removeClassNameFromFirstElement( "slate-roadblock", "ASIDE");
helpers.removeClassNameFromFirstElement( "slate-roadblock--in-article", "ASIDE");


