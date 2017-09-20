function mainMenu() {
    Menu.addOption("start()", "Enter", "You meet the conditions above.");
    Menu.generate();
}
function baseMenu(_clearContent = 0, _clearMenu = 1) {
    Menu.isExploring = false;
    
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
        Menu.setOption(0, "roomInteract(" + player.room.id + ")", "Explore " + (player.room.owner == player ? "your " + player.room.typeName() : player.room.name));
        /*if (player.room.rooms.size > 0)
            Menu.setOption(1, "exploreMenu()", "Explore your surroundings.");*/
        Menu.setOption(1, "personalCharacterMenu()", "Personal Menu");
        Menu.setOption(7, "tick('1m', true)", "Wait");
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
        Menu.generate();
    }
}
function personalCharacterMenu() {
    Title.set("Interact with yourself", player.image);
    
    if (player['ateCharlie'])
        Content.add("You have blood caked across your face and dripping down your jaw, as well as bits of cream-coloured fur and red chunks of meat. You are very full.");
    
    Menu.clear();
    Menu.setOption(10, "debugMenu()", "Debug Menu");
    Menu.setOption(11, "baseMenu(0)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.addOption("getAppearance(player, 1)", "Appearance");
    Menu.addOption("characterOpen()", "Inventory");
    Menu.generate();
}
function exploreMenu() {
    isExploring = true;
    
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
    
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.generate();
}

/*
    Minimum Menu Items
*/
function debugMenu() {
    $('#gameOptionsModal').modal('hide');
    
    clearContentAndMenu();
    
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.addOption("debugRoomInformation()", "Room Information");
    Menu.addOption("debugSwitchRoom()", "Switch Room");
    Menu.addOption("debugCharactersInformation()", "Characters Information");
    Menu.addOption("debugSwitchCharacter()", "Switch Character");
    Menu.addOption("debugBrowserInformation()", "Browser Information");
    Menu.generate();
}
function debugRoomInformation() {
    $contentBody = "";
    $contentBody += ("<h4>Current Room:</h4> <ul><li>" + player.room.name + "</li></ul>");
    
    $contentBody += ("<h4>Characters in Current Room (" + player.room.characters.size + "):</h4> <ul>");
    for (var [$characterID, $character] of player.room.characters.entries()) {
        $contentBody += ("<li>" + $character.name + "</li>");
    }
    $contentBody += ("</ul>");
    
    $contentBody += ("<h4>Attached Rooms (" + player.room.attachedRooms.size + "):</h4> <ul>");
    for (var [$roomID, $room] of player.room.attachedRooms.entries()) {
        $contentBody += ("<li>" + $room.name + "</li>");
    }
    $contentBody += ("</ul>");
    
    Content.set($contentBody);
}
function debugSwitchRoom() {
    clearContentAndMenu();
    
    roomsIndexes.forEach(function (_key, _val) {
        if (typeof window[_key.id + "Interact"] === 'function')
            Content.add(Menu.createButton("roomInteract(" + _key.id + ", true, true, true)", _key.name, _key.id, false));
    });
    
    Menu.setOption(7, "debugMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Debug");
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.generate();
}
function debugCharactersInformation() {
    Content.clear();
    Content.add("<h4>Current Character:</h4> <ul><li>" + player.name + "</li></ul>");
    
    Content.add("<h4>Current Clothes:</h4>");
    var _blob = "";
    _blob += "<table class='table'>";
    _blob += "<tr><td>Hat</td><td>" + (player.hasHat() ? player.clothingHead.name : "") + "</td></tr>";
    if (player.sex == 1)
        _blob += "<tr><td>Bra</td><td>" + (player.hasBra() ? player.clothingChest.name : "") + "</td></tr>";
    else
        _blob += "<tr><td colspan='2'>You have no tiddies for a bra</td></tr>";
    _blob += "<tr><td>Shirt</td><td>" + (player.hasShirt() ? player.clothingTorso.name : "") + "</td></tr>";
    _blob += "<tr><td>Belt</td><td>" + (player.hasBelt() ? player.clothingWaist.name : "") + "</td></tr>";
    _blob += "<tr><td>Underwear</td><td>" + (player.hasUnderwear() ? player.clothingGroin.name : "Going Commando") + "</td></tr>";
    _blob += "<tr><td>Pants</td><td>" + (player.hasPants() ? player.clothingLegs.name : "") + "</td></tr>";
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
    
    Menu.setOption(7, "debugMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Debug");
    Menu.setOption(11, "roomInteract(" + player.room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
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
        _blob += ("no shirt, but a " + _character.clothingLegs.toString() + ".");
    }
    else if (!_character.hasShirt() && !_character.hasPants() && _character.hasUnderwear()) {
        _blob += ("nothing but a pair of " + _character.clothingLegs.toString() + ".");
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
    document.getElementById('gameControlsDisplay').innerHTML = '<div class="btn-group" role="group"><button class="btn" data-toggle="modal" data-target="#optionsModal"><small style="position:absolute; right:0px; top:-3px;">[O]</small><div class="trim">Options</div></button></div>' + document.getElementById('gameControlsDisplay').innerHTML;
    //document.getElementById('gameControlsDisplay').innerHTML += '<div class="btn-group" role="group"><button class="btn viewPersonalInventory"><small style="position:absolute; right:0px; top:-3px;">[I]</small><div class="trim">Inventory</div></button></div>';
    
    if (enableMinimap) {
        Minimap.generateMapFromStartRoom(player.room);
        initializeMinimap();
    }
    
    clearContentAndMenu();
    
    Content.add("Your name is " + player.toString() + ", a " + player.age + " year old " + (player.sex == 0 ? 'male' : 'female') + " " + player.speciesName() + ".<br/>");
    
    Menu.addOption("roomInteract(" + player.room.id + ", true)", "Get a move on.");
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
        player.sleeping = false;
        
        if (enableMinimap && player.room != _pcPreviousRoom) {
            Minimap.generateMapFromStartRoom(player.room);
        }
        
        debugSwitchCharacter();
    }
}