import * as helpers from '../common/helpers.js';

// console.log("in clear-newyorker.js");

// remove element class=journey-unit
helpers.removeFirstElementByClassName("journey-unit");

// remove class paywall from div (2x)
helpers.removeClassNameFromFirstElement("paywall","DIV");
helpers.removeClassNameFromFirstElement("paywall","DIV");

helpers.removeFirstElementByClassName("journey-template--paywall-bar");


function runEmbedded() {
    // Put here whatever your script needs to do.

    // append text to div with class = body__inner-container
    // from window.__PRELOADED_STATE__.transformed.article.body

    var s = window.__PRELOADED_STATE__.transformed.article.body;
    var t = document.getElementsByClassName("body__inner-container")[0];

    // skip 0-2; start at 3
    for ( var i=3; i < s.length; i++ ) {
	doArray( s[i], t );
    }

    function doArray( xArray, t ) {
	// look at [0] to determine what to do
	switch( xArray[0] ) {
	case "inline-embed":
	    // [1]['type'] is type
	    // alert( xArray[1]['type'] );
	    switch( xArray[1]['type'] ) {
	    case "image":
		// alert( xArray[1] );
		insertImage( xArray[1], t );
		break;
	    // ignore
	    case "callout:dropcap":
	    case "callout:group-2":
	    case "callout:feature-large":
	    case "cneinterlude":
	    default:
		for ( var i = 2; i < xArray.length; i++ ) {
		    if ( Array.isArray(xArray[i]) ) {
			doArray(xArray[i], t);
		    }
		}
		break;
	    }
	    break;
	case "p":
	    var div_node = document.createElement("DIV");
	    var text = "";
	    var text_node = document.createElement("P");
	    var classes = xArray[1]["class"].split(' ');
	    if ( classes.length > 0 ) {
		for ( var j = 0; j < classes.length; j++ ) {
		    text_node.classList.add( classes[j] );
		}
	    }
	    for ( var i = 2; i < xArray.length; i++ ) {
		if ( Array.isArray(xArray[i]) ) {
		    text = doSubArray(xArray[i]);
		    text_node.innerHTML = text_node.innerHTML.concat(text);
		}
		else {
		    text_node.innerHTML = text_node.innerHTML.concat(xArray[i]);
		}
	    }
	    div_node.appendChild(text_node);
	    t.appendChild(div_node);
	    // console.log(div_node);
	    // console.log(t)
	    break;
	case "ad":
	default:
	    break;
	}
    }

    function doSubArray( xArray ) {
	// alert( "doSubArray: ".concat( xArray ) );
	var text = "";
	switch( xArray[0] ) {
	case "em":
	    for ( var i = 1; i < xArray.length; i++ ) {
		if ( Array.isArray(xArray[i]) ) {
		    text = text.concat(doSubArray(xArray[i]));
		}
		else {
		    text = text.concat(xArray[i]);
		}
	    }
	    return "<em>".concat( text ).concat( "</em>" );
        case "a":
	    return '<a href="'.concat( xArray[1].href ).concat('">').concat( xArray[2] ).concat( "</a>" ) ;
	default:
	    return "";
	}
    }

    function insertImage( imageJSON, t ) {

	var figure_node = document.createElement("FIGURE");
	figure_node.classList.add( "AssetEmbedWrapper-iLfYbx", "iclJOW", "asset-embed" );

	var div_node = document.createElement("DIV");
	div_node.classList.add( "AssetEmbedAssetContainer-fogSSF", "kRpSOB", "asset-embed__asset-container");

	var span_node = document.createElement("SPAN");
	span_node.classList.add( "SpanWrapper-kGGzGm", "fCMktF", "responsive-asset", "AssetEmbedResponsiveAsset-eqsnW", "ehcXJi", "asset-embed__responsive-asset");

	var picture_node = document.createElement("PICTURE");
	picture_node.classList.add( "ResponsiveImagePicture-jIKgcS", "fJlKfN", "AssetEmbedResponsiveAsset-eqsnW", "ehcXJi", "asset-embed__responsive-asset", "responsive-image", "responsive-image--expandable" );
	    
	var img_node = document.createElement("IMG");
	img_node.classList.add( "ResponsiveImageContainer-dlOMGF", "dnUTOP", "responsive-image__image" );
	img_node.src = "https://media.newyorker.com/photos/".concat( imageJSON['ref'] ).concat( '/master/w_1600"');
	img_node.alt = imageJSON.props.image.altText ? imageJSON.props.image.altText : "";

	picture_node.appendChild( img_node );
	span_node.appendChild( picture_node );							     
	div_node.appendChild( span_node );
	figure_node.appendChild( div_node );

	div_node = document.createElement("DIV");
	div_node.classList.add( "CaptionWrapper-brisHk", "hqrsSC", "caption", "AssetEmbedCaption-eXYFag", "gJkEYz", "asset-embed__caption" );
	div_node.setAttribute("data-event-boundary", "click" );
	div_node.setAttribute("data-event-click", "{&quot;pattern&quot;:&quot;Caption&quot;}" );
	div_node.setAttribute("data-include-experiments", "true" );

	span_node = document.createElement("SPAN");
	span_node.classList.add( "BaseWrap-sc-TURhJ", "BaseText-fFzBQt", "CaptionText-cOFJqa", "eTiIvU", "fYICFM", "hTa-dbB", "caption__text" );
	span_node.textContent = imageJSON.props.dangerousCaption;
	div_node.appendChild( span_node );

	span_node = document.createElement("SPAN");
	span_node.classList.add( "BaseWrap-sc-TURhJ", "BaseText-fFzBQt", "CaptionCredit-cTdqxu", "eTiIvU", "eCQuey", "fXWSOn", "caption__credit" );
	span_node.textContent = imageJSON.props.dangerousCredit;
	div_node.appendChild( span_node );

	figure_node.appendChild( div_node );

	t.appendChild( figure_node );
	
    }
	
}

function embed(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
}

embed(runEmbedded);


