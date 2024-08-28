import * as helpers from '../common/helpers.js';

// remove BODY class scrollLock
helpers.removeClassNameFromFirstElement( "scrollLock", "BODY" );
// change BODY style overflow:scroll
helpers.setStyleByTagName( "BODY", "overflow", "scroll" );

// remove DIV with class = HiYSi
helpers.removeFirstElementByClassName( "HiYSi" );

