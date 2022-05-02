import * as helpers from '../common/helpers.js';

// remove overlay-34_Kj/../..
// remove wrapper-3AzfF/../..
// remove class mol-fe-ab-dialog" from BODY

helpers.removeFirstElementByClassName( 'wrapper-3AzfF', 2 );
helpers.removeFirstElementByClassName( 'overlay-34_Kj', 2 );
helpers.removeClassNameFromFirstElement( 'mol-fe-ab-dialog', 'BODY' );

