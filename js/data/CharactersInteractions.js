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
        Content.add("<p>\"" + _character.name + ",\" you call to " + _character.objectPronoun() + ", and " + _character.subjectPronoun() + " turns to face you. Motioning with a " + player.getHands() + ", you ask " + _character.objectPronoun() + ", \"Follow me.\" " + _character.subjectPronoun() + " looks at you for a moment, before walking to your side.</p>");
        
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
    
    if (player.hasItem(charlieBeatingHeart) && _character.hasItem(charlieBeatingHeart))
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
        Content.add("<p>\"" + _character.name + ",\" you call to " + _character.objectPronoun() + ", and " + _character.subjectPronoun() + " turns to face you. Motioning with a " + player.getHands() + ", you ask " + _character.objectPronoun() + ", \"Follow me.\" " + _character.subjectPronoun() + " looks at you for a moment, before walking to your side.</p>");
        
        characterFollow(player, _character);
    }
    
    characterInteract(_character, false);
}
function charlieStay() {
    _character = charlie;
    
    Content.add("<p>You ask {0} to wait here, and {1} nods {2} head.</p>".format(_character.name, _character.subjectPronoun(), _character.possessiveAdjective()));
    
    characterStay(_character);
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
        Content.add(String("<p>\"{0},\" you call to {1}, and {2} turns to face you. Motioning with a {3}, you ask {1}, \"Follow me,\"<br/>{2} looks at you for a moment, before walking to your side.</p>").format(_character.name, _character.objectPronoun(), _character.subjectPronoun(), player.getHands()));
        
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
        Content.add(String("<p>\"{0},\" you call to {1}, and {2} turns to face you. Motioning with a {3}, you ask {1}, \"Follow me,\"<br/>{2} looks at you for a moment, before walking to your side.</p>").format(_character.name, _character.objectPronoun(), _character.subjectPronoun(), player.getHands()));
        
        characterFollow(player, _character);
    }
    
    characterInteract(_character, false);
}

