var ajax = new XMLHttpRequest();
var parser = new DOMParser();
var serializer = new XMLSerializer()

var locationsIndexes = new Map();       // <String, Location>
var cellsIndexes = new Map();           // <String, Cell>
var roomsIndexes = new Map();           // <String, Room>
var charactersIndexes = new Map();      // <String, Character>
var furnitureIndexes = new Map();       // <String, Furniture>
var itemsIndexes = new Map();           // <String, Item>
var keysIndexes = new Map();            // <String, Key>
var clothingIndexes = new Map();        // <String, Clothing>
var eventsIndexes = new Map();          // <String, GameEvent>
var characterMovements = new Map();     // <Character, Set<Room>>
var webPageIndexes = new Map();
var webSiteIndexes = new Map();
var agreeTOS = false;
var lastMenu = undefined;
var enableAudio = false;
var enableImages = true;
var enableVideo = true;
var enableMinimap = true;
var music = new Audio();
var currentTime = new Date("2017-07-03T17:35:00.000Z");
var previousTime = currentTime;
var eventsExecutedThisTick = new Set(); // Set of Events executed during the current Tick
var usePopups = true;

const SpeciesIdNames = new Map();
    SpeciesIdNames.set(0, "fox");
    SpeciesIdNames.set(1, "wolf");
    SpeciesIdNames.set(2, "aardwolf");
    SpeciesIdNames.set(3, "hyena");
    SpeciesIdNames.set(4, "sheep");
    SpeciesIdNames.set(5, "stoat");
    SpeciesIdNames.set(6, "deer");
    SpeciesIdNames.set(7, "rabbit");
    SpeciesIdNames.set(8, "jackal");
    SpeciesIdNames.set(9, "coyote");
    SpeciesIdNames.set(10, "tiger");
    SpeciesIdNames.set(11, "antelope");
    SpeciesIdNames.set(12, "pig");
    SpeciesIdNames.set(13, "horse");
const SpeciesNameIds = map_flip(SpeciesIdNames);

const SpeciesSizeUnits = new Map();
    SpeciesSizeUnits.set(0, 0.5);
    SpeciesSizeUnits.set(1, 1);
    SpeciesSizeUnits.set(2, 0.5);
    SpeciesSizeUnits.set(3, 0.75);
    SpeciesSizeUnits.set(4, 0.5);
    SpeciesSizeUnits.set(5, 0.1);
    SpeciesSizeUnits.set(6, 0.6);
    SpeciesSizeUnits.set(7, 0.4);
    SpeciesSizeUnits.set(8, 0.5);
    SpeciesSizeUnits.set(9, 0.5);
    SpeciesSizeUnits.set(10, 1);

const BodyPartIdNames = new Map();
    BodyPartIdNames.set(0, "head");
    BodyPartIdNames.set(1, "eyes");
    BodyPartIdNames.set(2, "leftEar");
    BodyPartIdNames.set(3, "rightEar");
    BodyPartIdNames.set(4, "nose");
    BodyPartIdNames.set(5, "lips");
    BodyPartIdNames.set(6, "tongue");
    BodyPartIdNames.set(7, "neck");
    BodyPartIdNames.set(8, "chest");
    BodyPartIdNames.set(9, "torso");
    BodyPartIdNames.set(10, "waist");
    BodyPartIdNames.set(11, "groin");
    BodyPartIdNames.set(12, "legs");
    BodyPartIdNames.set(13, "feet");
const BodyPartNameIds = map_flip(BodyPartIdNames);

const HandTypeIdNames = new Map();
    HandTypeIdNames.set(0, "fur");
    HandTypeIdNames.set(1, "pad");
    HandTypeIdNames.set(2, "hoof");
    HandTypeIdNames.set(4, "clovenhoof");
    HandTypeIdNames.set(5, "skin");
const HandTypeNameIds = map_flip(HandTypeIdNames);

const FeetTypeIdNames = HandTypeIdNames;
const FeetTypeNameIds = HandTypeNameIds;

