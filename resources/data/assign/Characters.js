if (debug) console.log("Assigning Characters");

al.image = "resources/images/characters/Al.png";
al.setEyeColour("blue");
al.setFurColour("alabaster");
al.moveTo(alApartmentBedroom);
al.setPhilautia(75);
al.setAgape(50);
al.setDefaultDisposition(0, 5, 0, 0, 5, 0);
al.setCharacterDisposition(betty,        20,   75,  20,   0,  50,  0);
al.setCharacterDisposition(velvet,       100, 100, 100, 100, 100, 25);
al.addPreferredSpecies("wolf");
al.addPreferredSpecies("deer");
al.addSexWith(velvet);

anneke.image = "resources/images/characters/Anneke.svg";
anneke.setEyeColour("dark blue");
anneke.setFurColour("brown");
anneke.moveTo(twinsApartmentBedroomAnneke);
anneke.setPhilautia(50);
anneke.setAgape(40);
anneke.setDefaultDisposition(20, 0, 25, 0, 0);
anneke.setCharacterDisposition(remmy,    75, 50, 50, 15,  0, 5);
anneke.setCharacterDisposition(wolter,   20, 80, 80, 25, 100, 5);
anneke.addPreferredSpecies("aardwolf");
anneke.addPreferredSpecies("hyena");
anneke.addPreferredSpecies("fox");
anneke.addAvoidedSpecies("rabbit");
anneke.addAvoidedSpecies("pig");
anneke.setIncestual(25);
anneke.addRelative(wolter);
anneke.addSexWith(charlie);
anneke.addSexWith(ozzy);
anneke.addSexWith(wolter);
anneke.addSexWith(nick);
anneke.dated(nick, 1);
anneke.dated(ozzy, 1);
anneke.dated(wolter, 1);

avo.image = "resources/images/characters/Avo.png";
avo.setEyeColour("dark blue");
avo.setFurColour("black");
avo.moveTo(avoApartmentBedroomAvo);
avo.setPhilautia(50);
avo.setAgape(75);
avo.addPreferredSpecies("wolf");
avo.addSexWith(betty);
avo.addSexWith(wolter);
avo.addSexWith(nick);
avo.dated(ozzy, 1);
avo.dated(marty, 1);
avo.dated(nick, 1);
avo.dated(wolter, 3);

betty.image = "resources/images/characters/Betty.png";
betty.setEyeColour("yellow");
betty.setFurColour("black", "emperor");
betty.moveTo(alBuildingFirstFloorHallwayA);
betty.setPhilautia(75);
betty.setAgape(50);
betty.setDefaultDisposition(5, 0, 5, 0, 0);
betty.setCharacterDisposition(al,        20, 75, 20, 0, 50);
betty.setCharacterDisposition(anneke,    10, 75, 75, 0, 75);
betty.setCharacterDisposition(avo,       25, 85, 95, 0, 50);
betty.setCharacterDisposition(charlie,   20, 75, 50, 25, 75);
betty.setCharacterDisposition(marty,     05, 80, 60, 0, 50);
betty.setCharacterDisposition(ozzy,      20, 95, 95, 25, 75);
betty.setCharacterDisposition(pandora,   25, 25, 50, 0, 0);
betty.setCharacterDisposition(remmy,     20, 50, 25, 10, 50);
betty.setCharacterDisposition(velvet,    20, 80, 95, 50, 0);
betty.setCharacterDisposition(wolter,    10, 75, 75, 0, 50);
betty.addPreferredSpecies("sheep");
betty.addPreferredSpecies("wolf");
betty.dated(velvet, 1);

charlie.image = "resources/images/characters/Charlie.svg";
charlie.setEyes("slit");
charlie.setEyeColour("light blue");
charlie.setFurColour("cream");
charlie.moveTo(remmyApartmentLivingroom);
charlie.setPhilautia(25);
charlie.setAgape(25);
charlie.setManaMax(100);
charlie.setMana(100);
charlie.setSanity(101);
charlie.setDefaultDisposition(5, 0, 10, 0, 0);
charlie.setCharacterDisposition(al,      10, 50, 25, 0, 0, 0);
charlie.setCharacterDisposition(anneke,  0, 50, 75, 0, 0, 0);
charlie.setCharacterDisposition(avo,     0, 50, 50, 0, 0, 0);
charlie.setCharacterDisposition(betty,   15, 75, 75, 2, 25, 5);
charlie.setCharacterDisposition(marty,   25, 50, 50, 0, 15, 0);
charlie.setCharacterDisposition(nick,	 75, 25, 25, 10, 15, 5);
charlie.setCharacterDisposition(ozzy,    0, 50, 75, 0, 25, 0);
charlie.setCharacterDisposition(pandora, 15, 75, 50, 2, 25, 5);
charlie.setCharacterDisposition(remmy,   75, 55, 50, 0, 0, 15);
charlie.setCharacterDisposition(wolter,  25, 50, 50, 0, 15, 0);
charlie.setCharacterDisposition(velvet,  0, 50, 75, 0, 0, 0);
charlie.addAvoidedSpecies("fox");
charlie.addSexWith(wolter);
charlie.addSexWith(nick);
charlie.dated(ozzy, 1);
charlie.dated(marty, 1);
charlie.dated(nick, 1);
charlie.dated(wolter, 2);

