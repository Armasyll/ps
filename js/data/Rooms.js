if (debug) console.log("Initializing Rooms");

limbo = new Room("limbo", "Limbo", 0, limboCell, limboLocation);

// Zootopia
console.log("\tInitializing Zootopia");
zootopia42ndStreet01 = new Room("zootopia42ndStreet01", "zootopia42ndStreet", "1 42nd Street", "street", zootopiaCell, zootopia42ndStreetLocation);
zootopia42ndStreet02 = new Room("zootopia42ndStreet02", "zootopia42ndStreet", "2 42nd Street", "street", zootopiaCell, zootopia42ndStreetLocation);
zootopia42ndStreet03 = new Room("zootopia42ndStreet03", "zootopia42ndStreet", "3 42nd Street", "street", zootopiaCell, zootopia42ndStreetLocation);
zootopia42ndStreet04 = new Room("zootopia42ndStreet04", "zootopia42ndStreet", "4 42nd Street", "street", zootopiaCell, zootopia42ndStreetLocation);
zootopia42ndStreet05 = new Room("zootopia42ndStreet05", "zootopia42ndStreet", "5 42nd Street", "street", zootopiaCell, zootopia42ndStreetLocation);
zootopia42ndStreet06 = new Room("zootopia42ndStreet06", "zootopia42ndStreet", "6 42nd Street", "street", zootopiaCell, zootopia42ndStreetLocation);
zootopia42ndStreet07 = new Room("zootopia42ndStreet07", "zootopia42ndStreet", "7 42nd Street", "street", zootopiaCell, zootopia42ndStreetLocation);
zootopia42ndStreet08 = new Room("zootopia42ndStreet08", "zootopia42ndStreet", "8 42nd Street", "street", zootopiaCell, zootopia42ndStreetLocation);
zootopia42ndStreet09 = new Room("zootopia42ndStreet09", "zootopia42ndStreet", "9 42nd Street", "street", zootopiaCell, zootopia42ndStreetLocation);
zootopia42ndStreet10 = new Room("zootopia42ndStreet10", "zootopia42ndStreet", "10 42nd Street", "street", zootopiaCell, zootopia42ndStreetLocation);

zootopiaPackStreet01 = new Room("zootopiaPackStreet01", "zootopiaPackStreet", "1 Pack Street", "street", zootopiaCell, zootopiaPackStreetLocation);
zootopiaPackStreet02 = new Room("zootopiaPackStreet02", "zootopiaPackStreet", "2 Pack Street", "street", zootopiaCell, zootopiaPackStreetLocation);
zootopiaPackStreet03 = new Room("zootopiaPackStreet03", "zootopiaPackStreet", "3 Pack Street", "street", zootopiaCell, zootopiaPackStreetLocation);
zootopiaPackStreet04 = new Room("zootopiaPackStreet04", "zootopiaPackStreet", "4 Pack Street", "street", zootopiaCell, zootopiaPackStreetLocation);
zootopiaPackStreet05 = new Room("zootopiaPackStreet05", "zootopiaPackStreet", "5 Pack Street", "street", zootopiaCell, zootopiaPackStreetLocation);
zootopiaPackStreet06 = new Room("zootopiaPackStreet06", "zootopiaPackStreet", "6 Pack Street", "street", zootopiaCell, zootopiaPackStreetLocation);
zootopiaPackStreet07 = new Room("zootopiaPackStreet07", "zootopiaPackStreet", "7 Pack Street", "street", zootopiaCell, zootopiaPackStreetLocation);
zootopiaPackStreet08 = new Room("zootopiaPackStreet08", "zootopiaPackStreet", "8 Pack Street", "street", zootopiaCell, zootopiaPackStreetLocation);
zootopiaPackStreet09 = new Room("zootopiaPackStreet09", "zootopiaPackStreet", "9 Pack Street", "street", zootopiaCell, zootopiaPackStreetLocation);
zootopiaPackStreet10 = new Room("zootopiaPackStreet10", "zootopiaPackStreet", "10 Pack Street", "street", zootopiaCell, zootopiaPackStreetLocation);
zootopiaPandorasBoxParkingLot = new Room("zootopiaPandorasBoxParkingLot", undefined, "Pandora's Box Parking Lot", "lot", zootopiaCell, zootopiaLocation);

