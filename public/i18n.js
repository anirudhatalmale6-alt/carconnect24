/* ------------------------------------------------------------------
   CarConnect24 — languages.

   HOW TO ADD A LANGUAGE (e.g. French):
     1. copy the whole `nl: { ... }` block below, rename it to `fr`
     2. translate the right-hand side of each line
     3. add   { code:'fr', flag:'🇫🇷', label:'FR' }   to LANGS
   Nothing else needs touching — the flags, the switcher and every page
   pick it up automatically.

   Mark text in the HTML with   data-i18n="key"        (replaces text)
                                data-i18n-ph="key"     (replaces placeholder)
                                data-i18n-wa="key"     (WhatsApp message)
   ------------------------------------------------------------------ */

window.LANGS = [
  { code: 'nl', flag: '🇳🇱', label: 'NL' },
  { code: 'en', flag: '🇬🇧', label: 'EN' }
  // { code: 'fr', flag: '🇫🇷', label: 'FR' },
  // { code: 'de', flag: '🇩🇪', label: 'DE' }
];

window.I18N = {

  en: {
    /* nav */
    'nav.home': 'Home', 'nav.services': 'Services', 'nav.stock': 'Our stock',
    'nav.faq': 'FAQ', 'nav.whatsapp': 'WhatsApp', 'nav.admin': 'Admin',
    'nav.viewsite': 'View site', 'nav.back': '← Back to stock',

    /* hero */
    'hero.eyebrow': 'Belgium → Europe, Africa & beyond',
    'hero.h1': 'Your car sold abroad. Without the hassle.',
    'hero.lead': 'We have around 20,000 export contacts worldwide who are actively looking to buy cars from Belgium. Send us the details of your car on WhatsApp — we find the buyer. We also take the whole listing and photo workload off your hands.',
    'hero.cta1': 'Send us your car',
    'hero.cta2': '🚗 Browse our stock',

    /* stats */
    'stat.1': 'export buyer contacts', 'stat.2': 'per car, fully listed',
    'stat.3': 'channels per listing', 'stat.4': 'reachable on WhatsApp',

    /* stock band */
    'band.strong': 'Looking for a car?',
    'band.text': 'Browse our current stock — filter by brand, price, mileage and fuel.',
    'band.btn': 'View all cars →',

    /* services */
    'svc.head': 'Three ways we help you sell',
    'svc.sub': 'Pick one, or let us handle all three. Everything starts with a simple WhatsApp message — no accounts, no contracts, no software to learn.',
    'svc1.h': 'Export sales',
    'svc1.p': 'We have built up around 20,000 contacts around the world who buy cars from Belgium. Send us the details of your car on WhatsApp and we make sure a buyer from our network is found.',
    'svc1.l1': 'Send car details by WhatsApp', 'svc1.l2': 'We match it to our buyer network',
    'svc1.l3': 'Buyers across Europe and Africa', 'svc1.l4': 'No listing work on your side',
    'svc1.btn': 'Send a car',
    'svc2.h': 'We publish your cars',
    'svc2.p': 'Putting a car online everywhere takes time and energy. We take that away completely. You send us the details and we publish the car on all of these channels:',
    'svc2.l1': '2dehands (Belgian market)', 'svc2.l2': 'AutoScout24',
    'svc2.l3': 'Our Facebook channel', 'svc2.l4': 'Our TikTok channel',
    'svc2.l5': 'carconnect24.eu — our own website',
    'svc2.btn': 'Start publishing',
    'svc3.h': 'Professional photos',
    'svc3.p': 'Not in the mood to photograph the car yourself? No problem. We come to you and shoot the car properly with a professional camera. Good photos sell cars faster and for more.',
    'svc3.l1': 'We come to your location', 'svc3.l2': 'Professional camera, not a phone',
    'svc3.l3': 'Ready to publish immediately', 'svc3.l4': 'Combine with the listing service',
    'svc3.btn': 'Book a shoot',
    'svc.per': 'per car',

    /* how it works */
    'how.head': 'How it works',
    'how.sub': 'Three steps. The whole thing runs over WhatsApp, so there is nothing to install and nothing to learn.',
    'how1.h': 'Send us the car',
    'how1.p': 'Message us on WhatsApp with the details: brand, model, year, mileage, price and a few photos. That is all we need to start.',
    'how2.h': 'We do the work',
    'how2.p': 'We publish the car across all our channels and put it in front of our export buyers. If you want better photos, we come and shoot them.',
    'how3.h': 'You get the buyer',
    'how3.p': 'Interested buyers come back through us. You keep doing what you do best — we handle the listings and the export contacts.',

    /* why belgium */
    'why.h': 'Why Belgian cars sell so well abroad',
    'why.p': 'Belgium has always had interesting cars for the rest of the world — good specifications, well maintained, and exactly the models buyers in other countries are looking for. That is why our network keeps coming back to us.',
    'why.l1': 'Strong demand from Europe and Africa',
    'why.l2': 'Buyers who already know and trust our network',
    'why.l3': 'We speak the buyer’s language, you do not have to',
    'why.l4': 'No marketplace admin on your side',
    'why.card.h': 'Dealers: we take the admin away',
    'why.card.p': 'Publishing every car on every platform eats hours you do not have. Hand it to us for €10 per car and it lands on 2dehands, AutoScout24, our Facebook, our TikTok and our own website — while you get on with selling.',
    'why.card.btn': 'Talk to us',

    /* stock preview */
    'stk.head': 'Our current stock',
    'stk.sub': 'A live selection of the cars we have available right now. The full list is searchable and filterable.',
    'stk.all': 'See all our cars',
    'stk.none': 'No cars in stock right now — check back soon.',
    'stk.fail': 'Stock could not be loaded right now.',

    /* faq */
    'faq.head': 'Frequently asked questions',
    'faq.sub': 'Everything dealers and sellers usually want to know before they send us their first car.',
    'faq.q1': 'How do I send you a car?',
    'faq.a1': 'Simply on WhatsApp. Send the brand, model, year, mileage, asking price and some photos. You do not need an account and there is no form to fill in. We reply and take it from there.',
    'faq.q2': 'What does the €10 per car actually include?',
    'faq.a2': 'For €10 per car we publish that car on 2dehands, AutoScout24, our Facebook channel, our TikTok channel and on carconnect24.eu. One price, all five channels, and none of the admin lands on you.',
    'faq.q3': 'Who are your 20,000 contacts?',
    'faq.a3': 'They are export buyers we have built up around the world who specifically look for cars coming out of Belgium. When you send us a car, it goes in front of the buyers in that network who are looking for exactly that kind of vehicle.',
    'faq.q4': 'Do you only work with dealers?',
    'faq.a4': 'Dealers are most of our work, because they have volume and the admin hurts them most. But if you are a private seller with a car that suits the export market, message us and we will tell you honestly whether we can help.',
    'faq.q5': 'What do you need to publish my cars for me?',
    'faq.a5': 'We need the car details, the photos and access to the accounts where the car should appear. We handle the listing itself so you do not have to log in and re-type the same car five times.',
    'faq.q6': 'What if I do not have good photos?',
    'faq.a6': 'We come to you and shoot the car with a professional camera for €10 per car. Good photos genuinely make a difference — they get more clicks and they help the car sell faster.',
    'faq.q7': 'Which countries do your buyers come from?',
    'faq.a7': 'Across Europe and Africa mainly, and further afield as well. Belgium is known internationally for having interesting cars, which is exactly why the demand is there.',
    'faq.q8': 'How quickly can my car be online?',
    'faq.a8': 'Usually the same day. Send it over on WhatsApp and we start straight away — there is no waiting list and no onboarding process.',

    /* reviews */
    'rev.head': 'What our customers say',
    'rev.sub': 'Real feedback from dealers and sellers we work with.',
    'rev.ex': '“EXAMPLE — replace with a real customer quote.”',
    'rev.who': '— First name, City',
    'rev.note': 'These three are placeholders, not real reviews. Send Anirudha 3–4 genuine customer sentences (first name + city is enough) and they will be swapped in. Publishing invented reviews is illegal in Belgium and the EU, so this section stays marked until real ones arrive.',

    /* cta band */
    'cta.h': 'Ready to sell your car abroad?',
    'cta.p': 'Send us the details on WhatsApp. We will tell you honestly what we can get for it.',
    'cta.btn1': 'Message us on WhatsApp', 'cta.btn2': 'Browse our stock',

    /* footer */
    'foot.blurb': 'Quality export cars from Belgium to Europe, Africa and beyond. We connect Belgian dealers to a worldwide network of buyers, and take the listing work off their hands.',
    'foot.nav': 'Navigation', 'foot.social': 'Social media', 'foot.touch': 'Get in touch',
    'foot.wa': 'WhatsApp us', 'foot.browse': 'Browse stock',
    'foot.tagline': 'Export cars from Belgium to the world',

    /* stock page */
    'sp.title': 'Quality export cars, Belgium to the world',
    'sp.sub': 'Browse our live stock. Filter by brand, price, mileage and more — instantly.',
    'sp.filter': 'Filter', 'sp.brand': 'Brand', 'sp.model': 'Model', 'sp.anymodel': 'Any model',
    'sp.price': 'Price (€)', 'sp.min': 'Min', 'sp.max': 'Max',
    'sp.yearfrom': 'Year from', 'sp.anyyear': 'Any year',
    'sp.maxkm': 'Max mileage (km)', 'sp.any': 'Any',
    'sp.upto': 'Up to',
    'sp.fuel': 'Fuel type', 'sp.gearbox': 'Gearbox', 'sp.body': 'Body',
    'sp.reset': 'Reset all filters',
    'sp.instock': 'cars in stock', 'sp.instock1': 'car in stock', 'sp.search': 'Search e.g. BMW X5, electric…',
    'sp.sort': 'Sort', 'sp.sortnew': 'Newest first', 'sp.sortpl': 'Price: low to high',
    'sp.sortph': 'Price: high to low', 'sp.sortyn': 'Year: newest', 'sp.sortmm': 'Mileage: lowest',
    'sp.brandph': 'Type a brand… e.g. Mer', 'sp.anybrand': 'Any brand',
    'sp.nobrand': 'No brand matches', 'sp.match': 'match',
    'sp.empty.h': 'No cars match your filters',
    'sp.empty.p': 'Try widening your search or reset the filters.',
    'sp.view': 'View details', 'sp.nophoto': 'No photo', 'sp.sold': 'SOLD',

    /* fuel / gearbox / body values */
    'v.Petrol': 'Petrol', 'v.Diesel': 'Diesel', 'v.Electric': 'Electric',
    'v.Hybrid': 'Hybrid', 'v.LPG': 'LPG',
    'v.Automatic': 'Automatic', 'v.Manual': 'Manual',
    'v.Sedan': 'Sedan', 'v.SUV': 'SUV', 'v.Hatchback': 'Hatchback',
    'v.Estate': 'Estate', 'v.Coupe': 'Coupe', 'v.Van': 'Van',

    /* car detail */
    'cd.year': 'Year', 'cd.mileage': 'Mileage', 'cd.fuel': 'Fuel', 'cd.gearbox': 'Gearbox',
    'cd.power': 'Power', 'cd.body': 'Body', 'cd.color': 'Color', 'cd.doors': 'Doors',
    'cd.seats': 'Seats', 'cd.location': 'Location', 'cd.features': 'Features',
    'cd.contact': 'Contact us about this car', 'cd.loading': 'Loading…',
    'cd.notfound': 'Car not found.',

    /* whatsapp messages */
    'wa.info': 'Hello CarConnect24, I would like more information.',
    'wa.sell': 'Hello CarConnect24, I have a car I would like to sell. Here are the details:',
    'wa.export': 'Hello CarConnect24, I have a car for export. Here are the details:',
    'wa.publish': 'Hello CarConnect24, I would like you to publish my cars (€10 per car).',
    'wa.photos': 'Hello CarConnect24, I would like to book professional photos (€10 per car).',
    'wa.dealer': 'Hello CarConnect24, I am a dealer and I would like to know more about the €10 publishing service.',
    'wa.hello': 'Hello CarConnect24,',
    'wa.stockq': 'Hello CarConnect24, I have a question about a car in your stock.',
    'wa.question': 'Hello CarConnect24, I have a question.',
    'wa.car': 'Hello CarConnect24, I am interested in this car:',
    'wa.notset': 'WhatsApp is not connected yet.\n\nThe site owner still needs to add the number in site.js.'
  },

  /* ---------------- NEDERLANDS ---------------- */
  nl: {
    'nav.home': 'Home', 'nav.services': 'Diensten', 'nav.stock': 'Ons aanbod',
    'nav.faq': 'FAQ', 'nav.whatsapp': 'WhatsApp', 'nav.admin': 'Beheer',
    'nav.viewsite': 'Bekijk site', 'nav.back': '← Terug naar het aanbod',

    'hero.eyebrow': 'België → Europa, Afrika & verder',
    'hero.h1': 'Uw wagen verkocht in het buitenland. Zonder zorgen.',
    'hero.lead': 'Wij hebben ongeveer 20.000 exportcontacten wereldwijd die actief op zoek zijn naar wagens uit België. Stuur ons de gegevens van uw wagen via WhatsApp — wij vinden de koper. Wij nemen ook het volledige werk rond advertenties en foto’s uit handen.',
    'hero.cta1': 'Stuur ons uw wagen',
    'hero.cta2': '🚗 Bekijk ons aanbod',

    'stat.1': 'exportkopers in ons netwerk', 'stat.2': 'per wagen, volledig geplaatst',
    'stat.3': 'kanalen per advertentie', 'stat.4': 'bereikbaar via WhatsApp',

    'band.strong': 'Op zoek naar een wagen?',
    'band.text': 'Bekijk ons huidige aanbod — filter op merk, prijs, kilometerstand en brandstof.',
    'band.btn': 'Bekijk alle wagens →',

    'svc.head': 'Drie manieren waarop wij u helpen verkopen',
    'svc.sub': 'Kies er één, of laat ons alle drie regelen. Alles begint met een eenvoudig WhatsApp-bericht — geen accounts, geen contracten, geen software om te leren.',
    'svc1.h': 'Exportverkoop',
    'svc1.p': 'Wij hebben wereldwijd zo’n 20.000 contacten opgebouwd die wagens uit België kopen. Stuur ons de gegevens van uw wagen via WhatsApp en wij zorgen dat er een koper uit ons netwerk gevonden wordt.',
    'svc1.l1': 'Gegevens doorsturen via WhatsApp', 'svc1.l2': 'Wij matchen met ons kopersnetwerk',
    'svc1.l3': 'Kopers in heel Europa en Afrika', 'svc1.l4': 'Geen advertentiewerk voor u',
    'svc1.btn': 'Wagen doorsturen',
    'svc2.h': 'Wij plaatsen uw wagens',
    'svc2.p': 'Een wagen overal online zetten kost tijd en energie. Dat nemen wij volledig van u over. U stuurt ons de gegevens en wij plaatsen de wagen op al deze kanalen:',
    'svc2.l1': '2dehands (Belgische markt)', 'svc2.l2': 'AutoScout24',
    'svc2.l3': 'Ons Facebook-kanaal', 'svc2.l4': 'Ons TikTok-kanaal',
    'svc2.l5': 'carconnect24.eu — onze eigen website',
    'svc2.btn': 'Start met plaatsen',
    'svc3.h': 'Professionele foto’s',
    'svc3.p': 'Geen zin om zelf foto’s te nemen? Geen probleem. Wij komen langs en fotograferen de wagen professioneel met een echte camera. Goede foto’s verkopen sneller en brengen meer op.',
    'svc3.l1': 'Wij komen naar u toe', 'svc3.l2': 'Professionele camera, geen gsm',
    'svc3.l3': 'Meteen klaar om te plaatsen', 'svc3.l4': 'Combineer met de advertentieservice',
    'svc3.btn': 'Fotoshoot boeken',
    'svc.per': 'per wagen',

    'how.head': 'Hoe het werkt',
    'how.sub': 'Drie stappen. Alles loopt via WhatsApp, dus er valt niets te installeren en niets te leren.',
    'how1.h': 'Stuur ons de wagen',
    'how1.p': 'Stuur ons een WhatsApp met de gegevens: merk, model, bouwjaar, kilometerstand, prijs en enkele foto’s. Meer hebben wij niet nodig om te starten.',
    'how2.h': 'Wij doen het werk',
    'how2.p': 'Wij plaatsen de wagen op al onze kanalen en tonen hem aan onze exportkopers. Wenst u betere foto’s, dan komen wij die maken.',
    'how3.h': 'U krijgt de koper',
    'how3.p': 'Geïnteresseerde kopers komen via ons bij u terecht. U doet waar u goed in bent — wij regelen de advertenties en de exportcontacten.',

    'why.h': 'Waarom Belgische wagens zo goed verkopen in het buitenland',
    'why.p': 'België heeft altijd al interessante wagens gehad voor de rest van de wereld — goede uitrusting, goed onderhouden, en precies de modellen waar kopers in andere landen naar zoeken. Daarom blijft ons netwerk bij ons terugkomen.',
    'why.l1': 'Sterke vraag vanuit Europa en Afrika',
    'why.l2': 'Kopers die ons netwerk kennen en vertrouwen',
    'why.l3': 'Wij spreken de taal van de koper, u hoeft dat niet te doen',
    'why.l4': 'Geen administratie op marktplaatsen voor u',
    'why.card.h': 'Handelaars: wij nemen de administratie over',
    'why.card.p': 'Elke wagen op elk platform plaatsen kost uren die u niet heeft. Geef het aan ons voor €10 per wagen en de wagen staat op 2dehands, AutoScout24, onze Facebook, onze TikTok en onze eigen website — terwijl u gewoon verder verkoopt.',
    'why.card.btn': 'Contacteer ons',

    'stk.head': 'Ons huidige aanbod',
    'stk.sub': 'Een live selectie van de wagens die wij nu beschikbaar hebben. De volledige lijst is doorzoekbaar en filterbaar.',
    'stk.all': 'Bekijk al onze wagens',
    'stk.none': 'Momenteel geen wagens in aanbod — kom binnenkort terug.',
    'stk.fail': 'Het aanbod kon nu niet geladen worden.',

    'faq.head': 'Veelgestelde vragen',
    'faq.sub': 'Alles wat handelaars en verkopers meestal willen weten voor ze hun eerste wagen doorsturen.',
    'faq.q1': 'Hoe stuur ik u een wagen door?',
    'faq.a1': 'Gewoon via WhatsApp. Stuur het merk, model, bouwjaar, kilometerstand, vraagprijs en enkele foto’s. U heeft geen account nodig en er is geen formulier in te vullen. Wij antwoorden en nemen het vanaf daar over.',
    'faq.q2': 'Wat zit er precies in de €10 per wagen?',
    'faq.a2': 'Voor €10 per wagen plaatsen wij die wagen op 2dehands, AutoScout24, ons Facebook-kanaal, ons TikTok-kanaal en op carconnect24.eu. Eén prijs, alle vijf de kanalen, en geen enkele administratie voor u.',
    'faq.q3': 'Wie zijn die 20.000 contacten?',
    'faq.a3': 'Het zijn exportkopers die wij wereldwijd hebben opgebouwd en die specifiek zoeken naar wagens uit België. Wanneer u ons een wagen doorstuurt, komt die terecht bij de kopers in dat netwerk die precies zo’n wagen zoeken.',
    'faq.q4': 'Werkt u alleen met handelaars?',
    'faq.a4': 'Handelaars vormen het grootste deel van ons werk, omdat zij volume hebben en de administratie hen het meest kost. Maar bent u een particuliere verkoper met een wagen die past in de exportmarkt, stuur ons dan een bericht en wij zeggen u eerlijk of wij kunnen helpen.',
    'faq.q5': 'Wat heeft u nodig om mijn wagens te plaatsen?',
    'faq.a5': 'Wij hebben de gegevens van de wagen nodig, de foto’s en toegang tot de accounts waar de wagen moet verschijnen. Wij maken de advertentie zelf op, zodat u niet vijf keer dezelfde wagen moet intypen.',
    'faq.q6': 'Wat als ik geen goede foto’s heb?',
    'faq.a6': 'Wij komen langs en fotograferen de wagen met een professionele camera voor €10 per wagen. Goede foto’s maken echt een verschil — ze leveren meer clicks op en de wagen verkoopt sneller.',
    'faq.q7': 'Uit welke landen komen uw kopers?',
    'faq.a7': 'Vooral uit Europa en Afrika, en ook van verder. België staat internationaal bekend om zijn interessante wagens, en net daarom is de vraag er.',
    'faq.q8': 'Hoe snel staat mijn wagen online?',
    'faq.a8': 'Meestal dezelfde dag. Stuur hem door via WhatsApp en wij beginnen er meteen aan — er is geen wachtlijst en geen aanmeldprocedure.',

    'rev.head': 'Wat onze klanten zeggen',
    'rev.sub': 'Echte ervaringen van handelaars en verkopers waarmee wij samenwerken.',
    'rev.ex': '“VOORBEELD — vervang dit door een echte klantenreactie.”',
    'rev.who': '— Voornaam, Stad',
    'rev.note': 'Deze drie zijn plaatshouders, geen echte reviews. Stuur Anirudha 3 à 4 echte klantenzinnen (voornaam + stad volstaat) en ze worden vervangen. Verzonnen reviews publiceren is verboden in België en de EU, dus dit blok blijft gemarkeerd tot de echte binnenkomen.',

    'cta.h': 'Klaar om uw wagen in het buitenland te verkopen?',
    'cta.p': 'Stuur ons de gegevens via WhatsApp. Wij zeggen u eerlijk wat wij ervoor kunnen krijgen.',
    'cta.btn1': 'Stuur ons een WhatsApp', 'cta.btn2': 'Bekijk ons aanbod',

    'foot.blurb': 'Kwaliteitsvolle exportwagens van België naar Europa, Afrika en verder. Wij verbinden Belgische handelaars met een wereldwijd kopersnetwerk en nemen het advertentiewerk uit handen.',
    'foot.nav': 'Navigatie', 'foot.social': 'Sociale media', 'foot.touch': 'Contact',
    'foot.wa': 'WhatsApp ons', 'foot.browse': 'Bekijk aanbod',
    'foot.tagline': 'Exportwagens van België naar de wereld',

    'sp.title': 'Kwaliteitsvolle exportwagens, van België naar de wereld',
    'sp.sub': 'Bekijk ons actuele aanbod. Filter meteen op merk, prijs, kilometerstand en meer.',
    'sp.filter': 'Filter', 'sp.brand': 'Merk', 'sp.model': 'Model', 'sp.anymodel': 'Alle modellen',
    'sp.price': 'Prijs (€)', 'sp.min': 'Min', 'sp.max': 'Max',
    'sp.yearfrom': 'Bouwjaar vanaf', 'sp.anyyear': 'Alle bouwjaren',
    'sp.maxkm': 'Max. kilometerstand (km)', 'sp.any': 'Alle',
    'sp.upto': 'Tot',
    'sp.fuel': 'Brandstof', 'sp.gearbox': 'Versnellingsbak', 'sp.body': 'Carrosserie',
    'sp.reset': 'Alle filters wissen',
    'sp.instock': 'wagens in aanbod', 'sp.instock1': 'wagen in aanbod', 'sp.search': 'Zoek bv. BMW X5, elektrisch…',
    'sp.sort': 'Sorteer', 'sp.sortnew': 'Nieuwste eerst', 'sp.sortpl': 'Prijs: laag naar hoog',
    'sp.sortph': 'Prijs: hoog naar laag', 'sp.sortyn': 'Bouwjaar: nieuwste', 'sp.sortmm': 'Kilometerstand: laagste',
    'sp.brandph': 'Typ een merk… bv. Mer', 'sp.anybrand': 'Alle merken',
    'sp.nobrand': 'Geen merk gevonden', 'sp.match': 'resultaten',
    'sp.empty.h': 'Geen wagens gevonden met deze filters',
    'sp.empty.p': 'Probeer uw zoekopdracht te verruimen of wis de filters.',
    'sp.view': 'Bekijk details', 'sp.nophoto': 'Geen foto', 'sp.sold': 'VERKOCHT',

    'v.Petrol': 'Benzine', 'v.Diesel': 'Diesel', 'v.Electric': 'Elektrisch',
    'v.Hybrid': 'Hybride', 'v.LPG': 'LPG',
    'v.Automatic': 'Automaat', 'v.Manual': 'Manueel',
    'v.Sedan': 'Sedan', 'v.SUV': 'SUV', 'v.Hatchback': 'Hatchback',
    'v.Estate': 'Break', 'v.Coupe': 'Coupé', 'v.Van': 'Bestelwagen',

    'cd.year': 'Bouwjaar', 'cd.mileage': 'Kilometerstand', 'cd.fuel': 'Brandstof',
    'cd.gearbox': 'Versnellingsbak', 'cd.power': 'Vermogen', 'cd.body': 'Carrosserie',
    'cd.color': 'Kleur', 'cd.doors': 'Deuren', 'cd.seats': 'Zitplaatsen',
    'cd.location': 'Locatie', 'cd.features': 'Uitrusting',
    'cd.contact': 'Contacteer ons over deze wagen', 'cd.loading': 'Laden…',
    'cd.notfound': 'Wagen niet gevonden.',

    'wa.info': 'Hallo CarConnect24, ik had graag meer informatie.',
    'wa.sell': 'Hallo CarConnect24, ik heb een wagen die ik wil verkopen. Dit zijn de gegevens:',
    'wa.export': 'Hallo CarConnect24, ik heb een wagen voor export. Dit zijn de gegevens:',
    'wa.publish': 'Hallo CarConnect24, ik wil graag dat jullie mijn wagens plaatsen (€10 per wagen).',
    'wa.photos': 'Hallo CarConnect24, ik wil graag professionele foto’s boeken (€10 per wagen).',
    'wa.dealer': 'Hallo CarConnect24, ik ben handelaar en wil graag meer weten over de plaatsingsservice van €10.',
    'wa.hello': 'Hallo CarConnect24,',
    'wa.stockq': 'Hallo CarConnect24, ik heb een vraag over een wagen uit jullie aanbod.',
    'wa.question': 'Hallo CarConnect24, ik heb een vraag.',
    'wa.car': 'Hallo CarConnect24, ik ben geïnteresseerd in deze wagen:',
    'wa.notset': 'WhatsApp is nog niet gekoppeld.\n\nDe eigenaar moet het nummer nog invullen in site.js.'
  }
};

