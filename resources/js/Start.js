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

document.getElementById("toggleDebugButton").innerHTML = (debug ? "Disable" : "Enable") + " Debugging";
document.getElementById("toggleInventoryModalButton").innerHTML = (enablePopups ? "Use Menu" : "Use Popup") + " Inventory";
document.getElementById("toggleMenuSizeButton").innerHTML = (Menu.useWideMenu ? "Use Normal" : "Use Wide") + " Menu";
document.getElementById("toggleRapeButton").innerHTML = (enableRape ? "Disable" : "Enable") + " Non-Con";
document.getElementById("toggleGoreButton").innerHTML = (enableGore ? "Disable" : "Enable") + " Violence";