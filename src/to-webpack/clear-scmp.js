import * as helpers from '../common/helpers.js';


// take articleBody - parse into two sentence bits and put in div

helpers.removeElementById("template-builder-container--wall");
helpers.removeFirstElementByClassName("piano-metering__paywall-container");
helpers.removeFirstElementByClassName("piano-metering__fade-overlay");
helpers.removeFirstElementByClassName("piano-metering__fade-overlay");

throw('');

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
 
window.__APOLLO_STATE__=

{"d8":{"$ROOT_QUERY.appSetting.viewport":{"width":0,"height":0,"__typename":"viewport"},"$ROOT_QUERY.appSetting":{"viewport":{"type":"id","generated":true,"id":"$ROOT_QUERY.appSetting.viewport","typename":"viewport"},"edition":"int","breakpoint":null,"isUserIdle":false,"isWebCrawler":null,"youtubeAPIReady":false,"scrollPosition":0,"appClient":{"type":"id","generated":true,"id":"$ROOT_QUERY.appSetting.appClient","typename":"appClient"},"requestInfo":{"type":"id","generated":true,"id":"$ROOT_QUERY.appSetting.requestInfo","typename":"requestInfo"},"__typename":"appSetting","domainPath":"https://www.scmp.com"},"$ROOT_QUERY.appSetting.appClient":{"cookieEnabled":true,"browserInfo":{"type":"id","generated":true,"id":"$ROOT_QUERY.appSetting.appClient.browserInfo","typename":"browserInfo"},"operationSystemInfo":{"type":"id","generated":true,"id":"$ROOT_QUERY.appSetting.appClient.operationSystemInfo","typename":"operationSystemInfo"},"__typename":"appClient"},"$ROOT_QUERY.appSetting.appClient.browserInfo":{"name":null,"version":null,"__typename":"browserInfo"},"$ROOT_QUERY.appSetting.appClient.operationSystemInfo":{"name":null,"__typename":"operationSystemInfo"},"$ROOT_QUERY.appSetting.requestInfo":{"location":null,"ip":null,"__typename":"requestInfo"},"ROOT_QUERY":{"appSetting":{"type":"id","generated":true,"id":"$ROOT_QUERY.appSetting","typename":"appSetting"},"debug":{"type":"id","generated":true,"id":"$ROOT_QUERY.debug","typename":"debug"},"headerSetting":{"type":"id","generated":true,"id":"$ROOT_QUERY.headerSetting","typename":"headerSetting"},"homefrontState":{"type":"id","generated":true,"id":"$ROOT_QUERY.homefrontState","typename":"homefrontState"},"topNews":{"type":"id","generated":false,"id":"topnewsexpire:1","typename":"topnewsexpire"},"userInfo":{"type":"id","generated":true,"id":"$ROOT_QUERY.userInfo","typename":"userInfo"},"userBookmarkList":{"type":"id","generated":true,"id":"$ROOT_QUERY.userBookmarkList","typename":"userBookmarkList"},"userFollowList":{"type":"id","generated":true,"id":"$ROOT_QUERY.userFollowList","typename":"userFollowList"},"articleState":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState","typename":"articleState"},"gtmData":{"type":"id","generated":true,"id":"$ROOT_QUERY.gtmData","typename":"gtmData"},"series":{"type":"id","generated":true,"id":"$ROOT_QUERY.series","typename":"series"},"shareCount":{"type":"id","generated":true,"id":"$ROOT_QUERY.shareCount","typename":"shareCount"},"socialShare":{"type":"id","generated":true,"id":"$ROOT_QUERY.socialShare","typename":"socialShare"},"stickTopicArticleRecommendation":{"type":"id","generated":true,"id":"$ROOT_QUERY.stickTopicArticleRecommendation","typename":"stickTopicArticleRecommendation"},"covidTracker":{"type":"id","generated":true,"id":"$ROOT_QUERY.covidTracker","typename":"covidTracker"},"articleYoutubeVideo":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleYoutubeVideo","typename":"articleYoutubeVideo"},"advert":{"type":"id","generated":true,"id":"$ROOT_QUERY.advert","typename":"advert"},"myNews":{"type":"id","generated":true,"id":"$ROOT_QUERY.myNews","typename":"myNews"},"newsletter":{"type":"id","generated":true,"id":"$ROOT_QUERY.newsletter","typename":"newsletter"},"onboard":{"type":"id","generated":true,"id":"$ROOT_QUERY.onboard","typename":"onboard"},"optimizeConfig":{"type":"id","generated":true,"id":"$ROOT_QUERY.optimizeConfig","typename":"optimizeConfig"},"paywall":{"type":"id","generated":true,"id":"$ROOT_QUERY.paywall","typename":"paywall"},"piano":{"type":"id","generated":true,"id":"$ROOT_QUERY.piano","typename":"piano"},"ticker":{"type":"id","generated":true,"id":"$ROOT_QUERY.ticker","typename":"ticker"},"snackBar":{"type":"id","generated":true,"id":"$ROOT_QUERY.snackBar","typename":"snackBar"},"acknowledgementGate":{"type":"id","generated":true,"id":"$ROOT_QUERY.acknowledgementGate","typename":"acknowledgementGate"},"snackbar":{"type":"id","generated":true,"id":"$ROOT_QUERY.snackbar","typename":"snackbar"},"login":{"type":"id","generated":true,"id":"$ROOT_QUERY.login","typename":"login"},"notificationWidget":{"type":"id","generated":true,"id":"$ROOT_QUERY.notificationWidget","typename":"notificationWidget"},"GDPRStatus":{"type":"id","generated":true,"id":"$ROOT_QUERY.GDPRStatus","typename":"GDPRStatus"},"articleCentralRecircWizard":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleCentralRecircWizard","typename":"articleCentralRecircWizard"},"subscriptionStatus":{"type":"id","generated":true,"id":"$ROOT_QUERY.subscriptionStatus","typename":"subscriptionStatus"},"commentWidget":{"type":"id","generated":true,"id":"$ROOT_QUERY.commentWidget","typename":"commentWidget"},"hongKong25FollowIndicator":{"type":"id","generated":true,"id":"$ROOT_QUERY.hongKong25FollowIndicator","typename":"hongKong25FollowIndicator"}},"$ROOT_QUERY.debug":{"eventTraces":{"type":"json","json":[]},"__typename":"debug"},"$ROOT_QUERY.headerSetting":{"onTop":true,"showPopMenu":false,"showMenu":true,"activeHeaderWhiteTheme":false,"activeHomePage":-1,"scrollingTarget":"","transferState":false,"homeScrollTop":0,"opinionScrollTop":0,"liveScrollTop":0,"headerHidden":false,"topAdsHidden":false,"__typename":"headerSetting"},"$ROOT_QUERY.homefrontState":{"articleEntityUuids":{"type":"json","json":[]},"__typename":"homefrontState"},"topnewsexpire:1":{"id":1,"expire":"20221130194000","__typename":"topnewsexpire"},"$ROOT_QUERY.userInfo":{"uid":null,"uuid":null,"mail":null,"firstname":null,"lastname":null,"esiname":null,"upic":null,"activateEmail":null,"country":null,"IP":null,"isCompanyInternalNetwork":false,"scmpSubscriber":null,"monthlySubscriber":null,"source":null,"created":null,"loginType":null,"level":null,"subscribedNewsletters":{"type":"json","json":[]},"userRole":null,"__typename":"userInfo"},"$ROOT_QUERY.userBookmarkList":{"entityId":{"type":"json","json":[]},"isNew":false,"isRipple":false,"bookmarkMessageOn":false,"bookmarkMessage":"","__typename":"userBookmarkList"},"$ROOT_QUERY.userFollowList":{"authors":null,"topics":null,"sections":null,"knowledges":null,"__typename":"userFollowList"},"$ROOT_QUERY.articleState":{"behindWallArticleEntityUuIds":{"type":"json","json":[]},"isHeadlineVisible":false,"isSocialSharingPopupVisible":false,"showComment":false,"deepLinkedCommentId":null,"popupCommentArticleId":null,"showOpinionLeftPopup":false,"showOpinionRightPopup":false,"showSubscribeNewsletterSuccessPopup":false,"acquisitionNewsletterPopup":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.acquisitionNewsletterPopup","typename":"acquisitionNewsletterPopup"},"showDebateBackdrop":false,"showModalBackdrop":false,"showCommentPopupBackdrop":false,"socialSharingUrl":null,"commentCount":null,"isFPTO":null,"currentArticle":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.currentArticle","typename":"currentArticle"},"articleSwiper":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper","typename":"articleSwiper"},"__typename":"articleState"},"$ROOT_QUERY.articleState.acquisitionNewsletterPopup":{"messageShow":false,"themeType":null,"campaignName":null,"articleNewsletterWidget":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.acquisitionNewsletterPopup.articleNewsletterWidget","typename":"acquisitionArticleNewsletterWidget"},"__typename":"acquisitionNewsletterPopup"},"$ROOT_QUERY.articleState.acquisitionNewsletterPopup.articleNewsletterWidget":{"entityId":null,"entitySummary":null,"entityLabel":null,"nidList":{"type":"json","json":[]},"__typename":"acquisitionArticleNewsletterWidget"},"$ROOT_QUERY.articleState.currentArticle":{"__typename":"currentArticle","articleTypes":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.currentArticle.articleTypes","typename":"currentArticleType"},"authorName":"","authors":{"type":"json","json":[]},"authorTypes":{"type":"json","json":[]},"commentCount":null,"contentLock":null,"contentType":"","copyrighted":null,"createdDate":null,"deDuplicationKey":"article_1_1","entityId":"","entityUuid":"","headline":"","identity":null,"mainSection":"","mainSectionUrlAlias":"","paywallTypes":{"type":"json","json":[]},"primarySectionIds":{"type":"json","json":[]},"printHeadline":"","publishedDate":null,"sectionIds":{"type":"json","json":[]},"sections":{"type":"json","json":[]},"sentiment":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.currentArticle.sentiment","typename":"currentArticleSentiment"},"socialHeadline":"","sponsor":"","sponsorType":null,"topicForFollow":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.currentArticle.topicForFollow","typename":"topicForFollow"},"topicIds":{"type":"json","json":[]},"topics":{"type":"json","json":[]},"types":"","updatedDate":null,"urlAlias":"","writer":null},"$ROOT_QUERY.articleState.currentArticle.articleTypes":{"__typename":"currentArticleType","entityIds":{"type":"json","json":[]},"entityUuids":{"type":"json","json":[]},"names":{"type":"json","json":[]}},"$ROOT_QUERY.articleState.currentArticle.sentiment":{"__typename":"currentArticleSentiment","readability_school_level":{"type":"json","json":[]},"sentiment_category":""},"$ROOT_QUERY.articleState.currentArticle.topicForFollow":{"__typename":"topicForFollow","disableFollow":false,"entityId":"","name":"","urlAlias":""},"$ROOT_QUERY.articleState.articleSwiper":{"allowTouchMove":false,"allowChangeSlide":false,"containerIndex":1,"container":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.container","typename":"articleSwiperContainers"},"headArticle":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.headArticle","typename":"articleSwiperHeadArticles"},"currentIndex":0,"__typename":"articleSwiper"},"$ROOT_QUERY.articleState.articleSwiper.container.container0":{"containerIndex":0,"reset":true,"scrollTop":0,"hardReset":false,"isHeadlineVisible":false,"__typename":"articleSwiperContainer0"},"$ROOT_QUERY.articleState.articleSwiper.container":{"container0":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.container.container0","typename":"articleSwiperContainer0"},"container1":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.container.container1","typename":"articleSwiperContainer1"},"container2":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.container.container2","typename":"articleSwiperContainer2"},"__typename":"articleSwiperContainers"},"$ROOT_QUERY.articleState.articleSwiper.container.container1":{"containerIndex":1,"reset":false,"scrollTop":0,"hardReset":false,"isHeadlineVisible":false,"__typename":"articleSwiperContainer1"},"$ROOT_QUERY.articleState.articleSwiper.container.container2":{"containerIndex":2,"reset":false,"scrollTop":0,"hardReset":false,"isHeadlineVisible":false,"__typename":"articleSwiperContainer2"},"$ROOT_QUERY.articleState.articleSwiper.headArticle.currentHeadArticle":{"entityId":"","headline":"","urlAlias":"","topics":{"type":"json","json":[]},"mainSection":"","mainSectionUrlAlias":"","__typename":"currentHeadArticle"},"$ROOT_QUERY.articleState.articleSwiper.headArticle":{"currentHeadArticle":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.headArticle.currentHeadArticle","typename":"currentHeadArticle"},"nextHeadArticle":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.headArticle.nextHeadArticle","typename":"nextHeadArticle"},"prevHeadArticle":{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.headArticle.prevHeadArticle","typename":"prevHeadArticle"},"__typename":"articleSwiperHeadArticles"},"$ROOT_QUERY.articleState.articleSwiper.headArticle.nextHeadArticle":{"entityId":"","headline":"","urlAlias":"","topics":{"type":"json","json":[]},"mainSection":"","mainSectionUrlAlias":"","__typename":"nextHeadArticle"},"$ROOT_QUERY.articleState.articleSwiper.headArticle.prevHeadArticle":{"entityId":"","headline":"","urlAlias":"","topics":{"type":"json","json":[]},"mainSection":"","mainSectionUrlAlias":"","__typename":"prevHeadArticle"},"$ROOT_QUERY.gtmData":{"__typename":"gtmData","adBlocker":"no","articleID":null,"articleIdentity":null,"articleType":null,"authorName":null,"authors":null,"authorType":null,"canonicalURL":null,"contentType":null,"edition":null,"entityId":null,"entityUuid":null,"name":null,"page":null,"pageTitle":null,"path":null,"primarySection":null,"printHeadline":null,"publishedDate":null,"scmpCopyright":null,"scmpWriter":null,"searchKeyword":null,"sections":null,"slideIndex":null,"socialHeadline":null,"sponsor":null,"swipeFrom":null,"topicID":null,"topics":null,"webHeadline":null},"$ROOT_QUERY.series":{"currentAnchor":1,"__typename":"series"},"$ROOT_QUERY.shareCount":{"shareCountList":"","__typename":"shareCount"},"$ROOT_QUERY.socialShare":{"onScreen":false,"__typename":"socialShare"},"$ROOT_QUERY.stickTopicArticleRecommendation":{"isVisible":false,"forceClosed":false,"__typename":"stickTopicArticleRecommendation"},"$ROOT_QUERY.covidTracker":{"upperIntersected":false,"upperIntersecting":false,"lowerIntersected":false,"lowerIntersecting":false,"__typename":"covidTracker"},"$ROOT_QUERY.articleYoutubeVideo":{"youtubeID":"","isRunning":false,"hasPlayerPlaying":false,"lastArticleEntityIdPlayingAt":"","__typename":"articleYoutubeVideo"},"$ROOT_QUERY.advert":{"takeover":false,"directCampaignLineItemIds":{"type":"json","json":[]},"disableAutoRefreshCountries":{"type":"json","json":[]},"adslots":{"type":"json","json":[]},"__typename":"advert"},"$ROOT_QUERY.myNews":{"isShowInitPageSetup":true,"isShowTopicPopup":false,"isShowLandingPopup":false,"isShownLandingPopup":false,"isShowRedeemPopup":false,"isShownRedeemPopup":false,"isShowIndicatorCard":false,"isJustRedeemedPromotion":false,"isOnboardingNextSession":true,"isItemsUpdate":false,"isJustTriggeredFollow":false,"isAutoFollowForAnonymous":false,"removeTopicIds":{"type":"json","json":[]},"removeAuthorIds":{"type":"json","json":[]},"removeSectionIds":{"type":"json","json":[]},"removeKnowledgeIds":{"type":"json","json":[]},"myDailyFiveArticleIds":{"type":"json","json":[]},"myNewsSelectorView":"","__typename":"myNews"},"$ROOT_QUERY.newsletter":{"doneSubscription":false,"__typename":"newsletter"},"$ROOT_QUERY.onboard":{"popupActive":false,"__typename":"onboard"},"$ROOT_QUERY.optimizeConfig":{"data":"","__typename":"optimizeConfig"},"$ROOT_QUERY.paywall":{"isActive":false,"displayMode":"","views":0,"viewsLeft":5,"customEvent":"","archiveWallArticleList":{"type":"json","json":[]},"articleWallTypes":{"type":"json","json":[]},"__typename":"paywall"},"$ROOT_QUERY.piano":{"ready":false,"engineReady":false,"isExecuted":false,"isIPAccessUser":false,"isShowRosetta":true,"isShowVelocityWall":true,"appSettings":{"type":"id","generated":true,"id":"$ROOT_QUERY.piano.appSettings","typename":"appSettings"},"clientName":"","__typename":"piano"},"$ROOT_QUERY.piano.appSettings":{"oldArticleTimeframe":15,"mixpanelStorage":"","isShowPremiumPromo":false,"paywallCampaign":"","__typename":"appSettings"},"$ROOT_QUERY.ticker":{"name":"","queueName":"","isOthersOn":true,"isBreakingOn":true,"isBreakingDoneTransition":true,"articleCurrentNid":"","sector":"","__typename":"ticker"},"$ROOT_QUERY.snackBar":{"isShowBreakingTicker":false,"isShowOtherTicker":false,"isShowEdition":false,"isShowActivation":false,"__typename":"snackBar"},"$ROOT_QUERY.acknowledgementGate":{"entityId":"","isShow":false,"__typename":"acknowledgementGate"},"$ROOT_QUERY.snackbar":{"snackbarMessage":"","show":false,"__typename":"snackbar"},"$ROOT_QUERY.login":{"isShowPopup":false,"title":"","description":"","destination":"","isPasswordless":false,"isRegiWall":false,"wallType":"","registrationTerm":"","isLoginReminderPopup":false,"sendWelcomeEmail":true,"trigger_point":"","paywall_type":"","campaign_name":"","newsletter_name":"","follow_type":"","follow_name":"","__typename":"login"},"$ROOT_QUERY.notificationWidget":{"isNewReadingHistory":false,"isDeleteReadingHistory":false,"isShowPopup":false,"isShowHints":true,"__typename":"notificationWidget"},"$ROOT_QUERY.GDPRStatus":{"isAccepted":false,"isAcceptedGDPRDelayed":false,"isAcceptedGDPRNextSession":false,"__typename":"GDPRStatus"},"$ROOT_QUERY.articleCentralRecircWizard":{"isEnabled":false,"isActivated":false,"isInitialised":false,"isPerpetualScroll":true,"isShowRHSContent":true,"isShowLHSContent":true,"__typename":"articleCentralRecircWizard"},"$ROOT_QUERY.subscriptionStatus":{"clientName":null,"isOverallChurned":null,"isCorpSubscriber":null,"isInternalStaff":null,"isSCMPChurned":null,"isSCMPSubscriber":null,"isSiteLicenseSubscriber":null,"isVipExclusive":null,"isYPChurned":null,"isYPSubscriber":null,"scmpWinbackPeriod":null,"subscriptionProducts":{"type":"json","json":[]},"isUpgradeable":null,"isFreeSubscriber":null,"isAutoRenew":null,"isAutoRenewable":null,"tier":null,"expiryReminder":{"type":"id","generated":true,"id":"$ROOT_QUERY.subscriptionStatus.expiryReminder","typename":"expiryReminder"},"gracePeriod":{"type":"id","generated":true,"id":"$ROOT_QUERY.subscriptionStatus.gracePeriod","typename":"gracePeriod"},"v6Retain":{"type":"id","generated":true,"id":"$ROOT_QUERY.subscriptionStatus.v6Retain","typename":"v6Retain"},"__typename":"subscriptionStatus"},"$ROOT_QUERY.subscriptionStatus.expiryReminder":{"expireDate":0,"dayLeft":0,"isAutoRenewReminder":false,"isRenewNowReminder":false,"isPromoBeingUsed":false,"termPeriod":"","currency":"","price":0,"renewNowPromoCode":"","termId":"","isFirstChurning":false,"isSecondChurning":false,"promoCode":"","__typename":"expiryReminder"},"$ROOT_QUERY.subscriptionStatus.gracePeriod":{"isActive":false,"daysLeft":0,"isWithinHalf":false,"expiryDate":0,"halfExpiryDate":0,"startDate":0,"gracePeriodLength":0,"__typename":"gracePeriod"},"$ROOT_QUERY.subscriptionStatus.v6Retain":{"isActive":false,"expireDate":0,"dayLeft":0,"__typename":"v6Retain"},"$ROOT_QUERY.commentWidget":{"watchedList":{"type":"json","json":[]},"__typename":"commentWidget"},"$ROOT_QUERY.hongKong25FollowIndicator":{"isIndicatorShow":false,"__typename":"hongKong25FollowIndicator"}},"contentService":{"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"})":{"urlAlias":"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount","item":{"type":"id","generated":true,"id":"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item","typename":"Article"},"__typename":"UrlPath"},"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item":{"socialHeadline":"‘I’d rather stay home’: Beijing residents push back at Covid rules as cases mount","printHeadline":null,"entityUuid":"c1512b18-86a2-4dcf-bc76-003206c770c8","contentLock":true,"types":[],"application":{"type":"id","generated":true,"id":"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.application","typename":"Application"},"sections":[[{"type":"id","generated":true,"id":"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.sections.0.0","typename":"Section"},{"type":"id","generated":true,"id":"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.sections.0.1","typename":"Section"},{"type":"id","generated":true,"id":"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.sections.0.2","typename":"Section"}],[{"type":"id","generated":true,"id":"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.sections.1.0","typename":"Section"},{"type":"id","generated":true,"id":"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.sections.1.1","typename":"Section"}]],"published":true,"topics":[{"type":"id","generated":true,"id":"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.topics.0","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.topics.1","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.topics.2","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.topics.3","typename":"Topic"}],"__typename":"Article"},"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.application":{"entityId":"325477","__typename":"Application"},"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.sections.0.0":{"entityId":"91","__typename":"Section"},"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.sections.0.1":{"entityId":"4","__typename":"Section"},"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.sections.0.2":{"entityId":"318198","__typename":"Section"},"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.sections.1.0":{"entityId":"505323","__typename":"Section"},"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.sections.1.1":{"entityId":"505356","__typename":"Section"},"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.topics.0":{"entityId":"505274","__typename":"Topic"},"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.topics.1":{"entityId":"503456","__typename":"Topic"},"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.topics.2":{"entityId":"503302","__typename":"Topic"},"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"}).item.topics.3":{"entityId":"326212","__typename":"Topic"},"ROOT_QUERY":{"checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"})":{"type":"id","generated":true,"id":"$ROOT_QUERY.checkPath({\"url\":\"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount\"})","typename":"UrlPath"},"appConfig({\"filter\":{\"entityId\":\"scmp_pwa_widget\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.appConfig({\"filter\":{\"entityId\":\"scmp_pwa_widget\"}})","typename":"AppConfig"},"queue({\"filter\":{\"name\":\"section_top_513307\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}})","typename":"Queue"},"article({\"filter\":{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.article({\"filter\":{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\"}})","typename":"Article"},"content({\"contentType\":\"Article\",\"filter\":{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.content({\"contentType\":\"Article\",\"filter\":{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}})","typename":"Article"},"queue({\"filter\":{\"name\":\"section_top_513305\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513305\"}})","typename":"Queue"},"queue({\"filter\":{\"name\":\"editor_picks_513304\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"editor_picks_513304\"}})","typename":"Queue"}},"$ROOT_QUERY.appConfig({\"filter\":{\"entityId\":\"scmp_pwa_widget\"}})":{"json":{"type":"json","json":{"production":{"photo_essay":[{"url":"/news/hong-kong/society/article/3181170/rupture-and-reset-2017-2022-hong-kongs-turbulent-years-and","publishedDate":"Coming soon","isPublished":true,"headline":"Rupture and reset (2017-2022): Hong Kong’s turbulent years and Covid-19 battle in 25 photos","title":"","votingUrl":"","year":"","images":["https://cdn.i-scmp.com/sites/default/files/d8/images/2022/06/16/S5%20HERO.jpeg",""]},{"url":"/news/hong-kong/society/article/3181513/honeymoon-years-1997-2002-hong-kongs-early-years-under","publishedDate":"Coming soon ","isPublished":true,"headline":"","title":"Honeymoon years","votingUrl":"","year":"1997-2002","images":["https://cdn.i-scmp.com/sites/default/files/d8/images/2022/06/11/S1%20lead_l.jpg",""]},{"url":"/news/hong-kong/society/article/3181375/surviving-sars-2002-2007-hong-kongs-first-major-health-and","publishedDate":"Coming soon ","isPublished":true,"headline":"","title":"Surviving Sars","votingUrl":"","year":"2002-2007","images":["https://cdn.i-scmp.com/sites/default/files/d8/images/2022/06/11/S2%20lead_0.jpeg",""]},{"url":"/news/hong-kong/society/article/3181376/storm-2007-2012-hong-kongs-national-pride-and-rare-political","publishedDate":"Coming soon ","isPublished":true,"headline":"","title":"Before the storm","votingUrl":"","year":"2007-2012","images":["https://cdn.i-scmp.com/sites/default/files/d8/images/2022/06/11/S3%20lead_l.jpeg",""]},{"url":"/news/hong-kong/society/article/3181374/darkening-skies-2012-2017-hong-kongs-years-simmering","publishedDate":"Coming soon ","isPublished":true,"headline":"","title":"Darkening skies","votingUrl":"","year":"2012-2017","images":["https://cdn.i-scmp.com/sites/default/files/d8/images/2022/06/11/S4%20lead_l.jpeg",""]},{"url":"/news/hong-kong/society/article/3181170/rupture-and-reset-2017-2022-hong-kongs-turbulent-years-and","publishedDate":"Coming soon","isPublished":true,"headline":"","title":"Rupture & reset","votingUrl":"","year":"2017-2022","images":["https://cdn.i-scmp.com/sites/default/files/d8/images/2022/06/11/S5%20Lead_l.jpeg",""]}],"notification_widget_download_cta":"1","fpto_covid1yr":"0","olympics_faq":"1","olympics_homepage_header":"0","olympics_today_highlight":"0","olympics_dpa":{"src":"https://d1xvrur53k8j42.cloudfront.net/customers/olympics/aws/2020/dpa-shop/html/index.html","path":"https://d1xvrur53k8j42.cloudfront.net/oly_so/","medal":{"enable":"0","update_time":"180","timezone":"8","country":"HKG","inline":{"enable":"0","update_time":"180","timezone":"8","country":"HKG"}},"EOTD":{"enable":"0","update_time":"180","timezone":"8","country":"CHN"}},"beijing_olympics_microsite_events_start_date":"2022-02-02 00:00:00","beijing_olympics_microsite_events_end_date":"2022-02-20 00:00:00","beijing_olympics_microsite_events_date_format":"MMMM D, YYYY","beijing_olympics_microsite_events_fallback_text":"Our apologies, we are experiencing some technical difficulties. Please bare with us while we work to resolve the problem.","beijing_olympics_microsite_header_start_date":"2022-02-05 00:00:00","beijing_olympics_microsite_header_end_date":"2022-02-20 00:00:00","beijing_olympics_microsite_header_date_format":"MMMM D, YYYY","beijing_olympics_microsite_header_before_text":"Begin on February 4, 2022","olympics_homepage_header_info":{"isEnabled":false,"title":"Beijing Winter Olympics 2022","description":"Latest news, schedule, results and more","urlAlias":"/beijing-olympics-2022","startDateISOString":"2022-02-04T00:00:00.000+08:00","endDateISOString":"2022-02-20T00:00:00.000+08:00"},"olympics_homepage_medal_table_info":{"isEnabled":false,"title":"Beijing Winter Olympics 2022","description":"Latest news, schedule, results and more","urlAlias":"/beijing-olympics-2022","startDateISOString":"2022-02-08T00:00:00.000+08:00","endDateISOString":"2022-02-20T00:00:00.000+08:00"},"olympics_sport_homepage_header_info":{"isEnabled":true,"title":"Beijing Winter Games 2022","urlAlias":"/beijing-olympics-2022"},"print_edition_ribbon":{"pgtype":"homepage","module":"ce_election_bar","isEnabled":false,"text":"<strong>Hong Kong's leadership transition 2022</strong>","url":"/topics/hong-kong-chief-executive-election-2022","isExternalLink":false,"isShowAlertIcon":false},"print_edition_footer":{"isEnabled":false,"text":"<strong>Covid-19 update:</strong> <u>accessing SCMP's print edition</u> during Hong Kong's 5th wave","desc":"Due to the current Covid-19 situation in Hong Kong which may cause unpredictable delivery challenges for the South China Morning Post print paper edition, print subscribers can access our ePaper edition upon request.","url":"/page/3171221/accessing-scmps-print-edition-during-5th-wave-covid-19-hong-kong","buttonText":"FIND OUT MORE","isExternalLink":true},"remove_large_cookies_in_client_side":{"isEnabled":false,"threshold":800},"hk_25_ribbon":{"pgtype":"homepage","module":"hk25_ribbon","isEnabled":true,"text":"How the city has changed since its return to Chinese sovereignty and what the future holds","url":"/hong-kong-25","isExternalLink":false},"hk_25_icon_links":{"camera":{"isEnabled":true,"isExternalLink":false,"text":"From our archives: The city in pictures","url":"#hk25-photo-module"},"thumb":{"isEnabled":true,"isExternalLink":true,"text":"Own iconic moments with ARTIFACT NFTs","url":"https://artifact.scmp.com/"}},"twenty_congress_ribbon":{"pgtype":"homepage","module":"twenty_congress_ribbon","isEnabled":false,"text":"Decoding China’s leadership reshuffle","url":"/20th-party-congress","isExternalLink":false},"china_power_player":{"upper":[{"name":"The 20th Politburo","actionName":"EXPLORE","articleUrl":"https://multimedia.scmp.com/infographics/news/china/article/3195576/20th-politburo-standing-committee/index.html","imgUrl":"https://assets.i-scmp.com/20th-party-congress-static/powerbank1.png","updatedDate":"24 Oct, 2022","isRecentlyUpdated":true},{"name":"The Central Military Commission","actionName":"READ","articleUrl":"https://multimedia.scmp.com/infographics/news/china/article/3195706/20th-central-military-committee/index.html","imgUrl":"https://assets.i-scmp.com/20th-party-congress-static/powerbank2.png","updatedDate":"24 Oct, 2022","isRecentlyUpdated":true},{"name":"Faces to Watch","actionName":"READ","articleUrl":"https://multimedia.scmp.com/infographics/news/china/article/3185759/ccp-rising-stars/index.html","imgUrl":"https://assets.i-scmp.com/20th-party-congress-static/powerbank3.png","updatedDate":"","isRecentlyUpdated":false},{"name":"Friends in high places","actionName":"EXPLORE","articleUrl":"https://multimedia.scmp.com/infographics/news/china/article/3185751/ccp-connections/index.html","imgUrl":"https://assets.i-scmp.com/20th-party-congress-static/powerbank4.png","updatedDate":"","isRecentlyUpdated":false}],"lower":[{"pillar":"The 20th Politburo","name":"Cai Qi","position":"First secretary of the Central Secretariat","imgUrl":"https://infographics-video.scmp.com/20thCentralCommittee/politburo/cai-qi.jpg","articleUrl":"https://multimedia.scmp.com/infographics/news/china/article/3195576/20th-politburo-standing-committee/index.html"},{"pillar":"The 20th Politburo","name":"Li Shulei","position":"Executive deputy director of the Central Publicity Department","imgUrl":"https://infographics-video.scmp.com/20thCentralCommittee/politburo/lishulei.jpg","articleUrl":"https://multimedia.scmp.com/infographics/news/china/article/3195576/20th-politburo-standing-committee/index.html"},{"pillar":"The 20th Politburo","name":"Huang Kunming","position":"Secretary of the Central Secretariat","imgUrl":"https://infographics-video.scmp.com/20thCentralCommittee/politburo/huang-kuming.jpg","articleUrl":"https://multimedia.scmp.com/infographics/news/china/article/3195576/20th-politburo-standing-committee/index.html"}]},"my_news":{"is_enabled_in_ad_profile":true,"is_enabled_24_hr_promotion":false,"completion_popup":{"isEnabled":true},"landing_popup":{"isEnabled":true}}},"dev":{"photo_essay":[{"url":"/magazines/post-magazine/arts-music/article/3176771/photos-hong-kong-aftermath-world-war-ii-capture","publishedDate":"Coming soon","isPublished":false,"headline":"Title to be provided ","title":"","votingUrl":"https://www.facebook.com/ProgrammersCreateLife/photos/a.241809332534619/5141117025937134/","year":"","images":["https://cdn.i-scmp.com/sites/default/files/d8/images/2022/06/13/S1%20HERO.jpeg",""]},{"url":"/magazines/post-magazine/arts-music/article/3176771/photos-hong-kong-aftermath-world-war-ii-capture","publishedDate":"Coming soon ","isPublished":false,"headline":"","title":"Honeymoon years","votingUrl":"https://www.facebook.com/ProgrammersCreateLife/photos/a.241809332534619/5141117025937134/","year":"1997-2002","images":["https://cdn.i-scmp.com/sites/default/files/d8/images/2022/06/11/S1%20lead_l.jpg",""]},{"url":"/magazines/post-magazine/arts-music/article/3176771/photos-hong-kong-aftermath-world-war-ii-capture","publishedDate":"Coming soon ","isPublished":false,"headline":"","title":"Surviving Sars","votingUrl":"https://www.facebook.com/ProgrammersCreateLife/photos/a.241809332534619/5141117025937134/","year":"2002-2007","images":["https://cdn.i-scmp.com/sites/default/files/d8/images/2022/06/11/S2%20lead_0.jpeg",""]},{"url":"/magazines/post-magazine/arts-music/article/3176771/photos-hong-kong-aftermath-world-war-ii-capture","publishedDate":"Comming soon ","isPublished":false,"headline":"","title":"Before the storm","votingUrl":"","year":"2007-2012","images":["https://cdn.i-scmp.com/sites/default/files/d8/images/2022/06/11/S3%20lead_l.jpeg",""]},{"url":"/magazines/post-magazine/arts-music/article/3176771/photos-hong-kong-aftermath-world-war-ii-capture","publishedDate":"Coming soon ","isPublished":false,"headline":"","title":"SHORT one 4","votingUrl":"","year":"2012-2017","images":["https://cdn.i-scmp.com/sites/default/files/d8/images/2022/06/11/S4%20lead_l.jpeg",""]},{"url":"/magazines/post-magazine/arts-music/article/3176771/photos-hong-kong-aftermath-world-war-ii-capture","publishedDate":"Coming soon","isPublished":false,"headline":"","title":"Rupture & reset","votingUrl":"https://www.facebook.com/ProgrammersCreateLife/photos/a.241809332534619/5141117025937134/","year":"2017-2022","images":["https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/05/06/f269bb0a-b4f6-4933-9eaa-019843e0e915_2e54cde9.jpg",""]}],"notification_widget_download_cta":"0","semi_fpto_content_list":[{"allowed_paths":["/lifestyle"],"button_text":"EXPLORE NOW","image_info_list":[{"image":"https://assets.i-scmp.com/static/img/jpeg/osc-2021-fpto.jpg","link":"https://osc.scmp.com/scmp-osc-2021charitynfts?utm_source=scmp&utm_medium=ppto&utm_campaign=GME-O-scmp-uv-osc2021"}],"local_storage_key":"osc-2021-fpto","sub_title":"Find out more about our first ever NFT charity auction,<br>supported by five Hong Kong artists.","title":"NFT charity auction<br>for Operation Santa Claus"},{"allowed_paths":["/news/hong-kong","/tech","/culture","/business"],"image_info_list":[{"image":"https://assets.i-scmp.com/static/img/jpeg/PPTO_wave1_message1_Discover_600x500_v4@2x.jpg","link":"https://artifact.scmp.com/?module=ppto&pgtype=article&campaign=general_GME-O-artifacts-uv-wave1_message1"},{"image":"https://assets.i-scmp.com/static/img/jpeg/PPTO_wave1_message2_Own_600x500_v5@2x.jpg","link":"https://artifact.scmp.com/?module=ppto&pgtype=article&campaign=general_GME-O-artifacts-uv-wave1_message2"},{"image":"https://assets.i-scmp.com/static/img/jpeg/PPTO_wave1_message3_Preserve_600x500_v4@2x.jpg","link":"https://artifact.scmp.com/?module=ppto&pgtype=article&campaign=general_GME-O-artifacts-uv-wave1_message3"}],"local_storage_key":"NFT-artifacts-fpto"}],"fpto_covid1yr":"1","olympics_faq":"1","olympics_homepage_header":"0","olympics_today_highlight":"0","olympics_dpa":{"src":"https://d1xvrur53k8j42.cloudfront.net/customers/olympics/aws/2020/dpa-shop/html/index.html","path":"https://d1xvrur53k8j42.cloudfront.net/oly_so/","medal":{"enable":"0","update_time":"180","timezone":"8","country":"HKG","inline":{"enable":"0","update_time":"180","timezone":"8","country":"HKG"}},"EOTD":{"enable":"0","update_time":"180","timezone":"8","country":"CHN"}},"beijing_olympics_microsite_events_start_date":"2022-02-02 00:00:00","beijing_olympics_microsite_events_end_date":"2022-02-20 00:00:00","beijing_olympics_microsite_events_date_format":"MMMM D, YYYY","beijing_olympics_microsite_events_fallback_text":"Our apologies, we are experiencing some technical difficulties. Please bare with us while we work to resolve the problem.","beijing_olympics_microsite_header_start_date":"2022-02-05 00:00:00","beijing_olympics_microsite_header_end_date":"2022-02-20 00:00:00","beijing_olympics_microsite_header_date_format":"MMMM D, YYYY","beijing_olympics_microsite_header_before_text":"Begin on February 4, 2022","olympics_homepage_header_info":{"isEnabled":true,"title":"Beijing Winter Olympics 2022","description":"Latest news, schedule, results and more","urlAlias":"/beijing-olympics-2022","startDateISOString":"2022-02-04T00:00:00.000+08:00","endDateISOString":"2022-02-20T00:00:00.000+08:00"},"olympics_homepage_medal_table_info":{"isEnabled":false,"title":"Beijing Winter Olympics 2022","description":"Latest news, schedule, results and more","urlAlias":"/beijing-olympics-2022","startDateISOString":"2022-02-08T00:00:00.000+08:00","endDateISOString":"2022-02-20T00:00:00.000+08:00"},"olympics_sport_homepage_header_info":{"isEnabled":true,"title":"Beijing Winter Olympics 2022","urlAlias":"/beijing-olympics-2022"},"print_edition_ribbon":{"isEnabled":true,"text":"<strong>Covid-19 update:</strong> accessing <u>SCMP's print edition</u> during Hong Kong's 5th wave","url":"/page/3170335/accessing-scmps-print-edition-during-hong-kongs-covid-19-lockdown","isExternalLink":false},"print_edition_footer":{"isEnabled":true,"text":"<strong>Covid-19 update:</strong> <u>accessing SCMP's print edition</u> during Hong Kong's 5th wave","desc":"Due to the impact of the 5th wave of Covid-19 in Hong Kong, printing and/or delivery of our print paper may be delayed for a period. During this time, you can still access our ePaper edition. ","url":"/page/3171221/accessing-scmps-print-edition-during-5th-wave-covid-19-hong-kong","buttonText":"FIND OUT MORE","isExternalLink":true},"remove_large_cookies_in_client_side":{"isEnabled":false,"threshold":800},"hk_25_ribbon":{"pgtype":"homepage","module":"hk25_ribbon","isEnabled":true,"text":"The story of Hong Kong's post-colonial journey and destiny","url":"/hong-kong-25","isExternalLink":false},"hk_25_icon_links":{"camera":{"isEnabled":true,"isExternalLink":false,"text":"From our archives: The city in pictures","url":"#hk25-photo-module"},"thumb":{"isEnabled":true,"isExternalLink":true,"text":"Like your favourite moments and own them as NFTs","url":"https://www.facebook.com/scmp/posts/pfbid0fGewrH6WUuXLFiqDqzBcKxy7b3TqGvmq6h89yz5hfSLdHjzuDyUGkFGKCVEmoryJl"}},"twenty_congress_ribbon":{"pgtype":"homepage","module":"hk25_ribbon","isEnabled":false,"text":"The story of Hong Kong's post-colonial journey and destiny","url":"/hong-kong-25","isExternalLink":false},"china_power_player":{"upper":[{"name":"The Politburo","actionName":"EXPLORE","articleUrl":"/news/hong-kong/politics/article/3187753/hong-kongs-secretary-justice-paul-lam-addresses-concerns","imgUrl":"https://assets.i-scmp.com/20th-party-congress-static/powerbank1.png","updatedDate":"3 Jul, 2022","isRecentlyUpdated":false},{"name":"The 19th Central Committee","actionName":"READ","articleUrl":"/native/lifestyle/arts-culture/topics/concerto/article/3187562/hk-philharmonic-orchestra","imgUrl":"https://assets.i-scmp.com/20th-party-congress-static/powerbank2.png","updatedDate":"3 Jul, 2022","isRecentlyUpdated":true},{"name":"Faces to Watch","actionName":"READ","articleUrl":"/native/lifestyle/arts-culture/topics/concerto/article/3187562/hk-philharmonic-orchestra","imgUrl":"https://assets.i-scmp.com/20th-party-congress-static/powerbank3.png","updatedDate":"10 Jul, 2022","isRecentlyUpdated":false},{"name":"Friends in high places","actionName":"EXPLORE","articleUrl":"/news/hong-kong/politics/article/3187753/hong-kongs-secretary-justice-paul-lam-addresses-concerns","imgUrl":"https://assets.i-scmp.com/20th-party-congress-static/powerbank4.png","updatedDate":"15 Jul, 2022","isRecentlyUpdated":false}],"lower":[{"pillar":"The Politburo","name":"Zhao Leji","position":"Secretary of the Central Commission for Discipline Inspection","imgUrl":"https://i.pinimg.com/originals/c2/bf/74/c2bf74d9ef43bf24dcf73cde5a24f61c.jpg","articleUrl":"/news/hong-kong/politics/article/3184339/its-time-accept-basic-law-former-hong-kong-leader-cy-leung"},{"pillar":"The 19th Central Committee","name":"Bai ChunLi","position":"Former President of the Chinese Academy of Sciences","imgUrl":"https://i.pinimg.com/originals/5c/a8/05/5ca80560d66375afec34864678b024f8.jpg","articleUrl":"/news/hong-kong/politics/article/3184339/its-time-accept-basic-law-former-hong-kong-leader-cy-leung"},{"pillar":"Fact to watch","name":"Cai Qi","position":"Lorem ipsum dolor sit amet, consectetur adipiscing elit","imgUrl":"https://i.pinimg.com/originals/7f/c4/ab/7fc4abf286d844500056e5f811dedc5f.jpg","articleUrl":"/news/hong-kong/politics/article/3184339/its-time-accept-basic-law-former-hong-kong-leader-cy-leung"}]},"my_news":{"is_enabled_in_ad_profile":true,"is_enabled_24_hr_promotion":true,"completion_popup":{"isEnabled":true},"landing_popup":{"isEnabled":true}}}}},"__typename":"AppConfig"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0":{"__typename":"Article","entityId":"3195959","entityUuid":"35ac8367-8387-4b31-ac5b-3d2d2acc4d55","headline":"China’s Communist Party: who are the new faces of the 20th Central Committee?","socialHeadline":"The Communist Party’s 20th Central Committee – who are the new faces?","hasVideoContent":false,"sponsorType":null,"topics":[{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.topics.0","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.topics.1","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.topics.2","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.topics.3","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.topics.4","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.topics.5","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.topics.6","typename":"Topic"}],"updatedDate":1667883973000,"urlAlias":"https://multimedia.scmp.com/infographics/news/china/article/3195959/20th-central-committee-members/index.html","flag":null,"types":[],"authors":[{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.0","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.1","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.2","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.3","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.4","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.5","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.6","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.7","typename":"Author"}],"images":[{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.images.0","typename":"Image"}],"tmpLiveArticle":null,"moreOnThisArticles":[],"subHeadline":{"type":"json","json":[{"type":"p","children":[{"type":"b","attribs":{"data-stringify-type":"bold"},"children":[{"type":"text","data":"See who has been promoted and who is staying on the Communist Party’s Central Committee."}]}]}]},"summary":{"type":"json","json":[{"type":"p","children":[{"type":"text","data":"The top leadership body of China’s Communist Party has new and younger members. See who has stayed and who has left."}]}]},"application":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.application","typename":"Application"}},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.topics.0":{"entityId":"512358","entityUuid":"f1b0ea39-ef03-4ec0-b2ef-09d06d71f4e5","name":"China’s 20th Party Congress","urlAlias":"/topics/chinas-20th-party-congress","types":{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.topics.1":{"entityId":"512466","entityUuid":"5edd1de7-49d5-4f6d-820d-c76c90ac5efc","name":"China’s 20th Party Congress: Infographics","urlAlias":"/topics/chinas-20th-party-congress-infographics","types":{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.topics.2":{"entityId":"322904","entityUuid":"36db4c8a-2780-4fb0-91ba-aeff7a07a97b","name":"China’s Communist Party","urlAlias":"/topics/chinas-communist-party","types":{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.topics.3":{"entityId":"25794","entityUuid":"1c739c88-bfaa-4155-bcdf-f1b7f0d5dd52","name":"Xi Jinping","urlAlias":"/topics/xi-jinping","types":{"type":"json","json":["person"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.topics.4":{"entityId":"512361","entityUuid":"e8bde58f-e048-4aca-b497-2bec6af4cfd9","name":"China’s 20th Party Congress: All Articles","urlAlias":"/topics/chinas-20th-party-congress-all-articles","types":{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.topics.5":{"entityId":"512465","entityUuid":"61c372bf-a671-4362-bd4d-aafbbf9004e8","name":"China’s 20th Party Congress: Explainers","urlAlias":"/topics/chinas-20th-party-congress-explainers","types":{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.topics.6":{"entityId":"328312","entityUuid":"86a181fb-a8cc-416e-81d6-7148476ca6ac","name":"Communist Party politics","urlAlias":"/topics/communist-party-politics","types":{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.0":{"entityId":"323216","entityUuid":"08d2a302-63fb-4dae-a9d2-255d742fa8d2","name":"Marcelo Duhalde","types":{"type":"json","json":[]},"urlAlias":"/author/marcelo-duhalde","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn1.i-scmp.com/sites/default/files/styles/118x118/public/fotomdc.jpg?itok=8vbf4UyR","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.1":{"entityId":"501589","entityUuid":"d0c30f87-f651-41b4-ac24-345496cfa1a9","name":"Han Huang","types":{"type":"json","json":[]},"urlAlias":"/author/han-huang","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.1.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.1.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.1.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.1.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2019/07/25/han_huang.jpg?itok=e9KN2Q3V","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.2":{"entityId":"310632","entityUuid":"0d77959f-c052-4b14-b36e-925c771de2a6","name":"William Zheng","types":{"type":"json","json":[]},"urlAlias":"/author/william-zheng","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.2.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.2.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.2.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.2.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn1.i-scmp.com/sites/default/files/styles/118x118/public/images/author/pic/2019/02/13/byline01copy.jpg?itok=Ox2bOlUS","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.3":{"entityId":"328711","entityUuid":"aba66eeb-3565-45a6-bb39-c8b283a29372","name":"Guo Rui","types":{"type":"json","json":[]},"urlAlias":"/author/guo-rui","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.3.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.3.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.3.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.3.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn1.i-scmp.com/sites/default/files/styles/118x118/public/images/author/pic/2018/09/18/guo_rui-1.jpg?itok=JqYRXJct&v=1537269629","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.4":{"entityId":"328179","entityUuid":"84578ffb-aa02-4971-8acd-283ed4ad7d31","name":"Phoebe Zhang","types":{"type":"json","json":[]},"urlAlias":"/author/phoebe-zhang","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":null,"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.5":{"entityId":"513055","entityUuid":"023207ef-0037-424f-9f93-fd56d4c9286a","name":"Salina Li","types":{"type":"json","json":[]},"urlAlias":"/author/salina-li","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.5.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.5.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.5.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.5.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2022/07/08/salina card dp.JPG?itok=fmQnvZ2c&v=1657248220","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.6":{"entityId":"510333","entityUuid":"965647b2-0206-49b3-98e5-5e282859d805","name":"Xinlu Liang","types":{"type":"json","json":[]},"urlAlias":"/author/xinlu-liang","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.6.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.6.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.6.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.6.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2021/08/11/jonw0198.jpg?itok=digA-qom&v=1628675176","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.7":{"entityId":"321614","entityUuid":"615f9d8a-d5e9-470d-8ddd-2d41747cb2ca","name":"Jun Mai","types":{"type":"json","json":[]},"urlAlias":"/author/jun-mai","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.7.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.7.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.7.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.authors.7.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn1.i-scmp.com/sites/default/files/styles/118x118/public/yan_3072-250.jpg?itok=d632dYKk","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.images.0":{"title":"","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/2022/11/07/cover.jpg","indexSlideshow":null,"style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.images.0.style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"120x80\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.images.0.style({\"filter\":{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"540x360\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.images.0.style({\"filter\":{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"1200x800\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.images.0.style({\"filter\":{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.images.0.style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/2022/11/07/cover.jpg?itok=95fTZgRH&v=1667792496","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.images.0.style({\"filter\":{\"style\":\"120x80\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/2022/11/07/cover.jpg?itok=XGEe7FRV&v=1667792496","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.images.0.style({\"filter\":{\"style\":\"540x360\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/2022/11/07/cover.jpg?itok=J6AcjtfQ&v=1667792496","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.images.0.style({\"filter\":{\"style\":\"1200x800\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/2022/11/07/cover.jpg?itok=GvAsbrfA&v=1667792496","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0.application":{"entityId":"325477","__typename":"Application"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1":{"__typename":"Article","entityId":"3195706","entityUuid":"545c7262-f6a8-48c5-a688-f787df71526c","headline":"China’s military: who are the top decision makers for the world’s biggest standing army?","socialHeadline":"Visual explainer: the key people in charge of China’s military","hasVideoContent":false,"sponsorType":null,"topics":[{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.0","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.1","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.2","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.3","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.4","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.5","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.6","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.7","typename":"Topic"}],"updatedDate":1666519535000,"urlAlias":"https://multimedia.scmp.com/infographics/news/china/article/3195706/20th-central-military-committee/index.html","flag":null,"types":[],"authors":[{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.0","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.1","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.2","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.3","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.4","typename":"Author"}],"images":[{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.images.0","typename":"Image"}],"tmpLiveArticle":null,"moreOnThisArticles":[],"subHeadline":{"type":"json","json":[{"type":"p","children":[{"type":"text","data":"The CMC is led by Xi Jinping, its only civilian leader, and includes the top generals in the People’s Liberation Army"}]}]},"summary":{"type":"json","json":[{"type":"p","attribs":{"style":"line-height:1.38"},"children":[{"type":"text","data":"Who sits on the seven-member body that runs the People’s Liberation Army?"}]}]},"application":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.application","typename":"Application"}},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.0":{"entityId":"512358","entityUuid":"f1b0ea39-ef03-4ec0-b2ef-09d06d71f4e5","name":"China’s 20th Party Congress","urlAlias":"/topics/chinas-20th-party-congress","types":{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.1":{"entityId":"512361","entityUuid":"e8bde58f-e048-4aca-b497-2bec6af4cfd9","name":"China’s 20th Party Congress: All Articles","urlAlias":"/topics/chinas-20th-party-congress-all-articles","types":{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.2":{"entityId":"512465","entityUuid":"61c372bf-a671-4362-bd4d-aafbbf9004e8","name":"China’s 20th Party Congress: Explainers","urlAlias":"/topics/chinas-20th-party-congress-explainers","types":{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.3":{"entityId":"512466","entityUuid":"5edd1de7-49d5-4f6d-820d-c76c90ac5efc","name":"China’s 20th Party Congress: Infographics","urlAlias":"/topics/chinas-20th-party-congress-infographics","types":{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.4":{"entityId":"25794","entityUuid":"1c739c88-bfaa-4155-bcdf-f1b7f0d5dd52","name":"Xi Jinping","urlAlias":"/topics/xi-jinping","types":{"type":"json","json":["person"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.5":{"entityId":"322904","entityUuid":"36db4c8a-2780-4fb0-91ba-aeff7a07a97b","name":"China’s Communist Party","urlAlias":"/topics/chinas-communist-party","types":{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.6":{"entityId":"328312","entityUuid":"86a181fb-a8cc-416e-81d6-7148476ca6ac","name":"Communist Party politics","urlAlias":"/topics/communist-party-politics","types":{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.topics.7":{"entityId":"265639","entityUuid":"046da166-8dee-49b0-b8d5-25a24aa1ef2e","name":"China's military","urlAlias":"/topics/china-military","types":{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.0":{"entityId":"323216","entityUuid":"08d2a302-63fb-4dae-a9d2-255d742fa8d2","name":"Marcelo Duhalde","types":{"type":"json","json":[]},"urlAlias":"/author/marcelo-duhalde","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn1.i-scmp.com/sites/default/files/styles/118x118/public/fotomdc.jpg?itok=8vbf4UyR","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.1":{"entityId":"501589","entityUuid":"d0c30f87-f651-41b4-ac24-345496cfa1a9","name":"Han Huang","types":{"type":"json","json":[]},"urlAlias":"/author/han-huang","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.1.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.1.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.1.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.1.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2019/07/25/han_huang.jpg?itok=e9KN2Q3V","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.2":{"entityId":"310632","entityUuid":"0d77959f-c052-4b14-b36e-925c771de2a6","name":"William Zheng","types":{"type":"json","json":[]},"urlAlias":"/author/william-zheng","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.2.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.2.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.2.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.2.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn1.i-scmp.com/sites/default/files/styles/118x118/public/images/author/pic/2019/02/13/byline01copy.jpg?itok=Ox2bOlUS","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.3":{"entityId":"321614","entityUuid":"615f9d8a-d5e9-470d-8ddd-2d41747cb2ca","name":"Jun Mai","types":{"type":"json","json":[]},"urlAlias":"/author/jun-mai","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.3.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.3.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.3.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.3.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn1.i-scmp.com/sites/default/files/styles/118x118/public/yan_3072-250.jpg?itok=d632dYKk","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.authors.4":{"entityId":"510951","entityUuid":"0f470646-1cbe-4d45-9990-cf322c5a91da","name":"Daniel Kwan","types":{"type":"json","json":[]},"urlAlias":"/author/daniel-kwan","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":null,"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.images.0":{"title":"","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/2022/10/21/cover.jpg","indexSlideshow":null,"style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.images.0.style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"120x80\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.images.0.style({\"filter\":{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"540x360\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.images.0.style({\"filter\":{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"1200x800\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.images.0.style({\"filter\":{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.images.0.style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/2022/10/21/cover.jpg?itok=s3xBmjxn&v=1666341595","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.images.0.style({\"filter\":{\"style\":\"120x80\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/2022/10/21/cover.jpg?itok=UEz-NocT&v=1666341595","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.images.0.style({\"filter\":{\"style\":\"540x360\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/2022/10/21/cover.jpg?itok=U15CxK_q&v=1666341595","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.images.0.style({\"filter\":{\"style\":\"1200x800\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/2022/10/21/cover.jpg?itok=YT5xIQJV&v=1666341595","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1.application":{"entityId":"325477","__typename":"Application"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2":{"__typename":"Article","entityId":"3195576","entityUuid":"120db029-f795-4284-a828-dab54e28265c","headline":"China’s 20th Politburo and Standing Committee: members and new faces","socialHeadline":"China’s apex of power: the 20th Politburo and its Standing Committee","hasVideoContent":false,"sponsorType":null,"topics":[{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.topics.0","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.topics.1","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.topics.2","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.topics.3","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.topics.4","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.topics.5","typename":"Topic"}],"updatedDate":1666597183000,"urlAlias":"https://multimedia.scmp.com/infographics/news/china/article/3195576/20th-politburo-standing-committee/index.html","flag":null,"types":[],"authors":[{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.0","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.1","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.2","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.3","typename":"Author"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.4","typename":"Author"}],"images":[{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.images.0","typename":"Image"}],"tmpLiveArticle":null,"moreOnThisArticles":[],"subHeadline":{"type":"json","json":[{"type":"p","children":[{"type":"text","data":"How significant are Xi Jinping’s changes to the party’s top policymaking body?"}]}]},"summary":{"type":"json","json":[{"type":"p","children":[{"type":"text","data":"What significant changes have been made to the Politburo and its Standing Committee?"}]}]},"application":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.application","typename":"Application"}},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.topics.0":{"entityId":"512358","entityUuid":"f1b0ea39-ef03-4ec0-b2ef-09d06d71f4e5","name":"China’s 20th Party Congress","urlAlias":"/topics/chinas-20th-party-congress","types":{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.topics.1":{"entityId":"512466","entityUuid":"5edd1de7-49d5-4f6d-820d-c76c90ac5efc","name":"China’s 20th Party Congress: Infographics","urlAlias":"/topics/chinas-20th-party-congress-infographics","types":{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.topics.2":{"entityId":"269729","entityUuid":"96cbe7a2-4e62-424f-bc49-06f4d3bf4f40","name":"China leadership","urlAlias":"/topics/china-leadership","types":{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.topics.3":{"entityId":"512465","entityUuid":"61c372bf-a671-4362-bd4d-aafbbf9004e8","name":"China’s 20th Party Congress: Explainers","urlAlias":"/topics/chinas-20th-party-congress-explainers","types":{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.topics.4":{"entityId":"25794","entityUuid":"1c739c88-bfaa-4155-bcdf-f1b7f0d5dd52","name":"Xi Jinping","urlAlias":"/topics/xi-jinping","types":{"type":"json","json":["person"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.topics.5":{"entityId":"322904","entityUuid":"36db4c8a-2780-4fb0-91ba-aeff7a07a97b","name":"China’s Communist Party","urlAlias":"/topics/chinas-communist-party","types":{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.0":{"entityId":"323216","entityUuid":"08d2a302-63fb-4dae-a9d2-255d742fa8d2","name":"Marcelo Duhalde","types":{"type":"json","json":[]},"urlAlias":"/author/marcelo-duhalde","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn1.i-scmp.com/sites/default/files/styles/118x118/public/fotomdc.jpg?itok=8vbf4UyR","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.1":{"entityId":"501589","entityUuid":"d0c30f87-f651-41b4-ac24-345496cfa1a9","name":"Han Huang","types":{"type":"json","json":[]},"urlAlias":"/author/han-huang","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.1.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.1.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.1.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.1.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2019/07/25/han_huang.jpg?itok=e9KN2Q3V","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.2":{"entityId":"310632","entityUuid":"0d77959f-c052-4b14-b36e-925c771de2a6","name":"William Zheng","types":{"type":"json","json":[]},"urlAlias":"/author/william-zheng","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.2.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.2.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.2.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.2.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn1.i-scmp.com/sites/default/files/styles/118x118/public/images/author/pic/2019/02/13/byline01copy.jpg?itok=Ox2bOlUS","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.3":{"entityId":"321614","entityUuid":"615f9d8a-d5e9-470d-8ddd-2d41747cb2ca","name":"Jun Mai","types":{"type":"json","json":[]},"urlAlias":"/author/jun-mai","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.3.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.3.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.3.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.3.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn1.i-scmp.com/sites/default/files/styles/118x118/public/yan_3072-250.jpg?itok=d632dYKk","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.authors.4":{"entityId":"510951","entityUuid":"0f470646-1cbe-4d45-9990-cf322c5a91da","name":"Daniel Kwan","types":{"type":"json","json":[]},"urlAlias":"/author/daniel-kwan","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":null,"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.images.0":{"title":"","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/2022/10/19/cover.jpg","indexSlideshow":null,"style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.images.0.style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"120x80\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.images.0.style({\"filter\":{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"540x360\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.images.0.style({\"filter\":{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"1200x800\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.images.0.style({\"filter\":{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.images.0.style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/2022/10/19/cover.jpg?itok=PaNr3_hr&v=1666165398","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.images.0.style({\"filter\":{\"style\":\"120x80\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/2022/10/19/cover.jpg?itok=ezuIjDDd&v=1666165398","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.images.0.style({\"filter\":{\"style\":\"540x360\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/2022/10/19/cover.jpg?itok=L7_n3D9B&v=1666165398","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.images.0.style({\"filter\":{\"style\":\"1200x800\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/2022/10/19/cover.jpg?itok=hed7Y9tv&v=1666165398","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2.application":{"entityId":"325477","__typename":"Application"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3":{"__typename":"Article","entityId":"3195999","entityUuid":"35da33de-e69f-4578-b5b1-357abb615e6d","headline":"5 things you need to know about China’s 20th Communist Party congress, and why it matters to Hong Kong","socialHeadline":"China’s 20th Communist Party congress and why it matters to Hong Kong","hasVideoContent":false,"sponsorType":null,"topics":[{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.topics.0","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.topics.1","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.topics.2","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.topics.3","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.topics.4","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.topics.5","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.topics.6","typename":"Topic"}],"updatedDate":1665800067000,"urlAlias":"/news/hong-kong/politics/article/3195999/5-things-you-need-know-about-chinas-20th-communist-party","flag":null,"types":[[{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.types.0.0","typename":"ArticleType"}]],"authors":[{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.authors.0","typename":"Author"}],"images":[{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.0","typename":"Image"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.1","typename":"Image"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.2","typename":"Image"}],"tmpLiveArticle":null,"moreOnThisArticles":[],"subHeadline":{"type":"json","json":[{"type":"ul","children":[{"type":"text","data":"\n"},{"type":"li","children":[{"type":"text","data":"The Post unpacks the significance of the coming leadership meet and what we can expect from Chinese leader Xi Jinping’s report"}]},{"type":"text","data":"\n"},{"type":"li","children":[{"type":"text","data":"Xi is expected at the congress to secure a third term as the party’s leader"}]},{"type":"text","data":"\n"}]}]},"summary":{"type":"json","json":[{"type":"p","children":[{"type":"text","data":"The Post unpacks the significance of the coming leadership meet and what we can expect from Chinese leader Xi Jinping’s report."}]}]},"application":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.application","typename":"Application"}},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.topics.0":{"entityId":"503350","entityUuid":"c91f666d-f020-4681-8785-ea19189067f0","name":"Hong Kong politics","urlAlias":"/topics/hong-kong-politics","types":{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.topics.1":{"entityId":"512358","entityUuid":"f1b0ea39-ef03-4ec0-b2ef-09d06d71f4e5","name":"China’s 20th Party Congress","urlAlias":"/topics/chinas-20th-party-congress","types":{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.topics.2":{"entityId":"512361","entityUuid":"e8bde58f-e048-4aca-b497-2bec6af4cfd9","name":"China’s 20th Party Congress: All Articles","urlAlias":"/topics/chinas-20th-party-congress-all-articles","types":{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.topics.3":{"entityId":"512465","entityUuid":"61c372bf-a671-4362-bd4d-aafbbf9004e8","name":"China’s 20th Party Congress: Explainers","urlAlias":"/topics/chinas-20th-party-congress-explainers","types":{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.topics.4":{"entityId":"25794","entityUuid":"1c739c88-bfaa-4155-bcdf-f1b7f0d5dd52","name":"Xi Jinping","urlAlias":"/topics/xi-jinping","types":{"type":"json","json":["person"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.topics.5":{"entityId":"322904","entityUuid":"36db4c8a-2780-4fb0-91ba-aeff7a07a97b","name":"China’s Communist Party","urlAlias":"/topics/chinas-communist-party","types":{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.topics.6":{"entityId":"328312","entityUuid":"86a181fb-a8cc-416e-81d6-7148476ca6ac","name":"Communist Party politics","urlAlias":"/topics/communist-party-politics","types":{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.types.0.0":{"entityId":"328386","entityUuid":"a44f9c2e-7df3-4b76-bc42-9f60aefc7344","name":"Explainer","__typename":"ArticleType"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.authors.0":{"entityId":"502424","entityUuid":"a3952987-8b04-429a-a347-db24e0687111","name":"Lilian Cheng","types":{"type":"json","json":[]},"urlAlias":"/author/lilian-cheng","image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image({\"filter\":{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}})":{"title":"","style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.authors.0.image({\"filter\":{\"type\":\"AUTHOR_IMAGE\"}}).style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2019/11/28/scmp_hk_desk_miss_lilian_cheng_-_nov_2019.jpg?itok=H-72N6F3","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.0":{"title":"The Communist Party congress starts this Sunday. The Post looks at why it matters to Hong Kong. Photo: Edmond So","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/14/a7acf30e-6e02-4b7b-bc49-903e7ca91dc2_790ef18d.jpg","indexSlideshow":false,"style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.0.style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"120x80\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.0.style({\"filter\":{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"540x360\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.0.style({\"filter\":{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"1200x800\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.0.style({\"filter\":{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.0.style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/14/a7acf30e-6e02-4b7b-bc49-903e7ca91dc2_790ef18d.jpg?itok=BFpPfOVy&v=1665739710","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.0.style({\"filter\":{\"style\":\"120x80\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/14/a7acf30e-6e02-4b7b-bc49-903e7ca91dc2_790ef18d.jpg?itok=gDpnQqL7&v=1665739710","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.0.style({\"filter\":{\"style\":\"540x360\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/14/a7acf30e-6e02-4b7b-bc49-903e7ca91dc2_790ef18d.jpg?itok=WJyqoOP9&v=1665739710","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.0.style({\"filter\":{\"style\":\"1200x800\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/14/a7acf30e-6e02-4b7b-bc49-903e7ca91dc2_790ef18d.jpg?itok=yuCxTL6b&v=1665739710","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.1":{"title":"Chinese President Xi Jinping speaks during a visit to Hong Kong on July 1. He will deliver a much-awaited political report on the country’s overall policy direction in the next five years at the congress on Sunday. Photo: Felix Wong","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/14/c173f532-7501-4124-a39b-3d6d83b4326a_8aa86108.jpg","indexSlideshow":null,"style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.1.style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"120x80\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.1.style({\"filter\":{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"540x360\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.1.style({\"filter\":{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"1200x800\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.1.style({\"filter\":{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.1.style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/14/c173f532-7501-4124-a39b-3d6d83b4326a_8aa86108.jpg?itok=KW13UFVT","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.1.style({\"filter\":{\"style\":\"120x80\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/14/c173f532-7501-4124-a39b-3d6d83b4326a_8aa86108.jpg?itok=4ob3-E9o","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.1.style({\"filter\":{\"style\":\"540x360\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/14/c173f532-7501-4124-a39b-3d6d83b4326a_8aa86108.jpg?itok=A_EmHK5k","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.1.style({\"filter\":{\"style\":\"1200x800\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/14/c173f532-7501-4124-a39b-3d6d83b4326a_8aa86108.jpg?itok=S4_tE3pZ","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.2":{"title":"People walk before the Great Hall of the People at Tiananmen Square in Beijing. Photo: AFP","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/14/0155b755-345d-464e-8653-801fed168113_74ba1829.jpg","indexSlideshow":null,"style({\"filter\":{\"style\":\"118x118\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.2.style({\"filter\":{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"120x80\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.2.style({\"filter\":{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"540x360\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.2.style({\"filter\":{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style({\"filter\":{\"style\":\"1200x800\"}})":{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.2.style({\"filter\":{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.2.style({\"filter\":{\"style\":\"118x118\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/14/0155b755-345d-464e-8653-801fed168113_74ba1829.jpg?itok=zWHGppxi","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.2.style({\"filter\":{\"style\":\"120x80\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/14/0155b755-345d-464e-8653-801fed168113_74ba1829.jpg?itok=FG3Phw1Y","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.2.style({\"filter\":{\"style\":\"540x360\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/14/0155b755-345d-464e-8653-801fed168113_74ba1829.jpg?itok=gtfyy_Ey","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.images.2.style({\"filter\":{\"style\":\"1200x800\"}})":{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/14/0155b755-345d-464e-8653-801fed168113_74ba1829.jpg?itok=5pp45NNM","__typename":"ImageStyle"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3.application":{"entityId":"325477","__typename":"Application"},"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}})":{"items({\"limit\":4,\"offset\":0,\"exclude\":{}})":[{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).0","typename":"Article"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).1","typename":"Article"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).2","typename":"Article"},{"type":"id","generated":true,"id":"$ROOT_QUERY.queue({\"filter\":{\"name\":\"section_top_513307\"}}).items({\"limit\":4,\"offset\":0,\"exclude\":{}}).3","typename":"Article"}],"settings":null,"__typename":"Queue"},"$ROOT_QUERY.article({\"filter\":{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\"}})":{"entityId":"3201160","contentLock":true,"__typename":"Article"},"$ROOT_QUERY.content({\"contentType\":\"Article\",\"filter\":{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}})":{"__typename":"Article","sentiment":{"type":"json","json":{"avg_first_second":-3,"avg_sent_1_5":0.45,"gs_adult":0,"gs_client1":1,"gs_client2":0,"gs_client3":0,"gs_hkprotests":0,"gs_offensive_language":0,"gs_terrorism":0,"gs_tobacco":0,"gs_tragedy":0,"gs_violence":0,"headline_score":0,"headline_score_category":"neutral","overall_sentiment_score":-0.97,"readability_explanation":"complex","readability_notes":"Difficult to read","readability_school_level":["college"],"readability_score":43,"sentiment_category":"fairly negative","sentiment_max":8.25,"sentiment_min":-8.98,"words_tagged_total":["covid","coronavirus","virus","communist","covid-19","police","quarantine","lockdown"]}},"longCredit":{"type":"json","json":[]},"authorLocations":{"type":"json","json":["Beijing"]},"entityId":"3201160","entityUuid":"c1512b18-86a2-4dcf-bc76-003206c770c8","hasVideoContent":true,"doNotOpenInApp":false,"disableOffPlatformContent":{"type":"json","json":[]},"knowledgeQuestion":null,"youtubeSmartEmbed":true,"types":[],"tmpLiveArticle":null,"relatedColumnArticles":[],"corrections":[],"headline":"‘I’d rather stay home’: Beijing residents push back at Covid rules as cases mount","multimediaEmbed({\"format\":\"JSON\"})":{"type":"json","json":[]},"flag":null,"identity":null,"printHeadline":null,"subHeadline":{"type":"json","json":[{"type":"ul","children":[{"type":"text","data":"\n"},{"type":"li","children":[{"type":"text","data":"Infections are on the rise – along with concerns about being sent to unsanitary isolation centres"}]},{"type":"text","data":"\n"},{"type":"li","children":[{"type":"text","data":"Footage appears online of people questioning district-wide lockdowns"}]},{"type":"text","data":"\n"}]}]},"socialHeadline":"‘I’d rather stay home’: Beijing residents push back at Covid rules as cases mount","summary":{"type":"json","json":[{"type":"p","children":[{"type":"text","data":"Infections are on the rise – along with concerns about being sent to unsanitary isolation centres."}]}]},"keywords":{"type":"json","json":["china,  china news, coronavirus, covid-19, beijing, fangcang"]},"urlAlias":"/news/china/politics/article/3201160/id-rather-stay-home-beijing-residents-push-back-covid-rules-cases-mount","sourceUrl":null,"shortURL":"https://sc.mp/vxpl","displaySlideShow":true,"updatedDate":1669538647000,"createdDate":1669538640000,"paywallTypes":[{"type":"id","generated":true,"id":"$ROOT_QUERY.content({\"contentType\":\"Article\",\"filter\":{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).paywallTypes.0","typename":"PaywallType"}],"publishedDate":1669538647000,"published":true,"advertZone({\"version\":2})":"china_policiespolitics/article","sponsorType":null,"contentLock":true,"commentCount":19,"writer":null,"copyrighted":true,"topics":[{"type":"id","generated":true,"id":"$ROOT_QUERY.content({\"contentType\":\"Article\",\"filter\":{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.0","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.content({\"contentType\":\"Article\",\"filter\":{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.1","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.content({\"contentType\":\"Article\",\"filter\":{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.2","typename":"Topic"},{"type":"id","generated":true,"id":"$ROOT_QUERY.content({\"contentType\":\"Article\",\"filter\":{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.3","typename":"Topic"}],"articleVideos({\"filter\":{\"type\":\"youtube\",\"source\":\"SCMP\"}})":[],"body({\"customContents\":[{\"row\":4,\"type\":\"outstream-1\"},{\"row\":7,\"type\":\"ad1\"},{\"row\":10,\"type\":\"article-inline-widget\"},{\"row\":11,\"type\":\"reading-50-percent-completion-tracker\"},{\"row\":12,\"type\":\"ad2\"},{\"row\":15,\"type\":\"ad3\"},{\"row\":19,\"type\":\"ad4\"},{\"row\":23,\"type\":\"ad5\"},{\"row\":-1,\"type\":\"native-ads\"},{\"row\":-1,\"type\":\"youtube-smart-embed\"},{\"row\":9999,\"type\":\"reading-100-percent-completion-tracker\"}]})":

{"type":"json","json":[{"type":"p","children":[


{"type":"text","data":"Residents in the Chinese capital have appealed for better-targeted "},
{"type":"a","attribs":
{"href":"https://www.scmp.com/topics/coronavirus-china","title":"","target":"_self","data-entity-uuid":"c7985da3-2f6d-4540-a1c2-875c2d7881b6","data-entity-type":"taxonomy_term","data-entity-bundle":"topics"},"children":[
{"type":"text","data":"Covid-19"}]},
{"type":"text","data":" responses as spiralling infections raise fears of tougher restrictions and worries about quarantine centres."}]},
{"type":"p","children":[
{"type":"text","data":"The city reported 4,307 new local infections on Sunday morning, including 3,560 people without symptoms. The total was 65 per cent higher than a day earlier and more than double the case count reported on Friday."}]},
{"type":"p","children":[
{"type":"text","data":"Across the country, local infections rose to 39,506 cases on Sunday, nearly 5,000 more than the previous day."}]},
{"type":"p","children":[
{"type":"text","data":"At a meeting on Saturday, Beijing Communist Party secretary Yin Li urged lower-level officials to impose more "},
{"type":"a","attribs":
{"href":"https://www.scmp.com/news/china/politics/article/3201146/more-zero-covid-protests-china-after-deadly-lockdown-fire-xinjiang","title":"","target":"_self","data-entity-uuid":"82214b8d-d26e-414f-aebe-25b9e4e85f22","data-entity-type":"node","data-entity-bundle":"article"},"children":[
{"type":"text","data":"resolute and decisive measures"}]},
{"type":"text","data":" to contain the spread of the coronavirus, including transferring people who test positive and their close contacts to quarantine facilities."}]},
{"type":"outstream-1"},
{"type":"p","children":[
{"type":"text","data":"Yin also inspected a "},
{"type":"a","attribs":
{"href":"https://www.scmp.com/business/article/3177752/coronavirus-shanghai-retires-half-its-fangcang-quarantine-hospitals-daily","title":"","target":"_self","data-entity-uuid":"c32fba8f-25ab-4e7b-8227-d605803ef119","data-entity-type":"node","data-entity-bundle":"article"},"children":[
{"type":"text","data":"makeshift hospital, or "},
{"type":"em","children":[
{"type":"text","data":"fangcang"}]}]},
{"type":"text","data":", under construction in the Tongzhou district and urged officials to speed up construction."}]},
{"type":"div","attribs":
{"class":"methode-html-wrapper oembed-wrapper"},"children":[
{"type":"text","data":"\n"},
{"subtype":"youtube","type":"iframe","attribs":
{"allowfullscreen":"true","allowscriptaccess":"always","allow":"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture","class":"c1","frameborder":"0","width":"560","height":"315","scrolling":"no","src":"https://www.youtube.com/embed/IzrTJHY3J4Q?wmode=transparent&jqoemcache=UdCOW&enablejsapi=1&playsinline=1","title":"Over one-fifth of China’s total GDP under lockdown amid record Covid surge, new report finds","data-poster-sm":"https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/video/thumbnail/2022/11/25/Clean thumb .jpg?itok=gFY5Ll0s","data-poster-lg":"https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/d8/video/thumbnail/2022/11/25/Clean thumb .jpg?itok=7xy7mm9L","data-poster":"https://cdn.i-scmp.com/sites/default/files/d8/video/thumbnail/2022/11/25/Clean thumb .jpg","data-duration":"02:13","data-video-source":"SCMP","data-nid":"3200954","data-youtube-id":"IzrTJHY3J4Q"},"children":[]}]},
{"type":"p","children":[
{"type":"text","data":"But many residents appear more concerned about the temporary hospitals than the virus."}]},
{"type":"ad1"},
{"type":"p","children":[
{"type":"text","data":"Fear of Covid-19 has eased as people have learned from acquaintances that the symptoms are manageable. Instead, residents seem more worried about being infected in an isolation facility or staying with strangers in a large and messy makeshift centre."}]},
{"type":"p","children":[
{"type":"text","data":"“I would rather stay at home and have a fever for a few days than stay in the "},
{"type":"em","children":[
{"type":"text","data":"fangcang"}]},
{"type":"text","data":". It makes me sick just to think of the toilets,” a Beijing office worker said."}]},
{"type":"article-inline-widget"},
{"type":"p","children":[
{"type":"text","data":"“I have stockpiled some medicine and I have heard that so far the infections are mild and the fever breaks within three days.”"}]},
{"type":"reading-50-percent-completion-tracker"},
{"type":"p","children":[
{"type":"text","data":"Footage circulating widely online of a facility in northern Beijing shows people with mild or no symptoms struggling to be admitted or to find a bed. Some posts also show unsanitary toilets and describe chaos getting essential supplies such as food and tissues."}]},
{"type":"ad2"},
{"type":"p","children":[
{"type":"text","data":"A resident in Dongcheng district said that although a Covid infection might be inevitable, she would try to avoid getting it at least until after Beijing stopped taking people to "},
{"type":"em","children":[
{"type":"text","data":"fangcang"}]},
{"type":"text","data":"."}]},
{"type":"div","attribs":{"class":"methode-html-wrapper oembed-wrapper"},"children":[
{"type":"text","data":"\n"},
{"subtype":"youtube","type":"iframe","attribs":
{"allowfullscreen":"true","allowscriptaccess":"always","allow":"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture","class":"c1","frameborder":"0","width":"560","height":"315","scrolling":"no","src":"https://www.youtube.com/embed/RKbtt0SPTvo?wmode=transparent&jqoemcache=UdCOW&enablejsapi=1&playsinline=1","title":"Violence erupts at world’s largest iPhone factory over benefits and Covid-19 controls ","data-poster-sm":"https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/video/thumbnail/2022/11/23/2.jpg?itok=HIfKalJ6","data-poster-lg":"https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/d8/video/thumbnail/2022/11/23/2.jpg?itok=6ptHMaYb","data-poster":"https://cdn.i-scmp.com/sites/default/files/d8/video/thumbnail/2022/11/23/2.jpg","data-duration":"01:51","data-video-source":"SCMP","data-nid":"3200759","data-youtube-id":"RKbtt0SPTvo"},"children":[]}]},

{"type":"p","children":[
{"type":"text","data":"The capital has yet to impose a citywide lockdown but entire residential blocks are being sealed off as cases are detected. Late last week residential areas in the Chaoyang and Changping districts started three days of isolation."}]},
{"type":"ad3"},
{"type":"p","children":[
{"type":"text","data":"However, some residents have pushed back, saying sealing off the areas runs counter to "},
{"type":"a","attribs":
{"href":"https://www.scmp.com/news/china/politics/article/3199363/hopes-rise-further-changes-chinas-covid-controls-rules-start-ease-and-focus-shifts-preparing-further","title":"","target":"_self","data-entity-uuid":"d4ff6b50-0633-4127-867d-2327c9f0c3d6","data-entity-type":"node","data-entity-bundle":"article"},"children":[
{"type":"text","data":"the State Council’s announcement"}]},
{"type":"text","data":" earlier this month for more targeted controls."}]},
{"type":"p","children":[
{"type":"text","data":"Footage circulating online shows residents confronting neighbourhood management authorities and convincing police to not isolate buildings in those districts."}]},
{"type":"p","children":[
{"type":"text","data":"Some residents have also signed chain letters saying they would rather quarantine at home rather than in other facilities."}]},
{"type":"ad4"},
{"type":"p","children":[
{"type":"text","data":"The capital has three "},
{"type":"em","children":[
{"type":"text","data":"fangcang"}]},
{"type":"text","data":" centres in use: one at the China International Exhibition Centre, one in Xiaotangshan and one in Yanqing district."}]},
{"type":"p","children":[
{"type":"text","data":"Zhang Bin, a director in charge of the CIEC "},
{"type":"em","children":[
{"type":"text","data":"fangcang"}]},
{"type":"text","data":", said the facility was trying to get three meals to patients on time and working on improving hygiene."}]},
{"type":"p","children":[
{"type":"text","data":"“At first there were not many cleaning staff because of the large number of people present, but the number of cleaning staff has constantly increased,” China National Radio quoted Zhang as saying."}]},
{"type":"native-ads"},
{"type":"youtube-smart-embed"},
{"type":"reading-100-percent-completion-tracker"}]},"sections":[[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.0","typename":"Section"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1","typename":"Section"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.2","typename":"Section"}],[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0","typename":"Section"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1","typename":"Section"}]],"authors":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).authors.0","typename":"Author"}],"images(
{\"filter\":
{\"type\":
{\"values\":\"COVER\"}}})":[],"images(
{\"filter\":
{\"type\":
{\"values\":\"COVER_MOBILE\"}}})":[],"images(
{\"filter\":
{\"type\":
{\"values\":\"HERO\"}}})":[],"images":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0","typename":"Image"}],"relatedNewsletters":[],"moreOnThisArticles":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.2","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.3","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.4","typename":"Article"}],"relatedLinks":
{"type":"json","json":[]}},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).paywallTypes.0":
{"entityId":"507836","entityUuid":"a847a765-95e0-444a-a4df-76b85c9d089b","name":"Velocity","__typename":"PaywallType"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.0":
{"disableFollow":false,"entityUuid":"c7985da3-2f6d-4540-a1c2-875c2d7881b6","entityId":"505274","name":"Coronavirus China","urlAlias":"/topics/coronavirus-china","types":
{"type":"json","json":["general"]},"sponsor":null,"image(
{\"filter\":
{\"type\":\"MOBILE_APP_IMAGE\"}})":null,"relatedNewsletters":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.0.relatedNewsletters.0","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.0.relatedNewsletters.1","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.0.relatedNewsletters.2","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.0.relatedNewsletters.3","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.0.relatedNewsletters.4","typename":"Newsletter"}],"reverseSectionTopics":[],"__typename":"Topic"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.0.relatedNewsletters.0":
{"entityId":"505280","entityUuid":"468e80c2-0fbd-49c4-8300-35f9bf0cf5ba","name":"Coronavirus Update","alternativeName":"","description(
{\"format\":\"TEXT\"})":"Our coronavirus dedicated newsletter, following the ongoing developments and recovery from the global pandemic with stories on Hong Kong, Asia and the world.\n","summary(
{\"format\":\"TEXT\"})":"2 TIMES A WEEK\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.0.relatedNewsletters.1":
{"entityId":"510083","entityUuid":"53022e60-656a-4563-b226-7977938591b3","name":"Hong Kong Update","alternativeName":"Hong Kong Update Newsletter","description(
{\"format\":\"TEXT\"})":"Our weekly round-up of the best news, stories and opinion from Hong Kong.\n","summary(
{\"format\":\"TEXT\"})":"Every Saturday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.0.relatedNewsletters.2":
{"entityId":"501957","entityUuid":"d032580e-80e9-4404-8179-efdca7fc42f0","name":"Lunar","alternativeName":"Lunar Newsletter","description(
{\"format\":\"TEXT\"})":"A weekly newsletter dedicated to celebrating women in Asia and sharing stories that matter to all of us\n","summary(
{\"format\":\"TEXT\"})":"Every Friday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.0.relatedNewsletters.3":
{"entityId":"502003","entityUuid":"18b29c33-2ecd-464b-91b0-7fb1de2101a7","name":"Hong Kong Politics","alternativeName":"Hong Kong Politics Newsletter","description(
{\"format\":\"TEXT\"})":"Latest news, analysis and opinion on politics in Hong Kong, covering Legco, John Lee’s administration and handling of the Covid-19 pandemic.\n","summary(
{\"format\":\"TEXT\"})":"Every Monday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.0.relatedNewsletters.4":
{"entityId":"322417","entityUuid":"bf16803d-12a3-4c2a-b2ae-716289a7cb20","name":"SCMP Focus","alternativeName":"SCMP Focus Newsletter","description(
{\"format\":\"TEXT\"})":"Our curated selection of the top stories from the past fortnight, from business to lifestyle news.\n","summary(
{\"format\":\"TEXT\"})":"Every Other Sunday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.1":
{"disableFollow":false,"entityUuid":"014e94b1-7f09-46a4-9d18-9eb80f3d4ae2","entityId":"503456","name":"Coronavirus pandemic: All stories","urlAlias":"/topics/coronavirus-pandemic-all-stories","types":
{"type":"json","json":["super"]},"sponsor":null,"image(
{\"filter\":
{\"type\":\"MOBILE_APP_IMAGE\"}})":null,"relatedNewsletters":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.1.relatedNewsletters.0","typename":"Newsletter"}],"reverseSectionTopics":[],"__typename":"Topic"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.1.relatedNewsletters.0":
{"entityId":"506194","entityUuid":"07459044-40ae-4a76-b13b-ab85ffa4d195","name":"SCMP Global Impact","alternativeName":"SCMP Global Impact Newsletter","description(
{\"format\":\"TEXT\"})":"A weekly curated round-up of social, political and economic stories from China and how they impact the world.\n","summary(
{\"format\":\"TEXT\"})":"Every Saturday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.2":
{"disableFollow":false,"entityUuid":"83511e3e-58dd-455f-8ae5-9959c76c0eb0","entityId":"503302","name":"Coronavirus pandemic","urlAlias":"/topics/coronavirus-pandemic","types":
{"type":"json","json":["super"]},"sponsor":null,"image(
{\"filter\":
{\"type\":\"MOBILE_APP_IMAGE\"}})":null,"relatedNewsletters":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.2.relatedNewsletters.0","typename":"Newsletter"}],"reverseSectionTopics":[],"__typename":"Topic"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.2.relatedNewsletters.0":
{"entityId":"506194","entityUuid":"07459044-40ae-4a76-b13b-ab85ffa4d195","name":"SCMP Global Impact","alternativeName":"SCMP Global Impact Newsletter","description(
{\"format\":\"TEXT\"})":"A weekly curated round-up of social, political and economic stories from China and how they impact the world.\n","summary(
{\"format\":\"TEXT\"})":"Every Saturday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.3":
{"disableFollow":false,"entityUuid":"13f19b34-3c9d-4072-92cd-314af89de6f4","entityId":"326212","name":"Health in China","urlAlias":"/topics/health-china","types":
{"type":"json","json":["super"]},"sponsor":null,"image(
{\"filter\":
{\"type\":\"MOBILE_APP_IMAGE\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.3.image(
{\"filter\":
{\"type\":\"MOBILE_APP_IMAGE\"}})","typename":"Image"},"relatedNewsletters":[],"reverseSectionTopics":[],"__typename":"Topic"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.3.image(
{\"filter\":
{\"type\":\"MOBILE_APP_IMAGE\"}})":
{"url":"https://cdn1.i-scmp.com/sites/default/files/topics/2018/06/07/china-around-the-nation_4.png","title":"","style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.3.image(
{\"filter\":
{\"type\":\"MOBILE_APP_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).topics.3.image(
{\"filter\":
{\"type\":\"MOBILE_APP_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn1.i-scmp.com/sites/default/files/styles/118x118/public/topics/2018/06/07/china-around-the-nation_4.png?itok=jak3F6q1","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.0":
{"entityUuid":"86e1c519-948e-4460-adc3-1dfafefa60da","advertZone":"news/home","entityId":"91","name":"News","urlAlias(
{\"checkRedirect\":true})":"/news","relatedNewsletterIds":
{"type":"json","json":[]},"relatedNewsletters":[],"images":[],"metatags":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.0.metatags.0","typename":"KeyValuePair"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.0.metatags.1","typename":"KeyValuePair"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.0.metatags.2","typename":"KeyValuePair"}],"__typename":"Section"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.0.metatags.0":
{"key":"canonical","value":"https://www.scmp.com/news","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.0.metatags.1":
{"key":"title","value":"Latest news on Hong Kong, China, Asia and the world | South China Morning Post","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.0.metatags.2":
{"key":"description","value":"All the latest news, opinions and analysis on Hong Kong, China, Asia and around the world","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1":
{"entityUuid":"08925cfe-01ce-4932-b9e2-be5b255efe63","advertZone":"china/home","entityId":"4","name":"China","urlAlias(
{\"checkRedirect\":true})":"/news/china","relatedNewsletterIds":
{"type":"json","json":["07459044-40ae-4a76-b13b-ab85ffa4d195","f28e0c7e-9ae4-4eda-a906-92bd572c1944","9fb200d6-9f58-43fe-b9bc-c60627698d9b","aff5deff-269d-4ccc-a12e-e6987d10bef8","468e80c2-0fbd-49c4-8300-35f9bf0cf5ba","aa4e0228-e79f-4b5d-b22c-8d10f242e3c1","575fcf69-0f40-43ad-9805-f5637911b1d8","bf16803d-12a3-4c2a-b2ae-716289a7cb20"]},"relatedNewsletters":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.0","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.1","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.2","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.3","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.4","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.5","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.6","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.7","typename":"Newsletter"}],"images":[],"metatags":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.metatags.0","typename":"KeyValuePair"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.metatags.1","typename":"KeyValuePair"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.metatags.2","typename":"KeyValuePair"}],"__typename":"Section"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.0":
{"entityId":"506194","entityUuid":"07459044-40ae-4a76-b13b-ab85ffa4d195","name":"SCMP Global Impact","alternativeName":"SCMP Global Impact Newsletter","description(
{\"format\":\"TEXT\"})":"A weekly curated round-up of social, political and economic stories from China and how they impact the world.\n","summary(
{\"format\":\"TEXT\"})":"Every Saturday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.1":
{"entityId":"322279","entityUuid":"f28e0c7e-9ae4-4eda-a906-92bd572c1944","name":"China at a Glance","alternativeName":"China at a Glance Newsletter","description(
{\"format\":\"TEXT\"})":"Your daily must-read of essential stories from China, including politics, economy and current affairs.\n","summary(
{\"format\":\"TEXT\"})":"Daily, Monday to Friday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.2":
{"entityId":"330177","entityUuid":"9fb200d6-9f58-43fe-b9bc-c60627698d9b","name":"China Economic Update","alternativeName":"","description(
{\"format\":\"TEXT\"})":"Read key economic stories from China, including the US-China trade war, sanctions, and economic developments.\n","summary(
{\"format\":\"TEXT\"})":"Every Tuesday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.3":
{"entityId":"322277","entityUuid":"aff5deff-269d-4ccc-a12e-e6987d10bef8","name":"SCMP Today: Intl Edition","alternativeName":"SCMP Today: Intl Edition Newsletter","description(
{\"format\":\"TEXT\"})":"Start your day with our briefing on business, politics and important news stories from Hong Kong, Asia, and beyond.\n","summary(
{\"format\":\"TEXT\"})":"DAILY\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.4":
{"entityId":"505280","entityUuid":"468e80c2-0fbd-49c4-8300-35f9bf0cf5ba","name":"Coronavirus Update","alternativeName":"","description(
{\"format\":\"TEXT\"})":"Our coronavirus dedicated newsletter, following the ongoing developments and recovery from the global pandemic with stories on Hong Kong, Asia and the world.\n","summary(
{\"format\":\"TEXT\"})":"2 TIMES A WEEK\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.5":
{"entityId":"324680","entityUuid":"aa4e0228-e79f-4b5d-b22c-8d10f242e3c1","name":"China Business Briefing","alternativeName":"","description(
{\"format\":\"TEXT\"})":"Your evening round-up of the most important business and economic news from China throughout the day. \n","summary(
{\"format\":\"TEXT\"})":"Monday to Friday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.6":
{"entityId":"323063","entityUuid":"575fcf69-0f40-43ad-9805-f5637911b1d8","name":"This Week in Asia","alternativeName":"This Week in Asia Newsletter","description(
{\"format\":\"TEXT\"})":"The most pressing stories and in-depth analysis from the Asia region, sent to you each week.\n","summary(
{\"format\":\"TEXT\"})":"Every Monday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.relatedNewsletters.7":
{"entityId":"322417","entityUuid":"bf16803d-12a3-4c2a-b2ae-716289a7cb20","name":"SCMP Focus","alternativeName":"SCMP Focus Newsletter","description(
{\"format\":\"TEXT\"})":"Our curated selection of the top stories from the past fortnight, from business to lifestyle news.\n","summary(
{\"format\":\"TEXT\"})":"Every Other Sunday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.metatags.0":
{"key":"canonical","value":"https://www.scmp.com/news/china","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.metatags.1":
{"key":"title","value":"China Breaking News & Headlines | South China Morning Post","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.1.metatags.2":
{"key":"description","value":"Latest China news, opinions and analysis, covering Xi Jinping, Beijing's relations with Taiwan and China's tensions with the US.","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.2":
{"entityUuid":"613057c5-bfc5-482a-a9fc-8f3ea0425655","advertZone":"china_policiespolitics/home","entityId":"318198","name":"Politics","urlAlias(
{\"checkRedirect\":true})":"/news/china/politics","relatedNewsletterIds":
{"type":"json","json":[]},"relatedNewsletters":[],"images":[],"metatags":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.2.metatags.0","typename":"KeyValuePair"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.2.metatags.1","typename":"KeyValuePair"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.2.metatags.2","typename":"KeyValuePair"}],"__typename":"Section"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.2.metatags.0":
{"key":"title","value":"Politics | South China Morning Post","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.2.metatags.1":
{"key":"canonical","value":"https://www.scmp.com/news/china/politics","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.0.2.metatags.2":
{"key":"description","value":"The latest news on China politics, including domestic and foreign policy.","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0":
{"entityUuid":"ab187950-76a6-419b-b548-a74cd4286f5f","advertZone":"coronavirus/home","entityId":"505323","name":"Coronavirus","urlAlias(
{\"checkRedirect\":true})":"/coronavirus","relatedNewsletterIds":
{"type":"json","json":["468e80c2-0fbd-49c4-8300-35f9bf0cf5ba","07459044-40ae-4a76-b13b-ab85ffa4d195","53022e60-656a-4563-b226-7977938591b3","f28e0c7e-9ae4-4eda-a906-92bd572c1944","45c4c248-002d-48b2-b1de-11a086cf8bb2"]},"relatedNewsletters":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.relatedNewsletters.0","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.relatedNewsletters.1","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.relatedNewsletters.2","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.relatedNewsletters.3","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.relatedNewsletters.4","typename":"Newsletter"}],"images":[],"metatags":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.metatags.0","typename":"KeyValuePair"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.metatags.1","typename":"KeyValuePair"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.metatags.2","typename":"KeyValuePair"}],"__typename":"Section"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.relatedNewsletters.0":
{"entityId":"505280","entityUuid":"468e80c2-0fbd-49c4-8300-35f9bf0cf5ba","name":"Coronavirus Update","alternativeName":"","description(
{\"format\":\"TEXT\"})":"Our coronavirus dedicated newsletter, following the ongoing developments and recovery from the global pandemic with stories on Hong Kong, Asia and the world.\n","summary(
{\"format\":\"TEXT\"})":"2 TIMES A WEEK\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.relatedNewsletters.1":
{"entityId":"506194","entityUuid":"07459044-40ae-4a76-b13b-ab85ffa4d195","name":"SCMP Global Impact","alternativeName":"SCMP Global Impact Newsletter","description(
{\"format\":\"TEXT\"})":"A weekly curated round-up of social, political and economic stories from China and how they impact the world.\n","summary(
{\"format\":\"TEXT\"})":"Every Saturday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.relatedNewsletters.2":
{"entityId":"510083","entityUuid":"53022e60-656a-4563-b226-7977938591b3","name":"Hong Kong Update","alternativeName":"Hong Kong Update Newsletter","description(
{\"format\":\"TEXT\"})":"Our weekly round-up of the best news, stories and opinion from Hong Kong.\n","summary(
{\"format\":\"TEXT\"})":"Every Saturday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.relatedNewsletters.3":
{"entityId":"322279","entityUuid":"f28e0c7e-9ae4-4eda-a906-92bd572c1944","name":"China at a Glance","alternativeName":"China at a Glance Newsletter","description(
{\"format\":\"TEXT\"})":"Your daily must-read of essential stories from China, including politics, economy and current affairs.\n","summary(
{\"format\":\"TEXT\"})":"Daily, Monday to Friday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.relatedNewsletters.4":
{"entityId":"323473","entityUuid":"45c4c248-002d-48b2-b1de-11a086cf8bb2","name":"Breaking News Alerts","alternativeName":"","description(
{\"format\":\"TEXT\"})":"Breaking news from Hong Kong, China and the world – straight to your inbox, as it happens.\n","summary(
{\"format\":\"TEXT\"})":"AS IT HAPPENS\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.metatags.0":
{"key":"canonical","value":"https://www.scmp.com/coronavirus","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.metatags.1":
{"key":"title","value":"Coronavirus latest news: travel restrictions in China and Hong Kong, quarantine rules, vaccinations and Covid cases","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.0.metatags.2":
{"key":"description","value":"Latest news and updates on Covid-19 travel restrictions and quarantine rules in China and Hong Kong, vaccinations and Covid cases","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1":
{"entityUuid":"e53db950-d8a8-4688-87d9-b0cd072ae872","advertZone":"coronavirus_greaterchina/home","entityId":"505356","name":"Greater China","urlAlias(
{\"checkRedirect\":true})":"/coronavirus/greater-china","relatedNewsletterIds":
{"type":"json","json":["468e80c2-0fbd-49c4-8300-35f9bf0cf5ba","07459044-40ae-4a76-b13b-ab85ffa4d195","53022e60-656a-4563-b226-7977938591b3","f28e0c7e-9ae4-4eda-a906-92bd572c1944","45c4c248-002d-48b2-b1de-11a086cf8bb2"]},"relatedNewsletters":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.relatedNewsletters.0","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.relatedNewsletters.1","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.relatedNewsletters.2","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.relatedNewsletters.3","typename":"Newsletter"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.relatedNewsletters.4","typename":"Newsletter"}],"images":[],"metatags":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.metatags.0","typename":"KeyValuePair"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.metatags.1","typename":"KeyValuePair"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.metatags.2","typename":"KeyValuePair"}],"__typename":"Section"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.relatedNewsletters.0":
{"entityId":"505280","entityUuid":"468e80c2-0fbd-49c4-8300-35f9bf0cf5ba","name":"Coronavirus Update","alternativeName":"","description(
{\"format\":\"TEXT\"})":"Our coronavirus dedicated newsletter, following the ongoing developments and recovery from the global pandemic with stories on Hong Kong, Asia and the world.\n","summary(
{\"format\":\"TEXT\"})":"2 TIMES A WEEK\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.relatedNewsletters.1":
{"entityId":"506194","entityUuid":"07459044-40ae-4a76-b13b-ab85ffa4d195","name":"SCMP Global Impact","alternativeName":"SCMP Global Impact Newsletter","description(
{\"format\":\"TEXT\"})":"A weekly curated round-up of social, political and economic stories from China and how they impact the world.\n","summary(
{\"format\":\"TEXT\"})":"Every Saturday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.relatedNewsletters.2":
{"entityId":"510083","entityUuid":"53022e60-656a-4563-b226-7977938591b3","name":"Hong Kong Update","alternativeName":"Hong Kong Update Newsletter","description(
{\"format\":\"TEXT\"})":"Our weekly round-up of the best news, stories and opinion from Hong Kong.\n","summary(
{\"format\":\"TEXT\"})":"Every Saturday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.relatedNewsletters.3":
{"entityId":"322279","entityUuid":"f28e0c7e-9ae4-4eda-a906-92bd572c1944","name":"China at a Glance","alternativeName":"China at a Glance Newsletter","description(
{\"format\":\"TEXT\"})":"Your daily must-read of essential stories from China, including politics, economy and current affairs.\n","summary(
{\"format\":\"TEXT\"})":"Daily, Monday to Friday\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.relatedNewsletters.4":
{"entityId":"323473","entityUuid":"45c4c248-002d-48b2-b1de-11a086cf8bb2","name":"Breaking News Alerts","alternativeName":"","description(
{\"format\":\"TEXT\"})":"Breaking news from Hong Kong, China and the world – straight to your inbox, as it happens.\n","summary(
{\"format\":\"TEXT\"})":"AS IT HAPPENS\n","__typename":"Newsletter"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.metatags.0":
{"key":"canonical","value":"https://www.scmp.com/coronavirus/greater-china","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.metatags.1":
{"key":"title","value":"Greater China | South China Morning Post","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).sections.1.1.metatags.2":
{"key":"description","value":"An outbreak of a new strain of coronavirus was first reported in Wuhan, China. Cases have also been reported in Hong Kong, Macau, Taiwan, Singapore, the Philippines, Thailand, Vietnam, Europe, the United States, Canada and Australia. The World Health Organisation (WHO) has declared the spread of the infection a pandemic. Seeking to distinguish the virus from the disease it causes, the WHO named the virus SARS-CoV-2, and the disease Covid-19.","__typename":"KeyValuePair"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).authors.0":
{"entityUuid":"1e3da073-ddb4-4e2c-859d-47a4df77d87a","entityId":"303006","types":
{"type":"json","json":[]},"name":"Zhuang Pinghui","location":"Beijing","role":
{"type":"json","json":[
{"type":"p","children":[
{"type":"text","data":"Senior Correspondent, China"}]},
{"type":"p","children":[
{"type":"text","data":" "}]}]},"image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"socialLinks":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).authors.0.socialLinks.0","typename":"AuthorSocialLinks"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).authors.0.socialLinks.1","typename":"AuthorSocialLinks"}],"image(
{\"filter\":
{\"type\":\"AUTHOR_LARGE\"}})":null,"urlAlias":"/author/zhuang-pinghui","position":null,"bio":"Based in Beijing, Zhuang Pinghui joined the Post in 2004 to report on China. She covers a range of issues including policy, healthcare, culture and society. ","followCount":null,"disableFollow":null,"__typename":"Author"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"title":"","type":"authorImage","url":"https://cdn1.i-scmp.com/sites/default/files/zhuang-pinghui.png","style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn1.i-scmp.com/sites/default/files/styles/118x118/public/zhuang-pinghui.png?itok=SQ_zOeDa","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).authors.0.socialLinks.0":
{"class":"email","title":"","url":"mailto:pinghui.zhuang@scmp.com","__typename":"AuthorSocialLinks"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).authors.0.socialLinks.1":
{"class":"twitter","title":"","url":"https://twitter.com/zhuangph","__typename":"AuthorSocialLinks"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0":
{"title":"Covid-prevention workers guard the entrance of a residential building placed under lockdown in Beijing, China, on Saturday. Photo: Bloomberg","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg","isSlideshow":true,"type":"leading","width":2000,"height":1333,"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1920x1080\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"1920x1080\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"160x90\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"160x90\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"144x81\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"144x81\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"768x768\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"768x768\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"64x64\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"64x64\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"237x147\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"652x446\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"652x446\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"landscape_250_99\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"landscape_250_99\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_image_scmp_coronavirus_generic\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_coronavirus_generic\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_image_scmp_coronavirus_opinion\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_coronavirus_opinion\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_image_scmp_coronavirus_live\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_coronavirus_live\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_image_scmp_analysis\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_analysis\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_image_scmp_editorial\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_editorial\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_image_scmp_explainer\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_explainer\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_image_scmp_fact_check\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_fact_check\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_image_scmp_live\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_live\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_image_scmp_obituary\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_obituary\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_image_scmp_opinion\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_opinion\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_image_scmp_review\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_review\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_image_scmp_debate\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_debate\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_image_scmp_generic\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_generic\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_image_scmp_series\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_series\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_twitter_scmp_coronavirus_generic\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_coronavirus_generic\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_twitter_scmp_coronavirus_opinion\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_coronavirus_opinion\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_twitter_scmp_coronavirus_live\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_coronavirus_live\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_twitter_scmp_analysis\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_analysis\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_twitter_scmp_explainer\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_explainer\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_twitter_scmp_editorial\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_editorial\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_twitter_scmp_fact_check\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_fact_check\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_twitter_scmp_live\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_live\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_twitter_scmp_obituary\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_obituary\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_twitter_scmp_opinion\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_opinion\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_twitter_scmp_debate\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_debate\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_twitter_scmp_review\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_review\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_twitter_scmp_generic\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_generic\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"og_twitter_scmp_series\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_series\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=rgCs0C7W&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=-ZxVV_vC&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"1920x1080\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1920x1080/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=UH6ZkQYP&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"160x90\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/160x90/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=jmP0rkgt&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"144x81\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/144x81/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=RBVgouGS&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=4Ds7QLK1&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"768x768\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=tLuUZ9Uv&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"64x64\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/64x64/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=UykubTkY&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/237x147/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=59r9nUCp&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"652x446\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/652x446/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=1e9VI7Ek&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"landscape_250_99\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/landscape_250_99/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=neBtkxyJ&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_coronavirus_generic\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_coronavirus_generic/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=7Qlo99Ku&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_coronavirus_opinion\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_coronavirus_opinion/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=rnlAISAM&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_coronavirus_live\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_coronavirus_live/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=S-A5vD5U&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_analysis\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_analysis/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=D2V-TqdH&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_editorial\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_editorial/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=7TadOAIU&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_explainer\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_explainer/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=-am3DN68&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_fact_check\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_fact_check/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=-YgqS_JC&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_live\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_live/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=uG029mbd&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_obituary\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_obituary/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=EAcfxW8N&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_opinion\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_opinion/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=E9-hwa6n&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_review\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_review/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=IqS0Z9HA&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_debate\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_debate/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=0r1w-Smw&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_generic\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_generic/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=CwvB30NU&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_image_scmp_series\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_series/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=bNKAc-mP&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_coronavirus_generic\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_coronavirus_generic/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=-RzUqnWQ&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_coronavirus_opinion\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_coronavirus_opinion/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=UzUnHcOT&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_coronavirus_live\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_coronavirus_live/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=6fmfamG7&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_analysis\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_analysis/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=rh-fq216&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_explainer\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_explainer/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=BeTvbZJT&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_editorial\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_editorial/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=YQf5CL8s&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_fact_check\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_fact_check/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=Q3QRt9jp&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_live\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_live/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=zBn2NuJ2&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_obituary\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_obituary/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=IBsoTV4i&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_opinion\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_opinion/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=XcnknA2T&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_debate\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_debate/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=MdXYhz_D&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_review\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_review/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=Vich1rMT&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_generic\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_generic/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=KKd7AZZj&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).images.0.style(
{\"filter\":
{\"style\":\"og_twitter_scmp_series\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_series/public/d8/images/canvas/2022/11/27/54538afa-d538-444c-8b10-212a66d135da_f616bad2.jpg?itok=wLgTezup&v=1669538641","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0":
{"entityId":"3201146","entityUuid":"82214b8d-d26e-414f-aebe-25b9e4e85f22","headline":"More zero-Covid protests in China after deadly lockdown fire in Xinjiang","socialHeadline":"‘No more lockdowns’: China zero-Covid protests spread after deadly fire","images":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.0","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.1","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.2","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.3","typename":"Image"}],"urlAlias":"/news/china/politics/article/3201146/more-zero-covid-protests-china-after-deadly-lockdown-fire-xinjiang","updatedDate":1669533422000,"__typename":"Article"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.0":
{"url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/27/2f413584-1485-4c26-90d9-d1c652d0a465_3c781b20.jpg","style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.0.style(
{\"filter\":
{\"style\":\"237x147\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.0.style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/237x147/public/d8/images/canvas/2022/11/27/2f413584-1485-4c26-90d9-d1c652d0a465_3c781b20.jpg?itok=uqEZleM0&v=1669528257","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.1":
{"url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/27/18d036fe-c95b-4d64-b0f9-6af8b54b8a17_1db61c14.jpg","style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.1.style(
{\"filter\":
{\"style\":\"237x147\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.1.style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/237x147/public/d8/images/canvas/2022/11/27/18d036fe-c95b-4d64-b0f9-6af8b54b8a17_1db61c14.jpg?itok=2dzrLdXC","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.2":
{"url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/27/02ad5206-0c75-4407-93e0-3d30e83aaba0_995bf82d.jpg","style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.2.style(
{\"filter\":
{\"style\":\"237x147\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.2.style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/237x147/public/d8/images/canvas/2022/11/27/02ad5206-0c75-4407-93e0-3d30e83aaba0_995bf82d.jpg?itok=Y1XhC8ST","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.3":
{"url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/27/cd4003bb-6594-4a1b-ab7f-891b125686c1_a66cec46.jpg","style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.3.style(
{\"filter\":
{\"style\":\"237x147\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.0.images.3.style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/237x147/public/d8/images/canvas/2022/11/27/cd4003bb-6594-4a1b-ab7f-891b125686c1_a66cec46.jpg?itok=r48NP2-J","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1":
{"entityId":"3201089","entityUuid":"49416bf4-1b0b-4e64-bc60-c4f96ea3a66f","headline":"China’s zero-Covid policy comes under fire, but experts don’t expect big changes any time soon","socialHeadline":"China’s zero-Covid policy is under fire, but experts not expecting big changes","images":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.0","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.1","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.2","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.3","typename":"Image"}],"urlAlias":"/news/china/politics/article/3201089/chinas-zero-covid-policy-comes-under-fire-experts-dont-expect-big-changes-any-time-soon","updatedDate":1669523019000,"__typename":"Article"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.0":
{"url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/26/aed19d5f-1c84-4c98-b5a7-7f0d3ebe8088_1d29e64b.jpg","style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.0.style(
{\"filter\":
{\"style\":\"237x147\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.0.style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/237x147/public/d8/images/canvas/2022/11/26/aed19d5f-1c84-4c98-b5a7-7f0d3ebe8088_1d29e64b.jpg?itok=l3xPpCV3&v=1669443361","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.1":
{"url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/26/aed19d5f-1c84-4c98-b5a7-7f0d3ebe8088_3c12e8ea.jpg","style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.1.style(
{\"filter\":
{\"style\":\"237x147\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.1.style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/237x147/public/d8/images/canvas/2022/11/26/aed19d5f-1c84-4c98-b5a7-7f0d3ebe8088_3c12e8ea.jpg?itok=I0CdBQ1P&v=1669443369","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.2":
{"url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/27/c21a743d-f340-468c-85a0-bb8c2d7da79e_0e2c23f9.jpg","style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.2.style(
{\"filter\":
{\"style\":\"237x147\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.2.style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/237x147/public/d8/images/canvas/2022/11/27/c21a743d-f340-468c-85a0-bb8c2d7da79e_0e2c23f9.jpg?itok=q2J5oI7V","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.3":
{"url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/26/106bd588-355b-4dd0-a862-1cbf7408cb76_14889966.jpg","style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.3.style(
{\"filter\":
{\"style\":\"237x147\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.1.images.3.style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/237x147/public/d8/images/canvas/2022/11/26/106bd588-355b-4dd0-a862-1cbf7408cb76_14889966.jpg?itok=lbtiQzSf","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.2":
{"entityId":"3201106","entityUuid":"183f462a-88a7-41e3-ae5b-78ff8b4214eb","headline":"Covid-19 in China: Urumqi to ease lockdowns amid unrest over deadly fire","socialHeadline":"China’s Urumqi to ease Covid lockdowns amid unrest over deadly fire","images":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.2.images.0","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.2.images.1","typename":"Image"}],"urlAlias":"/news/china/politics/article/3201106/covid-19-china-urumqi-ease-lockdowns-amid-unrest-over-deadly-fire","updatedDate":1669476473000,"__typename":"Article"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.2.images.0":
{"url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/26/3382c8b9-d67a-4825-881c-58a0d1693517_980899c1.jpg","style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.2.images.0.style(
{\"filter\":
{\"style\":\"237x147\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.2.images.0.style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/237x147/public/d8/images/canvas/2022/11/26/3382c8b9-d67a-4825-881c-58a0d1693517_980899c1.jpg?itok=SJJox5Re&v=1669465635","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.2.images.1":
{"url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/26/6243e9f2-03e4-40bc-a1f0-14a6580bdea6_1e3248f6.jpg","style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.2.images.1.style(
{\"filter\":
{\"style\":\"237x147\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.2.images.1.style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/237x147/public/d8/images/canvas/2022/11/26/6243e9f2-03e4-40bc-a1f0-14a6580bdea6_1e3248f6.jpg?itok=dyn6IWAS","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.3":
{"entityId":"3201040","entityUuid":"fd902a08-8032-4ddc-ace2-d21f096e3cdf","headline":"Is China underestimating its Covid-19 numbers in its latest outbreak?","socialHeadline":"Is China underestimating its Covid-19 numbers in its latest outbreak?","images":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.3.images.0","typename":"Image"}],"urlAlias":"/news/china/politics/article/3201040/china-underestimating-its-covid-19-numbers-its-latest-outbreak","updatedDate":1669423553000,"__typename":"Article"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.3.images.0":
{"url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/25/4b6314af-297b-4000-abec-b25c40319583_938b3233.jpg","style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.3.images.0.style(
{\"filter\":
{\"style\":\"237x147\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.3.images.0.style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/237x147/public/d8/images/canvas/2022/11/25/4b6314af-297b-4000-abec-b25c40319583_938b3233.jpg?itok=JoYpm9XU&v=1669380531","__typename":"ImageStyle"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.4":
{"entityId":"3201066","entityUuid":"c15fa4c4-f382-4625-86a2-854364985736","headline":"Coronavirus: Omicron still driving Covid-19 surges and worries in US, elsewhere","socialHeadline":"Coronavirus: Omicron still driving Covid-19 surges in US","images":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.4.images.0","typename":"Image"}],"urlAlias":"/news/world/united-states-canada/article/3201066/coronavirus-omicron-still-driving-covid-19-surges-and-worries-us-elsewhere","updatedDate":1669534500000,"__typename":"Article"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.4.images.0":
{"url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/27/3257aa6c-a792-412d-8edb-2c387d5b9242_e38bb767.jpg","style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.4.images.0.style(
{\"filter\":
{\"style\":\"237x147\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.content(
{\"contentType\":\"Article\",\"filter\":
{\"entityUuid\":\"c1512b18-86a2-4dcf-bc76-003206c770c8\",\"applicationId\":\"2695b2c9-96ef-4fe4-96f8-ba20d0a020b3\"}}).moreOnThisArticles.4.images.0.style(
{\"filter\":
{\"style\":\"237x147\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/237x147/public/d8/images/canvas/2022/11/27/3257aa6c-a792-412d-8edb-2c387d5b9242_e38bb767.jpg?itok=zB9Yi9i7&v=1669534501","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0":
{"__typename":"Article","entityId":"3197672","entityUuid":"eb6e07a6-6392-4553-a229-876cbde5b487","headline":"China’s zero-Covid policy leaves experts at a loss with no definite end in sight","socialHeadline":"No end in sight for China’s zero-Covid policy with experts left at a loss","hasVideoContent":true,"sponsorType":null,"topics":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.0","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.1","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.2","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.3","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.4","typename":"Topic"}],"updatedDate":1667190446000,"urlAlias":"/news/china/politics/article/3197672/chinas-zero-covid-policy-leaves-experts-loss-no-definite-end-sight","flag":null,"types":[],"authors":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.authors.0","typename":"Author"}],"images":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0","typename":"Image"}],"tmpLiveArticle":null,"moreOnThisArticles":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.0","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.1","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.2","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.3","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.4","typename":"Article"}],"subHeadline":
{"type":"json","json":[
{"type":"ul","children":[
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"Observers see no signs of fundamental change in strict anti-pandemic policy, though some tweaks may be in the offing"}]},
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"With his third term secured, Xi Jinping must now address zero-Covid’s impact on the economy, jobs and social stability, some analysts believe"}]},
{"type":"text","data":"\n"}]}]},"summary":
{"type":"json","json":[
{"type":"p","children":[
{"type":"text","data":"With his third term secured, Xi Jinping must now address zero-Covid’s impact on the economy, jobs and social stability, some analysts believe."}]}]},"application":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.application","typename":"Application"}},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.0":
{"entityId":"505274","entityUuid":"c7985da3-2f6d-4540-a1c2-875c2d7881b6","name":"Coronavirus China","urlAlias":"/topics/coronavirus-china","types":
{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.1":
{"entityId":"512358","entityUuid":"f1b0ea39-ef03-4ec0-b2ef-09d06d71f4e5","name":"China’s 20th Party Congress","urlAlias":"/topics/chinas-20th-party-congress","types":
{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.2":
{"entityId":"503302","entityUuid":"83511e3e-58dd-455f-8ae5-9959c76c0eb0","name":"Coronavirus pandemic","urlAlias":"/topics/coronavirus-pandemic","types":
{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.3":
{"entityId":"503456","entityUuid":"014e94b1-7f09-46a4-9d18-9eb80f3d4ae2","name":"Coronavirus pandemic: All stories","urlAlias":"/topics/coronavirus-pandemic-all-stories","types":
{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.4":
{"entityId":"264615","entityUuid":"264c4a0b-ef06-424a-b0e1-28603fe61430","name":"China economy","urlAlias":"/topics/china-economy","types":
{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.authors.0":
{"entityId":"303006","entityUuid":"1e3da073-ddb4-4e2c-859d-47a4df77d87a","name":"Zhuang Pinghui","types":
{"type":"json","json":[]},"urlAlias":"/author/zhuang-pinghui","image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image(
{\"filter\":
{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"title":"","style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn1.i-scmp.com/sites/default/files/styles/118x118/public/zhuang-pinghui.png?itok=SQ_zOeDa","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0":
{"title":"The key to opening up for China is a rigorous vaccination campaign, but progress has stalled. Photo: Reuters ","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/28/587570b2-88a6-42d2-9bd4-b875aaa05baa_32f9d2b5.jpg","indexSlideshow":false,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/28/587570b2-88a6-42d2-9bd4-b875aaa05baa_32f9d2b5.jpg?itok=l6gw-aam&v=1666965204","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/28/587570b2-88a6-42d2-9bd4-b875aaa05baa_32f9d2b5.jpg?itok=zKTUjRQJ&v=1666965204","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/28/587570b2-88a6-42d2-9bd4-b875aaa05baa_32f9d2b5.jpg?itok=QN2QloIk&v=1666965204","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/28/587570b2-88a6-42d2-9bd4-b875aaa05baa_32f9d2b5.jpg?itok=WvamG6hC&v=1666965204","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.0":
{"headline":"Coronavirus in China: ‘No timeline’ for exit from zero-Covid controls","socialHeadline":"Coronavirus in China: ‘No timeline’ for exit from zero-Covid controls","entityId":"3195810","entityUuid":"3484c289-b7e0-4c6a-9c2a-80412961b074","urlAlias":"/news/china/politics/article/3195810/coronavirus-china-no-timeline-exit-zero-covid-controls","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.1":
{"headline":"China gives clearest sign yet it will stick with zero-Covid strategy","socialHeadline":"China gives clearest sign yet it will stick with zero-Covid strategy","entityId":"3195541","entityUuid":"39bb1f0f-b46a-4703-a35f-a61f3bd03fe2","urlAlias":"/news/china/politics/article/3195541/china-gives-clearest-sign-yet-it-will-stick-zero-covid-strategy","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.2":
{"headline":"Coronavirus: be more patient with China’s zero-Covid drive, People’s Daily urges","socialHeadline":"Communist Party mouthpiece urges patience for China’s zero-Covid drive","entityId":"3195434","entityUuid":"e52b756f-1b54-4c9f-bcf2-9e4719ff785d","urlAlias":"/news/china/politics/article/3195434/coronavirus-be-more-patient-chinas-zero-covid-drive-peoples","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.3":
{"headline":"China’s third-quarter GDP surprises, casting doubt on an easing of zero-Covid strategy","socialHeadline":"China’s surprising third-quarter GDP casts doubt on easing of zero-Covid policy","entityId":"3197080","entityUuid":"f90ab73d-eacf-4b80-bdd2-2bf9ef9da3d4","urlAlias":"/economy/china-economy/article/3197080/chinas-third-quarter-gdp-surprises-casting-doubt-easing-zero-covid-strategy","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.4":
{"headline":"China’s zero-Covid economic drag could be ‘significantly bad’ for Asia: IMF","socialHeadline":"China’s zero-Covid economic drag could be ‘significantly bad’ for Asia: IMF","entityId":"3197587","entityUuid":"3ad5ffeb-3625-43a7-a739-6355f06eb6db","urlAlias":"/week-asia/economics/article/3197587/chinas-zero-covid-economic-drag-could-be-significantly-bad-asia-imf","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.application":
{"entityId":"325477","__typename":"Application"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1":
{"__typename":"Article","entityId":"3197594","entityUuid":"4744368d-091f-4a7c-97e4-2cbf02f56a8f","headline":"Does China intend to rule Taiwan under ‘one country, two systems’? An extra line in latest changes to China’s constitution on Hong Kong may suggest so","socialHeadline":"What a new line in China’s constitution on Hong Kong says about Taiwan","hasVideoContent":false,"sponsorType":null,"topics":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.topics.0","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.topics.1","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.topics.2","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.topics.3","typename":"Topic"}],"updatedDate":1667001612000,"urlAlias":"/news/hong-kong/politics/article/3197594/does-china-intend-rule-taiwan-under-one-country-two-systems-extra-line-latest-changes-chinas","flag":null,"types":[],"authors":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.authors.0","typename":"Author"}],"images":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.1","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.2","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.3","typename":"Image"}],"tmpLiveArticle":null,"moreOnThisArticles":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.moreOnThisArticles.0","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.moreOnThisArticles.1","typename":"Article"}],"subHeadline":
{"type":"json","json":[
{"type":"ul","children":[
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"Additions may be reinforcement of Xi’s confidence in the one country, two systems model as the solution for Taiwan, says associate professor"}]},
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"Hong Kong and Taiwan should be viewed separately, says political scientist at Australia National University’s Taiwan Studies Program"}]},
{"type":"text","data":"\n"}]}]},"summary":
{"type":"json","json":[
{"type":"p","children":[
{"type":"text","data":"Additions may be reinforcement of Xi’s confidence in the one country, two systems model as the solution for Taiwan, says associate professor."}]}]},"application":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.application","typename":"Application"}},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.topics.0":
{"entityId":"503350","entityUuid":"c91f666d-f020-4681-8785-ea19189067f0","name":"Hong Kong politics","urlAlias":"/topics/hong-kong-politics","types":
{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.topics.1":
{"entityId":"305785","entityUuid":"173e4fc8-3d56-4b88-8e2a-a3822b58ce27","name":"Taiwan","urlAlias":"/topics/taiwan-0","types":
{"type":"json","json":["place_locations"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.topics.2":
{"entityId":"512358","entityUuid":"f1b0ea39-ef03-4ec0-b2ef-09d06d71f4e5","name":"China’s 20th Party Congress","urlAlias":"/topics/chinas-20th-party-congress","types":
{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.topics.3":
{"entityId":"512361","entityUuid":"e8bde58f-e048-4aca-b497-2bec6af4cfd9","name":"China’s 20th Party Congress: All Articles","urlAlias":"/topics/chinas-20th-party-congress-all-articles","types":
{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.authors.0":
{"entityId":"503070","entityUuid":"f4d5406c-d58a-470b-b2f8-9aa26b739d64","name":"Natalie Wong","types":
{"type":"json","json":[]},"urlAlias":"/author/natalie-wong","image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image(
{\"filter\":
{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"title":"","style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2020/02/15/natalie_wong.jpg?itok=HCKRykLE","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0":
{"title":"Amendments to the Chinese Communist Party’s constitution may have implications for Taiwan, analysts say. Photo: Sam Tsang","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/28/231d746b-d168-430e-af76-e901a02c1ead_4b4ac776.jpg","indexSlideshow":false,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/28/231d746b-d168-430e-af76-e901a02c1ead_4b4ac776.jpg?itok=Z7Xvo5f4&v=1666945043","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/28/231d746b-d168-430e-af76-e901a02c1ead_4b4ac776.jpg?itok=8LX4-Vlp&v=1666945043","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/28/231d746b-d168-430e-af76-e901a02c1ead_4b4ac776.jpg?itok=sRD6RFUc&v=1666945043","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/28/231d746b-d168-430e-af76-e901a02c1ead_4b4ac776.jpg?itok=ygl4D-WX&v=1666945043","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.1":
{"title":"The amendment to the Chinese Communist Party’s constitution says it will “resolutely oppose and deter separatists seeking Taiwan independence”. Photo: AFP","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/28/a5918863-c197-47a7-aae6-b9c83caf726a_e574f619.jpg","indexSlideshow":null,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.1.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.1.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.1.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.1.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.1.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/28/a5918863-c197-47a7-aae6-b9c83caf726a_e574f619.jpg?itok=jWucLvZC","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.1.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/28/a5918863-c197-47a7-aae6-b9c83caf726a_e574f619.jpg?itok=fV_quPfg","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.1.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/28/a5918863-c197-47a7-aae6-b9c83caf726a_e574f619.jpg?itok=abt081Cv","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.1.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/28/a5918863-c197-47a7-aae6-b9c83caf726a_e574f619.jpg?itok=zbrfPUad","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.2":
{"title":"Tian Feilong, an associate professor at Beihang University’s law school in Beijing. Photo: AFP","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/28/22cc7990-01b6-4e58-9117-2e2e68712727_657aec19.jpg","indexSlideshow":null,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.2.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.2.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.2.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.2.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.2.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/28/22cc7990-01b6-4e58-9117-2e2e68712727_657aec19.jpg?itok=Kq5ABVgq","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.2.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/28/22cc7990-01b6-4e58-9117-2e2e68712727_657aec19.jpg?itok=NSp7YAsI","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.2.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/28/22cc7990-01b6-4e58-9117-2e2e68712727_657aec19.jpg?itok=nBHU5MCE","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.2.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/28/22cc7990-01b6-4e58-9117-2e2e68712727_657aec19.jpg?itok=_oxwD9L0","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.3":
{"title":"Visitors stand next to a screen showing President Xi Jinping at the newly reopened Military Museum’s exhibition in Beijing. Photo: AP","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/28/7d11e283-67af-4173-8002-b226a20d5d90_520a8b67.jpg","indexSlideshow":null,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.3.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.3.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.3.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.3.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.3.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/28/7d11e283-67af-4173-8002-b226a20d5d90_520a8b67.jpg?itok=Nu65h58x","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.3.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/28/7d11e283-67af-4173-8002-b226a20d5d90_520a8b67.jpg?itok=xEfy-vDq","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.3.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/28/7d11e283-67af-4173-8002-b226a20d5d90_520a8b67.jpg?itok=dLwCzCbk","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.3.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/28/7d11e283-67af-4173-8002-b226a20d5d90_520a8b67.jpg?itok=cL3QpAu2","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.moreOnThisArticles.0":
{"headline":"China wants to ‘speed up’ its seizure of Taiwan, Antony Blinken says","socialHeadline":"China wants to ‘speed up’ its seizure of Taiwan, Blinken says","entityId":"3197376","entityUuid":"045210e2-54e4-476f-bc46-63a73a6921f1","urlAlias":"/news/world/united-states-canada/article/3197376/china-wants-speed-its-seizure-taiwan-antony-blinken-says","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.moreOnThisArticles.1":
{"headline":"Taiwan to increase soldiers’ pay as cross-strait military tensions grow","socialHeadline":"Taiwan to increase soldiers’ pay as cross-strait military tensions grow","entityId":"3197217","entityUuid":"5112f0c6-59e2-4d0c-8a82-f6432bddc2dc","urlAlias":"/news/china/military/article/3197217/taiwan-increase-soldiers-pay-cross-strait-military-tensions-grow","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.application":
{"entityId":"325477","__typename":"Application"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2":
{"__typename":"Article","entityId":"3197106","entityUuid":"bf7a6c3b-bf1b-4e34-b01c-ba8a037cad40","headline":"The Hong Kong connection: Xi Jinping, 4 other top Chinese leaders and an ideologue who studied city from afar","socialHeadline":"What the Hong Kong links of China’s top leadership team mean for city","hasVideoContent":true,"sponsorType":null,"topics":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.topics.0","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.topics.1","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.topics.2","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.topics.3","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.topics.4","typename":"Topic"}],"updatedDate":1666686509000,"urlAlias":"/news/hong-kong/politics/article/3197106/hong-kong-connection-what-6-chinas-top-leadership-team-including-xi-jinping-have-common","flag":null,"types":[],"authors":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.0","typename":"Author"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.1","typename":"Author"}],"images":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.1","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.2","typename":"Image"}],"tmpLiveArticle":null,"moreOnThisArticles":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.moreOnThisArticles.0","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.moreOnThisArticles.1","typename":"Article"}],"subHeadline":
{"type":"json","json":[
{"type":"ul","children":[
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"New hierarchy of seven-member Politburo Standing Committee could lead to smoother implementation of key policies involving Hong Kong, analysts say"}]},
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"Pro-Beijing heavyweight says new team gives Hong Kong ‘quite a lot opportunities to be involved in the overall development of China’"}]},
{"type":"text","data":"\n"}]}]},"summary":
{"type":"json","json":[
{"type":"p","children":[
{"type":"text","data":"New hierarchy of seven-member Politburo Standing Committee could lead to smoother implementation of key policies involving Hong Kong, analysts say."}]}]},"application":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.application","typename":"Application"}},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.topics.0":
{"entityId":"503350","entityUuid":"c91f666d-f020-4681-8785-ea19189067f0","name":"Hong Kong politics","urlAlias":"/topics/hong-kong-politics","types":
{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.topics.1":
{"entityId":"25794","entityUuid":"1c739c88-bfaa-4155-bcdf-f1b7f0d5dd52","name":"Xi Jinping","urlAlias":"/topics/xi-jinping","types":
{"type":"json","json":["person"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.topics.2":
{"entityId":"322904","entityUuid":"36db4c8a-2780-4fb0-91ba-aeff7a07a97b","name":"China’s Communist Party","urlAlias":"/topics/chinas-communist-party","types":
{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.topics.3":
{"entityId":"512358","entityUuid":"f1b0ea39-ef03-4ec0-b2ef-09d06d71f4e5","name":"China’s 20th Party Congress","urlAlias":"/topics/chinas-20th-party-congress","types":
{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.topics.4":
{"entityId":"512361","entityUuid":"e8bde58f-e048-4aca-b497-2bec6af4cfd9","name":"China’s 20th Party Congress: All Articles","urlAlias":"/topics/chinas-20th-party-congress-all-articles","types":
{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.0":
{"entityId":"503070","entityUuid":"f4d5406c-d58a-470b-b2f8-9aa26b739d64","name":"Natalie Wong","types":
{"type":"json","json":[]},"urlAlias":"/author/natalie-wong","image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image(
{\"filter\":
{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"title":"","style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2020/02/15/natalie_wong.jpg?itok=HCKRykLE","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.1":
{"entityId":"502424","entityUuid":"a3952987-8b04-429a-a347-db24e0687111","name":"Lilian Cheng","types":
{"type":"json","json":[]},"urlAlias":"/author/lilian-cheng","image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.1.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image(
{\"filter\":
{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.1.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"title":"","style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.1.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.1.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2019/11/28/scmp_hk_desk_miss_lilian_cheng_-_nov_2019.jpg?itok=H-72N6F3","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0":
{"title":"Chinese President Xi Jinping (front) walks with members of the country’s new Politburo Standing Committee. Photo: AFP","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/24/d394a60f-9d88-4782-9573-a3546fbcc1d5_e551f8d1.jpg","indexSlideshow":false,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/24/d394a60f-9d88-4782-9573-a3546fbcc1d5_e551f8d1.jpg?itok=Tqm1-saI&v=1666627442","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/24/d394a60f-9d88-4782-9573-a3546fbcc1d5_e551f8d1.jpg?itok=gVWqll1z&v=1666627442","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/24/d394a60f-9d88-4782-9573-a3546fbcc1d5_e551f8d1.jpg?itok=H2FsT-uM&v=1666627442","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/24/d394a60f-9d88-4782-9573-a3546fbcc1d5_e551f8d1.jpg?itok=7g8QgNjM&v=1666627442","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.1":
{"title":"Lau Siu-kai, vice-president of the Chinese Association of Hong Kong and Macau Studies. Photo: Xiaomei Chen","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/24/398ce694-fd2c-43f4-a24f-60d7e48dd25e_cdae253e.jpg","indexSlideshow":null,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.1.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.1.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.1.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.1.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.1.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/24/398ce694-fd2c-43f4-a24f-60d7e48dd25e_cdae253e.jpg?itok=oACDwgh2","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.1.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/24/398ce694-fd2c-43f4-a24f-60d7e48dd25e_cdae253e.jpg?itok=o6a70y0Z","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.1.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/24/398ce694-fd2c-43f4-a24f-60d7e48dd25e_cdae253e.jpg?itok=Dng185Ey","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.1.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/24/398ce694-fd2c-43f4-a24f-60d7e48dd25e_cdae253e.jpg?itok=fuk5GeNn","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.2":
{"title":"Hong Kong politician Rita Fan. Photo: Jonathan Wong","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/24/b580664e-eb2f-4182-8781-d4160af40ba2_798e21ed.jpg","indexSlideshow":null,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.2.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.2.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.2.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.2.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.2.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/24/b580664e-eb2f-4182-8781-d4160af40ba2_798e21ed.jpg?itok=QhSiO5mB","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.2.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/24/b580664e-eb2f-4182-8781-d4160af40ba2_798e21ed.jpg?itok=I2yPJJe_","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.2.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/24/b580664e-eb2f-4182-8781-d4160af40ba2_798e21ed.jpg?itok=71Mb5HGb","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.2.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/24/b580664e-eb2f-4182-8781-d4160af40ba2_798e21ed.jpg?itok=0DIt8Hjv","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.moreOnThisArticles.0":
{"headline":"Congress delegates embrace Communist Party slogan pledging support for Xi Jinping","socialHeadline":"Congress delegates embrace Communist Party slogan pledging support for Xi","entityId":"3196532","entityUuid":"11a60725-adb4-41cd-bda4-d05c83c7db89","urlAlias":"/news/china/politics/article/3196532/congress-delegates-embrace-communist-party-slogan-pledging-support-xi-jinping","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.moreOnThisArticles.1":
{"headline":"Bigger-than-expected changes loom as Xi Jinping shapes China’s top leadership at 20th Communist Party congress","socialHeadline":"Bigger-than-expected changes loom as Xi shapes China’s top leadership","entityId":"3196222","entityUuid":"11aace5f-1a49-4a65-9ea6-32e6894b51c1","urlAlias":"/news/china/politics/article/3196222/bigger-expected-changes-loom-xi-jinping-shapes-chinas-top","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.application":
{"entityId":"325477","__typename":"Application"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3":
{"__typename":"Article","entityId":"3196962","entityUuid":"73098fcf-1cc2-4ae3-870e-f687cf5de711","headline":"China’s reshuffled military leadership sends clear signal on Taiwan focus","socialHeadline":"China’s reshuffled military leadership highlights Taiwan focus","hasVideoContent":true,"sponsorType":null,"topics":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.topics.0","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.topics.1","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.topics.2","typename":"Topic"}],"updatedDate":1666597173000,"urlAlias":"/news/china/military/article/3196962/chinas-reshuffled-military-leadership-sends-clear-signal-taiwan-focus","flag":null,"types":[],"authors":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.0","typename":"Author"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.1","typename":"Author"}],"images":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.1","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.2","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.3","typename":"Image"}],"tmpLiveArticle":null,"moreOnThisArticles":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.moreOnThisArticles.0","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.moreOnThisArticles.1","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.moreOnThisArticles.2","typename":"Article"}],"subHeadline":
{"type":"json","json":[
{"type":"ul","children":[
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"Former Eastern Theatre Command head General He Weidong becomes second-ranked CMC vice-chairman"}]},
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"General Zhang Youxia promoted to first-ranked CMC vice-chairman despite being 72 years old"}]},
{"type":"text","data":"\n"}]}]},"summary":
{"type":"json","json":[
{"type":"p","children":[
{"type":"text","data":"New Central Military Commission line-up gives clues on the People’s Liberation Army’s priorities in the next five years."}]}]},"application":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.application","typename":"Application"}},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.topics.0":
{"entityId":"512358","entityUuid":"f1b0ea39-ef03-4ec0-b2ef-09d06d71f4e5","name":"China’s 20th Party Congress","urlAlias":"/topics/chinas-20th-party-congress","types":
{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.topics.1":
{"entityId":"265639","entityUuid":"046da166-8dee-49b0-b8d5-25a24aa1ef2e","name":"China's military","urlAlias":"/topics/china-military","types":
{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.topics.2":
{"entityId":"325175","entityUuid":"3473b438-7d9b-4a9b-8ab9-191518449a20","name":"China military reform","urlAlias":"/topics/china-military-reform","types":
{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.0":
{"entityId":"503018","entityUuid":"f2ba4c09-45c1-44c0-8757-623658f1677f","name":"Jack Lau","types":
{"type":"json","json":[]},"urlAlias":"/author/jack-lau","image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image(
{\"filter\":
{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"title":"","style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2020/07/31/scmp_-_jack_lau.jpg?itok=U_gr_0V5","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.1":
{"entityId":"508750","entityUuid":"64c691aa-72e3-4403-81c0-d5b84937aa86","name":"Amber Wang","types":
{"type":"json","json":[]},"urlAlias":"/author/amber-wang","image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.1.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image(
{\"filter\":
{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.1.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"title":"","style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.1.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.1.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2021/09/14/8dc57736-7948-4985-bac9-262d2176d2f3.jpeg?itok=cYGmTp76","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0":
{"title":"Members of the People’s Liberation Army band sit during the opening session of the Communist Party’s national congress at the Great Hall of the People in Beijing on October 16. Photo: AFP","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/23/5c380b59-e522-4475-bb1b-b849a405fc4c_6dfcdc60.jpg","indexSlideshow":false,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/23/5c380b59-e522-4475-bb1b-b849a405fc4c_6dfcdc60.jpg?itok=8qRhD2cI&v=1666526545","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/23/5c380b59-e522-4475-bb1b-b849a405fc4c_6dfcdc60.jpg?itok=lJ_crTRY&v=1666526545","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/23/5c380b59-e522-4475-bb1b-b849a405fc4c_6dfcdc60.jpg?itok=01R2vhiv&v=1666526545","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/23/5c380b59-e522-4475-bb1b-b849a405fc4c_6dfcdc60.jpg?itok=eU2F3ebg&v=1666526545","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.1":
{"title":"Members of the People’s Liberation Army band at the opening session of the 20th Communist Party congress, at the Great Hall of the People in Beijing on October 16. Photo: AFP","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/23/5c380b59-e522-4475-bb1b-b849a405fc4c_9ad29111.jpg","indexSlideshow":false,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.1.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.1.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.1.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.1.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.1.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/23/5c380b59-e522-4475-bb1b-b849a405fc4c_9ad29111.jpg?itok=vCLCyq4C&v=1666529544","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.1.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/23/5c380b59-e522-4475-bb1b-b849a405fc4c_9ad29111.jpg?itok=X-9DPo0n&v=1666529544","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.1.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/23/5c380b59-e522-4475-bb1b-b849a405fc4c_9ad29111.jpg?itok=Ierjupf7&v=1666529544","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.1.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/23/5c380b59-e522-4475-bb1b-b849a405fc4c_9ad29111.jpg?itok=NovussuS&v=1666529544","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.2":
{"title":"General Zhang Youxia, seen here at the annual meeting of the National People’s Congress in March 2018, has been promoted to first-ranked vice-chairman of the Central Military Commission. Photo: Simon Song","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/23/f67556e7-a06d-4656-97e7-7ef40793bed9_ffed089c.jpg","indexSlideshow":null,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.2.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.2.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.2.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.2.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.2.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/23/f67556e7-a06d-4656-97e7-7ef40793bed9_ffed089c.jpg?itok=juMU3E2u","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.2.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/23/f67556e7-a06d-4656-97e7-7ef40793bed9_ffed089c.jpg?itok=4YQDjQBc","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.2.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/23/f67556e7-a06d-4656-97e7-7ef40793bed9_ffed089c.jpg?itok=W22SnVXj","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.2.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/23/f67556e7-a06d-4656-97e7-7ef40793bed9_ffed089c.jpg?itok=svXh1h7A","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.3":
{"title":"People’s Liberation Army soldiers on parade during military training in the Pamir Mountains near Kashgar, Xinjiang Uygur autonomous region, in January last year. Photo: AFP","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/23/b7ef295c-1c4c-45d9-af7f-78921331eac4_ed18453d.jpg","indexSlideshow":null,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.3.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.3.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.3.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.3.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.3.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/23/b7ef295c-1c4c-45d9-af7f-78921331eac4_ed18453d.jpg?itok=nZ-3IOmV","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.3.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/23/b7ef295c-1c4c-45d9-af7f-78921331eac4_ed18453d.jpg?itok=GSy26-mP","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.3.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/23/b7ef295c-1c4c-45d9-af7f-78921331eac4_ed18453d.jpg?itok=xWI8CO5M","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.3.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/23/b7ef295c-1c4c-45d9-af7f-78921331eac4_ed18453d.jpg?itok=fahr7kbv","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.moreOnThisArticles.0":
{"headline":"Chinese state media highlights PLA role in intercepting foreign warplanes as activity in East and South China seas shows little sign of letting up","socialHeadline":"Chinese state media highlights PLA role in intercepting foreign warplanes","entityId":"3195224","entityUuid":"0741ff92-7112-45b7-88fa-c292a5dc0ca9","urlAlias":"/news/china/military/article/3195224/chinese-state-media-highlights-pla-role-intercepting-foreign","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.moreOnThisArticles.1":
{"headline":"Taiwanese military confirms for first time PLA drones crossed Taiwan Strait median line","socialHeadline":"PLA drones crossed median line, Taiwan confirms for first time","entityId":"3192126","entityUuid":"9611c32a-d3c5-4c2f-9577-620c9f1cb64b","urlAlias":"/news/china/military/article/3192126/taiwanese-military-confirms-first-time-pla-drones-crossed","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.moreOnThisArticles.2":
{"headline":"PLA practises force projection with eye to cross-strait action","socialHeadline":"PLA practises cross-strait force projection with eye to cross-strait action","entityId":"3190966","entityUuid":"6009a146-94ab-4839-8812-43009b0c0bdf","urlAlias":"/news/china/military/article/3190966/pla-practises-force-projection-eye-cross-strait-action","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.application":
{"entityId":"325477","__typename":"Application"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}})":
{"items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}})":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"section_top_513305\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3","typename":"Article"}],"settings":null,"__typename":"Queue"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0":
{"__typename":"Article","entityId":"3198350","entityUuid":"e3c17100-3107-4a0d-8743-46abb824367c","headline":"Qin Gang, China’s ambassador to US and a long-time Xi loyalist, poised to lead foreign ministry","socialHeadline":"Wolf warrior rising? China’s ambassador to US poised to lead foreign ministry","hasVideoContent":true,"sponsorType":null,"topics":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.0","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.1","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.2","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.3","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.4","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.5","typename":"Topic"}],"updatedDate":1667590480000,"urlAlias":"/news/china/article/3198350/qin-gang-chinas-ambassador-us-and-long-time-xi-loyalist-poised-lead-foreign-ministry","flag":null,"types":[],"authors":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.authors.0","typename":"Author"}],"images":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0","typename":"Image"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.1","typename":"Image"}],"tmpLiveArticle":null,"moreOnThisArticles":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.0","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.1","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.2","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.3","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.4","typename":"Article"}],"subHeadline":
{"type":"json","json":[
{"type":"ul","children":[
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"Promotion to Central Committee after 20th party congress caps ascent to Beijing’s power circle marked by defiant tone in service of Chinese leader"}]},
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"But during Qin’s time in Washington, bilateral relations failed to improve as senior diplomat made few inroads with policymakers, analysts say"}]},
{"type":"text","data":"\n"}]}]},"summary":
{"type":"json","json":[
{"type":"p","children":[
{"type":"text","data":"Promotion to Central Committee after 20th party congress caps ascent to Beijing power circle marked by defiant tone in service of Chinese leader."}]}]},"application":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.application","typename":"Application"}},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.0":
{"entityId":"265568","entityUuid":"e6a51691-c2b2-4260-927b-be465c72223d","name":"US-China relations","urlAlias":"/topics/us-china-relations","types":
{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.1":
{"entityId":"25794","entityUuid":"1c739c88-bfaa-4155-bcdf-f1b7f0d5dd52","name":"Xi Jinping","urlAlias":"/topics/xi-jinping","types":
{"type":"json","json":["person"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.2":
{"entityId":"508922","entityUuid":"4b4b67d1-4277-4fc6-9765-f4cf7aac0030","name":"Joe Biden’s China policy","urlAlias":"/topics/joe-bidens-china-policy","types":
{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.3":
{"entityId":"325340","entityUuid":"011e9dde-f91e-4654-98bc-1fe6f926f76b","name":"Diplomacy","urlAlias":"/topics/diplomacy","types":
{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.4":
{"entityId":"512358","entityUuid":"f1b0ea39-ef03-4ec0-b2ef-09d06d71f4e5","name":"China’s 20th Party Congress","urlAlias":"/topics/chinas-20th-party-congress","types":
{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.topics.5":
{"entityId":"512361","entityUuid":"e8bde58f-e048-4aca-b497-2bec6af4cfd9","name":"China’s 20th Party Congress: All Articles","urlAlias":"/topics/chinas-20th-party-congress-all-articles","types":
{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.authors.0":
{"entityId":"500428","entityUuid":"bb70c9cd-b661-49e7-8f8b-efef02949986","name":"Mark Magnier","types":
{"type":"json","json":[]},"urlAlias":"/author/mark-magnier","image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image(
{\"filter\":
{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"title":"","style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2019/04/04/mark_magnier.jpg?itok=dZY39Bx_","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0":
{"title":"Qin Gang, China’s ambassador to the US, delivering a speech in Yorba Linda, California, in February to mark the 50th anniversary of former US president Richard Nixon’s historic visit to China. Photo: Kyodo","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/03/ac099a77-f2c8-46cd-abc8-5bdc52f57120_97fa4975.jpg","indexSlideshow":false,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"wide_landscape\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"wide_landscape\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/11/03/ac099a77-f2c8-46cd-abc8-5bdc52f57120_97fa4975.jpg?itok=CCldJLzj&v=1667488464","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/11/03/ac099a77-f2c8-46cd-abc8-5bdc52f57120_97fa4975.jpg?itok=G_MitopJ&v=1667488464","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/11/03/ac099a77-f2c8-46cd-abc8-5bdc52f57120_97fa4975.jpg?itok=7qylBYPV&v=1667488464","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/11/03/ac099a77-f2c8-46cd-abc8-5bdc52f57120_97fa4975.jpg?itok=pqrjKsaG&v=1667488464","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.0.style(
{\"filter\":
{\"style\":\"wide_landscape\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/d8/images/canvas/2022/11/03/ac099a77-f2c8-46cd-abc8-5bdc52f57120_97fa4975.jpg?itok=OCcNLe_7&v=1667488464","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.1":
{"title":"Qin (second from left) arrives in Washington in July 2021 to take up his post as China’s ambassador to the US. Photo: Xinhua","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/11/03/8699b3ac-f05d-407e-8fc7-8dbec2c3e6ae_ae0293c0.jpg","indexSlideshow":null,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.1.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.1.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.1.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.1.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"wide_landscape\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.1.style(
{\"filter\":
{\"style\":\"wide_landscape\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.1.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/11/03/8699b3ac-f05d-407e-8fc7-8dbec2c3e6ae_ae0293c0.jpg?itok=ze8txMwl","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.1.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/11/03/8699b3ac-f05d-407e-8fc7-8dbec2c3e6ae_ae0293c0.jpg?itok=1f1PLl07","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.1.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/11/03/8699b3ac-f05d-407e-8fc7-8dbec2c3e6ae_ae0293c0.jpg?itok=4h9f1rCi","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.1.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/11/03/8699b3ac-f05d-407e-8fc7-8dbec2c3e6ae_ae0293c0.jpg?itok=nFXfu6F-","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.images.1.style(
{\"filter\":
{\"style\":\"wide_landscape\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/d8/images/canvas/2022/11/03/8699b3ac-f05d-407e-8fc7-8dbec2c3e6ae_ae0293c0.jpg?itok=rAjqp61G","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.0":
{"headline":"US’ hard-line policy on China likely to hold whoever wins midterm elections, say analysts","socialHeadline":"US’ hard line on China likely to hold whoever wins midterm elections: analysts","entityId":"3197926","entityUuid":"3595ddfc-c141-4aab-aa0d-91ab14497c64","urlAlias":"/news/china/article/3197926/hard-line-us-policy-china-likely-hold-whoever-wins-midterm-elections-analysts","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.1":
{"headline":"China ‘under pressure’ like never before after Joe Biden unveils national security strategy, analysts say","socialHeadline":"Biden security strategy puts China under ‘unprecedented pressure’: analysts","entityId":"3195882","entityUuid":"be217c04-9dd1-4dc1-9c3d-fe05c759a718","urlAlias":"/news/china/diplomacy/article/3195882/china-under-pressure-never-after-joe-biden-unveils-national","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.2":
{"headline":"Panda diplomacy, 50 years on: the latest chapter for a safe space in US-China relations","socialHeadline":"Panda diplomacy: the latest chapter for a safe space in US-China relations","entityId":"3190165","entityUuid":"cbe665e7-1547-4a34-b7ae-dcc0f65f8649","urlAlias":"/news/china/article/3190165/panda-diplomacy-50-years-latest-chapter-safe-space-us-china-relations","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.3":
{"headline":"US keen to ‘manage differences’ with China amid strains over Taiwan trip: State Department","socialHeadline":"Beijing has ‘shut down’ key communication with outside world, says US","entityId":"3190084","entityUuid":"328dfdc6-e2c2-479c-90cc-8aa78c7ee622","urlAlias":"/news/china/diplomacy/article/3190084/us-keen-manage-differences-china-amid-strains-over-taiwan-trip","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.moreOnThisArticles.4":
{"headline":"China’s US ambassador decries ‘political virus’ hurting bilateral economic ties between ‘natural partners’","socialHeadline":"China’s US ambassador decries ‘political virus’ hurting economic ties","entityId":"3176794","entityUuid":"a0f4926b-5789-4660-be62-82bd040ab40f","urlAlias":"/economy/china-economy/article/3176794/chinas-us-ambassador-decries-political-virus-hurting","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0.application":
{"entityId":"325477","__typename":"Application"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1":
{"__typename":"Article","entityId":"3197778","entityUuid":"af963a83-a001-4842-9249-6cd73e9a9819","headline":"China names Chen Yixin as new state security minister in latest leadership shake-up","socialHeadline":"China names Chen Yixin as new state security minister in leadership shake-up","hasVideoContent":true,"sponsorType":null,"topics":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.topics.0","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.topics.1","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.topics.2","typename":"Topic"}],"updatedDate":1667134812000,"urlAlias":"/news/china/politics/article/3197778/china-names-chen-yixin-new-state-security-minister-latest-leadership-shake","flag":null,"types":[],"authors":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.authors.0","typename":"Author"}],"images":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0","typename":"Image"}],"tmpLiveArticle":null,"moreOnThisArticles":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.moreOnThisArticles.0","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.moreOnThisArticles.1","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.moreOnThisArticles.2","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.moreOnThisArticles.3","typename":"Article"}],"subHeadline":
{"type":"json","json":[
{"type":"ul","children":[
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"Chen replaces Politburo member Chen Wenqing, who moves on to higher office"}]},
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"The new intelligence chief first crossed paths with President Xi Jinping 2 decades ago"}]},
{"type":"text","data":"\n"}]}]},"summary":
{"type":"json","json":[
{"type":"p","children":[
{"type":"text","data":"Chen replaces Politburo member Chen Wenqing, who moves on to higher office."}]}]},"application":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.application","typename":"Application"}},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.topics.0":
{"entityId":"512358","entityUuid":"f1b0ea39-ef03-4ec0-b2ef-09d06d71f4e5","name":"China’s 20th Party Congress","urlAlias":"/topics/chinas-20th-party-congress","types":
{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.topics.1":
{"entityId":"322904","entityUuid":"36db4c8a-2780-4fb0-91ba-aeff7a07a97b","name":"China’s Communist Party","urlAlias":"/topics/chinas-communist-party","types":
{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.topics.2":
{"entityId":"25794","entityUuid":"1c739c88-bfaa-4155-bcdf-f1b7f0d5dd52","name":"Xi Jinping","urlAlias":"/topics/xi-jinping","types":
{"type":"json","json":["person"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.authors.0":
{"entityId":"503018","entityUuid":"f2ba4c09-45c1-44c0-8757-623658f1677f","name":"Jack Lau","types":
{"type":"json","json":[]},"urlAlias":"/author/jack-lau","image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image(
{\"filter\":
{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"title":"","style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2020/07/31/scmp_-_jack_lau.jpg?itok=U_gr_0V5","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0":
{"title":"Chen Yixin has been named as China’s new minister of state security. Photo: Handout","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/30/0a34c8ca-2cbe-45a0-8e05-72c70ded062e_c6725a43.jpg","indexSlideshow":false,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"wide_landscape\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"wide_landscape\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/30/0a34c8ca-2cbe-45a0-8e05-72c70ded062e_c6725a43.jpg?itok=6olrd8-2&v=1667132941","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/30/0a34c8ca-2cbe-45a0-8e05-72c70ded062e_c6725a43.jpg?itok=N8XnI9__&v=1667132941","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/30/0a34c8ca-2cbe-45a0-8e05-72c70ded062e_c6725a43.jpg?itok=lmtzntUE&v=1667132941","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/30/0a34c8ca-2cbe-45a0-8e05-72c70ded062e_c6725a43.jpg?itok=blMedEHB&v=1667132941","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.images.0.style(
{\"filter\":
{\"style\":\"wide_landscape\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/d8/images/canvas/2022/10/30/0a34c8ca-2cbe-45a0-8e05-72c70ded062e_c6725a43.jpg?itok=ZDmBQ7jL&v=1667132941","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.moreOnThisArticles.0":
{"headline":"Politburo member Chen Wenqing to step up to China’s top security job","socialHeadline":"Politburo member Chen Wenqing to step up to China’s top security job","entityId":"3197708","entityUuid":"e5bd6a40-d80e-4e37-a210-545824d1ce94","urlAlias":"/news/china/politics/article/3197708/politburo-member-chen-wenqing-step-chinas-top-security-job","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.moreOnThisArticles.1":
{"headline":"The time for China’s rise has come, security chief tells law enforcers","socialHeadline":"The time for China’s rise has come, security chief tells law enforcers","entityId":"3117973","entityUuid":"b761400c-5724-11eb-84b3-e7426e7b8906","urlAlias":"/news/china/politics/article/3117973/time-chinas-rise-has-come-security-chief-tells-law-enforcers","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.moreOnThisArticles.2":
{"headline":"Xi Jinping security protégé to bolster China’s coronavirus task force","socialHeadline":"Xi Jinping security protégé to bolster China’s coronavirus task force","entityId":"3049671","entityUuid":"376cc746-4a5e-11ea-befc-ef9687daaa85","urlAlias":"/news/china/politics/article/3049671/xi-jinping-security-protege-bolster-chinas-coronavirus-task","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.moreOnThisArticles.3":
{"headline":"Death of coronavirus doctor Li Wenliang becomes catalyst for ‘freedom of speech’ demands in China","socialHeadline":"Coronavirus doctor’s death a catalyst for ‘freedom of speech’ demands","entityId":"3049606","entityUuid":"f5303c20-49a7-11ea-befc-ef9687daaa85","urlAlias":"/news/china/politics/article/3049606/coronavirus-doctors-death-becomes-catalyst-freedom-speech","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1.application":
{"entityId":"325477","__typename":"Application"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2":
{"__typename":"Article","entityId":"3197708","entityUuid":"e5bd6a40-d80e-4e37-a210-545824d1ce94","headline":"Politburo member Chen Wenqing to step up to China’s top security job","socialHeadline":"Politburo member Chen Wenqing to step up to China’s top security job","hasVideoContent":true,"sponsorType":null,"topics":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.topics.0","typename":"Topic"}],"updatedDate":1667027737000,"urlAlias":"/news/china/politics/article/3197708/politburo-member-chen-wenqing-step-chinas-top-security-job","flag":null,"types":[],"authors":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.0","typename":"Author"}],"images":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0","typename":"Image"}],"tmpLiveArticle":null,"moreOnThisArticles":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.moreOnThisArticles.0","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.moreOnThisArticles.1","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.moreOnThisArticles.2","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.moreOnThisArticles.3","typename":"Article"}],"subHeadline":
{"type":"json","json":[
{"type":"ul","children":[
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"Chen will be party secretary of the Central Political and Legal Affairs Commission, overseeing national security and intelligence"}]},
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"He began his career nearly four decades ago in Sichuan, rising to head the Ministry of State Security"}]},
{"type":"text","data":"\n"}]}]},"summary":
{"type":"json","json":[
{"type":"p","children":[
{"type":"text","data":"Chen will be party secretary of the Central Political and Legal Affairs Commission, overseeing national security and intelligence."}]}]},"application":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.application","typename":"Application"}},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.topics.0":
{"entityId":"512358","entityUuid":"f1b0ea39-ef03-4ec0-b2ef-09d06d71f4e5","name":"China’s 20th Party Congress","urlAlias":"/topics/chinas-20th-party-congress","types":
{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.0":
{"entityId":"331088","entityUuid":"6f2bb050-a469-4962-aa2c-ae6d15c95b64","name":"Echo Xie","types":
{"type":"json","json":[]},"urlAlias":"/author/echo-xie","image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image(
{\"filter\":
{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"title":"","style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2020/02/28/echo_xie.jpg?itok=TD49h4xc","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0":
{"title":"Chen Wenqing started out as a police officer in Sichuan province nearly 40 years ago. Photo: CCTV","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/29/cd216636-9cf8-4619-a12e-1c447da298c1_242aa535.jpg","indexSlideshow":false,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"wide_landscape\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"wide_landscape\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/29/cd216636-9cf8-4619-a12e-1c447da298c1_242aa535.jpg?itok=0TxFJRpf&v=1667027664","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/29/cd216636-9cf8-4619-a12e-1c447da298c1_242aa535.jpg?itok=lyXhd2ti&v=1667027664","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/29/cd216636-9cf8-4619-a12e-1c447da298c1_242aa535.jpg?itok=HiqK5_4G&v=1667027664","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/29/cd216636-9cf8-4619-a12e-1c447da298c1_242aa535.jpg?itok=21qzVucc&v=1667027664","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.images.0.style(
{\"filter\":
{\"style\":\"wide_landscape\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/d8/images/canvas/2022/10/29/cd216636-9cf8-4619-a12e-1c447da298c1_242aa535.jpg?itok=wBHwtusi&v=1667027664","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.moreOnThisArticles.0":
{"headline":"Security mission in focus with Xi Jinping’s key Communist Party appointments","socialHeadline":"Key party appointments signal Xi Jinping’s mission to maintain security","entityId":"3197094","entityUuid":"34d6d5ce-e861-48be-9fbb-6fbc049e536d","urlAlias":"/news/china/politics/article/3197094/security-mission-focus-xi-jinpings-key-communist-party-appointments","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.moreOnThisArticles.1":
{"headline":"Politburo newcomer and Xi protégé confirmed as China’s new propaganda chief before presenting summary of party congress","socialHeadline":"Politburo newcomer and Xi protégé confirmed as China’s propaganda chief","entityId":"3197419","entityUuid":"d67eaa04-79ba-4792-97b1-d20e855cc49c","urlAlias":"/news/china/politics/article/3197419/politburo-newcomer-and-xi-protege-confirmed-chinas-new-propaganda-chief-presenting-summary-20th","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.moreOnThisArticles.2":
{"headline":"Cautious US, EU responses to China’s party congress signal widening gulf with West","socialHeadline":"US, EU responses to China’s party congress signal widening gulf","entityId":"3197347","entityUuid":"7202e8ba-08ff-452b-a1df-732a36c9c5d2","urlAlias":"/news/china/diplomacy/article/3197347/cautious-us-eu-responses-chinas-party-congress-signal-widening-gulf-west","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.moreOnThisArticles.3":
{"headline":"China’s Politburo wastes no time spreading Xi’s party congress message","socialHeadline":"China’s Politburo wastes no time spreading Xi’s party congress message","entityId":"3197304","entityUuid":"2f860022-0f83-4997-822d-df4ac76f811a","urlAlias":"/news/china/politics/article/3197304/chinas-politburo-wastes-no-time-spreading-xis-party-congress-message","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2.application":
{"entityId":"325477","__typename":"Application"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3":
{"__typename":"Article","entityId":"3197609","entityUuid":"90a8f8ff-0d63-4a91-af2f-deea30c058bd","headline":"Xi Jinping ally Shi Taifeng to head Chinese Communist Party’s influence machine","socialHeadline":"Xi ally Shi Taifeng to head Chinese Communist Party’s influence machine","hasVideoContent":true,"sponsorType":null,"topics":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.topics.0","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.topics.1","typename":"Topic"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.topics.2","typename":"Topic"}],"updatedDate":1666954088000,"urlAlias":"/news/china/politics/article/3197609/xi-jinping-ally-helm-communist-partys-influence-machine","flag":null,"types":[],"authors":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.0","typename":"Author"}],"images":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0","typename":"Image"}],"tmpLiveArticle":null,"moreOnThisArticles":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.moreOnThisArticles.0","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.moreOnThisArticles.1","typename":"Article"}],"subHeadline":
{"type":"json","json":[
{"type":"ul","children":[
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"Politburo newcomer Shi tapped to advance party agenda at home and abroad as head of the United Front Work Department"}]},
{"type":"text","data":"\n"},
{"type":"li","children":[
{"type":"text","data":"Shi tells staff that implementing ‘the spirit of the 20th party congress’ is now their main political task"}]},
{"type":"text","data":"\n"}]}]},"summary":
{"type":"json","json":[
{"type":"p","children":[
{"type":"text","data":"As head of the United Front Work Department, Politburo newcomer Shi’s main task is to advance the party’s agenda at home and abroad."}]}]},"application":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.application","typename":"Application"}},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.topics.0":
{"entityId":"512358","entityUuid":"f1b0ea39-ef03-4ec0-b2ef-09d06d71f4e5","name":"China’s 20th Party Congress","urlAlias":"/topics/chinas-20th-party-congress","types":
{"type":"json","json":["super"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.topics.1":
{"entityId":"322904","entityUuid":"36db4c8a-2780-4fb0-91ba-aeff7a07a97b","name":"China’s Communist Party","urlAlias":"/topics/chinas-communist-party","types":
{"type":"json","json":["general"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.topics.2":
{"entityId":"25794","entityUuid":"1c739c88-bfaa-4155-bcdf-f1b7f0d5dd52","name":"Xi Jinping","urlAlias":"/topics/xi-jinping","types":
{"type":"json","json":["person"]},"sponsor":null,"__typename":"Topic"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.0":
{"entityId":"513055","entityUuid":"023207ef-0037-424f-9f93-fd56d4c9286a","name":"Salina Li","types":
{"type":"json","json":[]},"urlAlias":"/author/salina-li","image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})","typename":"Image"},"image(
{\"filter\":
{\"type\":\"AUTHOR_LARGE\"}})":null,"__typename":"Author"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}})":
{"title":"","style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.authors.0.image(
{\"filter\":
{\"type\":\"AUTHOR_IMAGE\"}}).style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/author/pic/2022/07/08/salina card dp.JPG?itok=fmQnvZ2c&v=1657248220","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0":
{"title":"As head of the opaque United Front Work Department, Politburo newcomer Shi Taifeng’s main task is to advance the party’s agenda at home and abroad. Photo: Weibo","url":"https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/10/28/66c33635-0845-4aa7-b050-9d5e58cfd277_75b3bee6.jpg","indexSlideshow":false,"style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})","typename":"ImageStyle"},"style(
{\"filter\":
{\"style\":\"wide_landscape\"}})":
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"wide_landscape\"}})","typename":"ImageStyle"},"__typename":"Image"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"118x118\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/118x118/public/d8/images/canvas/2022/10/28/66c33635-0845-4aa7-b050-9d5e58cfd277_75b3bee6.jpg?itok=QPyZJxV5&v=1666947690","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"120x80\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/120x80/public/d8/images/canvas/2022/10/28/66c33635-0845-4aa7-b050-9d5e58cfd277_75b3bee6.jpg?itok=LGWApmAH&v=1666947690","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"540x360\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/540x360/public/d8/images/canvas/2022/10/28/66c33635-0845-4aa7-b050-9d5e58cfd277_75b3bee6.jpg?itok=5zZGY3AH&v=1666947690","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"1200x800\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/10/28/66c33635-0845-4aa7-b050-9d5e58cfd277_75b3bee6.jpg?itok=1ofNBGkm&v=1666947690","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.images.0.style(
{\"filter\":
{\"style\":\"wide_landscape\"}})":
{"url":"https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/d8/images/canvas/2022/10/28/66c33635-0845-4aa7-b050-9d5e58cfd277_75b3bee6.jpg?itok=g5xxJMsV&v=1666947690","__typename":"ImageStyle"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.moreOnThisArticles.0":
{"headline":"Beijing mayor Chen Jining in ‘surprise’ promotion to top job in Shanghai","socialHeadline":"Beijing mayor in ‘surprise’ promotion to top job in Shanghai","entityId":"3197505","entityUuid":"37d1cbeb-3253-4d36-bd15-9588086ee0bb","urlAlias":"/news/china/politics/article/3197505/beijing-mayor-chen-jining-tipped-surprise-promotion-top-job-shanghai","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.moreOnThisArticles.1":
{"headline":"China’s Premier Li Keqiang pledges faster growth after third-quarter expansion was ‘no easy feat’","socialHeadline":"‘No easy feat’ to lift China’s economy, but cabinet pledges faster growth","entityId":"3197565","entityUuid":"06ee6a78-b5fd-4e95-9436-02c2e450a363","urlAlias":"/economy/economic-indicators/article/3197565/chinas-premier-li-keqiang-pledges-faster-growth-after-third-quarter-expansion-was-no-easy-feat","__typename":"Article"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3.application":
{"entityId":"325477","__typename":"Application"},"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}})":
{"items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}})":[
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).0","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).1","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).2","typename":"Article"},
{"type":"id","generated":true,"id":"$ROOT_QUERY.queue(
{\"filter\":
{\"name\":\"editor_picks_513304\"}}).items(
{\"limit\":4,\"offset\":0,\"exclude\":
{}}).3","typename":"Article"}],"settings":null,"__typename":"Queue"}},"defaultClient":
{"$ROOT_QUERY.appSetting.viewport":
{"width":0,"height":0,"__typename":"viewport"},"$ROOT_QUERY.appSetting":
{"viewport":
{"type":"id","generated":true,"id":"$ROOT_QUERY.appSetting.viewport","typename":"viewport"},"edition":"int","breakpoint":null,"isUserIdle":false,"isWebCrawler":null,"youtubeAPIReady":false,"scrollPosition":0,"appClient":
{"type":"id","generated":true,"id":"$ROOT_QUERY.appSetting.appClient","typename":"appClient"},"requestInfo":
{"type":"id","generated":true,"id":"$ROOT_QUERY.appSetting.requestInfo","typename":"requestInfo"},"__typename":"appSetting","domainPath":"https://www.scmp.com"},"$ROOT_QUERY.appSetting.appClient":
{"cookieEnabled":true,"browserInfo":
{"type":"id","generated":true,"id":"$ROOT_QUERY.appSetting.appClient.browserInfo","typename":"browserInfo"},"operationSystemInfo":
{"type":"id","generated":true,"id":"$ROOT_QUERY.appSetting.appClient.operationSystemInfo","typename":"operationSystemInfo"},"__typename":"appClient"},"$ROOT_QUERY.appSetting.appClient.browserInfo":
{"name":null,"version":null,"__typename":"browserInfo"},"$ROOT_QUERY.appSetting.appClient.operationSystemInfo":
{"name":null,"__typename":"operationSystemInfo"},"$ROOT_QUERY.appSetting.requestInfo":
{"location":null,"ip":null,"__typename":"requestInfo"},"ROOT_QUERY":
{"appSetting":
{"type":"id","generated":true,"id":"$ROOT_QUERY.appSetting","typename":"appSetting"},"debug":
{"type":"id","generated":true,"id":"$ROOT_QUERY.debug","typename":"debug"},"headerSetting":
{"type":"id","generated":true,"id":"$ROOT_QUERY.headerSetting","typename":"headerSetting"},"homefrontState":
{"type":"id","generated":true,"id":"$ROOT_QUERY.homefrontState","typename":"homefrontState"},"topNews":
{"type":"id","generated":false,"id":"topnewsexpire:1","typename":"topnewsexpire"},"userInfo":
{"type":"id","generated":true,"id":"$ROOT_QUERY.userInfo","typename":"userInfo"},"userBookmarkList":
{"type":"id","generated":true,"id":"$ROOT_QUERY.userBookmarkList","typename":"userBookmarkList"},"userFollowList":
{"type":"id","generated":true,"id":"$ROOT_QUERY.userFollowList","typename":"userFollowList"},"articleState":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState","typename":"articleState"},"gtmData":
{"type":"id","generated":true,"id":"$ROOT_QUERY.gtmData","typename":"gtmData"},"series":
{"type":"id","generated":true,"id":"$ROOT_QUERY.series","typename":"series"},"shareCount":
{"type":"id","generated":true,"id":"$ROOT_QUERY.shareCount","typename":"shareCount"},"socialShare":
{"type":"id","generated":true,"id":"$ROOT_QUERY.socialShare","typename":"socialShare"},"stickTopicArticleRecommendation":
{"type":"id","generated":true,"id":"$ROOT_QUERY.stickTopicArticleRecommendation","typename":"stickTopicArticleRecommendation"},"covidTracker":
{"type":"id","generated":true,"id":"$ROOT_QUERY.covidTracker","typename":"covidTracker"},"articleYoutubeVideo":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleYoutubeVideo","typename":"articleYoutubeVideo"},"advert":
{"type":"id","generated":true,"id":"$ROOT_QUERY.advert","typename":"advert"},"myNews":
{"type":"id","generated":true,"id":"$ROOT_QUERY.myNews","typename":"myNews"},"newsletter":
{"type":"id","generated":true,"id":"$ROOT_QUERY.newsletter","typename":"newsletter"},"onboard":
{"type":"id","generated":true,"id":"$ROOT_QUERY.onboard","typename":"onboard"},"optimizeConfig":
{"type":"id","generated":true,"id":"$ROOT_QUERY.optimizeConfig","typename":"optimizeConfig"},"paywall":
{"type":"id","generated":true,"id":"$ROOT_QUERY.paywall","typename":"paywall"},"piano":
{"type":"id","generated":true,"id":"$ROOT_QUERY.piano","typename":"piano"},"ticker":
{"type":"id","generated":true,"id":"$ROOT_QUERY.ticker","typename":"ticker"},"snackBar":
{"type":"id","generated":true,"id":"$ROOT_QUERY.snackBar","typename":"snackBar"},"acknowledgementGate":
{"type":"id","generated":true,"id":"$ROOT_QUERY.acknowledgementGate","typename":"acknowledgementGate"},"snackbar":
{"type":"id","generated":true,"id":"$ROOT_QUERY.snackbar","typename":"snackbar"},"login":
{"type":"id","generated":true,"id":"$ROOT_QUERY.login","typename":"login"},"notificationWidget":
{"type":"id","generated":true,"id":"$ROOT_QUERY.notificationWidget","typename":"notificationWidget"},"GDPRStatus":
{"type":"id","generated":true,"id":"$ROOT_QUERY.GDPRStatus","typename":"GDPRStatus"},"articleCentralRecircWizard":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleCentralRecircWizard","typename":"articleCentralRecircWizard"},"subscriptionStatus":
{"type":"id","generated":true,"id":"$ROOT_QUERY.subscriptionStatus","typename":"subscriptionStatus"},"commentWidget":
{"type":"id","generated":true,"id":"$ROOT_QUERY.commentWidget","typename":"commentWidget"},"hongKong25FollowIndicator":
{"type":"id","generated":true,"id":"$ROOT_QUERY.hongKong25FollowIndicator","typename":"hongKong25FollowIndicator"}},"$ROOT_QUERY.debug":
{"eventTraces":
{"type":"json","json":[]},"__typename":"debug"},"$ROOT_QUERY.headerSetting":
{"onTop":true,"showPopMenu":false,"showMenu":true,"activeHeaderWhiteTheme":false,"activeHomePage":-1,"scrollingTarget":"","transferState":false,"homeScrollTop":0,"opinionScrollTop":0,"liveScrollTop":0,"headerHidden":false,"topAdsHidden":false,"__typename":"headerSetting"},"$ROOT_QUERY.homefrontState":
{"articleEntityUuids":
{"type":"json","json":[]},"__typename":"homefrontState"},"topnewsexpire:1":
{"id":1,"expire":"20221130194000","__typename":"topnewsexpire"},"$ROOT_QUERY.userInfo":
{"uid":null,"uuid":null,"mail":null,"firstname":null,"lastname":null,"esiname":null,"upic":null,"activateEmail":null,"country":null,"IP":null,"isCompanyInternalNetwork":false,"scmpSubscriber":null,"monthlySubscriber":null,"source":null,"created":null,"loginType":null,"level":null,"subscribedNewsletters":
{"type":"json","json":[]},"userRole":null,"__typename":"userInfo"},"$ROOT_QUERY.userBookmarkList":
{"entityId":
{"type":"json","json":[]},"isNew":false,"isRipple":false,"bookmarkMessageOn":false,"bookmarkMessage":"","__typename":"userBookmarkList"},"$ROOT_QUERY.userFollowList":
{"authors":null,"topics":null,"sections":null,"knowledges":null,"__typename":"userFollowList"},"$ROOT_QUERY.articleState":
{"behindWallArticleEntityUuIds":
{"type":"json","json":[]},"isHeadlineVisible":false,"isSocialSharingPopupVisible":false,"showComment":false,"deepLinkedCommentId":null,"popupCommentArticleId":null,"showOpinionLeftPopup":false,"showOpinionRightPopup":false,"showSubscribeNewsletterSuccessPopup":false,"acquisitionNewsletterPopup":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.acquisitionNewsletterPopup","typename":"acquisitionNewsletterPopup"},"showDebateBackdrop":false,"showModalBackdrop":false,"showCommentPopupBackdrop":false,"socialSharingUrl":null,"commentCount":null,"isFPTO":null,"currentArticle":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.currentArticle","typename":"currentArticle"},"articleSwiper":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper","typename":"articleSwiper"},"__typename":"articleState"},"$ROOT_QUERY.articleState.acquisitionNewsletterPopup":
{"messageShow":false,"themeType":null,"campaignName":null,"articleNewsletterWidget":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.acquisitionNewsletterPopup.articleNewsletterWidget","typename":"acquisitionArticleNewsletterWidget"},"__typename":"acquisitionNewsletterPopup"},"$ROOT_QUERY.articleState.acquisitionNewsletterPopup.articleNewsletterWidget":
{"entityId":null,"entitySummary":null,"entityLabel":null,"nidList":
{"type":"json","json":[]},"__typename":"acquisitionArticleNewsletterWidget"},"$ROOT_QUERY.articleState.currentArticle":
{"__typename":"currentArticle","articleTypes":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.currentArticle.articleTypes","typename":"currentArticleType"},"authorName":"","authors":
{"type":"json","json":[]},"authorTypes":
{"type":"json","json":[]},"commentCount":null,"contentLock":null,"contentType":"","copyrighted":null,"createdDate":null,"deDuplicationKey":"article_1_1","entityId":"","entityUuid":"","headline":"","identity":null,"mainSection":"","mainSectionUrlAlias":"","paywallTypes":
{"type":"json","json":[]},"primarySectionIds":
{"type":"json","json":[]},"printHeadline":"","publishedDate":null,"sectionIds":
{"type":"json","json":[]},"sections":
{"type":"json","json":[]},"sentiment":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.currentArticle.sentiment","typename":"currentArticleSentiment"},"socialHeadline":"","sponsor":"","sponsorType":null,"topicForFollow":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.currentArticle.topicForFollow","typename":"topicForFollow"},"topicIds":
{"type":"json","json":[]},"topics":
{"type":"json","json":[]},"types":"","updatedDate":null,"urlAlias":"","writer":null},"$ROOT_QUERY.articleState.currentArticle.articleTypes":
{"__typename":"currentArticleType","entityIds":
{"type":"json","json":[]},"entityUuids":
{"type":"json","json":[]},"names":
{"type":"json","json":[]}},"$ROOT_QUERY.articleState.currentArticle.sentiment":
{"__typename":"currentArticleSentiment","readability_school_level":
{"type":"json","json":[]},"sentiment_category":""},"$ROOT_QUERY.articleState.currentArticle.topicForFollow":
{"__typename":"topicForFollow","disableFollow":false,"entityId":"","name":"","urlAlias":""},"$ROOT_QUERY.articleState.articleSwiper":
{"allowTouchMove":false,"allowChangeSlide":false,"containerIndex":1,"container":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.container","typename":"articleSwiperContainers"},"headArticle":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.headArticle","typename":"articleSwiperHeadArticles"},"currentIndex":0,"__typename":"articleSwiper"},"$ROOT_QUERY.articleState.articleSwiper.container.container0":
{"containerIndex":0,"reset":true,"scrollTop":0,"hardReset":false,"isHeadlineVisible":false,"__typename":"articleSwiperContainer0"},"$ROOT_QUERY.articleState.articleSwiper.container":
{"container0":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.container.container0","typename":"articleSwiperContainer0"},"container1":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.container.container1","typename":"articleSwiperContainer1"},"container2":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.container.container2","typename":"articleSwiperContainer2"},"__typename":"articleSwiperContainers"},"$ROOT_QUERY.articleState.articleSwiper.container.container1":
{"containerIndex":1,"reset":false,"scrollTop":0,"hardReset":false,"isHeadlineVisible":false,"__typename":"articleSwiperContainer1"},"$ROOT_QUERY.articleState.articleSwiper.container.container2":
{"containerIndex":2,"reset":false,"scrollTop":0,"hardReset":false,"isHeadlineVisible":false,"__typename":"articleSwiperContainer2"},"$ROOT_QUERY.articleState.articleSwiper.headArticle.currentHeadArticle":
{"entityId":"","headline":"","urlAlias":"","topics":
{"type":"json","json":[]},"mainSection":"","mainSectionUrlAlias":"","__typename":"currentHeadArticle"},"$ROOT_QUERY.articleState.articleSwiper.headArticle":
{"currentHeadArticle":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.headArticle.currentHeadArticle","typename":"currentHeadArticle"},"nextHeadArticle":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.headArticle.nextHeadArticle","typename":"nextHeadArticle"},"prevHeadArticle":
{"type":"id","generated":true,"id":"$ROOT_QUERY.articleState.articleSwiper.headArticle.prevHeadArticle","typename":"prevHeadArticle"},"__typename":"articleSwiperHeadArticles"},"$ROOT_QUERY.articleState.articleSwiper.headArticle.nextHeadArticle":
{"entityId":"","headline":"","urlAlias":"","topics":
{"type":"json","json":[]},"mainSection":"","mainSectionUrlAlias":"","__typename":"nextHeadArticle"},"$ROOT_QUERY.articleState.articleSwiper.headArticle.prevHeadArticle":
{"entityId":"","headline":"","urlAlias":"","topics":
{"type":"json","json":[]},"mainSection":"","mainSectionUrlAlias":"","__typename":"prevHeadArticle"},"$ROOT_QUERY.gtmData":
{"__typename":"gtmData","adBlocker":"no","articleID":null,"articleIdentity":null,"articleType":null,"authorName":null,"authors":null,"authorType":null,"canonicalURL":null,"contentType":null,"edition":null,"entityId":null,"entityUuid":null,"name":null,"page":null,"pageTitle":null,"path":null,"primarySection":null,"printHeadline":null,"publishedDate":null,"scmpCopyright":null,"scmpWriter":null,"searchKeyword":null,"sections":null,"slideIndex":null,"socialHeadline":null,"sponsor":null,"swipeFrom":null,"topicID":null,"topics":null,"webHeadline":null},"$ROOT_QUERY.series":
{"currentAnchor":1,"__typename":"series"},"$ROOT_QUERY.shareCount":
{"shareCountList":"","__typename":"shareCount"},"$ROOT_QUERY.socialShare":
{"onScreen":false,"__typename":"socialShare"},"$ROOT_QUERY.stickTopicArticleRecommendation":
{"isVisible":false,"forceClosed":false,"__typename":"stickTopicArticleRecommendation"},"$ROOT_QUERY.covidTracker":
{"upperIntersected":false,"upperIntersecting":false,"lowerIntersected":false,"lowerIntersecting":false,"__typename":"covidTracker"},"$ROOT_QUERY.articleYoutubeVideo":
{"youtubeID":"","isRunning":false,"hasPlayerPlaying":false,"lastArticleEntityIdPlayingAt":"","__typename":"articleYoutubeVideo"},"$ROOT_QUERY.advert":
{"takeover":false,"directCampaignLineItemIds":
{"type":"json","json":[]},"disableAutoRefreshCountries":
{"type":"json","json":[]},"adslots":
{"type":"json","json":[]},"__typename":"advert"},"$ROOT_QUERY.myNews":
{"isShowInitPageSetup":true,"isShowTopicPopup":false,"isShowLandingPopup":false,"isShownLandingPopup":false,"isShowRedeemPopup":false,"isShownRedeemPopup":false,"isShowIndicatorCard":false,"isJustRedeemedPromotion":false,"isOnboardingNextSession":true,"isItemsUpdate":false,"isJustTriggeredFollow":false,"isAutoFollowForAnonymous":false,"removeTopicIds":
{"type":"json","json":[]},"removeAuthorIds":
{"type":"json","json":[]},"removeSectionIds":
{"type":"json","json":[]},"removeKnowledgeIds":
{"type":"json","json":[]},"myDailyFiveArticleIds":
{"type":"json","json":[]},"myNewsSelectorView":"","__typename":"myNews"},"$ROOT_QUERY.newsletter":
{"doneSubscription":false,"__typename":"newsletter"},"$ROOT_QUERY.onboard":
{"popupActive":false,"__typename":"onboard"},"$ROOT_QUERY.optimizeConfig":
{"data":"","__typename":"optimizeConfig"},"$ROOT_QUERY.paywall":
{"isActive":false,"displayMode":"","views":0,"viewsLeft":5,"customEvent":"","archiveWallArticleList":
{"type":"json","json":[]},"articleWallTypes":
{"type":"json","json":[]},"__typename":"paywall"},"$ROOT_QUERY.piano":
{"ready":false,"engineReady":false,"isExecuted":false,"isIPAccessUser":false,"isShowRosetta":true,"isShowVelocityWall":true,"appSettings":
{"type":"id","generated":true,"id":"$ROOT_QUERY.piano.appSettings","typename":"appSettings"},"clientName":"","__typename":"piano"},"$ROOT_QUERY.piano.appSettings":
{"oldArticleTimeframe":15,"mixpanelStorage":"","isShowPremiumPromo":false,"paywallCampaign":"","__typename":"appSettings"},"$ROOT_QUERY.ticker":
{"name":"","queueName":"","isOthersOn":true,"isBreakingOn":true,"isBreakingDoneTransition":true,"articleCurrentNid":"","sector":"","__typename":"ticker"},"$ROOT_QUERY.snackBar":
{"isShowBreakingTicker":false,"isShowOtherTicker":false,"isShowEdition":false,"isShowActivation":false,"__typename":"snackBar"},"$ROOT_QUERY.acknowledgementGate":
{"entityId":"","isShow":false,"__typename":"acknowledgementGate"},"$ROOT_QUERY.snackbar":
{"snackbarMessage":"","show":false,"__typename":"snackbar"},"$ROOT_QUERY.login":
{"isShowPopup":false,"title":"","description":"","destination":"","isPasswordless":false,"isRegiWall":false,"wallType":"","registrationTerm":"","isLoginReminderPopup":false,"sendWelcomeEmail":true,"trigger_point":"","paywall_type":"","campaign_name":"","newsletter_name":"","follow_type":"","follow_name":"","__typename":"login"},"$ROOT_QUERY.notificationWidget":
{"isNewReadingHistory":false,"isDeleteReadingHistory":false,"isShowPopup":false,"isShowHints":true,"__typename":"notificationWidget"},"$ROOT_QUERY.GDPRStatus":
{"isAccepted":false,"isAcceptedGDPRDelayed":false,"isAcceptedGDPRNextSession":false,"__typename":"GDPRStatus"},"$ROOT_QUERY.articleCentralRecircWizard":
{"isEnabled":false,"isActivated":false,"isInitialised":false,"isPerpetualScroll":true,"isShowRHSContent":true,"isShowLHSContent":true,"__typename":"articleCentralRecircWizard"},"$ROOT_QUERY.subscriptionStatus":
{"clientName":null,"isOverallChurned":null,"isCorpSubscriber":null,"isInternalStaff":null,"isSCMPChurned":null,"isSCMPSubscriber":null,"isSiteLicenseSubscriber":null,"isVipExclusive":null,"isYPChurned":null,"isYPSubscriber":null,"scmpWinbackPeriod":null,"subscriptionProducts":
{"type":"json","json":[]},"isUpgradeable":null,"isFreeSubscriber":null,"isAutoRenew":null,"isAutoRenewable":null,"tier":null,"expiryReminder":
{"type":"id","generated":true,"id":"$ROOT_QUERY.subscriptionStatus.expiryReminder","typename":"expiryReminder"},"gracePeriod":
{"type":"id","generated":true,"id":"$ROOT_QUERY.subscriptionStatus.gracePeriod","typename":"gracePeriod"},"v6Retain":
{"type":"id","generated":true,"id":"$ROOT_QUERY.subscriptionStatus.v6Retain","typename":"v6Retain"},"__typename":"subscriptionStatus"},"$ROOT_QUERY.subscriptionStatus.expiryReminder":
{"expireDate":0,"dayLeft":0,"isAutoRenewReminder":false,"isRenewNowReminder":false,"isPromoBeingUsed":false,"termPeriod":"","currency":"","price":0,"renewNowPromoCode":"","termId":"","isFirstChurning":false,"isSecondChurning":false,"promoCode":"","__typename":"expiryReminder"},"$ROOT_QUERY.subscriptionStatus.gracePeriod":
{"isActive":false,"daysLeft":0,"isWithinHalf":false,"expiryDate":0,"halfExpiryDate":0,"startDate":0,"gracePeriodLength":0,"__typename":"gracePeriod"},"$ROOT_QUERY.subscriptionStatus.v6Retain":
{"isActive":false,"expireDate":0,"dayLeft":0,"__typename":"v6Retain"},"$ROOT_QUERY.commentWidget":
{"watchedList":
{"type":"json","json":[]},"__typename":"commentWidget"},"$ROOT_QUERY.hongKong25FollowIndicator":
{"isIndicatorShow":false,"__typename":"hongKong25FollowIndicator"}}}


*/
