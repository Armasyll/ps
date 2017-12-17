//var ajax = new XMLHttpRequest();
//var parser = new DOMParser();
//var serializer = new XMLSerializer()

/**
 * Map of Entity(s)
 * @type {Map<String, Entity}
 */
var entityIndexes = new Map();
/**
 * Map of Location(s)
 * @type {Map<String, Location>}
 */
var locationsIndexes = new Map();
/**
 * Map of Cell(s)
 * @type {Map<String, Cell}
 */
var cellsIndexes = new Map();
/**
 * Map of Room(s)
 * @type {Map<String, Room>}
 */
var roomsIndexes = new Map();
/**
 * Map of Character(s)
 * @type {Map<String, Character}
 */
var charactersIndexes = new Map();
/**
 * Map of Furniture
 * @type {Map<String, Furniture>}
 */
var furnitureIndexes = new Map();
/**
 * Map of Item(s)
 * @type {Map<String, Item>}
 */
var itemsIndexes = new Map();
/**
 * Map of Key(s)
 * @type {Map<String, Key>}
 */
var keysIndexes = new Map();
/**
 * Map of Clothing
 * @type {Map<String, Clothing>}
 */
var clothingIndexes = new Map();
/**
 * Map of Phone(s)
 * @type {Map<String, Phone>}
 */
var phonesIndexes = new Map();
/**
 * Map of TextMessage(s)
 * @type {Map<String, TextMessage>}
 */
var textMessageIndexes = new Map();
/**
 * Map of Consumable(s)
 * @type {Map<String, Consumable>}
 */
var consumableIndexes = new Map();
/**
 * Map of GameEvent(s).
 * @type {Map<String, GameEvent>}
 */
var eventsIndexes = new Map();
/**
 * Map of pathed Character movements from Room to Room
 * @type {Map<Character, Set<Room>>}
 */
var characterMovements = new Map();
/**
 * Map of WebPage(s)
 * @type {Map<String, WebPage}
 */
var webPageIndexes = new Map();
/**
 * Map of WebSite(s)
 * @type {Map<String, WebSite>}
 */
var webSiteIndexes = new Map();
var agreeTOS = false;
var lastMenu = undefined;
var lastGameEvent = undefined;
//var enableAudio = false;
//var enableImages = true;
//var enableVideo = true;
var enableMinimap = true;
//var music = new Audio();
var currentTime = new Date("2017-07-03T17:35:00.000Z");
var previousTime = currentTime;
var eventsExecutedThisTick = new Set(); // Set of Events executed during the current Tick
var scenesViewedThisWindow = new Set(); // Set of Events executed during the current Room visit
var usePopups = false;
var interruptTick = false;

const kSpeciesTypes = new Set(["fox","wolf","aardwolf","hyena","sheep","stoat","deer","rabbit","jackal","coyote","tiger","antelope","pig","horse"]);
//const kBodyPartTypes = new Set(["head","eyes","leftEar","rightEar","nose","lips","tongue","neck","chest","torso","waist","groin","legs","feet"]);
const kClothingTypes = new Set(["hat" ,"mask" ,"glasses" ,"earPiercingLeft" ,"earPiercingRight" ,"nosePiercing" ,"lipPiercing" ,"tonguePiercing" ,"collar" ,"neckwear" ,"shirt" ,"jacket" ,"belt" ,"gloves" ,"underwear" ,"pants" ,"socks" ,"shoes" ,"bra"]);
const kHandTypes = new Set(["fur", "pad", "hoof", "clovenhoof", "skin"]);
const kFeetTypes = kHandTypes;
const kEyeTypes = new Set(["circle", "slit", "rectangle"]);
const kPeltTypes = new Set(["skin", "fur", "wool", "hair"]);
const kRoomTypes = new Set(["hallway", "lobby", "bedroom", "livingroom", "bathroom", "kitchen", "diningroom", "closet", "basement", "extBuilding", "street", "walkway", "lot"]);
const kFurnitureTypes = new Set(["chair","recliner","loveseat","couch","bed","table","desk","shelf","cupboard","cabinet","bureau","hook","tv","fridge","oven","microwave","toaster","tub","shower","sink","toilet","mirror","brokenMirror", "basket"]);
const kActionTypes = new Set(["move","use","sit","lay","sleep","open","put","give","take","remove","hold","wear","look","talk","sex","attack","rape","stand","walk","follow","stay","masturbate","consume"]);
const kConsumableTypes = new Set(["food", "drink", "medicine"]);
const kSpecialTypes = new Set(["living", "dead", "mirror", "water", "fire", "earth", "metal", "broken", "wood", "magic"]);