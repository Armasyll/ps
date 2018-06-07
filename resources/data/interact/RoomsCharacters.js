function alBuildingBasementRosieInteract() {
    _character = PSDE.getCharacterByID("rosieReynard");
    
    Content.clear();
    
    if (_character.isSleeping()) {
        Content.add("<p>You see Rosie huddled up by a water heater, with a wool blanket wrapped around her. With the rise and fall of her chest, you can tell she's sleeping.</p>");
    }
    else {
        Content.add("WIP");
    }
    Content.add("<p>There are some Bugburga boxes stacked in a neat pile a few feet away from her.</p>");
}
function alBuildingBasementRosieTalk() {
    _character = PSDE.getCharacterByID("rosieReynard");
    
    if (_character.isSleeping()) {
        Content.add("<p>The small vixen is sleeping, and you don't want to wake her.</p>");
    }
    else {
        Content.add("WIP");
    }
}
function alBuildingSecondFloorHallwayCharlieInteract() {
    _character = PSDE.getCharacterByID("charlie");
    
    Content.add("<p>You look at {0} as you stand in {1}</p>".format(_character.name, PSDE.getCharacterCurrentRoom(PSDE.player).name));
}
function alBuildingSecondFloorHallwayCharlieTalk() {
    _character = PSDE.getCharacterByID("charlie");
    
    Content.add("<p>You talk to {0} as you stand in {1}</p>".format(_character.name, PSDE.getCharacterCurrentRoom(PSDE.player).name));
}
function alBuildingSecondFloorHallwayCharlieSex() {
    _character = PSDE.getCharacterByID("charlie");
    
    _blob = "";
    _blob += ("Before you even ask about fucking, {0} leans over the corner of the stair post, then looks up and down the flights of stairs. You peer over with her, and can't see anyone coming or going.</p>".format(_character.name));
    if (__character.hasPants && __character.hasPanties)
        _blob += ("<p>Undoing her pants, she tugs them down, along with her panties, and lifts her tail up. Widening her stance, she exposes her bare ass and pussy to you.");
    else if (__character.hasPants && !__character.hasPanties)
        _blob += ("<p>Undoing her pants, she tugs them down, revealing that she wasn't wearing panties, and lifts her tail up. Widening her stance, she exposes her bare ass and pussy to you.");
    else if (!__character.hasPants && __character.hasPanties)
        _blob += ("<p>Reaching a paw down, she slips her panties down to her ankles and hikes her tail up. Widening her stance, she exposes her bare ass and pussy to you.");
    else
        _blob += ("<p>Hiking her tail up and widening her stance, she exposes her bare ass and pussy to you.");
    
    Content.add("<p>" + _blob + "</p>");
}
function alBuildingSecondFloorHallwayCharlieSexAnalGive() {
    _character = PSDE.getCharacterByID("charlie");
    PSDE.player.addSexWith(_character);
}
function alBuildingSecondFloorHallwayCharlieSexVaginalGive() {
    _character = PSDE.getCharacterByID("charlie");
    PSDE.player.addSexWith(_character);
}
function alBuildingSecondFloorHallwayCharlieSexFellatioReceive() {
    _character = PSDE.getCharacterByID("charlie");
    PSDE.player.addSexWith(_character);
}
function alBuildingSecondFloorHallwayCharlieSexCunnilingusGive() {
    _character = PSDE.getCharacterByID("charlie");
    PSDE.player.addSexWith(_character);
}
function alBuildingSecondFloorHallwayCharlieSexCunnilingusReceive() {
    _character = PSDE.getCharacterByID("charlie");
    PSDE.player.addSexWith(_character);
}
function alBuildingSecondFloorHallwayCharlieSexAnalingusGive() {
    _character = PSDE.getCharacterByID("charlie");
    PSDE.player.addSexWith(_character);
}
function alBuildingSecondFloorHallwayCharlieSexAnalingusReceive() {
    _character = PSDE.getCharacterByID("charlie");
    PSDE.player.addSexWith(_character);
}

