import * as helpers from '../common/helpers.js';

// remove class content-ungated
if ( !helpers.removeFirstElementByClassName("content-ungated") ) {
}    

// change class content-gated to content-ungated
if ( !helpers.replaceAllTagClassName("DIV", "content-gated", "content-ungated") ) {
}

// remove gradient


