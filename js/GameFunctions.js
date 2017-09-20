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
    if (moveItemComplex(_item, _fromEntity, _toEntity)) {
        var _lazyEntity = _fromEntity;
        if (_lazyEntity == player)
            _lazyEntity = _toEntity;
        $('#dualInventoryContent-characterA').html(generateEntityItemsGraphicalList(player, _lazyEntity, true));
        $('#dualInventoryContent-characterB').html(generateEntityItemsGraphicalList(_lazyEntity, player, true));
    }
}
function moveItemComplex(_item = undefined, _fromEntity = undefined, _toEntity = undefined) {
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
    
    if (!(_fromEntity instanceof Entity)) {
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
    
    if (_fromEntity.containsItem(_item))
        return moveItemToEntity(_item, _toEntity, false);
    else
        return false;
}

function clearContentAndMenu() {
    Title.clear();
    Content.clear();
    Menu.clear();
}
function initializeMinimap() {
    if (!_minimapInitialized) {
        window.addEventListener(
            "resize", 
            function() {
                Minimap.initializeMap();
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
        if (player == _character)
            tick("1m", false);
        _character.moveToRoom(_room);
        
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
        //if (enableMinimap)
        //    Minimap.generateMapFromStartRoom(player.room);
    }
}
function movePlayerToRoom(_room) {
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
function moveItemToEntity(_item, _entity, _useLastMenu = false) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    
    if (_entity instanceof Entity) {
        if (_item.container instanceof Entity) {
            if (_item.container instanceof Character) {
                if (_item instanceof Clothing && _item.container.wearing(_item)) {
                    if (_item.container.age < 18)
                        return false;
                    else
                        _item.container.takeOff(_item);
                }
            }
            _item.container.removeItem(_item);
            
            eventsIndexes.forEach(function(_event) {
                if (typeof _event.cron == 'undefined' && _event.action == "remove" && _event.item == _item && (typeof _event.characterA == 'undefined' || _event.characterA == _entity))
                    _event.execute();
            }, this);
        }
        
        _entity.addItem(_item);
        eventsIndexes.forEach(function(_event) {
            if (typeof _event.cron == 'undefined' && _event.action == "take" && _event.item == _item && (typeof _event.characterA == 'undefined' || _event.characterA == _entity))
                _event.execute();
        }, this);
        eventsIndexes.forEach(function(_event) {
            if (typeof _event.cron == 'undefined' && _event.action == "give" && _event.item == _item && (typeof _event.characterA == 'undefined' || _event.characterA == _entity))
                _event.execute();
        }, this);
    }
    
    if (_useLastMenu) {
        fn = new Function(lastMenu);
        try {fn();}catch (err) {}
    }
    return true;
}
function moveItemToPlayer(_item) {
    moveItemToEntity(_item, player, true);
}
function moveItemToCharacter(_item, _character = player, _useLastMenu = true) {
    moveItemToEntity(_item, _character, _useLastMenu);
}
function moveItemToFurniture(_item, _furniture, _useLastMenu = true) {
    moveItemToEntity(_item, _furniture, _useLastMenu);
}
function moveItemToRoom(_item, _room, _useLastMenu = true) {
    moveItemToEntity(_item, _room, _useLastMenu);
}
function tick(time, _updateMinimap = false) {
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
                            var _toRoom = Array.from(_rooms)[0];
                            moveCharacterToRoom(_character, _toRoom);
                            _rooms.delete(_toRoom);
                        }
                        else
                            characterMovements.delete(_character);
                    }, this);
                }
            }
            
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
    return currentTime;
}
function findPathInCell(_startRoom, _targetRoom) {
    if (!(_startRoom instanceof Room))
        _startRoom = roomsIndexes.get(_startRoom);
    
    if (!(_targetRoom instanceof Room))
        _targetRoom = roomsIndexes.get(_targetRoom);
    
    if (!_startRoom instanceof Room || !_targetRoom instanceof Room)
        return;
    
    if (_startRoom.cell != _targetRoom.cell)
        return;
    
    var _openList = new Set();
    var _closedList = new Set();
    var _roomParent = new Map();
    var _timeout = 0;
    
    _openList.add(_startRoom);
    
    while (_openList.size > 0 && _timeout < 511) {
        var _currentRoom = Array.from(_openList)[0];
        
        if (_currentRoom == _targetRoom) {
            var cur = _currentRoom;
            var ret = [];
            while (_roomParent.has(_currentRoom)) {
                ret.push(_currentRoom);
                _currentRoom = _roomParent.get(_currentRoom);
            }
            return ret.reverse();
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
                _roomParent.set(_neighbor, _currentRoom);
            }
        }, this);
        
        _timeout++;
    }
    
    return undefined;
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
        fn = undefined;
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
            case "q": {
                if (typeof Menu.options[4] !== 'undefined' && typeof Menu.options[4][0] !== 'undefined')
                    fn = new Function(Menu.options[4][0]);
                break;
            }
            case "w": {
                if (typeof Menu.options[5] !== 'undefined' && typeof Menu.options[5][0] !== 'undefined')
                    fn = new Function(Menu.options[5][0]);
                break;
            }
            case "e": {
                if (typeof Menu.options[6] !== 'undefined' && typeof Menu.options[6][0] !== 'undefined')
                    fn = new Function(Menu.options[6][0]);
                break;
            }
            case "r": {
                if (typeof Menu.options[7] !== 'undefined' && typeof Menu.options[7][0] !== 'undefined')
                    fn = new Function(Menu.options[7][0]);
                break;
            }
            case "a": {
                if (typeof Menu.options[8] !== 'undefined' && typeof Menu.options[8][0] !== 'undefined')
                    fn = new Function(Menu.options[8][0]);
                break;
            }
            case "s": {
                if (typeof Menu.options[9] !== 'undefined' && typeof Menu.options[9][0] !== 'undefined')
                    fn = new Function(Menu.options[9][0]);
                break;
            }
            case "d": {
                if (typeof Menu.options[10] !== 'undefined' && typeof Menu.options[10][0] !== 'undefined')
                    fn = new Function(Menu.options[10][0]);
                break;
            }
            case "f": {
                if (typeof Menu.options[11] !== 'undefined' && typeof Menu.options[11][0] !== 'undefined')
                    fn = new Function(Menu.options[11][0]);
                break;
            }
            case "o": {
                fn = undefined;
                if (agreeTOS)
                    $('#gameOptionsModal').modal('toggle');
                break;
            }
            case "h": {
                fn = undefined;
                $('#helpModal').modal('toggle');
                break;
            }
            case "i": {
                fn = new Function(characterOpen());
                break;
            }
            case "`": {
                if (agreeTOS)
                    fn = debugMenu;
                break;
            }
        }
        
        if (typeof fn === 'function') {
            try {fn();}catch (err) {}
        }
    },
    false
)