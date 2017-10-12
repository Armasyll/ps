// Game functions
function resizeGui() {
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

function updateTimeDisplay() {
    for (var _i = 0; _i < document.getElementsByClassName('timeDisplay').length; _i++) {
        document.getElementsByClassName('timeDisplay')[_i].innerHTML = unixTimeToDateString(currentTime);
    }
}

function generateEntityItemsGraphicalList(_fromEntity, _toEntity = undefined, _modify = false) {
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
                (typeof _item.owner != 'undefiend' ? _ownerString : ''),
                _item.description,
                (_modify === true ? (_fromEntity == player ? ("<button onclick='generateEntityItemsGraphicalMove({0},{1},{2})'>Give</button>").format(_item.id, _fromEntity.id, _toEntity.id) : ("<button onclick='generateEntityItemsGraphicalMove({0},{1},{2})'>Take</button>").format(_item.id, _fromEntity.id, _toEntity.id)) : '')
            )
    }, this);
    
    return _body;
}
function generateEntityItemsGraphicalMove(_item = undefined, _fromEntity = undefined, _toEntity = undefined) {
    if (moveItemToEntity(_item, _fromEntity, _toEntity)) {
        var _lazyEntity = _fromEntity;
        if (_lazyEntity == player)
            _lazyEntity = _toEntity;
        $('#dualInventoryContent-characterA').html(generateEntityItemsGraphicalList(player, _lazyEntity, true));
        $('#dualInventoryContent-characterB').html(generateEntityItemsGraphicalList(_lazyEntity, player, true));
    }
}
function generateEntityItemsMenuMove(_item, _fromEntity = undefined, _toEntity = undefined, _useLastMenu = false, _lastPageNumber = 0) {
    if (moveItemToEntity(_item, _fromEntity, _toEntity, _useLastMenu)) {
        characterInteractOpen(_fromEntity, _lastPageNumber, false);
        
        return true;
    }
    else
        return undefined;
}
function moveItemToEntity(_item = undefined, _fromEntity = undefined, _toEntity = undefined, _useLastMenu = false) {
    if (typeof _item == 'undefined' || typeof _fromEntity == 'undefined' || typeof _toEntity == 'undefined')
        return undefined;
    
    if (!(_item instanceof Entity)) {
        if (clothingIndexes.has(_item))
            _item = clothingIndexes.get(_item);
        else if (itemsIndexes.has(_item))
            item = itemsIndexes.get(_item);
        else {
            if (debug) console.log(_item.id + " isn't indexed in Items or Clothing.");
            return undefined;
        }
    }
    else if (!(_item instanceof Item)) {
        if (debug) console.log(_item.id + " is an Entity, but isn't an Item.");
        return undefined;
    }
    
    if (typeof _fromEntity == 'undefined') {}
    else if (!(_fromEntity instanceof Entity)) {
        if (charactersIndexes.has(_fromEntity))
            _fromEntity = charactersIndexes.get(_fromEntity);
        else if (furnitureIndexes.has(_fromEntity))
            _fromEntity = furnitureIndexes.get(_fromEntity);
        else {
            if (debug) console.log(_fromEntity.id + " isn't indexed in Characters or Furniture.");
            return undefined;
        }
    }
    else if (!(_fromEntity instanceof Character) && !(_fromEntity instanceof Furniture)) {
        if (debug) console.log(_fromEntity.id + " is an Entity, but isn't a Character of Furniture.");
        return undefined;
    }
    
    if (!(_toEntity instanceof Entity)) {
        if (charactersIndexes.has(_toEntity))
            _toEntity = charactersIndexes.get(_toEntity);
        else if (furnitureIndexes.has(_toEntity))
            _toEntity = furnitureIndexes.get(_toEntity);
        else {
            if (debug) console.log(_toEntity.id + " isn't indexed in Characters or Furniture.");
            return undefined;
        }
    }
    else if (!(_toEntity instanceof Character) && !(_toEntity instanceof Furniture)) {
        if (debug) console.log(_toEntity.id + " is an Entity, but isn't a Character of Furniture.");
        return undefined;
    }
    
    if (typeof _fromEntity == 'undefined' || _fromEntity.containsItem(_item)) {
        if (typeof _fromEntity != 'undefined') {
            _fromEntity.removeItem(_item);
            if (debug) console.log("Checking for item removal events");
            eventsIndexes.forEach(function(_event) {
                if (typeof _event.cron == 'undefined' && _event.action == "remove" && _event.item == _item && (typeof _event.characterA == 'undefined' || _event.characterB == _fromEntity)) {
                    if (_fromEntity == player || _toEntity == player)
                        hideModals();
                    
                    _event.execute();
                }
            }, this);
        }
        
        if (typeof _fromEntity == 'undefined' || !(_fromEntity.containsItem(_item))) {
            if (debug) console.log("Checking for item given events");
            eventsIndexes.forEach(function(_event) {
                if (typeof _event.cron == 'undefined' && _event.action == "give" && _event.item == _item && (typeof _event.characterA == 'undefined' || _event.characterA == _fromEntity) && (typeof _event.characterB == 'undefined' || _event.characterB == _toEntity)) {
                    if (_fromEntity == player || _toEntity == player)
                        hideModals();
                    
                    _event.execute();
                }
            }, this);
            
            _toEntity.addItem(_item);
            if (debug) console.log("Checking for item taken events");
            eventsIndexes.forEach(function(_event) {
                if (typeof _event.cron == 'undefined' && _event.action == "take" && _event.item == _item && (typeof _event.characterA == 'undefined' || _event.characterA == _toEntity) && (typeof _event.characterB == 'undefined' || _event.characterB == _fromEntity)) {
                    if (_fromEntity == player || _toEntity == player)
                        hideModals();
                    
                    _event.execute();
                }
            }, this);
        }
    }
    else
        return false;
    
    if (_useLastMenu) {
        fn = new Function(lastMenu);
        try {fn();}catch (err) {}
    }
    
    return true;
}

