/**
 * Resizes the GUI. If the Minimap is hidden by Bootstrap constrains, it is disabled, otherwise it is enabled.
 */
function resizeGui() {
    if (debug) console.log("Resizing GUI");

    document.getElementById("rowMid").style.height = (document.body.offsetHeight - document.getElementById("rowBot").offsetHeight) + "px";
    document.getElementById("rowBot").style.height = document.getElementById("rowBot").offsetHeight + "px";
    document.getElementById("mapContentDisplay").style.height = document.getElementById("rowMid").offsetHeight - document.getElementById("locationContentDisplay").offsetHeight - 15 + "px";
    document.getElementById("map").style.height = document.getElementById("mapContentDisplay").offsetHeight + "px";
    
    if (isHidden(document.getElementById("locationInfoContainer")))
        document.getElementById("contentContainerHeadLocation").style.display = '';
    else
        document.getElementById("contentContainerHeadLocation").style.display = 'none';
    
    if (isHidden(document.getElementById("locationInfoContainer")))
        enableMinimap = false;
    else
        enableMinimap = true;
}

/**
 * Updates the in-game Time display
 */
function updateTimeDisplay() {
    for (var _i = 0; _i < document.getElementsByClassName('timeDisplay').length; _i++) {
        document.getElementsByClassName('timeDisplay')[_i].innerHTML = unixTimeToDateString(currentTime);
    }
}
function updatePlayerInfoDisplay() {
    document.getElementById("playerName").innerHTML = ("{0}{1}{2}".format(player.name, player.nickname != undefined ? ("(" + player.nickanem + ")") : "", player.surname != undefined ? (" " + player.surname) : ""));
    document.getElementById("playerMoney").innerHTML = (player.money);

    document.getElementById("playerLife").innerHTML = (player.life);
    document.getElementById("playerLifeMax").innerHTML = (player.lifeMax);
    if (player.life < player.lifeMax / 5) {
        document.getElementById("playerLife").classList.add("text-danger");
        document.getElementById("playerLife").classList.remove("text-warning");
        document.getElementById("playerLife").classList.remove("text-primary");
    }
    else if (player.life < player.lifeMax / 2) {
        document.getElementById("playerLife").classList.remove("text-danger");
        document.getElementById("playerLife").classList.add("text-warning");
        document.getElementById("playerLife").classList.remove("text-primary");
    }
    else {
        document.getElementById("playerLife").classList.remove("text-danger");
        document.getElementById("playerLife").classList.remove("text-warning");
        document.getElementById("playerLife").classList.add("text-primary");
    }

    document.getElementById("playerStamina").innerHTML = (player.stamina);
    document.getElementById("playerStaminaMax").innerHTML = (player.staminaMax);
    if (player.stamina < player.staminaMax / 5) {
        document.getElementById("playerStamina").classList.add("text-danger");
        document.getElementById("playerStamina").classList.remove("text-warning");
        document.getElementById("playerStamina").classList.remove("text-primary");
    }
    else if (player.stamina < player.staminaMax / 2) {
        document.getElementById("playerStamina").classList.remove("text-danger");
        document.getElementById("playerStamina").classList.add("text-warning");
        document.getElementById("playerStamina").classList.remove("text-primary");
    }
    else {
        document.getElementById("playerStamina").classList.remove("text-danger");
        document.getElementById("playerStamina").classList.remove("text-warning");
        document.getElementById("playerStamina").classList.add("text-primary");
    }

    if (player.manaMax == 0)
        document.getElementById("playerManaDisplay").classList.add("invisible");
    else
        document.getElementById("playerManaDisplay").classList.remove("invisible");
    document.getElementById("playerMana").innerHTML = (player.mana);
    document.getElementById("playerManaMax").innerHTML = (player.manaMax);
    if (player.mana < player.manaMax / 5) {
        document.getElementById("playerMana").classList.add("text-danger");
        document.getElementById("playerMana").classList.remove("text-warning");
        document.getElementById("playerMana").classList.remove("text-primary");
    }
    else if (player.mana < player.manaMax / 2) {
        document.getElementById("playerMana").classList.remove("text-danger");
        document.getElementById("playerMana").classList.add("text-warning");
        document.getElementById("playerMana").classList.remove("text-primary");
    }
    else {
        document.getElementById("playerMana").classList.remove("text-danger");
        document.getElementById("playerMana").classList.remove("text-warning");
        document.getElementById("playerMana").classList.add("text-primary");
    }
}

function _generateEntityItemsGraphicalList(_fromEntity, _toEntity = undefined, _modify = false) {
    var _body = "";
    _fromEntity.items.forEach(function(_item) {
        var _ownerString = '';
        if (_item.owner instanceof Set && _item.owner.size > 0) {
            _ownerString += "Owned by ";
            
            var _owners = Array.from(_item.owner);
            if (_item.owner.size == 1)
                _ownerString += (_owners[0] == player ? "you" : _owners[0].name);
            else {
                for (i = 0; i < _owners.length - 1; i++) {
                    _ownerString += (_owners[i] == player ? "you" : _owners[i].name);
                    if (_owners.length > 2)
                        _ownerString += ", ";
                }
                _ownerString += " and " + (_owners[_owners.length - 1] == player ? "you" : _owners[_owners.length - 1].name) + ".";
            }
        }
        
        _body += String(
                "<div class='inventoryItemContainer'>" +
                    "<img class='text-center' src='{0}' alt=''/><br/>" +
                    "<div style='vertical-align:bottom;'>" +
                        "<p class='text-center' style='height: 2.5em;'>{1}</p>" +
                        "<p class='small text-center' style='height: 2em;'>{2}</p>" +
                        "<p class='small' style='background-color: #d3d3d3; padding: 0.25em; height: 6em; max-height: 6em; overflow-y: scroll;'>{3}</p>" +
                        "{4}" +
                    "</div>" +
                "</div>"
            ).format(
                _item.image,
                _item.name,
                (typeof _item.owner != 'undefined' ? _ownerString : ''),
                _item.description,
                (_modify === true ? (_fromEntity == player ? ("<button onclick='_generateEntityItemsGraphicalMove({0},{1},{2})'>Give</button>").format(_item.id, _fromEntity.id, _toEntity.id) : ("<button onclick='_generateEntityItemsGraphicalMove({0},{1},{2})'>Take</button>").format(_item.id, _fromEntity.id, _toEntity.id)) : '')
            )
    }, this);
    
    return _body;
}
function _generateEntityItemsGraphicalMove(_item = undefined, _fromEntity = undefined, _toEntity = undefined) {
    if (entityGiveItem(_item, _fromEntity, _toEntity)) {
        var _lazyEntity = _fromEntity;
        if (_lazyEntity == player)
            _lazyEntity = _toEntity;
        $('#dualInventoryContent-characterA').html(_generateEntityItemsGraphicalList(player, _lazyEntity, true));
        $('#dualInventoryContent-characterB').html(_generateEntityItemsGraphicalList(_lazyEntity, player, true));
    }
}
function _generateEntityItemsMenuMove(_item, _fromEntity = undefined, _toEntity = undefined, _useLastMenu = false, _switch = false, _allowSwitch = true) {
    if (entityGiveItem(_item, _fromEntity, _toEntity, _useLastMenu)) {
        if (_switch) {
            if (_fromEntity instanceof Character)
                characterInteractOpen(_toEntity, _switch, _allowSwitch, false);
            else if (_fromEntity instanceof Furniture)
                furnitureInteractOpen(_toEntity, _switch, _allowSwitch, false);
        }
        else {
            if (_fromEntity instanceof Character)
                characterInteractOpen(_fromEntity, _switch, _allowSwitch, false);
            else if (_fromEntity instanceof Furniture)
                furnitureInteractOpen(_fromEntity, _switch, _allowSwitch, false);
        }
        
        return true;
    }
    else
        return undefined;
}
/**
 * Moves an item from an Entity to another Entity.
 * @param {Item} _item
 * @param {Entity} _fromEntity
 * @param {Entity} _toEntity
 * @param {Boolean} _useLastMenu
 * @return {Boolean}
 */
