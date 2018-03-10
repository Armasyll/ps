//var ajax = new XMLHttpRequest();
//var parser = new DOMParser();
//var serializer = new XMLSerializer()

/**
 * Map of BodyPart(s)
 * @type {Map<String, BodyPart}
 */
var bodyPartsIndexes = new Map();
/**
 * Map of Cell(s)
 * @type {Map<String, Cell}
 */
var cellsIndexes = new Map();
/**
 * Map of Character(s)
 * @type {Map<String, Character}
 */
var charactersIndexes = new Map();
/**
 * Map of pathed Character movements from Room to Room
 * @type {Map<Character, Set<Room>>}
 */
var characterMovements = new Map();
/**
 * Map of Clothing
 * @type {Map<String, Clothing>}
 */
var clothingIndexes = new Map();
/**
 * Map of Consumable(s)
 * @type {Map<String, Consumable>}
 */
var consumableIndexes = new Map();
/**
 * Map of Entity(s)
 * @type {Map<String, Entity}
 */
var entityIndexes = new Map();
/**
 * Map of GameEvent(s).
 * @type {Map<String, GameEvent>}
 */
var eventsIndexes = new Map();
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
 * Map of Instance(s)
 * @type {Map<String, Instance>}
 */
var instancesIndexes = new Map();
/**
 * Map of ItemInstance(s)
 * @type {Map<String, ItemInstance>}
 */
var itemInstancesIndexes = new Map();
/**
 * Map of Key(s)
 * @type {Map<String, Key>}
 */
var keysIndexes = new Map();
/**
 * Map of Location(s)
 * @type {Map<String, Location>}
 */
var locationsIndexes = new Map();
/**
 * Map of Phone(s)
 * @type {Map<String, Phone>}
 */
var phonesIndexes = new Map();
/**
 * Map of PhoneInstance(s)
 * @type {Map<String, PhoneInstance>}
 */
var phoneInstancesIndexes = new Map();
/**
 * Map of Cheque(s)
 * @type {Map<String, Cheque>}
 */
var chequesIndexes = new Map();
/**
 * Map of Weapon(s)
 * @type {Map<String, Room>}
 */
var weaponsIndexes = new Map();
/**
 * Map of WeaponInstance(s)
 * @type {Map<String, WeaponInstance>}
 */
var weaponInstancesIndexes = new Map();
/**
 * Map of Armor
 * @type {Map<String, Room>}
 */
var armorIndexes = new Map();
/**
 * Map of ArmorInstance(s)
 * @type {Map<String, ArmorInstance>}
 */
var armorInstancesIndexes = new Map();
/**
 * Map of Room(s)
 * @type {Map<String, Room>}
 */
var roomsIndexes = new Map();
/**
 * Map of Spell(s)
 * @type {Map<String, Spell>}
 */
var spellsIndexes = new Map();
/**
 * Map of TextMessage(s)
 * @type {Map<String, TextMessage>}
 */
var textMessageIndexes = new Map();
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
var enableAutoscroll = false;
//var music = new Audio();
var currentTime = new Date("2017-07-03T17:35:00.000Z");
var previousTime = currentTime;
var _eventsExecutedThisTick = new Set(); // Set of Events executed during the current Tick
var _scenesViewedThisWindow = new Set(); // Set of Events executed during the current Room visit
var enablePopups = false;
var _interruptTick = false;
var pov = 2; // 1 - first person, 2 - second person, 3 - third person

