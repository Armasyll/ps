limboLocation = new Location("limbo", "Limbo");
limboCell = new Cell("limboCell", "Limbo", limboLocation);
limbo = new Room("limbo", "limbo", "Limbo", 0, limboCell, limboLocation);

limbo.setNorthRoom(limbo, undefined, false);
limbo.setEastRoom(limbo, undefined, false);
limbo.setSouthRoom(limbo, undefined, false);
limbo.setWestRoom(limbo, undefined, false);
limbo.setDownRoom(limbo, undefined, false);

/*kBodyPartTypes.forEach(function(_bodyPart) {
    unsafeExec("{0} = new BodyPart('{0}', '{0}', 'Body Part', 'images/items/{0}.svg')".format(_bodyPart));
    _bodyPart = bodyPartsIndexes.get(_bodyPart);

    switch (_bodyPart.id) {
        case "head" : {
        	_bodyPart.addAction(["grab"]);
            break;
        }
        case "leftEye" : {
        }
        case "rightEye" : {
        }
        case "eyes" : {
        	_bodyPart.addAction(["poke"]);
            break;
        }
        case "leftEar" : {
        }
        case "rightEar" : {
        }
        case "ears" : {
        	_bodyPart.addAction(["bite","lick"]);
            break;
        }
        case "nose" : {
        	_bodyPart.addAction("boop");
            break;
        }
        case "mouth" : {
        	_bodyPart.addAction("sex");
            break;
        }
        case "lips" : {
        	_bodyPart.addAction(["kiss","lick","suck","touch"]);
            break;
        }
        case "tongue" : {
        	_bodyPart.addAction("suck");
            break;
        }
        case "neck" : {
        	_bodyPart.addAction(["choke","grab","kiss","lick","suck"]);
            break;
        }
        case "chest" : {
        	_bodyPart.addAction(["grab","grope","massage"]);
            break;
        }
        case "leftBreast" : {
        }
        case "rightBreast" : {
        }
        case "breasts" : {
        	_bodyPart.addAction(["grab","grope","massage","sex"]);
        	break;
        }
        case "leftNipple" : {
        }
        case "rightNipple" : {
        }
        case "nipples" : {
        	_bodyPart.addAction(["kiss","lick","suck"]);
            break;
        }
        case "stomach" : {
        	_bodyPart.addAction(["kiss","lick","massage","touch"]);
            break;
        }
        case "back" : {
        	_bodyPart.addAction(["kiss","massage","touch"]);
            break;
        }
        case "shoulder" : {
        	_bodyPart.addAction(["kiss","lick","massage","touch"]);
            break;
        }
        case "waist" : {
        	_bodyPart.addAction(["grab","grope"]);
            break;
        }
        case "groin" : {
        	_bodyPart.addAction(["grab","grope"]);
            break;
        }
        case "legs" : {
        	_bodyPart.addAction(["grab","massage","touch"]);
            break;
        }
        case "arms" : {
        	_bodyPart.addAction(["grab","massage","touch"]);
            break;
        }
        case "leftHand" : {
        }
        case "rightHand" : {
        }
        case "hands" : {
        	_bodyPart.addAction(["kiss","lick","suck","touch"]);
            break;
        }
        case "leftFoot" : {
        }
        case "rightFoot" : {
        }
        case "feet" : {
        	_bodyPart.addAction(["kiss","lick","suck","touch"]);
            break;
        }
        case "fingers" : {
        	_bodyPart.addAction(["kiss","lick","suck","touch"]);
            break;
        }
        case "toes" : {
        	_bodyPart.addAction(["kiss","lick","suck","touch"]);
            break;
        }
        case "rear" : {
        	_bodyPart.addAction(["grab","grope","kiss","lick","pray","sex"]);
            break;
        }
        case "anus" : {
        	_bodyPart.addAction(["fist","kiss","lick","sex"]);
            break;
        }
        case "vagina" : {
        	_bodyPart.addAction(["fist","kiss","lick","sex"]);
            break;
        }
        case "clitoris" : {
        	_bodyPart.addAction(["kiss","lick","rub","suck"]);
            break;
        }
        case "penis" : {
        	_bodyPart.addAction(["grab","grope","kiss","lick","massage","pull","push","rub","slap","stroke","suck"]);
            break;
        }
        case "knot" : {
        	_bodyPart.addAction(["kiss","lick","massage","rub","suck"]);
            break;
        }
        case "testicles" : {
        	_bodyPart.addAction(["grab","grope","kiss","lick","massage","pull","slap","suck"]);
            break;
        }
    }
});*/