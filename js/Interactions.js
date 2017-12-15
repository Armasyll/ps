function roomInteract(_room, _clearContent = undefined, _showBaseMenu = true) {
    if (!(_room instanceof Room))
        _room = roomsIndexes.get(_room);

    if (player.room.isLocked(_room) && !player.hasKey(_room)) {
        Content.add("<p>{0} is locked from this side.</p>".format(_room.name));
        return undefined;
    }

    if (player.room !== _room) {
        if (debug) console.log("Previous Room: {0}".format(player.room.id));
        setPlayerRoom(_room);
        if (debug) console.log("Current Room: {0}".format(player.room.id));
    }

    Title.set(
        (player.room.isOwner(player) ? "Your {0}".format((player.room.type !== 'undefined' ? player.room.type : "room").capitalize()) : player.room.name),
        undefined,
        (typeof player.room.location !== 'undefined' ? (player.room.location == player.room.cell.location ? player.room.cell.name : player.room.location.name) : "&nbsp;"),
        (typeof player.room.cell.location !== 'undefined' ? player.room.cell.location.name : "&nbsp;")
    );

    var _previousRoomDifferent = (!(player.previousRoom instanceof Room) || !(player.previousRoom.sid == player.room.sid));

    if (_clearContent != false && _previousRoomDifferent)
        Content.clear();
    
    Menu.showingBaseMenu = _showBaseMenu == true;

    if (Menu.showingBaseMenu) {
        if (debug) console.log("\tBase Menu and Room for ".format(_room.sid));
        unsafeExec("{0}Interact({1})".format(_room.sid, _previousRoomDifferent && !scenesViewedThisWindow.has(player.previousRoom)));

        scenesViewedThisWindow.add(player.previousRoom);

        baseMenu(0, 1);
        
        scenesViewedThisWindow.clear();
    }
    else {
        Menu.clear();
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(false)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

        scenesViewedThisWindow.add(player.previousRoom);

        if (debug) console.log("\tRoom for {0}".format(_room.sid));
        lastMenu = "roomInteract({0}, false)".format(_room.sid);
        
        unsafeExec("{0}Interact({1})".format(_room.sid, _previousRoomDifferent && !scenesViewedThisWindow.has(player.previousRoom)));

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

function characterInteract(_character, _clearContent = true) {
    if (!_character.characterDisposition.has(player))
        _character.addNewCharacterDispositionFor(player);
    if (!player.characterDisposition.has(_character))
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

        unsafeExec("{0}{1}()".format(player.room.sid, _character.id.capitalize()));
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

    unsafeExec("{0}Interact()".format(_character.id));

    Menu.generate();
}
function characterInteractOpen(_character, _clearContent = true, _switch = false) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : player;

    if (usePopups) {
        if (_character != player) {
            $("#dualInventoryTab-characterA").html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(player.image));
            $("#dualInventoryTab-characterB").html("<img style='height:2em' src='{0}' alt=''/>{1} Inventory".format(_character.image, _character.name + (_character.name.slice(-1) == 's' ? "'" : "'s")));
            $("#dualInventoryContent-characterA").html(_generateEntityItemsGraphicalList(player, _character, true));
            $("#dualInventoryContent-characterB").html(_generateEntityItemsGraphicalList(_character, player, true));
            $("#dualInventoryModal").modal("show");
        }
        else {
            $("#personalInventoryModal-title").html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(_character.image));
            $("#personalInventoryModal-body").html(_generateEntityItemsGraphicalList(_character, undefined, false));
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
        
        if (_character != player) {
            _characterB.items.forEach(function(_item) {
                Menu.addOption("_generateEntityItemsMenuMove({0}, {1}, {2}, false, {3})".format(_item.id, _characterB.id, _characterA.id, _switch), (_switch ? "Put " : "Take ") + _item.name, _item.description, undefined, undefined, undefined, undefined, "btn-primary");
            }, this);
        }
        else {
            _characterB.items.forEach(function(_item) {
                Menu.addOption("itemInteract({0})".format(_item.id), "<span class='hidden-md hidden-sm hidden-xs'>Interact with </span>{0}".format(_item.name), _item.description, undefined, undefined, undefined, undefined, "btn-primary");
            }, this);
        }
        Menu.generate();
    }
}
function characterInteractTalk(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);


    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    unsafeExec("{0}Talk()".format(_character.id));


    Menu.generate();
}
function characterInteractSex(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);

    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    unsafeExec("{0}Sex()".format(_character.id));

    Menu.generate();
}
function characterInteractFollow(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);

    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    unsafeExec("{0}Follow()".format(_character.id));

    Menu.generate();
}
function characterInteractAttack(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);

    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    unsafeExec("{0}Attack()".format(_character.id));

    Menu.generate();
}
function characterInteractStay(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);

    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteract({0}, false, true)".format(_character.id), "Back");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

    unsafeExec("{0}Stay()".format(_character.id));

    Menu.generate();
}