const kSpeciesTypes = new Set(["fox","wolf","aardwolf","hyena","sheep","stoat","deer","rabbit","jackal","coyote","tiger","antelope","pig","horse","mouse"]);
const kBodyPartTypes = new Set(["ankles","anus","arms","arms","back","breasts","chest","clitoris","feet","fingers","groin","hands","head","leftAnkle","leftArm","leftBreast","leftEar","leftEye","leftFoot","leftHand","leftLeg","leftNipple","leftShoulder","legs","legs","lips","mouth","neck","nose","penis","rear","rightAnkle","rightArm","rightBreast","rightEar","rightEye","rightFoot","rightHand","rightLeg","rightNipple","rightShoulder","shoulder","shoulders","stomach","testicles","toes","tongue","vagina","waist","wrists"]);
const kClothingTypes = new Set(["hat","mask","glasses","earPiercingLeft","earPiercingRight","nosePiercing","lipPiercing","tonguePiercing","collar","neckwear","shirt","jacket","belt","gloves","underwear","pants","socks","shoes","bra"]);
const kHandTypes = new Set(["fur","pad","hoof","clovenhoof","skin"]);
const kFeetTypes = kHandTypes;
const kEyeTypes = new Set(["circle","slit","rectangle","none"]);
const kPeltTypes = new Set(["skin","fur","wool","hair"]);
const kLocationTypes = new Set(["general","city","house","apartment","bank","park","store"]);
const kRoomTypes = new Set(["hallway","lobby","bedroom","livingroom","bathroom","kitchen","diningroom","closet","basement","extBuilding","street","walkway","lot"]);
const kFurnitureTypes = new Set(["chair","recliner","loveseat","couch","bed","table","desk","shelf","cupboard","cabinet","bureau","hook","tv","fridge","oven","microwave","toaster","tub","shower","sink","toilet","mirror","brokenMirror","basket","altar","sculpture"]);
const kIntraactionTypes = new Set(["lay","sit","sleep","stand","stay","walk","kneel"]);
const kInteractionTypes = new Set(["attack","bewitched","bite","boop","cast","channel","choke","consume","cut","disrobe","fist","follow","give","grope","hold","hug","kiss","lick","look","massage","masturbate","open","pinch","poke","pray","pull","punch","push","put","rape","release","remove","rub","sex","sit","slap","steal","stroke","suck","take","talk","thrust","touch","use","wear"]);
const kActionTypes = new Set([...kIntraactionTypes, ...kInteractionTypes]);
const kConsumableTypes = new Set(["food","drink","medicine","other"]);
const kSpecialProperties = new Set(["exists","living","dead","mirror","water","earth","metal","broken","wood","magic","nature","container","charm","bone","jagged","smooth","cursed","blessed","bludgeoning","slashing","piercing","acid","cold","fire","lightning","necrotic","poison"]);

/**
 * Classless should be a broad description for commoner, expert, and noble; it shouldn't be used, unless I'm lazy.
 * @type {Set}
 */
const kCharacterClasses = new Set(["bard","cleric","druid","paladin","ranger","sorcerer","warlock","wizard","classless","commoner","expert","noble"]);

const kSpellSchools = new Set(["abjuration","conjuration","divination","enchantment","evocation","illusion","necromancy","transmutation","universal"]);

const kWeaponSimpleMeleeTypes = new Set(["club","dagger","greatclub","handaxe","javelin","lighthammer","mace","quarterstaff","sickle","spear"]);
const kWeaponSimpleRangedTypes = new Set(["lightcrossbow","dart","shortbow","sling"]);
const kWeaponMartialMeleeTypes = new Set(["battleaxe","flail","glaive","greataxe","greatsword","halberd","lance","longsword","maul","morningstar","pike","rapier","scimitar","shortsword","trident","warpick","warhammer","whip"]);
const kWeaponMartialRangedTypes = new Set(["blowgun","handcrossbow","heavycrossbow","longbow","net"]);
const kWeaponMeleeTypes = new Set([...kWeaponSimpleMeleeTypes, ...kWeaponMartialMeleeTypes]);
const kWeaponRangedTypes = new Set([...kWeaponSimpleRangedTypes, ...kWeaponMartialRangedTypes]);
const kWeaponTypes = new Set([...kWeaponMeleeTypes, ...kWeaponRangedTypes]);
const kWeaponProperties = new Set(["ammunition","finesse","heavy","light","loading","range","reach","special","thrown","twohanded","versatile"]);

const kDamageTypes = new Set(["bludgeoning","slashing","piercing","acid","cold","fire","lightning","necrotic","poison","psychic","radiant","thunder"]);

