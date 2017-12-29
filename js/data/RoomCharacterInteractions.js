function alBuildingBasementRosieInteract() {
    _character = rosie;
    
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
    _character = rosie;
    
    if (_character.isSleeping()) {
        Content.add("<p>The small vixen is sleeping, and you don't want to wake her.</p>");
    }
    else {
        Content.add("WIP");
    }
}
function alBuildingSecondFloorHallwayCharlieInteract() {
    _character = charlie;
    
    Content.add("<p>You look at {0} as you stand in {1}</p>".format(_character.name, player.room.name));
}
function alBuildingSecondFloorHallwayCharlieTalk() {
    _character = charlie;
    
    Content.add("<p>You talk to {0} as you stand in {1}</p>".format(_character.name, player.room.name));
}
function alBuildingSecondFloorHallwayCharlieSex() {
    _character = charlie;
    
    _blob = "";
    _blob += ("Before you even ask about fucking, {0} leans over the corner of the stair post, then looks up and down the flights of stairs. You peer over with her, and can't see anyone coming or going.</p>".format(_character.name));
    if (charlie.hasPants && charlie.hasPanties)
        _blob += ("<p>Undoing her pants, she tugs them down, along with her panties, and lifts her tail up. Widening her stance, she exposes her bare ass and pussy to you.");
    else if (charlie.hasPants && !charlie.hasPanties)
        _blob += ("<p>Undoing her pants, she tugs them down, revealing that she wasn't wearing panties, and lifts her tail up. Widening her stance, she exposes her bare ass and pussy to you.");
    else if (!charlie.hasPants && charlie.hasPanties)
        _blob += ("<p>Reaching a paw down, she slips her panties down to her ankles and hikes her tail up. Widening her stance, she exposes her bare ass and pussy to you.");
    else
        _blob += ("<p>Hiking her tail up and widening her stance, she exposes her bare ass and pussy to you.");
    
    Content.add("<p>" + _blob + "</p>");
}
function alBuildingSecondFloorHallwayCharlieSexAnalGive() {
    _character = charlie;
    player.addSexWith(_character);
}
function alBuildingSecondFloorHallwayCharlieSexVaginalGive() {
    _character = charlie;
    player.addSexWith(_character);
}
function alBuildingSecondFloorHallwayCharlieSexFellatioReceive() {
    _character = charlie;
    player.addSexWith(_character);
}
function alBuildingSecondFloorHallwayCharlieSexCunnilingusGive() {
    _character = charlie;
    player.addSexWith(_character);
}
function alBuildingSecondFloorHallwayCharlieSexCunnilingusReceive() {
    _character = charlie;
    player.addSexWith(_character);
}
function alBuildingSecondFloorHallwayCharlieSexAnalingusGive() {
    _character = charlie;
    player.addSexWith(_character);
}
function alBuildingSecondFloorHallwayCharlieSexAnalingusReceive() {
    _character = charlie;
    player.addSexWith(_character);
}

