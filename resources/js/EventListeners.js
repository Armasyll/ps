window.addEventListener(
    "resize", 
    function() {
        PSDE.resizeGui();
        
        if (PSDE.enableMinimap) {
            Minimap.initialize();
            Minimap.generateMapFromStartRoom(PSDE.player.room);
        }
    },
    false
);
window.addEventListener(
    "keypress",
    function(event) {
        if (document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')
            return undefined;
        var fn = undefined;
        var _placement = undefined;
        switch(event['key']) {
            case "1": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + 0;
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "2": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + 1;
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "3": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + 2;
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "4": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + 3;
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "5": {
                if (Menu.numberOfOptions == 15) {
                    _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + 4;
                    if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                        fn = new Function(Menu.options[_placement][0]);
                }
                break;
            }
            case "q": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 4 : 5);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "w": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 5 : 6);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "e": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 6 : 7);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "r": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 7 : 8);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "t": {
                if (Menu.numberOfOptions == 15) {
                    _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + 9;
                    if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                        fn = new Function(Menu.options[_placement][0]);
                }
                break;
            }
            case "a": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 8 : 10);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "s": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 9 : 11);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "d": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 10 : 12);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "f": {
                _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + (Menu.numberOfOptions == 12 ? 11 : 13);
                if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                    fn = new Function(Menu.options[_placement][0]);
                break;
            }
            case "g": {
                if (Menu.numberOfOptions == 15) {
                    _placement = ((Menu.page * Menu.numberOfOptions) - Menu.numberOfOptions) + 14;
                    if (typeof Menu.options[_placement] !== 'undefined' && typeof Menu.options[_placement][0] !== 'undefined')
                        fn = new Function(Menu.options[_placement][0]);
                }
                break;
            }
            case "o": {
                if (PSDE.agreeTOS)
                    $('#optionsModal').modal('toggle');
                break;
            }
            case "h": {
                $('#helpModal').modal('toggle');
                break;
            }
            case "i": {
                fn = new Function(PSDE.characterInteractOpen());
                break;
            }
            case "`": {
                if (PSDE.agreeTOS)
                    fn = new Function(PSDE.debugMenu());
                break;
            }
        }
        
        if (typeof fn === 'function') {
            PSDE.hideModals();
            try {fn();}catch (err) {}
        }
    },
    false
);