function clearContentAndMenu() {
    Title.clear();
    Content.clear();
    Menu.clear();
}
function initializeMinimap() {
    if (!initializedMinimap) {
        window.addEventListener(
            "resize", 
            function() {
                Minimap.initialize();
                Minimap.generateMapFromStartRoom(player.room);
            },
            false
        );
    }
}
function moveCharacterToRoom(_character = player, _room) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    if (!(_room instanceof Room))
        _room = roomsIndexes.get(_room);
    
    if (debug) console.log("Moving " + _character.id + " from " + _character.room.sid + " to " + _room.sid);
    
    if (_character.room != _room) {
        characterWalk(_character);
        
        if (player == _character)
            tick("1m", false);
        
        _character.moveToRoom(_room);
        
        if (_character.hasFollowers) {
            _character.followers.forEach(function(_follower) {
                if (_follower.room == _character.previousRoom || _follower.room == _character.room)
                    moveCharacterToRoom(_follower, _room);
                else
                    characterMovements.set(_follower, findPathToRoom(_follower.room, _room));
            }, this);
        }
        
        if (debug) console.log("Checking for room events.");
        eventsIndexes.forEach(function(_event) {
            if (
                typeof _event.cron == 'undefined' &&
                _character == _event.characterA &&
                _character.room == _event.room &&
                (typeof _event.item == 'undefined' || _event.characterA.hasItem(_event.item))
            ) {
                _event.execute();
            }
        }, this);
        
        characterStand(_character);
    }
}
function movePlayerToRoom(_room) {
    characterMovements.delete(player);
    moveCharacterToRoom(player, _room);
    if (enableMinimap)
        Minimap.generateMapFromStartRoom(player.room);
}
function moveCharacterInDirection(_character, _direction) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    if (_character instanceof Character) {
        var _room = undefined;
        switch (_direction) {
            case "north" :
            case 0 : {
                if (_character.room.attachedRooms.has(0)) {
                    _room = _character.room.attachedRooms.get(0);
                    if (!_character.room.isLocked(_room) || _character.hasKey(_room))
                        moveCharacterToRoom(_character, _room);
                }
                break;
            }
            case "east" :
            case 1 : {
                if (_character.room.attachedRooms.has(1)) {
                    _room = _character.room.attachedRooms.get(1);
                    if (!_character.room.isLocked(_room) || _character.hasKey(_room))
                        moveCharacterToRoom(_character, _room);
                }
                break;
            }
            case "south" :
            case 2 : {
                if (_character.room.attachedRooms.has(2)) {
                    _room = _character.room.attachedRooms.get(2);
                    if (!_character.room.isLocked(_room) || _character.hasKey(_room))
                        moveCharacterToRoom(_character, _room);
                }
                break;
            }
            case "west" :
            case 3 : {
                if (_character.room.attachedRooms.has(3)) {
                    _room = _character.room.attachedRooms.get(3);
                    if (!_character.room.isLocked(_room) || _character.hasKey(_room))
                        moveCharacterToRoom(_character, _room);
                }
                break;
            }
            case "down" :
            case 4 : {
                if (_character.room.attachedRooms.has(4)) {
                    _room = _character.room.attachedRooms.get(4);
                    if (!_character.room.isLocked(_room) || _character.hasKey(_room))
                        moveCharacterToRoom(_character, _room);
                }
                break;
            }
            case "up" :
            case 5 : {
                if (_character.room.attachedRooms.has(5)) {
                    _room = _character.room.attachedRooms.get(5);
                    if (!_character.room.isLocked(_room) || _character.hasKey(_room))
                        moveCharacterToRoom(_character, _room);
                }
                break;
            }
        }
    }
}

