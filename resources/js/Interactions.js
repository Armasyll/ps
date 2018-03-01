function roomInteract(_room, _clearContent = undefined, _showBaseMenu = true) {
    if (!(_room instanceof Room))
        _room = roomsIndexes.get(_room);

    if (player.room.isLocked(_room) && !player.hasKey(_room)) {
        if (_room.location != player.room.location)
            Content.add("<p>{0} is locked from this side.</p>".format(_room.location.name));
        else
            Content.add("<p>{0} is locked from this side.</p>".format(_room.name));
        return undefined;
    }

    var _previousRoomDifferent = (!(player.room instanceof Room) || !(player.room.sid == _room.sid));

    if (_clearContent != false && _previousRoomDifferent)
        Content.clear();
    
    if (player.room !== _room) {
        if (debug) console.log("Previous Room: {0}".format(player.room.id));
        setRoom(_room);
        if (debug) console.log("Current Room: {0}".format(player.room.id));
    }

    Title.set(
        (player.room.isOwner(player) ? "Your {0}".format((player.room.type !== 'undefined' ? player.room.type : "room").capitalize()) : player.room.name),
        undefined,
        (typeof player.room.location !== 'undefined' ? (player.room.location == player.room.cell.location ? player.room.cell.name : player.room.location.name) : "&nbsp;"),
        (typeof player.room.cell.location !== 'undefined' ? player.room.cell.location.name : "&nbsp;")
    );

    Menu.showingBaseMenu = _showBaseMenu == true;

    if (Menu.showingBaseMenu) {
        if (debug) console.log("\tBase Menu and Room for ".format(_room.sid));
        unsafeExec("{0}Interact({1})".format(_room.sid, _previousRoomDifferent && !_scenesViewedThisWindow.has(player.previousRoom)));

        _scenesViewedThisWindow.add(player.previousRoom);

        baseMenu(0, 1);
        
        if (_previousRoomDifferent)
            _scenesViewedThisWindow.clear();
    }
    else {
        Menu.clear();
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(false)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

        _scenesViewedThisWindow.add(player.previousRoom);

        if (debug) console.log("\tRoom for {0}".format(_room.sid));
        lastMenu = "roomInteract('{0}', false)".format(_room.sid);
        
        unsafeExec("{0}Interact({1})".format(_room.sid, _previousRoomDifferent && !_scenesViewedThisWindow.has(player.previousRoom)));

        _room.furniture.forEach(function(_furniture) {
            Menu.addOption("furnitureInteract({0}, false, true)".format(_furniture.id), "Look at {0}".format(_furniture.name), _furniture.description);
        });
        
        Menu.generate();
    }

    if (!_scenesViewedThisWindow.has(player.previousRoom)) {
        if (player.room.characters.size > 1) {
            var _blob = "";
            var _characters = [];
            var _followingCharacters = [];

            Array.from(player.room.characters).forEach(function(__character) {
                if (!__character.isFollowing(player) && __character != player)
                    _characters.push(__character);
            }, this);
            
            if (_characters.length > 0) {
                if (_characters.length == 1)
                    _blob += _characters[0].toString() + " is here";
                else {
                    // Lazy
                    for (i = 0; i < _characters.length - 1; i++) {
                        _blob += (_characters[i]);
                        if (_characters.length > 2)
                            _blob += (", ");
                    }
                    _blob += " and " + _characters[_characters.length - 1] + " are here";
                }
            }
            if (player.followers.size > 0) {
                if (_characters.length > 0)
                    _blob += ", along with ";
                _followingCharacters = Array.from(player.followers);
                if (_followingCharacters.length == 1)
                    _blob += _followingCharacters[0].toString();
                else {
                    // Lazy
                    for (i = 0; i < _followingCharacters.length - 1; i++) {
                        _blob += (_followingCharacters[i]);
                        if (_followingCharacters.length > 2)
                            _blob += (", ");
                    }
                    _blob += " and " + _followingCharacters[_followingCharacters.length - 1];
                }
                if (_characters.length == 0) {
                    if (_followingCharacters.length > 1)
                        _blob += " are";
                    else
                        _blob += " is";
                }
                _blob += " following beside you.";
            }
            else
                _blob += ".";
            Content.add("<p>" + _blob + "</p>");
        }
    }

    eventsIndexes.forEach(function(_event) {
        if (typeof _event.cron != 'undefined' || (typeof _event.location == 'undefined' && typeof _event.cell == 'undefined' && typeof _event.room == 'undefined')) {
            return undefined;
        }

        if (
            typeof _event.characterA == 'undefined' ||
            (
                _event.characterA == player &&
                (typeof _event.item == 'undefined' || _event.characterA.containsItem(_event.item))
            )
        ) {
            if (typeof _event.location == 'undefined' ||
                (_event.location == _room.location || _event.location == _room.cell.location) &&
                (typeof _event.characterB == 'undefined' || (_event.characterB.room.location == _event.location || _event.characterB.location == _event.location))
            ) {
                if (typeof _event.cell == 'undefined' ||
                    (
                        _event.cell == _room.cell &&
                        (typeof _event.characterB == 'undefined' || _event.characterB.room.cell == _event.cell) &&
                        (_event.characterA.previousRoom.cell != _event.characterA.room.cell)
                    )
                ) {
                    if (typeof _event.room == 'undefined' ||
                        (
                            _event.room == _room &&
                            (typeof _event.characterB == 'undefined' || _event.characterB.room == _event.room)
                        )
                    ) {
                        _event.execute();
                    }
                }
            }
        }
    }, this);

    _eventsExecutedThisTick.clear();
}

