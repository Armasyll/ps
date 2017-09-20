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
            Menu.setOption(7, "roomInteract(" + player.room.id + ", false, true, false)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>exploring room");
            Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
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
    Menu.setOption(7, lastMenu, "Back");
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
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
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    fn = new Function(_furniture.id + "Use(" + _character.id + ")");
    try {fn();}catch (err) {}
}
function furnitureSit(_furniture, _character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    fn = new Function(_furniture.id + "Sit(" + _character.id + ")");
    try {fn();}catch (err) {}
}
function furnitureLay(_furniture, _character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    fn = new Function(_furniture.id + "Lay(" + _character.id + ")");
    try {fn();}catch (err) {}
}
function furnitureSleep(_furniture, _character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    fn = new Function(_furniture.id + "Sleep(" + _character.id + ")");
    try {fn();}catch (err) {}
}
function furnitureLook(_furniture, _character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    fn = new Function(_furniture.id + "Look(" + _character.id + ")");
    try {fn();}catch (err) {}
}
function furnitureSex(_furniture, _character = player) {
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    
    fn = new Function(_furniture.id + "Sex(" + _character.id + ")");
    try {fn();}catch (err) {}
}