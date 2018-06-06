if ((PSDE.debugEnabled)) console.log("Initializing Items");

// Generic Items
new Item("charlieBigBlackRemmyDildo", "Dildo", "A big black ram dildo");
new Item("remmyMediumPinkRibbedFleshlight", "Fleshlight", "A pink, ribbed fleshlight for large medium-sized mammals.");
new Item("playBuck942", "Playbuck Magazine issue 942", "Lewdy Hopps Q&amp;A, and how close she really is with Becky Wilde.");
new Item("playBuck2017July", "Playbuck Magazine Issue 943", "Becky Wilde goes wilde with these simple techniques!", "resources/images/items/playBuck2017July.svg");
new Item("doesGoneWildeDownAtTheFarmVHS", "Does Gone Wilde, Country Style", "Does Gone Wilde, Country Style - Four hours of country does showing a city fox what life on the farm is really like.");
new Item("charliePalmMirror", "Small mirror", "A small palm mirror.", undefined, undefined, "mirror");
new Item("woodenBowlEmpty", "Empty Bowl", "An empty bowl.", undefined, undefined, ["wood", "container"]);
new Item("roseLiving", "Rose", "A single rose.", undefined, undefined, ["living", "water", "earth"]);
new Item("roseDead", "Dead Rose", "A dead rose.", undefined, undefined, ["dead", "earth"])
new Item("dildoCanineRed", "Red Rocket Dildo", "A fox-sized canine-themed dildo.", undefined, undefined);
new Item("magicBettyFleshlight", "Life-like Wolf Fleshlight", "A charcoal-grey fleshlight, shaped like a large wolf's pussy, that feels warm to the touch. It moistens and becomes tighter during use, just like the real thing!", undefined, undefined, ["magic","living","container"]);
new Item("magicCharlieFleshlight", "Life-like Vixen Fleshlight", "A cream-colored fleshlight, shaped like a vixen's vagina, that feels warm to the touch. It's hard to penetrate at first, but gets easier after a few minutes.", undefined, undefined, ["magic","living","container"]);

// Clothing
new Clothing("blouseBlue", "Blue Blouse", "A blue, loose-fitting blouse.", undefined, "shirt");
new Clothing("pantiesBlue", "Blue Panties", "A pair of blue, almost see-through panties.", "resources/images/items/bluePanties.svg", "underwear", true);
new Clothing("straponHorseBlack", "Black Horse Strapon Dildo", "A black dildo attached to a strapon harness", "resources/images/items/straponHorseBlack.svg", "underwear");
new Clothing("turtleneckBlack", "Black Turtleneck", "A black turtleneck sweater.", undefined, "shirt");
new Clothing("pantiesPink", "Pink Panties", "A pair of pink panties.", undefined, "underwear", true);
new Clothing("pantsGrey", "Grey Pants", "A pair of grey pants.", undefined, "pants", true);
new Clothing("tanktopWhite", "White tank-top", "A white tank-top.", undefined, "shirt");
new Clothing("cargopantsTan", "Tan Cargo Pants", "A pair of tan cargo pants.", undefined, "pants", true);
new Clothing("shirtPatchy", "Patchy Shirt", "A torn, patched up cloth shirt.", undefined, "shirt");
new Clothing("pantsPatchy", "Patchy Pants", "A pair of torn, patched up cloth pants.", undefined, "pants", true);
new Clothing("pantsDenimBlue", "Blue Denim Pants", "A pair of blue denim pants.", undefined, "pants", true);
new Clothing("shirtGreen", "Green Long-sleeved Shirt", "A green, long-sleeved shirt.", undefined, "shirt", false);
new Clothing("tshirtWhiteMelesMeles", "Meles Meles Tank Top", "A Meles Meles band tank top.", "resources/images/items/tshirtWhiteMelesMeles.svg", "shirt", false);
new Clothing("shockCollar", "Shock Collar", "A shock collar from the 80s.", "resources/images/items/shockCollar.svg", "neckwear", false);

