if (debug) console.log("Initializing Items");

// Generic Items
charlieBigBlackRemmyDildo = new Item("charlieBigBlackRemmyDildo", "Dildo", "A big black ram dildo");
remmyMediumPinkRibbedFleshlight = new Item("remmyMediumPinkRibbedFleshlight", "Fleshlight", "A pink, ribbed fleshlight for large medium-sized mammals.");
playBuck942 = new Item("playBuck942", "Playbuck Magazine issue 942", "Lewdy Hopps Q&amp;A, and how close she really is with Becky Wilde.");
playBuck2017July = new Item("playBuck2017July", "Playbuck Magazine Issue 943", "Becky Wilde goes wilde with these simple techniques!", "resources/images/items/playBuck2017July.svg");
doesGoneWildeDownAtTheFarmVHS = new Item("doesGoneWildeDownAtTheFarmVHS", "Does Gone Wilde, Country Style", "Does Gone Wilde, Country Style - Four hours of country does showing a city fox what life on the farm is really like.");
charliePalmMirror = new Item("charliePalmMirror", "Small mirror", "A small palm mirror.", undefined, undefined, "mirror");
woodenBowlEmpty = new Item("woodenBowlEmpty", "Empty Bowl", "An empty bowl.", undefined, undefined, ["wood", "container"]);
roseLiving = new Item("roseLiving", "Rose", "A single rose.", undefined, undefined, ["living", "water", "earth"]);
roseDead = new Item("roseDead", "Dead Rose", "A dead rose.", undefined, undefined, ["dead", "earth"])
dildoCanineRed = new Item("dildoCanineRed", "Red Rocket Dildo", "A fox-sized canine-themed dildo.", undefined, undefined);
magicBettyFleshlight = new Item("magicBettyFleshlight", "Life-like Wolf Fleshlight", "A charcoal-grey fleshlight, shaped like a large wolf's pussy, that feels warm to the touch. It moistens and becomes tighter during use, just like the real thing!", undefined, undefined, ["magic","living","container"]);
magicCharlieFleshlight = new Item("magicCharlieFleshlight", "Life-like Vixen Fleshlight", "A cream-colored fleshlight, shaped like a vixen's vagina, that feels warm to the touch. It's hard to penetrate at first, but gets easier after a few minutes.", undefined, undefined, ["magic","living","container"]);

// Clothing
blouseBlue = new Clothing("blouseBlue", "Blue Blouse", "A blue, loose-fitting blouse.", undefined, "shirt");
pantiesBlue = new Clothing("pantiesBlue", "Blue Panties", "A pair of blue, almost see-through panties.", "resources/images/items/bluePanties.svg", "underwear", true);
straponHorseBlack = new Clothing("straponHorseBlack", "Black Horse Strapon Dildo", "A black dildo attached to a strapon harness", "resources/images/items/straponHorseBlack.svg", "underwear");
turtleneckBlack = new Clothing("turtleneckBlack", "Black Turtleneck", "A black turtleneck sweater.", undefined, "shirt");
pantiesPink = new Clothing("pantiesPink", "Pink Panties", "A pair of pink panties.", undefined, "underwear", true);
pantsGrey = new Clothing("pantsGrey", "Grey Pants", "A pair of grey pants.", undefined, "pants", true);
tanktopWhite = new Clothing("tanktopWhite", "White tank-top", "A white tank-top.", undefined, "shirt");
cargopantsTan = new Clothing("cargopantsTan", "Tan Cargo Pants", "A pair of tan cargo pants.", undefined, "pants", true);
shirtPatchy = new Clothing("shirtPatchy", "Patchy Shirt", "A torn, patched up cloth shirt.", undefined, "shirt");
pantsPatchy = new Clothing("pantsPatchy", "Patchy Pants", "A pair of torn, patched up cloth pants.", undefined, "pants", true);
pantsDenimBlue = new Clothing("pantsDenimBlue", "Blue Denim Pants", "A pair of blue denim pants.", undefined, "pants", true);
shirtGreen = new Clothing("shirtGreen", "Green Long-sleeved Shirt", "A green, long-sleeved shirt.", undefined, "shirt", false);
tshirtWhiteMelesMeles = new Clothing("tshirtWhiteMelesMeles", "Meles Meles Tank Top", "A Meles Meles band tank top.", "resources/images/items/tshirtWhiteMelesMeles.svg", "shirt", false);
shockCollar = new Clothing("shockCollar", "Shock Collar", "A shock collar from the 80s.", "resources/images/items/shockCollar.svg", "neckwear", false);

