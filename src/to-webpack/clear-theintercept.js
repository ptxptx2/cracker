import * as helpers from '../common/helpers.js';

// console.log("in clear-theintercept.js");

// remove class PostLanding--email-wall-meter-expired" from div
helpers.removeClassNameFromFirstElement( "PostLanding--email-wall-meter-expired", "DIV");

// remove class Post-body--truncated from div
helpers.removeClassNameFromFirstElement( "Post-body--truncated", "DIV" );

// remove all div with class = "ThirdPartySlot"
helpers.removeElementsByClassName("ThirdPartySlot");

// remove class meter-expired
helpers.removeClassNameFromFirstElement( "meter-expired", "DIV" );
