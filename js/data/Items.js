if (debug) console.log("Initializing Items");

// Generic Items
charlieBigBlackRemmyDildo = new Item("charlieBigBlackRemmyDildo", "Dildo", "A big black ram dildo");
remmyMediumPinkRibbedFleshlight = new Item("remmyMediumPinkRibbedFleshlight", "Fleshlight", "A pink, ribbed fleshlight for large medium-sized mammals.");
playBuck942 = new Item("playBuck942", "Playbuck Magazine issue 942", "Lewdy Hopps Q&amp;A, and how close she really is with Becky Wilde.");
playBuck2017July = new Item("playBuck2017July", "Playbuck Magazine Issue 943", "Becky Wilde goes wilde with these simple techniques!", "images/items/playBuck2017July.svg");
doesGoneWildeDownAtTheFarmVHS = new Item("doesGoneWildeDownAtTheFarmVHS", "Does Gone Wilde, Country Style", "Does Gone Wilde, Country Style - Four hours of country does showing a city fox what life on the farm is really like.");
charliePalmMirror = new Item("charliePalmMirror", "Small mirror", "A small palm mirror.");
	charliePalmMirror.addSpecialType("mirror");
woodenBowlEmpty = new Item("woodenBowlEmpty", "Empty Bowl", "An empty bowl.");
	woodenBowlEmpty.addSpecialType(["wood", "container"]);
roseLiving = new Item("roseLiving", "Rose", "A single rose.");
	roseLiving.addSpecialType(["living", "water", "earth"]);
roseDead = new Item("roseDead", "Dead Rose", "A dead rose.");
	roseDead.addSpecialType(["dead", "earth"])

// Clothing
blouseBlue = new Clothing("blouseBlue", "Blue Blouse", "A blue, loose-fitting blouse.", "shirt");
pantiesBlue = new Clothing("pantiesBlue", "Blue Panties", "A pair of blue, almost see-through panties.", "underwear", "images/items/bluePanties.svg", true);
straponHorseBlack = new Clothing("straponHorseBlack", "Black Horse Strapon Dildo", "A black dildo attached to a strapon harness", "underwear", "images/items/straponHorseBlack.svg");
turtleneckBlack = new Clothing("turtleneckBlack", "Black Turtleneck", "A black turtleneck sweater.", "shirt");
pantiesPink = new Clothing("pantiesPink", "Pink Panties", "A pair of pink panties.", "underwear", undefined, true);
pantsGrey = new Clothing("pantsGrey", "Grey Pants", "A pair of grey pants.", "pants", undefined, true);
tanktopWhite = new Clothing("tanktopWhite", "White tank-top", "A white tank-top.", "shirt");
cargopantsTan = new Clothing("cargopantsTan", "Tan Cargo Pants", "A pair of tan cargo pants.", "pants", undefined, true);
shirtPatchy = new Clothing("shirtPatchy", "Patchy Shirt", "A torn, patched up cloth shirt.", "shirt");
pantsPatchy = new Clothing("pantsPatchy", "Patchy Pants", "A pair of torn, patched up cloth pants.", "pants", undefined, true);
tshirtWhiteMelesMeles = new Clothing("tshirtWhiteMelesMeles", "Meles Meles Tank Top", "A Meles Meles band tank top.", "shirt", "images/items/tshirtWhiteMelesMeles.svg", false);
shockCollar = new Clothing("shockCollar", "Shock Collar", "A shock collar from the 80s.", "neckwear", "images/items/shockCollar.svg", false);

// Keys
masterKey = new Key("masterKey", "Simple Key", "A simple key.", "images/items/masterKey.svg");
remmyApartmentLocationKey = new Key("remmyApartmentLocationKey", "Remmy's Apartment Key", "Remmy's Apartment Key", "images/items/remmyApartmentLocationKey.svg");
alApartmentLocationKey = new Key("alApartmentLocationKey", "Al's Apartment Key", "Al's Apartment Key", "images/items/key.svg");
alBuildingLocationKey = new Key("alBuildingLocationKey", "Skeleton Key", "Skeleton key for 3 Pack Street.", "images/items/key.svg");
avoApartmentLocationKey = new Key("avoApartmentLocationKey", "Avo's Apartment Key", "Avo's Apartment Key", "images/items/key.svg");
bettyApartmentLocationKey = new Key("bettyApartmentLocationKey", "Betty's Apartment Key", "Betty's Apartment Key", "images/items/key.svg");
bettyBuildingLocationKey = new Key("bettyBuildingLocationKey", "Skeleton Key", "Skeleton key for 5 Pack Street.", "images/items/key.svg");
chartyApartmentLocationKey = new Key("chartyApartmentLocationKey", "Charlie and Marty's Apartment Key", "Charlie and Marty's Apartment Key", "images/items/key.svg");
ozzyApartmentLocationKey = new Key("ozzyApartmentLocationKey", "Ozzy's Apartment Key", "Ozzy's Apartment Key", "images/items/key.svg");
twinsApartmentLocationKey = new Key("twinsApartmentLocationKey", "Anneke and Wolter's Apartment Key", "Anneke and Wolter's Apartment Key", "images/items/key.svg");
pandorasBoxLocationKey = new Key("pandorasBoxLocationKey", "Key to Pandora's Box", "A complex brass key meant for digitigrade mammals to Pandora's Box.", "images/items/pandorasBoxLocationKey.svg");

