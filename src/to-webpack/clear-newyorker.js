import * as helpers from '../common/helpers.js';

// console.log("in clear-newyorker.js");

// remove element class=journey-unit
helpers.removeFirstElementByClassName("journey-unit");

// remove class paywall from div (2x)
helpers.removeClassNameFromFirstElement("paywall","DIV");
helpers.removeClassNameFromFirstElement("paywall","DIV");

// append text to div with class = body__inner-container

var adds;
var t;
var i;

// adds =

t = document.getElementsByClassName("body__inner=container")[0].children[0];



/*

test - https://www.newyorker.com/news/letter-from-bidens-washington/in-washington-a-ukraine-tragedy-foretold

https://stackoverflow.com/questions/38670851/whats-a-script-type-application-ldjsonjsonobj-script-in-a-head-sec


<script type="application/ld+json">

{
  "publisher": {
    "url": "https://www.newyorker.com", 
    "logo": {
      "height": "117px", 
      "width": "500px", 
      "url": "https://www.newyorker.com/verso/static/the-new-yorker/assets/logo-seo.38af6104b89a736857892504d04dbb9a3a56e570.png", 
      "@type": "ImageObject"
    }, 
    "name": "The New Yorker", 
    "@type": "Organization", 
    "@context": "https://schema.org"
  }, 
  "mainEntityOfPage": {
    "@id": "https://www.newyorker.com/news/letter-from-bidens-washington/in-washington-a-ukraine-tragedy-foretold", 
    "@type": "WebPage"
  }, 
  "description": "Susan B. Glasser writes about the Russian invasion of Ukraine, the response of Joe Biden and his Administration, and the American foreign policy that helped allow Vladimir Putin\u2019s aggression.", 
  "alternativeHeadline": "Susan B. Glasser writes about the Russian invasion of Ukraine, the response of Joe Biden and his Administration, and the American foreign policy that helped allow Vladimir Putin\u2019s aggression.", 
  "hasPart": [
    {
      "cssSelector": ".paywall", 
      "isAccessibleForFree": "False", 
      "@type": "WebPageElement"
    }
  ], 
  "isAccessibleForFree": false, 
  "isPartOf": {
    "name": "The New Yorker", 
    "@type": "CreativeWork"
  }, 
  "url": "https://www.newyorker.com/news/letter-from-bidens-washington/in-washington-a-ukraine-tragedy-foretold", 
  "thumbnailUrl": "https://media.newyorker.com/photos/62181074e689b1978b3069bc/3:2/w_2400,h_1600,c_limit/glasser_ukraine.jpg", 
  "keywords": [
    "letter from biden\u2019s washington", 
    "more on ukraine", 
    "ukraine", 
    "russia", 
    "joe biden", 
    "vladimir putin", 
    "donald trump", 
    "foreign policy", 
    "splitscreenimageleftfullbleed", 
    "web"
  ], 
  "image": [
    "https://media.newyorker.com/photos/62181074e689b1978b3069bc/2:1/w_2400,h_1200,c_limit/glasser_ukraine.jpg", 
    "https://media.newyorker.com/photos/62181074e689b1978b3069bc/2:2/w_2400,h_2400,c_limit/glasser_ukraine.jpg", 
    "https://media.newyorker.com/photos/62181074e689b1978b3069bc/16:9/w_2400,h_1350,c_limit/glasser_ukraine.jpg", 
    "https://media.newyorker.com/photos/62181074e689b1978b3069bc/4:3/w_2400,h_1800,c_limit/glasser_ukraine.jpg", 
    "https://media.newyorker.com/photos/62181074e689b1978b3069bc/1:1/w_2400,h_2400,c_limit/glasser_ukraine.jpg", 
    "https://media.newyorker.com/photos/62181074e689b1978b3069bc/3:4/w_1800,h_2400,c_limit/glasser_ukraine.jpg", 
    "https://media.newyorker.com/photos/62181074e689b1978b3069bc/2:3/w_1600,h_2400,c_limit/glasser_ukraine.jpg", 
    "https://media.newyorker.com/photos/62181074e689b1978b3069bc/3:2/w_2400,h_1600,c_limit/glasser_ukraine.jpg"
  ], 
  "headline": "In Washington, a Ukraine Tragedy Foretold", 
  "datePublished": "2022-02-24T19:35:48.247-05:00", 
  "dateModified": "2022-02-24T19:35:48.247-05:00", 
  "author": [
    {
      "sameAs": "https://www.newyorker.com/contributors/susan-b-glasser", 
      "name": "Susan B. Glasser", 
      "@type": "Person"
    }
  ], 
  "articleSection": "letter from biden\u2019s washington", 

    "articleBody": 

"\n\n[#iframe: http://audm.herokuapp.com/player-embed?pub=newyorker&articleID=6217f35819b986c0160eb50b](100%x90)\n\n+++dropcap\n\n

President Biden said the right things. The expected things. His words were blunt and unequivocal. On Thursday, hours after Vladimir Putin\u2019s [horrific invasion of Ukraine](https://www.newyorker.com/news/dispatch/a-sleepless-night-of-russian-air-strikes-in-ukraine) had begun, the American President stepped into the East Room of the White House and condemned Putin for his \u201csinister vision,\u201d his \u201cnaked aggression,\u201d and his evil, unprovoked war of choice. He called him a bully and a liar and a tyrant. He vowed to make Putin and his outlaw Russian regime a \u201cpariah on the international stage.\u201d He announced sanctions that he claimed \u201cexceed anything that\u2019s ever been done.\u201d But what words, really, could be equal to this moment, to this day when Europe faces what may be the most dangerous and consequential war on the continent since the Second World War?
\n\n
+++
\n\n
As [Biden](https://www.newyorker.com/tag/joe-biden) spoke, Ukraine was fighting\u2014alone\u2014against overwhelming military odds. There was a pitched battle in the nuclear hellscape that the Soviet Union left behind in Chernobyl. In Kyiv, air-raid sirens sounded for what must have been the first time since the Second World War, and a military official warned that the Russians\u2019 goal was to quickly encircle the capital and decapitate the government of President [Volodymyr Zelensky](https://www.newyorker.com/magazine/2019/11/04/how-trumps-emissaries-put-pressure-on-ukraines-new-president). Across the country, there were thousands of men, women, and children cowering in subway stations and makeshift shelters, clutching their iPhones and wondering how their twenty-first-century lives had turned overnight into a replay of twentieth-century horrors.
\n\n\\
[*Get the in-depth analysis and on-the-ground reporting you need to understand the war in Ukraine. [Subscribe today \u00bb](https://subscribe.newyorker.com/subscribe/splits/newyorker/NYR_Generic?source=HCL_NYR_IN_CONTENT_SUBSCRIBE_0_Ukraine_Commentary_ZZ)*\\]
\n\n
The war, not yet a day old, seems sure to transform Biden\u2019s Presidency. In many ways, it already has. It presents a generational challenge to the United States at a time when this superpower has become weary and increasingly unable and unwilling to bear the burden of global leadership. In an angry, divided capital that is struggling to preserve its own democracy, the President is now being called upon to rally not only the American people but the world against Putin\u2019s aggression. \u201cMake no mistake,\u201d Biden said, \u201cfreedom will prevail.\u201d
\n\n
But will it? Our inability to answer the question with an unambiguous \u201cyes\u201d is one measure of the calamity that has already occurred.\n\nAt the least, the start of the war quickly clarified previously murky aspects of the situation: the two decades of failure by Washington to understand Putin, or to counter his revanchist designs; the bizarre transformation of large swaths of the Republican Party into the party of Putin apologists; the smug back-patting of diplomats and politicians who congratulated themselves on maintaining allied \u201cunity\u201d while delivering little but reassuring words and several hundred million dollars\u2019 worth of antitank missiles and other \u201cdefensive arms\u201d to the Ukrainians, whose cause they have claimed to support.\n\nPresident Barack Obama used to chide his staff for admiring a problem rather than doing something about it. But, for more than twenty years, successive Administrations in Washington\u2014George&nbsp;W. Bush\u2019s, Obama\u2019s, Donald Trump\u2019s, and now Biden\u2019s\u2014have largely done not much more than that when it came to Vladimir Putin. The result is that now, when the crisis Putin has been building toward for years has finally hit, there are limited tools with which to respond\u2014and little hope of shaping a better outcome than the violent dismantlement that Ukraine now seems doomed to face.\n\nOn Wednesday, hours before the invasion began, House Speaker Nancy Pelosi called out Putin\u2019s \u201cvery evil\u201d aggression toward Ukraine and compared it to Hitler\u2019s swallowing of the Sudetenland, in 1938\u2014a tragic precursor, unanswered by European powers, that presaged the broader world war. \u201cYou cannot ignore what Putin is doing,\u201d she said, as close to an inarguable truth as Congress gets these days.\n\nBut the stirring rhetoric and chilling historical parallels abounding in Washington seemed such a mismatch for what Biden and his fellow world leaders now propose to do about it. Sanctions, of course, will not deter an invasion that has already occurred. Despite pleas from Zelensky and demands from some Republicans on Capitol Hill, Biden refused to impose them before Putin took the step of recognizing the breakaway regions of Donetsk and Luhansk, which served as his prelude for the full attack. They were to be \u201cleverage,\u201d his aides suggested. But, on Thursday, Biden claimed that \u201cno one expected the sanctions to prevent anything from happening.\u201d So what is their purpose now? Simply punishment after the threat of them failed to stop the war, or perhaps deterrence from some future, unspecified bad act? It is not really clear. However, John Smith, the former director of the Treasury Department\u2019s Office of Foreign Assets Control, said, \u201cThese are the most powerful sanctions we have seen in this modern era, given the size of Russia\u2019s economy. And there\u2019s still more to come.\u201d\n\nAs for other punishments that await Russia\u2014whether they be global condemnation or Putin\u2019s inner circle of oligarchs being forced to give up their London apartments and super-yachts\u2014Putin expected all of them, and he proceeded anyway. Biden ruled out American military intervention in Ukraine from the start, and, in any event, Putin very explicitly threatened extreme\u2014potentially nuclear\u2014retaliation should the U.S. change course.\n\nIn his appearance Thursday afternoon, Biden said he believed that Putin would \u201ctest the resolve of the West to see if we stay together,\u201d and vowed, \u201cwe will.\u201d But the fissures, in fact, were there to see in the measures he proposed\u2014and those he did not. In the weeks leading up to the invasion, officials had pledged retaliatory measures, including possibly cutting Russia off from the *SWIFT*{: .small} international banking system, but Reuters reported that Europeans were still refusing to take this step, even with Kyiv now under attack. When he appeared to announce sanctions, Biden confirmed that the Europeans had in fact balked. \u201cThat\u2019s not the position that the rest of Europe wishes to take,\u201d he said. Plenty of other measures have been left untaken, as well, including sanctioning Putin himself, which Biden said he was considering. What, exactly, is the President waiting for? He did not say.\n\n+++dropcap\n\nThe historical record will show that Biden had strong words after the invasion, and also that this confrontation with Russia was the last thing he wanted his Presidency to be about. When Biden came into office, he and his team warned of a dangerous new era of competition between democracies and autocracies, but the autocracy they planned to focus on was China. With Russia, Biden aspired to no more than a \u201cstable and predictable\u201d relationship, as he put it after his early summit meeting with Putin, in Geneva last May. He and his Administration hoped to put Russia in a box, knowing that the standoff over Ukraine, which had persisted since Putin\u2019s initial invasion, in 2014, would continue. But they lacked the political, diplomatic, or military will to try to resolve it.\n\n+++\n\nVirtually all Presidents face that moment of truth when their agenda, their long list of campaign promises, falls victim to the vicissitudes of fate and the news cycle. George&nbsp;W. Bush had 9/11, and it transformed his priorities and his Presidency. [Donald Trump](https://www.newyorker.com/tag/donald-trump) had [the *COVID*{: .small} pandemic](https://newyorker.com/tag/coronavirus), and no amount of whining and lamenting his bad luck could stop the virus from overtaking what remained of his tenure.\n\nHere, Biden\u2019s record is stronger. He did not deny the Russian buildup or pretend it wasn\u2019t happening. He did not seek to accommodate Putin. He pivoted. For the past few months, in fact, Biden and his Administration warned of the exact tragedy unfolding now, despite pushback from many European allies, from Zelensky himself, and from skeptics on both the American right and left.\n\nThe gaslighting by Republicans was particularly egregious, considering that even after the cruise missiles started flying their leader Trump was on Fox News, praising Putin and the hell he had unleashed. Trump in recent days has hailed the Russian President, who intervened in the 2016 U.S. election on Trump\u2019s behalf, for his \u201cgenius,\u201d and called him a shrewd, smart, savvy warrior who would get Ukraine for the price of \u201ctwo dollars worth of sanctions.\u201d \u201cAnd it all happened because of a rigged election,\u201d Trump told Fox\u2019s Laura Ingraham, his apparent point being that his good friend Putin never would have done such a thing had he, Trump, remained in office.\n\nTrump continues to define brazenness in a world full of hypocritical politicians. But it was hard, on this invasion day, to take seriously the demands for even tougher action against Putin from Republicans who refused to draw the line with Trump even when he blackmailed Zelensky with the very military aid that Congress had approved to fight the Russians.\n\nFrom the left, meanwhile, many questioned the Biden Administration\u2019s intelligence about the impending war\u2014analogizing it to the pre-Iraq War misuse of intelligence by the Bush Administration\u2014while doubting whether Putin was really the threat the government said he was. \u201cIf I had a dollar for every inane comment I heard regarding failed intelligence in Iraq, as though mistakes meant that our intel and analytical community doesn\u2019t get things right,\u201d Michael Kofman, an expert on the Russian military who has been an invaluable source of accurate open-source intelligence, wrote on Twitter. \u201cIt got this one, 100%.\u201d\n\nThe fact that the stark warnings from the Biden Administration were right, after all, has lent this tragic week the feeling of a long slow-motion car crash, perfectly visible and nonetheless horrible.\n\nOn Tuesday, Secretary of State Antony Blinken, appearing alongside Ukraine\u2019s foreign minister, Dmytro Kuleba, announced that diplomacy with Russia had not only failed but in fact never had a chance. Putin\u2019s \u201cplan all along has been to invade Ukraine; to control Ukraine and its people; to destroy Ukraine\u2019s democracy, which offers a stark contrast to the autocracy he leads; to reclaim Ukraine as a part of Russia,\u201d Blinken said. A little more than twenty-four hours later, just before 10 *p*{: .small}.*m*{: .small}. Washington time, the attack had begun\u2014a tragedy foretold and no less tragic for unfolding as expected.\n\n", 

    "@type": "NewsArticle", 
  "@context": "http://schema.org"
}
 

window.__PRELOADED_STATE__ = 

{"componentConfig":{"AccountLinks":{"settings":{"hasSignOutSeparator":false,"signOutButtonLabel":"Sign out"}},"AccountProfilePage":{"settings":{"signOutButtonLabel":"Not you?"}},"ArticlePage":{"settings":{"hasLightbox":true,"hasSlideShow":false,"hideRecircMostPopular":true,"hasDynamicNewsletterSignup":true}},"BasePage":{"settings":{"showContentFooterWithHeaderOverride":true,"showNavWithHeaderOverride":false}},"BlockquoteEmbed":{"settings":{"hasParagraphMargin":true,"hasSmallMargins":true,"hasTopBorder":false}},"Caption":{"settings":{"shade":"light"}},"CartoonPage":{"settings":{"cartoon":{"tagCloud":{"sectionHeader":"Keywords"}}}},"ChunkedArticleContent":{"variation":"WithAdRail","settings":{"horizontalRuleStyle":"thin","multiChunkRailStrategy":"alternate","singleChunkRailStrategy":"split-in-three"}},"ConnectedNavigation":{"settings":{"navPattern":"StackedNavigation"}},"ContributorBio":{"settings":{"avatarImageShape":"round","shouldHideSocialIcons":true,"shouldHideTitle":true,"shouldUseTitleForContributorBio":true}},"Contributors":{"settings":{"maxContributors":100}},"ContentHeader":{"variation":"SplitScreenImageLeftFullBleed","settings":{"dividerType":"bottom","rubricVariation":"Item","hasContributorImageBackground":true,"hasDesktopTitleBlockDivider":true,"hideIssueDate":false,"hideIssueDatePipeSeparator":true,"persistentAsideAlign":"left-lead-asset"}},"GallerySlide":{"variation":"ItemLeft"},"Drawer":{"variation":"Left","settings":{"overlayColor":"white"}},"ProductEmbed":{"variation":"ImageLeft","settings":{"ctaText":"Shop Now"}},"ReviewPage":{"settings":{"ctaText":"Shop Now"}},"SecondaryMenu":{"settings":{"hideSocialIcons":true,"showSearch":true}},"ExternalLinkEmbed":{"settings":{"hasArrowIcon":false,"textColumnSize":"large"}},"GalleryEmbed":{"settings":{"shouldCycleSlides":true,"showAds":false,"midGalleryAdCadence":6,"midGalleryAdsLimit":1}},"IframeEmbed":{"variation":"WithAudioTag","settings":{"audioTagIconTitle":"Audio available","shouldAllowFullScreen":true}},"NewsletterSubscribeContent":{"variation":"FullViewPort","settings":{"shouldHaveExtraPadding":true}},"RecircList":{"variation":"FourUp","settings":{"applicationID":"the-new-yorker-bottom-recirc","contentTypes":"article","excludeCategories":["functional-tags\u002Fnoriver","\u002Fchannels\u002Fhumor\u002Fborowitz-report"],"numberOfDays":-30,"pageSize":4,"shouldHideRubric":false,"strategy":"similar"}},"SignInModal":{"settings":{"hasBlueGoogleSignInButton":true,"hasRoundedCornersButtons":true}},"SiteFooter":{"variation":"LinkDense","settings":{"hideTagline":true,"showOneTrustButton":true}},"SocialIcons":{"variation":"Circular","settings":{"icons":"thinner"}},"StackedNavigation":{"variation":"FixedHeaderWithLinkBanner","settings":{"navigationHideStrategy":"delta","primaryNavigationSize":"large","profileLinkLabel":"My Profile"}},"SummaryItem":{"settings":{"hasRule":false,"maxHedLines":null,"shouldHideDangerousDek":false,"shouldHideIcon":true,"showCommaAsideContributorName":true}},"tempHomepageRelated":{"settings":{"applicationID":"the-new-yorker-verso-hp-trending","contentTypes":"article","pageSize":10,"numberOfDays":-30,"strategy":"popular"}},"Toggle":{"variation":"Triangle"},"GroupCallout":{"settings":{"heading":{"article":"Related Stories"}}},"GenericCallout":{"settings":{"smallWidth":"wide","mediumWidth":"narrow"}},"ContributorHeader":{"settings":{"avatarImageShape":"round"}},"SummaryCollageFive":{"settings":{"summaryItemRubricVariation":"DiscoveryCard"}},"SummaryCollageOne":{"settings":{"summaryItemRubricVariation":"DiscoveryCard"}},"SummaryCollageThree":{"settings":{"summaryItemRubricVariation":"DiscoveryCard","desktopFeatureColSpan":"use9","desktopFeatureColSpanForVideo":"use9"}},"SummaryCollectionGrid":{"settings":{"summaryItemRubricVariation":"DiscoveryItem"}},"SummaryRiver":{"settings":{"summaryItemRubricVariation":"DiscoveryItem"}},"SummaryCollectionRow":{"settings":{"summaryItemRubricVariation":"DiscoveryItem"}},"SummarySpotlight":{"settings":{"summaryItemVariation":"SideBySideDense","shouldUseMainContentDropCap":true}},"TagCloud":{"settings":{"sectionHeader":"More:"}},"Ticker":{"settings":{"isLink":true}},"LinkBanner":{"settings":{"hideHed":false,"hideMobileMarqueeImage":true,"type":"link-list"}},"SlimNewsletterWrapper":{"settings":{"isNewsletterSlim":false,"nodeForNewsletterPosition":"top","patternType":"utility","shouldFooterBehaveLikeInlineNewsletter":false,"shouldShowFooterNewsletter":false,"shouldShowSlimNewsletter":false,"shouldUseInlineNewsletterModules":false,"showToggleForLoggedInUser":false}}},"featureFlags":{"enableAccounts":true,"enableSlimNewsletter":false,"enableAllContributorsOnBundles":true,"enableAnalytics":true,"enableConsent":true,"enableDropcap":true,"enableEntitlementProxy":true,"enableEntitlementValidation":true,"enableEntitlementGrantLogic":false,"enableGoogleAmp":true,"enableLinkStack":true,"enablePayment":true,"enableRecipeRatings":false,"enableSignaling":false,"enableVideoHomePage":false,"hideRelatedOnBundles":true,"shouldExtractRecircRubricFromCategories":true,"recentWorkTeaser":"rubric-or-channel","bundleTeaser":"rubric-or-channel-or-section","contentTeaser":"rubric-or-channel-or-section","tagTeaser":"rubric-or-channel","preferCollectionGrid":true,"overrideBodyContentHeadings":true,"enableSponsoredContentInRelated":false,"enableBookmarking":true,"personalizeRecircList":true,"personalizeRecircMostPopular":true,"videoPersistable":false,"google":{"swgEnabled":false,"signInEnabled":true},"featureOnboarding":{"bookmarks":true},"embeddedLedeCategoriesPath":"formatting\u002Flede-image-layout\u002Flede-image--right-aligned","embeddedLedeDisabledPaths":["formatting\u002Fhero-layouts\u002Flayout--image-left","formatting\u002Fhero-layouts\u002Flayout--image-right"],"jsonld":{"useSubChannelAsSection":true},"hasHeaderIssueDateLink":true,"hasLeadStandardHeading":true,"hasMagazineHeaderPromoCopy":true,"hasMagazineDisclaimer":true,"hideHeroAdContentHeaders":["TextBelowCenterFullBleedNoContributor","SplitScreenImageLeftFullBleed","SplitScreenImageRightFullBleed","SplitScreenImageRightInset","SplitScreenImageLeftInset"],"hideLedeImageCaption":false,"hideBylineContributorImage":false,"hideContributorBio":false,"hideOutbrain":true,"hideTagCloud":false,"issueLinkPrefix":"\u002Fmagazine","mediaSocialShares":[],"paddingTop":"large","socialShares":["facebook","twitter","email","print","bookmark"],"shouldUsePersistentAd":true,"showFirstRailRecirc":true,"newsletterModules":[{"newsletterId":217,"priority":1,"dangerousHed":"The Daily","dangerousDek":"The best of \u003Ci\u003EThe New Yorker\u003C\u002Fi\u003E, every day, in your in-box, plus occasional alerts when we publish major stories."},{"newsletterId":248840,"priority":2,"dangerousHed":"This Week’s Issue","dangerousDek":"Never miss a big \u003Ci\u003ENew Yorker\u003C\u002Fi\u003E story again. Sign up for This Week’s Issue and get an e-mail every week with the stories you have to read."},{"newsletterId":248782,"priority":3,"dangerousHed":"The New Yorker Classics","dangerousDek":"Classic pieces and hidden gems curated by our archive editor, Erin Overbey, and delivered twice weekly."},{"newsletterId":248896,"priority":4,"dangerousHed":"Crossword Puzzles","dangerousDek":"Never miss a crossword. Sign up to be notified via e-mail when a new puzzle is published."},{"newsletterId":248805,"priority":5,"dangerousHed":"The New Yorker Recommends","dangerousDek":"What our staff is reading, watching, and listening to each week."},{"newsletterId":248895,"priority":6,"dangerousHed":"The New Yorker Movie Club","dangerousDek":"Sign up for \u003Ci\u003EThe New Yorker’s\u003C\u002Fi\u003E Movie Club Newsletter to get reviews of the current cinema, movie listings for the weekend ahead, and more."},{"newsletterId":248770,"priority":7,"dangerousHed":"Books &amp; Fiction","dangerousDek":"Get book recommendations, fiction, poetry, and dispatches from the world of literature in your in-box. Sign up for the Books &amp; Fiction newsletter."},{"newsletterId":248962,"priority":8,"dangerousHed":"Susan B. Glasser","dangerousDek":"Sign up for reporting and commentary on news and politics in Washington, delivered to your in-box."},{"newsletterId":248934,"priority":9,"dangerousHed":"The Climate Crisis","dangerousDek":"Coverage of environmental news and the climate crisis from a leading voice in the movement."},{"newsletterId":248868,"priority":10,"dangerousHed":"Food","dangerousDek":"Sign up for \u003Ci\u003EThe New Yorker’s\u003C\u002Fi\u003E Food newsletter and get recommendations, reviews, and more, twice a month."},{"newsletterId":248755,"priority":11,"dangerousHed":"Podcasts","dangerousDek":"Never miss a podcast episode again! Subscribe to our newsletter for a weekly roundup of the latest \u003Ci\u003ENew Yorker\u003C\u002Fi\u003E podcasts."},{"newsletterId":248971,"priority":12,"dangerousHed":"Doreen St. Félix","dangerousDek":"Reviews of the latest TV shows and commentary on American culture."},{"newsletterId":248970,"priority":13,"dangerousHed":"Be the first to know when Benjamin Wallace-Wells publishes a new piece.","dangerousDek":"Commentary on American politics and society."},{"newsletterId":5129,"priority":14,"dangerousHed":"The Borowitz Report","dangerousDek":"Get the Borowitz Report in your in-box. Sign up now!"},{"newsletterId":248723,"priority":15,"dangerousHed":"John Cassidy","dangerousDek":"Subscribe to John Cassidy’s newsletter to get the latest on politics, economics, and the news."},{"newsletterId":248822,"priority":16,"dangerousHed":"Amy Davidson Sorkin","dangerousDek":"Sign up and get Amy Davidson Sorkin’s analysis of world news, American politics, and more, all delivered to your in-box."},{"newsletterId":442,"priority":17,"dangerousHed":"Daily Humor","dangerousDek":"Sign up for the Daily Humor newsletter and get \u003Ci\u003EThe New Yorker\u003C\u002Fi\u003E cartoons and Shouts—plus more funny stuff—every day in your in-box!"},{"newsletterId":248968,"dangerousHed":"Sign …


*/


