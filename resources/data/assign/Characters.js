if ((PSDE.debugEnabled)) console.log("Assigning Characters");

al.setAttributes(18,13,16,11,15,11);
al.setLevel(12);
al.setImage("resources/images/characters/Al.png");
al.setEyeColour("blue");
al.setFurColour("alabaster");
al.moveToRoom("alApartmentBedroom");
al.setPhilautia(75);
al.setAgape(50);
al.setDefaultDisposition(0, 5, 0, 0, 5, 0);
al.setCharacterDisposition("betty",        20,   75,  20,   0,  50,  0);
al.setCharacterDisposition("velvet",       100, 100, 100, 100, 100, 25);
al.addPreferredSpecies("wolf");
al.addPreferredSpecies("deer");
al.addSexWith("velvet");

anneke.setAttributes(8,13,10,11,12,12);
anneke.setLevel(3)
anneke.setImage("resources/images/characters/Anneke.svg");
anneke.setEyeColour("dark blue");
anneke.setFurColour("brown");
anneke.moveToRoom("twinsApartmentBedroomAnneke");
anneke.setPhilautia(50);
anneke.setAgape(40);
anneke.setDefaultDisposition(20, 0, 25, 0, 0);
anneke.setCharacterDisposition("remmy",    75, 50, 50, 15,  0, 5);
anneke.setCharacterDisposition("wolter",   20, 80, 80, 25, 100, 5);
anneke.addPreferredSpecies("aardwolf");
anneke.addPreferredSpecies("hyena");
anneke.addPreferredSpecies("fox");
anneke.addAvoidedSpecies("rabbit");
anneke.addAvoidedSpecies("pig");
anneke.setIncestual(25);
anneke.addSexWith("charlie");
anneke.addSexWith("ozzy");
anneke.addSexWith("wolter");
anneke.addSexWith("nickWilde");
anneke.addDated("nickWilde", 1);
anneke.addDated("ozzy", 1);
anneke.addDated("wolter", 1);
anneke.addBiologicalParent("wolekeFather");
anneke.addBiologicalParent("wolekeMother");

avo.setAttributes(12,15,12,13,12,14);
avo.setLevel(8)
avo.setImage("resources/images/characters/Avo.png");
avo.setEyeColour("dark blue");
avo.setFurColour("black");
avo.moveToRoom("avoApartmentBedroomAvo");
avo.setPhilautia(50);
avo.setAgape(75);
avo.addPreferredSpecies("wolf");
avo.addSexWith("betty");
avo.addSexWith("wolter");
avo.addSexWith("nickWilde");
avo.addDated("ozzy", 1);
avo.addDated("marty", 1);
avo.addDated("nick", 1);
avo.addDated("wolter", 3);

betty.setAttributes(17,14,14,13,14,12);
betty.setLevel(12)
betty.setImage("resources/images/characters/Betty.png");
betty.setEyeColour("yellow");
betty.setFurColour("black", "emperor");
betty.moveToRoom("alBuildingFirstFloorHallwayA");
betty.setPhilautia(75);
betty.setAgape(50);
betty.setDefaultDisposition(5, 0, 5, 0, 0);
betty.setCharacterDisposition("al",        20, 75, 20, 0, 50);
betty.setCharacterDisposition("anneke",    10, 75, 75, 0, 75);
betty.setCharacterDisposition("avo",       25, 85, 95, 0, 50);
betty.setCharacterDisposition("charlie",   20, 75, 50, 25, 75);
betty.setCharacterDisposition("marty",     05, 80, 60, 0, 50);
betty.setCharacterDisposition("ozzy",      20, 95, 95, 25, 75);
betty.setCharacterDisposition("pandora",   25, 25, 50, 0, 0);
betty.setCharacterDisposition("remmy",     20, 50, 25, 10, 50);
betty.setCharacterDisposition("velvet",    20, 80, 95, 50, 0);
betty.setCharacterDisposition("wolter",    10, 75, 75, 0, 50);
betty.addPreferredSpecies("sheep");
betty.addPreferredSpecies("wolf");
betty.addDated("velvet", 1);

