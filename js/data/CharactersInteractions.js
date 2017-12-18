function avoInteract() {
    _character = avo;
    
    unsafeExec("{0}{1}Interact()".format(player.room.sid, _character.id.capitalize()));
}
function avoTalk() {
    _character = avo;
    
    unsafeExec("{0}{1}Talk()".format(player.room.sid, _character.id.capitalize()));
}
function avoRape() {
    _character = avo;
    
    unsafeExec("{0}{1}Rape()".format(player.room.sid, _character.id.capitalize()));
}
function avoSex() {
    _character = avo;
    
    if (chanceToFuck(player, _character) > 50 || player.hasItem(avoBeatingHeart)) {
        unsafeExec("{0}{1}Sex()".format(player.room.sid, _character.id.capitalize()));
    }
    else {
        Content.add("No thank you.");
    }
}
function avoFollow() {
    _character = avo;
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronoun()));
    }
    else {
        Content.add("<p>\"" + _character.name + ",\" you call to " + _character.objectPronoun() + ", and " + _character.subjectPronoun() + " turns to face you. Motioning with a " + player.grammaticalHand + ", you ask " + _character.objectPronoun() + ", \"Follow me.\" " + _character.subjectPronoun() + " looks at you for a moment, before walking to your side.</p>");
        
        characterFollow(player, _character);
    }
    
    characterInteract(_character, false);
}
function avoStay() {
    _character = avo;
    
    Content.add("<p>You ask Avo to wait here, and she nods her head.</p>");
    
    characterStay(_character);
    
    characterInteract(_character, false);
}

function charlieInteract() {
    _character = charlie;
    
    if (player.hasItem(charlieBeatingHeart) && charlie.hasItem(charlieBeatingHeart))
        Content.add("<p>You see Charlie run a paw up her chest as she looks at you in confusion. \"You alright, Charlie?\" you ask her, and she nods slowly.</p>");
    
    if (enableGore && enableRape)
        Menu.addOption("charlieEatCharlie()", "Murder and eat Charlie");

    unsafeExec("{0}{1}Interact()".format(player.room.sid, _character.id.capitalize()));
}
function charlieTalk() {
    _character = charlie;
    
    unsafeExec("{0}{1}Talk()".format(player.room.sid, _character.id.capitalize()));
}
function charlieRape() {
    _character = charlie;
    
    unsafeExec("{0}{1}Rape()".format(player.room.sid, _character.id.capitalize()));
}
function charlieSex() {
    _character = charlie;
    
    if (chanceToFuck(player, _character) > 50 || player.hasItem(charlieBeatingHeart)) {
        unsafeExec("{0}{1}Sex()".format(player.room.sid, _character.id.capitalize()));
    }
    else {
        Content.add("No thank you.");
    }
}
function charlieFollow() {
    _character = charlie;
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronoun()));
    }
    else {
        Content.add("<p>\"" + _character.name + ",\" you call to " + _character.objectPronoun() + ", and " + _character.subjectPronoun() + " turns to face you. Motioning with a " + player.grammaticalHand + ", you ask " + _character.objectPronoun() + ", \"Follow me.\" " + _character.subjectPronoun() + " looks at you for a moment, before walking to your side.</p>");
        
        characterFollow(player, _character);
    }
    
    characterInteract(_character, false);
}
function charlieStay() {
    _character = charlie;
    
    Content.add("<p>You ask Charlie to wait here, and she nods her head.</p>");
    
    characterStay(_character);
    
    characterInteract(_character, false);
}

function remmyInteract() {
    _character = remmy;
    
    unsafeExec("{0}{1}Interact()".format(player.room.sid, _character.id.capitalize()));
}
function remmyTalk() {
    _character = remmy;
    
    unsafeExec("{0}{1}Talk()".format(player.room.sid, _character.id.capitalize()));
}
function remmySex() {
    _character = remmy;

    if (player == remmy)
        Content.add("Now neither of you will be virgins!");
    
    unsafeExec("{0}{1}Sex()".format(player.room.sid, _character.id.capitalize()));
}
function remmyFollow() {
    _character = remmy;
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronoun()));
    }
    else {
        Content.add(String("<p>\"{0},\" you call to {1}, and {2} turns to face you. Motioning with a {3}, you ask {1}, \"Follow me,\"<br/>{2} looks at you for a moment, before walking to your side.</p>").format(_character.name, _character.objectPronoun(), _character.subjectPronoun(), player.grammaticalHand()));
        
        characterFollow(player, _character);
    }
    
    characterInteract(_character, false);
}

