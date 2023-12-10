import * as helpers from '../common/helpers.js';

helpers.removeFirstElementByClassName('fEy1Z2XT');
helpers.removeFirstElementByClassName('bx-slab');
helpers.removeClassNameFromFirstElement( 'bx-client-overlay', 'BODY' );

var d;

d = document.getElementsByTagName("BODY");
d[0].style.overflow = "scroll";

d = document.getElementsByTagName("HTML");
d[0].style.overflow = "scroll";

helpers.removeElementById('modals');
