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
annekeBlouseBlue = new Clothing("annekeBlouseBlue", "Blue Blouse", "A blue, loose-fitting blouse.", "torso");
annekePantiesBlue = new Clothing("annekePantiesBlue", "Blue Panties", "A pair of blue, almost see-through panties.", "groin", "images/items/bluePanties.svg", true);
bettyStraponHorseBlack = new Clothing("bettyStraponHorseBlack", "Black Horse Strapon Dildo", "A black dildo attached to a strapon harness", "groin");
charlieTurtleneckBlack = new Clothing("charlieTurtleneckBlack", "Black Turtleneck", "A black turtleneck sweater.", "torso");
charliePantiesPink = new Clothing("charliePantiesPink", "Pink Panties", "A pair of pink panties.", "groin", undefined, true);
charliePantsGrey = new Clothing("charliePantsGrey", "Grey Pants", "A pair of grey pants.", "legs", undefined, true);
remmyTanktopWhite = new Clothing("remmyTanktopWhite", "White tank-top", "A white tank-top.", "torso");
remmyCargopantsTan = new Clothing("remmyCargopantsTan", "Tan Cargo Pants", "A pair of tan cargo pants.", "legs", undefined, true);
rosieShirtPatchy = new Clothing("rosieShirtPatchy", "Patchy Shirt", "A torn, patched up cloth shirt.", "torso");
rosiePantsPatchy = new Clothing("rosiePantsPatchy", "Patchy Pants", "A pair of torn, patched up cloth pants.", "legs", undefined, true);

// Keys
masterKey = new Item("masterKey", "Simple Key", "A simple key.");
remmyApartmentLocationKey = new Item("remmyApartmentLocationKey", "Remmy's Apartment Key", "Remmy's Apartment Key", "images/items/remmyApartmentLocationKey.svg");
alBuildingLocationKey = new Item("alBuildingLocationKey", "Skeleton Key", "Skeleton key for Pack Street.", "images/items/key.svg");
chartyApartmentLocationKey = new Item("chartyApartmentLocationKey", "Charlie and Marty's Apartment Key", "Charlie and Marty's Apartment Key");
twinsApartmentLocationKey = new Item("twinsApartmentLocationKey", "Anneke and Wolter's Apartment Key", "Anneke and Wolter's Apartment Key");
pandorasBoxLocationKey = new Item("pandorasBoxLocationKey", "Key to Pandora's Box", "A complex brass key meant for digitigrade mammals to Pandora's Box.", "images/items/pandorasBoxLocationKey.svg");

if (debug) console.log("\tInitialized " + itemsIndexes.size + " Items.");