function chartyApartmentBedroomCharlieCharlieTalk() {
    _character = PSDE.getCharacterByID("charlie");
    
    if (_character['annoyed'] >= 6) {
        Content.add("{0} leaps from her window, and falls to her death two stories down.".format(_character.name));
        Content.add("You somehow obtain " + charlieBeatingHeart.toString() + " and " + charlieLeftEye.toString() + ".");
        _character.living = false;
        PSDE.setCharacterCurrentRoom(_character, "limbo");
    }
    
    PSDE.tick("3m");
}

function remmyApartmentBedroomWolterInteract() {
}
function remmyApartmentBedroomWolterTalk() {
}
function remmyApartmentBedroomWolterSex() {
}
function remmyApartmentBedroomWolterSexFrot() {
}
function remmyApartmentBedroomWolterSexFellatioReceive() {
}
function remmyApartmentBedroomWolterSexFellatioGive() {
}
function remmyApartmentLivingroomCouchMasturbate(_character = PSDE.player) {
    if (!(_character instanceof Character))
        _character = PSDE.getCharacterByID(_character);
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), lastMenu, "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    if (PSDE.player.hasItem("charlieBigBlackRemmyDildo")) {
        Menu.addOption("remmyApartmentLivingroomCouchMasturbateDildoAnal()", "Ride " + (PSDE.player == PSDE.getCharacterByID("remmy") ? "your" : "Remmy's") + " couch", "Anal, with " + (PSDE.player == PSDE.getCharacterByID("charlie") ? "your" : "Charlie's") + " dildo");
	    if (PSDE.player.getSex() == PSDE.kFemale)
	        Menu.addOption("remmyApartmentLivingroomCouchMasturbateDildoVaginal()", "Ride " + (PSDE.player == PSDE.getCharacterByID("remmy") ? "your" : "Remmy's") + " couch", "Vaginal, with " + (PSDE.player == PSDE.getCharacterByID("charlie") ? "your" : "Charlie's") + " dildo");
	}
    if (PSDE.player.hasItem("remmyMediumPinkRibbedFleshlight") && PSDE.player.getSex() == PSDE.kMale)
        Menu.addOption("remmyApartmentLivingroomCouchMasturbateFleshlight()", "Fuck " + (PSDE.player == PSDE.getCharacterByID("remmy") ? "your" : "Remmy's") + " couch", "With " + (PSDE.player == PSDE.getCharacterByID("remmy") ? "your" : "Remmy's") + " fleshlight");
    Menu.generate();
}
function remmyApartmentLivingroomCouchMasturbateDildoAnal(_character = PSDE.player) {
    if (!(_character instanceof Character))
        _character = PSDE.getCharacterByID(_character);
    
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCouchMasturbateDildoVaginal(_character = PSDE.player) {
    if (!(_character instanceof Character))
        _character = PSDE.getCharacterByID(_character);
    
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCouchMasturbateFleshlight(_character = PSDE.player) {
    if (!(_character instanceof Character))
        _character = PSDE.getCharacterByID(_character);
    
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieInteract() {
    _character = PSDE.getCharacterByID("charlie");
    
    _blob = "";
    if (_character.furniture instanceof Furniture)
    	_blob += "{0} is {1} on the {2}".format(_character.toString(), _character.getStancePresentTense(), _character.furniture.type);
    else if (_character.isFollowing(PSDE.player))
        _blob += "{0} is right beside you".format(_character.toString());
    else
    	_blob += "{0} is standing off to the side of the room".format(_character.toString());

    if (!_character.hasShirt() && !_character.hasPants() && !_character.hasUnderwear())
        _blob += ", completely bare. Her fur is fluffed up along her chest and cheeks, and the room smells of violets. You don't know why she's in your apartment, naked, but you don't really care about the \"why\"s at the moment.";
    else if (!_character.hasShirt() && !_character.hasPants() && _character.hasUnderwear())
        _blob += (" in just her panties, and taking up all the space. Why she's in a pair of carrot panties on your couch, you don't know. It's kind of hard to think right now.");
    else if (!_character.hasShirt() && _character.hasPants())
        _blob += (", topless, with her arms over the back, looking at you. You can see the tip of her tail breifly shift back and forth.");
    else if (_character.hasShirt() && !_character.hasPants() && !_character.hasUnderwear())
        _blob += (", bottomless, peering over the end opposite you. Her fluffy tail is in the way of anything good. You're suddenly feeling very thirsty. Also, you don't know why she's in your apartment in just a turtleneck.");
    else
        _blob += (" in a " + _character.getShirt().toString() + " and " + _character.getPants().toString() + ".");
    
    Content.add("<p>" + _blob + "</p>");
}
function remmyApartmentLivingroomCharlieTalk() {
    _character = PSDE.getCharacterByID("charlie");
    
    if (_character['annoyed'] < 6)
        Menu.addOption("remmyApartmentLivingroomCharlieTalkHi()", "Say hello");
    else
        Menu.addOption("remmyApartmentLivingroomCharlieTalkHiGekkering()", "Say hello, again");
        Menu.addOption("remmyApartmentLivingroomCharlieTalkWhatsUp()", "Ask her what's up");
}
function remmyApartmentLivingroomCharlieTalkWhatsUp() {
    _character = PSDE.getCharacterByID("charlie");
    
    _blob = "";
    _blob += "Sitting down by {0} you ask, \"Hey, {0}, what's up?\" ".format(_character.name);
    contentArray = [];
    contentArray.push("She just stares at you for a moment, before lookup up at the ceiling. A few seconds pass until she says, \"Not your standard of living.\" and you nod in agreement.");
    if (_character.age >= 18) {
        contentArray.push("She grabs your crotch. \"Your dick, apparently,\" she whispers. It doesn't sound quite right with her scratchy voice, but your dick doesn't care.");
        contentArray.push("She grabs your crotch, and then frowns. \"Not your dick, apparently,\" she mutters. Indeed. You're not erect.");
    }
    contentArray.push("You realize she's fallen asleep on the couch.");
    _blob += contentArray[Math.floor(Math.random() * contentArray.length)];
    
    Content.add("<p>" + _blob + "</p>");
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract('{0}', false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    Menu.generate();
    
    
    PSDE.tick("2m", true, false);
}
function remmyApartmentLivingroomCharlieTalkHi() {
    _character = PSDE.getCharacterByID("charlie");
    
    Content.add("You sit beside {0} and say \"Hi,\"<br/>Her lips curl up just a smidgen, and she says \"Hello, Remmy.\"<br/>".format(_character.name));
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract('{0}', false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.addOption("remmyApartmentLivingroomCharlieTalkHiCont()", "Say hello, again");
    
    Menu.generate();
    
    
    PSDE.tick("2m", true, false);
}
function remmyApartmentLivingroomCharlieTalkHiCont() {
    _character = PSDE.getCharacterByID("charlie");
    
    _character['annoyed'] += 1;
    
    if (_character['annoyed'] == 1)
        Content.add("<p>You say \"Hi,\" again.</p><p>The small smile on {0} face is gone as she repeats, \"Hello, {1}.\"</p>".format(_character.objectPronoun(), PSDE.player.surname));
    else if (_character['annoyed'] < 5) {
        Content.add("As you continue bugging the {0} on your couch, {1} eyes gradually open".format(_character.getSpecies(), _character.objectPronoun()));
        if (_character['annoyed'] == 2)
            Content.add(", almost imperceptibly.");
        else if (_character['annoyed'] == 3)
            Content.add(" further.");
        else
            Content.add(" even further. You can now see {0} {1} looking at you.".format(_character.eyeColour, (_character.eyeType == "circle" ? "pupils" : (_character.eyeType == "slit" ? "slits" : "ungulate eyes"))));
        Content.add("<br/>");
    }
    else if (_character['annoyed'] == 5)
        Content.add("<p>You just keep saying \"Hi\" to {0} even as she becomes visibly agitated. {3} {1} irises are visible under a half-lided stare, while {2} lips are pulled back enough to show sharp teeth</p>".format(_character.name, _character.eyeColour, _character.objectPronoun(), _character.objectPronoun().capitalize()));
    else if (_character['annoyed'] == 6)
        Content.add("<p>{0} gets up to leave, but then you call back to {1}; \"{0}, wait!\" {3} stops with {1} back turned to you.</p><p>Again, you say \"Hi.\"</p><p>{0} spins around to face you, grabs your shoulders, and gekkers loudly, moving {1} open mouth closer to yours with each 'gek'. Pushing you onto the other side of your couch, {2} turns back around and leaves.</p><p><i>How rude,</i> you think to yourself.<p/>".format(_character.name, _character.possessiveAdjective(), _character.subjectPronoun(), _character.subjectPronoun().capitalize()));
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract('{0}', false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    if (_character['annoyed'] < 6)
        Menu.addOption("remmyApartmentLivingroomCharlieTalkHiCont()", "Say hello, again");
    
    Menu.generate();
    
    
    PSDE.tick("2m", true, false);
}
function remmyApartmentLivingroomCharlieTalkHiGekkering() {
    _character = PSDE.getCharacterByID("charlie");
    _subCharacter = PSDE.getCharacterByID("wolter");
    
    Content.add("<p>{0} gekkers at you angrily and leaves.</p>".format(_character.name));
    
    PSDE.moveCharacterToRoom(_character, "chartyApartmentBedroomCharlie");

    if (PSDE.getCharacterCurrentRoom(PSDE.player).containsCharacter(wolter) && _subCharacter.isSleeping()) {
        Content.add("<p>{0} wakes with a snort. Sitting up quickly and looking around, {1} has a tired, dopey grin on {2} face.</p><p>\"Hey, {3}, what's cookin'?\" {1} asks, as {4} closes the door to the hallway behind {5}.</p>".format(_subCharacter.name, _subCharacter.subjectPronoun(), _subCharacter.possessivePronoun(), PSDE.player.name, _character.name, _character.objectPronoun()));
        _subCharacter.wake();
    }
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.generate();
    
    PSDE.tick("2m", true, false);
}
function remmyApartmentLivingroomCharlieSex() {
    _character = PSDE.getCharacterByID("charlie");
    _subCharacter = PSDE.getCharacterByID("wolter");
    
    _blob = "";

    if (PSDE.getCharacterCurrentRoom(PSDE.player).containsCharacter(_subCharacter)) {
        if (_subCharacter.isSleeping()) {
            _blob += "<p>Gently sitting on " + (PSDE.getCharacterCurrentRoom(PSDE.player).location.isOwner(PSDE.player) ? "your" : "Remmy's") + " couch, as not to wake Wolter, you lean in close to {0}. \"Wanna see if we can have a quickie without waking Wolter?\" you whisper into her ear. ".format(_character.name);
        	if (PSDE.player.hasItem(charlieBeatingHeart))
        		_blob += "{0}'s head nods, her gaze never leaving your own.</p>".format(_character.name);
    		else
            	_blob += "{0}'s face turns slightly towards Wolter, and sees that he's still sleeping on the couch beside the two of you.</p>".format(_character.name);
		}
    }
    else {
        _blob += "<p>Hopping on the couch, you lean over towards {0} and give her a peck on the cheek. You ask her, \"Let's have some fun, Charlie,\" as she gives you her usual expressionless face.</p>".format(_character.name);
    }
    Content.add(_blob); _blob = "";

    if (_character.stamina < 15) {
    	Content.add("<p>Facing your direction, she tells you, \"I'm exhausted, Remmy. Not now.\" Though her eyes are usually shut, you can see she's struggling to keep herself awake.</p>");
    	if (!PSDE.player.hasItem(charlieBeatingHeart))
    		return false;
    }
    else if (_character.lust < 15 || PSDE.player.calculateChanceToFuck(_character) < 50) {
    	Content.add("<p>\"I'm not <i>in the mood</i>. Maybe later, if you give me a paw rub,\" she tells you, as she stretches one of her footpaws out.</p>");
    	if (!PSDE.player.hasItem(charlieBeatingHeart)) {
            Menu.addOption("charliePawrubGive()", "Give her a paw rub");
    		return false;
        }
    }

    _blob += "<p>Pressing your lips to her neck, you give it a soft bite. ";
    if (PSDE.player.hasItem(charlieBeatingHeart) && (_character.lust < 15 && _character.stamina < 15) || PSDE.player.calculateChanceToFuck(_character) < 50)
    	_blob += "You can feel her heart beat harder as she turns her head away from you.</p><p>\"I told you,\" she says, but trails off as you pat her heart in your pocket.</p><p>\"Are you sure you're not in the mood?\" you ask. Her lips twitch into a snarl as the fur along her neck raises.</p>";
	else
    	_blob += "\"Harder,\" she hisses, and you oblige, leaning into her and biting harder. Pulling away from her neck, you wrap your arms around her shoulders and give her a brief kiss on the lips. Quickly, she wipes saliva off of her lips with the back of her paw.</p>";

    Content.add(_blob); _blob = "";
    
    PSDE.tick("2m", true, false);
    
    if (PSDE.getCharacterCurrentRoom(PSDE.player).containsCharacter(_subCharacter)) {
        if (_subCharacter.isSleeping()) {
            if (PSDE.enableRape) {
                Menu.addOption("remmyApartmentLivingroomCharlieSexWolterRapeSleeping()", "Rape Sleeping Wolter", "{0} will hold him down".format(_character.name));
            }
        }
        else if (!_subCharacter.isSleeping()) {
            Content.add("<p>Wolter looks over at you, and sees {0} spread eagle. Grinning at you, he gets up to leave. \"Yeah, I'm not gonna be a third wheel on this, you two have fun,\" he says with a wave of a paw.".format(_character.name));
            
            Menu.addOption("remmyApartmentLivingroomCharlieSexWolterSex()", "Ask him to join", "Three ways are fun");
            if (PSDE.enableRape) {
                Menu.addOption("remmyApartmentLivingroomCharlieSexWolterRape()", "Force him to join", "Non-Consensual three ways are also fun");
            }
        }
    }
    
    if (PSDE.getCharacterCurrentRoom(PSDE.player).containsCharacter(_subCharacter) && (!_subCharacter.isSleeping()))
        PSDE.setCharacterPath(_subCharacter, twinsApartmentLivingroomA);
}
function remmyApartmentLivingroomCharlieSexWolter() {
    _character = PSDE.getCharacterByID("charlie");
    _subCharacter = PSDE.getCharacterByID("wolter");
    characterMovements.delete(_subCharacter);
    PSDE.player.addSexWith(_subCharacter);
    PSDE.player.addSexWith(_subCharacter);
    
    if (_subCharacter.calculateChanceToFuck(PSDE.player) > 70) {
        Content.add("<p>Wolter leans in for a quick peck on your lips.</p>");
    }
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract('{0}', false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.addOption("remmyApartmentLivingroomCharlieSexWolterSpitroast()", "Spitroast Charlie", "You both spitroast Charlie");
    Menu.addOption("remmyApartmentLivingroomCharlieSexWolterDoubleblowjob()", "Double Blowjob", "Charlie blows the both of you");
    Menu.addOption("remmyApartmentLivingroomCharlieSexWolterDoublestuffAnal()", "Stuff her ass");
    Menu.addOption("remmyApartmentLivingroomCharlieSexWolterDoublestuffVaginal()", "Stuff her pussy");
    Menu.addOption("remmyApartmentLivingroomCharlieSexWolterOneforeachhole()", "Fuck both her holes");
    Menu.generate();
    
    PSDE.tick("5m");
}
function remmyApartmentLivingroomCharlieSexWolterSpitroast() {
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieSexWolterDoubleblowjob() {
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieSexWolterDoublestuffAnal() {
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieSexWolterDoublestuffVaginal() {
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieSexWolterOneforeachhole() {
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieSexRapeSleepingWolter() {
    _character = PSDE.getCharacterByID("charlie");
    _subCharacter = PSDE.getCharacterByID("wolter");
    PSDE.player.addSexWith(_character);
    PSDE.player.addSexWith(_subCharacter);
    
    Menu.clear();
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterATMFacefuck()", "Fuck his face");
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterDoggystyle()", "Doggystyle", "There are no canines involved");
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterMissionary()", "Flip him over", "Look into his eyes as you have your way");
    Menu.generate();
    
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieSexRapeWolter() {
    _character = PSDE.getCharacterByID("charlie");
    _subCharacter = PSDE.getCharacterByID("wolter");
    characterMovements.delete(_subCharacter);
    PSDE.player.addSexWith(_character);
    PSDE.player.addSexWith(_subCharacter);
    
    Menu.clear();
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterATMFacefuck()", "Fuck his face");
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterDoggystyle()", "Doggystyle", "There are no canines involved");
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterMissionary()", "Flip him over", "Look into his eyes as you have your way");
    Menu.generate();
    
    PSDE.tick("5m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterDoggystyle() {
    Menu.clear();
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterATMFacefuck()", "Fuck his face");
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterDoggystyleAnalCreampie()", "Cum inside him");
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterBackbaste()", "Pull out");
    Menu.generate();
}
function remmyApartmentLivingroomCharlieSexRapeWolterMissionary() {
    Menu.clear();
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterATMFacefuck()", "Fuck his face");
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterMissionaryAnalCreampie()", "Cum inside him");
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterBellybutter()", "Pull out");
    Menu.generate();
    
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterFacefuck() {
    Menu.clear();
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterFacefuckMouthful()", "Blow in his mouth");
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterFacefuckFacial()", "Glaze his face");
    Menu.generate();
    
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterFacefuckMouthful() {
    PSDE.tick("5m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterFacefuckFacial() {
    PSDE.tick("5m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterATMFacefuck() {
    PSDE.tick("5m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterDoggystyleAnalCreampie() {
    PSDE.tick("5m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterBackbaste() {
    PSDE.tick("5m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterMissionaryAnalCreampie() {
    PSDE.tick("5m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterBellybutter() {
    PSDE.tick("5m");
}
function remmyApartmentLivingroomCharlieSexCunnilingusGive() {
    _character = PSDE.getCharacterByID("charlie");
    PSDE.player.addSexWith(_character);
        
    Content.add("You tongue-fuck that vixen bitch like no tomorrow.");
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract('{0}', false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.generate();
    
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieSexFellatioGive() {
    _character = PSDE.getCharacterByID("charlie");
    PSDE.player.addSexWith(_character);
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract('{0}', false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.addOption("remmyApartmentLivingroomCharlieSexOralGivingSwallow()", "Cum in her mouth");
    Menu.addOption("remmyApartmentLivingroomCharlieSexOralGivingFacial()", "Cum on her face");
    Menu.generate();
    
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieSexOralGivingSwallow() {
}
function remmyApartmentLivingroomCharlieSexOralGivingFacial() {
}
function remmyApartmentLivingroomCharlieSexVaginalGive() {
    _character = PSDE.getCharacterByID("charlie");
    PSDE.player.addSexWith(_character);
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract('{0}', false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.addOption("remmyApartmentLivingroomCharlieSexVaginalCreampie()", "Cum inside her");
    Menu.addOption("remmyApartmentLivingroomCharlieSexVaginalBellybutter()", "Pull out");
    Menu.generate();
    
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieSexVaginalCreampie() {
}
function remmyApartmentLivingroomCharlieSexVaginalBellybutter() {
}
function remmyApartmentLivingroomCharlieSexAnalGive() {
    _character = PSDE.getCharacterByID("charlie");
    PSDE.player.addSexWith(_character);
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract('{0}', false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.addOption("remmyApartmentLivingroomCharlieSexAnalCreampie()", "Cum inside her");
    Menu.addOption("remmyApartmentLivingroomCharlieSexAnalBackbaste()", "Pull out");
    Menu.generate();
    
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieSexAnalCreampie() {
}
function remmyApartmentLivingroomCharlieSexAnalBackbaste() {
}
function remmyApartmentLivingroomCharlieSexMasturbateGive() {
    _character = PSDE.getCharacterByID("charlie");
    PSDE.player.addSexWith(_character);
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract('{0}', false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.generate();
    
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieSexMasturbateReceive() {
    _character = PSDE.getCharacterByID("charlie");
    _subCharacter = PSDE.getCharacterByID("wolter");
    PSDE.player.addSexWith(_character);
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract('{0}', false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    if (PSDE.getCharacterCurrentRoom(PSDE.player).containsCharacter(_subCharacter))
        if (_subCharacter.isSleeping() && PSDE.enableRape)
            Menu.addOption("remmyApartmentLivingroomCharlieSexMasturbateReceivingRapeWolter()", "Jizz on sleeping Wolter");
    Menu.generate();
    
    PSDE.tick("15m");
}
function remmyApartmentLivingroomCharlieSexMasturbateReceivingRapeWolter() {
}
function remmyApartmentLivingroomWolterInteract() {
    _character = PSDE.getCharacterByID("wolter");
}

function remmyApartmentBathroomCharlieInteract() {
    _character = PSDE.getCharacterByID("charlie");
    
    if (remmyApartmentBathroomTub.hasItem(charlieBigBlackRemmyDildo)) {
        Content.add("<p>{0} looks at you, then tilts her head down to the tub containing sheddings of her fur, and her big {1} shaped oddly like your cock. Looking back at you, she says in her scratchy, monotone voice, \"This is exactly what it looks like, Remmy.\"</p>".format(_character.toString(), charlieBigBlackRemmyDildo.toString()));
    }
}
function remmyApartmentBathroomWolterInteract() {
    _character = PSDE.getCharacterByID("wolter");
    
    if (remmyApartmentBathroomTub.hasItem(charlieBigBlackRemmyDildo))
        Content.add("<p>{0} looks over at the {1} in the tub, then glances over at you with a grin. \"Hey fluff, I don't judge.\"</p>".format(_character.toString(), charlieBigBlackRemmyDildo.toString()));
}

function zootopiaCreditUnion44thEntranceTellerMicelyInteract() {
    _character = PSDE.getCharacterByID("tellerMicely");
}
function zootopiaCreditUnion44thEntranceTellerMicelyTalk() {
    _character = PSDE.getCharacterByID("tellerMicely");
    
    Content.add("<p>Looking up from her computer, the mouse bank teller greets you, \"Good {0}, {1}! How can I help you today?\"</p>".format(PSDE.currentTime.getHours() < 10 ? "morning" : PSDE.currentTime.getHours() < 16 ? "afternoon" : "evening", PSDE.player.getSex() == PSDE.kMale ? "sir" : "ma'am"));
    Menu.addOption("zootopiaCreditUnion44thEntranceTellerMicelyCashCheque(PSDE.player)", "Cash Cheque");
}
function zootopiaCreditUnion44thEntranceTellerMicelyCashCheque() {
    _character = PSDE.getCharacterByID("tellerMicely");

    Content.add("<p>\"I'd like to cash a cheque,\" you say, holding out a paper cheque for her.</p>");

    if (PSDE.cashCheque(PSDE.player)) {
        Content.add("<p>Taking the cheque from your {0}, {1} slides it through a reader, and a moment later a stack of bills starts shuffling out of a machine behind her. Turning around, she grabs the money, and waddles over to you, letting it fall into a neat stack at your {2}</p>".format(PSDE.player.getHand(), _character.toString(), PSDE.player.getHands()));
    }
    else {
        Content.add("<p>\"I'm sorry, but you don't have any valid cheques to cash,\" the mouse says with a shrug.</p>");
    }
    PSDE.tick("2m");
}
