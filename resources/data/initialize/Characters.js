if (debug) console.log("Initializing Characters");

var remmy = new Character("remmy", "Cormo, Remmy", undefined, undefined, "commoner", 26, 0, "sheep");
	remmy.setAbilities(14,12,12,10,10,8);

var al = new Character("al", "Al", undefined, undefined, "commoner", 39, 0, "wolf");
    al.setAbilities(21,12,16,11,15,11);
var anneke = new Character("anneke", "Anneke", undefined, undefined, "noble", 20, 1, "aardwolf");
	anneke.setAbilities(8,13,10,11,12,12);
var avo = new Character("avo", "Avo", undefined, undefined, "commoner", 25, 1, "jackal");
	avo.setAbilities(13,17,13,14,16,14);
var betty = new Character("betty", "Betty", undefined, undefined, "commoner", 37, 1, "wolf");
	betty.setAbilities(23,20,17,15,18,11);
var charlie = new Character("charlie", "Charlie", undefined, undefined, "sorcerer", 28, 1, "fox");
	charlie.setAbilities(11,22,11,20,16,9);
var marty = new Character("marty", "Marty", undefined, undefined, "commoner", 25, 0, "stoat");
	marty.setAbilities(10,12,10,17,14,10);
var martina = new Character("martina", "Martina", undefined, undefined, "commoner", 25, 1, "stoat");
	martina.setAbilities(9,11,10,17,14,16);
var ozzy = new Character("ozzy", "Ozymandias", undefined, undefined, "bard", 19, 0, "hyena");
	ozzy.setAbilities(21,20,18,15,13,18);
var pandora = new Character("pandora", "Pandora", undefined, undefined, "expert", 39, 1, "tiger");
	pandora.setAbilities(23,20,19,17,18,20);
var remmy = new Character("remmy", "Cormo, Remmy", undefined, undefined, "commoner", 26, 0, "sheep");
	remmy.setAbilities(14,12,12,10,10,8);
var velvet = new Character("velvet", "Velvet", undefined, undefined, "expert", 39, 1, "deer");
	velvet.setAbilities(10,20,11,18,16,16);
var wolter = new Character("wolter", "Wolter", undefined, undefined, "noble", 20, 0, "aardwolf");
	wolter.setAbilities(9,12,10,11,12,13);

var judy = new Character("judy", "Hopps, Judy", undefined, undefined, "paladin", 24, 0, "rabbit");
	judy.setAbilities(16,22,13,16,14,12);
var nick = new Character("nick", "Wilde, Nick", undefined, undefined, "sorcerer", 33, 0, "fox");
	nick.setAbilities(15,21,13,21,22,20);

var cotton = new Character("cotton", "Hoops, Cotton", undefined, undefined, "commoner", 12, 1, "rabbit");
	cotton.setAbilities(7,14,14,11,8,10)
var rosie = new Character("rosie", "Wilde, Rosie", undefined, undefined, "commoner", 14, 1, "fox");
	rosie.setAbilities(6,16,11,11,8,12);
var tellerMicely = new Character("tellerMicely", undefined, undefined, "expert", "Teller Micely", 27, 1, "mouse");
var weaver = new Character("weaver", "Weaver", undefined, undefined, "commoner", 30, 0, "antelope");

// Do not edit this. Assigns a Character to Player, updated next in resources/data/start.js
var player = Array.from(charactersIndexes)[0];

if (debug) console.log("\tInitialized " + charactersIndexes.size + " Characters.");