function entityGiveItem(_item = undefined, _fromEntity = undefined, _toEntity = undefined, _useLastMenu = false) {
    var _eventRun = false;

    if (!(_item instanceof Item)) {
        if (itemsIndexes.has(_item))
            item = itemsIndexes.get(_item);
        else {
            if (debug) console.log(_item.id + " isn't indexed in Items or Clothing.");
            return undefined;
        }
    }
    
    if (_fromEntity != undefined && !(_fromEntity instanceof Entity)) {
        if (entityIndexes.has(_fromEntity))
            _fromEntity = entityIndexes.get(_fromEntity);
        else {
            if (debug) console.log("_fromEntity {0} isn't an Entity.".format(_fromEntity));
            _fromEntity = undefined;
        }
    }
        
    if (!(_toEntity instanceof Entity)) {
        if (entityIndexes.has(_toEntity))
            _toEntity = entityIndexes.get(_toEntity);
        else {
            if (debug) console.log("_toEntity {0} isn't an Entity.".format(_toEntity));
            return undefined;
        }
    }

    if (_fromEntity == undefined || _fromEntity.containsItem(_item)) {
        _eventRun = _executeItemRemoveEvents(_item, _fromEntity, _toEntity) ? true : _eventRun;
        _eventRun = _executeItemGiveEvents(_item, _fromEntity, _toEntity) ? true : _eventRun;
        _eventRun = _executeItemTakeEvents(_item, _fromEntity, _toEntity) ? true : _eventRun;
    }
    else
        return undefined;
    
    if (lastGameEvent == undefined && !_eventRun) {
        if (_useLastMenu) {
            unsafeExec(lastMenu);
        }

        return true;
    }
    else
        return false;
}
function _executeItemRemoveEvents(_item, _fromEntity, _toEntity) {
    var _eventRun = false;
    if (typeof _fromEntity != 'undefined') {
        if (_fromEntity instanceof Character) {
            if (_item instanceof Clothing && _fromEntity.wearing(_item) && !characterDisrobeItem(_fromEntity, _item, _fromEntity == player))
                return false
            else if (_fromEntity.holding(_item) && !characterReleaseItem(_fromEntity, _item, undefined, _fromEntity == player))
                return false;
            else if (!unsafeExec("{0}Remove({1})".format(_item.id, _fromEntity.id)))
                return false;
        }
        else if (_fromEntity instanceof Furniture) {
            if (!unsafeExec("{0}Remove({1})".format(_item.id, _fromEntity.id)))
                return false;
            else if (!unsafeExec("{0}Remove({1})".format(_fromEntity.id, _item.id))) // mimic :o
                return false;
        }
        
        _fromEntity.remove(_item);

        if (debug) console.log("Checking for item removal events");
        eventsIndexes.forEach(function(_event) {
            if (typeof _event.cron == 'undefined' && _event.action == "remove" && _event.item == _item && (typeof _event.characterA == 'undefined' || _event.characterB == _fromEntity)) {
                if (_fromEntity == player || _toEntity == player) {
                    hideModals();
                    _eventRun = true;
                }
                
                _event.execute();
            }
        }, this);
    }
    return _eventRun;
}
function _executeItemGiveEvents(_item, _fromEntity, _toEntity) {
    var _eventRun = false;

    if (_fromEntity instanceof Character && !characterGiveItem(_fromEntity, _toEntity, _item, (_fromEntity == player || _toEntity == player)))
        return false;

    if (typeof _fromEntity == 'undefined' || !(_fromEntity.containsItem(_item))) {
        if (debug) console.log("Checking for item given events");
        eventsIndexes.forEach(function(_event) {
            if (typeof _event.cron == 'undefined' && _event.action == "give" && _event.item == _item && (typeof _event.characterA == 'undefined' || _event.characterA == _fromEntity) && (typeof _event.characterB == 'undefined' || _event.characterB == _toEntity)) {
                if (_fromEntity == player || _toEntity == player) {
                    hideModals();
                    _eventRun = true;
                }
                
                _event.execute();
            }
        }, this);
    }

    return _eventRun;
}
function _executeItemTakeEvents(_item, _fromEntity, _toEntity) {
    var _eventRun = false;
    if (typeof _fromEntity == 'undefined' || !(_fromEntity.containsItem(_item))) {
        if (_toEntity instanceof Character) {
            if (!characterTakeItem(_toEntity, _item, _toEntity == player))
                return false;
        }
        else
            _toEntity.addItem(_item);

        if (debug) console.log("Checking for item taken events");
        eventsIndexes.forEach(function(_event) {
            if (typeof _event.cron == 'undefined' && _event.action == "take" && _event.item == _item && (typeof _event.characterA == 'undefined' || _event.characterA == _toEntity) && (typeof _event.characterB == 'undefined' || _event.characterB == _fromEntity)) {
                if (_fromEntity == player || _toEntity == player) {
                    hideModals();
                    _eventRun = true;
                }
                
                _event.execute();
            }
        }, this);
    }

    return _eventRun;
}

/**
 * Clears the Content and Menu.
 */
function clearContentAndMenu() {
    Title.clear();
    Content.clear();
    Menu.clear();
}
/**
 * Moves a Character to the specified Room.
 * @param Character _character
 * @param Room _room
 * @return Boolean Whether or not the Character was moved to the Room.
 */
function characterSetRoom(_character = player, _room) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    if (!(_room instanceof Room))
        _room = roomsIndexes.get(_room);
    
    if (debug) console.log("Executing characterSetRoom({0}, {1})".format(_character.id, _room.id));
    
    if (_character.room != _room) {
        characterWalk(_character);
        
        _character.moveToRoom(_room);
        
        if (_character.hasFollowers) {
            _character.followers.forEach(function(_follower) {
                if (_follower.room == _character.previousRoom || _follower.room == _character.room)
                    characterSetRoom(_follower, _room);
                else
                    characterMovements.set(_follower, _findPathToRoom(_follower.room, _room));
            }, this);
        }
        
        if (characterMovements.has(_character))
            characterWalk(_character);
        else
            characterStand(_character);
        
        if (debug) console.log("Checking for room events.");
        eventsIndexes.forEach(function(_event) {
            if (
                typeof _event.cron == 'undefined' &&
                (typeof _event.characterA == 'undefined' || _character == _event.characterA) &&
                (typeof _event.characterB == 'undefined' || _character.room.containsCharacter(_event.characterB)) &&
                _character.room == _event.room &&
                (typeof _event.item == 'undefined' || _event.characterA.hasItem(_event.item))
            ) {
                _event.execute();
            }
        }, this);
    }
    
    return _character.room == _room;
}
/**
 * Moves the Player to the specified Room.
 * @param Room _room
 * @return Boolean
 */
function setRoom(_room) {
    characterMovements.delete(player);
    var _moved = characterSetRoom(player, _room);
    if (_moved) {
        tick("1m", false, true, false);
        
        if (enableMinimap)
            Minimap.generateMapFromStartRoom(player.room);
    }
    return _moved;
}
/**
 * Moves an Item from an Entity to the Player.
 * @param Item _item
 * @param Entity _fromEntity
 * @return Boolean
 */
function giveItem(_item, _fromEntity) {return entityGiveItem(_item, _fromEntity, player, true);}
/**
 * Passes time.
 * @param String time Amount of time to pass. If passed an integer, will treat it as seconds. "30s" will pass 30 seconds, "30m" will pass 30 minutes, "24h" will pass 24 hours, and "2d" will pass 2 days, in-game time.
 * @param Boolean _updateMinimap Update the Minimap, if it's enabled.
 * @param Boolean _runLastMenu Return to (run again) the last-used menu.
 * @return Date The current time, in-game.
 */
