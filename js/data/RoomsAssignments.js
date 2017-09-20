if (debug) console.log("Assigning Rooms");

// Zootopia, 42nd Street

// Zootopia, Pack Street
zootopiaPackStreet01.setWestRoom(zootopiaPackStreet02);
zootopiaPackStreet02.setWestRoom(zootopiaPackStreet03);
zootopiaPackStreet03.setWestRoom(zootopiaPackStreet04);
zootopiaPackStreet04.setWestRoom(zootopiaPackStreet05);
zootopiaPackStreet05.setWestRoom(zootopiaPackStreet06);
zootopiaPackStreet06.setWestRoom(zootopiaPackStreet07);
zootopiaPackStreet07.setWestRoom(zootopiaPackStreet08);
zootopiaPackStreet08.setWestRoom(zootopiaPackStreet09);
zootopiaPackStreet09.setWestRoom(zootopiaPackStreet10);
zootopiaPackStreet06.setNorthRoom(alBuildingFirstFloorHallwayA);
zootopiaPackStreet08.setNorthRoom(bettyBuildingFirstFloorHallwayA);
zootopiaPackStreet10.setNorthRoom(pandorasBoxCheckout);
zootopiaPackStreet10.setWestRoom(zootopia44thStreet06);

zootopia44thStreet01.setSouthRoom(zootopia44thStreet02);
zootopia44thStreet02.setSouthRoom(zootopia44thStreet03);
zootopia44thStreet03.setSouthRoom(zootopia44thStreet04);
zootopia44thStreet04.setSouthRoom(zootopia44thStreet05);
zootopia44thStreet04.setEastRoom(zootopiaPandorasBoxParkingLot);
zootopia44thStreet05.setSouthRoom(zootopia44thStreet06);
zootopia44thStreet06.setSouthRoom(zootopia44thStreet07);
zootopia44thStreet07.setSouthRoom(zootopia44thStreet08);
zootopia44thStreet08.setSouthRoom(zootopia44thStreet09);
zootopia44thStreet09.setSouthRoom(zootopia44thStreet10);
zootopiaPandorasBoxParkingLot.setSouthRoom(pandorasBoxGarageF, {isLocked: true}, false);

// Zootopia, 44th Street


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
alBuildingBasementA.stairsUpImage = woodenStairsUpRight01;
alBuildingBasementG.rugImage = brownRugCenter01;

// Al Building, First Floor
alBuildingFirstFloorHallwayA.setUpRoom(alBuildingSecondFloorHallwayA);
alBuildingFirstFloorHallwayA.setNorthRoom(alBuildingFirstFloorHallwayB);
alBuildingFirstFloorHallwayA.setWestRoom(alBuildingFirstFloorHallwayC);
//alBuildingFirstFloorHallwayA.setSouthRoom(zootopiaPackStreet06);
alBuildingFirstFloorHallwayB.setNorthRoom(weaverApartmentLivingroom, {isLocked: true});
alBuildingFirstFloorHallwayB.setEastRoom(ozzyApartmentLivingroom, {isLocked: true});
alBuildingFirstFloorHallwayC.setNorthRoom(alBuildingMaintenanceD);
alBuildingFirstFloorHallwayB.setWestWall(0,false);
alBuildingFirstFloorHallwayC.setNorthWall(0,false);
alBuildingFirstFloorHallwayC.setWestWall(0,false);
alBuildingFirstFloorHallwayA.floorImage = woodenFloor01;
alBuildingFirstFloorHallwayB.floorImage = woodenFloor01;
alBuildingFirstFloorHallwayC.floorImage = woodenFloor01;

alBuildingMaintenanceA.setNorthRoom(alBuildingMaintenanceB);
alBuildingMaintenanceB.setNorthRoom(alBuildingMaintenanceC);
alBuildingMaintenanceB.setEastRoom(alBuildingMaintenanceD);
alBuildingMaintenanceC.setDownRoom(alBuildingBasementA);
alBuildingMaintenanceC.stairsDownImage = woodenStairsDownRight01;

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

