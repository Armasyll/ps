function magicBettyFleshlightHold(_character, _executeScene = true) {
	if (!(_character instanceof Character)) {
	    if (characterIndices.has(_character))
	        _character = characterIndices.get(_character);
	    else
	        return undefined;
	}
    if (typeof _executeScene != "boolean")
        _executeScene = true;

    if (_executeScene) {

    }

	_character.incLust(15);

    return true;
}
function magicBettyFleshlightMasturbate(_character, _executeScene = true) {
	if (!(_character instanceof Character)) {
	    if (characterIndices.has(_character))
	        _character = characterIndices.get(_character);
	    else
	        return undefined;
	}
    if (typeof _executeScene != "boolean")
        _executeScene = true;

    if (_executeScene) {

    }

    return true;
}

function charlieLeftEyeHold(_character, _executeScene = true) {
    if (!(_character instanceof Character)) {
        if (characterIndices.has(_character))
            _character = characterIndices.get(_character);
        else
            return undefined;
    }
    if (typeof _executeScene != "boolean")
        _executeScene = true;
    
    if (_executeScene) {

    }

    _character.incManaCostOffsetPercent(25);

    return true;
}
function charlieLeftEyeRelease(_character, _executeScene = true) {
    if (!(_character instanceof Character)) {
        if (characterIndices.has(_character))
            _character = characterIndices.get(_character);
        else
            return undefined;
    }
    if (typeof _executeScene != "boolean")
        _executeScene = true;

    if (_executeScene) {

    }

    _character.decManaCostOffsetPercent(25);

    return true;
}
function charlieLeftEyeConsume(_character, _executeScene = true) {
    if (!(_character instanceof Character)) {
        if (characterIndices.has(_character))
            _character = characterIndices.get(_character);
        else
            return undefined;
    }
    if (typeof _executeScene != "boolean")
        _executeScene = true;

    if (_executeScene) {

    }

    if (_character.maxMan == 0) {
        _character.incManaMax(2);
        _character.incHunger(25);
        _character.decLife(10);
        _character.decStamina(25);
    }
    else {
        _character.incManaMax(4);
        _character.incHunger(20);
        _character.decLife(8);
        _character.decStamina(20);
    }

    return true;
}

function charlieBeatingHeartAttack(_character, _executeScene = true) {
    if (!(_character instanceof Character)) {
        if (characterIndices.has(_character))
            _character = characterIndices.get(_character);
        else
            return undefined;
    }
    if (typeof _executeScene != "boolean")
        _executeScene = true;

    if (_executeScene) {

    }

    return true;
}
function charlieBeatingHeartConsume(_character, _executeScene = true) {
    if (!(_character instanceof Character)) {
        if (characterIndices.has(_character))
            _character = characterIndices.get(_character);
        else
            return undefined;
    }
    if (typeof _executeScene != "boolean")
        _executeScene = true;

    if (_executeScene) {
        clearContentAndMenu();
        Content.add("<p>As soon as your teeth break the flesh of Charlie's heart, you feel a sudden and painful tightness in your chest.</p><p>Your vision darkens at the corner of your eyes, and your breathing becomes laborious. No matter how fast or deep your breaths, it never feels as if you have enough air.</p><p>A ringing is heard, high and constant.</p><p>Everything grows cold.</p><p>Then, as your darkening vision focuses on your arms, you hear a voice groan, \"Ugh, hooves.\"</p><p>It was your voice.</p><p>\"At least I have a huge dick this time.\"</p>");
        Menu.addOption("location.reload()", "Reload", "You died.");
    }

    return true;
}
function charlieBeatingHeartKiss(_character, _executeScene = true) {

}
function charlieBeatingHeartHold(_character, _executeScene = true) {
    if (!(_character instanceof Character)) {
        if (characterIndices.has(_character))
            _character = characterIndices.get(_character);
        else
            return undefined;
    }
    if (typeof _executeScene != "boolean")
        _executeScene = true;

    if (_executeScene) {

    }

    _character.incManaCostOffsetPercent(25);
    return true;
}
function charlieBeatingHeartMasturbate(_character, _executeScene = true) {
    if (!(_character instanceof Character)) {
        if (characterIndices.has(_character))
            _character = characterIndices.get(_character);
        else
            return undefined;
    }
    if (typeof _executeScene != "boolean")
        _executeScene = true;

    if (_executeScene) {

    }

    return true;
}
function charlieBeatingHeartRelease(_character, _executeScene = true) {
    if (!(_character instanceof Character)) {
        if (characterIndices.has(_character))
            _character = characterIndices.get(_character);
        else
            return undefined;
    }
    if (typeof _executeScene != "boolean")
        _executeScene = true;

    if (_executeScene) {

    }

    _character.decManaCostOffsetPercent(25);
    return true;
}

function charliePalmMirrorHold(_character, _executeScene = true) {
    if (!(_character instanceof Character)) {
        if (characterIndices.has(_character))
            _character = characterIndices.get(_character);
        else
            return undefined;
    }
    if (typeof _executeScene != "boolean")
        _executeScene = true;

    if (_executeScene) {

    }

    _character.incManaCostOffsetPercent(10);
    return true;
}
function charliePalmMirrorRelease(_character, _executeScene = true) {
    if (!(_character instanceof Character)) {
        if (characterIndices.has(_character))
            _character = characterIndices.get(_character);
        else
            return undefined;
    }
    if (typeof _executeScene != "boolean")
        _executeScene = true;

    if (_executeScene) {

    }

    _character.decManaCostOffsetPercent(10);
    return true;
}