function tick(time, _updateMinimap = true, _runLastMenu = false, _clearEventsExecutedThisTick = true) {
    var _newTime = new Date(currentTime);
    
    if (typeof _updateMinimap != "boolean")
        _updateMinimap = true;
    if (typeof _runLastMenu != "boolean")
        _runLastMenu = false;
    if (typeof _clearEventsExecutedThisTick != "boolean")
        _clearEventsExecutedThisTick = true;
    
    if (debug) console.log("Executing tick({0}, {1}, {2})".format(time, _updateMinimap ? "true" : "false", _runLastMenu ? "true" : "false"));

    if (Number.isInteger(time))
        _newTime.addSeconds(time);
    else {
        number = Number.parseInt(time.slice(0, -1));
        if (Number.isInteger(number) && number > 0) {
            switch (time.slice(-1).toLowerCase()) {
                case "s" : {
                    _newTime.addSeconds(number);
                    break;
                }
                case "m" : {
                    _newTime.addMinutes(number);
                    break;
                }
                case "h" : {
                    _newTime.addHours(number);
                    break;
                }
                case "d" : {
                    _newTime.addDate(number);
                    break;
                }
            }
        }
    }
    
    if (_newTime instanceof Date) {
        while (currentTime < _newTime) {
            previousTime = currentTime;
            currentTime.addMinutes(1);
            
            if (currentTime.getSeconds() == 0) {
                if (characterMovements.size > 0) {
                    characterMovements.forEach(function(_rooms, _character) {
                        if (_rooms.size > 0) {
                            var _room = _rooms.values().next().value;
                            if (!_character.room.isLocked(_room) || _character.hasKey(_room)) {
                                characterSetRoom(_character, _room);
                                _rooms.delete(_room);
                            }
                            else
                                characterMovements.delete(_character);
                        }
                        else
                            characterMovements.delete(_character);
                    }, this);
                }
            }
            
            if (debug) console.log("Checking for cron events.");
            
            eventsIndexes.forEach(function(_event) {
                if (
                    _event.cron instanceof Cron &&
                    (
                        (typeof _event.location == 'undefined' || (_event.characterA instanceof Character && (_event.characterA.location == _event.location || _event.characterA.cell.location == _event.location))) &&
                        (typeof _event.cell == 'undefined' || (_event.characterA instanceof Character && _event.characterA.cell == _event.cell)) &&
                        (typeof _event.room == 'undefined' || (_event.characterA instanceof Character && _event.characterA.room == _event.room))
                    ) &&
                    (
                        (typeof _event.cron.year == 'undefined' || (_event.cron.containsYear(currentTime))) &&
                        (typeof _event.cron.month == 'undefined' || (_event.cron.containsMonth(currentTime))) &&
                        (typeof _event.cron.dom == 'undefined' || (_event.cron.containsDOM(currentTime))) &&
                        (typeof _event.cron.dow == 'undefined' || (_event.cron.containsDOW(currentTime))) &&
                        (typeof _event.cron.hours == 'undefined' || (_event.cron.containsHours(currentTime))) &&
                        (typeof _event.cron.minutes == 'undefined' || (_event.cron.containsMinutes(currentTime)))
                    )
                ) {
                    if (debug) console.log("EVENT: {0} : {1} == {2} ? ".format(_event.id, currentTime.getDay(), _event.cron.dow));
                    _event.execute();
                }
            }, this);
        }
    }
    
    updateTimeDisplay();
    
    if (enableMinimap && _updateMinimap)
        Minimap.generateMapFromStartRoom(player.room);
    if (_runLastMenu)
        runLastMenu();

    if (_clearEventsExecutedThisTick)
        eventsExecutedThisTick.clear();
    return currentTime;
}
/**
 * Creates path from Cell(1) to Cell(2), excluding an optional Set of Cell(s)
 * @param Cell _startCell
 * @param Cell _targetCell
 * @param Set<Cell> _excludeCells
 * @return Set<Cell> Set of Cell(s) that follow a linear path, or undefined
 */
function _findPathFromCellToCell(_startCell, _targetCell, _excludeCells = new Set()) {
    if (!(_startCell instanceof Cell))
        _startCell = cellsIndexes.get(_startCell);
    
    if (!(_targetCell instanceof Cell))
        _targetCell = cellsIndexes.get(_targetCell);
    
    if (!_startCell instanceof Cell || !_targetCell instanceof Cell) {
        if (debug) {
            if (!_startCell instanceof Cell &&  !_targetCell instanceof Cell)
                console.log("\tStart and Target cells aren't instance of Cell");
            else if (!_startCell instanceof Cell)
                console.log("\tStart cell isn't an instance of Cell.");
            else
                console.log("\tTarget cell isn't an instance of Cell.");
        }
        return;
    }
    
    if (_startCell == _targetCell)
        return new Set();
    
    var _openList = new Set();
    var _closedList = _excludeCells;
    var _parent = new Map();
    var _timeout = 0;
    
    if (_startCell != _targetCell) {
        _openList.add(_startCell);
        
        while (_openList.size > 0 && _timeout < 511) {
            var _currentCell = _openList.values().next().value;
            
            if (_currentCell == _targetCell) {
                var cur = _currentCell;
                var ret = [];
                while (_parent.has(_currentCell)) {
                    ret.push(_currentCell);
                    _currentCell = _parent.get(_currentCell);
                }
                return ret.reverse();
            }
            
            _openList.delete(_currentCell);
            _closedList.add(_currentCell);
            
            _currentCell.cells.forEach(function(_neighbor) {
                if (_closedList.has(_neighbor))
                    return;
                
                if (!_openList.has(_neighbor))
                    _openList.add(_neighbor);
                
                _parent.set(_neighbor, _currentCell);
            }, this);
            
            _timeout++;
        }
    }
    
    return undefined;
}
/**
 * Creates path from Room(1) to Room(2), which share a Cell, excluding an optional Set of Room(s)
 * @param Room _startRoom
 * @param Room _targetRoom
 * @param Set<Room> _excludeRooms
 * @return Set<Room> Set of Room(s) that follow a linear path, or undefined
 */
function _findPathFromRoomToRoom(_startRoom, _targetRoom, _excludeRooms = new Set()) {
    if (!(_startRoom instanceof Room))
        _startRoom = roomsIndexes.get(_startRoom);
    
    if (!(_targetRoom instanceof Room))
        _targetRoom = roomsIndexes.get(_targetRoom);
    
    if (!_startRoom instanceof Room || !_targetRoom instanceof Room)
        return;
    
    if (_startRoom.cell != _targetRoom.cell)
        return;
    
    var _openList = new Set();
    var _closedList = _excludeRooms;
    var _parent = new Map();
    var _timeout = 0;
    
    _openList.add(_startRoom);
    
    while (_openList.size > 0 && _timeout < 511) {
        var _currentRoom = _openList.values().next().value;
        
        if (_currentRoom == _targetRoom) {
            var cur = _currentRoom;
            var ret = [];
            while (_parent.has(_currentRoom)) {
                ret.push(_currentRoom);
                _currentRoom = _parent.get(_currentRoom);
            }
            return new Set(ret.reverse());
        }
        
        _openList.delete(_currentRoom);
        _closedList.add(_currentRoom);
        
        _currentRoom.attachedRooms.forEach(function(_neighbor) {
            if (_closedList.has(_neighbor))
                return;
            
            var _gScore = Math.abs(_currentRoom.x - _startRoom.x) + Math.abs(_currentRoom.y - _startRoom.x) + 1;
            var _gScoreIsBest = false;
            
            if (!_openList.has(_neighbor)) {
                _gScoreIsBest = true;
                _openList.add(_neighbor);
            }
            else if (_gScore < (Math.abs(_neighbor.x - _startRoom.x) + Math.abs(_neighbor.y - _startRoom.x))) {
                _gScoreIsBest = true;
            }
            
            if (_gScoreIsBest) {
                _parent.set(_neighbor, _currentRoom);
            }
        }, this);
        
        _timeout++;
    }
    
    return undefined;
}
/**
 * Creates path from Room(1) to Room(2), which may or may no share a Cell, excluding an optional Set of Room(s) and an optional Set of Cell(s)
 * @param Room _startRoom
 * @param Room _targetRoom
 * @param Set<Room> _excludeRooms
 * @param Set<Cell> _excludeCells
 * @return Set<Room> Set of Room(s) that follow a linear path, or undefined
 */
