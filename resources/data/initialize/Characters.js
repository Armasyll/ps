if ((PSDE.debugEnabled)) console.log("Initializing Characters");

// var characterId = new Character("characterId", "Last, First name", "Description", "Image path", "Character class", Age, Sex, Species);
//     characterId.setAttributes(Strength, Endurance, Constitution, Intelligence, Wisdom, Charisma);

var remmy = new Character("remmy", "Cormo, Remmy", undefined, undefined, "commoner", 26, "m", "sheep");
var al = new Character("al", "Al", undefined, undefined, "commoner", 39, "m", "wolf");
var anneke = new Character("anneke", "Plettenberg, Anneke", undefined, undefined, "noble", 20, "f", "aardwolf");
var avo = new Character("avo", "Avo", undefined, undefined, "commoner", 25, "f", "jackal");
var betty = new Character("betty", "Betty", undefined, undefined, "commoner", 37, "f", "wolf");
var charlie = new Character("charlie", "Foxtrot, Charlie", undefined, undefined, "sorcerer", 28, "f", "fox");
var marty = new Character("marty", "Marty", undefined, undefined, "commoner", 25, "m", "stoat");
var martina = new Character("martina", "Martina", undefined, undefined, "commoner", 25, "f", "stoat");
var ozzy = new Character("ozzy", "Ozymandias", undefined, undefined, "bard", 19, "m", "hyena");
var pandora = new Character("pandora", "Pandora", undefined, undefined, "expert", 39, "f", "tiger");
var tellerMicely = new Character("tellerMicely", "Teller Micely", undefined, undefined, "expert", 27, "f", "mouse");
var velvet = new Character("velvet", "Velvet", undefined, undefined, "expert", 39, "f", "deer");
var weaver = new Character("weaver", "Weaver", undefined, undefined, "commoner", 30, "m", "antelope");
var wolter = new Character("wolter", "Plettenberg, Wolter", undefined, undefined, "noble", 20, "m", "aardwolf");

new Character("wolekeFather", "Berthold Plettenberg", undefined, undefined, "noble", 45, "m", "aardwolf");
new Character("wolekeMother", "Gosteke Plettenberg", undefined, undefined, "noble", 45, "f", "aardwolf");

new Character("cottonHopps", "Hoops, Cotton", undefined, undefined, "commoner", 12, "f", "rabbit");
new Character("judyHopps", "Hopps, Judy", undefined, undefined, "paladin", 24, "m", "rabbit");
new Character("bonnieHopps", "Hopps, Bonnie", undefined, undefined, "commoner", 42, "f", "rabbit");
new Character("stuHopps", "Hopps, Stu", undefined, undefined, "commoner", 42, "m", "rabbit");
new Character("ottoHopps", "Hopps, Otto", undefined, undefined, "commoner", 60, "m", "rabbit");
new Character("violetHopps", "Hopps, Violet", undefined, undefined, "commoner", 29, "f", "rabbit");
new Character("rosieReynard", "Reynard, Rosie", undefined, undefined, "commoner", 14, "f", "fox");
new Character("nickWilde", "Wilde, Nick", undefined, undefined, "sorcerer", 33, "m", "fox");
new Character("beckyWilde", "Wilde, Becky", undefined, undefined, "commoner", 21, "f", "fox");
new Character("johnWilde", "Wilde, John", undefined, undefined, "commoner", 55, "m", "fox");
new Character("vivianWilde", "Wilde, Vivian", undefined, undefined, "commoner", 51, "f", "fox");
// Do not edit this. Assigns a Character to Player, updated next in resources/data/start.js
PSDE.player = Array.from(PSDE.characters)[0];

if ((PSDE.debugEnabled)) console.log("\tInitialized " + PSDE.characters.size + " Characters.");