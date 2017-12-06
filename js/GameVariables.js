var ajax = new XMLHttpRequest();
var parser = new DOMParser();
var serializer = new XMLSerializer()

var entityIndexes = new Map();          // <String, Entity>
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
var scenesViewedThisWindow = new Set(); // Set of Events executed during the current Room visit
var usePopups = false;

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
const SpeciesNameIds = SpeciesIdNames.flip();

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
const BodyPartNameIds = BodyPartIdNames.flip();

const ClothingTypeIdNames = new Map();
    ClothingTypeIdNames.set(0, "hat");
    ClothingTypeIdNames.set(1, "mask");
    ClothingTypeIdNames.set(2, "glasses");
    ClothingTypeIdNames.set(3, "earPiercingLeft");
    ClothingTypeIdNames.set(4, "earPiercingRight");
    ClothingTypeIdNames.set(5, "nosePiercing");
    ClothingTypeIdNames.set(6, "lipPiercing");
    ClothingTypeIdNames.set(7, "tonguePiercing");
    ClothingTypeIdNames.set(8, "collar");
    ClothingTypeIdNames.set(9, "neckwear");
    ClothingTypeIdNames.set(10, "shirt");
    ClothingTypeIdNames.set(11, "jacket");
    ClothingTypeIdNames.set(12, "belt");
    ClothingTypeIdNames.set(13, "gloves");
    ClothingTypeIdNames.set(14, "underwear");
    ClothingTypeIdNames.set(15, "pants");
    ClothingTypeIdNames.set(16, "socks");
    ClothingTypeIdNames.set(17, "shoes");
    ClothingTypeIdNames.set(18, "bra");
const ClothingTypeNameIds = ClothingTypeIdNames.flip();

const HandTypeIdNames = new Map();
    HandTypeIdNames.set(0, "fur");
    HandTypeIdNames.set(1, "pad");
    HandTypeIdNames.set(2, "hoof");
    HandTypeIdNames.set(4, "clovenhoof");
    HandTypeIdNames.set(5, "skin");
const HandTypeNameIds = HandTypeIdNames.flip();

const FeetTypeIdNames = HandTypeIdNames;
const FeetTypeNameIds = HandTypeNameIds;

const EyeTypeIdNames = new Map();
    EyeTypeIdNames.set(0, "circle");
    EyeTypeIdNames.set(1, "slit");
    EyeTypeIdNames.set(2, "rectangle");
const EyeTypeNameIds = EyeTypeIdNames.flip();

const FurTypeIdNames = new Map();
    FurTypeIdNames.set(0, "skin");
    FurTypeIdNames.set(1, "fur");
    FurTypeIdNames.set(2, "wool");
    FurTypeIdNames.set(3, "hair"); // Not as thick as fur
const FurTypeNameIds = FurTypeIdNames.flip();

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
const RoomTypeNameIds = RoomTypeIdNames.flip();

const furnitureTypes = new Set(["chair","recliner","loveseat","couch","bed","table","desk","shelf","cupboard","cabinet","bureau","hook","tv","fridge","oven","microwave","toaster","tub","shower","sink","toilet","mirror","basket"]);
const actionTypes = new Set(["move","use","sit","lay","sleep","open","put","give","take","remove","hold","wear","look","talk","sex","attack","rape","stand","walk","follow","stay","masturbate"]);
