function avoInteract(_clearContent = true) {
    _character = PSDE.getCharacterByID("avo");
    
    unsafeExec("{0}{1}Interact({2})".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize(), _clearContent));
}
function avoTalk() {
    _character = PSDE.getCharacterByID("avo");
    
    unsafeExec("{0}{1}Talk()".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize()));
}
function avoRape() {
    _character = PSDE.getCharacterByID("avo");
    
    unsafeExec("{0}{1}Rape()".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize()));
}
function avoSex() {
    _character = PSDE.getCharacterByID("avo");
    
    if (PSDE.player.calculateChanceToFuck(_character)) {
        unsafeExec("{0}{1}Sex()".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize()));
    }
    else {
        Content.add("No thank you.");
    }
}
function avoFollow() {
    _character = PSDE.getCharacterByID("avo");
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronoun()));
    }
    else {
        Content.add("<p>\"" + _character.name + ",\" you call to " + _character.objectPronoun() + ", and " + _character.subjectPronoun() + " turns to face you. Motioning with a " + PSDE.player.getHands() + ", you ask " + _character.objectPronoun() + ", \"Follow me.\" " + _character.subjectPronoun() + " looks at you for a moment, before walking to your side.</p>");
        
        return true;
    }
    return false;
}
function avoStay() {
    _character = PSDE.getCharacterByID("avo");
    
    Content.add("<p>You ask Avo to wait here, and she nods her head.</p>");
    
    PSDE.characterStay(_character);
    
    PSDE.characterInteract(_character, false);
}

