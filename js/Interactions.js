function roomInteract(_room, _showBaseMenu = false, _clearContent = undefined, _showContent = undefined, _checkLocked = true) {
    if (!(_room instanceof Room))
        _room = roomsIndexes.get(_room);

    if (player.room.isLocked(_room) && _checkLocked && !player.hasKey(_room)) {
        Content.add("<p>{0} is locked from this side.</p>".format(_room.name));
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

        var _previousRoomDifferent = (!(player.previousRoom instanceof Room) || !(player.previousRoom.sid == player.room.sid));

        if (typeof _clearContent != "boolean") {
            if (_previousRoomDifferent)
                Content.clear();
        }
        else if (_clearContent === true)
            Content.clear();

        if (typeof _showContent != "boolean")
            _showContent = _previousRoomDifferent;

        if (_showBaseMenu) {
            if (debug) console.log("\tBase Menu and Room for ".format(_room.sid));
            fn = new Function("{0}Interact({1})".format(_room.sid, _showContent));
            try {fn();}catch (err) {}

            baseMenu(0, 1);
        }
        else {
            Menu.showingBaseMenu = false;

            Menu.clear();
            Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu({0})".format(_previousRoomDifferent ? "true" : "false"), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

            if (debug) console.log("\tRoom for " + _room.sid);
            fn = new Function("{0}Interact({1})".format(_room.sid, _showContent));
            try {fn();}catch (err) {}

            _room.furniture.forEach(function(_furniture) {
                Menu.addOption("furnitureInteract({0}, false, true)".format(_furniture.id), "Look at {0}".format(_furniture.name), _furniture.description);
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

    Menu.showingBaseMenu = false;
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

        fn = new Function("{0}()".format(player.room.sid + _character.id.capitalize()));
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
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "localCharactersMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>those nearby");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    fn = new Function(_character.id + "Interact()");
    try {fn();}catch (err) {}

    Menu.generate();
}
function characterInteractOpen(_character, _clearContent = true, _switch = false) {
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
        if (_switch) {
            var _characterB = player;
            var _characterA = _character;
        }
        else {
            var _characterA = player;
            var _characterB = _character;
        }

        if (_clearContent) {
            var _blob = "";
            if (_characterB == _characterA)
                _blob += ("Looking through your pockets, you find ");
            else
                _blob += ("Looking through {0}'s pockets, you find ".format(_characterB.name));

            if (_characterB.items.size == 1) {
                _blob += ("a " + Array.from(_characterB.items)[0].toString() + ".");
            }
            else if (_characterB.items.size == 2) {
                _characterB.items.forEach(function(_item) {
                    _blob += (_item.toString() + ".");
                });
            }
            else {
                // Lazy
                _arr = [];

                _characterB.items.forEach(function(_item) {
                    _arr.push(_item.toString());
                });

                for (i = 0; i < _arr.length - 1; i++) {
                    _blob += (_arr[i]);
                    if (_arr.length > 2)
                        _blob += (", ");
                }
                _blob += (" and " + _arr[_arr.length - 1] + ".");
                delete _arr;
            }
            Content.add("<p>" + _blob + "</p>");
            delete _blob;
        }

        Menu.clear();
        Menu.showingBaseMenu = false;
        if (_characterA != _characterB) {
            Menu.setOption((Menu.useWideMenu ? 4 : 3), "characterInteractOpen({0}, false, {1})".format(_character.id, !_switch), "Switch Inventory", "to {0}".format(_characterA == player ? "yours" : _characterA.singularPossesiveName()));
            if (_characterB != player)
                Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_characterB.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0}".format(_characterB.name));
        }
        else
            Menu.setOption((Menu.useWideMenu ? 9 : 7), "personalCharacterMenu()".format(_characterB.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Personal Menu");
        
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

        _characterB.items.forEach(function(_item) {
            Menu.addOption("generateEntityItemsMenuMove({0}, {1}, {2}, false, {3})".format(_item.id, _characterB.id, _characterA.id, _switch), (_switch ? "Put " : "Take ") + _item.name, _item.description, undefined, undefined, undefined, undefined, "btn-primary");
        }, this);
        Menu.generate();
    }
}
function characterInteractTalk(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);


    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    fn = new Function(_character.id + "Talk()");
    try {fn();}catch (err) {}


    Menu.generate();
}
function characterInteractSex(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);

    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    fn = new Function(_character.id + "Sex()");
    try {fn();}catch (err) {}

    Menu.generate();
}
function characterInteractFollow(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);

    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    fn = new Function(_character.id + "Follow()");
    try {fn();}catch (err) {}

    Menu.generate();
}
function characterInteractAttack(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);

    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    fn = new Function(_character.id + "Attack()");
    try {fn();}catch (err) {}

    Menu.generate();
}
function characterInteractStay(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);

    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    fn = new Function(_character.id + "Stay()");
    try {fn();}catch (err) {}

    Menu.generate();
}