const EyeTypeIdNames = new Map();
    EyeTypeIdNames.set(0, "circle");
    EyeTypeIdNames.set(1, "slit");
    EyeTypeIdNames.set(2, "rectangle");
const EyeTypeNameIds = map_flip(EyeTypeIdNames);

const FurTypeIdNames = new Map();
    FurTypeIdNames.set(0, "skin");
    FurTypeIdNames.set(1, "fur");
    FurTypeIdNames.set(2, "wool");
    FurTypeIdNames.set(3, "hair"); // Not as thick as fur
const FurTypeNameIds = map_flip(FurTypeIdNames);

const RoomTypeIdNames = new Map();
    RoomTypeIdNames.set(0, "hallway");
    RoomTypeIdNames.set(1, "lobby");
    RoomTypeIdNames.set(2, "bedroom");
    RoomTypeIdNames.set(3, "livingroom");
    RoomTypeIdNames.set(4, "bathroom");
    RoomTypeIdNames.set(5, "kitchen");
    RoomTypeIdNames.set(6, "diningroom");
    RoomTypeIdNames.set(7, "closet");
    RoomTypeIdNames.set(8, "basement");
    RoomTypeIdNames.set(9, "extBuilding");
    RoomTypeIdNames.set(10, "street");
    RoomTypeIdNames.set(11, "walkway");
    RoomTypeIdNames.set(12, "lot");
const RoomTypeNameIds = map_flip(RoomTypeIdNames);

const FurnitureTypeIdNames = new Map();
    FurnitureTypeIdNames.set(0, "chair");
    FurnitureTypeIdNames.set(1, "recliner");
    FurnitureTypeIdNames.set(2, "loveseat");
    FurnitureTypeIdNames.set(3, "couch");
    FurnitureTypeIdNames.set(4, "bed");
    FurnitureTypeIdNames.set(5, "table");
    FurnitureTypeIdNames.set(6, "desk");
    FurnitureTypeIdNames.set(7, "shelf");
    FurnitureTypeIdNames.set(8, "cupboard");
    FurnitureTypeIdNames.set(9, "cabinet");
    FurnitureTypeIdNames.set(10, "bureau");
    FurnitureTypeIdNames.set(11, "hook");
    FurnitureTypeIdNames.set(12, "tv");
    FurnitureTypeIdNames.set(13, "fridge");
    FurnitureTypeIdNames.set(14, "oven");
    FurnitureTypeIdNames.set(15, "microwave");
    FurnitureTypeIdNames.set(16, "toaster");
    FurnitureTypeIdNames.set(17, "tub");
    FurnitureTypeIdNames.set(18, "shower");
    FurnitureTypeIdNames.set(19, "sink");
    FurnitureTypeIdNames.set(20, "toilet");
    FurnitureTypeIdNames.set(21, "mirror");
    FurnitureTypeIdNames.set(22, "basket");
const FurnitureTypeNameIds = map_flip(FurnitureTypeIdNames);

const ActionsIdNames = new Map();
    ActionsIdNames.set(0, "move");
    ActionsIdNames.set(1, "use");
    ActionsIdNames.set(2, "sit");
    ActionsIdNames.set(3, "lay");
    ActionsIdNames.set(4, "sleep");
    ActionsIdNames.set(5, "open");
    ActionsIdNames.set(6, "put");
    ActionsIdNames.set(7, "give");
    ActionsIdNames.set(8, "take");
    ActionsIdNames.set(9, "remove");
    ActionsIdNames.set(10, "hold");
    ActionsIdNames.set(11, "wear");
    ActionsIdNames.set(12, "look");
    ActionsIdNames.set(13, "talk");
    ActionsIdNames.set(14, "sex");
    ActionsIdNames.set(15, "attack");
    ActionsIdNames.set(16, "rape");
    ActionsIdNames.set(17, "stand");
    ActionsIdNames.set(18, "walk");
    ActionsIdNames.set(19, "follow");
    ActionsIdNames.set(20, "stay");
const ActionsNameIds = map_flip(ActionsIdNames);
