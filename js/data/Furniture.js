if (debug) console.log("Initializing Furniture");

remmyApartmentLivingroomCouch = new Furniture("remmyApartmentLivingroomCouch", "Couch", "A green couch.", ["sit", "lay", "sex"], "couch", 4, 4);
remmyApartmentLivingroomTV = new Furniture("remmyApartmentLivingroomTV", "TV", "A 28 inch TV.", "use", "tv", 0, 1);

remmyApartmentBathroomTub = new Furniture("remmyApartmentBathroomTub", "Bathtub", "A beige bathtub.", ["sit", "lay", "use"], "tub", 2, 8);
remmyApartmentBathroomSink = new Furniture("remmyApartmentBathroomSink", "Sink", "A beige sink.", ["sit", "use"], "sink", 1, 2);
remmyApartmentBathroomToilet = new Furniture("remmyApartmentBathroomToilet", "Toilet", "A beige toilet.", ["sit", "use"], "toilet", 1, 3);
remmyApartmentBathroomMirror = new Furniture("remmyApartmentBathroomMirror", "Mirror", "A simple mirror.", ["use"], "mirror", 0, 4);
remmyApartmentBathroomCabinet = new Furniture("remmyApartmentBathroomCabinet", "Cabinet", "A beige cabinet.", "put", "cabinet", 0, 8);

remmyApartmentBedroomBed = new Furniture("remmyApartmentBedroomBed", "Bed", "A warm bed.", ["sit", "lay", "sleep"], "bed", 2, 4);
remmyApartmentBedroomBureau = new Furniture("remmyApartmentBedroomBureau", "Bureau", "A plywood bureau.", ["open", "put", "take"], "bureau", 0, 16);
remmyApartmentBedroomHamper = new Furniture("remmyApartmentBedroomHamper", "Hamper", "A plastic clothes basket.", ["open", "put", "take"], "basket", 0, 10);

pandorasBoxBasementHiddenBed = new Furniture("pandorasBoxBasementHiddenBed", "Bed", "A large, soft bed.", ["sit", "lay", "sleep"], "bed", 4, 8);

if (debug) console.log("\tInitialized " + furnitureIndexes.size + " Furniture.");