import * as helpers from '../common/helpers.js';

// remove view-offer
helpers.removeFirstElementByClassName( "view-offer" );

// remove modal
helpers.removeFirstElementByClassName( "modal" );
helpers.removeFirstElementByClassName( "tp-backdrop" );

// remove tp-modal-open
helpers.removeClassNameFromFirstElement( "tp-modal-open", "BODY" );