// Keys
new Key("masterKey", "Simple Key", "A simple key.", "resources/images/items/masterKey.svg", false, ["jagged", "smooth", "metal"]);
new Key("remmyApartmentLocationKey", "Remmy's Apartment Key", "Remmy's Apartment Key", "resources/images/items/remmyApartmentLocationKey.svg", false, ["jagged", "sharp", "metal"]);
new Key("alApartmentLocationKey", "Al's Apartment Key", "Al's Apartment Key", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
new Key("alBuildingLocationKey", "Skeleton Key", "Skeleton key for 3 Pack Street.", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
new Key("avoApartmentLocationKey", "Avo's Apartment Key", "Avo's Apartment Key", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
new Key("bettyApartmentLocationKey", "Betty's Apartment Key", "Betty's Apartment Key", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
new Key("bettyBuildingLocationKey", "Skeleton Key", "Skeleton key for 5 Pack Street.", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
new Key("chartyApartmentLocationKey", "Charlie and Marty's Apartment Key", "Charlie and Marty's Apartment Key", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
new Key("ozzyApartmentLocationKey", "Ozzy's Apartment Key", "Ozzy's Apartment Key", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
new Key("twinsApartmentLocationKey", "Anneke and Wolter's Apartment Key", "Anneke and Wolter's Apartment Key", "resources/images/items/key.svg", false, ["jagged", "smooth", "metal"]);
new Key("pandorasBoxLocationKey", "Key to Pandora's Box", "A complex brass key meant for digitigrade mammals to Pandora's Box.", "resources/images/items/pandorasBoxLocationKey.svg", false, ["jagged", "smooth", "metal"]);

// Consumables
new Consumable("bugBurgaDelux", "Bug Burga Delux", "A Bug Burga Delux; two Bug Burga patties, two slices of cheese, and two sesame seed buns.", "resources/images/items/bugBurgaDelux.svg", "food", undefined, "dead");
new Consumable("bugBurga", "Bug Burga", "A Bug Burga; one Bug Burga patty, one slices of cheese, and two sesame seed buns.", "resources/images/items/bugBurga.svg", "food", undefined, "dead");
new Consumable("bugBurgaDrank", "Bug Burga Soda", "A fizzy fountain drink from Bug Burga.", "resources/images/items/bugBurgaDrank.svg", "drink", undefined, ["container", "water", "mirror"]);
new Consumable("charlieBeatingHeart", "Charlie's Heart", "The vixen's still-beating heart thrums at a quick pace. It shifts around unnaturally, and feels as though it's pulling you in a specific direction.", "resources/images/items/charlieBeatingHeart.svg", undefined, undefined, ["magic", "living", "charm"]);
new Consumable("charlieLeftEye", "Charlie's Left Eye", "The vixen's blue left eye. The strangely slitted pupil retracts when exposed to light. It shivers unnaturally, and feels as though it's pulling you in a specific direction.", "resources/images/items/charlieLeftEye.svg", undefined, undefined, ["mirror", "magic", "living", "charm"]);
new Consumable("tinOfGrease", "Tin of Grease", "A tin of food-safe grease.", undefined, "food", undefined, "metal");
new Consumable("woodenBowlWater", "Bowl of Water", "A bowl filled with water.", undefined, "drink", undefined, ["wood", "container", "water", "mirror"]);
new Consumable("woodenBowlRainbowRocks", "Bowl of Cereal", "A bowl filled with cereal.", undefined, "food");
new Consumable("woodenBowlBeetleBreakfast", "Bowl of Beetle Breakfast", "A bowl filled with juicy beetles.", undefined, "food", undefined, ["wood", "container", "dead"]);
new Consumable("redRocketPopsicle", "Red Rocket Popsicle", "A rich, cherry-flavoured popsicle with a creamy center, that you can barely fit in your mouth.", undefined, "food", undefined, ["water", "living"]);
new Consumable("cockWaffle", "Shaped Waffle", "An oddly shaped, 'syrup'-filled waffle.", undefined, "food");
new Consumable("bluePotion", "Blue Liquid", "A strange bottle of thick, blue liquid. There's some bits of plant-matter floating around inside.", undefined, "medicine", undefined, ["water", "nature", "magic", "container"]);
new Consumable("redPotion", "Red Liquid", "A strange bottle of watery, red liquid. It almost looks like blood.", undefined, "medicine", undefined, ["water", "magic", "container"]);
new Consumable("purplePotion", "Purple Liquid", "Some Grape Fizz in a strange glass bottle.", undefined, undefined, undefined, ["water", "container"]);

// Phones
new Phone("carrotPhone6S", "Carrot Phone 6S", "Carrot Phone 6s smartphone designed, developed, and marketed by Carrot Inc.", undefined, 200, 0.180);
new Phone("carrotPhone7", "Carrot Phone 6S", "Carrot Phone 7 smartphone designed, developed, and marketed by Carrot Inc.", undefined, 500, 0.140);
new Phone("sungsamUniverse7", "Sungsam Universe 7", "Sungsam Universe 7 smartphone, developed by Sungsam.", undefined, 180, 0.150);
new Phone("goatoGrazr", "Goatorola Grazr", "Flip phone from the early 2000s.", undefined, 20, 100);

new PhoneInstance("remmyPhone", "carrotPhone6S", "remmy");
new PhoneInstance("wolterPhone", "carrotPhone7", "wolter");
new PhoneInstance("annekePhone", "carrotPhone7", "anneke");
new PhoneInstance("charliePhone", "goatoGrazr", "charlie");
new PhoneInstance("bettyPhone", "carrotPhone7", "betty");

if ((PSDE.debugEnabled)) console.log("\tInitialized " + PSDE.items.size + " Items.");