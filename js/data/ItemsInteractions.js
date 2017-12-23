function magicFleshlightHold(_character) {
	if (!(_character instanceof Character)) {
	    if (charactersIndexes.has(_character))
	        _character = charactersIndexes.get(_character);
	    else
	        return undefined;
	}

	_character.incLust(15);
}
function magicFleshlightMasturbate(_character) {
	if (!(_character instanceof Character)) {
	    if (charactersIndexes.has(_character))
	        _character = charactersIndexes.get(_character);
	    else
	        return undefined;
	}

}

function charlieLeftEyeHold(_character) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    
    _character.incManaCostOffsetPercent(25);
}
function charlieLeftEyeRelease(_character) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    
    _character.decManaCostOffsetPercent(25);
}
function charlieLeftEyeConsume(_character) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    
    _character.incManaMax(25);
}

function charlieBeatingHeartHold(_character) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    
    _character.incManaCostOffsetPercent(25);
}
function charlieBeatingHeartRelease(_character) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    
    _character.decManaCostOffsetPercent(25);
}
function charlieBeatingHeartConsume(_character) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }

    clearContentAndMenu();
    Content.add("<p>As soon as your teeth break the flesh of Charlie's heart, you feel a sudden and painful tightness in your chest.</p><p>Your vision darkens at the corner of your eyes, and your breathing becomes laborious. No matter how fast or deep your breaths, it never feels as if you have enough air.</p><p>A ringing is heard, high and constant.</p><p>Everything grows cold.</p><p>Then, as your darkening vision focuses on your arms, you hear a voice groan, \"Ugh, hooves.\"</p><p>It was your voice.</p><p>\"At least I have a huge dick this time.\"</p>");
    Menu.addOption("location.reload()", "Reload", "You died.");
}