function _findPathToRoom(_startRoom, _targetRoom, _excludeRooms = new Set(), _excludeCells = new Set()) {
    if (!(_startRoom instanceof Room))
        _startRoom = roomsIndexes.get(_startRoom);
    
    if (!(_targetRoom instanceof Room))
        _targetRoom = roomsIndexes.get(_targetRoom);
    
    if (!_startRoom instanceof Room || !_targetRoom instanceof Room)
        return;
    
    if (_startRoom.cell != _targetRoom.cell) {
        var _cellPath = _findPathFromCellToCell(_startRoom.cell, _targetRoom.cell);
        var _roomPath = new Array();
        var _cTargetRoom = undefined;
        var _cRoom = _startRoom;
        var _nRoom = undefined;
        var _cCell = _startRoom.cell;
        var _pCells = new Set();
        var _i = 1;
        
        if (_cellPath.size == 0)
            return;
        
        Array.from(_cRoom.cell.gateways).some(function(_room) {
            _pCells.add(_room.cell);
            Array.from(_room.attachedRooms.values()).some(function(__room) {
                _pCells.add(__room.cell);
                if (__room.cell == _cellPath[0]) {
                    _cTargetRoom = _room;
                    _nRoom = __room;
                    
                    return true;
                }
            }, this);
        }, this);
        
        if (_cRoom != _cTargetRoom)
            _roomPath = _roomPath.concat(Array.from(_findPathFromRoomToRoom(_cRoom, _cTargetRoom)));
        
        _roomPath = _roomPath.concat(_nRoom);
        _cRoom = _nRoom;
        
        while (_cRoom != _targetRoom && _i < 511) {
            if (_cRoom.cell != _targetRoom.cell) {
                Array.from(_cRoom.cell.gateways).some(function(_room) {
                    return Array.from(_room.attachedRooms.values()).some(function(__room) {
                        if (!_pCells.has(__room.cell) && __room.cell == _cellPath[_i]) {
                            _cTargetRoom = _room;
                            _nRoom = __room;
                            
                            return true;
                        }
                    }, this);
                }, this);
                
                _roomPath = _roomPath.concat(Array.from(_findPathFromRoomToRoom(_cRoom, _cTargetRoom)));
                _roomPath = _roomPath.concat(_nRoom);
                _cRoom = _nRoom;
                
                _i++;
            }
            else {
                _roomPath = _roomPath.concat(Array.from(_findPathFromRoomToRoom(_cRoom, _targetRoom)));
                _cRoom = _targetRoom;
            }
        }
        
        return new Set(_roomPath);
    }
    else
        return _findPathFromRoomToRoom(_startRoom, _targetRoom);
}
/**
 * Moves Character in a path from their current room to target Room.
 * @param Character _character
 * @param Room _targetRoom
 * @return Boolean Whether or not the path is available, or undefined if the Character or Room are invalid.
 */
function setCharacterPath(_character, _targetRoom) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_targetRoom instanceof Room)) {
        if (typeof _targetRoom == "string" && roomsIndexes.has(_targetRoom))
            _targetRoom = roomsIndexes.has(_targetRoom) ? roomsIndexes.get(_targetRoom) : undefined;
        else if (_targetRoom instanceof Character) {
            _targetRoom = _targetRoom.room instanceof Room ? _targetRoom.room : undefined;
        }
        else if (charactersIndexes.has(_targetRoom)) {
            var _character = charactersIndexes.get(_targetRoom);
            _targetRoom = _character.room instanceof Room ? _character.room : undefined;
        }
        else
            _targetRoom = undefined;
    }
    
    if (typeof _character == 'undefined' || typeof _character.room == 'undefined' || typeof _targetRoom == 'undefined')
        return undefined;
    
    return characterMovements.set(_character, _findPathToRoom(_character.room, _targetRoom));
}
/**
 * Moves Character in a path from their current Room to the target Room at the specific Cron time.
 * @param {String} _id Unique ID
 * @param {Character} _character
 * @param {Room} _targetRoom
 * @param {Cron} _cron
 * @param {Boolean} _runOnce
 */
function setCharacterScheduleEvent(_id = undefined, _character, _targetRoom, _cron, _runOnce = true) {
    if (_id == undefined)
        _id = "{0}{1}CharacterSchedule{2}Event".format(_character.id, _targetRoom.id.capitalize(), eventsIndexes.size);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    if (!(_targetRoom instanceof Room))
        _targetRoom = roomsIndexes.get(_targetRoom);
    if (!(_cron instanceof Cron))
        return undefined;
    if (typeof _runOnce != "boolean")
        _runOnce = true;
    
    if (!(_character instanceof Character) || !(_targetRoom instanceof Room))
        return undefined;
    
    return new GameEvent(
        _id,        // _id
        undefined,  // _action
        undefined,  // _characterA
        undefined,  // _characterB
        undefined,  // _item
        undefined,  // _location
        undefined,  // _cell
        undefined,  // _room
        _cron,      // _cron
        "setCharacterPath({0}, {1})".format(_character.id, _targetRoom.id), // _nextFunction
        _runOnce    // _runOnce
    );
}
/**
 * Event triggered when Character(1) meets Character(2) {somewhere} with Item
 * @param {String} _id Unique ID
 * @param {Character} _characterA Primary Character
 * @param {Character} _characterB Secondary Character
 * @param {Location, Cell, Room} _place      Location, Cell, or Room
 * @param {Item} _item       Optional Item
 * @param {Function} _function Function to run
 * @param {Boolean} _runOnce Run once
 */
function setCharacterMeetingPlaceEvent(_id = undefined, _characterA, _characterB, _place, _item, _function = undefined, _runOnce = true) {
    if (_id == undefined)
        _id = "{0}{1}{2}{3}CharacterMeetingRoomEvent".format(_characterA.id, _characterB.id.capitalize(), _room.id.capitalize(), _item.id.capitalize());
    if (!(_characterA instanceof Character))
        _characterA = charactersIndexes.has(_characterA) ? charactersIndexes.get(_characterA) : undefined;
    if (!(_characterB instanceof Character))
        _characterB = charactersIndexes.has(_characterB) ? charactersIndexes.get(_characterB) : undefined;
    if (!(_item instanceof Item))
        _item = itemsIndexes.has(_item) ? itemsIndexes.get(_item) : undefined;
    if (typeof _runOnce != "boolean")
        _runOnce = true;

    if (_characterA == undefined || _characterB == undefined || _function == undefined)
        return undefined;

    if (_room instanceof Room)
        return setCharacterMeetinRoomEvent(_id, _characterA, _characterB, _place, _item, _function, _runOnce);
    else if (roomsIndexes.has(_place))
        return setCharacterMeetinRoomEvent(_id, _characterA, _characterB, roomsIndexes.get(_place), _item, _function, _runOnce);
    else if (_place instanceof Cell)
        return setCharacterMeetinCellEvent(_id, _characterA, _characterB, _place, _item, _function, _runOnce);
    else if (cellsIndexes.has(_place))
        return setCharacterMeetinCellEvent(_id, _characterA, _characterB, cellsIndexes.get(_place), _item, _function, _runOnce);
    else if (_place instanceof Location)
        return setCharacterMeetinLocationEvent(_id, _characterA, _characterB, _place, _item, _function, _runOnce);
    else if (locationsIndexes.has(_place))
        return setCharacterMeetinLocationEvent(_id, _characterA, _characterB, locationsIndexes.get(_place), _item, _function, _runOnce);
    else
        return undefined;
}
/**
 * Event triggered when Character(1) meets Character(2) in Room with Item
 * @param {String} _id Unique ID
 * @param {Character} _characterA Primary Character
 * @param {Character} _characterB Secondary Character
 * @param {Room} _room      Room
 * @param {Item} _item       Optional Item
 * @param {Function} _function Function to run
 * @param {Boolean} _runOnce Run once
 */
function setCharacterMeetingRoomEvent(_id = undefined, _characterA, _characterB, _room, _item, _function, _runOnce = true) {
    if (_id == undefined)
        _id = "{0}{1}{2}{3}CharacterMeetingRoomEvent".format(_characterA.id, _characterB.id.capitalize(), _room.id.capitalize(), _item.id.capitalize());
    if (!(_characterA instanceof Character))
        _characterA = charactersIndexes.has(_characterA) ? charactersIndexes.get(_characterA) : undefined;
    if (!(_characterB instanceof Character))
        _characterB = charactersIndexes.has(_characterB) ? charactersIndexes.get(_characterB) : undefined;
    if (!(_item instanceof Item))
        _item = itemsIndexes.has(_item) ? itemsIndexes.get(_item) : undefined;
    if (!(_room instanceof Room))
        _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;
    if (typeof _runOnce != "boolean")
        _runOnce = true;

    if (_characterA == undefined || _characterB == undefined || _room == undefined || _function == undefined)
        return undefined;

    return new GameEvent(
        _id,
        undefined,
        _characterA,
        _characterB,
        _item,
        undefined,
        undefined,
        _room,
        undefined,
        _function,
        _runOnce
    );
}
/**
 * Event triggered when Character(1) meets Character(2) in Cell with Item
 * @param {String} _id Unique ID
 * @param {Character} _characterA Primary Character
 * @param {Character} _characterB Secondary Character
 * @param {Cell} _cell      Cell
 * @param {Item} _item       Optional Item
 * @param {Function} _function Function to run
 * @param {Boolean} _runOnce Run once
 */