charlie.setAttributes(10,18,10,30,24,8);
charlie.setLevel(20)
charlie.setImage("resources/images/characters/Charlie.svg");
charlie.setEyes("slit");
charlie.setEyeColour("light blue");
charlie.setFurColour("cream");
charlie.moveToRoom("remmyApartmentLivingroom");
charlie.setPhilautia(25);
charlie.setAgape(25);
charlie.setManaMax(100);
charlie.setMana(100);
charlie.setSanity(101);
charlie.setDefaultDisposition(5, 0, 10, 0, 0);
charlie.setCharacterDisposition("al",      10, 50, 25, 0, 0, 0);
charlie.setCharacterDisposition("anneke",  0, 50, 75, 0, 0, 0);
charlie.setCharacterDisposition("avo",     0, 50, 50, 0, 0, 0);
charlie.setCharacterDisposition("betty",   15, 75, 75, 2, 25, 5);
charlie.setCharacterDisposition("marty",   25, 50, 50, 0, 15, 0);
charlie.setCharacterDisposition("nick",	 75, 25, 25, 10, 15, 5);
charlie.setCharacterDisposition("ozzy",    0, 50, 75, 0, 25, 0);
charlie.setCharacterDisposition("pandora", 15, 75, 50, 2, 25, 5);
charlie.setCharacterDisposition("remmy",   75, 55, 50, 0, 0, 15);
charlie.setCharacterDisposition("wolter",  25, 50, 50, 0, 15, 0);
charlie.setCharacterDisposition("velvet",  0, 50, 75, 0, 0, 0);
charlie.addAvoidedSpecies("fox");
charlie.addSexWith("wolter");
charlie.addSexWith("nickWilde");
charlie.addDated("ozzy", 1);
charlie.addDated("marty", 1);
charlie.addDated("nickWilde", 1);
charlie.addDated("wolter", 2);

martina.setAttributes(8,10,10,17,14,15).setLevel(7).setImage("resources/images/characters/Martina.svg").moveToRoom("chartyApartmentBedroomMarty").addSexWith("ozzy", true).addDated("ozzy", 1);
marty.setAttributes(10,12,10,17,15,10).setLevel(7).setImage("resources/images/characters/Marty.svg").moveToRoom("chartyApartmentBedroomMarty");

ozzy.setAttributes(14,11,12,11,10,14);
ozzy.setLevel(11)
ozzy.setImage("resources/images/characters/Ozzy.png");
ozzy.setEyes("circle");
ozzy.setEyeColour("orange");
ozzy.setFurColour("dirty brown");
ozzy.setFurColourAHex("#bb8517");
ozzy.moveToRoom("ozzyApartmentBathroom");
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

pandora.setAttributes(16,16,16,13,13,16);
pandora.setLevel(15);
pandora.setImage("resources/images/characters/Pandora.svg");
pandora.setEyes("slit");
pandora.setEyeColour("green");
pandora.setFurColour("orange","black");
pandora.moveToRoom("pandorasBoxBasementHiddenBedroom");
pandora.setPhilautia(60);
pandora.setAgape(80);
pandora.setDefaultDisposition(25, 50, 40, 5, 0);
pandora.setCharacterDisposition("charlie", 25, 50, 50, 0, 25, 0);
pandora.addPreferredSpecies("tiger");
pandora.addPreferredSpecies("wolf");
pandora.addSexWith("nickWilde");
pandora.addDated("nick", 1);
pandora.addDated("remmy", 1, false);

remmy.setAttributes(14,12,12,10,10,8);
remmy.setLevel(6);
remmy.setImage("resources/images/characters/RemmySheared.svg");
remmy.setEyes("rectangle");
remmy.setEyeColour("orange");
remmy.setFurColourA("white");
remmy.setFurColourAHex("#8a7d72");
remmy.moveToRoom("remmyApartmentBedroom");
remmy.setPhilautia(50);
remmy.setAgape(70);
remmy.setDefaultDisposition(15, 0, 15, 0, 0, 0);
remmy.setCharacterDisposition("anneke",    75, 50, 50, 15,  0, 5);
remmy.setCharacterDisposition("betty",     40, 40, 25, 10, 40, 0);
remmy.setCharacterDisposition("charlie",   50, 25, 25,  5,  0, 0);
remmy.setCharacterDisposition("wolter",    25, 55, 55,  0,  0, 0);
remmy.addPreferredSpecies("sheep");
remmy.addPreferredSpecies("fox");
remmy.addPreferredSpecies("wolf");
remmy.setPenisSize(24);
remmy.setPenisGirth(16);
remmy.setPrefersPredators(true);

