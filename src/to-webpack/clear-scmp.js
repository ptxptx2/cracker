import * as helpers from '../common/helpers.js';

// remove div with class piano-metering__paywall-container
// remove class piano-metering__fade-overlay from div

// take articleBody - parse into two sentence bits and put in div

// exit for now

throw '';

// remove iframe div
var d;
var e;
var f;
var g;
var i;
var j;
var k;

d = document.getElementsByTagName("IFRAME");
for ( i = 0; i < d.length; i++ ) {
    if ( (d[i].src.indexOf( 'subscribe.washingtonpost.com' ) != -1 ) ) {
	e = d[i].parentElement.parentElement;
	e.parentNode.removeChild(e);	
	// do it once
	break;
    }
    if ( (d[i].src.indexOf( 'www.washingtonpost.com/subscribe' ) != -1 ) )  {
	e = d[i].parentElement;
	e.parentNode.removeChild(e);	
	// do it once
	break;
   }
}

// remove subscription side panel
// search for class="logo"
// search for <h3>We've noticed you're blocking ads.</h3>
d = document.getElementsByClassName("logo")
if ( d != null && d.length != 0 ) {
    // delete 4 parents up
    e = d[0].parentNode.parentNode.parentNode.parentNode
    e.style = "display: hidden";
}
    
// remove paywall
//g = document.getElementById("paywall-default");
//if ( g != null ) {
//    g.parentNode.removeChild(g);	
//}
if ( !helpers.removeElementById("paywall-default") ) {
    if ( !helpers.removeFirstElementByClassName("paywall-overlay") ) {
	d = document.getElementById("__next");
	if ( d == null ) {
	    d = document.getElementById("fusion-app");
	}    
	if ( false ) {
	    for ( i = 0; i < g.children.length; i++ ) {
		e = d.children[i];
		if ( e.getAttribute("data-qa") != null && e.getAttribute("data-qa").indexOf('paywall') != -1 ) {
		    e.parentNode.removeChild(e);	
		    // do it once
		    break;
		}

		for ( j = 0; j < e.children.length; j++ ) {
		    f = e.children[j];
 		    for ( k = 0; k < f.children.length; k++ ) {
			g = f.children[k];

			if ( g.getAttribute("id") != null ) {
			    if (g.id.indexOf('paywall') != -1 ) {
				g.parentNode.removeChild(g);
				// do it once
				break;
			    }
			}

		    }
		}
		
	    }
	}
    }
}

// remove div id=wall-bottom-drawer
// remove div id=regwall-850e745244e

helpers.removeElementById("wall-bottom-drawer");
helpers.removeElementById("regwall-850e745244e");

// html and body - remove position style and overlfow style
d = document.getElementsByTagName("BODY");
d[0].style.overflow = "scroll";
d[0].style.position = "static";
d[0].parentElement.style.overflow = "scroll";

// remove leaderboard-wrapper
//g = document.getElementById("leaderboard-wrapper");
//if ( g != null ) {
//    g.parentNode.removeChild(g);	
//}

// remove leaderboard-overlay
helpers.removeElementById("leaderboard-overlay");

// remove overflow-hidden class div
helpers.removeFirstElementByAttributeAndClass("data-qa", "leaderboard", "overflow-hidden");