const kWeaponTypeProperties = new Map();
	kWeaponTypeProperties.set("club", new Set(["light"]));
	kWeaponTypeProperties.set("dagger", new Set(["finesse","light","range","thrown"]));
	kWeaponTypeProperties.set("greatclub", new Set(["twohanded"]));
	kWeaponTypeProperties.set("handaxe", new Set(["light","range","thrown"]));
	kWeaponTypeProperties.set("javeline", new Set(["range","thrown"]));
	kWeaponTypeProperties.set("lighthammer", new Set(["light","range","thrown"]));
	kWeaponTypeProperties.set("mace", new Set());
	kWeaponTypeProperties.set("quarterstaff", new Set(["versatile"]));
	kWeaponTypeProperties.set("sickle", new Set(["light"]));
	kWeaponTypeProperties.set("spear", new Set(["range","versatile"]));
	kWeaponTypeProperties.set("lightcrossbow", new Set(["ammunition","loading","range","twohanded"]));
	kWeaponTypeProperties.set("dart", new Set(["finesse","range","thrown"]));
	kWeaponTypeProperties.set("shortbow", new Set(["ammunition","range","twohanded"]));
	kWeaponTypeProperties.set("sling", new Set(["ammunition","range"]));
	kWeaponTypeProperties.set("battleaxe", new Set(["versatile"]));
	kWeaponTypeProperties.set("flail", new Set());
	kWeaponTypeProperties.set("glaive", new Set(["heavy","reach","twohanded"]));
	kWeaponTypeProperties.set("greataxe", new Set(["heavy","twohanded"]));
	kWeaponTypeProperties.set("greatsword", new Set(["heavy","twohanded"]));
	kWeaponTypeProperties.set("halberd", new Set(["heavy","reach","twohanded"]));
	kWeaponTypeProperties.set("lance", new Set(["reach","special"]));
	kWeaponTypeProperties.set("longsword", new Set(["versatile"]));
	kWeaponTypeProperties.set("maul", new Set(["heavy","twohanded"]));
	kWeaponTypeProperties.set("morningstar", new Set());
	kWeaponTypeProperties.set("pike", new Set(["heavy","reach"]));
	kWeaponTypeProperties.set("rapier", new Set(["finesse"]));
	kWeaponTypeProperties.set("scimitar", new Set(["finesse","light"]));
	kWeaponTypeProperties.set("shortsword", new Set(["finesse","light"]));
	kWeaponTypeProperties.set("trident", new Set(["range","thrown","versatile"]));
	kWeaponTypeProperties.set("warpick", new Set());
	kWeaponTypeProperties.set("warhammer", new Set(["versatile"]));
	kWeaponTypeProperties.set("whip", new Set(["finesse","reach"]));
	kWeaponTypeProperties.set("blowgun", new Set(["ammunition","range","loading"]));
	kWeaponTypeProperties.set("crossbowhand", new Set(["ammunition","light","loading","range"]));
	kWeaponTypeProperties.set("crossbowheavy", new Set(["ammunition","heavy","loading","range","twohanded"]));
	kWeaponTypeProperties.set("longbow", new Set(["ammunition","heavy","range","twohanded"]));
	kWeaponTypeProperties.set("net", new Set(["special","thrown"]));
const kWeaponTypeDamage = new Map();
	kWeaponTypeDamage.set("club","1d4");
	kWeaponTypeDamage.set("dagger","1d4");
	kWeaponTypeDamage.set("greatclub","1d8");
	kWeaponTypeDamage.set("handaxe","1d6");
	kWeaponTypeDamage.set("javeline","1d6");
	kWeaponTypeDamage.set("lighthammer","1d4");
	kWeaponTypeDamage.set("mace","1d6");
	kWeaponTypeDamage.set("quarterstaff","1d6");
	kWeaponTypeDamage.set("sickle","1d4");
	kWeaponTypeDamage.set("spear","1d6");
	kWeaponTypeDamage.set("lightcrossbow","1d8");
	kWeaponTypeDamage.set("dart","1d4");
	kWeaponTypeDamage.set("shortbow","1d6");
	kWeaponTypeDamage.set("sling","1d4");
	kWeaponTypeDamage.set("battleaxe","1d8");
	kWeaponTypeDamage.set("flail","1d8");
	kWeaponTypeDamage.set("glaive","1d10");
	kWeaponTypeDamage.set("greataxe","1d12");
	kWeaponTypeDamage.set("greatsword","2d6");
	kWeaponTypeDamage.set("halberd","1d10");
	kWeaponTypeDamage.set("lance","1d12");
	kWeaponTypeDamage.set("longsword","1d8");
	kWeaponTypeDamage.set("maul","2d6");
	kWeaponTypeDamage.set("morningstar","1d8");
	kWeaponTypeDamage.set("pike","1d10");
	kWeaponTypeDamage.set("rapier","1d8");
	kWeaponTypeDamage.set("scimitar","1d6");
	kWeaponTypeDamage.set("shortsword","1d6");
	kWeaponTypeDamage.set("trident","1d6");
	kWeaponTypeDamage.set("warpick","1d8");
	kWeaponTypeDamage.set("warhammer","1d8");
	kWeaponTypeDamage.set("whip","1d4");
	kWeaponTypeDamage.set("blowgun","1d2");
	kWeaponTypeDamage.set("crossbowhand","1d6");
	kWeaponTypeDamage.set("crossbowheavy","1d10");
	kWeaponTypeDamage.set("longbow","1d8");
