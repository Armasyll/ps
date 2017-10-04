function characterInteract(_character, _clearContent = true) {
    if (!_character.disposition.has(player))
        _character.addNewCharacterDispositionFor(player);
    if (!player.disposition.has(_character))
        player.addNewCharacterDispositionFor(_character);
     
    Menu.isExploring = false;
    if (!(_character instanceof Character))
        _character = charactersIndexes.get(_character);
    lastMenu = "characterInteract(" + _character.id + ",false,true)";
    
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
        Menu.setOption(7, "localCharactersMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>those nearby");
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
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
            _blob = "";
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
                tempArray = [];
                
                _character.items.forEach(function(_item) {
                    tempArray.push(_item.toString());
                });
                
                for (i = 0; i < tempArray.length - 1; i++) {
                    _blob += (tempArray[i]);
                    if (tempArray.length > 2)
                        _blob += (", ");
                }
                _blob += (" and " + tempArray[tempArray.length - 1] + ".");
            }
            Content.add("<p>" + _blob + "</p>");
        }
        
        Menu.clear();
        Menu.isExploring = false;
        Menu.setOption(7, lastMenu, "Back");
        Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
        
        var _entriesLimit = 10;
        if (_page > 0)
            _entriesLimit = 9
        
        if (_character.items.size > 10) {
            var _arr = Array.from(_character.items);
            
            if (((_page + 1) * _entriesLimit) < _arr.length)
                Menu.setOption(6, "characterInteractOpen({0}, {1}, false)".format(_character.id, _page + 1), "Look Further");
            if (_page > 0)
                Menu.setOption(10, "characterInteractOpen({0}, {1}, false)".format(_character.id, _page - 1), "Look Back");
            
            if (_page == 0) {
                for (var _i = 0; _i < 10; _i++) {
                    Menu.addOption("moveItemToEntity({0}, {1}, {2}, false)".format(_arr[_i].id, _character.id, player.id), "Take " + _arr[_i].name, _arr[_i].description);
                }
            }
            else if (((_page + 1) * _entriesLimit) > _character.items.size) {
                for (var _i = (10 + 9 * (_page -1)); _i < (10 + 9 * (_page -1)) + 10 && _i < _character.items.size; _i++) {
                    Menu.addOption("moveItemToEntity({0}, {1}, {2}, false)".format(_arr[_i].id, _character.id, player.id), "Take " + _arr[_i].name, _arr[_i].description);
                }
            }
            else {
                for (var _i = (10 + 9 * (_page -1)); _i < (10 + 9 * (_page -1)) + 9; _i++) {
                    Menu.addOption("moveItemToEntity({0}, {1}, {2}, false)".format(_arr[_i].id, _character.id, player.id), "Take " + _arr[_i].name, _arr[_i].description);
                }
            }
        }
        else {
            _character.items.forEach(function(_item) {
                Menu.addOption("moveItemToEntity({0}, {1}, {2}, false)".format(_item.id, _character.id, player.id), "Take " + _item.name, _item.description);
            }, this);
        }
        
        Menu.generate();
    }
}
function characterInteractTalk(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);
    
    Menu.clear();
    Menu.setOption(7, lastMenu, "Back");
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    fn = new Function(_character.id + "Talk()");
    try {fn();}catch (err) {}
    
    Menu.generate();
}
function characterInteractSex(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);
    
    Menu.clear();
    Menu.setOption(7, lastMenu, "Back");
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    fn = new Function(_character.id + "Sex()");
    try {fn();}catch (err) {}
    
    Menu.generate();
}
function characterInteractFollow(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);
    
    fn = new Function(_character.id + "Follow()");
    try {fn();}catch (err) {}
    
    Menu.generate();
}
function characterInteractAttack(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);
    
    fn = new Function(_character.id + "Attack()");
    try {fn();}catch (err) {}
    
    Menu.generate();
}
function characterInteractStay(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);
    
    fn = new Function(_character.id + "Stay()");
    try {fn();}catch (err) {}
    
    Menu.generate();
}


