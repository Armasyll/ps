if (debug) console.log("Assigning Characters");

al.sleeping = true;
al.eyeColour = "blue";
al.furColourAHex = "#8d909a";
al.image = "images/characters/Al.png";
al.moveTo(alApartmentBedroom);
al.agape = 75;
al.philautia = 50;
al.setDisposition(velvet,       new Disposition(100, 100, 100, 100, 100, 25));
al.addPreferredSpecies("wolf");
al.addPreferredSpecies("deer");
al.preferredSex = 1;
al.addSexWith(velvet, true);

anneke.sleeping = true;
anneke.eyeColour = "dark blue";
anneke.furColourAHex = "#42342a";
anneke.image = "images/characters/Anneke.svg";
anneke.moveTo(twinsApartmentBedroomAnneke);
anneke.agape = 50;
anneke.philautia = 40;
anneke.setDisposition(wolter,   new Disposition(20, 80, 80, 25, 100, 5));
anneke.defaultDisposition.set(20, 0, 25, 0, 0);
anneke.addPreferredSpecies("aardwolf");
anneke.addPreferredSpecies("hyena");
anneke.addPreferredSpecies("fox");
anneke.addAvoidedSpecies("rabbit");
anneke.addAvoidedSpecies("pig");
anneke.preferredSex = 0;
anneke.incestual = 25;
anneke.addRelative(wolter);
anneke.addSexWith(wolter);
anneke.addSexWith(ozzy);

avo.sleeping = true;
avo.eyeColour = "dark blue";
avo.furColourAHex = "#463a32";
avo.image = "images/characters/Avo.png";
avo.moveTo(avoApartmentBedroomAvo);
avo.agape = 50;
avo.philautia = 75;
avo.addPreferredSpecies("wolf");
avo.preferredSex = 0;
avo.addSexWith(wolter);
avo.addSexWith(betty);

betty.sleeping = true;
betty.image = "images/characters/Betty.png";
betty.eyeColour = "yellow";
betty.furColourA = "black";
betty.furColourAHex = "#525252";
betty.moveTo(alBuildingFirstFloorHallwayA);
betty.agape = 75;
betty.philautia = 50;
betty.defaultDisposition.set(5, 0, 5, 0, 0);
betty.setDisposition(al,        new Disposition(20, 75, 20, 0, 0));
betty.setDisposition(anneke,    new Disposition(10, 75, 75, 0, 75));
betty.setDisposition(avo,       new Disposition(25, 85, 95, 0, 50));
betty.setDisposition(charlie,   new Disposition(20, 75, 50, 25, 75));
betty.setDisposition(marty,     new Disposition(05, 80, 60, 0, 50));
betty.setDisposition(ozzy,      new Disposition(20, 95, 95, 25, 75));
betty.setDisposition(pandora,   new Disposition(25, 25, 50, 0, 0));
betty.setDisposition(remmy,     new Disposition(20, 50, 25, 10, 50));
betty.setDisposition(wolter,    new Disposition(10, 75, 75, 0, 50));
betty.setDisposition(velvet,    new Disposition(20, 80, 95, 50, 0));
betty.addPreferredSpecies("wolf");
betty.addPreferredSpecies("sheep");
betty.preferredSex = 0;

charlie.image = "images/characters/Charlie.svg";
charlie.furColourA = "cream";
charlie.furColourAHex = "#965211";
charlie.furColourB = "white";
charlie.eyeType = 1;
charlie.eyeColour = "blue";
charlie.moveTo(remmyApartmentLivingroom);
charlie.agape = 25;
charlie.philautia = 25;
charlie.defaultDisposition.set(5, 0, 10, 0, 0);
charlie.setDisposition(al,      new Disposition(10, 50, 25, 0, 0, 0));
charlie.setDisposition(anneke,  new Disposition(0, 50, 75, 0, 0, 0));
charlie.setDisposition(avo,     new Disposition(0, 50, 50, 0, 0, 0));
charlie.setDisposition(betty,   new Disposition(15, 75, 75, 15, 25, 5));
charlie.setDisposition(marty,   new Disposition(25, 50, 50, 0, 15, 5));
charlie.setDisposition(ozzy,    new Disposition(0, 50, 75, 0, 25, 0));
charlie.setDisposition(pandora, new Disposition(15, 75, 50, 15, 25, 5));
charlie.setDisposition(remmy,   new Disposition(75, 50, 50, 25, 0, 50));
charlie.setDisposition(wolter,  new Disposition(25, 50, 50, 0, 15, 0));
charlie.setDisposition(velvet,  new Disposition(0, 50, 75, 0, 0, 0));
charlie.addAvoidedSpecies("fox");
charlie.preferredSex = 0;
charlie.addSexWith(wolter);

cotton.sleeping = true;
cotton.image = "images/characters/Cotton.png";
cotton.moveTo(limbo);
cotton.addPreferredSpecies("rabbit");
cotton.addPreferredSpecies("fox");

