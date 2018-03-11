if (debug) console.log("Initializing Characters");

// var characterId = new Character("characterId", "Last, First name", "Description", "Image path", "Character class", Age, Sex, Species);
//     characterId.setAttributes(Strength, Endurance, Constitution, Intelligence, Wisdom, Charisma);

var remmy = new Character("remmy", "Cormo, Remmy", undefined, undefined, "commoner", 26, "m", "sheep");
	remmy.setAttributes(14,12,12,10,10,8);

var al = new Character("al", "Al", undefined, undefined, "commoner", 39, "m", "wolf");
    al.setAttributes(21,12,16,11,15,11);
var anneke = new Character("anneke", "Anneke", undefined, undefined, "noble", 20, "f", "aardwolf");
	anneke.setAttributes(8,13,10,11,12,12);
var avo = new Character("avo", "Avo", undefined, undefined, "commoner", 25, "f", "jackal");
	avo.setAttributes(13,17,13,14,16,14);
var betty = new Character("betty", "Betty", undefined, undefined, "commoner", 37, "f", "wolf");
	betty.setAttributes(23,20,17,15,18,11);
var charlie = new Character("charlie", "Foxtrot, Charlie", undefined, undefined, "sorcerer", 28, "f", "fox");
	charlie.setAttributes(11,22,11,20,16,9);
var marty = new Character("marty", "Marty", undefined, undefined, "commoner", 25, "m", "stoat");
	marty.setAttributes(10,12,10,17,14,10);
var martina = new Character("martina", "Martina", undefined, undefined, "commoner", 25, "f", "stoat");
	martina.setAttributes(9,11,10,17,14,16);
var ozzy = new Character("ozzy", "Ozymandias", undefined, undefined, "bard", 19, "m", "hyena");
	ozzy.setAttributes(21,20,18,15,13,18);
var pandora = new Character("pandora", "Pandora", undefined, undefined, "expert", 39, "f", "tiger");
	pandora.setAttributes(23,20,19,17,18,20);
var remmy = new Character("remmy", "Cormo, Remmy", undefined, undefined, "commoner", 26, "m", "sheep");
	remmy.setAttributes(14,12,12,10,10,8);
var velvet = new Character("velvet", "Velvet", undefined, undefined, "expert", 39, "f", "deer");
	velvet.setAttributes(10,20,11,18,16,16);
var wolter = new Character("wolter", "Wolter", undefined, undefined, "noble", 20, "m", "aardwolf");
	wolter.setAttributes(9,12,10,11,12,13);

var judy = new Character("judy", "Hopps, Judy", undefined, undefined, "paladin", 24, "m", "rabbit");
	judy.setAttributes(16,22,13,16,14,12);
var nick = new Character("nick", "Wilde, Nick", undefined, undefined, "sorcerer", 33, "m", "fox");
	nick.setAttributes(15,21,13,21,22,20);

var cotton = new Character("cotton", "Hoops, Cotton", undefined, undefined, "commoner", 12, "f", "rabbit");
	cotton.setAttributes(7,14,14,11,8,10);
var rosie = new Character("rosie", "Wilde, Rosie", undefined, undefined, "commoner", 14, "f", "fox");
	rosie.setAttributes(6,16,11,11,8,12);
var tellerMicely = new Character("tellerMicely", "Teller Micely", undefined, undefined, "expert", 27, "f", "mouse");
var weaver = new Character("weaver", "Weaver", undefined, undefined, "commoner", 30, "m", "antelope");

// Do not edit this. Assigns a Character to Player, updated next in resources/data/start.js
var player = Array.from(charactersIndexes)[0];

if (debug) console.log("\tInitialized " + charactersIndexes.size + " Characters.");