// pandorasBox
pandorasBoxCheckout.setNorthRoom(pandorasBoxGarageA, {isLocked: true});
pandorasBoxCheckout.setEastRoom(pandorasBoxFrontA);
//pandorasBoxCheckout.setSouthRoom(zootopiaPackStreet10);
pandorasBoxFrontA.setNorthRoom(pandorasBoxIsleA1);
pandorasBoxFrontA.setEastRoom(pandorasBoxFrontB);
pandorasBoxFrontB.setNorthRoom(pandorasBoxIsleB1);
pandorasBoxFrontB.setEastRoom(pandorasBoxFrontC);
pandorasBoxFrontC.setNorthRoom(pandorasBoxIsleC1);
pandorasBoxIsleA1.setNorthRoom(pandorasBoxIsleA2);
pandorasBoxIsleA2.setNorthRoom(pandorasBoxIsleA3);
pandorasBoxIsleA3.setNorthRoom(pandorasBoxBackA);
pandorasBoxIsleB1.setNorthRoom(pandorasBoxIsleB2);
pandorasBoxIsleB2.setNorthRoom(pandorasBoxIsleB3);
pandorasBoxIsleB3.setNorthRoom(pandorasBoxBackB);
pandorasBoxIsleC1.setNorthRoom(pandorasBoxIsleC2);
pandorasBoxIsleC2.setNorthRoom(pandorasBoxIsleC3);
pandorasBoxIsleC3.setNorthRoom(pandorasBoxBackC);
pandorasBoxBackA.setEastRoom(pandorasBoxBackB);
pandorasBoxBackB.setEastRoom(pandorasBoxBackC);
pandorasBoxGarageA.setNorthRoom(pandorasBoxGarageB);
pandorasBoxGarageA.setDownRoom(pandorasBoxBasementA);
pandorasBoxGarageB.setNorthRoom(pandorasBoxGarageC);
pandorasBoxGarageC.setNorthRoom(pandorasBoxGarageD);
pandorasBoxGarageD.setNorthRoom(pandorasBoxGarageE);
pandorasBoxGarageE.setEastRoom(pandorasBoxGarageF);
pandorasBoxGarageF.setEastRoom(zootopiaPandorasBoxParkingLot, {}, false);
pandorasBoxBasementA.setNorthRoom(pandorasBoxBasementB);
pandorasBoxBasementA.setEastRoom(pandorasBoxBasementC);
pandorasBoxBasementB.setEastRoom(pandorasBoxBasementD);
pandorasBoxBasementC.setNorthRoom(pandorasBoxBasementD);
pandorasBoxBasementC.setEastRoom(pandorasBoxBasementE);
pandorasBoxBasementD.setEastRoom(pandorasBoxBasementF);
pandorasBoxBasementE.setNorthRoom(pandorasBoxBasementF);
pandorasBoxBasementF.setNorthRoom(pandorasBoxBasementHiddenBedroom);
pandorasBoxBasementHiddenBedroom.setWestRoom(pandorasBoxBasementHiddenBathroom);
pandorasBoxCheckout.setSouthWall(1);
pandorasBoxCheckout.rugImage = redRugURD01;
pandorasBoxFrontA.rugImage = redRugURL01;
pandorasBoxFrontB.rugImage = redRugURL01;
pandorasBoxFrontC.rugImage = redRugUL01;
pandorasBoxBackA.rugImage = redRugRD01;
pandorasBoxBackB.rugImage = redRugRDL01;
pandorasBoxBackC.rugImage = redRugDL01;
pandorasBoxIsleA1.rugImage = redRugUpDown01;
pandorasBoxIsleA2.rugImage = redRugUpDown01;
pandorasBoxIsleA3.rugImage = redRugUpDown01;
pandorasBoxIsleB1.rugImage = redRugUpDown01;
pandorasBoxIsleB2.rugImage = redRugUpDown01;
pandorasBoxIsleB3.rugImage = redRugUpDown01;
pandorasBoxIsleC1.rugImage = redRugUpDown01;
pandorasBoxIsleC2.rugImage = redRugUpDown01;
pandorasBoxIsleC3.rugImage = redRugUpDown01;
pandorasBoxGarageF.setEastWall(1);
pandorasBoxBasementF.setNorthWall(3);
pandorasBoxBasementHiddenBedroom.isSecret = true;
pandorasBoxBasementHiddenBedroom.setSouthWall(1,false);
pandorasBoxBasementHiddenBedroom.floorImage = woodenFloorDark01;
pandorasBoxBasementHiddenBedroom.rugImage = redRugCenter01;
pandorasBoxBasementHiddenBedroom.addFurniture(pandorasBoxBasementHiddenBed);
pandorasBoxBasementHiddenBathroom.floorImage = checkerLinoleumFloor01;

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