/* ---------- engine ---------- */
(function () {
  var STORE = 'cc24_lang';
  var codes = window.LANGS.map(function (l) { return l.code; });

  function pick() {
    var saved = null;
    try { saved = localStorage.getItem(STORE); } catch (e) {}
    if (saved && codes.indexOf(saved) > -1) return saved;
    // first visit: follow the browser, fall back to Dutch (Belgian site)
    var navLangs = (navigator.languages || [navigator.language || '']).join(',').toLowerCase();
    for (var i = 0; i < codes.length; i++) {
      if (navLangs.indexOf(codes[i]) > -1) return codes[i];
    }
    return 'nl';
  }

  window.LANG = pick();
  window.t = function (key) {
    var d = window.I18N[window.LANG] || window.I18N.nl;
    if (d && d[key] != null) return d[key];
    var e = window.I18N.en;
    return (e && e[key] != null) ? e[key] : key;
  };

  window.setLang = function (code) {
    if (codes.indexOf(code) < 0) return;
    window.LANG = code;
    try { localStorage.setItem(STORE, code); } catch (e) {}
    applyI18n();
    document.dispatchEvent(new CustomEvent('langchange', { detail: code }));
  };

  window.applyI18n = function () {
    document.documentElement.setAttribute('lang', window.LANG);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = window.t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.setAttribute('placeholder', window.t(el.getAttribute('data-i18n-ph')));
    });
    // WhatsApp links carry a KEY now, so the message follows the language
    document.querySelectorAll('[data-i18n-wa]').forEach(function (el) {
      if (window.waHref) el.setAttribute('href', window.waHref(window.t(el.getAttribute('data-i18n-wa'))));
    });
    document.querySelectorAll('.langsel .lang').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-lang') === window.LANG);
    });
  };

  /* build the flag switcher into every .langsel placeholder */
  window.buildLangSwitcher = function () {
    document.querySelectorAll('.langsel').forEach(function (host) {
      if (host.children.length) return;
      window.LANGS.forEach(function (l) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'lang';
        b.setAttribute('data-lang', l.code);
        b.setAttribute('title', l.label);
        b.setAttribute('aria-label', l.label);
        b.innerHTML = '<span class="fl">' + l.flag + '</span><span class="lb">' + l.label + '</span>';
        b.onclick = function () { window.setLang(l.code); };
        host.appendChild(b);
      });
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.buildLangSwitcher();
    window.applyI18n();
  });
})();
