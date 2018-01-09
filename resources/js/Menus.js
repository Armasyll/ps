function mainMenu() {
    Menu.addOption("start()", "Enter", "You meet the conditions above.");
    Menu.generate();
}
function baseMenu(_clearContent = false, _clearMenu = true) {
    lastMenu = "baseMenu({0}, {1})".format(_clearContent, _clearMenu);
    Menu.showingBaseMenu = true;
    
    if (!(player.room instanceof Room))
        setRoom(limbo);
    
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
            Menu.setOption(2, "characterInteract(" + _character.id + ", false)", "Interact with " + _character.name, (_character.age + " year old " + _character.grammaticalGender() + "."));
        }
        else if (player.room.characters.size > 1)
            Menu.setOption(2, "localCharactersMenu()", "Interact with those near you.");
        if (player.hasPhone) {
            if (player.phone.receivedMessages.size > 0)
                Menu.setOption(3, "this.childNodes[2].innerHTML = '&nbsp;'; this.classList.remove('btn-info-flicker'); phoneInteract({0}, true)".format(player.phone.id), "Check Phone", "{0} Unread Messages".format(player.phone.receivedMessages.size), undefined, undefined, undefined, undefined, "btn-info-flicker");
            else
                Menu.setOption(3, "phoneInteract({0}, true)".format(player.phone.id), "Check Phone");
        }
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "tick('1m', true, true)", "Wait");
        if (player.manaMax > 0 && player.knownSpells.size > 0)
            Menu.setOption((Menu.useWideMenu ? 14 : 11), "spellMenu()", "Spells", undefined, undefined, undefined, undefined, undefined, "btn-mana");
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
    Menu.setOption((Menu.useWideMenu ? 12 : 9), "debugMenu()", "Debug", undefined, undefined, undefined, undefined, true);
    Menu.addOption("getAppearance(player, 1)", "Appearance");
    Menu.addOption("characterInteractOpen()", "Inventory");
    Menu.generate();
}
function localCharactersMenu() {
    lastMenu = "localCharactersMenu()";
    
    Title.set("Interact with those near you.");
    
    Menu.clear();
    for (var [_characterID, _character] of player.room.characters.entries()) {
        if (_character != player)
            Menu.addOption("characterInteract({0}, false)".format(_character.id), _character.name, "{0} year old {1}.".format(_character.age == 9001 ? "<span class='text-mana'>&infin;</span>" : _character.age, _character.grammaticalGender()));
    }
    
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.generate();
}
function spellMenu() {
    lastMenu = "spellMenu()";
    
    Title.set("Spells");

    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    player.knownSpells.forEach(function(_spell) {
        Menu.addOption(
            "spellInteract({0}, player)".format(_spell.id),
            _spell.name,
            _spell.description,
            undefined,
            undefined,
            undefined,
            undefined,
            "btn-mana"
        );
    });
    Menu.generate();
}