function moveItemToPlayer(_item, _fromEntity) {
    moveItemToEntity(_item, _fromEntity, player, true);
}
function tick(time, _updateMinimap = false, _runLastMenu = true) {
    var _newTime = new Date(currentTime);
    
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
                    _newTime.addDays(number);
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
                                moveCharacterToRoom(_character, _room);
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
                        (typeof _event.cron.year == 'undefined' || (_event.cron.year >= previousTime.getFullYear() && _event.cron.year <= currentTime.getFullYear())) &&
                        (typeof _event.cron.month == 'undefined' || (_event.cron.month >= previousTime.getMonth() + 1 && _event.cron.month <= currentTime.getMonth() + 1)) &&
                        (typeof _event.cron.dom == 'undefined' || (_event.cron.dom >= previousTime.getDate() && _event.cron.dom <= currentTime.getDate())) &&
                        (typeof _event.cron.dow == 'undefined' || (_event.cron.dow >= previousTime.getDay() && _event.cron.dow <= currentTime.getDay())) &&
                        (typeof _event.cron.hours == 'undefined' || (_event.cron.hours >= previousTime.getHours() && _event.cron.hours <= currentTime.getHours())) &&
                        (typeof _event.cron.minutes == 'undefined' || (_event.cron.minutes >= previousTime.getMinutes() && _event.cron.minutes <= currentTime.getMinutes()))
                    )
                ) {
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
    
    eventsExecutedThisTick.clear();
    return currentTime;
}
function findPathFromCellToCell(_startCell, _targetCell, _excludeCells = new Set()) {
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
function findPathFromRoomToRoom(_startRoom, _targetRoom, _excludeRooms = new Set()) {
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
function findPathToRoom(_startRoom, _targetRoom, _excludeRooms = new Set(), _excludeCells = new Set()) {
    if (!(_startRoom instanceof Room))
        _startRoom = roomsIndexes.get(_startRoom);
    
    if (!(_targetRoom instanceof Room))
        _targetRoom = roomsIndexes.get(_targetRoom);
    
    if (!_startRoom instanceof Room || !_targetRoom instanceof Room)
        return;
    
    if (_startRoom.cell != _targetRoom.cell) {
        var _cellPath = findPathFromCellToCell(_startRoom.cell, _targetRoom.cell);
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
            _roomPath = _roomPath.concat(Array.from(findPathFromRoomToRoom(_cRoom, _cTargetRoom)));
        
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
                
                _roomPath = _roomPath.concat(Array.from(findPathFromRoomToRoom(_cRoom, _cTargetRoom)));
                _roomPath = _roomPath.concat(_nRoom);
                _cRoom = _nRoom;
                
                _i++;
            }
            else {
                _roomPath = _roomPath.concat(Array.from(findPathFromRoomToRoom(_cRoom, _targetRoom)));
                _cRoom = _targetRoom;
            }
        }
        
        return new Set(_roomPath);
    }
    else
        return findPathFromRoomToRoom(_startRoom, _targetRoom);
}
function characterSit(_character, _furniture = undefined) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (_character instanceof Character) {
        if (_character.furniture instanceof Furniture && _character.furniture != _furniture)
            _furniture.removeCharacter(_character);
        
        _character.sit(_furniture);
        
        if (_furniture instanceof Furniture && _furniture.availableSeatingSpace() >= SpeciesSizeUnits.get(_character.species))
            _furniture.addCharacter(_character);
    }
}
function characterLay(_character, _furniture = undefined) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (_character instanceof Character) {
        if (_character.furniture instanceof Furniture && _character.furniture != _furniture)
            _furniture.removeCharacter(_character);
        
        _character.lay(_furniture);
        
        if (_furniture instanceof Furniture && _furniture.availableSeatingSpace() >= SpeciesSizeUnits.get(_character.species) * 2)
            _furniture.addCharacter(_character);
    }
}
function characterSleep(_character, _furniture = undefined) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (_character instanceof Character) {
        if (_character.furniture instanceof Furniture && _character.furniture != _furniture)
            _furniture.removeCharacter(_character);
        
        _character.sleep(_furniture);
        
        if (_furniture instanceof Furniture) {
            if (_furniture.availableSeatingSpace() >= SpeciesSizeUnits.get(_character.species) * 2) {
                _character.lay(_furniture);
                _character.sleep(_furniture);
                
                _furniture.addCharacter(_character);
            }
            else if (_furniture.availableSeatingSpace() >= SpeciesSizeUnits.get(_character.species)) {
                _character.sit(_furniture);
                _character.sleep(_furniture);
                
                _furniture.addCharacter(_character);
            }
        }
    }
}
function characterStand(_character) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (_character instanceof Character) {
        if (_character.furniture instanceof Furniture) {
            _character.furniture.removeCharacter(_character);
            _character.furniture = undefined;
        }
        
        _character.stand();
    }
}
function characterWalk(_character) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (_character instanceof Character) {
        if (_character.furniture instanceof Furniture) {
            _character.furniture.removeCharacter(_character);
            _character.furniture = undefined;
        }
        
        _character.walk();
    }
}
function characterFollow(_characterA, _characterB, _preGeneratedPath = undefined) {
    if (!(_characterA instanceof Character))
        _characterA = charactersIndexes.has(_characterA) ? charactersIndexes.get(_characterA) : undefined;
    
    if (!(_characterB instanceof Character))
        _characterB = charactersIndexes.has(_characterB) ? charactersIndexes.get(_characterB) : undefined;
    
    if (_characterA instanceof Character && _characterB instanceof Character) {
        if (_characterA == _characterB)
            return;
        
        characterStand(_characterB);
        
        if (_characterA.following == _characterB) {
            _characterA.following = undefined;
            _characterB.removeFollower(_characterA);
        }
        
        _characterB.follow(_characterA);
        _characterA.addFollower(_characterB);
        
        if (typeof _preGeneratedPath == 'undefined')
            _preGeneratedPath = findPathToRoom(_characterB.room, _characterA.room);
        characterMovements.set(_characterB, _preGeneratedPath);
        
        if (_characterB.hasFollowers) {
            _characterB.followers.forEach(function(_follower) {
                if (_follower instanceof Character)
                    characterFollow(_characterA, _follower, _preGeneratedPath);
            }, this);
            _characterB.followers.clear();
        }
    }
}
function characterStay() {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (_character instanceof Character) {
        if (_character.following instanceof Character)
            _character.following.removeFollower(_character);
        
        _character.clearFollowing();
    }
}

