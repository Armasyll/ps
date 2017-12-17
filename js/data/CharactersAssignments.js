if (debug) console.log("Assigning Characters");

al.setEyeColour("blue");
al.setFurColour("alabaster");
al.image = "images/characters/Al.png";
al.moveTo(alApartmentBedroom);
al.setPhilautia(75);
al.setAgape(50);
al.setDefaultDisposition(0, 5, 0, 0, 5, 0);
al.setCharacterDisposition(betty,        new Disposition(20,   75,  20,   0,  50,  0));
al.setCharacterDisposition(velvet,       new Disposition(100, 100, 100, 100, 100, 25));
al.addPreferredSpecies("wolf");
al.addPreferredSpecies("deer");
al.addSexWith(velvet);

anneke.setEyeColour("dark blue");
anneke.setFurColour("brown");
anneke.image = "images/characters/Anneke.svg";
anneke.moveTo(twinsApartmentBedroomAnneke);
anneke.setPhilautia(50);
anneke.setAgape(40);
anneke.setDefaultDisposition(20, 0, 25, 0, 0);
anneke.setCharacterDisposition(remmy,    new Disposition(75, 50, 50, 15,  0, 5));
anneke.setCharacterDisposition(wolter,   new Disposition(20, 80, 80, 25, 100, 5));
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

avo.setEyeColour("dark blue");
avo.setFurColour("black");
avo.image = "images/characters/Avo.png";
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

betty.image = "images/characters/Betty.png";
betty.setEyeColour("yellow");
betty.setFurColour("black", "emperor");
betty.moveTo(alBuildingFirstFloorHallwayA);
betty.setPhilautia(75);
betty.setAgape(50);
betty.setDefaultDisposition(5, 0, 5, 0, 0);
betty.setCharacterDisposition(al,        new Disposition(20, 75, 20, 0, 50));
betty.setCharacterDisposition(anneke,    new Disposition(10, 75, 75, 0, 75));
betty.setCharacterDisposition(avo,       new Disposition(25, 85, 95, 0, 50));
betty.setCharacterDisposition(charlie,   new Disposition(20, 75, 50, 25, 75));
betty.setCharacterDisposition(marty,     new Disposition(05, 80, 60, 0, 50));
betty.setCharacterDisposition(ozzy,      new Disposition(20, 95, 95, 25, 75));
betty.setCharacterDisposition(pandora,   new Disposition(25, 25, 50, 0, 0));
betty.setCharacterDisposition(remmy,     new Disposition(20, 50, 25, 10, 50));
betty.setCharacterDisposition(velvet,    new Disposition(20, 80, 95, 50, 0));
betty.setCharacterDisposition(wolter,    new Disposition(10, 75, 75, 0, 50));
betty.addPreferredSpecies("sheep");
betty.addPreferredSpecies("wolf");
betty.dated(velvet, 1);

charlie.image = "images/characters/Charlie.svg";
charlie.setEyes("slit");
charlie.setEyeColour("light blue");
charlie.setFurColour("cream");
charlie.moveTo(remmyApartmentLivingroom);
charlie.setPhilautia(25);
charlie.setAgape(25);
charlie.setManaMax(100);
charlie.setMana(100);
charlie.setDefaultDisposition(5, 0, 10, 0, 0);
charlie.setCharacterDisposition(al,      new Disposition(10, 50, 25, 0, 0, 0));
charlie.setCharacterDisposition(anneke,  new Disposition(0, 50, 75, 0, 0, 0));
charlie.setCharacterDisposition(avo,     new Disposition(0, 50, 50, 0, 0, 0));
charlie.setCharacterDisposition(betty,   new Disposition(15, 75, 75, 2, 25, 5));
charlie.setCharacterDisposition(marty,   new Disposition(25, 50, 50, 0, 15, 0));
charlie.setCharacterDisposition(nick,	 new Disposition(75, 25, 25, 10, 15, 5));
charlie.setCharacterDisposition(ozzy,    new Disposition(0, 50, 75, 0, 25, 0));
charlie.setCharacterDisposition(pandora, new Disposition(15, 75, 50, 2, 25, 5));
charlie.setCharacterDisposition(remmy,   new Disposition(50, 50, 50, 0, 0, 0));
charlie.setCharacterDisposition(wolter,  new Disposition(25, 50, 50, 0, 15, 0));
charlie.setCharacterDisposition(velvet,  new Disposition(0, 50, 75, 0, 0, 0));
charlie.addAvoidedSpecies("fox");
charlie.addSexWith(wolter);
charlie.addSexWith(nick);
charlie.dated(ozzy, 1);
charlie.dated(marty, 1);
charlie.dated(nick, 1);
charlie.dated(wolter, 2);

cotton.image = "images/characters/Cotton.png";
cotton.moveTo(limbo);
cotton.addPreferredSpecies("fox");
cotton.addPreferredSpecies("rabbit");

judy.addSexWith(nick);
judy.date(nick);

martina.image = "images/characters/Martina.svg";
martina.moveTo(chartyApartmentBedroomMarty);
martina.addSexWith(ozzy, true);
martina.dated(ozzy, 1);

marty.image = "images/characters/Marty.svg";
marty.moveTo(chartyApartmentBedroomMarty);

