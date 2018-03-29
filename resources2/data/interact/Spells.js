function spellLevitateCast(_entity, _character = player) {
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

	return true;
}
function spellTeleportCast(_entity, _character = player) {
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
function spellImbueCast(_entity, _character = player) {
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

	return true;
}
function spellMirrorOpenCast(_entity, _character = player) {
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

	return true;
}
function spellMirrorWalkCast(_entity, _character = player) {
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

	return true;
}
function spellMirrorLookCast(_entity, _character = player) {
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
	_entity.charmed(_character, "6h");

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
		new GameEvent("{0}RutRemove".format(_entity.id), "charmed", _character, _entity, undefined, undefined, undefined, undefined, "1d", "{0}.disableRut()".format(_entity.id), true);
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
	_entity.charmed(_character, "1d");
	new GameEvent("{0}TempDispositionRemove".format(_entity.id), "charmed", _character, _entity, undefined, undefined, undefined, undefined, "1d", "{0}.decCharacterAllDispositions({1}, 20);{0}.incCharacterMiseo({1}, 2)".format(_entity.id, _character.id), true);
	return true;
}
function spellCharacterGradualDispositionCast(_entity, _character = player) {
    if (!(_character instanceof Entity)) {
        if (entityIndexes.has(_entity))
            _entity = entityIndexes.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : player;

    if (!_character.castSpell(_spell))
    	return false;

	return true;
}
function spellCharacterCompelCast(_entity, _character = player) {
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

	_entity.charmed(_character, "1h");
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
	    new GameEvent(
            "{0}CharacterDominate".format(_entity.id),
            "charmed",
            _character,
            _entity,
            undefined,
            undefined,
            undefined,
            undefined,
            "1d",
            "{0}.setCharacterPassion({1}, {2});{0}.setCharacterObsession({1}, {3});{0}.setCharacterHate({1}, {4});{0}.setSexualOrientation({5});{0}.setIncestual({6});{0}.disableRut();{0}.setLust(0)".format(
                _entity.id,
                _character.id,
                _entity.getCharacterPassion(_character),
                _entity.getCharacterObsession(_character),
                _entity.getCharacterHate(_character),
                _entity.getSexualOrientationCompatibility(),
                _entity.getIncestual()
            ),
            true
        );
		_entity.charmed(_character, "1d");
		_entity.setCharacterPassion(_character, 999);
        _entity.setCharacterObsession(_character, 999);
        _entity.setCharacterHate(_character, 0);
		_entity.setSexualOrientation(2);
		_entity.setIncestual(100);
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
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : player;

    if (!_character.castSpell(_spell))
    	return false;

	return true;
}