function chartyApartmentBedroomCharlieCharlieTalk() {
    _character = charlie;
    
    if (charlie['annoyed'] >= 6) {
        Content.add("{0} leaps from her window, and falls to her death two stories down.".format(_character.name));
        Content.add("You somehow obtain " + charlieBeatingHeart.toString() + " and " + charlieLeftEye.toString() + ".");
        charlie.living = false;
        setCharacterRoom(charlie, limbo);
    }
    
    tick("3m");
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
function remmyApartmentLivingroomCouchMasturbate(_character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), lastMenu, "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    if (player.hasItem("charlieBigBlackRemmyDildo")) {
        Menu.addOption("remmyApartmentLivingroomCouchMasturbateDildoAnal()", "Ride " + (player == remmy ? "your" : "Remmy's") + " couch", "Anal, with " + (player == charlie ? "your" : "Charlie's") + " dildo");
	    if (player.sex == 1)
	        Menu.addOption("remmyApartmentLivingroomCouchMasturbateDildoVaginal()", "Ride " + (player == remmy ? "your" : "Remmy's") + " couch", "Vaginal, with " + (player == charlie ? "your" : "Charlie's") + " dildo");
	}
    if (player.hasItem("remmyMediumPinkRibbedFleshlight") && player.sex == 0)
        Menu.addOption("remmyApartmentLivingroomCouchMasturbateFleshlight()", "Fuck " + (player == remmy ? "your" : "Remmy's") + " couch", "With " + (player == remmy ? "your" : "Remmy's") + " fleshlight");
    Menu.generate();
}
function remmyApartmentLivingroomCouchMasturbateDildoAnal(_character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    tick("15m");
}
function remmyApartmentLivingroomCouchMasturbateDildoVaginal(_character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    tick("15m");
}
function remmyApartmentLivingroomCouchMasturbateFleshlight(_character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieInteract() {
    _character = charlie;
    
    _blob = "";
    if (_character.furniture instanceof Furniture)
    	_blob += "{0} is {1} on the {2}".format(_character.toString(), _character.currentActionPresentParticiplePosition(), _character.furniture.type);
    else if (_character.isFollowing(player))
        _blob += "{0} is right beside you".format(_character.toString());
    else
    	_blob += "{0} is standing off to the side of the room".format(_character.toString());

    if (!charlie.hasShirt() && !charlie.hasPants() && !charlie.hasUnderwear())
        _blob += ", completely bare. Her fur is fluffed up along her chest and cheeks, and the room smells of violets. You don't know why she's in your apartment, naked, but you don't really care about the \"why\"s at the moment.";
    else if (!charlie.hasShirt() && !charlie.hasPants() && charlie.hasUnderwear())
        _blob += (" in just her panties, and taking up all the space. Why she's in a pair of carrot panties on your couch, you don't know. It's kind of hard to think right now.");
    else if (!charlie.hasShirt() && charlie.hasPants())
        _blob += (", topless, with her arms over the back, looking at you. You can see the tip of her tail breifly shift back and forth.");
    else if (charlie.hasShirt() && !charlie.hasPants() && !charlie.hasUnderwear())
        _blob += (", bottomless, peering over the end opposite you. Her fluffy tail is in the way of anything good. You're suddenly feeling very thirsty. Also, you don't know why she's in your apartment in just a turtleneck.");
    else
        _blob += (" in a " + _character.getShirt().toString() + " and " + _character.getPants().toString() + ".");
    
    Content.add("<p>" + _blob + "</p>");
}
function remmyApartmentLivingroomCharlieTalk() {
    _character = charlie;
    
    if (charlie['annoyed'] < 6)
        Menu.addOption("remmyApartmentLivingroomCharlieTalkHi()", "Say hello");
    else
        Menu.addOption("remmyApartmentLivingroomCharlieTalkHiGekkering()", "Say hello, again");
        Menu.addOption("remmyApartmentLivingroomCharlieTalkWhatsUp()", "Ask her what's up");
}
function remmyApartmentLivingroomCharlieTalkWhatsUp() {
    _character = charlie;
    
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
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    Menu.generate();
    
    
    tick("2m", true, false);
}
function remmyApartmentLivingroomCharlieTalkHi() {
    _character = charlie;
    
    Content.add("You sit beside {0} and say \"Hi,\"<br/>Her lips curl up just a smidgen, and she says \"Hello, Remmy.\"<br/>".format(_character.name));
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.addOption("remmyApartmentLivingroomCharlieTalkHiCont()", "Say hello, again");
    
    Menu.generate();
    
    
    tick("2m", true, false);
}
function remmyApartmentLivingroomCharlieTalkHiCont() {
    _character = charlie;
    
    charlie['annoyed'] += 1;
    
    if (charlie['annoyed'] == 1)
        Content.add("<p>You say \"Hi,\" again.</p><p>The small smile on {0} face is gone as she repeats, \"Hello, {1}.\"</p>".format(_character.objectPronoun(), player.name));
    else if (charlie['annoyed'] < 5) {
        Content.add("As you continue bugging the {0} on your couch, {1} eyes gradually open".format(_character.getSpeciesName(), _character.objectPronoun()));
        if (charlie['annoyed'] == 2)
            Content.add(", almost imperceptibly.");
        else if (charlie['annoyed'] == 3)
            Content.add(" further.");
        else
            Content.add(" even further. You can now see {0} {1} looking at you.".format(_character.eyeColour, (_character.eyeType == 0 ? "pupils" : (_character.eyeType == 1 ? "slits" : "ungulate eyes"))));
        Content.add("<br/>");
    }
    else if (charlie['annoyed'] == 5)
        Content.add("<p>You just keep saying \"Hi\" to {0} even as she becomes visibly agitated. {3} {1} irises are visible under a half-lided stare, while {2} lips are pulled back enough to show sharp teeth</p>".format(_character.name, _character.eyeColour, _character.objectPronoun(), _character.objectPronoun().capitalize()));
    else if (charlie['annoyed'] == 6)
        Content.add("<p>{0} gets up to leave, but then you call back to {1}; \"{0}, wait!\" {3} stops with {1} back turned to you.</p><p>Again, you say \"Hi.\"</p><p>{0} spins around to face you, grabs your shoulders, and gekkers loudly, moving {1} open mouth closer to yours with each 'gek'. Pushing you onto the other side of your couch, {2} turns back around and leaves.</p><p><i>How rude,</i> you think to yourself.<p/>".format(_character.name, _character.possessiveAdjective(), _character.subjectPronoun(), _character.subjectPronoun().capitalize()));
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    if (charlie['annoyed'] < 6)
        Menu.addOption("remmyApartmentLivingroomCharlieTalkHiCont()", "Say hello, again");
    
    Menu.generate();
    
    
    tick("2m", true, false);
}
function remmyApartmentLivingroomCharlieTalkHiGekkering() {
    _character = charlie;
    
    Content.add("<p>{0} gekkers at you angrily and leaves.</p>".format(_character.name));
    
    setCharacterRoom(charlie, chartyApartmentBedroomCharlie);

    if (player.room.containsCharacter(wolter) && wolter.isSleeping()) {
        Content.add("<p>{0} wakes with a snort. Sitting up quickly and looking around, {1} has a tired, dopey grin on {2} face.</p><p>\"Hey, {3}, what's cookin'?\" {1} asks, as {4} closes the door to the hallway behind {5}.</p>".format(wolter.name, wolter.subjectPronoun(), wolter.possessivePronoun(), player.name, charlie.name, charlie.objectPronoun()));
        wolter.isSleeping() = false;
    }
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.generate();
    
    tick("2m", true, false);
}
function remmyApartmentLivingroomCharlieSex() {
    _character = charlie;
    
    _blob = "";

    if (player.room.containsCharacter(wolter)) {
        if (wolter.isSleeping()) {
            _blob += "<p>Gently sitting on " + (player.room.isOwner(player) ? "your" : "Remmy's") + " couch, as not to wake Wolter, you lean in close to {0}. \"Wanna see if we can have a quickie without waking Wolter?\" you whisper into her ear. ".format(_character.name);
        	if (player.hasItem(charlieBeatingHeart))
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
    	Content.add("<p>\"I'm exhausted, Remmy. Not now,\" she tells you in a tired. Though her eyes are usually shut, you can see she's struggling to keep herself awake.</p>");
    	if (!player.hasItem(charlieBeatingHeart))
    		return false;
    }
    else if (_character.lust < 15 || calculateChanceToFuck(remmy, charlie) < 50) {
    	Content.add("<p>\"I'm not <i>in the mood</i>. Maybe later, if you give me a paw rub,\" she tells you, as she stretches one of her footpaws out.</p>");
    	if (!player.hasItem(charlieBeatingHeart))
    		return false;
    }

    _blob += "<p>Pressing your lips to her neck, you give it a soft bite. ";
    if (player.hasItem(charlieBeatingHeart) && (_character.lust < 15 && _character.stamina < 15) || calculateChanceToFuck(remmy, charlie) < 50)
    	_blob += "You can feel her heart beat harder as she turns her head away from you.</p><p>\"I told you,\" she says, but trails off as you pat her heart in your pocket.</p><p>\"Are you sure you're not in the mood?\" you ask.</p><p>Her lips twitch into a snarl as the fur along her neck raises. With shaking paws, she leans back against the couch and ";
	else
    	_blob += "\"Harder,\" she hisses, and you oblige, leaning into her and biting harder. Pulling away from her neck, you wrap your arms around her shoulders and give her a brief kiss on the lips.</p><p>\"You know I don't like kissing, Remmy,\" she lets out, but leans back against the couch and ";

    if (charlie.hasPants() && charlie.hasUnderwear())
        _blob += "undoes her pants, pulling them, along with her panties, down to her thighs. She opens her legs, revealing herself to you.";
    else if (charlie.hasPants() && !charlie.hasUnderwear())
        _blob += "undoes her pants, pulling them down to her thighs, showing you her pink slit. You're kind of turned on now, seeing that she was going commando.";
    else if (!charlie.hasPants() && charlie.hasUnderwear())
        _blob += "tugs her panties down to her thighs, showing you her pink slit.";
    else
        _blob += ", already bottomless, spreads her legs.";
    _blob += "</p>";
    Content.add(_blob);
    
    if (player.hasItem(charlieBeatingHeart) && calculateChanceToFuck(remmy, charlie) < 50) {

    }
    else {
	    if (player.room.containsCharacter(wolter)) {
	        if (wolter.isSleeping()) {
	            if (enableRape) {
	                Menu.addOption("remmyApartmentLivingroomCharlieSexRapeSleepingWolter()", "Rape Sleeping Wolter", "{0} will hold him down".format(_character.name));
	            }
	        }
	        else if (!wolter.isSleeping()) {
	            Content.add("<p>Wolter looks over at you, and sees {0} spread eagle. Grinning at you, he gets up to leave. \"Yeah, I'm not gonna be a third wheel on this, you two have fun,\" he says with a wave of a paw.".format(_character.name));
	            
	            Menu.addOption("remmyApartmentLivingroomCharlieSexWolter()", "Ask him to join", "Three ways are fun");
	            if (enableRape) {
	                Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolter()", "Force him to join", "Non-Consensual three ways are also fun");
	            }
	        }
	    }
    
	    Menu.addOption("remmyApartmentLivingroomCharlieSexCunnilingusGive()", "Eat her out");
	    if (player.sex == 0)
	        Menu.addOption("remmyApartmentLivingroomCharlieSexFellatioGive()", "Get a blowjob");
	    else
	        Menu.addOption("remmyApartmentLivingroomCharlieSexCunnilingusReceive()", "Get her to eat you out");
	    Menu.addOption("remmyApartmentLivingroomCharlieSexVaginalGive()", "Vaginal");
	    Menu.addOption("remmyApartmentLivingroomCharlieSexAnalGive()", "Anal");
	    Menu.addOption("remmyApartmentLivingroomCharlieSexMasturbateGive()", "Finger her", "Hoof her, really.");
	    Menu.addOption("remmyApartmentLivingroomCharlieSexMasturbateReceive()", "Let her jerk you off", "Pawpads are better than hooves.");
	}
    
    tick("2m", true, false);
    
    if (player.room.containsCharacter(wolter) && (!wolter.isSleeping()))
        setCharacterPath(wolter, twinsApartmentLivingroomA);
}
function remmyApartmentLivingroomCharlieSexWolter() {
    characterMovements.delete(wolter);
    player.addSexWith(charlie);
    player.addSexWith(wolter);
    
    if (wolter.calculateChanceToFuck(player) > 70) {
        Content.add("<p>Wolter leans in for a quick peck on your lips.</p>");
    }
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.addOption("remmyApartmentLivingroomCharlieSexWolterSpitroast()", "Spitroast Charlie", "You both spitroast Charlie");
    Menu.addOption("remmyApartmentLivingroomCharlieSexWolterDoubleblowjob()", "Double Blowjob", "Charlie blows the both of you");
    Menu.addOption("remmyApartmentLivingroomCharlieSexWolterDoublestuffAnal()", "Stuff her ass");
    Menu.addOption("remmyApartmentLivingroomCharlieSexWolterDoublestuffVaginal()", "Stuff her pussy");
    Menu.addOption("remmyApartmentLivingroomCharlieSexWolterOneforeachhole()", "Fuck both her holes");
    Menu.generate();
    
    tick("5m");
}
function remmyApartmentLivingroomCharlieSexWolterSpitroast() {
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexWolterDoubleblowjob() {
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexWolterDoublestuffAnal() {
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexWolterDoublestuffVaginal() {
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexWolterOneforeachhole() {
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexRapeSleepingWolter() {
    player.addSexWith(charlie);
    player.addSexWith(wolter);
    
    Menu.clear();
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterATMFacefuck()", "Fuck his face");
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterDoggystyle()", "Doggystyle", "There are no canines involved");
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterMissionary()", "Flip him over", "Look into his eyes as you have your way");
    Menu.generate();
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexRapeWolter() {
    characterMovements.delete(wolter);
    player.addSexWith(charlie);
    player.addSexWith(wolter);
    
    Menu.clear();
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterATMFacefuck()", "Fuck his face");
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterDoggystyle()", "Doggystyle", "There are no canines involved");
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterMissionary()", "Flip him over", "Look into his eyes as you have your way");
    Menu.generate();
    
    tick("5m");
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
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterFacefuck() {
    Menu.clear();
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterFacefuckMouthful()", "Blow in his mouth");
    Menu.addOption("remmyApartmentLivingroomCharlieSexRapeWolterFacefuckFacial()", "Glaze his face");
    Menu.generate();
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterFacefuckMouthful() {
    tick("5m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterFacefuckFacial() {
    tick("5m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterATMFacefuck() {
    tick("5m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterDoggystyleAnalCreampie() {
    tick("5m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterBackbaste() {
    tick("5m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterMissionaryAnalCreampie() {
    tick("5m");
}
function remmyApartmentLivingroomCharlieSexRapeWolterBellybutter() {
    tick("5m");
}
function remmyApartmentLivingroomCharlieSexCunnilingusGive() {
    player.addSexWith(charlie);
        
    Content.add("You tongue-fuck that vixen bitch like no tomorrow.");
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.generate();
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexFellatioGive() {
    _character = charlie;
    player.addSexWith(_character);
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.addOption("remmyApartmentLivingroomCharlieSexOralGivingSwallow()", "Cum in her mouth");
    Menu.addOption("remmyApartmentLivingroomCharlieSexOralGivingFacial()", "Cum on her face");
    Menu.generate();
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexOralGivingSwallow() {
}
function remmyApartmentLivingroomCharlieSexOralGivingFacial() {
}
function remmyApartmentLivingroomCharlieSexVaginalGive() {
    _character = charlie;
    player.addSexWith(_character);
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.addOption("remmyApartmentLivingroomCharlieSexVaginalCreampie()", "Cum inside her");
    Menu.addOption("remmyApartmentLivingroomCharlieSexVaginalBellybutter()", "Pull out");
    Menu.generate();
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexVaginalCreampie() {
}
function remmyApartmentLivingroomCharlieSexVaginalBellybutter() {
}
function remmyApartmentLivingroomCharlieSexAnalGive() {
    _character = charlie;
    player.addSexWith(_character);
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.addOption("remmyApartmentLivingroomCharlieSexAnalCreampie()", "Cum inside her");
    Menu.addOption("remmyApartmentLivingroomCharlieSexAnalBackbaste()", "Pull out");
    Menu.generate();
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexAnalCreampie() {
}
function remmyApartmentLivingroomCharlieSexAnalBackbaste() {
}
function remmyApartmentLivingroomCharlieSexMasturbateGive() {
    _character = charlie;
    player.addSexWith(_character);
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.generate();
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexMasturbateReceive() {
    _character = charlie;
    player.addSexWith(_character);
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    if (player.room.containsCharacter(wolter))
        if (wolter.isSleeping() && enableRape)
            Menu.addOption("remmyApartmentLivingroomCharlieSexMasturbateReceivingRapeWolter()", "Jizz on sleeping Wolter");
    Menu.generate();
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexMasturbateReceivingRapeWolter() {
}
function remmyApartmentLivingroomWolterInteract() {
    _character = wolter;
}

function remmyApartmentBathroomCharlieInteract() {
    _character = charlie;
    
    if (remmyApartmentBathroomTub.hasItem(charlieBigBlackRemmyDildo)) {
        Content.add("<p>{0} looks at you, then tilts her head down to the tub containing sheddings of her fur, and her big {1} shaped oddly like your cock. Looking back at you, she says in her scratchy, monotone voice, \"This is exactly what it looks like, Remmy.\"</p>".format(_character.toString(), charlieBigBlackRemmyDildo.toString()));
    }
}
function remmyApartmentBathroomWolterInteract() {
    _character = wolter;
    
    if (remmyApartmentBathroomTub.hasItem(charlieBigBlackRemmyDildo))
        Content.add("<p>{0} looks over at the {1} in the tub, then glances over at you with a grin. \"Hey fluff, I don't judge.\"</p>".format(_character.toString(), charlieBigBlackRemmyDildo.toString()));
}