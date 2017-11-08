function mainMenu() {
    Menu.addOption("start()", "Enter", "You meet the conditions above.");
    Menu.generate();
}
function baseMenu(_clearContent = false, _clearMenu = true) {
    lastMenu = "baseMenu({0}, {1})".format(_clearContent, _clearMenu);
    Menu.showingBaseMenu = true;
    
    if (!(player.room instanceof Room))
        movePlayerToRoom(limbo);
    
    if (_clearContent) {
    Title.clear();
        Title.set(
            (player.room.isOwner(player) ? "Your "  + (player.room.type !== 'undefined' ? RoomTypeIdNames.get(player.room.type) : "room").capitalize() : player.room.name), 
            undefined, 
            (typeof player.room.location !== 'undefined' ? (player.room.location == player.room.cell.location ? player.room.cell.name : player.room.location.name) : "&nbsp;"), 
            (typeof player.room.cell.location !== 'undefined' ? player.room.cell.location.name : "&nbsp;")
        );
    }
    
    if (_clearMenu) {
        Menu.clear();
        exploreMenu();
        Menu.setOption(0, "roomInteract({0}, false, false, false)".format(player.room.id), "Explore " + (player.room.owner == player ? "your " + player.room.typeName() : player.room.name));
        Menu.setOption(1, "personalCharacterMenu()", "Personal Menu");
        if (player.room.characters.size == 2) {
            _character = undefined;
            player.room.characters.forEach(function(character) {
                if (character != player)
                    _character = character;
            });
            Menu.setOption(2, "characterInteract(" + _character.id + ")", "Interact with " + _character.name, (_character.age + " year old " + _character.grammaticalGender() + "."));
        }
        else if (player.room.characters.size > 1)
            Menu.setOption(2, "localCharactersMenu()", "Interact with those near you.");
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "tick('1m', true)", "Wait");
        Menu.generate();
    }
}
function personalCharacterMenu() {
    lastMenu = "personalCharacterMenu()";
    
    Title.set("Interact with yourself", player.image);
    
    if (player['ateCharlie'])
        Content.add("You have blood caked across your face and dripping down your jaw, as well as bits of cream-coloured fur and red chunks of meat. You are very full.");
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(0)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.setOption((Menu.useWideMenu ? 13 : 10), "$('#optionsModal').modal()", "Options");
    Menu.addOption("getAppearance(player, 1)", "Appearance");
    Menu.addOption("characterInteractOpen()", "Inventory");
    Menu.generate();
}
function exploreMenu() {
    Menu.showingBaseMenu = true;
    
    if (player.room.attachedRooms.has(0) && player.room.attachedRooms.get(0) instanceof Room)
        roomNorth = player.room.attachedRooms.get(0);
    else
        roomNorth = undefined;
    
    if (player.room.attachedRooms.has(1) && player.room.attachedRooms.get(1) instanceof Room)
        roomEast = player.room.attachedRooms.get(1);
    else
        roomEast = undefined;
    
    if (player.room.attachedRooms.has(2) && player.room.attachedRooms.get(2) instanceof Room)
        roomSouth = player.room.attachedRooms.get(2);
    else
        roomSouth = undefined;
    
    if (player.room.attachedRooms.has(3) && player.room.attachedRooms.get(3) instanceof Room)
        roomWest = player.room.attachedRooms.get(3);
    else
        roomWest = undefined;
    
    if (player.room.attachedRooms.has(4) && player.room.attachedRooms.get(4) instanceof Room)
        roomDown = player.room.attachedRooms.get(4);
    else
        roomDown = undefined;
    
    if (player.room.attachedRooms.has(5) && player.room.attachedRooms.get(5) instanceof Room)
        roomUp = player.room.attachedRooms.get(5);
    else
        roomUp = undefined;
    
    Menu.setExplorationOptions(roomNorth, roomEast, roomSouth, roomWest, roomDown, roomUp);
}
function localCharactersMenu() {
    lastMenu = "localCharactersMenu()";
    
    Title.set("Interact with those near you.");
    
    var _blob = ("You are currently in " + player.room.name);
    
    if (player.room.characters.size > 1) {
        _blob += (" along with ");
        
        tempArray = Array.from(player.room.characters).remove(player);
        if (tempArray.length == 1)
            _blob += (tempArray[0].toString() + ".");
        else {
            // Lazy
            for (i = 0; i < tempArray.length - 1; i++) {
                _blob += (tempArray[i]);
                if (tempArray.length > 2)
                    _blob += (", ");
            }
            _blob += (" and " + tempArray[tempArray.length - 1] + ".");
        }
    }
    
    Content.add("<p>" + _blob + "</p>");
    
    Menu.clear();
    for (var [_characterID, _character] of player.room.characters.entries()) {
        if (_character != player)
            Menu.addOption("characterInteract(" + _character.id + ")", _character.name, (_character.age + " year old " + _character.grammaticalGender() + "."));
    }
    
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.generate();
}

