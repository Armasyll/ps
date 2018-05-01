if (debug) console.log("Initializing Characters");

// var characterId = new Character("characterId", "Last, First name", "Description", "Image path", "Character class", Age, Sex, Species);
//     characterId.setAttributes(Strength, Endurance, Constitution, Intelligence, Wisdom, Charisma);

var remmy = new Character("remmy", "Cormo, Remmy", undefined, undefined, "commoner", 26, "m", "sheep");
var al = new Character("al", "Al", undefined, undefined, "commoner", 39, "m", "wolf");
var anneke = new Character("anneke", "Anneke", undefined, undefined, "noble", 20, "f", "aardwolf");
var avo = new Character("avo", "Avo", undefined, undefined, "commoner", 25, "f", "jackal");
var betty = new Character("betty", "Betty", undefined, undefined, "commoner", 37, "f", "wolf");
var charlie = new Character("charlie", "Foxtrot, Charlie", undefined, undefined, "sorcerer", 28, "f", "fox");
var cotton = new Character("cotton", "Hoops, Cotton", undefined, undefined, "commoner", 12, "f", "rabbit");
var judy = new Character("judy", "Hopps, Judy", undefined, undefined, "paladin", 24, "m", "rabbit");
var marty = new Character("marty", "Marty", undefined, undefined, "commoner", 25, "m", "stoat");
var martina = new Character("martina", "Martina", undefined, undefined, "commoner", 25, "f", "stoat");
var nick = new Character("nick", "Wilde, Nick", undefined, undefined, "sorcerer", 33, "m", "fox");
var ozzy = new Character("ozzy", "Ozymandias", undefined, undefined, "bard", 19, "m", "hyena");
var pandora = new Character("pandora", "Pandora", undefined, undefined, "expert", 39, "f", "tiger");
var rosie = new Character("rosie", "Wilde, Rosie", undefined, undefined, "commoner", 14, "f", "fox");
var tellerMicely = new Character("tellerMicely", "Teller Micely", undefined, undefined, "expert", 27, "f", "mouse");
var velvet = new Character("velvet", "Velvet", undefined, undefined, "expert", 39, "f", "deer");
var weaver = new Character("weaver", "Weaver", undefined, undefined, "commoner", 30, "m", "antelope");
var wolter = new Character("wolter", "Wolter", undefined, undefined, "noble", 20, "m", "aardwolf");

// Do not edit this. Assigns a Character to Player, updated next in resources/data/start.js
var player = Array.from(characterIndices)[0];

if (debug) console.log("\tInitialized " + characterIndices.size + " Characters.");