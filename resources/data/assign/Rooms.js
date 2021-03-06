if ((PSDE.debugEnabled)) console.log("Assigning Rooms");

PSDE.rooms.get("limbo").setUpRoom(alBuildingBasementF, undefined, false);

// Zootopia, Pack Street
zootopiaPackStreet01.setEastRoom(zootopia42ndStreet06);
zootopiaPackStreet01.setWestRoom(zootopiaPackStreet02);
zootopiaPackStreet02.setWestRoom(zootopiaPackStreet03);
zootopiaPackStreet03.setWestRoom(zootopiaPackStreet04);
zootopiaPackStreet03.setNorthRoom(alBuildingFirstFloorHallwayA);
zootopiaPackStreet04.setWestRoom(zootopiaPackStreet05);
zootopiaPackStreet05.setWestRoom(zootopiaPackStreet06);
zootopiaPackStreet05.setNorthRoom(bettyBuildingFirstFloorHallwayA);
bettyBuildingFirstFloorHallwayA.lock(zootopiaPackStreet05);
zootopiaPackStreet06.setWestRoom(zootopiaPackStreet07);
zootopiaPackStreet07.setWestRoom(zootopiaPackStreet08);
zootopiaPackStreet08.setWestRoom(zootopiaPackStreet09);
zootopiaPackStreet09.setWestRoom(zootopiaPackStreet10);
zootopiaPackStreet10.setWestRoom(zootopia44thStreet06);
zootopiaPackStreet10.setSouthRoom(zootopiaCreditUnion44thEntrance);

// Zootopia, 42nd Street
zootopia42ndStreet06.setNorthRoom(zootopia42ndStreet05);
zootopia42ndStreet05.setNorthRoom(zootopia42ndStreet04);
zootopia42ndStreet05.setEastRoom(bugBurga42ndDiningA);
bugBurga42ndDiningA.lock(zootopia42ndStreet05);
zootopia42ndStreet04.setNorthRoom(zootopia42ndStreet03);
zootopia42ndStreet03.setNorthRoom(zootopia42ndStreet02);
zootopia42ndStreet03.setWestRoom(zootopiaHarryStreet01);
zootopia42ndStreet02.setNorthRoom(zootopia42ndStreet01);
zootopia42ndStreet06.setSouthRoom(zootopia42ndStreet07);
zootopia42ndStreet07.setSouthRoom(zootopia42ndStreet08);
zootopia42ndStreet08.setSouthRoom(zootopia42ndStreet09);
zootopia42ndStreet09.setSouthRoom(zootopia42ndStreet10);
zootopia42ndStreet09.setWestRoom(zootopiaFangStreet01);
zootopia42ndStreet03.floorImage = streetCUpCDownCLeft01;
zootopia42ndStreet06.floorImage = streetCUpCDownCLeft01;
zootopia42ndStreet09.floorImage = streetCUpCDownCLeft01;

// Zootopia, 44th Street
zootopia44thStreet06.setNorthRoom(zootopia44thStreet05);
zootopia44thStreet05.setNorthRoom(zootopia44thStreet04);
zootopia44thStreet04.setNorthRoom(zootopia44thStreet03);
zootopia44thStreet04.setWestRoom(zootopiaPandorasBoxParkingLot);
zootopia44thStreet03.setNorthRoom(zootopia44thStreet02);
zootopia44thStreet02.setNorthRoom(zootopia44thStreet01);
zootopia44thStreet06.setWestRoom(zootopiaExchangeStreet01);
zootopia44thStreet06.setSouthRoom(zootopia44thStreet07);
zootopia44thStreet07.setSouthRoom(zootopia44thStreet08);
zootopia44thStreet07.setEastRoom(zootopiaCreditUnion44thEntrance);
zootopia44thStreet08.setSouthRoom(zootopia44thStreet09);
zootopia44thStreet09.setEastRoom(packStreetHappytownLocksmithsEntrance, {isLocked: true});
zootopia44thStreet09.setSouthRoom(zootopia44thStreet10);
zootopia44thStreet04.floorImage = streetUpDownCLeft01;
zootopia44thStreet06.floorImage = streetCUpCRightCDownCLeft01;

zootopiaPandorasBoxParkingLot.setSouthRoom(pandorasBoxGarageF, {isLocked: true}, false);
zootopiaPandorasBoxParkingLot.floorImage = parkingLotRight01;
zootopiaPandorasBoxParkingLot.setWalls(0);