function characterInteract(_character, _clearContent = true) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }

    if (!_character.characterDisposition.has(player))
        _character.addNewCharacterDispositionFor(player);
    if (!player.characterDisposition.has(_character))
        player.addNewCharacterDispositionFor(_character);

    Menu.showingBaseMenu = false;
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    lastMenu = "characterInteract('{0}', false)".format(_character.id);

    Title.set(
        _character.name,
        _character.image,
        (typeof player.room.location !== 'undefined' ? player.room.location.name : "&nbsp;"),
        (typeof player.room.cell.location !== 'undefined' ? player.room.cell.location.name : "&nbsp;")
    );

    if (_clearContent) {
        Content.clear();

        unsafeExec("{0}{1}()".format(player.room.sid, _character.id.capitalize()));
    }

    Menu.clear();

    if (typeof window["{0}Talk".format(_character.id)] == "function")
        Menu.setOption(0, "characterInteractTalk({0})".format(_character.id), "Talk");
    else
        Menu.setOption(0, "characterInteractTalk({0})".format(_character.id), "Talk", undefined, undefined, 4);

    if (typeof window["{0}Sex".format(_character.id)] == "function") {
        if ((player.age >= 18 && _character.age >= 18))
            Menu.setOption(1, "characterInteractSex({0})".format(_character.id), "Sex");
        else
            Menu.setOption(1, "characterInteractSex({0})".format(_character.id), "Sex", undefined, undefined, 4);
    }
    else
        Menu.setOption(1, "characterInteractSex({0})".format(_character.id), "Sex", undefined, undefined, 4);

    Menu.setOption(2, "getAppearance({0})".format(_character.id), "Appearance");

    if (debug)
        Menu.setOption(4, "characterInteractOpen({0})".format(_character.id), "Inventory", "Rifle through {0} pockets, if {1} has them.".format(_character.possessiveAdjective(), _character.subjectPronoun()));
    else
        Menu.setOption(4, "characterInteractOpen({0}, true, false, undefined, false)".format(_character.id), "Give", "Give them an item.")

    if (player.room.characters.size > 2)
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "localCharactersMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>those nearby");

    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    if (typeof window["{0}Hug".format(_character.id)] == "function")
        Menu.addOption("characterInteractHug({0})".format(_character.id), "Hug");

    if (_character.isSleeping())
        Menu.addOption("characterInteractWake({0})".format(_character.id), "Wake");

    unsafeExec("{0}Interact({1})".format(_character.id, _clearContent));

    Menu.generate();
}
function characterInteractOpen(_character, _switch = false, _allowSwitch = true, _filter = undefined, _clearContent = true) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            _character = player;
    }
    if (typeof _switch != "boolean")
        _switch = false;
    if (typeof _allowSwitch != "boolean")
        _allowSwitch = true;
    if (_filter != undefined) {
        if (_filter == "Item" ||
            _filter == "Key" ||
            _filter == "Clothing" ||
            _filter == "Consumable" ||
            _filter == "Cheque" ||
            _filter == "ElectronicDevice" ||
            _filter == "Phone") {}
        else
            _filter = undefined;
    }

    lastMenu = "characterInteractOpen({0}, {1}, {2}, {3}, {4})".format(_character.id, _switch ? "true" : "false", _allowSwitch ? "true" : "false", _filter, false);

    if (enablePopups) {
        if (!_allowSwitch) {
            $("#personalInventoryModal-title").html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(_character.image));
            $("#personalInventoryModal-list").html(_generateEntityItemsGraphicalList(player, _character, false));
            $("#personalInventoryModal-description").html("");
            $("#personalInventoryModal").modal("show");
        }
        else if (_character != player) {
            $("#dualInventoryTab-characterA").html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(player.image));
            $("#dualInventoryTab-characterB").html("<img style='height:2em' src='{0}' alt=''/>{1} Inventory".format(_character.image, _character.singularPossessiveName()));
            $("#dualInventoryContent-characterA").html(_generateEntityItemsGraphicalList(player, _character, true));
            $("#dualInventoryContent-characterB").html(_generateEntityItemsGraphicalList(_character, player, true));
            $("#dualInventoryModal").modal("show");
        }
        else {
            $("#personalInventoryModal-title").html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(_character.image));
            $("#personalInventoryModal-list").html(_generateEntityItemsGraphicalList(_character, undefined, false));
            $("#personalInventoryModal-description").html("");
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

        if (_clearContent && !_scenesViewedThisWindow.has("characterInteractOpen")) {
            var _blob = "";
            if (_characterB == _characterA)
                _blob += ("Looking through your pockets and on your person, you find ");
            else
                _blob += ("Looking through {0}'s pockets and on {1} person, you find ".format(_characterB.name, _characterB.possessiveAdjective()));

            if (_characterB.getNumberOfItems() == 0) {
                _blob += "that it is empty.";
            }
            else if (_characterB.getNumberOfItems() == 1) {
                _blob += ("a " + _characterB.items[0].item.toString() + ".");
            }
            else if (_characterB.getNumberOfItems() == 2) {
                _blob += "{0}, and {1}".format(_characterB.items[0].item.plural ? _characterB.items[0].item.toString() : _characterB.items[0].item, _characterB.items[1].item.plural ? _characterB.items[1].item : _characterB.items[1].item);
            }
            else {
                // Lazy
                var _arr = _characterB.items;

                for (i = 0; i < _arr.length - 1; i++) {
                    _blob += (_arr[i].item.toString());
                    if (_arr.length > 2)
                        _blob += (", ");
                }
                _blob += (" and " + _arr[_arr.length - 1].item.toString() + ".");
                delete _arr;
            }
            Content.add("<p>" + _blob + "</p>");
            delete _blob;
            _scenesViewedThisWindow.add("characterInteractOpen");
        }

        Menu.clear();
        Menu.showingBaseMenu = false;
        if (_allowSwitch) {
            if (_characterA != _characterB) {
                Menu.setOption((Menu.useWideMenu ? 4 : 3), "characterInteractOpen({0}, {1}, {2}, '{3}', false)".format(_character.id, !_switch, _allowSwitch, _filter), "Switch Inventory", "to {0}".format(_characterA == player ? "yours" : _characterA.singularPossessiveName()));
                if (_characterB != player)
                    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_characterB.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0}".format(_characterB.name));
            }
            else
                Menu.setOption((Menu.useWideMenu ? 9 : 7), "personalCharacterMenu()".format(player.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Personal Menu");
        }
        else {
            if (_character != player)
                Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0}".format(_character.name));
            else
                Menu.setOption((Menu.useWideMenu ? 9 : 7), "personalCharacterMenu()".format(player.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Personal Menu");
        }
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

        if (_character != player) {
            _characterB.items.forEach(function(_itemInstance) {
                if (_filter == _itemInstance.item.constructor.name)
                    Menu.addOption("_generateEntityItemsMenuMove('{0}', '{1}', '{2}', false, {3}, {4}, '{5}')".format(_itemInstance.id, _characterB.id, _characterA.id, _switch, _allowSwitch, _filter), (_switch ? "Give " : "Take ") + _itemInstance.item.name, _itemInstance.item.description, undefined, undefined, "btn-primary");
                else
                    Menu.addOption("_generateEntityItemsMenuMove('{0}', '{1}', '{2}', false, {3}, {4})".format(_itemInstance.id, _characterB.id, _characterA.id, _switch, _allowSwitch), (_switch ? "Give " : "Take ") + _itemInstance.item.name, _itemInstance.item.description, undefined, undefined, "btn-primary");
            }, this);
        }
        else {
            _characterB.items.forEach(function(_itemInstance) {
                if (_filter == undefined || _filter == _itemInstance.item.constructor.name)
                    Menu.addOption("itemInteract('{0}')".format(_itemInstance.id), "<span class='hidden-md hidden-sm hidden-xs'>Interact with </span>{0}".format(_itemInstance.item.name), _itemInstance.item.description, undefined, undefined, "btn-primary");
            }, this);
        }
        Menu.generate();
    }
}
function characterInteractTalk(_character) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }


    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    if (typeof window["{0}Follow".format(_character.id)] == "function") {
        if (_character.following != player)
            Menu.setOption(3, "characterInteractFollow({0})".format(_character.id), "Ask {0} to follow you".format(_character.objectPronoun()));
        else
            Menu.setOption(3, "characterInteractStay({0})".format(_character.id), "Ask {0} to stay here".format(_character.objectPronoun()));
    }

    unsafeExec("{0}Talk()".format(_character.id));


    Menu.generate();
}
function characterInteractSex(_character) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }

    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    unsafeExec("{0}Sex()".format(_character.id));

    Menu.generate();
}
function characterInteractFollow(_character) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }

    unsafeExec("{0}Follow()".format(_character.id));
}
function characterInteractAttack(_character) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }

    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    unsafeExec("{0}Attack()".format(_character.id));

    Menu.generate();
}
function characterInteractStay(_character) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }

    unsafeExec("{0}Stay()".format(_character.id));
}
function characterInteractHug(_character) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }

    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    unsafeExec("{0}Hug()".format(_character.id));

    Menu.generate();
}
function characterInteractWake(_character) {
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }

    _character.wake();
    characterInteract(_character, false);
}

