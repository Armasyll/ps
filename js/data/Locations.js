if (debug) console.log("Initializing Locations");

limboLocation = new Location("limbo", "Limbo");

zootopiaLocation = new Location("zootopiaLocation", "Zootopia");

alBuildingBasementLocation = new Location("alBuildingBasementLocation", "Basement");
alBuilding = new Location("alBuilding", "Al's Building");
alBuilding.image = 'images/locations/alBuilding.svg';
alBuildingLobby = new Location("alBuildingLobby", "Pack Lobby");
alBuildingMaintenance = new Location("alBuildingMaintenance", "Maintenance Room");

alApartment = new Location("alApartment", "Al's Apartment");
avoApartment = new Location("avoApartment", "Avo's Apartment");
chartyApartment = new Location("chartyApartment", "Charlie and Marty's Apartment");
ozzyApartment = new Location("ozzyApartment", "Ozzy's Apartment");
remmyApartment = new Location("remmyApartment", "Remmy's Apartment");
twinsApartment = new Location("twinsApartment", "Anneke and Wolter's Apartment");
weaverApartment = new Location("weaverApartment", "Weaver's Apartment");

if (debug) console.log("\tInitialized " + locationsIndexes.size + " Locations.");