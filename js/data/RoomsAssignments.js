if (debug) console.log("Assigning Rooms");

// Al Building, Basement
alBuildingBasementA.setEastRoom(alBuildingBasementB);
alBuildingBasementA.setSouthRoom(alBuildingBasementC);
alBuildingBasementB.setEastRoom(alBuildingBasementD);
alBuildingBasementB.setSouthRoom(alBuildingBasementE);
alBuildingBasementC.setEastRoom(alBuildingBasementE);
alBuildingBasementC.setSouthRoom(alBuildingBasementF);
alBuildingBasementD.setNorthRoom(alBuildingBasementG);
alBuildingBasementD.setEastRoom(alBuildingBasementH);
alBuildingBasementD.setSouthRoom(alBuildingBasementI);
alBuildingBasementE.setEastRoom(alBuildingBasementI);
alBuildingBasementE.setSouthRoom(alBuildingBasementJ);
alBuildingBasementF.setEastRoom(alBuildingBasementJ);
alBuildingBasementH.setSouthRoom(alBuildingBasementK);
alBuildingBasementI.setEastRoom(alBuildingBasementK);
alBuildingBasementI.setSouthRoom(alBuildingBasementL);
alBuildingBasementJ.setEastRoom(alBuildingBasementL);
alBuildingBasementK.setEastRoom(alBuildingBasementM);
alBuildingBasementK.setSouthRoom(alBuildingBasementN);
alBuildingBasementL.setEastRoom(alBuildingBasementN);
alBuildingBasementA.floorImage = stoneFloor01;
alBuildingBasementB.floorImage = stoneFloor01;
alBuildingBasementC.floorImage = stoneFloor01;
alBuildingBasementD.floorImage = stoneFloor01;
alBuildingBasementE.floorImage = stoneFloor01;
alBuildingBasementF.floorImage = stoneFloor01;
alBuildingBasementG.floorImage = stoneFloor01;
alBuildingBasementH.floorImage = stoneFloor01;
alBuildingBasementI.floorImage = stoneFloor01;
alBuildingBasementJ.floorImage = stoneFloor01;
alBuildingBasementK.floorImage = stoneFloor01;
alBuildingBasementL.floorImage = stoneFloor01;
alBuildingBasementM.floorImage = stoneFloor01;
alBuildingBasementN.floorImage = stoneFloor01;
alBuildingBasementG.rugImage = brownRugCenter01;

// Al Building, First Floor
alBuildingFirstFloorHallwayA.setUpRoom(alBuildingSecondFloorHallwayA);
alBuildingFirstFloorHallwayA.setNorthRoom(alBuildingFirstFloorHallwayB);
alBuildingFirstFloorHallwayA.setWestRoom(alBuildingFirstFloorHallwayC);
alBuildingFirstFloorHallwayA.setSouthRoom(zootopiaPackStreetAlBuilding);
alBuildingFirstFloorHallwayB.setWestRoom(alBuildingFirstFloorHallwayD);
alBuildingFirstFloorHallwayC.setNorthRoom(alBuildingFirstFloorHallwayD);
alBuildingFirstFloorHallwayB.setNorthRoom(weaverApartmentLivingroom, {isLocked: true});
alBuildingFirstFloorHallwayB.setEastRoom(ozzyApartmentLivingroom, {isLocked: true});
alBuildingFirstFloorHallwayC.setWestRoom(alBuildingMaintenanceA);
alBuildingFirstFloorHallwayC.setWestWall(0,false);
alBuildingFirstFloorHallwayD.setWestWall(0,false);
alBuildingFirstFloorHallwayA.floorImage = woodenFloor01;
alBuildingFirstFloorHallwayB.floorImage = woodenFloor01;
alBuildingFirstFloorHallwayC.floorImage = woodenFloor01;
alBuildingFirstFloorHallwayD.floorImage = woodenFloor01;

alBuildingMaintenanceA.setNorthRoom(alBuildingMaintenanceB);
alBuildingMaintenanceB.setNorthRoom(alBuildingMaintenanceC);
alBuildingMaintenanceC.setDownRoom(alBuildingBasementA);
alBuildingMaintenanceA.floorImage = woodenFloorDark01;
alBuildingMaintenanceB.floorImage = woodenFloorDark01;
alBuildingMaintenanceC.floorImage = woodenFloorDark01;

ozzyApartmentLivingroom.setSouthRoom(ozzyApartmentBathroom);
ozzyApartmentLivingroom.setEastRoom(ozzyApartmentBedroom);
ozzyApartmentLivingroom.floorImage = woodenFloor01;
ozzyApartmentBathroom.floorImage = checkerLinoleumFloor01;
ozzyApartmentBedroom.floorImage = woodenFloor01;
ozzyApartmentBedroom.rugImage = brownRugCenter01;

weaverApartmentLivingroom.setNorthRoom(weaverApartmentBathroom);
weaverApartmentLivingroom.setEastRoom(weaverApartmentBedroomA);
weaverApartmentLivingroom.setWestRoom(weaverApartmentBedroomB);
weaverApartmentLivingroom.setWalls(0,0,0,0,false);
weaverApartmentBedroomB.setSouthWall(0,false);
weaverApartmentBedroomB.setWestWall(0,false);
weaverApartmentLivingroom.floorImage = woodenFloor01;
weaverApartmentBathroom.floorImage = checkerLinoleumFloor01;
weaverApartmentBedroomA.floorImage = woodenFloor01;
weaverApartmentBedroomB.floorImage = woodenFloor01;