function furnitureInteract(_furniture, _clearContent = false, _clearMenu = true) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);

    lastMenu = "furnitureInteract('{0}', false, true)".format(_furniture.id);

    if (player.furniture != _furniture)
        Content.add("<p>You decide to look over the {0}, and you see that it has {1} inside of it.</p>".format(_furniture.type, (_furniture.getNumberOfItems() == 0 ? "no items" : (_furniture.getNumberOfItems() == 1 ? "an item" : "a few items"))));

    Title.set(
        _furniture.name,
        _furniture.image,
        (typeof player.room.location !== 'undefined' ? player.room.location.name : "&nbsp;"),
        (typeof player.room.cell.location !== 'undefined' ? player.room.cell.location.name : "&nbsp;")
    );

    if (_clearMenu) {
        if (_furniture.availableActions.size == 0) {
            Content.add("<p>There is little you can do with {0}.</p>".format(_furniture.name));
        }
        else {
            Menu.clear();
            Menu.setOption((Menu.useWideMenu ? 9 : 7), "roomInteract({0}, false, false)".format(player.room.sid), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>exploring room");
            Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
            Menu.addOption("furnitureInteractOpen({0})".format(_furniture.id), "Open", (_furniture.getNumberOfItems() > 0 ? "There are items inside" : ""));

            _furniture.availableActions.forEach(function(_action) {
                if (kActionTypes.has(_action)) {
                    switch(_action) {
                        case "use" : {
                            if (_furniture.type == "mirror" && player.mana > 0)
                                Menu.addOption("furnitureInteractUse({0})".format(this.id), "Use {0}".format(this.name), undefined, undefined, undefined, "btn-mana");
                            else
                                Menu.addOption("furnitureInteractUse({0})".format(this.id), "Use {0}".format(this.name));
                            break;
                        }
                        case "sit" : {
                            if (!(player.furniture == this) || (player.furniture == this && !player.isSitting()))
                                Menu.addOption("furnitureInteractSit({0})".format(this.id), "Sit on {0}".format(this.name));
                            break;
                        }
                        case "lay" : {
                            if (!(player.furniture == this) || (player.furniture == this && !player.isLying()))
                                Menu.addOption("furnitureInteractLay({0})".format(this.id), "Lay in {0}".format(this.name));
                            break;
                        }
                        case "sleep" : {
                            if (!(player.furniture == this) || (player.furniture == this && !player.isSleeping()))
                                Menu.addOption("furnitureInteractSleep({0})".format(this.id), "Sleep in {0}".format(this.name));
                            break;
                        }
                        case "sex" : {
                            if (!(player.furniture == this) || (player.furniture == this && !player.isFucking()))
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
function furnitureInteractOpen(_furniture, _switch = false, _allowSwitch = true, _filter = undefined, _clearContent = true) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);

    if (enablePopups) {
        $('#dualInventoryTab-characterA').html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(player.image));
        $('#dualInventoryTab-characterB').html("<img style='height:2em' src='{0}' alt=''/>{1} Inventory".format(_furniture.image, _furniture.name));
        $('#dualInventoryContent-characterA').html(_generateEntityItemsGraphicalList(player, _furniture, true));
        $('#dualInventoryContent-characterB').html(_generateEntityItemsGraphicalList(_furniture, player, true));
        $("#dualInventoryModal").modal("show");
    }
    else {
        if (_switch) {
            var _characterB = player;
            var _characterA = _furniture;
        }
        else {
            var _characterA = player;
            var _characterB = _furniture;
        }

        if (_clearContent && !_scenesViewedThisWindow.has("furnitureInteractOpen")) {
            var _blob = "";
            _blob += ("Looking through the {0}, you find ".format(_characterB.toString()));

            if (_characterB.getNumberOfItems() == 0) {
                _blob += "that it is empty.";
            }
            else if (_characterB.getNumberOfItems() == 1) {
                _blob += "a {0} {1}.".format((_characterB.items[0].item.plural ? "set of" : ""), _characterB.items[0].item.toString());
            }
            else if (_characterB.getNumberOfItems() == 2) {
                _blob += "a {0}{1} and {2}{3}.".format((_characterB.items[0].item.plural ? "set of " : ""), _characterB.items[0].item.toString(), (_characterB.items[1].item.plural ? "" : "a "), _characterB.items[1].item.toString());
            }
            else {
                // Lazy
                var _arr = _characterB.items;

                for (i = 0; i < _arr.length - 1; i++) {
                    _blob += (_arr[i].item.toString());
                    if (_arr.length > 2)
                        _blob += (", ");
                }
                _blob += (" and " + _arr[_arr.length - 1].item.toString() + ".");
                delete _arr;
            }
            Content.add("<p>" + _blob + "</p>");
            delete _blob;
            _scenesViewedThisWindow.add("furnitureInteractOpen");
        }

        Menu.clear();
        Menu.showingBaseMenu = false;
        Menu.setOption((Menu.useWideMenu ? 4 : 3), "furnitureInteractOpen('{0}', {1}, {2}, '{3}', false)".format(_furniture.id, !_switch, _allowSwitch, _filter), "Switch Inventory", "to {0}".format(_characterA == player ? "yours" : _characterA.name));
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "furnitureInteract('{0}', false, true)".format(_characterB.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0}".format(_characterB.name));
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

        _characterB.items.forEach(function(_itemInstance) {
            if (_filter == _itemInstance.item.constructor.name)
                Menu.addOption("_generateEntityItemsMenuMove('{0}', '{1}', '{2}', false, {3}, true, '{4}')".format(_itemInstance.id, _characterB.id, _characterA.id, _switch, _filter), (_switch ? "Put " : "Take ") + _itemInstance.item.name, _itemInstance.item.description, undefined, undefined, "btn-primary");
            else
                Menu.addOption("_generateEntityItemsMenuMove('{0}', '{1}', '{2}', false, {3}, true)".format(_itemInstance.id, _characterB.id, _characterA.id, _switch), (_switch ? "Put " : "Take ") + _itemInstance.item.name, _itemInstance.item.description, undefined, undefined, "btn-primary");
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

    if (_furniture.type == "mirror") {
        if (_character.mana > 0) {
            Content.add("<p>Pressing your {0} to the mirror, you feel its surface ripple. With {1} focus, your reflection quickly fades to black.</p>".format(_character.getHand(), (_character.mana > 75 ? "an effortless" : (_character.mana > 50 ? "a gentle" : (_character.mana > 25 ? "a strained" : "a headache-inducing")))));
            unsafeExec("{0}Use({1})".format(_furniture.id, _character.id));
        }
        else {
            Content.add("Pressing your {0} to the mirror, you feel its smooth and cold surface.".format(_character.getHand()));
        }
    }
    else {
        unsafeExec("{0}Use({1})".format(_furniture.id, _character.id));
    }
}
function furnitureInteractSit(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;

    if (characterSit(_character, _furniture))
        unsafeExec("{0}Sit({1})".format(_furniture.id, _character.id));
    
    runLastMenu();
}
function furnitureInteractLay(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;

    if (characterLay(_character, _furniture))
        unsafeExec("{0}Lay({1})".format(_furniture.id, _character.id));
    
    runLastMenu();
}
function furnitureInteractSleep(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    

    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;


    if (debug) console.log("Attempting to sleep in {0}".format(_furniture.id));

    if (characterSleep(_character, _furniture))
        unsafeExec("{0}Sleep({1})".format(_furniture.id, _character.id));

    if (_character == player)
        _character.removeCurrentAction("sleep");
    
    runLastMenu();
}
function furnitureInteractLook(_furniture, _character = player) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;


    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;


    unsafeExec("{0}Look({1})".format(_furniture.id, _character.id));
}
function furnitureInteractSex(_furniture, _characterA = player, _characterB = undefined) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_characterA instanceof Character))
        _characterA = charactersIndexes.has(_characterA) ? charactersIndexes.get(_characterA) : undefined;
    if (!(_characterB instanceof Character))
        _characterB = charactersIndexes.has(_characterB) ? charactersIndexes.get(_characterB) : undefined;


    if (!(_furniture instanceof Furniture) || !(_characterA instanceof Character))
        return;

    if (characterSex(_characterA, _characterB, _furniture))
        unsafeExec("{0}Sex({1},{2})".format(_furniture.id, _characterA.id, (_characterB instanceof Character ? _characterB.id : undefined)));
}

function itemInteract(_itemInstance, _entity = player, _clearContent = false, _clearMenu = true) {
    if (!(_entity instanceof Entity)) {
        if (charactersIndexes.has(_entity))
            _entity = charactersIndexes.get(_entity);
        else if (furnitureIndexes.has(_entity))
            _entity = furnitureIndexes.get(_entity);
        else if (itemsIndexes.has(_entity))
            _entity = itemsIndexes.get(_entity);
        else
            return undefined;
    }

    if (!(_itemInstance instanceof ItemInstance)) {
        _itemInstance = _entity.getItem(_itemInstance);
        if (typeof _itemInstance == "undefined") return undefined;
    }

    if (enablePopups) {}
    else {
        if (_itemInstance.item.description != undefined && _itemInstance.item.description.length > 0 && !_scenesViewedThisWindow.has("itemInteract"))
            Content.add("<p>{0} look{1} at {2}.</p>".format(subjectPronoun(true).capitalize(), pov == 3 ? "s" : "", _itemInstance.item.toString()));

        lastMenu = "itemInteract('{0}', '{1}', false, true)".format(_itemInstance.id, _entity.id);

        Menu.clear();
        _scenesViewedThisWindow.add("itemInteract");
        if (_entity instanceof Character)
            Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteractOpen({0}, false, true, false)".format(_entity.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0} Inventory".format(_entity.singularPossessiveName()));
        else if (_entity instanceof Furniture)
            Menu.setOption((Menu.useWideMenu ? 9 : 7), "furnitureInteractOpen({0}, false, true, false)".format(_entity.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0} Inventory".format(_entity.name));
        else if (_entity instanceof Item)
            Menu.setOption((Menu.useWideMenu ? 9 : 7), "itemInteractOpen({0}, false, false)".format(_entity.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0} Pockets".format(_entity.name));
        
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
        
        _itemInstance.item.availableActions.forEach(function(_action) {
            if (kActionTypes.has(_action)) {
                switch(_action) {
                    case "use" : {
                        !(_itemInstance.item instanceof Clothing) && Menu.addOption("itemInteractUse('{0}', '{1}')".format(this.id, _entity.id), "Use {0}".format(this.item.name));
                        break;
                    }
                    case "put" : {
                        !(_entity instanceof Character) && Menu.addOption("itemInteractPut('{0}', '{1}')".format(this.id, _entity.id), "Put {0}".format(this.item.name));
                        break;
                    }
                    case "hold" : {
                        if (_entity.holding(_itemInstance))
                            _entity instanceof Character && Menu.addOption("itemInteractRelease('{0}', '{1}')".format(this.id, _entity.id), "Release {0}".format(this.item.name));
                        else
                            _entity instanceof Character && Menu.addOption("itemInteractHold('{0}', '{1}')".format(this.id, _entity.id), "Hold {0}".format(this.item.name));
                        break;
                    }
                    case "wear" : {
                        _itemInstance.item instanceof Clothing && _entity instanceof Character && Menu.addOption("itemInteractWear('{0}', '{1}')".format(this.id, _entity.id), "{0} {1}".format((_entity.wearing(_itemInstance) ? "Take off" : "Wear"), this.item.name));
                        break;
                    }
                    case "masturbate" : {
                        _entity instanceof Character && Menu.addOption("itemInteractMasturbate('{0}', '{1}')".format(this.id, _entity.id), "Masturbate with {0}".format(this.item.name));
                        break;
                    }
                    case "consume" : {
                        Menu.addOption("itemInteractConsume('{0}', '{1}')".format(this.id, _entity.id), "{1} {0}".format(this.item.name, this.item.type == "food" ? "Eat" : this.item.type == "drink" ? "Drink" : "Apply"));
                        break;
                    }
                }
            }
        }, _itemInstance);
        Menu.generate();
    }

    return true;
}
function itemInteractUse(_itemInstance, _character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_character instanceof Character))
        return undefined;

    if (!(_itemInstance instanceof ItemInstance)) {
        _itemInstance = _character.getItem(_itemInstance);
        if (typeof _itemInstance == "undefined") return undefined;
    }

    return unsafeExec("{0}Use({1})".format(_itemInstance.item.id, player.id));
}
/**
 * Item is taken from Character and Put into the Entity; addItem for non-Character(s)
 * @param  {Item} _item       [description]
 * @param  {Character} _characterA [description]
 * @param  {Entity} _entityB    [description]
 * @return {Boolean}             [description]
 */
function itemInteractPut(_itemInstance, _characterA = player, _entityB = undefined) {
    if (!(_characterA instanceof Character))
        _characterA = charactersIndexes.has(_characterA) ? charactersIndexes.get(_characterA) : undefined;
    if (!(_entityB instanceof Entity))
        _entityB = entityIndexes.has(_entityB) ? entityIndexes.get(_entityB) : undefined;

    if (!(_characterA instanceof Character))
        return undefined;

    if (!(_itemInstance instanceof ItemInstance)) {
        _itemInstance = _characterA.getItem(_itemInstance);
        if (typeof _itemInstance == "undefined") return undefined;
    }

    _characterA.removeItem(_itemInstance);
    _entityB.addItem(_itemInstance);

    return true;
}
/**
 * Item is Taken from Character and Put into the Entity; addItem for Character(s)
 * @param  {Item} _item       [description]
 * @param  {Character} _characterA [description]
 * @param  {Entity} _entityB    [description]
 * @return {Boolean}             [description]
 */
function itemInteractGive(_itemInstance, _characterA = player, _entityB = undefined) {
    if (!(_characterA instanceof Character))
        _characterA = charactersIndexes.has(_characterA) ? charactersIndexes.get(_characterA) : undefined;
    if (!(_entityB instanceof Entity))
        _entityB = entityIndexes.has(_entityB) ? entityIndexes.get(_entityB) : undefined;

    if (!(_characterA instanceof Character))
        return;

    if (!(_itemInstance instanceof ItemInstance)) {
        _itemInstance = _characterA.getItem(_itemInstance);
        if (typeof _itemInstance == "undefined") return undefined;
    }

    _characterA.removeItem(_itemInstance);
    _entityB.addItem(_itemInstance);

    return true;
}
/**
 * Item is Given to Character after being Taken from Entity
 * @param  {Item} _item       [description]
 * @param  {Character} _characterA [description]
 * @param  {Entity} _entityB    [description]
 * @return {Boolean}             [description]
 */
function itemInteractTake(_itemInstance, _characterA = player, _entityB = undefined) {
    if (!(_characterA instanceof Character))
        _characterA = charactersIndexes.has(_characterA) ? charactersIndexes.get(_characterA) : undefined;
    if (!(_entityB instanceof Entity))
        _entityB = entityIndexes.has(_entityB) ? entityIndexes.get(_entityB) : undefined;

    if (!(_characterA instanceof Character))
        return;

    if (!(_itemInstance instanceof ItemInstance)) {
        _itemInstance = _characterA.getItem(_itemInstance);
        if (typeof _itemInstance == "undefined") return undefined;
    }

    _entityB.removeItem(_item);
    _characterA.addItem(_item);

    return true;
}
function itemInteractHold(_itemInstance, _character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_character instanceof Character))
        return;

    if (!(_itemInstance instanceof ItemInstance)) {
        _itemInstance = _character.getItem(_itemInstance);
        if (typeof _itemInstance == "undefined") return undefined;
    }

    _character.wearing(_itemInstance) && _character.takeOff(_itemInstance);
    if (_character.addHeldItem(_itemInstance))
        unsafeExec("{0}Hold({1})".format(_itemInstance.item.id, _character.id));

    if (enablePopups) {}
    else
        runLastMenu();
    return true;
}
function itemInteractRelease(_itemInstance, _character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_character instanceof Character))
        return;

    if (!(_itemInstance instanceof ItemInstance)) {
        _itemInstance = _character.getItem(_itemInstance);
        if (typeof _itemInstance == "undefined") return undefined;
    }

    if (_character.removeHeldItem(_itemInstance))
        unsafeExec("{0}Release({1})".format(_itemInstance.item.id, _character.id));

    if (enablePopups) {}
    else
        runLastMenu();
    return true;
}
function itemInteractWear(_itemInstance, _character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_character instanceof Character))
        return;

    if (!(_itemInstance instanceof ItemInstance)) {
        _itemInstance = _character.getItem(_itemInstance);
        if (typeof _itemInstance == "undefined") return undefined;
    }

    _character.wearing(_itemInstance) ? _character.disrobe(_itemInstance) : _character.wear(_itemInstance);
    if (enablePopups) {}
    else
        itemInteract(_itemInstance, _character);

    return true;
}
function itemInteractDisrobe(_itemInstance, _character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_character instanceof Character))
        return;

    if (!(_itemInstance instanceof ItemInstance)) {
        _itemInstance = _character.getItem(_itemInstance);
        if (typeof _itemInstance == "undefined") return undefined;
    }

    if (_character.wearing(_itemInstance))
        _character.disrobe(_itemInstance);
    if (enablePopups) {}
    else
        itemInteract(_itemInstance, _character);

    return true;
}
function itemInteractLook(_itemInstance, _character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_itemInstance instanceof ItemInstance)) {
        _itemInstance = _character.getItem(_itemInstance);
        if (typeof _itemInstance == "undefined") return undefined;
    }

    if (enablePopups) {}
    else
        Content.add(_itemInstance.description);

    return true;
}
function itemInteractAttack(_itemInstance, _character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_character instanceof Character))
        return;

    if (!(_itemInstance instanceof ItemInstance)) {
        _itemInstance = _character.getItem(_itemInstance);
        if (typeof _itemInstance == "undefined") return undefined;
    }

    return true;
}
function itemInteractSex(_itemInstance, _character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_character instanceof Character))
        return;

    if (!(_itemInstance instanceof ItemInstance)) {
        _itemInstance = _character.getItem(_itemInstance);
        if (typeof _itemInstance == "undefined") return undefined;
    }

    if (enablePopups) {}
    else
        itemInteract(_itemInstance, _character);

    return true;
}
function itemInteractMasturbate(_itemInstance, _character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_character instanceof Character))
        return;

    if (!(_itemInstance instanceof ItemInstance)) {
        _itemInstance = _character.getItem(_itemInstance);
        if (typeof _itemInstance == "undefined") return undefined;
    }

    _character.wearing(_itemInstance) && _character.takeOff(_itemInstance);
    if (enablePopups) {}
    else
        itemInteract(_itemInstance, _character);

    return true;
}