// Zootopia, Harry Street
zootopiaHarryStreet01.setWestRoom(zootopiaHarryStreet02);
zootopiaHarryStreet01.setSouthRoom(packStreetPublicLibraryEntrance);
packStreetPublicLibraryEntrance.lock(zootopiaHarryStreet01);
zootopiaHarryStreet02.setWestRoom(zootopiaHarryStreet03);
zootopiaHarryStreet03.setWestRoom(zootopiaHarryStreet04);
zootopiaHarryStreet04.setWestRoom(zootopiaHarryStreet05);
zootopiaHarryStreet05.setWestRoom(zootopiaHarryStreet06);
zootopiaHarryStreet06.setWestRoom(zootopiaHarryStreet07);
zootopiaHarryStreet07.setWestRoom(zootopiaHarryStreet08);
zootopiaHarryStreet08.floorImage = streetCRightCap01;

// Zootopia, Fang Street
zootopiaFangStreet01.setWestRoom(zootopiaFangStreet02);
zootopiaFangStreet02.setWestRoom(zootopiaFangStreet03);
zootopiaFangStreet03.setWestRoom(zootopiaFangStreet04);
zootopiaFangStreet04.setWestRoom(zootopiaFangStreet05);
zootopiaFangStreet05.setWestRoom(zootopiaFangStreet06);
zootopiaFangStreet06.setWestRoom(zootopiaFangStreet07);
zootopiaFangStreet07.setWestRoom(zootopiaFangStreet08);
zootopiaFangStreet08.floorImage = streetCRightCap01;

// Zootopia, Exchange Street
zootopiaExchangeStreet01.setNorthRoom(pandorasBoxCheckout);
zootopiaExchangeStreet01.setWestRoom(zootopiaExchangeStreet02);
zootopiaExchangeStreet02.floorImage = streetCRightCap01;

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
alBuildingFirstFloorHallwayC.setNorthRoom(alBuildingMaintenanceA);
alBuildingFirstFloorHallwayB.setWestWall(0,false);
alBuildingFirstFloorHallwayC.setNorthWall(0,false);
alBuildingFirstFloorHallwayC.setWestWall(0,false);
alBuildingFirstFloorHallwayA.floorImage = woodenFloor01;
alBuildingFirstFloorHallwayB.floorImage = woodenFloor01;
alBuildingFirstFloorHallwayC.floorImage = woodenFloor01;

alBuildingMaintenanceA.setWestRoom(alBuildingMaintenanceB);
alBuildingMaintenanceB.setNorthRoom(alBuildingMaintenanceC);
alBuildingMaintenanceB.setSouthRoom(alBuildingMaintenanceD);
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
pandorasBoxFrontA.setNorthRoom(pandorasBoxAisleA1);
pandorasBoxFrontA.setEastRoom(pandorasBoxFrontB);
pandorasBoxFrontB.setNorthRoom(pandorasBoxAisleB1);
pandorasBoxFrontB.setEastRoom(pandorasBoxFrontC);
pandorasBoxFrontC.setNorthRoom(pandorasBoxAisleC1);
pandorasBoxAisleA1.setNorthRoom(pandorasBoxAisleA2);
pandorasBoxAisleA2.setNorthRoom(pandorasBoxAisleA3);
pandorasBoxAisleA3.setNorthRoom(pandorasBoxBackA);
pandorasBoxAisleB1.setNorthRoom(pandorasBoxAisleB2);
pandorasBoxAisleB2.setNorthRoom(pandorasBoxAisleB3);
pandorasBoxAisleB3.setNorthRoom(pandorasBoxBackB);
pandorasBoxAisleC1.setNorthRoom(pandorasBoxAisleC2);
pandorasBoxAisleC2.setNorthRoom(pandorasBoxAisleC3);
pandorasBoxAisleC3.setNorthRoom(pandorasBoxBackC);
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
pandorasBoxBasementF.hide(pandorasBoxBasementHiddenBedroom);
pandorasBoxBasementHiddenBedroom.setWestRoom(pandorasBoxBasementHiddenBathroom);
pandorasBoxCheckout.setSouthWall(1);
pandorasBoxCheckout.rugImage = redRugURD01;
pandorasBoxFrontA.rugImage = redRugURL01;
pandorasBoxFrontB.rugImage = redRugURL01;
pandorasBoxFrontC.rugImage = redRugUL01;
pandorasBoxBackA.rugImage = redRugRD01;
pandorasBoxBackB.rugImage = redRugRDL01;
pandorasBoxBackC.rugImage = redRugDL01;
pandorasBoxAisleA1.rugImage = redRugUpDown01;
pandorasBoxAisleA2.rugImage = redRugUpDown01;
pandorasBoxAisleA3.rugImage = redRugUpDown01;
pandorasBoxAisleB1.rugImage = redRugUpDown01;
pandorasBoxAisleB2.rugImage = redRugUpDown01;
pandorasBoxAisleB3.rugImage = redRugUpDown01;
pandorasBoxAisleC1.rugImage = redRugUpDown01;
pandorasBoxAisleC2.rugImage = redRugUpDown01;
pandorasBoxAisleC3.rugImage = redRugUpDown01;
pandorasBoxGarageF.setEastWall(1);
pandorasBoxBasementF.setNorthWall(3);
pandorasBoxBasementHiddenBedroom.setSouthWall(1,false);
pandorasBoxBasementHiddenBedroom.floorImage = woodenFloorDark01;
pandorasBoxBasementHiddenBedroom.rugImage = redRugCenter01;
pandorasBoxBasementHiddenBathroom.floorImage = checkerLinoleumFloor01;


