if (debug) console.log("Initializing Rooms");

limbo = new Room("limbo", "Limbo", 0, limboCell, limboLocation);

zootopiaPackStreetAlBuilding = new Room("zootopiaPackStreetAlBuilding", "12 Pack Street", 0, zootopiaCell, zootopiaLocation);

alBuildingBasementA = new Room("alBuildingBasementA", "Basement", "basement", alBuildingBasementCell, alBuildingBasementLocation);
alBuildingBasementB = new Room("alBuildingBasementB", "Basement", "basement", alBuildingBasementCell, alBuildingBasementLocation);
alBuildingBasementC = new Room("alBuildingBasementC", "Basement", "basement", alBuildingBasementCell, alBuildingBasementLocation);
alBuildingBasementD = new Room("alBuildingBasementD", "Basement", "basement", alBuildingBasementCell, alBuildingBasementLocation);
alBuildingBasementE = new Room("alBuildingBasementE", "Basement", "basement", alBuildingBasementCell, alBuildingBasementLocation);
alBuildingBasementF = new Room("alBuildingBasementF", "Basement", "basement", alBuildingBasementCell, alBuildingBasementLocation);
alBuildingBasementG = new Room("alBuildingBasementG", "Basement", "basement", alBuildingBasementCell, alBuildingBasementLocation);
alBuildingBasementH = new Room("alBuildingBasementH", "Basement", "basement", alBuildingBasementCell, alBuildingBasementLocation);
alBuildingBasementI = new Room("alBuildingBasementI", "Basement", "basement", alBuildingBasementCell, alBuildingBasementLocation);
alBuildingBasementJ = new Room("alBuildingBasementJ", "Basement", "basement", alBuildingBasementCell, alBuildingBasementLocation);
alBuildingBasementK = new Room("alBuildingBasementK", "Basement", "basement", alBuildingBasementCell, alBuildingBasementLocation);
alBuildingBasementL = new Room("alBuildingBasementL", "Basement", "basement", alBuildingBasementCell, alBuildingBasementLocation);
alBuildingBasementM = new Room("alBuildingBasementM", "Basement", "basement", alBuildingBasementCell, alBuildingBasementLocation);
alBuildingBasementN = new Room("alBuildingBasementN", "Basement", "basement", alBuildingBasementCell, alBuildingBasementLocation);
alBuildingBasementA.sid = "alBuildingBasement";
alBuildingBasementB.sid = "alBuildingBasement";
alBuildingBasementC.sid = "alBuildingBasement";
alBuildingBasementD.sid = "alBuildingBasement";
alBuildingBasementE.sid = "alBuildingBasement";
alBuildingBasementF.sid = "alBuildingBasement";
alBuildingBasementG.sid = "alBuildingBasement";
alBuildingBasementH.sid = "alBuildingBasement";
alBuildingBasementI.sid = "alBuildingBasement";
alBuildingBasementJ.sid = "alBuildingBasement";
alBuildingBasementK.sid = "alBuildingBasement";
alBuildingBasementL.sid = "alBuildingBasement";
alBuildingBasementM.sid = "alBuildingBasement";
alBuildingBasementN.sid = "alBuildingBasement";

alBuildingFirstFloorHallwayA = new Room("alBuildingFirstFloorHallwayA", "Lobby", "lobby", alBuildingFirstFloor, alBuildingLobby);
alBuildingFirstFloorHallwayB = new Room("alBuildingFirstFloorHallwayB", "Lobby", "lobby", alBuildingFirstFloor, alBuildingLobby);
alBuildingFirstFloorHallwayC = new Room("alBuildingFirstFloorHallwayC", "Lobby", "lobby", alBuildingFirstFloor, alBuildingLobby);
alBuildingFirstFloorHallwayD = new Room("alBuildingFirstFloorHallwayD", "Lobby", "lobby", alBuildingFirstFloor, alBuildingLobby);
alBuildingFirstFloorHallwayA.sid = "alBuildingFirstFloorHallway";
alBuildingFirstFloorHallwayB.sid = "alBuildingFirstFloorHallway";
alBuildingFirstFloorHallwayC.sid = "alBuildingFirstFloorHallway";
alBuildingFirstFloorHallwayD.sid = "alBuildingFirstFloorHallway";

alBuildingMaintenanceA = new Room("alBuildingMaintenanceA", "Maintenance", 7, alBuildingFirstFloor, alBuildingMaintenance);
alBuildingMaintenanceB = new Room("alBuildingMaintenanceB", "Maintenance", 7, alBuildingFirstFloor, alBuildingMaintenance);
alBuildingMaintenanceC = new Room("alBuildingMaintenanceC", "Maintenance", 7, alBuildingFirstFloor, alBuildingMaintenance);
alBuildingMaintenanceA.sid = "alBuildingMaintenance";
alBuildingMaintenanceB.sid = "alBuildingMaintenance";
alBuildingMaintenanceC.sid = "alBuildingMaintenance";

ozzyApartmentLivingroom = new Room("ozzyApartmentLivingroom", "Livingroom", 3, alBuildingFirstFloor, ozzyApartment);
ozzyApartmentBathroom = new Room("ozzyApartmentBathroom", "Bathroom", 4, alBuildingFirstFloor, ozzyApartment);
ozzyApartmentBedroom = new Room("ozzyApartmentBedroom", "Bedroom", 2, alBuildingFirstFloor, ozzyApartment);