function spellInteract(_spell, _character = player, _clearContent = false, _clearMenu = true) {
    if (!(_spell instanceof Spell)) {
        if (spellsIndexes.has(_spell))
            _spell = spellsIndexes.get(_spell);
        else
            return undefined;
    }
    if (!(_character instanceof Character)) {
        if (charactersIndexes.has(_character))
            _character = charactersIndexes.get(_character);
        else
            return undefined;
    }

    lastMenu = "spellInteract('{0}', '{1}', false, true)".format(_spell.id, _character.id);

    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "spellMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Spells");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(0)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    switch (_spell.id) {
        case "spellLevitate" : {
            break;
        }
        case "spellTeleport" : {
            break;
        }
        case "spellUnlock" : {
            _character.room.roomsOptions.forEach(function(_options, _room) {
                if (_options.isLocked) {
                    Menu.addOption(
                        "spellInteractCast({0}, {1})".format(_spell.id, _room.id),
                        _room.location != player.room.location ? _room.location.name : _room.name,
                        "{0} {1}".format(_spell.name, _room.location != player.room.location ? _room.location.name : _room.name),
                        undefined,
                        undefined,
                        "btn-mana"
                    );
                }
            });
            break;
        }
        case "spellImbue" : {
            break;
        }
        case "spellMirrorOpen" : {}
        case "spellMirrorWalk" : {}
        case "spellMirrorLook" : {}
        case "spellMirror*" : {

            break;
        }
        case "spellCharacterSleep" : {}
        case "spellCharacterSummon" : {}
        case "spellCharacterLust" : {}
        case "spellCharacterRut" : {}
        case "spellCharacterTempDisposition" : {}
        case "spellCharacterGradualDisposition" : {}
        case "spellCharacterCompel" : {}
        case "spellCharacterDominate" : {}
        case "spellCharacterPossess" : {}
        case "spellCharacter*" : {
            Title.clear();
            Title.set(
                "Spell Targets", 
                _spell.image, 
                _spell.name, 
                "Spells"
            );

            _character.room.characters.forEach(function(__character) {
                if (__character == player || __character.isBewitched())
                    return undefined;
                Menu.addOption(
                    "spellInteractCast({0}, {1})".format(_spell.id, __character.id),
                    __character.name,
                    "{0} {1}".format(_spell.name, __character.name),
                    undefined,
                    undefined,
                    "btn-mana"
                );
            });
            break;
        }
        default : {

        }
    }
    Menu.generate();
}
function spellInteractCast(_spell, _entity) {
    if (debug) console.log("Running spellInteractCast...");
    if (!(_spell instanceof Spell)) {
        if (debug) console.log("  Looking for Spell");
        if (spellsIndexes.has(_spell))
            _spell = spellsIndexes.get(_spell);
        else
            return undefined;
    }
    if (!(_entity instanceof Entity)) {
        if (debug) console.log("  Looking for Entity");
        if (entityIndexes.has(_entity))
            _entity = entityIndexes.get(_entity);
        else if (_entity instanceof Room) {}
        else if (roomsIndexes.has(_entity)) {
            _entity = roomsIndexes.get(_entity);
        }
        else
            return undefined;
    }
    if (debug) console.log("  with {0}, {1}".format(_spell.id, _entity.id));

    if (unsafeExec("{0}Cast({1}, player)".format(_spell.id, _entity.id)))
        runLastMenu();
    else
        return false;
}