zootopia44thStreet01 = new Room("zootopia44thStreet01", "zootopia44thStreet", "1 44th Street", "street", zootopiaCell, zootopia44thStreetLocation);
zootopia44thStreet02 = new Room("zootopia44thStreet02", "zootopia44thStreet", "2 44th Street", "street", zootopiaCell, zootopia44thStreetLocation);
zootopia44thStreet03 = new Room("zootopia44thStreet03", "zootopia44thStreet", "3 44th Street", "street", zootopiaCell, zootopia44thStreetLocation);
zootopia44thStreet04 = new Room("zootopia44thStreet04", "zootopia44thStreet", "4 44th Street", "street", zootopiaCell, zootopia44thStreetLocation);
zootopia44thStreet05 = new Room("zootopia44thStreet05", "zootopia44thStreet", "5 44th Street", "street", zootopiaCell, zootopia44thStreetLocation);
zootopia44thStreet06 = new Room("zootopia44thStreet06", "zootopia44thStreet", "6 44th Street", "street", zootopiaCell, zootopia44thStreetLocation);
zootopia44thStreet07 = new Room("zootopia44thStreet07", "zootopia44thStreet", "7 44th Street", "street", zootopiaCell, zootopia44thStreetLocation);
zootopia44thStreet08 = new Room("zootopia44thStreet08", "zootopia44thStreet", "8 44th Street", "street", zootopiaCell, zootopia44thStreetLocation);
zootopia44thStreet09 = new Room("zootopia44thStreet09", "zootopia44thStreet", "9 44th Street", "street", zootopiaCell, zootopia44thStreetLocation);
zootopia44thStreet10 = new Room("zootopia44thStreet10", "zootopia44thStreet", "10 44th Street", "street", zootopiaCell, zootopia44thStreetLocation);

// alBuilding
console.log("\tInitializing alBuilding");
alBuildingBasementA = new Room("alBuildingBasementA", "alBuildingBasement", "Basement", "basement", alBuildingBasementCell);
alBuildingBasementB = new Room("alBuildingBasementB", "alBuildingBasement", "Basement", "basement", alBuildingBasementCell);
alBuildingBasementC = new Room("alBuildingBasementC", "alBuildingBasement", "Basement", "basement", alBuildingBasementCell);
alBuildingBasementD = new Room("alBuildingBasementD", "alBuildingBasement", "Basement", "basement", alBuildingBasementCell);
alBuildingBasementE = new Room("alBuildingBasementE", "alBuildingBasement", "Basement", "basement", alBuildingBasementCell);
alBuildingBasementF = new Room("alBuildingBasementF", "alBuildingBasement", "Basement", "basement", alBuildingBasementCell);
alBuildingBasementG = new Room("alBuildingBasementG", "alBuildingBasement", "Basement", "basement", alBuildingBasementCell);
alBuildingBasementH = new Room("alBuildingBasementH", "alBuildingBasement", "Basement", "basement", alBuildingBasementCell);
alBuildingBasementI = new Room("alBuildingBasementI", "alBuildingBasement", "Basement", "basement", alBuildingBasementCell);
alBuildingBasementJ = new Room("alBuildingBasementJ", "alBuildingBasement", "Basement", "basement", alBuildingBasementCell);
alBuildingBasementK = new Room("alBuildingBasementK", "alBuildingBasement", "Basement", "basement", alBuildingBasementCell);
alBuildingBasementL = new Room("alBuildingBasementL", "alBuildingBasement", "Basement", "basement", alBuildingBasementCell);
alBuildingBasementM = new Room("alBuildingBasementM", "alBuildingBasement", "Basement", "basement", alBuildingBasementCell);
alBuildingBasementN = new Room("alBuildingBasementN", "alBuildingBasement", "Basement", "basement", alBuildingBasementCell);

alBuildingFirstFloorHallwayA = new Room("alBuildingFirstFloorHallwayA", "alBuildingFirstFloorHallway", "Lobby", "lobby", alBuildingFirstFloor, alBuildingLobbyLocation);
alBuildingFirstFloorHallwayB = new Room("alBuildingFirstFloorHallwayB", "alBuildingFirstFloorHallway", "Lobby", "lobby", alBuildingFirstFloor, alBuildingLobbyLocation);
alBuildingFirstFloorHallwayC = new Room("alBuildingFirstFloorHallwayC", "alBuildingFirstFloorHallway", "Lobby", "lobby", alBuildingFirstFloor, alBuildingLobbyLocation);
alBuildingFirstFloorHallwayD = new Room("alBuildingFirstFloorHallwayD", "alBuildingFirstFloorHallway", "Lobby", "lobby", alBuildingFirstFloor, alBuildingLobbyLocation);