function furnitureInteract(_furniture, _clearContent = false, _clearMenu = true) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);

    lastMenu = "furnitureInteract({0},false,true)".format(_furniture.id);

    Content.add("<p>You decide to look over the {0}, and you see that it has {1} inside of it.</p>".format(FurnitureTypeIdNames.get(_furniture.type), (_furniture.items.size == 0 ? "no items" : (_furniture.items.size == 1 ? "an item" : "a few items"))));

    if (_clearMenu) {
        if (_furniture.availableActions.size == 0) {
            Content.add("<p>There is little you can do with {0}.</p>".format(_furniture.name));
        }
        else {
            Menu.clear();
            Menu.setOption((Menu.useWideMenu ? 9 : 7), "roomInteract({0}, false, true, false)".format(player.room.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>exploring room");
            Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
            Menu.addOption("furnitureInteractOpen({0})".format(_furniture.id), "Open", (_furniture.items.size > 0 ? "There are items inside" : ""));

            _furniture.availableActions.forEach(function(_action) {
                if (ActionsIdNames.has(_action)) {
                    switch(ActionsIdNames.get(_action)) {
                        case "use" : {
                            Menu.addOption("furnitureInteractUse({0})".format(this.id), "Use {0}".format(this.name));
                            break;
                        }
                        case "sit" : {
                            if (!(player.furniture == this))
                                Menu.addOption("furnitureInteractSit({0})".format(this.id), "Sit on {0}".format(this.name));
                            break;
                        }
                        case "lay" : {
                            if (!(player.furniture == this))
                                Menu.addOption("furnitureInteractLay({0})".format(this.id), "Lay in {0}".format(this.name));
                            break;
                        }
                        case "sleep" : {
                            if (!(player.furniture == this))
                                Menu.addOption("furnitureInteractSleep({0})".format(this.id), "Sleep in {0}".format(this.name));
                            break;
                        }
                        case "sex" : {
                            if (!(player.furniture == this))
                                Menu.addOption("furnitureInteractSex({0})".format(this.id), "Fuck {0}".format(this.name));
                            break;
                        }
                    }
                }
            }, _furniture);
            Menu.generate();
        }
    }
}
function furnitureInteractOpen(_furniture, _clearContent = true, _switch = false) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);

    if (usePopups) {
        $('#dualInventoryTab-characterA').html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(player.image));
        $('#dualInventoryTab-characterB').html("<img style='height:2em' src='{0}' alt=''/>{1} Inventory".format(_furniture.image, _furniture.name));
        $('#dualInventoryContent-characterA').html(generateEntityItemsGraphicalList(player, _furniture, true));
        $('#dualInventoryContent-characterB').html(generateEntityItemsGraphicalList(_furniture, player, true));
        $("#dualInventoryModal").modal("show");
    }
    else {
        if (_switch) {
            var _characterB = player;
            var _characterA = _character;
        }
        else {
            var _characterA = player;
            var _characterB = _character;
        }

        if (_clearContent) {
            var _blob = "";
            _blob += ("Looking through the {0}, you find ".format(_characterB.toString()));

            if (_characterB.items.size == 1) {
                _blob += ("a " + Array.from(_characterB.items)[0].toString() + ".");
            }
            else if (_characterB.items.size == 2) {
                _characterB.items.forEach(function(_item) {
                    _blob += (_item.toString() + ".");
                });
            }
            else {
                // Lazy
                _arr = [];

                _characterB.items.forEach(function(_item) {
                    _arr.push(_item.toString());
                });

                for (i = 0; i < _arr.length - 1; i++) {
                    _blob += (_arr[i]);
                    if (_arr.length > 2)
                        _blob += (", ");
                }
                _blob += (" and " + _arr[_arr.length - 1] + ".");
                delete _arr;
            }
            Content.add("<p>" + _blob + "</p>");
            delete _blob;
        }

        Menu.clear();
        Menu.showingBaseMenu = false;
        Menu.setOption((Menu.useWideMenu ? 4 : 3), "furnitureInteractOpen({0}, false, {1})".format(_character.id, !_switch), "Switch Inventory", "to {0}".format(_characterA == player ? "yours" : _characterA.name));
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "furnitureInteract({0}, false, true)".format(_characterB.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0}".format(_characterB.name));
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

        _characterB.items.forEach(function(_item) {
            Menu.addOption("generateEntityItemsMenuMove({0}, {1}, {2}, false, {3})".format(_item.id, _characterB.id, _characterA.id, _switch), (_switch ? "Put " : "Take ") + _item.name, _item.description, undefined, undefined, undefined, undefined, "btn-primary");
        }, this);

        Menu.generate();
    }
}
function furnitureInteractUse(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;

    fn = new Function(_furniture.id + "Use({0})".format(_character.id));
    try {fn();}catch (err) {}
}
function furnitureInteractSit(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;

    fn = new Function(_furniture.id + "Sit({0})".format(_character.id));
    try {fn();}catch (err) {}
}
function furnitureInteractLay(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;

    fn = new Function(_furniture.id + "Lay({0})".format(_character.id));
    try {fn();}catch (err) {}
}
function furnitureInteractSleep(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;

    fn = new Function(_furniture.id + "Sleep({0})".format(_character.id));
    try {fn();}catch (err) {}
}
function furnitureInteractLook(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;

    fn = new Function(_furniture.id + "Look({0})".format(_character.id));
    try {fn();}catch (err) {}
}
function furnitureInteractSex(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;

    fn = new Function(_furniture.id + "Sex({0})".format(_character.id));
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
function itemInteractUse(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;


}
function itemInteractPut(_item, _character = player) { // Rewrite this later for entities in general
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;


}
function itemInteractGive(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;


}
function itemInteractTake(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;


}
function itemInteractHold(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;


}
function itemInteractWear(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;

    _character.wear(_item);
}
function itemInteractLook(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_item instanceof Item))
        return;

    Content.add(_item.description);
}
function itemInteractAttack(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;


}
function itemInteractSex(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;


}