tellerMicely.setImage("resources/images/characters/tellerMicely.png").moveToRoom("zootopiaCreditUnion44thEntrance").addPreferredSpecies("stoat");

velvet.setAttributes(10,15,11,15,15,14);
velvet.setLevel(10);
velvet.setImage("resources/images/characters/Velvet.png");
velvet.setEyeColour("brown");
velvet.moveToRoom("alApartmentBedroom");
velvet.setPhilautia(80);
velvet.setAgape(50);
velvet.setCharacterDisposition(al,       100, 100, 100, 100, 100, 15);
velvet.addPreferredSpecies("deer");
velvet.addPreferredSpecies("hyena");
velvet.addPreferredSpecies("wolf");
velvet.addDated("al", 2);

weaver.setImage("resources/images/characters/RedWeaver.png").setEyeColour("red").moveToRoom("weaverApartmentLivingroom");

wolter.setAttributes(9,12,11,11,12,11);
wolter.setLevel(3);
wolter.setImage("resources/images/characters/Wolter.svg");
wolter.setEyeColour("dark blue");
wolter.setFurColour("brown");
wolter.moveToRoom("remmyApartmentLivingroom");
wolter.setPhilautia(50);
wolter.setAgape(50);
wolter.setCharacterDisposition("anneke",   40, 75, 75, 25, 100, 10);
wolter.setCharacterDisposition("charlie",  35, 60, 60, 0, 15, 0);
wolter.setCharacterDisposition("remmy",    20, 55, 55,  0,  0, 0);
wolter.setDefaultDisposition(20, 0, 25, 0, 0);
wolter.addPreferredSpecies("aardwolf");
wolter.addPreferredSpecies("fox");
wolter.addPreferredSpecies("rabbit");
wolter.addPreferredSpecies("wolf");
wolter.addAvoidedSpecies("pig");
wolter.setIncestual(25);
wolter.addBiologicalParent("wolekeFather");
wolter.addBiologicalParent("wolekeMother");

PSDE.getCharacterByID("cottonHopps").setAttributes(10,10,10,10,10,10).setLevel(1).setImage("resources/images/characters/Cotton.png").moveToRoom("limbo").addPreferredSpecies("fox").addPreferredSpecies("rabbit").addBiologicalParent("stuHopps").addBiologicalParent("bonnieHopps");
PSDE.getCharacterByID("judyHopps").setAttributes(16,16,13,15,14,12).setLevel(13).moveToRoom("limbo").addPreferredSpecies("fox").addPreferredSpecies("rabbit").addSexWith("nickWilde").addFiance("nickWilde").addDating("nickWilde").addBiologicalParent("stuHopps").addBiologicalParent("bonnieHopps");
PSDE.getCharacterByID("violetHopps").setAttributes(10,12,16,17,16,15).setLevel(13).moveToRoom("limbo").addPreferredSpecies("fox").addPreferredSpecies("rabbit").addBiologicalParent("stuHopps").addBiologicalParent("bonnieHopps");
PSDE.getCharacterByID("bonnieHopps").setAttributes(15,15,15,17,13,13).setLevel(15).moveToRoom("limbo").addPreferredSpecies("fox").addPreferredSpecies("rabbit");
PSDE.getCharacterByID("stuHopps").setAttributes(16,15,15,17,12,12).setLevel(14).moveToRoom("limbo").addPreferredSpecies("fox").addPreferredSpecies("rabbit").addSexWith("bonnieHopps").addSpouse("bonnieHopps").addBiologicalParent("ottoHopps");
PSDE.getCharacterByID("rosieReynard").setAttributes(6,14,11,11,8,12).setLevel(1).setImage("resources/images/characters/Rosie.png").setEyeColour("lightblue").setFurColour("red","cream").moveToRoom("alBuildingBasementG").setPhilautia(25).setAgape(50).setDefaultDisposition(0, 25, 25, 0, 15, 0).addPreferredSpecies("fox").addPreferredSpecies("wolf").addBiologicalParent("nickWilde");
PSDE.getCharacterByID("nickWilde").setAttributes(15,16,13,30,30,17).setLevel(20).moveToRoom("limbo").addPreferredSpecies("fox").addPreferredSpecies("rabbit").addBiologicalParent("vivianWilde").addBiologicalParent("johnWilde");
PSDE.getCharacterByID("beckyWilde").setAttributes(13,15,11,12,11,11).setLevel(13).moveToRoom("limbo").addPreferredSpecies("fox").addSexWith("nickWilde").addBiologicalParent("vivianWilde").addBiologicalParent("nickWilde");
PSDE.getCharacterByID("johnWilde").moveToRoom("limbo").addPreferredSpecies("fox").addSpouse("vivianWilde");
PSDE.getCharacterByID("vivianWilde").moveToRoom("limbo").addPreferredSpecies("fox").addSexWith("nickWilde");

