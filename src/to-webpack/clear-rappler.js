import * as helpers from '../common/helpers.js';

// remove div with id=view-offer
// remove body class tp-modal-open, tp-body-scroll-prevented
// remove html class tp-scroll-prevented
// remove div with class tp-modal
// remove div with class tp-backdrop

helpers.removeElementById( "view-offer" );
helpers.removeClassNameFromFirstElement( "tp-modal-open", "BODY" );
helpers.removeClassNameFromFirstElement( "tp-body-scroll-prevented", "BODY" );
helpers.removeClassNameFromFirstElement( "tp-scroll-prevented", "HTML" );
helpers.removeFirstElementByClassName( "tp-modal" );
helpers.removeFirstElementByClassName( "tp-backdrop" );

helpers.removeElementById( "dynamic-action__article__1" );
