import * as helpers from '../common/helpers.js';

// remove div with class PaywallModal 
helpers.removeFirstElementByClassName("PaywallModal");

// set BODY style overflow: scroll, position: variable
helpers.setStyleByTagName( "BODY", "overflow", "scroll" );
helpers.setStyleByTagName( "BODY", "position", "relative" );

// remove class Article__Content__Overlay--gated
helpers.removeClassNameFromFirstElement( "Article__Content__Overlay--gated", "DIV" );

