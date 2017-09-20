if (debug) console.log("Initializing Cells");

limboCell = new Cell("limboCell", "Limbo", limboLocation);

zootopiaCell = new Cell("zootopiaCell", "Zootopia", zootopiaLocation);

alBuildingBasementCell = new Cell("alBuildingBasementCell", "Basement", alBuilding);
alBuildingFirstFloor = new Cell("alBuildingFirstFloor", "First Floor", alBuilding);
alBuildingSecondFloor = new Cell("alBuildingSecondFloor", "Second Floor", alBuilding);
alBuildingThirdFloor = new Cell("alBuildingThirdFloor", "Third Floor", alBuilding);

if (debug) console.log("\tInitialized " + cellsIndexes.size + " Cells.");