cotton.image = "resources/images/characters/Cotton.png";
cotton.moveTo(limbo);
cotton.addPreferredSpecies("fox");
cotton.addPreferredSpecies("rabbit");

judy.moveTo(limbo);
judy.addPreferredSpecies("fox");
judy.addPreferredSpecies("rabbit");
judy.addSexWith(nick);
judy.date(nick);

martina.image = "resources/images/characters/Martina.svg";
martina.moveTo(chartyApartmentBedroomMarty);
martina.addSexWith(ozzy, true);
martina.dated(ozzy, 1);

marty.image = "resources/images/characters/Marty.svg";
marty.moveTo(chartyApartmentBedroomMarty);

nick.moveTo(limbo);
nick.addPreferredSpecies("fox");
nick.addPreferredSpecies("rabbit");

ozzy.image = "resources/images/characters/Ozzy.png";
ozzy.setEyes("circle");
ozzy.setEyeColour("orange");
ozzy.furColourA = "dirty brown";
ozzy.furColourAHex = "#bb8517";
ozzy.moveTo(ozzyApartmentBathroom);
ozzy.setPhilautia(75);
ozzy.setAgape(25);
ozzy.setManaMax(15);
ozzy.setSanity(60);
ozzy.setDefaultDisposition(15, 25, 50, 15, 0);
ozzy.addPreferredSpecies("aardwolf");
ozzy.addPreferredSpecies("deer");
ozzy.addPreferredSpecies("hyna");
ozzy.addPreferredSpecies("sheep");
ozzy.addPreferredSpecies("wolf");

pandora.image = "resources/images/characters/Pandora.svg";
pandora.setEyes("slit");
pandora.setEyeColour("green");
pandora.furColourA = "orange";
pandora.furColourB = "black";
pandora.furPattern = 2;
pandora.moveTo(pandorasBoxBasementHiddenBedroom);
pandora.setPhilautia(60);
pandora.setAgape(80);
pandora.setDefaultDisposition(25, 50, 40, 5, 0);
pandora.setCharacterDisposition(charlie, 25, 50, 50, 0, 25, 0);
pandora.addPreferredSpecies("tiger");
pandora.addPreferredSpecies("wolf");
pandora.addSexWith(nick);
pandora.dated(nick, 1);
pandora.dated(remmy, 1, false);

remmy.image = "resources/images/characters/RemmySheared.svg";
remmy.setEyes("rectangle");
remmy.setEyeColour("orange");
remmy.furColourA = "white";
remmy.furColourAHex = "#8a7d72";
remmy.moveTo(remmyApartmentBedroom);
remmy.setPhilautia(50);
remmy.setAgape(70);
remmy.setDefaultDisposition(15, 0, 15, 0, 0, 0);
remmy.setCharacterDisposition(anneke,    75, 50, 50, 15,  0, 5);
remmy.setCharacterDisposition(betty,     40, 40, 25, 10, 40, 0);
remmy.setCharacterDisposition(charlie,   50, 25, 25,  5,  0, 0);
remmy.setCharacterDisposition(wolter,    25, 55, 55,  0,  0, 0);
remmy.addPreferredSpecies("sheep");
remmy.addPreferredSpecies("fox");
remmy.addPreferredSpecies("wolf");
remmy.penisSize = 24;
remmy.penisGirth = 16;
remmy.prefersPredators = true;

rosie.image = "resources/images/characters/Rosie.png";
rosie.setEyeColour("lightblue");
rosie.furColourA = "red";
rosie.furColourB = "cream";
rosie.moveTo(alBuildingBasementG);
rosie.setPhilautia(25);
rosie.setAgape(50);
rosie.setDefaultDisposition(0, 25, 25, 0, 15, 0);  // no :v
rosie.addPreferredSpecies("fox");
rosie.addPreferredSpecies("wolf");