// put back text
function runEmbedded() {
    // Put here whatever your script needs to do.

    var adds;
    var t;
    var i;

    if ( window.Fusion.globalContent != null ) {
	adds = window.Fusion.globalContent.content_elements;
    }
    else {
	adds = __NEXT_DATA__.props.pageProps.globalContent.content_elements;
    }
    //     t = document.getElementsByClassName("teaser-content")[0].children[0];
        t = document.getElementsByClassName("teaser-content")[0]

    // compare what's there (t) and adds - add what's missing
    // i is initialized to 1 because for some reason adds[0] is always just there
    var i = 1;
    for ( j = 0; j < t.children.length; j++ ) {
	// if t.children[j]."data-qa" != 'subscribe-promo' then count
	if ( t.children[j].children[0].getAttribute("data-qa") != "subscribe-promo" ) {
	    i++;
	}
    }

    for ( ; i < adds.length; i++ ) {
	if ( adds[i].type == "text" ) {
            var div_node = document.createElement("DIV");
	    var text_node = document.createElement("P");
	    //	    div_node.classList.add( "w-700", "mr-auto-ns", "ml-auto-ns" );
   	    div_node.classList.add( "article-body", "grid-center", "grid-body" );
	    text_node.innerHTML = adds[i].content;
//    	    var the_text = document.createTextNode(adds[i].content);
//    	    text_node.appendChild(the_text);
	    text_node.classList.add( "font--body", "font-copy",  "color-gray-darkest", "ma-0", "pb-md" );
	    div_node.appendChild(text_node);
	    t.appendChild(div_node);
	}
	else if ( adds[i].type == "raw_html" ) {
            var div_node = document.createElement("DIV");
	    var html_node = document.createElement("DIV");
	    html_node.innerHTML = adds[i].content;
	    div_node.appendChild(html_node);
	    t.appendChild(div_node);
	}
	else if ( adds[i].type == "image" ) {
            var div_node = document.createElement("DIV");
            var fig_node = document.createElement("FIGURE");
	    var img_node = document.createElement("IMG");
            var fig_caption_node = document.createElement("FIGCAPTION");
            fig_node.classList.add("center", "mb-md", "ml-neg-gutter", "mr-neg-gutter", "ml-auto-ns", "mr-auto-ns", "hide-for-print");
            if ( adds[i].resized_urls != null ) {
		img_node.src = adds[i].resized_urls.large;
	    }
	    else {
		img_node.src = adds[i].url;
	    }
	    if ( adds[i].caption != null ) {
		img_node.alt = adds[i].caption;
	    }
            img_node.width = adds[i].width;
            img_node.classList.add("mw-100");
            fig_node.appendChild(img_node);
            fig_caption_node.classList.add("left", "ml-gutter", "mr-gutter", "mr-auto-ns", "ml-auto-ns", "gray-dark", "font--subhead", "font-xxxs", "mt-xs", "mb-sm");
	    if ( adds[i].caption != null ) {
		fig_caption_node.innerHTML = adds[i].caption;
	    }
            fig_node.appendChild(fig_caption_node);
            div_node.appendChild(fig_node);
            t.appendChild(div_node);
	}
//	else if ( adds[i].type == "video" ) {
//	    
//	}
	else if ( adds[i].type == "header" ) {
            var div_node = document.createElement("DIV");
	    var text_node = document.createElement("H3");
	    text_node.innerHTML = adds[i].content;
//    	    var the_text = document.createTextNode(adds[i].content);
//    	    text_node.appendChild(the_text);
	    text_node.classList.add( "font--body", "font-copy",  "color-gray-darkest", "ma-0", "pad-bottom-md",  "undefined" );
	    div_node.appendChild(text_node);
	    t.appendChild(div_node);
	}
	else if ( adds[i].type == "oembed_response-prev" ) {
	    var div_node = document.createElement("DIV");
	    var oembed_node = document.createElement("DIV");
	    if ( adds[i].subtype == "twitter" ) {
		// <div data-oembed-type="twitter" class="">
		oembed_node.setAttribute( "data-oembed-type", adds[i].subtype );
		// <twitter-widget class="twitter-tweet twitter-tweet-rendered" id="twitter-widget-0" style="position: static; visibility: visible; display: block; transform: rotate(0deg); max-width: 100%; width: 500px; min-width: 220px; margin-top: 10px; margin-bottom: 10px;" data-tweet-id="408983789830815744">
		// </twitter-widget>
		var twitter_node = document.createElement("TWITTER-WIDGET")
		twitter_node.classList.add( "twitter-tweet", "twitter-tweet-rendered" );
		twitter_node.setAttribute( "id", "twitter-widget-0" );

		twitter_node.innerHTML = adds[i].html;

// <script oasync="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
	    }
	    oembed_node.appendChild(twitter_node);
	    div_node.appendChild(oembed_node);
	    t.appendChild(div_node);
	}
	else if ( adds[i].type == "oembed_response" ) {
	    
	    // "<blockquote class="twitter-tweet">
	    //		<p lang="en" dir="ltr"> Tesla stock price is too high imo</p>&mdash; Elon Musk (@elonmusk) <a href="https://twitter.com/elonmusk/status/1256239815256797184?ref_src=twsrc%5Etfw">May 1, 2020</a>
	    // </blockquote>
// <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
// "

	    var bq_node = document.createElement("DIV");
	    bq_node.innerHTML = adds[i].raw_oembed.html + "<BR><BR>"
    
	    t.appendChild(bq_node);
	    try {
		window.twttr.widgets.load( bq_node );
	    }
	    catch (err) {
	    }
	    
	}
		
	else if ( adds[i].type == "oembed_response-new" ) {
	    
	    // <div className="mw-99 flex justify-center mb-sm">
                // <AmpOembed rawOembed={rawOembed} subtype={subtype} />
                // </div>

	    var bq_node = document.createElement("DIV");
	    bq_node.classList.add( "mw-99", "flex", "justify-center", "mb-sm" );

	    var amp_node = document.createElementNS( ".", "AmpOembed" )
	    amp_node.setAttributeNS( ".", "rawOembed", adds[i].raw_oembed );
	    amp_node.setAttributeNS( ".", "subtype", adds[i].subtype );
	    bq_node.appendChild(amp_node);

	    t.appendChild(bq_node);

	    
	    
	}

    }
	
    var oUrl = document.querySelector("meta[property='og:url']").getAttribute("content");
    window.history.pushState("","", oUrl);
//    window.twittr.widgets.load();
}