alBuildingMaintenanceA = new Room("alBuildingMaintenanceA", "alBuildingMaintenance", "Maintenance", "closet", alBuildingFirstFloor, alBuildingMaintenanceLocation);
alBuildingMaintenanceB = new Room("alBuildingMaintenanceB", "alBuildingMaintenance", "Maintenance", "closet", alBuildingFirstFloor, alBuildingMaintenanceLocation);
alBuildingMaintenanceC = new Room("alBuildingMaintenanceC", "alBuildingMaintenance", "Maintenance", "closet", alBuildingFirstFloor, alBuildingMaintenanceLocation);
alBuildingMaintenanceD = new Room("alBuildingMaintenanceD", "alBuildingMaintenance", "Maintenance", "closet", alBuildingFirstFloor, alBuildingMaintenanceLocation);

ozzyApartmentLivingroom = new Room("ozzyApartmentLivingroom", undefined, "Livingroom", "livingroom", alBuildingFirstFloor, ozzyApartmentLocation);
ozzyApartmentBathroom = new Room("ozzyApartmentBathroom", undefined, "Bathroom", "bathroom", alBuildingFirstFloor, ozzyApartmentLocation);
ozzyApartmentBedroom = new Room("ozzyApartmentBedroom", undefined, "Bedroom", "bedroom", alBuildingFirstFloor, ozzyApartmentLocation);

weaverApartmentLivingroom = new Room("weaverApartmentLivingroom", undefined, "Livingroom", "livingroom", alBuildingFirstFloor, weaverApartmentLocation);
weaverApartmentBathroom = new Room("weaverApartmentBathroom", undefined, "Bathroom", "bathroom", alBuildingFirstFloor, weaverApartmentLocation);
weaverApartmentBedroomA = new Room("weaverApartmentBedroomA", undefined, "Bedroom", "bedroom", alBuildingFirstFloor, weaverApartmentLocation);
weaverApartmentBedroomB = new Room("weaverApartmentBedroomB", undefined, "Bedroom", "bedroom", alBuildingFirstFloor, weaverApartmentLocation);

alBuildingSecondFloorHallwayA = new Room("alBuildingSecondFloorHallwayA", "alBuildingSecondFloorHallway", "Hallway", "hallway", alBuildingSecondFloor);
alBuildingSecondFloorHallwayB = new Room("alBuildingSecondFloorHallwayB", "alBuildingSecondFloorHallway", "Hallway", "hallway", alBuildingSecondFloor);

chartyApartmentLivingroom = new Room("chartyApartmentLivingroom", undefined, "Livingroom", "livingroom", alBuildingSecondFloor, chartyApartmentLocation);
chartyApartmentBathroom = new Room("chartyApartmentBathroom", undefined, "Bathroom", "bathroom", alBuildingSecondFloor, chartyApartmentLocation);
chartyApartmentBedroomCharlie = new Room("chartyApartmentBedroomCharlie", undefined, "Charlie's Bedroom", "bedroom", alBuildingSecondFloor, chartyApartmentLocation);
chartyApartmentBedroomMarty = new Room("chartyApartmentBedroomMarty", undefined, "Marty's Bedroom", "bedroom", alBuildingSecondFloor, chartyApartmentLocation);

remmyApartmentLivingroom = new Room("remmyApartmentLivingroom", undefined, "Livingroom", "livingroom", alBuildingSecondFloor, remmyApartmentLocation);
remmyApartmentBathroom = new Room("remmyApartmentBathroom", undefined, "Bathroom", "bedroom", alBuildingSecondFloor, remmyApartmentLocation);
remmyApartmentBedroom = new Room("remmyApartmentBedroom", undefined, "Bedroom", "bathroom", alBuildingSecondFloor, remmyApartmentLocation);

twinsApartmentLivingroomA = new Room("twinsApartmentLivingroomA", "twinsApartmentLivingroom", "Livingroom", "livingroom", alBuildingSecondFloor, twinsApartmentLocation);
twinsApartmentLivingroomB = new Room("twinsApartmentLivingroomB", "twinsApartmentLivingroom", "Livingroom", "livingroom", alBuildingSecondFloor, twinsApartmentLocation);
twinsApartmentBedroomAnneke = new Room("twinsApartmentBedroomAnneke", undefined, "Anneke's Bedroom", "bedroom", alBuildingSecondFloor, twinsApartmentLocation);
twinsApartmentBedroomWolter = new Room("twinsApartmentBedroomWolter", undefined, "Wolter's Bedroom", "bedroom", alBuildingSecondFloor, twinsApartmentLocation);
twinsApartmentBathroom = new Room("twinsApartmentBathroom", undefined, "Bathroom", "bathroom", alBuildingSecondFloor, twinsApartmentLocation);

