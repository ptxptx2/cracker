import * as helpers from '../common/helpers.js';

// duplicate Messari-paywall and attach to document
// remove jss57 Messari-paywall
// remove 2nd jss62

let x = document.getElementsByClassName("Messari-paywall");
let x_parent = x[0].parentNode;
let new_x = x[0].cloneNode(true);
x_parent.insertBefore(new_x, x[0]);

helpers.removeClassNameFromFirstElement("Messari-paywall", "DIV");
helpers.removeClassNameFromFirstElement("jss57", "DIV");
helpers.removeClassNameFromFirstElement("jss62", "DIV");








