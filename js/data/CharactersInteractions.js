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
        _character.name + " in " + player.room.name, 
        _character.image, 
        (typeof player.room.location !== 'undefined' ? player.room.location.name : "&nbsp;"), 
        (typeof player.room.cell.location !== 'undefined' ? player.room.cell.location.name : "&nbsp;")
    );
    
    if (_clearContent) {
        Content.clear();
        
        fn = new Function(player.room.sid + _character.name + "()");
        try {fn();}catch (err) {}
    }
    
    Menu.clear();
    
    Menu.setOption(0, "characterTalk(" + _character.id + ")", "Talk");
    if ((player.age > 18 && _character.age > 18))
        Menu.setOption(1, "characterSex(" + _character.id + ")", "Sex");
    else
        Menu.setOption(1, "characterSex(" + _character.id + ")", "Sex", undefined, undefined, undefined, undefined, true);
    Menu.setOption(2, "getAppearance(" + _character.id + ")", "Appearance");
    if (_character.following != player)
        Menu.setOption(3, _character.id + "Follow()", "Ask " + (_character.objectPronoun()) + " to follow you");
    else
        Menu.setOption(3, _character.id + "Stay()", "Ask " + (_character.objectPronoun()) + " to stay here");
    
    Menu.setOption(4, "characterOpen(" + _character.id + ")", "Inventory", "Rifle through " + (_character.possessiveAdjective()) + " pockets, if " + _character.subjectPronoun() + " has them.");
    
    if (player.room.characters.size > 2)
        Menu.setOption(7, "localCharactersMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>those nearby");
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    fn = new Function(_character.id + "Interact()");
    try {fn();}catch (err) {}
    
    Menu.generate();
}
function characterOpen(_character) {
    if (typeof _character != 'undefined' && !(_character instanceof Character))
        _character = characterIndexes.get(_character);
    
    /*_blob = "";
    _blob += ("Looking through " + _character.name + "'s pockets, you find ");
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
    
    Menu.clear();
    Menu.setOption(7, lastMenu, "Back");
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    _character.items.forEach(function(_item) {
        Menu.addOption("moveItemToCharacter(" + _item.id + ")", "Take " + _item.name, _item.description);
    }, this);
    
    Menu.generate();*/
    
    if (typeof _character != 'undefined' && _character instanceof Character) {
        $('#dualInventoryTab-characterA').html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(player.image));
        $('#dualInventoryTab-characterB').html("<img style='height:2em' src='{0}' alt=''/>{1} Inventory".format(_character.image, _character.name + (_character.name.slice(-1) == 's' ? "'" : "'s")));
        $('#dualInventoryContent-characterA').html(generateEntityItemsGraphicalList(player, _character, true));
        $('#dualInventoryContent-characterB').html(generateEntityItemsGraphicalList(_character, player, true));
        $("#dualInventoryModal").modal("show");
    }
    else {
        $('#personalInventoryModal-title').html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(player.image));
        $('#personalInventoryModal-body').html(generateEntityItemsGraphicalList(player, undefined, false));
        $("#personalInventoryModal").modal("show");
    }
}
function characterTalk(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);
    
    Menu.clear();
    Menu.setOption(7, lastMenu, "Back");
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    fn = new Function(_character.id + "Talk()");
    try {fn();}catch (err) {}
    
    Menu.generate();
}
function characterSex(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);
    
    Menu.clear();
    Menu.setOption(7, lastMenu, "Back");
    Menu.setOption(11, "baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
    
    fn = new Function(_character.id + "Sex()");
    try {fn();}catch (err) {}
    
    Menu.generate();
}
function characterFollow(_character) {
    if (!(_character instanceof Character))
        _character = characterIndexes.get(_character);
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronound()));
    }
    else {
        Content.add("<p>\"" + _character.name + ",\" you call to " + _character.objectPronoun() + ", and " + _character.subjectPronoun() + " turns to face you. Motioning with a " + player.grammaticalHand + ", you ask " + _character.objectPronoun() + ", \"Follow me.\" " + _character.subjectPronoun() + " looks at you for a moment, before walking to your side.</p>");
        
        _character.follow(player);
    }
    
    characterInteract(_character, false);
    
    /*fn = new Function(_character.id + "Follow()");
    try {fn();}catch (err) {}
    Menu.generate();*/
}


