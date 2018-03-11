function avoInteract(_clearContent = true) {
    _character = avo;
    
    unsafeExec("{0}{1}Interact({2})".format(player.room.sid, _character.id.capitalize(), _clearContent));
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

function charlieInteract(_clearContent = true) {
    _character = charlie;
    
    if (_clearContent) {
        if (player.hasItem(charlieBeatingHeart) && _character.hasItem(charlieBeatingHeart))
            Content.add("<p>You see {0} run a paw up her chest as she looks at you in confusion. \"You alright, Charlie?\" you ask her, and she nods slowly.</p>".format(_character.name));
    }

    if (enableGore && enableRape)
        Menu.addOption("charlieEatCharlie()", "Murder and eat {0}".format(_character.name));

    unsafeExec("{0}{1}Interact({2})".format(player.room.sid, _character.id.capitalize(), _clearContent));
}
function charlieTalk() {
    _character = charlie;
    
    if (_character.getCharacterEros(player) > 50 && _character.getCharacterPhilia(player) > 50) {
        if (_character.hasDated(player)) {
            if (!_character.isDating(player))
                Menu.addOption("charlieDateAsk()", "Ask {0} out, again".format(_character.objectPronoun()));
            else
                Menu.addOption("charlieDateSchedule()", "Go out on a date");
        }
        else if (!_character.hasDated(player))
            Menu.addOption("charlieFirstDateAsk()", "Ask {0} out".format(_character.objectPronoun()));
    }

    unsafeExec("{0}{1}Talk()".format(player.room.sid, _character.id.capitalize()));
}
function charlieRape() {
    _character = charlie;
    
    unsafeExec("{0}{1}Rape()".format(player.room.sid, _character.id.capitalize()));
}
function charlieSex() {
    _character = charlie;
    
    if (calculateChanceToFuck(player, _character) > 49 || player.hasItem(charlieBeatingHeart)) {
        Menu.clear();
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false)".format(charlie.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + charlie.name);
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

        Menu.addOption("charlieSexCunnilingusGive()", "Eat her out");
        if (player.sex == 0) Menu.addOption("charlieSexFellatioGive()", "Get a blowjob");
        else Menu.addOption("charlieSexCunnilingusReceive()", "Get her to eat you out");
        Menu.addOption("charlieSexVaginalGive()", "Vaginal");
        Menu.addOption("charlieSexAnalGive()", "Anal");
        Menu.addOption("charlieSexMasturbateGive()", "Finger her", (player.getHand() == "hoof" ? "Hoof her, really." : ""));
        Menu.addOption("charlieSexMasturbateReceive()", "Let her jerk you off", "Pawpads are better than hooves.");

        unsafeExec("{0}{1}Sex()".format(player.room.sid, _character.id.capitalize()));

        Menu.generate();
    }
    else {
        Content.add("No thank you.");
    }
}
function charlieSexVaginalGive() {
    _character = charlie;

    _ctf = calculateChanceToFuck(remmy, charlie);
    _blob = "";
    
}
function charlieSexFellatioGive() {
    _character = charlie;

    if (_character.hasBodyPartSlickWithCum("mouth") && player.hasBodyPartSlickWithCum("penis"))
        charlieSexFellatioGiveAgain();
    else
        charlieSexFellatioGiveInitial();
}
function charlieSexFellatioGiveInitial() {
    _character = charlie;

    _ctf = calculateChanceToFuck(remmy, charlie);
    _blob = "";

    if (player.hasItem(charlieBeatingHeart) && _ctf < 50)
        _blob += "\"Blow me,\" " + subjectPronoun() + " tell" + (pov == 3 ? "s" : "") + " the vixen, ";
    else
        _blob += "\"Wanna go down on me?\" " + subjectPronoun() + " ask" + (pov == 3 ? "s" : "") + " her, ";

    if (player.room.characters.size == 2) {
        if (player.hasItem(charlieBeatingHeart)) {
            _blob += "and her eyes never leave " + possessivePronoun() + " as she nods her head.";
        }
        else {
            _blob += "to which she gives a brief shrug. Licking her lips, her head tilts towards " + possessivePronoun() + " as she purrs \"Sure.\"";
        }
    }
    else {
        _characters = new Array();
        _otherCharactersSleeping = true;
        player.room.characters.forEach(function(_character) {
            if (_character != charlie && _character != remmy) {
                _characters.push(_character);
                if (!_character.isSleeping())
                    _otherCharactersSleeping = false;
            }
        }, this);

        if (!enableRape && player.hasItem(charlieBeatingHeart)) {
            if (!enableRape) {
                _blob += "\"You are weak, " + player.surname + ",\" she sneers before lunging at " + objectPronoun() + ".";
                _blob += "Her paws quickly find her heart on " + possessiveAdjective() + " person, and a moment later she's swallowed it whole.</p>";
                _blob += "<p>Poking a claw to " + possessiveAdjective() + " chest, she fixes " + objectPronoun(true) + " with a tired glare, \"Do that again, " + player.surname + ", and I will eat you alive.\" and snaps her teeth in front of " + possessiveAdjective() + " nose.</p>";
                _blob += "<p>Also, " + presentContinuousTense(true, true) + " bleeding profusely where she poked " + objectPronoun() + " in the chest.";
                
                player.removeItem(charlieBeatingHeart);
                charlie.consume(charlieBeatingHeart);
                characterSetLife(player, 15);

                Content.add("<p>" + _blob + "</p>");

                return false;
            }
            else {
                _blob += "and her snarl barely leaves her face as her head dips down. \"I will do this anywhere but here, mammals are watching,\" " + subjectPronoun(true) + " hear" + (pov == 3 ? "s" : "") + " her say. Pressing one of " + possessiveAdjective() + " " + player.getHands() + " on top of her head, she lets out a weak \"Please,\"";
                
                Content.add("<p>" + _blob + "</p>");

                Menu.clear();
                Menu.addOption(_charlieSexFellatioGiveReluctantFollow(), "Yes", "Go somewhere discrete");
                Menu.addOption(_charlieSexFellatioGiveReluctantForce(), "No", "Fuck her in front of {0}".format(_characters.length == 1 ? _characters[0].name : "the others"));
                Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false)".format(charlie.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>" + _character.name);
                Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
                Menu.generate();
                
                return undefined;
            }
        }
        else if (_otherCharactersSleeping) {
            if (player.hasItem(charlieBeatingHeart))
                _blob += "and her snarl barely leaves her face as her head dips down. " + subjectPronoun().capitalize() + " double-check that " + possessiveAdjective() + " company is sleeping.";
            if (_characters.length == 1) {
                if (charlie.exhibitionism > 66)
                    _blob += "and before " + presentContinuousTense(true, true) + " able to check if " + _characters[0].name + " is sleeping, " + subjectPronoun() + " feel" + (pov == 3 ? "s" : "") + " " + _character.singularPossessiveName() + " paw on " + possessiveAdjective() + " thigh.";
                else if (charlie.exhibitionism > 33)
                    _blob += "glancing over at " + _characters[0].name + " to ensure they're sleeping. " + subjectPronoun(true).capitalize() + " barely see" + (pov == 3 ? "s" : "") + " " + _character.singularPossessiveName() + " eyes flicker in " + _characters[0].subjectPronoun() + " direction."
                else
                    _blob += "as both " + _character.name + " and " + subjectPronoun() + " look over at " + _characters[0].name + ". From what " + subjectPronoun() + " can tell, " + _characters[0].subjectPronoun() + "'s sleeping.";
            }
            else if (_characters.length == 2) {
                if (charlie.exhibitionism > 66)
                    _blob += "and glance over at " + _characters[0].name + " and " + _characters[1].name + " to see if they're still sleeping. Before " + subjectPronoun(true) + " can check " + _characters[1].name + ", though, " + subjectPronoun() + " feel" + (pov == 3 ? "s" : "") + " " + _character.singularPossessiveName() + " paw press against " + possessiveAdjective() + " waist.";
                else if (charlie.exhibitionism > 33)
                    _blob += "glancing over at " + _characters[0].name + " and " + _characters[1].name + " as they sleep, " + subjectPronoun() + " barely see" + (pov == 3 ? "s" : "") + " " + _character.singularPossessiveName() + " eyes flicker in their direction.";
                else
                    _blob += "as both " + _character.name + " and " + subjectPronoun() + " look over at " + _characters[0].name + " and " + _characters[1].name + ". From what " + subjectPronoun() + " can tell, they're both sleeping.";
            }
            else {
                if (charlie.exhibitionism > 66)
                    _blob += "and before " + subjectPronoun() + " can check if the mammals around " + objectPronoun() + " are sound asleep, " + subjectPronoun() + " feel" + (pov == 3 ? "s" : "") + " " + _character.singularPossessiveName() + " paw against " + possessiveAdjective() + " thigh.";
                else if (charlie.exhibitionism > 33)
                    _blob += "as " + subjectPronoun() + " look" + (pov == 3 ? "s" : "") + " around the room, making sure the mammals around " + objectPronoun() + " are really sleeping. " + subjectPronoun().capitalize() + " see " + _character.name + " just glance to " + _character.possessiveAdjective() + ".";
                else
                    _blob += "the both of " + objectPronounPlural() + " look around the room, making sure that the mammals around " + objectPronounPlural() + " are sleeping.";
            }
        }
        else {
            _blob += "and she shakes her head. \"Not here, with prying eyes.\" she whispers just loud enough for " + objectPronoun() + " to hear.";
            if (charlie.isStanding() && player.isStanding())
                _blob += "As she walks beside " + objectPronoun(true) + ", " + subjectPronoun() + " feel" + (pov == 3 ? "s" : "") + " her tail brush against " + possessiveAdjective() + " legs. \"Lead the way to some place discrete, " + player.surname + ".\"";
            else
                _blob += "Standing up, she walks beside " + objectPronoun(true) + " and brushes her tail against " + possessiveAdjective() + " legs. \"Lead the way to some place discrete, " + player.surname + ".\"";

            Content.add("<p>" + _blob + "</p>");

            characterFollow(remmy, charlie);

            return false;
        }
        _blob += " Pressing a single finger to her lips, she signals for " + objectPronoun() + " to be quiet.";
    }

    Content.add("<p>" + _blob + "</p>");
    _blob = "";

    if (player.isStanding()) {
        if (charlie.isStanding()) // Kneel
            _blob += "Kneeling down in front of " + objectPronoun(true) + ", the vixen brings her head closer to " + possessiveAdjective() + " waist ";
        else if (charlie.isSitting()) // Sit
            _blob += "Still sitting, the vixen leans forward, bringing her head closer to " + possessiveAdjective(true) + " waist ";
        else if (charlie.isLying()) // Sit
            _blob += "Sitting up, the vixen braces her paws on " + possessiveAdjective(true) + " side for a moment before bringing her head closer to " + possessiveAdjective() + " waist ";
    }
    else if (player.isSitting()) {
        if (charlie.isStanding()) // Kneel
            _blob += "Kneeling down on the floor in front of " + objectPronoun(true) + ", the vixen brings her head between " + possessiveAdjective() + " legs ";
        else if (charlie.isSitting()) // Lean
            _blob += "The vixen leans over " + possessiveAdjective(true) + " lap ";
        else if (charlie.isLying()) // Lean
            _blob += "The vixen sits up, leaning over " + possessiveAdjective(true) + " lap, ";
    }
    else if (player.isLying()) {
        if (charlie.isStanding()) // Kneel
            _blob += "";
        else if (charlie.isSitting()) // Lean
            _blob += "";
        else if (charlie.isLying()) // Lean
            _blob += "";
    }

    if (player.hasPants()) {
        _blob += "as " + subjectPronoun() + " und" + (pov == 3 ? "oes" : "o") + " " + possessiveAdjective() + " " + player.getPants().name + " and ";
        if (player.hasUnderwear())
            _blob += "pull" + (pov == 3 ? "s" : "") + " down " + possessiveAdjective() + " " + player.getUnderwear().name + ", letting";
        else
            _blob += "let" + (pov == 3 ? "s" : "");
        _blob +=  " " + possessiveAdjective() + " " + (player.lust > 66 ? "hard" : player.lust > 33 ? "firm" : "flaccid") + " dick out.";
        player.disrobe("pants");
        player.disrobe("underwear");
    }
    else if (player.hasUnderwear()) {
        _blob += "as " + subjectPronoun() + " pull" + (pov == 3 ? "s" : "") + " down " + possessiveAdjective() + " " + player.getUnderwear().name + ", and let" + (pov == 3 ? "s" : "") + " " + possessiveAdjective() + " " + (player.lust > 66 ? "hard" : player.lust > 33 ? "firm" : "flaccid") + " out.";
        player.disrobe("underwear");
    }
    else
        _blob += "letting a hot breath out over " + possessiveAdjective() + " " + (player.lust > 66 ? "hard" : player.lust > 33 ? "firm" : "flaccid") + " dick.";
    Content.add("<p>" + _blob + "</p>");
    _blob = "";

    // bodyPartsSlickWithPre and bodyPartsSlickWithCum content here, eventually
    
    Content.add("<p>Her cold nose presses against the tip, and you can feel a tickle of air against your delicate skin. As her mouth opens, you see her tongue poke out past her bottom lip as she takes the head of your cock into your mouth. Before her lips close, though, you can feel the heat of her mouth and tongue.</p>");
    Content.add("<p>For a few seconds, you feel her tongue slide up and down what little of your member is inside her mouth as well as her lips, and a bit of saliva trickles down her chin and your shaft. Then, gradually, with her lips forming a tight seal around you, she pulls her head back. While you feel a brief cool where her mouth once was, her vacuum-like seal around your dick increases.</p>");
    Content.add("<p>Twirling her tongue between her lips, she pushes forward, taking a quarter of your cock past her now-glistening lips. Her tongue continues to glide around you, squeezing and pulling, and with its unique length, stroking every inch that she choose to take into her mouth. Your {0} find their way to the back of her head as she lets out a vibrating humm in response. \"You're amazing, Charlie,\" you say with a sigh.</p>".format(player.getHands()));
    Content.add("<p>Really looking down at her, you see her face is calm and relaxed, aside from her jaw. Her black lips then tug along your shaft as she pulls her head back, and tilts to the side, rubbing your meat against her teeth. You want to winch at the idea of being pricked by one of her canines, but she pushed forward again, taking half of your length before stopping, and squeezing around what's in her mouth with her tongue.</p>");
    Content.add("<p>Your {0} move against her head until they both are at the base of her ears. You don't know if foxes have any pleasure spots there, but you decide to give them a few firm strokes to the tips.</p>".format(player.getHands()))
    Content.add("<p>{0} lets out a garbled moan and for a few seconds you see her eyes open as they roll back in her head. \"Hah, wow, you really like that?\" you ask her as the corners of her mouth twitch into a dopy, non-Charlie-like smile around your girth.</p>".format(_character.name));
    Content.add("<p>Once her eyes squeeze shut again, you feel her pull back like the last few times. Once its just the head of your penis in her mouth, instead of bobbing forward again and taking more of you, you feel her tongue flick and prod at the tip. It was odd, for the first few moments, \"Oh, god, whatever you're doing don't stop!\" until she found a spot that made your {0} curl and caused you to sqeeuze at her ears a little harder than you should have.</p>".format(player.getHands()));
    Content.add("<p>Sucking harder than before, she continues lashing at that one spot that made had you practically cradling her head in your arms, trying to force her muzzle into your crotch. Your peak was approaching, and your hips were giving arrythmic thrusts with her quick work. As your breathing became laboured, and you felt like your were about to blow, one of her paws pushed between your legs and under your balls, and grinded against your taint.</p>");
    Content.add("<p>Right as your were seeing stars, feeling yourself ready to cum, her other paw grabbed around the base of your cock, squeezing it like a vice. Still, though, she kept working her magic tongue, and you felt that moment of bliss finally come, and then the heat of her mouth and throat taking you all the way to where her other paw continued its choke hold on your rod.</p>");
    if (charlie.fellatioGiveCount > 5) {
        Content.add("<p>Pulling her head back one last time, she lets go of your dick, and you feel the warmth of your cum splash against her tongue and over what of yourself was in her mouth. Her tongue licks at your tip, mixing saliva and cum around in her mouth as it seaps out from between her lips and down her chin.</p>");
        Content.add("<p>You watch as she takes in short, small gulps between sucking what's left out of you and your own petering out orgasm. With her cheeks showing a noticable bulge, you assume she's probably trying to enjoy the taste until she released your member from her mouth with a wet pop, leaving what looks like a hickey over a quarter of your dick.</p>");
        if (charlie.lust > 66) {
            Content.add("<p>Then, to your growing horror, something which you couldn't escape because of how drained you felt, her face entered your vision, and her warm, wet slips pressed against yours.</p>");
            Content.add("<p>Your hot, thick cum poured into your mouth, and you wanted to gag. It was a bit frothy from when she stirred it with her tongue, and it slips past your lips, along your tongue, and down the back of your throat. Just as you thought the moment couldn't get any worse, though, {0}'s tongue pulled at yours, and she sucked the cum back into her mouth, and pushed it back into yours.</p>".format(_character.name));
            Content.add("<p>The worst thing, though, was that you were really turned on.</p>");
            charlie.odorSex += 35;
            remmy.addBodyPartSlickWithCum("neck");
            remmy.addBodyPartSlickWithCum("mouth");
        }
        else {
            Content.add("<p>Her head tilts back, revealing the soft fur of her neck, as her purses her lips and swallows with a loud gulp. You can see some of her saliva and your seed had escaped her lips while she was blowing you, and left streaks down her lips, and the fur of her chin and neck.</p>");
            Content.add("<p>Swallowing again, the bulge of her cheeks is gone.</p>");
            charlie.odorSex += 15;
        }
    }
    else {
        Content.add("<p>Pulling her head back one last time, she lets go of your dick, and you feel the warmth of your cum splash against her tongue and pool around your member. She takes in an unexpected gasp, and from what you can guess, breathes in some of your load as she pulls her head back and muffles cough with a paw.</p>");
        Content.add("<p>Instead of another load of cum going in her muzzle, though, it lands across it, giving her a pearly white streak from her nose to her ear. Opening her mouth, she grabs your shaft and tries to aim it at her tongue after another spurt of cum hits her chin and neck. A desperate huff leaves her as she strokes you, and a last streak of cum lands across the roof of her mouth and tongue.</p>");
        Content.add("<p>Giving your dick a last, slow stroke, her tongue catches the seed that dribbles out. Letting your erection hang and slowly grow flaccid, she runs a paw over her face, collecting your cum, and tries to lick it clean.</p>");
        Content.add("<p>You can't really tell if she did a good job, since cum blends really well with her fur colour.</p>");
        charlie.addBodyPartSlickWithCum("head");
        remmy.addBodyPartSlickWithCum("balls");
        charlie.odorSex += 50;
    }

    characterIncFellatio(charlie, remmy);
    charlie.incLust(15);
    charlie.decStamina(10);
    charlie.addBodyPartSlickWithPre("vagina");
    charlie.addBodyPartSlickWithCum("mouth");
    charlie.addBodyPartSlickWithCum("neck");

    decLust(25);
    decStamina(5);
    remmy.odorSex = 10;
    remmy.addBodyPartSlickWithCum("penis");

    if (player.stamina < 15 || player.lust == 0) {
        _blob += "Deciding " + presentPerfectTense(true) + " had enough fun, " + subjectPronoun() + " ";
        if (player.hasPants()) {
            if (player.hasUnderwear())
                _blob += "tuck" + (pov == 3 ? "s" : "") + " " + possessiveAdjective() + " flaccid dick into " + possessiveAdjective() + " " + player.getUnderwear() + " and slip " + possessiveAdjective() + " " + player.getPants() + " back on.";
            else
                _blob += "slip" + (pov == 3 ? "s" : "") + " " + possessiveAdjective() + " " + player.getPants() + " back on over " + possessiveAdjective() + " flaccid dick.";
        }
        else if (player.hasUnderwear())
            _blob += "tuck" + (pov == 3 ? "s" : "") + " " + possessiveAdjective() + " flaccid dick into your " + player.getUnderwear() + "."
        else
            _blob += "wipe" + (pov == 3 ? "s" : "") + " " + possessiveAdjective() + " dripping dick on her muzzle."; // idk :v
        Content.add("<p>" + _blob + "</p>");
        _blob = "";
    }
    
    if (player.room.location.id == "chartyApartmentLocation" || player.room.location.id == "remmyApartmentLocation") {
        Menu.addOption("_charlieSexFellatioGivePostAskShower()", "Shower?", "Ask her if she wants to share a shower.")
        Menu.generate();
    }
}
function charlieSexFellatioGiveAgain() {
    _character = charlie;

    _ctf = calculateChanceToFuck(remmy, charlie);
    _blob = "";

    if (player.hasItem(charlieBeatingHeart) && _ctf < 50)
        return; // Something to do later
}
function _charlieSexFellatioGivePostAskShower() {
    _character = charlie;

    Content.add("<p>\"How about a shower?\" " + subjectPronoun(true).capitalize() + " ask" + (pov == 3 ? "s" : "") + " with a grin, looking over the slightly glazed vixen.</p><p>\"Yes. That would be best, before your cum sets in. I'll also be using your toothbrush.\" " + subjectPronoun() + " see" + (pov == 3 ? "s" : "") + " her wipe the back of her paw against her muzzle, smearing more proof of " + possessiveAdjectivePlural() + " recent activities across her fur.</p>");
    characterFollow(remmy, charlie);
}
function _charlieSexFellatioGiveReluctantFollow() {
    _character = charlie;

}
function _charlieSexFellatioGiveReluctantForce() {
    _character = charlie;
    
    Content.add("<p>Her eyes open just enough for you to see her thin, black pupils. \"I hate you, {0}.\"</p>".format(player.getFullName()));
    if (charlie.isDating(player)) {
        charlie.dump(player);
        charlie.incCharacterMiseo(player, 20);
    }
    else
        charlie.incCharacterMiseo(player, 25);
    return true;
}
function _charlieSexUndressA() {
    _character = charlie;
    
    _reluctant = player.hasItem(charlieBeatingHeart) && (charlie.lust < 15 && charlie.stamina < 15) || calculateChanceToFuck(remmy, charlie) < 50;
    _blob = "<p>";
    if (charlie.isSitting()) {
        if (_reluctant)
            _blob += "With her paws tightly clenched, leaning ";
        else
            _blob += "Leaning ";
        _furnitureType = charlie.furniture instanceof Furniture ? charlie.furniture.type : undefined;
        switch (charlie.furniture.type) {
            case "chair" :
            case "recliner" :
            case "loveseat" :
            case "couch" :
            case "toilet" : {
                _blob += "against the back of the {0}".format(charlie.furniture.type);
                break;
            }
            case "bed" :
            case "table" :
            case "tub" : 
            case undefined : {
                _blob += "back on the {0} while keeping herself propped up with an arm,".format(charlie.furniture.type);
                break;
            }
            default : {
                _blob += "back,";
            }
        }
    }
    else if (charlie.isStanding()) {
        if (_reluctant)
            _blob += "Glaring at you,";
        else
            _blob += "While standing,";
    }
    else if (charlie.isLying()) {
        _blob += "While still lying back";
    }

    if (charlie.hasPants() && charlie.hasUnderwear())
        _blob += " she undoes her pants, pulling them, along with her panties, down to her thighs. Opening her legs, she reveals herself to you.";
    else if (charlie.hasPants() && !charlie.hasUnderwear())
        _blob += " she undoes her pants, pulling them down to her thighs, showing you her pink slit. You're kind of turned on now, seeing that she was going commando.";
    else if (!charlie.hasPants() && charlie.hasUnderwear())
        _blob += " she tugs her panties down to her thighs, showing you her pink slit.";
    else
        _blob += " she spreads her {0}legs for you.".format(_reluctant ? "trembling " : "");
    _blob += "</p>";
    Content.add(_blob);
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

function remmyInteract(_clearContent = true) {
    _character = remmy;
    
    unsafeExec("{0}{1}Interact({2})".format(player.room.sid, _character.id.capitalize(), _clearContent));
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

function rosieInteract(_clearContent = true) {
    _character = rosie;

    unsafeExec("{0}{1}Interact({2})".format(player.room.sid, _character.id.capitalize(), _clearContent));
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
function rosieStay() {
    _character = rosie;
    
    Content.add("<p>\"Stay right here,\" {0} tell{1} {2}. She looks around before muttering \"Okay.\"</p>".format(subjectPronoun(true), pov == 3 ? "s" : "", _character.name));
    
    characterStay(_character);
}

function tellerMicelyInteraction() {
    _character = tellerMicely;

    unsafeExec("{0}{1}Interact({2})".format(player.room.sid, _character.id.capitalize(), _clearContent));
}
function tellerMicelyTalk() {
    _character = tellerMicely;

    unsafeExec("{0}{1}Talk()".format(player.room.sid, _character.id.capitalize()));
}
function _tellerMicelySex() {
    _character = tellerMicely;

    if (player.sex == 0)
        Content.add("<p>You briefly think about hot-gluing the nerdy little mouse. The thought won't go away.</p>");
    else
        Content.add("<p>You briefly think about stuffing the nerdy little mouse up your pussy. The thought passes, though.</p>");
    player.incLust(1);
}
function _tellerMicelyFollow() {
    _character = tellerMicely;

    Content.add("<p>\"I can't leave this desk, {0}.\" Teller says.</p>".format(player.sex == 0 ? "Sir" : "Ma'am"));
}
function _tellerMicelyHug() {
    _character = tellerMicely;

    Content.add("<p>\"{0}, this is highly inappropriate!\" Teller squeaks{1}</p>".format(player.sex == 0 ? "S-Sir" : "M-Ma'am"), player.furSoftness > 50 ? ", but she then rubs her face against your " + player.peltType + " and fails to hide a smile." : ".");
}

function wolterInteract(_clearContent = true) {
    _character = wolter;

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
                if (player.getSexualOrientationCompatibility(_character))
                    _blob += " You pay a little too much ";
                else
                    _blob += " You try not to pay ";
                _blob += "attention to that <i>big</i> detail.";
            }
        }

        Content.add("<p>" + _blob + "</p>");
    }
    unsafeExec("{0}{1}Interact({2})".format(player.room.sid, _character.id.capitalize(), _clearContent));
}
function wolterTalk() {
    _character = wolter;
    
    if (_character.getCharacterEros(player) > 50 && _character.getCharacterPhilia(player) > 50) {
        if (_character.hasDated(player)) {
            if (!_character.isDating(player))
                Menu.addOption("wolterDateAsk()", "Ask {0} out, again".format(_character.objectPronoun()));
            else
                Menu.addOption("wolterDateSchedule()", "Go out on a date");
        }
        else if (!_character.hasDated(player))
            Menu.addOption("wolterFirstDateAsk()", "Ask {0} out".format(_character.objectPronoun()));
    }

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

    if (_character.isSleeping()) {
        _arr = ["<p>As you give the sleeping aardwolf a hug, you see his tail twitch.</p>"];
    }
    else if (_character.hasMet(player)) {
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
                    _arr = ["<p></p>".format(_character.name)];
                }
            }
            else if (_disposition.eros > 66 && _character.lust > 33) {
                if ((_character.sexualOrientation == 0 && _character.sex == player.sex) || (_character.sexualOrientaiton == 1 && _character.sex != player.sex)) {
                    _arr = [
                        "<p>You feel {0} jolt as you wrap your arms around him. Feeling something hard press against your leg, you see the {0} look away, grinning. \"Uh, sorry about that {1}, but you should'a warned a guy.\"</p>{2}".format(_character.name, player.sex == 0 ? "man" : player.name, player.lust > 50 ? "<p>Leaning into him, you say in a sultry voice, or as good a one as you can manage, \"Maybe I like like surprising <i>guys</i>.\"</p>" : ""),
                        "<p>{0} leans in as you wrap your arms around him. His body feels unusually warm, and you can feel his breath against your neck. \"Wolter, you're hot,\" you say, stepping away from him. He looks up at you, and you can see his unfocused gaze before he squeezes his eyes shut.</p><p>{1}</p><p>He takes in a deep breath and slowly lets it out, looking away from you. \"Yeah, I think I might be catching, ah, something,\" he says, and for a brief moment you feel his tail brush against you.</p>".format(_character.name, player.sex == 0 ? "After a moment, you realize what you said, and quickly correct yourself, \"I mean, you're warm.\"" : "\"You're really warm,\" you correct yourself.")
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
                    _arr = ["<p></p>".format(_character.name)];
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
            if ((_character.sexualOrientation == 0 && _character.sex == player.sex) || (_character.sexualOrientaiton == 1 && _character.sex != player.sex)) {
                _arr = ["<p></p>".format(_character.name)];
            }
            else {
                if (player.sex == 0)
                    _arr = ["<p>Hugging the random aardwolf, you feel him pat your pack gently. \"Uh, hey stranger. Nice to meet you, too,\" he says, stepping back from your embrace.</p>"];
                else
                    _arr = ["<p>Hugging the random aardwolf, you feel him grope your tail. After a few seconds, he looks {1} at you with a grin, \"Hey cutey, I'm {0},\"</p>".format(_character.name, player.bodySize > _character.bodySize ? "up" : "down")];
            }
    }

    Content.add(_arr.getRandom());
}