function charlieInteract(_clearContent = true) {
    _character = PSDE.getCharacterByID("charlie");
    
    if (_clearContent) {
        if (PSDE.player.hasItem("charlieBeatingHeart") && _character.hasItem("charlieBeatingHeart"))
            Content.add("<p>You see {0} run a paw up her chest as she looks at you in confusion. \"You alright, Charlie?\" you ask her, and she nods slowly.</p>".format(_character.name));
    }

    if (PSDE.enableGore && PSDE.enableRape)
        Menu.addOption("charlieEatCharlie()", "Murder and eat {0}".format(_character.name));

    unsafeExec("{0}{1}Interact({2})".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize(), _clearContent));
}
function charlieTalk() {
    _character = PSDE.getCharacterByID("charlie");
    
    if (_character.getCharacterDisposition(PSDE.player, "passion") > 50 && _character.getCharacterDisposition(PSDE.player, "friendship") > 50) {
        if (_character.hasDated(PSDE.player)) {
            if (!_character.isDatingCharacter(PSDE.player))
                Menu.addOption("charlieDateAsk()", "Ask {0} out, again".format(_character.objectPronoun()));
            else
                Menu.addOption("charlieDateSchedule()", "Go out on a date");
        }
        else if (!_character.hasDated(PSDE.player))
            Menu.addOption("charlieFirstDateAsk()", "Ask {0} out".format(_character.objectPronoun()));
    }

    unsafeExec("{0}{1}Talk()".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize()));
}
function charlieRape() {
    _character = PSDE.getCharacterByID("charlie");
    
    unsafeExec("{0}{1}Rape()".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize()));
}
function charlieSex() {
    _character = PSDE.getCharacterByID("charlie");
    
    if (PSDE.player.calculateChanceToFuck(_character) > 49 || PSDE.player.hasItem("charlieBeatingHeart")) {
        Menu.clear();
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract({0}, false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

        Menu.addOption("charlieSexCunnilingusGive()", "Eat her out");
        if (PSDE.player.getSex() == PSDE.kMale) Menu.addOption("charlieSexFellatioGive()", "Get a blowjob");
        else Menu.addOption("charlieSexCunnilingusReceive()", "Get her to eat you out");
        Menu.addOption("charlieSexVaginalGive()", "Vaginal");
        Menu.addOption("charlieSexAnalGive()", "Anal");
        Menu.addOption("charlieSexMasturbateGive()", "Finger her", (PSDE.player.getHand() == "hoof" ? "Hoof her, really." : ""));
        Menu.addOption("charlieSexMasturbateReceive()", "Let her jerk you off", "Pawpads are better than hooves.");

        unsafeExec("{0}{1}Sex()".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize()));

        Menu.generate();
    }
    else {
        Content.add("No thank you.");
    }
}
function charlieSexVaginalGive() {
    _character = PSDE.getCharacterByID("charlie");

    _ctf = PSDE.player.calculateChanceToFuck(_character);
    _blob = "";
    
}
function charlieSexFellatioGive() {
    _character = PSDE.getCharacterByID("charlie");

    if (_character.hasBodyPartSlickWithCum("mouth") && PSDE.player.hasBodyPartSlickWithCum("penis"))
        charlieSexFellatioGiveAgain();
    else
        charlieSexFellatioGiveInitial();
}
function charlieSexFellatioGiveInitial() {
    _character = PSDE.getCharacterByID("charlie");

    _ctf = PSDE.player.calculateChanceToFuck(_character);
    _blob = "";

    if (PSDE.player.hasItem("charlieBeatingHeart") && _ctf < 50)
        _blob += "\"Blow me,\" " + PSDE.subjectPronoun() + " tell" + (PSDE.pov == 3 ? "s" : "") + " the vixen, ";
    else
        _blob += "\"Wanna go down on me?\" " + PSDE.subjectPronoun() + " ask" + (PSDE.pov == 3 ? "s" : "") + " her, ";

    if (PSDE.getCharacterCurrentRoom(PSDE.player).characters.size == 2) {
        if (PSDE.player.hasItem("charlieBeatingHeart")) {
            _blob += "and her eyes never leave " + PSDE.possessivePronoun() + " as she nods her head.";
        }
        else {
            _blob += "to which she gives a brief shrug. Licking her lips, her head tilts towards " + PSDE.possessivePronoun() + " as she purrs \"Sure.\"";
        }
    }
    else {
        _character.s = new Array();
        _otherCharactersSleeping = true;
        PSDE.getCharacterCurrentRoom(PSDE.player).characters.forEach(function(__character) {
            if (__character != _character && __character != PSDE.player) {
                _character.s.push(__character);
                if (!__character.isSleeping())
                    _otherCharactersSleeping = false;
            }
        }, this);

        if (!PSDE.enableRape && PSDE.player.hasItem("charlieBeatingHeart")) {
            if (!PSDE.enableRape) {
                _blob += "\"You are weak, " + PSDE.player.surname + ",\" she sneers before lunging at " + PSDE.objectPronoun() + ".";
                _blob += "Her paws quickly find her heart on " + PSDE.possessiveAdjective() + " person, and a moment later she's swallowed it whole.</p>";
                _blob += "<p>Poking a claw to " + PSDE.possessiveAdjective() + " chest, she fixes " + PSDE.objectPronoun(true) + " with a tired glare, \"Do that again, " + PSDE.player.surname + ", and I will eat you alive.\" and snaps her teeth in front of " + PSDE.possessiveAdjective() + " nose.</p>";
                _blob += "<p>Also, " + PSDE.presentContinuousTense(true, true) + " bleeding profusely where she poked " + PSDE.objectPronoun() + " in the chest.";
                
                PSDE.player.removeItem("charlieBeatingHeart");
                _character.consume("charlieBeatingHeart");
                PSDE.player.decLife(15);

                Content.add("<p>" + _blob + "</p>");

                return false;
            }
            else {
                _blob += "and her snarl barely leaves her face as her head dips down. \"I will do this anywhere but here, mammals are watching,\" " + PSDE.subjectPronoun(true) + " hear" + (PSDE.pov == 3 ? "s" : "") + " her say. Pressing one of " + PSDE.possessiveAdjective() + " " + PSDE.player.getHands() + " on top of her head, she lets out a weak \"Please,\"";
                
                Content.add("<p>" + _blob + "</p>");

                Menu.clear();
                Menu.addOption(_charlieSexFellatioGiveReluctantFollow(), "Yes", "Go somewhere discrete");
                Menu.addOption(_charlieSexFellatioGiveReluctantForce(), "No", "Fuck her in front of {0}".format(_character.s.length == 1 ? _character.s[0].name : "the others"));
                Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract({0}, false)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
                Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
                Menu.generate();
                
                return undefined;
            }
        }
        else if (_otherCharactersSleeping) {
            if (PSDE.player.hasItem("charlieBeatingHeart"))
                _blob += "and her snarl barely leaves her face as her head dips down. " + PSDE.subjectPronoun().capitalize() + " double-check that " + PSDE.possessiveAdjective() + " company is sleeping.";
            if (_character.s.length == 1) {
                if (_character.exhibitionism > 66)
                    _blob += "and before " + PSDE.presentContinuousTense(true, true) + " able to check if " + _character.s[0].name + " is sleeping, " + PSDE.subjectPronoun() + " feel" + (PSDE.pov == 3 ? "s" : "") + " " + _character.singularPossessiveName() + " paw on " + PSDE.possessiveAdjective() + " thigh.";
                else if (_character.exhibitionism > 33)
                    _blob += "glancing over at " + _character.s[0].name + " to ensure they're sleeping. " + PSDE.subjectPronoun(true).capitalize() + " barely see" + (PSDE.pov == 3 ? "s" : "") + " " + _character.singularPossessiveName() + " eyes flicker in " + _character.s[0].subjectPronoun() + " direction."
                else
                    _blob += "as both " + _character.name + " and " + PSDE.subjectPronoun() + " look over at " + _character.s[0].name + ". From what " + PSDE.subjectPronoun() + " can tell, " + _character.s[0].subjectPronoun() + "'s sleeping.";
            }
            else if (_character.s.length == 2) {
                if (_character.exhibitionism > 66)
                    _blob += "and glance over at " + _character.s[0].name + " and " + _character.s[1].name + " to see if they're still sleeping. Before " + PSDE.subjectPronoun(true) + " can check " + _character.s[1].name + ", though, " + PSDE.subjectPronoun() + " feel" + (PSDE.pov == 3 ? "s" : "") + " " + _character.singularPossessiveName() + " paw press against " + PSDE.possessiveAdjective() + " waist.";
                else if (_character.exhibitionism > 33)
                    _blob += "glancing over at " + _character.s[0].name + " and " + _character.s[1].name + " as they sleep, " + PSDE.subjectPronoun() + " barely see" + (PSDE.pov == 3 ? "s" : "") + " " + _character.singularPossessiveName() + " eyes flicker in their direction.";
                else
                    _blob += "as both " + _character.name + " and " + PSDE.subjectPronoun() + " look over at " + _character.s[0].name + " and " + _character.s[1].name + ". From what " + PSDE.subjectPronoun() + " can tell, they're both sleeping.";
            }
            else {
                if (_character.exhibitionism > 66)
                    _blob += "and before " + PSDE.subjectPronoun() + " can check if the mammals around " + PSDE.objectPronoun() + " are sound asleep, " + PSDE.subjectPronoun() + " feel" + (PSDE.pov == 3 ? "s" : "") + " " + _character.singularPossessiveName() + " paw against " + PSDE.possessiveAdjective() + " thigh.";
                else if (_character.exhibitionism > 33)
                    _blob += "as " + PSDE.subjectPronoun() + " look" + (PSDE.pov == 3 ? "s" : "") + " around the room, making sure the mammals around " + PSDE.objectPronoun() + " are really sleeping. " + PSDE.subjectPronoun().capitalize() + " see " + _character.name + " just glance to " + _character.possessiveAdjective() + ".";
                else
                    _blob += "the both of " + PSDE.objectPronounPlural() + " look around the room, making sure that the mammals around " + PSDE.objectPronounPlural() + " are sleeping.";
            }
        }
        else {
            _blob += "and she shakes her head. \"Not here, with prying eyes.\" she whispers just loud enough for " + PSDE.objectPronoun() + " to hear.";
            if (_character.isStanding() && PSDE.player.isStanding())
                _blob += "As she walks beside " + PSDE.objectPronoun(true) + ", " + PSDE.subjectPronoun() + " feel" + (PSDE.pov == 3 ? "s" : "") + " her tail brush against " + PSDE.possessiveAdjective() + " legs. \"Lead the way to some place discrete, " + PSDE.player.surname + ".\"";
            else
                _blob += "Standing up, she walks beside " + PSDE.objectPronoun(true) + " and brushes her tail against " + PSDE.possessiveAdjective() + " legs. \"Lead the way to some place discrete, " + PSDE.player.surname + ".\"";

            Content.add("<p>" + _blob + "</p>");

            _character.follow(PSDE.player);

            return false;
        }
        _blob += " Pressing a single finger to her lips, she signals for " + PSDE.objectPronoun() + " to be quiet.";
    }

    Content.add("<p>" + _blob + "</p>");
    _blob = "";

    if (PSDE.player.isStanding()) {
        if (_character.isStanding()) // Kneel
            _blob += "Kneeling down in front of " + PSDE.objectPronoun(true) + ", the vixen brings her head closer to " + PSDE.possessiveAdjective() + " waist ";
        else if (_character.isSitting()) // Sit
            _blob += "Still sitting, the vixen leans forward, bringing her head closer to " + PSDE.possessiveAdjective(true) + " waist ";
        else if (_character.isLying()) // Sit
            _blob += "Sitting up, the vixen braces her paws on " + PSDE.possessiveAdjective(true) + " side for a moment before bringing her head closer to " + PSDE.possessiveAdjective() + " waist ";
    }
    else if (PSDE.player.isSitting()) {
        if (_character.isStanding()) // Kneel
            _blob += "Kneeling down on the floor in front of " + PSDE.objectPronoun(true) + ", the vixen brings her head between " + PSDE.possessiveAdjective() + " legs ";
        else if (_character.isSitting()) // Lean
            _blob += "The vixen leans over " + PSDE.possessiveAdjective(true) + " lap ";
        else if (_character.isLying()) // Lean
            _blob += "The vixen sits up, leaning over " + PSDE.possessiveAdjective(true) + " lap, ";
    }
    else if (PSDE.player.isLying()) {
        if (_character.isStanding()) // Kneel
            _blob += "";
        else if (_character.isSitting()) // Lean
            _blob += "";
        else if (_character.isLying()) // Lean
            _blob += "";
    }

    if (PSDE.player.hasPants()) {
        _blob += "as " + PSDE.subjectPronoun() + " und" + (PSDE.pov == 3 ? "oes" : "o") + " " + PSDE.possessiveAdjective() + " " + PSDE.player.getPants().name + " and ";
        if (PSDE.player.hasUnderwear())
            _blob += "pull" + (PSDE.pov == 3 ? "s" : "") + " down " + PSDE.possessiveAdjective() + " " + PSDE.player.getUnderwear().name + ", letting";
        else
            _blob += "let" + (PSDE.pov == 3 ? "s" : "");
        _blob +=  " " + PSDE.possessiveAdjective() + " " + (PSDE.player.lust > 66 ? "hard" : PSDE.player.lust > 33 ? "firm" : "flaccid") + " dick out.";
        PSDE.player.disrobe("pants");
        PSDE.player.disrobe("underwear");
    }
    else if (PSDE.player.hasUnderwear()) {
        _blob += "as " + PSDE.subjectPronoun() + " pull" + (PSDE.pov == 3 ? "s" : "") + " down " + PSDE.possessiveAdjective() + " " + PSDE.player.getUnderwear().name + ", and let" + (PSDE.pov == 3 ? "s" : "") + " " + PSDE.possessiveAdjective() + " " + (PSDE.player.lust > 66 ? "hard" : PSDE.player.lust > 33 ? "firm" : "flaccid") + " out.";
        PSDE.player.disrobe("underwear");
    }
    else
        _blob += "letting a hot breath out over " + PSDE.possessiveAdjective() + " " + (PSDE.player.lust > 66 ? "hard" : PSDE.player.lust > 33 ? "firm" : "flaccid") + " dick.";
    Content.add("<p>" + _blob + "</p>");
    _blob = "";

    // bodyPartsSlickWithPre and bodyPartsSlickWithCum content here, eventually
    
    Content.add("<p>Her cold nose presses against the tip, and you can feel a tickle of air against your delicate skin. As her mouth opens, you see her tongue poke out past her bottom lip as she takes the head of your cock into your mouth. Before her lips close, though, you can feel the heat of her mouth and tongue.</p>");
    Content.add("<p>For a few seconds, you feel her tongue slide up and down what little of your member is inside her mouth as well as her lips, and a bit of saliva trickles down her chin and your shaft. Then, gradually, with her lips forming a tight seal around you, she pulls her head back. While you feel a brief cool where her mouth once was, her vacuum-like seal around your dick increases.</p>");
    Content.add("<p>Twirling her tongue between her lips, she pushes forward, taking a quarter of your cock past her now-glistening lips. Her tongue continues to glide around you, squeezing and pulling, and with its unique length, stroking every inch that she choose to take into her mouth. Your {0} find their way to the back of her head as she lets out a vibrating humm in response. \"You're amazing, Charlie,\" you say with a sigh.</p>".format(PSDE.player.getHands()));
    Content.add("<p>Really looking down at her, you see her face is calm and relaxed, aside from her jaw. Her black lips then tug along your shaft as she pulls her head back, and tilts to the side, rubbing your meat against her teeth. You want to winch at the idea of being pricked by one of her canines, but she pushed forward again, taking half of your length before stopping, and squeezing around what's in her mouth with her tongue.</p>");
    Content.add("<p>Your {0} move against her head until they both are at the base of her ears. You don't know if foxes have any pleasure spots there, but you decide to give them a few firm strokes to the tips.</p>".format(PSDE.player.getHands()))
    Content.add("<p>{0} lets out a garbled moan and for a few seconds you see her eyes open as they roll back in her head. \"Hah, wow, you really like that?\" you ask her as the corners of her mouth twitch into a dopy, non-Charlie-like smile around your girth.</p>".format(_character.name));
    Content.add("<p>Once her eyes squeeze shut again, you feel her pull back like the last few times. Once its just the head of your penis in her mouth, instead of bobbing forward again and taking more of you, you feel her tongue flick and prod at the tip. It was odd, for the first few moments, \"Oh, god, whatever you're doing don't stop!\" until she found a spot that made your {0} curl and caused you to sqeeuze at her ears a little harder than you should have.</p>".format(PSDE.player.getHands()));
    Content.add("<p>Sucking harder than before, she continues lashing at that one spot that made had you practically cradling her head in your arms, trying to force her muzzle into your crotch. Your peak was approaching, and your hips were giving arrythmic thrusts with her quick work. As your breathing became laboured, and you felt like your were about to blow, one of her paws pushed between your legs and under your balls, and grinded against your taint.</p>");
    Content.add("<p>Right as your were seeing stars, feeling yourself ready to cum, her other paw grabbed around the base of your cock, squeezing it like a vice. Still, though, she kept working her magic tongue, and you felt that moment of bliss finally come, and then the heat of her mouth and throat taking you all the way to where her other paw continued its choke hold on your rod.</p>");
    if (_character.fellatioGiveCount > 5) {
        Content.add("<p>Pulling her head back one last time, she lets go of your dick, and you feel the warmth of your cum splash against her tongue and over what of yourself was in her mouth. Her tongue licks at your tip, mixing saliva and cum around in her mouth as it seaps out from between her lips and down her chin.</p>");
        Content.add("<p>You watch as she takes in short, small gulps between sucking what's left out of you and your own petering out orgasm. With her cheeks showing a noticable bulge, you assume she's probably trying to enjoy the taste until she released your member from her mouth with a wet pop, leaving what looks like a hickey over a quarter of your dick.</p>");
        if (_character.lust > 66) {
            Content.add("<p>Then, to your growing horror, something which you couldn't escape because of how drained you felt, her face entered your vision, and her warm, wet slips pressed against yours.</p>");
            Content.add("<p>Your hot, thick cum poured into your mouth, and you wanted to gag. It was a bit frothy from when she stirred it with her tongue, and it slips past your lips, along your tongue, and down the back of your throat. Just as you thought the moment couldn't get any worse, though, {0}'s tongue pulled at yours, and she sucked the cum back into her mouth, and pushed it back into yours.</p>".format(_character.name));
            Content.add("<p>The worst thing, though, was that you were really turned on.</p>");
            _character.odorSex += 35;
            PSDE.player.addBodyPartSlickWithCum("neck");
            PSDE.player.addBodyPartSlickWithCum("mouth");
        }
        else {
            Content.add("<p>Her head tilts back, revealing the soft fur of her neck, as her purses her lips and swallows with a loud gulp. You can see some of her saliva and your seed had escaped her lips while she was blowing you, and left streaks down her lips, and the fur of her chin and neck.</p>");
            Content.add("<p>Swallowing again, the bulge of her cheeks is gone.</p>");
            _character.odorSex += 15;
        }
    }
    else {
        Content.add("<p>Pulling her head back one last time, she lets go of your dick, and you feel the warmth of your cum splash against her tongue and pool around your member. She takes in an unexpected gasp, and from what you can guess, breathes in some of your load as she pulls her head back and muffles cough with a paw.</p>");
        Content.add("<p>Instead of another load of cum going in her muzzle, though, it lands across it, giving her a pearly white streak from her nose to her ear. Opening her mouth, she grabs your shaft and tries to aim it at her tongue after another spurt of cum hits her chin and neck. A desperate huff leaves her as she strokes you, and a last streak of cum lands across the roof of her mouth and tongue.</p>");
        Content.add("<p>Giving your dick a last, slow stroke, her tongue catches the seed that dribbles out. Letting your erection hang and slowly grow flaccid, she runs a paw over her face, collecting your cum, and tries to lick it clean.</p>");
        Content.add("<p>You can't really tell if she did a good job, since cum blends really well with her fur colour.</p>");
        _character.addBodyPartSlickWithCum("head");
        PSDE.player.addBodyPartSlickWithCum("balls");
        _character.odorSex += 50;
    }

    _character.oral(PSDE.player);
    _character.incLust(15);
    _character.decStamina(10);
    _character.addBodyPartSlickWithPre("vagina");
    _character.addBodyPartSlickWithCum("mouth");
    _character.addBodyPartSlickWithCum("neck");

    PSDE.player.decLust(25);
    PSDE.player.decStamina(5);
    PSDE.player.odorSex = 10;
    PSDE.player.addBodyPartSlickWithCum("penis");

    if (PSDE.player.stamina < 15 || PSDE.player.lust == 0) {
        _blob += "Deciding " + PSDE.presentPerfectTense(true) + " had enough fun, " + PSDE.subjectPronoun() + " ";
        if (PSDE.player.hasPants()) {
            if (PSDE.player.hasUnderwear())
                _blob += "tuck" + (PSDE.pov == 3 ? "s" : "") + " " + PSDE.possessiveAdjective() + " flaccid dick into " + PSDE.possessiveAdjective() + " " + PSDE.player.getUnderwear() + " and slip " + PSDE.possessiveAdjective() + " " + PSDE.player.getPants() + " back on.";
            else
                _blob += "slip" + (PSDE.pov == 3 ? "s" : "") + " " + PSDE.possessiveAdjective() + " " + PSDE.player.getPants() + " back on over " + PSDE.possessiveAdjective() + " flaccid dick.";
        }
        else if (PSDE.player.hasUnderwear())
            _blob += "tuck" + (PSDE.pov == 3 ? "s" : "") + " " + PSDE.possessiveAdjective() + " flaccid dick into your " + PSDE.player.getUnderwear() + "."
        else
            _blob += "wipe" + (PSDE.pov == 3 ? "s" : "") + " " + PSDE.possessiveAdjective() + " dripping dick on her muzzle."; // idk :v
        Content.add("<p>" + _blob + "</p>");
        _blob = "";
    }
    
    if (PSDE.getCharacterCurrentRoom(PSDE.player).location.id == "chartyApartmentLocation" || PSDE.getCharacterCurrentRoom(PSDE.player).location.id == "PSDE.playerApartmentLocation") {
        Menu.addOption("_charlieSexFellatioGivePostAskShower()", "Shower?", "Ask her if she wants to share a shower.")
        Menu.generate();
    }
}
function charlieSexFellatioGiveAgain() {
    _character = PSDE.getCharacterByID("charlie");

    _ctf = PSDE.player.calculateChanceToFuck(charlie);
    _blob = "";

    if (PSDE.player.hasItem("charlieBeatingHeart") && _ctf < 50)
        return; // Something to do later
}
function _charlieSexFellatioGivePostAskShower() {
    _character = PSDE.getCharacterByID("charlie");

    Content.add("<p>\"How about a shower?\" " + PSDE.subjectPronoun(true).capitalize() + " ask" + (PSDE.pov == 3 ? "s" : "") + " with a grin, looking over the slightly glazed vixen.</p><p>\"Yes. That would be best, before your cum sets in. I'll also be using your toothbrush.\" " + PSDE.subjectPronoun() + " see" + (PSDE.pov == 3 ? "s" : "") + " her wipe the back of her paw against her muzzle, smearing more proof of " + PSDE.possessiveAdjectivePlural() + " recent activities across her fur.</p>");
    _character.follow(PSDE.player);
}
function _charlieSexFellatioGiveReluctantFollow() {
    _character = PSDE.getCharacterByID("charlie");

}
function _charlieSexFellatioGiveReluctantForce() {
    _character = PSDE.getCharacterByID("charlie");
    
    Content.add("<p>Her eyes open just enough for you to see her thin, black pupils. \"I hate you, {0}.\"</p>".format(PSDE.player.getFullName()));
    if (_character.isDatingCharacter(PSDE.player)) {
        _character.dumpCharacter(PSDE.player);
        _character.incCharacterMiseo(PSDE.player, 20);
    }
    else
        _character.incCharacterMiseo(PSDE.player, 25);
    return true;
}
function _charlieSexUndressA() {
    _character = PSDE.getCharacterByID("charlie");
    
    _reluctant = PSDE.player.hasItem("charlieBeatingHeart") && (_character.lust < 15 && _character.stamina < 15) || PSDE.player.calculateChanceToFuck(_character) < 50;
    _blob = "<p>";
    if (_character.isSitting()) {
        if (_reluctant)
            _blob += "With her paws tightly clenched, leaning ";
        else
            _blob += "Leaning ";
        _furnitureType = _character.furniture instanceof Furniture ? _character.furniture.type : undefined;
        switch (_character.furniture.type) {
            case "chair" :
            case "recliner" :
            case "loveseat" :
            case "couch" :
            case "toilet" : {
                _blob += "against the back of the {0}".format(_character.furniture.type);
                break;
            }
            case "bed" :
            case "table" :
            case "tub" : 
            case undefined : {
                _blob += "back on the {0} while keeping herself propped up with an arm,".format(_character.furniture.type);
                break;
            }
            default : {
                _blob += "back,";
            }
        }
    }
    else if (_character.isStanding()) {
        if (_reluctant)
            _blob += "Glaring at you,";
        else
            _blob += "While standing,";
    }
    else if (_character.isLying()) {
        _blob += "While still lying back";
    }

    if (_character.hasPants() && _character.hasUnderwear())
        _blob += " she undoes her pants, pulling them, along with her panties, down to her thighs. Opening her legs, she reveals herself to you.";
    else if (_character.hasPants() && !_character.hasUnderwear())
        _blob += " she undoes her pants, pulling them down to her thighs, showing you her pink slit. You're kind of turned on now, seeing that she was going commando.";
    else if (!_character.hasPants() && _character.hasUnderwear())
        _blob += " she tugs her panties down to her thighs, showing you her pink slit.";
    else
        _blob += " she spreads her {0}legs for you.".format(_reluctant ? "trembling " : "");
    _blob += "</p>";
    Content.add(_blob);
}
function charlieFollow() {
    _character = PSDE.getCharacterByID("charlie");
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronoun()));
    }
    else {
        Content.add("<p>\"" + _character.name + ",\" you call to " + _character.objectPronoun() + ", and " + _character.subjectPronoun() + " turns to face you. Motioning with a " + PSDE.player.getHands() + ", you ask " + _character.objectPronoun() + ", \"Follow me.\" " + _character.subjectPronoun() + " looks at you for a moment, before walking to your side.</p>");
        
        return true;
    }
    return false;
}
function charlieStay() {
    _character = PSDE.getCharacterByID("charlie");
    
    Content.add("<p>You ask {0} to wait here, and {1} nods {2} head.</p>".format(_character.name, _character.subjectPronoun(), _character.possessiveAdjective()));
    
    PSDE.characterStay(_character);
}

