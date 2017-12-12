function mainMenu() {
    Menu.addOption("start()", "Enter", "You meet the conditions above.");
    Menu.generate();
}
function baseMenu(_clearContent = false, _clearMenu = true) {
    lastMenu = "baseMenu({0}, {1})".format(_clearContent, _clearMenu);
    Menu.showingBaseMenu = true;
    
    if (!(player.room instanceof Room))
        setPlayerRoom(limbo);
    
    if (_clearMenu) {
        Title.clear();
        Title.set(
            (player.room.isOwner(player) ? "Your "  + (player.room.type !== 'undefined' ? player.room.type : "room").capitalize() : player.room.name), 
            undefined, 
            (typeof player.room.location !== 'undefined' ? (player.room.location == player.room.cell.location ? player.room.cell.name : player.room.location.name) : "&nbsp;"), 
            (typeof player.room.cell.location !== 'undefined' ? player.room.cell.location.name : "&nbsp;")
        );

        Menu.clear();
	    
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
        Menu.setOption(0, "roomInteract({0}, false, false)".format(player.room.id), "Explore " + (player.room.owner == player ? "your " + player.room.typeName() : player.room.name));
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
    Menu.addOption("player.addItem('masterKey')", "Get Skeleton Key");
    Menu.generate();
}
function debugRoomInformation() {
    _contentBody = "";
    _contentBody += "<h4>Current Room:</h4> <ul><li>{0}</li></ul>".format(player.room.toString());
    
    
    _contentBody += "<h4>Attached Rooms ({0}):</h4> <ul>".format(player.room.attachedRooms.size);
    for (var [_roomID, _room] of player.room.attachedRooms.entries()) {
        _contentBody += "<li>{0}</li>".format(_room.toString());
    }
    _contentBody += "</ul>";
    
    
    _contentBody += "<h4>Characters in Current Room ({0}):</h4> <ul>".format(player.room.characters.size);
    for (var [_characterID, _character] of player.room.characters.entries()) {
        _contentBody += "<li>{0} {1}</li>".format(_character.toString(), Array.from(_character.currentActions));
    }
    _contentBody += "</ul>";
    
    
    _contentBody += "<h4>Furniture in Current Room ({0}):</h4> <ul>".format(player.room.characters.size);
    for (var [_furnitureID, _furniture] of player.room.furniture.entries()) {
        _contentBody += "<li>{0}".format(_furniture.toString());
            _contentBody += "<ul>";
                _contentBody += "<li>Seating ({0}/{1})".format(_furniture.seatingSpace - _furniture.availableSeatingSpace(), _furniture.seatingSpace);
                    _contentBody += "<ul>";
        _furniture.characters.forEach(function(_character) {
            _contentBody += "<li>{0} {1}</li>".format(_character.toString(), Array.from(_character.currentActions));
        }, this);
                    _contentBody += "</ul>";
                _contentBody += "</li>";
                _contentBody += "<li>Storage ({0}/{1})".format(_furniture.items.size, _furniture.storageSpace);
                    _contentBody += "<ul>";
        _furniture.items.forEach(function(_item) {
            _contentBody += "<li>{0}</li>".format(_item.toString());
        }, this);
                    _contentBody += "</ul>";
                _contentBody += "</li>";

            _contentBody += "</ul>";
        _contentBody += "</li>";
    }
    _contentBody += "</ul>";
    
    
    Content.set(_contentBody);
}
function debugSwitchRoom() {
    clearContentAndMenu();
    
    Content.add("<p>You are currently in " + player.room.id + "</p>");
    i = 1;
    _blob = "";
    _blob += '<div class="btn-group btn-group-justified">';
    roomsIndexes.forEach(function (_key, _val) {
        _blob += Menu.createButton("roomInteract(" + _key.id + ", true)", _key.name, _key.id, false);
        if (i % 4 == 0)
            _blob += '</div><div class="btn-group btn-group-justified">';
        i++;
    });
    _blob += '</div>';
    
    Content.add(_blob);
    
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "debugMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Debug");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(true, true)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.generate();
}
function debugCharactersInformation(_character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (typeof _character == 'undefined')
        return undefined;
    
    Content.clear();
    
    var _blob = "";
    var _arr = [];
    

    // Character List
    charactersIndexes.forEach(function(__character) {
    	_blob += "<option value='{0}'' {2}>{1}</option>".format(__character.id, __character.name, (_character == __character ? "selected" : ""));
    });
    Content.add("<h4>Character:</h4> <select onchange='debugCharactersInformation(this.value)'>" + _blob + "</select><br/>");
    Content.add("<hr/>");
    _blob = "";


    // Misc. Stats
    _blob += "<div class='panel panel-default autocollapse'><div data-toggle='collapse' href='#debugStatsPanel' class='panel-heading clickable'><h3 class='panel-title text-center'><a>Stats</a></h3></div><div id='debugStatsPanel' class='panel-collapse collapse'><div class='panel-body'>";
    _blob += "<label class='col-sm-2'>Lust:</label><input onchange='{1}.setLust(this.value)' type='number' min='0' max='100' name='lust' value='{0}'/><br/>".format(_character.lust, _character.id);
    _blob += "<label class='col-sm-2'>Exhibitionism:</label><input onchange='{1}.setExhibitionism(this.value)' type='number' min='0' max='100' name='exhibitionism' value='{0}'/><br/>".format(_character.exhibitionism, _character.id);
    _blob += "<label class='col-sm-2'>Somnophilia:</label><input onchange='{1}.setSomnophilia(this.value)' type='number' min='0' max='100' name='somnophilia' value='{0}'/><br/>".format(_character.somnophilia, _character.id);
    _blob += "<label class='col-sm-2'>Intoxication:</label><input onchange='{1}.setIntoxication(this.value)' type='number' min='0' max='100' name='intoxication' value='{0}'/><br/>".format(_character.intoxication, _character.id);
    _blob += "<label class='col-sm-2'>Incestual:</label><input onchange='{1}.setIncestual(this.value)' type='number' min='0' max='100' name='incestual' value='{0}'/><br/>".format(_character.incestual, _character.id);
    _blob += "<label class='col-sm-2'>Rut:</label><input onchange='{1}.setRut(this.checked)' type='checkbox' name='rut' {1}/><br/>".format((_character.rut ? 'checked' : ''), _character.id);
    _blob += "<label class='col-sm-2'>Orientation:</label><select id='debugSetSexualOrientation' onchange='{0}.setSexualOrientation(this.value)'><option value='0' {1}>Straight</option><option value='1' {2}>Gay</option><option value='2' {3}>Bisexual</option></select><br/>".format(_character.id, (_character.sexualOrientation == 0 ? 'selected' : ''), (_character.sexualOrientation == 1 ? 'selected' : ''), (_character.sexualOrientation == 2 ? 'selected' : ''));
    _blob += "</div></div></div>";
    Content.add(_blob);
    _blob = "";


    // Clothes
    _blob += "<div class='panel panel-default autocollapse'><div data-toggle='collapse' href='#debugClothesPanel' class='panel-heading clickable'><h3 class='panel-title text-center'><a>Clothing</a></h3></div><div id='debugClothesPanel' class='panel-collapse collapse'><div class='panel-body'>";
    var _clothingIndexes = new Map(clothingIndexes);
    var _clothingOptionsBlob = "";
    
    _blob += "<table class='table'>";
    Array.from(_character.clothing.keys()).forEach(function(_clothingType) {
    	_clothingIndexes.forEach(function(_clothing) {
    		if (_clothing.type == _clothingType) {
	            _clothingOptionsBlob += "<option value='{0}' {2}>{1}</option>".format(_clothing.id, _clothing.name, (_character.hasBra() && _character.getBra().id == _clothing.id ? "selected" : ""));
	            _clothingIndexes.delete(_clothing.id);
    		}
    	}, this);
    	_blob += "<tr><td>{3}</td><td><select class='changeClothing col-sm-3' onchange='{0}.wear(this.value, \"{3}\")' data-character='{0}' data-clothingSlot='{3}' selected='{1}'><option value='undefined'>Nothing</option>{2}</select></td></tr>".format(player.id, (player.hasHat() ? player.getHat().id : "undefined"), _clothingOptionsBlob, _clothingType);
    	_clothingOptionsBlob = "";
    }, this);
	_blob += "</table>";
	_blob += "</div></div></div>";
    Content.add(_blob);
    _blob = "";
    

    // Disposition
    _map = _character.defaultDisposition.toMap();
    
    _blob += "<div class='panel panel-default autocollapse'><div data-toggle='collapse' href='#debugDispositionPanel' class='panel-heading clickable'><h3 class='panel-title text-center'><a>Disposition</a></h3></div><div id='debugDispositionPanel' class='panel-collapse collapse'><div class='panel-body'>";
    _blob += "<form class='form-inline'><table class='table'>";
    _blob += "<thead><tr><th>Name</th>";
    for (var _property in _character.defaultDisposition) {
        _blob += "<th>{0}</th>".format(_property.capitalize());
    }
    _blob += "<th>Chance to Fuck</th>";
    _blob += "</tr></thead><tbody>";
    
    //  Defaults
    _blob += "<tr><td>Default</td>";
    for (var _property in _character.defaultDisposition) {
        _blob += "<td><input type='text' class='changeDisposition' onchange='{0}.defaultDisposition.set({1}, this.value)' value='{2}' style='width:3em;'/></td>".format(_character.id, _property, _map.get(_property));
    }
    _blob += "</tr>";
    
    //  You->Them
    _blob += "<tr><td colspan='{0}'>Your Dispositions for Characters</td></tr>".format(_map.size + 2);
    charactersIndexes.forEach(function(__character) {
        if (_character == __character)
            return undefined;
        
        if (_character.hasDisposition(__character)) {
	        _map = _character.getCharacterDisposition(__character).toMap();
	        
	        _blob += "<tr><td>{0}</td>".format(__character.id);
	        for (var _property in _character.characterDisposition.get(__character)) {
	            _blob += "<td><input type='text' class='changeDisposition' onchange='{0}.getCharacterDisposition({3}).set(\"{1}\", this.value); $(\"#chanceToFuckThem{4}\").text(chanceToFuck({3}, {0}));' value='{2}' style='width:3em;'/></td>".format(_character.id, _property, _map.get(_property), __character.id, __character.name);
	        }
	        _blob += "<td id='chanceToFuckThem{1}'>{0}</td>".format(chanceToFuck(__character, _character), __character.name);
	        _blob += "</tr>";
	    }
    }, this);
    
    //  Them->You
    _blob += "<tr><td colspan='{0}'>Characters' Dispositions for You</td></tr>".format(_map.size + 2);
    charactersIndexes.forEach(function(__character) {
        if (__character == _character)
            return undefined;
        
        if (__character.hasDisposition(_character)) {
	        _map = __character.getCharacterDisposition(_character).toMap();
	        
	        _blob += "<tr><td>{0}</td>".format(__character.id);
	        for (var _property in __character.characterDisposition.get(_character)) {
	            _blob += "<td><input type='text' class='changeDisposition' onchange='{0}.getCharacterDisposition({3}).set(\"{1}\", this.value); $(\"#chanceToFuckYou{4}\").text(chanceToFuck({3}, {0}));' value='{2}' style='width:3em;'/></td>".format(__character.id, _property, _map.get(_property), _character.id, __character.name);
	        }
	        _blob += "<td id='chanceToFuckYou{1}'>{0}</td>".format(chanceToFuck(_character, __character), __character.name);
	        _blob += "</tr>";
	    }
    }, this);
    
    _blob += "</tbody></table></form>";
    _blob += "</div></div></div>";
    Content.add(_blob);
    _blob = "";
}
function debugSwitchCharacter() {
    clearContentAndMenu();
    
    Content.add("<p>You are currently " + player.name + "</p>");
    i = 1;
    _blob = "";
    _blob += '<div class="btn-group btn-group-justified">';
    charactersIndexes.forEach(function (_key, _val) {
        _blob += Menu.createButton("switchCharacter(" + _key.id + ")", _key.name + " " + _key.surname, (_key.age + "/" + (_key.sex ? "F" : "M") + "/" + _key.getSpeciesName().capitalize() + "/" + (typeof _key.room !== 'undefined' ? _key.room.name : "Limbo")), false);
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
        _blob += (_character.shirt.toString() + ", and " + _character.pants.toString() + ".");
    }
    else if (_character.hasShirt() && !_character.hasPants() && _character.hasUnderwear()) {
        _blob += (_character.shirt.toString() + ", no pants, and " + _character.underwear.toString() + ".");
    }
    else if (_character.hasShirt() && !_character.hasPants() && !_character.hasUnderwear()) {
        _blob += (_character.shirt.toString() + ", and nothing below the waste.");
    }
    else if (!_character.hasShirt() && _character.hasPants()) {
        if (_character.pants.plural)
            _blob += ("no shirt, but a pair of " + _character.pants.toString() + ".");
        else
            _blob += ("no shirt, but a " + _character.pants.toString() + ".");
    }
    else if (!_character.hasShirt() && !_character.hasPants() && _character.hasUnderwear()) {
        if (_character.underwear.plural)
            _blob += ("nothing but a pair of " + _character.underwear.toString() + ".");
        else
            _blob += "nothing by a {0}.".format(_character.underwear.toString());
    }
    else {
        _blob += ("absolutely nothing.");
    }
    
    Content.add("<p>" + _blob + "</p>");
}
function start() {
    agreeTOS = true;
    Menu.showingBaseMenu = true;
    document.getElementById('gameControlsDisplay').innerHTML = '<div class="btn-group" role="group"><button class="btn" data-toggle="modal" data-target="#optionsModal"><small style="position:absolute; right:0px; top:-3px;">[O]</small><div class="trim">Options</div></button></div>' + document.getElementById('gameControlsDisplay').innerHTML;
    
    if (enableMinimap)
        Minimap.generateMapFromStartRoom(player.room);
    
    clearContentAndMenu();
    
    Content.add("Your name is " + player.toString() + ", a " + player.age + " year old " + (player.sex == 0 ? 'male' : 'female') + " " + player.getSpeciesName() + ".<br/>");
    
    Menu.addOption("roomInteract({0}, true)".format(player.room.id), "Get a move on.");
    Menu.generate();
    
    updateTimeDisplay();
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
            setPlayerRoom(limbo);
        player.sleeping = false;
        
        if (enableMinimap && player.room != _pcPreviousRoom) {
            Minimap.generateMapFromStartRoom(player.room);
        }
        
        debugSwitchCharacter();
    }
}