// Pre-load entity images
entityIndexes.forEach(function(_entity) {
    if (_entity.hasOwnProperty("image") && _entity.image !== undefined) {
        var _img = new Image();
        _img.src = _entity.image;
    }
});
/*
    Set up the GUI, and Start.
*/
Menu.initialize();
resizeGui();
mainMenu();