// Al Building, Second Floor
alBuildingSecondFloorHallwayA.setUpRoom(alBuildingThirdFloorHallwayA);
alBuildingSecondFloorHallwayA.setNorthRoom(alBuildingSecondFloorHallwayB);
alBuildingSecondFloorHallwayB.setEastRoom(remmyApartmentLivingroom);
alBuildingSecondFloorHallwayB.setWestRoom(twinsApartmentLivingroomA, {isLocked: true});
alBuildingSecondFloorHallwayB.setNorthRoom(chartyApartmentLivingroom, {isLocked: true});
alBuildingSecondFloorHallwayA.floorImage = woodenFloor01;
alBuildingSecondFloorHallwayB.floorImage = woodenFloor01;
alBuildingSecondFloorHallwayA.rugImage = brownRugNorth01;
alBuildingSecondFloorHallwayB.rugImage = brownRugSouth01;

chartyApartmentLivingroom.setNorthRoom(chartyApartmentBathroom);
chartyApartmentLivingroom.setEastRoom(chartyApartmentBedroomCharlie);
chartyApartmentLivingroom.setWestRoom(chartyApartmentBedroomMarty);
chartyApartmentLivingroom.floorImage = woodenFloor01;
chartyApartmentBathroom.floorImage = checkerLinoleumFloor01;
chartyApartmentBedroomCharlie.floorImage = woodenFloor01;
chartyApartmentBedroomMarty.floorImage = woodenFloor01;
chartyApartmentBedroomCharlie.rugImage = blackRugCenter01;
chartyApartmentBedroomMarty.rugImage = redRugCenter01;

remmyApartmentLivingroom.setSouthRoom(remmyApartmentBathroom);
remmyApartmentLivingroom.setEastRoom(remmyApartmentBedroom);
remmyApartmentLivingroom.floorImage = woodenFloor01;
remmyApartmentBathroom.floorImage = checkerLinoleumFloor01;
remmyApartmentBedroom.floorImage = woodenFloor01;
remmyApartmentLivingroom.rugImage = greyRugCenter01;

twinsApartmentLivingroomA.setSouthRoom(twinsApartmentBathroom);
twinsApartmentLivingroomA.setWestRoom(twinsApartmentLivingroomB);
twinsApartmentLivingroomB.setSouthRoom(twinsApartmentBedroomAnneke);
twinsApartmentLivingroomB.setNorthRoom(twinsApartmentBedroomWolter);
twinsApartmentLivingroomA.floorImage = woodenFloor01;
twinsApartmentLivingroomB.floorImage = woodenFloor01;
twinsApartmentBathroom.floorImage = checkerLinoleumFloor01;
twinsApartmentBedroomAnneke.floorImage = woodenFloor01;
twinsApartmentBedroomWolter.floorImage = woodenFloor01;

// Al Building, Third Floor
alBuildingThirdFloorHallwayA.setNorthRoom(alBuildingThirdFloorHallwayB);
alBuildingThirdFloorHallwayB.setEastRoom(alApartmentLivingroom, {isLocked: true});
alBuildingThirdFloorHallwayB.setWestRoom(avoApartmentLivingroomA, {isLocked: true});
alBuildingThirdFloorHallwayA.floorImage = woodenFloor01;
alBuildingThirdFloorHallwayB.floorImage = woodenFloor01;
alBuildingThirdFloorHallwayA.rugImage = brownRugNorth01;
alBuildingThirdFloorHallwayB.rugImage = brownRugSouth01;

alApartmentLivingroom.setSouthRoom(alApartmentBathroom);
alApartmentLivingroom.setEastRoom(alApartmentBedroom);
alApartmentLivingroom.floorImage = woodenFloor01;
alApartmentBathroom.floorImage = checkerLinoleumFloor01;
alApartmentBedroom.floorImage = woodenFloor01;
alApartmentLivingroom.rugImage = greyRugCenter01;
alApartmentBedroom.rugImage = greyRugCenter01;

avoApartmentLivingroomA.setSouthRoom(avoApartmentBathroom);
avoApartmentLivingroomA.setWestRoom(avoApartmentLivingroomB);
avoApartmentLivingroomB.setSouthRoom(avoApartmentBedroomAvo);
avoApartmentLivingroomB.setNorthRoom(avoApartmentBedroomSon);
avoApartmentLivingroomA.floorImage = woodenFloor01;
avoApartmentLivingroomB.floorImage = woodenFloor01;
avoApartmentBathroom.floorImage = checkerLinoleumFloor01;
avoApartmentBedroomAvo.floorImage = woodenFloor01;
avoApartmentBedroomSon.floorImage = woodenFloor01;
avoApartmentLivingroomA.rugImage = blackRugWest01;
avoApartmentLivingroomB.rugImage = blackRugEast01;
avoApartmentBedroomAvo.rugImage = blackRugCenter01;

// Al Building, Roof

// Furniture to Room
remmyApartmentBathroom.addFurniture(remmyApartmentBathroomTub);
remmyApartmentBathroom.addFurniture(remmyApartmentBathroomSink);
remmyApartmentBathroom.addFurniture(remmyApartmentBathroomToilet);
remmyApartmentBathroom.addFurniture(remmyApartmentBathroomMirror);
remmyApartmentBathroom.addFurniture(remmyApartmentBathroomCabinet);

remmyApartmentBedroom.addFurniture(remmyApartmentBedroomBed);
remmyApartmentBedroom.addFurniture(remmyApartmentBedroomBureau);
remmyApartmentBedroom.addFurniture(remmyApartmentBedroomHamper);

remmyApartmentLivingroom.addFurniture(remmyApartmentLivingroomCouch);
remmyApartmentLivingroom.addFurniture(remmyApartmentLivingroomTV);