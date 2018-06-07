class Title {
    /**
     * Sets the titles
     * @param {String} _titleTopString
     * @param {String} _titleTopImg Path to Image, or base64
     * @param {String} _titleMidString
     * @param {String} _titleBotString
     */
    static set(_titleTopString = "&nbsp;", _titleTopImg = undefined, _titleMidString = "&nbsp;", _titleBotString = "&nbsp;") {
        for (var _i = 0; _i < document.getElementsByClassName("locationTitleTopText").length; _i++) {
            document.getElementsByClassName("locationTitleTopText")[_i].innerHTML = (typeof _titleTopString !== 'undefined' && _titleTopString !== "" ? _titleTopString : "&nbsp;");
        }

        this.setTopImage(_titleTopImg);

        for (var _i = 0; _i < document.getElementsByClassName("locationTitleMid").length; _i++) {
            document.getElementsByClassName("locationTitleMid")[_i].innerHTML = (typeof _titleMidString !== 'undefined' && _titleMidString !== "" ? _titleMidString : "&nbsp;");
        }

        for (var _i = 0; _i < document.getElementsByClassName("locationTitleBot").length; _i++) {
            document.getElementsByClassName("locationTitleBot")[_i].innerHTML = (typeof _titleBotString !== 'undefined' && _titleBotString !== "" ? _titleBotString : "&nbsp;");
        }
    }
    static setTopImage(_titleTopImg = undefined) {
        if (typeof _titleTopImg != 'undefined') {
            if (_titleTopImg instanceof XMLDocument)
                document.getElementById("locationTitleTopImageContainer").innerHTML = serializer.serializeToString(_titleTopImg);
            else if (typeof _titleTopImg == 'string' && _titleTopImg.slice(1, 4) == "svg")
                document.getElementById("locationTitleTopImageContainer").innerHTML = _titleTopImg;
            else
                document.getElementById("locationTitleTopImageContainer").innerHTML = String("<img src='{0}' />").format(_titleTopImg);
        }
        else
            document.getElementById("locationTitleTopImageContainer").innerHTML = "";
    }
    static clear(clearMap = false) {
        for (var _i = 0; _i < document.getElementsByClassName("locationTitleTopText").length; _i++) {
            document.getElementsByClassName("locationTitleMid")[_i].innerHTML = "&nbsp;";
        }

        document.getElementById("locationTitleTopImageContainer").innerHTML = "";

        for (var _i = 0; _i < document.getElementsByClassName("locationTitleMid").length; _i++) {
            document.getElementsByClassName("locationTitleMid")[_i].innerHTML = "&nbsp;";
        }

        for (var _i = 0; _i < document.getElementsByClassName("locationTitleBot").length; _i++) {
            document.getElementsByClassName("locationTitleBot")[_i].innerHTML = "&nbsp;";
        }
    }
}
class Content {
    constructor() {
        this.initialized = false;
        this.prepend = "";
        this.append = "";
    }
    static initialize() {
        this.initialized = true;
        this.contentContainer = "contentContainerBody";
    }
    /**
     * Set's the HTML of the content container's body
     * @param {String} _string HTML to be displayed in the content container's body
     */
    static set(_string) {
        if (this.initialized !== true)
            this.initialize();

        document.getElementById(this.contentContainer).innerHTML = _string;
        $('a[data-toggle=tooltip]').tooltip();

        if (PSDE.enableAutoscroll)
            document.getElementById(this.contentContainer).scrollTop = document.getElementById(this.contentContainer).scrollHeight;
    }
    /**
     * Appends the HTML of the content container's body
     * @param {String} _string HTML to be appended in the content container's body
     */
    static add(_string) {
        if (this.initialized !== true)
            this.initialize();

        document.getElementById(this.contentContainer).innerHTML += _string;
        $('a[data-toggle=tooltip]').tooltip();

        if (PSDE.enableAutoscroll)
            document.getElementById(this.contentContainer).scrollTop = document.getElementById(this.contentContainer).scrollHeight;
    }
    /**
     * Clears the HTML of hte content container's body
     */
    static clear() {
        if (this.initialized !== true)
            this.initialize();

        document.getElementById(this.contentContainer).innerHTML = "";
    }

    static useDebugContent() {
        if (this.initialized !== true)
            this.initialize();

        document.getElementById(this.contentContainer).classList.add("hidden");
        this.contentContainer = "debugContentContainerBody";
        document.getElementById(this.contentContainer).classList.remove("hidden");
    }
    static useNormalContent() {
        if (this.initialized !== true)
            this.initialize();

        document.getElementById(this.contentContainer).classList.add("hidden");
        this.contentContainer = "contentContainerBody";
        document.getElementById(this.contentContainer).classList.remove("hidden");
    }
}
class Menu {
    constructor() {
        this.initialized = false;
    }
    static initialize() {
        this.initialized = true;
        this.options = [];
        this.previousOptions = [];
        this.temporaryOptions = [];
        this.showingBaseMenu = false;
        this.page = 1;
        this.numberOfOptions = 12;
        this.useWideMenu = false;
        this.resetNumberOfOptions();
        this.choiceContainer = "choiceContainer";
    }

    /**
     * Clears the Menu
     */
    static clear() {
        if (this.initialized !== true)
            this.initialize();

        this.previousOptions = this.options;
        this.options = [];
        document.getElementById(this.choiceContainer).innerHTML = "";
        this.generate();
        this.page = 1;
        this.resetNumberOfOptions();
    }

    static resetNumberOfOptions() {
        if (this.initialized !== true)
            this.initialize();

        if (this.useWideMenu)
            this.numberOfOptions = 15;
        else
            this.numberOfOptions = 12;
    }

    static hasOptionFunction(_functionName) {
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i] instanceof Array && this.options[i][0].split(/\(/)[0] == _functionName)
                return true;
        }
        return false;
    }

    static hasOptionTitle(_title) {
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i] instanceof Array && this.options[i][1].toLowerCase() == String(_title).toLowerCase())
                return true;
        }
        return false;
    }
    static hasOptionTitleLike(_title) {
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i] instanceof Array && this.options[i][1].toLowerCase().indexOf(String(_title).toLowerCase()) !== -1)
                return true;
        }
        return false;
    }

    /**
     * Sets Menu button contents
     * @param {Number}  _index        Where the button is placed on the Menu; can be 0-12, (1-4, Q-R, A-F) or 0-14, (1-5, Q-T, A-G)
     * @param {String}  _functionCall The function to be called when the button is pressed
     * @param {String}  _title        The displayed text in the middle of the button
     * @param {String}  _subTitle     Optional; The displayed text at the bottom of the button
     * @param {String}  _hover        Optional; The displayed text when the button is hovered over by the mouse
     * @param {Number}  _displayType  Optional; 0 default, 1 disabled, 2 disable-invisible, 4 invisible
     * @param {String}  _btnClass     Optional; The bootstrap-specific btn sub-class
     * @param {Boolean} _softSet      Optional; Whether or not to offset the displayed menu based on the _index and Menu.numberOfOptions
     */
    static setOption(_index, _functionCall, _title, _subTitle, _hover = undefined, _displayType = 0, _btnClass = "", _softSet = true) {
        if (this.initialized !== true)
            this.initialize();

        if (isNaN(_displayType) || _displayType < 0 || _displayType > 7)
            _displayType = 0;

        if (isNaN(_index)) {
            if (this.numberOfOptions == 12) {
                switch (_index) {
                    case "1": _index = 0; break;
                    case "2": _index = 1; break;
                    case "3": _index = 2; break;
                    case "4": _index = 3; break;
                    case "q": _index = 4; break;
                    case "w": _index = 5; break;
                    case "e": _index = 6; break;
                    case "r": _index = 7; break;
                    case "a": _index = 8; break;
                    case "s": _index = 9; break;
                    case "d": _index = 10; break;
                    case "f": _index = 11; break;
                    default: _index = -1;
                }
            }
            else {
                switch (_index) {
                    case "1": _index = 0; break;
                    case "2": _index = 1; break;
                    case "3": _index = 2; break;
                    case "4": _index = 3; break;
                    case "5": _index = 4; break;
                    case "q": _index = 5; break;
                    case "w": _index = 6; break;
                    case "e": _index = 7; break;
                    case "r": _index = 8; break;
                    case "t": _index = 9; break;
                    case "a": _index = 10; break;
                    case "s": _index = 11; break;
                    case "d": _index = 12; break;
                    case "f": _index = 13; break;
                    case "g": _index = 14; break;
                    default: _index = -1;
                }
            }
        }

        if (_index > -1 && _index < this.numberOfOptions * 10) {
            var _runCond = true;
            var _page = 0;

            if (_index / this.numberOfOptions > 1)
                _page = parseInt(_index / this.numberOfOptions);
            else
                _page = 1;

            if (_functionCall.length > 0 && !_functionCall.endsWith(")"))
                _functionCall = _functionCall + "()";

            if (_index == this.numberOfOptions * (_page)) {
                var _tmpArr = new Array();
                var _startIndex = this.numberOfOptions * (_page - 1) + (this.useWideMenu ? 8 : 6);

                for(var _i = _startIndex; _i < this.options.length; _i++) {
                    if (typeof this.options[_i] != 'undefined' && this.options[_i][8] == false) {
                        _tmpArr.push(this.options[_i]);
                        delete this.options[_i];
                    }
                }

                this.options[(this.numberOfOptions * _page) - (this.useWideMenu ? 8 : 6)] = ["Menu.generate({0})".format(_page + 1), "Next", "", false, 0, undefined, true];
                if (_page > 1)
                    this.options[this.numberOfOptions * _page - 2] = ["Menu.generate({0})".format(_page - 1), "Previous", "", false, 0, undefined, true];

                _tmpArr.push([_functionCall, _title, _subTitle, _hover, _displayType, _btnClass, _softSet]);

                _index = (this.numberOfOptions * _page) - (this.useWideMenu ? 8 : 6);

                _tmpArr.forEach(function(_item) {
                    var _runCond = true;
                    while (_index < this.numberOfOptions * 10 && _runCond) {
                        if (typeof this.options[_index] == 'undefined' && (_page == 1 || _page > 1 && _index != this.numberOfOptions * _page - 2)) {
                            this.options[_index] = _item;
                            _runCond = false;
                        }
                        else
                            _index++;
                    }
                }, this);
            }
            else if (_index > this.numberOfOptions && _index == this.numberOfOptions * _page - 2)
                this.options[this.numberOfOptions * _page - 2] = ["Menu.generate({0})".format(_page - 1), "Previous", "", false, 0, undefined, true];
            else {
                if (typeof this.options[_index] != 'undefined') {
                    var _runCond = true;
                    while (_index < this.numberOfOptions * 10 && _runCond) {
                        if (typeof this.options[_index] == 'undefined' && (_page == 1 || _page > 1 && _index != this.numberOfOptions * _page - 2))
                            _runCond = false;
                        else
                            _index++;
                    }
                }

                this.options[_index] = [_functionCall, _title, _subTitle, _hover, _displayType, _btnClass, _softSet];
            }

            return true;
        }
        else
            return false;
    }
    /**
     * Wrapper function for this.setOption
     * @param {String}  _functionCall The function to be called when the button is pressed
     * @param {String}  _title        The displayed text in the middle of the button
     * @param {String}  _subTitle     Optional; The displayed text at the bottom of the button
     * @param {String}  _hover        Optional; The displayed text when the button is hovered over by the mouse
     * @param {Number}  _displayType  Optional; 0 default, 1 disabled, 2 disable-invisible, 4 invisible
     * @param {String}  _btnClass     Optional; The bootstrap-specific btn sub-class
     */
    static addOption(_functionCall, _title, _subTitle, _hover = "", _displayType = 0, _btnClass = "") {
        if (this.initialized !== true)
            this.initialize();

        var i = 0;
        var _runCond = 1;

        if (this.numberOfOptions == 12) {
            while (i <= this.options.length && _runCond) {
                if (typeof this.options[i] == 'undefined')
                    _runCond = !this.setOption(i, _functionCall, _title, _subTitle, _hover, _displayType, _btnClass, false);
                else
                    i++;
            }
        }
        else if (this.numberOfOptions == 15) {
            while (i <= this.options.length && _runCond) {
                if (typeof this.options[i] == 'undefined')
                    _runCond = !this.setOption(i, _functionCall, _title, _subTitle, _hover, _displayType, _btnClass, false);
                else
                    i++;
            }
        }

        return i;
    }
    static setExplorationOptions(_northRoom = undefined, _eastRoom = undefined, _southRoom = undefined, _westRoom = undefined, _downRoom = undefined, _upRoom = undefined) {
        if (this.initialized !== true)
            this.initialize();

        Menu.showingBaseMenu = true;
        Menu.page = 1;

        var _metaName = "";
        var _secret = false;
        var _room = undefined;

        if (_downRoom instanceof Room) {
            _room = _downRoom;
            if (PSDE.getCharacterCurrentRoom(PSDE.player).cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (PSDE.getCharacterCurrentRoom(PSDE.player).location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 4 : 5)] = ["PSDE.roomInteract('" + _room.id + "', true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>Down", _metaName, undefined, _room.isHidden(PSDE.getCharacterCurrentRoom(PSDE.player)) ? 4 : 0, "btn-info" + (PSDE.getCharacterCurrentRoom(PSDE.player).isLocked(_room) && !PSDE.player.hasKey(_room) ? " locked" : "")];
        }
        if (_northRoom instanceof Room) {
            _room = _northRoom;
            if (PSDE.getCharacterCurrentRoom(PSDE.player).cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (PSDE.getCharacterCurrentRoom(PSDE.player).location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 5 : 6)] = ["PSDE.roomInteract('" + _room.id + "', true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>North", _metaName, undefined, _room.isHidden(PSDE.getCharacterCurrentRoom(PSDE.player)) ? 4 : 0, "btn-info" + (PSDE.getCharacterCurrentRoom(PSDE.player).isLocked(_room) && !PSDE.player.hasKey(_room) ? " locked" : "")];
        }
        if (_upRoom instanceof Room) {
            _room = _upRoom;
            if (PSDE.getCharacterCurrentRoom(PSDE.player).cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (PSDE.getCharacterCurrentRoom(PSDE.player).location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 6 : 7)] = ["PSDE.roomInteract('" + _room.id + "', true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>Up", _metaName, undefined, _room.isHidden(PSDE.getCharacterCurrentRoom(PSDE.player)) ? 4 : 0, "btn-info" + (PSDE.getCharacterCurrentRoom(PSDE.player).isLocked(_room) && !PSDE.player.hasKey(_room) ? " locked" : "")];
        }
        if (_westRoom instanceof Room) {
            _room = _westRoom;
            if (PSDE.getCharacterCurrentRoom(PSDE.player).cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (PSDE.getCharacterCurrentRoom(PSDE.player).location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 8 : 10)] = ["PSDE.roomInteract('" + _room.id + "', true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>West", _metaName, undefined, _room.isHidden(PSDE.getCharacterCurrentRoom(PSDE.player)) ? 4 : 0, "btn-info" + (PSDE.getCharacterCurrentRoom(PSDE.player).isLocked(_room) && !PSDE.player.hasKey(_room) ? " locked" : "")];
        }
        if (_southRoom instanceof Room) {
            _room = _southRoom;
            if (PSDE.getCharacterCurrentRoom(PSDE.player).cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (PSDE.getCharacterCurrentRoom(PSDE.player).location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 9 : 11)] = ["PSDE.roomInteract('" + _room.id + "', true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>South", _metaName, undefined, _room.isHidden(PSDE.getCharacterCurrentRoom(PSDE.player)) ? 4 : 0, "btn-info" + (PSDE.getCharacterCurrentRoom(PSDE.player).isLocked(_room) && !PSDE.player.hasKey(_room) ? " locked" : "")];
        }
        if (_eastRoom instanceof Room) {
            _room = _eastRoom;
            if (PSDE.getCharacterCurrentRoom(PSDE.player).cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (PSDE.getCharacterCurrentRoom(PSDE.player).location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 10 : 12)] = ["PSDE.roomInteract('" + _room.id + "', true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>East", _metaName, undefined, _room.isHidden(PSDE.getCharacterCurrentRoom(PSDE.player)) ? 4 : 0, "btn-info" + (PSDE.getCharacterCurrentRoom(PSDE.player).isLocked(_room) && !PSDE.player.hasKey(_room) ? " locked" : "")];
        }
        _room = undefined;
    }
    /**
     * Generates Menu
     * @param  {Number} _page Optional; Offset displayed menu by this multiplied by Menu.numberOfOptions
     */
    static generate(_page = 1) {
        if (this.initialized !== true)
            this.initialize();

        if (!isNaN(_page) && !Menu.showingBaseMenu)
            Menu.page = _page;

        document.getElementById(this.choiceContainer).innerHTML = "";

        if (_page > 1 && parseInt(this.options.length / this.numberOfOptions) + 1 == _page) {
            this.options[this.numberOfOptions * _page - 2] = ["Menu.generate({0})".format(_page - 1), "Previous"];
        }

        var _blob = "";
        _blob += '<div class="btn-group btn-group-justified">';
        for (var i = 0; i < this.numberOfOptions; i++) {
            var _key = 0;
            var j = ((this.numberOfOptions * _page) - this.numberOfOptions) + i;

            if (this.numberOfOptions == 12) {
                switch (i) {
                    case 0: _key = "1"; break;
                    case 1: _key = "2"; break;
                    case 2: _key = "3"; break;
                    case 3: _key = "4"; break;
                    case 4: _key = "q"; break;
                    case 5: _key = "w"; break;
                    case 6: _key = "e"; break;
                    case 7: _key = "r"; break;
                    case 8: _key = "a"; break;
                    case 9: _key = "s"; break;
                    case 10: _key = "d"; break;
                    case 11: _key = "f"; break;
                }
            }
            else {
                switch (i) {
                    case 0: _key = "1"; break;
                    case 1: _key = "2"; break;
                    case 2: _key = "3"; break;
                    case 3: _key = "4"; break;
                    case 4: _key = "5"; break;
                    case 5: _key = "q"; break;
                    case 6: _key = "w"; break;
                    case 7: _key = "e"; break;
                    case 8: _key = "r"; break;
                    case 9: _key = "t"; break;
                    case 10: _key = "a"; break;
                    case 11: _key = "s"; break;
                    case 12: _key = "d"; break;
                    case 13: _key = "f"; break;
                    case 14: _key = "g"; break;
                }
            }

            if (typeof this.options[j] === 'undefined')
                _blob += this.createButton("", "&nbsp;", "&nbsp;", "", "", 2);
            else {
                _blob += this.createButton(this.options[j], _key);
            }
            if (this.numberOfOptions == 12) {
                if (i == 3 || i == 7)
                    _blob += '</div><div class="btn-group btn-group-justified">';
            }
            else {
                if (i == 4 || i == 9)
                    _blob += '</div><div class="btn-group btn-group-justified">';
            }
        }
        _blob += '</div>';
        document.getElementById(this.choiceContainer).innerHTML = _blob;
    }
    /**
     * Creates an HTML button
     * @param {String}  _functionCall The function to be called when the button is pressed
     * @param {String}  _title        The displayed text in the middle of the button
     * @param {String}  _subTitle     Optional; The displayed text at the bottom of the button
     * @param {String}  _key          Optional; The displayed text at the top right of the button
     * @param {String}  _hover        Optional; The displayed text when the button is hovered over by the mouse
     * @param {Number}  _displayType  Optional; 0 default, 1 disabled, 2 disable-invisible, 4 invisible
     * @param {String}  _btnClass     Optional; The bootstrap-specific btn sub-class
     * @return {String}               Bootstrap button as an anchor in HTML
     */
    static createButton(_functionCall, _title = "", _subTitle = "&nbsp;", _key = "", _hover = "", _displayType = 0, _btnClass = "btn-basic") {
        if (this.initialized !== true)
            this.initialize();

        if (typeof _functionCall == 'object') {
            _key = _title;
            _title = (typeof _functionCall[1] === 'undefined' ? _title : _functionCall[1]);
            _subTitle = (typeof _functionCall[2] === 'undefined' || _functionCall[2].length < 1) ? "&nbsp;" : _functionCall[2];
            _hover = (typeof _functionCall[3] === 'undefined' ? "" : _functionCall[3]);
            _displayType = (typeof _functionCall[4] === 'undefined' ? 0 : _functionCall[4]);
            _btnClass = (typeof _functionCall[5] === 'undefined' ? _btnClass : _functionCall[5]);
            _functionCall = _functionCall[0];
        }
        
        if (_functionCall.length > 0 && !_functionCall.endsWith(")"))
            _functionCall = _functionCall + "()";
        if (_btnClass == undefined || _btnClass.length == 0) _btnClass = "btn-basic";

        var _blob = "";
        _blob += '<a class="btn {0} {1}" type="button" onClick="{2}" title="{3}" style="{4}" {5}>'.format(_btnClass, (_displayType == 2 ? 'invisible' : ''), _functionCall, _hover, (_displayType == 4 ? 'opacity:0.0;' : ''), (_displayType == 1 ? 'disabled=disabled' : ''));
        if (typeof _key == "string" && _key.length > 0) _blob += '<small style="position:absolute; right:0px; top:-3px;">[{0}]</small>'.format(_key);
        _blob += '<div class="trim"><span class="button-title">{0}</span></div>'.format(_title);
        _blob += '<small class="trim"><span>{0}</span></small>'.format(_subTitle);
        _blob += '</a>';
        return _blob;
    }

    /**
     * Sets the target menu to debugChoiceContainer
     */
    static useDebugMenu() {
        if (this.initialized !== true)
            this.initialize();

        this.temporaryOptions = this.options;
        document.getElementById(this.choiceContainer).classList.add("hidden");
        this.choiceContainer = "debugChoiceContainer";
        document.getElementById(this.choiceContainer).classList.remove("hidden");
    }
    /**
     * Sets the target menu to choiceContainer
     * Doesn't, yet, reset the options
     */
    static useNormalMenu() {
        if (this.initialized !== true)
            this.initialize();

        this.options = this.temporaryOptions;
        document.getElementById(this.choiceContainer).classList.add("hidden");
        this.choiceContainer = "choiceContainer";
        document.getElementById(this.choiceContainer).classList.remove("hidden");
    }
}
class Minimap {
    constructor() {
        this.initialized = false;
    }
    static initialize() {
        this.initialized = true;
        this.mappedRooms = new Map();
        this.queuedMappedRooms = new Map();

        this.mapElement = document.getElementById('map');

        this.mapElement.setAttribute("width", mapContentDisplay.offsetWidth);
        this.mapElement.setAttribute("height", mapContentDisplay.offsetHeight);
        this.canvas = this.mapElement.getContext("2d");
        this.cWidth = this.mapElement.offsetWidth % 2 != 0 ? this.mapElement.offsetWidth - 1 : this.mapElement.offsetWidth;
        this.cHeight = this.mapElement.offsetHeight % 2 != 0 ? this.mapElement.offsetHeight - 1 : this.mapElement.offsetHeight;
        this.baseSize = Math.floor(this.cWidth/3.5);

        if (this.baseSize % 2 !== 0)
            this.baseSize--;
    }

    static clear() {
        if (this.initialized !== true)
            this.initialize();

        this.canvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    static generateMapFromStartRoom(_room) {
        if (this.initialized !== true)
            this.initialize();

        if (!(_room instanceof Room))
            _room = PSDE.hasRoom(_room) ? PSDE.getRoomByID(_room) : undefined;

        if (typeof this.canvas === 'undefined')
            this.initialize();

        this.mappedRooms.clear();
        this.queuedMappedRooms.clear();

        this.queuedMappedRooms.set(_room.id, [0, 0]);
        this.canvas.beginPath();
        this.canvas.clearRect(0, 0, this.mapElement.width, this.mapElement.height);
        this.canvas.stroke();
        this.generateMapFromRoom(_room);
    }

    static generateMapFromRoom(_room) {
        if (this.initialized !== true)
            this.initialize();

        if (!(_room instanceof Room))
            _room = PSDE.rooms.has(_room) ? PSDE.rooms.get(_room) : undefined;

        if (typeof _room.cell.backgroundColor != 'undefined')
            document.getElementById('mapContentDisplay').style.backgroundColor = _room.cell.backgroundColor;
        else
            document.getElementById('mapContentDisplay').style.backgroundColor = "rgb(44, 44, 44)";

        if (_room.attachedRooms.has(0)) {
            if (!this.mappedRooms.has(_room.attachedRooms.get(0).id) && !this.queuedMappedRooms.has(_room.attachedRooms.get(0).id)) {
                var xPos = this.queuedMappedRooms.get(_room.id)[0];
                var yPos = this.queuedMappedRooms.get(_room.id)[1] - 1;
                if (_room.cell == _room.attachedRooms.get(0).cell)
                    this.queuedMappedRooms.set(_room.attachedRooms.get(0).id,[xPos,yPos]);
                else {
                    if (typeof _room.attachedRooms.get(0).cell.location.image != 'undefined')
                        this.drawFacade(xPos, yPos, _room.attachedRooms.get(0).cell.location.image);
                }
            }
        }

        if (_room.attachedRooms.has(1)) {
            if (!this.mappedRooms.has(_room.attachedRooms.get(1).id) && !this.queuedMappedRooms.has(_room.attachedRooms.get(1).id)) {
                var xPos = this.queuedMappedRooms.get(_room.id)[0] + 1;
                var yPos = this.queuedMappedRooms.get(_room.id)[1];
                if (_room.cell == _room.attachedRooms.get(1).cell)
                    this.queuedMappedRooms.set(_room.attachedRooms.get(1).id,[xPos,yPos]);
                else {
                    if (typeof _room.attachedRooms.get(1).cell.location.image != 'undefined')
                        this.drawFacade(xPos, yPos, _room.attachedRooms.get(1).cell.location.image);
                }
            }
        }

        if (_room.attachedRooms.has(2)) {
            if (!this.mappedRooms.has(_room.attachedRooms.get(2).id) && !this.queuedMappedRooms.has(_room.attachedRooms.get(2).id)) {
                var xPos = this.queuedMappedRooms.get(_room.id)[0];
                var yPos = this.queuedMappedRooms.get(_room.id)[1] + 1;
                if (_room.cell == _room.attachedRooms.get(2).cell)
                    this.queuedMappedRooms.set(_room.attachedRooms.get(2).id,[xPos,yPos]);
                else {
                    if (typeof _room.attachedRooms.get(2).cell.location.image != 'undefined')
                        this.drawFacade(xPos, yPos, _room.attachedRooms.get(2).cell.location.image);
                }
            }
        }

        if (_room.attachedRooms.has(3)) {
            if (!this.mappedRooms.has(_room.attachedRooms.get(3).id) && !this.queuedMappedRooms.has(_room.attachedRooms.get(3).id)) {
                var xPos = this.queuedMappedRooms.get(_room.id)[0] - 1;
                var yPos = this.queuedMappedRooms.get(_room.id)[1];
                if (_room.cell == _room.attachedRooms.get(3).cell)
                    this.queuedMappedRooms.set(_room.attachedRooms.get(3).id,[xPos,yPos]);
                else {
                    if (typeof _room.attachedRooms.get(3).cell.location.image != 'undefined')
                        this.drawFacade(xPos, yPos, _room.attachedRooms.get(3).cell.location.image);
                }
            }
        }

        this.generateRoom(
            this.queuedMappedRooms.get(_room.id)[0],
            this.queuedMappedRooms.get(_room.id)[1],
            _room.northSide,
            _room.eastSide,
            _room.southSide,
            _room.westSide,
            (this.queuedMappedRooms.get(_room.id)[0] == 0 && this.queuedMappedRooms.get(_room.id)[1] == 0),
            _room
        );

        this.mappedRooms.set(_room.id, [this.queuedMappedRooms.get(_room.id)[0], this.queuedMappedRooms.get(_room.id)[1]]);
        this.queuedMappedRooms.delete(_room.id);

        for (var i = 0; i < this.queuedMappedRooms.size; i++) {
            this.generateMapFromRoom(Array.from(this.queuedMappedRooms)[i][0]);
        }
    }

    static generateRoom(xPos = 0, yPos = 0, north = 1, east = 1, south = 1, west = 1, currentRoom = false, _room) {
        if (this.initialized !== true)
            this.initialize();

        if (!(_room instanceof Room))
            _room = PSDE.rooms.has(_room) ? PSDE.rooms.get(_room) : undefined;

        var originalX = this.cWidth/2 - this.baseSize/2 + (xPos * this.baseSize);
        var originalY = this.cHeight/2 - this.baseSize/2 + (yPos * this.baseSize);
        var currentX = originalX;
        var currentY = originalY;
        var _lineWidth = 1;

        var _wallColour = "#000000";
        var _characterPortraitLinks = [];
        var _itemPortraitLinks = [];

        // Modify room wall colour
        if (_room.location.owner.size > 0) {
            var _owner = _room.location.getOwner(0);
            if (typeof _owner.furColourAHex != 'undefined')
                _wallColour = _owner.furColourAHex;
        }

        // Add floor image
        var floorImage = undefined;
        if (typeof _room.floorImage != 'undefined')
            floorImage = _room.floorImage;
        else if (_room.location instanceof Location && typeof _room.location.floorImage != 'undefined')
            floorImage = _room.location.floorImage;
        else if (_room.cell instanceof Cell && typeof _room.cell.floorImage != 'undefined')
            floorImage = _room.cell.floorImage;
        else if (_room.cell.location instanceof Location && typeof _room.cell.location.floorImage != 'undefined')
            floorImage = _room.cell.location.floorImage;

        if (typeof floorImage != 'undefined') {
            this.canvas.drawImage(floorImage, originalX, originalY, this.baseSize, this.baseSize);
        }

        // add rug image
        if (typeof _room.rugImage != 'undefined') {
            this.canvas.drawImage(_room.rugImage, originalX, originalY, this.baseSize, this.baseSize);
        }

        // Add current room overlay
        if (currentRoom) {
            this.canvas.beginPath();
            this.canvas.rect(originalX + 4, originalY + 4, this.baseSize - 8, this.baseSize - 8);
            this.canvas.setLineDash([2, 15]);
            this.canvas.strokeStyle = (typeof PSDE.player.furColourAHex != 'undefined' ? PSDE.player.furColourAHex : (PSDE.player.hasFurColouration ? PSDE.player.furColourA : "rgba(255, 255, 0, 0.5)"));
            this.canvas.stroke();

            this.canvas.strokeStyle = "rgb(0, 0, 0)";
            this.canvas.setLineDash([]);
        }

        // Add optional overlays

        // Add item icons to rooms
        /*_room.items.forEach(function(_item) {
            _itemPortraitLinks.push(_item.image);
        }, this);*/

        // Add character icons to rooms
        if (_room.hasCharacters()) {
            var _i = 0;
            var characterPortraitLink = undefined;
            _room.characters.forEach(function(_character) {
                characterPortraitLink = new Image();
                characterPortraitLink.src = _character.image;
                characterPortraitLink.canvas = this.canvas;
                characterPortraitLink.i = _i;
                characterPortraitLink.originalX = originalX;
                characterPortraitLink.originalY = originalY;
                characterPortraitLink.baseSize = this.baseSize;
                characterPortraitLink.onload = function() {
                    switch (this.i) {
                        case 0 : {this.canvas.drawImage(this,   this.originalX + this.baseSize/3,       this.originalY + this.baseSize/3,       this.baseSize/4,    this.baseSize/4); break;}
                        case 1 : {this.canvas.drawImage(this,   this.originalX + this.baseSize/4,       this.originalY + (this.baseSize/5),     this.baseSize/4,    this.baseSize/4); break;}
                        case 2 : {this.canvas.drawImage(this,   this.originalX + this.baseSize/10,      this.originalY + (this.baseSize*3/10),  this.baseSize/4,    this.baseSize/4); break;}
                        case 3 : {this.canvas.drawImage(this,   this.originalX + this.baseSize/4,       this.originalY + (this.baseSize*2/5),   this.baseSize/4,    this.baseSize/4); break;}
                        case 4 : {this.canvas.drawImage(this,   this.originalX + this.baseSize/10,      this.originalY + (this.baseSize*5/10),  this.baseSize/4,    this.baseSize/4); break;}
                        case 5 : {this.canvas.drawImage(this,   this.originalX + this.baseSize/4,       this.originalY + (this.baseSize*3/5),   this.baseSize/4,    this.baseSize/4); break;}
                        case 6 : {this.canvas.drawImage(this,   this.originalX + this.baseSize/10,      this.originalY + (this.baseSize*7/10),  this.baseSize/4,    this.baseSize/4); break;}
                        case 7 : {this.canvas.drawImage(this,   this.originalX + this.baseSize/4,       this.originalY + (this.baseSize*4/5),   this.baseSize/4,    this.baseSize/4); break;}
                    }
                };
                _i++;
            }, this);
        }

        this.canvas.beginPath();
        this.canvas.moveTo((this.cWidth - this.baseSize)/2 + (xPos * this.baseSize) + 1, (this.cHeight - this.baseSize)/2 + (yPos * this.baseSize) + 1);

        if (west == 1) {
            this.canvas.lineTo(currentX + 1, currentY + this.baseSize/3);
            currentY += this.baseSize/3;
            this.canvas.moveTo(currentX + 1, currentY + this.baseSize/3);
            currentY += this.baseSize/3;
            this.canvas.lineTo(currentX + 1, currentY + this.baseSize/3);
            currentY += this.baseSize/3;
        }
        else if (west == 2) {
            this.canvas.lineTo(currentX + 1, currentY + this.baseSize/3);
            currentY += this.baseSize/3;
            this.canvas.strokeStyle =_wallColour;
            this.canvas.lineWidth = _lineWidth;
            this.canvas.stroke();

            this.canvas.beginPath();
            this.canvas.moveTo(currentX + 1, currentY);
            this.canvas.lineTo(currentX + 1, currentY + this.baseSize/3);
            this.canvas.strokeStyle = '#FF0000';
            this.canvas.stroke();

            currentY += this.baseSize/3;
            this.canvas.beginPath();
            this.canvas.moveTo(currentX + 1, currentY);
            this.canvas.lineTo(currentX + 1, currentY + this.baseSize/3);
            currentY += this.baseSize/3;
        }
        else if (west == 3) {
            this.canvas.lineTo(currentX + 1, currentY + this.baseSize);
            currentY += this.baseSize;
        }
        else {
            currentY += this.baseSize;
            this.canvas.moveTo(currentX + 1, currentY);
        }

        this.canvas.moveTo(currentX + 1, currentY - 1);

        if (south == 1) {
            this.canvas.lineTo(currentX + this.baseSize/3, currentY - 1);
            currentX += this.baseSize/3;
            this.canvas.moveTo(currentX + this.baseSize/3, currentY - 1);
            currentX += this.baseSize/3;
            this.canvas.lineTo(currentX + this.baseSize/3, currentY - 1);
            currentX += this.baseSize/3;
        }
        else if (south == 2) {
            this.canvas.lineTo(currentX + this.baseSize/3, currentY - 1);
            currentX += this.baseSize/3;
            this.canvas.strokeStyle =_wallColour;
            this.canvas.lineWidth = _lineWidth;
            this.canvas.stroke();

            this.canvas.beginPath();
            this.canvas.moveTo(currentX, currentY - 1);
            this.canvas.lineTo(currentX + this.baseSize/3, currentY - 1);
            this.canvas.strokeStyle = '#FF0000';
            this.canvas.stroke();

            currentX += this.baseSize/3;
            this.canvas.beginPath();
            this.canvas.moveTo(currentX, currentY - 1);
            this.canvas.lineTo(currentX + this.baseSize/3, currentY - 1);
            currentX += this.baseSize/3;
        }
        else if (south == 3) {
            this.canvas.lineTo(currentX + this.baseSize, currentY - 1);
            currentX += this.baseSize;
        }
        else {
            currentX += this.baseSize;
            this.canvas.moveTo(currentX, currentY - 1);
        }

        this.canvas.moveTo(currentX - 1, currentY - 1);

        if (east == 1) {
            this.canvas.lineTo(currentX - 1, currentY - this.baseSize/3);
            currentY -= this.baseSize/3;
            this.canvas.moveTo(currentX - 1, currentY - this.baseSize/3);
            currentY -= this.baseSize/3;
            this.canvas.lineTo(currentX - 1, currentY - this.baseSize/3);
            currentY -= this.baseSize/3;
        }
        else if (east == 2) {
            this.canvas.lineTo(currentX - 1, currentY - this.baseSize/3);
            currentY -= this.baseSize/3;
            this.canvas.strokeStyle =_wallColour;
            this.canvas.lineWidth = _lineWidth;
            this.canvas.stroke();

            this.canvas.beginPath();
            this.canvas.moveTo(currentX - 1, currentY);
            this.canvas.lineTo(currentX - 1, currentY - this.baseSize/3);
            this.canvas.strokeStyle = '#FF0000';
            this.canvas.stroke();

            currentY -= this.baseSize/3;
            this.canvas.beginPath();
            this.canvas.moveTo(currentX - 1, currentY);
            this.canvas.lineTo(currentX - 1, currentY - this.baseSize/3);
            currentY -= this.baseSize/3;
        }
        else if (east == 3) {
            this.canvas.lineTo(currentX - 1, currentY - this.baseSize);
            currentY -= this.baseSize;
        }
        else {
            currentY -= this.baseSize;
            this.canvas.moveTo(currentX - 1, currentY);
        }

        this.canvas.moveTo(currentX - 1, currentY + 1);

        if (north == 1) {
            this.canvas.lineTo(currentX - this.baseSize/3, currentY + 1);
            currentX -= this.baseSize/3;
            this.canvas.moveTo(currentX - this.baseSize/3, currentY + 1);
            currentX -= this.baseSize/3;
            this.canvas.lineTo(currentX - this.baseSize/3, currentY + 1);
            currentX -= this.baseSize/3;
        }
        else if (north == 2) {
            this.canvas.lineTo(currentX - this.baseSize/3, currentY + 1);
            currentX -= this.baseSize/3;
            this.canvas.strokeStyle =_wallColour;
            this.canvas.lineWidth = _lineWidth;
            this.canvas.stroke();

            this.canvas.beginPath();
            this.canvas.moveTo(currentX, currentY + 1);
            this.canvas.lineTo(currentX - this.baseSize/3, currentY + 1);
            this.canvas.strokeStyle = '#FF0000';
            this.canvas.stroke();

            currentX -= this.baseSize/3;
            this.canvas.beginPath();
            this.canvas.moveTo(currentX, currentY + 1);
            this.canvas.lineTo(currentX - this.baseSize/3, currentY + 1);
            currentX -= this.baseSize/3;
        }
        else if (north == 3) {
            this.canvas.lineTo(currentX - this.baseSize, currentY + 1);
            currentX -= this.baseSize;
        }
        else {
            currentX -= this.baseSize;
            this.canvas.moveTo(currentX, currentY + 1);
        }

        this.canvas.strokeStyle =_wallColour;
        this.canvas.stroke();

        // Add stairs
        /*
        // Draw stairs
        if (_room.attachedRooms.has(5) || _room.attachedRooms.has(4)) {
            this.canvas.beginPath();
            currentX = originalX + this.baseSize/12;
            currentY = originalY + this.baseSize/2;
            this.canvas.moveTo(currentX, currentY);
            currentY -= this.baseSize/12;
            this.canvas.lineTo(currentX, currentY);
            currentX += this.baseSize/12;
            this.canvas.lineTo(currentX, currentY);
            currentY -= this.baseSize/12;
            this.canvas.lineTo(currentX, currentY);
            currentX += this.baseSize/12;
            this.canvas.lineTo(currentX, currentY);
            currentY -= this.baseSize/12;
            this.canvas.lineTo(currentX, currentY);
            currentX += this.baseSize/12;
            this.canvas.lineTo(currentX, currentY);
            currentY -= this.baseSize/12;
            this.canvas.lineTo(currentX, currentY);
            currentX += this.baseSize/12;
            this.canvas.lineTo(currentX, currentY);
            currentY -= this.baseSize/12;
            this.canvas.lineTo(currentX, currentY);
            currentX += this.baseSize/12;
            this.canvas.lineTo(currentX, currentY);
            this.canvas.strokeStyle = '#0099FF';
            this.canvas.stroke();

            this.canvas.beginPath();
            this.canvas.fillStyle = '#0099FF';
            if (_room.attachedRooms.has(5)) {
                this.canvas.moveTo(originalX + this.baseSize/6, originalY + this.baseSize/12);
                this.canvas.lineTo(originalX + this.baseSize/12, originalY + this.baseSize/6);
                this.canvas.lineTo(originalX + this.baseSize/4, originalY + this.baseSize/6);
            }
            if (_room.attachedRooms.has(4)) {
                this.canvas.moveTo(originalX + this.baseSize/4 + this.baseSize/6, originalY + this.baseSize/4 + this.baseSize/4);
                this.canvas.lineTo(originalX + this.baseSize/4 + this.baseSize/12, originalY + this.baseSize/4 + this.baseSize/6);
                this.canvas.lineTo(originalX + this.baseSize/4 + this.baseSize/4, originalY + this.baseSize/4 + this.baseSize/6);
            }
            this.canvas.fill();
            this.canvas.strokeStyle = '#0099FF';
            this.canvas.stroke();
        }
        */
        // Image stairs
        if (_room.attachedRooms.has(5) && _room.attachedRooms.has(4)) {
            var stairsUpImage = woodenStairsUpLeft01;
            var stairsDownImage = woodenStairsDownRight01;

            if (typeof _room.stairsUpImage != 'undefined')
                stairsUpImage = _room.stairsUpImage;

            if (typeof _room.stairsDownImage != 'undefined')
                stairsDownImage = _room.stairsDownImage;

            this.canvas.drawImage(stairsUpImage, originalX, originalY, this.baseSize, this.baseSize);
            this.canvas.drawImage(stairsDownImage, originalX, originalY, this.baseSize, this.baseSize);
        }
        else {
            if (_room.attachedRooms.has(5)) {
                var stairsUpImage = woodenStairsUpRight01;
                if (typeof _room.stairsUpImage != 'undefined')
                    stairsUpImage = _room.stairsUpImage;
                this.canvas.drawImage(stairsUpImage, originalX, originalY, this.baseSize, this.baseSize);
            }
            if (_room.attachedRooms.has(4)) {
                var stairsDownImage = woodenStairsDownLeft01;
                if (typeof _room.stairsDownImage != 'undefined')
                    stairsDownImage = _room.stairsDownImage;
                this.canvas.drawImage(stairsDownImage, originalX, originalY, this.baseSize, this.baseSize);
            }
        }

        if (PSDE.enableDebug) {
            this.canvas.fillStyle = "yellow";
            this.canvas.textAlign = "center";
            this.canvas.fillText("<{0}, {1}>".format(_room.x, _room.y), originalX + this.baseSize / 2, originalY + this.baseSize / 2);
        }
    }

    static drawFacade(xPos, yPos, facade) {
        if (this.initialized !== true)
            this.initialize();

        var originalX = (this.cWidth - this.baseSize)/2 + (xPos * this.baseSize);
        var originalY = (this.cHeight - this.baseSize)/2 + (yPos * this.baseSize);

        var facadeLink = new Image();
        facadeLink.src = facade;
        facadeLink.canvas = this.canvas;
        facadeLink.originalX = originalX;
        facadeLink.originalY = originalY;
        facadeLink.baseSize = this.baseSize;
        facadeLink.onload = function() {
            this.canvas.drawImage(this, originalX, originalY, this.baseSize, this.baseSize);
        };
    }
}

class PSDE {
    constructor() {
        this.initialized = false;
        //this.initialized = false;
    }
    static initialize() {
        this.initialized = true;
        /**
         * Map of BodyParts
         * @type {Map<String, BodyPart}
         */
        this.bodyParts = new Map();
        /**
         * Map of Cells
         * @type {Map<String, Cell}
         */
        this.cells = new Map();
        /**
         * Map of Characters
         * @type {Map<String, Character}
         */
        this.characters = new Map();
        /**
         * Map of pathed Character movements from Room to Room
         * @type {Map<Character, Set<Room>>}
         */
        this.characterPathes = new Map();
        /**
         * Previous Room
         * @type {Map<Character, Room>}
         */
        this.characterPreviousRoom = new Map;
        /**
         * Current Room
         * @type {Map<Character, Room>}
         */
        this.characterCurrentRoom = new Map();
        this.furnitureRoom = new Map();
        /**
         * Currently used furniture
         * @type {Map<Character, Furniture>}
         */
        this.characterFurniture = new Map();
        /**
         * Map of Clothing
         * @type {Map<String, Clothing>}
         */
        this.clothing = new Map();
        /**
         * Map of Consumables
         * @type {Map<String, Consumable>}
         */
        this.consumables = new Map();
        /**
         * Map of Entities
         * @type {Map<String, Entity}
         */
        this.entities = new Map();
        /**
         * Map of GameEvent(s)
         * @type {Map<String, GameEvent>}
         */
        this.events = new Map();
        /**
         * Map of Furniture
         * @type {Map<String, Furniture>}
         */
        this.furniture = new Map();
        /**
         * Map of Items
         * @type {Map<String, Item>}
         */
        this.items = new Map();
        /**
         * Map of Instances
         * @type {Map<String, Instance>}
         */
        this.instances = new Map();
        /**
         * Map of Item Instances
         * @type {Map<String, ItemInstance>}
         */
        this.itemInstances = new Map();
        /**
         * Map of BodyPart Instances
         * @type {Map<String, ItemInstance>}
         */
        this.bodyPartInstances = new Map();
        /**
         * Map of Keys
         * @type {Map<String, this.key>}
         */
        this.keys = new Map();
        /**
         * Map of Locations
         * @type {Map<String, Location>}
         */
        this.locations = new Map();
        /**
         * Map of Phones
         * @type {Map<String, Phone>}
         */
        this.phones = new Map();
        /**
         * Map of Phone Instances
         * @type {Map<String, PhoneInstance>}
         */
        this.phoneInstances = new Map();
        /**
         * Map of Cheques
         * @type {Map<String, Cheque>}
         */
        this.cheques = new Map();
        /**
         * Map of Weapons
         * @type {Map<String, Room>}
         */
        this.weapons = new Map();
        /**
         * Map of Weapon Instances
         * @type {Map<String, WeaponInstance>}
         */
        this.weaponInstances = new Map();
        /**
         * Map of Armor
         * @type {Map<String, Room>}
         */
        this.armor = new Map();
        /**
         * Map of Armor Instances
         * @type {Map<String, ArmorInstance>}
         */
        this.armorInstances = new Map();
        /**
         * Map of Rooms
         * @type {Map<String, Room>}
         */
        this.rooms = new Map();
        /**
         * Map of Spells
         * @type {Map<String, Spell>}
         */
        this.spells = new Map();
        /**
         * Map of TextMessages
         * @type {Map<String, TextMessage>}
         */
        this.textMessages = new Map();
        /**
         * Map of WebPages
         * @type {Map<String, WebPage}
         */
        this.webPages = new Map();
        /**
         * Map of WebSites
         * @type {Map<String, WebSite>}
         */
        this.webSites = new Map();

        this.player = undefined;
        this.agreeTOS = false;
        this.lastMenu = undefined;
        this.lastGameEvent = undefined;
        this.enableThreeDContent = false;
        this.enableDebug = false;
        this.enableGore = false;
        this.enableRape = false;
        this.enableAudio = false;
        this.enableImages = true;
        this.enableVideo = true;
        this.enableMinimap = true;
        this.enableAutoscroll = false;
        this.enablePopups = false;
        this.currentTime = new Date("2017-07-03T17:35:00.000Z");
        this.previousTime = this.currentTime;
        this.pov = 2; // 1 - first person, 2 - second person, 3 - third person

        this._eventsExecutedThisTick = new Set(); // Set of Events executed during the current Tick
        this._scenesViewedThisWindow = new Set(); // Set of Events executed during the current Room visit
        this._interruptTick = false;
        this._interruptMenu = false;

        this.kMale = 0, this.kFemale = 1;
        this.kSpeciesTypes = new Set(["fox","wolf","aardwolf","hyena","sheep","stoat","deer","rabbit","jackal","coyote","tiger","antelope","pig","horse","mouse"]);
        this.kBodyPartTypes = new Set(["ankles","anus","arms","arms","back","breasts","chest","clitoris","feet","fingers","groin","hands","head","knot","leftAnkle","leftArm","leftEar","leftEye","leftFoot","leftHand","leftLeg","leftNipple","leftShoulder","legs","legs","lips","mouth","neck","nose","penis","rear","rightAnkle","rightArm","rightEar","rightEye","rightFoot","rightHand","rightLeg","rightNipple","rightShoulder","shoulders","shoulders","stomach","testicles","toes","tongue","vagina","waist","wrists"]);
        this.kClothingTypes = new Set(["hat","mask","glasses","earPiercingLeft","earPiercingRight","nosePiercing","lipPiercing","tonguePiercing","collar","neckwear","shirt","jacket","belt","gloves","underwear","pants","socks","shoes","bra"]);
        this.kHandTypes = new Set(["fur","pad","hoof","clovenhoof","skin"]);
        this.kFeetTypes = this.kHandTypes;
        this.kEyeTypes = new Set(["circle","slit","rectangle","none"]);
        this.kPeltTypes = new Set(["skin","fur","wool","hair"]);
        this.kLocationTypes = new Set(["general","city","house","apartment","bank","park","store"]);
        this.kRoomTypes = new Set(["hallway","lobby","bedroom","livingroom","bathroom","kitchen","diningroom","closet","basement","extBuilding","street","walkway","lot"]);
        this.kFurnitureTypes = new Set(["chair","recliner","loveseat","couch","bed","table","desk","shelf","cupboard","cabinet","bureau","hook","tv","fridge","oven","microwave","toaster","tub","shower","sink","toilet","mirror","brokenMirror","basket","altar","sculpture"]);
        this.kIntraactionTypes = new Set(["lay","sit","sleep","stand","stay","walk","kneel"]);
        this.kInteractionTypes = new Set(["attack","charmed","bite","boop","cast","channel","choke","consume","cut","disrobe","fist","follow","give","grope","hold","hug","kiss","lick","look","massage","masturbate","open","oral","pinch","poke","pray","pull","punch","push","put","rape","release","remove","rub","sex","sit","slap","steal","stroke","suck","take","talk","thrust","touch","use","wear"]);
        this.kActionTypes = new Set([...this.kIntraactionTypes, ...this.kInteractionTypes]);
        this.kConsumableTypes = new Set(["food","drink","medicine","other"]);
        this.kSpecialProperties = new Set(["exists","living","dead","mirror","water","earth","metal","broken","wood","magic","nature","container","charm","bone","jagged","smooth","cursed","blessed","bludgeoning","slashing","piercing","acid","cold","fire","lightning","necrotic","poison"]);

        this.kCharacterXPMax = 355000;
        this.kCharacterLevelMax = 20;

        /**
         * Classless should be a broad description for commoner, expert, and noble; it shouldn't be used, unless I'm lazy.
         * @type {Set}
         */
        this.kCharacterClasses = new Set(["bard","cleric","druid","paladin","ranger","sorcerer","warlock","wizard","classless","commoner","expert","noble"]);

        this.kSpellSchools = new Set(["abjuration","conjuration","divination","enchantment","evocation","illusion","necromancy","transmutation","universal"]);

        this.kWeaponSimpleMeleeTypes = new Set(["club","dagger","greatclub","handaxe","javelin","lighthammer","mace","quarterstaff","sickle","spear"]);
        this.kWeaponSimpleRangedTypes = new Set(["lightcrossbow","dart","shortbow","sling"]);
        this.kWeaponMartialMeleeTypes = new Set(["battleaxe","flail","glaive","greataxe","greatsword","halberd","lance","longsword","maul","morningstar","pike","rapier","scimitar","shortsword","trident","warpick","warhammer","whip"]);
        this.kWeaponMartialRangedTypes = new Set(["blowgun","handcrossbow","heavycrossbow","longbow","net"]);
        this.kWeaponMeleeTypes = new Set([...this.kWeaponSimpleMeleeTypes, ...this.kWeaponMartialMeleeTypes]);
        this.kWeaponRangedTypes = new Set([...this.kWeaponSimpleRangedTypes, ...this.kWeaponMartialRangedTypes]);
        this.kWeaponTypes = new Set([...this.kWeaponMeleeTypes, ...this.kWeaponRangedTypes]);
        this.kWeaponProperties = new Set(["ammunition","finesse","heavy","light","loading","range","reach","special","thrown","twohanded","versatile"]);

        this.kDamageTypes = new Set(["bludgeoning","slashing","piercing","acid","cold","fire","lightning","necrotic","poison","psychic","radiant","thunder"]);

        this.kWeaponTypeProperties = new Map();
            this.kWeaponTypeProperties.set("club", new Set(["light"]));
            this.kWeaponTypeProperties.set("dagger", new Set(["finesse","light","range","thrown"]));
            this.kWeaponTypeProperties.set("greatclub", new Set(["twohanded"]));
            this.kWeaponTypeProperties.set("handaxe", new Set(["light","range","thrown"]));
            this.kWeaponTypeProperties.set("javeline", new Set(["range","thrown"]));
            this.kWeaponTypeProperties.set("lighthammer", new Set(["light","range","thrown"]));
            this.kWeaponTypeProperties.set("mace", new Set());
            this.kWeaponTypeProperties.set("quarterstaff", new Set(["versatile"]));
            this.kWeaponTypeProperties.set("sickle", new Set(["light"]));
            this.kWeaponTypeProperties.set("spear", new Set(["range","versatile"]));
            this.kWeaponTypeProperties.set("lightcrossbow", new Set(["ammunition","loading","range","twohanded"]));
            this.kWeaponTypeProperties.set("dart", new Set(["finesse","range","thrown"]));
            this.kWeaponTypeProperties.set("shortbow", new Set(["ammunition","range","twohanded"]));
            this.kWeaponTypeProperties.set("sling", new Set(["ammunition","range"]));
            this.kWeaponTypeProperties.set("battleaxe", new Set(["versatile"]));
            this.kWeaponTypeProperties.set("flail", new Set());
            this.kWeaponTypeProperties.set("glaive", new Set(["heavy","reach","twohanded"]));
            this.kWeaponTypeProperties.set("greataxe", new Set(["heavy","twohanded"]));
            this.kWeaponTypeProperties.set("greatsword", new Set(["heavy","twohanded"]));
            this.kWeaponTypeProperties.set("halberd", new Set(["heavy","reach","twohanded"]));
            this.kWeaponTypeProperties.set("lance", new Set(["reach","special"]));
            this.kWeaponTypeProperties.set("longsword", new Set(["versatile"]));
            this.kWeaponTypeProperties.set("maul", new Set(["heavy","twohanded"]));
            this.kWeaponTypeProperties.set("morningstar", new Set());
            this.kWeaponTypeProperties.set("pike", new Set(["heavy","reach"]));
            this.kWeaponTypeProperties.set("rapier", new Set(["finesse"]));
            this.kWeaponTypeProperties.set("scimitar", new Set(["finesse","light"]));
            this.kWeaponTypeProperties.set("shortsword", new Set(["finesse","light"]));
            this.kWeaponTypeProperties.set("trident", new Set(["range","thrown","versatile"]));
            this.kWeaponTypeProperties.set("warpick", new Set());
            this.kWeaponTypeProperties.set("warhammer", new Set(["versatile"]));
            this.kWeaponTypeProperties.set("whip", new Set(["finesse","reach"]));
            this.kWeaponTypeProperties.set("blowgun", new Set(["ammunition","range","loading"]));
            this.kWeaponTypeProperties.set("crossbowhand", new Set(["ammunition","light","loading","range"]));
            this.kWeaponTypeProperties.set("crossbowheavy", new Set(["ammunition","heavy","loading","range","twohanded"]));
            this.kWeaponTypeProperties.set("longbow", new Set(["ammunition","heavy","range","twohanded"]));
            this.kWeaponTypeProperties.set("net", new Set(["special","thrown"]));
        this.kWeaponTypeDamage = new Map();
            this.kWeaponTypeDamage.set("club","1d4");
            this.kWeaponTypeDamage.set("dagger","1d4");
            this.kWeaponTypeDamage.set("greatclub","1d8");
            this.kWeaponTypeDamage.set("handaxe","1d6");
            this.kWeaponTypeDamage.set("javeline","1d6");
            this.kWeaponTypeDamage.set("lighthammer","1d4");
            this.kWeaponTypeDamage.set("mace","1d6");
            this.kWeaponTypeDamage.set("quarterstaff","1d6");
            this.kWeaponTypeDamage.set("sickle","1d4");
            this.kWeaponTypeDamage.set("spear","1d6");
            this.kWeaponTypeDamage.set("lightcrossbow","1d8");
            this.kWeaponTypeDamage.set("dart","1d4");
            this.kWeaponTypeDamage.set("shortbow","1d6");
            this.kWeaponTypeDamage.set("sling","1d4");
            this.kWeaponTypeDamage.set("battleaxe","1d8");
            this.kWeaponTypeDamage.set("flail","1d8");
            this.kWeaponTypeDamage.set("glaive","1d10");
            this.kWeaponTypeDamage.set("greataxe","1d12");
            this.kWeaponTypeDamage.set("greatsword","2d6");
            this.kWeaponTypeDamage.set("halberd","1d10");
            this.kWeaponTypeDamage.set("lance","1d12");
            this.kWeaponTypeDamage.set("longsword","1d8");
            this.kWeaponTypeDamage.set("maul","2d6");
            this.kWeaponTypeDamage.set("morningstar","1d8");
            this.kWeaponTypeDamage.set("pike","1d10");
            this.kWeaponTypeDamage.set("rapier","1d8");
            this.kWeaponTypeDamage.set("scimitar","1d6");
            this.kWeaponTypeDamage.set("shortsword","1d6");
            this.kWeaponTypeDamage.set("trident","1d6");
            this.kWeaponTypeDamage.set("warpick","1d8");
            this.kWeaponTypeDamage.set("warhammer","1d8");
            this.kWeaponTypeDamage.set("whip","1d4");
            this.kWeaponTypeDamage.set("blowgun","1d2");
            this.kWeaponTypeDamage.set("crossbowhand","1d6");
            this.kWeaponTypeDamage.set("crossbowheavy","1d10");
            this.kWeaponTypeDamage.set("longbow","1d8");
        this.kWeaponTypeCost = new Map();
            this.kWeaponTypeCost.set("club",0.1);
            this.kWeaponTypeCost.set("dagger",20);
            this.kWeaponTypeCost.set("greatclub",2);
            this.kWeaponTypeCost.set("handaxe",50);
            this.kWeaponTypeCost.set("javeline",50);
            this.kWeaponTypeCost.set("lighthammer",20);
            this.kWeaponTypeCost.set("mace",50);
            this.kWeaponTypeCost.set("quarterstaff",2);
            this.kWeaponTypeCost.set("sickle",10);
            this.kWeaponTypeCost.set("spear",10);
            this.kWeaponTypeCost.set("lightcrossbow",250);
            this.kWeaponTypeCost.set("dart",0.5);
            this.kWeaponTypeCost.set("shortbow",250);
            this.kWeaponTypeCost.set("sling",1);
            this.kWeaponTypeCost.set("battleaxe",100);
            this.kWeaponTypeCost.set("flail",100);
            this.kWeaponTypeCost.set("glaive",200);
            this.kWeaponTypeCost.set("greataxe",300);
            this.kWeaponTypeCost.set("greatsword",500);
            this.kWeaponTypeCost.set("halberd",200);
            this.kWeaponTypeCost.set("lance",100);
            this.kWeaponTypeCost.set("longsword",150);
            this.kWeaponTypeCost.set("maul",100);
            this.kWeaponTypeCost.set("morningstar",150);
            this.kWeaponTypeCost.set("pike",50);
            this.kWeaponTypeCost.set("rapier",250);
            this.kWeaponTypeCost.set("scimitar",250);
            this.kWeaponTypeCost.set("shortsword",100);
            this.kWeaponTypeCost.set("trident",50);
            this.kWeaponTypeCost.set("warpick",50);
            this.kWeaponTypeCost.set("warhammer",150);
            this.kWeaponTypeCost.set("whip",20);
            this.kWeaponTypeCost.set("blowgun",100);
            this.kWeaponTypeCost.set("crossbowhand",750);
            this.kWeaponTypeCost.set("crossbowheavy",500);
            this.kWeaponTypeCost.set("longbow",500);
            this.kWeaponTypeCost.set("net",10);

        this.kArmorLightTypes = new Set(["padded","leather","studdedleather"]);
        this.kArmorMediumTypes = new Set(["hide","chainshirt","scalemail","breastplate","halfplate"]);
        this.kArmorHeavyTypes = new Set(["ringmail","chainmail","splint","plate"]);
        this.kShieldTypes = new Set(["shield"]);
        this.kArmorTypes = new Set([...this.kArmorLightTypes, ...this.kArmorMediumTypes, ...this.kArmorHeavyTypes, ...this.kShieldTypes]);
        /**
         * Amount of protection from attacks
         * @type {Map} <String, Number>
         */
        this.kArmorTypeClass = new Map();
            this.kArmorTypeClass.set("padded", 11);
            this.kArmorTypeClass.set("leather", 11);
            this.kArmorTypeClass.set("studdedleather", 12);
            this.kArmorTypeClass.set("hide", 12);
            this.kArmorTypeClass.set("chainshirt", 13);
            this.kArmorTypeClass.set("scalemail", 14);
            this.kArmorTypeClass.set("breastplate", 14);
            this.kArmorTypeClass.set("halfplate", 15);
            this.kArmorTypeClass.set("ringmail", 14);
            this.kArmorTypeClass.set("chainmail", 16);
            this.kArmorTypeClass.set("splint", 17);
            this.kArmorTypeClass.set("plate", 18);
            this.kArmorTypeClass.set("shield", 2);
        /**
         * Whether or not an ArmorType has a strength requirement which is a detriment to stealth
         * @type {Map}
         */
        this.kArmorTypeStrength = new Map();
            this.kArmorTypeStrength.set("chainmail", 13);
            this.kArmorTypeStrength.set("splint", 15);
            this.kArmorTypeStrength.set("plate", 15);
        /**
         * Whether or not an ArmorType is a detriment to stealth
         * @type {Map} <String, boolean>
         */
        this.kArmorTypeStealth = new Map();
            this.kArmorTypeStealth.set("padded", false);
            this.kArmorTypeStealth.set("scalemail", false);
            this.kArmorTypeStealth.set("halfplate", false);
            this.kArmorTypeStealth.set("ringmail", false);
            this.kArmorTypeStealth.set("chainmail", false);
            this.kArmorTypeStealth.set("splint", false);
            this.kArmorTypeStealth.set("plate", false);
        this.kArmorTypeCost = new Map();
            this.kArmorTypeCost.set("padded", 50);
            this.kArmorTypeCost.set("leather", 100);
            this.kArmorTypeCost.set("studdedleather", 450);
            this.kArmorTypeCost.set("hide", 100);
            this.kArmorTypeCost.set("chainshirt", 50);
            this.kArmorTypeCost.set("scalemail", 500);
            this.kArmorTypeCost.set("breastplate", 4000);
            this.kArmorTypeCost.set("halfplate", 7500);
            this.kArmorTypeCost.set("ringmail", 300);
            this.kArmorTypeCost.set("chainmail", 750);
            this.kArmorTypeCost.set("splint", 2000);
            this.kArmorTypeCost.set("plate", 15000);
            this.kArmorTypeCost.set("shield", 100);
        
        this.limbo = new Room("limbo", "limbo", "Limbo", 0, new Cell("limboCell", "Limbo", new Location("limbo", "Limbo")));
            this.limbo.setNorthRoom(this.limbo, undefined, false);
            this.limbo.setEastRoom(this.limbo, undefined, false);
            this.limbo.setSouthRoom(this.limbo, undefined, false);
            this.limbo.setWestRoom(this.limbo, undefined, false);
            this.limbo.setDownRoom(this.limbo, undefined, false);
    }
    static getCharacters() {
        return this.characters;
    }
    static getCharacterByID(_string) {
        return this.characters.get(_string);
    }
    static getCharacter(_string) {
        if (_string instanceof Character) {
            return _string;
        }
        else {
            return this.getCharacterByID(_string);
        }
    }
    static hasCharacter(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                return true;
            else
                return undefined;
        }
        else if (PSDE.characters.has(_character.id)) {
            return true;
        }
        else {
            return false;
        }
    }
    static getRooms() {
        return this.rooms;
    }
    static getRoomByID(_string) {
        return this.rooms.get(_string);
    }
    static getRoom(_string) {
        if (_string instanceof Room) {
            return _string;
        }
        else {
            return this.getRoomByID(_string);
        }
    }
    static hasRoom(_room) {
        if (!(_room instanceof Room)) {
            if (PSDE.rooms.has(_room))
                return true;
            else
                return false;
        }
        else if (PSDE.rooms.has(_room.id)) {
            return true;
        }
        else {
            return false;
        }
    }
    static getFurniture(_string) {
        if (_string instanceof Furniture) {
            return _string;
        }
        else if (typeof _string == "string") {
            return this.getFurnitureByID(_string);
        }
        else {
            return this.furniture;
        }
    }
    static getFurnitureByID(_string) {
        return this.furniture.get(_string);
    }
    // getFurniture (singular) and getFurniture (plural) are both getFurniture
    static hasFurniture(_furniture) {
        if (!(_furniture instanceof Furniture)) {
            if (PSDE.furniture.has(_furniture))
                return true;
            else
                return false;
        }
        else if (PSDE.furniture.has(_furniture.id)) {
            return true;
        }
        else {
            return false;
        }
    }
    static getItems() {
        return this.items;
    }
    static getItemByID(_string) {
        return this.items.get(_string);
    }
    static getItem(_string) {
        if (_string instanceof Item) {
            return _string;
        }
        else {
            return this.getItemByID(_string);
        }
    }
    static hasItem(_item) {
        if (!(_item instanceof Item)) {
            if (PSDE.items.has(_item))
                return true;
            else
                return undefined;
        }
        else if (PSDE.items.has(_item.id)) {
            return true;
        }
        else {
            return false;
        }
    }
    static getSpellByID(_string) {
        return this.spells.get(_string);
    }
    static getSpell(_string) {
        if (_string instanceof Spell) {
            return _string;
        }
        else {
            return this.getSpellByID(_string);
        }
    }

    /**
     * Calculates Character level; Doesn't calculate at all.
     * @param {Number} _int Character experience
     * @return {Number} Integer between 0 and PSDE.kCharacterMaxLevel
     */
    static calculateLevel(_int) {
        if (!isInt(_int)) {
            if (_int instanceof Character) {
                _int = _int.getExperiencePoints();
            }
            else if (PSDE.hasCharacter(_int)) {
                _int = PSDE.getCharacterByID(_int).getExperiencePoints();
            }
            else {
                return 1;
            }
        }
        if (_int < 300) return 1;
        else if (_int < 900) return 2;
        else if (_int < 2700) return 3;
        else if (_int < 6500) return 4;
        else if (_int < 14000) return 5;
        else if (_int < 23000) return 6;
        else if (_int < 34000) return 7;
        else if (_int < 48000) return 8;
        else if (_int < 64000) return 9;
        else if (_int < 85000) return 10;
        else if (_int < 100000) return 11;
        else if (_int < 120000) return 12;
        else if (_int < 140000) return 13;
        else if (_int < 165000) return 14;
        else if (_int < 195000) return 15;
        else if (_int < 225000) return 16;
        else if (_int < 265000) return 17;
        else if (_int < 305000) return 18;
        else if (_int < 355000) return 19;
        else return 20;
    }
    /**
     * Calculates Character ability score modifier; Also doesn't calculate at all.
     * @param  {Number} _int Ability level
     * @return {Number}      Modifier
     */
    static calculateAbilityScoreModifier(_int) {
        if (_int == 30)
            return 10;
        else if (_int > 27)
            return 9;
        else if (_int > 25)
            return 8;
        else if (_int > 23)
            return 7;
        else if (_int > 21)
            return 6;
        else if (_int > 19)
            return 5;
        else if (_int > 17)
            return 4;
        else if (_int > 15)
            return 3;
        else if (_int > 13)
            return 2;
        else if (_int > 11)
            return 1
        else if (_int > 9)
            return 0
        else if (_int > 7)
            return -1;
        else if (_int > 5)
            return -2;
        else if (_int > 3)
            return -3;
        else if (_int > 1)
            return -4;
        else
            return -5;
    }

    static cashCheque(_character = player) {
        if (!(_character instanceof Character)) {
            if (PSDE.hasCharacter(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        if (!(_character.cell.location.type == "bank")) {
            Content.add("<p>How can you cash a cheque if you're not at a bank?</p>");
            return false;
        }
        var _chequeCashed = false;

        _character.items.forEach(function(_itemInstance) {
            if (_itemInstance.parent instanceof Cheque) {
                if (_itemInstance.parent.to instanceof Character && (_itemInstance.parent.signed || _itemInstance.parent.to == _character) && !isNaN(_itemInstance.parent.amount) && _itemInstance.parent.amount > 0) {
                    _itemInstance.parent.to.incMoney(_itemInstance.parent.amount);
                    _character.removeItem(_itemInstance);
                    _itemInstance.parent.delete();
                    _itemInstance.delete();
                    _chequeCashed = true;
                }
            }
        });
        return _chequeCashed;
    }

    static mainMenu() {
        Menu.addOption("PSDE.startGame()", "Enter", "You meet the conditions above.");
        Menu.generate();
    }
    static baseMenu(_clearContent = false, _clearMenu = true) {
        PSDE.lastMenu = "PSDE.baseMenu({0}, {1})".format(_clearContent, _clearMenu);
        Menu.showingBaseMenu = true;
        
        if (!(PSDE.getCharacterCurrentRoom(PSDE.player) instanceof Room))
            PSDE.setCharacterCurrentRoom(PSDE.player, "limbo");
        
        if (_clearMenu) {
            Title.clear();
            Title.set(
                (PSDE.getCharacterCurrentRoom(PSDE.player).location.isOwner(PSDE.player) ? "Your "  + (PSDE.getCharacterCurrentRoom(PSDE.player).type !== 'undefined' ? PSDE.getCharacterCurrentRoom(PSDE.player).type : "room").capitalize() : PSDE.getCharacterCurrentRoom(PSDE.player).name), 
                undefined, 
                (typeof PSDE.getCharacterCurrentRoom(PSDE.player).location !== 'undefined' ? (PSDE.getCharacterCurrentRoom(PSDE.player).location == PSDE.getCharacterCurrentRoom(PSDE.player).cell.location ? PSDE.getCharacterCurrentRoom(PSDE.player).cell.name : PSDE.getCharacterCurrentRoom(PSDE.player).location.name) : "&nbsp;"), 
                (typeof PSDE.getCharacterCurrentRoom(PSDE.player).cell.location !== 'undefined' ? PSDE.getCharacterCurrentRoom(PSDE.player).cell.location.name : "&nbsp;")
            );

            Menu.clear();
            
            var roomNorth = undefined, roomEast = undefined, roomSouth = undefined, roomWest = undefined, roomDown = undefined, roomUp = undefined;
            if (PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.has(0) && PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.get(0) instanceof Room)
                roomNorth = PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.get(0);
            
            if (PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.has(1) && PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.get(1) instanceof Room)
                roomEast = PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.get(1);
            
            if (PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.has(2) && PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.get(2) instanceof Room)
                roomSouth = PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.get(2);
            
            if (PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.has(3) && PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.get(3) instanceof Room)
                roomWest = PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.get(3);
            
            if (PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.has(4) && PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.get(4) instanceof Room)
                roomDown = PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.get(4);
            
            if (PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.has(5) && PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.get(5) instanceof Room)
                roomUp = PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.get(5);
            
            if (!PSDE.enableThreeDContent)
                Menu.setExplorationOptions(roomNorth, roomEast, roomSouth, roomWest, roomDown, roomUp);
            Menu.setOption(0, "PSDE.roomInteract('{0}', false, false)".format(PSDE.getCharacterCurrentRoom(PSDE.player).id), "Explore " + (PSDE.getCharacterCurrentRoom(PSDE.player).owner == PSDE.player ? "your " + PSDE.getCharacterCurrentRoom(PSDE.player).typeName() : PSDE.getCharacterCurrentRoom(PSDE.player).name));
            Menu.setOption(1, "PSDE.personalCharacterMenu()", "Personal Menu");
            if (PSDE.getCharacterCurrentRoom(PSDE.player).characters.size == 2) {
                _character = undefined;
                PSDE.getCharacterCurrentRoom(PSDE.player).characters.forEach(function(character) {
                    if (character != PSDE.player)
                        _character = character;
                });
                Menu.setOption(
                    2, 
                    "PSDE.characterInteract(" + _character.id + ", true)", 
                    "Interact with " + _character.name, (_character.age == 9001 ? "<span class='text-mana'>&infin;</span>" : _character.age + " year old " + _character.grammaticalGender() + "."),
                    undefined,
                    undefined,
                    "btn-basic {0}".format(PSDE.player.manaMax > 24 && _character.isCharmed() ? "charmed" : "")
                );
            }
            else if (PSDE.getCharacterCurrentRoom(PSDE.player).characters.size > 1)
                Menu.setOption(2, "PSDE.localCharactersMenu()", "Interact with those near you.");
            if (PSDE.player.phone instanceof PhoneInstance) {
                if (PSDE.player.phone.receivedMessages.size > 0)
                    Menu.setOption(3, "this.parentNodes[2].innerHTML = '&nbsp;'; this.classList.remove('btn-info-flicker'); PSDE.phoneInteract({0}, true)".format(PSDE.player.phone.id), "Check Phone", "{0} Unread Messages".format(PSDE.player.phone.receivedMessages.size), undefined, undefined, undefined, undefined, "btn-info-flicker");
                else
                    Menu.setOption(3, "PSDE.phoneInteract('{0}', true)".format(PSDE.player.phone.id), "Check Phone");
            }
            Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.tick('1m', true, true)", "Wait");
            if (PSDE.player.manaMax > 0 && PSDE.player.spells.size > 0)
                Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.spellMenu()", "Spells", undefined, undefined, undefined, "btn-mana");
            Menu.generate();
        }
    }
    static personalCharacterMenu() {
        PSDE.lastMenu = "PSDE.personalCharacterMenu()";
        
        Title.set("Interact with yourself", PSDE.player.image);
        
        if (PSDE.player['ateCharlie'])
            Content.add("You have blood caked across your face and dripping down your jaw, as well as bits of cream-coloured fur and red chunks of meat. You are very full.");
        
        Menu.clear();
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(0)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
        Menu.setOption((Menu.useWideMenu ? 13 : 10), "$('#optionsModal').modal()", "Options");
        Menu.setOption((Menu.useWideMenu ? 12 : 9), "PSDE.debugMenu()", "Debug", undefined, undefined, 4);
        Menu.addOption("PSDE.getAppearance(PSDE.player, 1)", "Appearance");
        Menu.addOption("PSDE.characterInteractOpen()", "Inventory");
        Menu.generate();
    }
    static localCharactersMenu() {
        PSDE.lastMenu = "PSDE.localCharactersMenu()";
        
        Title.set("Interact with those near you.");
        
        Menu.clear();
        for (var [_characterID, _character] of PSDE.getCharacterCurrentRoom(PSDE.player).characters.entries()) {
            if (_character != PSDE.player) {
                Menu.addOption(
                    "PSDE.characterInteract({0}, true)".format(_character.id), 
                    _character.name, 
                    "{0} year old {1}.".format(_character.age == 9001 ? "<span class='text-mana'>&infin;</span>" : _character.age, _character.grammaticalGender()),
                    undefined,
                    undefined,
                    "btn-basic {0}".format(PSDE.player.manaMax > 24 && _character.isCharmed() ? "charmed" : "")
                );
            }
        }
        
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
        Menu.generate();
    }
    static spellMenu() {
        PSDE.lastMenu = "PSDE.spellMenu()";
        
        Title.set("Spells");

        Menu.clear();
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
        PSDE.player.spells.forEach(function(_spell) {
            Menu.addOption(
                "PSDE.spellInteract({0}, PSDE.player)".format(_spell.id),
                _spell.name,
                _spell.description,
                undefined,
                undefined,
                "btn-mana"
            );
        });
        Menu.generate();
    }
    static debugMenu() {
        $('#gameOptionsModal').modal('hide');
        Content.useDebugContent();
        Menu.useDebugMenu();
        
        Title.set(undefined, undefined, undefined, "Debug Menu");
        
        Menu.clear();
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.debugMenuClose()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
        Menu.addOption("PSDE.debugRoomInformation()", "Room Information");
        Menu.addOption("PSDE.debugSwitchRoom()", "Switch Room");
        Menu.addOption("PSDE.debugCharactersInformation()", "Characters Information");
        Menu.addOption("PSDE.debugSwitchCharacter()", "Switch Character");
        Menu.addOption("PSDE.debugBrowserInformation()", "Browser Information");
        Menu.addOption("PSDE.debugMenuPopulate()", "Populate Menu", "with useless boxes");
        Menu.addOption("PSDE.player.addItem('masterKey')", "Get Skeleton Key");
        Menu.addOption("PSDE.addAllItems({0}, false)".format(PSDE.player.id), "Add All Items");
        Menu.addOption("PSDE.addAllLocations({0})".format(PSDE.player.id), "Add All Locations");
        Menu.addOption("PSDE.addAllSpells({0});{0}.setManaMax(100);{0}.setMana(100);{0}.setManaCostOffsetPercent(100)".format(PSDE.player.id), "Add All Spells", undefined, undefined, undefined, "btn-mana");
        Menu.generate();
    }
    static debugMenuClose() {
        Content.useNormalContent();
        Menu.useNormalMenu();
        Menu.generate();
    }
    static debugRoomInformation() {
        var _contentBody = "";
        _contentBody += "<h4>Current Room:</h4> <ul><li>{0}</li></ul>".format(PSDE.getCharacterCurrentRoom(PSDE.player).toString());
        var _blob = "";
        var _arr = [];
        
        
        _contentBody += "<h4>Attached Rooms ({0}):</h4> <ul>".format(PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.size);
        for (var [_roomID, _room] of PSDE.getCharacterCurrentRoom(PSDE.player).attachedRooms.entries()) {
            _contentBody += "<li>{0}</li>".format(_room.toString());
        }
        _contentBody += "</ul>";
        
        
        _contentBody += "<h4>Characters in Current Room ({0}):</h4> <ul>".format(PSDE.getCharacterCurrentRoom(PSDE.player).characters.size);
        for (var [_characterID, _character] of PSDE.getCharacterCurrentRoom(PSDE.player).characters.entries()) {
            _blob = "";
            for (var _key in _character.getCurrentActions()) {
                _val = _character.getCurrentAction(_key);
                if (_val instanceof Entity) {
                    _blob += _key + ":";
                    _arr.push(_val.toString());
                }
                else
                    _blob += _key;
                _blob += _arr.toString() + ", ";
                _arr = [];
            };
            _contentBody += "<li>{0} {1}</li>".format(_character.toString(), _blob);
            _blob = "";
        }
        _contentBody += "</ul>";
        
        
        _contentBody += "<h4>Furniture in Current Room ({0}):</h4> <ul>".format(PSDE.getCharacterCurrentRoom(PSDE.player).characters.size);
        for (var [_furnitureID, _furniture] of PSDE.getCharacterCurrentRoom(PSDE.player).furniture.entries()) {
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
    static debugSwitchRoom() {
        PSDE.clearContentAndMenu();
        
        Title.set("Switch Room", undefined, undefined, "Debug Menu");

        Content.add("<p>You are currently in " + PSDE.getCharacterCurrentRoom(PSDE.player).id + "</p>");
        i = 1;
        var _blob = "";
        _blob += '<div class="btn-group btn-group-justified">';
        PSDE.rooms.forEach(function (_key, _val) {
            _blob += Menu.createButton("PSDE.roomInteract('" + _key.id + "', true)", _key.name, _key.id, false);
            if (i % 4 == 0)
                _blob += '</div><div class="btn-group btn-group-justified">';
            i++;
        });
        _blob += '</div>';
        
        Content.add(_blob);
        
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.debugMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Debug");
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.debugMenuClose()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
        Menu.generate();
    }
    static debugCharactersInformation(_character = PSDE.player) {
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;
        
        if (typeof _character == 'undefined')
            return undefined;
        
        Content.clear();
        
        var _blob = "";
        var _arr = [];
        

        // Character List
        PSDE.characters.forEach(function(__character) {
            _blob += "<option value='{0}'' {2}>{1}</option>".format(__character.id, __character.name, (_character == __character ? "selected" : ""));
        });
        Content.add("<h4>Character:</h4> <select onchange='PSDE.debugCharactersInformation(this.value)'>" + _blob + "</select><br/>");
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
        var _clothing = new Map(PSDE.clothing);
        var _clothingOptionsBlob = "";
        var _tableColSpan = Object.keys(_character.defaultDisposition).length + 3;
        
        _blob += "<table class='table'>";
        Array.from(this.kClothingTypes).forEach(function(_clothingType) {
            _clothing.forEach(function(_clothing) {
                if (_clothing.type == _clothingType) {
                    _clothingOptionsBlob += "<option value='{0}' {2}>{1}</option>".format(
                        _clothing.id,
                        _clothing.name,
                        (PSDE.player.clothing[_clothingType] !== undefined && _character.clothing[_clothingType] == _clothing ? "selected" : "")
                    );
                    _clothing.delete(_clothing.id);
                }
            }, this);
            _blob += "<tr><td>{3}</td><td><select class='changeClothing col-sm-3' onchange='PSDE.getCharacterByID(\"{0}\").setClothing(this.value, \"{3}\")' data-character='{0}' data-clothingSlot='{3}' selected='{1}'><option value='undefined'>Nothing</option>{2}</select></td></tr>".format(
                PSDE.player.id,
                (PSDE.player.clothing[_clothingType] !== undefined ? PSDE.player.clothing[_clothingType].parent.id : "undefined"),
                _clothingOptionsBlob,
                _clothingType
            );
            _clothingOptionsBlob = "";
        }, this);
        _blob += "</table>";
        _blob += "</div></div></div>";
        Content.add(_blob);
        _blob = "";
        

        // Disposition
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
            _blob += "<td><input type='text' class='changeDisposition' onchange='PSDE.getCharacterByID(\"{0}\").defaultDisposition.set(\"{1}\", this.value)' value='{2}' style='width:3em;'/></td>".format(
                _character.id,
                _property,
                _character.defaultDisposition[_property]
            );
        }
        _blob += "</tr>";
        
        //  You->Them
        _blob += "<tr><td colspan='{0}'><b>Your</b> Dispositions for Characters</td></tr>".format(_tableColSpan);
        _character.getCharacterDispositions().forEach(function(_disposition, __character) {
            if (!_disposition.hasOwnProperty("passion"))
                return undefined;
            _blob += "<tr><td>{0}</td>".format(__character.id);
            for (var _property in _disposition) {
                _blob += "<td><input type='text' class='changeDisposition' onchange='PSDE.getCharacterByID(\"{0}\").setCharacterDisposition(\"{3}\", \"{1}\", this.value); $(\"#calculateChanceToFuckThem{4}\").text(PSDE.getCharacterByID(\"{3}\").calculateChanceToFuck(\"{0}\")); this.value = PSDE.getCharacterByID(\"{0}\").getCharacterDisposition(\"{3}\", \"{1}\");' value='{2}' style='width:3em;'/></td>".format(_character.id, _property, _disposition[_property], __character.id, __character.id.capitalize());
            }
            _blob += "<td></td>";
            _blob += "<td></td>";
            _blob += "<td id='calculateChanceToFuckThem{1}'>{0}</td>".format(__character.calculateChanceToFuck(_character), __character.id.capitalize());
            _blob += "</tr>";
        }, this);
        
        //  Them->You
        _blob += "<tr><td colspan='{0}'><b>Characters'</b> Dispositions for You</td></tr>".format(_tableColSpan);
        PSDE.characters.forEach(function(__character) {
            if (__character == _character)
                return undefined;
            
            if (__character.hasCharacterDisposition(_character)) {
                var _disposition = __character.getCharacterDisposition(_character);
                
                _blob += "<tr><td>{0}</td>".format(__character.id);
                for (var _property in __character.characterDisposition.get(_character)) {
                    _blob += "<td><input type='text' class='changeDisposition' onchange='PSDE.getCharacterByID(\"{0}\").setCharacterDisposition(\"{3}\", \"{1}\", this.value); $(\"#calculateChanceToFuckYou{4}\").text(PSDE.getCharacterByID(\"{3}\").calculateChanceToFuck(\"{0}\")); this.value = PSDE.getCharacterByID(\"{0}\").getCharacterDisposition(\"{3}\", \"{1}\");' value='{2}' style='width:3em;'/></td>".format(__character.id, _property, _disposition[_property], _character.id, __character.id.capitalize());
                }
                _blob += "<td><input onchange='PSDE.getCharacterByID(\"{0}\").setRut(this.checked); $(\"#calculateChanceToFuckYou{3}\").text(PSDE.getCharacterByID(\"{2}\").calculateChanceToFuck(\"{0}\"));' type='checkbox' name='rut' {1}/><br/>".format(__character.id, (__character.rut ? 'checked' : ''), _character.id, __character.id.capitalize());
                _blob += "<td><input onchange='PSDE.getCharacterByID(\"{0}\").setLust(this.value); $(\"#calculateChanceToFuckYou{3}\").text(PSDE.getCharacterByID(\"{2}\").calculateChanceToFuck(\"{0}\")); this.value = PSDE.getCharacterByID(\"{0}\").getLust();' type='number' min='0' max='100' maxlength='3' size='3' name='lust' value='{1}'/></td>".format(__character.id, __character.lust, _character.id, __character.id.capitalize());
                _blob += "<td id='calculateChanceToFuckYou{1}'>{0}</td>".format(_character.calculateChanceToFuck(__character), __character.id.capitalize());
                _blob += "</tr>";
            }
        }, this);
        
        _blob += "</tbody></table></form>";
        _blob += "</div></div></div>";
        Content.add(_blob);
        _blob = "";

        // Sets Clothing values
        var changeClothingElements = document.getElementsByClassName('changeClothing');
        for (var i = 0; i < changeClothingElements.length; i++) {
            changeClothingElements[i].value = changeClothingElements[i].getAttribute('selected');
        }
    }
    static debugSwitchCharacter() {
        PSDE.clearContentAndMenu();
        
        Title.set("Switch Character", undefined, undefined, "Debug Menu");

        Content.add("<p>You are currently " + PSDE.player.name + "</p>");
        i = 1;
        var _blob = "";
        _blob += '<div class="btn-group btn-group-justified">';
        PSDE.characters.forEach(function (_key, _val) {
            if (_key == PSDE.player)
                return undefined;
            _blob += Menu.createButton("PSDE.switchCharacter(" + _key.id + ")", _key.name + " " + _key.surname, (_key.age + "/" + (_key.getSex() ? "F" : "M") + "/" + _key.species.capitalize() + "/" + (typeof PSDE.getCharacterCurrentRoom(_key) !== 'undefined' ? PSDE.getCharacterCurrentRoom(_key).name : "Limbo")), false);
            if (i % 4 == 0)
                _blob += '</div><div class="btn-group btn-group-justified">';
            i++;
        });
        _blob += '</div>';
        
        Content.add(_blob);
        
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.debugMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Debug");
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.debugMenuClose(); PSDE.roomInteract('" + PSDE.getCharacterCurrentRoom(PSDE.player).id + "', true)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
        Menu.generate();
    }
    static debugBrowserInformation() {
        Content.clear();
        
        Content.add("<blockquote>Window WidthxHeight : " + $(window).width() + "x" + $(window).height() + "</blockquote>");
    }
    static debugPrintUnassignedRooms() {
        Content.clear();
        Content.add("Rooms not assigned to grid:");
        
        var _blob = "";
        _blob += "<u>";
        PSDE.rooms.forEach(function(_room) {
            if (!_room.mappedToGrid)
                _blob += ("<ul>" + _room.id + "</ul>");
        });
        _blob += "</u>";
        
        Content.add(_blob);
    }
    static debugMenuPopulate() {
        Menu.setOption(0, "PSDE.debugMenu()", "Debug Menu");
        for (var _i = 0; _i < 33; _i++) {
            Menu.addOption("PSDE.debugMenu()", "Option {0}".format(_i))
        }
        Menu.generate();
    }
    static getAppearance(_character, _self = false) {
        Title.setTopImage(_character.image);
        
        var _blob = "";
        
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
        
        _blob += (" wearing ");
        
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

        if (_character.hasSomethingInBothHands()) {
            _blob += "</p><p>In your left {0} {3} {1}, and in your right {4} {2}.".format(_character.getHand(), _character.getEntityInLeftHand().parent.toString(), _character.getEntityInRightHand().parent.toString(), _character.getEntityInLeftHand().parent.plural ? "are" : "is a", _character.getEntityInRightHand().parent.plural ? "" : "a");
        }
        else if (_character.hasSomethingInLeftHand()) {
            _blob += "</p><p>In your left {0} {2} {1}.".format(_character.getHand(), _character.getEntityInLeftHand().parent.toString(), _character.getEntityInLeftHand().parent.plural ? "are" : "is a");
        }
        else if (_character.hasSomethingInRightHand()) {
            _blob += "</p><p>In your right {0} {2} {1}.".format(_character.getHand(), _character.getEntityInRightHand().parent.toString(), _character.getEntityInRightHand().parent.plural ? "are" : "is a");
        }
        
        Content.add("<p>" + _blob + "</p>");
    }
    static startGame() {
        PSDE.agreeTOS = true;
        Menu.showingBaseMenu = true;
        document.getElementById("gameControlsOptions").classList.remove("hidden");
        if (PSDE.enableMinimap)
            Minimap.generateMapFromStartRoom(PSDE.getCharacterCurrentRoom(PSDE.player));
        
        PSDE.clearContentAndMenu();
        
        Content.add("<p>Your name is " + PSDE.player.toString() + ", a " + PSDE.player.age + " year old " + (PSDE.player.getSex() == PSDE.kMale ? 'male' : 'female') + " " + PSDE.player.species + ".</p>");
        
        Menu.addOption("PSDE.roomInteract('{0}', true)".format(PSDE.getCharacterCurrentRoom(PSDE.player).id), "Get a move on.");
        Menu.generate();
        
        PSDE.updateTimeDisplay();
        PSDE.updatePlayerInfoDisplay();
    }
    static quitGame() {
        PSDE.clearContentAndMenu();
        PSDE.close();
    }
    static switchCharacter(_character) {
        if (!(_character instanceof Character))
            _character = PSDE.getCharacterByID(_character);
        
        if (PSDE.player == _character)
            Content.add("<p>You are already " + PSDE.player.toString() + "</p>");
        else {
            _pcPreviousRoom = PSDE.getCharacterCurrentRoom(PSDE.player)
            PSDE.player = _character;
            if (!(PSDE.getCharacterCurrentRoom(PSDE.player) instanceof Room))
                PSDE.setCharactercurrentRoom(PSDE.player, "limbo");
            PSDE.player.sleeping = false;
            
            if (PSDE.enableMinimap && PSDE.getCharacterCurrentRoom(PSDE.player) != _pcPreviousRoom) {
                Minimap.generateMapFromStartRoom(PSDE.getCharacterCurrentRoom(PSDE.player));
            }
            
            PSDE.updatePlayerInfoDisplay();
            debugSwitchCharacter();
        }
    }
    /**
     * Resizes the GUI. If the Minimap is hidden by Bootstrap constrains, it is disabled, otherwise it is enabled.
     */
    static resizeGui() {
        if (PSDE.enableDebug) console.log("Resizing GUI");

        document.getElementById("rowMid").style.height = (document.body.offsetHeight - document.getElementById("rowBot").offsetHeight) + "px";
        document.getElementById("rowBot").style.height = document.getElementById("rowBot").offsetHeight + "px";
        document.getElementById("mapContentDisplay").style.height = document.getElementById("rowMid").offsetHeight - document.getElementById("locationContentDisplay").offsetHeight - 15 + "px";
        document.getElementById("map").style.height = document.getElementById("mapContentDisplay").offsetHeight + "px";
        
        if (isHidden(document.getElementById("locationInfoContainer")))
            document.getElementById("contentContainerHeadLocation").style.display = '';
        else
            document.getElementById("contentContainerHeadLocation").style.display = 'none';
        
        if (isHidden(document.getElementById("locationInfoContainer")))
            PSDE.enableMinimap = false;
        else
            PSDE.enableMinimap = true;
    }

    /**
     * Updates the in-game Time display
     */
    static updateTimeDisplay() {
        for (var _i = 0; _i < document.getElementsByClassName('timeDisplay').length; _i++) {
            document.getElementsByClassName('timeDisplay')[_i].innerHTML = unixTimeToDateString(PSDE.currentTime);
        }
    }
    static updatePlayerInfoDisplay() {
        document.getElementById("playerName").innerHTML = ("{0}{1}{2}".format(PSDE.player.name, PSDE.player.nickname != undefined ? ("(" + PSDE.player.nickanem + ")") : "", PSDE.player.surname != undefined ? (" " + PSDE.player.surname) : ""));
        document.getElementById("playerMoney").innerHTML = (PSDE.player.money);

        document.getElementById("playerLife").innerHTML = (PSDE.player.life);
        document.getElementById("playerLifeMax").innerHTML = (PSDE.player.lifeMax);
        if (PSDE.player.life < PSDE.player.lifeMax / 5) {
            document.getElementById("playerLife").classList.add("text-danger");
            document.getElementById("playerLife").classList.remove("text-warning");
            document.getElementById("playerLife").classList.remove("text-primary");
        }
        else if (PSDE.player.life < PSDE.player.lifeMax / 2) {
            document.getElementById("playerLife").classList.remove("text-danger");
            document.getElementById("playerLife").classList.add("text-warning");
            document.getElementById("playerLife").classList.remove("text-primary");
        }
        else {
            document.getElementById("playerLife").classList.remove("text-danger");
            document.getElementById("playerLife").classList.remove("text-warning");
            document.getElementById("playerLife").classList.add("text-primary");
        }

        document.getElementById("playerStamina").innerHTML = (PSDE.player.stamina);
        document.getElementById("playerStaminaMax").innerHTML = (PSDE.player.staminaMax);
        if (PSDE.player.stamina < PSDE.player.staminaMax / 5) {
            document.getElementById("playerStamina").classList.add("text-danger");
            document.getElementById("playerStamina").classList.remove("text-warning");
            document.getElementById("playerStamina").classList.remove("text-primary");
        }
        else if (PSDE.player.stamina < PSDE.player.staminaMax / 2) {
            document.getElementById("playerStamina").classList.remove("text-danger");
            document.getElementById("playerStamina").classList.add("text-warning");
            document.getElementById("playerStamina").classList.remove("text-primary");
        }
        else {
            document.getElementById("playerStamina").classList.remove("text-danger");
            document.getElementById("playerStamina").classList.remove("text-warning");
            document.getElementById("playerStamina").classList.add("text-primary");
        }

        if (PSDE.player.manaMax == 0)
            document.getElementById("playerManaDisplay").classList.add("invisible");
        else
            document.getElementById("playerManaDisplay").classList.remove("invisible");
        document.getElementById("playerMana").innerHTML = (PSDE.player.mana);
        document.getElementById("playerManaMax").innerHTML = (PSDE.player.manaMax);
        if (PSDE.player.mana < PSDE.player.manaMax / 5) {
            document.getElementById("playerMana").classList.add("text-danger");
            document.getElementById("playerMana").classList.remove("text-warning");
            document.getElementById("playerMana").classList.remove("text-primary");
        }
        else if (PSDE.player.mana < PSDE.player.manaMax / 2) {
            document.getElementById("playerMana").classList.remove("text-danger");
            document.getElementById("playerMana").classList.add("text-warning");
            document.getElementById("playerMana").classList.remove("text-primary");
        }
        else {
            document.getElementById("playerMana").classList.remove("text-danger");
            document.getElementById("playerMana").classList.remove("text-warning");
            document.getElementById("playerMana").classList.add("text-primary");
        }
    }

    static toggleDebug() {
        PSDE.enableDebug = !PSDE.enableDebug;
        document.getElementById("toggleDebugButton").innerHTML = (PSDE.enableDebug ? "Disable" : "Enable") + " Debugging";
    }
    static toggleInventoryModal() {
        PSDE.enableModules = !PSDE.enableModules;
        document.getElementById("toggleInventoryModalButton").innerHTML = (PSDE.enableModules ? "Use Menu Inventory" : "Use Popup Inventory");
    }
    static toggleMenuSize() {
        Menu.useWideMenu ? PSDE.useNormalMenu() : PSDE.useWideMenu();
        document.getElementById("toggleMenuSizeButton").innerHTML = "Use {0} Menu".format(Menu.useWideMenu ? "Normal" : "Wide");
    }
    static toggleAutoscroll() {
        PSDE.enableAutoscroll = !PSDE.enableAutoscroll;
        document.getElementById("toggleAutoscrollButton").innerHTML = (PSDE.enableAutoscroll ? "Disable" : "Enable") + " Autoscroll";
    }
    static toggleRape() {
        PSDE.enableRape = !PSDE.enableRape;
        document.getElementById("toggleRapeButton").innerHTML = (PSDE.enableRape ? "Disable" : "Enable") + " Non-Con";
        
        PSDE.characters.forEach(function(_character) {
            if (PSDE.enableRape && _character.age >= 18)
                _character.addAvailableAction("rape");
            else
                _character.removeAvailableAction("rape");
        }, this);
    }
    static toggleGore() {
        PSDE.enableGore = !PSDE.enableGore;
        document.getElementById("toggleGoreButton").innerHTML = (PSDE.enableGore ? "Disable" : "Enable") + " Violence";
    }
    static setPOV(_int = 2) {
        if (isNaN(_int)) {
            Number.parseInt(_int);
        }
        switch (_int) {
            case 1 : {
                PSDE.pov = 1
                break;
            }
            case 2 : {
                PSDE.pov = 2;
                break;
            }
            case 3 : {
                PSDE.pov = 3;
                break;
            }
            default : {
                PSDE.pov = 2;
            }
        }
    }


    static subjectPronoun(_useName = false) {
        return PSDE.pov == 1 ? "I" : PSDE.pov == 2 ? "you" : _useName ? PSDE.player.name : PSDE.player.objectPronoun();
    }
    static personalPronoun(_useName = false) {return PSDE.subjectPronoun(_useName);}
    static objectPronoun(_useName = false) {
        return PSDE.pov == 1 ? "me" : PSDE.pov == 2 ? "you" : _useName ? PSDE.player.name : PSDE.player.objectPronoun();
    }
    static objectPronounPlural() {
        return PSDE.pov == 1 ? "us" : PSDE.pov == 2 ? "you" : "them";
    }
    static possessivePronoun(_useName = false) {
        return PSDE.pov == 1 ? "mine" : PSDE.pov == 2 ? "yours" : _useName ? PSDE.player.singularPossesiveName() : PSDE.player.possessivePronoun();
    }
    static possessivePronounPlural() {
        return PSDE.pov == 1 ? "ours" : PSDE.pov == 2 ? "yours" : "theirs";
    }
    static possessiveAdjective(_useName = false) {
        return PSDE.pov == 1 ? "my" : PSDE.pov == 2 ? "your" : _useName ? PSDE.player.singularPossesiveName() : PSDE.player.possessiveAdjective();
    }
    static possessiveAdjectivePlural() {
        return PSDE.pov == 1 ? "our" : PSDE.pov == 2 ? "your" : "their";
    }
    static reflexivePronoun() {
        return PSDE.pov == 1 ? "myself" : PSDE.pov == 2 ? "yourself" : PSDE.player.reflexivePronoun();
    }
    static presentPerfectTense(_contraction, _useName = false) {
        if (_contraction)
            return PSDE.pov == 1 ? "I have" : PSDE.pov == 2 ? "you have" : _useName ? (PSDE.player.name + "has ") : "he has";
        else
            return PSDE.pov == 1 ? "I've" : PSDE.pov == 2 ? "you've" : _useName ? (PSDE.player.name + "has ") : "he's";
    }
    static presentContinuousTense(_contraction = false, _useName = false) {
        if (_contraction)
            return (PSDE.pov == 1 ? "I'm" : PSDE.pov == 2 ? "you're" : _useName ? (PSDE.player.name + " is") : (PSDE.player.subjectPronoun() + " is"));
        else
            return (PSDE.pov == 1 ? "I am" : PSDE.pov == 2 ? "you are" : _useName ? (PSDE.player.name + " is") : (PSDE.player.subjectPronoun() + " is"));
    }

    static _generateEntityItemsGraphicalList(_fromEntity = PSDE.player, _toEntity = undefined, _modify = false, _filter = undefined) {
        if (!(_fromEntity instanceof Entity)) {
            if (PSDE.entities.has(_fromEntity))
                _fromEntity = PSDE.entities.get(_fromEntity);
            else
                return undefined;
        }
        if (!(_toEntity instanceof Entity)) {
            if (PSDE.entities.has(_toEntity))
                _toEntity = PSDE.entities.get(_toEntity);
            else
                _toEntity = undefined;
        }

        PSDE.lastMenu = "_generateEntityItemsGraphicalList({0}, {1}, {2}, {3})".format(_fromEntity.id, _toEntity instanceof Entity ? _toEntity.id : undefined, _modify ? "true" : "false", _filter);

        var _body = "";
        _fromEntity.items.forEach(function(_itemInstance) {
            _body += "<div class='list-group'>";
            _body += String(
                    "<a href='#' class='list-group-item list-group-item-action' data-id='{2}' onclick='_generateEntityItemsGraphicalListItemInstanceDescriptionPopulate(\"{2}\", \"{3}\", \"{4}\", \"{5}\")'><img src='{0}' class='float-left' style='max-height:64px; max-width:64px; height:64px; width:64px;' height='64px' width='64px'/>{1}</a>"
                ).format(
                    _itemInstance.parent.image,
                    _itemInstance.parent.name,
                    _itemInstance.id,
                    _fromEntity.id,
                    _toEntity instanceof Entity ? _toEntity.id : undefined,
                    _filter
                );
            _body += "</div>";
        }, this);
        
        return _body;
    }
    static _generateEntityItemsGraphicalListItemInstanceDescriptionPopulate(_itemInstance = undefined, _fromEntity = undefined, _toEntity = undefined, _filter = undefined) {
        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return undefined;
        }
        if (!(_fromEntity instanceof Entity)) {
            if (PSDE.entities.has(_fromEntity))
                _fromEntity = PSDE.entities.get(_fromEntity);
            else
                return undefined;
        }
        if (!(_toEntity instanceof Entity)) {
            if (PSDE.entities.has(_toEntity))
                _toEntity = PSDE.entities.get(_toEntity);
            else
                _toEntity = undefined;
        }
        
        PSDE.lastMenu = "_generateEntityItemsGraphicalListItemInstanceDescriptionPopulate('{0}', '{1}', '{2}', '{3}')".format(_itemInstance.id, _fromEntity.id, _toEntity instanceof Character ? _toEntity.id : undefined, _filter);
        var _actionsBlob = "";
        var _itemAction = "";

        /**
         * Move item from _fromEntity to _toEntity
         */
        if (_toEntity instanceof Entity)
            _actionsBlob += Menu.createButton("_generateEntityItemsGraphicalMove('{0}', '{1}', '{2}', '{3}'); PSDE.runLastMenu()".format(_itemInstance.id, _fromEntity.id, _toEntity.id, _filter), _toEntity instanceof Character ? "Give to " + _toEntity.name : "Put in " + _toEntity.name);
        /**
         * Hold or Release item
         */
        if (_fromEntity instanceof Character && _fromEntity.hasHeldEntity(_itemInstance))
            _actionsBlob += Menu.createButton("PSDE.itemInteractRelease('{0}', '{1}'); PSDE.runLastMenu()".format(_itemInstance.id, _fromEntity.id), "Release");
        else
            _actionsBlob += Menu.createButton("PSDE.itemInteractHold('{0}', '{1}'); PSDE.runLastMenu()".format(_itemInstance.id, _fromEntity.id), "Hold ");
        /**
         * Consume item
         */
        if (_itemInstance.parent instanceof Consumable) {
            if (typeof _itemInstance.parent.type == "undefined" || _itemInstance.parent.type == "other")
                _itemAction = "Consume";
            else if (_itemInstance.parent.type == "drink")
                _itemAction = "Drink";
            else if (_itemInstance.parent.type == "food")
                _itemAction = "Eat";
            else if (_itemInstance.parent.type == "medicine")
                _itemAction = "Consume";
            _actionsBlob += Menu.createButton("PSDE.itemInteractConsume('{0}', '{1}'); PSDE.runLastMenu()".format(_itemInstance.id, _fromEntity.id), _itemAction);
        }
        /**
         * Wear item
         */
        if (_itemInstance.parent instanceof Clothing) {
            var _youWear = _fromEntity.isWearing(_itemInstance);
            var _theyWear = _toEntity instanceof Character && _toEntity.isWearing(_itemInstance);
            if (_youWear)
                _actionsBlob += Menu.createButton("PSDE.itemInteractWear('{0}', '{1}'); PSDE.runLastMenu()".format(_itemInstance.id, _fromEntity.id), "Disrobe yourself");
            else if (_theyWear)
                _actionsBlob += Menu.createButton("PSDE.itemInteractWear('{0}', '{1}'); PSDE.runLastMenu()".format(_itemInstance.id, _toEntity.id), "Disrobe" + _toEntity.name);
            else
                _actionsBlob += Menu.createButton("PSDE.itemInteractWear('{0}', '{1}'); PSDE.runLastMenu()".format(_itemInstance.id, _fromEntity.id), "Wear");
        }

        var _blob = String(
                "<h4>{0}</h4>" +
                "<img src='{1}' class='center-block' style='max-height:64px; height:64px;'/>" +
                "<blockquote>{2}</blockquote>" +
                "<table class='table' style='position:absolute; bottom:0px; width:94%;'>" +
                    "<tr><td colspan=2>{6}</td></tr>" +
                    "<tr><td>Durability</td><td>{3}</td></tr>" +
                    "<tr><td>Weight</td><td>{4}</td></tr>" +
                    "<tr><td>Price</td><td>{5}</td></tr>" +
                "</table>"
            ).format(
                _itemInstance.parent.name,
                _itemInstance.parent.image,
                _itemInstance.parent.description,
                _itemInstance.durability,
                _itemInstance.mass,
                _itemInstance.price,
                _actionsBlob
            );

        $("#personalInventoryModal-description").html(_blob);
    }
    static _generateEntityItemsGraphicalMove(_itemInstance = undefined, _fromEntity = undefined, _toEntity = undefined, _filter = undefined) {
        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else if (_itemInstance instanceof Item)
                _itemInstance = new ItemInstance(undefined, _itemInstance);
            else
                return undefined;
        }
        if (!(_fromEntity instanceof Entity)) {
            if (PSDE.entities.has(_fromEntity))
                _fromEntity = PSDE.entities.get(_fromEntity);
            else
                return undefined;
        }
        if (!(_toEntity instanceof Entity)) {
            if (PSDE.entities.has(_toEntity))
                _toEntity = PSDE.entities.get(_toEntity);
            else
                return undefined;
        }
        
        if (_fromEntity.give(_toEntity, _itemInstance)) {
            var _lazyEntity = _fromEntity;
            if (_lazyEntity == PSDE.player)
                _lazyEntity = _toEntity;
            $('#dualInventoryContent-characterA').html(_generateEntityItemsGraphicalList(PSDE.player, _lazyEntity, true));
            $('#dualInventoryContent-characterB').html(_generateEntityItemsGraphicalList(_lazyEntity, PSDE.player, true));
        }
    }
    static _generateEntityItemsMenuMove(_itemInstance, _fromEntity = undefined, _toEntity = undefined, _useLastMenu = false, _switch = false, _allowSwitch = true, _filter = undefined) {
        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else if (_itemInstance instanceof Item)
                _itemInstance = new ItemInstance(undefined, _itemInstance);
            else
                return undefined;
        }
        if (typeof _fromEntity != "undefined" && !(_fromEntity instanceof Entity)) {
            if (PSDE.entities.has(_fromEntity))
                _fromEntity = PSDE.entities.get(_fromEntity);
            else
                _fromEntity = undefined;
        }
        if (!(_toEntity instanceof Entity)) {
            if (PSDE.entities.has(_toEntity))
                _toEntity = PSDE.entities.get(_toEntity);
            else
                return undefined;
        }
        if (PSDE.enableDebug) console.log("Executing _generateEntityItemsMenuMove({0}, {1}, {2}, {3}, {4}, {5}, {6})".format(_itemInstance.parent.id, _fromEntity.id, _toEntity.id, _useLastMenu ? "true" : "false", _switch ? "true" : "false", _allowSwitch ? "true" : "false", _filter ? _filter : "undefined"));
        var _gaveItem = false;
        if (_switch) {
            if (PSDE.enableDebug) console.log("  Switch: {0} is giving {1} to {2}".format(_fromEntity.id, _itemInstance.parent.id, _toEntity.id));
            _gaveItem = _fromEntity.give(_toEntity, _itemInstance);
        }
        else {
            if (PSDE.enableDebug) console.log("  NoSwitch: {0} is giving {1} to {2}".format(_fromEntity.id, _itemInstance.parent.id, _toEntity.id));
            _gaveItem = _fromEntity.give(_toEntity, _itemInstance);
        }
        if (PSDE.enableDebug) console.log("  _gaveItem : {0}".format(_gaveItem ? "true" : "false"));
        if (_gaveItem && PSDE._interruptMenu) {
            PSDE._interruptMenu = false;
            return true;
        }
        
        if (_gaveItem) {
            if (PSDE.enableDebug) console.log("  Gave {0} to {1}".format(_itemInstance.parent.id, _toEntity.id));
            if (_switch) {
                if (_toEntity instanceof Character)
                    PSDE.characterInteractOpen(_toEntity, _switch, _allowSwitch, _filter, false);
                else if (_toEntity instanceof Furniture)
                    PSDE.furnitureInteractOpen(_toEntity, _switch, _allowSwitch, _filter, false);
            }
            else {
                if (_fromEntity instanceof Character)
                    PSDE.characterInteractOpen(_fromEntity, _switch, _allowSwitch, _filter, false);
                else if (_fromEntity instanceof Furniture)
                    PSDE.furnitureInteractOpen(_fromEntity, _switch, _allowSwitch, _filter, false);
            }
            
            if (_toEntity == PSDE.player) {
                if (_fromEntity instanceof Character)
                    Content.add("<p>{0} take{1} the {2} from {3}.</p>".format(PSDE.subjectPronoun(true).capitalize(), PSDE.pov == 3 ? "s" : "", _itemInstance.parent.toString(), _fromEntity.toString()));
                else if (_fromEntity instanceof Furniture)
                    Content.add("<p>{0} take{1} the {2} from the {3}.</p>".format(PSDE.subjectPronoun(true).capitalize(), PSDE.pov == 3 ? "s" : "", _itemInstance.parent.toString(), _fromEntity.toString()));
            }
        }
        return _gaveItem;
    }

    /**
     * Finds the PhoneInstance from itself, its String ID, the Character which has it, or the String ID of the Character which has it
     * @param  {String, PhoneInstance, Character} _blob The thing to search
     * @return {PhoneInstance}       PhoneInstance
     */
    static findPhone(_blob) {
        if (!(_blob instanceof PhoneInstance)) {
            if (PSDE.phoneInstances.has(_blob))
                return PSDE.phoneInstances.get(_blob);
            else if (_blob instanceof Character) {
                if (_blob.phone instanceof PhoneInstance)
                    return _blob.phone;
                else
                    return undefined;
            }
            else if (PSDE.characters.has(_blob)) {
                _blob = PSDE.getCharacterByID(_blob);
                if (_blob.phone instanceof PhoneInstance)
                    return _blob.phone;
                else
                    return undefined;
            }
            else
                return undefined;
        }
        else
            return _blob;
    }

    /**
     * Clears the Content and Menu.
     */
    static clearContentAndMenu() {
        Menu.clear();
        Content.clear();
        Menu.clear();
    }
    static setCharacterCurrentRoom(_character, _room) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else {
                console.log("Character does not exist.");
                return undefined;
            }
        }
        if (!(_room instanceof Room)) {
            if (PSDE.rooms.has(_room))
                _room = PSDE.getRoomByID(_room);
            else {
                console.log("Room does not exist.");
                return undefined;
            }
        }
        var _previousRoom = PSDE.getCharacterCurrentRoom(_character);
        if (_previousRoom instanceof Room) {
            PSDE.setCharacterPreviousRoom(_character, _previousRoom);
            _previousRoom.removeCharacter(_character);
        }
        PSDE.characterCurrentRoom.set(_character, _room);
        _room.addCharacter(_character);
        return true;
    }
    static setCharacterRoom(_character, _room) {
        return PSDE.setCharacterCurrentRoom(_character, _room);
    }
    static getCharacterCurrentRoom(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        if (PSDE.characterCurrentRoom.has(_character) && PSDE.characterCurrentRoom.get(_character) instanceof Room) {
            return PSDE.characterCurrentRoom.get(_character);
        }
        else {
            return undefined;
        }
    }
    static setCharacterPreviousRoom(_character, _room) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        if (!(_room instanceof Room)) {
            if (PSDE.rooms.has(_room))
                _room = PSDE.getRoomByID(_room);
            else
                return undefined;
        }
        PSDE.characterPreviousRoom.set(_character, _room);
    }
    static getCharacterPreviousRoom(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        if (PSDE.characterPreviousRoom.has(_character) && PSDE.characterPreviousRoom.get(_character) instanceof Room) {
            return PSDE.characterPreviousRoom.get(_character);
        }
        else {
            return undefined;
        }
    }
    static setFurnitureRoom(_furniture, _room) {
        if (!(_furniture instanceof Furniture)) {
            if (PSDE.furniture.has(_furniture))
                _furniture = PSDE.getFurnitureByID(_furniture);
            else
                return undefined;
        }
        if (!(_room instanceof Room)) {
            if (PSDE.rooms.has(_room))
                _room = PSDE.getRoomByID(_room);
            else
                return undefined;
        }
    }
    static getFurnitureRoom(_furniture) {
        if (!(_furniture instanceof Furniture)) {
            if (PSDE.furniture.has(_furniture))
                _furniture = PSDE.getFurnitureByID(_furniture);
            else
                return undefined;
        }
        if (PSDE.furnitureRoom.has(_furniture) && PSDE.furnitureRoom.get(_furniture) instanceof Room) {
            return PSDE.furnitureRoom.get(_furniture);
        }
        else {
            return undefined;
        }
    }
    /**
     * Moves a Character to the specified Room.
     * @param Character _character
     * @param Room _room
     * @return Boolean Whether or not the Character was moved to the Room.
     */
    static moveCharacterToRoom(_character, _room, _checkLocked = false) {
        if (!(_character instanceof Character)) {
            _character = PSDE.getCharacterByID(_character);
            if (!(_character instanceof Character)) {
                return undefined;
            }
        }
        if (!(_room instanceof Room)) {
            _room = PSDE.getRoomByID(_room);
            if (!(_room instanceof Room)) {
                return undefined;
            }
        }
        if (PSDE.enableDebug) console.log("Running moveCharacterToRoom({0}, {1}, {2})".format(_character.id, _room.id, _checkLocked ? "true" : "false"));
        if (PSDE.getCharacterCurrentRoom(_character) == _room) {
            return true;
        }
        if (_checkLocked && PSDE.getCharacterCurrentRoom(_character).isLocked(_room))
            return false;

        if (PSDE.getCharacterCurrentRoom(_character) instanceof Room)
            PSDE.getCharacterCurrentRoom(_character).removeCharacter(_character);

        PSDE.setCharacterCurrentRoom(_character, _room);

        _room.addCharacter(_character);
        if (!_character.knownLocations.has(_room.cell.location))
            _character.knownLocations.add(_room.cell.location);
        if (!_character.knownLocations.has(_room.location))
            _character.knownLocations.add(_room.location);

        if (_character.hasFollowers) {
            _character.followers.forEach(function(_follower) {
                if (PSDE.getCharacterCurrentRoom(_follower) == PSDE.getCharacterPreviousRoom(_character) || PSDE.getCharacterCurrentRoom(_follower) == PSDE.getCharacterCurrentRoom(_character)) {
                    PSDE.moveCharacterToRoom(_follower, _room);
                }
                else {
                    PSDE.characterPathes.set(_follower, PSDE._findPathToRoom(PSDE.getCharacterCurrentRoom(_follower), _room));
                }
            }, this);
        }
        if (PSDE.characterPathes.has(_character)) {
            _character.walk();
        }
        else {
            _character.stand();
        }
        if (PSDE.enableDebug) console.log("Checking for room events.");
        PSDE.events.forEach(function(_event) {
            if (
                _event.cron == undefined &&
                (_event.characterA == undefined || _character == _event.characterA) &&
                (_event.characterB == undefined || (PSDE.getCharacterCurrentRoom(_event.characterA) instanceof Room && PSDE.getCharacterCurrentRoom(_event.characterA).containsCharacter(_event.characterB))) &&
                (_event.room == undefined || PSDE.getCharacterCurrentRoom(_event.characterA) instanceof Room && _event.room.sid == PSDE.getCharacterCurrentRoom(_event.characterA).sid) &&
                (_event.cell == undefined || PSDE.getCharacterCurrentRoom(_event.characterA).cell instanceof Cell && _event.cell == PSDE.getCharacterCurrentRoom(_event.characterA).cell) &&
                (_event.location == undefined || (
                    (PSDE.getCharacterCurrentRoom(_event.characterA).cell.location instanceof Location && _event.location == PSDE.getCharacterCurrentRoom(_event.characterA).cell.location) ||
                    (PSDE.getCharacterCurrentRoom(_event.characterA).location instanceof Location && _event.location == PSDE.getCharacterCurrentRoom(_event.characterA).location)
                )) &&
                (_event.item == undefined || _event.characterA.hasItem(_event.item))
            ) {
                _event.execute();
            }
        }, this);
        if (_character == PSDE.player) {
            PSDE.tick("2m");
        }
        return true;
    }
    /**
     * Passes time.
     * @param String time Amount of time to pass. If passed an integer, will treat it as seconds. "30s" will pass 30 seconds, "30m" will pass 30 minutes, "24h" will pass 24 hours, and "2d" will pass 2 days, in-game time.
     * @param Boolean _updateMinimap Update the Minimap, if it's enabled.
     * @param Boolean _runLastMenu Return to (run again) the last-used menu.
     * @return Date The current time, in-game.
     */
    static tick(time, _updateMinimap = true, _runLastMenu = false, _clearEventsExecutedThisTick = true) {
        var _newTime = new Date(PSDE.currentTime);
        
        if (typeof _updateMinimap != "boolean")
            _updateMinimap = true;
        if (typeof _runLastMenu != "boolean")
            _runLastMenu = false;
        if (typeof _clearEventsExecutedThisTick != "boolean")
            _clearEventsExecutedThisTick = true;
        
        if (PSDE.enableDebug) console.log("Executing PSDE.tick({0}, {1}, {2})".format(time, _updateMinimap ? "true" : "false", _runLastMenu ? "true" : "false"));

        if (Number.isInteger(time))
            _newTime.addSeconds(time);
        else {
            var number = Number.parseInt(time.slice(0, -1));
            if (Number.isInteger(number) && number > 0) {
                switch (time.slice(-1).toLowerCase()) {
                    case "s" : {
                        _newTime.addSeconds(number);
                        break;
                    }
                    case "m" : {
                        _newTime.addMinutes(number);
                        break;
                    }
                    case "h" : {
                        _newTime.addHours(number);
                        break;
                    }
                    case "d" : {
                        _newTime.addDate(number);
                        break;
                    }
                }
            }
        }
        
        if (_newTime instanceof Date) {
            while (PSDE.currentTime < _newTime) {
                PSDE.previousTime = PSDE.currentTime;
                PSDE.currentTime.addMinutes(1);
                
                if (PSDE.currentTime.getSeconds() == 0) {
                    if (PSDE.characterPathes.size > 0) {
                        PSDE.characterPathes.forEach(function(_rooms, _character) {
                            if (_rooms.size > 0) {
                                var _room = _rooms.values().next().value;
                                if (!PSDE.getCharacterCurrentRoom(_character).isLocked(_room) || _character.hasKey(_room)) {
                                    PSDE.moveCharacterToRoom(_character, _room);
                                    _rooms.delete(_room);
                                }
                                else
                                    PSDE.characterPathes.delete(_character);
                            }
                            else
                                PSDE.characterPathes.delete(_character);
                        }, this);
                    }
                }
                
                if (PSDE.enableDebug) console.log("Checking for cron events.");
                
                PSDE.events.forEach(function(_event) {
                    if (
                        _event.cron instanceof Cron &&
                        (
                            (_event.room == undefined || PSDE.getCharacterCurrentRoom(_event.characterA) instanceof Room && _event.room.sid == PSDE.getCharacterCurrentRoom(_event.characterA).sid) &&
                            (_event.cell == undefined || PSDE.getCharacterCurrentRoom(_event.characterA).cell instanceof Cell && _event.cell == PSDE.getCharacterCurrentRoom(_event.characterA).cell) &&
                            (_event.location == undefined || (
                                (PSDE.getCharacterCurrentRoom(_event.characterA).cell.location instanceof Location && _event.location == PSDE.getCharacterCurrentRoom(_event.characterA).cell.location) ||
                                (PSDE.getCharacterCurrentRoom(_event.characterA).location instanceof Location && _event.location == PSDE.getCharacterCurrentRoom(_event.characterA).location)
                            ))
                        ) &&
                        (
                            (_event.cron.year == undefined || (_event.cron.containsYear(PSDE.currentTime))) &&
                            (_event.cron.month == undefined || (_event.cron.containsMonth(PSDE.currentTime))) &&
                            (_event.cron.dom == undefined || (_event.cron.containsDOM(PSDE.currentTime))) &&
                            (_event.cron.dow == undefined || (_event.cron.containsDOW(PSDE.currentTime))) &&
                            (_event.cron.hours == undefined || (_event.cron.containsHours(PSDE.currentTime))) &&
                            (_event.cron.minutes == undefined || (_event.cron.containsMinutes(PSDE.currentTime)))
                        )
                    ) {
                        if (PSDE.enableDebug) console.log("EVENT: {0} : {1} == {2} ? ".format(_event.id, PSDE.currentTime.getDay(), _event.cron.dow));
                        _event.execute();
                    }
                }, this);
            }
        }
        
        PSDE.updateTimeDisplay();
        PSDE.updatePlayerInfoDisplay();
        
        if (PSDE.enableMinimap && _updateMinimap)
            Minimap.generateMapFromStartRoom(PSDE.getCharacterCurrentRoom(PSDE.player));
        if (_runLastMenu)
            PSDE.runLastMenu();

        if (_clearEventsExecutedThisTick)
            PSDE._eventsExecutedThisTick.clear();
        return PSDE.currentTime;
    }
    /**
     * Creates path from Cell(1) to Cell(2), excluding an optional Set of Cell(s)
     * @param Cell _startCell
     * @param Cell _targetCell
     * @param Set<Cell> _excludeCells
     * @return Set<Cell> Set of Cell(s) that follow a linear path, or undefined
     */
    static _findPathFromCellToCell(_startCell, _targetCell, _excludeCells = new Set()) {
        if (!(_startCell instanceof Cell))
            _startCell = PSDE.cells.get(_startCell);
        
        if (!(_targetCell instanceof Cell))
            _targetCell = PSDE.cells.get(_targetCell);
        
        if (!_startCell instanceof Cell || !_targetCell instanceof Cell) {
            if (PSDE.enableDebug) {
                if (!_startCell instanceof Cell &&  !_targetCell instanceof Cell)
                    console.log("\tStart and Target cells aren't instance of Cell");
                else if (!_startCell instanceof Cell)
                    console.log("\tStart cell isn't an instance of Cell.");
                else
                    console.log("\tTarget cell isn't an instance of Cell.");
            }
            return undefined;
        }
        
        if (_startCell == _targetCell)
            return new Set();
        
        var _openList = new Set();
        var _closedList = _excludeCells;
        var _child = new Map();
        var _timeout = 0;
        
        if (_startCell != _targetCell) {
            _openList.add(_startCell);
            
            while (_openList.size > 0 && _timeout < 511) {
                var _currentCell = _openList.values().next().value;
                
                if (_currentCell == _targetCell) {
                    var cur = _currentCell;
                    var ret = [];
                    while (_child.has(_currentCell)) {
                        ret.push(_currentCell);
                        _currentCell = _child.get(_currentCell);
                    }
                    return ret.reverse();
                }
                
                _openList.delete(_currentCell);
                _closedList.add(_currentCell);
                
                _currentCell.cells.forEach(function(_neighbor) {
                    if (_closedList.has(_neighbor))
                        return undefined;
                    
                    if (!_openList.has(_neighbor))
                        _openList.add(_neighbor);
                    
                    _child.set(_neighbor, _currentCell);
                }, this);
                
                _timeout++;
            }
        }
        
        return undefined;
    }
    /**
     * Creates path from Room(1) to Room(2), which share a Cell, excluding an optional Set of Room(s)
     * @param Room _startRoom
     * @param Room _targetRoom
     * @param Set<Room> _excludeRooms
     * @return Set<Room> Set of Room(s) that follow a linear path, or undefined
     */
    static _findPathFromRoomToRoom(_startRoom, _targetRoom, _excludeRooms = new Set()) {
        if (!(_startRoom instanceof Room))
            _startRoom = PSDE.rooms.get(_startRoom);
        
        if (!(_targetRoom instanceof Room))
            _targetRoom = PSDE.rooms.get(_targetRoom);
        
        if (!_startRoom instanceof Room || !_targetRoom instanceof Room)
            return undefined;
        
        if (_startRoom.cell != _targetRoom.cell)
            return undefined;
        
        var _openList = new Set();
        var _closedList = _excludeRooms;
        var _child = new Map();
        var _timeout = 0;
        
        _openList.add(_startRoom);
        
        while (_openList.size > 0 && _timeout < 511) {
            var _currentRoom = _openList.values().next().value;
            
            if (_currentRoom == _targetRoom) {
                var cur = _currentRoom;
                var ret = [];
                while (_child.has(_currentRoom)) {
                    ret.push(_currentRoom);
                    _currentRoom = _child.get(_currentRoom);
                }
                return new Set(ret.reverse());
            }
            
            _openList.delete(_currentRoom);
            _closedList.add(_currentRoom);
            
            _currentRoom.attachedRooms.forEach(function(_neighbor) {
                if (_closedList.has(_neighbor))
                    return undefined;
                
                var _gScore = Math.abs(_currentRoom.x - _startRoom.x) + Math.abs(_currentRoom.y - _startRoom.x) + 1;
                var _gScoreIsBest = false;
                
                if (!_openList.has(_neighbor)) {
                    _gScoreIsBest = true;
                    _openList.add(_neighbor);
                }
                else if (_gScore < (Math.abs(_neighbor.x - _startRoom.x) + Math.abs(_neighbor.y - _startRoom.x))) {
                    _gScoreIsBest = true;
                }
                
                if (_gScoreIsBest) {
                    _child.set(_neighbor, _currentRoom);
                }
            }, this);
            
            _timeout++;
        }
        
        return undefined;
    }
    /**
     * Creates path from Room(1) to Room(2), which may or may no share a Cell, excluding an optional Set of Room(s) and an optional Set of Cell(s)
     * @param Room _startRoom
     * @param Room _targetRoom
     * @param Set<Room> _excludeRooms
     * @param Set<Cell> _excludeCells
     * @return Set<Room> Set of Room(s) that follow a linear path, or undefined
     */
    static _findPathToRoom(_startRoom, _targetRoom, _excludeRooms = new Set(), _excludeCells = new Set()) {
        if (!(_startRoom instanceof Room))
            _startRoom = PSDE.rooms.get(_startRoom);
        
        if (!(_targetRoom instanceof Room))
            _targetRoom = PSDE.rooms.get(_targetRoom);
        
        if (!_startRoom instanceof Room || !_targetRoom instanceof Room)
            return undefined;
        
        if (_startRoom.cell != _targetRoom.cell) {
            var _cellPath = PSDE._findPathFromCellToCell(_startRoom.cell, _targetRoom.cell);
            var _roomPath = new Array();
            var _cTargetRoom = undefined;
            var _cRoom = _startRoom;
            var _nRoom = undefined;
            var _cCell = _startRoom.cell;
            var _pCells = new Set();
            var _i = 1;
            
            if (_cellPath.size == 0)
                return undefined;
            
            Array.from(_cRoom.cell.gateways).some(function(_room) {
                _pCells.add(_room.cell);
                Array.from(_room.attachedRooms.values()).some(function(__room) {
                    _pCells.add(__room.cell);
                    if (__room.cell == _cellPath[0]) {
                        _cTargetRoom = _room;
                        _nRoom = __room;
                        
                        return true;
                    }
                }, this);
            }, this);
            
            if (_cRoom != _cTargetRoom)
                _roomPath = _roomPath.concat(Array.from(PSDE._findPathFromRoomToRoom(_cRoom, _cTargetRoom)));
            
            _roomPath = _roomPath.concat(_nRoom);
            _cRoom = _nRoom;
            
            while (_cRoom != _targetRoom && _i < 511) {
                if (_cRoom.cell != _targetRoom.cell) {
                    Array.from(_cRoom.cell.gateways).some(function(_room) {
                        return Array.from(_room.attachedRooms.values()).some(function(__room) {
                            if (!_pCells.has(__room.cell) && __room.cell == _cellPath[_i]) {
                                _cTargetRoom = _room;
                                _nRoom = __room;
                                
                                return true;
                            }
                        }, this);
                    }, this);
                    
                    _roomPath = _roomPath.concat(Array.from(PSDE._findPathFromRoomToRoom(_cRoom, _cTargetRoom)));
                    _roomPath = _roomPath.concat(_nRoom);
                    _cRoom = _nRoom;
                    
                    _i++;
                }
                else {
                    _roomPath = _roomPath.concat(Array.from(PSDE._findPathFromRoomToRoom(_cRoom, _targetRoom)));
                    _cRoom = _targetRoom;
                }
            }
            
            return new Set(_roomPath);
        }
        else
            return PSDE._findPathFromRoomToRoom(_startRoom, _targetRoom);
    }
    /**
     * Moves Character in a path from their current room to target Room.
     * @param Character _character
     * @param Room _targetRoom
     * @return Boolean Whether or not the path is available, or undefined if the Character or Room are invalid.
     */
    static setCharacterPath(_character, _targetRoom) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        if (!(_targetRoom instanceof Room)) {
            if (typeof _targetRoom == "string" && PSDE.rooms.has(_targetRoom))
                _targetRoom = PSDE.rooms.has(_targetRoom) ? PSDE.rooms.get(_targetRoom) : undefined;
            else if (_targetRoom instanceof Character) {
                _targetRoom = PSDE.getCharacterCurrentRoom(_targetRoom) instanceof Room ? PSDE.getCharacterCurrentRoom(_targetRoom) : undefined;
            }
            else if (PSDE.characters.has(_targetRoom)) {
                var _character = PSDE.getCharacterByID(_targetRoom);
                _targetRoom = PSDE.getCharacterCurrentRoom(_character) instanceof Room ? PSDE.getCharacterCurrentRoom(_character) : undefined;
            }
            else
                _targetRoom = undefined;
        }
        
        if (typeof PSDE.getCharacterCurrentRoom(_character) == 'undefined' || typeof _targetRoom == 'undefined')
            return undefined;
        
        return PSDE.characterPathes.set(_character, PSDE._findPathToRoom(PSDE.getCharacterCurrentRoom(_character), _targetRoom));
    }
    /**
     * Moves Character in a path from their current Room to the target Room at the specific Cron time.
     * @param {String} _id Unique ID
     * @param {Character} _character
     * @param {Room} _targetRoom
     * @param {Cron} _cron
     * @param {Boolean} _runOnce
     */
    static setCharacterRoomScheduleEvent(_id = undefined, _character, _targetRoom, _cron, _function, _runOnce = true) {
        if (_id == undefined)
            _id = "{0}{1}CharacterSchedule{2}Event".format(_character.id, _targetRoom.id.capitalize(), PSDE.events.size);
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;
        if (!(_targetRoom instanceof Room))
            _targetRoom = PSDE.rooms.get(_targetRoom);
        if (!(_cron instanceof Cron))
            return undefined;
        if (typeof _runOnce != "boolean")
            _runOnce = true;
        
        if (!(_character instanceof Character) || !(_targetRoom instanceof Room))
            return undefined;
        
        return new GameEvent(
            _id,        // _id
            undefined,  // _action
            undefined,  // _characterA
            undefined,  // _characterB
            undefined,  // _item
            undefined,  // _location
            undefined,  // _cell
            undefined,  // _room
            _cron,      // _cron
            "PSDE.setCharacterPath({0}, {1}) {2}".format(_character.id, _targetRoom.id, (_function != undefined && _function.length > 2 ? ";" + _function : "")), // _nextFunction
            _runOnce    // _runOnce
        );
    }
    /**
     * Event triggered when Character(1) meets Character(2) {somewhere} with Item
     * @param {String} _id Unique ID
     * @param {Character} _characterA Primary Character
     * @param {Character} _characterB Secondary Character
     * @param {Location, Cell, Room} _place      Location, Cell, or Room
     * @param {Item} _item       Optional Item
     * @param {Function} _function Function to run
     * @param {Boolean} _runOnce Run once
     */
    static setCharactersPlaceItemEvent(_id = undefined, _characterA, _characterB, _place, _item, _function = undefined, _runOnce = true) {
        if (_id == undefined)
            _id = "{0}{1}{2}{3}CharacterMeetingRoomEvent".format(_characterA.id, _characterB.id.capitalize(), _room.id.capitalize(), _item.id.capitalize());
        if (!(_characterA instanceof Character))
            _characterA = PSDE.characters.has(_characterA) ? PSDE.getCharacterByID(_characterA) : undefined;
        if (!(_characterB instanceof Character))
            _characterB = PSDE.characters.has(_characterB) ? PSDE.getCharacterByID(_characterB) : undefined;
        if (!(_item instanceof Item)) {
            if (PSDE.items.has(_item))
                _item = PSDE.items.get(_item);
            else if (_item instanceof ItemInstance)
                _item = _item.parent;
            else if (PSDE.itemInstances.has(_item))
                _item = PSDE.itemInstances.get(_item);
            else
                _item = undefined;
        }
        if (typeof _runOnce != "boolean")
            _runOnce = true;

        if (_characterA == undefined || _characterB == undefined || _function == undefined)
            return undefined;

        if (_room instanceof Room)
            return PSDE.setCharacterMeetinRoomEvent(_id, _characterA, _characterB, _place, _item, _function, _runOnce);
        else if (PSDE.rooms.has(_place))
            return PSDE.setCharacterMeetinRoomEvent(_id, _characterA, _characterB, PSDE.rooms.get(_place), _item, _function, _runOnce);
        else if (_place instanceof Cell)
            return PSDE.setCharacterMeetinCellEvent(_id, _characterA, _characterB, _place, _item, _function, _runOnce);
        else if (PSDE.cells.has(_place))
            return PSDE.setCharacterMeetinCellEvent(_id, _characterA, _characterB, PSDE.cells.get(_place), _item, _function, _runOnce);
        else if (_place instanceof Location)
            return PSDE.setCharacterMeetinLocationEvent(_id, _characterA, _characterB, _place, _item, _function, _runOnce);
        else if (PSDE.locations.has(_place))
            return PSDE.setCharacterMeetinLocationEvent(_id, _characterA, _characterB, PSDE.locations.get(_place), _item, _function, _runOnce);
        else
            return undefined;
    }
    /**
     * Event triggered when Character(1) meets Character(2) in Room with Item
     * @param {String} _id Unique ID
     * @param {Character} _characterA Primary Character
     * @param {Character} _characterB Secondary Character
     * @param {Room} _room      Room
     * @param {Item} _item       Optional Item
     * @param {Function} _function Function to run
     * @param {Boolean} _runOnce Run once
     */
    static setCharactersRoomItemEvent(_id = undefined, _characterA, _characterB, _room, _item, _function, _runOnce = true) {
        if (_id == undefined)
            _id = "{0}{1}{2}{3}CharacterMeetingRoomEvent".format(_characterA.id, _characterB.id.capitalize(), _room.id.capitalize(), _item.id.capitalize());
        if (!(_characterA instanceof Character))
            _characterA = PSDE.characters.has(_characterA) ? PSDE.getCharacterByID(_characterA) : undefined;
        if (!(_characterB instanceof Character))
            _characterB = PSDE.characters.has(_characterB) ? PSDE.getCharacterByID(_characterB) : undefined;
        if (!(_item instanceof Item)) {
            if (PSDE.items.has(_item))
                _item = PSDE.items.get(_item);
            else if (_item instanceof ItemInstance)
                _item = _item.parent;
            else if (PSDE.itemInstances.has(_item))
                _item = PSDE.itemInstances.get(_item);
            else
                _item = undefined;
        }
        if (!(_room instanceof Room))
            _room = PSDE.rooms.has(_room) ? PSDE.rooms.get(_room) : undefined;
        if (typeof _runOnce != "boolean")
            _runOnce = true;

        if (_characterA == undefined || _characterB == undefined || _room == undefined || _function == undefined)
            return undefined;

        return new GameEvent(
            _id,
            undefined,
            _characterA,
            _characterB,
            _item,
            undefined,
            undefined,
            _room,
            undefined,
            _function,
            _runOnce
        );
    }
    /**
     * Event triggered when Character(1) meets Character(2) in Cell with Item
     * @param {String} _id Unique ID
     * @param {Character} _characterA Primary Character
     * @param {Character} _characterB Secondary Character
     * @param {Cell} _cell      Cell
     * @param {Item} _item       Optional Item
     * @param {Function} _function Function to run
     * @param {Boolean} _runOnce Run once
     */
    static setCharactersCellItemEvent(_id = undefined, _characterA, _characterB, _cell, _item, _function, _runOnce = true) {
        if (_id == undefined)
            _id = "{0}{1}{2}{3}CharacterMeetingCellEvent".format(_characterA.id, _characterB.id.capitalize(), _room.id.capitalize(), _item.id.capitalize());
        if (!(_characterA instanceof Character))
            _characterA = PSDE.characters.has(_characterA) ? PSDE.getCharacterByID(_characterA) : undefined;
        if (!(_characterB instanceof Character))
            _characterB = PSDE.characters.has(_characterB) ? PSDE.getCharacterByID(_characterB) : undefined;
        if (!(_item instanceof Item)) {
            if (PSDE.items.has(_item))
                _item = PSDE.items.get(_item);
            else if (_item instanceof ItemInstance)
                _item = _item.parent;
            else if (PSDE.itemInstances.has(_item))
                _item = PSDE.itemInstances.get(_item);
            else
                _item = undefined;
        }
        if (!(_cell instanceof Cell))
            _cell = PSDE.cells.has(_cell) ? PSDE.cells.get(_cell) : undefined;
        if (typeof _runOnce != "boolean")
            _runOnce = true;

        if (_characterA == undefined || _characterB == undefined || _cell == undefined || _function == undefined)
            return undefined;

        return new GameEvent(
            _id,
            undefined,
            _characterA,
            _characterB,
            _item,
            undefined,
            _cell,
            undefined,
            undefined,
            _function,
            _runOnce
        );
    }
    /**
     * Event triggered when Character(1) meets Character(2) at Cell with Item
     * @param {String} _id Unique ID
     * @param {Character} _characterA Primary Character
     * @param {Character} _characterB Secondary Character
     * @param {Location} _location      Location
     * @param {Item} _item       Optional Item
     * @param {Function} _function Function to run
     * @param {Boolean} _runOnce Run once
     */
    static setCharactersLocationItemEvent(_id = undefined, _characterA, _characterB, _location, _item, _function, _runOnce = true) {
        if (_id == undefined)
            _id = "{0}{1}{2}{3}CharacterMeetingLocationEvent".format(_characterA.id, _characterB.id.capitalize(), _room.id.capitalize(), _item.id.capitalize());
        if (!(_characterA instanceof Character))
            _characterA = PSDE.characters.has(_characterA) ? PSDE.getCharacterByID(_characterA) : undefined;
        if (!(_characterB instanceof Character))
            _characterB = PSDE.characters.has(_characterB) ? PSDE.getCharacterByID(_characterB) : undefined;
        if (!(_item instanceof Item)) {
            if (PSDE.items.has(_item))
                _item = PSDE.items.get(_item);
            else if (_item instanceof ItemInstance)
                _item = _item.parent;
            else if (PSDE.itemInstances.has(_item))
                _item = PSDE.itemInstances.get(_item);
            else
                _item = undefined;
        }
        if (!(_location instanceof Location))
            _location = PSDE.locations.has(_location) ? PSDE.locations.get(_location) : undefined;
        if (typeof _runOnce != "boolean")
            _runOnce = true;

        if (_characterA == undefined || _characterB == undefined || _location == undefined || _function == undefined)
            return undefined;

        return new GameEvent(
            _id,
            undefined,
            _characterA,
            _characterB,
            _item,
            _location,
            undefined,
            undefined,
            undefined,
            _function,
            _runOnce
        );
    }
    /**
     * Triggers Function at the specific Cron time
     * @param {String} _id Unique ID
     * @param {String} _nextFunction
     * @param {Cron} _cron
     * @param {Boolean} _runOnce
     */
    static setTimedFunctionEvent(_id = undefined, _nextFunction, _cron, _runOnce = true) {
        if (_id == undefined)
            _id = "miscTimeFunction{0}Event".format(PSDE.events.size);
        if (!(_cron instanceof Cron))
            return undefined;
        if (typeof _runOnce != "boolean")
            _runOnce = true;
        
        return new GameEvent(_id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _cron, _nextFunction, _runOnce);
    }

    /**
     * Returns to (runs again) the last-used menu.
     */
    static runLastMenu() {
        fn = new Function(PSDE.lastMenu);
        try {return fn();}catch (err) {}
    }

    /**
     * Hides all Bootstrap Modals
     */
    static hideModals() {
        $("#webModal").modal("hide");
        $("#optionsModal").modal("hide");
        $("#helpModal").modal("hide");
        $("#aboutModal").modal("hide");
        $("#personalInventoryModal").modal("hide");
        $("#dualInventoryModal").modal("hide");
    }

    /**
     * Lock access to the second Room from the first Room.
     * @param {Room} _roomA
     * @param {Room} _roomB
     * @return {Boolean} Whether or not the Room was locked, or undefined
     */
    static _lockRoom(_roomA, _roomB) {
        if (!(_roomA instanceof Room))
            _roomA = PSDE.rooms.has(_roomA) ? PSDE.rooms.get(_roomA) : undefined;
        if (!(_roomB instanceof Room))
            _roomB = PSDE.rooms.has(_roomB) ? PSDE.rooms.get(_roomB) : undefined;

        if (!(_roomA instanceof Room) || !(_roomB instanceof Room))
            return undefined;

        if (!_roomA.attachedRooms.flip().has(_roomB))
            return undefined;
        else
            _roomB.lock(_roomA);

        Minimap.generateMapFromStartRoom(PSDE.getCharacterCurrentRoom(PSDE.player));
    }
    /**
     * Unlock access to the Room(2) from Room(1).
     * @param {Room} _roomA
     * @param {Room} _roomB
     * @return {Boolean} Whether or not the Room was unlocked, or undefined
     */
    static _unlockRoom(_roomA, _roomB) {
        if (!(_roomA instanceof Room))
            _roomA = PSDE.rooms.has(_roomA) ? PSDE.rooms.get(_roomA) : undefined;
        if (!(_roomB instanceof Room))
            _roomB = PSDE.rooms.has(_roomB) ? PSDE.rooms.get(_roomB) : undefined;

        if (!(_roomA instanceof Room) || !(_roomB instanceof Room))
            return undefined;

        if (!_roomA.attachedRooms.flip().has(_roomB))
            return undefined;
        else
            _roomB.unlock(_roomA);

        if (PSDE.getCharacterCurrentRoom(PSDE.player).cell == _roomB.cell && PSDE.enableMinimap)
            Minimap.generateMapFromStartRoom(PSDE.getCharacterCurrentRoom(PSDE.player));
    }
    /**
     * Locks access to the Room from its attached hallway, or the if it is only attached to one other Room, that Room.
     * @param {Room} _room
     * @return {Boolean} Whether or not the Room was locked, or undefined
     */
    static roomLockFromInside(_room) {
        if (!(_room instanceof Room))
            _room = PSDE.rooms.has(_room) ? PSDE.rooms.get(_room) : undefined;
        
        if (typeof _room == "undefined")
            return undefined;
        
        var _wasLocked = false;
        if (_room.attachedRooms.size > 1) {
            _room.attachedRooms.forEach(function(__room) {
                if (__room.type == "hallway") {
                    _wasLocked = true;
                    PSDE._lockRoom(__room, _room);
                }
            }, this);
        }
        else if (_room.attachedRooms.size == 1) {
            var __room = Array.from(_room.attachedRooms.values())[0];
            if (__room.type != "hallway") {
                _wasLocked = true;
                PSDE._lockRoom(__room, _room);
            }
        }
        
        return _wasLocked;
    }
    /**
     * Unlocks access to the Room from its attached hallway, or the if it is only attached to one other Room, that Room.
     * @param {Room} _room
     * @return {Boolean} Whether or not the Room was unlocked, or undefined
     */
    static roomUnlockFromInside(_room) {
        if (!(_room instanceof Room))
            _room = PSDE.rooms.has(_room) ? PSDE.rooms.get(_room) : undefined;
        
        if (typeof _room == "undefined")
            return undefined;
        
        var _wasUnlocked = false;
        if (_room.attachedRooms.size > 1) {
            _room.attachedRooms.forEach(function(__room) {
                if (__room.type == "hallway") {
                    _wasUnlocked = true;
                    PSDE._unlockRoom(__room, _room);
                }
            }, this);
        }
        else if (_room.attachedRooms.size == 1) {
            var __room = Array.from(_room.attachedRooms.values())[0];
            if (__room.type != "hallway") {
                _wasUnlocked = true;
                PSDE._unlockRoom(__room, _room);
            }
        }
        
        return _wasUnlocked;
    }
    /**
     * Locks access to the Room from the Character's Room, if the Character has the key to the Room.
     * @param {Room} _room
     * @param {Character} _character
     * @return {Boolean} Whether or not the Room was locked, or undefined
     */
    static roomLockFromOutside(_room, _character = PSDE.player) {
        if (!(_room instanceof Room))
            _room = PSDE.rooms.has(_room) ? PSDE.rooms.get(_room) : undefined;
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;
        
        if (typeof _room == "undefined" || typeof _character == "undefined")
            return undefined;
        
        if (!_character.hasKey(_room))
            return false;

        return PSDE._lockRoom(PSDE.getCharacterCurrentRoom(_character), _room);
    }
    /**
     * Unlocks access to the Room from the Character's Room, if the Character has the key to the Room.
     * @param {Room} _room
     * @param {Character} _character
     * @return {Boolean} Whether or not the Room was unlocked, or undefined
     */
    static roomUnlockFromOutside(_room, _character = PSDE.player) {
        if (!(_room instanceof Room))
            _room = PSDE.rooms.has(_room) ? PSDE.rooms.get(_room) : undefined;
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;
        
        if (typeof _room == "undefined" || typeof _character == "undefined")
            return undefined;
        
        if (!_character.hasKey(_room))
            return false;

        return PSDE._unlockRoom(PSDE.getCharacterCurrentRoom(_character), _room);
    }

    /**
     * Adds all Item(s) to the specified Character
     * @param {Character} _character Character to PSDE.add all Item(s) to, defaults to Player
     * @param {Boolean} _execEvents Whether or not to execute Item-specified GameEvent(s), defaults to True
     * @return {Boolean}
     */
    static addAllItems(_character = PSDE.player, _execEvents = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        if (!(typeof _execEvents == 'boolean'))
            _execEvents = true;

        PSDE.items.forEach(function(_item) {
            if (_item instanceof BodyPart || _item instanceof BodyPartInstance)
                return undefined;
            _character.addItem(new ItemInstance(undefined, _item, _character));
        }, this);

        return true;
    }
    /**
     * Adds all known Locations(s) to the specified Character
     * @param {Character} _character Character to PSDE.add all known Location(s) to, defaults to Player
     * @return {Boolean}
     */
    static addAllLocations(_character = PSDE.player) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }

        PSDE.locations.forEach(function(_location) {
            _character.addKnownLocation(_location);
        }, this);

        return true;
    }
    /**
     * Adds all known Spell(s) to the specified Character
     * @param {Character} _character Character to PSDE.add all known Spell(s) to, defaults to Player
     * @return {Boolean}
     */
    static addAllSpells(_character = PSDE.player, _execEvents = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }

        PSDE.spells.forEach(function(_spell) {
            _character.addSpell(_spell);
        }, this);

        return true;
    }

    /**
     * Rolls a number between 1 and _sides, multiplied by _times, and incremented by _addition
     * @param  {Number} _times Multiplier
     * @param  {Number} _sides Max number per _times
     * @param  {Number} _addition To be PSDE.added to the result
     * @return {Number}        Result
     */
    static roll(_times = 1, _sides = 2, _addition = 0) {
        if (typeof _times == "string" && _times.indexOf('d') > -1) {
            var _split = _times.split('d');
            if (_split.length < 2) {
                _times = 1;
                _sides = 2;
                _addition = 0;
            }
            else {
                _times = Number.parseInt(_split[0]);
                if (_split[1].indexOf('+') > -1) {
                    _split = _split[1].split('+');
                    _sides = Number.parseInt(_split[0]);
                    _addition = Number.parseInt(_split[1]);
                }
                else if (_split[1].indexOf('-') > -1) {
                    _split = _split[1].split('-');
                    _sides = Number.parseInt(_split[0]);
                    _addition = -1 * Number.parseInt(_split[1]);
                }
                else {
                    _sides = Number.parseInt(_split[1]);
                    _addition = 0;
                }
            }
        }
        else {
            _times = Number.parseInt(_times);
            _sides = Number.parseInt(_sides);
            _addition = Number.parseInt(_addition);
        }

        if (isNaN(_times)) _times = 1;
        else if (_times < 1) _times = 1;
        else if (_times > 10) _times = 10;
        if (isNaN(_sides)) _sides = 2;
        else if (_sides < 2) _sides = 2;
        else if (_sides > 100) _sides = 100;
        if (isNaN(_addition)) _addition = 0;
        else if (_addition < Number.MIN_SAFE_INTEGER) _addition = Number.MIN_SAFE_INTEGER;
        else if (_addition > Number.MAX_SAFE_INTEGER) _addition = Number.MAX_SAFE_INTEGER;

        var _count = 0;
        for (var i = 0; i < _times; i++) {
            _count += Math.floor(Math.random() * _sides) + 1;
        }
        return _count + _addition;
    }

    /**
     * Sets the Menu to 15 buttons, and runs the last menu.
     */
    static useWideMenu() {
        Menu.useWideMenu = true;
        PSDE.runLastMenu();
    }
    /**
     * Sets the Menu to 12 buttons, and runs the last menu.
     */
    static useNormalMenu() {
        Menu.useWideMenu = false;
        PSDE.runLastMenu();
    }

    static saveGame() {
        var _charArr = new Array();
        var _furnArr = new Array();
        PSDE.characters.forEach(function(_character) {_charArr.push(_character.toJSON())}, this);
        var _text = JSON.stringify(
            {
                "player":PSDE.player.id,
                "lastMenu":PSDE.lastMenu,
                "lastGameEvent":PSDE.lastGameEvent,
                "enableMinimap":PSDE.enableMinimap,
                "enableAutoscroll":PSDE.enableAutoscroll,
                "currentTime":PSDE.currentTime,
                "previousTime":PSDE.previousTime,
                "enableRape":enableRape,
                "enableGore":enableGore,
                "enableModules":PSDE.enableModules,
                "_interruptTick":PSDE._interruptTick,
                "characters":_charArr,
                "furniture":_furnArr
            }
        );

        var _save = document.createElement('a');
        _save.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(_text));
        _save.setAttribute('download', "ps_{0}.json".format(Date.now()));

        _save.style.display = 'none';
        document.body.appendParent(_save);

        _save.click();

        document.body.removeParent(_save);
    }
    static loadGame(_json) {
        if (typeof _json == "string") {
            try {
                var _json = JSON.parse(_json);
            }
            catch (e) {
                if (PSDE.enableDebug) console.log("Parameter `_json` could not be parsed to JSON.");
                return undefined;
            }
        }
        
        // Locations, Cells, Rooms
        // Clothing, Keys, ElectronicDevices, Items, Furniture, Characters
        if (_json.hasOwnProperty("furniture")) {
            _json["furniture"].forEach(function(_furniture) {
                try {
                    var _tmpFurniture = JSON.parse(_furniture);
                    _furniture = _tmpFurniture;
                }
                catch (e) {}

                if (PSDE.furniture.has(_furniture["id"])) {
                    if (PSDE.enableDebug) console.log("Found Furniture `{0}`, updating its Furniture instance.".format(_furniture["id"]));
                    PSDE.furniture.get(_furniture["id"]).fromJSON(_furniture);
                }
                else {
                    if (PSDE.enableDebug) console.log("Couldn't find Furniture `{0}`, creating a new Furniture instance.".format(_furniture["id"]));
                    window[_furniture["id"]] = new Furniture(_furniture);
                }
            });
        }
        if (_json.hasOwnProperty("characters")) {
            _json["characters"].forEach(function(_character) {
                try {
                    var _tmpCharacter = JSON.parse(_character);
                    var _character = _tmpCharacter;
                }
                catch (e) {}

                if (PSDE.characters.has(_character["id"])) {
                    if (PSDE.enableDebug) console.log("Found Character `{0}`, updating their Character instance.".format(_character["id"]));
                    PSDE.getCharacterByID(_character["id"]).fromJSON(_character);
                }
                else {
                    if (PSDE.enableDebug) console.log("Couldn't find Character `{0}`, creating a new Character instance.".format(_character["id"]));
                    window[_character["id"]] = new Character(_character);
                }
            });
        }
        // Initialize all first, then assign properties
        // WebSites, WebPages
        // Cron, GameEvents
        if (_json.hasOwnProperty("GameEvents")) {
            PSDE.events.clear();
        }
        if (_json.hasOwnProperty("player") && PSDE.characters.has(_json["player"])) PSDE.player = PSDE.getCharacterByID(_json["player"]);
        if (_json.hasOwnProperty("lastMenu")) PSDE.lastMenu = _json["lastMenu"];
        if (_json.hasOwnProperty("lastGameEvent")) PSDE.lastGameEvent = _json["lastGameEvent"];
        if (_json.hasOwnProperty("enableMinimap")) PSDE.enableMinimap = _json["enableMinimap"];
        if (_json.hasOwnProperty("enableAutoscroll")) PSDE.enableAutoscroll = _json["enableAutoscroll"];
        if (_json.hasOwnProperty("currentTime")) PSDE.currentTime = new Date(_json["PSDE.currentTime"]);
        if (_json.hasOwnProperty("previousTime")) PSDE.previousTime = new Date(_json["PSDE.previousTime"]);
        if (document.getElementById("toggleRapeButton") != null) {
            if (_json.hasOwnProperty("enableRape")) enableRape = _json["enableRape"];
            if (_json.hasOwnProperty("enableGore")) enableGore = _json["enableGore"];
        }
        if (_json.hasOwnProperty("enableModules")) PSDE.enableModules = _json["enableModules"];
        if (_json.hasOwnProperty("_interruptTick")) PSDE._interruptTick = _json["_interruptTick"];
        PSDE.startGame();
    }
    static loadFile(input) {
        var file, fr, _blob;

        if (typeof window.FileReader !== 'function') {
            alert("The file API isn't supported on this browser yet.");
            return undefined;
        }

        if (!input) {
            alert("Um, couldn't find the fileinput element.");
        }
        else if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            alert("Please select a file before clicking 'Load'");
        }
        else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = function(e) {
                PSDE.loadGame(e.target.result);
            };
            fr.readAsText(file);
        }
    }
    static entityInteract(_entity, _clearContent = false, _clearMenu = true) {
        if (!_entity instanceof Entity || !_entity instanceof Instance) {
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else
                return undefined;
        }

        if (_entity instanceof Object) {
            if (_entity instanceof Character)
                return PSDE.characterInteract(_entity, _clearContent);
            else if (_entity instanceof Furniture)
                return PSDE.furnitureInteract(_entity, _clearContent, _clearMenu);
            else if (_entity instanceof Phone)
                return PSDE.phoneInteract(_entity, _clearContent, _clearMenu);
            else if (_entity instanceof Item || _entity instanceof ItemInstance)
                return PSDE.itemInteract(_entity, PSDE.player, _clearContent, _clearMenu);
            else if (_entity instanceof Spell)
                return PSDE.spellInteract(_entity, PSDE.player, _clearContent, _clearMenu);
            else if (_entity instanceof Room)
                return PSDE.roomInteract(_entity, _clearContent, _clearMenu);
            else
                return false;
        }
        else if (typeof _entity == "string") {
            if (PSDE.characters.has(_entity))
                return PSDE.characterInteract(PSDE.characters.get(_entity), _clearContent);
            else if (PSDE.furniture.has(_entity))
                return PSDE.furnitureInteract(PSDE.furniture.get(_entity), _clearContent, _clearMenu);
            else if (PSDE.phones.has(_entity))
                return PSDE.phoneInteract(PSDE.phones.get(_entity), _clearContent, _clearMenu);
            else if (PSDE.items.has(_entity))
                return PSDE.itemInteract(PSDE.items.get(_entity), PSDE.player, _clearContent, _clearMenu);
            else if (PSDE.itemInstances.has(_entity))
                return PSDE.itemInteract(PSDE.itemInstances.get(_entity), PSDE.player, _clearContent, _clearMenu);
            else if (PSDE.spells.has(_entity))
                return PSDE.spellInteract(PSDE.spells.get(_entity), PSDE.player, _clearContent, _clearMenu);
            else if (PSDE.rooms.has(_entity))
                return PSDE.roomInteract(PSDE.rooms.get(_entity), _clearContent, _clearMenu);
            else
                return false;
        }
    }

    static roomInteract(_room, _clearContent = undefined, _showBaseMenu = true) {
        if (!(_room instanceof Room))
            _room = PSDE.rooms.get(_room);

        if (PSDE.getCharacterCurrentRoom(PSDE.player).isLocked(_room) && !PSDE.player.hasKey(_room)) {
            if (_room.location != PSDE.getCharacterCurrentRoom(PSDE.player).location)
                Content.add("<p>{0} is locked from this side.</p>".format(_room.location.name));
            else
                Content.add("<p>{0} is locked from this side.</p>".format(_room.name));
            return undefined;
        }

        var _previousRoomDifferent = (!(PSDE.getCharacterCurrentRoom(PSDE.player) instanceof Room) || !(PSDE.getCharacterCurrentRoom(PSDE.player).sid == _room.sid));

        if (_clearContent != false && _previousRoomDifferent)
            Content.clear();
        
        if (PSDE.getCharacterCurrentRoom(PSDE.player) !== _room) {
            if ((PSDE.enableDebug)) console.log("Previous Room: {0}".format(PSDE.getCharacterCurrentRoom(PSDE.player).id));
            PSDE.moveCharacterToRoom(PSDE.player, _room);
            if ((PSDE.enableDebug)) console.log("Current Room: {0}".format(PSDE.getCharacterCurrentRoom(PSDE.player).id));
        }

        Title.set(
            (PSDE.getCharacterCurrentRoom(PSDE.player).location.isOwner(PSDE.player) ? "Your {0}".format((PSDE.getCharacterCurrentRoom(PSDE.player).type !== 'undefined' ? PSDE.getCharacterCurrentRoom(PSDE.player).type : "room").capitalize()) : PSDE.getCharacterCurrentRoom(PSDE.player).name),
            undefined,
            (typeof PSDE.getCharacterCurrentRoom(PSDE.player).location !== 'undefined' ? (PSDE.getCharacterCurrentRoom(PSDE.player).location == PSDE.getCharacterCurrentRoom(PSDE.player).cell.location ? PSDE.getCharacterCurrentRoom(PSDE.player).cell.name : PSDE.getCharacterCurrentRoom(PSDE.player).location.name) : "&nbsp;"),
            (typeof PSDE.getCharacterCurrentRoom(PSDE.player).cell.location !== 'undefined' ? PSDE.getCharacterCurrentRoom(PSDE.player).cell.location.name : "&nbsp;")
        );

        Menu.showingBaseMenu = _showBaseMenu == true;

        if (Menu.showingBaseMenu) {
            if ((PSDE.enableDebug)) console.log("\tBase Menu and Room for ".format(_room.sid));
            unsafeExec("{0}Interact({1})".format(_room.sid, _previousRoomDifferent && !PSDE._scenesViewedThisWindow.has(PSDE.getCharacterPreviousRoom(PSDE.player))));

            PSDE._scenesViewedThisWindow.add(PSDE.getCharacterPreviousRoom(PSDE.player));

            PSDE.baseMenu(0, 1);
            
            if (_previousRoomDifferent)
                PSDE._scenesViewedThisWindow.clear();
        }
        else {
            Menu.clear();
            Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(false)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

            PSDE._scenesViewedThisWindow.add(PSDE.getCharacterPreviousRoom(PSDE.player));

            if ((PSDE.enableDebug)) console.log("\tRoom for {0}".format(_room.sid));
            PSDE.lastMenu = "PSDE.roomInteract('{0}', false)".format(_room.sid);
            
            unsafeExec("{0}Interact({1})".format(_room.sid, _previousRoomDifferent && !PSDE._scenesViewedThisWindow.has(PSDE.getCharacterPreviousRoom(PSDE.player))));

            _room.furniture.forEach(function(_furniture) {
                Menu.addOption("PSDE.furnitureInteract('{0}', false, true)".format(_furniture.id), "Look at {0}".format(_furniture.name), _furniture.description);
            });
            
            Menu.generate();
        }

        if (!PSDE._scenesViewedThisWindow.has(PSDE.getCharacterPreviousRoom(PSDE.player))) {
            if (PSDE.getCharacterCurrentRoom(PSDE.player).characters.size > 1) {
                var _blob = "";
                var _characters = [];
                var _followingCharacters = [];

                Array.from(PSDE.getCharacterCurrentRoom(PSDE.player).characters).forEach(function(__character) {
                    if (!__character.isFollowing(PSDE.player) && __character != PSDE.player)
                        _characters.push(__character);
                }, this);
                
                if (_characters.length > 0) {
                    if (_characters.length == 1)
                        _blob += _characters[0].toString() + " is here";
                    else {
                        // Lazy
                        for (var i = 0; i < _characters.length - 1; i++) {
                            _blob += (_characters[i]);
                            if (_characters.length > 2)
                                _blob += (", ");
                        }
                        _blob += " and " + _characters[_characters.length - 1] + " are here";
                    }
                }
                if (PSDE.player.followers.size > 0) {
                    if (_characters.length > 0)
                        _blob += ", along with ";
                    _followingCharacters = Array.from(PSDE.player.followers);
                    if (_followingCharacters.length == 1)
                        _blob += _followingCharacters[0].toString();
                    else {
                        // Lazy
                        for (var i = 0; i < _followingCharacters.length - 1; i++) {
                            _blob += (_followingCharacters[i]);
                            if (_followingCharacters.length > 2)
                                _blob += (", ");
                        }
                        _blob += " and " + _followingCharacters[_followingCharacters.length - 1];
                    }
                    if (_characters.length == 0) {
                        if (_followingCharacters.length > 1)
                            _blob += " are";
                        else
                            _blob += " is";
                    }
                    _blob += " following beside you.";
                }
                else
                    _blob += ".";
                Content.add("<p>" + _blob + "</p>");
            }
        }

        PSDE.events.forEach(function(_event) {
            if (_event.cron != undefined || (_event.location == undefined && _event.cell == undefined && _event.room == undefined)) {
                return undefined;
            }

            if (
                _event.characterA == undefined ||
                (
                    _event.characterA == PSDE.player &&
                    (_event.item == undefined || _event.characterA.containsItem(_event.item))
                )
            ) {
                if (_event.location == undefined ||
                    (_event.location == _room.location || _event.location == _room.cell.location) &&
                    (_event.characterB == undefined || (PSDE.getCharacterCurrentRoom(_event.characterB).location == _event.location || _event.characterB.location == _event.location))
                ) {
                    if (_event.cell == undefined ||
                        (
                            _event.cell == _room.cell &&
                            (_event.characterB == undefined || PSDE.getCharacterCurrentRoom(_event.characterB).cell == _event.cell) &&
                            (PSDE.getCharacterPreviousRoom(_event.characterA).cell != PSDE.getCharacterCurrentRoom(_event.characterA).cell)
                        )
                    ) {
                        if (_event.room == undefined ||
                            (
                                _event.room == _room &&
                                (_event.characterB == undefined || PSDE.getCharacterCurrentRoom(_event.characterB) == _event.room)
                            )
                        ) {
                            _event.execute();
                        }
                    }
                }
            }
        }, this);

        PSDE._eventsExecutedThisTick.clear();
    }

    static characterInteract(_character, _clearContent = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        if (!_character.characterDisposition.has(PSDE.player))
            _character.addNewCharacterDispositionFor(PSDE.player);
        if (!PSDE.player.characterDisposition.has(_character))
            PSDE.player.addNewCharacterDispositionFor(_character);

        Menu.showingBaseMenu = false;
        if (!(_character instanceof Character))
            _character = PSDE.characters.get(_character);
        PSDE.lastMenu = "PSDE.characterInteract('{0}', false)".format(_character.id);

        Title.set(
            _character.name,
            _character.image,
            (typeof PSDE.getCharacterCurrentRoom(PSDE.player).location !== 'undefined' ? PSDE.getCharacterCurrentRoom(PSDE.player).location.name : "&nbsp;"),
            (typeof PSDE.getCharacterCurrentRoom(PSDE.player).cell.location !== 'undefined' ? PSDE.getCharacterCurrentRoom(PSDE.player).cell.location.name : "&nbsp;")
        );

        if (_clearContent) {
            Content.clear();

            unsafeExec("{0}{1}()".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid, _character.id.capitalize()));
        }

        Menu.clear();

        if (typeof window["{0}Talk".format(_character.id)] == "function")
            Menu.setOption(0, "PSDE.characterInteractTalk('{0}')".format(_character.id), "Talk");
        else
            Menu.setOption(0, "PSDE.characterInteractTalk('{0}')".format(_character.id), "Talk", undefined, undefined, 4);

        if (typeof window["{0}Sex".format(_character.id)] == "function") {
            if ((PSDE.player.age >= 18 && _character.age >= 18))
                Menu.setOption(1, "PSDE.characterInteractSex('{0}')".format(_character.id), "Sex");
            else
                Menu.setOption(1, "PSDE.characterInteractSex('{0}')".format(_character.id), "Sex", undefined, undefined, 4);
        }
        else
            Menu.setOption(1, "PSDE.characterInteractSex('{0}')".format(_character.id), "Sex", undefined, undefined, 4);

        Menu.setOption(2, "PSDE.getAppearance({0})".format(_character.id), "Appearance");

        if ((PSDE.enableDebug))
            Menu.setOption(4, "PSDE.characterInteractOpen('{0}')".format(_character.id), "Inventory", "Rifle through {0} pockets, if {1} has them.".format(_character.possessiveAdjective(), _character.subjectPronoun()));
        else
            Menu.setOption(4, "PSDE.characterInteractOpen('{0}', true, false, undefined, false)".format(_character.id), "Give", "Give them an item.")

        if (PSDE.getCharacterCurrentRoom(PSDE.player).characters.size > 2)
            Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.localCharactersMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>those nearby");

        Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

        if (typeof window["{0}Hug".format(_character.id)] == "function")
            Menu.addOption("PSDE.characterInteractHug('{0}')".format(_character.id), "Hug");

        if (_character.isSleeping())
            Menu.addOption("PSDE.characterInteractWake('{0}')".format(_character.id), "Wake");

        unsafeExec("{0}Interact('{1}')".format(_character.id, _clearContent));

        Menu.generate();
    }
    static characterInteractOpen(_character, _switch = false, _allowSwitch = true, _filter = undefined, _clearContent = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                _character = PSDE.player;
        }
        if (typeof _switch != "boolean")
            _switch = false;
        if (typeof _allowSwitch != "boolean")
            _allowSwitch = true;
        if (_filter != undefined) {
            if (_filter == "Item" ||
                _filter == "Key" ||
                _filter == "Clothing" ||
                _filter == "Consumable" ||
                _filter == "Cheque" ||
                _filter == "ElectronicDevice" ||
                _filter == "Phone") {}
            else
                _filter = undefined;
        }

        PSDE.lastMenu = "PSDE.characterInteractOpen('{0}', {1}, {2}, {3}, {4})".format(_character.id, _switch ? "true" : "false", _allowSwitch ? "true" : "false", _filter, false);

        if (PSDE.enableModules) {
            if (!_allowSwitch) {
                $("#personalInventoryModal-title").html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(_character.image));
                $("#personalInventoryModal-list").html(_generateEntityItemsGraphicalList(PSDE.player, _character, false));
                $("#personalInventoryModal-description").html("");
                $("#personalInventoryModal").modal("show");
            }
            else if (_character != PSDE.player) {
                $("#dualInventoryTab-characterA").html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(PSDE.player.image));
                $("#dualInventoryTab-characterB").html("<img style='height:2em' src='{0}' alt=''/>{1} Inventory".format(_character.image, _character.singularPossessiveName()));
                $("#dualInventoryContent-characterA").html(_generateEntityItemsGraphicalList(PSDE.player, _character, true));
                $("#dualInventoryContent-characterB").html(_generateEntityItemsGraphicalList(_character, PSDE.player, true));
                $("#dualInventoryModal").modal("show");
            }
            else {
                $("#personalInventoryModal-title").html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(_character.image));
                $("#personalInventoryModal-list").html(_generateEntityItemsGraphicalList(_character, undefined, false));
                $("#personalInventoryModal-description").html("");
                $("#personalInventoryModal").modal("show");
            }
        }
        else {
            if (_switch) {
                var _characterB = PSDE.player;
                var _characterA = _character;
            }
            else {
                var _characterA = PSDE.player;
                var _characterB = _character;
            }

            if (_clearContent && !PSDE._scenesViewedThisWindow.has("PSDE.characterInteractOpen")) {
                var _blob = "";
                if (_characterB == _characterA)
                    _blob += "Looking through {0} pockets and on {0} person, {1} find{2} ".format(PSDE.possessiveAdjective(), PSDE.subjectPronoun(true), (PSDE.pov == 3 ? "s" : ""));
                else
                    _blob += "Looking through {0}'s pockets and on {1} person, {2} find{3} ".format(_characterB.name, _characterB.possessiveAdjective(), PSDE.subjectPronoun(true), (PSDE.pov == 3 ? "s" : ""));

                if (_characterB.getNumberOfItems() == 0)
                    _blob += "that it is empty.";
                else if (_characterB.getNumberOfItems() == 1)
                    _blob += "a " + _characterB.items[0].parent.toString() + ".";
                else if (_characterB.getNumberOfItems() == 2)
                    _blob += "{0}, and {1}".format(_characterB.items[0].parent.plural ? _characterB.items[0].parent.toString() : _characterB.items[0].parent, _characterB.items[1].parent.plural ? _characterB.items[1].parent : _characterB.items[1].parent);
                else {
                    // Lazy
                    var _arr = _characterB.items;

                    for (var i = 0; i < _arr.length - 1; i++) {
                        _blob += (_arr[i].parent.toString());
                        if (_arr.length > 2)
                            _blob += (", ");
                    }
                    _blob += " and " + _arr[_arr.length - 1].parent.toString() + ".";
                    _arr = null;
                }
                Content.add("<p>" + _blob + "</p>");
                _blob = null;
                PSDE._scenesViewedThisWindow.add("PSDE.characterInteractOpen");
            }

            Menu.clear();
            Menu.showingBaseMenu = false;
            if (_allowSwitch) {
                if (_characterA != _characterB) {
                    Menu.setOption((Menu.useWideMenu ? 4 : 3), "PSDE.characterInteractOpen('{0}', {1}, {2}, '{3}', false)".format(_character.id, !_switch, _allowSwitch, _filter), "Switch Inventory", "to {0}".format(_characterA == PSDE.player ? "yours" : _characterA.singularPossessiveName()));
                    if (_characterB != PSDE.player)
                        Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract('{0}', false, true)".format(_characterB.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0}".format(_characterB.name));
                }
                else
                    Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.personalCharacterMenu()".format(PSDE.player.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Personal Menu");
            }
            else {
                if (_character != PSDE.player)
                    Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract('{0}', false, true)".format(_character.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0}".format(_character.name));
                else
                    Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.personalCharacterMenu()".format(PSDE.player.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Personal Menu");
            }
            Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

            if (_character != PSDE.player) {
                _characterB.items.forEach(function(_itemInstance) {
                    if (_filter == _itemInstance.parent.constructor.name)
                        Menu.addOption("PSDE._generateEntityItemsMenuMove('{0}', '{1}', '{2}', false, {3}, {4}, '{5}')".format(_itemInstance.id, _characterB.id, _characterA.id, _switch, _allowSwitch, _filter), (_switch ? "Give " : "Take ") + _itemInstance.parent.name, _itemInstance.parent.description, undefined, undefined, "btn-primary");
                    else
                        Menu.addOption("PSDE._generateEntityItemsMenuMove('{0}', '{1}', '{2}', false, {3}, {4})".format(_itemInstance.id, _characterB.id, _characterA.id, _switch, _allowSwitch), (_switch ? "Give " : "Take ") + _itemInstance.parent.name, _itemInstance.parent.description, undefined, undefined, "btn-primary");
                }, this);
            }
            else {
                _characterB.items.forEach(function(_itemInstance) {
                    if (_filter == undefined || _filter == _itemInstance.parent.constructor.name)
                        Menu.addOption("PSDE.itemInteract('{0}')".format(_itemInstance.id), "<span class='hidden-md hidden-sm hidden-xs'>Interact with </span>{0}".format(_itemInstance.parent.name), _itemInstance.parent.description, undefined, undefined, "btn-primary");
                }, this);
            }
            Menu.generate();
        }
    }
    static characterInteractTalk(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }


        Menu.clear();
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract({0}, false, true)".format(_character.id), "Back");
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

        if (typeof window["{0}Follow".format(_character.id)] == "function") {
            if (_character.following != PSDE.player)
                Menu.setOption(3, "PSDE.characterInteractFollow('{0}')".format(_character.id), "Ask {0} to follow you".format(_character.objectPronoun()));
            else
                Menu.setOption(3, "PSDE.characterInteractStay('{0}')".format(_character.id), "Ask {0} to stay here".format(_character.objectPronoun()));
        }

        unsafeExec("{0}Talk()".format(_character.id));


        Menu.generate();
    }
    static characterInteractSex(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        Menu.clear();
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract('{0}', false, true)".format(_character.id), "Back");
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

        unsafeExec("{0}Sex()".format(_character.id));

        Menu.generate();
    }
    static characterInteractFollow(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        if (unsafeExec("{0}Follow()".format(_character.id))) {
            _character.follow(PSDE.player);
            PSDE.player.addFollower(_character);
        }
    }
    static characterInteractAttack(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        Menu.clear();
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract({0}, false, true)".format(_character.id), "Back");
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

        unsafeExec("{0}Attack()".format(_character.id));

        Menu.generate();
    }
    static characterInteractStay(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        unsafeExec("{0}Stay()".format(_character.id));
    }
    static characterInteractHug(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        Menu.clear();
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteract({0}, false, true)".format(_character.id), "Back");
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

        unsafeExec("{0}Hug()".format(_character.id));

        Menu.generate();
    }
    static characterInteractWake(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        _character.wake();
        PSDE.characterInteract(_character, false);
    }

    static furnitureInteract(_furniture, _clearContent = false, _clearMenu = true) {
        if (!(_furniture instanceof Furniture))
            _furniture = PSDE.furniture.get(_furniture);

        PSDE.lastMenu = "PSDE.furnitureInteract('{0}', false, true)".format(_furniture.id);

        if (PSDE.player.furniture != _furniture)
            Content.add("<p>You decide to look over the {0}, and you see that it has {1} inside of it.</p>".format(_furniture.type, (_furniture.getNumberOfItems() == 0 ? "no items" : (_furniture.getNumberOfItems() == 1 ? "an item" : "a few items"))));

        Title.set(
            _furniture.name,
            _furniture.image,
            (typeof PSDE.getCharacterCurrentRoom(PSDE.player).location !== 'undefined' ? PSDE.getCharacterCurrentRoom(PSDE.player).location.name : "&nbsp;"),
            (typeof PSDE.getCharacterCurrentRoom(PSDE.player).cell.location !== 'undefined' ? PSDE.getCharacterCurrentRoom(PSDE.player).cell.location.name : "&nbsp;")
        );

        if (_clearMenu) {
            if (_furniture.availableActions.size == 0) {
                Content.add("<p>There is little you can do with {0}.</p>".format(_furniture.name));
            }
            else {
                Menu.clear();
                Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.roomInteract('{0}', false, false)".format(PSDE.getCharacterCurrentRoom(PSDE.player).sid), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>exploring room");
                Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
                Menu.addOption("PSDE.furnitureInteractOpen('{0}')".format(_furniture.id), "Open", (_furniture.getNumberOfItems() > 0 ? "There are items inside" : ""));

                _furniture.availableActions.forEach(function(_action) {
                    if (PSDE.kActionTypes.has(_action)) {
                        switch(_action) {
                            /*case "use" : {
                                if (_furniture.type == "mirror" && PSDE.player.mana > 0)
                                    Menu.addOption("PSDE.furnitureInteractUse('{0}')".format(this.id), "Use {0}".format(this.name), undefined, undefined, undefined, "btn-mana");
                                else
                                    Menu.addOption("PSDE.furnitureInteractUse('{0}')".format(this.id), "Use {0}".format(this.name));
                                break;
                            }*/
                            case "sit" : {
                                if (!(PSDE.player.furniture == this) || (PSDE.player.furniture == this && !PSDE.player.isSitting()))
                                    Menu.addOption("PSDE.furnitureInteractSit('{0}')".format(this.id), "Sit on {0}".format(this.name));
                                break;
                            }
                            case "lay" : {
                                if (!(PSDE.player.furniture == this) || (PSDE.player.furniture == this && !PSDE.player.isLying()))
                                    Menu.addOption("PSDE.furnitureInteractLay('{0}')".format(this.id), "Lay in {0}".format(this.name));
                                break;
                            }
                            case "sleep" : {
                                if (!(PSDE.player.furniture == this) || (PSDE.player.furniture == this && !PSDE.player.isSleeping()))
                                    Menu.addOption("PSDE.furnitureInteractSleep('{0}')".format(this.id), "Sleep in {0}".format(this.name));
                                break;
                            }
                            case "sex" : {
                                if (!(PSDE.player.furniture == this) || (PSDE.player.furniture == this && !PSDE.player.isFucking()))
                                    Menu.addOption("PSDE.furnitureInteractSex('{0}')".format(this.id), "Fuck {0}".format(this.name));
                                break;
                            }
                        }
                    }
                }, _furniture);
                Menu.generate();
            }
        }
    }
    static furnitureInteractOpen(_furniture, _switch = false, _allowSwitch = true, _filter = undefined, _clearContent = true) {
        if (!(_furniture instanceof Furniture))
            _furniture = PSDE.furniture.get(_furniture);

        if (PSDE.enableModules) {
            $('#dualInventoryTab-characterA').html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(PSDE.player.image));
            $('#dualInventoryTab-characterB').html("<img style='height:2em' src='{0}' alt=''/>{1} Inventory".format(_furniture.image, _furniture.name));
            $('#dualInventoryContent-characterA').html(_generateEntityItemsGraphicalList(PSDE.player, _furniture, true));
            $('#dualInventoryContent-characterB').html(_generateEntityItemsGraphicalList(_furniture, PSDE.player, true));
            $("#dualInventoryModal").modal("show");
        }
        else {
            if (_switch) {
                var _characterB = PSDE.player;
                var _characterA = _furniture;
            }
            else {
                var _characterA = PSDE.player;
                var _characterB = _furniture;
            }

            if (_clearContent && !PSDE._scenesViewedThisWindow.has("PSDE.furnitureInteractOpen")) {
                var _blob = "";
                _blob += ("Looking through the {0}, you find ".format(_characterB.toString()));

                if (_characterB.getNumberOfItems() == 0) {
                    _blob += "that it is empty.";
                }
                else if (_characterB.getNumberOfItems() == 1) {
                    _blob += "a {0} {1}.".format((_characterB.items[0].parent.plural ? "PSDE.set of" : ""), _characterB.items[0].parent.toString());
                }
                else if (_characterB.getNumberOfItems() == 2) {
                    _blob += "a {0}{1} and {2}{3}.".format((_characterB.items[0].parent.plural ? "PSDE.set of " : ""), _characterB.items[0].parent.toString(), (_characterB.items[1].parent.plural ? "" : "a "), _characterB.items[1].parent.toString());
                }
                else {
                    // Lazy
                    var _arr = _characterB.parent;

                    for (var i = 0; i < _arr.length - 1; i++) {
                        _blob += (_arr[i].parent.toString());
                        if (_arr.length > 2)
                            _blob += (", ");
                    }
                    _blob += (" and " + _arr[_arr.length - 1].parent.toString() + ".");
                    _arr = null;
                }
                Content.add("<p>" + _blob + "</p>");
                _blob = null;
                PSDE._scenesViewedThisWindow.add("PSDE.furnitureInteractOpen");
            }

            Menu.clear();
            Menu.showingBaseMenu = false;
            Menu.setOption((Menu.useWideMenu ? 4 : 3), "PSDE.furnitureInteractOpen('{0}', {1}, {2}, '{3}', false)".format(_furniture.id, !_switch, _allowSwitch, _filter), "Switch Inventory", "to {0}".format(_characterA == PSDE.player ? "yours" : _characterA.name));
            if (_characterB instanceof Furniture)
                Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.furnitureInteract('{0}', false, true)".format(_characterB.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0}".format(_characterB.name));
            else if (_characterB instanceof Character)
                Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.furnitureInteract('{0}', false, true)".format(_furniture.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0}".format(_furniture.name));
            Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");

            _characterB.items.forEach(function(_itemInstance) {
                if (_filter == _itemInstance.parent.constructor.name)
                    Menu.addOption("PSDE._generateEntityItemsMenuMove('{0}', '{1}', '{2}', false, {3}, true, '{4}')".format(_itemInstance.id, _characterB.id, _characterA.id, _switch, _filter), (_switch ? "Put " : "Take ") + _itemInstance.parent.name, _itemInstance.parent.description, undefined, undefined, "btn-primary");
                else
                    Menu.addOption("PSDE._generateEntityItemsMenuMove('{0}', '{1}', '{2}', false, {3}, true)".format(_itemInstance.id, _characterB.id, _characterA.id, _switch), (_switch ? "Put " : "Take ") + _itemInstance.parent.name, _itemInstance.parent.description, undefined, undefined, "btn-primary");
            }, this);

            Menu.generate();
        }
    }
    static furnitureInteractUse(_furniture, _character = PSDE.player) {
        if (!(_furniture instanceof Furniture))
            _furniture = PSDE.furniture.get(_furniture);
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : undefined;

        if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
            return;

        if (_furniture.type == "mirror") {
            if (_character.mana > 0) {
                Content.add("<p>Pressing your {0} to the mirror, you feel its surface ripple. With {1} focus, your reflection quickly fades to black.</p>".format(_character.getHand(), (_character.mana > 75 ? "an effortless" : (_character.mana > 50 ? "a gentle" : (_character.mana > 25 ? "a strained" : "a headache-inducing")))));
                unsafeExec("{0}Use({1})".format(_furniture.id, _character.id));
            }
            else {
                Content.add("Pressing your {0} to the mirror, you feel its smooth and cold surface.".format(_character.getHand()));
            }
        }
        else {
            unsafeExec("{0}Use({1})".format(_furniture.id, _character.id));
        }
    }
    static furnitureInteractSit(_furniture, _character = PSDE.player) {
        if (!(_furniture instanceof Furniture))
            _furniture = PSDE.furniture.get(_furniture);
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : undefined;

        if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
            return;

        if (PSDE.characterSit(_character, _furniture))
            unsafeExec("{0}Sit({1})".format(_furniture.id, _character.id));
        
        PSDE.runLastMenu();
    }
    static furnitureInteractLay(_furniture, _character = PSDE.player) {
        if (!(_furniture instanceof Furniture))
            _furniture = PSDE.furniture.get(_furniture);
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : undefined;

        if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
            return;

        if (PSDE.characterLay(_character, _furniture))
            unsafeExec("{0}Lay({1})".format(_furniture.id, _character.id));
        
        PSDE.runLastMenu();
    }
    static furnitureInteractSleep(_furniture, _character = PSDE.player) {
        if (!(_furniture instanceof Furniture))
            _furniture = PSDE.furniture.get(_furniture);
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : undefined;
        

        if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
            return;


        if ((PSDE.enableDebug)) console.log("Attempting to sleep in {0}".format(_furniture.id));

        if (PSDE.characterSleep(_character, _furniture))
            unsafeExec("{0}Sleep({1})".format(_furniture.id, _character.id));

        if (_character == PSDE.player)
            _character.removeCurrentAction("sleep");
        
        PSDE.runLastMenu();
    }
    static furnitureInteractLook(_furniture, _character = PSDE.player) {
        if (!(_furniture instanceof Furniture))
            _furniture = PSDE.furniture.get(_furniture);
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.characters.get(_character) : undefined;


        if (!(_furniture instanceof Furniture) || !(_character instanceof Character))
            return;


        unsafeExec("{0}Look({1})".format(_furniture.id, _character.id));
    }
    static furnitureInteractSex(_furniture, _characterA = PSDE.player, _characterB = undefined) {
        if (!(_furniture instanceof Furniture))
            _furniture = PSDE.furniture.get(_furniture);
        if (!(_characterA instanceof Character))
            _characterA = PSDE.characters.has(_characterA) ? PSDE.characters.get(_characterA) : undefined;
        if (!(_characterB instanceof Character))
            _characterB = PSDE.characters.has(_characterB) ? PSDE.characters.get(_characterB) : undefined;


        if (!(_furniture instanceof Furniture) || !(_characterA instanceof Character))
            return;

        if (PSDE.characterSex(_characterA, _characterB, _furniture))
            unsafeExec("{0}Sex({1},{2})".format(_furniture.id, _characterA.id, (_characterB instanceof Character ? _characterB.id : undefined)));
    }

    static itemInteract(_itemInstance, _entity = PSDE.player, _clearContent = false, _clearMenu = true) {
        if (!(_entity instanceof Entity)) {
            if (PSDE.characters.has(_entity))
                _entity = PSDE.characters.get(_entity);
            else if (PSDE.furniture.has(_entity))
                _entity = PSDE.furniture.get(_entity);
            else if (PSDE.items.has(_entity))
                _entity = PSDE.items.get(_entity);
            else
                return undefined;
        }

        if (!(_itemInstance instanceof ItemInstance)) {
            _itemInstance = _entity.getItem(_itemInstance);
            if (typeof _itemInstance == "undefined") return undefined;
        }

        if (PSDE.enableModules) {}
        else {
            if (_itemInstance.parent.description != undefined && _itemInstance.parent.description.length > 0 && !PSDE._scenesViewedThisWindow.has("PSDE.itemInteract"))
                Content.add("<p>{0} look{1} at {2}{3}.</p>".format(PSDE.subjectPronoun(true).capitalize(), (PSDE.pov == 3 ? "s" : ""), (_itemInstance.owner === undefined ? "" : (_itemInstance.owner == PSDE.player ? PSDE.possessiveAdjective() : _itemInstance.owner.singularPossessiveName()) + " "), _itemInstance.parent.toString()));

            PSDE.lastMenu = "PSDE.itemInteract('{0}', '{1}', false, true)".format(_itemInstance.id, _entity.id);

            Menu.clear();
            PSDE._scenesViewedThisWindow.add("PSDE.itemInteract");
            if (_entity instanceof Character)
                Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.characterInteractOpen('{0}', false, true, false)".format(_entity.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0} Inventory".format(_entity.singularPossessiveName()));
            else if (_entity instanceof Furniture)
                Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.furnitureInteractOpen('{0}', false, true, false)".format(_entity.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0} Inventory".format(_entity.name));
            else if (_entity instanceof Item)
                Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.itemInteractOpen('{0}', false, false)".format(_entity.id), "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>{0} Pockets".format(_entity.name));
            
            Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(1)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
            
            _itemInstance.parent.availableActions.forEach(function(_action) {
                if (PSDE.kActionTypes.has(_action)) {
                    switch(_action) {
                        /*case "use" : {
                            !(_itemInstance.parent instanceof Clothing) && Menu.addOption("PSDE.itemInteractUse('{0}', '{1}')".format(this.id, _entity.id), "Use {0}".format(this.parent.name));
                            break;
                        }*/
                        case "put" : {
                            if (_entity instanceof Character) {}
                            else {
                                Menu.addOption("PSDE.itemInteractPut('{0}', '{1}')".format(this.id, _entity.id), "Put {0}".format(this.parent.name));
                            }
                            break;
                        }
                        case "hold" : {
                            if (_entity instanceof Character) {
                                if (_entity.hasHeldEntity(_itemInstance)) {
                                    Menu.addOption("PSDE.itemInteractRelease('{0}', '{1}')".format(this.id, _entity.id), "Release {0}".format(this.parent.name));
                                }
                                else {
                                    Menu.addOption("PSDE.itemInteractHold('{0}', '{1}')".format(this.id, _entity.id), "Hold {0}".format(this.parent.name));
                                }
                            }
                            else {}
                            break;
                        }
                        case "wear" : {
                            if (!_itemInstance.parent instanceof Clothing)
                                break;
                            if (_entity instanceof Character) {
                                if (_entity.isWearing(_itemInstance)) {
                                    Menu.addOption("PSDE.itemInteractDisrobe('{0}', '{1}')".format(this.id, _entity.id), "Take off {0}".format(this.parent.name));
                                }
                                else {
                                    Menu.addOption("PSDE.itemInteractWear('{0}', '{1}')".format(this.id, _entity.id), "Wear {0}".format(this.parent.name));
                                }
                            }
                            else {}
                            break;
                        }
                        case "masturbate" : {
                            if (_entity instanceof Character) {
                                Menu.addOption("PSDE.itemInteractMasturbate('{0}', '{1}')".format(this.id, _entity.id), "Masturbate with {0}".format(this.parent.name));
                            }
                            else {}
                            break;
                        }
                        case "consume" : {
                            if (_entity instanceof Character) {
                                Menu.addOption(
                                    "PSDE.itemInteractConsume('{0}', '{1}')".format(this.id, _entity.id),
                                    "{0} {1}".format(
                                        this.parent.type == "food" ? "Eat" : this.parent.type == "drink" ? "Drink" : "Apply",
                                        this.parent.name
                                    )
                                );
                            }
                            else {}
                            break;
                        }
                    }
                }
            }, _itemInstance);
            Menu.generate();
        }

        return true;
    }
    static itemInteractUse(_itemInstance, _character = PSDE.player) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return undefined;
        }

        return unsafeExec("{0}Use({1})".format(_itemInstance.parent.id, PSDE.player.id));
    }
    /**
     * Item is taken from Character and Put into the Entity; PSDE.addItem for non-Character(s)
     * @param  {Item} _item       [description]
     * @param  {Character} _characterA [description]
     * @param  {Entity} _entityB    [description]
     * @return {Boolean}             [description]
     */
    static itemInteractPut(_itemInstance, _characterA = PSDE.player, _entityB = undefined) {
        if (!(_characterA instanceof Character)) {
            if (PSDE.characters.has(_characterA))
                _characterA = PSDE.characters.get(_characterA);
            else
                return undefined;
        }

        if (!(_entityB instanceof Character) && _entityB != undefined) {
            if (PSDE.characters.has(_entityB))
                _entityB = PSDE.characters.get(_entityB);
            else
                _entityB = undefined;
        }

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return undefined;
        }

        _characterA.removeItem(_itemInstance);
        _entityB.addItem(_itemInstance);

        return true;
    }
    /**
     * Item is Taken from Character and Put into the Entity; PSDE.addItem for Character(s)
     * @param  {Item} _item       [description]
     * @param  {Character} _characterA [description]
     * @param  {Entity} _entityB    [description]
     * @return {Boolean}             [description]
     */
    static itemInteractGive(_itemInstance, _characterA = PSDE.player, _entityB = undefined) {
        if (!(_characterA instanceof Character)) {
            if (PSDE.characters.has(_characterA))
                _characterA = PSDE.characters.get(_characterA);
            else
                return undefined;
        }

        if (!(_entityB instanceof Character) && _entityB != undefined) {
            if (PSDE.characters.has(_entityB))
                _entityB = PSDE.characters.get(_entityB);
            else
                _entityB = undefined;
        }

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return undefined;
        }

        _characterA.removeItem(_itemInstance);
        _entityB.addItem(_itemInstance);

        return true;
    }
    /**
     * Item is Given to Character after being Taken from Entity
     * @param  {Item} _item       [description]
     * @param  {Character} _characterA [description]
     * @param  {Entity} _entityB    [description]
     * @return {Boolean}             [description]
     */
    static itemInteractTake(_itemInstance, _characterA = PSDE.player, _entityB = undefined) {
        if (!(_characterA instanceof Character)) {
            if (PSDE.characters.has(_characterA))
                _characterA = PSDE.characters.get(_characterA);
            else
                return undefined;
        }

        if (!(_entityB instanceof Character) && _entityB != undefined) {
            if (PSDE.characters.has(_entityB))
                _entityB = PSDE.characters.get(_entityB);
            else
                _entityB = undefined;
        }

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return undefined;
        }

        _entityB.removeItem(_item);
        _characterA.addItem(_item);

        return true;
    }
    static itemInteractHold(_itemInstance, _character = PSDE.player) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return undefined;
        }

        if (_character.isWearing(_itemInstance))
            _character.removeClothing(_itemInstance);
        if (_character.addHeldEntity(_itemInstance))
            unsafeExec("{0}Hold({1})".format(_itemInstance.parent.id, _character.id));

        if (PSDE.enableModules) {}
        else
            PSDE.runLastMenu();
        return true;
    }
    static itemInteractRelease(_itemInstance, _character = PSDE.player) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return undefined;
        }

        if (_character.removeHeldEntity(_itemInstance))
            unsafeExec("{0}Release({1})".format(_itemInstance.parent.id, _character.id));

        if (PSDE.enableModules) {}
        else
            PSDE.runLastMenu();
        return true;
    }
    static itemInteractWear(_itemInstance, _character = PSDE.player) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return undefined;
        }

        if (_character.hasHeldEntity(_itemInstance))
            _character.removeHeldEntity(_itemInstance);
        if (!_character.isWearing(_itemInstance))
            _character.setClothing(_itemInstance);
        if (PSDE.enableModules) {}
        else
            PSDE.itemInteract(_itemInstance, _character);

        return true;
    }
    static itemInteractDisrobe(_itemInstance, _character = PSDE.player) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return undefined;
        }

        if (_character.isWearing(_itemInstance))
            _character.removeClothing(_itemInstance);
        if (PSDE.enableModules) {}
        else
            PSDE.itemInteract(_itemInstance, _character);

        return true;
    }
    static itemInteractLook(_itemInstance, _character = PSDE.player) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return undefined;
        }

        if (_character.look(_itemInstance))
            unsafeExec("{0}Look({1})".format(_itemInstance.parent.id, _character.id));

        if (PSDE.enableModules) {}
        else
            Content.add(_itemInstance.description);

        return true;
    }
    static itemInteractAttack(_itemInstance, _character = PSDE.player) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return undefined;
        }

        if (_character.attack(_itemInstance.parent))
            unsafeExec("{0}Attack({1})".format(_itemInstance, _character.id));

        if (PSDE.enableModules) {}
        else
            PSDE.itemInteract(_itemInstance, _character);

        return true;
    }
    static itemInteractSex(_itemInstance, _character = PSDE.player) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return undefined;
        }

        if (PSDE.enableModules) {}
        else
            PSDE.itemInteract(_itemInstance, _character);

        return true;
    }
    static itemInteractMasturbate(_itemInstance, _character = PSDE.player) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return undefined;
        }

        if (_character.isWearing(_itemInstance))
            _character.removeClothing(_itemInstance);
        if (_character.masturbate(_itemInstance))
            unsafeExec("{0}Masturbate({1})".format(_itemInstance.parent.id, _character.id));

        if (PSDE.enableModules) {}
        else
            PSDE.itemInteract(_itemInstance, _character);

        return true;
    }
    static itemInteractConsume(_itemInstance, _character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return undefined;
        }

        if (_character.consume(_itemInstance)) {
            this.addCurrentAction("consume", _itemInstance);
            unsafeExec("{0}Consume({1})".format(_itemInstance.parent.id, _character.id));
        }

        if (PSDE.enableModules) {}
        else
            PSDE.runLastMenu();
        this.removeCurrentAction("consume", _itemInstance);

        return true;
    }

    static spellInteract(_spell, _character = PSDE.player, _clearContent = false, _clearMenu = true) {
        if (!(_spell instanceof Spell)) {
            if (PSDE.spells.has(_spell))
                _spell = PSDE.spells.get(_spell);
            else
                return undefined;
        }
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.characters.get(_character);
            else
                return undefined;
        }

        PSDE.lastMenu = "PSDE.spellInteract('{0}', '{1}', false, true)".format(_spell.id, _character.id);

        Menu.clear();
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.spellMenu()", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Spells");
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(0)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
        switch (_spell.id) {
            case "spellLevitate" : {
                break;
            }
            case "spellTeleport" : {
                break;
            }
            case "spellUnlock" : {
                PSDE.getCharacterCurrentRoom(_character).roomsOptions.forEach(function(_options, _room) {
                    if (_options.isLocked) {
                        Menu.addOption(
                            "PSDE.spellInteractCast({0}, {1})".format(_spell.id, _room.id),
                            _room.location != PSDE.getCharacterCurrentRoom(PSDE.player).location ? _room.location.name : _room.name,
                            "{0} {1}".format(_spell.name, _room.location != PSDE.getCharacterCurrentRoom(PSDE.player).location ? _room.location.name : _room.name),
                            undefined,
                            undefined,
                            "btn-mana"
                        );
                    }
                });
                break;
            }
            case "spellImbue" : {
                break;
            }
            case "spellMirrorOpen" : {}
            case "spellMirrorWalk" : {}
            case "spellMirrorLook" : {}
            case "spellMirror*" : {

                break;
            }
            case "spellCharacterSleep" : {}
            case "spellCharacterSummon" : {}
            case "spellCharacterLust" : {}
            case "spellCharacterRut" : {}
            case "spellCharacterTempDisposition" : {}
            case "spellCharacterGradualDisposition" : {}
            case "spellCharacterCompel" : {}
            case "spellCharacterDominate" : {}
            case "spellCharacterPossess" : {}
            case "spellCharacter*" : {
                Title.clear();
                Title.set(
                    "Spell Targets", 
                    _spell.image, 
                    _spell.name, 
                    "Spells"
                );

                PSDE.getCharacterCurrentRoom(_character).characters.forEach(function(__character) {
                    if (__character == PSDE.player || __character.isCharmed())
                        return undefined;
                    Menu.addOption(
                        "PSDE.spellInteractCast({0}, {1})".format(_spell.id, __character.id),
                        __character.name,
                        "{0} {1}".format(_spell.name, __character.name),
                        undefined,
                        undefined,
                        "btn-mana"
                    );
                });
                break;
            }
            default : {

            }
        }
        Menu.generate();
    }
    static spellInteractCast(_spell, _entity) {
        if ((PSDE.enableDebug)) console.log("Running PSDE.spellInteractCast...");
        if (!(_spell instanceof Spell)) {
            if ((PSDE.enableDebug)) console.log("  Looking for Spell");
            if (PSDE.spells.has(_spell))
                _spell = PSDE.spells.get(_spell);
            else
                return undefined;
        }
        if (!(_entity instanceof Entity)) {
            if ((PSDE.enableDebug)) console.log("  Looking for Entity");
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else if (_entity instanceof Room) {}
            else if (PSDE.rooms.has(_entity)) {
                _entity = PSDE.rooms.get(_entity);
            }
            else
                return undefined;
        }
        if ((PSDE.enableDebug)) console.log("  with {0}, {1}".format(_spell.id, _entity.id));

        if (unsafeExec("{0}Cast({1}, PSDE.player)".format(_spell.id, _entity.id)))
            PSDE.runLastMenu();
        else
            return false;
    }

    static phoneInteract(_phoneInstance, _clearContent = false, _clearMenu = true) {
        if (!(_phoneInstance instanceof PhoneInstance)) {
            if (PSDE.phoneInstances.has(_phoneInstance))
                _phoneInstance = PSDE.phoneInstances.get(_phoneInstance);
            else
                return undefined;
        }

        Title.clear();
        Title.set(
            "Home Screen", 
            undefined, 
            PSDE.player.phone.parent.name, 
            PSDE.player.name
        );

        if (PSDE.enableModules) {

        }
        else {
            if (_clearContent) {
                if (_phoneInstance.owner == PSDE.player)
                    Content.add("<p>You check your phone.</p>");
                else
                    Content.add("<p>You check {0} phone.</p>".format(_phoneInstance.owner.singularPossessiveName()));
            }

            Menu.clear();
            Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(0)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
            Menu.addOption("PSDE.textMessageInteract('{0}', 0)".format(_phoneInstance.id), "Received Messages");
            Menu.addOption("PSDE.textMessageInteract('{0}', 1)".format(_phoneInstance.id), "Read Messages");
            Menu.addOption("PSDE.textMessageInteract('{0}', 2)".format(_phoneInstance.id), "Sent Messages");
            Menu.generate();
        }
    }
    static textMessageInteract(_phoneInstance, _messageCategory) {
        if (!(_phoneInstance instanceof PhoneInstance)) {
            if (PSDE.phoneInstances.has(_phoneInstance))
                _phoneInstance = PSDE.phoneInstances.get(_phoneInstance);
            else
                return undefined;
        }

        var _title = "";
        var _messageType = "";

        switch(_messageCategory) {
            case 1 : {
                _title = "Read Messages";
                _messageType = _phoneInstance.readMessages;
                break;
            }
            case 2 : {
                _title = "Sent Messages";
                _messageType = _phoneInstance.sentMessages;
                break;
            }
            default : {
                _messageCategory = 0;
                _title = "Received Messages";
                _messageType = _phoneInstance.receivedMessages;
            }
        }

        PSDE.lastMenu = "PSDE.textMessageInteract('{0}', '{1}')".format(_phoneInstance.id, _messageCategory);

        Title.clear();
        Title.set(
            _title, 
            undefined, 
            PSDE.player.phone.parent.name, 
            PSDE.player.name
        );

        Menu.clear();
        if (_messageCategory == 2) {
            _messageType.forEach(function(_textMessage) {
                Menu.addOption("PSDE.textMessageInteractRead('{0}', '{1}')".format(_phoneInstance.id, _textMessage.id), "To " + _textMessage.to, _textMessage.time);
            });
        }
        else {
            _messageType.forEach(function(_textMessage) {
                Menu.addOption("PSDE.textMessageInteractRead('{0}', '{1}')".format(_phoneInstance.id, _textMessage.id), "From " + _textMessage.from, _textMessage.time);
            });
        }
        Menu.setOption((Menu.useWideMenu ? 9 : 7), "PSDE.phoneInteract('{0}')".format(_phoneInstance.id), "Check Phone");
        Menu.setOption((Menu.useWideMenu ? 14 : 11), "PSDE.baseMenu(0)", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
        Menu.generate();
    }
    static textMessageInteractRead(_phoneInstance, _textMessage) {
        if (!(_phoneInstance instanceof PhoneInstance)) {
            if (PSDE.phoneInstances.has(_phoneInstance))
                _phoneInstance = PSDE.phoneInstances.get(_phoneInstance);
            else
                return undefined;
        }

        if (!(_textMessage instanceof TextMessage)) {
            if (PSDE.textMessages.has(_textMessage))
                _textMessage = PSDE.textMessages.get(_textMessage);
            else
                return undefined;
        }

        _phoneInstance.readMessage(_textMessage);
        Content.add("<blockquote class='small'><div>{0}</div><div>From: {1}</div><div>To: {2}</div><p>{3}</p></blockquote>".format(_textMessage.time, _textMessage.from, _textMessage.to, _textMessage.message));

        PSDE.runLastMenu();
    }

    static webSiteInteract(_webSite = undefined) {
        if (!(_webSite instanceof WebSite))
            _webSite = webSites.has(_webSite) ? webSites.get(_webSite) : undefined;
        
        if (typeof _webSite == "undefined")
            document.getElementById("webModalBody").innerHTML = "404 Page Not Found.";
        else
            document.getElementById("webModalBody").innerHTML = _webSite.id;
    }
}

/**
 * Class that represents all Entity
 */
class Entity {
    /**
     * Creates an Entity
     * @param  {String} _id          Unique ID
     * @param  {String} _name        Name
     * @param  {String} _description Description
     * @param  {String}  _image      Image path of base64
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined) {
        if (_id instanceof Entity) {
            for (var property in _id) {
                if (_id.hasOwnProperty(property)) {
                    this[property] = _id[property];
                }
            }
        }
        else {
            if (typeof _id == "string") {
                _id = _id.replace(/\W+/g, "");
                if (_id.length == 0) {
                    if (PSDE.enableDebug) console.log("ID for Character was not a valid String");
                    return undefined;
                }
            }
            else {
                if (PSDE.enableDebug) console.log("ID for Character was not a String");
                return undefined;
            }
            /**
             * Identification
             * @type {String} Cannot be undefined!
             */
            this.id = _id;
            /**
             * Name
             * @type {String} Can be undefined
             */
            this.name = _name;
            /**
             * Description
             * @type {String} Can be undefined
             */
            this.description = _description;

            if (typeof _image == 'undefined')
                _image = "resources/images/items/genericItem.svg";
            /**
             * Path to Character's picture
             * @type {String} Relative path to an image, or base64 encoded String
             */
            this.image = _image;

            /**
             * Actions available to this Entity
             * @type {Set} <PSDE.kActionTypes>
             */
            this.availableActions = new Set();
            /**
             * PSDE.kSpecialProperties
             * @type {Set} <PSDE.kSpecialProperties>
             */
            this.specialProperties = new Set();

            /**
             * Weight in kilograms
             * @type {Number} 0.001 to Number.MAX_SAFE_INTEGER
             */
            this.defaultWeight = 0;

            this.addAvailableAction("look");
            this.addSpecialProperty("exists");
        }
        
        PSDE.entities.set(this.id, this);
    }
    triggerActionEvent(_action, _item = undefined, _characterB = undefined) {
        if (!PSDE.kActionTypes.has(_action))
            return undefined;
        if (!(_item instanceof Item) && _item != undefined) {
            if (PSDE.items.has(_item))
                _item = PSDE.items.get(_item);
            else if (_item instanceof ItemInstance)
                _item = _item.parent;
            else if (PSDE.itemInstances.has(_item))
                _item = PSDE.itemInstances.get(_item).parent;
            else
                return undefined;
        }
        if (!(_characterB instanceof Entity) && _characterB != undefined) {
            if (PSDE.entities.has(_characterB))
                _characterB = PSDE.entities.get(_characterB);
            else
                return undefined;
        }
        var _eventResults = new Array();
        PSDE.events.forEach(function(_event) {
            if (_event.action != _action || _event.item != _item || _event.characterB != _characterB) {
                return undefined;
            }
            if (
                (_event.characterA == undefined || this instanceof Character && _event.characterA == this) &&
                (_event.room == undefined || PSDE.getCharacterCurrentRoom(this) instanceof Room && _event.room.sid == PSDE.getCharacterCurrentRoom(this).sid) &&
                (_event.cell == undefined || PSDE.getCharacterCurrentRoom(this).cell instanceof Cell && _event.cell == PSDE.getCharacterCurrentRoom(this).cell) &&
                (_event.location == undefined || (
                    (PSDE.getCharacterCurrentRoom(this).cell.location instanceof Location && _event.location == PSDE.getCharacterCurrentRoom(this).cell.location) ||
                    (PSDE.getCharacterCurrentRoom(this).location instanceof Location && _event.location == PSDE.getCharacterCurrentRoom(this).location)
                )) &&
                (_event.cron == undefined || _event.cron.containsDateTime(PSDE.currentTime) || _event.cron.containsDateTime(PSDE.previousTime))
            ) {
                _eventResults.push(_event.execute());
            }
        }, this);
        if (_eventResults.length == 0)
            return true;
        else {
            var _result = false;
            _eventResults.some(function(_results) {
                if (_results) {
                    _result = true;
                    return true;
                }
            }, this);
            return _result;
        }
    }

    toJSON() {
        var _blob = {};
        var _arr = new Array();
        
        for (var property in this) {
            if (this[property] instanceof Entity || this[property] instanceof Room) {
                _blob[property] = this[property].id;
            }
            else if (this[property] instanceof Object) {
                if (this[property] instanceof Set) {
                    this[property].forEach(function(_entity) {
                        if (_entity instanceof Entity)
                            _arr.push(_entity.id);
                        else
                            _arr.push(_entity);
                    }, this);
                    _blob[property] = JSON.stringify(_arr);
                    _arr = [];
                }
                else if (this[property] instanceof Map) {
                    this[property].forEach(function(_value, _key) {
                        if (_value instanceof Entity)
                            _arr.push([_key, _value.id]);
                        else if (_value instanceof Object)
                            _arr.push([_key.id, _value]);
                    }, this);
                    _blob[property] = JSON.stringify(_arr);
                    _arr = [];
                }
                else if (this[property] instanceof Array) {
                    if (property == 'grid') {
                        this[property].forEach(function(_xValue, _xKey) {
                            _xValue.forEach(function(_yValue, _yKey) {
                                _arr.push([_yValue.id, _xKey, _yKey]);
                            }, this);
                        }, this);
                        _blob[property] = JSON.stringify(_arr);
                        _arr = [];
                    }
                }
                else if (this[property] instanceof Object) {
                    _blob[property] = this[property];
                }
            }
            else
                _blob[property] = this[property];
        }
        
        return JSON.stringify(_blob, function(k, v) { return (v === undefined ? null : v)});
    }

    setName(_name) {
        this.name = _name.replace(/[^0-9a-z\-]/gi, '');
    }
    getName() {
        return this.name;
    }
    setDescription(_description) {
        this.description = _description.replace(/[^0-9a-z\-\!\?\,\.\"\'\<\>\/\_]/gi, '');
    }
    getDescription() {
        return this.description;
    }
    setImage(_image) {
        var _subPath = "";
        if (this instanceof Character) {
            _subPath = "characters";
        }
        else if (this instanceof Furniture) {
            _subPath = "furniture";
        }
        else if (this instanceof Item) {
            _subPath = "items";
        }
        else if (this instanceof Location) {
            _subPath = "locations";
        }

        if (typeof _image == "undefined")
            this.image = "resources/items/genericItem/{0}.svg".format(this.id); // base64 image, or url
        else if (_image.slice(0, 17) == "resources/images/") {
            _image = _image.slice(17).split('/');
            _image = _image[_image.length];
            _image = _image.split('.');
            _image[0] = _image[0].replace(/[^0-9a-z]/gi, '');
            _image[1] = _image[1].replace(/[^0-9a-z]/gi, '');
            var _fileType = _image[1].toLowerCase();
            if (_fileType !== "png" && _fileType !== "svg" && _fileType !== "jpg" && _fileType !== "jpeg" && _fileType !== "gif")
                this.image = "resources/images/{0}/{1}.svg".format(_subPath, this.id);
            else if (_image[0].length < 1)
                this.image = "resources/images/{0}/{1}.svg".format(_subPath, this.id);
            else
                this.image = "resources/images/{0}/{1}.{2}".format(_subPath, _image[0], _image[1]);
            this._fileType = null;
        }
        else if (_image.slice(0, 11) == "data:image/") {
            this.image = _image;
        }
        else
            this.image = "resources/images/items/genericItem.svg".format(this.id); // base64 image, or url
        return this;
    }
    getImage() {
        return this.image;
    }

    /**
     * Adds an available Action when interacting with this Entity
     * @param {String} _actions (PSDE.kActionTypes)
     */
    addAvailableAction(_actions) {
        if (PSDE.kActionTypes.has(_actions))
            this.availableActions.add(_actions);
        else if (_actions instanceof Array) {
            _actions.forEach(function(_action) {
                PSDE.kActionTypes.has(_action) && this.availableActions.add(_action);
            }, this);
        }
        return this;
    }
    /**
     * Removes an available Action when interacting with this Entity
     * @param  {String} _actions (PSDE.kActionTypes)
     * @return {Booealn}          Whether or not the Action was removed
     */
    removeAvailableAction(_actions) {
        if (PSDE.kActionTypes.has(_actions))
            this.availableActions.delete(_actions);
        else if (_actions instanceof Array) {
            _actions.forEach(function(_action) {
                PSDE.kActionTypes.has(_action) && this.availableActions.delete(_action);
            }, this);
        }
        return this;
    }
    getAvailableActions() {
        return this.currentActions;
    }

    /**
     * Adds a PSDE.kSpecialProperties
     * @param {String} _specialProperties (PSDE.kSpecialProperties)
     */
    addSpecialProperty(_specialProperties) {
        if (PSDE.kSpecialProperties.has(_specialProperties))
            this.specialProperties.add(_specialProperties);
        else if (_specialProperties instanceof Array) {
            _specialProperties.forEach(function(_specialProperties) {
                PSDE.kSpecialProperties.has(_specialProperties) && this.specialProperties.add(_specialProperties);
            }, this);
        }
        return this;
    }
    /**
     * Returns this Entity's PSDE.kSpecialProperties
     * @return {Set} <String (PSDE.kSpecialProperties)>
     */
    getSpecialProperties() {
        return this.specialProperties;
    }
    /**
     * Returns whether or not this Entity has the specified PSDE.kSpecialProperties
     * @param  {String}  _specialProperties (PSDE.kSpecialProperties)
     * @return {Boolean}              Whether or not this Entity has the specified PSDE.kSpecialProperties
     */
    hasSpecialProperty(_specialProperties) {
        if (PSDE.kSpecialProperties.has(_specialProperties))
            return this.specialProperties.has(_specialProperties);
        else
            return false;
    }

    toString() {
        var _blob = "";
        if (typeof this.image !== 'undefined') {
            _blob += "<img class='text-center' style='border:0.1em solid white; background-color:white; border-radius:0.5em;' src='{0}' alt=''/><br/>".format(this.image);
        }
        _blob += "<div class='text-center'>{0}</div>".format(this.name);

        if (typeof this.description != 'undefined')
            _blob += "<p>{0}</p>".format(this.description);

        return "<a data-toggle=\"tooltip\" data-placement=\"left\" data-html=\"true\" title=\"{0}\">{1}</a>".format(_blob.replace(/\"/g, '\\"'), this.name);
    }

    delete() {
        PSDE.entities.delete(this.id);
        return undefined;
    }
}

class EntityWithStorage extends Entity {
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined) {
        super(_id, _name, _description, _image);
        /**
         * Item(s) this Character has
         * @type {Array} <ItemInstance>
         */
        this.items = new Array();
    }
    /**
     * Adds _itemInstance; creates an ItemInstance if an Item is passed
     * @param  {Entity} _entity       _entity to take the _itemInstance from
     * @param  {ItemInstance} _itemInstance ItemInstance, or Item, to be added
     * @return {Boolean}               Whether or not _itemInstance was added
     */
    addItem(_itemInstance, _entity = undefined) {
        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else if (_itemInstance instanceof Item)
                _itemInstance = new ItemInstance(undefined, _itemInstance);
            else if (PSDE.items.has(_itemInstance))
                _itemInstance = new ItemInstance(undefined, PSDE.items.get(_itemInstance));
            else
                return undefined;
        }
        if (!(_entity instanceof Entity)) {
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (PSDE.instances.has(_entity))
                _entity = PSDE.instances.get(_entity).parent;
            else
                _entity = undefined;
        }

        if (this.triggerActionEvent("take", _itemInstance.parent, _entity)) {
            if (!this.containsItem(_itemInstance.id))
                this.items.push(_itemInstance);

            if (this instanceof Character && _itemInstance instanceof PhoneInstance && _itemInstance.owner == this)
                this.phone = _itemInstance;
        }

        return this;
    }
    /**
     * Alias for addItem
     * @param  {Entity} _entity       _entity to take the _itemInstance from
     * @param  {ItemInstance} _itemInstance ItemInstance, or Item, to be added
     * @return {Boolean}               Whether or not _itemInstance was added
     */
    take(_entity, _itemInstance) {
        return this.addItem(_itemInstance, _entity).containsItem(_itemInstance);
    }
    /**
     * Removes an ItemInstance from this Character
     * @param  {ItemInstance} _itemInstance ItemInstance, or Item, to be removed
     * @return {Boolean}               Whether or not _itemInstance was removed
     */
    removeItem(_itemInstance) {
        if (!(_itemInstance instanceof ItemInstance)) {
            _itemInstance = this.getItem(_itemInstance);
            if (typeof _itemInstance == "undefined") return undefined;
        }
        if (!this.hasItem(_itemInstance))
            return false;
        if (this instanceof Character) {
            if (this.isWearing(_itemInstance)) {
                this.disrobe(_itemInstance);
                if (this.isWearing(_itemInstance))
                    return false;
            }
            if (this.hasHeldEntity(_itemInstance)) {
                this.removeHeldEntity(_itemInstance);
                if (this.hasHeldEntity(_itemInstance))
                    return false
            }
        }
        if (this.triggerActionEvent("remove", _itemInstance.parent)) {
            this.items.splice(this.items.indexOf(_itemInstance), 1);
            return true;
        }
        else
            return false;
    }
    /**
     * Alias for removeItem
     * @param  {ItemInstance} _itemInstance ItemInstance, or Item, to be removed
     * @return {Boolean}               Whether or not _itemInstance was removed
     */
    remove(_itemInstance) {
        return !(this.removeItem(_itemInstance, _entity).containsItem(_itemInstance));
    }
    /**
     * Returns the ItemInstance of a passed Item or ItemInstance if this Character has it
     * @param  {ItemInstance} _itemInstance The Item or ItemInstance to search for
     * @return {ItemInstance}               The ItemInstance that is found, or undefined if it isn't
     */
    getItem(_itemInstance) {
        var _foundItem = false;

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else if (_itemInstance instanceof Item) {
                this.items.some(function(__itemInstance) {
                    if (__itemInstance.parent == _itemInstance) {
                        _itemInstance = __itemInstance;
                        _foundItem = true;
                        return true;
                    }
                }, this);
                /**
                 * We've already gone through this.items and found what we were looking for, or not;
                 * no need to continue through the rest of this method.
                 */
                if (_foundItem)
                    return _itemInstance;
                else
                    return false;
            }
            else if (PSDE.items.has(_itemInstance)) {
                _itemInstance = PSDE.items.get(_itemInstance);
                this.items.some(function(__itemInstance) {
                    if (__itemInstance.parent == _itemInstance) {
                        _itemInstance = __itemInstance;
                        _foundItem = true;
                        return true;
                    }
                }, this);
                if (_foundItem)
                    return _itemInstance;
                else
                    return false;
            }
            else
                return undefined;
        }

        this.items.some(function(__itemInstance) {
            if (__itemInstance.id == _itemInstance.id)
                _foundItem = true;
        });

        if (_foundItem)
            return _itemInstance;
        else
            return false;
    }

    containsItem(_itemInstance) {
        return this.getItem(_itemInstance) instanceof ItemInstance;
    }
    hasItem(_itemInstance) {
        return this.getItem(_itemInstance) instanceof ItemInstance;
    }
    getItems() {
        return this.items;
    }
    getNumberOfItems() {
        return this.items.length;
    }
    /**
     * Moves _itemInstance to _entity, triggering disrobe, release, remove, and take events in the process.
     * @param  {Entity} _entity       [description]
     * @param  {ItemInstance} _itemInstance [description]
     * @return {Boolean}               [description]
     */
    give(_entity, _itemInstance) {
        if (!(_entity instanceof Entity)) {
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (PSDE.instances.has(_entity))
                _entity = PSDE.instances.get(_entity).parent;
            else
                return undefined;
        }
        if (!(_itemInstance instanceof ItemInstance)) {
            _itemInstance = _entity.getItem(_itemInstance);
            if (_itemInstance == undefined) return undefined;
        }
        if (PSDE.enableDebug) console.log("Executing give({0}, {1}) as {2}".format(_entity.id, _itemInstance.parent.id, this.id));
        if (!this.hasItem(_itemInstance))
            return false;
        if (!this.removeItem(_itemInstance))
            return false;
        if (_entity instanceof Character && this.triggerActionEvent("give", _itemInstance.parent, _entity))
            return _entity.take(_entity, _itemInstance);
        else if (this.triggerActionEvent("put", _itemInstance.parent, _entity))
            return _entity.take(_entity, _itemInstance);
        else
            return false;
    }
}

/**
 * Class that represents all Character(s)
 * @extends {Entity}
 */
class Character extends EntityWithStorage {
    /**
     * Creates a Character
     * @param  {String} _id      Unique ID
     * @param  {String} _name    Name
     * @param  {String} _description Description
     * @param  {String} _image   Image path
     * @param  {String} _class   Character class
     * @param  {Number} _age     Age
     * @param  {Number} _sex     Sex (0 Male, 1 Female, 2 Herm)
     * @param  {String} _species Species
     */
    constructor(_id = "nickWilde", _name = "Wilde, Nicholas", _description = undefined, _image = undefined, _class = "classless", _age = 33, _sex = 0, _species = "fox") {
        var _createNewInstanceFromScratch = true;
        if (_id instanceof Object) {
            super(_id.id, _id._name);
            for (var property in _id) {
                if (_id.hasOwnProperty(property)) {
                    this[property] = _id[property];
                }
            }
            return this;
        }
        
        if (_id.slice(0,1) == '{') {
            try {
                var _json = JSON.parse(_id);
            }
            catch (e) {
                console.log(e);
            }
            
            if (_json instanceof Object) {
                super(_json["id"], _json["name"]);
                _createNewInstanceFromScratch = false;
            }
        }

        if (PSDE.enableDebug) console.log("Creating a new instance of Character with ID `{0}`".format(_id));

        if (_createNewInstanceFromScratch)
            super(_id.replace(/[^0-9a-z]/gi, ''));
        /**
         * Surname
         * @type {String} Cannot be undefined!
         */
        this.name = undefined;
        this.surname = undefined;
        /**
         * Nickname
         * @type {String} Can be undefined
         */
        this.nickname = undefined;
        /**
         * Path to Character's picture
         * @type {String} Relative path to an image, or base64 encoded String
         */
        this.image = undefined;
        /**
         * Character's mesh
         * @type {[type]}
         */
        this.mesh = undefined;
        this.class = undefined;
        /**
         * Age
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.age = 18;
        /**
         * Physical sexual identity
         * @type {Number} 0 - male, 1 - female, 2 - hermaphrodite
         */
        this._sex = PSDE.kMale;
        /**
         * Personal sexual identity
         * @type {Number} 0 - male, 1 - female, 2 - hermaphrodite
         */
        this.gender = PSDE.kMale;
        /**
         * Intraactions this Character is currently performing
         * @type {Map} <PSDE.kIntraactionTypes>
         */
        this.currentActions = {};
        /**
         * Locations known by this Character
         * @type {Set} <Location>
         */
        this.knownLocations = new Set();
        /**
         * Spells known by this Character
         * @type {Set} <Spell>
         */
        this.spells = new Set();
        /**
         * Dominant hand
         * @type {String} "leftHand" or "rightHand"
         */
        this.handedness = "rightHand";
        /**
         * Item(s) this Character is holding; will never exceed two (2) Item(s)
         * @type {Array} <ItemInstance>
         */
        this.heldEntities = {
            leftHand:undefined,
            rightHand:undefined
        };
        /**
         * Current Phone this Character is using
         * @type {Phone} Can be undefined
         */
        this.phone = undefined;
        /**
         * Base disposition this Character has for others
         * @type {Number}  Passion
         * @type {Number}  Friendship
         * @type {Number}  Playfulness
         * @type {Number}  Soulmate
         * @type {Number}  Familial
         * @type {Number}  Obsession
         * @type {Number}  Hate
         */
        this.defaultDisposition = {
            passion:0,
            friendship:0,
            playfulness:0,
            soulmate:0,
            familial:0,
            obsession:0,
            hate:0
        };
        /**
         * This Character's love for themself
         * @type {Number} 0 to 100
         */
        this.philautia = 50;
        /**
         * This Character's love for others
         * @type {Number} 0 to 100
         */
        this.agape = 50;
        /**
         * Optimism, carefree attitude, pleasure-seeking; may compliment philautia
         * @type {Number} 0 to 100
         */
        this.sanguine = 0;
        /**
         * Caring, preservation, helpfulness; may compliment agape
         * @type {Number} 0 to 100
         */
        this.phlegmatic = 0;
        /**
         * Practical, logical, asocial
         * @type {Number} 0 to 100
         */
        this.choleric = 0;
        /**
         * Tradition, stability, order
         * @type {Number} 0 to 100
         */
        this.melancholic = 0;
        /**
         * Hunger; may affect health, stamina, and mana regeneration
         * @type {Number} 0 to 100
         */
        this.hunger = 0;
        /**
         * Physical power
         * @type {Number}
         */
        this.strength = 10;
        /**
         * Agility
         * @type {Number}
         */
        this.dexterity = 10;
        /**
         * Endurance
         * @type {Number}
         */
        this.constitution = 10;
        /**
         * Reasoning and memory
         * @type {Number}
         */
        this.intelligence = 10;
        /**
         * Perception and insight
         * @type {Number}
         */
        this.wisdom = 3;
        /**
         * Force of personality
         * @type {Number}
         */
        this.charisma = 10;
        this.experiencePoints = 0;
        this.level = 1;
        /**
         * Max life; should never drop below 1
         * @type {Number} 1 to Number.MAX_SAFE_INTEGER
         */
        this.lifeMax = 100;
        /**
         * Life; should this drop to 0, u ded
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.life = 100;
        /**
         * Max mana
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.manaMax = 0;
        /**
         * Mana; should this ever be greater than 0, things will be revealed
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.mana = 0;
        /**
         * Mana cost offset percentage when casting spells
         * @type {Number} -100 to 100
         */
        this.manaCostOffsetPercent = 0;
        /**
         * Max stamina; should never drop below 1
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.staminaMax = 100;
        /**
         * Stamina; should this drop to 0, u unconscious
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.stamina = 100;
        /**
         * Money
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.money = 0;
        /**
         * Sanity; may affect mana regeneration, mana, manaMax, and manaCostOffsetPercent
         * @type {Number} 0 to 100
         */
        this.sanity = 100;
        /**
         * Lust
         * @type {Number} 0 to 100
         */
        this.lust = 25;
        /**
         * Whether or not this Character is in rut
         * @type {Boolean} True - yes, false - no
         */
        this.rut = false;
        /**
         * Cleanliness
         * @type {Number} 0 - filthy, 100 clean
         */
        this.cleanliness = 100;
        /**
         * Sex odor
         * @type {Number} 0 - none, 100 reek
         */
        this.odorSex = 0;
        /**
         * Sweat odor
         * @type {Number} 0 - none, 100 reek
         */
        this.odorSweat = 0;
        /**
         * Annoyed
         * @type {Number} 0 - none, 100 agitated
         */
        this.annoyed = 0;
        /**
         * Living
         * @type {Boolean} True - alive, false - dead
         */
        this.living = true;
        /**
         * Primary fur colour
         * @type {String}
         */
        this.furColourA = "orange";
        /**
         * Primary fur colour hex value
         * @type {String}
         */
        this.furColourAHex = undefined;
        /**
         * Sexondary fur colour
         * @type {String}
         */
        this.furColourB = "cream";
        /**
         * Secondary fur colour hex value
         * @type {[type]}
         */
        this.furColourBHex = undefined;
        /**
         * Bodyparts
         * @type {Set} <Bodypart>
         */
        this.bodyParts = new Map();
        /**
         * Size in reference to a tundra wolf
         * @type {Number}
         */
        this.bodySize = 0.5;
        /**
         * Whether or not this Character is a predator
         * @type {Boolean} True - predator, false - prey
         */
        this.predator = false;
        /**
         * Hand type
         * @type {String} (PSDE.kHandTypes)
         */
        this.handType = "pad";
        /**
         * Feet type
         * @type {String} (PSDE.kHandTypes)
         */
        this.feetType = "pad";
        /**
         * Relatives
         * @type {Array} <Character>
         */
        this.biologicalParents = new Array();
        this.fosterParents = new Array();
        this.biologicalChildren = new Array();
        this.fosterChildren = new Array();

        this.spouse = undefined;
        /**
         * Eye type
         * @type {String} (PSDE.kEyeTypes)
         */
        this.eyeType = "circle";
        /**
         * Eye colour
         * @type {String}
         */
        this.eyeColour = "green";
        /**
         * Pelt type
         * @type {String} (PSDE.kPeltTypes)
         */
        this.peltType = "fur";
        /**
         * Pelt trimmed
         * @type {Number} 0 to 100
         */
        this.peltTrimmed = 50;
        /**
         * Pelt softness; I don't really know
         * @type {Number} 0  to 100
         */
        this.peltSoftness = 50;
        /**
         * Breast size
         * @type {Number} 0 - flat, 100 - DD; relative to body size
         */
        this.breastSize = 0;
        /**
         * Penis size in centimeters
         * @type {Number} 0 - none, 100 - Character dies from blood loss
         */
        this.penisSize = 0;
        /**
         * Penis girth in centimeters
         * @type {Number} 0 - none, 100 - Character dies from blood loss
         */
        this.penisGirth = 0;
        /**
         * Vaginal depth in centimeters
         * @type {Number} 0 - none, 100 - Character is basically a trash bag
         */
        this.vaginaSize = 0;
        /**
         * Vaginal girth in centimeters
         * @type {Number} 0 - none, 100 - Character is basically a trash bag
         */
        this.vaginaGirth = 0;
        /**
         * Pubic hair, I don't know how that would work with fur
         * @type {Number} 0 - none, 100 - 70s porn groove plays during sex
         */
        this.pubicHairSize = 0;
        /**
         * Body parts slick with precum
         * @type {Set} <Bodypart>
         */
        this.bodyPartsSlickWithPre = new Set();
        /**
         * Body parts slick with cum
         * @type {Set} <Bodypart>
         */
        this.bodyPartsSlickWithCum = new Set();
        /**
         * Virgin
         * @type {Boolean} True - virgin, false - not a virgin
         */
        this.virgin = true;
        /**
         * Had sex with a male
         * @type {Boolean} True - had sex with a male, false - didn't have sex with a male
         */
        this.hadSexWithMale = false;
        /**
         * Had sex with a female
         * @type {Boolean} True - had sex with a female, false - didn't have sex with a female
         */
        this.hadSexWithFemale = false;
        /**
         * Number of times this Character has had sex
         * @type {Number}
         */
        this.sexCount = 0;
        /**
         * Map of Characters and the Number of times this Character has had sex with them
         * @type {Map} <Character, integer>
         */
        this.sexCountMap = new Map();
        /**
         * Map of Characters and the Number of times this Character has been refused sex with them
         * @type {Map} <Character, integer>
         */
        this.sexRefusalCountMap = new Map();
        /**
         * Number of times this Character has received vaginal
         * @type {Number}
         */
        this.vaginalReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has received vaginal from them
         * @type {Map} <Character, Number>
         */
        this.vaginalReceiveCountMap = new Map();
        /**
         * Number of times this Character has given vaginal
         * @type {Number}
         */
        this.vaginalGiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has given them vaginal
         * @type {Map} <Character, Number>
         */
        this.vaginalGiveCountMap = new Map();
        /**
         * Number of times this Character has received anal
         * @type {Number}
         */
        this.analReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has received anal from them
         * @type {Map} <Character, Number>
         */
        this.analReceiveCountMap = new Map();
        /**
         * Number of times this Character has given anal
         * @type {Number}
         */
        this.analGiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has given them anal
         * @type {Map} <Character, Number>
         */
        this.analGiveCountMap = new Map();
        /**
         * Number of times this Character has received cunnilingus
         * @type {Number}
         */
        this.cunnilingusReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has received cunnilingus from them
         * @type {Map} <Character, Number>
         */
        this.cunnilingusReceiveCountMap = new Map();
        /**
         * Number of times this Character has given cunnilingus
         * @type {Number}
         */
        this.cunnilingusGiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has given them cunnilingus
         * @type {Map} <Character, Number>
         */
        this.cunnilingusGiveCountMap = new Map();
        /**
         * Number of times this Character has received analingus
         * @type {Number}
         */
        this.analingusReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has received analingus from them
         * @type {Map} <Character, Number>
         */
        this.analingusReceiveCountMap = new Map();
        /**
         * Number of times this Character has given analingus
         * @type {Number}
         */
        this.analingusGiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has given them analingus
         * @type {Map} <Character, Number>
         */
        this.analingusGiveCountMap = new Map();
        /**
         * Number of times this Character has received fellatio
         * @type {Number}
         */
        this.fellatioReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has received fellatio from them
         * @type {Map} <Character, Number>
         */
        this.fellatioReceiveCountMap = new Map();
        /**
         * Number of times this Character has given fellatio
         * @type {Number}
         */
        this.fellatioGiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has given them fellatio
         * @type {Map} <Character, Number>
         */
        this.fellatioGiveCountMap = new Map();
        /**
         * Number of times this Character has received a handjob
         * @type {Number}
         */
        this.handjobReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has received a handjob from them
         * @type {Map} <Character, Number>
         */
        this.handjobReceiveCountMap = new Map();
        /**
         * Number of times this Character has given a handjob
         * @type {Number}
         */
        this.handjobGiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has given them a handjob
         * @type {Map} <Character, Number>
         */
        this.handjobGiveCountMap = new Map();
        /**
         * Number of times this Character has masturbated
         * @type {Number}
         */
        this.masturbateCount = 0;
        /**
         * Number of times this Character has performed autofellatio
         * @type {Number}
         */
        this.autofellatioCount = 0;
        /**
         * Number of times this Character has performed autocunnilingus
         * @type {Number}
         */
        this.autocunnilingusCount = 0;
        /**
         * Number of times this Character has performed autoanalingus
         * @type {Number}
         */
        this.autoanalingusCount = 0;
        /**
         * The Character this Character is following
         * @type {Character} Can be undefined
         */
        this.following = undefined; // Character
        /**
         * Set of Character(s) this Character is leading
         * @type {Set} <Character>
         */
        this.followers = new Set(); // Set<Character>
        /**
         * Current Furniture this Character is using
         * @type {Furniture} Can be undefined
         */
        this.furniture = undefined;
        /**
         * Clothing this Character is wearing
         * @type {Map} <String, Clothing>
         */
        this.clothing = {
            hat:undefined,
            mask:undefined,
            glasses:undefined,
            earPiercingLeft:undefined,
            earPiercingRight:undefined,
            nosePiercing:undefined,
            lipPiercing:undefined,
            tonguePiercing:undefined,
            neckwear:undefined,
            shirt:undefined,
            jacket:undefined,
            belt:undefined,
            gloves:undefined,
            underwear:undefined,
            pants:undefined,
            socks:undefined,
            shoes:undefined,
            bra:undefined
        };
        /**
         * Map of Characters and this Character's disposition for them
         * @type {Map} <Character, Object>
         * 
         * @type {Number}  Passion
         * @type {Number}  Friendship
         * @type {Number}  Playfulness
         * @type {Number}  Souldmate
         * @type {Number}  Familial
         * @type {Number}  Obsession
         * @type {Number}  Hate
         */
        this.characterDisposition = new Map();
        /**
         * Set of Characters that are currently being dated
         * @type {Set} <Character>
         */
        this._dating = new Set();
        /**
         * Map of Characters and the Number of times this Character has dated them
         * @type {Map} <Character, Number>
         */
        this._dated = new Map();
        /**
         * Preference for species
         * @type {Set}
         */
        this.prefersSpecies = new Set(); // Set<species>
        /**
         * Preference for avoiding species
         * @type {Set}
         */
        this.avoidsSpecies = new Set(); // Set<species>
        /**
         * Sexual orientation
         * @type {Number} 0 - straight, 1 - gay, 2 - bi
         */
        this.sexualOrientation = 0;
        /**
         * Preferred penis size in males
         * @type {Number}
         */
        this.preferredPenisSize = 0;
        /**
         * Preferred penis girth in males
         * @type {Number}
         */
        this.preferredPenisGirth = 0;
        /**
         * Preferred breast size in females
         * @type {Number}
         */
        this.preferredBreastSize = 0;
        /**
         * Preference for predators
         * @type {Boolean} True - prefers predators, false - doen't prefer predators
         */
        this.prefersPredators = false;
        /**
         * Preference for avoiding predators
         * @type {Boolean} True - avoids predators, false - doesn't avoid predators
         */
        this.avoidsPredators = false;
        /**
         * Preference for prey
         * @type {Boolean} True - prefers prey, false - doesn't prefer prey
         */
        this.prefersPrey = false;
        /**
         * Preference for avoiding prey
         * @type {Boolean} True - avoids prey, false - Doesn't avoid prey
         */
        this.avoidsPrey = false;
        /**
         * Preference for public sex
         * @type {Number} 0 to 100
         */
        this.exhibitionism = 0;
        /**
         * Preference for sleep sex
         * @type {Number} 0 to 100
         */
        this.somnophilia = 0;
        /**
         * Drunkenness
         * @type {Number} 0 to 100
         */
        this.intoxication = 0;
        /**
         * Alcohol tolerance
         * @type {Number} 0 to 100
         */
        this.alcoholTolerance = 0;
        /**
         * Preference for incest
         * @type {Number} 0 to 100
         */
        this.incestual = 0;

        if (_name.split(", ").length > 1) {
            var tempName = _name.split(", ");
            this.name = tempName[1].replace(/[^0-9a-z]/gi, '');
            this.surname = tempName[0].replace(/[^0-9a-z]/gi, '');
        }
        else if (_name.split(" ").length > 1) {
            var tempName = _name.split(" ");
            this.name = tempName[0].replace(/[^0-9a-z]/gi, '');
            this.surname = tempName[1].replace(/[^0-9a-z]/gi, '');
        }
        else {
            this.name = _name.replace(/[^0-9a-z]/gi, '');
        }
        this.setImage(_image);
        this.setClass(_class);
        this.setAge(_age);
        this.setSex(_sex);
        this.setGender(this.getSex());
        this.setSpecies(_species);
        this.addAvailableAction("talk");
        this.addAvailableAction("attack");
        this.addAvailableAction("follow");
        this.addAvailableAction("stay");
        this.addAvailableAction("hold");
        this.addAvailableAction("open"); // inventory... maybe :v
        this.addAvailableAction("give");
        this.addAvailableAction("take");
        this.addAvailableAction("hug");
        this.addAvailableAction("kiss");

        PSDE.characters.set(this.id, this);

        this._generateProperties();
        this.stand();
    }
    
    fromJSON(json = "") {
        if (PSDE.enableDebug) console.log("Running fromJSON");
        
        if (typeof json == "string") {
            try {
                json = JSON.parse(json);
            }
            catch (e) {
                if (PSDE.enableDebug) console.log("Parameter `json` could not be parsed to JSON.");
                return undefined;
            }
        }
        
        if (typeof json["id"] == "undefined" || typeof json["name"] == undefined) {
            if (PSDE.enableDebug) console.log("ID or Name are undefined.");
            return undefined;
        }

        this.id = json["id"]; delete json["id"];
        this.setAge(json.hasOwnProperty("age") ? json["age"] : 21); delete json["age"];
        this.setHunger(json.hasOwnProperty("hunger") ? json["hunger"] : 0); delete json["hunger"];
        this.setLife(json.hasOwnProperty("life") ? json["life"] : 100); delete json["life"];
        this.setLifeMax(json.hasOwnProperty("lifeMax") ? json["lifeMax"] : 100); delete json["lifeMax"];
        this.setMana(json.hasOwnProperty("mana") ? json["mana"] : 0); delete json["mana"];
        this.setManaMax(json.hasOwnProperty("manaMax") ? json["manaMax"] : 0); delete json["manaMax"];
        this.setManaCostOffsetPercent(json.hasOwnProperty("manaCostOffsetPercent") ? json["manaCostOffsetPercent"] : 0); delete json["manaCostOffsetPercent"];
        this.setStamina(json.hasOwnProperty("stamina") ? json["stamina"] : 100); delete json["stamina"];
        this.setStaminaMax(json.hasOwnProperty("staminaMax") ? json["staminaMax"] : 100); delete json["staminaMax"];
        this.setMoney(json.hasOwnProperty("money") ? json["money"] : t0); delete json["money"];
        this.setPhilautia(json.hasOwnProperty("philautia") ? json["philautia"] : t0); delete json["philautia"];
        this.setAgape(json.hasOwnProperty("agape") ? json["agape"] : t0); delete json["agape"];
        this.setSanguine(json.hasOwnProperty("sanguine") ? json["sanguine"] : 0); delete["sanguine"];
        this.setPhlegmatic(json.hasOwnProperty("phlegmatic") ? json["phlegmatic"] : 0); delete["phlegmatic"];
        this.setCholeric(json.hasOwnProperty("choleric") ? json["choleric"] : 0); delete["choleric"];
        this.setMelancholic(json.hasOwnProperty("melancholic") ? json["melancholic"] : 0); delete["melancholic"];
        this.setLust(json.hasOwnProperty("lust") ? json["lust"] : 0); delete json["lust"];
        this.setExhibitionism(json.hasOwnProperty("exhibitionism") ? json["exhibitionism"] : 0); delete json["exhibitionism"];
        this.setSomnophilia(json.hasOwnProperty("somnophilia") ? json["somnophilia"] : 0); delete json["somnophilia"];
        this.setIntoxication(json.hasOwnProperty("intoxication") ? json["intoxication"] : 0); delete json["intoxication"];
        this.setIncestual(json.hasOwnProperty("incestual") ? json["incestual"] : 0); delete json["incestual"];
        this.setRut(json.hasOwnProperty("rut") ? json["rut"] : false); delete json["rut"];
        this.setLiving(json.hasOwnProperty("living") ? json["living"] : true); delete json["living"];
        this.setVirgin(json.hasOwnProperty("virgin") ? json["virgin"] : true); delete json["virgin"];
        this.setSexualOrientation(json.hasOwnProperty("sexualOrientation") ? json["sexualOrientation"] : 0); delete json["sexualOrientation"];
        this.setSex(json.hasOwnProperty("sex") ? json["sex"] : 0); delete json["sex"];
        this.setSpecies(json.hasOwnProperty("species") ? json["species"] : "fox"); delete json["species"];
        this.setFurColourA(json.hasOwnProperty("furColourA") ? json["furColourA"] : "orange"); delete json["furColourA"];
        this.setFurColourB(json.hasOwnProperty("furColourB") ? json["furColourB"] : "cream"); delete json["furColourB"];
        this.setFurColourAHex(json.hasOwnProperty("furColourAHex") ? json["furColourAHex"] : "#b5421f"); delete json["furColourAHex"];
        this.setFurColourBHex(json.hasOwnProperty("furColourBHex") ? json["furColourBHex"] : "#cea971"); delete json["furColourBHex"];
        this.setEyeColour(json.hasOwnProperty("eyeColour") ? json["eyeColour"] : "green"); delete json["eyeColour"];
        this.setEyeColourHex(json.hasOwnProperty("eyeColourHex") ? json["eyeColourHex"] : "#466603"); delete json["eyeColourHex"];
        
        var _tmpArr = [];
        
        // Sets
        //  availableActions
        try {
            if (!(this.availableActions instanceof Set)) this.availableActions = new Set();
            _tmpArr = JSON.parse(json["availableActions"]);
            _tmpArr.forEach(function(_int) {
                this.addAvailableAction(_int);
            }, this);
        } catch (e) {}
        delete json["availableActions"];
        //  avoidsSpecies
        try {
            if (!(this.avoidsSpecies instanceof Set)) this.avoidsSpecies = new Set();
            _tmpArr = JSON.parse(json["avoidsSpecies"]);
            _tmpArr.forEach(function(_int) {
                this.addPreferredSpecies(_int);
            }, this);
        } catch (e) {}
        delete json["avoidsSpecies"];
        //  bodyParts
        try {
            if (!(this.bodyParts instanceof Set)) this.bodyParts = new Set();
            _tmpArr = JSON.parse(json["bodyParts"]);
            _tmpArr.forEach(function(_bodyPart) {
                if (PSDE.kBodyPartTypes.has(_bodyPart))
                    this.addBodyPart(_bodyPart);
            }, this);
        } catch (e) {}
        delete json["bodyParts"];
        //  bodyPartsSlickWithCum
        try {
            if (!(this.bodyPartsSlickWithCum instanceof Set)) this.bodyPartsSlickWithCum = new Set();
            _tmpArr = JSON.parse(json["bodyPartsSlickWithCum"]);
            _tmpArr.forEach(function(_bodyPart) {
                if (PSDE.kBodyPartTypes.has(_bodyPart))
                    this.addBodyPartSlickWithCum(_bodyPart);
            }, this);
        } catch (e) {}
        delete json["bodyPartsSlickWithCum"];
        //  bodyPartsSlickWithPre
        try {
            if (!(this.bodyPartsSlickWithPre instanceof Set)) this.bodyPartsSlickWithPre = new Set();
            _tmpArr = JSON.parse(json["bodyPartsSlickWithPre"]);
            _tmpArr.forEach(function(_bodyPart) {
                if (PSDE.kBodyPartTypes.has(_bodyPart))
                    this.addBodyPartSlickWithPre(_bodyPart);
            }, this);
        } catch (e) {}
        delete json["bodyPartsSlickWithPre"];
        //  followers
        try {
            if (!(this.followers instanceof Set)) this.followers = new Set();
            _tmpArr = JSON.parse(json["followers"]);
            _tmpArr.forEach(function(_character) {
                if (PSDE.characters.has(_character))
                    this.addFollower(PSDE.getCharacterByID(_character));
            }, this);
        } catch (e) {}
        delete json["followers"];
        // _dating
        try {
            if (!(this._dating instanceof Set)) this._dating = new Set();
            _tmpArr = JSON.parse(json["_dating"]);
            _tmpArr.forEach(function(_character) {
                if (PSDE.characters.has(_character))
                    this.dateCharacter(PSDE.getCharacterByID(_character));
            }, this);
        } catch (e) {}
        delete json["_dating"];
        //  items
        try {
            if (!(this.items instanceof Set)) this.items = new Array();
            _tmpArr = JSON.parse(json["items"]);
            _tmpArr.forEach(function(_item) {
                if (PSDE.itemInstances.has(_item))
                    this.addItem(PSDE.itemInstances.get(_item));
            }, this);
        } catch (e) {}
        delete json["items"];
        //  knownLocations
        try {
            if (!(this.knownLocations instanceof Set)) this.knownLocations = new Set();
            _tmpArr = JSON.parse(json["knownLocations"]);
            _tmpArr.forEach(function(_location) {
                if (PSDE.locations.has(_location))
                    this.knownLocations.add(PSDE.locations.get(_location));
            }, this);
        } catch (e) {}
        delete json["knownLocations"];
        //  spells
        try {
            if (!(this.spells instanceof Set)) this.spells = new Set();
            _tmpArr = JSON.parse(json["spells"]);
            _tmpArr.forEach(function(_spell) {
                if (PSDE.spells.has(_spell))
                    this.spells.add(PSDE.spells.get(_spell));
            }, this);
        } catch (e) {}
        delete json["spells"];
        //  prefersSpecies
        try {
            if (!(this.prefersSpecies instanceof Set)) this.prefersSpecies = new Set();
            _tmpArr = JSON.parse(json["prefersSpecies"]);
            _tmpArr.forEach(function(_int) {
                this.addPreferredSpecies(_int);
            }, this);
        } catch (e) {}
        delete json["prefersSpecies"];
        //  specialProperties
        try {
            if (!(this.specialProperties instanceof Set)) this.specialProperties = new Set();
            _tmpArr = JSON.parse(json["specialProperties"]);
            _tmpArr.forEach(function(_specialProperties) {
                if (PSDE.kSpecialProperties.has(_specialProperties))
                    this.addSpecialProperty(_specialProperties);
            }, this);
        } catch (e) {}
        delete json["specialProperties"];
        
        // Maps
        //  sexCountMap
        try {
            if (!(this.sexCountMap instanceof Set)) this.sexCountMap = new Map();
            _tmpArr = JSON.parse(json["sexCountMap"]);
            _tmpArr.forEach(function(_int, _character) {
                if (PSDE.characters.has(_character)) {
                    _int = Number.parseInt(_int);
                    this.sexCountMap.set(PSDE.getCharacterByID(_character), (_int >= 0 ? _int : 0));
                }
                else
                    return undefined;
            }, this);
        } catch (e) {
            console.log(e);
        }
        delete json["sexCountMap"];
        //  sexRefusalCountMap
        try {
            if (!(this.sexRefusalCountMap instanceof Set)) this.sexRefusalCountMap = new Map();
            _tmpArr = JSON.parse(json["sexRefusalCountMap"]);
            _tmpArr.forEach(function(_int, _character) {
                if (PSDE.characters.has(_character)) {
                    _int = Number.parseInt(_int);
                    this.sexRefusalCountMap.set(PSDE.getCharacterByID(_character), (_int >= 0 ? _int : 0));
                }
                else
                    return undefined;
            }, this);
        } catch (e) {
            console.log(e);
        }
        delete json["sexRefusalCountMap"];
        //  characterDisposition
        try {
            if (!(this.characterDisposition instanceof Set)) this.characterDisposition = new Map();
            this.characterDisposition = new Map();
            _tmpArr = JSON.parse(json["characterDisposition"]);
            _tmpArr.forEach(function(_character) {
                if (PSDE.characters.has(_character[0]))
                    this.setCharacterDisposition(_character[0], _character[1]);
                else
                    return undefined;
            }, this);
        } catch (e) {
            console.log(e);
        }
        delete json["characterDisposition"];
        //  currentActions
        try {
            if (!(this.currentActions instanceof Set)) this.currentActions = new Map();
            _tmpArr = JSON.parse(json["currentActions"]);
            _tmpArr.forEach(function(_arr) {
                if (!(_arr instanceof Array)) {
                    console.log("  Error assigning currentActions, they're mangled.");
                    return undefined;
                }

                var _actionType = _arr[0];
                var _entity = _arr[1];

                if (PSDE.entities.has(_entity))
                    _entity = PSDE.entities.get(_entity);
                if (_entity instanceof Furniture) {
                    switch (_actionType) {
                        case "lay" : {
                            this.lay(_entity, ["sleep"]);
                            break;
                        }
                        case "sit" : {
                            this.sit(_entity, ["sleep"]);
                            break;
                        }
                        case "sleep" : {
                            this.sleep(_entity);
                            break;
                        }
                    }
                }
                else if (_entity instanceof Character) {
                    switch (_actionType) {
                        case "follow" : {
                            this.follow(_character);
                            break;
                        }
                        case "sex" : {
                            this.fuck(_entity)
                            break;
                        }
                    }
                }
                else if (_entity instanceof Item) {
                    switch (_actionType) {
                        case "hold" : {
                            this.addHeldEntity(new ItemInstance(undefined, _entity));
                            break;
                        }
                    }
                }
                else if (_entity instanceof ItemInstance) {
                    switch (_actionType) {
                        case "hold" : {
                            this.addHeldEntity(_entity);
                            break;
                        }
                    }
                }
                else {
                    if (!(typeof _entity == "undefined")) {
                        console.log("    Error assigning {0}, it was unaccounted for.".format(_entity instanceof Entity ? _entity.id : _entity));
                    }
                    switch (_actionType) {
                        case "sleep" : {
                            this.sleep();
                            break;
                        }
                        case "stand" : {
                            this.stand();
                        }
                    }
                }
            }, this);
        } catch (e) {
            console.log(e);
        }
        delete json["currentActions"];
        //  clothing
        try {
            if (!(this.clothing instanceof Set)) this.clothing = new Map();
            _tmpArr = JSON.parse(json["clothing"]);
            _tmpArr.forEach(function(_clothing) {
                if (!(_clothing instanceof Clothing))
                    _clothing = PSDE.clothing.has(_clothing) ? PSDE.clothing.get(_clothing) : undefined;

                if (_clothing instanceof Clothing)
                    this.wear(_clothing);
            }, this);
        } catch (e) {
            console.log(e);
        }
        delete json["clothing"];
        //  _dated
        try {
            if (!(this._dated instanceof Set)) this._dated = new Map();
            _tmpArr = JSON.parse(json["_dated"]);
            _tmpArr.forEach(function(_int, _character) {
                if (PSDE.characters.has(_character)) {
                    _int = Number.parseInt(_int);
                    this._dated.set(PSDE.getCharacterByID(_character), (_int >= 0 ? _int : 0));
                }
                else
                    return undefined;
            }, this);
        } catch (e) {
            console.log(e);
        }
        delete json["_dated"];
        // Arrays
        
        // Entities
        //  defaultDisposition
        this.defaultDisposition = this.setDefaultDisposition(json["defaultDisposition"]);
        delete json["defaultDisposition"];
        //  following
        this.following = undefined;
        if (PSDE.characters.has(json["following"]))
            this.follow(PSDE.getCharacterByID(json["following"]));
        delete json["following"];
        //  furniture
        this.furniture = undefined;
        if (PSDE.furniture.has(json["furniture"])) {
            PSDE.furniture.get(json["furniture"]).addCharacter(this);
            this.furniture = PSDE.furniture.get(json["furniture"]);
        }
        delete json["furniture"];
        //  phone
        this.phone = undefined;
        if (PSDE.phones.has(json["phone"])) {
            this.phone = PSDE.phones.get(json["phone"]);
        }
        delete json["phone"];
        //  handType
        if (PSDE.kHandTypes.has(json["handType"]))
            this.setHand(json["handType"])
        delete json["handType"];

        // Primitives
        for (var property in json) {
            if (this.hasOwnProperty(property)) {
                if (json[property] == null)
                    this[property] = undefined;
                else
                    this[property] = json[property];

                delete json[property];
            }
        }
    }

    getFullName() {
        if (this.surname != undefined && this.surname.length > 0)
            return "{0} {1}".format(this.name, this.surname);
        else
            return this.name;
    }

    setImage(_image) {
        if (typeof _image == "undefined")
            this.image = "resources/images/characters/Avatar.svg".format(this.id); // base64 image, or url
        else if (_image.slice(0, 28) == "resources/images/characters/") {
            _image = _image.slice(28);
            _image = _image.split('.');
            _image[0] = _image[0].replace(/[^0-9a-z]/gi, '');
            _image[1] = _image[1].replace(/[^0-9a-z]/gi, '');
            var _fileType = _image[1].toLowerCase();
            if (_fileType !== "png" && _fileType !== "svg" && _fileType !== "jpg" && _fileType !== "jpeg" && _fileType !== "gif")
                this.image = "resources/images/characters/{0}.svg".format(this.id);
            else if (_image[0].length < 1)
                this.image = "resources/images/characters/{0}.svg".format(this.id);
            else
                this.image = "resources/images/characters/{0}.{1}".format(_image[0], _image[1]);
            delete this._fileType;
        }
        else if (_image.slice(0, 11) == "data:image/") {
            this.image = _image;
        }
        else
            this.image = "resources/images/characters/{0}.svg".format(this.id); // base64 image, or url
        return this;
    }
    getImage() {
        return this.image;
    }

    setClass(_class) {
        if (PSDE.kCharacterClasses.has(_class))
            this.class = _class;
        else
            this.class = "commoner";
        return this;
    }
    getClass() {
        return this.class;
    }

    calculateManaCost(_cost = 0) {
        if (!isNaN(_cost)) {}
        else if (_cost instanceof Spell) {
            _cost = _cost.manaCost;
        }
        else if (PSDE.spells.has(_cost))
            _cost = PSDE.spells.get(_cost).manaCost;
        if (this.manaCostOffsetPercent == 0 || _cost == 0)
            return _cost;
        else if (_cost < 0)
            return 0;
        else
            return _cost - (_cost / (100 / this.manaCostOffsetPercent));
    }

    setHandedness(_hand) {
        if (_hand == "leftHand")
            this.handedness = "leftHand";
        else if (_hand == "rightHand")
            this.handedness = "rightHand";
    }
    getHandedness() {
        return this.handedness;
    }
    setLeftHanded(_bool = true) {
        if (_bool === true)
            this.setHandedness("leftHand");
        else
            this.setHandedness("rightHand");
    }
    setRightHanded(_bool = true) {
        if (_bool === true)
            this.setHandedness("rightHand");
        else
            this.setHandedness("leftHand");
    }

    /**
     * Adds Entity(s) to this Character's heldEntities
     * NOTE: Directly modifies this.currentAction
     * @param  {EntityInstance} _entityInstance The Entity to be held
     * @param  {String} _hand The hand to hold it in; can be "leftHand", "rightHand", or undefined
     * @param {this} This
     */
    addHeldEntity(_entityInstance, _hand = undefined) {
        if (!(_entityInstance instanceof EntityInstance)) {
            if (PSDE.instances.has(_entityInstance))
                _entityInstance = PSDE.instances.get(_entityInstance);
            else
                return this;
        }

        if (this.hasHeldEntity(_entityInstance))
            return this;
        if (_hand !== undefined && _hand != "leftHand" && _hand != "rightHand") {
            switch (_hand.slice(0, -1).toLowerCase()) {
                case 0 :
                case "0" :
                case "l" : {
                    _hand = "leftHand";
                    break;
                }
                case 1 :
                case "1" :
                case "r" : {
                    _hand = "rightHand";
                    break;
                }
            }
        }
        if (_hand != "leftHand" && _hand != "rightHand") {
            if (this.hasSomethingInBothHands())
                _hand = this.handedness;
            else
                _hand = this.getFreeHand();
        }
        if (this.heldEntities[_hand] instanceof Entity) {
            if (!this.removeHeldEntity(this.heldEntities[_hand]))
                return this;
        }
        if (this.triggerActionEvent("hold", _entityInstance.parent)) {
            this.heldEntities[_hand] = _entityInstance;
            this.currentActions["hold"] = this.heldEntities;
        }
        return this;
    }
    /**
     * Removes Entity held in either hand
     * NOTE: Directly modifies this.currentAction
     * @param  {EntityInstance, String} _entityInstance EntityInstance, EntityInstance ID, "leftHand", or "rightHand"
     * @return {this} This
     */
    removeHeldEntity(_entityInstance) {
        if (!(_entityInstance instanceof EntityInstance)) {
            if (PSDE.instances.has(_entityInstance))
                _entityInstance = PSDE.instances.get(_entityInstance);
            else if (_entityInstance == "leftHand")
                _entityInstance = this.getEntityInLeftHand();
            else if (_entityInstance == "rightHand")
                _entityInstance = this.getEntityInRightHand();
            else
                return this;
        }
        if (this.hasHeldEntity(_entityInstance) && this.triggerActionEvent("release", _entityInstance.parent)) {
            if (this.getEntityInRightHand() == _entityInstance)
                this.removeEntityInRightHand();
            if (this.getEntityInLeftHand() == _entityInstance)
                this.removeEntityInLeftHand();
            this.currentActions["hold"] = this.heldEntities;
        }
        return this;
    }
    hasHeldEntity(_entityInstance) {
        if (!(_entityInstance instanceof EntityInstance)) {
            if (PSDE.entityInstances.has(_entityInstance))
                _entityInstance = PSDE.entityInstances.get(_entityInstance);
            else {
                _entityInstance = this.getItem(_entityInstance);
                if (!(_entityInstance instanceof EntityInstance))
                    return undefined;
            }
        }
        return this.heldEntities["leftHand"] == _entityInstance || this.heldEntities["rightHand"] == _entityInstance;
    }
    isHoldingEntity(_entityInstance) {
        return this.hasHeldEntity(_entityInstance);
    }
    isHolding(_entityInstance) {
        return this.hasHeldEntity(_entityInstance);
    }
    hasSomethingInLeftHand() {
        return this.heldEntities["leftHand"] instanceof ItemInstance;
    }
    hasEntityInLeftHand() {
        return this.hasSomethingInLeftHand();
    }
    hasSomethingInRightHand() {
        return this.heldEntities["rightHand"] instanceof ItemInstance;
    }
    hasEntityInRightHand() {
        return this.hasSomethingInRightHand();
    }
    hasSomethingInBothHands() {
        return this.heldEntities["leftHand"] instanceof ItemInstance && this.heldEntities["rightHand"] instanceof ItemInstance;
    }
    handsFull() {
        return this.hasSomethingInBothHands();
    }
    hasSomethingInEitherHand() {
        return this.hasSomethingInRightHand() || this.hasSomethingInLeftHand();
    }
    getEntityInRightHand() {
        if (this.hasSomethingInRightHand())
            return this.heldEntities["rightHand"];
        else
            return undefined;
    }
    getEntityInLeftHand() {
        if (this.hasSomethingInLeftHand())
            return this.heldEntities["leftHand"];
        else
            return undefined;
    }
    getFreeHand() {
        if (this.handedness == "leftHand") {
            if (!this.hasSomethingInLeftHand())
                return "leftHand";
            else if (!this.hasSomethingInRightHand())
                return "rightHand";
        }
        else {
            if (!this.hasSomethingInRightHand())
                return "rightHand";
            else if (!this.hasSomethingInLeftHand())
                return "leftHand";
        }
        return undefined;
    }
    /**
     * Removes Entity in heldEntities["rightHand"]
     * NOTE: Directly modifies this.heldEntities
     * @return {this} This
     */
    removeEntityInRightHand() {
        this.heldEntities["rightHand"] = undefined;
        return this;
    }
    /**
     * Removes Entity in heldEntities["leftHand"]
     * NOTE: Directly modifies this.heldEntities
     * @return {this} This
     */
    removeEntityInLeftHand() {
        this.heldEntities["leftHand"] = undefined;
        return this;
    }

    clean() {
        this.bodyPartsSlickWithCum.clear();
        this.bodyPartsSlickWithPre.clear();
        this.cleanliness = 100;
        this.odorSex = 0;
        this.odorSweat = 0;
        return this;
    }

    setAge(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 9001)
            _int = 9001
        else
            Number.parseInt(_int);
        this.age = _int;

        if (this.age >= 18) {
            this.addAvailableAction("sex");
            this.addAvailableAction("masturbate");
        }
        else {
            this.removeAvailableAction("sex");
            this.removeAvailableAction("masturbate");
        }

        return this;
    }
    incAge(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setAge(this.age + Number.parseInt(_int));
    }
    addAge(_int) {
        return this.incAge(_int);
    }
    getAge() {
        return this.age;
    }

    setHunger(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.hungerMax)
            _int = this.hungerMax;
        this.hunger = _int;
        return this;
    }
    incHunger(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setHunger(this.hunger + Number.parseInt(_int));
    }
    addHunger(_int) {
        return this.incHunger(_int);
    }
    decHunger(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setHunger(this.hunger - Number.parseInt(_int));
    }
    subHunger(_int) {
        return this.decHunger(_int);
    }
    getHunger() {
        return this.hunger;
    }

    setStrength(_int) {
        if (isNaN(_int))
            return this.strength;
        else if (_int < 0)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        this.strength = _int;
        return this;
    }
    incStrength(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStrength(this.strength + Number.parseInt(_int));
    }
    addStrength(_int) {
        return this.incStrength(_int);
    }
    decStrength(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStrength(this.strength - Number.parseInt(_int));
    }
    subStrength(_int) {
        return this.decStrength(_int);
    }
    getStrength() {
        return this.strength;
    }
    setDexterity(_int) {
        if (isNaN(_int))
            return this.dexterity;
        else if (_int < 0)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        this.dexterity = _int;
        return this;
    }
    incDexterity(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setDexterity(this.dexterity + Number.parseInt(_int));
    }
    addDexterity(_int) {
        return this.incDexterity(_int);
    }
    decDexterity(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setDexterity(this.dexterity - Number.parseInt(_int));
    }
    subDexterity(_int) {
        return this.decDexterity(_int);
    }
    getDexterity() {
        return this.dexterity;
    }
    setConstitution(_int) {
        if (isNaN(_int))
            return this.constitution;
        else if (_int < 0)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        this.constitution = _int;
        return this;
    }
    incConstitution(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setConstitution(this.constitution + Number.parseInt(_int));
    }
    addConstitution(_int) {
        return this.incConstitution(_int);
    }
    decConstitution(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setConstitution(this.constitution - Number.parseInt(_int));
    }
    subConstitution(_int) {
        return this.decConstitution(_int);
    }
    getConsitution() {
        return this.constitution;
    }
    setIntelligence(_int) {
        if (isNaN(_int))
            return this.intelligence;
        else if (_int < 0)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        this.intelligence = _int;
        return this;
    }
    incIntelligence(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIntelligence(this.intelligence + Number.parseInt(_int));
    }
    addIntelligence(_int) {
        return this.incIntelligence(_int);
    }
    decIntelligence(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIntelligence(this.intelligence - Number.parseInt(_int));
    }
    subIntelligence(_int) {
        return this.decIntelligence(_int);
    }
    getIntelligence() {
        return this.intelligence;
    }
    setWisdom(_int) {
        if (isNaN(_int))
            return this.wisdom;
        else if (_int < 0)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        this.wisdom = _int;
        return this;
    }
    incWisdom(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setWisdom(this.wisdom + Number.parseInt(_int));
    }
    addWisdom(_int) {
        return this.incWisdom(_int);
    }
    decWisdom(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setWisdom(this.wisdom - Number.parseInt(_int));
    }
    subWisdom(_int) {
        return this.decWisdom(_int);
    }
    getWisdom() {
        return this.wisdom;
    }
    setCharisma(_int) {
        if (isNaN(_int))
            return this.charisma;
        else if (_int < 0)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        this.charisma = _int;
        return this;
    }
    incCharisma(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setCharisma(this.charisma + Number.parseInt(_int));
    }
    addCharisma(_int) {
        return this.incCharisma(_int);
    }
    decCharisma(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setCharisma(this.charisma - Number.parseInt(_int));
    }
    subCharisma(_int) {
        return this.decCharisma(_int);
    }
    getCharisma() {
        return this.charisma;
    }
    /**
     * Sets Character attributes
     * @param {Number} _str Strength, physical power
     * @param {Number} _dex Dexterity, agility
     * @param {Number} _con Constitution, endurance
     * @param {Number} _int Intelligence, reasoning and memory
     * @param {Number} _wis Wisdom, perception and insight
     * @param {Number} _cha Charisma, force of personality
     */
    setAttributes(_str = 10, _dex = 10, _con = 10, _int = 10, _wis = 12, _cha = 10) {
        this.setStrength(_str);
        this.setDexterity(_dex);
        this.setConstitution(_con);
        this.setIntelligence(_int);
        this.setWisdom(_wis);
        this.setCharisma(_cha);
        return this;
    }
    getAttributes() {
        return {strength: this.strength, dexterity: this.dexterity, constitution: this.constitution, intelligence: this.intelligence, wisdom: this.wisdom, charisma: this.charisma};
    }
    /**
     * Sets Character attribute
     * @param {String} _string Character attribute
     * @param {Number} _int    Number to set it to
     */
    setAttribute(_string, _int = undefined) {
        _int = Number.parseInt(_int);
        if (isNaN(_int))
            return;
        switch (_string.toLowerCase().slice(0, 2)) {
            case "st" :
                this.setStrength(_int);
                break;
            case "de" :
                this.setDexterity(_int);
                break;
            case "co" :
                this.setConstitution(_int);
                break;
            case "in" :
                this.setIntelligence(_int);
                break;
            case "wi" :
                this.setWisdom(_int);
                break;
            case "ch" :
                this.setCharisma(_int);
                break;
            default :
                return;
        }
        return this;
    }
    getAttribute(_string) {
        switch (_string.toLowerCase().slice(0, 2)) {
            case "st" :
                return this.getStrength();
                break;
            case "de" :
                return this.getDexterity();
                break;
            case "co" :
                return this.getConstitution();
                break;
            case "in" :
                return this.getIntelligence();
                break;
            case "wi" :
                return this.getWisdom();
                break;
            case "ch" :
                return this.getCharisma();
                break;
            default :
                return;
        }
    }
    setLevel(_int = 0) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > PSDE.kCharacterLevelMax)
            _int = PSDE.kCharacterLevelMax;
        this.experiencePoints = PSDE.calculateLevel(_int);
        return this;
    }

    setXP(_int = 0) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > PSDE.kCharacterXPMax)
            _int = PSDE.kCharacterXPMax;
        this.experiencePoints = _int;
        return this;
    }
    incXP(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setXP(this.experiencePoints + Number.parseInt(_int));
    }
    addXP(_int) {
        return this.incXP(_int);
    }
    decXP(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setXP(this.experiencePoints - Number.parseInt(_int));
    }
    subXP(_int) {
        return this.decXP(_int);
    }
    getXP() {
        return this.experiencePoints;
    }

    setLife(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.lifeMax)
            _int = this.lifeMax;
        this.life = _int;
        return this;
    }
    incLife(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLife(this.life + Number.parseInt(_int));
    }
    addLife(_int) {
        return this.incLife(_int);
    }
    decLife(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLife(this.life - Number.parseInt(_int));
    }
    subLife(_int) {
        return this.decLife(_int);
    }
    getLife() {
        return this.life;
    }

    setLifeMax(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        if (this.life > this.lifeMax)
            this.life = this._int;
        this.lifeMax = _int;
        return this;
    }
    incLifeMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLifeMax(this.lifeMax + Number.parseInt(_int));
    }
    addLifeMax(_int) {
        return this.incLifeMax(_int);
    }
    decLifeMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLifeMax(this.lifeMax - Number.parseInt(_int));
    }
    subLifeMax(_int) {
        return this.decLifeMax(_int);
    }
    getLifeMax() {
        return this.lifeMax;
    }

    setMana(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.manaMax)
            _int = this.manaMax;
        this.mana = _int;
        return this;
    }
    incMana(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMana(this.mana + Number.parseInt(_int));
    }
    addMana(_int) {
        return this.incMana(_int);
    }
    decMana(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMana(this.mana - Number.parseInt(_int));
    }
    subMana(_int) {
        return this.decMana(_int);
    }
    getMana() {
        return this.getMana;
    }

    setManaMax(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 100)
            _int = 100;
        if (this.mana > this.manaMax)
            this.mana = this._int;
        this.manaMax = _int;
        return this;
    }
    incManaMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setManaMax(this.manaMax + Number.parseInt(_int));
    }
    addManaMax(_int) {
        return this.incManaMax(_int);
    }
    decManaMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setManaMax(this.manaMax - Number.parseInt(_int));
    }
    subManaMax(_int) {
        return this.decManaMax(_int);
    }
    getManaMax() {
        return this.manaMax;
    }

    setManaCostOffsetPercent(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < -100)
            _int = -100;
        else if (_int > 100)
            _int = 100;
        this.manaCostOffsetPercent = _int;
        return this;
    }
    incManaCostOffsetPercent(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setManaCostOffsetPercent(this.manaCostOffsetPercent + Number.parseInt(_int));
    }
    addManaCostOffsetPercent(_int) {
        return this.incManaCostOffsetPercent(_int);
    }
    decManaCostOffsetPercent(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setManaCostOffsetPercent(this.manaCostOffsetPercent - Number.parseInt(_int));
    }
    subManaCostOffsetPercent(_int) {
        return this.decManaCostOffsetPercent(_int);
    }
    getManaCostOffsetPercent() {
        return this.manaCostOffsetPercent;
    }

    setStamina(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.staminaMax)
            _int = this.staminaMax;
        this.stamina = _int;
        return this;
    }
    incStamina(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStamina(this.stamina + Number.parseInt(_int));
    }
    addStamina(_int) {
        return this.incStamina(_int);
    }
    decStamina(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStamina(this.stamina - Number.parseInt(_int));
    }
    subStamina(_int) {
        return this.decStamina(_int);
    }
    getStamina() {
        return this.stamina;
    }

    setStaminaMax(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        if (this.stamina > this.staminaMax)
            this.stamina = this._int;
        this.staminaMax = _int;
        return this;
    }
    incStaminaMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStaminaMax(this.staminaMax + Number.parseInt(_int));
    }
    addStaminaMax(_int) {
        return this.incStaminaMax(_int);
    }
    decStaminaMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStaminaMax(this.staminaMax - Number.parseInt(_int));
    }
    subStaminaMax(_int) {
        return this.decStaminaMax(_int);
    }
    getStaminaMax() {
        return this.getStaminaMax;
    }

    setMoney(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.money = _int;
        return this;
    }
    incMoney(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMoney(this.money + Number.parseInt(_int));
    }
    addMoney(_int) {
        return this.incMoney(_int);
    }
    decMoney(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMoney(this.money - Number.parseInt(_int));
    }
    subMoney(_int) {
        return this.decMoney(_int);
    }
    getMoney() {
        return this.money;
    }

    setSanity(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.sanityMax)
            _int = this.sanityMax;
        this.sanity = _int;
        return this;
    }
    incSanity(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSanity(this.sanity + Number.parseInt(_int));
    }
    addSanity(_int) {
        return this.incSanity(_int);
    }
    decSanity(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSanity(this.sanity - Number.parseInt(_int));
    }
    subSanity(_int) {
        return this.decSanity(_int);
    }
    getSanity() {
        return this.sanity;
    }

    setPhilautia(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.philautia = _int;
        return this;
    }
    incPhilautia(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setPhilautia(this.philautia + Number.parseInt(_int));
    }
    addPhilautia(_int) {
        return this.incPhilautia(_int);
    }
    decPhilautia(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setPhilautia(this.philautia - Number.parseInt(_int));
    }
    subPhilautia(_int) {
        return this.decPhilautia(_int);
    }
    getPhilautia() {
        return this.philautia;
    }

    setAgape(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.agape = _int;
        return this;
    }
    incAgape(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setAgape(this.agape + Number.parseInt(_int));
    }
    addAgape(_int) {
        return this.incAgape(_int);
    }
    decAgape(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setAgape(this.agape - Number.parseInt(_int));
    }
    subAgape(_int) {
        return this.decAgape(_int);
    }
    getAgape() {
        return this.agape;
    }

    setSanguine(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.sanguine = _int;
        return this;
    }
    incSanguine(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSanguine(this.sanguine + Number.parseInt(_int));
    }
    addSanguine(_int) {
        return this.incSanguine(_int);
    }
    decSanguine(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSanguine(this.sanguine - Number.parseInt(_int));
    }
    subSanguine(_int) {
        return this.decSanguine(_int);
    }
    getSanguine() {
        return this.sanguine;
    }

    setPhlegmatic(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.phlegmatic = _int;
        return this;
    }
    incPhlegmatic(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setPhlegmatic(this.phlegmatic + Number.parseInt(_int));
    }
    addPhlegmatic(_int) {
        return this.incPhlegmatic(_int);
    }
    decPhlegmatic(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setPhlegmatic(this.phlegmatic - Number.parseInt(_int));
    }
    subPhlegmatic(_int) {
        return this.decPhlegmatic(_int);
    }
    getPhlegmatic() {
        return this.phlegmatic;
    }

    setCholeric(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.choleric = _int;
        return this;
    }
    incCholeric(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setCholeric(this.choleric + Number.parseInt(_int));
    }
    addCholeric(_int) {
        return this.incCholeric(_int);
    }
    decCholeric(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setCholeric(this.choleric - Number.parseInt(_int));
    }
    subCholeric(_int) {
        return this.decCholeric(_int);
    }
    getCholeric() {
        return this.choleric;
    }

    setMelancholic(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.melancholic = _int;
        return this;
    }
    incMelancholic(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMelancholic(this.melancholic + Number.parseInt(_int));
    }
    addMelancholic(_int) {
        return this.incMelancholic(_int);
    }
    decMelancholic(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMelancholic(this.melancholic - Number.parseInt(_int));
    }
    subMelancholic(_int) {
        return this.decMelancholic(_int);
    }
    getMelancholic() {
        return this.melancholic;
    }

    setLust(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 100)
            _int = 100;
        this.lust = _int;
        return this;
    }
    incLust(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLust(this.lust + Number.parseInt(_int));
    }
    addLust(_int) {
        return this.incLust(_int);
    }
    decLust(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLust(this.lust - Number.parseInt(_int));
    }
    subLust(_int) {
        return this.decLust(_int);
    }
    getLust() {
        return this.lust;
    }

    setExhibitionism(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 100)
            _int = 100;
        this.exhibitionism = _int;
        return this;
    }
    incExhibitionism(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setExhibitionism(this.exhibitionism + Number.parseInt(_int));
    }
    addExhibitionism(_int) {
        return this.incExhibitionism(_int);
    }
    decExhibitionism(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setExhibitionism(this.exhibitionism - Number.parseInt(_int));
    }
    subExhibitionism(_int) {
        return this.decExhibitionism(_int);
    }
    getExhibitionism() {
        return this.exhibitionlism;
    }

    setSomnophilia(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 100)
            _int = 100;
        this.somnophilia = _int;
        return this;
    }
    incSomnophilia(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSomnophilia(this.somnophilia + Number.parseInt(_int));
    }
    addSomnophilia(_int) {
        return this.incSomnophilia(_int);
    }
    decSomnophilia(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSomnophilia(this.somnophilia - Number.parseInt(_int));
    }
    subSomnophilia(_int) {
        return this.decSomnophilia(_int);
    }
    getSomnophilia() {
        return this.somnophilia;
    }

    setIntoxication(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 100)
            _int = 100;
        this.intoxication = _int;
        return this;
    }
    incIntoxication(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIntoxication(this.intoxication + Number.parseInt(_int));
    }
    addIntoxication(_int) {
        return this.incIntoxication(_int);
    }
    decIntoxication(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIntoxication(this.intoxication - Number.parseInt(_int));
    }
    subIntoxication(_int) {
        return this.decIntoxication(_int);
    }
    getIntoxication() {
        return this.intoxication;
    }

    setIncestual(_int) {
        _int = Number.parseInt(_int);
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 100)
            _int = 100;
        this.incestual = _int;
        return this;
    }
    incIncestual(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIncestual(this.incestual + Number.parseInt(_int));
    }
    addIncestual(_int) {
        return this.incIncestual(_int);
    }
    decIncestual(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIncestual(this.incestual - Number.parseInt(_int));
    }
    subIncestual(_int) {
        return this.decIncestual(_int);
    }
    getIncestual() {
        return this.incestual;
    }

    setRut(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.rut = _bool;
        return this;
    }
    enableRut() {
        this.rut = true;
        return this;
    }
    disableRut() {
        this.rut = false;
        return this;
    }
    toggleRut() {
        this.rut = !this.rut;
        return this;
    }
    getRut() {
        return this.rut;
    }

    setSleep(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true") {
            this.sleep();
            _bool = true;
        }
        else {
            this.wake();
            _bool = false;
        }
        return this;
    }
    getSleep() {
        return this.hasCurrentAction("sleep");
    }

    setLiving(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.living = _bool;
        return this;
    }
    getLiving() {
        return this.living;
    }

    setVirgin(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.virgin = _bool;
        return this;
    }
    getVirgin() {
        return this.virgin;
    }

    setPrefersPredators(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.prefersPredators = _bool;
        return this;
    }
    getPrefersPredators() {
        return this.prefersPredators;
    }

    setAvoidsPredators(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.avoidsPredators = _bool;
        return this;
    }
    getAvoidsPredators() {
        return this.avoidsPredators;
    }

    setPrefersPrey(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.prefersPrey = _bool;
        return this;
    }
    getPrefersPrey() {
        return this.prefersPrey;
    }

    setAvoidsPrey(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.avoidsPrey = _bool;
        return this;
    }
    getAvoidsPrey() {
        return this.avoidsPrey;
    }

    addBodyPartSlickWithPre(_bodyPart) {
        if (this.hasBodyPart(_bodyPart)) {
            this.bodyPartsSlickWithPre.add(_bodyPart);
        }
        return this;
    }
    removeBodyPartSlickWithPre(_bodyPart) {
        if (this.hasBodyPart(_bodyPart)) {
            this.bodyPartsSlickWithPre.delete(_bodyPart);
        }
        return this;
    }
    hasBodyPartSlickWithPre(_bodyPart) {
        return this.bodyPartsSlickWithPre.has(_bodyPart);
    }
    getBodyPartsSlickWithPre() {
        return this.bodyPartsSlickWithPre;
    }
    addBodyPartSlickWithCum(_bodyPart) {
        if (this.hasBodyPart(_bodyPart)) {
            this.bodyPartsSlickWithCum.add(_bodyPart);
        }
        return this;
    }
    removeBodyPartSlickWithCum(_bodyPart) {
        if (this.hasBodyPart(_bodyPart)) {
            this.bodyPartsSlickWithCum.delete(_bodyPart);
        }
        return this;
    }
    hasBodyPartSlickWithCum(_bodyPart) {
        return this.bodyPartsSlickWithCum.has(_bodyPart);
    }
    getBodyPartsSlickWithCum() {
        return this.bodyPartsSlickWithCum;
    }

    setSexualOrientation(_int) {
        if (isNaN(_int)) {
            switch (_int.slice(0, 1)) {
                case "s" : {
                    _int = 0;
                    break;
                }
                case "g" : {
                    _int = 1;
                    break;
                }
                case "b" : {
                    _int = 2;
                    break;
                }
                default : {
                    _int = 0;
                }
            }
        }
        else if (_int >= 0 && _int < 4) {
            _int = Number.parseInt(_int);
        }
        else
            _int = 0;
        this.sexualOrientation = _int;
        return this;
    }
    getSexualOrientation() {
        return this.sexualOrientation == 0 ? "straight" : (this.sexualOrientation == 1 ? "gay" : "bi");
    }

    setSex(_sex) {
        if (isNaN(_sex)) {
            switch (_sex.slice(0, 1)) {
                case "m" : {
                    _sex = 0;
                    break;
                }
                case "f" : {
                    _sex = 1;
                    break;
                }
                case "h" : {
                    _sex = 2;
                    break;
                }
            }
        }
        else if (_sex >= 0 && _sex < 4) {
            _sex = Number.parseInt(_sex);
        }
        else
            _sex = 0;
        this._sex = _sex;
        return this;
    }
    getSexName() {
        return this.getSex() == PSDE.kMale ? "male" : (this.getSex() == PSDE.kFemale ? "female" : "herm");
    }
    getSex() {
        return this._sex;
    }

    setGender(_gender) {
        if (isNaN(_gender)) {
            switch (_gender.slice(0, 1)) {
                case "m" : {
                    _gender = 0;
                    break;
                }
                case "f" : {
                    _gender = 1;
                    break;
                }
                case "h" : {
                    _gender = 2;
                    break;
                }
            }
        }
        else if (_gender >= 0 && _gender < 4) {
            _gender = Number.parseInt(_gender);
        }
        else
            _gender = 0;
        this.gender = _gender;
        return this;
    }
    getGenderName() {
        return this.gender == 0 ? "male" : (this.gender == 1 ? "female" : "herm");
    }
    getGender() {
        return this.gender;
    }

    getSexualOrientationCompatibility(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        if (this.sexualOrientation == 2) // If you're bi
            return true;
        else if (this.getSex() != _character.getSex() && this.sexualOrientation == 0) // else if you're both opposite sex, and you're straight
            return true;
        else if (this.getSex() == _character.getSex() && this.sexualOrientation == 1) // else if you're both same sex, and you're gay
            return true;
        else // else no
            return false;
    }
    getSexualCompatibility(_character) {
        return this.sexualOrientationCompatibility(_character);
    }

    setDefaultDisposition(_passion = 0, _friendship = 0, _playfulness = 0, _soulmate = 0, _familial = 0, _obsession = 0, _hate = 0) {
        if (!(this.defaultDisposition instanceof Object))
            this.defaultDisposition = {passion:0,friendship:0,playfulness:0,soulmate:0,familial:0,obsession:0,hate:0};
        else if (_passion instanceof Object) {
            this.defaultDisposition = {
                passion:(Number.parseInt(_passion.passion) || 0),
                friendship:(Number.parseInt(_passion.friendship) || 0),
                playfulness:(Number.parseInt(_passion.playfulness) || 0),
                soulmate:(Number.parseInt(_passion.soulmate) || 0),
                familial:(Number.parseInt(_passion.familial) || 0),
                obsession:(Number.parseInt(_passion.obsession) || 0),
                hate:(Number.parseInt(_passion.hate) || 0)
            };
        }
        else if (isNaN(_passion) && this.defaultDisposition.hasOwnProperty(_passion) && typeof Number.parseInt(_friendship) == "number")
            this.defaultDisposition[_passion] = Number.parseInt(_friendship);
        else {
            this.defaultDisposition = {
                passion:(Number.parseInt(_passion) || this.defaultDisposition.passion),
                friendship:(Number.parseInt(_friendship) || this.defaultDisposition.friendship),
                playfulness:(Number.parseInt(_playfulness) || this.defaultDisposition.playfulness),
                soulmate:(Number.parseInt(_soulmate) || this.defaultDisposition.soulmate),
                familial:(Number.parseInt(_familial) || this.defaultDisposition.familial),
                obsession:(Number.parseInt(_obsession) || this.defaultDisposition.obsession),
                hate:(Number.parseInt(_hate) || this.defaultDisposition.hate)
            };
        }

        return this;
    }
    setCharacterDisposition(_character, _passion = undefined, _friendship = undefined, _playfulness = undefined, _soulmate = undefined, _familial = undefined, _obsession = undefined, _hate = undefined) {
        if (PSDE.enableDebug) console.log("Running setCharacterDisposition");

        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        if (_passion instanceof Object) {
            this.characterDisposition.set(_character, {
                passion:(Number.parseInt(_passion.passion) || 0),
                friendship:(Number.parseInt(_passion.friendship) || 0),
                playfulness:(Number.parseInt(_passion.playfulness) || 0),
                soulmate:(Number.parseInt(_passion.soulmate) || 0),
                familial:(Number.parseInt(_passion.familial) || 0),
                obsession:(Number.parseInt(_passion.obsession) || 0),
                hate:(Number.parseInt(_passion.hate) || 0)
            });
        }
        else if (isNaN(_passion) && this.defaultDisposition.hasOwnProperty(_passion) && !isNaN(Number.parseInt(_friendship)))
            this.characterDisposition.get(_character)[_passion] = Number.parseInt(_friendship);
        else {
            this.characterDisposition.set(_character, {
                passion:(Number.parseInt(_passion) || this.defaultDisposition.passion),
                friendship:(Number.parseInt(_friendship) || this.defaultDisposition.friendship),
                playfulness:(Number.parseInt(_playfulness) || this.defaultDisposition.playfulness),
                soulmate:(Number.parseInt(_soulmate) || this.defaultDisposition.soulmate),
                familial:(Number.parseInt(_familial) || this.defaultDisposition.familial),
                obsession:(Number.parseInt(_obsession) || this.defaultDisposition.obsession),
                hate:(Number.parseInt(_hate) || this.defaultDisposition.hate)
            });
        }

        return this;
    }
    setCharacterPassion(_character, _int) {
        return this.setCharacterDisposition(_character, "passion", _int);
    }
    addCharacterPassion(_character, _int) {
        return this.incCharacterPassion(_character, _int);
    }
    incCharacterPassion(_character, _int = 1) {
        return this.setCharacterPassion(_character, this.getCharacterDisposition(_character)["passion"] + Number.parseInt(_int));
    }
    getCharacterPassion(_character) {
        return this.getCharacterDisposition(_character, "passion");
    }
    setCharacterFriendship(_character, _int) {
        return this.setCharacterDisposition(_character, "friendship", _int);
    }
    addCharacterFriendship(_character, _int) {
        return this.incCharacterFriendship(_character, _int);
    }
    incCharacterFriendship(_character, _int = 1) {
        return this.setCharacterFriendship(_character, this.getCharacterDisposition(_character)["friendship"] + Number.parseInt(_int));
    }
    getCharacterFriendship(_character) {
        return this.getCharacterDisposition(_character, "friendship");
    }
    setCharacterPlayfulness(_character, _int) {
        return this.setCharacterDisposition(_character, "playfulness", _int);
    }
    addCharacterPlayfulness(_character, _int) {
        return this.incCharacterPlayfulness(_character, _int);
    }
    incCharacterPlayfulness(_character, _int = 1) {
        return this.setCharacterPlayfulness(_character, this.getCharacterDisposition(_character)["playfulness"] + Number.parseInt(_int));
    }
    getCharacterPlayfulness(_character) {
        return this.getCharacterDisposition(_character, "playfulness");
    }
    setCharacterSoulmate(_character, _int) {
        return this.setCharacterDisposition(_character, "soulmate", _int);
    }
    addCharacterSoulmate(_character, _int) {
        return this.incCharacterSoulmate(_character, _int);
    }
    incCharacterSoulmate(_character, _int = 1) {
        return this.setCharacterSoulmate(_character, this.getCharacterDisposition(_character)["soulmate"] + Number.parseInt(_int));
    }
    getCharacterSoulmate(_character) {
        return this.getCharacterDisposition(_character, "soulmate");
    }
    setCharacterFamilial(_character, _int) {
        return this.setCharacterDisposition(_character, "familial", _int);
    }
    addCharacterFamilial(_character, _int) {
        return this.incCharacterFamilial(_character, _int);
    }
    incCharacterFamilial(_character, _int = 1) {
        return this.setCharacterFamilial(_character, this.getCharacterDisposition(_character)["familial"] + Number.parseInt(_int));
    }
    getCharacterFamilial(_character) {
        return this.getCharacterDisposition(_character, "familial");
    }
    setCharacterObsession(_character, _int) {
        return this.setCharacterDisposition(_character, "obsession", _int);
    }
    addCharacterObsession(_character, _int) {
        return this.incCharacterObsession(_character, _int);
    }
    incCharacterObsession(_character, _int = 1) {
        return this.setCharacterObsession(_character, this.getCharacterDisposition(_character)["obsession"] + Number.parseInt(_int));
    }
    getCharacterObsession(_character) {
        return this.getCharacterDisposition(_character, "obsession");
    }
    setCharacterHate(_character, _int) {
        return this.setCharacterDisposition(_character, "hate", _int);
    }
    addCharacterHate(_character, _int) {
        return this.incCharacterHate(_character, _int);
    }
    incCharacterHate(_character, _int = 1) {
        return this.setCharacterHate(_character, this.getCharacterDisposition(_character)["hate"] + Number.parseInt(_int));
    }
    getCharacterHate(_character) {
        return this.getCharacterDisposition(_character, "hate");
    }
    getCharacterDisposition(_character, _dispositionType = undefined) {
        if (PSDE.enableDebug) console.log("Running getCharacterDisposition");

        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        if (this.characterDisposition.has(_character)) {
            if (this.characterDisposition.get(_character).hasOwnProperty(_dispositionType))
                return this.characterDisposition.get(_character)[_dispositionType];
            else
                return this.characterDisposition.get(_character);
        }
        else
            return false;
    }
    hasCharacterDisposition(_character) {
        if (PSDE.enableDebug) console.log("Running hasCharacterDisposition");
        
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;
        
        return this.characterDisposition.has(_character);
    }
    getCharacterDispositions() {
        return this.characterDisposition;
    }
    hasMet(_character) {
        return this.hasCharacterDisposition(_character);
    }
    incCharacterAllDispositions(_character, _int) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        if (isNaN(_int)) {
            _int = Number.parseInt(_int);
            if (_isNaN(_int))
                return undefined;
        }
        if (!this.hasCharacterDisposition(_character))
            this.setCharacterDisposition(_character);
        var _disposition = this.getCharacterDisposition(_character);
        this.setCharacterDisposition(_character, _disposition.passion + _int, _disposition.friendship + _int, _disposition.playfulness + _int, _disposition.soulmate + _int, _disposition.familial + _int, _disposition.obsession + _int, _disposition.hate - Number.parseInt(_int));
        return this;
    }
    decCharacterAllDispositions(_character, _int) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        if (isNaN(_int)) {
            _int = Number.parseInt(_int);
            if (_isNaN(_int))
                return undefined;
        }
        if (!this.hasCharacterDisposition(_character))
            this.setCharacterDisposition(_character);
        var _disposition = this.getCharacterDisposition(_character);
        this.setCharacterDisposition(_character, _disposition.passion - _int, _disposition.friendship - _int, _disposition.playfulness - _int, _disposition.soulmate - _int, _disposition.familial - _int, _disposition.obsession - _int, _disposition.hate + Number.parseInt(_int));
        return this;
    }

    addDating(_character, _updateParent = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        this._dating.add(_character);
        if (_updateParent)
            _character.addDating(this, false);
        return this;
    }
    dateCharacter(_character, _updateParent = true) {
        return this.addDating(_character, _updateParent);
    }
    addDated(_character, _int = 1, _updateParent = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        if (typeof _int === "boolean") {
            _updateParent = _int;
            if (this._dated.has(_character))
                _int = this._dated.get(_character) + 1;
            else
                _int = 1;
        }
        else if (typeof _int === "undefined") {
            _updateParent = true;
            if (this._dated.has(_character))
                _int = this._dated.get(_character) + 1;
            else
                _int = 1;
        }
        else {
            _int = Number.parseInt(_int);
            if (isNaN(_int) || _int < 0)
                _int = 0;
        }

        this._dated.set(_character, _int);
        if (_updateParent)
            _character.addDated(this, _int, false);
        return this;
    }
    datedCharacter(_character, _int = 0, _updateParent = true) {
        return this.addDated(_character, _int, _updateParent);
    }
    isDatingCharacter(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }

        return this._dating.has(_character);
    }
    isDating(_character) {
        return this.isDatingCharacter(_character);
    }
    hasDatedCharacter(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }

        return this._dated.has(_character);
    }
    hasDated(_character) {
        return this.hasDatedCharacter(_character);
    }
    getCurrentDates() {
        return this._dating;
    }
    getPreviousDates() {
        return this._dated;
    }
    getNumberOfDates(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }

        if (this.hasDatedCharacter(_character))
            return this._dated.get(_character);
        else
            return 0;
    }
    deleteDating(_character, _updateParent) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }

        if (this.isDating(_character)) {
            this._dating.delete(_character);
            this.hasDatedCharacter(_character);
        }
        if (_updateParent)
            _character.deleteDating(this, false);
        return this;
    }
    dumpCharacter(_character, _updateParent = true) {
        return this.deleteDating(_character, _updateParent);
    }
    deleteDated(_character, _updateParent) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }

        if (this.hasDated(_character))
            this._dated.delete(_character);
        if (_updateParent)
            _character.deleteDated(this, false);
        return this;
    }

    hasColouration() {
        return typeof this.furColourA != 'undefined';
    }

    hasBreasts() {
        return this.breastSize > 0;
    }

    hasVagina() {
        return this.vaginaSize > 0;
    }

    hasPenis() {
        return this.penisSize > 0;
    }

    hasPublicHair() {
        return this.pubicHairSize > 0;
    }

    hasHat() {
        return this.clothing["hat"] instanceof ItemInstance && this.clothing["hat"].parent instanceof Item;
    }
    getHat() {
        return this.clothing["hat"].parent;
    }

    hasShirt() {
        return this.clothing["shirt"] instanceof ItemInstance && this.clothing["shirt"].parent instanceof Item;
    }
    getShirt() {
        return this.clothing["shirt"].parent;
    }

    hasJacket() {
        return this.clothing["jacket"] instanceof ItemInstance && this.clothing["jacket"].parent instanceof Item;
    }
    getJacket() {
        return this.clothing["jacket"].parent;
    }

    hasNeckwear() {
        return this.clothing["neckwear"] instanceof ItemInstance && this.clothing["neckwear"].parent instanceof Item;
    }
    getNeckwear() {
        return this.clothing["neckwear"].parent;
    }

    hasBra() {
        return this.clothing["bra"] instanceof ItemInstance && this.clothing["bra"].parent instanceof Item;
    }
    getBra() {
        return this.clothing["bra"].parent;
    }

    hasBelt() {
        return this.clothing["belt"] instanceof ItemInstance && this.clothing["belt"].parent instanceof Item;
    }
    getBelt() {
        return this.clothing["belt"].parent;
    }

    hasUnderwear() {
        return this.clothing["underwear"] instanceof ItemInstance && this.clothing["underwear"].parent instanceof Item;
    }
    getUnderwear() {
        return this.clothing["underwear"].parent;
    }

    hasPants() {
        return this.clothing["pants"] instanceof ItemInstance && this.clothing["pants"].parent instanceof Item;
    }
    getPants() {
        return this.clothing["pants"].parent;
    }
    
    hasShoes() {
        return this.clothing["shoe"] instanceof ItemInstance && this.clothing["shoe"].parent instanceof Item;
    }
    getShoes() {
        return this.clothing["shoes"].parent;
    }
    getClothing(_type) {
        if (PSDE.kClothingTypes.has(_type))
            return this.clothing[_clothing.type];
        else
            return this.clothing;
    }
    setClothing(_itemInstance, _type = undefined) {
        if (!(_itemInstance instanceof ItemInstance) && _itemInstance !== undefined) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else if (_itemInstance instanceof Clothing)
                _itemInstance = new ItemInstance(undefined, _itemInstance);
            else if (PSDE.clothing.has(_itemInstance))
                _itemInstance = new ItemInstance(undefined, PSDE.clothing.get(_itemInstance));
            else
                return this;
        }

        if (!(this.containsItem(_itemInstance, true)))
            this.addItem(_itemInstance);

        if (_itemInstance instanceof ItemInstance && PSDE.kClothingTypes.has(_itemInstance.parent.type))
            this.clothing[PSDE.kClothingTypes.has(_type) ? _type : _itemInstance.parent.type] = _itemInstance;
        else if (PSDE.kClothingTypes.has(_type))
            this.clothing[_type] = undefined;
        return this;
    }
    addClothing(_itemInstance, _type) {
        return this.setClothing(_itemInstance, _type);
    }
    removeClothing(_itemInstance, _type = undefined) {
        if (typeof _itemInstance == "string" && PSDE.kClothingTypes.has(_itemInstance)) {
            this.clothing[_itemInstance] = undefined;
            return this;
        }
        else if (PSDE.kClothingTypes.has(_type)) {
            this.clothing[_type] = undefined;
            return this;
        }
        if (!(_itemInstance instanceof ItemInstance) && _itemInstance !== undefined) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else if (_itemInstance instanceof Clothing)
                _itemInstance = new ItemInstance(undefined, _itemInstance);
            else if (PSDE.clothing.has(_itemInstance))
                _itemInstance = new ItemInstance(undefined, PSDE.clothing.get(_itemInstance));
            else
                return this;
        }

        this.clothing[_itemInstance.parent.type] = undefined;
        return this;
    }

    addCurrentAction(_actionType, _entity = undefined) {
        if (!PSDE.kActionTypes.has(_actionType))
            return undefined;
        if (!(_entity instanceof Entity) && !(_entity instanceof EntityInstance))
            _entity = PSDE.entities.has(_entity) ? PSDE.entities.get(_entity) : undefined;

        this.currentActions[_actionType] = _entity;
        return this;
    }
    removeCurrentAction(_actionType, _entity = undefined) {
        if (!PSDE.kActionTypes.has(_actionType))
            return undefined;
        if (!(_entity instanceof Entity) && !(_entity instanceof EntityInstance))
            _entity = PSDE.entities.has(_entity) ? PSDE.entities.get(_entity) : undefined;

        delete this.currentActions[_actionType];
        return this;
    }
    hasCurrentAction(_actionType) {
        if (!PSDE.kActionTypes.has(_actionType))
            return undefined;
        return this.hasCurrentActionOwnProperty(_actionType);
    }
    getCurrentActions() {
        return this.currentActions;
    }
    getCurrentAction(_actionType) {
        if (!PSDE.kActionTypes.has(_actionType))
            return undefined;
        else if (!this.hasCurrentAction(_actionType))
            return undefined;
        else
            return this.currentActions[_actionType];
    }
    hasCurrentAction(_actionType) {
        return this.currentActions.hasOwnProperty(_actionType);
    }
    getStance() {
        if (this.hasCurrentAction("lay"))
            return "lay";
        else if (this.hasCurrentAction("sit"))
            return "sit";
        else if (this.hasCurrentAction("stand"))
            return "stand";
        else if (this.hasCurrentAction("kneel"))
            return "kneel";
    }
    getStancePresentTense() {
        if (this.isLying())
            return "lying";
        else if (this.isSitting())
            return "sitting";
        else if (this.isStanding())
            return "standing";
        else if (this.isKneeling())
            return "kneeling";
    }
    getStancePresentParticiple() {
        return this.positionPresentTense();
    }
    hasStance(_actionType) {
        if (PSDE.kIntraactionTypes.has(_actionType))
            return this.hasCurrentAction(_actionType);
        else
            return false;
    }

    /**
     * Have anal sex with _entity
     * @param  {Entity} _entity [description]
     * @return {Boolean}         [description]
     */
    anal(_entity) {
        if (!(_entity instanceof Character)) {
            if (PSDE.characters.has(_entity))
                _entity = PSDE.getCharacterByID(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity;
            else if (PSDE.entityInstances.has(_entity))
                _entity = PSDE.entityInstances.get(_entity);
            else
                return undefined;
        }
        this.fuck(_entity);
        if (_entity instanceof Character) {
            if (_entity.hasBodyPart("penis")) {
                this.addCurrentAction("sex", _entity.getBodyPart("penis"));
                _entity.addCurrentAction("sex", this.getBodyPart("anus"));
                this.incAnalReceiveCount();
                _entity.incAnalGiveCount();
            }
            else if (_entity.hasBodyPart("vagina") && _entity.hasStrapon()) {
                this.addCurrentAction("sex", _entity.getStrapon());
                _entity.addCurrentAction("sex", this.getBodyPart("anus"));
                this.incAnalReceiveCount();
                _entity.incAnalGiveCount();
            }
            else
                return false;
        }
        else if (_entity instanceof BodyPartInstance) {
            this.addCurrentAction("sex", _entity);
            _entity.owner.addCurrentAction("sex", this.getBodyPart("anus"));
            if (_entity.type == "penis") {
                this.incAnalReceiveCount();
                _entity.owner.incAnalGiveCount();
            }
            else
                return false;
        }
        else if (_entity instanceof ItemInstance) {
            this.addCurrentAction("sex", _entity);
            this.incAnalReceiveCount();
        }
        else
            return false;
        return true;
    }
    attack(_entity) {
        if (!(_entity instanceof Entity)) {
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (PSDE.instances.has(_entity))
                _entity = PSDE.instances.get(_entity).parent;
            else
                return undefined;
        }

        this.addCurrentAction("attack", _entity);
        return true;
    }
    charmed(_character, _cron = "4m") {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        this.addCurrentAction("charmed", _character);
        new GameEvent("{0}CharmedRemove".format(this.id), "charmed", _character, this, undefined, undefined, undefined, undefined, _cron, "{0}.removeCurrentAction('charmed')".format(this.id), true);
        return true;
    }
    consume(_entityInstance) {
        if (!(_entityInstance instanceof EntityInstance)) {
            if (PSDE.instances.has(_entityInstance))
                _entityInstance = PSDE.instances.get(_entityInstance);
            else
                return undefined;
        }

        if (this.triggerActionEvent("consume", _itemInstance.parent)) {
            this.addCurrentAction("consume", _entityInstance);
            this.items.splice(this.items.indexOf(_itemInstance), 1);
            PSDE.setTimedFunctionEvent(
                "{0}Consume{1}{2}".format(this.id, _entityInstance.parent.id, PSDE.roll("1d4")),
                "PSDE.getCharacterByID('{0}').removeCurrentAction('consume', _entityInstance)".format(this.id),
                "2m",
                true
            );
            return true;
        }
        else
            return false;
        return true;
    }
    /**
     * Alias for removeClothing
     * @param  {ItemInstance} _itemInstance Item Instance
     * @return {[type]}               [description]
     */
    disrobe(_itemInstance) {
        return this.removeClothing(_itemInstance);
    }
    /**
     * Have sex with )entity
     * @param  {Entity}  _entity      [description]
     * @param  {Boolean} _updateChild [description]
     * @return {Boolean}               [description]
     */
    fuck(_entity = undefined, _updateChild = true) {
        if (!(_entity instanceof Character)) {
            if (PSDE.characters.has(_entity))
                _entity = PSDE.getCharacterByID(_entity);
            else
                return undefined;
        }

        if (_entity.getSex() == PSDE.kFemale)
            this.hadSexWithFemale = true;
        else if (_entity.getSex() == PSDE.kMale)
            this.hadSexWithMale = true;

        this.removeCurrentAction("masturbate");
        this.addCurrentAction("sex");

        this.incSexCount();

        if (_updateChild)
            _entity.fuck(this, false);

        return true;
    }
    follow(_character, _preGeneratedPath = undefined, _updateChild = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character)
            else
                return undefined;
        }
        if (PSDE.characterPathes.has(_character))
            this.walk();
        else
            this.stand();

        if (_character.following == this) {
            this.removeFollower(_character);
            _character.following = undefiend;
        }

        this.following = _character;
        this.addCurrentAction("follow", _character);

        var _path = PSDE._findPathToRoom(PSDE.getCharacterCurrentRoom(this), PSDE.getCharacterCurrentRoom(_character));
        PSDE.characterPathes.set(this, _path);

        if (this.hasFollowers()) {
            this.followers.forEach(function(_follower) {
                if (_follower instanceof Character) {
                    if (!(PSDE.getCharacterCurrentRoom(_follower) == PSDE.getCharacterCurrentRoom(this)))
                        _follower.follow(_character, PSDE._findPathToRoom(PSDE.getCharacterCurrentRoom(_follower), PSDE.getCharacterCurrentRoom(_character)));
                    else
                        _follower.follow(_character, _path);
                }
            }, this);
            this.followers.clear();
        }
        if (_updateChild) {
            _character.addFollower(this, false);
        }
        return true;
    }
    hold(_entityInstance, _hand = undefined) {
        return this.addHeldEntity(_entityInstance, _hand);
    }
    hug(_entity) {
        if (!(_entity instanceof Entity)) {
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (PSDE.instances.has(_entity))
                _entity = PSDE.instances.get(_entity).parent;
            else
                return undefined;
        }

        this.addCurrentAction("hug", _entity);
        return true;
    }
    kiss(_entity, _bodyPart = undefined) {
        if (!(_entity instanceof Entity)) {
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (PSDE.instances.has(_entity))
                _entity = PSDE.instances.get(_entity).parent;
            else
                return undefined;
        }

        this.addCurrentAction("kiss", _entity, _bodyPart);
        return true;
    }
    kneel(_entity) {
        if (!(_entity instanceof Entity)) {
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (PSDE.instances.has(_entity))
                _entity = PSDE.instances.get(_entity).parent;
            else
                return undefined;
        }

        this.removeCurrentAction("lay");
        this.removeCurrentAction("sit");
        this.removeCurrentAction("stand");
        this.removeCurrentAction("walk");

        this.addCurrentAction("kneel", _entity);
        return true;
    }
    lay(_furniture = undefined, _dontOverride = []) {
        if (!(_furniture instanceof Furniture))
            _furniture = PSDE.furniture.has(_furniture) ? PSDE.furniture.get(_furniture) : undefined;
        if (typeof _dontOverride == "undefined")
            _dontOverride = [];
        else if (_dontOverride instanceof Set)
            _dontOverride = Array.from(_dontOverride);

        this.removeCurrentAction("sit");
        if (_dontOverride.contains("sleep")) this.removeCurrentAction("sleep");
        this.removeCurrentAction("stand");
        this.removeCurrentAction("walk");
        if (_dontOverride.contains("masturbate")) this.removeCurrentAction("masturbate");
        if (_dontOverride.contains("sex")) this.removeCurrentAction("sex");

        this.addCurrentAction("lay", _furniture);

        if (_furniture instanceof Furniture)
            this.furniture = _furniture;
        return true;
    }
    look(_entity) {
        if (!(_entity instanceof Entity)) {
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (PSDE.instances.has(_entity))
                _entity = PSDE.instances.get(_entity).parent;
            else
                return undefined;
        }

        this.addCurrentAction("look", _entity);
        return true;
    }
    /**
     * Masturbate
     * @param  {Array}  _dontOverride Current actions to not override
     * @return {Boolean}               [description]
     */
    masturbate(_dontOverride = []) {
        if (typeof _dontOverride == "array") {}
        else if (typeof _dontOverride == "undefined")
            _dontOverride = [];
        else if (_dontOverride instanceof Set)
            _dontOverride = Array.from(_dontOverride);
        else
            _dontOverride = [];

        if (_dontOverride.contains("sleep")) this.removeCurrentAction("sleep");
        if (_dontOverride.contains("walk")) this.removeCurrentAction("walk");
        if (_dontOverride.contains("sex")) this.removeCurrentAction("sex");

        if (this.getSex() == PSDE.kMale) {
            this.addHeldEntity(this.getBodyPart("penis"));
            this.addCurrentAction("masturbate", this.getBodyPart("penis"));
        }
        else if (this.getSex() == PSDE.kFemale) {
            this.addHeldEntity(this.getBodyPart("vagina"));
            this.addCurrentAction("masturbate", this.getBodyPart("vagina"));
        }
        return true;
    }
    open(_entity) {
        if (!(_entity instanceof Entity)) {
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (PSDE.instances.has(_entity))
                _entity = PSDE.instances.get(_entity).parent;
            else
                return undefined;
        }
        return true;
    }
    /**
     * Have oral sex with _entity
     * @param  {Entity} _entity [description]
     * @return {Boolean}         [description]
     */
    oral(_entity) {
        if (!(_entity instanceof Character)) {
            if (PSDE.characters.has(_entity))
                _entity = PSDE.getCharacterByID(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity;
            else if (PSDE.entityInstances.has(_entity))
                _entity = PSDE.entityInstances.get(_entity);
            else
                return undefined;
        }
        this.fuck(_entity);
        if (_entity instanceof Character) {
            if (_entity.hasBodyPart("penis")) {
                this.addCurrentAction("sex", _entity.getBodyPart("penis"));
                _entity.addCurrentAction("sex", this.getBodyPart("mouth"));
                this.incFellatioGiveCount();
                _entity.incFellatioReceiveCount();
            }
            else if (_entity.hasBodyPart("vagina")) {
                this.addCurrentAction("sex", _entity.getBodyPart("vagina"));
                _entity.addCurrentAction("sex", this.getBodyPart("mouth"));
                this.incCunnilingusGiveCount();
                _entity.incCunnilingusReceiveCount();
            }
        }
        else if (_entity instanceof BodyPartInstance) {
            this.addCurrentAction("sex", _entity);
            _entity.owner.addCurrentAction("sex", this.getBodyPart("mouth"));
            if (_entity.type == "penis") {
                this.incFellatioGiveCount();
                _entity.owner.incFellatioReceiveCount();
            }
            else if (_entity.type == "vagina") {
                this.incCunnilingusGiveCount();
                _entity.owner.incCunnilingusReceiveCount();
            }
            else if (_entity.type == "anus") {
                this.incAnalingusGiveCount();
                _entity.owner.incAnalingusReceiveCount();
            }
        }
        else if (_entity instanceof ItemInstance) {
            this.addCurrentAction("sex", _entity);
            this.incFellatioGiveCount();
        }
        else
            return false;
        return true;
    }
    pray(_entity) {
        if (!(_entity instanceof Entity)) {
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (PSDE.instances.has(_entity))
                _entity = PSDE.instances.get(_entity).parent;
            else
                return undefined;
        }

        this.addCurrentAction("pray", _entity);
        return true;
    }
    put(_entity, _itemInstance) {
        return this.give(_entity, _itemInstance);
    }
    /**
     * Alias for fuck (for now :v)
     * @param  {Entity} _entity [description]
     * @return {Boolean}         [description]
     */
    rape(_entity) {
        this.fuck(_entity);
    }
    release(_itemInstance, _hand = undefined) {
        return this.removeHeldEntity(_itemInstance, _hand);
    }
    /**
     * Alias for fuck
     * @param  {Entity} _entity [description]
     * @return {Boolean}         [description]
     */
    sex(_entity) {
        return this.fuck(_entity);
    }
    sit(_furniture = undefined, _dontOverride = []) {
        if (!(_furniture instanceof Furniture))
            _furniture = PSDE.furniture.has(_furniture) ? PSDE.furniture.get(_furniture) : undefined;
        if (typeof _dontOverride == "undefined")
            _dontOverride = [];
        else if (_dontOverride instanceof Set)
            _dontOverride = Array.from(_dontOverride);

        this.removeCurrentAction("lay");
        if (_dontOverride.contains("sleep")) this.removeCurrentAction("sleep");
        this.removeCurrentAction("stand");
        this.removeCurrentAction("walk");
        if (_dontOverride.contains("masturbate")) this.removeCurrentAction("masturbate");
        if (_dontOverride.contains("sex")) this.removeCurrentAction("sex");

        this.addCurrentAction("sit", _furniture);

        if (_furniture instanceof Furniture)
            this.furniture = _furniture;
        return true;
    }
    sleep(_furniture = undefined, _dontOverride = []) {
        if (!(_furniture instanceof Furniture))
            _furniture = PSDE.furniture.has(_furniture) ? PSDE.furniture.get(_furniture) : undefined;
        if (typeof _dontOverride == "undefined")
            _dontOverride = [];
        else if (_dontOverride instanceof Set)
            _dontOverride = Array.from(_dontOverride);

        this.removeCurrentAction("walk");
        this.removeCurrentAction("masturbate");
        if (_dontOverride.contains("sex")) this.removeCurrentAction("sex");
        if (_furniture instanceof Furniture && (_furniture.type == "bed" || _furniture.type == "couch"))
            this.addCurrentAction("lay", _furniture);

        this.addCurrentAction("sleep");

        if (_furniture instanceof Furniture)
            this.furniture = _furniture;
        return true;
    }
    stand(_dontOverride = []) {
        if (typeof _dontOverride == "undefined")
            _dontOverride = [];
        else if (_dontOverride instanceof Set)
            _dontOverride = Array.from(_dontOverride);

        this.removeCurrentAction("sit");
        this.removeCurrentAction("lay");
        this.removeCurrentAction("sleep");
        this.removeCurrentAction("walk");
        if (_dontOverride.contains("masturbate")) this.removeCurrentAction("masturbate");
        if (_dontOverride.contains("sex")) this.removeCurrentAction("sex");

        this.addCurrentAction("stand");

        this.furniture = undefined;
        return true;
    }
    stay() {
        this.following = undefined;
        this.removeCurrentAction("follow");
        return true;
    }
    steal(_entity, _itemInstance) {
        if (!(_entity instanceof Entity)) {
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity)
            else
                return undefined;
        }
        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else
                return;
        }
    }
    /**
     * Alias for oral
     * @param  {Entity} _entity [description]
     * @return {Boolean}         [description]
     */
    suck(_entityInstance) {
        return this.oral(_entityInstance);
    }
    talk(_entity) {
        if (!(_entity instanceof Entity))
            _entity = PSDE.entities.has(_entity) ? PSDE.entities.get(_entity) : undefined;
        this.addCurrentAction("talk", _entity);
        return true;
    }
    /**
     * Have vaginal sex with _entity
     * @param  {Entity} _entity [description]
     * @return {Boolean}         [description]
     */
    vaginal(_entity) {
        if (!(_entity instanceof Character)) {
            if (PSDE.characters.has(_entity))
                _entity = PSDE.getCharacterByID(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity;
            else if (PSDE.entityInstances.has(_entity))
                _entity = PSDE.entityInstances.get(_entity);
            else
                return undefined;
        }
        this.fuck(_entity);
        if (_entity instanceof Character) {
            if (_entity.hasBodyPart("penis")) {
                this.addCurrentAction("sex", _entity.getBodyPart("penis"));
                _entity.addCurrentAction("sex", this.getBodyPart("vagina"));
                this.incAnalReceiveCount();
                _entity.incAnalGiveCount();
            }
            else if (_entity.hasBodyPart("vagina") && _entity.hasStrapon()) {
                this.addCurrentAction("sex", _entity.getStrapon());
                _entity.addCurrentAction("sex", this.getBodyPart("vagina"));
                this.incAnalReceiveCount();
                _entity.incAnalGiveCount();
            }
            else
                return false;
        }
        else if (_entity instanceof BodyPartInstance) {
            this.addCurrentAction("sex", _entity);
            _entity.owner.addCurrentAction("sex", this.getBodyPart("vagina"));
            if (_entity.type == "penis") {
                this.incAnalReceiveCount();
                _entity.owner.incAnalGiveCount();
            }
            else
                return false;
        }
        else if (_entity instanceof ItemInstance) {
            this.addCurrentAction("sex", _entity);
            this.incAnalReceiveCount();
        }
        else
            return false;
        return true;
    }
    /**
     * Remove current action "sleep"
     * @return {Boolean} [description]
     */
    wake() {
        this.removeCurrentAction("sleep");
        return true;
    }
    walk(_dontOverride = []) {
        if (typeof _dontOverride == "undefined")
            _dontOverride = [];
        else if (_dontOverride instanceof Set)
            _dontOverride = Array.from(_dontOverride);

        this.removeCurrentAction("sit");
        this.removeCurrentAction("lay");
        this.removeCurrentAction("sleep");
        this.removeCurrentAction("stand");
        if (_dontOverride.contains("masturbate")) this.removeCurrentAction("masturbate");
        if (_dontOverride.contains("sex")) this.removeCurrentAction("sex");

        this.addCurrentAction("walk");

        this.furniture = undefined;
        return true;
    }
    wear(_itemInstance, _type = undefined) {
        return this.setClothing(_itemInstance, _type);
    }

    addSexRefusalCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        if (this.sexRefusalCountMap.has(_character))
            this.sexRefusalCountMap.set(_character, this.sexRefusalCountMap.get(_character) + 1);
        else
            this.sexRefusalCountMap.set(_character, 1);

        return this;
    }
    getSexRefusalCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        if (this.sexRefusalCountMap.has(_character))
            return this.sexRefusalCountMap.get(_character);
        else
            return 0;
    }

    isCharmed() {
        return this.hasCurrentAction("charmed");
    }
    isFucking() {
        return this.hasCurrentAction("sex");
    }
    isKneeling() {
        return this.hasCurrentAction("kneel");
    }
    isLying() {
        return this.hasCurrentAction("lay");
    }
    isMasturbating() {
        return this.hasCurrentAction("masturbate");
    }
    isSleeping() {
        return this.hasCurrentAction("sleep");
    }
    isSitting() {
        return this.hasCurrentAction("sit");
    }
    isStanding() {
        return this.hasCurrentAction("stand");
    }

    isClothed() {
        if (this.getSex() == PSDE.kMale)
            return this.getPants() instanceof Clothing;
        else
            return (this.getShirt() instanceof Clothing && this.getPants() instanceof Clothing);
    }
    isNaked() {
        if (this.isClothed())
            return false;

        return !(this.getUnderwear() instanceof Clothing);
    }
    
    putOn(_itemInstance, _type = undefined) {
        return this.setClothing(_itemInstance, _type);
    }
    takeOff(_itemInstance, _type) {
        return this.removeClothing(_itemInstance);
    }
    isWearing(_itemInstance) {
        if (_itemInstance == undefined) 
            return false;
        var _clothing;
        var _checkInstance = true;
        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else if (_itemInstance instanceof Clothing) {
                _checkInstance = false;
                _clothing = _itemInstance;
            }
            else if (PSDE.clothing.has(_itemInstance)) {
                _checkInstance = false;
                _clothing = PSDE.clothing.get(_itemInstance).parent;
            }
            else
                return undefined;
        }
        else if (!(_itemInstance.parent instanceof Clothing))
            return undefined;
        else
            _clothing = _itemInstance.parent;

        if (_clothing instanceof Clothing) {
            if (PSDE.kClothingTypes.has(_clothing.type)) {
                if (!(this.clothing[_clothing.type] instanceof ItemInstance))
                    return false;
                if (_checkInstance)
                    return this.clothing[_clothing.type] == _itemInstance;
                else
                    return this.clothing[_clothing.type].parent == _clothing;
            }
        }
        else
            return undefined;
    }

    hasKey(_room) {
        if (!(_room instanceof Room))
            _room = PSDE.rooms.has(_room) ? PSDE.rooms.get(_room) : undefined;

        if (_room instanceof Room) {
            if (this.containsItem(_room.sid + "Key") || this.containsItem(_room.location.id + "Key") || this.containsItem(_room.cell.location.id + "Key") || this.containsItem("masterKey"))
                return true;
            return false;
        }
        else
            return false;
    }

    subjectPronoun() {
        return this.gender == 0 ? "he" : "she";
    }
    objectPronoun() {
        return this.gender == 0 ? "him" : "her";
    }
    possessivePronoun() {
        return this.gender == 0 ? "his" : "hers";
    }
    possessiveAdjective() {
        return this.gender == 0 ? "his" : "her";
    }
    reflexivePronoun() {
        return this.gender == 0 ? "himself" : "herself";
    }
    singularPossessiveName() {
        if (this.name.slice(-1) == 's' || this.name.slice(-1) == 'z')
            return "{0}'".format(this.name);
        else
            return "{0}'s".format(this.name);
    }
    grammaticalGender() {
        switch (this.species) {
            case "fox" : {
                return this.gender == 0 ? "tod" : "vixen";
            }
            case "wolf" : {
                return this.gender == 0 ? "wolf" : "wolfen";
            }
            case "aardwolf" :
            case "hyena" : {
                return this.gender == 0 ? "brute" : "fae";
            }
            case "sheep" : {
                return this.gender == 0 ? "ram" : "ewe";
            }
            case "stoat" : {
                return this.gender == 0 ? "jack" : "jill";
            }
            case "mouse" :
            case "deer" :
            case "rabbit" :
            case "antelope" : {
                return this.gender == 0 ? "buck" : "doe";
            }
            case "jackal" :
            case "coyote" : {
                return this.gender == 0 ? "dog" : "bitch";
            }
            case "tiger" : {
                return this.gender == 0 ? "tiger" : "tigress";
            }
            case "pig" : {
                return this.gender == 0 ? "boar" : "sow";
            }
            case "horse" : {
                return this.gender == 0 ? "stallion" : "mare";
            }
        }
    }

    getHand() {
        if (this.handType == "fur" || this.handType == "pad" || this.handType == "skin")
            return "paw";
        else
            return "hoof";
    }
    getHands() {
        if (this.handType == "fur" || this.handType == "pad" || this.handType == "skin")
            return "paws";
        else
            return "hooves";
    }
    setHand(_type) {
        if (PSDE.kHandTypes.has(_type))
            this.handType = _type;
        else
            this.handType = "pad";
        return this;
    }

    setFeet(_type) {
        if (PSDE.kFeetTypes.has(_type))
            this.feetType = _type;
        else
            this.feetType = "pad";
        return this;
    }

    setEyes(_type) {
        if (PSDE.kEyeTypes.has(_type))
            this.eyeType = _type;
        else
            this.eyeType = "circle";
        return this;
    }
    setEyeColour(_colour) {
        this.eyeColour = _colour
        this.eyeColourHex = colourNameToHex(_colour.replace(/[^a-z]/g, ""));
        return this;
    }
    setEyeColourHex(_hexColour) {
        this.eyeColourHex = _hexColour;
        return this;
    }

    setPelt(_type) {
        if (PSDE.kPeltTypes.has(_type))
            this.peltType = _type;
        else
            this.peltType = "fur";
        return this;
    }
    setFur(_type) {
        return this.setPelt(_type);
    }
    setFurColourA(_colour) {
        this.furColourA = _colour;
        this.furColourAHex = colourNameToHex(_colour.replace(/[^a-z]/g, ""));
        return this;
    }
    setFurColourB(_colour) {
        this.furColourB = _colour;
        this.furColourBHex = colourNameToHex(_colour.replace(/[^a-z]/g, ""));
        return this;
    }
    setFurColour(_colourA, _colourB = undefined) {
        if (typeof _colourB == 'undefined')
            _colourB = _colourA;
        
        this.setFurColourA(_colourA);
        this.setFurColourB(_colourB);
        return this;
    }
    setFurColourAHex(_hexColour) {
        this.furColourAHex = _hexColour;
        return this;
    }
    setFurColourBHex(_hexColour) {
        this.furColourBHex = _hexColour;
        return this;
    }
    setFurColourHex(_colourA, _colourB = undefined) {
        if (typeof _colourB == 'undefined')
            _colourB = _colourA;
        
        this.setFurColourAHex(_colourA);
        this.setFurColourBHex(_colourB);
        return this;
    }

    hasBodyPart(_bodyPart) {
        if (!PSDE.kBodyPartTypes.has(_bodyPart)) {
            if (_bodyPart instanceof BodyPart)
                _bodyPart = _bodyPart.type;
            else if (PSDE.bodyParts.has(_bodyPart))
                _bodyPart = PSDE.bodyParts.get(_bodyPart).type;
            else if (_bodyPart instanceof BodyPartInstance)
                _bodyPart = _bodyPart.parent.type;
            else if (PSDE.bodyPartInstances.has(_bodyPart))
                _bodyPart = PSDE.bodyPartInstances.get(_bodyPart).parent.type;
            else
                return undefined;
        }
        return this.bodyParts.has(_bodyPart);
    }
    removeBodyPart(_bodyPart) {
        if (_bodyPart instanceof Array) {
            _bodyPart.forEach(function(__bodyPart) {
                this.removeBodyPart(__bodyPart);
            }, this);
            return this;
        }
        if (!(_bodyPart instanceof BodyPartInstance)) {
            if (_bodyPart instanceof BodyPart)
                _bodyPart = new BodyPartInstance(undefined, _bodyPart, this, undefined, undefined, this.species);
            else if (PSDE.bodyParts.has(_bodyPart))
                _bodyPart = new BodyPartInstance(undefined, PSDE.bodyParts.get(_bodyPart), this, undefined, undefined, this.species);
            else if (PSDE.bodyPartInstances.has(_bodyPart))
                _bodyPart = PSDE.bodyPartInstances.get(_bodyPart);
            else
                return undefined;
        }
        this.bodyParts.set(_bodyPart.type, undefined);
        return this;
    }
    addBodyPart(_bodyPart) {
        if (_bodyPart instanceof Array) {
            _bodyPart.forEach(function(__bodyPart) {
                this.addBodyPart(__bodyPart);
            }, this);
            return this;
        }
        if (!(_bodyPart instanceof BodyPartInstance)) {
            if (_bodyPart instanceof BodyPart)
                _bodyPart = new BodyPartInstance(undefined, _bodyPart.getType(), this, undefined, undefined, this.species);
            else if (PSDE.bodyParts.has(_bodyPart))
                _bodyPart = new BodyPartInstance(undefined, PSDE.bodyParts.get(_bodyPart).getType(), this, undefined, undefined, this.species);
            else if (PSDE.bodyPartInstances.has(_bodyPart))
                _bodyPart = PSDE.bodyPartInstances.get(_bodyPart);
            else
                return this;
        }
        this.bodyParts.set(_bodyPart.parent.type, _bodyPart);
        return this;
    }
    getBodyPart(_bodyPart) {
        if (!PSDE.kBodyPartTypes.has(_bodyPart)) {
            if (_bodyPart instanceof BodyPart)
                _bodyPart = _bodyPart.type;
            else if (PSDE.bodyParts.has(_bodyPart))
                _bodyPart = PSDE.bodyParts.get(_bodyPart).type;
            else if (_bodyPart instanceof BodyPartInstance)
                _bodyPart = _bodyPart.parent.type;
            else if (PSDE.bodyPartInstances.has(_bodyPart))
                _bodyPart = PSDE.bodyPartInstances.get(_bodyPart).parent.type;
            else
                return undefined;
        }
        return this.bodyParts.get(_bodyPart);
    }
    clearBodyParts() {
        this.bodyParts.clear();
    }

    setSpecies(_species) {
        if (PSDE.kSpeciesTypes.has(_species))
            this.species = _species;
        else
            this.species = "fox";
        return this;
    }
    _generateProperties() {
        var _baseHeight = 0; // Average height in metres at the age of 20
        var _baseMass = 0; // Average mass in kilograms at the age of 20
        this.clearBodyParts();
        this.addBodyPart(["ankles","anus","arms","arms","back","chest","feet","fingers","groin","hands","head","leftAnkle","leftArm","leftEar","leftEye","leftFoot","leftHand","leftLeg","leftNipple","leftShoulder","legs","legs","lips","mouth","neck","nose","rear","rightAnkle","rightArm","rightEar","rightEye","rightFoot","rightHand","rightLeg","rightNipple","rightShoulder","shoulder","shoulders","stomach","toes","tongue","waist","wrists"]);
        if (this.getSex() == PSDE.kMale)
            this.addBodyPart(["penis","testicles"]);
        else
            this.addBodyPart(["vagina","clitoris"]);
        this.muscle = 0.5;
        this.fat = 0.25;
        if (this.species == "fox") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 15;
                this.penisGirth = 10;
                this.addBodyPart("knot");
                _baseMass = 36;
                _baseHeight = 1.20;
            }
            else {
                this.vaginaSize = 15;
                this.vaginaGirth = 10;
                _baseMass = 32;
                _baseHeight = 1.12;
            }

            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "wolf") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 25;
                this.penisGirth = 16;
                this.addBodyPart("knot");
                _baseMass = 72;
                _baseHeight = 1.9;
            }
            else {
                this.vaginaSize = 25;
                this.vaginaGirth = 16;
                _baseMass = 66;
                _baseHeight = 1.8;
            }

            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "aardwolf") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 15;
                this.penisGirth = 10;
                _baseMass = 32;
                _baseHeight = 1.10;
            }
            else {
                this.vaginaSize = 15;
                this.vaginaGirth = 10;
                _baseMass = 28;
                _baseHeight = 1.02;
            }

            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "hyena") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 25;
                this.penisGirth = 16;
            }
            else {
                this.vaginaSize = 25;
                this.vaginaGirth = 16;
            }

            this.bodySize = 0.85;
            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "sheep") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 19;
                this.penisGirth = 11;
            }
            else {
                this.vaginaSize = 19;
                this.vaginaGirth = 11;
            }
            
            this.bodySize = 0.5;
            this.predator = false;
            this.setFeet("clovenhoof");
            this.setHand("clovenhoof");
            this.setEyes("rectangle");
            this.setFur("wool");
            this.peltSoftness = 75;
        }
        else if (this.species == "stoat") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 8;
                this.penisGirth = 7;
            }
            else {
                this.vaginaSize = 8;
                this.vaginaGirth = 7;
            }

            this.bodySize = 0.25;
            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "deer") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 22;
                this.penisGirth = 12;
            }
            else {
                this.vaginaSize = 22;
                this.vaginaGirth = 12;
            }
            
            this.bodySize = 0.65;
            this.predator = false;
            this.setFeet("clovenhoof");
            this.setHand("clovenhoof");
            this.setEyes("circle");
            this.setFur("wool");
            this.peltSoftness = 75;
        }
        else if (this.species == "rabbit") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 12;
                this.penisGirth = 8;
            }
            else {
                this.vaginaSize = 12;
                this.vaginaGirth = 8;
                this.mass = 14.9;
                this.height = 0.81;
            }
            
            this.bodySize = 0.4;
            this.predator = false;
            this.setFeet("fur");
            this.setHand("fur");
            this.setEyes("circle");
            this.setFur("fur");
            this.peltSoftness = 75;
        }
        else if (this.species == "jackal") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 18;
                this.penisGirth = 12;
                this.addBodyPart("knot");
            }
            else {
                this.vaginaSize = 18;
                this.vaginaGirth = 12;
            }
            
            this.bodySize = 0.5;
            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "coyote") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 15;
                this.penisGirth = 10;
                this.addBodyPart("knot");
            }
            else {
                this.vaginaSize = 15;
                this.vaginaGirth = 10;
            }
            
            this.bodySize = 0.5;
            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "tiger") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 28;
                this.penisGirth = 15;
            }
            else {
                this.vaginaSize = 28;
                this.vaginaGirth = 15;
            }
            
            this.bodySize = 1.2;
            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setFur("fur");
        }
        else if (this.species == "antelope") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 22;
                this.penisGirth = 12;
            }
            else {
                this.vaginaSize = 22;
                this.vaginaGirth = 12;
            }
            
            this.bodySize = 0.65;
            this.predator = false;
            this.setFeet("clovenhoof");
            this.setHand("clovenhoof");
            this.setEyes("rectangle");
            this.setFur("hair");
        }
        else if (this.species == "pig") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 15;
                this.penisGirth = 10;
            }
            else {
                this.vaginaSize = 15;
                this.vaginaGirth = 10;
            }
            
            this.bodySize = 0.6;
            this.predator = false;
            this.setFeet("clovenhoof");
            this.setHand("clovenhoof");
            this.setEyes("circle");
            this.setFur("skin");
        }
        else if (this.species == "horse") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 45;
                this.penisGirth = 25;
            }
            else {
                this.vaginaSize = 45;
                this.vaginaGirth = 25;
            }
            
            this.bodySize = 0.85;
            this.predator = false;
            this.setFeet("hoof");
            this.setHand("hoof");
            this.setEyes("rectangle");
            this.setFur("hair");
        }
        else if (this.species == "mouse") {
            if (this.getSex() == PSDE.kMale) {
                this.penisSize = 1;
                this.penisGirth = 0.5;
            }
            else {
                this.vaginaSize = 1;
                this.vaginaGirth = 0.6;
            }
            
            this.bodySize = 0.05;
            this.predator = false;
            this.setFeet("skin");
            this.setHand("skin");
            this.setEyes("circle");
            this.setFur("fur");
            this.peltSoftness = 75;
        }
        this.width = this.height / 2.4;
        return this;
    }
    getSpecies() {
        return this.species;
    }

    setPenisSize(_blob) {
        if (isNaN(_blob))
            _blob = toCM(_blob);
        this.penisSize = _blob;
        return this;
    }
    getPenisSize() {
        return this.penisSize;
    }

    setPenisGirth(_blob) {
        if (isNaN(_blob))
            _blob = toCM(_blob);
        this.penisGirth = _blob;
        return this;
    }
    getPenisGirth() {
        return this.penisGirth;
    }

    setVaginaSize(_blob) {
        if (isNaN(_blob))
            _blob = toCM(_blob);
        this.vaginaSize = _blob;
        return this;
    }
    getVaginaSize() {
        return this.vaginaSize;
    }

    setVaginaGirth(_blob) {
        if (isNaN(_blob))
            _blob = toCM(_blob);
        this.vaginaGirth = _blob;
        return this;
    }
    getVaginaGirth() {
        return this.vaginaGirth;
    }

    setFollowing(_character) {
        return this.follow(_character);
    }
    clearFollowing() {
        return this.stay();
    }

    /**
     * Increments sex count with Character
     * @param  {Character} _character Character
     * @param {this} This
     */
    incSexCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.virgin = false;
        this.sexCount++;
        if (this.sexCountMap.has(_character))
            this.sexCountMap.set(_character, this.sexCountMap.get(_character) + 1);
        else
            this.sexCountMap.set(_character, 1);
        return this;
    }
    /**
     * Wrapper function for this.incSexCount(Character)
     * @param {Character}  _character   Character
     * @param {this} This
     */
    addSexWith(_character, _updateParent = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.incSexCount(_character);
        if (_updateParent)
            _character.incSexCount(_character);
        return this;
    }
    /**
     * Increments vaginal receiving count with Character
     * @param  {Character} _character Character
     * @param {this} This
     */
    incVaginalReceiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.vaginalReceiveCount++;
        this.vaginalReceiveCountMap.set(_character, this.vaginalReceiveCountMap.get(_character) + 1);
        return this;
    }
    /**
     * Increments vaginal penetration count with Character
     * @param  {Character} _character Character
     * @param {this} This
     */
    incVaginalGiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.vaginalGiveCount++;
        this.vaginalGiveCountMap.set(_character, this.vaginalGiveCountMap.get(_character) + 1);
        return this;
    }
    /**
     * Increments anal receiving count with Character
     * @param  {Character} _character Character
     * @param {this} This
     */
    incAnalReceiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.analReceiveCount++;
        this.analReceiveCountMap.set(_character, this.analReceiveCountMap.get(_character) + 1);
        return this;
    }
    /**
     * Increments anal penetration count with Character
     * @param  {Character} _character Character
     * @param {this} This
     */
    incAnalGiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.analGiveCount++;
        this.analGiveCountMap.set(_character, this.analGiveCountMap.get(_character) + 1);
        return this;
    }
    incCunnilingusReceiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.cunnilingusReceiveCount++;
        this.cunnilingusReceiveCountMap.set(_character, this.cunnilingusReceiveCountMap.get(_character) + 1);
        return this;
    }
    incCunnilingusGiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.cunnilingusGiveCount++;
        this.cunnilingusGiveCountMap.set(_character, this.cunnilingusGiveCountMap.get(_character) + 1);
        return this;
    }
    incAnalingusReceiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.analingusReceiveCount++;
        this.analingusReceiveCountMap.set(_character, this.analingusReceiveCountMap.get(_character) + 1);
        return this;
    }
    incAnalingusGiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.analingusGiveCount++;
        this.analingusGiveCountMap.set(_character, this.analingusGiveCountMap.get(_character) + 1);
        return this;
    }
    incFellatioReceiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.fellatioReceiveCount++;
        this.fellatioReceiveCountMap.set(_character, this.fellatioReceiveCountMap.get(_character) + 1);
        return this;
    }
    incFellatioGiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.fellatioGiveCount++;
        this.fellatioGiveCountMap.set(_character, this.fellatioGiveCountMap.get(_character) + 1);
        return this;
    }
    incHandjobReceiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.handjobReceiveCount++;
        this.handjobReceiveCountMap.set(_character, this.handjobReceiveCountMap.get(_character) + 1);
        return this;
    }
    incHandjobGiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.handjobGiveCount++;
        this.handjobGiveCountMap.set(_character, this.handjobGiveCountMap.get(_character) + 1);
        return this;
    }
    incMasturbateCount() {
        this.masturbateCount++;
        return this;
    }
    incAutofellatioCount() {
        this.fellatioGiveCount++;
        this.fellatioReceiveCount++;
        this.masturbateCount++;
        this.autofellatioCount++;
        return this;
    }
    incAutocunnilingusCount() {
        this.cunnilingusGiveCount++;
        this.cunnilingusReceiveCount++;
        this.masturbateCount++;
        this.autocunnilingusCount++;
        return this;
    }
    incAutoanalingusCount() {
        this.analingusGiveCount++;
        this.analingusReceiveCount++;
        this.masturbateCount++;
        this.autoanalingusCount++;
        return this;
    }



    addFollower(_character, _updateChild = false) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        this.followers.add(_character);
        if (_updateChild) {
            _character.follow(this, undefined, false);
        }
        return this;
    }
    removeFollower(_character, _updateChild = false) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        if (this.followers.has(_character)) {
            if (_updateChild) {
                _character.stay();
            }
            this.followers.delete(_character);
        }
        return this;
    }
    clearFollowers(_updateChild = true) {
        this.followers.forEach(function(_character) {
            this.removeFollower(_character, true);
        }, this);
        this.followers.clear();
        return this;
    }
    hasFollowers() {
        return this.followers.size > 0;
    }
    isFollowing(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }
        if (typeof this.following == "undefined")
            return false;
        else
            return this.following == _character;
    }

    getSexCount(_character = undefined) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return 0;
        }
        return this.sexCountMap.has(_character) ? this.sexCountMap.get(_character) : 0;
    }

    addFiance(_character, _updateChild = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        if (this.fiance instanceof Character && _character != this.getFiance()) {
            this.removeFiance(this.getFiance());
        }
        this.spouse = _character;
        if (_updateChild) {
            _character.addFiance(this, false);
        }
        return this;
    }
    getFiance() {
        return this.fiance;
    }
    removeFiance(_character, _updateChild = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        if (this.fiance == _character) {
            this.fiance = undefined;
        }
        if (_updateChild) {
            _character.removeFiance(this, false);
        }
        return this;
    }
    clearFiance(_updateChild = true) {
        this.fiance = undefined;
        if (_updateChild) {
            _character.clearFiance(false);
        }
        return this;
    }
    addSpouse(_character, _updateChild = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        if (this.fiance == _character) {
            this.clearFiance();
        }
        if (this.spouse instanceof Character && _character != this.getSpouse()) {
            this.removeSpouse(this.getSpouse());
        }
        this.spouse = _character;
        if (_updateChild) {
            _character.addSpouse(this, false);
        }
        return this;
    }
    getSpouse() {
        return this.spouse;
    }
    removeSpouse(_character, _updateChild = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        if (this.spouse == _character) {
            this.spouse = undefined;
        }
        if (_updateChild) {
            _character.removeSpouse(this, false);
        }
        return this;
    }
    clearSpouse(_updateChild = true) {
        this.spouse = undefined;
        if (_updateChild) {
            _character.clearSpouse(false);
        }
        return this;
    }
    marry(_character) {
        return this.addSpouse(_character);
    }
    divorce(_character) {
        return this.removeSpouse(_character);
    }

    addBiologicalParent(_character, _updateChild = true) {
        if (PSDE.enableDebug) console.log("Running addBiologicalParent");
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        if (PSDE.enableDebug) console.log("    Checking if species are same");
        if (_character.getSpecies() != this.getSpecies()) {
            return this;
        }
        if (PSDE.enableDebug) console.log("    Checking if parent ({0}) is same-sex as first parent ({1})".format(_character.id, this.biologicalParents[0].id));
        if (this.biologicalParents.length == 1 && this.biologicalParents[0].getSex() == _character.getSex()) {
            return this;
        }
        else if (this.biologicalParents.length == 2) {
            return this;
        }
        if (PSDE.enableDebug) console.log("    Checking if parent ({0}) is a foster parent".format(_character.id));
        if (this.fosterParents.contains(_character)) {
            this.fosterParents.remove(_character);
        }
        if (PSDE.enableDebug) console.log("    Checking if parent ({0}) is already assigned to {1}".format(_character.id, this.id));
        if (!this.biologicalParents.contains(_character)) {
            this.biologicalParents.push(_character);
        }
        if (_updateChild) {
            _character.addBiologicalChild(this, false);
        }
        return this;
    }
    addFosterParent(_character, _updateChild = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        if (this.biologicalParents.contains(_character)) {
            this.biologicalParents.remove(_character);
        }
        if (!this.fosterParents.contains(_character)) {
            this.fosterParents.push(_character);
        }
        if (_updateChild) {
            _character.addFosterChild(this, false);
        }
        return this;
    }
    getParents() {
        return new Array(...this.biologicalParents, ...this.fosterParents);
    }
    hasParent(_character) {
        return this.getParents().contains(_character);
    }
    hasParents() {
        return this.getParents().length > 0;
    }

    getBiologicalParents() {
        return this.biologicalParents;
    }
    hasBiologicalParent(_character) {
        return this.biologicalParents.contains(_character);
    }
    getFosterParents() {
        return this.fosterParents;
    }
    hasFosterParent(_character) {
        return this.fosterParents.contains(_character);
    }

    addBiologicalChild(_character, _updateChild = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        if (_character.species != this.species) {
            return this;
        }
        if (this.fosterChildren.contains(_character)) {
            this.fosterChildren.remove(_character);
        }
        if (!this.biologicalChildren.contains(_character)) {
            this.biologicalChildren.push(_character);
        }
        if (_updateChild) {
            _character.addBiologicalParent(this, false);
        }
        return this;
    }
    addFosterChild(_character, _updateChild = true) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        if (this.biologicalChildren.contains(_character)) {
            this.biologicalChildren.remove(_character);
        }
        if (!this.fosterChildren.contains(_character)) {
            this.fosterChildren.push(_character);
        }
        if (_updateChild) {
            _character.addFosterParent(this, false);
        }
        return this;
    }

    getBiologicalChildren() {
        return this.biologicalChildren;
    }
    hasBiologicalChild(_character) {
        return this.getBiologicalChildren().contains(_character);
    }
    hasBiologicalChildren() {
        return this.getBiologicalChildren().length > 0;
    }
    getFosterChildren() {
        return this.fosterChildren;
    }
    hasFosterChild(_character) {
        return this.getFosterChildren().contains(_character);
    }
    hasFosterChildren() {
        return this.getFosterChildren().length > 0;
    }
    getChildren() {
        return new Array(...this.getBiologicalChildren(), ...this.getFosterChildren());
    }
    hasChild(_character) {
        return this.getChildren().contains(_character);
    }
    hasChildren() {
        return this.getChildren().length > 0;
    }

    getBiologicalSiblings() {
        var _arr = new Array();
        this.getBiologicalParents().forEach(function(_parent) {
            _parent.getBiologicalChildren().forEach(function(_child) {
                if (_child == this || _arr.contains(_child)) {
                    return undefined;
                }
                else {
                    _arr.push(_child);
                }
            }, this);
        }, this);
        return _arr;
    }
    /**
     * Returns whether or not this character is related to another.
     * @param  {Character}  _character Character
     * @return {Boolean}            Whether or not this character is related to another.
     */
    hasBiologicalSibling(_character) {
        return this.getBiologicalSiblings().contains(_character);
    }
    hasBiologicalSiblings() {
        return this.getBiologicalSiblings().length > 0;
    }
    getSiblings() {
        var _arr = new Array();
        this.getParents().forEach(function(_parent) {
            _parent.getChildren().forEach(function(_child) {
                if (_child == this || _arr.contains(_child)) {
                    return undefined;
                }
                else {
                    _arr.push(_child);
                }
            }, this);
        }, this);
        return _arr;
    }
    hasSibling(_character) {
        return this.getSiblings().contains(_character);
    }
    hasSiblings() {
        return this.getSiblings().length > 0;
    }


    getBiologicalGrandParents() {
        var _arr = new Array();
        this.getBiologicalParents().forEach(function(_parent) {
            _parent.getBiologicalParents().forEach(function(_grandParent) {
                if (_arr.contains(_grandParent)) {
                    return undefined;
                }
                else {
                    _arr.push(_grandParent);
                }
            }, this);
        }, this);
        return _arr;
    }
    getGrandParents() {
        var _arr = new Array();
        this.getParents().forEach(function(_parent) {
            _parent.getParents().forEach(function(_grandParent) {
                if (_arr.contains(_grandParent)) {
                    return undefined;
                }
                else {
                    _arr.push(_grandParent);
                }
            }, this);
        }, this);
        return _arr;
    }

    getBiologicalGrandChildren() {
        var _arr = new Array();
        this.getBiologicalChildren().forEach(function(_children) {
            _children.getBiologicalChildren().forEach(function(_grandChild) {
                if (_arr.contains(_grandChild)) {
                    return undefined;
                }
                else {
                    _arr.push(_grandChild);
                }
            }, this);
        }, this);
        return _arr;
    }
    getGrandChildren() {
        var _arr = new Array();
        this.getChildren().forEach(function(_children) {
            _children.getChildren().forEach(function(_grandChild) {
                if (_arr.contains(_grandChild)) {
                    return undefined;
                }
                else {
                    _arr.push(_grandChild);
                }
            }, this);
        }, this);
        return _arr;
    }

    getParentsBiologicalSiblings() {
        var _arr = new Array();
        this.getBiologicalParents().forEach(function(_parent) {
            _parent.getBiologicalSiblings().forEach(function(_parentSiblings) {
                if (_arr.contains(_parentSiblings)) {
                    return undefined;
                }
                else {
                    _arr.push(_parentSiblings);
                }
            }, this);
        }, this);
        return _arr;
    }
    getParentsSiblings() {
        var _arr = new Array();
        this.getParents().forEach(function(_parent) {
            _parent.getSiblings().forEach(function(_parentSiblings) {
                if (_arr.contains(_parentSiblings)) {
                    return undefined;
                }
                else {
                    _arr.push(_parentSiblings);
                }
            }, this);
        }, this);
        return _arr;
    }

    getBiologicalCousins() {
        var _arr = new Array();
        this.getParentsBiologicalSiblings().forEach(function(_aunctles) {
            _aunctles.getBiologicalChildren().forEach(function(_cousins) {
                if (_arr.contains(_cousins)) {
                    return undefined;
                }
                else {
                    _arr.push(_cousins);
                }
            }, this);
        }, this);
        return _arr;
    }
    getCousins() {
        var _arr = new Array();
        this.getParentsSiblings().forEach(function(_aunctles) {
            _aunctles.getChildren().forEach(function(_cousins) {
                if (_arr.contains(_cousins)) {
                    return undefined;
                }
                else {
                    _arr.push(_cousins);
                }
            }, this);
        }, this);
        return _arr;
    }

    /**
     * Returns an integer based off of the number of direct parents this character has with another.
     * @param  {Character} _character Character
     * @return {Number}            0 - None, 1 - One parent, 2 - Both parents
     */
    calculateBiologicalSiblingRelations(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return 0;
        }
        if (this.biologicalParents.length > 0 && _character.biologicalParents.length > 0) {
            var _parentAHasChild = this.biologicalParents[0].hasBiologicalChild(_character);
            if (this.biologicalParents.length == 2) {
                var _parentBHasChild = this.biologicalParents[1].hasBiologicalChild(_character);
                if (_parentAHasChild && _parentBHasChild) {
                    return 2;
                }
                else if (_parentAHasChild || _parentBHasChild) {
                    return 1;
                }
            }
            else if (_parentAHasChild) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    calculateBiologicalRelations(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return 0;
        }
        // If they're your parent or your child
        if (this.getBiologicalParents().contains(_character) || this.getBiolgoicalChildren().containsCharacter)
            return 1.0;
        // If they're your sibling
        var _siblingCalc = this.calculateBiologicalSiblingRelations(_character);
        if (_siblingCalc > 0) {
            return _siblingCalc;
        }
        // If they're your grand parent or grand child
    }

    addKnownLocation(_location) {
        if (!(_location instanceof Location)) {
            if (PSDE.locations.has(_location))
                _location = PSDE.locations.get(_location);
            else
                return this;
        }
        this.knownLocations.add(_location);
        return this;
    }
    addLocation(_location) {
        return this.addKnownLocation(_location);
    }
    removeKnownLocation(_location) {
        if (!(_location instanceof Location)) {
            if (PSDE.locations.has(_location))
                _location = PSDE.locations.get(_location);
            else
                return this;
        }
        this.knownLocations.delete(_location);
        return this;
    }
    removeLocation(_location) {
        return this.removeKnownLocation(_location);
    }

    addSpell(_spell) {
        if (!(_spell instanceof Spell)) {
            if (PSDE.spells.has(_spell))
                _spell = PSDE.spells.get(_spell);
            else
                return this;
        }
        this.spells.add(_spell);
        return this;
    }
    removeSpell(_spell) {
        if (!(_spell instanceof Spell)) {
            if (PSDE.spells.has(_spell))
                _spell = PSDE.spells.get(_spell);
            else
                return this;
        }
        this.spells.delete(_spell);
        return true;
    }

    castSpell(_spell) {
        var _cost = 0;
        if (!isNaN(_spell)) {
            _cost = _spell;
        }
        else if (!(_spell instanceof Spell)) {
            if (PSDE.spells.has(_spell))
                _cost = PSDE.spells.get(_spell).manaCost;
            else
                return this;
        }
        else
            _cost = _spell.manaCost;
        var _spellCost = this.calculateManaCost(_cost);
        if (this.mana >= _spellCost)
            this.decMana(_spellCost);
        return this;
    }

    addPreferredSpecies(_species) {
        if (PSDE.kSpeciesTypes.has(_species)) {
            _species = _species;
            this.prefersSpecies.add(_species);
        }
        return this;
    }

    addAvoidedSpecies(_species) {
        if (PSDE.kSpeciesTypes.has(_species)) {
            _species = _species;
            this.avoidsSpecies.add(_species);
        }
        return this;
    }

    addNewDisposition(_character, passionOffset = 0, friendshipOffset = 0, playfulnessOffset = 0, soulmateOffset = 0, familialOffset = 0, obsessionOffset = 0, hateOffset = 0) {
        return this.addNewCharacterDispositionFor(_character, passionOffset, friendshipOffset, playfulnessOffset, soulmateOffset, familialOffset, obsessionOffset, hateOffset);
    }
    addNewCharacterDispositionFor(_character, passionOffset = 0, friendshipOffset = 0, playfulnessOffset = 0, soulmateOffset = 0, familialOffset = 0, obsessionOffset = 0, hateOffset = 0) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }

        if (this.prefersSpecies.has(_character.species)) {
            if (this.prefersSex == _character.getSex()) {
                if (this.sexualOrientation == 0 && _character.getSex() != this.getSex() || this.sexualOrientation == 1 && _character.getSex() == this.getSex() || this.sexualOrientation == 2) {
                    if (this.philautia > 74) {
                        if (this.agape > 74)
                            passionOffset += 3;
                        else if (this.agape > 49)
                            passionOffset += 2;
                        else {
                            passionOffset++;
                            obsessionOffset++;
                        }
                        passionOffset++;
                    }
                    else {
                        if (this.agape > 74)
                            passionOffset++;
                        passionOffset += 2;
                    }

                    if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                        passionOffset += 2;
                        obsessionOffset++;
                    }

                    passionOffset++;
                }
            }

            if (this.age >= _character.age + (this.age/10)) {
                if (this.philautia > 74)
                    obsessionOffset++;

                if (this.agape > 74)
                    familialOffset += 3;
                else if (this.agape > 49)
                    familialOffset += 2;

                familialOffset++;
            }

            if (this.philautia > 74 && this.agape > 50) {
                if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                    friendshipOffset++;
                    playfulnessOffset++;
                }

                friendshipOffset++;
                playfulnessOffset += 2;
            }

            playfulnessOffset += 2;
        }
        else if (this.avoidsSpecies.has(_character.species)) {
            if (this.prefersSex == _character.getSex()) {
                if (this.sexualOrientation == 0 && _character.getSex() != this.getSex() || this.sexualOrientation == 1 && _character.getSex() == this.getSex() || this.sexualOrientation == 2) {
                    if (this.philautia > 74) {
                        if (this.agape > 74)
                            passionOffset += 2;
                    }
                    else {
                        if (this.agape > 74)
                            passionOffset++;
                    }

                    if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                        passionOffset++;
                        obsessionOffset++;
                    }
                }
            }

            if (this.age >= _character.age + (this.age/10)) {
                if (this.philautia > 74) {
                    if (this.agape > 74)
                        familialOffset++;
                }
                else {
                    if (this.agape > 74)
                        familialOffset++;
                }
                familialOffset++;
            }

            if (this.philautia > 74 && this.agape > 50) {
                if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                    friendshipOffset++;
                    playfulnessOffset++;
                }

                friendshipOffset++;
                playfulnessOffset += 2;
            }
        }
        else {
            if (this.prefersSex == _character.getSex()) {
                if (this.sexualOrientation == 0 && _character.getSex() != this.getSex() || this.sexualOrientation == 1 && _character.getSex() == this.getSex() || this.sexualOrientation == 2) {
                    if (this.philautia > 74) {
                        if (this.agape > 74)
                            passionOffset += 2;
                        else if (this.agape > 49)
                            passionOffset++;
                        else
                            obsessionOffset++;

                        passionOffset++;
                    }
                    else {
                        if (this.agape > 74)
                            passionOffset++;
                        passionOffset++;
                    }

                    if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                        passionOffset++;
                        obsessionOffset++;
                    }

                    passionOffset++;
                }
            }
        }

        this.setCharacterDisposition(
            _character,
            this.defaultDisposition.passion + passionOffset,
            this.defaultDisposition.friendship + friendshipOffset,
            this.defaultDisposition.playfulness + playfulnessOffset,
            this.defaultDisposition.soulmate + soulmateOffset,
            this.defaultDisposition.familial + familialOffset,
            this.defaultDisposition.obsession + obsessionOffset,
            this.defaultDisposition.hate + hateOffset
        );
        return this;
    }

    hadSexWith(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return false;
        }
        return this.getSexCount(_character) > 0;
    }
    calculateChanceToFuck(_character, _ignoreLustAndRut = false) {
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;
        if (typeof _character == 'undefined')
            return 0;
        if (!_character.characterDisposition.has(this))
            return 0;
        if (typeof _ignoreLustAndRut != "boolean")
            _ignoreLustAndRut = false;
        
        if (PSDE.enableDebug) console.log("Calculating chance for {0} to fuck {1}.".format(_character.name, this.name));

        var chance = 0;
        var _disposition = _character.getCharacterDisposition(this);

        // Disposition
        if (_character.hadSexWith(this) && !_character.hasSibling(this)) {
            chance += _disposition.passion / 2 + (_character.getSexCount(this) * 3);
            chance += _disposition.friendship / 4;
        }
        else {
            chance += _disposition.passion / 3;
            chance += _disposition.friendship / 6;
        }
        chance += _disposition.soulmate / 2;
        chance += _disposition.obsession;
        chance -= _disposition.hate;

        if (PSDE.enableDebug) console.log("\tAfter disposition check: " + Math.ceil(chance));

        // Species Preferences
        if (_character.prefersSpecies.has(this.species))
            chance += 5
        else if (_character.avoidsSpecies.has(this.species))
            chance -= 5;

        if (_character.prefersPrey && this.predator == false || _character.prefersPredators && this.predator == true)
            chance += 5;

        if (_character.avoidsPrey && this.predator == false || _character.avoidsPredators && this.predator == true)
            chance -= 5;

        if (PSDE.enableDebug) console.log("\tAfter species preference check: " + Math.ceil(chance));

        // Sexual Orientation
        if (_character.sexualOrientation == 0 && this.getSex() != _character.getSex() || _character.sexualOrientation == 1 && this.getSex() == _character.getSex() || _character.sexualOrientation == 2)
            chance += 10;
        else
            chance -= 50;

        if (PSDE.enableDebug) console.log("\tAfter sexual preference check: " + Math.ceil(chance));

        if (!_ignoreLustAndRut) {
                // Rut and Lust
                if (_character.rut && _character.lust > 98)
                    chance += (_character.rut ? _character.lust/1.5 : _character.lust/2);
                else if (_character.lust > 89)
                    chance += (_character.rut ? _character.lust/2 : _character.lust/4);
                else if (_character.lust > 74)
                    chance += (_character.rut ? _character.lust/4 : _character.lust/8);
                else if (_character.lust > 59)
                    chance += (_character.rut ? _character.lust/8 : _character.lust/12);
                else if (_character.lust > 49)
                    chance += (_character.rut ? _character.lust/12 : _character.lust/16);
                else
                    chance += (_character.rut ? _character.lust/16 : _character.lust/20);
        
                if (PSDE.enableDebug) console.log("\tAfter rut and lust check: " + Math.ceil(chance));
        }

        // Exhibitionism
        if (PSDE.getCharacterCurrentRoom(this) instanceof Room) {
            if (this.room.characters.size > 2){
                if (_character.exhibitionism > 0)
                    chance += ((_character.exhibitionism / 5) * (PSDE.getCharacterCurrentRoom(this).characters.size - 2));
                else {
                    PSDE.getCharacterCurrentRoom(this).characters.forEach(function(_this) {
                        if (_this != _character.this && _this != this)
                            chance += _character.hadSexWith(_this) ? 5 : -5;
                    }, this);
                }
            }
        }

        if (PSDE.enableDebug) console.log("\tAfter Exhibitionism check: " + Math.ceil(chance));

        // Incest
        if (_character.hasSibling(this)) {
            if (_character.incestual > 66)
                chance += _disposition.familial / 3 + (_character.getSexCount(this) * 2);
            else if (_character.incestual > 33)
                chance += _disposition.familial / 4 + (_character.getSexCount(this));
            else if (_character.incestual > 0)
                chance += _disposition.familial / 5 + (_character.getSexCount(this));
            else
                chance -= 50;
        }

        if (PSDE.enableDebug) console.log("\tAfter incest check: " + Math.ceil(chance));

        // Intoxication
        chance += _character.intoxication/2.5;

        if (PSDE.enableDebug) console.log("\tAfter intoxication check: " + Math.ceil(chance));

        // Somnophilia
        if (_character.isSleeping()) {
            if (PSDE.enableRape)
                chance = 100;
            else if (_character.somnophilia > 50 && _character.hadSexWith(this) && _disposition.passion > 75)
                chance += 10;
        }

        if (PSDE.enableDebug) console.log("\tAfter Somnophilia check: " + Math.ceil(chance));

        return Math.ceil(chance);
    }

    toString(_useSingularPossesiveName = false) {
        var _blob = "";
        if (typeof this.image !== 'undefined') {
            _blob += "<img class='text-center' style='border:0.1em solid white; background-color:white; border-radius:0.5em;' src='{0}' alt=''/><br/>".format(this.image);
        }
        _blob += "<div class='text-center'>{0}</div>".format(this.name);
        _blob += "<p>{0} year old {1} {2}.</p>".format(this.age, (this.gender ? "female" : "male"), this.species);

        return "<a data-toggle=\"tooltip\" data-placement=\"left\" data-html=\"true\" title=\"{0}\">{1}</a>".format(_blob.replace(/\"/g, '\\"'), _useSingularPossesiveName ? this.singularPossesiveName() : this.name);
    }
}

/**
 * Class that represents all Location(s)
 */
class Location {
    /**
     * Creates a Location
     * @param  {String} _id          Unique ID
     * @param  {String} _name        Name
     * @param  {String} _description Description
     * @param  {String} _image       Image path or base64
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _type = undefined) {
        if (_id instanceof Location) {
            this.id = _id.id;
            delete _id["id"];
            this.name = _id.name;
            delete _id["name"];
            
            for (var property in _id) {
                if (_id.hasOwnProperty(property)) {
                    this[property] = _id[property];
                }
            }
        }
        else {
            this.id = _id;
            this.name = _name;
            this.description = _description;
            
            this.owner = new Set();
            this.cells = new Set();
            this.rooms = new Set();

            this.image = _image;

            this.setType(_type);

            this.floorImage = undefined;

            PSDE.locations.set(_id, this);
        }
    }
    
    fromJSON(jsonString = "") {
        if (PSDE.enableDebug) console.log("Running fromJSON");
        
        if (typeof jsonString != "string") {
            if (PSDE.enableDebug) console.log("Parameter `jsonString` is not a string.");
            return undefined;
        }
        
        if (typeof jsonString == "string") {
            try {
                var json = JSON.parse(jsonString);
            }
            catch (e) {
                if (PSDE.enableDebug) console.log("Parameter `jsonString` could not be parsed to JSON.");
                return undefined;
            }
        }
        
        if (typeof json["id"] == "undefined" || typeof json["name"] == undefined) {
            if (PSDE.enableDebug) console.log("ID or Name are undefined.");
            return undefined;
        }
        else
            this.id = json["id"];
        delete json["id"];
        
        var _tmpArr = [];
        
        // Sets
        //  owner
        try {
            var _tmpSet = new Set(JSON.parse(json["owner"]));
            _owner.forEach(function(_character) {
                if (PSDE.characters.has(_character)) {
                    _tmSet.delete(_character);
                    this.owner.add(PSDE.getCharacterByID(_character));
                }
            }, this);
        } catch (e) {}
        delete json["owner"];
        
        // Entities
        delete json["rooms"];
        delete json["cells"];
        
        // Primitives
        for (var property in json) {
            if (this.hasOwnProperty(property)) {
                if (json[property] == null)
                    this[property] = undefined;
                else
                    this[property] = json[property];
            }
        }
    }

    isOwner(_character) {
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;

        if (_character instanceof Character)
            return this.owner.has(_character);
        else
            return false;
    }
    getOwner(_index) {
        if (isNaN(_index) || _index < 0 || _index > this.owner.size)
            _index = 0;
        return Array.from(this.owner)[_index];
    }
    addOwner(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return this;
        }
        if (_character instanceof Character)
            this.owner.add(_character);
        else if (_character instanceof Set || _character instanceof Array) {
            _character.forEach(function(__character) {
                this.addOwner(__character);
            }, this);
        }
        return this;
    }
    setOwner(_character) {
        this.clearOwner();
        this.addOwner(_character);
        return this;
    }
    clearOwner() {
        this.owner.clear();
        return this;
    }
    ownerToString() {
        if (this.owner.size == 0)
            return "";
        else if (this.owner.size == 1) {
            if (this.owner.values().next().value instanceof Character)
                return this.owner.values().next().value.toString(true);
            else
                return "";
        }
        else if (this.owner.size == 2) {
            var _arr = Array.from(this.owner);

            if (_arr[0] instanceof Character && _arr[1] instanceof Character)
                return "{0} and {1}".format(_arr[0].toString(), _arr[1].toString(true));
            else
                return "";
        }
        else {
            var _blob = "";
            var _arr = Array.from(this.owner);

            for (var i = 0; i < _arr.length - 1; i++) {
                _blob += _arr[i].toString();
                if (_arr.length > 2)
                    _blob += ", ";
            }
            _blob += " and " + _arr[_arr.length - 1].toString(true);

            return _blob;
        }
    }

    setType(_type) {
        if (PSDE.kLocationTypes.has(_type))
            this.type = _type;
        else
            this.type = "general";
        return this;
    }

    addCell(_cell) {
        this.cells.add(_cell);
        return this;
    }
    removeCell(_cell) {
        if (this.cells.has(_cell))
            this.cells.delete(_cell);
        return this;
    }

    addRoom(_room) {
        this.rooms.add(_room);
        return this;
    }
    removeRoom(_room) {
        if (this.rooms.has(_room))
            this.rooms.delete(_room);
        return this;
    }

    containsCharacter(_character) {
        if (!(_character instanceof Character)) {
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return false;
        }

        var _containsCharacter = false;

        if (this.rooms.size > 0) {
            Array.from(this.rooms).some(function(_room) {
                if (_room.containsCharacter(_character))
                    _containsCharacter = true;
            }, this);
        }

        if (this.cells.size > 0) {
            Array.from(this.cells).some(function(_cell) {
                if (_cell.containsCharacter(_character))
                    _containsCharacter = true;
            }, this);
        }

        return _containsCharacter;
    }
}
/**
 * Class that represents all Cell(s)
 */
class Cell {
    /**
     * Creates a Cell
     * @param  {String} _id       Unique ID
     * @param  {String} _name     Name
     * @param  {String} _location Location
     */
    constructor(_id = undefined, _name = undefined, _location = undefined) {
        if (_id instanceof Cell) {
            this.id = _id.id;
            delete _id["id"];
            this.name = _id.name;
            delete _id["name"];
            
            for (var property in _id) {
                if (_id.hasOwnProperty(property)) {
                    this[property] = _id[property];
                }
            }
        }
        else {
            this.id = _id;
            this.name = _name;
            
            this.location = undefined;
            this.setLocation(_location);
            this.grid = []; // <X,Y> = Room
            this.rooms = new Set();
            this.cells = new Set();
            this.gateways = new Set();

            this.floorImage = undefined; // for minimap
            this.backgroundImage = undefined; // for minimap
            this.backgroundColor = undefined; // for minimap

            PSDE.cells.set(_id, this);
        }
    }

    addRoom(_room, x, y) {
        if (!(_room instanceof Room))
            _room = PSDE.rooms.has(_room) ? PSDE.rooms.get(_room) : undefined;

        this.rooms.add(_room);

        if (typeof x != 'undefined' && typeof y != 'undefined')
            this.setRoom(_room, x, y);
        return this;
    }
    setRoom(_room, x, y) {
        if (!(_room instanceof Room))
            _room = PSDE.rooms.has(_room) ? PSDE.rooms.get(_room) : undefined;

        if (PSDE.enableDebug) console.log("\tSetting " + _room.id + " to <" + x + "," + y + ">");

        if (this.grid[x] === undefined)
            this.grid[x] = [];

        this.grid[x][y] = _room;
        return this;
    }

    setLocation(_location) {
        if (!(_location instanceof Location))
            _location = PSDE.locations.has(_location) ? PSDE.locations.get(_location) : undefined;

        this.location = _location;

        if (this.location instanceof Location)
            this.location.addCell(this);
        return this;
    }

    containsCharacter(_character) {
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;

        var _containsCharacter = false;

        this.rooms.forEach(function(_room) {
            if (_room.containsCharacter(_character))
                _containsCharacter = true;
        }, this);

        return _containsCharacter;
    }
    hasCharacter(_character) {
        return this.containsCharacter(_character);
    }

    containsCharacters() {
        var _containsCharacters = false;

        this.rooms.forEach(function(_room) {
            if (_room.containsCharacters())
                _containsCharacters = true;
        }, this);

        return _containsCharacters;
    }
    hasCharacters() {
        return this.containsCharacters();
    }

    getCharacters() {
        var _characters = Set();

        this.rooms.forEach(function(_room) {
            _room.characters.forEach(function(_character) {
                _characters.add(_character);
            }, this);
        }, this);

        return _characters;
    }
}
/**
 * Class that represents all Room(s)
 */
class Room {
    /**
     * Creates a new room
     * @param {String} _id Unique ID
     * @param {String} _sid Non-Unique ID (Optional)
     * @param {String} _name Display name
     * @param {String} _type roomType
     * @param {Cell} _cell Cell
     * @param {Location} _location Secondary Location
     */
    constructor(_id = undefined, _sid = undefined, _name = undefined, _type = "hallway", _cell = undefined, _location = undefined) {
        if (_id instanceof Room) {
            this.id = _id.id;
            delete _id["id"];
            this.name = _id.name;
            delete _id["name"];
            
            for (var property in _id) {
                if (_id.hasOwnProperty(property)) {
                    this[property] = _id[property];
                }
            }
        }
        else {
            this.id = _id;
            this.name = _name;
            
            /*
                Super ID; to be modified when there's conjoined Rooms that make up a single 'Room' and I don't want to create character interactions for each part.
            */
            if (typeof _sid == 'undefined')
                _sid = _id;
            this.sid = _sid;

            /*
                attachedRooms is a Map of an int and an array;
                    the int represents one of the six cardinal directions, starting at north: 0, down: 4, up: 5
                    the array represents the Room of the attached room, and a boolean of whether or not the room is locked

                Map<int, [Room, boolean]>
            */
            this.attachedRooms = new Map();
            this.roomsOptions = new Map();

            /*
                For adding facades to the minimap
                Map<int, blob>
            */
            this.directionsFacades = new Map();

            this.characters = new Set();

            this.furniture = new Set();

            this.x = undefined;
            this.y = undefined;
            this.mappedToGrid = false;


            this.setCell(_cell);
            this.setLocation(_location);

            this.northSide = 3;
            this.eastSide = 3;
            this.southSide = 3;
            this.westSide = 3;
            this.setType(_type);

            this.isSecret = false;

            this.floorImage = undefined;
            this.rugImage = undefined;
            this.stairsUpImage = undefined;
            this.stairsDownImage = undefined;

            PSDE.rooms.set(_id, this);
        }
    }
    
    toString() {
        var _blob = "";
        if (typeof this.image !== 'undefined') {
            _blob += "<img class='text-center' style='border:0.1em solid white; background-color:white; border-radius:0.5em;' src='{0}' alt=''/><br/>".format(this.image);
        }
        _blob += "<div class='text-center'>{0}</div>".format(this.name);
        
        if (typeof this.description != 'undefined')
            _blob += "<p>{0}</p>".format(this.description);
        else if (this instanceof Character) {
            _blob += "<p>{0} year old {1} {2}.</p>".format(this.age, (this.gender ? "female" : "male"), this.species);
        }
        
        return "<a data-toggle=\"tooltip\" data-placement=\"left\" data-html=\"true\" title=\"{0}\">{1}</a>".format(_blob.replace(/\"/g, '\\"'), this.name);
    }

    setLocation(_location) {
        if (!(_location instanceof Location))
            _location = PSDE.locations.has(_location) ? PSDE.locations.get(_location) : undefined;
        if (typeof _location == 'undefined' && this.cell instanceof Cell && this.cell.location instanceof Location)
            _location = this.cell.location;
        this.location = _location;
        if (this.location instanceof Location)
            this.location.addRoom(this);
        return this;
    }
    setCell(_cell) {
        if (!(_cell instanceof Cell))
            _cell = PSDE.cells.has(_cell) ? PSDE.cells.get(_cell) : undefined;
        this.cell = _cell;
        if (this.cell instanceof Cell)
            this.cell.addRoom(this, this.x, this.y);
        return this;
    }

    setType(_type) {
        if (PSDE.kRoomTypes.has(_type))
            this.type = _type;
        else
            this.type = "hallway";
        return this;
    }

    addCharacter(_character) {
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;
        this.characters.add(_character);
        return this;
    }
    removeCharacter(_character) {
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;
        this.characters.delete(_character);
        return this;
    }

    containsCharacter(_character) {
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;
        return this.characters.has(_character);
    }
    hasCharacter(_character) {
        return this.containsCharacter(_character);
    }

    containsCharacters() {
        return this.characters.size > 0;
    }
    hasCharacters() {
        return this.containsCharacters();
    }

    /**
     * Hides this room from the room specified.
     *
     * @param Room _room
     *
     *
     * Modifies the specified Room's directional side (northSide, eastSide, ...,) and its roomsOptions
     */
    hide(_room) {
        if (_room instanceof Room)
            _room = this.attachedRooms.flip().has(_room) ? _room : undefined;
        else if (_room >= 0 && _room < 7)
            _room = this.attachedRooms.has(_room) ? this.attachedRooms.get(_room) : undefined;

        if (typeof _room == 'undefined')
            return;

        var _roomDirectionNumber = _room.attachedRooms.flip().get(this);
        if (typeof _roomDirectionNumber == 'number') {
            switch (_roomDirectionNumber) {
                case 0: {
                    _room.northSide = 2;
                    break;
                }
                case 1: {
                    _room.eastSide = 2;
                    break;
                }
                case 2: {
                    _room.southSide = 2;
                    break;
                }
                case 3: {
                    _room.westSide = 2;
                    break;
                }
            }
        }

        var _options = _room.roomsOptions.get(this);
        _options['isHidden'] = true;
        _room.roomsOptions.set(this, _options);
        return this;
    }
    /**
     * Lock this room from the room specified.
     *
     * @param Room _room
     *
     *
     * Modifies the specified Room's directional side (northSide, eastSide, ...,) and its roomsOptions
     */
    lock(_room) {
        if (_room instanceof Room)
            _room = this.attachedRooms.flip().has(_room) ? _room : undefined;
        else if (_room >= 0 && _room < 7)
            _room = this.attachedRooms.has(_room) ? this.attachedRooms.get(_room) : undefined;

        if (typeof _room == 'undefined')
            return;

        var _roomDirectionNumber = _room.attachedRooms.flip().get(this);
        if (typeof _roomDirectionNumber == 'number') {
            switch (_roomDirectionNumber) {
                case 0: {
                    _room.northSide = 2;
                    break;
                }
                case 1: {
                    _room.eastSide = 2;
                    break;
                }
                case 2: {
                    _room.southSide = 2;
                    break;
                }
                case 3: {
                    _room.westSide = 2;
                    break;
                }
            }
        }

        var _options = _room.roomsOptions.get(this);
        _options['isLocked'] = true;
        _room.roomsOptions.set(this, _options);
        return this;
    }
    /**
     * Unlock this room from the room specified.
     *
     * @param Room _room
     *
     *
     * Modifies the specified Room's directional side (northSide, eastSide, ...,) and its roomsOptions
     */
    unlock(_room) {
        if (_room instanceof Room)
            _room = this.attachedRooms.flip().has(_room) ? _room : undefined;
        else if (_room >= 0 && _room < 7)
            _room = this.attachedRooms.has(_room) ? this.attachedRooms.get(_room) : undefined;

        if (typeof _room == 'undefined')
            return;

        var _roomDirectionNumber = _room.attachedRooms.flip().get(this);
        if (typeof _roomDirectionNumber == 'number') {
            switch (_roomDirectionNumber) {
                case 0: {
                    _room.northSide = 1;
                    break;
                }
                case 1: {
                    _room.eastSide = 1;
                    break;
                }
                case 2: {
                    _room.southSide = 1;
                    break;
                }
                case 3: {
                    _room.westSide = 1;
                    break;
                }
            }
        }

        var _options = _room.roomsOptions.get(this);
        _options['isLocked'] = false;
        _room.roomsOptions.set(this, _options);
        return this;
    }
    /**
     * Unlock this room from the room specified.
     *
     * @param Room _room
     *
     *
     * Modifies the specified Room's directional side (northSide, eastSide, ...,) and its roomsOptions
     */
    unhide(_room) {
        if (_room instanceof Room)
            _room = this.attachedRooms.flip().has(_room) ? _room : undefined;
        else if (_room >= 0 && _room < 7)
            _room = this.attachedRooms.has(_room) ? this.attachedRooms.get(_room) : undefined;

        if (typeof _room == 'undefined')
            return;

        var _roomDirectionNumber = _room.attachedRooms.flip().get(this);
        if (typeof _roomDirectionNumber == 'number') {
            switch (_roomDirectionNumber) {
                case 0: {
                    _room.northSide = 1;
                    break;
                }
                case 1: {
                    _room.eastSide = 1;
                    break;
                }
                case 2: {
                    _room.southSide = 1;
                    break;
                }
                case 3: {
                    _room.westSide = 1;
                    break;
                }
            }
        }

        var _options = _room.roomsOptions.get(this);
        _options['isHidden'] = false;
        _room.roomsOptions.set(this, _options);
        return this;
    }

    setAttachedRoom(_direction, _room, _options = {}, _updateParent = false) {
        if (!(_room instanceof Room))
            _room = PSDE.rooms.has(_room) ? PSDE.rooms.get(_room) : undefined;

        if (PSDE.enableDebug) console.log("\tAttempting to attach " + _room.id + " to the " + (_direction == 0 ? "north" : (_direction == 1 ? "east" : (_direction == 2 ? "south" : "west"))) + " of " + this.id);

        this.attachedRooms.set(_direction, _room);

        // Formerly addRoom
        if (_options instanceof Object) {
            if (typeof _options['isLocked'] != 'undefined') {
                if (_options['isLocked'] == true)
                    _options['isLocked'] = true;
                else
                    _options['isLocked'] = false;
            }
            else
                _options['isLocked'] = false;
        }
        else
            _options['isLocked'] = _options === true;
        this.roomsOptions.set(_room, _options);

        // If there's nothing on the grid yet, this will be 0,0
        if (this.cell.grid.length == 0) {
            this.x = 0;
            this.y = 0;
            this.cell.setRoom(this, this.x, this.y);
            this.mappedToGrid = true;
        }

        if (_room.cell != this.cell) {
            this.gateway = true;
            this.cell.gateways.add(this);

            this.cell.cells.add(_room.cell);
        }

        switch(_direction) {
            case 0 : {
                if (this.roomsOptions.get(_room)['isLocked'])
                    this.northSide = 2;
                else if (this.type == _room.type)
                    this.northSide = 0;
                else
                    this.northSide = 1;

                if (!_room.mappedToGrid && this.x !== undefined && this.y !== undefined) {
                    _room.x = this.x;
                    _room.y = this.y + 1;
                    _room.mappedToGrid = true;
                    this.cell.setRoom(_room, _room.x, _room.y)
                }

                break;
            }
            case 1 : {
                if (this.roomsOptions.get(_room)['isLocked'])
                    this.eastSide = 2;
                else if (this.type == _room.type)
                    this.eastSide = 0;
                else
                    this.eastSide = 1;

                if (!_room.mappedToGrid && this.x !== undefined && this.y !== undefined) {
                    _room.x = this.x + 1;
                    _room.y = this.y;
                    _room.mappedToGrid = true;
                    this.cell.setRoom(_room, _room.x, _room.y)
                }

                break;
            }
            case 2 : {
                if (this.roomsOptions.get(_room)['isLocked'])
                    this.southSide = 2;
                else if (this.type == _room.type)
                    this.southSide = 0;
                else
                    this.southSide = 1;

                if (!_room.mappedToGrid && this.x !== undefined && this.y !== undefined) {
                    _room.x = this.x;
                    _room.y = this.y - 1;
                    _room.mappedToGrid = true;
                    this.cell.setRoom(_room, _room.x, _room.y)
                }

                break;
            }
            case 3 : {
                if (this.roomsOptions.get(_room)['isLocked'])
                    this.westSide = 2;
                else if (this.type == _room.type)
                    this.westSide = 0;
                else
                    this.westSide = 1;

                if (!_room.mappedToGrid && this.x !== undefined && this.y !== undefined) {
                    _room.x = this.x - 1;
                    _room.y = this.y;
                    _room.mappedToGrid = true;
                    this.cell.setRoom(_room, _room.x, _room.y)
                }

                break;
            }
        }

        if (_updateParent) {
            var _inversedDirection = 6;
            var __options = {};

            switch (_direction) {
                case 0: {
                    _inversedDirection = 2;
                    break;
                }
                case 1: {
                    _inversedDirection = 3;
                    break;
                }
                case 2: {
                    _inversedDirection = 0;
                    break;
                }
                case 3: {
                    _inversedDirection = 1;
                    break;
                }
                case 4: {
                    _inversedDirection = 5;
                    break;
                }
                case 5: {
                    _inversedDirection = 4;
                    break;
                }
                default: {
                    _inversedDirection = 6;
                }
            }

            if (_inversedDirection < 6)
                _room.setAttachedRoom(_inversedDirection, this, __options);
        }
        return this;
    }
    setNorthRoom(_room, _options = undefined, _updateParent = true) {
        this.setAttachedRoom(0, _room, _options, _updateParent);
        return this;
    }
    setEastRoom(_room, _options = undefined, _updateParent = true) {
        this.setAttachedRoom(1, _room, _options, _updateParent);
        return this;
    }
    setSouthRoom(_room, _options = undefined, _updateParent = true) {
        this.setAttachedRoom(2, _room, _options, _updateParent);
        return this;
    }
    setWestRoom(_room, _options = undefined, _updateParent = true) {
        this.setAttachedRoom(3, _room, _options, _updateParent);
        return this;
    }
    setDownRoom(_room, _options = undefined, _updateParent = true) {
        this.setAttachedRoom(4, _room, _options, _updateParent);
        return this;
    }
    setUpRoom(_room, _options = undefined, _updateParent = true) {
        this.setAttachedRoom(5, _room, _options, _updateParent);
        return this;
    }
    unsetAttachedRoom(_direction, _updateParent = true, _unsetRoom = false) {
        switch(_direction) {
            case 0 : {
                this.northSide = 3;
                break;
            }
            case 1 : {
                this.eastSide = 3;
                break;
            }
            case 2 : {
                this.southSide = 3;
                break;
            }
            case 3 : {
                this.westSide = 3;
                break;
            }
        }

        if (this.attachedRooms.get(_direction).cell != this.cell) {
            this.gateway = false;
            this.cell.gateways.delete(this);

            this.cell.cells.delete(this.attachedRooms.get(_direction).cell);
        }

        if (_updateParent) {
            var inversedDirection = 4;

            switch (_direction) {
                case 0: {
                    inversedDirection = 2;
                    break;
                }
                case 1: {
                    inversedDirection = 3;
                    break;
                }
                case 2: {
                    inversedDirection = 0;
                    break;
                }
                case 3: {
                    inversedDirection = 1;
                    break;
                }
                case 4: {
                    inversedDirection = 5;
                    break;
                }
                case 5: {
                    inversedDirection = 4;
                    break;
                }
                default: {
                    inversedDirection = 6;
                }
            }

            if (this.attachedRooms.get(_direction).cell != this.cell) {
                this.attachedRooms.get(_direction).gateway = false;
                this.attachedRooms.get(_direction).cell.gateways.delete(this.attachedRooms.get(_direction));

                this.attachedRooms.get(_direction).cell.cells.delete(this.cell);
            }

            if (inversedDirection < 6)
                this.attachedRooms.get(_direction).unsetAttachedRoom(inversedDirection);
        }

        this.attachedRooms.delete(_direction);

        if (_unsetRoom)
            this.unsetRoom(this.attachedRooms.get(_direction));
        return this;
    }
    unsetNorthRoom(_updateParent = true) {
        this.unsetAttachedRoom(0, _updateParent);
        return this;
    }
    unsetEastRoom(_updateParent = true) {
        this.unsetAttachedRoom(1, _updateParent);
        return this;
    }
    unsetSouthRoom(_updateParent = true) {
        this.unsetAttachedRoom(2, _updateParent);
        return this;
    }
    unsetWestRoom(_updateParent = true) {
        this.unsetAttachedRoom(3, _updateParent);
        return this;
    }
    unsetDownRoom(_updateParent = true) {
        this.unsetAttachedRoom(4, _updateParent);
        return this;
    }
    unsetUpRoom(_updateParent = true) {
        this.unsetAttachedRoom(5, _updateParent);
        return this;
    }
    clearAttachedRooms() {
        this.attachedRooms.clear();
        return this;
    }

    getDownRoom() {
        return this.attachedRooms.get(4);
    }
    getUpRoom() {
        return this.attachedRooms.get(5);
    }

    hasDownRoom() {
        return this.attachedRooms.has(4);
    }
    hasUpRoom() {
        return this.attachedRooms.has(5);
    }

    setNorthWall(wallType, updateParent = true) {
        this.northSide = wallType;
        if (updateParent && this.attachedRooms.has(0) && this.attachedRooms.get(0) instanceof Room)
            this.attachedRooms.get(0).setSouthWall(wallType, false);
        return this;
    }
    setEastWall(wallType, updateParent = true) {
        this.eastSide = wallType;
        if (updateParent && this.attachedRooms.has(1) && this.attachedRooms.get(1) instanceof Room)
            this.attachedRooms.get(1).setWestWall(wallType, false);
        return this;
    }
    setSouthWall(wallType, updateParent = true) {
        this.southSide = wallType;
        if (updateParent && this.attachedRooms.has(2) && this.attachedRooms.get(2) instanceof Room)
            this.attachedRooms.get(2).setNorthWall(wallType, false);
        return this;
    }
    setWestWall(wallType, updateParent = true) {
        this.westSide = wallType;
        if (updateParent && this.attachedRooms.has(3) && this.attachedRooms.get(3) instanceof Room)
            this.attachedRooms.get(3).setEastWall(wallType, false);
        return this;
    }
    setWalls(_northWallType = 3, _eastWallType = undefined, _southWallType = undefined, _westWallType = undefined, updateParent = true) {
        if (typeof _eastWallType == 'undefined') {
            _eastWallType = _northWallType;
            _southWallType = _northWallType;
            _westWallType = _northWallType;
        }
        if (typeof _northWallType != 'undefined')
            this.setNorthWall(_northWallType, updateParent);
        if (typeof _eastWallType != 'undefined')
            this.setEastWall(_eastWallType, updateParent);
        if (typeof _southWallType != 'undefined')
            this.setSouthWall(_southWallType, updateParent);
        if (typeof _westWallType != 'undefined')
            this.setWestWall(_westWallType, updateParent);
        return this;
    }

    setFacade(_direction, _image) {
        this.directionsFacades.set(_direction, _image);
        return this;
    }
    setOwnFacade(_image) {
        this.setFacade(-1, _image);
        return this;
    }
    setNorthFacade(_image) {
        this.setFacade(0, _image);
        return this;
    }
    setEastFacade(_image) {
        this.setFacade(1, _image);
        return this;
    }
    setSouthFacade(_image) {
        this.setFacade(2, _image);
        return this;
    }
    setWestFacade(_image) {
        this.setFacade(3, _image);
        return this;
    }

    addFurniture(_furniture) {
        var _addedFurniture = false;
        if (!(_furniture instanceof Furniture)) {
            if (_furniture instanceof Array) {
                _furniture.forEach(function(__furniture) {
                    this.addFurniture(__furniture);
                }, this);
                return _addedFurniture;
            }
            else
                _furniture = PSDE.furniture.get(_furniture);
        }

        PSDE.setFurnitureRoom(_furniture, this);
        this.furniture.add(_furniture);
        return this;
    }
    removeFurniture(_furniture) {
        if (!(_furniture instanceof Furniture))
            _furniture = PSDE.furniture.get(_furniture);

        _furniture.room = undefined;
        PSDE.removeFurnitureRoom(_furniture, this);
        this.furniture.delete(_furniture);
        return this;
    }

    containsFurniture(_furniture) {
        if (!(_furniture instanceof Furniture))
            _furniture = PSDE.furniture.get(_furniture);

        return this.furniture.has(_furniture);
    }
    hasFurniture(_furniture) {
        return this.containsFurniture;
    }

    hasFurnitureType(_type) {
        if (!furnitureType.has(_type))
            return false;
        
        var _hasFurniture = false;
        
        if (this.furniture.size > 3) {
            Array.from(this.furniture).some(function(_furniture) {
                if (_furniture.type == _type) {
                    _hasFurniture = true;
                    return true;
                }
            }, this);
        }
        else {
            this.furniture.forEach(function(_furniture) {
                if (_furniture.type == _type)
                    _hasFurniture = true;
            }, this);
        }
        
        return _hasFurniture;
    }

    /**
     * Returns the first available instance of Furniture in the room that can fit the character. References their bodySize.
     * @param Character _character The character to be referenced against
     * @param boolean _considerCharacterPreferences Considers a character's preferences for resting on furniture instead of choosing the first one available
     * @param boolean _lay If true, the results of bodySize are multiplied by two, as the Character would be taking up double the space.
     * @param Array _furnitureTypePreferences I forgot. 2017/09/06
     *
     * @return An instance of Furniture in the room, or undefined if none available found.
     */
    getFurnitureToRestOn(_character, _considerCharacterPreferences = false, _lay = false, _furnitureTypePreferences = []) {
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;

        if (_character instanceof Character) {
            var _requiredSpaceMultiplier = _lay ? 2 : 1;
            var _placeToRest = undefined;

            if (_considerCharacterPreferences && typeof _character.preferredSeatType != 'undefined') {
                var _seats = [];

                this.furniture.forEach(function(_furniture) {
                    if (_furniture.availableSeatingSpace() >= (_character.bodySize * _requiredSpaceMultiplier))
                        _seats.push(_furniture);
                }, this);

                if (_seats.length > 0) {
                    if (_seats.length == 1)
                        _placeToRest = _seats[0];
                    else {
                        _placeToRest = _seats.some(function(_furniture) {
                            if (_considerCharacterPreferences && _furniture.type == this._character.prefferedSeatType) {
                                _placeToRest = _furniture;
                                return true;
                            }
                        }, this);

                        if (!(_placeToRest instanceof Furniture))
                            _placeToRest = _seats[0];
                    }
                }
            }
            else {
                Array.from(this.furniture).some(function(_furniture) {
                    if (_furniture.availableSeatingSpace() >= (_character.bodySize * _requiredSpaceMultiplier)) {
                        _placeToRest = _furniture;
                        return true;
                    }
                });
            }

            return _placeToRest;
        }
    }

    containsFurniture() {
        return this.furniture.size > 1;
    }
    hasFurniture() {
        return this.containsFurniture();
    }

    isHidden(_direction = undefined) {
        if (_direction instanceof Room) {
            if (this.attachedRooms.flip().has(_direction)) {
                if (this.roomsOptions.get(_direction)['isHidden'])
                    return true;
                // Why I bothered to check if the direction coming IN from the outside is locked, when you're already inside, is beyond me.
                //else if (typeof _direction.roomsOptions.get(this) !== 'undefined' && _direction.roomsOptions.get(this)['isLocked'])
                //    return true;
                else
                    return false;
            }
            else
                return false;
        }
        else {
            if (this.attachedRooms.has(_direction) && this.attachedRooms.get(_direction) instanceof Room) {
                _direction = this.attachedRooms.get(_direction);
                if (this.attachedRooms.flip().has(_direction)) {
                    if (this.roomsOptions.get(_direction)['isHidden'])
                        return true;
                    // See previous note
                    //else if  (_direction.roomsOptions.get(this)['isLocked'])
                    //    return true;
                    else
                        return false;
                }
                else
                    return false;
            }
            else
                return false;
        }
    }
    isLocked(_direction = undefined) {
        if (_direction instanceof Room) {
            if (this.attachedRooms.flip().has(_direction)) {
                if (this.roomsOptions.get(_direction)['isLocked'])
                    return true;
                // Why I bothered to check if the direction coming IN from the outside is locked, when you're already inside, is beyond me.
                //else if (typeof _direction.roomsOptions.get(this) !== 'undefined' && _direction.roomsOptions.get(this)['isLocked'])
                //    return true;
                else
                    return false;
            }
            else
                return false;
        }
        else {
            if (this.attachedRooms.has(_direction) && this.attachedRooms.get(_direction) instanceof Room) {
                _direction = this.attachedRooms.get(_direction);
                if (this.attachedRooms.flip().has(_direction)) {
                    if (this.roomsOptions.get(_direction)['isLocked'])
                        return true;
                    // See previous note
                    //else if  (_direction.roomsOptions.get(this)['isLocked'])
                    //    return true;
                    else
                        return false;
                }
                else
                    return false;
            }
            else
                return false;
        }
    }
}

/**
 * Class that represents all Item(s)
 * @extends {Entity}
 */
class Item extends Entity {
    /**
     * Creats an Item
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _image       Image path of base64
     * @param  {Boolean} _plural      Whether or not the item is plural
     * @param  {Set}     _specialProperties Set of PSDE.kSpecialProperties
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _plural = false, _specialProperties = undefined, _defaultPrice = 0, _defaultWeight = 0.001, _defaultDurability = 1) {
        if (_id instanceof Item) {
            super(_id.id, _id._name);
            for (var property in _id) {
                if (_id.hasOwnProperty(property)) {
                    this[property] = _id[property];
                }
            }
        }
        else {
            super(_id, _name, _description, _image);

            this.addAvailableAction("put");
            this.addAvailableAction("take");
            this.addAvailableAction("hold");

            this.addSpecialProperty(_specialProperties);

            if (typeof _plural != "boolean")
                _plural = false;
            this.plural = _plural;

            if (typeof _specialProperties == "string" || _specialProperties instanceof Array)
                this.addSpecialProperty(_specialProperties);

            /**
             * Weight
             * @type {Number} 0.001 to Number.MAX_SAFE_INTEGER
             */
            this.defaultWeight = _defaultWeight;
            /**
             * Price
             * @type {Number} 0 to Number.MAX_SAFE_INTEGER
             */
            this.defaultPrice = _defaultPrice;
            /**
             * Durability of an entity
             * @type {Number} 0 to Number.MAX_SAFE_INTEGER
             */
            this.defaultDurability = _defaultDurability;
            this.defaultDurabilityMax = _defaultDurability;
        }

        PSDE.items.set(_id, this);
    }

    delete() {
        PSDE.items.delete(this.id);
        super.delete();
        return undefined;
    }
}

class BodyPart extends Item {
    constructor(_id, _name = undefined) {
        if (PSDE.bodyParts.has(_id))
            return PSDE.bodyParts.get(_id);
        super(_id, _name);
        this.setType(_id);
        PSDE.bodyParts.set(_id, this);
    }

    setType(_type) {
        if (PSDE.kBodyPartTypes.has(_type))
            this.type = _type;
        else
            this.type = "appendix";
        return this;
    }
    getType() {
        return this.type;
    }

    delete() {
        PSDE.bodyParts.delete(this.id);
        super.delete();
        return undefined;
    }
}

/**
 * Class that represents all Key(s)
 * @extends {Item}
 */
class Key extends Item {
    /**
     * Creats a Kay
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _image       Image path of base64
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _plural = undefined, _specialProperties = undefined) {
        if (_id instanceof Key) {
            super(_id.id, _id._name);
            for (var property in _id) {
                if (_id.hasOwnProperty(property)) {
                    this[property] = _id[property];
                }
            }
        }
        else {
            super(_id, _name, _description, _image, _plural, _specialProperties);
        }

        PSDE.keys.set(_id, this);
    }

    delete() {
        PSDE.keys.delete(this.id);
        super.delete();
        return undefined;
    }
}
/**
 * Class that represents all Clothing
 * @extends {Item}
 */
class Clothing extends Item {
    /**
     * Creats Clothing
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _image       Image path of base64
     * @param  {String}  _type        clothingType
     * @param  {Boolean} _plural      Whether or not the item is plural
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _type = "shirt", _plural = false) {
        if (_id instanceof Clothing) {
            super(_id.id, _id._name);
            for (var property in _id) {
                if (_id.hasOwnProperty(property)) {
                    this[property] = _id[property];
                }
            }
        }
        else {
            super(_id, _name, _description, _image, _plural);

            this.addAvailableAction("wear");
            this.addAvailableAction("remove");

            this.setType(_type);
        }

        PSDE.clothing.set(_id, this);
    }

    setType(_type) {
        if (PSDE.kClothingTypes.has(_type))
            this.type = _type;
        else
            this.type = "shirt";
        return this;
    }

    delete() {
        PSDE.clothing.delete(this.id);
        super.delete();
        return undefined;
    }
}
/**
 * Class that represents all Consumable(s)
 * @extends {Item}
 */
class Consumable extends Item {
    /**
     * Creats a Consumable
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _type        consumableType
     * @param  {String}  _image       Image path of base64
     * @param  {Boolean} _plural      Whether or not the item is plural
     * @param  {Stromg}  _specialProperties  specialProperties
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _type = "food", _plural = false, _specialProperties = undefined) {
        if (_id instanceof Consumable) {
            super(_id.id, _id._name);
            for (var property in _id) {
                if (_id.hasOwnProperty(property))
                    this[property] = _id[property];
            }
        }
        else {
            super(_id, _name, _description, _image, _plural, _specialProperties);

            this.addAvailableAction("consume");

            this.type = undefined;
            this.setType(_type);

            /**
             * Modification to a Character's Hunger property
             * @type {Number} -9999 to 9999
             */
            this.modHunger = 0;
            /**
             * Modification to a Character's Life property
             * @type {Number} -9999 to 9999
             */
            this.modLife = 0;
            /**
             * Modification to a Character's Stamina property
             * @type {Number} -9999 to 9999
             */
            this.modStamina = 0;
            /**
             * Modification to a Character's Mana property
             * @type {Number} -9999 to 9999
             */
            this.modMana = 0;
            /**
             * Modification to a Character's alcohol property
             * @type {Number} -100 to 100
             */
            this.modAlcohol = 0;
        }

        PSDE.consumables.set(_id, this);
    }

    setType(_type) {
        if (PSDE.kConsumableTypes.has(_type))
            this.type = _type;
        else
            this.type = "food";
        return this;
    }

    delete() {
        PSDE.consumables.delete(this.id);
        super.delete();
        return undefined;
    }
}
/**
 * Class that represents all Cheque(s)
 * @extends {Item}
 */
class Cheque extends Item {
    constructor(_from, _to, _amount = 1, _memo = "", _signed = false) {
        if (PSDE.enableDebug) console.log("Attempting to create a Cheque...");
        if (!(_from instanceof Character)) {
            if (PSDE.characters.has(_from))
                _from = PSDE.getCharacterByID(_from);
            else {
                if (PSDE.enableDebug) console.log("  _from was not a valid Character.");
                return undefined;
            }
        }
        if (!(_to instanceof Character)) {
            if (PSDE.characters.has(_to))
                _to = PSDE.getCharacterByID(_to);
            else {
                if (PSDE.enableDebug) console.log("  _to was not a valid Character.");
                return undefined;
            }
        }
        _amount = Number.parseInt(_amount);
        if (isNaN(_amount)) {
            if (PSDE.enableDebug) console.log("  _amount was not a valid number.");
            return undefined;
        }
        else if (_amount < 1) {
            if (PSDE.enableDebug) console.log("  _amount was less than 1.");
            return undefined;
        }

        super("cheque{0}{1}{2}".format(_from.id.capitalize(), _to.id.capitalize(), _amount, String(PSDE.currentTime.getTime()).slice(0, -3)), "Cheque");
        this.from = _from;
        this.to = _to;
        this.amount = _amount;
        this.memo = _memo;
        this.signed = _signed == true ? true : false;
        this.description = "A cheque from {0} to {1} for the amount of ${2}, with the memo '{3}'".format(this.from.name, this.to.name, this.amount, this.memo)

        PSDE.cheques.set(this.id, this);
    }

    sign(_character) {
        if (!(_character instanceof Character)){
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                return undefined;
        }

        this.signed = _from == _character;
        return this;
    }

    delete() {
        PSDE.cheques.delete(this.id);
        super.delete();
        return undefined;
    }
}
class Weapon extends Item {
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _type = undefined, _plural = false) {
    }

    delete() {
        PSDE.weaponInstances.delete(this.id);
        super.delete();
        return undefined;
    }
}
class Armor extends Clothing {
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _type = undefined, _plural = false) {
    }

    delete() {
        PSDE.armor.delete(this.id);
        super.delete();
        return undefined;
    }
}

/**
 * Class that represents all Furniture
 * @extends {Entity}
 */
class Furniture extends EntityWithStorage {
    /**
     * Creats Furniture
     * @param  {String}  _id            Unique ID
     * @param  {String}  _name          Name
     * @param  {String}  _description   Description
     * @param  {String}  _type          furnitureType
     * @param  {Number}  _seatingSpace  Seating Space
     * @param  {Number}  _storageSpace  Storage Space
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _type = "chair", _seatingSpace = 1, _storageSpace = 1) {
        if (_id instanceof Furniture) {
            super(_id.id, _id._name);
            for (var property in _id) {
                if (_id.hasOwnProperty(property)) {
                    this[property] = _id[property];
                }
            }
        }
        else {
            super(_id, _name, _description, _image);

            this.type = undefined;
            this.setType(_type);

            this.seatingSpace = _seatingSpace;
            this.storageSpace = _storageSpace;
            this.characters = new Set(); // <Character, Action>

            PSDE.furniture.set(_id, this);
        }
    }

    fromJSON(jsonString = "") {
        if (PSDE.enableDebug) console.log("Running fromJSON");
        
        if (typeof jsonString != "string") {
            if (PSDE.enableDebug) console.log("Parameter `jsonString` is not a string.");
            return undefined;
        }
        
        if (typeof jsonString == "string") {
            try {
                var json = JSON.parse(jsonString);
            }
            catch (e) {
                if (PSDE.enableDebug) console.log("Parameter `jsonString` could not be parsed to JSON.");
                return undefined;
            }
        }
        
        if (typeof json["id"] == "undefined" || typeof json["name"] == undefined) {
            if (PSDE.enableDebug) console.log("ID or Name are undefined.");
            return undefined;
        }
        else
            this.id = json["id"];
        delete json["id"];
        
        var _tmpArr = [];
        
        // Sets
        //  availableActions
        try {
            _tmpArr = JSON.parse(json["availableActions"]);
            _tmpArr.forEach(function(_int) {
                this.addAvailableAction(_int);
            }, this);
        } catch (e) {}
        delete json["availableActions"];
        //  items
        try {
            _tmpArr = JSON.parse(json["items"]);
            _tmpArr.forEach(function(_item) {
                if (PSDE.itemInstances.has(_item))
                    this.addItem(PSDE.itemInstances.get(_item));
            }, this);
        } catch (e) {}
        delete json["items"];
        
        // Entities
        if (json.hasOwnProperty("characters"))
            delete json["characters"];
        if (PSDE.rooms.has(json["room"]))
            PSDE.rooms.get(json["room"]).addFurniture(this);
        delete json["room"];
        delete json["cell"];
        
        // Primitives
        for (var property in json) {
            if (this.hasOwnProperty(property)) {
                if (json[property] == null)
                    this[property] = undefined;
                else
                    this[property] = json[property];
            }
        }
    }

    setType(_type) {
        if (PSDE.kFurnitureTypes.has(_type))
            this.type = _type;
        else
            this.type = "chair";

        switch(this.type) {
            case "bed" : {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("lay");
                this.addAvailableAction("sit");
                break;
            }
            case "chair" : {
                this.addAvailableAction("sit");
                this.addAvailableAction("sleep");
                break;
            }
            case "recliner" : {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("lay");
                this.addAvailableAction("sit");
                break;
            }
            case "loveseat" : {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("lay");
                this.addAvailableAction("sit");
                break;
            }
            case "couch" : {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("lay");
                this.addAvailableAction("sit");
                break;
            }
            case "table" : {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("sit");
                break;
            }
            case "desk" : {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("sit");
                break;
            }
            case "shelf" : {
                this.addAvailableAction("open");
                break;
            }
            case "cupboard" : {
                this.addAvailableAction("open");
                break;
            }
            case "cabinet" : {
                this.addAvailableAction("open");
                break;
            }
            case "bureau" : {
                this.addAvailableAction("open");
                break;
            }
            case "hook" : {
                this.addAvailableAction("open");
                break;
            }
            case "tv" : {
                this.addAvailableAction("use");
                this.addAvailableAction("look");
                break;
            }
            case "fridge" : {
                this.addAvailableAction("open");
                break;
            }
            case "oven" : {
                this.addAvailableAction("use");
                this.addAvailableAction("open");
                break;
            }
            case "microwave" : {
                this.addAvailableAction("use");
                this.addAvailableAction("open");
                break;
            }
            case "toaster" : {
                this.addAvailableAction("use");
                this.addAvailableAction("open");
                break;
            }
            case "tub" : {
                this.addAvailableAction("use");
                this.addAvailableAction("sleep");
                this.addAvailableAction("lay");
                this.addAvailableAction("sit");
                break;
            }
            case "shower" : {
                this.addAvailableAction("use");
                this.addAvailableAction("sit");
                break;
            }
            case "sink" : {
                this.addAvailableAction("use");
                break;
            }
            case "toilet" : {
                this.addAvailableAction("use");
                this.addAvailableAction("sit");
                break;
            }
            case "mirror" : {
                this.addAvailableAction("look");
                this.addAvailableAction("use");
                break;
            }
            case "basket" : {
                this.addAvailableAction("open");
                break;
            }
        }
        return this;
    }

    isSeat() {
        return (typeof this.seatingSpace != 'undefined' && this.seatingSpace > 0);
    }
    isStorage() {
        return (typeof this.storageSpace != 'undefined' && this.storageSpace > 0);
    }

    addCharacter(_character, _actionType = "sit") {
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;
        this.characters.add(_character);
        return this;
    }
    removeCharacter(_character) {
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;
        this.characters.delete(_character);
        return this;
    }

    containsCharacter(_character) {
        if (!(_character instanceof Character))
            _character = PSDE.characters.has(_character) ? PSDE.getCharacterByID(_character) : undefined;
        return this.characters.has(_character);
    }
    hasCharacter(_character) {
        return this.characters.has(_character);
    }

    containsCharacters() {
        return this.characters.size > 0;
    }
    hasCharacters() {
        return containsCharacters();
    }

    availableSeatingSpace() {
        var _charactersSeatingSpaceTotal = this.seatingSpace;

        this.characters.forEach(function(_character) {
            var _baseMultiplier = 1;

            // If they're laying or fucking, they're taking up double the space.
            // But then, if two people are fucking, then it takes double that... which makes no sense :v
            // So, only include laying. 2017/09/06
            //if (_actionType == 11 || _actionType == 3) {
            if (_character.hasCurrentAction("lay"))
                _baseMultiplier = 2;

            // but what if it's a stoat and a wolf :v
            // wat then :V 2017/09/06

            _charactersSeatingSpaceTotal -= _character.bodySize * _baseMultiplier;
        }, this);

        return _charactersSeatingSpaceTotal;
    }

    delete() {
        PSDE.furniture.delete(this.id);
        super.delete();
        return undefined;
    }
}
/**
 * Class that represents all Phones
 * @extends {Item}
 */
class Phone extends Item {
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _defaultPrice = 0, _defaultWeight = 0.001, _defaultDurability = 1) {
        super(_id, _name, _description, _image, false, ["metal","electricity","smooth","mirror"], _defaultPrice, _defaultWeight, _defaultDurability);
        PSDE.phones.set(_id, this);
    }

    delete() {
        PSDE.phones.delete(this.id);
        super.delete();
        return undefined;
    }
}
class TextMessage {
    /**
     * Create new TextMessage
     * @param  {ItemInstance}   _fromPhone      Source
     * @param  {ItemInstance}   _toPhone        Destination
     * @param  {String}         _message        Text message, can be HTML
     * @param  {String}         _time           Optional Time (YYYY-MM-DD HH:mm:SS)
     */
    constructor(_fromPhone, _toPhone, _message = "", _time = undefined) {
        if (!(_fromPhone instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_fromPhone))
                _fromPhone = PSDE.itemInstances.get(_fromPhone);
            else
                return undefined;
        }
        if (!(_toPhone instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_toPhone))
                _toPhone = PSDE.itemInstances.get(_toPhone);
            else
                return undefined;
        }

        this.id = "{0}{1}{2}".format(_fromPhone.owner.id, _toPhone.owner.name, PSDE.textMessages.size);
        this.from = _fromPhone.owner.name;
        this.to = _toPhone.owner.name;
        this.time = _time == undefined ? "{0}/{1}/{2} {3}:{4}:{5}".format(PSDE.currentTime.getFullYear(), PSDE.currentTime.getMonth(), PSDE.currentTime.getDate(), PSDE.currentTime.getHours(), PSDE.currentTime.getMinutes(), PSDE.currentTime.getSeconds()) : _time;
        this.message = _message;

        PSDE.textMessages.set(this.id, this);
    }
}
class WebPage {
    constructor(_id, _name = undefined, _webSite = undefined, _content = undefined) {
        this.id = _id;
        this.name = _name;

        if (!(_webSite instanceof WebSite))
            _webSite = PSDE.webSites.has(_webSite) ? PSDE.webSites.get(_webSite) : undefined;

        this.webSite = _webSite;
        this.content = _content;

        PSDE.webPages.set(this.id, this);
    }
}
class WebSite {
    constructor(_id, _name = undefined, _description = undefined) {
        this.id = _id;
        this.name = _name;
        this.description = _description;
        this.pages = new Set();

        PSDE.webSites.set(this.id, this);
    }

    _addPagePage(_page) {
        if (!(_page instanceof WebPage))
            _page = PSDE.webPages.has(_page) ? PSDE.webPages.get(_page) : undefined;

        if (_page instanceof WebPage) {
            _page.webSite = this;
            this.pages.set(_page);
        }
    }
    _addPageRaw(_id, _name = undefined, _content = undefined) {
        var _page = new WebPage(_id, _name, this, _content);

        this._addPagePage(_page);
    }
    addPage(_id, _name = undefined, _content = undefined) {
        if (!(_id instanceof WebPage) && PSDE.webPages.has(_id))
            _id = PSDE.webPages.get(_id);

        if (_id instanceof WebPage)
            this._addPagePage(_id);
        else
            this._addPageRaw(_id, _name, _content);
        return this;
    }
    getPage(_page) {
        if (!(_page instanceof WebPage))
            _page = PSDE.webPages.has(_page) ? PSDE.webPages.get(_page) : undefined;

        if (_page instanceof WebPage && this.pages.contains(_page))
            return _page;
        else
            return undefined;
    }
}
/**
 * Class that represents all Spells
 * @extends {Entity}
 */
class Spell extends Entity {
    /**
     * Creates a Spell
     * @param  {String} _id          Unique ID
     * @param  {String} _name        Name
     * @param  {String} _description Description
     * @param  {String} _image       Image path of base64
     * @param  {String} _school      PSDE.kSpellSchools
     * @param  {Number} _manaCost    Cost of Spell in Mana
     * @param  {Number} _lifeCost    Cost of Spell in Life
     * @param  {Number} _staminaCost Cost of Spell in Stamina
     */
    constructor(_id, _name = "", _description = undefined, _image = undefined, _school = "universal", _manaCost = 0, _lifeCost = 0, _staminaCost = 0) {
        super(_id, _name, _description, _image);

        this.school = undefined;
        this.setSchool(_school);

        if (isNaN(_manaCost)) _manaCost = 0;
        else if (_manaCost < 0) _manaCost = 0;
        else _manaCost = Number.parseInt(_manaCost);
        this.manaCost = _manaCost;

        if (isNaN(_lifeCost)) _lifeCost = 0;
        else if (_lifeCost < 0) _lifeCost = 0;
        else _lifeCost = Number.parseInt(_lifeCost);
        this.lifeCost = _lifeCost;

        if (isNaN(_staminaCost)) _staminaCost = 0;
        else if (_staminaCost < 0) _staminaCost = 0;
        else _staminaCost = Number.parseInt(_staminaCost);
        this.staminaCost = _staminaCost;

        PSDE.spells.set(this.id, this);
    }

    setSchool(_school) {
        if (PSDE.kSpellSchools.has(_school))
            this.school = _school;
        else
            this.school = "universal";
        return this;
    }
}
/**
 * Class that reprents all EntityInstances
 */
class EntityInstance {
    /**
     * Creates an EntityInstance
     * @param  {UUIDv4} _id            UUID
     * @param  {Entity} _parent         Entity, String ID of Entity, EntityInstance, or String ID of EntityInstance
     * @param  {Character} _owner      Owner
     * @param  {Number} _price         Price, defaults to 0
     * @param  {Number} _mass        Weight, defaults to 0.001
     * @param  {Number} _durability    Durability, defaults to 1
     * @param  {Number} _durabilityMax Max durability, defaults to 1
     */
    constructor(_id, _parent, _owner = undefined, _price = 0, _mass = 1.0, _durability = 1, _durabilityMax = 1) {
        if (_id == undefined)
            _id = uuidv4();
        else if (typeof _id == "string" || typeof _id == "number") {
            _id = _id.replace(/[^0-9a-z\-]/gi, '');
            if (_id.length == 0)
                _id = uuidv4();
        }

        this.id = _id;

        this.name = undefined;
        this.description = undefined;
        this.image = undefined;
        this.child = undefined;
        this.parent = undefined;
        this.owner = undefined;
        this.price = 0;
        this.mass = 1.0;
        this.durability = 1;
        this.durabilityMax = 1;

        this.setOwner(_owner);
        this.setParent(_parent);
        this.setPrice(_price || _parent.price);
        this.setWeight(_mass || _parent.mass);
        this.setDurability(_durability || 1);
        this.setDurabilityMax(_durabilityMax || this.durability);

        PSDE.instances.set(this.id, this);
    }

    /**
     * Sets Child
     * @param {Entity} _entity Entity, or undefined
     */
    setChild(_entity) {
        if (!(_entity instanceof Entity)){
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else
                _entity = undefined;
        }
        this.child = _entity;
        return this;
    }
    getChild() {
        return this.child;
    }

    /**
     * Sets Parent
     * @param {Entity} _entity Entity, or undefined
     */
    setParent(_entity) {
        if (!(_entity instanceof Entity)){
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (PSDE.instances.has(_entity))
                _entity = PSDE.instances.get(_entity).parent;
            else
                _entity = undefined;
        }
        this.parent = _entity;
        return this;
    }
    getParent() {
        return this.parent;
    }

    /**
     * Sets Owner
     * @param {Character} _character Character, or undefined
     */
    setOwner(_character) {
        if (!(_character instanceof Character)){
            if (PSDE.characters.has(_character))
                _character = PSDE.getCharacterByID(_character);
            else
                _character = undefined;
        }
        this.owner = _character;
        return this;
    }
    getOwner() {
        return this.owner;
    }

    /**
     * Sets Price
     * @param {Number} _int Integer
     */
    setPrice(_int) {
        _int = Number.parseInt(_int);
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > Number.MAX_SAFE_INTEGER)
            _int = Number.MAX_SAFE_INTEGER;
        this.durability = _int;
        return this;
    }
    getPrice() {
        return this.price;
    }

    /**
     * Sets Weight
     * @param {Number} _float Float
     */
    setWeight(_float) {
        _float = Number.parseFloat(_float);
        if (isNaN(_float))
            _float = 0.001;
        else if (_float < 0)
            _float = 0.001;
        else if (_float > Number.MAX_SAFE_INTEGER)
            _float = Number.MAX_SAFE_INTEGER;
        this.mass = _float;
        return this;
    }
    getWeight() {
        return (this.mass || this.parent.mass);
    }

    /**
     * Sets Durability
     * @param {Number} _int Integer
     */
    setDurability(_int) {
        _int = Number.parseInt(_int);
        if (isNaN(_int))
            _int = 1;
        else if (_int < 0)
            _int = 1;
        else if (_int > this.durabilityMax)
            _int = this.durabilityMax;
        this.durability = _int;
        return this;
    }
    incDurability(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setDurability(this.durability + Number.parseInt(_int));
    }
    addDurability(_int) {
        return this.incDurability(_int);
    }
    decDurability(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setDurability(this.durability - Number.parseInt(_int));
    }
    subDurability(_int) {
        return this.decDurability(_int);
    }
    /**
     * Returns Durability
     * @return {Number} Integer
     */
    getDurability() {
        return this.durability;
    }

    /**
     * Sets Max Durability
     * @param {Number} _int Integer
     */
    setDurabilityMax(_int) {
        _int = Number.parseInt(_int);
        if (isNaN(_int))
            _int = 1;
        else if (_int < 0)
            _int = 1;
        else if (_int > Number.MAX_SAFE_INTEGER)
            _int = Number.MAX_SAFE_INTEGER;
        this.durabilityMax = _int;
        return this;
    }
    incDurabilityMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setDurabilityMax(this.durabilityMax + Number.parseInt(_int));
    }
    addDurabilityMax(_int) {
        return this.incDurabilityMax(_int);
    }
    decDurabilityMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setDurabilityMax(this.durabilityMax - Number.parseInt(_int));
    }
    subDurabilityMax(_int) {
        return this.decDurabilityMax(_int);
    }
    /**
     * Returns Max Durability
     * @return {Number} Integer
     */
    getDurabilityMax() {
        return this.durabilityMax;
    }

    setName(_name) {
        this.name = _name.replace(/[^0-9a-z\-]/gi, '');
    }
    getName() {
        return (this.name || this.parent.getName());
    }
    setDescription(_description) {
        this.description = _description.replace(/[^0-9a-z\-\!\?\,\.\"\'\<\>\/\_]/gi, '');
    }
    getDescription() {
        return (this.description || this.parent.getDescription());
    }
    setImage(_image) {
        var _subPath = "";
        if (this instanceof Character) {
            _subPath = "characters";
        }
        else if (this instanceof Furniture) {
            _subPath = "furniture";
        }
        else if (this instanceof Item) {
            _subPath = "items";
        }
        else if (this instanceof Location) {
            _subPath = "locations";
        }

        if (_image == undefined)
            this.image = "resources/items/genericItem/{0}.svg".format(this.id); // base64 image, or url
        else if (_image.slice(0, 17) == "resources/images/") {
            _image = _image.slice(17).split('/');
            _image = _image[_image.length];
            _image = _image.split('.');
            _image[0] = _image[0].replace(/[^0-9a-z]/gi, '');
            _image[1] = _image[1].replace(/[^0-9a-z]/gi, '');
            var _fileType = _image[1].toLowerCase();
            if (_fileType !== "png" && _fileType !== "svg" && _fileType !== "jpg" && _fileType !== "jpeg" && _fileType !== "gif")
                this.image = "resources/images/{0}/{1}.svg".format(_subPath, this.id);
            else if (_image[0].length < 1)
                this.image = "resources/images/{0}/{1}.svg".format(_subPath, this.id);
            else
                this.image = "resources/images/{0}/{1}.{2}".format(_subPath, _image[0], _image[1]);
            delete this._fileType;
        }
        else if (_image.slice(0, 11) == "data:image/") {
            this.image = _image;
        }
        else
            this.image = "resources/images/items/genericItem.svg".format(this.id); // base64 image, or url
        return this;
    }
    getImage() {
        return (this.image || this.parent.getImage());
    }

    delete() {
        PSDE.instances.delete(this.id);
        return undefined;
    }
}
class ItemInstance extends EntityInstance {
    constructor(_id = undefined, _parent = undefined, _owner = undefined, _price = 0, _mass = 1.0, _durability = 1, _durabilityMax = 1) {
        if (!(_parent instanceof Item)) {
            if (PSDE.items.has(_parent)) 
                _parent = PSDE.items.get(_parent);
            else if (_parent instanceof ItemInstance && _parent.parent instanceof Item) 
                _parent = _parent.parent;
            else if (PSDE.itemInstances.has(_parent)) {
                _parent = PSDE.itemInstances.get(_parent).parent;
                if (!(_parent.parent instanceof Item))
                    return undefined;
            }
            else
                return undefined;
        }

        super(_id, _parent, _owner, _price, _mass, _durability, _durabilityMax);

        PSDE.itemInstances.set(this.id, this);
    }

    delete() {
        PSDE.itemInstances.delete(this.id);
        super.delete();
        return undefined;
    }
}
class BodyPartInstance extends ItemInstance {
    /**
     * Creates a BodyPart Instance per BodyPart per Character, specific to their Species
     * @param  {BodyPart} _parent       BodyPart
     * @param  {Character} _owner      Character
     * @param  {Number} _durability    Durability
     * @param  {Number} _durabilityMax Max durability
     * @param  {String} _type          Species type
     */
    constructor(_id = undefined, _parent, _owner = undefined, _durability = 1, _durabilityMax = 1, _type = undefined) {
        if (!(_parent instanceof BodyPart)) {
            if (PSDE.bodyParts.has(_parent))
                _parent = PSDE.bodyParts.get(_parent);
            else if (_parent instanceof BodyPartInstance && _parent.parent instanceof BodyPart)
                _parent = _parent.parent;
            else if (PSDE.bodyPartInstances.has(_parent)) {
                _parent = PSDE.bodyPartInstances.get(_parent).parent;
                if (!(_parent.parent instanceof Phone))
                    return undefined;
            }
            else
                return undefined;
        }

        super(_id, _parent, _owner, undefined, undefined, _durability, _durabilityMax);

        this.setChild(_owner);
        this.setType(_type);

        PSDE.bodyPartInstances.set(this.id, this);
    }
    setType(_type) {
        if (!PSDE.kSpeciesTypes.has(_type)) {
            if (_type instanceof Character)
                _type = _type.getSpecies();
            else if (this.owner instanceof Character)
                _type = this.owner.getSpecies();
            else
                _type = "fox";
        }
        this.type = _type;
        return this;
    }
    getType() {
        return this.type;
    }

    delete() {
        PSDE.bodyPartInstances.delete(this.id);
        super.delete();
        return undefined;
    }
}
class PhoneInstance extends ItemInstance {
    constructor(_id, _parent, _owner = undefined, _price = 0, _mass = 1.0, _durability = 1, _durabilityMax = 1) {
        if (!(_parent instanceof Phone)) {
            if (PSDE.phones.has(_parent)) 
                _parent = PSDE.phones.get(_parent);
            else if (_parent instanceof PhoneInstance && _parent.parent instanceof Phone) 
                _parent = _parent.parent;
            else if (PSDE.phoneInstances.has(_parent)) {
                _parent = PSDE.phoneInstances.get(_parent).parent;
                if (!(_parent.parent instanceof Phone))
                    return undefined;
            }
            else
                return undefined;
        }

        super(_id, _parent, _owner, _price, _mass, _durability, _durabilityMax);

        this.receivedMessages = new Map();
        this.readMessages = new Map();
        this.sentMessages = new Map();

        PSDE.phoneInstances.set(this.id, this);
    }

    newReadMessage(_fromPhone, _message, _time = "Thu, 01 Jan 1970 12:00:00 GMT") {
        if (!(_fromPhone instanceof PhoneInstance))
            _fromPhone = PSDE.findPhone(_fromPhone);

        var _textMessage = new TextMessage(_fromPhone, this, _message);
        _textMessage.time = _time;
        this.readMessages.set(_textMessage.id, _textMessage);
        _fromPhone.sentMessages.set(_textMessage.id, _textMessage);
        return this;
    }

    /**
     * Sends a message to a phone
     * @param  {PhoneInstance} _toPhone         The PhoneInstance (or Character with a Phone) to send a message to.
     * @param  {String}         _message        Text message, can be HTML
     * @param  {String}         _time           Optional Time (YYYY-MM-DD HH:mm:SS)
     * @return {Boolean}        Whether or not the message was sent
     */
    sendMessage(_toPhone, _message, _time = undefined) {
        if (!(_toPhone instanceof PhoneInstance))
            _toPhone = PSDE.findPhone(_toPhone);

        var _textMessage = new TextMessage(this, _toPhone, _message, _time);
        _toPhone.receivedMessages.set(_textMessage.id, _textMessage);
        this.sentMessages.set(_textMessage.id, _textMessage);

        if (_toPhone == PSDE.player.phone)
            Content.add("<p>You've received a text message.</p>");
        return this;
    }

    readMessage(_textMessage) {
        if (!(_textMessage instanceof TextMessage))
            _textMessage = PSDE.textMessages.has(_textMessage) ? PSDE.textMessages.get(_textMessage) : undefined;
        if (!(_textMessage instanceof TextMessage))
            return undefined;

        if (this.receivedMessages.has(_textMessage.id)) {
            this.receivedMessages.delete(_textMessage.id);
            this.readMessages.set(_textMessage.id, _textMessage);
        }
        return this;
    }

    delete() {
        PSDE.phoneInstances.delete(this.id);
        super.delete();
        return undefined;
    }
}
class WeaponInstance extends ItemInstance {
    constructor(_id, _parent, _owner = undefined) {
        if (!(_parent instanceof Weapon)) {
            if (PSDE.weaponInstances.has(_parent)) 
                _parent = PSDE.weaponInstances.get(_parent);
            else if (_parent instanceof WeaponInstance && _parent.parent instanceof Weapon) 
                _parent = _parent.parent;
            else if (PSDE.weaponInstances.has(_parent)) {
                _parent = PSDE.weaponInstances.get(_parent).parent;
                if (!(_parent.parent instanceof Weapon))
                    return undefined;
            }
            else
                return undefined;
        }

        super(_id, _parent, _owner, _price, _mass);
    }

    delete() {
        PSDE.weaponInstances.delete(this.id);
        super.delete();
        return undefined;
    }
}
class ArmorInstance extends ItemInstance {
    constructor(_id, _parent, _owner = undefined) {}

    delete() {
        PSDE.armorInstances.delete(this.id);
        super.delete();
        return undefined;
    }
}
class Cron {
    /**
     * Creats a schedule
     * @param  {Number} minutes Minute of the day
     * @param  {Number} hours   Hour of the day
     * @param  {Number} dom     Day of the month
     * @param  {Number} month   Month
     * @param  {Number} dow     Day of the week
     * @param  {Number} year    Year
     */
    constructor(minutes = undefined, hours = undefined, dom = undefined, month = undefined, dow = undefined, year = undefined) {
        if (minutes instanceof Cron) {
            for (var property in minutes) {
                if (minutes.hasOwnProperty(property)) {
                    this[property] = minutes[property];
                }
            }
        }
        else {
            if (typeof minutes == 'undefined')
                this.minutes = undefined;
            else if (!Number.isInteger(minutes)) {
                if (minutes.indexOf('-') != -1 || minutes.indexOf(',') != -1)
                    this.minutes = minutes;
                else
                    this.minutes = undefined;
            }
            else if (minutes < 0 || minutes > 59)
                this.minutes = undefined;
            else
                this.minutes = minutes;

            if (typeof hours == 'undefined')
                this.hours = undefined;
            else if (!Number.isInteger(hours)) {
                if (hours.indexOf('-') != -1 && hours.match(/[0-23]+-[0-23]+/) != null || hours.indexOf(',') != -1 && hours.match(/[0-23]+,[0-23]+/) != null)
                    this.hours = hours;
                else if (hours.indexOf('-') != -1 && hours.indexOf(',') != -1 && hours.match(/(([0-23]-)?[0-23]\,)?([0-23]\-[0-23])(\,[0-23](-[0-23])?)?/))
                    this.hours = hours;
                else
                    this.hours = undefined;
            }
            else if (hours < 0 || hours > 23)
                this.hours = undefined;
            else {
                this.hours = hours;

                if (typeof this.minutes == 'undefined')
                    this.minutes = 0;
            }

            if (typeof dom == 'undefined')
                this.dom = undefined;
            else if (!Number.isInteger(dom)) {
                if (dom.indexOf('-') != -1 || dom.indexOf(',') != -1)
                    this.dom = dom;
                else
                    this.dom = undefined;
            }
            else if (dom < 1 || dom > 31)
                this.dom = undefined;
            else {
                this.dom = dom;

                if (typeof this.hours == 'undefined')
                    this.hours = 0;

                if (typeof this.minutes == 'undefined')
                    this.minutes = 0;
            }

            if (typeof month == 'undefined')
                this.month = undefined;
            else if (!Number.isInteger(month)) {
                switch (month.toUpperCase()) {
                    case "JAN" : this.month = 1; break;
                    case "FEB" : this.month = 2; break;
                    case "MAR" : this.month = 3; break;
                    case "APR" : this.month = 4; break;
                    case "MAY" : this.month = 5; break;
                    case "JUN" : this.month = 6; break;
                    case "JUL" : this.month = 7; break;
                    case "AUG" : this.month = 8; break;
                    case "SEP" : this.month = 9; break;
                    case "OCT" : this.month = 10; break;
                    case "NOV" : this.month = 11; break;
                    case "DEC" : this.month = 12; break;
                    default : {
                        if (month.indexOf('-') != -1 || month.indexOf(',') != -1)
                            this.month = month;
                        else
                            this.month = undefined;
                    };
                }
            }
            else if (month < 1 || month > 12)
                this.month = undefined;
            else {
                this.month = month;

                if (typeof this.dom == 'undefined')
                    this.dom = 1;

                if (typeof this.hours == 'undefined')
                    this.hours = 0;

                if (typeof this.minutes == 'undefined')
                    this.minutes = 0;
            }

            if (typeof dow == 'undefined')
                this.dow = undefined;
            else if (!Number.isInteger(dow)) {
                if (dow.indexOf('-') != -1 && dow.match(/\d+-\d+/) != null || dow.indexOf(',') != -1 && dow.match(/\d+,\d+/) != null)
                    this.dow = dow;
                else if (dow.indexOf('-') != -1 && dow.indexOf(',') != -1 && dow.match(/(([1-7]-)?[1-7]\,)?([1-7]\-[1-7])(\,[1-7](-[1-7])?)?/))
                    this.dow = dow;
                else
                    this.dow = parseDOWString(dow);
            }
            else if (dow < 0 || dow > 7)
                this.dow = undefined;
            else {
                if (dow == 7)
                    dow = 0;

                this.dow = dow;
            }

            if (typeof this.dow != 'undefined') {
                if (typeof this.hours == 'undefined')
                    this.hours = 0;

                if (typeof this.minutes == 'undefined')
                    this.minutes = 0;
            }

            if (typeof year == 'undefined' || !Number.isInteger(year))
                this.year = undefined;
            else {
                this.year = year;

                if (typeof this.month == 'undefined')
                    this.month = 1;

                if (typeof this.dom == 'undefined')
                    this.dom = 1;

                if (typeof this.hours == 'undefined')
                    this.hours = 0;

                if (typeof this.minutes == 'undefined')
                    this.minutes = 0;
            }
        }
    }

    parseDOWString(_dow) {
        switch(_dow.toUpperCase()) {
            case "SUN" : return 0; break;
            case "MON" : return 1; break;
            case "TEU" : return 2; break;
            case "WED" : return 3; break;
            case "THU" : return 4; break;
            case "FRI" : return 5; break;
            case "SAT" : return 6; break;
            default : return undefined;
        }
    }

    containsMinutes(_date) {
        if (this.minutes == undefined) return true;
        var _number = undefined;

        if (this.minutes == undefined)
            return true;
        else if (_date instanceof Date)
            _number = _date.getMinutes();
        else if (Number.isInteger(_date))
            _number = _date;
        else if (!Number.isInteger(_date))
            _number = Number.parseInt(_date);

        if (isNaN(_number))
            return undefined;

        if (Number.isInteger(this.minutes))
            return this.minutes == _number;
        else
            return String(_number).match(new RegExp("[{0}]".format(this.minutes))) != null;
    }
    containsHours(_date) {
        if (this.hours == undefined) return true;
        var _number = undefined;

        if (this.hours == undefined)
            return true;
        else if (_date instanceof Date)
            _number = _date.getHours();
        else if (Number.isInteger(_date))
            _number = _date;
        else if (!Number.isInteger(_date))
            _number = Number.parseInt(_date);

        if (isNaN(_number))
            return undefined;

        if (Number.isInteger(this.hours))
            return this.hours == _number;
        else
            return String(_number).match(new RegExp("[{0}]".format(this.hours))) != null;
    }
    containsDOW(_date = undefined) {
        if (this.dow == undefined) return true;
        var _number = undefined;

        if (this.dow == undefined)
            return true;
        else if (_date instanceof Date)
            _number = _date.getDay();
        else if (Number.isInteger(_date))
            _number = _date;
        else if (!Number.isInteger(_date))
            _number = Number.parseInt(_date);

        if (isNaN(_number))
            return undefined;

        if (Number.isInteger(this.dow))
            return this.dow == _number;
        else
            return String(_number).match(new RegExp("[{0}]".format(this.dow))) != null;
    }
    containsDOM(_date) {
        if (this.dom == undefined) return true;
        if (_date instanceof Date)
            _date = _date.getDate();
        return (this.dom == _date);
    }
    containsMonth(_date) {
        if (this.month == undefined) return true;
        if (_date instanceof Date)
            _date = _date.getMonth();
        return (this.month == _date);
    }
    containsYear(_date) {
        if (this.year == undefined) return true;
        if (_date instanceof Date)
            _date = _date.getFullYear();
        return (this.year == _date);
    }
    containsTime(_date = PSDE.currentTime) {
        return (this.containsHours(_date) && this.containsMinutes(_date));
    }
    containsDate(_date = PSDE.currentTime) {
        return (this.containsYear(_date) && this.containsMonth(_date) && this.containsDOM(_date) && this.containsDOW(_date));
    }
    containsDateTime(_date = PSDE.currentTime) {
        return (this.containsDate && this.containsTime);
    }
}
class GameEvent {
    /**
     * [constructor description]
     * @param  {String}  _id           Unique ID
     * @param  {String}  _action       actionType
     * @param  {Character}  _characterA   Character that triggers the event
     * @param  {Character}  _characterB   Secondary Character that triggers the event
     * @param  {Item}  _item           Item that triggers the event
     * @param  {Location}  _location   Location that triggers the event
     * @param  {Cell}  _cell           Cell that triggers the event
     * @param  {Room}  _room           Room that triggers the event
     * @param  {Cron,String,Date}  _cron           When to run. Can be a Cron, or a String ("2m" for 2 minutes, "2h" for 2 hours, "2d" for 2 days, "2M" for 2 months), or a Date
     * @param  {String}  _nextFunction Function to run
     * @param  {Boolean} _runOnce      Run once, then delete.
     */
    constructor(_id, _action = undefined, _characterA = undefined, _characterB = undefined, _item = undefined, _location = undefined, _cell = undefined, _room = undefined, _cron = undefined, _nextFunction = undefined, _runOnce = true) {
        if (_id instanceof GameEvent) {
            for (var property in _id) {
                if (_id.hasOwnProperty(property)) {
                    this[property] = _id[property];
                }
            }
        }
        else {
            if (!(_characterA instanceof Character))
                _characterA = PSDE.characters.has(_characterA) ? PSDE.getCharacterByID(_characterA) : undefined;

            if (!(_characterB instanceof Character))
                _characterB = PSDE.characters.has(_characterB) ? PSDE.getCharacterByID(_characterB) : undefined;

            if (!(_item instanceof Item)) {
                if (_item instanceof ItemInstance)
                    _item = _item.parent;
                else if (!_item instanceof ItemInstance && PSDE.itemInstances.has(_item))
                    _item = PSDE.itemInstances.get(_item).parent;
                else if (PSDE.items.has(_item))
                    _item = PSDE.items.get(_item);
                else
                    _item = undefined;
            }

            if (!(_location instanceof Location))
                _location = PSDE.locations.has(_location) ? PSDE.locations.get(_location) : undefined;

            if (!(_cell instanceof Cell))
                _cell = PSDE.cells.has(_cell) ? PSDE.cells.get(_cell) : undefined;

            if (!(_room instanceof Room))
                _room = PSDE.rooms.has(_room) ? PSDE.rooms.get(_room) : undefined;

            if (_cron instanceof Cron || _cron == undefined) {}
            else if (typeof _cron == 'string') {
                var _cronPrefix = Number.parseInt(_cron.slice(0, -1));
                var _cronSuffix = _cron.slice(-1);
                if (_cronPrefix < 0) {
                    if (PSDE.enableDebug) console.log("   Cron from String contained an invalid number prefix.");
                    return undefined;
                }
                var _cron = new Date(PSDE.currentTime);
                switch (_cronSuffix) {
                    case "y" : {
                        _cron.addYear(_cronPrefix);
                        break;
                    }
                    case "M" : {
                        _cron.addMonth(_cronPrefix);
                        break;
                    }
                    case "d" : {
                        _cron.addDate(_cronPrefix);
                        break;
                    }
                    case "h" : {
                        _cron.addHours(_cronPrefix);
                        break;
                    }
                    case "m" : {
                        _cron.addMinutes(_cronPrefix);
                        break;
                    }
                    default : {
                        if (PSDE.enableDebug) console.log("   Cron from String contained an invalid time suffix.");
                        return undefined;
                    }
                }
                _cron = new Cron(_cron.getMinutes(), _cron.getHours(), _cron.getDate(), _cron.getMonth(), undefined, _cron.getFullYear());
            }
            else if (_cron instanceof Date) {
                _cron = new Cron(_cron.getMinutes(), _cron.getHours(), _cron.getDate(), _cron.getMonth(), undefined, _cron.getFullYear());
            }

            this.id = _id;
            this.action = _action;
            this.characterA = _characterA;
            this.characterB = _characterB;
            this.item = _item;
            this.location = _location;
            this.cell = _cell;
            this.room = _room;
            this.cron = _cron;
            this.runOnce = _runOnce;

            if (_nextFunction.slice(-1) != ')')
                _nextFunction += "(" + this.id + ")";

            this.nextFunction = _nextFunction;

            PSDE.events.set(this.id, this);
        }
    }

    execute() {
        if (PSDE._eventsExecutedThisTick.has(this))
            return;

        if (PSDE.enableDebug) console.log("Executing " + this.id);

        PSDE.lastGameEvent = this;
        unsafeExec(this.nextFunction);
        PSDE.lastGameEvent = undefined;

        if (this.runOnce) {
            this.delete();
        }

        PSDE._eventsExecutedThisTick.add(this);
        return this;
    }

    delete() {
        if (PSDE.enableDebug) console.log("Deleting {0}".format(this.id));
        PSDE.events.delete(this.id);
        return undefined;
    }
}