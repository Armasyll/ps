// Pre-load entity images
PSDE.entities.forEach(function(_entity) {
    if (_entity.hasOwnProperty("image") && _entity.image !== undefined) {
        var _img = new Image();
        _img.src = _entity.image;
    }
});
/*
    Set up the GUI, and Start.
*/
Menu.initialize();
PSDE.resizeGui();
PSDE.mainMenu();

document.getElementById("toggleDebugButton").innerHTML = (PSDE.enableDebug ? "Disable" : "Enable") + " Debugging";
document.getElementById("toggleInventoryModalButton").innerHTML = (PSDE.enableModules ? "Use Menu" : "Use Popup") + " Inventory";
document.getElementById("toggleMenuSizeButton").innerHTML = "Use {0} Menu".format(Menu.useWideMenu ? "Normal" : "Wide");
document.getElementById("toggleAutoscrollButton").innerHTML = (PSDE.enableAutoscroll ? "Disable" : "Enable") + " Autoscroll";
if (document.getElementById("toggleRapeButton") != null) {
	document.getElementById("toggleRapeButton").innerHTML = (PSDE.enableRape ? "Disable" : "Enable") + " Non-Con";
	document.getElementById("toggleGoreButton").innerHTML = (PSDE.enableGore ? "Disable" : "Enable") + " Violence";
}