function charlieInteract() {
    _character = charlie;
    
    if (player.hasItem(charlieBeatingHeart)) {
        charlieInteractWhenPlayerHasHeart();
    }
    
    if (enableGore && enableRape)
        Menu.addOption("charlieEatCharlie()", "Murder and eat Charlie");
}
function charlieTalk() {
    _character = charlie;
    
    fn = new Function(player.room.sid + _character.id.capitalize() + "Talk()");
    try {fn();}catch (err) {}
}
function charlieRape() {
    _character = charlie;
    
    fn = new Function(player.room.sid + _character.id.capitalize() + "Rape()");
    try {fn();}catch (err) {}
}
function charlieSex() {
    _character = charlie;
    
    if (_character.willFuck(player) || player.hasItem(charlieBeatingHeart)) {
        fn = new Function(player.room.sid + _character.id.capitalize() + "Sex()");
        try {fn();}catch (err) {}
    }
    else {
        Content.add("No thank you.");
    }
}
function charlieFollow() {
    _character = charlie;
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronoun()));
    }
    else {
        Content.add("<p>\"" + _character.name + ",\" you call to " + _character.objectPronoun() + ", and " + _character.subjectPronoun() + " turns to face you. Motioning with a " + player.grammaticalHand + ", you ask " + _character.objectPronoun() + ", \"Follow me.\" " + _character.subjectPronoun() + " looks at you for a moment, before walking to your side.</p>");
        
        characterFollow(player, _character);
    }
    
    characterInteract(_character, false);
}
function charlieStay() {
    _character = charlie;
    
    Content.add("<p>You ask Charlie to wait here, and she nods her head.</p>");
    
    stay(_character);
    
    characterInteract(_character, false);
}

function remmyTalk() {
    _character = remmy;
    
    fn = new Function(player.room.sid + _character.id.capitalize() + "Talk()");
    try {fn();}catch (err) {}
}
function remmySex() {
    _character = remmy;
    
    fn = new Function(player.room.sid + _character.id.capitalize() + "Sex()");
    try {fn();}catch (err) {}
}
function remmyFollow() {
    _character = remmy;
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronoun()));
    }
    else {
        Content.add(String("<p>\"{0},\" you call to {1}, and {2} turns to face you. Motioning with a {3}, you ask {1}, \"Follow me,\"<br/>{2} looks at you for a moment, before walking to your side.</p>").format(_character.name, _character.objectPronoun(), _character.subjectPronoun(), player.grammaticalHand()));
        
        characterFollow(player, _character);
    }
    
    characterInteract(_character, false);
}

function rosieTalk() {
    _character = rosie;
    
    if (player == charlie) {
        Content.add("<p>You walk casually over to the vixen, your long, fluffy tail puffing up the closer you get.</p>");
        if (rosie.sleeping)
            Content.add("<p>Rosie is lying down peacefully, with her chest rising and falling in a slow rhythm.");
        else
            Content.add("<p>Rosie looks up at you with her sad, blue eyes, as you ask her, \"Hey kid, wanna /ll/?\"");
    }
    fn = new Function(player.room.sid + "RosieTalk()");
    try {fn();}catch (err) {}
}
function rosieSex() {
    _character = rosie;
    
    Content.add("<p>Looking over the vixen, a depreaved idea come to you-<h1 style='display:inline;'>\"No >:v\"</h1></p>");
}
function rosieFollow() {
    _character = rosie;
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronoun()));
    }
    else {
        Content.add(String("<p>\"{0},\" you call to {1}, and {2} turns to face you. Motioning with a {3}, you ask {1}, \"Follow me,\"<br/>{2} looks at you for a moment, before walking to your side.</p>").format(_character.name, _character.objectPronoun(), _character.subjectPronoun(), player.grammaticalHand()));
        
        characterFollow(player, _character);
    }
    
    characterInteract(_character, false);
}

function wolterTalk() {
    _character = wolter;
    
    fn = new Function(player.room.sid + _character.id.capitalize() + "Talk()");
    try {fn();}catch (err) {}
}
function wolterSex() {
    _character = wolter;
    
    if (_character.willFuck(player)) {
        fn = new Function(player.room.sid + _character.id.capitalize() + "Sex()");
        try {fn();}catch (err) {}
    }
    else {
        Content.add("No thank you.");
    }
}
function wolterFollow() {
    _character = wolter;
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronoun()));
    }
    else {
        Content.add(String("<p>\"{0},\" you call to {1}, and {2} turns to face you. Motioning with a {3}, you ask {1}, \"Follow me,\"<br/>{2} looks at you for a moment, before walking to your side.</p>").format(_character.name, _character.objectPronoun(), _character.subjectPronoun(), player.grammaticalHand()));
        
        characterFollow(player, _character);
    }
    
    characterInteract(_character, false);
}