function setCharacterMovementToRoom(_character, _room) {
    characterMovements.set(_character, findPathToRoom(_character.room, _room));
}
function setCharacterMovementToCharacter(_character, _toCharacter) {
    setCharacterMovementToRoom(_character, _toCharacter.room);
}
function runLastMenu() {
    fn = new Function(lastMenu);
    try {return fn();}catch (err) {}
}

function hideModals() {
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
    
    arr.set('id', _characterA.id);
    arr.set('disposition', _characterA.disposition);
    arr.set('defaultDisposition', _characterA.defaultDisposition);
    arr.set('agape', _characterA.agape);
    arr.set('philautia', _characterA.philautia);
    arr.set('furColourAHex', _characterA.furColourAHex);
    arr.set('furColourBHex', _characterA.furColourBHex);
    arr.set('hadSexWith', _characterA.hadSexWith);
    arr.set('hadSex', _characterA.hadSex || _characterB.hadSex);
    arr.set('sexCount', _characterA.sexCount + _characterB.sexCount);
    arr.set('vaginalReceiveCount', _characterA.vaginalReceiveCount + _characterB.vaginalReceiveCount);
    arr.set('vaginalGiveCount', _characterA.vaginalGiveCount + _characterB.vaginalGiveCount);
    arr.set('analReceiveCount', _characterA.analReceiveCount + _characterB.analReceiveCount);
    arr.set('analGiveCount', _characterA.analGiveCount + _characterB.analGiveCount);
    arr.set('cunnilingusReceiveCount', _characterA.cunnilingusReceiveCount + _characterB.cunnilingusReceiveCount);
    arr.set('cunnilingusGiveCount', _characterA.cunnilingusGiveCount + _characterB.cunnilingusGiveCount);
    arr.set('analingusReceiveCount', _characterA.analingusReceiveCount + _characterB.analingusReceiveCount);
    arr.set('analingusGiveCount', _characterA.analingusGiveCount + _characterB.analingusGiveCount);
    arr.set('fellatioReceiveCount', _characterA.fellatioReceiveCount + _characterB.fellatioReceiveCount);
    arr.set('fellatioGiveCount', _characterA.fellatioGiveCount + _characterB.fellatioGiveCount);
    arr.set('masturbateCount', _characterA.masturbateCount + _characterB.masturbateCount);
    arr.set('handjobCount', _characterA.handjobCount + _characterB.handjobCount);
    arr.set('prefersSpecies', _characterA.prefersSpecies);
    arr.set('avoidsSpecies', _characterA.avoidsSpecies);
    arr.set('preferredSex', _characterA.preferredSex);
    arr.set('avoidedSex', _characterA.avoidedSex);
    arr.set('sexualOrientation', _characterA.sexualOrientation);
    arr.set('preferredPenisSize', _characterA.preferredPenisSize);
    arr.set('preferredPenisGirth', _characterA.preferredPenisGirth);
    arr.set('preferredBreastSize', _characterA.preferredBreastSize);
    arr.set('preferredSexCount', _characterA.preferredSexCount);
    arr.set('prefersPredators', _characterA.prefersPredators);
    arr.set('avoidsPredators', _characterA.avoidsPredators);
    arr.set('prefersPrey', _characterA.prefersPrey);
    arr.set('avoidsPrey', _characterA.avoidsPrey);
    arr.set('exhibitionism', _characterA.exhibitionism);
    arr.set('willExhibit', _characterA.willExhibit);
    arr.set('somnophilia', _characterA.somnophilia);
    arr.set('intoxicated', _characterA.intoxicated);
    arr.set('incestual', _characterA.incestual);
    arr.set('room', _characterA.room);
    arr.set('cell', _characterA.cell);
    arr.set('location', _characterA.location);
    arr.set('items', Array.from(_characterA.items).concat(Array.from(_characterB.items)));
    
    for (var key in _characterB) {
        _characterA[key] = _characterB[key];
    }
    
    arr.forEach(function(_value, _key) {
        _characterA[_key] = _value;
    }, this);
    
    _characterA.name = '<i>{0}</i>'.format(_characterB.name);
    _characterA.items = new Set(arr.get('items'));
    
    charactersIndexes.forEach(function(_character) {
        if (_character != player && _character != _characterA && _character != _characterB) {
            _character.disposition.set(_characterA, _character.disposition.get(_characterB));
        }
    }, this);
}