function rosieInteract() {
    _character = rosie;

    unsafeExec("{0}{1}Interact()".format(player.room.sid, _character.id.capitalize()));
}
function rosieTalk() {
    _character = rosie;
    
    if (player == charlie) {
        Content.add("<p>You walk casually over to the vixen, your long, fluffy tail puffing up the closer you get.</p>");
        if (rosie.sleeping)
            Content.add("<p>Rosie is lying down peacefully, with her chest rising and falling in a slow rhythm.");
        else
            Content.add("<p>Rosie looks up at you with her sad, blue eyes, as you ask her, \"Hey kid, wanna /ll/?\"");
    }
    unsafeExec(player.room.sid + "RosieTalk()");
}
function rosieSex() {
    _character = rosie;
    
    Content.add("<p>Looking over the vixen, a depreaved idea come to you-<h1 style='display:inline;'>\"No >:v\"</h1></p>");
}
function rosieFollow() {
    _character = rosie;
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronoun()));
    }
    else {
        Content.add(String("<p>\"{0},\" you call to {1}, and {2} turns to face you. Motioning with a {3}, you ask {1}, \"Follow me,\"<br/>{2} looks at you for a moment, before walking to your side.</p>").format(_character.name, _character.objectPronoun(), _character.subjectPronoun(), player.grammaticalHand()));
        
        characterFollow(player, _character);
    }
    
    characterInteract(_character, false);
}

function wolterInteract() {
    _character = wolter;

    unsafeExec("{0}{1}Interact()".format(player.room.sid, _character.id.capitalize()));
}
function wolterTalk() {
    _character = wolter;
    
    unsafeExec("{0}{1}Talk()".format(player.room.sid, _character.id.capitalize()));
}
function wolterRape() {
    _character = wolter;
    
    unsafeExec("{0}{1}Rape()".format(player.room.sid, _character.id.capitalize()));
}
function wolterSex() {
    _character = wolter;
    
    if (_character.isSleeping()) { // :v
    }
    else {
        if (chanceToFuck(player, _character) > 49) {
            if (_character.getCharacterSexCount(player) == 0 && !_character.sleptWithMale) {
                unsafeExec("wolterPlayerFirsttimeSameSexSpecial()");
            }
            else {
                unsafeExec("{0}{1}Sex()".format(player.room.sid, _character.id.capitalize()));
            }
        }
        else { // If character isn't interested
            if (_character.getCharacterSexCount(player) > 1) { // and they've fucked more than once
                Content.add("<p>MISTAKE</p>");
            }
            else if (_character.getCharacterSexCount(player) > 0) { // and they've fucked once
                if (wolter.sex == player.sex && wolter.sexualOrientation == 0)
                    Content.add("<p>Just stay friends</p>");
                else
                    Content.add("<p>ONE TIME THING</p>");
            }
            else { // and they've never fucked
                if (wolter.getCharacterDisposition(player, "eros") > 75 && wolter.getCharacterDisposition(player, "philia") > 55) {
                    if (wolter.sex == player.sex && wolter.sexualOrientation == 0) { // but he's straight and you're gay
                        setTimedFunctionEvent("wolterConsidersJumpingTheFence()", new Cron(undefined, undefined, Number.parseInt(currentTime.getDate() + (Math.random() * (anneke.getCharacterDisposition(player, "philia") > 50 ? 13 : 30) - 10) + 10)), true);
                    }
                }
                        
                if (_character.getSexRefusalCount(player) > 0) // but you're persistent
                    Content.add("<p>STERN NOT INTERESTED</p>");
                else { // but you're interested
                    if (wolter.getCharacterDisposition(player, "eros") > 50) {
                        if (wolter.sex == player.sex && wolter.sexualOrientation == 0)// but he's straight and you're gay
                            Content.add("<p>Attracted, but conflicted. Give it some time.</p>");
                        else
                            Content.add("<p>Attracted, but give it a little more time.</p>");
                    }
                    else if (wolter.getCharacterDisposition(player, "philia") > 50) {
                        if (wolter.sex == player.sex && wolter.sexualOrientation == 0)
                            Content.add("<p>Good friends, but doesn't swing that way.</p>");
                        else
                            Content.add("<p>Good friends, but just that.</p>");
                    }
                    else if (wolter.getCharacterDisposition(player, "storge") > 50) {
                        if (wolter.sex == player.sex && wolter.sexualOrientation == 0)
                            Content.add("<p>Like brother.</p>");
                        else
                            Content.add("<p>Like family.</p>");
                    }
                    else {
                        if (wolter.sex == player.sex && wolter.sexualOrientation == 0)
                            Content.add("<p>Doesn't swing that way.</p>");
                        else
                            Content.add("<p>Not interested.</p>");
                    }
                }
            }

            _character.addSexRefusalCount(player); // The refusal is recorded
        }
    }
}
function wolterFollow() {
    _character = wolter;
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronoun()));
    }
    else {
        Content.add(String("<p>\"{0},\" you call to {1}, and {2} turns to face you. Motioning with a {3}, you ask {1}, \"Follow me,\"<br/>{2} looks at you for a moment, before walking to your side.</p>").format(_character.name, _character.objectPronoun(), _character.subjectPronoun(), player.grammaticalHand()));
        
        characterFollow(player, _character);
    }
    
    characterInteract(_character, false);
}
function wolterHug() {
    
}