function phoneInteract(_phone, _clearContent = false, _clearMenu = true) {
    if (!(_phone instanceof Phone))
        _phone = phonesIndexes.has(_phone) ? phonesIndexes.get(_phone) : undefined;
    if (!(_phone instanceof Phone))
        return undefined;

    Title.clear();
    Title.set(
        "Home Screen", 
        undefined, 
        player.phone.name, 
        player.name
    );

    if (enablePopups) {

    }
    else {
        if (_clearContent) {
            if (_phone.owner == player)
                Content.add("<p>You check your phone.</p>");
            else
                Content.add("<p>You check {0} phone.</p>".format(_phone.owner.singularPossessiveName()));
        }

        Menu.clear();
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(0)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
        Menu.addOption("textMessageInteract({0}, 0)".format(_phone.id), "Received Messages");
        Menu.addOption("textMessageInteract({0}, 1)".format(_phone.id), "Read Messages");
        Menu.addOption("textMessageInteract({0}, 2)".format(_phone.id), "Sent Messages");
        Menu.generate();
    }
}
function textMessageInteract(_phone, _messageCategory) {
    var _title = "";
    var _messageType = "";

    if (_messageCategory == 1) {
        _title = "Read Messages";
        _messageType = _phone.readMessages;
    }
    else if (_messageCategory == 2) {
        _title = "Sent Messages";
        _messageType = _phone.sentMessages;
    }
    else {
        _messageCategory = 0;
        _title = "Received Messages";
        _messageType = _phone.receivedMessages;
    }

    lastMenu = "textMessageInteract('{0}', '{1}'')".format(_phone.id, _messageCategory);

    Title.clear();
    Title.set(
        _title, 
        undefined, 
        player.phone.name, 
        player.name
    );

    Menu.clear();
    if (_messageCategory == 2) {
        _messageType.forEach(function(_textMessage) {
            Menu.addOption("textMessageInteractRead({0}, '{1}')".format(_phone.id, _textMessage.id), "To " + _textMessage.to, _textMessage.time);
        });
    }
    else {
        _messageType.forEach(function(_textMessage) {
            Menu.addOption("textMessageInteractRead({0}, '{1}')".format(_phone.id, _textMessage.id), "From " + _textMessage.from, _textMessage.time);
        });
    }
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "phoneInteract({0})".format(_phone.id), "Check Phone");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(0)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.generate();
}
function textMessageInteractRead(_phone, _textMessage) {
    if (!(_phone instanceof Phone))
        _phone = phonesIndexes.has(_phone) ? phonesIndexes.get(_phone) : undefined;
    if (!(_textMessage instanceof TextMessage))
        _textMessage = textMessageIndexes.has(_textMessage) ? textMessageIndexes.get(_textMessage) : undefined;
    if (!(_phone instanceof Phone) || !(_textMessage instanceof TextMessage))
        return undefined;

    _phone.readMessage(_textMessage);
    Content.add("<blockquote class='small'><div>{0}</div><div>From: {1}</div><div>To: {2}</div><p>{3}</p></blockquote>".format(_textMessage.time, _textMessage.from, _textMessage.to, _textMessage.message));

    runLastMenu();
}

function webSiteInteract(_webSite = undefined) {
    if (!(_webSite instanceof WebSite))
        _webSite = webSiteIndexes.has(_webSite) ? webSiteIndexes.get(_webSite) : undefined;
    
    if (typeof _webSite == "undefined")
        document.getElementById("webModalBody").innerHTML = "404 Page Not Found.";
    else
        document.getElementById("webModalBody").innerHTML = _webSite.id;
}