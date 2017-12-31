function spellLevitateCast(_entity) {
    if (!(_entity instanceof Entity)) {
        if (entityIndexes.has(_entity))
            _entity = entityIndexes.get(_entity);
        else
            return undefined;
    }

	return true;
}
function spellTeleportCast(_entity) {
    if (!(_entity instanceof Entity)) {
        if (entityIndexes.has(_entity))
            _entity = entityIndexes.get(_entity);
        else
            return undefined;
    }

	return true;
}
function spellUnlockCast(_entity, _character = player) {
	var _spell = spellsIndexes.get("spellUnlock");

	if (!(_entity instanceof Entity)) {
        if (entityIndexes.has(_entity))
            _entity = entityIndexes.get(_entity);
        else if (_entity instanceof Room) {}
        else if (roomsIndexes.has(_entity)) {
        	_entity = roomsIndexes.get(_entity);
        }
        else
        	return undefined;
    }
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : player;

    if (!_character.castSpell(_spell))
    	return false;

	if (debug) console.log("Running {0} with {1} and {2}".format(_spell.id, _entity.id, _character.id));

    if (_entity instanceof Room) {
    	_unlockRoom(_character.room, _entity);
    }

	return true;
}
function spellImbueCast(_entity) {
    if (!(_entity instanceof Entity)) {
        if (entityIndexes.has(_entity))
            _entity = entityIndexes.get(_entity);
        else
            return undefined;
    }

	return true;
}
function spellMirrorOpenCast(_entity) {
    if (!(_entity instanceof Entity)) {
        if (entityIndexes.has(_entity))
            _entity = entityIndexes.get(_entity);
        else
            return undefined;
    }

	return true;
}
function spellMirrorWalkCast(_entity) {
    if (!(_entity instanceof Entity)) {
        if (entityIndexes.has(_entity))
            _entity = entityIndexes.get(_entity);
        else
            return undefined;
    }

	return true;
}
function spellMirrorLookCast(_entity) {
    if (!(_entity instanceof Entity)) {
        if (entityIndexes.has(_entity))
            _entity = entityIndexes.get(_entity);
        else
            return undefined;
    }

	return true;
}
function spellCharacterSleepCast(_entity, _character = player) {
	var _spell = spellsIndexes.get("spellCharacterSummon");

    if (!(_entity instanceof Character)) {
        if (charactersIndexes.has(_entity))
            _entity = charactersIndexes.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : player;

    if (!_character.castSpell(_spell))
    	return false;

	_entity.sleep();
	_entity.bewitched(_character, "6h");

	return true;
}
function spellCharacterSummonCast(_entity, _character = player) {
	var _spell = spellsIndexes.get("spellCharacterSummon");

    if (!(_entity instanceof Character)) {
        if (charactersIndexes.has(_entity))
            _entity = charactersIndexes.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : player;

    if (!_character.castSpell(_spell))
    	return false;

	characterSetRoom(_entity, _character.room);

	return true;
}
function spellCharacterLustCast(_entity, _character = player) {
	var _spell = spellsIndexes.get("spellCharacterLust");

    if (!(_entity instanceof Character)) {
        if (charactersIndexes.has(_entity))
            _entity = charactersIndexes.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : player;

    if (!_character.castSpell(_spell))
    	return false;

	_entity.incLust(20);

	return true;
}
function spellCharacterRutCast(_entity, _character = player) {
	var _spell = spellsIndexes.get("spellCharacterRut");

    if (!(_entity instanceof Character)) {
        if (charactersIndexes.has(_entity))
            _entity = charactersIndexes.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : player;

    if (!_character.castSpell(_spell))
    	return false;

    if (!_entity.rut) {
		_entity.enableRut();
		new GameEvent("{0}RutRemove".format(_entity.id), "bewitched", _character, _entity, undefined, undefined, undefined, undefined, "1d", "{0}.disableRut()".format(_entity.id), true);
	}

	return true;
}
function spellCharacterTempDispositionCast(_entity, _character = player) {
	var _spell = spellsIndexes.get("spellCharacterTempDisposition");

    if (!(_entity instanceof Character)) {
        if (charactersIndexes.has(_entity))
            _entity = charactersIndexes.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : player;

    if (!_character.castSpell(_spell))
    	return false;

    _entity.incCharacterAllDispositions(_character, 20);
	_entity.bewitched(_character, "1d");
	new GameEvent("{0}TempDispositionRemove".format(_entity.id), "bewitched", _character, _entity, undefined, undefined, undefined, undefined, "1d", "{0}.decCharacterAllDispositions({1}, 20);{0}.incCharacterMiseo({1}, 2)".format(_entity.id, _character.id), true);
	return true;
}
function spellCharacterGradualDispositionCast(_entity) {
    if (!(_character instanceof Entity)) {
        if (entityIndexes.has(_entity))
            _entity = entityIndexes.get(_entity);
        else
            return undefined;
    }

	return true;
}
function spellCharacterCompelCast(_entity) {
    if (!(_entity instanceof Entity)) {
        if (entityIndexes.has(_entity))
            _entity = entityIndexes.get(_entity);
        else
            return undefined;
    }

	_entity.bewitched(_character, "1h");
	return true;
}
function spellCharacterDominateCast(_entity, _character = player) {
	var _spell = spellsIndexes.get("spellCharacterDominate");

    if (!(_entity instanceof Entity)) {
        if (entityIndexes.has(_entity))
            _entity = entityIndexes.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : player;

    if (!_character.castSpell(_spell))
    	return false;

    if (_entity instanceof Character) {
	    new GameEvent("{0}CharacterDominate".format(_entity.id), "bewitched", _character, _entity, undefined, undefined, undefined, undefined, "1d", "{0}.setCharacterEros({1}, {2});{0}.setCharacterManic({1}, {3});{0}.setSexualOrientation({4});{0}.setIncestual({5});{0}.disableRut();{0}.setLust(0)".format(_entity.id, _character.id, _entity.getCharacterEros(_character), _entity.getCharacterManic(_character), _entity.sexualOrientation, _entity.incestual), true);
		_entity.bewitched(_character, "1d");
		_entity.setCharacterEros(_character, 999);
		_entity.setCharacterManic(_character, 999);
		_entity.setSexualOrientation(2);
		_entity.setIncestual(100);
		_entity.enableRut();
		_entity.setLust(999);
	}

	return true;
}
function spellCharacterPossessCast(_entity, _character = player) {
    if (!(_character instanceof Entity)) {
        if (entityIndexes.has(_entity))
            _entity = entityIndexes.get(_entity);
        else
            return undefined;
    }

	return true;
}