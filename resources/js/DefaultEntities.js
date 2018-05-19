PSDE.initialize();

PSDE.kBodyPartTypes.forEach(function(_bodyPart) {
    //unsafeExec("{0} = new BodyPart('{0}', '{0}', 'Body Part', 'images/items/{0}.svg')".format(_bodyPart));
    _bodyPart = new BodyPart(_bodyPart);

    switch (_bodyPart.id) {
        case "head" : {
            _bodyPart.setName("Head");
        	_bodyPart.addAvailableAction(["grab"]);
            break;
        }
        case "leftEye" : {
            _bodyPart.setName("Left Eye");
            break;
        }
        case "rightEye" : {
            _bodyPart.setName("Right Eye");
            break;
        }
        case "eyes" : {
            _bodyPart.setName("Eyes");
        	_bodyPart.addAvailableAction(["poke"]);
            break;
        }
        case "leftEar" : {
            _bodyPart.setName("Left Ear");
            break;
        }
        case "rightEar" : {
            _bodyPart.setName("Right Ear");
            break;
        }
        case "ears" : {
            _bodyPart.setName("Ears");
        	_bodyPart.addAvailableAction(["bite","lick"]);
            break;
        }
        case "nose" : {
            _bodyPart.setName("Nose");
        	_bodyPart.addAvailableAction("boop");
            break;
        }
        case "mouth" : {
            _bodyPart.setName("Mouth");
        	_bodyPart.addAvailableAction("sex");
            break;
        }
        case "lips" : {
            _bodyPart.setName("Lips");
        	_bodyPart.addAvailableAction(["kiss","lick","suck","touch"]);
            break;
        }
        case "tongue" : {
            _bodyPart.setName("Tongue");
        	_bodyPart.addAvailableAction("suck");
            break;
        }
        case "neck" : {
            _bodyPart.setName("Neck");
        	_bodyPart.addAvailableAction(["bite","choke","grab","kiss","lick","suck"]);
            break;
        }
        case "chest" : {
            _bodyPart.setName("Chest");
        	_bodyPart.addAvailableAction(["grab","grope","massage"]);
            break;
        }
        case "breasts" : {
            _bodyPart.setName("Tiddies");
        	_bodyPart.addAvailableAction(["grab","grope","massage","sex"]);
        	break;
        }
        case "nipples" : {
            _bodyPart.setName("Nipples");
        	_bodyPart.addAvailableAction(["kiss","lick","suck"]);
            break;
        }
        case "stomach" : {
            _bodyPart.setName("Stomach");
        	_bodyPart.addAvailableAction(["kiss","lick","massage","touch"]);
            break;
        }
        case "back" : {
            _bodyPart.setName("Back");
        	_bodyPart.addAvailableAction(["kiss","massage","touch"]);
            break;
        }
        case "shoulders" : {
            _bodyPart.setName("Shoulders");
        	_bodyPart.addAvailableAction(["kiss","lick","massage","touch"]);
            break;
        }
        case "waist" : {
            _bodyPart.setName("Waist");
        	_bodyPart.addAvailableAction(["grab","grope"]);
            break;
        }
        case "groin" : {
            _bodyPart.setName("Groin");
        	_bodyPart.addAvailableAction(["grab","grope"]);
            break;
        }
        case "legs" : {
            _bodyPart.setName("Legs");
        	_bodyPart.addAvailableAction(["grab","massage","touch"]);
            break;
        }
        case "arms" : {
            _bodyPart.setName("Arms");
        	_bodyPart.addAvailableAction(["grab","massage","touch"]);
            break;
        }
        case "leftHand" : {
            _bodyPart.setName("Left Hand");
            break;
        }
        case "rightHand" : {
            _bodyPart.setName("Right Hand");
            break;
        }
        case "hands" : {
            _bodyPart.setName("Hands");
        	_bodyPart.addAvailableAction(["kiss","lick","suck","touch"]);
            break;
        }
        case "leftFoot" : {
            _bodyPart.setName("Left Foot");
            break;
        }
        case "rightFoot" : {
            _bodyPart.setName("Right Foot");
            break;
        }
        case "feet" : {
            _bodyPart.setName("Feet");
        	_bodyPart.addAvailableAction(["kiss","lick","suck","touch"]);
            break;
        }
        case "fingers" : {
            _bodyPart.setName("Fingers");
        	_bodyPart.addAvailableAction(["kiss","lick","suck","touch"]);
            break;
        }
        case "toes" : {
            _bodyPart.setName("Toes");
        	_bodyPart.addAvailableAction(["kiss","lick","suck","touch"]);
            break;
        }
        case "rear" : {
            _bodyPart.setName("Rear");
        	_bodyPart.addAvailableAction(["grab","grope","kiss","lick","pray","sex"]);
            break;
        }
        case "anus" : {
            _bodyPart.setName("Anus");
        	_bodyPart.addAvailableAction(["fist","kiss","lick","sex"]);
            break;
        }
        case "vagina" : {
            _bodyPart.setName("Vagina");
        	_bodyPart.addAvailableAction(["fist","kiss","lick","sex"]);
            break;
        }
        case "clitoris" : {
            _bodyPart.setName("Clitoris");
        	_bodyPart.addAvailableAction(["kiss","lick","rub","suck"]);
            break;
        }
        case "penis" : {
            _bodyPart.setName("Penis");
        	_bodyPart.addAvailableAction(["grab","grope","kiss","lick","massage","pull","push","rub","slap","stroke","suck"]);
            break;
        }
        case "knot" : {
            _bodyPart.setName("Knot");
        	_bodyPart.addAvailableAction(["kiss","lick","massage","rub","suck"]);
            break;
        }
        case "testicles" : {
            _bodyPart.setName("Testicles");
        	_bodyPart.addAvailableAction(["grab","grope","kiss","lick","massage","pull","slap","suck"]);
            break;
        }
    }
});