function wolterInteract() {
    _character = wolter;

    _blob = "";
    if (_character.isLying()) {
        if (_character.isSleeping())
            _blob += "{0} is lying on the {1}, sleeping,".format(_character.name, (_character.furniture instanceof Furniture ? _character.furniture.toString() : "ground"));
        else
            _blob += "{0} is lying on the {1},".format(_character.name, (_character.furniture instanceof Furniture ? _character.furniture.toString() : "ground"));
    }
    else if (_character.isSitting()) {
        if (_character.isSleeping())
            _blob += "{0} is sitting on the {1}, sleeping,".format(_character.name, (_character.furniture instanceof Furniture ? _character.furniture.toString() : "ground"));
        else
            _blob += "{0} is sitting on the {1}".format(_character.name, (_character.furniture instanceof Furniture ? _character.furniture.toString() : "ground"));
    }
    else if (_character.isStanding()) {
        if (_character.isSleeping())
            _blob += "{0} is sleeping, while standing,".format(_character.name);
        else
            _blob += "{0} is standing around".format(_character.name);
    }

    if (_character.hasShirt() && _character.hasPants())
        _blob += " in a {0} and {1},".format(_character.getShirt().toString(), _character.getPants().toString());
    else if (_character.hasShirt() && !_character.hasPants() && _character.hasUnderwear())
        _blob += " in a {0} and {1},".format(_character.getShirt().toString(), _character.getUnderwear().toString());
    else if (_character.hasShirt() && !_character.hasPants() && !_character.hasUnderwear())
        _blob += " in just a {0},".format(_character.getShirt().toString());
    else if (!_character.hasShirt() && _character.hasPants())
        _blob += " shirtless, with just his {0},".format(_character.hasPants().toString);
    else if (!_character.hasShirt() && !_character.hasPants() && _character.hasUnderwear())
        _blob += " in just a {0}{1},".format((_character.getUnderwear().plural ? "pair of " : ""), _character.hasUnderwear());
    else
        _blob += " completely naked,";

    if (_character.lust > 66) {
        if (_character.hasPants())
            _blob += " and he's pitching a tent in his pants.";
        else if (_character.hasUnderwear())
            _blob += " and he's pitching a tent in his {0}.".format(_character.getUnderwear());
        else {
            _blob += " and his dick is out.";
            if (player.sexualOrientationCompatibility(_character))
                _blob += " You pay a little too much ";
            else
                _blob += " You try not to pay ";
            _blob += "attention to that <i>big</i> detail.";
        }
    }

    Content.add("<p>" + _blob + "</p>");

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
        var _ctfLust = calculateChanceToFuck(player, _character);
        var _ctfNoLust = calculateChanceToFuck(player, _character, true);

        // If the Player has a chance to fuck the Character without lust, 
        //  and they're both the same sex, 
        //  and the Character isn't straight, 
        //  and the Character hasn't had sex with the Player, 
        //  and the Character hasn't slept with the same sex before
        if (_ctfNoLust > 49 && _character.sex == player.sex && _character.getSexualOrientation() != 0 && _character.getCharacterSexCount(player) == 0 && ((_character.sex == 0 && !_character.sleptWithMale) || (_character.sex == 1 && !_character.sleptWithFemale))) {
            unsafeExec("wolterPlayerFirsttimeSameSexSpecial()");
        }
        else if (_ctfLust > 49) { // Else if the Player has a chance to fuck the Character with Lust
            unsafeExec("{0}{1}Sex()".format(player.room.sid, _character.id.capitalize()));
        }
        else { // Else Character isn't interested
            if (_character.getCharacterSexCount(player) > 1) { // And they've fucked the Player more than once
                if (_character.sex == player.sex && _character.sexualOrientation == 0)
                    Content.add("<p>&gt;You're poison running through my veins</p>");
                else if (_ctfNoLust > 39)
                    Content.add("<p>Take it slow</p>");
                else
                    Content.add("<p>It was a mistake</p>");
            }
            else if (_character.getCharacterSexCount(player) > 0) { // And they've fucked the Player once
                if (_character.sex == player.sex && _character.sexualOrientation == 0)
                    Content.add("<p>One time thing</p>");
                else if (_ctfNoLust > 39)
                    Content.add("<p>Take it slow</p>");
                else
                    Content.add("<p>Just stay friends</p>");
            }
            else { // And they've never fucked the Player
                // If the Player has a chance at fucking a gay Wolter, add the gay event trigger
                if (_character.sex == player.sex && _character.sexualOrientation == 0) {
                    var _tmpLust = _character.lust;
                    var _tmpRut = _character.rut;

                    _character.setSexualOrientation(2); // Sets sexuality to bisexual
                    _character.setLust(0); // Sets lust to 0
                    _character.setRut(false); // Sets rut to false

                    if (_ctfNoLust > 49) // If the Player has a chance to fuck the Character without lust
                        setTimedFunctionEvent("wolterConsidersJumpingTheFence()", new Cron(undefined, undefined, Number.parseInt(currentTime.getDate() + (Math.random() * (anneke.getCharacterDisposition(player, "philia") > 50 ? 13 : 30) - 10) + 10)), true);
                    
                    _character.setSexualOrientation(0); // Sets sexuality back to straight
                    _character.setLust(_tmpLust); // Sets lust back to what it was before
                    _character.setRut(_tmpRut); // Sets rut back to what it was before
                }
                
                if (_character.getSexRefusalCount(player) > 1) // But the Player is a little too persistent
                    Content.add("<p>STERN UNINTEREST</p>");
                else if (_character.getSexRefusalCount(player) > 0) // But the Player asked again
                    Content.add("<p>Stern uninterest</p>");
                else { // But the Player still asked
                    if (_character.getCharacterDisposition(player, "eros") > 50) {
                        if (_character.sex == player.sex && _character.sexualOrientation == 0)// And the Player is gay, but the Character is straight
                            Content.add("<p>Attracted, but conflicted. Give it some time.</p>");
                        else
                            Content.add("<p>Attracted, but give it a little more time.</p>");
                    }
                    else if (_character.getCharacterDisposition(player, "philia") > 50) {
                        if (_character.sex == player.sex && _character.sexualOrientation == 0)
                            Content.add("<p>Good friends, but doesn't swing that way.</p>");
                        else
                            Content.add("<p>Good friends, but just that.</p>");
                    }
                    else if (_character.getCharacterDisposition(player, "storge") > 50) {
                        if (_character.sex == player.sex && _character.sexualOrientation == 0)
                            Content.add("<p>Like brother.</p>");
                        else
                            Content.add("<p>Like family.</p>");
                    }
                    else {
                        if (_character.sex == player.sex && _character.sexualOrientation == 0)
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
        Content.add(String("<p>\"{0},\" you call to {1}, and {2} turns to face you. Motioning with a {3}, you tell {1}, \"Follow me.\" {2} looks at you for a moment, before walking to your side.</p>").format(_character.name, _character.objectPronoun(), _character.subjectPronoun(), player.getHand()));
        
        characterFollow(player, _character);
    }
}
function wolterStay() {
    _character = wolter;
    
    Content.add("<p>You ask {0} to wait here, and {1} nods {2} head.</p>".format(_character.name, _character.subjectPronoun(), _character.possessiveAdjective()));
    
    characterStay(_character);
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
                        _character.decPhilautia(1);
                    }
                    else {
                        _arr = ["<p>Hooking an arm around {0}'s side, you pull him into a hug. His arms wrap around yours, and you feel them tighten up briefly.</p>".format(_character.name)];
                    }
                }
                else if (_character.dating(player)) {
                    _arr = [
                        "<p>Bringing your arms around {0}, he leans into you and holds you in return. \"You're handsome,\" you say, before pressing your lips to his. His eyes close as his paws travel up your back, pulling you further into the kiss. After a few moments, you part, and he smiles at you with a half-lidded gaze. \"{1}\" he says, and leans in for another kiss.</p>".format(_character.name, player.sex == 0 ? "You're not too bad yourself, stud," : "And you're beautiful,"),
                        "<p>Slipping your {1} under {0}'s arms, you pull him against you. \"Love you,\" you say, looking up at his smile. He dips his head down, and presses his lips against the top of your muzzle. \"Love you too, {2}.\" he says, followed by another kiss to your cheek.</p>".format(_character.name, player.getHands(), player.name)
                    ];
                    _character.incLust(1);
                }
                else {
                    "<p></p>".format(_character.name)
                }
            }
            else if (_disposition.eros > 66 && _character.lust > 33) {
                if ((_character.sexualOrientation == 0 && _character.sex == player.sex) || (_character.sexualOrientaiton == 1 && _character.sex != player.sex)) {
                    _arr = [
                        "<p>You feel {0} jolt as you wrap your arms around him. Feeling something hard press against your leg, you see the {0} look away, grinning. \"Uh, sorry about that {1}, but you should'a warned a guy.\"</p>{2}".format(_character.name, player.sex == 0 ? "man" : player.name, player.lust > 50 ? "<p>Leaning into him, you say in a sultry voice, or as good a one as you can manage, \"Maybe I like like surprising <i>guys</i>.\"</p>" : ""),
                        "<p>{0} leans in as you wrap your arms around him. His body feels unusually warm, and you can feel his breath against your neck. \"Wolter, you're hot,\" you say, stepping away from him. He looks up at you, and you can see his unfocused gaze before he squeezes his eyes shut.</p><p>{1}</p><p>{0} takes in a deep breath and slowly lets it out, his nostrils flaring as his toes curl in. He looks away from you nervously and squeezes his legs together. \"Yeah, I think I might be catching ah, something,\" he says, and for a brief moment gives you a strange look.</p>".format(_character.name, player.sex == 0 ? "After a moment, you realize what you said, and quickly correct yourself, \"I mean, you're warm.\"" : "\"You're really warm,\" you correct yourself.")
                    ];
                }
                else if (_character.dating(player)) {
                    _arr = [
                        "<p>You wrap your arms around {0} and pull him close to you. As his arms lock around you too, he leans his muzzle in and presses it gently against yours. In that slow drawl you've come to love, he says to you, \"That's not a flashlight pressing against your thighs.\"</p><p><i>{1} damnit, {0}.</i> you think as you let out a sigh. \"Way to ruin the mood,\" you mutter, pressing your lips to his again. He just lets out a muffled laugh, and holds onto you just a little big longer.</p>".format(_character.name, (player.manaMax > 0 ? "the gods" : "God")),
                        "<p>Coming at {0} from behind, you snake your {1} around his waist as he tries to turn around. Pressing your body against his back, you refuse to give him any wiggle room.</p><p>\"Someone's feeling frisky,\" he says as he leans into you, giving up in his struggle. You slide a {2} down his stomach, and slow stroke it against his crotch. \"Frisking sounds fun,\" you say softly into his ear, groping at his dick.</p>".format(_character.name, player.getHands(), player.getHand()),
                        "<p>You give {0} a quick hug. It becomes a little awkward when he pulls you in further.</p><p>\"You're so soft{1},\" he says a few seconds later, and moves both of his paws down your back.</p>".format(_character.name, player.sex == 0 ? ", man" : "")
                    ];
                    player.incLust(4);
                    _character.incLust(15);
                    _character.setRut(true);
                }
                else {
                    "<p></p>".format(_character.name)
                }
            }
            else if (_disposition.eros > 33) {
                if ((_character.sexualOrientation == 0 && _character.sex == player.sex) || (_character.sexualOrientaiton == 1 && _character.sex != player.sex))
                    _arr = ["<p>Spreading your arms wide, you take {0} into a warm hug that he returns. As you move apart, you feel one of his paws slip down your side, but move away at your waist.</p>".format(_character.name)];
                else
                    _arr = ["<p>You wrap your arms around {0} and he leans in to you. As you quickly part, his paws linger at your sides for a moment longer.</p>".format(_character.name)];
                _character.incLust(1);
            }
            else {
                _arr = [
                    "<p>Spreading your arms wide, you take {0} into a warm hug that he returns. You can almost hear what sounds like a purr coming from his throat.</p>".format(_character.name),
                    "<p>You give {0} a quick bro hug. It becomes a little awkward when he pulls you in further.</p><p>\"You're so soft{1},\" he says a few seconds later, after finally letting you go.</p>".format(_character.name, player.sex == 0 ? ", man" : "")
                ];
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