import * as helpers from '../common/helpers.js';

// duplicate Messari-paywall and attach to document
// remove jss57 Messari-paywall
// remove 2nd jss62

let x = document.getElementsByClassName("Messari-paywall");
if ( x != null && x.length > 0 ) {
    let x = document.getElementsByClassName("MuiPaper-root");
}
if ( x != null ) {
    let x_parent = x[0].parentNode;
    let new_x = x[0].cloneNode(true);
    x_parent.insertBefore(new_x, x[0]);
}

helpers.removeClassNameFromFirstElement("Messari-paywall", "DIV");
helpers.removeClassNameFromFirstElement("css-11wbc2a", "DIV");
helpers.removeClassNameFromFirstElement("MuiPaper-root", "DIV");
helpers.removeClassNameFromFirstElement("jss57", "DIV");
helpers.removeClassNameFromFirstElement("jss62", "DIV");
helpers.removeClassNameFromFirstElement("jss52", "DIV");

// jss47 - add style max-height=2000px

helpers.setStyleByClassName( "jss47", "max-height", "none" );