function addAllItems() {
    itemsIndexes.forEach(function(_item) {
        player.addItem(_item);
    }, this);
}

function useWideMenu() {
    numberOfOptions = 15;
    runLastMenu();
}
function useNormalMenu() {
    numberOfOptions = 12;
    runLastMenu();
}

window.addEventListener(
    "resize", 
    function() {
        resizeGui();
    },
    false
);

window.addEventListener(
    "keypress",
    function(event) {
        var fn = undefined;
        var _placement = undefined;
        switch(event['key']) {
            case "1": {
                if (typeof Menu.options[0] !== 'undefined' && typeof Menu.options[0][0] !== 'undefined')
                    fn = new Function(Menu.options[0][0]);
                break;
            }
            case "2": {
                if (typeof Menu.options[1] !== 'undefined' && typeof Menu.options[1][0] !== 'undefined')
                    fn = new Function(Menu.options[1][0]);
                break;
            }
            case "3": {
                if (typeof Menu.options[2] !== 'undefined' && typeof Menu.options[2][0] !== 'undefined')
                    fn = new Function(Menu.options[2][0]);
                break;
            }
            case "4": {
                if (typeof Menu.options[3] !== 'undefined' && typeof Menu.options[3][0] !== 'undefined')
                    fn = new Function(Menu.options[3][0]);
                break;
            }
            case "5": {
                if (numberOfOptions == 15) {
                    if (typeof Menu.options[4] !== 'undefined' && typeof Menu.options[4][0] !== 'undefined')
                        fn = new Function(Menu.options[3][0]);
                }
                break;
            }
            case "q": {
                _placement = (numberOfOptions == 12 ? 4 : 5);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "w": {
                _placement = (numberOfOptions == 12 ? 5 : 6);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "e": {
                _placement = (numberOfOptions == 12 ? 6 : 7);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "r": {
                _placement = (numberOfOptions == 12 ? 7 : 8);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "t": {
                if (numberOfOptions == 15) {
                    if (typeof Menu.options[9] !== 'undefined' && typeof Menu.options[9][0] !== 'undefined')
                        fn = new Function(Menu.options[9][0]);
                }
                break;
            }
            case "a": {
                _placement = (numberOfOptions == 12 ? 8 : 10);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "s": {
                _placement = (numberOfOptions == 12 ? 9 : 11);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "d": {
                _placement = (numberOfOptions == 12 ? 10 : 12);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "f": {
                _placement = (numberOfOptions == 12 ? 11 : 13);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "g": {
                if (numberOfOptions == 15) {
                    if (typeof Menu.options[14] !== 'undefined' && typeof Menu.options[14][0] !== 'undefined')
                        fn = new Function(Menu.options[14][0]);
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
                    fn = debugMenu;
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