function rosieReynardInteract(_clearContent = true) {
    _character = PSDE.getCharacterByID("rosieReynard");

    unsafeExec("{0}{1}Interact({2})".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize(), _clearContent));
}
function rosieReynardTalk() {
    _character = PSDE.getCharacterByID("rosieReynard");
    
    if (PSDE.player == PSDE.getCharacterByID("charlie")) {
        Content.add("<p>You walk casually over to the vixen, your long, fluffy tail puffing up the closer you get.</p>");
        if (rosie.sleeping)
            Content.add("<p>Rosie is lying down peacefully, with her chest rising and falling in a slow rhythm.");
        else
            Content.add("<p>Rosie looks up at you with her sad, blue eyes, as you ask her, \"Hey kid, wanna /ll/?\"");
    }
    unsafeExec(PSDE.getCharacterCurrentRoom(PSDE.player).sid + "RosieTalk()");
}
function rosieReynardSex() {
    _character = PSDE.getCharacterByID("rosieReynard");
    
    Content.add("<p>Looking over the vixen, a sickening idea comes to you-<h1 style='display:inline;'>\"No >:v\"</h1></p>");
}
function rosieReynardFollow() {
    _character = PSDE.getCharacterByID("rosieReynard");
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronoun()));
    }
    else {
        Content.add(String("<p>\"{0},\" you call to {1}, and {2} turns to face you. Motioning with a {3}, you ask {1}, \"Follow me,\"<br/>{2} looks at you for a moment, before walking to your side.</p>").format(_character.name, _character.objectPronoun(), _character.subjectPronoun(), PSDE.player.getHands()));
        
        return true;
    }
    return false;
}
function rosieReynardStay() {
    _character = PSDE.getCharacterByID("rosieReynard");
    
    Content.add("<p>\"Stay right here,\" {0} tell{1} {2}. She looks around before muttering \"Okay.\"</p>".format(PSDE.subjectPronoun(true), PSDE.pov == 3 ? "s" : "", _character.name));
    
    PSDE.characterStay(_character);
}