const kWeaponTypeCost = new Map();
	kWeaponTypeCost.set("club",0.1);
	kWeaponTypeCost.set("dagger",20);
	kWeaponTypeCost.set("greatclub",2);
	kWeaponTypeCost.set("handaxe",50);
	kWeaponTypeCost.set("javeline",50);
	kWeaponTypeCost.set("lighthammer",20);
	kWeaponTypeCost.set("mace",50);
	kWeaponTypeCost.set("quarterstaff",2);
	kWeaponTypeCost.set("sickle",10);
	kWeaponTypeCost.set("spear",10);
	kWeaponTypeCost.set("lightcrossbow",250);
	kWeaponTypeCost.set("dart",0.5);
	kWeaponTypeCost.set("shortbow",250);
	kWeaponTypeCost.set("sling",1);
	kWeaponTypeCost.set("battleaxe",100);
	kWeaponTypeCost.set("flail",100);
	kWeaponTypeCost.set("glaive",200);
	kWeaponTypeCost.set("greataxe",300);
	kWeaponTypeCost.set("greatsword",500);
	kWeaponTypeCost.set("halberd",200);
	kWeaponTypeCost.set("lance",100);
	kWeaponTypeCost.set("longsword",150);
	kWeaponTypeCost.set("maul",100);
	kWeaponTypeCost.set("morningstar",150);
	kWeaponTypeCost.set("pike",50);
	kWeaponTypeCost.set("rapier",250);
	kWeaponTypeCost.set("scimitar",250);
	kWeaponTypeCost.set("shortsword",100);
	kWeaponTypeCost.set("trident",50);
	kWeaponTypeCost.set("warpick",50);
	kWeaponTypeCost.set("warhammer",150);
	kWeaponTypeCost.set("whip",20);
	kWeaponTypeCost.set("blowgun",100);
	kWeaponTypeCost.set("crossbowhand",750);
	kWeaponTypeCost.set("crossbowheavy",500);
	kWeaponTypeCost.set("longbow",500);
	kWeaponTypeCost.set("net",10);

const kArmorLightTypes = new Set(["padded","leather","studdedleather"]);
const kArmorMediumTypes = new Set(["hide","chainshirt","scalemail","breastplate","halfplate"]);
const kArmorHeavyTypes = new Set(["ringmail","chainmail","splint","plate"]);
const kShieldTypes = new Set(["shield"]);
const kArmorTypes = new Set([...kArmorLightTypes, ...kArmorMediumTypes, ...kArmorHeavyTypes, ...kShieldTypes]);
/**
 * Amount of protection from attacks
 * @type {Map} <String, Number>
 */
const kArmorTypeClass = new Map();
	kArmorTypeClass.set("padded", 11);
	kArmorTypeClass.set("leather", 11);
	kArmorTypeClass.set("studdedleather", 12);
	kArmorTypeClass.set("hide", 12);
	kArmorTypeClass.set("chainshirt", 13);
	kArmorTypeClass.set("scalemail", 14);
	kArmorTypeClass.set("breastplate", 14);
	kArmorTypeClass.set("halfplate", 15);
	kArmorTypeClass.set("ringmail", 14);
	kArmorTypeClass.set("chainmail", 16);
	kArmorTypeClass.set("splint", 17);
	kArmorTypeClass.set("plate", 18);
	kArmorTypeClass.set("shield", 2);
/**
 * Whether or not an ArmorType has a strength requirement which is a detriment to stealth
 * @type {Map}
 */
const kArmorTypeStrength = new Map();
	kArmorTypeStrength.set("chainmail", 13);
	kArmorTypeStrength.set("splint", 15);
	kArmorTypeStrength.set("plate", 15);
/**
 * Whether or not an ArmorType is a detriment to stealth
 * @type {Map} <String, boolean>
 */
const kArmorTypeStealth = new Map();
	kArmorTypeStealth.set("padded", false);
	kArmorTypeStealth.set("scalemail", false);
	kArmorTypeStealth.set("halfplate", false);
	kArmorTypeStealth.set("ringmail", false);
	kArmorTypeStealth.set("chainmail", false);
	kArmorTypeStealth.set("splint", false);
	kArmorTypeStealth.set("plate", false);
const kArmorTypeCost = new Map();
	kArmorTypeCost.set("padded", 50);
	kArmorTypeCost.set("leather", 100);
	kArmorTypeCost.set("studdedleather", 450);
	kArmorTypeCost.set("hide", 100);
	kArmorTypeCost.set("chainshirt", 50);
	kArmorTypeCost.set("scalemail", 500);
	kArmorTypeCost.set("breastplate", 4000);
	kArmorTypeCost.set("halfplate", 7500);
	kArmorTypeCost.set("ringmail", 300);
	kArmorTypeCost.set("chainmail", 750);
	kArmorTypeCost.set("splint", 2000);
	kArmorTypeCost.set("plate", 15000);
	kArmorTypeCost.set("shield", 100);