function charlieInteract() {
    _character = charlie;
    
    if (player.hasItem(charlieBeatingHeart)) {
        Content.add("<p>Charlie's body slightly wavers as her eyes travel down your form, and stop at a pocket where you have her heart. Weakly, pleadingly, she reaches for the pocket, but you push her paw paws away with ease. \"I need the heart, " + player.name + ",\" she tells you, and tries in vain to grip her claws against your " + (player.hasPants() ? "pants" : "waist") + ".</p>");
        Content.add("<p>Her gaze dulls as she lets out a sigh, letting her arms fall limp to her sides.</p>");
        
        if (_character.location) {
        }
        
        Menu.addOption("", "Give her heart back.");
    }
    
    if (enableGore && enableRape)
        Menu.addOption("charlieEatCharlie()", "Murder and eat Charlie");
}
function charlieTalk() {
    _character = charlie;
    
    fn = new Function(player.room.sid + _character.name + "Talk()");
    try {fn();}catch (err) {}
}
function charlieRape() {
    _character = charlie;
    
    fn = new Function(player.room.sid + _character.name + "Rape()");
    try {fn();}catch (err) {}
}
function charlieSex() {
    _character = charlie;
    
    if (_character.willFuck(player)) {
        fn = new Function(player.room.sid + _character.name + "Sex()");
        try {fn();}catch (err) {}
    }
    else {
        Content.add("No thank you.");
    }
}
function charlieFollow() {
    _character = charlie;
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronound()));
    }
    else {
        Content.add("<p>\"" + _character.name + ",\" you call to " + _character.objectPronoun() + ", and " + _character.subjectPronoun() + " turns to face you. Motioning with a " + player.grammaticalHand + ", you ask " + _character.objectPronoun() + ", \"Follow me.\" " + _character.subjectPronoun() + " looks at you for a moment, before walking to your side.</p>");
        
        _character.follow(player);
    }
    
    characterInteract(_character, false);
}
function charlieStay() {
    _character = charlie;
    
    Content.add("<p>You ask Charlie to wait here, and she nods her head.</p>");
    
    _character.clearFollowing();
    
    characterInteract(_character, false);
}

function remmyTalk() {
    _character = remmy;
    
    fn = new Function(player.room.sid + _character.name + "Talk()");
    try {fn();}catch (err) {}
}
function remmySex() {
    _character = remmy;
    
    fn = new Function(player.room.sid + _character.name + "Sex()");
    try {fn();}catch (err) {}
}
function remmyFollow() {
    _character = remmy;
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronound()));
    }
    else {
        Content.add(String("<p>\"{0},\" you call to {1}, and {2} turns to face you. Motioning with a {3}, you ask {1}, \"Follow me,\"<br/>{2} looks at you for a moment, before walking to your side.</p>").format(_character.name, _character.objectPronoun(), _character.subjectPronoun(), player.grammaticalHand()));
        
        _character.follow(player);
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
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronound()));
    }
    else {
        Content.add(String("<p>\"{0},\" you call to {1}, and {2} turns to face you. Motioning with a {3}, you ask {1}, \"Follow me,\"<br/>{2} looks at you for a moment, before walking to your side.</p>").format(_character.name, _character.objectPronoun(), _character.subjectPronoun(), player.grammaticalHand()));
        
        _character.follow(player);
    }
    
    characterInteract(_character, false);
}

function wolterTalk() {
    _character = wolter;
    
    fn = new Function(player.room.sid + _character.name + "Talk()");
    try {fn();}catch (err) {}
}
function wolterSex() {
    _character = wolter;
    
    if (_character.willFuck(player)) {
        fn = new Function(player.room.sid + _character.name + "Sex()");
        try {fn();}catch (err) {}
    }
    else {
        Content.add("No thank you.");
    }
}
function wolterFollow() {
    _character = wolter;
    
    if (_character.sleeping) {
        Content.add(String("<p>{0} is currently curled in on {1} and sleeping. You don't want to wake {2}.</p>").format(_character.name, _character.reflexivePronoun(), _character.objectPronound()));
    }
    else {
        Content.add(String("<p>\"{0},\" you call to {1}, and {2} turns to face you. Motioning with a {3}, you ask {1}, \"Follow me,\"<br/>{2} looks at you for a moment, before walking to your side.</p>").format(_character.name, _character.objectPronoun(), _character.subjectPronoun(), player.grammaticalHand()));
        
        _character.follow(player);
    }
    
    characterInteract(_character, false);
}