function tellerMicelyInteraction() {
    _character = PSDE.getCharacterByID("tellerMicely");

    unsafeExec("{0}{1}Interact({2})".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize()));
}
function tellerMicelyTalk() {
    _character = PSDE.getCharacterByID("tellerMicely");

    unsafeExec("{0}{1}Talk()".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize()));
}
function tellerMicelySex() {
    _character = PSDE.getCharacterByID("tellerMicely");

    if (PSDE.player.getSex() == PSDE.kMale)
        Content.add("<p>You briefly think about hot-gluing the nerdy little mouse. The thought won't go away.</p>");
    else
        Content.add("<p>You briefly think about stuffing the nerdy little mouse up your pussy. The thought passes, though.</p>");
    PSDE.player.incLust(1);
}
function _tellerMicelyFollow() {
    _character = PSDE.getCharacterByID("tellerMicely");

    Content.add("<p>\"I can't leave this desk, {0}.\" Teller says.</p>".format(PSDE.player.getSex() == PSDE.kMale ? "Sir" : "Ma'am"));

    return false;
}
function tellerMicelyHug() {
    _character = PSDE.getCharacterByID("tellerMicely");

    Content.add("<p>\"{0}, this is highly inappropriate!\" Teller squeaks{1}</p>".format(
        PSDE.player.getSex() == PSDE.kMale ? "S-Sir" : "M-Ma'am",
        PSDE.player.furSoftness > 50 ? ", but she then rubs her face against your " + PSDE.player.peltType + " and fails to hide a smile." : ".")
    );
}