/*
    Minimum Menu Items
*/
function debugMenu() {
    $('#gameOptionsModal').modal('hide');
    Content.useDebugContent();
    
    Title.set(undefined, undefined, undefined, "Debug Menu");
    
    Menu.clear();
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "debugMenuClose()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    Menu.addOption("debugRoomInformation()", "Room Information");
    Menu.addOption("debugSwitchRoom()", "Switch Room");
    Menu.addOption("debugCharactersInformation()", "Characters Information");
    Menu.addOption("debugSwitchCharacter()", "Switch Character");
    Menu.addOption("debugBrowserInformation()", "Browser Information");
    Menu.addOption("debugMenuPopulate()", "Populate Menu", "with useless boxes");
    Menu.addOption("player.addItem('masterKey')", "Get Skeleton Key");
    Menu.addOption("addAllItems({0}, false)".format(player.id), "Add All Items");
    Menu.addOption("addAllLocations({0})".format(player.id), "Add All Locations");
    Menu.addOption("addAllSpells({0});characterSetManaMax({0}, 100);characterSetMana({0}, 100);{0}.setManaCostOffsetPercent(100)".format(player.id), "Add All Spells", undefined, undefined, undefined, undefined, undefined, "btn-mana");
    Menu.generate();
}
function debugMenuClose() {
    clearContentAndMenu();
    Content.useNormalContent();
    baseMenu(true);
}
function debugRoomInformation() {
    _contentBody = "";
    _contentBody += "<h4>Current Room:</h4> <ul><li>{0}</li></ul>".format(player.room.toString());
    _blob = "";
    _arr = [];
    
    
    _contentBody += "<h4>Attached Rooms ({0}):</h4> <ul>".format(player.room.attachedRooms.size);
    for (var [_roomID, _room] of player.room.attachedRooms.entries()) {
        _contentBody += "<li>{0}</li>".format(_room.toString());
    }
    _contentBody += "</ul>";
    
    
    _contentBody += "<h4>Characters in Current Room ({0}):</h4> <ul>".format(player.room.characters.size);
    for (var [_characterID, _character] of player.room.characters.entries()) {
        _blob = "";
        _character.currentActions.forEach(function(_val, _key) {
            
            if (_val instanceof Entity) {
                _blob += _key + ":";
                _arr.push(_val.toString());
            }
            else
                _blob += _key;
            _blob += _arr.toString() + ", ";
            _arr = [];
        }, this);
        _contentBody += "<li>{0} {1}</li>".format(_character.toString(), _blob);
        _blob = "";
    }
    _contentBody += "</ul>";
    
    
    _contentBody += "<h4>Furniture in Current Room ({0}):</h4> <ul>".format(player.room.characters.size);
    for (var [_furnitureID, _furniture] of player.room.furniture.entries()) {
        _contentBody += "<li>{0}".format(_furniture.toString());
            _contentBody += "<ul>";
                if (_furniture.isSeat()) {
                _contentBody += "<li>Seating ({0}/{1})".format(_furniture.seatingSpace - _furniture.availableSeatingSpace(), _furniture.seatingSpace);
                    _contentBody += "<ul>";
                        _furniture.characters.forEach(function(_character) {
                            _contentBody += "<li>{0} {1}</li>".format(_character.toString(), _character.getStancePresentTense());
                        }, this);
                    _contentBody += "</ul>";
                _contentBody += "</li>";
                }
                if (_furniture.isStorage()) {
                    _contentBody += "<li>Storage ({0}/{1})".format(_furniture.items.length, _furniture.storageSpace);
                        _contentBody += "<ul>";
                            _furniture.items.forEach(function(_item) {
                                _contentBody += "<li>{0}</li>".format(_item.toString());
                            }, this);
                        _contentBody += "</ul>";
                    _contentBody += "</li>";
                }
            _contentBody += "</ul>";
        _contentBody += "</li>";
    }
    _contentBody += "</ul>";
    
    
    Content.set(_contentBody);
}
function debugSwitchRoom() {
    clearContentAndMenu();
    
    Title.set("Switch Room", undefined, undefined, "Debug Menu");

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
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "debugMenuClose()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
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
    _blob += "<div class='panel panel-default autocollapse'><div data-toggle='collapse' href='#debugStatsPanel' class='panel-heading clickable'><h3 class='panel-title text-center'><a>Stats</a></h3></div><div id='debugStatsPanel' class=''><div class='panel-body'>";
    _blob += "<label class='col-sm-2'>Life:</label><input onchange='{1}.setLife(this.value)' type='number' min='0' max='4096' name='life' value='{0}'/><br/>".format(_character.life, _character.id);
    _blob += "<label class='col-sm-2'>Max Life:</label><input onchange='{1}.setLifeMax(this.value)' type='number' min='1' max='4096' name='lifeMax' value='{0}'/><br/>".format(_character.lifeMax, _character.id);
    if (_character.manaMax > 0) {
    	_blob += "<label class='col-sm-2'>Mana:</label><input onchange='{1}.setMana(this.value)' type='number' min='0' max='4096' name='mana' value='{0}'/><br/>".format(_character.mana, _character.id);
	    _blob += "<label class='col-sm-2'>Max Mana:</label><input onchange='{1}.setManaMax(this.value)' type='number' min='1' max='4096' name='manaMax' value='{0}'/><br/>".format(_character.manaMax, _character.id);
	}
    _blob += "<label class='col-sm-2'>Stamina:</label><input onchange='{1}.setStamina(this.value)' type='number' min='0' max='4096' name='stamina' value='{0}'/><br/>".format(_character.stamina, _character.id);
    _blob += "<label class='col-sm-2'>Max Stamina:</label><input onchange='{1}.setStaminaMax(this.value)' type='number' min='1' max='4096' name='staminaMax' value='{0}'/><br/>".format(_character.staminaMax, _character.id);
    _blob += "<label class='col-sm-2'>Money:</label><input onchange='{1}.setMoney(this.value)' type='number' min='0' name='money' value='{0}'/><br/>".format(_character.money, _character.id);
    _blob += "<label class='col-sm-2'>Sleeping:</label><input onchange='{1}.setSleep(this.checked)' type='checkbox' name='sleeping' {0}/><br/>".format((_character.isSleeping() ? 'checked' : ''), _character.id);
    _blob += "<hr/>";
    _blob += "<label class='col-sm-2'>Lust:</label><input onchange='{1}.setLust(this.value)' type='number' min='0' max='100' name='lust' value='{0}'/><br/>".format(_character.lust, _character.id);
    _blob += "<label class='col-sm-2'>Exhibitionism:</label><input onchange='{1}.setExhibitionism(this.value)' type='number' min='0' max='100' name='exhibitionism' value='{0}'/><br/>".format(_character.exhibitionism, _character.id);
    _blob += "<label class='col-sm-2'>Somnophilia:</label><input onchange='{1}.setSomnophilia(this.value)' type='number' min='0' max='100' name='somnophilia' value='{0}'/><br/>".format(_character.somnophilia, _character.id);
    _blob += "<label class='col-sm-2'>Intoxication:</label><input onchange='{1}.setIntoxication(this.value)' type='number' min='0' max='100' name='intoxication' value='{0}'/><br/>".format(_character.intoxication, _character.id);
    _blob += "<label class='col-sm-2'>Incestual:</label><input onchange='{1}.setIncestual(this.value)' type='number' min='0' max='100' name='incestual' value='{0}'/><br/>".format(_character.incestual, _character.id);
    _blob += "<label class='col-sm-2'>Rut:</label><input onchange='{1}.setRut(this.checked)' type='checkbox' name='rut' {0}/><br/>".format((_character.rut ? 'checked' : ''), _character.id);
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
	            _clothingOptionsBlob += "<option value='{0}' {2}>{1}</option>".format(_clothing.id, _clothing.name, (_character.clothing.has(_clothingType) && _character.clothing.get(_clothingType) == _clothing ? "selected" : ""));
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
    _blob += "<th>Rut</th>";
    _blob += "<th>Lust</th>";
    _blob += "<th>Chance to Fuck</th>";
    _blob += "</tr></thead><tbody>";
    
    //  Defaults
    _blob += "<tr><td>Default</td>";
    for (var _property in _character.defaultDisposition) {
        _blob += "<td><input type='text' class='changeDisposition' onchange='{0}.defaultDisposition.set({1}, this.value)' value='{2}' style='width:3em;'/></td>".format(_character.id, _property, _map.get(_property));
    }
    _blob += "</tr>";
    
    //  You->Them
    _blob += "<tr><td colspan='{0}'>Your Dispositions for Characters</td></tr>".format(_map.size + 3);
    charactersIndexes.forEach(function(__character) {
        if (_character == __character)
            return undefined;
        
        if (_character.hasDisposition(__character)) {
	        _map = _character.getCharacterDisposition(__character).toMap();
	        
	        _blob += "<tr><td>{0}</td>".format(__character.id);
	        for (var _property in _character.characterDisposition.get(__character)) {
	            _blob += "<td><input type='text' class='changeDisposition' onchange='{0}.getCharacterDisposition({3}).set(\"{1}\", this.value); $(\"#calculateChanceToFuckThem{4}\").text(calculateChanceToFuck({3}, {0}));' value='{2}' style='width:3em;'/></td>".format(_character.id, _property, _map.get(_property), __character.id, __character.id.capitalize());
	        }
            _blob += "<td></td>";
            _blob += "<td></td>";
            _blob += "<td id='calculateChanceToFuckThem{1}'>{0}</td>".format(calculateChanceToFuck(__character, _character), __character.id.capitalize());
	        _blob += "</tr>";
	    }
    }, this);
    
    //  Them->You
    _blob += "<tr><td colspan='{0}'>Characters' Dispositions for You</td></tr>".format(_map.size + 3);
    charactersIndexes.forEach(function(__character) {
        if (__character == _character)
            return undefined;
        
        if (__character.hasDisposition(_character)) {
	        _map = __character.getCharacterDisposition(_character).toMap();
	        
	        _blob += "<tr><td>{0}</td>".format(__character.id);
	        for (var _property in __character.characterDisposition.get(_character)) {
	            _blob += "<td><input type='text' class='changeDisposition' onchange='{0}.getCharacterDisposition({3}).set(\"{1}\", this.value); $(\"#calculateChanceToFuckYou{4}\").text(calculateChanceToFuck({3}, {0}));' value='{2}' style='width:3em;'/></td>".format(__character.id, _property, _map.get(_property), _character.id, __character.id.capitalize());
	        }
            _blob += "<td><input onchange='{0}.setRut(this.checked); $(\"#calculateChanceToFuckYou{3}\").text(calculateChanceToFuck({2}, {0}));' type='checkbox' name='rut' {1}/><br/>".format(__character.id, (_character.rut ? 'checked' : ''), _character.id, __character.id.capitalize());
            _blob += "<td><input onchange='{0}.setLust(this.value); $(\"#calculateChanceToFuckYou{3}\").text(calculateChanceToFuck({2}, {0}));' type='text' min='0' max='100' maxlength='3' size='3' name='lust' value='{1}'/></td>".format(__character.id, __character.lust, _character.id, __character.id.capitalize());
            _blob += "<td id='calculateChanceToFuckYou{1}'>{0}</td>".format(calculateChanceToFuck(_character, __character), __character.id.capitalize());
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
    
    Title.set("Switch Character", undefined, undefined, "Debug Menu");

    Content.add("<p>You are currently " + player.name + "</p>");
    i = 1;
    _blob = "";
    _blob += '<div class="btn-group btn-group-justified">';
    charactersIndexes.forEach(function (_key, _val) {
        _blob += Menu.createButton("switchCharacter(" + _key.id + ")", _key.name + " " + _key.surname, (_key.age + "/" + (_key.sex ? "F" : "M") + "/" + _key.species.capitalize() + "/" + (typeof _key.room !== 'undefined' ? _key.room.name : "Limbo")), false);
        if (i % 4 == 0)
            _blob += '</div><div class="btn-group btn-group-justified">';
        i++;
    });
    _blob += '</div>';
    
    Content.add(_blob);
    
    Menu.setOption((Menu.useWideMenu ? 9 : 7), "debugMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Debug");
    Menu.setOption((Menu.useWideMenu ? 14 : 11), "debugMenuClose(); roomInteract(" + player.room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
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
        _blob += (_character.getShirt().toString() + ", and " + _character.getPants().toString() + ".");
    }
    else if (_character.hasShirt() && !_character.hasPants() && _character.hasUnderwear()) {
        _blob += (_character.getShirt().toString() + ", no pants, and " + _character.getUnderwear().toString() + ".");
    }
    else if (_character.hasShirt() && !_character.hasPants() && !_character.hasUnderwear()) {
        _blob += (_character.getShirt().toString() + ", and nothing below the waste.");
    }
    else if (!_character.hasShirt() && _character.hasPants()) {
        if (_character.getPants().plural)
            _blob += ("no shirt, but a pair of " + _character.getPants().toString() + ".");
        else
            _blob += ("no shirt, but a " + _character.getPants().toString() + ".");
    }
    else if (!_character.hasShirt() && !_character.hasPants() && _character.hasUnderwear()) {
        if (_character.getUnderwear().plural)
            _blob += ("nothing but a pair of " + _character.getUnderwear().toString() + ".");
        else
            _blob += "nothing by a {0}.".format(_character.getUnderwear().toString());
    }
    else {
        _blob += ("absolutely nothing.");
    }
    
    Content.add("<p>" + _blob + "</p>");
}
function start() {
    agreeTOS = true;
    Menu.showingBaseMenu = true;
    
    if (enableMinimap)
        Minimap.generateMapFromStartRoom(player.room);
    
    clearContentAndMenu();
    
    Content.add("<p>Your name is " + player.toString() + ", a " + player.age + " year old " + (player.sex == 0 ? 'male' : 'female') + " " + player.species + ".</p>");
    
    Menu.addOption("roomInteract({0}, true)".format(player.room.id), "Get a move on.");
    Menu.generate();
    
    updateTimeDisplay();
    updatePlayerInfoDisplay();
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
            setRoom(limbo);
        player.sleeping = false;
        
        if (enableMinimap && player.room != _pcPreviousRoom) {
            Minimap.generateMapFromStartRoom(player.room);
        }
        
        updatePlayerInfoDisplay();
        debugSwitchCharacter();
    }
}