// bugBurga42nd
bugBurga42ndDiningA.setEastRoom(bugBurga42ndOrderingCounterA);
bugBurga42ndDiningA.setSouthRoom(bugBurga42ndDiningB);
bugBurga42ndDiningB.setEastRoom(bugBurga42ndOrderingCounterB);
bugBurga42ndDiningB.setSouthRoom(bugBurga42ndDiningC);
bugBurga42ndDiningC.setEastRoom(bugBurga42ndDiningD);
bugBurga42ndDiningD.setEastRoom(bugBurga42ndBathroomM);
bugBurga42ndDiningD.setSouthRoom(bugBurga42ndBathroomF);
bugBurga42ndOrderingCounterA.setEastRoom(bugBurga42ndKitchenA);
bugBurga42ndOrderingCounterA.setSouthRoom(bugBurga42ndOrderingCounterB);
bugBurga42ndKitchenA.setEastRoom(bugBurga42ndKitchenB);
bugBurga42ndKitchenB.setSouthRoom(bugBurga42ndBreakRoomA);
bugBurga42ndBreakRoomA.setWestRoom(bugBurga42ndBreakRoomB);


// Furniture to Room
alApartmentBedroom.addFurniture([alApartmentBedroomBed, alApartmentBedroomMirror]);
alApartmentBathroom.addFurniture(alApartmentBathroomMirror);

avoApartmentBedroomAvo.addFurniture(avoApartmentBedroomAvoMirror);
avoApartmentBathroom.addFurniture(avoApartmentBathroomMirror);

chartyApartmentBedroomCharlie.addFurniture(chartyApartmentBedroomCharlieAltar);

remmyApartmentBathroom.addFurniture([remmyApartmentBathroomTub, remmyApartmentBathroomSink, remmyApartmentBathroomToilet, remmyApartmentBathroomMirror, remmyApartmentBathroomCabinet]);
remmyApartmentBedroom.addFurniture([remmyApartmentBedroomBed, remmyApartmentBedroomBureau, remmyApartmentBedroomHamper, remmyApartmentBedroomMirror]);
remmyApartmentLivingroom.addFurniture([remmyApartmentLivingroomCouch, remmyApartmentLivingroomTV, remmyApartmentLivingroomFridge, remmyApartmentLivingroomOven, remmyApartmentLivingroomTable]);

twinsApartmentBedroomWolter.addFurniture(twinsApartmentBedroomWolterBed);
twinsApartmentBedroomAnneke.addFurniture(twinsApartmentBedroomAnnekeBed);
twinsApartmentBathroom.addFurniture(twinsApartmentBathroomMirror);

ozzyApartmentBathroom.addFurniture(ozzyApartmentBathroomMirror);

pandorasBoxCheckout.addFurniture(pandorasBoxCheckoutDesk);
pandorasBoxAisleA1.addFurniture(pandorasBoxAisleA1LeftShelf);
pandorasBoxAisleA1.addFurniture(pandorasBoxAisleA1RightShelf);
pandorasBoxAisleA2.addFurniture(pandorasBoxAisleA2LeftShelf);
pandorasBoxAisleA2.addFurniture(pandorasBoxAisleA2RightShelf);
pandorasBoxAisleA3.addFurniture(pandorasBoxAisleA3LeftShelf);
pandorasBoxAisleA3.addFurniture(pandorasBoxAisleA3RightShelf);
pandorasBoxBasementHiddenBedroom.addFurniture([pandorasBoxBasementHiddenBedroomBed, pandorasBoxBasementHiddenBedroomMirror]);