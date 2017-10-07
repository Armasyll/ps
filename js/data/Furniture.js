if (debug) console.log("Initializing Furniture");

remmyApartmentLivingroomCouch = new Furniture("remmyApartmentLivingroomCouch", "Couch", "A green couch.", "couch", 4, 4);
remmyApartmentLivingroomTV = new Furniture("remmyApartmentLivingroomTV", "TV", "A 28 inch TV.", "tv", 0, 1);

remmyApartmentBathroomTub = new Furniture("remmyApartmentBathroomTub", "Bathtub", "A beige bathtub.", "tub", 2, 8);
remmyApartmentBathroomSink = new Furniture("remmyApartmentBathroomSink", "Sink", "A beige sink.", "sink", 1, 2);
remmyApartmentBathroomToilet = new Furniture("remmyApartmentBathroomToilet", "Toilet", "A beige toilet.", "toilet", 1, 3);
remmyApartmentBathroomMirror = new Furniture("remmyApartmentBathroomMirror", "Mirror", "A simple mirror.", "mirror", 0, 4);
remmyApartmentBathroomCabinet = new Furniture("remmyApartmentBathroomCabinet", "Cabinet", "A beige cabinet.", "cabinet", 0, 8);

remmyApartmentBedroomBed = new Furniture("remmyApartmentBedroomBed", "Bed", "A warm bed.", "bed", 2, 4);
remmyApartmentBedroomBureau = new Furniture("remmyApartmentBedroomBureau", "Bureau", "A plywood bureau.", "bureau", 0, 16);
remmyApartmentBedroomHamper = new Furniture("remmyApartmentBedroomHamper", "Hamper", "A plastic clothes basket.", "basket", 0, 10);

pandorasBoxBasementHiddenBed = new Furniture("pandorasBoxBasementHiddenBed", "Bed", "A large, soft bed.", "bed", 4, 8);

if (debug) console.log("\tInitialized " + furnitureIndexes.size + " Furniture.");