if (debug) console.log("Initializing Cells");

limboCell = new Cell("limboCell", "Limbo", limboLocation);

zootopiaCell = new Cell("zootopiaCell", "Zootopia", zootopiaLocation);

alBuildingBasementCell = new Cell("alBuildingBasementCell", "Basement", alBuildingLocation);
alBuildingFirstFloor = new Cell("alBuildingFirstFloor", "First Floor", alBuildingLocation);
alBuildingSecondFloor = new Cell("alBuildingSecondFloor", "Second Floor", alBuildingLocation);
alBuildingThirdFloor = new Cell("alBuildingThirdFloor", "Third Floor", alBuildingLocation);

bettyBuildingBasementCell = new Cell("bettyBuildingBasementCell", "Basement", bettyBuildingLocation);
bettyBuildingFirstFloor = new Cell("bettyBuildingFirstFloor", "First Floor", bettyBuildingLocation);
bettyBuildingSecondFloor = new Cell("bettyBuildingSecondFloor", "Second Floor", bettyBuildingLocation);
bettyBuildingThirdFloor = new Cell("bettyBuildingThirdFloor", "Third Floor", bettyBuildingLocation);

pandorasBoxCell = new Cell("pandorasBoxCell", "Store", pandorasBoxLocation);
pandorasBoxBasementCell = new Cell("pandorasBoxBasementCell", "Basement", pandorasBoxBasementLocation);
pandorasBoxBasementHiddenCell = new Cell("pandorasBoxBasementHiddenCell", "Basement", pandorasBoxBasementHiddenLocation);

bugBurga42ndCell = new Cell("bugBurga42ndCell", "Bug Burga", bugBurga42ndLocation);

packStreetPublicLibraryCell = new Cell("packStreetPublicLibraryCell", "Pack Street Library", packStreetPublicLibraryLocation);

if (debug) console.log("\tInitialized " + cellsIndexes.size + " Cells.");