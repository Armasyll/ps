if (debug) console.log("Initializing Items");

// Generic Items
charlieBigBlackRemmyDildo = new Item("charlieBigBlackRemmyDildo", "Dildo", "A big black ram dildo", charlie);
remmyMediumPinkRibbedFleshlight = new Item("remmyMediumPinkRibbedFleshlight", "Fleshlight", "A pink, ribbed fleshlight for large medium-sized mammals.", remmy);
playBuck942 = new Item("playBuck942", "Playbuck Magazine issue 942", "Lewdy Hopps Q&amp;A, and how close she really is with Becky Wilde.", undefined);
doesGoneWildeDownAtTheFarmVHS = new Item("doesGoneWildeDownAtTheFarmVHS", "Does Gone Wilde, Country Style", "Does Gone Wilde, Country Style - Four hours of country does showing a city fox what life on the farm is really like.", undefined);
charlieBeatingHeart = new Item("charlieBeatingHeart", "Charlie's Heart", "The vixen's still-beating heart thrums at a quick pace. It shifts around unnaturally, and feels as though it's pulling you in a specific direction.", charlie);
charlieLeftEye = new Item("charlieLeftEye", "Charlie's Left Eye", "The vixen's blue left eye. The strangely slitted pupil retracts when exposed to light. It shivers unnaturally, and feels as though it's pulling you in a specific direction.", charlie);

// Clothing
annekeBlouseBlue = new Clothing("annekeBlouseBlue", "Blue Blouse", "A blue, loose-fitting blouse.", anneke, "torso");
annekePantiesBlue = new Clothing("annekePantiesBlue", "Blue Panties", "A pair of blue, almost see-through panties.", anneke, "groin");
bettyStraponHorseBlack = new Clothing("bettyStraponHorseBlack", "Black Horse Strapon Dildo", "A black dildo attached to a strapon harness", betty, "groin");
charlieTurtleneckBlack = new Clothing("charlieTurtleneckBlack", "Black Turtleneck", "A black turtleneck sweater.", charlie, "torso");
charliePantiesPink = new Clothing("charliePantiesPink", "Pink Panties", "A pair of pink panties.", charlie, "groin");
charliePantsGrey = new Clothing("charliePantsGrey", "Grey Pants", "A pair of grey pants.", charlie, "legs");
remmyTanktopWhite = new Clothing("remmyTanktopWhite", "White tank-top", "A white tank-top.", remmy, "torso");
remmyCargopantsTan = new Clothing("remmyCargopantsTan", "Tan Cargo Pants", "A pair of tan cargo pants.", remmy, "legs");
rosieShirtPatchy = new Clothing("rosieShirtPatchy", "Patchy Shirt", "A torn, patched up cloth shirt.", rosie, "torso");
rosiePantsPatchy = new Clothing("rosiePantsPatchy", "Patchy Pants", "A pair of torn, patched up cloth pants.", rosie, "legs");

// Keys
masterKey = new Item("masterKey", "Simple Key", "A simple key.", charlie);
alBuildingLocationKey = new Item("alBuildingLocationKey", "Skeleton Key", "Skeleton key for Pack Street.", charlie);
chartyApartmentLocationKey = new Item("chartyApartmentLocationKey", "Charlie and Marty's Apartment Key", "Charlie and Marty's Apartment Key", [charlie, marty]);
twinsApartmentLocationKey = new Item("twinsApartmentLocationKey", "Anneke and Wolter's Apartment Key", "Anneke and Wolter's Apartment Key", [anneke, wolter]);
pandorasBoxLocationKey = new Item("pandorasBoxLocationKey", "Key to Pandora's Box", "A complex brass key meant for digitigrade mammals to Pandora's Box.", [pandora]);

if (debug) console.log("\tInitialized " + itemsIndexes.size + " Items.");