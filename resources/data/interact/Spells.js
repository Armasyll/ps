function spellLevitateCast(_entity, _character = PSDE.player) {
    if (!(_entity instanceof Entity)) {
        if (PSDE.entities.has(_entity))
            _entity = PSDE.entities.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

	return true;
}
function spellTeleportCast(_entity, _character = PSDE.player) {
    if (!(_entity instanceof Entity)) {
        if (PSDE.entities.has(_entity))
            _entity = PSDE.entities.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

	return true;
}
function spellUnlockCast(_entity, _character = PSDE.player) {
	var _spell = PSDE.getSpellByID("spellUnlock");

	if (!(_entity instanceof Entity)) {
        if (PSDE.entities.has(_entity))
            _entity = PSDE.entities.get(_entity);
        else if (_entity instanceof Room) {}
        else if (PSDE.rooms.has(_entity)) {
        	_entity = PSDE.rooms.get(_entity);
        }
        else
        	return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

	if ((PSDE.enableDebug)) console.log("Running {0} with {1} and {2}".format(_spell.id, _entity.id, _character.id));

    if (_entity instanceof Room) {
    	PSDE._unlockRoom(PSDE.getCharacterCurrentRoom(_character), _entity);
    }

	return true;
}
function spellImbueCast(_entity, _character = PSDE.player) {
    if (!(_entity instanceof Entity)) {
        if (PSDE.entities.has(_entity))
            _entity = PSDE.entities.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

	return true;
}
function spellMirrorOpenCast(_entity, _character = PSDE.player) {
    if (!(_entity instanceof Entity)) {
        if (PSDE.entities.has(_entity))
            _entity = PSDE.entities.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

	return true;
}
function spellMirrorWalkCast(_entity, _character = PSDE.player) {
    if (!(_entity instanceof Entity)) {
        if (PSDE.entities.has(_entity))
            _entity = PSDE.entities.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

	return true;
}
function spellMirrorLookCast(_entity, _character = PSDE.player) {
    if (!(_entity instanceof Entity)) {
        if (PSDE.entities.has(_entity))
            _entity = PSDE.entities.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

	return true;
}
function spellCharacterSleepCast(_entity, _character = PSDE.player) {
	var _spell = PSDE.getSpellByID("spellCharacterSummon");

    if (!(_entity instanceof Character)) {
        if (PSDE.characters.has(_entity))
            _entity = PSDE.characters.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

	_entity.sleep();
	_entity.charmed(_character, "6h");

	return true;
}
function spellCharacterSummonCast(_entity, _character = PSDE.player) {
	var _spell = PSDE.getSpellByID("spellCharacterSummon");

    if (!(_entity instanceof Character)) {
        if (PSDE.characters.has(_entity))
            _entity = PSDE.characters.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

	PSDE.setCharacterCurrentRoom(_entity, PSDE.getCharacterCurrentRoom(_character));

	return true;
}
function spellCharacterLustCast(_entity, _character = PSDE.player) {
	var _spell = PSDE.getSpellByID("spellCharacterLust");

    if (!(_entity instanceof Character)) {
        if (PSDE.characters.has(_entity))
            _entity = PSDE.characters.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

	_entity.incLust(20);

	return true;
}
function spellCharacterRutCast(_entity, _character = PSDE.player) {
	var _spell = PSDE.getSpellByID("spellCharacterRut");

    if (!(_entity instanceof Character)) {
        if (PSDE.characters.has(_entity))
            _entity = PSDE.characters.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

    if (!_entity.rut) {
		_entity.enableRut();
		new GameEvent("{0}RutRemove".format(_entity.id), "charmed", _character, _entity, undefined, undefined, undefined, undefined, "1d", "{0}.disableRut()".format(_entity.id), true);
	}

	return true;
}
function spellCharacterTempDispositionCast(_entity, _character = PSDE.player) {
	var _spell = PSDE.getSpellByID("spellCharacterTempDisposition");

    if (!(_entity instanceof Character)) {
        if (PSDE.characters.has(_entity))
            _entity = PSDE.characters.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

    _entity.incCharacterAllDispositions(_character, 20);
	_entity.charmed(_character, "1d");
	new GameEvent("{0}TempDispositionRemove".format(_entity.id), "charmed", _character, _entity, undefined, undefined, undefined, undefined, "1d", "{0}.decCharacterAllDispositions({1}, 20);{0}.incCharacterMiseo({1}, 2)".format(_entity.id, _character.id), true);
	return true;
}
function spellCharacterGradualDispositionCast(_entity, _character = PSDE.player) {
    if (!(_character instanceof Entity)) {
        if (PSDE.entities.has(_entity))
            _entity = PSDE.entities.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

	return true;
}
function spellCharacterCompelCast(_entity, _character = PSDE.player) {
    if (!(_entity instanceof Entity)) {
        if (PSDE.entities.has(_entity))
            _entity = PSDE.entities.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

	_entity.charmed(_character, "1h");
	return true;
}
function spellCharacterDominateCast(_entity, _character = PSDE.player) {
	var _spell = PSDE.getSpellByID("spellCharacterDominate");

    if (!(_entity instanceof Entity)) {
        if (PSDE.entities.has(_entity))
            _entity = PSDE.entities.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

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
function spellCharacterMindSwap(_entity, _character = PSDE.player, _freeCast = false) {
    var _spell = PSDE.getSpellByID("spellCharacterMindSwap");

    if (!(_entity instanceof Entity)) {
        if (PSDE.entities.has(_entity))
            _entity = PSDE.entities.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_freeCast && !_character.castSpell(_spell))
        return false;

    _character.clearFollowing();
    _entity.clearFollowing();
    _character.clearFollowers();
    _entity.clearFollowers();
    _character.stand();
    _entity.stand();
    
    PSDE.setTimedFunctionEvent("spellCharacterMindSwapResetLife{0}{1}".format(_character.id, _entity.id), "{0}.setLifeMax({1}.getLifeMax());{1}.setLifeMax({0}.getLifeMax())".format(_character, _entity), "1d", true)

    var arr = new Map();
    
    arr.set('items', _character.items.concat(_entity.items));
    
    arr.set('id', _character.id);

    arr.set('phone', _character.phone);

    arr.set('defaultDisposition', _character.defaultDisposition);
    arr.set('agape', _character.agape);
    arr.set('philautia', _character.philautia);
    arr.set('mana', _entity.mana);
    arr.set('manaMax', _character.manaMax + _entity.manaMax);
    arr.set('sanity', _character.sanity);
    arr.set('money', _character.money + _entity.money);

    arr.set('virgin', _character.virgin);
    arr.set('hadSexWithMale', _character.hadSexWithMale);
    arr.set('hadSexWithFemale', _character.hadSexWithFemale);

    arr.set('sexCount', _character.sexCount);
    arr.set('sexCountMap', _character.sexCountMap);
    arr.set('sexRefusalCountMap', _character.sexRefusalCountMap);

    arr.set('characterDisposition', _character.characterDisposition);

    arr.set('prefersSpecies', _character.prefersSpecies);
    arr.set('avoidsSpecies', _character.avoidsSpecies);

    arr.set('sexualOrientation', _character.sexualOrientation);

    arr.set('preferredPenisSize', _character.preferredPenisSize);
    arr.set('preferredPenisGirth', _character.preferredPenisGirth);
    arr.set('preferredBreastSize', _character.preferredBreastSize);

    arr.set('prefersPredators', _character.prefersPredators);
    arr.set('avoidsPredators', _character.avoidsPredators);
    arr.set('prefersPrey', _character.prefersPrey);
    arr.set('avoidsPrey', _character.avoidsPrey);

    arr.set('exhibitionism', _character.exhibitionism);
    arr.set('somnophilia', _character.somnophilia);
    arr.set('intoxicated', _character.intoxicated);
    arr.set('incestual', _character.incestual);

    PSDE.moveCharacterToRoom(_character, PSDE.getCharacterCurrentRoom(_entity));

    for (var key in _entity) {
        if (typeof key != "object")
            _character[key] = _entity[key];
    }
    
    arr.forEach(function(_value, _key) {
        _character[_key] = _value;
    }, this);
    
    _character.name = '<i>{0}</i>'.format(_entity.name);
    _character.items = arr.get('items');
    
    PSDE.characters.forEach(function(_character) {
        if (_character != PSDE.player && _character != _character && _character != _entity) {
            _character.characterDisposition.set(_character, _character.characterDisposition.get(_entity));
        }
    }, this);
}
function spellCharacterPossessCast(_entity, _character = PSDE.player) {
    if (!(_character instanceof Entity)) {
        if (PSDE.entities.has(_entity))
            _entity = PSDE.entities.get(_entity);
        else
            return undefined;
    }
    if (!(_character instanceof Character))
        _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : PSDE.player;

    if (!_character.castSpell(_spell))
    	return false;

	return true;
}