martina.sleeping = true;
martina.image = "images/characters/Martina.svg";
martina.moveTo(chartyApartmentBedroomMarty);
martina.preferredSex = 0;
martina.addSexWith(ozzy, true);

marty.sleeping = true;
marty.image = "images/characters/Marty.svg";
marty.moveTo(chartyApartmentBedroomMarty);
marty.preferredSex = 1;

ozzy.sleeping = true;
ozzy.image = "images/characters/Ozzy.png";
ozzy.eyeType = 0;
ozzy.eyeColour = "orange";
ozzy.furColourA = "dirty brown";
ozzy.furColourAHex = "#bb8517";
ozzy.moveTo(ozzyApartmentBathroom);
ozzy.agape = 75;
ozzy.philautia = 25;
ozzy.defaultDisposition.set(15, 25, 50, 15, 0);
ozzy.addPreferredSpecies("hyna");
ozzy.addPreferredSpecies("aardwolf");
ozzy.addPreferredSpecies("wolf");
ozzy.addPreferredSpecies("deer");
ozzy.addPreferredSpecies("sheep");
ozzy.preferredSex = 1;

pandora.sleeping = true;
pandora.image = "images/characters/Pandora.svg";
pandora.eyeType = 1;
pandora.eyeColour = "";
pandora.furColourA = "orange";
pandora.furColourB = "black";
pandora.furPattern = 2;
pandora.moveTo(pandorasBoxBasementHiddenBedroom);
pandora.agape = 60;
pandora.philautia = 80;
pandora.setDisposition(charlie, 25, 50, 50, 0, 25, 0);
pandora.defaultDisposition.set(25, 50, 40, 5, 0);
pandora.addPreferredSpecies("tiger");
pandora.addPreferredSpecies("wolf");
pandora.preferredSex = 0;

remmy.image = "images/characters/RemmySheared.svg";
remmy.eyeType = 2;
remmy.eyeColour = "orange";
remmy.furColourA = "white";
remmy.furColourAHex = "#8a7d72";
remmy.moveTo(remmyApartmentBedroom);
remmy.agape = 50;
remmy.philautia = 70;
remmy.defaultDisposition.set(15, 0, 15, 0, 0);
remmy.setDisposition(charlie,   new Disposition(15, 75, 50, 15, 0));
remmy.addPreferredSpecies("sheep");
remmy.addPreferredSpecies("wolf");
remmy.addPreferredSpecies("fox");
remmy.preferredSex = 1;
remmy.prefersPredators = true;

rosie.sleeping = true;
rosie.image = "images/characters/Rosie.png";
rosie.eyeColour = "blue";
rosie.furColourA = "red";
rosie.furColourB = "cream";
rosie.moveTo(alBuildingBasementG);
rosie.agape = 25;
rosie.philautia = 50;
rosie.defaultDisposition.set(0, 25, 25, 0, 15, 0);  // no :v
rosie.addPreferredSpecies("fox");
rosie.addPreferredSpecies("wolf");

velvet.sleeping = true;
velvet.eyeColour = "brown";
velvet.image = "images/characters/Velvet.png";
velvet.moveTo(alApartmentBedroom);
velvet.agape = 80;
velvet.philautia = 50;
velvet.setDisposition(al,       new Disposition(100, 100, 100, 100, 100, 15));
velvet.addPreferredSpecies("deer");
velvet.addPreferredSpecies("wolf");
velvet.addPreferredSpecies("hyena");
velvet.preferredSex = 0;

weaver.sleeping = true;
weaver.eyeColour = "red";
weaver.image = "images/characters/RedWeaver.png";
weaver.moveTo(weaverApartmentLivingroom);
weaver.preferredSex = 0;

wolter.sleeping = true;
wolter.eyeColour = "dark blue";
wolter.furColourAHex = "#42342a";
wolter.image = "images/characters/Wolter.svg";
wolter.moveTo(remmyApartmentLivingroom);
wolter.agape = 50;
wolter.philautia = 50;
wolter.setDisposition(anneke,   new Disposition(40, 75, 75, 25, 100, 10));
wolter.setDisposition(charlie,  new Disposition(35, 60, 60, 0, 15, 0));
wolter.defaultDisposition.set(20, 0, 25, 0, 0);
wolter.addPreferredSpecies("aardwolf");
wolter.addPreferredSpecies("rabbit");
wolter.addPreferredSpecies("wolf");
wolter.addPreferredSpecies("fox");
wolter.addAvoidedSpecies("pig");
wolter.preferredSex = 1;
wolter.incestual = 25;

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
marty.addItem(chartyApartmentLocationKey);
ozzy.addItem(ozzyApartmentLocationKey);
pandora.addItem(pandorasBoxLocationKey);
remmy.addItem(remmyApartmentLocationKey);
velvet.addItem(alApartmentLocationKey);
wolter.addItem(twinsApartmentLocationKey);

characterSleep(wolter, remmyApartmentLivingroomCouch);
characterSit(charlie, remmyApartmentLivingroomCouch);
characterLay(pandora, pandorasBoxBasementHiddenBed);
characterSex(al, velvet, alApartmentBedroomBed);