if (debug) console.log("Initializing Items");

// Generic Items
charlieBigBlackRemmyDildo = new Item("charlieBigBlackRemmyDildo", "Dildo", "A big black ram dildo");
remmyMediumPinkRibbedFleshlight = new Item("remmyMediumPinkRibbedFleshlight", "Fleshlight", "A pink, ribbed fleshlight for large medium-sized mammals.");
playBuck942 = new Item("playBuck942", "Playbuck Magazine issue 942", "Lewdy Hopps Q&amp;A, and how close she really is with Becky Wilde.");
doesGoneWildeDownAtTheFarmVHS = new Item("doesGoneWildeDownAtTheFarmVHS", "Does Gone Wilde, Country Style", "Does Gone Wilde, Country Style - Four hours of country does showing a city fox what life on the farm is really like.");
charlieBeatingHeart = new Item("charlieBeatingHeart", "Charlie's Heart", "The vixen's still-beating heart thrums at a quick pace. It shifts around unnaturally, and feels as though it's pulling you in a specific direction.", "images/items/charlieBeatingHeart.svg");
charlieLeftEye = new Item("charlieLeftEye", "Charlie's Left Eye", "The vixen's blue left eye. The strangely slitted pupil retracts when exposed to light. It shivers unnaturally, and feels as though it's pulling you in a specific direction.", "images/items/charlieLeftEye.svg");
bugBurgaDelux = new Item("bugBurgaDelux", "Bug Burga Delux", "A Bug Burga Delux; two Bug Burga patties, two slices of cheese, and two sesame seed buns.", "images/items/bugBurgaDelux.svg");
bugBurga = new Item("bugBurga", "Bug Burga", "A Bug Burga; one Bug Burga patty, one slices of cheese, and two sesame seed buns.", "images/items/bugBurga.svg");
bugBurgaDrank = new Item("bugBurgaDrank", "Bug Burga Soda", "A fizzy fountain drink from Bug Burga.", "images/items/bugBurgaDrank.svg");;

// Clothing
blouseBlue = new Clothing("blouseBlue", "Blue Blouse", "A blue, loose-fitting blouse.", "torso");
pantiesBlue = new Clothing("pantiesBlue", "Blue Panties", "A pair of blue, almost see-through panties.", "groin", "images/items/bluePanties.svg", true);
straponHorseBlack = new Clothing("straponHorseBlack", "Black Horse Strapon Dildo", "A black dildo attached to a strapon harness", "groin", "images/items/straponHorseBlack.svg");
turtleneckBlack = new Clothing("turtleneckBlack", "Black Turtleneck", "A black turtleneck sweater.", "torso");
pantiesPink = new Clothing("pantiesPink", "Pink Panties", "A pair of pink panties.", "groin", undefined, true);
pantsGrey = new Clothing("pantsGrey", "Grey Pants", "A pair of grey pants.", "legs", undefined, true);
tanktopWhite = new Clothing("tanktopWhite", "White tank-top", "A white tank-top.", "torso");
cargopantsTan = new Clothing("cargopantsTan", "Tan Cargo Pants", "A pair of tan cargo pants.", "legs", undefined, true);
shirtPatchy = new Clothing("shirtPatchy", "Patchy Shirt", "A torn, patched up cloth shirt.", "torso");
pantsPatchy = new Clothing("pantsPatchy", "Patchy Pants", "A pair of torn, patched up cloth pants.", "legs", undefined, true);
tshirtWhiteMelesMeles = new Clothing("tshirtWhiteMelesMeles", "Meles Meles T-Shirt", "A Meles Meles band t-shirt.", "torso", "images/items/tshirtWhiteMelesMeles.svg", false);

// Keys
masterKey = new Key("masterKey", "Simple Key", "A simple key.");
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

if (debug) console.log("\tInitialized " + itemsIndexes.size + " Items.");