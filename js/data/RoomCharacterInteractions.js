function alBuildingBasementRosie() {
    _character = rosie;
    
    Content.clear();
    
    if (_character.sleeping) {
        Content.add("<p>You see Rosie huddled up by a water heater, with a wool blanket wrapped around her. With the rise and fall of her chest, you can tell she's sleeping.</p>");
    }
    else {
        Content.add("WIP");
    }
    Content.add("<p>There are some Bugburga boxes stacked in a neat pile a few feet away from her.</p>");
}
function alBuildingBasementRosieTalk() {
    _character = rosie;
    
    Content.clear();
    
    if (_character.sleeping) {
        Content.add("<p>The small vixen is sleeping, and you don't want to wake her.</p>");
    }
    else {
        Content.add("WIP");
    }
}
function alBuildingSecondFloorHallwayCharlie() {
    _character = charlie;
    
    Content.add("<p>You look at Charlie as you stand in " + player.room.name + "</p>");
}
function alBuildingSecondFloorHallwayCharlieTalk() {
    _character = charlie;
    
    Content.clear();
    
    Content.add("<p>You talk to Charlie as you stand in " + player.room.name + "</p>");
}
function alBuildingSecondFloorHallwayCharlieSex() {
    _character = charlie;
    
    Content.clear();
    
    _blob = "";
    _blob += ("Before you even ask about fucking, Charlie leans over the corner of the stair post, then looks up and down the flights of stairs. You peer over with her, and can't see anyone coming or going.</p>");
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
    
    Content.clear();
    
    if (charlie['annoyed'] >= 6) {
        Content.add("Charlie leaps from her window, and falls to her death two stories down.");
        Content.add("You somehow obtain " + charlieBeatingHeart.toString() + " and " + charlieLeftEye.toString() + ".");
        charlie.living = false;
        moveCharacterToRoom(charlie, limbo);
    }
    
    tick("3m");
}
function remmyApartmentLivingroomCouchSex(_character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    Menu.clear();
    Menu.setOption(7, lastMenu, "Back");
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    if (player.hasItem("charlieBigBlackRemmyDildo"))
        Menu.addOption("remmyApartmentLivingroomCouchSexDildoAnal()", "Ride " + (player == remmy ? "your" : "Remmy's") + " couch", "Anal, with " + (player == charlie ? "your" : "Charlie's") + " dildo");
    if (player.hasItem("charlieBigBlackRemmyDildo") && player.sex == 1)
        Menu.addOption("remmyApartmentLivingroomCouchSexDildoVaginal()", "Ride " + (player == remmy ? "your" : "Remmy's") + " couch", "Vaginal, with " + (player == charlie ? "your" : "Charlie's") + " dildo");
    if (player.hasItem("remmyMediumPinkRibbedFleshlight") && player.sex == 0)
        Menu.addOption("remmyApartmentLivingroomCouchSexFleshlight()", "Fuck " + (player == remmy ? "your" : "Remmy's") + " couch", "With " + (player == remmy ? "your" : "Remmy's") + " fleshlight");
    Menu.generate();
}
function remmyApartmentLivingroomCouchSexDildoAnal(_character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    tick("15m");
}
function remmyApartmentLivingroomCouchSexDildoVaginal(_character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    tick("15m");
    
}
function remmyApartmentLivingroomCouchSexFleshlight(_character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    tick("15m");
    
}
function remmyApartmentLivingroomCharlie() {
    _character = charlie;
    
    _blob = "";
    _blob += ("Charlie is on the couch");
    if (!charlie.hasShirt && !charlie.hasPants() && !charlie.hasUnderwear())
        _blob += (", completely bare, and taking up all the space. Her fur is fluffed up along her chest and cheeks, and the room smells of violets. You don't know why she's in your apartment, naked, but you don't really care about the \"why\"s at the moment.");
    else if (!charlie.hasShirt && !charlie.hasPants() && charlie.hasUnderwear())
        _blob += (" in just her panties, and taking up all the space. Why she's in a pair of carrot panties on your couch, you don't know. It's kind of hard to think right now.");
    else if (!charlie.hasShirt && charlie.hasPants())
        _blob += (", topless, with her arms over the back, looking at you. You can see the tip of her tail breifly shift back and forth.");
    else if (charlie.hasShirt && !charlie.hasPants() && !charlie.hasUnderwear())
        _blob += (", bottomless, peering over the end opposite you. Her fluffy tail is in the way of anything good. You're suddenly feeling very thirsty. Also, you don't know why she's in your apartment in just a turtleneck.");
    else
        _blob += (" in a " + _character.clothingTorso.toString() + " and " + _character.clothingLegs.toString() + ". You invited her over for something, but you can't remember what.");
    
    Content.add("<p>" + _blob + "</p>");
}
function remmyApartmentLivingroomCharlieTalk() {
    _character = charlie;
    
    Content.clear();
    
    if (charlie['annoyed'] < 6)
        Menu.addOption("remmyApartmentLivingroomCharlieTalkHi()", "Say hello");
    else
        Menu.addOption("remmyApartmentLivingroomCharlieTalkHiGekkering()", "Say hello, again");
        Menu.addOption("remmyApartmentLivingroomCharlieTalkWhatsUp()", "Ask her what's up");
}
function remmyApartmentLivingroomCharlieTalkWhatsUp() {
    _character = charlie;
    
    clearContentAndMenu();
    
    
    Content.set("You sit down by Charlie.<br/>\"Hey, Charlie, what's up?\" you ask her, ");
    contentArray = [];
    contentArray.push("and she just stares at you for a moment, before lookup up at the ceiling.<br/>A few seconds pass as she continues to scrutinize your ceiling. \"Not your standard of living.\" she finally says, and you nod in agreement.");
    contentArray.push("and she grabs your crotch. \"Your dick, apparently,\" she whispers. It doesn't sound quite right with her scratchy voice, but your dick doesn't care.");
    contentArray.push("and she grabs your crotch, and then frowns. \"Not your dick, apparently,\" she mutters. Indeed. You're not erect.");
    contentArray.push("but she's managed to fall asleep on the couch.");
    Content.add(contentArray[Math.floor(Math.random() * contentArray.length)]);
    
    
    Menu.setOption(7, "characterInteract(" + _character.id + ")", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    Menu.generate();
    
    
    tick("2m");
}
function remmyApartmentLivingroomCharlieTalkHi() {
    _character = charlie;
    
    clearContentAndMenu();
    
    
    Content.add("You sit beside Charlie and say \"Hi,\"<br/>Her lips curl up just a smidgen, and she says \"Hello, Remmy.\"<br/>");
    
    
    Menu.setOption(7, "characterInteract(" + _character.id + ")", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.addOption("remmyApartmentLivingroomCharlieTalkHiCont()", "Say hello, again");
    
    Menu.generate();
    
    
    tick("2m");
}
function remmyApartmentLivingroomCharlieTalkHiCont() {
    _character = charlie;
    
    clearContentAndMenu();
    
    charlie['annoyed'] += 1;
    
    if (charlie['annoyed'] == 1)
        Content.add("You say \"Hi,\" again.<br/>The small smile on her face is gone as she repeats, \"Hello, Remmy.\"<br/>");
    else if (charlie['annoyed'] < 5) {
        Content.add("You continue saying \"Hi,\" to the vixen on your couch, and her eyes open");
        if (charlie['annoyed'] == 2)
            Content.add(", almost imperceptibly.");
        else if (charlie['annoyed'] == 3)
            Content.add(" further.");
        else
            Content.add(" even further. You can now see blue slivers looking at you.");
        Content.add("<br/>");
    }
    else if (charlie['annoyed'] == 5)
        Content.add("You just keep saying \"Hi,\" to her. Her light blue irises are visible under her half-lided stare, and her lips are pulled back enough to show her sharp teeth; She's breathing audibly through them.<br/>");
    else if (charlie['annoyed'] == 6)
        Content.add("Charlie gets up to leave, but you speak up, \"Charlie, wait!\" you say, and she stops to look at you.<br/>You say your last \"Hi.\"She grabs your shoulders, opening her mouth as wide as she can- you see rows of small, but sharp, predator teeth, as well as the back of her throat-<br/>She gekkers loudly at you, and pushes you onto the other side of your couch.</br>How rude.<br/>");
    
    
    Menu.setOption(7, "characterInteract(" + _character.id + ")", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    if (charlie['annoyed'] < 6)
        Menu.addOption("remmyApartmentLivingroomCharlieTalkHiCont()", "Say hello, again");
    
    Menu.generate();
    
    
    tick("2m");
}
function remmyApartmentLivingroomCharlieTalkHiGekkering() {
    _character = charlie;
    
    clearContentAndMenu();
    
    
    Content.set("<p>Charlie gekkers at you angrily and leaves.</p>");
    
    
    moveCharacterToRoom(charlie, chartyApartmentBedroomCharlie);
    
    
    if (player.room.containsCharacter(wolter) && wolter.sleeping) {
        Content.add("Wolter wakes with a snort. Sitting up quickly and looking around, he has a tired, dopey grin on his face.<br/>\"Hey, lambchop, what's cookin'?\" he asks, as Charlie closes the door to the hallway behind her.");
        wolter.sleeping = false;
    }
    
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    Menu.generate();
    
    
    tick("2m");
}
function remmyApartmentLivingroomCharlieSex() {
    _character = charlie;
    
    Content.clear();
    
    if (player.room.containsCharacter(wolter)) {
        if (wolter.sleeping)
            Content.add("<p>Gently sitting on " + (player.room.owner == player ? "your" : "Remmy's") + " couch, as not to wake Wolter, you lean in close to Charlie. \"Wanna see if we can have a quickie without waking Wolter?\" you whisper into her ear. Charlia's face turns slightly towards Wolter, and sees that he's still sleeping on the couch beside the two of you.</p>");
        else
            Content.add("");
    }
    else
        Content.add("<p>Hopping on the couch, you lean over towards Charlie and nip at her ear. \"Let's have some fun, Charlie,\" you ask.</p>");
    
    _blob = "";
    _blob += ("<p>With an imperceptable smile, she leans back against the couch");
    if (charlie.hasPants() && charlie.hasUnderwear())
        _blob += (" and undoes her pants, pulling them, along with her panties, down to her thighs. She opens her legs, revealing herself to you.");
    else if (charlie.hasPants() && !charlie.hasUnderwear())
        _blob += (" and undoes her pants, pulling them down to her thighs, showing you her pink slit. You're kind of turned on now, seeing that she was going commando.");
    else if (!charlie.hasPants() && charlie.hasUnderwear())
        _blob += (" and tugs her panties down to her thighs, showing you her pink slit.");
    else
        _blob += (" and, already bottomless, spreads her legs.");
    _blob += ("</p>");
    Content.add(_blob);
    
    if (player.room.containsCharacter(wolter)) {
        if (wolter.sleeping) {
            if (enableRape) {
                Menu.addOption("remmyApartmentLivingroomCharlieSexRapeSleepingWolter()", "Rape Sleeping Wolter", "Charlie will hold him down");
            }
        }
        else if (!wolter.sleeping) {
            Content.add("<p>Wolter looks over at you, and sees Charlie spread eagle. Grinning at you, he gets up to leave. \"Yeah, I'm not gonna be a third wheel on this, you two have fun,\" he says with a wave of a paw.");
            
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
    
    tick("2m");
}
function remmyApartmentLivingroomCharlieSexCunnilingusGive() {
    _character = charlie;
    
    player.addSexWith(_character);
    clearContentAndMenu();
    
    Content.set("You tongue-fuck that vixen bitch like no tomorrow.");
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexFellatioGive() {
    _character = charlie;
    player.addSexWith(_character);
    clearContentAndMenu();
    
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption(7, "characterInteract(" + _character.id + ")", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.addOption("remmyApartmentLivingroomCharlieSexOralGivingSwallow()", "Cum in her mouth");
    Menu.addOption("remmyApartmentLivingroomCharlieSexOralGivingFacial()", "Cum on her face");
    Menu.generate();
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexVaginalGive() {
    _character = charlie;
    player.addSexWith(_character);
    clearContentAndMenu();
    
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption(7, "characterInteract(" + _character.id + ")", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.addOption("remmyApartmentLivingroomCharlieSexVaginalCreampie()", "Cum inside her");
    Menu.addOption("remmyApartmentLivingroomCharlieSexVaginalBellybutter()", "Pull out");
    Menu.generate();
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexAnalGive() {
    _character = charlie;
    player.addSexWith(_character);
    clearContentAndMenu();
    
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption(7, "characterInteract(" + _character.id + ")", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.addOption("remmyApartmentLivingroomCharlieSexAnalCreampie()", "Cum inside her");
    Menu.addOption("remmyApartmentLivingroomCharlieSexAnalBackbaste()", "Pull out");
    Menu.generate();
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexMasturbateGive() {
    _character = charlie;
    player.addSexWith(_character);
    clearContentAndMenu();
    
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption(7, "characterInteract(" + _character.id + ")", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    Menu.generate();
    
    tick("15m");
}
function remmyApartmentLivingroomCharlieSexMasturbateReceive() {
    _character = charlie;
    player.addSexWith(_character);
    clearContentAndMenu();
    
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption(7, "characterInteract(" + _character.id + ")", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
    if (player.room.containsCharacter(wolter))
        if (wolter.sleeping && enableRape)
            Menu.addOption("remmyApartmentLivingroomCharlieSexMasturbateReceivingRapeWolter()", "Jizz on sleeping Wolter");
    Menu.generate();
    
    tick("15m");
}
function remmyApartmentLivingroomWolter() {
    _character = wolter;
    
    _blob = "";
    _blob += ("Wolter is " + (wolter.sleeping ? "sleeping" : "laying") + " on the couch");
    if (wolter.hasShirt() && wolter.hasPants()) {
        if (wolter.clothingTorso.owner == anneke)
            _blob += (" in his sister's " + wolter.clothingTorso.toString() + " and " + wolter.clothingLegs.toString());
        else
            _blob += (" in " + wolter.clothingTorso.toString() + " and " + wolter.clothingLegs.toString());
    }
    else if (wolter.hasShirt() && !wolter.hasPants() && wolter.hasUnderwear()) {
        if (wolter.clothingTorso.owner == anneke)
            _blob += (" in his sister's " + wolter.clothingTorso.toString() + " and " + wolter.clothingGroin.toString());
        else
            _blob += (" in " + wolter.clothingTorso.toString() + " and " + wolter.clothingGroin.toString());
    }
    else if (wolter.hasShirt() && !wolter.hasPants() && !wolter.hasUnderwear()) {
        if (wolter.clothingTorso.owner == anneke)
            _blob += (" wearing his sister's " + wolter.clothingTorso.toString() + ", ");
        else
            _blob += (" wearing only a shirt, ");
        _blob += ("and nothing else");
    }
    else if (!wolter.hasShirt() && wolter.hasPants()) {
        _blob += (" shirtless");
    }
    else if (!wolter.hasShirt() && !wolter.hasPants() && wolter.hasUnderwear()) {
        if (wolter.clothingGroin.owner == anneke)
            _blob += (" in his sister's " + wolter.cothingGroin.toString());
        else
            _blob += (" in his " + wolter.cothingGroin.toString());
    }
    else {
        _blob += (", naked");
    }
    _blob += (".");
    
    Content.add("<p>" + _blob + "</p>");
}

function remmyApartmentBathroomCharlie() {
    _character = charlie;
    
    Content.add("<p>Charlie looks at your face, then tilts her head down to the tub containing sheddings of her fur, and her big black dildo shaped oddly like your cock.</p>");
    Content.add("<p>Looking back at you, she says in her scratchy, monotone voice, \"This is exactly what it looks like, Remmy.\"</p>");
}
function remmyApartmentBathroomWolter() {
    _character = wolter;
    
    Content.add("<p>Wolter looks over at the big black sheep dildo in the tub, then glances over at you with a grin. \"Hey ram, I don't judge.\"</p>");
}