function setCharacterMeetingCellEvent(_id = undefined, _characterA, _characterB, _cell, _item, _function, _runOnce = true) {
    if (_id == undefined)
        _id = "{0}{1}{2}{3}CharacterMeetingCellEvent".format(_characterA.id, _characterB.id.capitalize(), _room.id.capitalize(), _item.id.capitalize());
    if (!(_characterA instanceof Character))
        _characterA = charactersIndexes.has(_characterA) ? charactersIndexes.get(_characterA) : undefined;
    if (!(_characterB instanceof Character))
        _characterB = charactersIndexes.has(_characterB) ? charactersIndexes.get(_characterB) : undefined;
    if (!(_item instanceof Item))
        _item = itemsIndexes.has(_item) ? itemsIndexes.get(_item) : undefined;
    if (!(_cell instanceof Cell))
        _cell = cellsIndexes.has(_cell) ? cellsIndexes.get(_cell) : undefined;
    if (typeof _runOnce != "boolean")
        _runOnce = true;

    if (_characterA == undefined || _characterB == undefined || _cell == undefined || _function == undefined)
        return undefined;

    return new GameEvent(
        _id,
        undefined,
        _characterA,
        _characterB,
        _item,
        undefined,
        _cell,
        undefined,
        undefined,
        _function,
        _runOnce
    );
}
/**
 * Event triggered when Character(1) meets Character(2) at Cell with Item
 * @param {String} _id Unique ID
 * @param {Character} _characterA Primary Character
 * @param {Character} _characterB Secondary Character
 * @param {Location} _location      Location
 * @param {Item} _item       Optional Item
 * @param {Function} _function Function to run
 * @param {Boolean} _runOnce Run once
 */
function setCharacterMeetingLocationEvent(_id = undefined, _characterA, _characterB, _location, _item, _function, _runOnce = true) {
    if (_id == undefined)
        _id = "{0}{1}{2}{3}CharacterMeetingLocationEvent".format(_characterA.id, _characterB.id.capitalize(), _room.id.capitalize(), _item.id.capitalize());
    if (!(_characterA instanceof Character))
        _characterA = charactersIndexes.has(_characterA) ? charactersIndexes.get(_characterA) : undefined;
    if (!(_characterB instanceof Character))
        _characterB = charactersIndexes.has(_characterB) ? charactersIndexes.get(_characterB) : undefined;
    if (!(_item instanceof Item))
        _item = itemsIndexes.has(_item) ? itemsIndexes.get(_item) : undefined;
    if (!(_location instanceof Location))
        _location = locationsIndexes.has(_location) ? locationsIndexes.get(_location) : undefined;
    if (typeof _runOnce != "boolean")
        _runOnce = true;

    if (_characterA == undefined || _characterB == undefined || _location == undefined || _function == undefined)
        return undefined;

    return new GameEvent(
        _id,
        undefined,
        _characterA,
        _characterB,
        _item,
        _location,
        undefined,
        undefined,
        undefined,
        _function,
        _runOnce
    );
}
/**
 * Triggers Function at the specific Cron time
 * @param {String} _id Unique ID
 * @param {String} _nextFunction
 * @param {Cron} _cron
 * @param {Boolean} _runOnce
 */
function setTimedFunctionEvent(_id = undefined, _nextFunction, _cron, _runOnce = true) {
    if (_id == undefined)
        _id = "miscTimeFunction{0}Event".format(eventsIndexes.size);
    if (!(_cron instanceof Cron))
        return undefined;
    if (typeof _runOnce != "boolean")
        _runOnce = true;
    
    return new GameEvent(_id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _cron, _nextFunction, _runOnce);
}
/**
 * Makes the Character Sit on Furniture or the ground.
 * @param {Character} _character
 * @param {Furniture} _furniture Can be undefined
 * @return {Boolean} Whether or not the Character is seated on Furniture, or undefined
 */
function characterSit(_character, _furniture = undefined) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (typeof _character == 'undefined')
        return undefined;
    
    if (_character.furniture instanceof Furniture && _character.furniture != _furniture)
        _furniture.removeCharacter(_character);
    
    _character.sit(_furniture);
    
    if (_furniture instanceof Furniture && _furniture.availableSeatingSpace() >= _character.bodySize)
        _furniture.addCharacter(_character);
    
    return _character.furniture instanceof Furniture;
}
/**
 * Makes the Character Lay on Furniture or the ground.
 * @param {Character} _character
 * @param {Furniture} _furniture Can be undefined
 * @return {Boolean} Whether or not the Character is lying on Furniture, or undefined
 */
function characterLay(_character, _furniture = undefined) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (typeof _character == 'undefined')
        return undefined;
    
    if (_character.furniture instanceof Furniture && _character.furniture != _furniture)
        _furniture.removeCharacter(_character);
    
    _character.lay(_furniture);
    
    if (_furniture instanceof Furniture && _furniture.availableSeatingSpace() >= _character.bodySize * 2)
        _furniture.addCharacter(_character);
    
    return _character.furniture instanceof Furniture;
}
/**
 * Makes the Character Sleep on Furniture or the ground; they may sit or lay while sleeping.
 * @param {Character} _character
 * @param {Furniture} _furniture Can be undefined
 * @return {Boolean} Whether or not the Character is sleeping on Furniture, or undefined
 */
function characterSleep(_character, _furniture = undefined) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (typeof _character == 'undefined')
        return undefined;
    
    if (_character.furniture instanceof Furniture && _character.furniture != _furniture)
        _furniture.removeCharacter(_character);
    
    _character.sleep(_furniture);
    
    if (_furniture instanceof Furniture) {
        if (_furniture.availableSeatingSpace() >= _character.bodySize * 2) {
            _character.lay(_furniture);
            _character.sleep(_furniture);
            
            _furniture.addCharacter(_character);
        }
        else if (_furniture.availableSeatingSpace() >= _character.bodySize) {
            _character.sit(_furniture);
            _character.sleep(_furniture);
            
            _furniture.addCharacter(_character);
        }
    }
    
    return _character.furniture instanceof Furniture;
}
/**
 * Makes the Character Stand.
 * @param {Character} _character
 * @return {Boolean}, or undefined
 */
function characterStand(_character) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (typeof _character == 'undefined')
        return undefined;
    
    if (_character.furniture instanceof Furniture) {
        _character.furniture.removeCharacter(_character);
        _character.furniture = undefined;
    }
    
    _character.stand();
    
    return true;
}
/**
 * Makes the Character Walk.
 * @param {Character} _character
 * @return {Boolean}, or undefined
 */
function characterWalk(_character) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (typeof _character == 'undefined')
        return undefined;
    
    if (_character.furniture instanceof Furniture) {
        _character.furniture.removeCharacter(_character);
        _character.furniture = undefined;
    }
    
    _character.walk();
    
    return true;
}
/**
 * Makes the second Character Follow the first Character.
 * @param {Character} _characterA The leader.
 * @param {Character} _characterB The follower.
 * @return {Boolean}, or undefined
 */