// Keys
masterKey = new Key("masterKey", "Simple Key", "A simple key.", "resources/images/items/masterKey.svg", false, ["jagged", "smooth", "metal"]);
remmyApartmentLocationKey = new Key("remmyApartmentLocationKey", "Remmy's Apartment Key", "Remmy's Apartment Key", "resources/images/items/remmyApartmentLocationKey.svg", false, ["jagged", "sharp", "metal"]);
alApartmentLocationKey = new Key("alApartmentLocationKey", "Al's Apartment Key", "Al's Apartment Key", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
alBuildingLocationKey = new Key("alBuildingLocationKey", "Skeleton Key", "Skeleton key for 3 Pack Street.", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
avoApartmentLocationKey = new Key("avoApartmentLocationKey", "Avo's Apartment Key", "Avo's Apartment Key", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
bettyApartmentLocationKey = new Key("bettyApartmentLocationKey", "Betty's Apartment Key", "Betty's Apartment Key", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
bettyBuildingLocationKey = new Key("bettyBuildingLocationKey", "Skeleton Key", "Skeleton key for 5 Pack Street.", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
chartyApartmentLocationKey = new Key("chartyApartmentLocationKey", "Charlie and Marty's Apartment Key", "Charlie and Marty's Apartment Key", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
ozzyApartmentLocationKey = new Key("ozzyApartmentLocationKey", "Ozzy's Apartment Key", "Ozzy's Apartment Key", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
twinsApartmentLocationKey = new Key("twinsApartmentLocationKey", "Anneke and Wolter's Apartment Key", "Anneke and Wolter's Apartment Key", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
pandorasBoxLocationKey = new Key("pandorasBoxLocationKey", "Key to Pandora's Box", "A complex brass key meant for digitigrade mammals to Pandora's Box.", "resources/images/items/pandorasBoxLocationKey.svg", false, ["jagged", "smooth", "metal"]);

// Consumables
bugBurgaDelux = new Consumable("bugBurgaDelux", "Bug Burga Delux", "A Bug Burga Delux; two Bug Burga patties, two slices of cheese, and two sesame seed buns.", "resources/images/items/bugBurgaDelux.svg", "food", undefined, "dead");
bugBurga = new Consumable("bugBurga", "Bug Burga", "A Bug Burga; one Bug Burga patty, one slices of cheese, and two sesame seed buns.", "resources/images/items/bugBurga.svg", "food", undefined, "dead");
bugBurgaDrank = new Consumable("bugBurgaDrank", "Bug Burga Soda", "A fizzy fountain drink from Bug Burga.", "resources/images/items/bugBurgaDrank.svg", "drink", undefined, ["container", "water", "mirror"]);
charlieBeatingHeart = new Consumable("charlieBeatingHeart", "Charlie's Heart", "The vixen's still-beating heart thrums at a quick pace. It shifts around unnaturally, and feels as though it's pulling you in a specific direction.", "resources/images/items/charlieBeatingHeart.svg", undefined, undefined, ["magic", "living", "charm"]);
charlieLeftEye = new Consumable("charlieLeftEye", "Charlie's Left Eye", "The vixen's blue left eye. The strangely slitted pupil retracts when exposed to light. It shivers unnaturally, and feels as though it's pulling you in a specific direction.", "resources/images/items/charlieLeftEye.svg", undefined, undefined, ["mirror", "magic", "living", "charm"]);
tinOfGrease = new Consumable("tinOfGrease", "Tin of Grease", "A tin of food-safe grease.", undefined, "food", undefined, "metal");
woodenBowlWater = new Consumable("woodenBowlWater", "Bowl of Water", "A bowl filled with water.", undefined, "drink", undefined, ["wood", "container", "water", "mirror"]);
woodenBowlRainbowRocks = new Consumable("woodenBowlRainbowRocks", "Bowl of Cereal", "A bowl filled with cereal.", undefined, "food");
woodenBowlBeetleBreakfast = new Consumable("woodenBowlBeetleBreakfast", "Bowl of Beetle Breakfast", "A bowl filled with juicy beetles.", undefined, "food", undefined, ["wood", "container", "dead"]);
redRocketPopsicle = new Consumable("redRocketPopsicle", "Red Rocket Popsicle", "A rich, cherry-flavoured popsicle with a creamy center, that you can barely fit in your mouth.", undefined, "food", undefined, ["water", "living"]);
cockWaffle = new Consumable("cockWaffle", "Shaped Waffle", "An oddly shaped, 'syrup'-filled waffle.", undefined, "food");
bluePotion = new Consumable("bluePotion", "Blue Liquid", "A strange bottle of thick, blue liquid. There's some bits of plant-matter floating around inside.", undefined, "medicine", undefined, ["water", "nature", "magic", "container"]);
redPotion = new Consumable("redPotion", "Red Liquid", "A strange bottle of watery, red liquid. It almost looks like blood.", undefined, "medicine", undefined, ["water", "magic", "container"]);
purplePotion = new Consumable("purplePotion", "Purple Liquid", "Some Grape Fizz in a strange glass bottle.", undefined, undefined, undefined, ["water", "container"]);

// Phones
carrotPhone6S = new Phone("carrotPhone6S", "Carrot Phone 6S", "Carrot Phone 6s smartphone designed, developed, and marketed by Carrot Inc.", undefined, 200, 0.180);
carrotPhone7 = new Phone("carrotPhone7", "Carrot Phone 6S", "Carrot Phone 7 smartphone designed, developed, and marketed by Carrot Inc.", undefined, 500, 0.140);
sungsamUniverse7 = new Phone("sungsamUniverse7", "Sungsam Universe 7 smartphone, developed by Sungsam.", undefined, 180, 0.150);
goatoGrazr = new Phone("motoGrazr", "Goatorola Grazr", "Flip phone from the early 2000s.", undefined, 20, 100);

remmyPhone = new PhoneInstance(undefined, carrotPhone6S, remmy);
wolterPhone = new PhoneInstance(undefined, carrotPhone7, wolter);
annekePhone = new PhoneInstance(undefined, carrotPhone7, anneke);
charliePhone = new PhoneInstance(undefined, goatoGrazr, charlie);
bettyPhone = new PhoneInstance(undefined, carrotPhone7, betty);


if (debug) console.log("\tInitialized " + itemIndices.size + " Items.");