function embed(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
}

embed(runEmbedded);

// delete div with id template-builder-container--wall

/*

    <script data-vue-meta="true" type="application/ld+json">

{
  "hasPart": {
    "cssSelector": ".paywalled-content", 
    "isAccessibleForFree": "False", 
    "@type": "WebPageElement"
  }, 
  "image": {
    "height": 800, 
    "width": 1200, 
    "url": "https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/03/04/97e9693c-3855-4c40-b8ce-321f5b929f14_b3b8fdf6.jpg?itok=s966wFm6&v=1646384683", 
    "@type": "ImageObject"
  }, 
  "articleSection": "People", 

    "articleBody": "

With only two months left before the May 9 presidential elections, the candidate leading the polls continues to avoid debating his opponents and doing hard interviews with the press. 

On February 27, Ferdinand \u201cBongbong\u201d Marcos Jnr, 64, refused to join nine other presidential candidates in a debate sponsored by CNN Philippines . He said he had a \u201cbusy schedule\u201d. 

On January 22 he was a no-show in a three-hour interview featuring four other candidates with the GMA Network TV station. Marcos\u2019 spokesman Vic Rodriguez claimed the interview would have been \u201cbiased\u201d against his client. 

Who\u2019s who in Philippine presidential election, and their China policies Announcing that the Commission on Elections (Comelec) will host a presidential debate on March 17, spokesman James Jimenez said it was \u201cimportant that candidates take the opportunity to speak to the public, to present their plans for government\u201d. 

Earlier he said a candidate\u2019s refusal to attend a debate \u201ccould be a red flag for the voters\u201d. Journalist Inday Espina-Varona recently wrote on news website Rappler that Marcos\u2019 absence in public debates \u201creflects an unwillingness to have his actions and statements come under the scrutiny of the media and fellow candidates\u201d. 

But it seems Marcos\u2019 aides could not care less. Rodriguez said his chief\u2019s participation in the Comelec debate \u201cwill only be confirmed if his hectic campaign schedules permit\u201d. What is unfolding seems to be part of a deliberate policy where Marcos will do nothing to endanger his high popularity numbers. Polls taken in January show he has a comfortable lead: a Pulse Asia Research survey reported 60 per cent of respondents would vote for Marcos for president, and only 16 per cent \u2013 a distant second \u2013 would choose his closest opponent, current Vice-President Leni Robredo . According to a survey by research organisation Social Weather Stations, 50 per cent of respondents said they would pick Marcos and only 19 per cent would choose Robredo. Political strategist Alan German, president of Agents International Public Relations, said Marcos\u2019 ratings are high because of the disinformation the Marcos family have spread on vast online networks. \u201cThey\u2019ve been at it a long time, they\u2019ve had the advantage of time. They\u2019ve been propagating their very well oiled social media machinery.\u201d The main issue with Marcos junior is that he is the only son and namesake of the brutal dictator whose 14-year martial law regime tortured and murdered thousands of Filipinos . Philippine courts, Switzerland\u2019s Federal Supreme Court and banks have certified that the dictator, who was chased out of the country in 1986 and died in exile, stashed huge amounts of cash abroad. The Marcos family are estimated to have stolen at least US$10 billion. In 2018 Imelda Marcos was sentenced by a Philippine court to 77 years in prison for seven counts of corruption involving the theft of US$200 million. Now 92, she has yet to see the inside of a jail cell. Bongbong himself is a convicted tax evader who has also managed to avoid being jailed. He, his mother and his sisters cannot travel to the US where they risk being immediately arrested for defying a US court judgment to pay billions of dollars to victims of human rights abuses. He denies anything bad happened during his father\u2019s regime, denies that his family plundered the treasury and continues to block attempts by the government to recover still frozen accounts abroad. In the 1990s he sneered that his father\u2019s human rights victims who claimed compensation were only after money, describing them as \u201cvictims of their own greed\u201d. But his family\u2019s criminal reputation hangs heavily over this year\u2019s political campaign. Often, when his motorcade drives by, people on the streets will yell \u201cmagnanakaw\u201d, meaning \u201cthief\u201d. It is one reason Marcos avoids debates and hard interviews: he knows his family\u2019s sordid record will be brought up. This happened in 2016 when he ran for vice-president (ultimately losing to Robredo) and joined a debate. Philippines \u2018Bongbong\u2019 tax evasion accusations dismissed Not only was his family\u2019s record on human rights, corruption and ill-gotten wealth pointed out by the other candidates, but Marcos made a fool of himself. Candidates were given thumbs-up and thumbs-down signs and asked to hold them to express a stance. When asked if he ever engaged in corrupt practices, he initially held his thumbs up-sign, changing to the thumbs-down sign after realising his mistake, leading to laughter and booing from the audience. This all helps to explain why \u201cavoidance\u201d best describes the current Marcos strategy. Not only has he shied away from debates and hard interviews, but he has even occasionally shunned his own followers. Two weeks ago Marcos did the unthinkable: while on a campaign sortie standing inside a truck inching its way through a crowd of supporters, he visibly recoiled when a fan on the street reached up to clasp his right hand. He jerked it away and then turned his back as if disgusted. A video of the incident went viral. His managers tried to spin the story by saying he had been accidentally touched on a hand that had a wound but the photograph they showed was of an injury in Marcos\u2019 left hand. What he had actually jerked away was the right one. Another video from an earlier sortie in one province showed him wincing and grimacing in apparent distaste as a grandmother grabbed him and kissed him on the cheek. The body language he showed is best described by the Tagalog word \u201cnandidiri\u201d \u2013 repulsed. Marcos\u2019 behaviour is unusual in a political culture where, during election campaigns, candidates can barely be restrained from wading into crowds, pressing flesh, barging into houses and kissing babies. Presidential candidates are also expected to give speeches where they describe what is wrong with the country and what they intend to do about it. When he ran for president in 2016, Rodrigo Duterte promised he would bring violence and death to drug criminals. He won, then followed up on his pledge. Other candidates in this year\u2019s election have taken stands on issues. Robredo has vowed to look after the interests of the poor and upgrade the country\u2019s pandemic response. Former boxer Manny Pacquiao promised to jail corrupt officials and provide free housing. Mayor Isko Moreno said he would stand up to China\u2019s maritime encroachment. For his part, Marcos talks about how he will provide \u201cunifying leadership\u201d but does not give details. And his short, generic speeches, geared towards creating memorable sound bites, have been known to disastrously backfire. During a speech in January he apparently lost track of his script and spouted the word \u201calamano\u201d, a nonexistent word in any language in the Philippines. The bewildering expression has become the Filipino equivalent of Donald Trump\u2019s nonsensical \u201ccovfefe\u201d tweet in 2017. In a March 2 tweet, former chief justice Meilou Sereno described the Marcos campaign messaging as \u201cfeel good\u201d and that it aimed to \u201cform an alternative universe in the minds of those who are convinced to believe in their unity theme\u201d. But she said the alternative universe was \u201cempty\u201d. President Duterte, whose daughter Sara is Bongbong\u2019s running mate , is not a fan of Marcos. In November he called him a \u201cweak leader,\u201d hinted he used cocaine and openly called him a \u201cspoiled child\u201d. Compared to his father, Marcos Jnr is a lightweight. The late dictator graduated with a law degree from the elite University of the Philippines, had one of the highest scores in the bar exam, was a master of law and practical politics, exuded charisma and spoke eloquently. Bongbong does not have a degree although he lied about it a few years ago, claiming he got one from Britain\u2019s Oxford University in the 1970s. Plus, being a convicted tax cheat is something critics say should disqualify him outright from running for political office. \u201cHe was convicted of tax evasion in 1995. It carried the penalty of perpetual disqualification from running in and holding any public post,\u201d said Perci Cenda\u00f1a from the left-wing Akbayan Partylist. He said this meant Marcos was lying to Comelec and the Filipino people but Comelec allowed him to run anyway, giving the eyebrow-raising explanation that \u201cfailure to file income tax returns is not inherently immoral\u201d. Although Bongbong pales in comparison to his father, he has one thing his old man never had: the internet . For years the Marcos family has industriously created vast networks of disinformation on Facebook and YouTube, rewriting history and sanitising the clan\u2019s image, turning the brutal dictatorship into a \u201cgolden age\u201d. A simple search using \u201cFerdinand Marcos\u201d on any of these networks will immediately cough up dozens of pages extolling the tyrant\u2019s virtues. There are too-good-to-be-true tales of gold and treasure that the Marcoses say they will share if Bongbong wins. Political strategist German said the family was \u201creinventing their own history, their own myths and just really tying it to a message of return to a glorious age of prosperity, it\u2019s all a promise of utopia\u201d, adding that Filipinos \u201care suckers for that\u201d. Philippines\u2019 Pacquiao vows to chase Marcos\u2019 ill-gotten wealth He said he did not want to sound like an \u201cintellectual snob\u201d but it was apparent in past elections that people in the Philippines \u201creally go\u201d for what are basically empty promises. Victor Andres Manhit, managing director of the think tank Stratbase Group, noted how the internet and social media \u2013 mainly Facebook \u2013 are now a major source of information for voters. In a recent forum, he said the group commissioned a survey to ask respondents about the presidential candidates and characteristics they were looking for and were \u201csurprised\u201d by the results. Philippines\u2019 Marcos Jnr wants military presence to \u2018defend\u2019 South China Sea It\u2019s easy for any candidate to say they will not engage in any negative campaigning but if you have a thousand online trolls to do it for you, you don\u2019t need to personally do the dirty work Political strategist Alan German The respondents assigned more positive characteristics to Marcos than they did to other candidates. \u201cMarcos has concern for the poor, compared to Pacquiao and Moreno, who came from poverty. Marcos is most honest and trustworthy, compared to Robredo. Marcos is not corrupt, compared to everyone.\u201d According to German, what is happening is \u201creally the weaponisation of the internet on social media\u201d. He said that thanks to social media, Marcos Jnr can afford to strike a pose of aloofness and calm and not lash out at his opponents. \u201cIt\u2019s easy for any candidate to say they will not engage in any negative campaigning but if you have a thousand online trolls to do it for you, you don\u2019t need to personally do the dirty work.\u201d \u2018Fake news\u2019: Philippines blasts European Parliament in human rights row The political strategist said the Marcos campaign dynamic was \u201cvery very strange, I would even say never seen before: he is leveraging his father\u2019s achievements, yet you cannot criticise him for his father\u2019s faults. When criticism is thrown at him for the abuses and corruption of the Marcos years, suddenly the narrative becomes, but oh, you cannot fault the son for the sins of the father\u201d. Asked what Marcos\u2019 opponents could do, German said: \u201cThe really unfortunate psychology of the Filipino is that we value machismo. So if I were to strategise? This is a guy who is scared of debates. I would definitely bash that myth of his machismo.\u201d German added that Marcos\u2019 opponents should target the so-called soft voters. \u201cThese are the ones who are being swept up by the hype, the so-called bandwagoners.\u201d He said that, \u201cunscientifically, I\u2019m hoping the number is anywhere from 10 per cent to 12 per cent.\u201d Finally, he said, \u201con a very practical level, just use a lot of celebrity endorsers. The time is right to bring out the celebrities\u201d.", 
  "isAccessibleForFree": "False", 
  "publishingPrinciples": "https://www.scmp.com/policies-and-standards", 
  "correction": [], 
  "mainEntityOfPage": "https://www.scmp.com/week-asia/people/article/3169252/philippine-election-why-front-runner-bongbong-marcos-jnr-so-hands", 
  "description": "With only two months left before the May 9 presidential elections, the candidate leading the polls continues to avoid debating his opponents and doing hard interviews with the press.", 
  "alternativeHeadline": "Why Philippines\u2019 Marcos Jnr is wary of debates in presidential election", 
  "datePublished": "2022-03-06T12:00:19+08:00", 
  "dateModified": "2022-03-06T12:11:07+08:00", 
  "dateCreated": "2022-03-04T17:04:42+08:00", 
  "locationCreated": {
    "name": "Hong Kong", 
    "@type": "Place"
  }, 
  "author": {
    "sameAs": "https://www.scmp.com/author/alan-robles", 
    "name": "Alan Robles", 
    "@type": "Person"
  }, 
  "headline": "Philippine election: why is front runner Bongbong Marcos Jnr so hands-off, wary of debates and pressing the...", 
  "genre": "This Week in Asia", 
  "inLanguage": "en-GB", 
  "publisher": {
    "logo": {
      "height": 60, 
      "width": 600, 
      "url": "https://cdn2.i-scmp.com/sites/all/modules/custom/scmp_masthead/images/publisher_logo.png", 
      "@type": "ImageObject"
    }, 
    "name": "South China Morning Post", 
    "@type": "NewsMediaOrganization"
  }, 
  "@type": "ReportageNewsArticle", 
  "@context": "https://schema.org"
}</script>


<div data-v-6343def7="">
    <p data-v-30bfadf6="" data-v-6343def7="" class="generic-article__body article-details-type--p content--p">
      Announcing that the Commission on Elections (Comelec) will host a presidential debate on March 17, spokesman James Jimenez said it was “important that candidates take the opportunity to speak to the public, to present their plans for government”.
    </p>
    </div>

\u201d quotes
\u2019 apostrophe
 
*/