function furnitureInteract(_furniture, _clearContent = false, _clearMenu = true) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);

    lastMenu = "furnitureInteract({0},false,true)".format(_furniture.id);

    if (player.furniture != _furniture)
        Content.add("<p>You decide to look over the {0}, and you see that it has {1} inside of it.</p>".format(_furniture.type, (_furniture.items.size == 0 ? "no items" : (_furniture.items.size == 1 ? "an item" : "a few items"))));

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
            Menu.addOption("furnitureInteractOpen({0})".format(_furniture.id), "Open", (_furniture.items.size > 0 ? "There are items inside" : ""));

            _furniture.availableActions.forEach(function(_action) {
                if (actionTypes.has(_action)) {
                    switch(_action) {
                        case "use" : {
                            if (_furniture.type == "mirror" && player.mana > 0)
                                Menu.addOption("furnitureInteractUse({0})".format(this.id), "Use {0}".format(this.name), undefined, undefined, undefined, undefined, undefined, "btn-mana");
                            else
                                Menu.addOption("furnitureInteractUse({0})".format(this.id), "Use {0}".format(this.name));
                            break;
                        }
                        case "sit" : {
                            if (!(player.furniture == this) || (player.furniture == this && !player.currentActions.has("sit")))
                                Menu.addOption("furnitureInteractSit({0})".format(this.id), "Sit on {0}".format(this.name));
                            break;
                        }
                        case "lay" : {
                            if (!(player.furniture == this) || (player.furniture == this && !player.currentActions.has("lay")))
                                Menu.addOption("furnitureInteractLay({0})".format(this.id), "Lay in {0}".format(this.name));
                            break;
                        }
                        case "sleep" : {
                            if (!(player.furniture == this) || (player.furniture == this && !player.currentActions.has("sleep")))
                                Menu.addOption("furnitureInteractSleep({0})".format(this.id), "Sleep in {0}".format(this.name));
                            break;
                        }
                        case "sex" : {
                            if (!(player.furniture == this) || (player.furniture == this && !player.currentActions.has("sex")))
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
        Menu.setOption((Menu.useWideMenu ? 4 : 3), "furnitureInteractOpen({0}, false, {1})".format(_furniture.id, !_switch), "Switch Inventory", "to {0}".format(_characterA == player ? "yours" : _characterA.name));
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "furnitureInteract({0}, false, true)".format(_characterB.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0}".format(_characterB.name));
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

        _characterB.items.forEach(function(_item) {
            Menu.addOption("_generateEntityItemsMenuMove({0}, {1}, {2}, false, {3})".format(_item.id, _characterB.id, _characterA.id, _switch), (_switch ? "Put " : "Take ") + _item.name, _item.description, undefined, undefined, undefined, undefined, "btn-primary");
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
function furnitureInteractMasturbate(_furniture, _character) {
    if (!(_furniture instanceof Furniture))
        _furniture = furnitureIndexes.get(_furniture);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;


    if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
        return;

    if (characterSex(_character, _furniture))
        unsafeExec("{0}Masturbate({1})".format(_furniture.id, _character.id));
}

function itemInteract(_item, _entity = player, _clearContent = false, _clearMenu = true) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_entity instanceof Entity)) {
        if (charactersIndexes.has(_entity))
            _entity = charactersIndexes.get(_entity);
        else if (furnitureIndexes.has(_entity))
            _entity = furnitureIndexes.get(_entity);
        else if (itemsIndexes.has(_entity))
            _entity = itemsIndexes.get(_entity);
        else
            _entity = undefined;
    }
    
    if (!(_item instanceof Item) || !(_entity instanceof Entity))
        return;

    Menu.clear();
    if (_entity instanceof Character)
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "characterInteractOpen({0}, false, false)".format(_entity.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0} Inventory".format(_entity.singularPossesiveName()));
    else if (_entity instanceof Furniture)
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "furnitureInteractOpen({0}, false, false)".format(_entity.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0} Inventory".format(_entity.name));
    else if (_entity instanceof Item)
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "itemInteractOpen({0}, false, false)".format(_entity.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0} Pockets".format(_entity.name));
    
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    _item.availableActions.forEach(function(_action) {
        if (actionTypes.has(_action)) {
            switch(_action) {
                case "use" : {
                    !(_item instanceof Clothing) && Menu.addOption("itemInteractUse({0}, {1})".format(this.id, _entity.id), "Use {0}".format(this.name));
                    break;
                }
                case "put" : {
                    !(_entity instanceof Character) && Menu.addOption("itemInteractPut({0}, {1})".format(this.id, _entity.id), "Put {0}".format(this.name));
                    break;
                }
                case "hold" : {
                    _entity instanceof Character && Menu.addOption("itemInteractHold({0}, {1})".format(this.id, _entity.id), "Hold {0}".format(this.name));
                    break;
                }
                case "wear" : {
                    _item instanceof Clothing && _entity instanceof Character && Menu.addOption("itemInteractWear({0}, {1})".format(this.id, _entity.id), "{0} {1}".format((_entity.wearing(_item) ? "Take off" : "Wear"), this.name));
                    break;
                }
                case "masturbate" : {
                    _entity instanceof Character && Menu.addOption("itemInteractMasturbate({0}, {1})".format(this.id, _entity.id), "Masturbate with {0}".format(this.name));
                    break;
                }
                case "consume" : {
                    Menu.addOption("itemInteractConsume({0}, {1})".format(this.id, _entity.id), "{1} {0}".format(this.name, this.type == "food" ? "Eat" : this.type == "drink" ? "Drink" : "Apply"));
                    break;
                }
            }
        }
    }, _item);
    Menu.generate();
}
function itemInteractUse(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;

    itemInteract(_item, _character);
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

    _character.wearing(_item) && _character.takeOff(_item);
    itemInteract(_item, _character);
}
function itemInteractWear(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;

    _character.wearing(_item) ? _character.takeOff(_item) : _character.putOn(_item);
    itemInteract(_item, _character);
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

    itemInteract(_item, _character);
}
function itemInteractMasturbate(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;

    _character.wearing(_item) && _character.takeOff(_item);
    itemInteract(_item, _character);
}

function webSiteInteract(_webSite = undefined) {
    if (!(_webSite instanceof WebSite))
        _webSite = webSiteIndexes.has(_webSite) ? webSiteIndexes.get(_webSite) : undefined;
    
    if (typeof _webSite == "undefined")
        document.getElementById("webModalBody").innerHTML = "404 Page Not Found.";
    else
        document.getElementById("webModalBody").innerHTML = _webSite.id;
}