tellerMicely.image = "resources/images/characters/tellerMicely.png";
tellerMicely.moveTo(zootopiaCreditUnion44thEntrance);
tellerMicely.addPreferredSpecies("stoat");

velvet.image = "resources/images/characters/Velvet.png";
velvet.setEyeColour("brown");
velvet.moveTo(alApartmentBedroom);
velvet.setPhilautia(80);
velvet.setAgape(50);
velvet.setCharacterDisposition(al,       100, 100, 100, 100, 100, 15);
velvet.addPreferredSpecies("deer");
velvet.addPreferredSpecies("hyena");
velvet.addPreferredSpecies("wolf");
velvet.dated(al, 2);

weaver.image = "resources/images/characters/RedWeaver.png";
weaver.setEyeColour("red");
weaver.moveTo(weaverApartmentLivingroom);

wolter.image = "resources/images/characters/Wolter.svg";
wolter.setEyeColour("dark blue");
wolter.setFurColour("brown");
wolter.moveTo(remmyApartmentLivingroom);
wolter.setPhilautia(50);
wolter.setAgape(50);
wolter.setCharacterDisposition(anneke,   40, 75, 75, 25, 100, 10);
wolter.setCharacterDisposition(charlie,  35, 60, 60, 0, 15, 0);
wolter.setCharacterDisposition(remmy,    20, 55, 55,  0,  0, 0);
wolter.setDefaultDisposition(20, 0, 25, 0, 0);
wolter.addPreferredSpecies("aardwolf");
wolter.addPreferredSpecies("fox");
wolter.addPreferredSpecies("rabbit");
wolter.addPreferredSpecies("wolf");
wolter.addAvoidedSpecies("pig");
wolter.setIncestual(25);

// Assign Clothes to Characters
anneke.wear(blouseBlue);
anneke.wear(pantiesBlue);
charlie.wear(tshirtWhiteMelesMeles);
charlie.wear(pantiesPink);
charlie.wear(pantsGrey);
remmy.wear(tanktopWhite);
remmy.wear(cargopantsTan);
rosie.wear(shirtPatchy);
rosie.wear(pantsPatchy);
wolter.wear(shirtGreen);
wolter.wear(pantsDenimBlue);

// Assign Items to Characters
al.addItem(alApartmentLocationKey);
anneke.addItem(twinsApartmentLocationKey);
avo.addItem(pandorasBoxLocationKey);
avo.addItem(avoApartmentLocationKey);
betty.addItem(alBuildingLocationKey);
betty.addItem(bettyBuildingLocationKey);
betty.addItem(bettyApartmentLocationKey);
betty.addItem(masterKey);
betty.addItem(new ItemInstance(straponHorseBlack, "betty", 45, 2, 90, 100));
charlie.addItem(chartyApartmentLocationKey);
charlie.addItem(new ItemInstance(charlieBeatingHeart, "charlie", 80, 0.08, Number.MAX_VALUE, Number.MAX_VALUE));
charlie.addItem(new ItemInstance(charlieLeftEye, "charlie", 30, 0.003, Number.MAX_VALUE, Number.MAX_VALUE));
marty.addItem(chartyApartmentLocationKey);
ozzy.addItem(ozzyApartmentLocationKey);
pandora.addItem(pandorasBoxLocationKey);
remmy.addItem(remmyApartmentLocationKey);
remmy.addItem(new Cheque(pandora, remmy, 100, "For rigorously testing products.", true));
velvet.addItem(alApartmentLocationKey);
wolter.addItem(twinsApartmentLocationKey);

// Assign held Items to Characters
anneke.hold(new ItemInstance(dildoCanineRed, "anneke", 20, 0.8, 90, 100));
charlie.hold(new ItemInstance(charliePalmMirror, "charlie", 1, 0.005, Number.MAX_VALUE, Number.MAX_VALUE));

// Assign Phones to Characters
remmy.addItem(remmyPhone);
wolter.addItem(wolterPhone);

// Make the Characters do something
characterLay(anneke, twinsApartmentBedroomAnnekeBed);
characterMasturbate(anneke);
characterSleep(wolter, remmyApartmentLivingroomCouch);
characterSit(charlie, remmyApartmentLivingroomCouch);
characterLay(pandora, pandorasBoxBasementHiddenBedroomBed);
characterLay(remmy, remmyApartmentBedroomBed);
characterSex(al, velvet, alApartmentBedroomBed);