weaverApartmentLivingroom = new Room("weaverApartmentLivingroom", "Livingroom", 3, alBuildingFirstFloor, weaverApartment);
weaverApartmentBathroom = new Room("weaverApartmentBathroom", "Bathroom", 4, alBuildingFirstFloor, weaverApartment);
weaverApartmentBedroomA = new Room("weaverApartmentBedroomA", "Bedroom", 2, alBuildingFirstFloor, weaverApartment);
weaverApartmentBedroomB = new Room("weaverApartmentBedroomB", "Bedroom", 2, alBuildingFirstFloor, weaverApartment);

alBuildingSecondFloorHallwayA = new Room("alBuildingSecondFloorHallwayA", "Hallway", "hallway", alBuildingSecondFloor);
alBuildingSecondFloorHallwayB = new Room("alBuildingSecondFloorHallwayB", "Hallway", "hallway", alBuildingSecondFloor);
alBuildingSecondFloorHallwayA.sid = "alBuildingSecondFloorHallway";
alBuildingSecondFloorHallwayB.sid = "alBuildingSecondFloorHallway";

chartyApartmentLivingroom = new Room("chartyApartmentLivingroom", "Livingroom", "livingroom", alBuildingSecondFloor, chartyApartment);
chartyApartmentBathroom = new Room("chartyApartmentBathroom", "Bathroom", "bathroom", alBuildingSecondFloor, chartyApartment);
chartyApartmentBedroomCharlie = new Room("chartyApartmentBedroomCharlie", "Charlie's Bedroom", "bedroom", alBuildingSecondFloor, chartyApartment);
chartyApartmentBedroomMarty = new Room("chartyApartmentBedroomMarty", "Marty's Bedroom", "bedroom", alBuildingSecondFloor, chartyApartment);

remmyApartmentLivingroom = new Room("remmyApartmentLivingroom", "Livingroom", "livingroom", alBuildingSecondFloor, remmyApartment);
remmyApartmentBathroom = new Room("remmyApartmentBathroom", "Bathroom", "bedroom", alBuildingSecondFloor, remmyApartment);
remmyApartmentBedroom = new Room("remmyApartmentBedroom", "Bedroom", "bathroom", alBuildingSecondFloor, remmyApartment);

twinsApartmentLivingroomA = new Room("twinsApartmentLivingroomA", "Livingroom", "livingroom", alBuildingSecondFloor, twinsApartment);
twinsApartmentLivingroomB = new Room("twinsApartmentLivingroomB", "Livingroom", "livingroom", alBuildingSecondFloor, twinsApartment);
twinsApartmentBedroomAnneke = new Room("twinsApartmentBedroomAnneke", "Anneke's Bedroom", "bedroom", alBuildingSecondFloor, twinsApartment);
twinsApartmentBedroomWolter = new Room("twinsApartmentBedroomWolter", "Wolter's Bedroom", "bedroom", alBuildingSecondFloor, twinsApartment);
twinsApartmentBathroom = new Room("twinsApartmentBathroom", "Bathroom", "bathroom", alBuildingSecondFloor, twinsApartment);
twinsApartmentLivingroomA.sid = "twinsApartmentLivingroom";
twinsApartmentLivingroomB.sid = "twinsApartmentLivingroom";

alBuildingThirdFloorHallwayA = new Room("alBuildingThirdFloorHallwayA", "Hallway", "hallway", alBuildingThirdFloor);
alBuildingThirdFloorHallwayB = new Room("alBuildingThirdFloorHallwayB", "Hallway", "hallway", alBuildingThirdFloor);
alBuildingThirdFloorHallwayA.sid = "alBuildingThirdFloorHallway";
alBuildingThirdFloorHallwayB.sid = "alBuildingThirdFloorHallway";

avoApartmentLivingroomA = new Room("avoApartmentLivingroomA", "Livingroom", "livingroom", alBuildingThirdFloor, avoApartment);
avoApartmentLivingroomB = new Room("avoApartmentLivingroomB", "Livingroom", "livingroom", alBuildingThirdFloor, avoApartment);
avoApartmentBedroomAvo = new Room("avoApartmentBedroomAvo", "Bedroom", "bedroom", alBuildingThirdFloor, avoApartment);
avoApartmentBedroomSon = new Room("avoApartmentBedroomSon", "Bedroom", "bedroom", alBuildingThirdFloor, avoApartment);
avoApartmentBathroom = new Room("avoApartmentBathroom", "Bathroom", "bathroom", alBuildingThirdFloor, avoApartment);
avoApartmentLivingroomA.sid = "avoApartmentLivingroom";
avoApartmentLivingroomB.sid = "avoApartmentLivingroom";

alApartmentLivingroom = new Room("alApartmentLivingroom", "Livingroom", "livingroom", alBuildingThirdFloor, alApartment);
alApartmentBathroom = new Room("alApartmentBathroom", "Bathroom", "bedroom", alBuildingThirdFloor, alApartment);
alApartmentBedroom = new Room("alApartmentBedroom", "Bedroom", "bathroom", alBuildingThirdFloor, alApartment);

if (debug) console.log("\tInitialized " + roomsIndexes.size + " Rooms.");