function characterFollow(_characterA, _characterB, _preGeneratedPath = undefined) {
    if (!(_characterA instanceof Character))
        _characterA = charactersIndexes.has(_characterA) ? charactersIndexes.get(_characterA) : undefined;
    
    if (!(_characterB instanceof Character))
        _characterB = charactersIndexes.has(_characterB) ? charactersIndexes.get(_characterB) : undefined;
    
    if (typeof _characterA == 'undefined' || typeof _characterB == 'undefined')
        return undefined;
    
    if (_characterA == _characterB)
        return;
    
    if (characterMovements.has(_characterA))
        characterWalk(_characterB);
    else
        characterStand(_characterB);
    
    if (_characterA.following == _characterB) {
        _characterA.following = undefined;
        _characterB.removeFollower(_characterA);
    }
    
    _characterB.follow(_characterA);
    _characterA.addFollower(_characterB);
    
    if (typeof _preGeneratedPath == 'undefined')
        _preGeneratedPath = _findPathToRoom(_characterB.room, _characterA.room);
    characterMovements.set(_characterB, _preGeneratedPath);
    
    if (_characterB.hasFollowers) {
        _characterB.followers.forEach(function(_follower) {
            if (_follower instanceof Character)
                characterFollow(_characterA, _follower, _preGeneratedPath);
        }, this);
        _characterB.followers.clear();
    }
    
    return true;
}
/**
 * Makes the Character Stay, stopping them from following another Character.
 * @param {Character} _character
 * @return {Boolean}, or undefined
 */
function characterStay(_character) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (typeof _character == 'undefined')
        return undefined;
    
    if (_character.following instanceof Character)
        _character.following.removeFollower(_character);
    
    _character.clearFollowing();
    
    return true;
}
/**
 * Makes the Character have Sex with another Character on Furniture or the ground; can be done while Sitting, Laying, Sleeping, or Standing.
 * @param {Character} _characterA
 * @param {Character} _characterB
 * @param {Furniture} _furniture Can be undefined; If undefiend or incorrect, the Characters' Furniture will be used, with the second Character's furniture taking precedence.
 * @param {Number or String} _action Can be undefined; defaults to "lay"
 * @return {Boolean} Whether or not sex happens, or undefined
 */
function characterSex(_characterA, _characterB = undefined, _furniture = undefined, _action = "lay") {
    if (!(_characterA instanceof Character))
        _characterA = charactersIndexes.has(_characterA) ? charactersIndexes.get(_characterA) : undefined;
    
    if (typeof _characterA == 'undefined')
        return undefined;
    
    if (!(_characterB instanceof Character))
        _characterB = charactersIndexes.has(_characterB) ? charactersIndexes.get(_characterB) : undefined;
    
    if (typeof _characterB == 'undefined')
        return undefined;
    
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.has(_furniture) ? furnitureIndexes.get(_furniture) : undefined;
    
    if (typeof _action != "undefined")
        _action = kActionTypes.has(_action) ? _action : "lay";
    
    if (_characterA.furniture instanceof Furniture) {
        if (_characterA.furniture != _furniture && _furniture instanceof Furniture)
            _characterA.furniture.removeCharacter(_characterA);
        else if (!(_furniture instanceof Furniture))
            _furniture = _characterA.furniture;
    }
    
    if (_characterB.furniture instanceof Furniture) {
        if (_characterB.furniture != _furniture && _furniture instanceof Furniture)
            _characterB.furniture.removeCharacter(_characterB);
        else if (!(_furniture instanceof Furniture))
            _furniture = _characterB.furniture;
    }
    
    if (_furniture instanceof Furniture) {
        var _largestCharacter = (_characterA.bodySize > _characterB.bodySize ? _characterA.bodySize : _characterB.bodySize);
        
        if (_furniture.seatingSpace >= _largestCharacter * 2 && _action == "lay") {
            _furniture.addCharacter(_characterA);
            _furniture.addCharacter(_characterB);
            _characterA.lay(_furniture);
            _characterB.lay(_furniture);
        }
        else if (_furniture.availableSeatingSpace() >= _largestCharacter && _action == "sit") {
            _furniture.addCharacter(_characterA);
            _furniture.addCharacter(_characterB);
            _characterA.sit(_furniture);
            _characterB.sit(_furniture);
        }
        else {
            _characterA.stand();
            _characterB.stand();
            
            _furniture = undefined;
        }
    }
    
    return _characterA.fuck(_characterB, _furniture);
}
/**
 * Makes the Character masturbate on Furniture (not literally on it) or the ground; can be done while Sitting, Laying, Sleeping, or Standing.
 * @param {Character} _character
 * @param {Furniture} _furniture Can be undefined; If undefiend or incorrect, the Characters' Furniture will be used.
 * @param {Number or String} _action Can be undefined; defaults to "lay"
 * @return {Boolean} Whether or not masturbation happens, or undefined
 */
function characterMasturbate(_character, _furniture = undefined, _action = "lay") {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (typeof _character == 'undefined')
        return undefined;
    
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.has(_furniture) ? furnitureIndexes.get(_furniture) : undefined;
    
    if (typeof _action != "undefined")
        _action = kActionTypes.has(_action) ? _action : "lay";
    
    if (_character.furniture instanceof Furniture) {
        if (_character.furniture != _furniture && _furniture instanceof Furniture)
            _character.furniture.removeCharacter(_character);
        else if (!(_furniture instanceof Furniture))
            _furniture = _character.furniture;
    }
    
    if (_furniture instanceof Furniture && _furniture != _character.furniture) {
        if (_furniture.seatingSpace >= _character.bodySize * 2 && _action == "lay") {
            _furniture.addCharacter(_character);
            _character.lay(_furniture);
        }
        else if (_furniture.availableSeatingSpace() >= _character.bodySize && _action == "sit") {
            _furniture.addCharacter(_character);
            _character.sit(_furniture);
        }
        else {
            _character.lay();
            
            _furniture = undefined;
        }
    }
    
    return _character.masturbate(_furniture);
}
function characterDisrobeItem(_character, _item, _executeScene = false) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    if (!(_item instanceof Item)){
        if (itemsIndexes.has(_item))
            _item = itemsIndexes.get(_item);
        else
            return undefined;
    }

    _character.disrobe(_item);
    if (_executeScene == true)
        return unsafeExec("{0}Disrobe({1})".format(_item.id, _character.id));
    else
        return true;
}
function characterGiveItem(_characterA, _characterB, _item, _executeScene = false) {
    if (!(_characterA instanceof Character)){
        if (charactersIndexes.has(_characterA))
            _characterA = charactersIndexes.get(_characterA);
        else
            return undefined;
    }
    if (!(_characterB instanceof Character)){
        if (charactersIndexes.has(_characterB))
            _characterB = charactersIndexes.get(_characterB);
        else
            return undefined;
    }
    if (!(_item instanceof Item)){
        if (itemsIndexes.has(_item))
            _item = itemsIndexes.get(_item);
        else
            return undefined;
    }

    _characterA.give(_characterB, _item);
    if (_executeScene == true)
        return unsafeExec("{0}Give({1}, {2})".format(_item.id, _characterA.id, _characterB.id))
    else
        return true;
}
function characterHoldItem(_character, _item, _hand = undefined, _executeScene = false) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    if (!(_item instanceof Item)){
        if (itemsIndexes.has(_item))
            _item = itemsIndexes.get(_item);
        else
            return undefined;
    }

    _character.addHeldItem(_item, _hand);
    if (_executeScene == true)
        return unsafeExec("{0}Hold({1})".format(_item.id, _character.id))
    else
        return true;
}
function characterReleaseItem(_character, _item, _hand = undefined, _executeScene = false) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    if (!(_item instanceof Item)){
        if (itemsIndexes.has(_item))
            _item = itemsIndexes.get(_item);
        else
            return undefined;
    }

    _character.removeHeldItem(_item, _hand);
    if (_executeScene == true)
        return unsafeExec("{0}Release({1})".format(_item.id, _character.id));
    else
        return true;
}
function characterAddItem(_character, _item, _executeScene = false) {
    return characterTakeItem(_character, _item, _executeScene);
}
function characterTakeItem(_character, _item, _executeScene = false) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    if (!(_item instanceof Item)){
        if (itemsIndexes.has(_item))
            _item = itemsIndexes.get(_item);
        else
            return undefined;
    }

    _character.addItem(_item);
    if (_executeScene == true)
        return unsafeExec("{0}Take({1})".format(_item.id, _character.id));
    else
        return true;
}

