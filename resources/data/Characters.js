if (debug) console.log("Initializing Characters");

var al = new Character("al", "Al", 39, 0, "wolf");
var anneke = new Character("anneke", "Anneke", 20, 1, "aardwolf");
var avo = new Character("avo", "Avo", 25, 1, "jackal");
var betty = new Character("betty", "Betty", 37, 1, "wolf");
var charlie = new Character("charlie", "Charlie", 28, 1, "fox");
var marty = new Character("marty", "Marty", 25, 0, "stoat");
var martina = new Character("martina", "Martina", 25, 1, "stoat");
var ozzy = new Character("ozzy", "Ozymandias", 19, 0, "hyena");
var pandora = new Character("pandora", "Pandora", 39, 1, "tiger");
var remmy = new Character("remmy", "Cormo, Remmy", 26, 0, "sheep");
var rosie = new Character("rosie", "Wilde, Rosie", 14, 1, "fox");
var velvet = new Character("velvet", "Velvet", 39, 1, "deer");
var wolter = new Character("wolter", "Wolter", 20, 0, "aardwolf");

var weaver = new Character("weaver", "Weaver", 30, 0, "antelope");

var cotton = new Character("cotton", "Hoops, Cotton", 12, 1, "rabbit");
var judy = new Character("judy", "Hopps, Judy", 24, 0, "rabbit");
var nick = new Character("nick", "Wilde, Nick", 33, 0, "fox");

// Do not this. This should always go after all other characters.
var player = Array.from(charactersIndexes)[0];

if (debug) console.log("\tInitialized " + charactersIndexes.size + " Characters.");