/*
    Minimum Menu Items
*/
function debugMenu() {
    $('#gameOptionsModal').modal('hide');
    
    clearContentAndMenu();
    
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.addOption("debugRoomInformation()", "Room Information");
    Menu.addOption("debugSwitchRoom()", "Switch Room");
    Menu.addOption("debugCharactersInformation()", "Characters Information");
    Menu.addOption("debugSwitchCharacter()", "Switch Character");
    Menu.addOption("debugBrowserInformation()", "Browser Information");
    Menu.addOption("debugMenuPopulate()", "Populate Menu", "with useless boxes");
    Menu.generate();
}
function debugRoomInformation() {
    _contentBody = "";
    _contentBody += ("<h4>Current Room:</h4> <ul><li>{0}</li></ul>".format(player.room.toString()));
    
    
    _contentBody += ("<h4>Attached Rooms ({0}):</h4> <ul>".format(player.room.attachedRooms.size));
    for (var [_roomID, _room] of player.room.attachedRooms.entries()) {
        _contentBody += ("<li>{0}</li>".format(_room.toString()));
    }
    _contentBody += ("</ul>");
    
    
    _contentBody += ("<h4>Characters in Current Room ({0}):</h4> <ul>".format(player.room.characters.size));
    for (var [_characterID, _character] of player.room.characters.entries()) {
        _contentBody += ("<li>{0} {1}</li>".format(_character.toString(), Array.from(_character.getCurrentActions())));
    }
    _contentBody += ("</ul>");
    
    
    _contentBody += ("<h4>Furniture in Current Room ({0}):</h4> <ul>".format(player.room.characters.size));
    for (var [_furnitureID, _furniture] of player.room.furniture.entries()) {
        _contentBody += ("<li>{0}".format(_furniture.toString()));
            _contentBody += ("<ul>");
                _contentBody += ("<li>Seating ({0}/{1})".format(_furniture.availableSeatingSpace(), _furniture.seatingSpace));
                    _contentBody += ("<ul>");
        _furniture.characters.forEach(function(_character) {
            _contentBody += "<li>{0} {1}</li>".format(_character.toString(), Array.from(_character.getCurrentActions()));
        }, this);
                    _contentBody += ("</ul>");
                _contentBody += ("</li>");
                _contentBody += ("<li>Storage ({0}/{1})".format(_furniture.items.size, _furniture.storageSpace));
                    _contentBody += ("<ul>");
        _furniture.items.forEach(function(_item) {
            _contentBody += "<li>{0}</li>".format(_item.toString());
        }, this);
                    _contentBody += ("</ul>");
                _contentBody += ("</li>");

            _contentBody += ("</ul>");
        _contentBody += ("</li>");
    }
    _contentBody += ("</ul>");
    
    
    Content.set(_contentBody);
}
function debugSwitchRoom() {
    clearContentAndMenu();
    
    roomsIndexes.forEach(function (_key, _val) {
        if (typeof window[_key.id + "Interact"] === 'function')
            Content.add(Menu.createButton("roomInteract(" + _key.id + ", true, true, true)", _key.name, _key.id, false));
    });
    
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "debugMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Debug");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.generate();
}
function debugCharactersInformation(_character = player) {
    Content.clear();
    Content.add("<h4>Current Character:</h4> <ul><li>" + player.name + "</li></ul>");
    
    
    Content.add("<h4>Current Clothes:</h4>");
    var _blob = "";
    
    var _clothingIndexes = new Map(clothingIndexes);
    
    var _clothingHatOptionsBlob = "";
    _clothingIndexes.forEach(function(_clothing) {
        if (_clothing.bodyPart == BodyPartNameIds.get("head")) {
            _clothingHatOptionsBlob += "<option value='{0}' {2}>{1}</option>".format(_clothing.id, _clothing.name, (_character.hasHat() && _character.getHat().id == _clothing.id ? "selected" : ""));
            _clothingIndexes.delete(_clothing.id);
        }
    }, this);
    
    var _clothingBraOptionsBlob = "";
    _clothingIndexes.forEach(function(_clothing) {
        if (_clothing.bodyPart == BodyPartNameIds.get("chest")) {
            _clothingBraOptionsBlob += "<option value='{0}' {2}>{1}</option>".format(_clothing.id, _clothing.name, (_character.hasBra() && _character.getBra().id == _clothing.id ? "selected" : ""));
            _clothingIndexes.delete(_clothing.id);
        }
    }, this);
    
    var _clothingShirtOptionsBlob = "";
    _clothingIndexes.forEach(function(_clothing) {
        if (_clothing.bodyPart == BodyPartNameIds.get("torso")) {
            _clothingShirtOptionsBlob += "<option value='{0}' {2}>{1}</option>".format(_clothing.id, _clothing.name, (_character.hasShirt() && _character.getShirt().id == _clothing.id ? "selected" : ""));
            _clothingIndexes.delete(_clothing.id);
        }
    }, this);
    
    var _clothingBeltOptionsBlob = "";
    _clothingIndexes.forEach(function(_clothing) {
        if (_clothing.bodyPart == BodyPartNameIds.get("waist")) {
            _clothingBeltOptionsBlob += "<option value='{0}' {2}>{1}</option>".format(_clothing.id, _clothing.name, (_character.hasBelt() && _character.getBelt().id == _clothing.id ? "selected" : ""));
            _clothingIndexes.delete(_clothing.id);
        }
    }, this);
    
    var _clothingUnderwearOptionsBlob = "";
    _clothingIndexes.forEach(function(_clothing) {
        if (_clothing.bodyPart == BodyPartNameIds.get("groin")) {
            _clothingUnderwearOptionsBlob += "<option value='{0}' {2}>{1}</option>".format(_clothing.id, _clothing.name, (_character.hasUnderwear() && _character.getUnderwear().id == _clothing.id ? "selected" : ""));
            _clothingIndexes.delete(_clothing.id);
        }
    }, this);
    
    var _clothingPantsOptionsBlob = "";
    _clothingIndexes.forEach(function(_clothing) {
        if (_clothing.bodyPart == BodyPartNameIds.get("legs")) {
            _clothingPantsOptionsBlob += "<option value='{0}' {2}>{1}</option>".format(_clothing.id, _clothing.name, (_character.hasPants() && _character.getPants().id == _clothing.id ? "selected" : ""));
            _clothingIndexes.delete(_clothing.id);
        }
    }, this);
    
    var _clothingShoesOptionsBlob = "";
    _clothingIndexes.forEach(function(_clothing) {
        if (_clothing.bodyPart == BodyPartNameIds.get("feet")) {
            _clothingShoesOptionsBlob += "<option value='{0}' {2}>{1}</option>".format(_clothing.id, _clothing.name, (_character.hasShoes() && _character.getShoes().id == _clothing.id ? "selected" : ""));
            _clothingIndexes.delete(_clothing.id);
        }
    }, this);
    
    _blob += "<table class='table'>";
    _blob += "<tr><td>Hat</td><td><select class='changeClothing' data-character='{0}' data-clothingSlot='head' selected='{1}'><option value='undefined'>Nothing</option>{2}</select></td></tr>".format(player.id, (player.hasHat() ? player.getHat().id : "undefined"), (_clothingHatOptionsBlob));
    _blob += "<tr><td>Bra</td><td><select class='changeClothing' data-character='{0}' data-clothingSlot='chest' selected='{1}'><option value='undefined'>Nothing</option>{2}</select></td></tr>".format(player.id, (player.hasBra() ? player.getBra().id : "undefined"), (_clothingBraOptionsBlob));
    _blob += "<tr><td>Shirt</td><td><select class='changeClothing' data-character='{0}' data-clothingSlot='torso' selected='{1}'><option value='undefined'>Nothing</option>{2}</select></td></tr>".format(player.id, (player.hasShirt() ? player.getShirt().id : "undefined"), (_clothingShirtOptionsBlob));
    _blob += "<tr><td>Belt</td><td><select class='changeClothing' data-character='{0}' data-clothingSlot='waist' selected='{1}'><option value='undefined'>Nothing</option>{2}</select></td></tr>".format(player.id, (player.hasBelt() ? player.getBelt().id : "undefined"), (_clothingBeltOptionsBlob));
    _blob += "<tr><td>Underwear</td><td><select class='changeClothing' data-character='{0}' data-clothingSlot='groin' selected='{1}'><option value='undefined'>Nothing</option>{2}</select></td></tr>".format(player.id, (player.hasUnderwear() ? player.getUnderwear().id : "undefined"), (_clothingUnderwearOptionsBlob));
    _blob += "<tr><td>Pants</td><td><select class='changeClothing' data-character='{0}' data-clothingSlot='legs' selected='{1}'><option value='undefined'>Nothing</option>{2}</select></td></tr>".format(player.id, (player.hasPants() ? player.getPants().id : "undefined"), (_clothingPantsOptionsBlob));
    _blob += "<tr><td>Shoes</td><td><select class='changeClothing' data-character='{0}' data-clothingSlot='feet' selected='{1}'><option value='undefined'>Nothing</option>{2}</select></td></tr>".format(player.id, (player.hasShoes() ? player.getShoes().id : "undefined"), (_clothingShoesOptionsBlob));
    _blob += "</table>";
    Content.add(_blob);
}
function debugModifyCharacter() {
    clearContentAndMenu();
}
function debugSwitchCharacter() {
    clearContentAndMenu();
    
    Content.add("<p>You are currently " + player.name + "</p>");
    i = 1;
    _blob = "";
    _blob += '<div class="btn-group btn-group-justified">';
    charactersIndexes.forEach(function (_key, _val) {
        _blob += Menu.createButton("switchCharacter(" + _key.id + ")", _key.name + " " + _key.surname, (_key.age + "/" + (_key.sex ? "F" : "M") + "/" + _key.speciesName().capitalize() + "/" + (typeof _key.room !== 'undefined' ? _key.room.name : "Limbo")), false);
        if (i % 4 == 0)
            _blob += '</div><div class="btn-group btn-group-justified">';
        i++;
    });
    _blob += '</div>';
    
    Content.add(_blob);
    
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "debugMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Debug");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "roomInteract(" + player.room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.generate();
}
function debugBrowserInformation() {
    Content.clear();
    
    Content.add("<blockquote>Window WidthxHeight : " + $(window).width() + "x" + $(window).height() + "</blockquote>");
}
function debugPrintUnassignedRooms() {
    Content.clear();
    Content.add("Rooms not assigned to grid:");
    
    _blob = "";
    _blob += "<u>";
    roomsIndexes.forEach(function(_room) {
        if (!_room.mappedToGrid)
            _blob += ("<ul>" + _room.id + "</ul>");
    });
    _blob += "</u>";
    
    Content.add(_blob);
}
function debugMenuPopulate() {
    Menu.setOption(0, "debugMenu()", "Debug Menu");
    for (var _i = 0; _i < 33; _i++) {
        Menu.addOption("debugMenu()", "Option {0}".format(_i))
    }
    Menu.generate();
}
function getAppearance(_character, _self = false) {
    Title.setTopImage(_character.image);
    
    _blob = "";
    
    if (_self)
        _blob += ("Your name is " + _character.toString() + ", ");
    else
        _blob += (_character.toString() + " is ");
    _blob += ("a " + _character.age + " year old ");
    if (_character.hasColouration())
        _blob += (_character.furColourA + "-coloured ");
    _blob += (_character.grammaticalGender() + ". ");
    
    if (_self)
        _blob += ("You're");
    else
        _blob += (_character.subjectPronoun().capitalize() + "'s");
    
    _blob += (" wearing a ");
    
    if (_character.hasShirt() && _character.hasPants()) {
        _blob += (_character.clothingTorso.toString() + ", and " + _character.clothingLegs.toString() + ".");
    }
    else if (_character.hasShirt() && !_character.hasPants() && _character.hasUnderwear()) {
        _blob += (_character.clothingTorso.toString() + ", no pants, and " + _character.clothingGroin.toString() + ".");
    }
    else if (_character.hasShirt() && !_character.hasPants() && !_character.hasUnderwear()) {
        _blob += (_character.clothingTorso.toString() + ", and nothing below the waste.");
    }
    else if (!_character.hasShirt() && _character.hasPants()) {
        if (_character.clothingLegs.plural)
            _blob += ("no shirt, but a pair of " + _character.clothingLegs.toString() + ".");
        else
            _blob += ("no shirt, but a " + _character.clothingLegs.toString() + ".");
    }
    else if (!_character.hasShirt() && !_character.hasPants() && _character.hasUnderwear()) {
        if (_character.clothingGroin.plural)
            _blob += ("nothing but a pair of " + _character.clothingGroin.toString() + ".");
        else
            _blob += "nothing by a {0}.".format(_character.clothingGroin.toString());
    }
    else {
        _blob += ("absolutely nothing.");
    }
    
    Content.add("<p>" + _blob + "</p>");
    
    Content.add("<p>Their disposition for themself: " + "Self(" + _character.philautia + "), Others(" + _character.agape + ")</p>");
    if (!_self && _character.disposition.has(player)) {
        Content.add("<p>Their disposition for you: " + _character.disposition.get(player).toString() + "</p>");
    }
    if (!_self && player.disposition.has(_character))
        Content.add("<p>Your disposition for them: " + player.disposition.get(_character).toString() + "</p>");
}
function start() {
    agreeTOS = true;
    Menu.showingBaseMenu = true;
    document.getElementById('gameControlsDisplay').innerHTML = '<div class="btn-group" role="group"><button class="btn" data-toggle="modal" data-target="#optionsModal"><small style="position:absolute; right:0px; top:-3px;">[O]</small><div class="trim">Options</div></button></div>' + document.getElementById('gameControlsDisplay').innerHTML;
    //document.getElementById('gameControlsDisplay').innerHTML += '<div class="btn-group" role="group"><button class="btn viewPersonalInventory"><small style="position:absolute; right:0px; top:-3px;">[I]</small><div class="trim">Inventory</div></button></div>';
    
    if (enableMinimap)
        Minimap.generateMapFromStartRoom(player.room);
    
    clearContentAndMenu();
    
    Content.add("Your name is " + player.toString() + ", a " + player.age + " year old " + (player.sex == 0 ? 'male' : 'female') + " " + player.speciesName() + ".<br/>");
    
    Menu.addOption("roomInteract({0}, true)".format(player.room.id), "Get a move on.");
    Menu.generate();
}
function quit() {
    clearContentAndMenu();
    close();
}
function switchCharacter(_character) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    if (player == _character)
        Content.add("<p>You are already " + player.toString() + "</p>");
    else {
        _pcPreviousRoom = player.room
        player = _character;
        if (!(player.room instanceof Room))
            movePlayerToRoom(limbo);
        player.sleeping = false;
        
        if (enableMinimap && player.room != _pcPreviousRoom) {
            Minimap.generateMapFromStartRoom(player.room);
        }
        
        debugSwitchCharacter();
    }
}