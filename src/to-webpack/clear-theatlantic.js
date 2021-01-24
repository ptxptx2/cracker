import * as helpers from '../common/helpers.js';

// remove c-nudge__container c-gate__container
helpers.removeFirstElementByClassName("c-gate__container");

// remove Gate_root__3hCZo
helpers.removeFirstElementByClassName("Gate_root__3hCZo");


// allow scroll
var d = document.getElementsByTagName("BODY");
d[0].classList.remove("with-gate");
d[0].classList.remove("Gate_withGate__23WdV");

// fix if error on any step