function wolterInteract(_clearContent = true) {
    _character = PSDE.getCharacterByID("wolter");

    if (_clearContent) {
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
                if (PSDE.player.getSexualOrientationCompatibility(_character))
                    _blob += " You pay a little too much ";
                else
                    _blob += " You try not to pay ";
                _blob += "attention to that <i>big</i> detail.";
            }
        }

        Content.add("<p>" + _blob + "</p>");
    }
    unsafeExec("{0}{1}Interact({2})".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize(), _clearContent));
}
function wolterTalk() {
    _character = PSDE.getCharacterByID("wolter");
    
    if (_character.getCharacterEros(PSDE.player) > 50 && _character.getCharacterPhilia(PSDE.player) > 50) {
        if (_character.hasDated(PSDE.player)) {
            if (!_character.isDatingCharacter(PSDE.player))
                Menu.addOption("wolterDateAsk()", "Ask {0} out, again".format(_character.objectPronoun()));
            else
                Menu.addOption("wolterDateSchedule()", "Go out on a date");
        }
        else if (!_character.hasDated(PSDE.player))
            Menu.addOption("wolterFirstDateAsk()", "Ask {0} out".format(_character.objectPronoun()));
    }

    unsafeExec("{0}{1}Talk()".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize()));
}
function wolterRape() {
    _character = PSDE.getCharacterByID("wolter");
    
    unsafeExec("{0}{1}Rape()".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize()));
}
function wolterSex() {
    _character = PSDE.getCharacterByID("wolter");
    
    if (_character.isSleeping()) { // :v
    }
    else {
        var _ctfLust = PSDE.player.calculateChanceToFuck(_character);
        var _ctfNoLust = PSDE.player.calculateChanceToFuck(_character, true);

        // If the Player has a chance to fuck the Character without lust, 
        //  and they're both the same sex, 
        //  and the Character isn't straight, 
        //  and the Character hasn't had sex with the Player, 
        //  and the Character hasn't slept with the same sex before
        if (_ctfNoLust > 49 && _character.getSex() == PSDE.player.getSex() && _character.getSexualOrientation() != 0 && _character.getCharacterSexCount(PSDE.player) == 0 && ((_character.getSex() == PSDE.kMale && !_character.sleptWithMale) || (_character.getSex() == PSDE.kFemale && !_character.sleptWithFemale))) {
            unsafeExec("wolterPlayerFirsttimeSameSexSpecial()");
        }
        else if (_ctfLust > 49) { // Else if the Player has a chance to fuck the Character with Lust
            unsafeExec("{0}{1}Sex()".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize()));
        }
        else { // Else Character isn't interested
            if (_character.getCharacterSexCount(PSDE.player) > 1) { // And they've fucked the Player more than once
                if (_character.getSex() == PSDE.player.getSex() && _character.sexualOrientation == 0)
                    Content.add("<p>&gt;You're poison running through my veins</p>");
                else if (_ctfNoLust > 39)
                    Content.add("<p>Take it slow</p>");
                else
                    Content.add("<p>It was a mistake</p>");
            }
            else if (_character.getCharacterSexCount(PSDE.player) > 0) { // And they've fucked the Player once
                if (_character.getSex() == PSDE.player.getSex() && _character.sexualOrientation == 0)
                    Content.add("<p>One time thing</p>");
                else if (_ctfNoLust > 39)
                    Content.add("<p>Take it slow</p>");
                else
                    Content.add("<p>Just stay friends</p>");
            }
            else { // And they've never fucked the Player
                // If the Player has a chance at fucking a gay Wolter, PSDE.add the gay event trigger
                if (_character.getSex() == PSDE.player.getSex() && _character.sexualOrientation == 0) {
                    var _tmpLust = _character.lust;
                    var _tmpRut = _character.rut;

                    _character.setSexualOrientation(2); // Sets sexuality to bisexual
                    _character.setLust(0); // Sets lust to 0
                    _character.setRut(false); // Sets rut to false

                    if (_ctfNoLust > 49) // If the Player has a chance to fuck the Character without lust
                        PSDE.setTimedFunctionEvent("wolterConsidersJumpingTheFence()", new Cron(undefined, undefined, Number.parseInt(currentTime.getDate() + (Math.random() * (anneke.getCharacterDisposition(PSDE.player, "philia") > 50 ? 13 : 30) - 10) + 10)), true);
                    
                    _character.setSexualOrientation(0); // Sets sexuality back to straight
                    _character.setLust(_tmpLust); // Sets lust back to what it was before
                    _character.setRut(_tmpRut); // Sets rut back to what it was before
                }
                
                if (_character.getSexRefusalCount(PSDE.player) > 1) // But the Player is a little too persistent
                    Content.add("<p>STERN UNINTEREST</p>");
                else if (_character.getSexRefusalCount(PSDE.player) > 0) // But the Player asked again
                    Content.add("<p>Stern uninterest</p>");
                else { // But the Player still asked
                    if (_character.getCharacterDisposition(PSDE.player, "eros") > 50) {
                        if (_character.getSex() == PSDE.player.getSex() && _character.sexualOrientation == 0)// And the Player is gay, but the Character is straight
                            Content.add("<p>Attracted, but conflicted. Give it some time.</p>");
                        else
                            Content.add("<p>Attracted, but give it a little more time.</p>");
                    }
                    else if (_character.getCharacterDisposition(PSDE.player, "philia") > 50) {
                        if (_character.getSex() == PSDE.player.getSex() && _character.sexualOrientation == 0)
                            Content.add("<p>Good friends, but doesn't swing that way.</p>");
                        else
                            Content.add("<p>Good friends, but just that.</p>");
                    }
                    else if (_character.getCharacterDisposition(PSDE.player, "storge") > 50) {
                        if (_character.getSex() == PSDE.player.getSex() && _character.sexualOrientation == 0)
                            Content.add("<p>Like brother.</p>");
                        else
                            Content.add("<p>Like family.</p>");
                    }
                    else {
                        if (_character.getSex() == PSDE.player.getSex() && _character.sexualOrientation == 0)
                            Content.add("<p>Doesn't swing that way.</p>");
                        else
                            Content.add("<p>Not interested.</p>");
                    }
                }
            }

            _character.addSexRefusalCount(PSDE.player); // The refusal is recorded
        }
    }
}
function wolterFollow() {
    _character = PSDE.getCharacterByID("wolter");
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronoun()));
    }
    else {
        Content.add(String("<p>\"{0},\" you call to {1}, and {2} turns to face you. Motioning with a {3}, you tell {1}, \"Follow me.\" {2} looks at you for a moment, before walking to your side.</p>").format(_character.name, _character.objectPronoun(), _character.subjectPronoun(), PSDE.player.getHand()));
        
        return true;
    }
    return false;
}
function wolterStay() {
    _character = PSDE.getCharacterByID("wolter");
    
    Content.add("<p>You ask {0} to wait here, and {1} nods {2} head.</p>".format(_character.name, _character.subjectPronoun(), _character.possessiveAdjective()));
    
    PSDE.characterStay(_character);
}
function wolterHug() {
    _character = PSDE.getCharacterByID("wolter");
    var _arr = new Array();
    var _disposition = _character.getCharacterDisposition(PSDE.player);

    if (_character.isSleeping()) {
        _arr = ["<p>As you give the sleeping aardwolf a hug, you see his tail twitch.</p>"];
    }
    else if (_character.hasMet(PSDE.player)) {
        if (_disposition.philia > 66) {
            if (_disposition.pragma > 50) {
                if ((_character.sexualOrientation == 0 && _character.getSex() == PSDE.player.getSex()) || (_character.sexualOrientaiton == 1 && _character.getSex() != PSDE.player.getSex())) {
                    if (_character.hadSexWith(PSDE.player)) {
                        _arr = ["<p>As you wrap your arms around {0}, you feel him jump a bit. \"Oh, hey {1}.\" he says with a hint of strain, but he joins in your hug after a moment. You feel his breath against your neck briefly, before he pulls away.</p>".format(_character.name, PSDE.player.name)];
                        _character.decPhilautia(1);
                    }
                    else {
                        _arr = ["<p>Hooking an arm around {0}'s side, you pull him into a hug. His arms wrap around yours, and you feel them tighten up briefly.</p>".format(_character.name)];
                    }
                }
                else if (_character.dating(PSDE.player)) {
                    _arr = [
                        "<p>Bringing your arms around {0}, he leans into you and holds you in return. \"You're handsome,\" you say, before pressing your lips to his. His eyes close as his paws travel up your back, pulling you further into the kiss. After a few moments, you part, and he smiles at you with a half-lidded gaze. \"{1}\" he says, and leans in for another kiss.</p>".format(_character.name, PSDE.player.getSex() == PSDE.kMale ? "You're not too bad yourself, stud," : "And you're beautiful,"),
                        "<p>Slipping your {1} under {0}'s arms, you pull him against you. \"Love you,\" you say, looking up at his smile. He dips his head down, and presses his lips against the top of your muzzle. \"Love you too, {2}.\" he says, followed by another kiss to your cheek.</p>".format(_character.name, PSDE.player.getHands(), PSDE.player.name)
                    ];
                    _character.incLust(1);
                }
                else {
                    _arr = ["<p></p>".format(_character.name)];
                }
            }
            else if (_disposition.eros > 66 && _character.lust > 33) {
                if ((_character.sexualOrientation == 0 && _character.getSex() == PSDE.player.getSex()) || (_character.sexualOrientaiton == 1 && _character.getSex() != PSDE.player.getSex())) {
                    _arr = [
                        "<p>You feel {0} jolt as you wrap your arms around him. Feeling something hard press against your leg, you see the {0} look away, grinning. \"Uh, sorry about that {1}, but you should'a warned a guy.\"</p>{2}".format(_character.name, PSDE.player.getSex() == PSDE.kMale ? "man" : PSDE.player.name, PSDE.player.lust > 50 ? "<p>Leaning into him, you say in a sultry voice, or as good a one as you can manage, \"Maybe I like like surprising <i>guys</i>.\"</p>" : ""),
                        "<p>{0} leans in as you wrap your arms around him. His body feels unusually warm, and you can feel his breath against your neck. \"Wolter, you're hot,\" you say, stepping away from him. He looks up at you, and you can see his unfocused gaze before he squeezes his eyes shut.</p><p>{1}</p><p>He takes in a deep breath and slowly lets it out, looking away from you. \"Yeah, I think I might be catching, ah, something,\" he says, and for a brief moment you feel his tail brush against you.</p>".format(_character.name, PSDE.player.getSex() == PSDE.kMale ? "After a moment, you realize what you said, and quickly correct yourself, \"I mean, you're warm.\"" : "\"You're really warm,\" you correct yourself.")
                    ];
                }
                else if (_character.dating(PSDE.player)) {
                    _arr = [
                        "<p>You wrap your arms around {0} and pull him close to you. As his arms lock around you too, he leans his muzzle in and presses it gently against yours. In that slow drawl you've come to love, he says to you, \"That's not a flashlight pressing against your thighs.\"</p><p><i>{1} damnit, {0}.</i> you think as you let out a sigh. \"Way to ruin the mood,\" you mutter, pressing your lips to his again. He just lets out a muffled laugh, and holds onto you just a little big longer.</p>".format(_character.name, (PSDE.player.manaMax > 0 ? "the gods" : "God")),
                        "<p>Coming at {0} from behind, you snake your {1} around his waist as he tries to turn around. Pressing your body against his back, you refuse to give him any wiggle room.</p><p>\"Someone's feeling frisky,\" he says as he leans into you, giving up in his struggle. You slide a {2} down his stomach, and slow stroke it against his crotch. \"Frisking sounds fun,\" you say softly into his ear, groping at his dick.</p>".format(_character.name, PSDE.player.getHands(), PSDE.player.getHand()),
                        "<p>You give {0} a quick hug. It becomes a little awkward when he pulls you in further.</p><p>\"You're so soft{1},\" he says a few seconds later, and moves both of his paws down your back.</p>".format(_character.name, PSDE.player.getSex() == PSDE.kMale ? ", man" : "")
                    ];
                    PSDE.player.incLust(4);
                    _character.incLust(15);
                    _character.setRut(true);
                }
                else {
                    _arr = ["<p></p>".format(_character.name)];
                }
            }
            else if (_disposition.eros > 33) {
                if ((_character.sexualOrientation == 0 && _character.getSex() == PSDE.player.getSex()) || (_character.sexualOrientaiton == 1 && _character.getSex() != PSDE.player.getSex()))
                    _arr = ["<p>Spreading your arms wide, you take {0} into a warm hug that he returns. As you move apart, you feel one of his paws slip down your side, but move away at your waist.</p>".format(_character.name)];
                else
                    _arr = ["<p>You wrap your arms around {0} and he leans in to you. As you quickly part, his paws linger at your sides for a moment longer.</p>".format(_character.name)];
                _character.incLust(1);
            }
            else {
                _arr = [
                    "<p>Spreading your arms wide, you take {0} into a warm hug that he returns. You can almost hear what sounds like a purr coming from his throat.</p>".format(_character.name),
                    "<p>You give {0} a quick bro hug. It becomes a little awkward when he pulls you in further.</p><p>\"You're so soft{1},\" he says a few seconds later, after finally letting you go.</p>".format(_character.name, PSDE.player.getSex() == PSDE.kMale ? ", man" : "")
                ];
                _character.incCharacterPhilia(PSDE.player, 1);
            }
        }
        else if (_disposition.philia > 33) {
            if (_disposition.eros > 66 && _character.lust > 50) {
                if ((_character.sexualOrientation == 0 && _character.getSex() == PSDE.player.getSex()) || (_character.sexualOrientaiton == 1 && _character.getSex() != PSDE.player.getSex())) {
                    if (_character.hadSexWith(PSDE.player)) // Horny, had gay sex, has conflicted feelings, but isn't like that anymore.
                        _arr = ["<p></p>".format(_character.name)];
                    else // Horny, haven't fucked, has conflicted feelings.
                        _arr = ["<p></p>".format(_character.name)];
                }
                else {
                    if (_character.hadSexWith(PSDE.player)) // Horny, had gay sex, no conflicted feelings, would probably do it again.
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
            if ((_character.sexualOrientation == 0 && _character.getSex() == PSDE.player.getSex()) || (_character.sexualOrientaiton == 1 && _character.getSex() != PSDE.player.getSex())) { // Dude, what, don't hug me
                _arr = ["<p></p>".format(_character.name)];
            }
            else { // Well, since you've got assets I like, this is fine
                _arr = ["<p></p>".format(_character.name)];
            }
        }
    }
    else { // Who the hell are you?
            if ((_character.sexualOrientation == 0 && _character.getSex() == PSDE.player.getSex()) || (_character.sexualOrientaiton == 1 && _character.getSex() != PSDE.player.getSex())) {
                _arr = ["<p></p>".format(_character.name)];
            }
            else {
                if (PSDE.player.getSex() == PSDE.kMale)
                    _arr = ["<p>Hugging the random aardwolf, you feel him pat your pack gently. \"Uh, hey stranger. Nice to meet you, too,\" he says, stepping back from your embrace.</p>"];
                else
                    _arr = ["<p>Hugging the random aardwolf, you feel him grope your tail. After a few seconds, he looks {1} at you with a grin, \"Hey cutey, I'm {0},\"</p>".format(_character.name, PSDE.player.bodySize > _character.bodySize ? "up" : "down")];
            }
    }

    Content.add(_arr.getRandom());
}
