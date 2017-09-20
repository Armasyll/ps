if (debug) console.log("Initializing Furniture");

remmyApartmentLivingroomCouch = new Furniture("remmyApartmentLivingroomCouch", "Couch", "A green couch.", remmy, ["sit", "lay", "sex"], "couch", 4, 4);
remmyApartmentLivingroomTV = new Furniture("remmyApartmentLivingroomTV", "TV", "A 28 inch TV.", remmy, "use", "tv", 0, 1);

remmyApartmentBathroomTub = new Furniture("remmyApartmentBathroomTub", "Bathtub", "A beige bathtub.", remmy, ["sit", "lay", "use"], "tub", 2, 8);
remmyApartmentBathroomSink = new Furniture("remmyApartmentBathroomSink", "Sink", "A beige sink.", remmy, ["sit", "use"], "sink", 1, 2);
remmyApartmentBathroomToilet = new Furniture("remmyApartmentBathroomToilet", "Toilet", "A beige toilet.", remmy, ["sit", "use"], "toilet", 1, 3);
remmyApartmentBathroomMirror = new Furniture("remmyApartmentBathroomMirror", "Mirror", "A simple mirror.", remmy, ["use"], "mirror", 0, 4);
remmyApartmentBathroomCabinet = new Furniture("remmyApartmentBathroomCabinet", "Cabinet", "A beige cabinet.", remmy, "put", "cabinet", 0, 8);

remmyApartmentBedroomBed = new Furniture("remmyApartmentBedroomBed", "Bed", "A warm bed.", remmy, ["sit", "lay", "sleep"], "bed", 2, 4);
remmyApartmentBedroomBureau = new Furniture("remmyApartmentBedroomBureau", "Bureau", "A plywood bureau.", remmy, ["open", "put", "take"], "bureau", 0, 16);
remmyApartmentBedroomHamper = new Furniture("remmyApartmentBedroomHamper", "Hamper", "A plastic clothes basket.", remmy, ["open", "put", "take"], "basket", 0, 10);

pandorasBoxBasementHiddenBed = new Furniture("pandorasBoxBasementHiddenBed", "Bed", "A large, soft bed.", pandora, ["sit", "lay", "sleep"], "bed", 4, 8);

if (debug) console.log("\tInitialized " + furnitureIndexes.size + " Furniture.");