// Assign Clothes to Characters
anneke.wear("blouseBlue");
anneke.wear("pantiesBlue");
charlie.wear("tshirtWhiteMelesMeles");
charlie.wear("pantiesPink");
charlie.wear("pantsGrey");
remmy.wear("tanktopWhite");
remmy.wear("cargopantsTan");
PSDE.getCharacterByID("rosieReynard").wear("shirtPatchy").wear("pantsPatchy");
wolter.wear("shirtGreen");
wolter.wear("pantsDenimBlue");

// Assign Items to Characters
al.addItem("alApartmentLocationKey");
anneke.addItem("twinsApartmentLocationKey");
avo.addItem("pandorasBoxLocationKey");
avo.addItem("avoApartmentLocationKey");
betty.addItem("alBuildingLocationKey");
betty.addItem("bettyBuildingLocationKey");
betty.addItem("bettyApartmentLocationKey");
betty.addItem("masterKey");
betty.addItem(new ItemInstance(undefined, "straponHorseBlack", "betty", 45, 2, 90, 100));
charlie.addItem("chartyApartmentLocationKey");
charlie.addItem(new ItemInstance(undefined, "charlieBeatingHeart", "charlie", 80, 0.08, Number.MAX_VALUE, Number.MAX_VALUE));
charlie.addItem(new ItemInstance(undefined, "charlieLeftEye", "charlie", 30, 0.003, Number.MAX_VALUE, Number.MAX_VALUE));
marty.addItem("chartyApartmentLocationKey");
ozzy.addItem("ozzyApartmentLocationKey");
pandora.addItem("pandorasBoxLocationKey");
remmy.addItem("remmyApartmentLocationKey");
remmy.addItem(new Cheque("pandora", "remmy", 100, "For rigorously testing products.", true));
velvet.addItem("alApartmentLocationKey");
wolter.addItem("twinsApartmentLocationKey");

// Assign held Items to Characters
anneke.hold(new ItemInstance(undefined, "dildoCanineRed", "anneke", 20, 0.8, 90, 100));
charlie.hold(new ItemInstance(undefined, "charliePalmMirror", "charlie", 1, 0.005, Number.MAX_VALUE, Number.MAX_VALUE));

// Assign Phones to Characters
remmy.addItem("remmyPhone");
wolter.addItem("wolterPhone");

// Make the Characters do something
anneke.lay("twinsApartmentBedroomAnnekeBed");
anneke.masturbate();
wolter.sleep("remmyApartmentLivingroomCouch");
charlie.sit("remmyApartmentLivingroomCouch");
pandora.lay("pandorasBoxBasementHiddenBedroomBed");
remmy.lay("remmyApartmentBedroomBed");
al.fuck("velvet", "alApartmentBedroomBed");
