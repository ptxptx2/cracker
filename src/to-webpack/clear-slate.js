import * as helpers from '../common/helpers.js';

// remove div with id="view-offer"

helpers.removeElementById("view-offer");

// remove class slate-roadblock and slate-roadblock--in-article from aside tag

helpers.removeClassNameFromFirstElement( "slate-roadblock", "ASIDE");
helpers.removeClassNameFromFirstElement( "slate-roadblock--in-article", "ASIDE");