alBuildingThirdFloorHallwayA = new Room("alBuildingThirdFloorHallwayA", "alBuildingThirdFloorHallway", "Hallway", "hallway", alBuildingThirdFloor);
alBuildingThirdFloorHallwayB = new Room("alBuildingThirdFloorHallwayB", "alBuildingThirdFloorHallway", "Hallway", "hallway", alBuildingThirdFloor);

avoApartmentLivingroomA = new Room("avoApartmentLivingroomA", "avoApartmentLivingroom", "Livingroom", "livingroom", alBuildingThirdFloor, avoApartmentLocation);
avoApartmentLivingroomB = new Room("avoApartmentLivingroomB", "avoApartmentLivingroom", "Livingroom", "livingroom", alBuildingThirdFloor, avoApartmentLocation);
avoApartmentBedroomAvo = new Room("avoApartmentBedroomAvo", undefined, "Bedroom", "bedroom", alBuildingThirdFloor, avoApartmentLocation);
avoApartmentBedroomSon = new Room("avoApartmentBedroomSon", undefined, "Bedroom", "bedroom", alBuildingThirdFloor, avoApartmentLocation);
avoApartmentBathroom = new Room("avoApartmentBathroom", undefined, "Bathroom", "bathroom", alBuildingThirdFloor, avoApartmentLocation);

alApartmentLivingroom = new Room("alApartmentLivingroom", undefined, "Livingroom", "livingroom", alBuildingThirdFloor, alApartmentLocation);
alApartmentBathroom = new Room("alApartmentBathroom", undefined, "Bathroom", "bedroom", alBuildingThirdFloor, alApartmentLocation);
alApartmentBedroom = new Room("alApartmentBedroom", undefined, "Bedroom", "bathroom", alBuildingThirdFloor, alApartmentLocation);

// bettyBuilding
console.log("\tInitializing bettyBuilding");
bettyBuildingFirstFloorHallwayA = new Room("bettyBuildingFirstFloorHallwayA", undefined, "Lobby", "hallway", bettyBuildingFirstFloor);