// Consumables
bugBurgaDelux = new Consumable("bugBurgaDelux", "Bug Burga Delux", "A Bug Burga Delux; two Bug Burga patties, two slices of cheese, and two sesame seed buns.", "food", "images/items/bugBurgaDelux.svg", undefined, "dead");
bugBurga = new Consumable("bugBurga", "Bug Burga", "A Bug Burga; one Bug Burga patty, one slices of cheese, and two sesame seed buns.", "food", "images/items/bugBurga.svg", undefined, "dead");
bugBurgaDrank = new Consumable("bugBurgaDrank", "Bug Burga Soda", "A fizzy fountain drink from Bug Burga.", "drink", "images/items/bugBurgaDrank.svg", undefined, ["container", "water", "mirror"]);
charlieBeatingHeart = new Consumable("charlieBeatingHeart", "Charlie's Heart", "The vixen's still-beating heart thrums at a quick pace. It shifts around unnaturally, and feels as though it's pulling you in a specific direction.", undefined, "images/items/charlieBeatingHeart.svg", undefined, ["magic", "living"]);
charlieLeftEye = new Consumable("charlieLeftEye", "Charlie's Left Eye", "The vixen's blue left eye. The strangely slitted pupil retracts when exposed to light. It shivers unnaturally, and feels as though it's pulling you in a specific direction.", undefined, "images/items/charlieLeftEye.svg", undefined, ["mirror", "magic", "living"]);
tinOfGrease = new Consumable("tinOfGrease", "Tin of Grease", "A tin of food-safe grease.", "food", undefined, undefined, "metal");
woodenBowlWater = new Consumable("woodenBowlWater", "Bowl of Water", "A bowl filled with water.", "drink", undefined, undefined, ["wood", "container", "water", "mirror"]);
woodenBowlRainbowRocks = new Consumable("woodenBowlRainbowRocks", "Bowl of Cereal", "A bowl filled with cereal.", "food");
woodenBowlBeetleBreakfast = new Consumable("woodenBowlBeetleBreakfast", "Bowl of Beetle Breakfast", "A bowl filled with juicy beetles.", "food", undefined, undefined, ["wood", "container", "dead"]);
redRocketPopsicle = new Consumable("redRocketPopsicle", "Red Rocket Popsicle", "A rich, cherry-flavoured popsicle with a creamy center, that you can barely fit in your mouth.", "food", undefined, undefined, ["water", "living"]);
cockWaffle = new Consumable("cockWaffle", "Shaped Waffle", "An oddly shaped, 'syrup'-filled waffle.", "food");
bluePotion = new Consumable("bluePotion", "Blue Liquid", "A strange bottle of thick, blue liquid. There's some bits of plant-matter floating around inside.", "medicine", undefined, undefined, ["water", "nature", "magic", "container"]);
redPotion = new Consumable("redPotion", "Red Liquid", "A strange bottle of watery, red liquid. It almost looks like blood.", "medicine", undefined, undefined, ["water", "magic", "container"]);
purplePotion = new Consumable("purplePotion", "Purple Liquid", "Some Grape Fizz in a strange glass bottle.", undefined, undefined, ["water", "container"]);

// Phones
remmyPhone = new Phone("remmyPhone", "Carrot Phone 6S", "Carrot Phone 6S smartphone designed, developed, and marketed by Carrot Inc.", remmy);
wolterPhone = new Phone("wolterPhone", "Sungsam Universe 7", "Sungsam Universe 7 smartphone, developed by Sungsam.", wolter);
annekePhone = new Phone("annekePhone", "Sungsam Universe 7", "Sungsam Universe 7 smartphone, developed by Sungsam, in a pink, waterproof case.", anneke);
avoPhone = new Phone("avoPhone", "Carrot Phone 7", "Carrot Phone 7S smartphone designed, developed, and marketed by Carrot Inc. in black and gold.", avo);
bettyPhone = new Phone("bettyPhone", "Carrot Phone 7S", "Carrot Phone 7S smartphone designed, developed, and marketed by Carrot Inc. in a gorilla glass cover and case.", betty);
//rexPhone = new Phone("rexPhone", "Carrot Phone Plus", "Engraved with the BugBurga logo, and the name 'Rex,' in diamonds.", rex)


if (debug) console.log("\tInitialized " + itemsIndexes.size + " Items.");