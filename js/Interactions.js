function roomInteract(_room, _showBaseMenu = false, _clearContent = undefined, _showContent = undefined, _checkLocked = true) {
    if (!(_room instanceof Room))
        _room = roomsIndexes.get(_room);
    
    if (player.room.isLocked(_room) && _checkLocked && !player.hasKey(_room)) {
        Content.add("<p>" + _room.name + " is locked from this side.</p>");
    }
    else {
        if (player.room !== _room) {
            if (debug) console.log("Previous Room: " + player.room.id);
            movePlayerToRoom(_room);
            if (debug) console.log("Current Room: " + player.room.id);
        }
        
        Title.set(
            (player.room.isOwner(player) ? "Your "  + (player.room.type !== 'undefined' ? RoomTypeIdNames.get(player.room.type) : "room").capitalize() : player.room.name), 
            undefined, 
            (typeof player.room.location !== 'undefined' ? (player.room.location == player.room.cell.location ? player.room.cell.name : player.room.location.name) : "&nbsp;"), 
            (typeof player.room.cell.location !== 'undefined' ? player.room.cell.location.name : "&nbsp;")
        );
        
        if (typeof _clearContent != "boolean")
            _clearContent = (!(player.previousRoom instanceof Room) || !(player.previousRoom.sid == player.room.sid));
        if (typeof _showContent != "boolean")
            _showContent = (!(player.previousRoom instanceof Room) || !(player.previousRoom.sid == player.room.sid));
        
        if (_showBaseMenu) {
            if (debug) console.log("\tBase Menu and Room for " + _room.sid);
            fn = new Function("{0}Interact({1},{2})".format(_room.sid, _clearContent, _showContent));
            try {fn();}catch (err) {}
            
            baseMenu(0, 1);
        }
        else {
            Menu.isExploring = false;
            
            Menu.clear();
            Menu.setOption((numberOfOptions == 12 ? 11 : 14), "baseMenu(" + (!(player.previousRoom instanceof Room) || !(player.previousRoom.sid == player.room.sid)) + ")", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
            
            if (debug) console.log("\tRoom for " + _room.sid);
            fn = new Function("{0}Interact({1},{2})".format(_room.sid, _clearContent, _showContent));
            try {fn();}catch (err) {}
            
            _room.furniture.forEach(function(_furniture) {
                Menu.addOption("furnitureInteract(" + _furniture.id + ", 0, 1)", "Look at " + _furniture.name, _furniture.description);
            });
            
            Menu.generate();
        }
        
        eventsIndexes.forEach(function(_event) {
            if (typeof _event.cron != 'undefined' || (typeof _event.location == 'undefined' && typeof _event.cell == 'undefined' && typeof _event.room == 'undefined')) {
                return undefined;
            }
            
            if (
                typeof _event.characterA == 'undefined' || 
                (
                    (_event.characterA instanceof Character && _event.characterA == player) &&
                    (typeof _event.item == 'undefined' || _event.characterA.containsItem(_event.item))
                )
            ) {
                if (typeof _event.location == 'undefined' || 
                    (
                        (_event.location instanceof Location && (_event.location == _room.location || _event.location == _room.cell.location)) &&
                        (typeof _event.characterB == 'undefined' || (_event.characterB.room.location == _event.location || _event.characterB.location == _event.location))
                    )
                ) {
                    if (typeof _event.cell == 'undefined' || 
                        (
                            (_event.cell instanceof Cell && _event.cell == _room.cell) && 
                            (typeof _event.characterB == 'undefined' || _event.characterB.room.cell == _event.cell) &&
                            (_event.characterA.previousRoom.cell != _event.characterA.room.cell)
                        )
                    ) {
                        if (typeof _event.room == 'undefined' || 
                            (
                                (_event.room instanceof Room && _event.room == _room) && 
                                (typeof _event.characterB == 'undefined' || _event.characterB.room == _event.room)
                            )
                        ) {
                            _event.execute();
                        }
                    }
                }
            }
        }, this);
    }
}

function characterInteract(_character, _clearContent = true) {
    if (!_character.disposition.has(player))
        _character.addNewCharacterDispositionFor(player);
    if (!player.disposition.has(_character))
        player.addNewCharacterDispositionFor(_character);
     
    Menu.isExploring = false;
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    lastMenu = "characterInteract({0}, false, true)".format(_character.id);
    
    Title.set(
        _character.name, 
        _character.image, 
        (typeof player.room.location !== 'undefined' ? player.room.location.name : "&nbsp;"), 
        (typeof player.room.cell.location !== 'undefined' ? player.room.cell.location.name : "&nbsp;")
    );
    
    if (_clearContent) {
        Content.clear();
        
        fn = new Function(player.room.sid + _character.id.capitalize() + "()");
        try {fn();}catch (err) {}
    }
    
    Menu.clear();
    
    Menu.setOption(0, "characterInteractTalk({0})".format(_character.id), "Talk");
    if ((player.age > 18 && _character.age > 18))
        Menu.setOption(1, "characterInteractSex({0})".format(_character.id), "Sex");
    else
        Menu.setOption(1, "characterInteractSex({0})".format(_character.id), "Sex", undefined, undefined, undefined, undefined, true);
    Menu.setOption(2, "getAppearance({0})".format(_character.id), "Appearance");
    if (_character.following != player)
        Menu.setOption(3, "characterInteractFollow({0})".format(_character.id), "Ask {0} to follow you".format(_character.objectPronoun()));
    else
        Menu.setOption(3, "characterInteractStay({0})".format(_character.id), "Ask {0} to stay here".format(_character.objectPronoun()));
    
    Menu.setOption(4, "characterInteractOpen({0})".format(_character.id), "Inventory", "Rifle through {0} pockets, if {1} has them.".format(_character.possessiveAdjective(), _character.subjectPronoun()));
    
    if (player.room.characters.size > 2)
        Menu.setOption((numberOfOptions == 12 ? 7 : 9), "localCharactersMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>those nearby");
    Menu.setOption((numberOfOptions == 12 ? 11 : 14), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    fn = new Function(_character.id + "Interact()");
    try {fn();}catch (err) {}
    
    Menu.generate();
}
function characterInteractOpen(_character, _page = 0, _clearContent = true) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : player;
    
    if (usePopups) {
        if (_character != player) {
            $('#dualInventoryTab-characterA').html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(player.image));
            $('#dualInventoryTab-characterB').html("<img style='height:2em' src='{0}' alt=''/>{1} Inventory".format(_character.image, _character.name + (_character.name.slice(-1) == 's' ? "'" : "'s")));
            $('#dualInventoryContent-characterA').html(generateEntityItemsGraphicalList(player, _character, true));
            $('#dualInventoryContent-characterB').html(generateEntityItemsGraphicalList(_character, player, true));
            $("#dualInventoryModal").modal("show");
        }
        else {
            $('#personalInventoryModal-title').html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(_character.image));
            $('#personalInventoryModal-body').html(generateEntityItemsGraphicalList(_character, undefined, false));
            $("#personalInventoryModal").modal("show");
        }
    }
    else {
        if (_clearContent) {
            var _blob = "";
            if (_character == player)
                _blob += ("Looking through your pockets, you find ");
            else
                _blob += ("Looking through {0}'s pockets, you find ".format(_character.name));
            
            if (_character.items.size == 1) {
                _blob += ("a " + Array.from(_character.items)[0].toString() + ".");
            }
            else if (_character.items.size == 2) {
                _character.items.forEach(function(_item) {
                    _blob += (_item.toString() + ".");
                });
            }
            else {
                // Lazy
                _arr = [];
                
                _character.items.forEach(function(_item) {
                    _arr.push(_item.toString());
                });
                
                for (i = 0; i < _arr.length - 1; i++) {
                    _blob += (_arr[i]);
                    if (_arr.length > 2)
                        _blob += (", ");
                }
                delete _arr;
                _blob += (" and " + _arr[_arr.length - 1] + ".");
            }
            Content.add("<p>" + _blob + "</p>");
            delete _blob;
        }
        
        Menu.clear();
        Menu.isExploring = false;
        Menu.setOption((numberOfOptions == 12 ? 7 : 9), "characterInteract({0}, false, true)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0}".format(_character.name));
        Menu.setOption((numberOfOptions == 12 ? 11 : 14), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
        
        var _entriesLimit = numberOfOptions - 2;
        if (_page > 0)
            _entriesLimit = numberOfOptions - 3;
        
        if (_character.items.size > numberOfOptions - 2) {
            var _arr = Array.from(_character.items);
            
            if (_page > 1 && _character.items.size + (numberOfOptions - 3) < ((numberOfOptions - 2) + (numberOfOptions - 3) * (_page)))
                _page -= 1;
            
            if (((_page + 1) * _entriesLimit) < _arr.length)
                Menu.setOption((numberOfOptions == 12 ? 6 : 8), "characterInteractOpen({0}, {1}, false)".format(_character.id, _page + 1), "Next");
            if (_page > 0)
                Menu.setOption((numberOfOptions == 12 ? 10 : 13), "characterInteractOpen({0}, {1}, false)".format(_character.id, _page - 1), "Previous");
            
            if (_page == 0) {
                for (var _i = 0; _i < (numberOfOptions - 2); _i++) {
                    Menu.addOption("generateEntityItemsMenuMove({0}, {1}, {2}, false, {3})".format(_arr[_i].id, _character.id, player.id, _page), "Take " + _arr[_i].name, _arr[_i].description);
                }
            }
            else if (((_page + 1) * _entriesLimit) > _character.items.size) {
                for (var _i = ((numberOfOptions - 3) + (numberOfOptions - 3) * (_page -1)); _i < ((numberOfOptions - 2) + (numberOfOptions - 3) * (_page -1)) + (numberOfOptions - 2) && _i < _character.items.size; _i++) {
                    Menu.addOption("generateEntityItemsMenuMove({0}, {1}, {2}, false, {3})".format(_arr[_i].id, _character.id, player.id, _page), "Take " + _arr[_i].name, _arr[_i].description);
                }
            }
            else {
                for (var _i = ((numberOfOptions - 2) + (numberOfOptions - 3) * (_page -1)); _i < ((numberOfOptions - 2) + (numberOfOptions - 3) * (_page -1)) + (numberOfOptions - 3); _i++) {
                    Menu.addOption("generateEntityItemsMenuMove({0}, {1}, {2}, false, {3})".format(_arr[_i].id, _character.id, player.id, _page), "Take " + _arr[_i].name, _arr[_i].description);
                }
            }
        }
        else {
            _character.items.forEach(function(_item) {
                Menu.addOption("generateEntityItemsMenuMove({0}, {1}, {2}, false, {3})".format(_item.id, _character.id, player.id, _page), "Take " + _item.name, _item.description);
            }, this);
        }
        
        Menu.generate();
    }
}
function characterInteractTalk(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);
    
    
    Menu.clear();
    Menu.setOption((numberOfOptions == 12 ? 7 : 9), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((numberOfOptions == 12 ? 11 : 14), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    fn = new Function(_character.id + "Talk()");
    try {fn();}catch (err) {}
    
    
    Menu.generate();
}
function characterInteractSex(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);
    
    Menu.clear();
    Menu.setOption((numberOfOptions == 12 ? 7 : 9), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((numberOfOptions == 12 ? 11 : 14), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    fn = new Function(_character.id + "Sex()");
    try {fn();}catch (err) {}
    
    Menu.generate();
}
function characterInteractFollow(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);
    
    Menu.clear();
    Menu.setOption((numberOfOptions == 12 ? 7 : 9), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((numberOfOptions == 12 ? 11 : 14), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    fn = new Function(_character.id + "Follow()");
    try {fn();}catch (err) {}
    
    Menu.generate();
}
function characterInteractAttack(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);
    
    Menu.clear();
    Menu.setOption((numberOfOptions == 12 ? 7 : 9), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((numberOfOptions == 12 ? 11 : 14), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    fn = new Function(_character.id + "Attack()");
    try {fn();}catch (err) {}
    
    Menu.generate();
}
function characterInteractStay(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);
    
    Menu.clear();
    Menu.setOption((numberOfOptions == 12 ? 7 : 9), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((numberOfOptions == 12 ? 11 : 14), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    fn = new Function(_character.id + "Stay()");
    try {fn();}catch (err) {}
    
    Menu.generate();
}

function furnitureInteract(_furniture, _clearContent = false, _clearMenu = true) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    
    lastMenu = "furnitureInteract(" + _furniture.id + ",false,true)";
    
    Content.add("<p>You decide to look over the " + FurnitureTypeIdNames.get(_furniture.type) + ", and you see that it has " + (_furniture.items.size == 0 ? "no items" : (_furniture.items.size == 1 ? "an item" : "a few items")) + " inside of it.</p>");
    
    if (_clearMenu) {
        if (_furniture.availableActions.size == 0) {
            Content.add("<p>There is little you can do with " + _furniture.name + ".</p>");
        }
        else {
            Menu.clear();
            Menu.setOption((numberOfOptions == 12 ? 7 : 9), "roomInteract(" + player.room.id + ", false, true, false)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>exploring room");
            Menu.setOption((numberOfOptions == 12 ? 11 : 14), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
            Menu.addOption("furnitureOpen(" + _furniture.id + ")", "Open", (_furniture.items.size > 0 ? "There are items inside" : ""));
            
            _furniture.availableActions.forEach(function(_action) {
                if (ActionsIdNames.has(_action)) {
                    switch(ActionsIdNames.get(_action)) {
                        case "use" : {
                            Menu.addOption("furnitureUse(" + this.id + ")", "Use " + this.name);
                            break;
                        }
                        case "sit" : {
                            if (!(player.furniture == this))
                                Menu.addOption("furnitureSit(" + this.id + ")", "Sit on " + this.name);
                            break;
                        }
                        case "lay" : {
                            if (!(player.furniture == this))
                                Menu.addOption("furnitureLay(" + this.id + ")", "Lay in " + this.name);
                            break;
                        }
                        case "sleep" : {
                            if (!(player.furniture == this))
                                Menu.addOption("furnitureSleep(" + this.id + ")", "Sleep in " + this.name);
                            break;
                        }
                        case "sex" : {
                            if (!(player.furniture == this))
                                Menu.addOption("furnitureSex(" + this.id + ")", "Fuck " + this.name);
                            break;
                        }
                    }
                }
            }, _furniture);
            Menu.generate();
        }
    }
}
function furnitureOpen(_furniture) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    
    /*$blob = "";
    $blob += ("Looking through the " + _furniture.name + ", you find ");
    if (_furniture.items.size == 1) {
        $blob += ("a " + Array.from(_furniture.items)[0].toString() + ".");
    }
    else if (_furniture.items.size == 2) {
        _furniture.items.forEach(function(_item) {
            $blob += (_item.toString() + ".");
        });
    }
    else {
        // Lazy
        tempArray = [];
        
        _furniture.items.forEach(function(_item) {
            tempArray.push(_item.toString());
        });
        
        for (i = 0; i < tempArray.length - 1; i++) {
            $blob += (tempArray[i]);
            if (tempArray.length > 2)
                $blob += (", ");
        }
        $blob += (" and " + tempArray[tempArray.length - 1] + ".");
    }
    Content.add("<p>" + $blob + "</p>");
    
    Menu.clear();
    Menu.setOption((numberOfOptions == 12 ? 7 : 9), lastMenu, "Back");
    Menu.setOption((numberOfOptions == 12 ? 11 : 14), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    _furniture.items.forEach(function(_item) {
        Menu.addOption("moveItemToCharacter(" + _item.id + ")", "Take " + _item.name, _item.description);
    }, this);
    
    Menu.generate();*/
    
    $('#dualInventoryTab-characterA').html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(player.image));
    $('#dualInventoryTab-characterB').html("<img style='height:2em' src='{0}' alt=''/>{1} Inventory".format(_furniture.image, _furniture.name));
    $('#dualInventoryContent-characterA').html(generateEntityItemsGraphicalList(player, _furniture, true));
    $('#dualInventoryContent-characterB').html(generateEntityItemsGraphicalList(_furniture, player, true));
    $("#dualInventoryModal").modal("show");
}
function furnitureUse(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;
    
    fn = new Function(_furniture.id + "Use(" + _character.id + ")");
    try {fn();}catch (err) {}
}
function furnitureSit(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;
    
    fn = new Function(_furniture.id + "Sit(" + _character.id + ")");
    try {fn();}catch (err) {}
}
function furnitureLay(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;
    
    fn = new Function(_furniture.id + "Lay(" + _character.id + ")");
    try {fn();}catch (err) {}
}
function furnitureSleep(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;
    
    fn = new Function(_furniture.id + "Sleep(" + _character.id + ")");
    try {fn();}catch (err) {}
}
function furnitureLook(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;
    
    fn = new Function(_furniture.id + "Look(" + _character.id + ")");
    try {fn();}catch (err) {}
}
function furnitureSex(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;
    
    fn = new Function(_furniture.id + "Sex(" + _character.id + ")");
    try {fn();}catch (err) {}
}

function itemInteract(_item, _clearContent = false, _clearMenu = true) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}
function itemUse(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}
function itemPut(_item, _character = player) { // Rewrite this later for entities in general
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}
function itemGive(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}
function itemTake(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}
function itemHold(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}
function itemWear(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    _character.wear(_item);
}
function itemLook(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item))
        return;
    
    Content.add(_item.description);
}
function itemAttack(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}
function itemSex(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}