// pandorasBox
console.log("\tInitializing pandorasBox");
pandorasBoxCheckout = new Room("pandorasBoxCheckout", undefined, "Checkout", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxFrontA = new Room("pandorasBoxFrontA", "pandorasBoxFront", "Front Isle", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxFrontB = new Room("pandorasBoxFrontB", "pandorasBoxFront", "Front Isle", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxFrontC = new Room("pandorasBoxFrontC", "pandorasBoxFront", "Front Isle", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxBackA = new Room("pandorasBoxBackA", "pandorasBoxBack", "Back Isle", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxBackB = new Room("pandorasBoxBackB", "pandorasBoxBack", "Back Isle", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxBackC = new Room("pandorasBoxBackC", "pandorasBoxBack", "Back Isle", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxIsleA1 = new Room("pandorasBoxIsleA1", "pandorasBoxIsleA", "Isle A-H", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxIsleA2 = new Room("pandorasBoxIsleA2", "pandorasBoxIsleA", "Isle A-H", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxIsleA3 = new Room("pandorasBoxIsleA3", "pandorasBoxIsleA", "Isle A-H", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxIsleB1 = new Room("pandorasBoxIsleB1", "pandorasBoxIsleB", "Isle I-P", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxIsleB2 = new Room("pandorasBoxIsleB2", "pandorasBoxIsleB", "Isle I-P", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxIsleB3 = new Room("pandorasBoxIsleB3", "pandorasBoxIsleB", "Isle I-P", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxIsleC1 = new Room("pandorasBoxIsleC1", "pandorasBoxIsleC", "Isle Q-Z", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxIsleC2 = new Room("pandorasBoxIsleC2", "pandorasBoxIsleC", "Isle Q-Z", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxIsleC3 = new Room("pandorasBoxIsleC3", "pandorasBoxIsleC", "Isle Q-Z", undefined, pandorasBoxCell, pandorasBoxStorefrontLocation);
pandorasBoxGarageA = new Room("pandorasBoxGarageA", "pandorasBoxGarage", "Storage", undefined, pandorasBoxCell, pandorasBoxGarageLocation);
pandorasBoxGarageB = new Room("pandorasBoxGarageB", "pandorasBoxGarage", "Storage", undefined, pandorasBoxCell, pandorasBoxGarageLocation);
pandorasBoxGarageC = new Room("pandorasBoxGarageC", "pandorasBoxGarage", "Storage", undefined, pandorasBoxCell, pandorasBoxGarageLocation);
pandorasBoxGarageD = new Room("pandorasBoxGarageD", "pandorasBoxGarage", "Storage", undefined, pandorasBoxCell, pandorasBoxGarageLocation);
pandorasBoxGarageE = new Room("pandorasBoxGarageE", "pandorasBoxGarage", "Storage", undefined, pandorasBoxCell, pandorasBoxGarageLocation);
pandorasBoxGarageF = new Room("pandorasBoxGarageF", "pandorasBoxGarage", "Storage", undefined, pandorasBoxCell, pandorasBoxGarageLocation);
pandorasBoxBasementA = new Room("pandorasBoxBasementA", "pandorasBoxBasement", "Basement", undefined, pandorasBoxBasementCell);
pandorasBoxBasementB = new Room("pandorasBoxBasementB", "pandorasBoxBasement", "Basement", undefined, pandorasBoxBasementCell);
pandorasBoxBasementC = new Room("pandorasBoxBasementC", "pandorasBoxBasement", "Basement", undefined, pandorasBoxBasementCell);
pandorasBoxBasementD = new Room("pandorasBoxBasementD", "pandorasBoxBasement", "Basement", undefined, pandorasBoxBasementCell);
pandorasBoxBasementE = new Room("pandorasBoxBasementE", "pandorasBoxBasement", "Basement", undefined, pandorasBoxBasementCell);
pandorasBoxBasementF = new Room("pandorasBoxBasementF", "pandorasBoxBasement", "Basement", undefined, pandorasBoxBasementCell);
pandorasBoxBasementHiddenBedroom = new Room("pandorasBoxBasementHiddenBedroom", undefined, "Recording Bedroom", undefined, pandorasBoxBasementHiddenCell);
pandorasBoxBasementHiddenBathroom = new Room("pandorasBoxBasementHiddenBathroom", undefined, "Recording Bathroom", undefined, pandorasBoxBasementHiddenCell);

// bugBurga42nd
console.log("\tInitializing bugBurga42nd");
bugBurga42ndDiningA = new Room("bugBurga42ndDiningA", "bugBurga42ndDining", "Dining Area", undefined, bugBurga42ndCell);
bugBurga42ndDiningB = new Room("bugBurga42ndDiningB", "bugBurga42ndDining", "Dining Area", undefined, bugBurga42ndCell);
bugBurga42ndDiningC = new Room("bugBurga42ndDiningC", "bugBurga42ndDining", "Dining Area", undefined, bugBurga42ndCell);
bugBurga42ndDiningD = new Room("bugBurga42ndDiningD", "bugBurga42ndDining", "Dining Area", undefined, bugBurga42ndCell);
bugBurga42ndOrderingCounterA = new Room("bugBurga42ndOrderingCounterA", "bugBurga42ndOrderingCounter", "Checkout", undefined, bugBurga42ndCell);
bugBurga42ndOrderingCounterB = new Room("bugBurga42ndOrderingCounterB", "bugBurga42ndOrderingCounter", "Checkout", undefined, bugBurga42ndCell);
bugBurga42ndKitchenA = new Room("bugBurga42ndKitchenA", "bugBurga42ndKitchen", "Kitchen", undefined, bugBurga42ndCell);
bugBurga42ndKitchenB = new Room("bugBurga42ndKitchenB", "bugBurga42ndKitchen", "Kitchen", undefined, bugBurga42ndCell);
bugBurga42ndBathroomM = new Room("bugBurga42ndBathroomM", undefined, "Male Bathroom", undefined, bugBurga42ndCell);
bugBurga42ndBathroomF = new Room("bugBurga42ndBathroomF", undefined, "Female Bathroom", undefined, bugBurga42ndCell);
bugBurga42ndBreakRoomA = new Room("bugBurga42ndBreakRoomA", "bugBurga42ndBreakRoom", "Break Room", undefined, bugBurga42ndCell);
bugBurga42ndBreakRoomB = new Room("bugBurga42ndBreakRoomB", "bugBurga42ndBreakRoom", "Break Room", undefined, bugBurga42ndCell);

if (debug) console.log("\tInitialized " + roomsIndexes.size + " Rooms.");