function characterSetLife(_character, int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.setLife(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.life;
}
function characterDecLife(_character, _int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.decLife(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.life;
}
function characterIncLife(_character, _int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.incLife(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.life;
}
function characterSetLifeMax(_character, int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.setLifeMax(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.lifeMax;
}
function characterDecLifeMax(_character, _int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.decLifeMax(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.lifeMax;
}
function characterIncLifeMax(_character, _int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.incLifeMax(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.lifeMax;
}
function characterSetStamina(_character, int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.setStamina(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.stamina;
}
function characterDecStamina(_character, _int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.decStamina(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.stamina;
}
function characterIncStamina(_character, _int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.incStamina(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.stamina;
}
function characterSetStaminaMax(_character, int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.setStaminaMax(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.staminaMax;
}
function characterDecStaminaMax(_character, _int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.decStaminaMax(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.staminaMax;
}
function characterIncStaminaMax(_character, _int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.incStaminaMax(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.staminaMax;
}
function characterSetMana(_character, int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.setMana(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.mana;
}
function characterIncMana(_character, _int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.incMana(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.mana;
}
function characterDecMana(_character, _int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.decMana(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.mana;
}
function characterSetManaMax(_character, int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.setManaMax(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.manaMax;
}
function characterIncManaMax(_character, _int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.incManaMax(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.manaMax;
}
function characterDecManaMax(_character, _int) {
    if (!(_character instanceof Character)){
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    _character.decManaMax(_int);
    if (_character == player) updatePlayerInfoDisplay();
    return _character.manaMax;
}
function setLife(_int) {return characterSetLife(player, _int);}
function incLife(_int) {return characterIncLife(player, _int);}
function decLife(_int) {return characterDecLife(player, _int);}
function setLifeMax(_int) {return characterSetLifeMax(player, _int);}
function incLifeMax(_int) {return characterIncLifeMax(player, _int);}
function decLifeMax(_int) {return characterDecLifeMax(player, _int);}
function setStamina(_int) {return characterSetStamina(player, _int);}
function incStamina(_int) {return characterIncStamina(player, _int);}
function decStamina(_int) {return characterDecStamina(player, _int);}
function setStaminaMax(_int) {return characterSetStaminaMax(player, _int);}
function incStaminaMax(_int) {return characterIncStaminaMax(player, _int);}
function decStaminaMax(_int) {return characterDecStaminaMax(player, _int);}
function setMana(_int) {return characterSetMana(player, _int);}
function incMana(_int) {return characterIncMana(player, _int);}
function decMana(_int) {return characterDecMana(player, _int);}
function setManaMax(_int) {return characterSetManaMax(player, _int);}
function incManaMax(_int) {return characterIncManaMax(player, _int);}
function decManaMax(_int) {return characterDecManaMax(player, _int);}


/**
 * Returns to (runs again) the last-used menu.
 */
function runLastMenu() {
    fn = new Function(lastMenu);
    try {return fn();}catch (err) {}
}

/**
 * Hides all Bootstrap Modals
 */
function hideModals() {
    $("#webModal").modal("hide");
    $("#optionsModal").modal("hide");
    $("#helpModal").modal("hide");
    $("#aboutModal").modal("hide");
    $("#personalInventoryModal").modal("hide");
    $("#dualInventoryModal").modal("hide");
}
function characterTakeOver(_characterA, _characterB) {
    _characterA.clearFollowing();
    _characterB.clearFollowing();
    _characterA.clearFollowers();
    _characterB.clearFollowers();
    characterStand(_characterA);
    characterStand(_characterB);
    
    var arr = new Map();
    
    arr.set('items', _characterA.items.concat(_characterB.items));
    
    arr.set('id', _characterA.id);

    arr.set('hasPhone', _characterA.hasPhone);
    arr.set('phone', _characterA.phone);

    arr.set('defaultDisposition', _characterA.defaultDisposition);
    arr.set('agape', _characterA.agape);
    arr.set('philautia', _characterA.philautia);
    arr.set('mana', _characterB.mana);
    arr.set('manaMax', _characterA.manaMax + _characterB.manaMax);
    arr.set('sanity', _characterA.sanity);
    arr.set('money', _characterA.money + _characterB.money);

    arr.set('virgin', _characterA.virgin);
    arr.set('hadSexWithMale', _characterA.hadSexWithMale);
    arr.set('hadSexWithFemale', _characterA.hadSexWithFemale);

    arr.set('sexCount', _characterA.sexCount);
    arr.set('characterSexCount', _characterA.characterSexCount);
    arr.set('characterSexRefusalCount', _characterA.characterSexRefusalCount);

    arr.set('characterDisposition', _characterA.characterDisposition);

    arr.set('prefersSpecies', _characterA.prefersSpecies);
    arr.set('avoidsSpecies', _characterA.avoidsSpecies);

    arr.set('sexualOrientation', _characterA.sexualOrientation);

    arr.set('preferredPenisSize', _characterA.preferredPenisSize);
    arr.set('preferredPenisGirth', _characterA.preferredPenisGirth);
    arr.set('preferredBreastSize', _characterA.preferredBreastSize);

    arr.set('prefersPredators', _characterA.prefersPredators);
    arr.set('avoidsPredators', _characterA.avoidsPredators);
    arr.set('prefersPrey', _characterA.prefersPrey);
    arr.set('avoidsPrey', _characterA.avoidsPrey);

    arr.set('exhibitionism', _characterA.exhibitionism);
    arr.set('somnophilia', _characterA.somnophilia);
    arr.set('intoxicated', _characterA.intoxicated);
    arr.set('incestual', _characterA.incestual);

    arr.set('room', _characterA.room);
    arr.set('cell', _characterA.cell);
    arr.set('location', _characterA.location);

    for (var key in _characterB) {
        if (typeof key != "object")
            _characterA[key] = _characterB[key];
    }
    
    arr.forEach(function(_value, _key) {
        _characterA[_key] = _value;
    }, this);
    
    _characterA.name = '<i>{0}</i>'.format(_characterB.name);
    _characterA.items = arr.get('items');
    
    charactersIndexes.forEach(function(_character) {
        if (_character != player && _character != _characterA && _character != _characterB) {
            _character.characterDisposition.set(_characterA, _character.characterDisposition.get(_characterB));
        }
    }, this);
}

/**
 * Lock access to the second Room from the first Room.
 * @param {Room} _roomA
 * @param {Room} _roomB
 * @return {Boolean} Whether or not the Room was locked, or undefined
 */
function _lockRoom(_roomA, _roomB) {
    if (!(_roomA instanceof Room))
        _roomA = roomsIndexes.has(_roomA) ? roomsIndexes.get(_roomA) : undefined;
    if (!(_roomB instanceof Room))
        _roomB = roomsIndexes.has(_roomB) ? roomsIndexes.get(_roomB) : undefined;

    if (!(_roomA instanceof Room) || !(_roomB instanceof Room))
        return undefined;

    if (!_roomA.attachedRooms.flip().has(_roomB))
        return undefined;
    else
        _roomB.lock(_roomA);

    Minimap.generateMapFromStartRoom(player.room);
}
/**
 * Unlock access to the Room(2) from Room(1).
 * @param {Room} _roomA
 * @param {Room} _roomB
 * @return {Boolean} Whether or not the Room was unlocked, or undefined
 */
function _unlockRoom(_roomA, _roomB) {
    if (!(_roomA instanceof Room))
        _roomA = roomsIndexes.has(_roomA) ? roomsIndexes.get(_roomA) : undefined;
    if (!(_roomB instanceof Room))
        _roomB = roomsIndexes.has(_roomB) ? roomsIndexes.get(_roomB) : undefined;

    if (!(_roomA instanceof Room) || !(_roomB instanceof Room))
        return undefined;

    if (!_roomA.attachedRooms.flip().has(_roomB))
        return undefined;
    else
        _roomB.unlock(_roomA);

    if (player.room.cell == _roomB.cell && enableMinimap)
        Minimap.generateMapFromStartRoom(player.room);
}
/**
 * Locks access to the Room from its attached hallway, or the if it is only attached to one other Room, that Room.
 * @param {Room} _room
 * @return {Boolean} Whether or not the Room was locked, or undefined
 */
function roomLockFromInside(_room) {
    if (!(_room instanceof Room))
        _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;
    
    if (typeof _room == "undefined")
        return undefined;
    
    var _wasLocked = false;
    if (_room.attachedRooms.size > 1) {
        _room.attachedRooms.forEach(function(__room) {
            if (__room.type == "hallway") {
                _wasLocked = true;
                _lockRoom(__room, _room);
            }
        }, this);
    }
    else if (_room.attachedRooms.size == 1) {
        var __room = Array.from(_room.attachedRooms.values())[0];
        if (__room.type != "hallway") {
            _wasLocked = true;
            _lockRoom(__room, _room);
        }
    }
    
    return _wasLocked;
}
/**
 * Unlocks access to the Room from its attached hallway, or the if it is only attached to one other Room, that Room.
 * @param {Room} _room
 * @return {Boolean} Whether or not the Room was unlocked, or undefined
 */
function roomUnlockFromInside(_room) {
    if (!(_room instanceof Room))
        _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;
    
    if (typeof _room == "undefined")
        return undefined;
    
    var _wasUnlocked = false;
    if (_room.attachedRooms.size > 1) {
        _room.attachedRooms.forEach(function(__room) {
            if (__room.type == "hallway") {
                _wasUnlocked = true;
                _unlockRoom(__room, _room);
            }
        }, this);
    }
    else if (_room.attachedRooms.size == 1) {
        var __room = Array.from(_room.attachedRooms.values())[0];
        if (__room.type != "hallway") {
            _wasUnlocked = true;
            _unlockRoom(__room, _room);
        }
    }
    
    return _wasUnlocked;
}
/**
 * Locks access to the Room from the Character's Room, if the Character has the key to the Room.
 * @param {Room} _room
 * @param {Character} _character
 * @return {Boolean} Whether or not the Room was locked, or undefined
 */
function roomLockFromOutside(_room, _character = player) {
    if (!(_room instanceof Room))
        _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (typeof _room == "undefined" || typeof _character == "undefined")
        return undefined;
    
    if (!_character.hasKey(_room))
        return false;

    return _lockRoom(_character.room, _room);
}
/**
 * Unlocks access to the Room from the Character's Room, if the Character has the key to the Room.
 * @param {Room} _room
 * @param {Character} _character
 * @return {Boolean} Whether or not the Room was unlocked, or undefined
 */
function roomUnlockFromOutside(_room, _character = player) {
    if (!(_room instanceof Room))
        _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (typeof _room == "undefined" || typeof _character == "undefined")
        return undefined;
    
    if (!_character.hasKey(_room))
        return false;

    return _unlockRoom(_character.room, _room);
}

/**
 * Adds all Item(s) to the specified Character
 * @param {Character} _character Character to add all Item(s) to, defaults to Player
 * @param {Boolean} _execEvents Whether or not to execute Item-specified GameEvent(s), defaults to True
 * @return {Boolean}
 */
function addAllItems(_character = player, _execEvents = true) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }
    if (!(typeof _execEvents == 'boolean'))
        _execEvents = true;

    itemsIndexes.forEach(function(_item) {
        if (_execEvents)
            entityGiveItem(_item, undefined, _character, false);
        else
            _character.addItem(_item);
    }, this);

    return true;
}
/**
 * Adds all known Locations(s) to the specified Character
 * @param {Character} _character Character to add all known Location(s) to, defaults to Player
 * @return {Boolean}
 */
function addAllLocations(_character = player) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }

    locationsIndexes.forEach(function(_location) {
        _character.addKnownLocation(_location);
    }, this);

    return true;
}
/**
 * Adds all known Spell(s) to the specified Character
 * @param {Character} _character Character to add all known Spell(s) to, defaults to Player
 * @return {Boolean}
 */
function addAllSpells(_character = player, _execEvents = true) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }

    spellsIndexes.forEach(function(_spell) {
        _character.addKnownSpell(_spell);
    }, this);

    return true;
}

/**
 * Chance for Character(2) to have sex with Character(1)
 * @param {Character} _characterA Character requesting
 * @param {Character} _characterB Character respoding to request
 * @return {Number}, or undefined
 */
function calculateChanceToFuck(_characterA, _characterB, _ignoreLustAndRut) {
    if (!(_characterA instanceof Character))
        _characterA = charactersIndexes.has(_characterA) ? charactersIndexes.get(_characterA) : undefined;
    
    if (typeof _characterA == 'undefined')
        return undefined;
    
    if (!(_characterB instanceof Character))
        _characterB = charactersIndexes.has(_characterB) ? charactersIndexes.get(_characterB) : undefined;
    
    if (typeof _characterB == 'undefined')
        return undefined;
    
    return _characterA.calculateChanceToFuck(_characterB, _ignoreLustAndRut);
}

/**
 * Sets the Menu to 15 buttons, and runs the last menu.
 */
function useWideMenu() {
    Menu.useWideMenu = true;
    runLastMenu();
}
/**
 * Sets the Menu to 12 buttons, and runs the last menu.
 */
function useNormalMenu() {
    Menu.useWideMenu = false;
    runLastMenu();
}

function saveGame() {
    var _charArr = new Array();
    var _furnArr = new Array();
    charactersIndexes.forEach(function(_character){_charArr.push(_character.toJSON())}, this);
    var _text = JSON.stringify({"characters":_charArr,"furniture":_furnArr});
    delete _charArr;
    delete _furnArr;

    var _save = document.createElement('a');
    _save.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(_text));
    _save.setAttribute('download', "ps_{0}.json".format(Date.now()));

    _save.style.display = 'none';
    document.body.appendChild(_save);

    _save.click();

    document.body.removeChild(_save);
}
function loadGame(_json) {
    if (typeof _json == "string") {
        try {
            var _json = JSON.parse(_json);
        }
        catch (e) {
            if (debug) console.log("Parameter `_json` could not be parsed to JSON.");
            return undefined;
        }
    }
    
    // Locations, Cells, Rooms
    // Clothing, Keys, ElectronicDevices, Items, Furniture, Characters
    var _charactersJSON = _json["characters"];
    _charactersJSON.forEach(function(_character) {
        window[_character["id"]] = new Character(_character);
    });
    // Initialize all first, then assign properties
    // WebSites, WebPages
    // Cron, GameEvents, 
    
    _unassignedLocationOwner.forEach(function(_arr) {
        if (_arr[0] instanceof Location && charactersIndexes.has(_arr[1]))
            _arr[0].owner.add(charactersIndexes.get(_arr[1]));
    });
    delete _unassignedLocationOwner;
}

window.addEventListener(
    "resize", 
    function() {
        resizeGui();
        
        if (enableMinimap) {
            Minimap.initialize();
            Minimap.generateMapFromStartRoom(player.room);
        }
    },
    false
);

window.addEventListener(
    "keypress",
    function(event) {
        if (document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')
            return;
        var fn = undefined;
        var _placement = undefined;
        switch(event['key']) {
            case "1": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + 0;
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "2": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + 1;
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "3": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + 2;
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "4": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + 3;
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "5": {
                if (Menu.numberOfOptions == 15) {
                    _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + 4;
                    if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                        fn = new Function(Menu.options[_placement][0]);
                }
                break;
            }
            case "q": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 4 : 5);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "w": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 5 : 6);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "e": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 6 : 7);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "r": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 7 : 8);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "t": {
                if (Menu.numberOfOptions == 15) {
                    _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + 9;
                    if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                        fn = new Function(Menu.options[_placement][0]);
                }
                break;
            }
            case "a": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 8 : 10);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "s": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 9 : 11);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "d": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 10 : 12);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "f": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 11 : 13);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "g": {
                if (Menu.numberOfOptions == 15) {
                    _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + 14;
                    if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                        fn = new Function(Menu.options[_placement][0]);
                }
                break;
            }
            case "o": {
                if (agreeTOS)
                    $('#optionsModal').modal('toggle');
                break;
            }
            case "h": {
                $('#helpModal').modal('toggle');
                break;
            }
            case "i": {
                fn = new Function(characterInteractOpen());
                break;
            }
            case "`": {
                if (agreeTOS)
                    fn = new Function(debugMenu());
                break;
            }
        }
        
        if (typeof fn === 'function') {
            hideModals();
            try {fn();}catch (err) {}
        }
    },
    false
)