ozzy.image = "images/characters/Ozzy.png";
ozzy.setEyes("circle");
ozzy.setEyeColour("orange");
ozzy.furColourA = "dirty brown";
ozzy.furColourAHex = "#bb8517";
ozzy.moveTo(ozzyApartmentBathroom);
ozzy.setPhilautia(75);
ozzy.setAgape(25);
ozzy.setDefaultDisposition(15, 25, 50, 15, 0);
ozzy.addPreferredSpecies("aardwolf");
ozzy.addPreferredSpecies("deer");
ozzy.addPreferredSpecies("hyna");
ozzy.addPreferredSpecies("sheep");
ozzy.addPreferredSpecies("wolf");

pandora.image = "images/characters/Pandora.svg";
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

remmy.image = "images/characters/RemmySheared.svg";
remmy.setEyes("rectangle");
remmy.setEyeColour("orange");
remmy.furColourA = "white";
remmy.furColourAHex = "#8a7d72";
remmy.moveTo(remmyApartmentBedroom);
remmy.setPhilautia(50);
remmy.setAgape(70);
remmy.setDefaultDisposition(15, 0, 15, 0, 0, 0);
remmy.setCharacterDisposition(anneke,    new Disposition(75, 50, 50, 15,  0, 5));
remmy.setCharacterDisposition(betty,     new Disposition(40, 40, 25, 10, 40, 0));
remmy.setCharacterDisposition(charlie,   new Disposition(50, 25, 25,  5,  0, 0));
remmy.setCharacterDisposition(wolter,    new Disposition(25, 55, 55,  0,  0, 0));
remmy.addPreferredSpecies("sheep");
remmy.addPreferredSpecies("fox");
remmy.addPreferredSpecies("wolf");
remmy.penisSize = 24;
remmy.penisGirth = 16;
remmy.prefersPredators = true;

rosie.image = "images/characters/Rosie.png";
rosie.setEyeColour("lightblue");
rosie.furColourA = "red";
rosie.furColourB = "cream";
rosie.moveTo(alBuildingBasementG);
rosie.setPhilautia(25);
rosie.setAgape(50);
rosie.setDefaultDisposition(0, 25, 25, 0, 15, 0);  // no :v
rosie.addPreferredSpecies("fox");
rosie.addPreferredSpecies("wolf");

velvet.setEyeColour("brown");
velvet.image = "images/characters/Velvet.png";
velvet.moveTo(alApartmentBedroom);
velvet.setPhilautia(80);
velvet.setAgape(50);
velvet.setCharacterDisposition(al,       new Disposition(100, 100, 100, 100, 100, 15));
velvet.addPreferredSpecies("deer");
velvet.addPreferredSpecies("hyena");
velvet.addPreferredSpecies("wolf");
velvet.dated(al, 2);

weaver.setEyeColour("red");
weaver.image = "images/characters/RedWeaver.png";
weaver.moveTo(weaverApartmentLivingroom);

wolter.setEyeColour("dark blue");
wolter.setFurColour("brown");
wolter.image = "images/characters/Wolter.svg";
wolter.moveTo(remmyApartmentLivingroom);
wolter.setPhilautia(50);
wolter.setAgape(50);
wolter.setCharacterDisposition(anneke,   new Disposition(40, 75, 75, 25, 100, 10));
wolter.setCharacterDisposition(charlie,  new Disposition(35, 60, 60, 0, 15, 0));
wolter.setCharacterDisposition(remmy,    new Disposition(20, 55, 55,  0,  0, 0));
wolter.setDefaultDisposition(20, 0, 25, 0, 0);
wolter.addPreferredSpecies("aardwolf");
wolter.addPreferredSpecies("fox");
wolter.addPreferredSpecies("rabbit");
wolter.addPreferredSpecies("wolf");
wolter.addAvoidedSpecies("pig");
wolter.setIncestual(25);

// Assign Clothes to Characters
charlie.wear(tshirtWhiteMelesMeles);
charlie.wear(pantiesPink);
charlie.wear(pantsGrey);
remmy.wear(tanktopWhite);
remmy.wear(cargopantsTan);
rosie.wear(shirtPatchy);
rosie.wear(pantsPatchy);
wolter.wear(blouseBlue);
wolter.wear(pantiesBlue);

// Assign Items to Characters
al.addItem(alApartmentLocationKey);
anneke.addItem(twinsApartmentLocationKey);
avo.addItem(pandorasBoxLocationKey);
avo.addItem(avoApartmentLocationKey);
betty.addItem(alBuildingLocationKey);
betty.addItem(bettyBuildingLocationKey);
betty.addItem(bettyApartmentLocationKey);
betty.addItem(masterKey);
betty.addItem(straponHorseBlack);
charlie.addItem(chartyApartmentLocationKey);
charlie.addItem(charlieBeatingHeart);
charlie.addItem(charlieLeftEye);
charlie.addItem(charliePalmMirror);
marty.addItem(chartyApartmentLocationKey);
ozzy.addItem(ozzyApartmentLocationKey);
pandora.addItem(pandorasBoxLocationKey);
remmy.addItem(remmyApartmentLocationKey);
velvet.addItem(alApartmentLocationKey);
wolter.addItem(twinsApartmentLocationKey);

// Assign Phones to Characters
remmy.addItem(remmyPhone);
wolter.addItem(wolterPhone);

// Make the Characters do something
characterSleep(anneke, twinsApartmentBedroomAnnekeBed);
characterSleep(wolter, remmyApartmentLivingroomCouch);
characterSit(charlie, remmyApartmentLivingroomCouch);
characterLay(pandora, pandorasBoxBasementHiddenBedroomBed);
characterLay(remmy, remmyApartmentBedroomBed);
characterSex(al, velvet, alApartmentBedroomBed);