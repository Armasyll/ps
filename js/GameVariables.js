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
 * Map of BodyPart(s)
 * @type {Map<String, BodyPart}
 */
var bodyPartsIndexes = new Map();
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
var enableAutoscroll = true;
//var music = new Audio();
var currentTime = new Date("2017-07-03T17:35:00.000Z");
var previousTime = currentTime;
var eventsExecutedThisTick = new Set(); // Set of Events executed during the current Tick
var scenesViewedThisWindow = new Set(); // Set of Events executed during the current Room visit
var usePopups = false;
var interruptTick = false;

const kSpeciesTypes = new Set(["fox","wolf","aardwolf","hyena","sheep","stoat","deer","rabbit","jackal","coyote","tiger","antelope","pig","horse"]);
//const kBodyPartTypes = new Set(["head","leftEye","rightEye","eyes","ears","leftEar","rightEar","nose","mouth","lips","tongue","neck","chest","nipples","leftNipple","rightNipple","stomach","back","shoulder","waist","groin","legs","arms","hands","leftHand","rightHand","feet","leftFoot","rightFoot","fingers","toes","rear","anus","vagina","clitoris","penis","knot","testicles"]);
const kClothingTypes = new Set(["hat" ,"mask" ,"glasses" ,"earPiercingLeft" ,"earPiercingRight" ,"nosePiercing" ,"lipPiercing" ,"tonguePiercing" ,"collar" ,"neckwear" ,"shirt" ,"jacket" ,"belt" ,"gloves" ,"underwear" ,"pants" ,"socks" ,"shoes" ,"bra"]);
const kHandTypes = new Set(["fur", "pad", "hoof", "clovenhoof", "skin"]);
const kFeetTypes = kHandTypes;
const kEyeTypes = new Set(["circle", "slit", "rectangle"]);
const kPeltTypes = new Set(["skin", "fur", "wool", "hair"]);
const kRoomTypes = new Set(["hallway", "lobby", "bedroom", "livingroom", "bathroom", "kitchen", "diningroom", "closet", "basement", "extBuilding", "street", "walkway", "lot"]);
const kFurnitureTypes = new Set(["chair","recliner","loveseat","couch","bed","table","desk","shelf","cupboard","cabinet","bureau","hook","tv","fridge","oven","microwave","toaster","tub","shower","sink","toilet","mirror","brokenMirror","basket","altar","sculpture"]);
const kIntraactionTypes = new Set(["lay","sit","sleep","stand","stay","walk"]);
const kInteractionTypes = new Set(["attack","bite","boop","choke","consume","disrobe","fist","follow","give","grope","hold","hug","kiss","lick","look","massage","masturbate","open","pinch","poke","pray","pull","punch","push","put","rape","release","remove","rub","sex","sit","slap","steal","stroke","suck","take","talk","thrust","touch","use","wear"]);
const kActionTypes = new Set([...kIntraactionTypes, ...kInteractionTypes]);
const kConsumableTypes = new Set(["food", "drink", "medicine"]);
const kSpecialTypes = new Set(["exists", "living", "dead", "mirror", "water", "fire", "earth", "metal", "broken", "wood", "magic", "nature", "container", "charm"]);

// Mana Costs
const kManaCostLevitate = 10;
const kManaCostUnlock = 15;
const kManaCostImbue = 50;
const kManaCostMirrorUseOpen = 25; // Open the mirror's inventory
const kManaCostMirrorUseWalk = 75; // Walk through the mirror
const kManaCostMirrorUseLook = 50; // Peer through the mirror

const kManaCostCharacterSummon = 100;
const kManaCostCharacterLust = 25; // 1-time; +5 to Lust to Character
const kManaCostCharacterRut = 50; // 1-time; enable Rut
const kManaCostCharacterTempDisposition = 25; // 24h; +20 to a Disposition type to Character
const kManaCostCharacterGradualDisposition = 50; // Channel; Initial cost of 50 to start, additional cost of 50 the next day, +2 Disposition type to Character
const kManaCostCharacterCompel = 50; // 1-time; +100 to all Dispositions, +5 Miseo after Scene
const kManaCostCharacterDominate = 100; // 24h; +100 to all Dispositions, practically disables all checks to Character
const kManaCostCharacterPossess = 150; // 24h;