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
    
    if (calculateChanceToFuck(player, _character) > 50 || player.hasItem(avoBeatingHeart)) {
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
    
    if (calculateChanceToFuck(player, _character) > 50 || player.hasItem(charlieBeatingHeart)) {
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
        if (calculateChanceToFuck(player, _character) > 49) {
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
    _character = wolter;
    var _arr = new Array();
    var _disposition = _character.getCharacterDisposition(player);

    if (_character.hasMet(player)) {
        if (_disposition.philia > 66) {
            if (_disposition.pragma > 50) {
                if ((_character.sexualOrientation == 0 && _character.sex == player.sex) || (_character.sexualOrientaiton == 1 && _character.sex != player.sex)) {
                    if (_character.hadSexWith(player)) {
                        _arr = ["<p>As you wrap your arms around {0}, you feel him jump a bit. \"Oh, hey {1}.\" he says with a hint of strain, but he joins in your hug after a moment. You feel his breath against your neck briefly, before he pulls away.</p>".format(_character.name, player.name)];
                        /*
                            NOTE: limit the results from actions committed to the _character from the player within a day to prevent abuse
                        */
                        _character.decPhilautia(1);
                    }
                    else {
                        _arr = ["<p>Hooking an arm around {0}'s side, you pull him into a hug. His arms wrap around yours, and you feel them tighten up briefly.</p>".format(_character.name)];
                    }
                }
                else {
                    _arr = [
                        "<p>Bringing your arms around {0}, he leans into you and holds you in return. \"You're handsome,\" you say, before pressing your lips to his. His eyes close as his paws travel up your back, pulling you further into the kiss. After a few moments, you part, and he smiles at you with a half-lidded gaze. \"{1}\" he says, and leans in for another kiss.</p>".format(_character.name, player.sex == 0 ? "You're not too bad yourself, stud," : "And you're beautiful,"),
                        "<p>Slipping your {1} under {0}'s arms, you pull him against you. \"Love you,\" you say, looking up at his smile. He dips his head down, and presses his lips against the top of your muzzle. \"Love you too, {2}.\" he says with, followed by another kiss to your cheek.</p>".format(_character.name, player.getHands(), player.name)
                    ];
                    _character.incLust(1);
                }
            }
            else if (_disposition.eros > 66 && _character.lust > 50) {
                if ((_character.sexualOrientation == 0 && _character.sex == player.sex) || (_character.sexualOrientaiton == 1 && _character.sex != player.sex)) {
                    _arr = [
                        "<p>You feel {0} jolt as you wrap your arms around him. Feeling something hard press against your leg, you see the {0} look away, grinning. \"Uh, sorry about that {1}, but you should'a warned a guy.\"</p>{2}".format(_character.name, player.sex == 0 ? "man" : player.name, player.lust > 50 ? "<p>Leaning into him, you say in a sultry voice, or as good a one as you can manage, \"Maybe I like like surprising <i>guys</i>.\"</p>" : ""),
                        "<p>{0} leans in as you wrap your arms around him. His body feels unusually warm, and you can feel his breath against your neck. \"Wolter, you're hot,\" you say, stepping away from him. He looks up at you, and you can see his unfocused gaze before he squeezes his eyes shut.</p><p>{1}</p><p>{0} takes in a deep breath and slowly lets it out, his nostrils flaring as his toes curl in. He looks away from you nervously and squeezes his legs together. \"Yeah, I think I might be catching ah, something,\" he says, and for a brief moment gives you a strange look.</p>".format(_character.name, player.sex == 0 ? "After a moment, you realize what you said, and quickly correct yourself, \"I mean, you're warm.\"" : "\"You're really warm,\" you correct yourself.")
                    ];
                }
                else {
                    _arr = [
                        "<p>You wrap your arms around {0} and pull him close to you. As his arms lock around you too, he leans his muzzle in and presses it gently against yours. In that slow drawl you've come to love, he says to you, \"That's not a flashlight pressing against your thighs.\"</p><p><i>{1} damnit, {0}.</i> you think as you let out a sigh. \"Way to ruin the mood,\" you mutter, pressing your lips to his again. He just lets out a muffled laugh, and holds onto you just a little big longer.</p>".format(_character.name, (player.manaMax > 0 ? "the gods" : "God")),
                        "<p>Coming at {0} from behind, you snake your {1} around his waist as he tries to turn around. Pressing your body against his back, you refuse to give him any wiggle room.</p><p>\"Someone's feeling frisky,\" he says as he leans into you, giving up in his struggle. You slide a {2} down his stomach, and slow stroke it against his crotch. \"Frisking sounds fun,\" you say softly into his ear, groping at his dick.</p>".format(_character.name, player.getHands(), player.getHand())
                    ];
                }
                player.incLust(4);
                _character.incLust(15);
                _character.setRut(true);
            }
            else if (_disposition.eros > 33) {
                if ((_character.sexualOrientation == 0 && _character.sex == player.sex) || (_character.sexualOrientaiton == 1 && _character.sex != player.sex))
                    _arr = ["<p>Spreading your arms wide, you take {0} into a warm hug that he returns. As you move apart, you feel one of his paws slip down your side, but move away at your waist.</p>".format(_character.name)];
                else
                    _arr = ["<p>You wrap your arms around {0} and he leans in to you. As you quickly part, his paws linger at your sides for a moment.</p>".format(_character.name)];
                _character.incLust(1);
            }
            else {
                _arr = ["<p>Spreading your arms wide, you take {0} into a warm hug that he returns.</p>".format(_character.name)];
                _character.incCharacterPhilia(player, 1);
            }
        }
        else if (_disposition.philia > 33) {
            if (_disposition.eros > 66 && _character.lust > 50) {
                if ((_character.sexualOrientation == 0 && _character.sex == player.sex) || (_character.sexualOrientaiton == 1 && _character.sex != player.sex)) {
                    if (_character.hadSexWith(player)) // Horny, had gay sex, has conflicted feelings, but isn't like that anymore.
                        _arr = ["<p></p>".format(_character.name)];
                    else // Horny, haven't fucked, has conflicted feelings.
                        _arr = ["<p></p>".format(_character.name)];
                }
                else {
                    if (_character.hadSexWith(player)) // Horny, had gay sex, no conflicted feelings, would probably do it again.
                        _arr = ["<p></p>".format(_character.name)];
                    else // Horny, hasn't had gay sex, no conflicted feelings, would probably do it.
                        _arr = ["<p></p>".format(_character.name)];
                }
            }
            else if (_disposition.eros > 33) { // Equal parts friend and attraction. Could be each other's wingman, with a little bit of banter flirting.
                _arr = ["<p></p>".format(_character.name)];
            }
            else { // Casual friend with no erotic attraction.
                _arr = ["<p>You give {0} a hug, which he briefly returns.</p>".format(_character.name)];
            }
        }
        else { // Acquaintance
            if ((_character.sexualOrientation == 0 && _character.sex == player.sex) || (_character.sexualOrientaiton == 1 && _character.sex != player.sex)) { // Dude, what, don't hug me
                _arr = ["<p></p>".format(_character.name)];
            }
            else { // Well, since you've got assets I like, this is fine
                _arr = ["<p></p>".format(_character.name)];
            }
        }
    }
    else { // Who the hell are you?
    }

    Content.add(_arr.getRandom());
}