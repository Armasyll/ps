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

        if (enableAutoscroll)
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

        if (enableAutoscroll)
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
            if (player.room.cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (player.room.location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 4 : 5)] = ["roomInteract(" + _room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>Down", _metaName, undefined, _room.isHidden(player.room) ? 4 : 0, "btn-info" + (player.room.isLocked(_room) && !player.hasKey(_room) ? " locked" : "")];
        }
        if (_northRoom instanceof Room) {
            _room = _northRoom;
            if (player.room.cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (player.room.location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 5 : 6)] = ["roomInteract(" + _room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>North", _metaName, undefined, _room.isHidden(player.room) ? 4 : 0, "btn-info" + (player.room.isLocked(_room) && !player.hasKey(_room) ? " locked" : "")];
        }
        if (_upRoom instanceof Room) {
            _room = _upRoom;
            if (player.room.cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (player.room.location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 6 : 7)] = ["roomInteract(" + _room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>Up", _metaName, undefined, _room.isHidden(player.room) ? 4 : 0, "btn-info" + (player.room.isLocked(_room) && !player.hasKey(_room) ? " locked" : "")];
        }
        if (_westRoom instanceof Room) {
            _room = _westRoom;
            if (player.room.cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (player.room.location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 8 : 10)] = ["roomInteract(" + _room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>West", _metaName, undefined, _room.isHidden(player.room) ? 4 : 0, "btn-info" + (player.room.isLocked(_room) && !player.hasKey(_room) ? " locked" : "")];
        }
        if (_southRoom instanceof Room) {
            _room = _southRoom;
            if (player.room.cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (player.room.location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 9 : 11)] = ["roomInteract(" + _room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>South", _metaName, undefined, _room.isHidden(player.room) ? 4 : 0, "btn-info" + (player.room.isLocked(_room) && !player.hasKey(_room) ? " locked" : "")];
        }
        if (_eastRoom instanceof Room) {
            _room = _eastRoom;
            if (player.room.cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (player.room.location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 10 : 12)] = ["roomInteract(" + _room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>East", _metaName, undefined, _room.isHidden(player.room) ? 4 : 0, "btn-info" + (player.room.isLocked(_room) && !player.hasKey(_room) ? " locked" : "")];
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
        if (_key !== false) _blob += '<small style="position:absolute; right:0px; top:-3px;">[{0}]</small>'.format(_key);
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
            _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;

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
            _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;

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
            _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;

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
            this.canvas.strokeStyle = (typeof player.furColourAHex != 'undefined' ? player.furColourAHex : (player.hasFurColouration ? player.furColourA : "rgba(255, 255, 0, 0.5)"));
            this.canvas.stroke();

            this.canvas.strokeStyle = "rgb(0, 0, 0)";
            this.canvas.setLineDash([]);
        }

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

        // Add furniture icons to rooms


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

        if (debug) {
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
                    if (debug) console.log("ID for Character was not a valid String");
                    return undefined;
                }
            }
            else {
                if (debug) console.log("ID for Character was not a String");
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
             * @type {Set} <kActionTypes>
             */
            this.availableActions = new Set();
            /**
             * Special types
             * @type {Set} <kSpecialTypes>
             */
            this.specialTypes = new Set();

            /**
             * Weight in kilograms
             * @type {Number} 0.001 to Number.MAX_VALUE
             */
            this.weight = 0;
            /**
             * Price
             * @type {Number} 0 to Number.MAX_VALUE
             */
            this.price = 0;
            /**
             * Durability of an entity
             * @type {Number} 0 to Number.MAX_VALUE
             */
            this.durability = 1;

            this.addAvailableAction("look");
            this.addSpecialType("exists");
        }
        
        entityIndexes.set(this.id, this);
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
                        else if (_value instanceof Disposition)
                            _arr.push([_key.id, _value.toObject()]);
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
                else if (this[property] instanceof Disposition) {
                    _blob[property] = this[property].toObject();
                }
            }
            else
                _blob[property] = this[property];
        }
        
        return JSON.stringify(_blob, function(k, v) { return (v === undefined ? null : v)});
    }

    /**
     * Adds an available Action when interacting with this Entity
     * @param {String} _actions (kActionTypes)
     */
    addAvailableAction(_actions) {
        if (typeof _actions == 'undefined')
            return false;
        else if (_actions instanceof Array) {
            _actions.forEach(function(_action) {
                kActionTypes.has(_action) && this.availableActions.add(_action);
            }, this);
            return true;
        }
        else if (kActionTypes.has(_actions)) {
            this.availableActions.add(_actions);
            return true;
        }
        return false;
    }
    /**
     * Removes an available Action when interacting with this Entity
     * @param  {String} _actions (kActionTypes)
     * @return {Booealn}          Whether or not the Action was removed
     */
    removeAvailableAction(_actions) {
        if (typeof _actions == 'undefined')
            return false;
        else if (_actions instanceof Array) {
            _actions.forEach(function(_action) {
                kActionTypes.has(_action) && this.availableActions.delete(_action);
            }, this);
            return true;
        }
        else if (kActionTypes.has(_actions)) {
            this.availableActions.delete(_actions);
            return true;
        }
        return false;
    }

    /**
     * Adds a Special Type
     * @param {String} _specialTypes (kSpecialTypes)
     */
    addSpecialType(_specialTypes) {
        if (typeof _specialTypes == 'undefined')
            return false;
        else if (_specialTypes instanceof Array) {
            _specialTypes.forEach(function(_specialType) {
                kSpecialTypes.has(_specialType) && this.specialTypes.add(_specialType);
            }, this);
            return true;
        }
        else if (kSpecialTypes.has(_specialTypes)) {
            this.specialTypes.add(_specialTypes);
            return true;
        }
        return false;
    }
    /**
     * Returns this Entity's Special Types
     * @return {Set} <String (kSpecialTypes)>
     */
    getSpecialTypes() {
        return this._specialTypes;
    }
    /**
     * Returns whether or not this Entity has the specified Special Type
     * @param  {String}  _specialType (kSpecialTypes)
     * @return {Boolean}              Whether or not this Entity has the specified Special Type
     */
    hasSpecialType(_specialType) {
        if (kSpecialTypes.has(_specialType))
            return this.specialTypes.has(_specialType);
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
}

class BodyPart extends Entity {
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined) {
        super(_id, _name, _description, _image);
        bodyPartsIndexes.set(_id, this);
    }
}

/**
 * Class that represents all Disposition(s)
 */
class Disposition {
    /**
     * Creates a Disposition
     * @param {Number} _eros   passion
     * @param {Number} _philia friendship
     * @param {Number} _lodus  playfulness
     * @param {Number} _pragma souldmate
     * @param {Number} _storge familial
     * @param {Number} _manic  obsession
     * @param {Number} _miseo  hate
     */
    constructor(_eros = 0, _philia = 0, _lodus = 0, _pragma = 0, _storge = 0, _manic = 0, _miseo = 0) {
        if (typeof _eros == "number") {
            if (debug) console.log("Creating a new instance of Disposition");
            this._setAll(_eros, _philia, _lodus, _pragma, _storge, _manic, _miseo);
        }
        else if (_eros instanceof Object) {
            this.fromObject(_eros);

            return this;
        }
        else if (typeof _eros == "string" && _eros.slice(0,1) == '{') {
            try {
                var _json = JSON.parse(_eros);
            }
            catch (e) {
                console.log(e);
            }
            
            if (_json instanceof Object) {
                this.fromJSON(_json);
                
                return this;
            }
        }
    }
    
    toObject() {
        var _blob = {};
        for (var property in this) {
            _blob[property] = this[property];
        }
        
        return _blob;
    }
    
    toMap() {
        var _map = new Map();
        for (var property in this) {
            _map.set(property, this[property])
        }
        
        return _map;
    }
    
    toJSON() {
        return JSON.stringify(this.toObject());
    }
    
    fromObject(_object) {
        for (var property in _object) {
            if (_object.hasOwnProperty(property)) {
                this[property] = _object[property];
            }
        }
        
        return true;
    }
    
    fromJSON(_json) {
        if (typeof json == "string") {
            try {
                var json = JSON.parse(jsonString);
            }
            catch (e) {
                if (debug) console.log("Parameter `jsonString` could not be parsed to JSON.");
                return undefined;
            }
        }
        
        try {
            this.fromObject(_json);
        }
        catch (e) {
            console.log(e);
        }
        
        return this;
    }
    
    set(_eros = 0, _philia = 0, _lodus = 0, _pragma = 0, _storge = 0, _manic = 0, _miseo = 0) {
        if (isNaN(_eros))
            this._setDispositionType(_eros, _philia);
        else
            this._setAll(_eros, _philia, _lodus, _pragma, _storge, _manic, _miseo);
    }
    
    _setDispositionType(_type, _int = 0) {
        if (!this.hasOwnProperty(_type))
            return undefined;
        
        this[_type] = Number.parseInt(_int);
    }
    
    get(_type) {
        if (!this.hasOwnProperty(_type))
            return undefined;
        
        return this[_type];
    }

    _setAll(_eros = 0, _philia = 0, _lodus = 0, _pragma = 0, _storge = 0, _manic = 0, _miseo = 0) {
        _eros = Number.parseInt(_eros);
        _philia = Number.parseInt(_philia);
        _lodus = Number.parseInt(_lodus);
        _pragma = Number.parseInt(_pragma);
        _storge = Number.parseInt(_storge);
        _manic = Number.parseInt(_manic);
        _miseo = Number.parseInt(_miseo);
        
        _eros = isNaN(_eros) ? 0 : _eros;
        _philia = isNaN(_philia) ? 0 : _philia;
        _lodus = isNaN(_lodus) ? 0 : _lodus;
        _pragma = isNaN(_pragma) ? 0 : _pragma;
        _storge = isNaN(_storge) ? 0 : _storge;
        _manic = isNaN(_manic) ? 0 : _manic;
        _miseo = isNaN(_miseo) ? 0 : _miseo;

        _eros = _eros < -100 ? -100 : _eros;
        _philia = _philia < -100 ? -100 : _philia;
        _lodus = _lodus < -100 ? -100 : _lodus;
        _pragma = _pragma < -100 ? -100 : _pragma;
        _storge = _storge < -100 ? -100 : _storge;
        _manic = _manic < -100 ? -100 : _manic;
        _miseo = _miseo < -100 ? -100 : _miseo;

        _eros = _eros > 100 ? 100 : _eros;
        _philia = _philia > 100 ? 100 : _philia;
        _lodus = _lodus > 100 ? 100 : _lodus;
        _pragma = _pragma > 100 ? 100 : _pragma;
        _storge = _storge > 100 ? 100 : _storge;
        _manic = _manic > 100 ? 100 : _manic;
        _miseo = _miseo > 100 ? 100 : _miseo;

        this.eros = _eros;
        this.philia = _philia;
        this.lodus = _lodus;
        this.pragma = _pragma;
        this.storge = _storge;
        this.manic = _manic;
        this.miseo = _miseo;
    }

    offset(_eros = 0, _philia = 0, _lodus = 0, _pragma = 0, _storge = 0, _manic = 0) {
        _eros = isNaN(_eros) ? 0 : _eros;
        _philia = isNaN(_philia) ? 0 : _philia;
        _lodus = isNaN(_lodus) ? 0 : _lodus;
        _pragma = isNaN(_pragma) ? 0 : _pragma;
        _storge = isNaN(_storge) ? 0 : _storge;
        _manic = isNaN(_manic) ? 0 : _manic;
        _miseo = isNaN(_miseo) ? 0 : _miseo;

        this._setAll(this.eros + _eros, this.philia + _philia, this.lodus + _lodus, this.pragma + _pragma, this.storge + _storge, this.manic + _manic, this.miseo + _miseo);
    }
}

/**
 * Class that represents all Character(s)
 * @extends {Entity}
 */
class Character extends Entity {
    /**
     * Creates a Character
     * @param  {String} _id      Unique ID
     * @param  {String} _name    Name
     * @param  {Number} _age     Age
     * @param  {Number} _sex     Sex (0 Male, 1 Female, 2 Herm)
     * @param  {String} _species Species
     */
    constructor(_id = "nickWilde", _name = "Wilde, Nicholas", _age = 33, _sex = 0, _species = "fox") {
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
                this.fromJSON(_json);
                
                return this;
            }
        }
        
        if (debug) console.log("Creating a new instance of Character with ID `{0}`".format(_id));

        super(_id);
        /**
         * Surname
         * @type {String} Cannot be undefined!
         */
        this.surname = undefined;
        if (_name.split(", ").length > 1) {
            var tempName = _name.split(", ");
            this.name = tempName[1];
            this.surname = tempName[0];
        }
        else if (_name.split(" ").length > 1) {
            var tempName = _name.split(" ");
            this.name = tempName[0];
            this.surname = tempName[1];
        }
        else {
            this.name = _name;
        }
        /**
         * Nickname
         * @type {String} Can be undefined
         */
        this.nickname = undefined;
        /**
         * Age
         * @type {Number} 0 to Number.MAX_VALUE
         */
        this.age = this.setAge(_age);
        /**
         * Path to Character's picture
         * @type {String} Relative path to an image, or base64 encoded String
         */
        this.image = "resources/images/characters/{0}.svg".format(this.id); // base64 image, or url

        this.addAvailableAction("talk");
        this.addAvailableAction("attack");
        this.addAvailableAction("follow");
        this.addAvailableAction("stay");
        this.addAvailableAction("hold");
        this.addAvailableAction("open"); // inventory... maybe :v
        this.addAvailableAction("give");
        this.addAvailableAction("remove");
        this.addAvailableAction("take");
        this.addAvailableAction("wear");
        this.addAvailableAction("hug");
        this.addAvailableAction("kiss");

        /**
         * Intraactions this Character is currently performing
         * @type {Map} <kIntraactionTypes>
         */
        this.currentActions = new Map();
        /**
         * Interactions this Character is currently performing
         * @type {Map} <kInteractionTypes>
         */
        this.currentInteractions = new Map(); // <this.bodyParts.*, [interactionType, Character, Character.bodyParts.*]>
        /**
         * Locations known by this Character
         * @type {Set} <Location>
         */
        this.knownLocations = new Set();
        /**
         * Spells known by this Character
         * @type {Set} <Spell>
         */
        this.knownSpells = new Set();

        /**
         * Item(s) this Character has
         * @type {Array} <Item>
         */
        this.items = new Array();
        /**
         * Item(s) this Character is holding; will never exceed two (2) Item(s)
         * @type {Array} <Item>
         */
        this.heldItems = new Array();
        /**
         * Current Phone this Character is using
         * @type {Phone} Can be undefined
         */
        this.phone = undefined;

        /**
         * Base disposition this Character has for others
         * @type {Disposition}
         */
        this.defaultDisposition = new Disposition(0,0,0,0,0,0);
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
         * Life; should this drop to 0, u ded
         * @type {Number} 0 to Number.MAX_VALUE
         */
        this.life = 100;
        /**
         * Max life; should never drop below 1
         * @type {Number} 1 to Number.MAX_VALUE
         */
        this.lifeMax = 100;
        /**
         * Mana; should this ever be greater than 0, things will be revealed
         * @type {Number} 0 to Number.MAX_VALUE
         */
        this.mana = 0;
        /**
         * Max mana
         * @type {Number} 0 to Number.MAX_VALUE
         */
        this.manaMax = 0;
        /**
         * Mana cost offset percentage when casting spells
         * @type {Number} -100 to 100
         */
        this.manaCostOffsetPercent = 0;
        /**
         * Stamina; should this drop to 0, u unconscious
         * @type {Number} 0 to Number.MAX_VALUE
         */
        this.stamina = 100;
        /**
         * Max stamina; should never drop below 1
         * @type {Number} 0 to Number.MAX_VALUE
         */
        this.staminaMax = 100;
        /**
         * Money
         * @type {Number} 0 to Number.MAX_VALUE
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
         * Physical sexual identity
         * @type {Number} 0 - male, 1 - female, 2 - hermaphrodite
         */
        this.sex = 0;
        /**
         * Personal sexual identity
         * @type {Number} 0 - male, 1 - female, 2 - hermaphrodite
         */
        this.gender = 0;

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
        this.bodyParts = new Set();
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
         * @type {String} (kHandTypes)
         */
        this.handType = "pad";
        /**
         * Feet type
         * @type {String} (kHandTypes)
         */
        this.feetType = "pad";
        /**
         * Relatives
         * @type {Set} <Character>
         */
        this.relatives = new Set();
        /**
         * Eye type
         * @type {String} (kEyeTypes)
         */
        this.eyeType = "circle";
        /**
         * Eye colour
         * @type {String}
         */
        this.eyeColour = "green";
        /**
         * Pelt type
         * @type {String} (kPeltTypes)
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
        this.clothing = new Map();
        this.clothing.set("hat", undefined);
        this.clothing.set("mask", undefined);
        this.clothing.set("glasses", undefined);
        this.clothing.set("earPiercingLeft", undefined);
        this.clothing.set("earPiercingRight", undefined);
        this.clothing.set("nosePiercing", undefined);
        this.clothing.set("lipPiercing", undefined);
        this.clothing.set("tonguePiercing", undefined);
        this.clothing.set("neckwear", undefined);
        this.clothing.set("shirt", undefined);
        this.clothing.set("jacket", undefined);
        this.clothing.set("belt", undefined);
        this.clothing.set("gloves", undefined);
        this.clothing.set("underwear", undefined);
        this.clothing.set("pants", undefined);
        this.clothing.set("socks", undefined);
        this.clothing.set("shoes", undefined);
        this.clothing.set("bra", undefined);

        /**
         * Map of Characters and this Character's disposition for them
         * @type {Map} <Character, Disposition>
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

        /**
         * Previous Room
         * @type {Room} Can be undefined
         */
        this.previousRoom = undefined;
        /**
         * Current Room
         * @type {Room} Cannot be undefined! But it is! :V
         */
        this.room = undefined;

        charactersIndexes.set(_id, this);

        this.setSex(_sex);
        this.gender = this.sex;
        this.setSpecies(_species);
        this.stand();
    }
    
    fromJSON(json = "") {
        if (debug) console.log("Running fromJSON");
        
        if (typeof json == "string") {
            try {
                json = JSON.parse(json);
            }
            catch (e) {
                if (debug) console.log("Parameter `json` could not be parsed to JSON.");
                return undefined;
            }
        }
        
        if (typeof json["id"] == "undefined" || typeof json["name"] == undefined) {
            if (debug) console.log("ID or Name are undefined.");
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
                if (kBodyPartTypes.has(_bodyPart))
                    this.addBodyPart(_bodyPart);
            }, this);
        } catch (e) {}
        delete json["bodyParts"];
        //  bodyPartsSlickWithCum
        try {
            if (!(this.bodyPartsSlickWithCum instanceof Set)) this.bodyPartsSlickWithCum = new Set();
            _tmpArr = JSON.parse(json["bodyPartsSlickWithCum"]);
            _tmpArr.forEach(function(_bodyPart) {
                if (kBodyPartTypes.has(_bodyPart))
                    this.addBodyPartSlickWithCum(_bodyPart);
            }, this);
        } catch (e) {}
        delete json["bodyPartsSlickWithCum"];
        //  bodyPartsSlickWithPre
        try {
            if (!(this.bodyPartsSlickWithPre instanceof Set)) this.bodyPartsSlickWithPre = new Set();
            _tmpArr = JSON.parse(json["bodyPartsSlickWithPre"]);
            _tmpArr.forEach(function(_bodyPart) {
                if (kBodyPartTypes.has(_bodyPart))
                    this.addBodyPartSlickWithPre(_bodyPart);
            }, this);
        } catch (e) {}
        delete json["bodyPartsSlickWithPre"];
        //  followers
        try {
            if (!(this.followers instanceof Set)) this.followers = new Set();
            _tmpArr = JSON.parse(json["followers"]);
            _tmpArr.forEach(function(_character) {
                if (charactersIndexes.has(_character))
                    this.addFollower(charactersIndexes.get(_character));
            }, this);
        } catch (e) {}
        delete json["followers"];
        // _dating
        try {
            if (!(this._dating instanceof Set)) this._dating = new Set();
            _tmpArr = JSON.parse(json["_dating"]);
            _tmpArr.forEach(function(_character) {
                if (charactersIndexes.has(_character))
                    this.date(charactersIndexes.get(_character));
            }, this);
        } catch (e) {}
        delete json["_dating"];
        //  items
        try {
            if (!(this.items instanceof Set)) this.items = new Array();
            _tmpArr = JSON.parse(json["items"]);
            _tmpArr.forEach(function(_item) {
                if (itemsIndexes.has(_item))
                    this.addItem(itemsIndexes.get(_item));
            }, this);
        } catch (e) {}
        delete json["items"];
        //  knownLocations
        try {
            if (!(this.knownLocations instanceof Set)) this.knownLocations = new Set();
            _tmpArr = JSON.parse(json["knownLocations"]);
            _tmpArr.forEach(function(_location) {
                if (locationsIndexes.has(_location))
                    this.knownLocations.add(locationsIndexes.get(_location));
            }, this);
        } catch (e) {}
        delete json["knownLocations"];
        //  knownSpells
        try {
            if (!(this.knownSpells instanceof Set)) this.knownSpells = new Set();
            _tmpArr = JSON.parse(json["knownSpells"]);
            _tmpArr.forEach(function(_spell) {
                if (spellsIndexes.has(_spell))
                    this.knownSpells.add(spellsIndexes.get(_spell));
            }, this);
        } catch (e) {}
        delete json["knownSpells"];
        //  prefersSpecies
        try {
            if (!(this.prefersSpecies instanceof Set)) this.prefersSpecies = new Set();
            _tmpArr = JSON.parse(json["prefersSpecies"]);
            _tmpArr.forEach(function(_int) {
                this.addPreferredSpecies(_int);
            }, this);
        } catch (e) {}
        delete json["prefersSpecies"];
        //  relatives
        try {
            if (!(this.relatlives instanceof Set)) this.relatlives = new Set();
            _tmpArr = JSON.parse(json["relatives"]);
            _tmpArr.forEach(function(_character) {
                if (charactersIndexes.has(_character))
                    this.addRelative(charactersIndexes.get(_character), false);
            }, this);
        } catch (e) {}
        delete json["relatives"];
        //  specialTypes
        try {
            if (!(this.specialTypes instanceof Set)) this.specialTypes = new Set();
            _tmpArr = JSON.parse(json["specialTypes"]);
            _tmpArr.forEach(function(_specialType) {
                if (kSpecialTypes.has(_specialType))
                    this.addSpecialType(_specialType);
            }, this);
        } catch (e) {}
        delete json["specialTypes"];
        
        // Maps
        //  sexCountMap
        try {
            if (!(this.sexCountMap instanceof Set)) this.sexCountMap = new Map();
            _tmpArr = JSON.parse(json["sexCountMap"]);
            _tmpArr.forEach(function(_int, _character) {
                if (charactersIndexes.has(_character)) {
                    _int = Number.parseInt(_int);
                    this.sexCountMap.set(charactersIndexes.get(_character), (_int >= 0 ? _int : 0));
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
                if (charactersIndexes.has(_character)) {
                    _int = Number.parseInt(_int);
                    this.sexRefusalCountMap.set(charactersIndexes.get(_character), (_int >= 0 ? _int : 0));
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
                if (charactersIndexes.has(_character[0]))
                    this.setCharacterDisposition(_character[0], new Disposition(_character[1]));
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

                if (entityIndexes.has(_entity))
                    _entity = entityIndexes.get(_entity);
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
                            this.hold(_entity);
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
                    _clothing = clothingIndexes.has(_clothing) ? clothingIndexes.get(_clothing) : undefined;

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
                if (charactersIndexes.has(_character)) {
                    _int = Number.parseInt(_int);
                    this._dated.set(charactersIndexes.get(_character), (_int >= 0 ? _int : 0));
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
        //  defaultDiposition
        this.defaultDisposition = new Disposition(json["defaultDisposition"]);
        delete json["defaultDisposition"];
        //  following
        this.following = undefined;
        if (charactersIndexes.has(json["following"]))
            this.follow(charactersIndexes.get(json["following"]));
        delete json["following"];
        //  furniture
        this.furniture = undefined;
        if (furnitureIndexes.has(json["furniture"])) {
            furnitureIndexes.get(json["furniture"]).addCharacter(this);
            this.furniture = furnitureIndexes.get(json["furniture"]);
        }
        delete json["furniture"];
        //  phone
        this.phone = undefined;
        if (phonesIndexes.has(json["phone"])) {
            this.phone = phonesIndexes.get(json["phone"]);
        }
        delete json["phone"];
        //  previousRoom
        this.previousRoom = undefined;
        if (roomsIndexes.has(json["previousRoom"]))
            this.previousRoom = roomsIndexes.get(json["previousRoom"]);
        delete json["previousRoom"];
        //  room
        this.room = undefined;
        if (roomsIndexes.has(json["room"]))
            this.moveToRoom(roomsIndexes.get(json["room"]));
        delete json["room"];
        delete json["cell"];
        delete json["location"];

        if (kHandTypes.has(json["handType"]))
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

    calculateManaCost(_cost = 0) {
        if (!isNaN(_cost)) {}
        else if (_cost instanceof Spell) {
            _cost = _cost.manaCost;
        }
        else if (spellsIndexes.has(_cost))
            _cost = spellsIndexes.get(_cost).manaCost;
        if (this.manaCostOffsetPercent == 0 || _cost == 0)
            return _cost;
        else if (_cost < 0)
            return 0;
        else
            return _cost - (_cost / (100 / this.manaCostOffsetPercent));
    }

    getItems() {
        return this.items;
    }
    addItem(_item) {
        if (!(_item instanceof Item)) {
            if (itemsIndexes.has(_item))
                _item = itemsIndexes.get(_item);
            else
                return undefined;
        }
        this.items.push(_item);
        if (_item instanceof Phone && _item.owner == this) {
            this.phone = _item;
        }
        
        return true;
    }
    removeItem(_item) {
        if (!(_item instanceof Item)) {
            if (itemsIndexes.has(_item))
                _item = itemsIndexes.get(_item);
            else
                return undefined;
        }
        if (!this.containsItem(_item))
            return true;

        if (this instanceof Character && this.wearing(_item))
            this.takeOff(_item);
        
        this.items.splice(this.items.indexOf(_item), 1);
        return true;
    }

    containsItem(_item) {
        if (!(_item instanceof Item)) {
            if (itemsIndexes.has(_item))
                _item = itemsIndexes.get(_item);
            else
                return undefined;
        }
        return this.items.indexOf(_item) >= 0;
    }
    hasItem(_item) {
        return this.containsItem(_item);
    }
    getItems() {
        return this.items;
    }
    getNumberOfItems() {
        return this.items.length;
    }

    addHeldItem(_item) {
    	return this.hold(_item);
    }
    removeHeldItem(_item) {
        this.release(_item);
    }
    hasItemInRightHand() {
        return this.heldItems.length > 0 && this.heldItems[0] instanceof Item;
    }
    hasItemInLeftHand() {
        return this.heldItems.length > 1 && this.heldItems[1] instanceof Item;
    }
    hasItemsInBothHands() {
        return this.heldItems[0] instanceof Item && this.heldItems[1] instanceof Item;
    }
    handsFull() {
        return this.hasItemsInBothHands();
    }
    hasItemInEitherHand() {
        return this.hasItemInRightHand() || this.hasItemInLeftHand();
    }
    getItemInRightHand() {
        if (this.hasItemInRightHand())
            return this.heldItems[0];
        else
            return undefined;
    }
    getItemInLeftHand() {
        if (this.hasItemInLeftHand())
            return this.heldItems[1];
        else
            return undefined;
    }
    removeItemInRightHand() {
        return this.removeHeldItem(this.getItemInRightHand());
    }
    removeItemInLeftHand() {
        return this.removeHeldItem(this.getItemInLeftHand());
    }
    holding(_item) {
        if (!(_item instanceof Item)) {
            if (itemsIndexes.has(_item))
                _item = itemsIndexes.get(_item);
            else
                return undefined;
        }
        var _isHolding = false;
        this.heldItems.forEach(function(__item) {
            if (_item == __item)
                _isHolding = true;
        }, this);
        return _isHolding;
    }
    isHolding(_item) {
        return this.holding(_item);
    }

    clean() {
        this.bodyPartsSlickWithCum.clear();
        this.bodyPartsSlickWithPre.clear();
        this.cleanliness = 100;
        this.odorSex = 0;
        this.odorSweat = 0;
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

        return _int;
    }
    incAge(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setAge(this.age + _int);
    }
    addAge(_int) {
        return this.incAge(_int);
    }

    setHunger(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.hungerMax)
            _int = this.hungerMax;
        this.hunger = _int;
        return _int;
    }
    incHunger(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setHunger(this.hunger + _int);
    }
    addHunger(_int) {
        return this.incHunger(_int);
    }
    decHunger(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setHunger(this.hunger - _int);
    }
    subHunger(_int) {
        return this.decHunger(_int);
    }

    setLife(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.lifeMax)
            _int = this.lifeMax;
        this.life = _int;
        return _int;
    }
    incLife(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLife(this.life + _int);
    }
    addLife(_int) {
        return this.incLife(_int);
    }
    decLife(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLife(this.life - _int);
    }
    subLife(_int) {
        return this.decLife(_int);
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
        return _int;
    }
    incLifeMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLifeMax(this.lifeMax + _int);
    }
    addLifeMax(_int) {
        return this.incLifeMax(_int);
    }
    decLifeMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLifeMax(this.lifeMax - _int);
    }
    subLifeMax(_int) {
        return this.decLifeMax(_int);
    }

    setMana(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.manaMax)
            _int = this.manaMax;
        this.mana = _int;
        return _int;
    }
    incMana(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMana(this.mana + _int);
    }
    addMana(_int) {
        return this.incMana(_int);
    }
    decMana(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMana(this.mana - _int);
    }
    subMana(_int) {
        return this.decMana(_int);
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
        return _int;
    }
    incManaMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setManaMax(this.manaMax + _int);
    }
    addManaMax(_int) {
        return this.incManaMax(_int);
    }
    decManaMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setManaMax(this.manaMax - _int);
    }
    subManaMax(_int) {
        return this.decManaMax(_int);
    }

    setManaCostOffsetPercent(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < -100)
            _int = -100;
        else if (_int > 100)
            _int = 100;
        this.manaCostOffsetPercent = _int;
        return _int;
    }
    incManaCostOffsetPercent(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setManaCostOffsetPercent(this.manaCostOffsetPercent + _int);
    }
    addManaCostOffsetPercent(_int) {
        return this.incManaCostOffsetPercent(_int);
    }
    decManaCostOffsetPercent(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setManaCostOffsetPercent(this.manaCostOffsetPercent - _int);
    }
    subManaCostOffsetPercent(_int) {
        return this.decManaCostOffsetPercent(_int);
    }

    setStamina(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.staminaMax)
            _int = this.staminaMax;
        this.stamina = _int;
        return _int;
    }
    incStamina(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStamina(this.stamina + _int);
    }
    addStamina(_int) {
        return this.incStamina(_int);
    }
    decStamina(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStamina(this.stamina - _int);
    }
    subStamina(_int) {
        return this.decStamina(_int);
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
        return _int;
    }
    incStaminaMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStaminaMax(this.staminaMax + _int);
    }
    addStaminaMax(_int) {
        return this.incStaminaMax(_int);
    }
    decStaminaMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStaminaMax(this.staminaMax - _int);
    }
    subStaminaMax(_int) {
        return this.decStaminaMax(_int);
    }

    setMoney(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.money = _int;
        return _int;
    }
    incMoney(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMoney(this.money + _int);
    }
    addMoney(_int) {
        return this.incMoney(_int);
    }
    decMoney(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMoney(this.money - _int);
    }
    subMoney(_int) {
        return this.decMoney(_int);
    }

    setSanity(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.sanityMax)
            _int = this.sanityMax;
        this.sanity = _int;
        return _int;
    }
    incSanity(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSanity(this.sanity + _int);
    }
    addSanity(_int) {
        return this.incSanity(_int);
    }
    decSanity(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSanity(this.sanity - _int);
    }
    subSanity(_int) {
        return this.decSanity(_int);
    }

    setPhilautia(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.philautia = _int;
        return _int;
    }
    incPhilautia(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setPhilautia(this.philautia + _int);
    }
    addPhilautia(_int) {
        return this.incPhilautia(_int);
    }
    decPhilautia(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setPhilautia(this.philautia - _int);
    }
    subPhilautia(_int) {
        return this.decPhilautia(_int);
    }

    setAgape(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.agape = _int;
        return _int;
    }
    incAgape(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setAgape(this.agape + _int);
    }
    addAgape(_int) {
        return this.incAgape(_int);
    }
    decAgape(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setAgape(this.agape - _int);
    }
    subAgape(_int) {
        return this.decAgape(_int);
    }

    setSanguine(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.sanguine = _int;
        return _int;
    }
    incSanguine(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSanguine(this.sanguine + _int);
    }
    addSanguine(_int) {
        return this.incSanguine(_int);
    }
    decSanguine(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSanguine(this.sanguine - _int);
    }
    subSanguine(_int) {
        return this.decSanguine(_int);
    }

    setPhlegmatic(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.phlegmatic = _int;
        return _int;
    }
    incPhlegmatic(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setPhlegmatic(this.phlegmatic + _int);
    }
    addPhlegmatic(_int) {
        return this.incPhlegmatic(_int);
    }
    decPhlegmatic(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setPhlegmatic(this.phlegmatic - _int);
    }
    subPhlegmatic(_int) {
        return this.decPhlegmatic(_int);
    }

    setCholeric(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.choleric = _int;
        return _int;
    }
    incCholeric(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setCholeric(this.choleric + _int);
    }
    addCholeric(_int) {
        return this.incCholeric(_int);
    }
    decCholeric(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setCholeric(this.choleric - _int);
    }
    subCholeric(_int) {
        return this.decCholeric(_int);
    }

    setMelancholic(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.melancholic = _int;
        return _int;
    }
    incMelancholic(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMelancholic(this.melancholic + _int);
    }
    addMelancholic(_int) {
        return this.incMelancholic(_int);
    }
    decMelancholic(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMelancholic(this.melancholic - _int);
    }
    subMelancholic(_int) {
        return this.decMelancholic(_int);
    }

    setLust(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 100)
            _int = 100;
        this.lust = _int;
        return _int;
    }
    incLust(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLust(this.lust + _int);
    }
    addLust(_int) {
        return this.incLust(_int);
    }
    decLust(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLust(this.lust - _int);
    }
    subLust(_int) {
        return this.decLust(_int);
    }

    setExhibitionism(_int) {
    	if (isNaN(_int))
    		_int = 0;
    	else if (_int < 0)
    		_int = 0;
    	else if (_int > 100)
    		_int = 100;
    	this.exhibitionism = _int;
        return _int;
    }
    incExhibitionism(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setExhibitionism(this.exhibitionism + _int);
    }
    addExhibitionism(_int) {
        return this.incExhibitionism(_int);
    }
    decExhibitionism(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setExhibitionism(this.exhibitionism - _int);
    }
    subExhibitionism(_int) {
        return this.decExhibitionism(_int);
    }

    setSomnophilia(_int) {
    	if (isNaN(_int))
    		_int = 0;
    	else if (_int < 0)
    		_int = 0;
    	else if (_int > 100)
    		_int = 100;
    	this.somnophilia = _int;
        return _int;
    }
    incSomnophilia(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSomnophilia(this.somnophilia + _int);
    }
    addSomnophilia(_int) {
        return this.incSomnophilia(_int);
    }
    decSomnophilia(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSomnophilia(this.somnophilia - _int);
    }
    subSomnophilia(_int) {
        return this.decSomnophilia(_int);
    }

    setIntoxication(_int) {
    	if (isNaN(_int))
    		_int = 0;
    	else if (_int < 0)
    		_int = 0;
    	else if (_int > 100)
    		_int = 100;
    	this.intoxication = _int;
        return _int;
    }
    incIntoxication(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIntoxication(this.intoxication + _int);
    }
    addIntoxication(_int) {
        return this.incIntoxication(_int);
    }
    decIntoxication(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIntoxication(this.intoxication - _int);
    }
    subIntoxication(_int) {
        return this.decIntoxication(_int);
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
        return _int;
    }
    incIncestual(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIncestual(this.incestual + _int);
    }
    addIncestual(_int) {
        return this.incIncestual(_int);
    }
    decIncestual(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIncestual(this.incestual - _int);
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
        return this.rut;
    }
    enableRut() {
        this.rut = true;
        return this.rut;
    }
    disableRut() {
        this.rut = false;
        return this.rut;
    }
    toggleRut() {
        this.rut = !this.rut;
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
        return _bool;
    }

    setLiving(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.living = _bool;
        return _bool;
    }

    setVirgin(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.virgin = _bool;
        return _bool;
    }

    setPrefersPredators(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.prefersPredators = _bool;
        return _bool;
    }

    setAvoidsPredators(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.avoidsPredators = _bool;
        return _bool;
    }

    setPrefersPrey(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.prefersPrey = _bool;
        return _bool;
    }

    setAvoidsPrey(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.avoidsPrey = _bool;
        return _bool;
    }

    addBodyPartSlickWithPre(_bodyPart) {
        if (this.hasBodyPart(_bodyPart)) {
            this.bodyPartsSlickWithPre.add(_bodyPart);
        }
    }
    removeBodyPartSlickWithPre(_bodyPart) {
        if (this.hasBodyPart(_bodyPart)) {
            this.bodyPartsSlickWithPre.delete(_bodyPart);
        }
    }
    hasBodyPartSlickWithPre(_bodyPart) {
        return this.bodyPartsSlickWithPre.has(_bodyPart);
    }
    addBodyPartSlickWithCum(_bodyPart) {
        if (this.hasBodyPart(_bodyPart)) {
            this.bodyPartsSlickWithCum.add(_bodyPart);
        }
    }
    removeBodyPartSlickWithCum(_bodyPart) {
        if (this.hasBodyPart(_bodyPart)) {
            this.bodyPartsSlickWithCum.delete(_bodyPart);
        }
    }
    hasBodyPartSlickWithCum(_bodyPart) {
        return this.bodyPartsSlickWithCum.has(_bodyPart);
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
        return _int;
    }
    getSexualOrientation() {
        return this.sexualOrientation == 0 ? "straight" : (this.sexualOrientation == 1 ? "gay" : "bi");
    }

    setSex(_sex) {
        if (isNaN(_sex)) {
            switch (_sex.slice(0, 1)) {
                case "m" : {
                    _sex = 0;
                }
                case "f" : {
                    _sex = 1;
                }
                case "h" : {
                    _sex = 2;
                }
            }
        }
        else if (_sex >= 0 && _sex < 4) {
            _sex = Number.parseInt(_sex);
        }
        else
            _sex = 0;
        this.sex = _sex;
        return _sex;
    }
    sexName() {
        return this.sex == 0 ? "male" : (this.sex == 1 ? "female" : "herm");
    }
    getSex() {
        return this.sexName();
    }

    sexualOrientationCompatibility(_character) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        if (this.sexualOrientation == 2) // If you're bi
            return true;
        else if (this.sex != _character.sex && this.sexualOrientation == 0) // else if you're female, they're male, and you're straight
            return true;
        else if (this.sex == _character.sex && this.sexualOrientation == 1) // else if you're male, they're male, and you're gay
            return true;
        else // else no
            return false;
    }
    sexualCompatibility(_character) {
        return this.sexualOrientationCompatibility(_character);
    }

    fellatioGiveSet(_int, _character) {

    }

    setDefaultDisposition(_eros = 0, _philia = 0, _lodus = 0, _pragma = 0, _storge = 0, _manic = 0, _miseo = 0) {
        if (!(this.defaultDisposition instanceof Disposition))
            this.defaultDisposition = new Disposition();

        if (_eros instanceof Disposition)
            this.defaultDisposition.set(_eros);
        else if (isNaN(_eros) && this.defaultDisposition.hasOwnProperty(_eros) && typeof Number.parseInt(_philia) == "number")
            this.defaultDisposition.set(_eros, Number.parseInt(_philia));
        else {
            _eros = Number.parseInt(_eros);
            _philia = Number.parseInt(_philia);
            _lodus = Number.parseInt(_lodus);
            _pragma = Number.parseInt(_pragma);
            _storge = Number.parseInt(_storge);
            _manic = Number.parseInt(_manic);
            _miseo = Number.parseInt(_miseo);

            _eros = isNaN(_eros) ? this.defaultDisposition.eros : _eros;
            _philia = isNaN(_philia) ? this.defaultDisposition.philia : _philia;
            _lodus = isNaN(_lodus) ? this.defaultDisposition.lodus : _lodus;
            _pragma = isNaN(_pragma) ? this.defaultDisposition.pragma : _pragma;
            _storge = isNaN(_storge) ? this.defaultDisposition.storge : _storge;
            _manic = isNaN(_manic) ? this.defaultDisposition.manic : _manic;
            _miseo = isNaN(_miseo) ? this.defaultDisposition.miseo : _miseo;

            this.defaultDisposition.set(_eros, _philia, _lodus, _pragma, _storge, _manic, _miseo);
        }

        return this.defaultDisposition;

    }
    setCharacterDisposition(_character, _eros = undefined, _philia = undefined, _lodus = undefined, _pragma = undefined, _storge = undefined, _manic = undefined, _miseo = undefined) {
        if (debug) console.log("Running setCharacterDisposition");

        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        if (_eros instanceof Disposition)
            this.characterDisposition.set(_character, _eros);
        else if (isNaN(_eros) && this.defaultDisposition.hasOwnProperty(_eros) && !isNaN(Number.parseInt(_philia)))
            this.getCharacterDisposition(_character).set(_eros, Number.parseInt(_philia));
        else if (this.characterDisposition.has(_character)) {
            _eros = Number.parseInt(_eros);
            _philia = Number.parseInt(_philia);
            _lodus = Number.parseInt(_lodus);
            _pragma = Number.parseInt(_pragma);
            _storge = Number.parseInt(_storge);
            _manic = Number.parseInt(_manic);
            _miseo = Number.parseInt(_miseo);
            
            _eros = isNaN(_eros) ? this.characterDisposition.get(_character).eros : _eros;
            _philia = isNaN(_philia) ? this.characterDisposition.get(_character).philia : _philia;
            _lodus = isNaN(_lodus) ? this.characterDisposition.get(_character).lodus : _lodus;
            _pragma = isNaN(_pragma) ? this.characterDisposition.get(_character).pragma : _pragma;
            _storge = isNaN(_storge) ? this.characterDisposition.get(_character).storge : _storge;
            _manic = isNaN(_manic) ? this.characterDisposition.get(_character).manic : _manic;
            _miseo = isNaN(_miseo) ? this.characterDisposition.get(_character)._miseo : _miseo;

            this.characterDisposition.get(_character).set(_eros, _philia, _lodus, _pragma, _storge, _manic, _miseo);
        }
        else {
            _eros = Number.parseInt(_eros);
            _philia = Number.parseInt(_philia);
            _lodus = Number.parseInt(_lodus);
            _pragma = Number.parseInt(_pragma);
            _storge = Number.parseInt(_storge);
            _manic = Number.parseInt(_manic);
            _miseo = Number.parseInt(_miseo);
            
            _eros = isNaN(_eros) ? this.defaultDisposition.eros : _eros;
            _philia = isNaN(_philia) ? this.defaultDisposition.philia : _philia;
            _lodus = isNaN(_lodus) ? this.defaultDisposition.lodus : _lodus;
            _pragma = isNaN(_pragma) ? this.defaultDisposition.pragma : _pragma;
            _storge = isNaN(_storge) ? this.defaultDisposition.storge : _storge;
            _manic = isNaN(_manic) ? this.defaultDisposition.manic : _manic;
            _miseo = isNaN(_miseo) ? this.defaultDisposition.miseo : _miseo;

            this.characterDisposition.set(_character, new Disposition(_eros, _philia, _lodus, _pragma, _storge, _manic, _miseo));
        }

        return this.characterDisposition.get(_character);
    }
    setCharacterEros(_character, _int) {
        this.setCharacterDisposition(_character, "eros", _int);
    }
    addCharacterEros(_character, _int) {
        this.incCharacterEros(_character, _int);
    }
    incCharacterEros(_character, _int = 1) {
        this.setCharacterEros(_character, this.getCharacterDisposition(_character)["eros"] + _int);
    }
    getCharacterEros(_character) {
        return this.getCharacterDisposition(_character, "eros");
    }
    setCharacterPhilia(_character, _int) {
        this.setCharacterDisposition(_character, "philia", _int);
    }
    addCharacterPhilia(_character, _int) {
        this.incCharacterPhilia(_character, _int);
    }
    incCharacterPhilia(_character, _int = 1) {
        this.setCharacterPhilia(_character, this.getCharacterDisposition(_character)["philia"] + _int);
    }
    getCharacterPhilia(_character) {
        return this.getCharacterDisposition(_character, "philia");
    }
    setCharacterLodus(_character, _int) {
        this.setCharacterDisposition(_character, "lodus", _int);
    }
    addCharacterLodus(_character, _int) {
        this.incCharacterLodus(_character, _int);
    }
    incCharacterLodus(_character, _int = 1) {
        this.setCharacterLodus(_character, this.getCharacterDisposition(_character)["lodus"] + _int);
    }
    getCharacterLodus(_character) {
        return this.getCharacterDisposition(_character, "lodus");
    }
    setCharacterPragma(_character, _int) {
        this.setCharacterDisposition(_character, "pragma", _int);
    }
    addCharacterPragma(_character, _int) {
        this.incCharacterPragma(_character, _int);
    }
    incCharacterPragma(_character, _int = 1) {
        this.setCharacterPragma(_character, this.getCharacterDisposition(_character)["pragma"] + _int);
    }
    getCharacterPragma(_character) {
        return this.getCharacterDisposition(_character, "pragma");
    }
    setCharacterStorge(_character, _int) {
        this.setCharacterDisposition(_character, "storge", _int);
    }
    addCharacterStorge(_character, _int) {
        this.incCharacterStorge(_character, _int);
    }
    incCharacterStorge(_character, _int = 1) {
        this.setCharacterStorge(_character, this.getCharacterDisposition(_character)["storge"] + _int);
    }
    getCharacterStorge(_character) {
        return this.getCharacterDisposition(_character, "storge");
    }
    setCharacterManic(_character, _int) {
        this.setCharacterDisposition(_character, "manic", _int);
    }
    addCharacterManic(_character, _int) {
        this.incCharacterManic(_character, _int);
    }
    incCharacterManic(_character, _int = 1) {
        this.setCharacterManic(_character, this.getCharacterDisposition(_character)["manic"] + _int);
    }
    getCharacterManic(_character) {
        return this.getCharacterDisposition(_character, "manic");
    }
    setCharacterMiseo(_character, _int) {
        this.setCharacterDisposition(_character, "miseo", _int);
    }
    addCharacterMiseo(_character, _int) {
        this.incCharacterMiseo(_character, _int);
    }
    incCharacterMiseo(_character, _int = 1) {
        this.setCharacterMiseo(_character, this.getCharacterDisposition(_character)["miseo"] + _int);
    }
    getCharacterMiseo(_character) {
        return this.getCharacterDisposition(_character, "miseo");
    }
    getCharacterDisposition(_character, _dispositionType = undefined) {
        if (debug) console.log("Running getCharacterDisposition");

        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        if (!(_character instanceof Character)) {
            if (debug) console.log("\t_character `{0}` isn't valid".format(_character));
            return false;
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
    hasDisposition(_character) {
        return this.hasCharacterDisposition(_character);
    }
    hasCharacterDisposition(_character) {
        if (debug) console.log("Running hasDisposition");
        
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        
        return this.characterDisposition.has(_character);
    }
    hasMet(_character) {
        return this.hasCharacterDisposition(_character);
    }
    incCharacterAllDispositions(_character, _int) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
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
        this.setCharacterDisposition(_character, _disposition.eros + _int, _disposition.philia + _int, _disposition.lodus + _int, _disposition.pragma + _int, _disposition.storge + _int, _disposition.manic + _int, _disposition.miseo - _int);
    }
    decCharacterAllDispositions(_character, _int) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
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
        this.setCharacterDisposition(_character, _disposition.eros - _int, _disposition.philia - _int, _disposition.lodus - _int, _disposition.pragma - _int, _disposition.storge - _int, _disposition.manic - _int, _disposition.miseo + _int);
    }

    date(_character, _updateChild = true) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }

        this._dating.add(_character);
        if (this._dated.has(_character))
            this._dated.set(_character, this._dated.get(_character) + 1);
        else
            this._dated.set(_character, 1);

        if (_updateChild)
            _character.date(this, false);

        return true;
    }
    dated(_character, _int = 0, _updateChild = true) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        _int = Number.parseInt(_int);
        if (isNaN(_int) || _int < 0)
            _int = 0;

        this._dated.set(_character, _int);
        if (_updateChild)
            _character.dated(this, _int, false);
    }
    isDating(_character) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }

        return this._dating.has(_character);
    }
    hasDated(_character) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }

        return this._dated.has(_character);
    }
    getCurrentDates() {
        return this._dating;
    }
    getPreviousDates() {
        return this._dated;
    }
    getNumberOfDates(_character) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }

        if (this.hasDated(_character))
            return this._dated.get(_character);
        else
            return 0;
    }
    dump(_character, _updateChild = true) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }

        if (this.isDating(_character)) {
            this._dating.remove(_character);
            _character.dump(this, false);
            return true;
        }
        else
            return false;
    }
    breakUp(_character) {
        return this.dump(_character);
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
        return this.clothing.get("hat") instanceof Clothing;
    }
    getHat() {
        return this.clothing.get("hat");
    }

    hasShirt() {
        return this.clothing.get("shirt") instanceof Clothing;
    }
    getShirt() {
        return this.clothing.get("shirt");
    }

    hasJacket() {
        return this.clothing.get("jacket") instanceof Clothing;
    }
    getJacket() {
        return this.clothing.get("jacket");
    }

    hasNeckwear() {
        return this.clothing.get("neckwear") instanceof Clothing;
    }
    getNeckwear() {
        return this.clothing.get("neckwear");
    }

    hasBra() {
        return this.clothing.get("bra") instanceof Clothing;
    }
    getBra() {
        return this.clothing.get("bra");
    }

    hasBelt() {
        return this.clothing.get("belt") instanceof Clothing;
    }
    getBelt() {
        return this.clothing.get("belt");
    }

    hasUnderwear() {
        return this.clothing.get("underwear") instanceof Clothing;
    }
    getUnderwear() {
        return this.clothing.get("underwear");
    }

    hasPants() {
        return this.clothing.get("pants") instanceof Clothing;
    }
    getPants() {
        return this.clothing.get("pants");
    }
    
    hasShoes() {
        return this.clothing.get("shoe") instanceof Clothing;
    }
    getShoes() {
        return this.clothing.get("shoes");
    }
    getClothing(_type) {
        if (kClothingTypes.has(_type))
            return this.clothing.get(_clothing.type);
        else
            return undefined;
    }
    setClothing(_clothing) {
        this.putOn(_clothing);
    }

    addCurrentAction(_actionType, _entity = undefined, _subEntity = undefined) {
        if (!kActionTypes.has(_actionType))
            return undefined;
        if (!(_entity instanceof Entity))
            _entity = entityIndexes.has(_entity) ? entityIndexes.get(_entity) : undefined;

        this.currentActions.set(_actionType, _entity);
    }
    removeCurrentAction(_actionType, _entity = undefined, _subEntity = undefined) {
        if (!kActionTypes.has(_actionType) && _actionType !== undefined)
            return undefined;
        if (!(_entity instanceof Entity))
            _entity = entityIndexes.has(_entity) ? entityIndexes.get(_entity) : undefined;

        this.currentActions.delete(_actionType);
        return true;
    }
    hasCurrentAction(_actionType) {
        return this.currentActions.has(_actionType);
    }
    getStance() {
        if (this.currentActions.has("lay"))
            return "lay";
        else if (this.currentActions.has("sit"))
            return "sit";
        else if (this.currentActions.has("stand"))
            return "stand";
        else if (this.currentActions.has("kneel"))
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
        if (kIntraactionTypes.has(_actionType))
            return this.hasCurrentAction(_actionType);
        else
            return false;
    }

    attack(_entity) {
        if (!(_entity instanceof Entity)) {
            if (entityIndexes.has(_entity))
                _entity = entityIndexes.get(_entity)
            else
                return undefined;
        }
        this.addCurrentAction("attack", _entity);
        return true;
    }
    bewitched(_character, _cron = "4m") {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        this.addCurrentAction("bewitched", _character);
        new GameEvent("{0}BewitchedRemove".format(this.id), "bewitched", _character, this, undefined, undefined, undefined, undefined, _cron, "{0}.removeCurrentAction('bewitched')".format(this.id), true);
        return true;
    }
    consume(_entity) {
        if (!(_entity instanceof Entity)) {
            if (entityIndexes.has(_entity))
                _entity = entityIndexes.get(_entity)
            else
                return undefined;
        }
        this.addCurrentAction("consume", _entity);
        return true;
    }
    disrobe(_clothing) {
        if (!(_clothing instanceof Clothing))
            _clothing = clothingIndexes.has(_clothing) ? clothingIndexes.get(_clothing) : _clothing;

        if (_clothing instanceof Clothing) {
            if (kClothingTypes.has(_clothing.type))
                this.clothing.set(_clothing.type, undefined);
            this.addItem(_clothing);
        }
        else if (kClothingTypes.has(_clothing))
            this.clothing.set(_clothing, undefined);

        return true;
    }
    fuck(_character = undefined, _furniture = undefined) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.has(_furniture) ? furnitureIndexes.get(_furniture) : undefined;
        
        if (_character.sex == 1)
            this.hadSexWithFemale = true;
        else if (_character.sex == 0)
            this.hadSexWithMale = true;

        this.removeCurrentAction("masturbate");
        _character.removeCurrentAction("masturbate");

        this.addCurrentAction("sex");
        _character.addCurrentAction("sex");
        return true;
    }
    follow(_character) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character)
            else
                return undefined;
        }
        this.following = _character;
        this.addCurrentAction("follow", _character);
        return true;
    }
    give(_entity, _item) {
        if (!(_entity instanceof Entity)) {
            if (entityIndexes.has(_entity))
                _entity = entityIndexes.get(_entity)
            else
                return undefined;
        }
        if (!(_item instanceof Item)) {
            if (itemsIndexes.has(_item))
                _item = itemsIndexes.get(_item);
            else
                return undefined;
        }

        return true;
    }
    hold(_item, _hand = undefined) {
        if (!(_item instanceof Item)) {
            if (itemsIndexes.has(_item))
                _item = itemsIndexes.get(_item);
            else
                return undefined;
        }
        if (!this.containsItem(_item))
            return false;
        if (_hand !== undefined) {
            if (isNaN(_hand)) {
                switch (_hand.slice(0, -1).toLowerCase()) {
                    case 1 :
                    case "l" : {
                        _hand = 1;
                        break;
                    }
                    case 0 :
                    case "r" : {
                        _hand = 0;
                        break;
                    }
                }
            }
            else if (_hand > 1 || _hand < 0) {
                _hand = 0;
            }
            else {
                _hand = Number.parseInt(_hand);
            }
        }

        if (typeof _hand == "number") {
            if (this.heldItems[_hand] instanceof Item) {
                var __item = this.heldItems[_hand];
                if (!this.release(__item))
                    return false;
            }
            this.heldItems[_hand] = _item;
        }
        else {
            if (this.heldItems.length > 1) {
                var __item = this.heldItems[0];
                if (this.release(__item))
                    this.heldItems[0] = _item;
                else
                    return false;
            }
            else
                this.heldItems.push(_item);
        }
        this.addCurrentAction("hold", _item);
        return true;
    }
    hug(_entity) {
        if (!(_entity instanceof Entity)) {
            if (entityIndexes.has(_entity))
                _entity = entityIndexes.get(_entity)
            else
                return undefined;
        }
        this.addCurrentAction("hug", _entity);
        return true;
    }
    kiss(_entity, _bodyPart = undefined) {
        if (!(_entity instanceof Entity)) {
            if (entityIndexes.has(_entity))
                _entity = entityIndexes.get(_entity)
            else
                return undefined;
        }
        this.addCurrentAction("kiss", _entity, _bodyPart);
        return true;
    }
    kneel(_entity) {
        if (!(_entity instanceof Entity))
            _entity = entityIndexes.has(_entity) ? entityIndexes.get(_entity) : undefined;

        this.removeCurrentAction("lay");
        this.removeCurrentAction("sit");
        this.removeCurrentAction("stand");
        this.removeCurrentAction("walk");

        this.addCurrentAction("kneel", _entity);
        return true;
    }
    lay(_furniture = undefined, _dontOverride = []) {
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.has(_furniture) ? furnitureIndexes.get(_furniture) : undefined;
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
        if (!(_entity instanceof Entity))
            _entity = entityIndexes.has(_entity) ? entityIndexes.get(_entity) : undefined;
        this.addCurrentAction("look", _entity);
        return true;
    }
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

        this.addCurrentAction("masturbate");
        return true;
    }
    open(_entity) {
        if (!(_entity instanceof Entity)) {
            if (entityIndexes.has(_entity))
                _entity = entityIndexes.get(_entity)
            else
                return undefined;
        }
    }
    pray(_entity) {
        if (!(_entity instanceof Entity))
            _entity = entityIndexes.has(_entity) ? entityIndexes.get(_entity) : undefined;
        this.addCurrentAction("pray", _entity);
        return true;
    }
    put(_entity, _item) {
        return this.give(_entity, _item);
    }
    rape(_character) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character)
            else
                return undefined;
        }
    }
    release(_item) {
        if (!(_item instanceof Item)) {
            if (itemsIndexes.has(_item))
                _item = itemsIndexes.get(_item);
            else
                return undefined;
        }

        if (this.holding(_item))
            this.heldItems.remove(_item);
        else
            return false;
        if (!this.hasItemInEitherHand())
            this.removeCurrentAction("hold");
        return true;
    }
    remove(_item) {
        if (!(_item instanceof Item)) {
            if (itemsIndexes.has(_item))
                _item = itemsIndexes.get(_item);
            else
                return undefined;
        }
        if (this.hasItem(_item)) {
            this.release(_item);
            this.removeItem(_item);
        }
        else if (this.wearing(_item)) {
            this.disrobe(_item);
            this.removeItem(_item);
        }
        else
            return false;
        return true;
    }
    /*sex(_character) {
    
    }*/
    sit(_furniture = undefined, _dontOverride = []) {
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.has(_furniture) ? furnitureIndexes.get(_furniture) : undefined;
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
            _furniture = furnitureIndexes.has(_furniture) ? furnitureIndexes.get(_furniture) : undefined;
        if (typeof _dontOverride == "undefined")
            _dontOverride = [];
        else if (_dontOverride instanceof Set)
            _dontOverride = Array.from(_dontOverride);

        this.removeCurrentAction("walk");
        this.removeCurrentAction("masturbate");
        if (_dontOverride.contains("sex")) this.removeCurrentAction("sex");
        if (_furniture instanceof Furniture && _furniture.type == "bed")
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
    steal(_entity, _item) {
        if (!(_entity instanceof Entity)) {
            if (entityIndexes.has(_entity))
                _entity = entityIndexes.get(_entity)
            else
                return undefined;
        }
        if (!(_item instanceof Item)) {
            if (itemsIndexes.has(_item))
                _item = itemsIndexes.get(_item);
            else
                return undefined;
        }
    }
    take(_entity, _item) {
        if (!(_entity instanceof Entity)) {
            if (entityIndexes.has(_entity))
                _entity = entityIndexes.get(_entity)
            else
                return undefined;
        }
        if (!(_item instanceof Item)) {
            if (itemsIndexes.has(_item))
                _item = itemsIndexes.get(_item);
            else
                return undefined;
        }
    }
    talk(_entity) {
        if (!(_entity instanceof Entity))
            _entity = entityIndexes.has(_entity) ? entityIndexes.get(_entity) : undefined;
        this.addCurrentAction("talk", _entity);
        return true;
    }
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
    wear(_clothing, _type = undefined) {
        if (!(_clothing instanceof Clothing))
            _clothing = clothingIndexes.get(_clothing);

        if (_clothing instanceof Clothing) {
            if (kClothingTypes.has(_clothing.type)) {
                this.clothing.set(_clothing.type, _clothing);
                return true;
            }
            return false;
        }
        else {
            if (kClothingTypes.has(_type)) {
                this.takeOff(_type);
                return true;
            }
            else
                return undefined;
        }
    }

    addSexRefusalCount(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        if (!(_character instanceof Character))
            return undefined;

        if (this.sexRefusalCountMap.has(_character))
            this.sexRefusalCountMap.set(_character, this.sexRefusalCountMap.get(_character) + 1);
        else
            this.sexRefusalCountMap.set(_character, 1);

        return this.sexRefusalCountMap.get(_character);
    }
    getSexRefusalCount(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        if (!(_character instanceof Character))
            return undefined;

        if (this.sexRefusalCountMap.has(_character))
            return this.sexRefusalCountMap.get(_character);
        else
            return 0;
    }

    isBewitched() {
        return this.hasCurrentAction("bewitched");
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
        if (this.sex == 0)
            return this.getPants() instanceof Clothing;
        else
            return (this.getShirt() instanceof Clothing && this.getPants() instanceof Clothing);
    }
    isNaked() {
        if (this.isClothed())
            return false;

        return !(this.getUnderwear() instanceof Clothing);
    }
    
    putOn(_clothing, _type = undefined) {
        this.wear(_clothing, _type);
    }
    takeOff(_clothing) {
        this.disrobe(_clothing);
    }
    wearing(_clothing) {
        if (!(_clothing instanceof Clothing))
            _clothing = clothingIndexes.get(_clothing);

        if (_clothing instanceof Clothing) {
            if (kClothingTypes.has(_clothing.type))
                return this.clothing.get(_clothing.type) == _clothing;
        }
    }

    hasKey(_room) {
        if (!(_room instanceof Room))
            _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;

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
        if (kHandTypes.has(_type))
            this.handType = _type;
        else
            this.handType = "pad";
    }

    setFeet(_type) {
        if (kFeetTypes.has(_type))
            this.feetType = _type;
        else
            this.feetType = "pad";
    }

    setEyes(_type) {
        if (kEyeTypes.has(_type))
            this.eyeType = _type;
        else
            this.eyeType = "circle";
    }
    setEyeColour(_colour) {
        this.eyeColour = _colour
        this.eyeColourHex = colourNameToHex(_colour.replace(/[^a-z]/g, ""));
    }
    setEyeColourHex(_hexColour) {
        this.eyeColourHex = _hexColour;
    }

    setFur(_type) {
        if (kPeltTypes.has(_type))
            this.peltType = _type;
        else
            this.peltType = "fur";
    }
    setFurColourA(_colour) {
        this.furColourA = _colour;
        this.furColourAHex = colourNameToHex(_colour.replace(/[^a-z]/g, ""));
    }
    setFurColourB(_colour) {
        this.furColourB = _colour;
        this.furColourBHex = colourNameToHex(_colour.replace(/[^a-z]/g, ""));
    }
    setFurColour(_colourA, _colourB = undefined) {
        if (typeof _colourB == 'undefined')
            _colourB = _colourA;
        
        this.setFurColourA(_colourA);
        this.setFurColourB(_colourB);
    }
    setFurColourAHex(_hexColour) {
        this.furColourAHex = _hexColour;
    }
    setFurColourBHex(_hexColour) {
        this.furColourBHex = _hexColour;
    }

    hasBodyPart(_bodyPart) {
        if (typeof this.bodyParts == "undefined" || !(this.bodyParts instanceof Set))
            this.bodyParts = new Set();
        return this.bodyParts.has(_bodyPart);
    }
    removeBodyPart(_bodyPart) {
        if (typeof this.bodyParts == "undefined" || !(this.bodyParts instanceof Set))
            this.bodyParts = new Set();
        var _removedBodyPart = false;
        if (_bodyPart instanceof Array) {
            _bodyPart.forEach(function(__bodyPart) {
                if (this.removeBodyPart(__bodyPart))
                    _removedBodyPart = true;
            }, this);
        }
        else if (kBodyPartTypes.has(_bodyPart)) {
            this.bodyParts.remove(_bodyPart);
            _removedBodyPart = true;
        }
        return _removedBodyPart;
    }
    addBodyPart(_bodyPart) {
        if (typeof this.bodyParts == "undefined" || !(this.bodyParts instanceof Set))
            this.bodyParts = new Set();
        var _addedBodyPart = false;
        if (_bodyPart instanceof Array) {
            _bodyPart.forEach(function(__bodyPart) {
                if (this.addBodyPart(__bodyPart))
                    _addedBodyPart = true;
            }, this);
        }
        else if (kBodyPartTypes.has(_bodyPart)) {
            this.bodyParts.add(_bodyPart);
            _addedBodyPart = true;
        }
        return _addedBodyPart;
    }

    setSpecies(_species) {
        if (kSpeciesTypes.has(_species))
            this.species = _species;
        else
            this.species = "fox";

        this.addBodyPart(["ankles","anus","arms","arms","back","chest","feet","fingers","groin","hands","head","leftAnkle","leftArm","leftEar","leftEye","leftFoot","leftHand","leftLeg","leftNipple","leftShoulder","legs","legs","lips","mouth","neck","nose","rear","rightAnkle","rightArm","rightEar","rightEye","rightFoot","rightHand","rightLeg","rightNipple","rightShoulder","shoulder","shoulders","stomach","toes","tongue","waist","wrists"]);
        if (this.sex == 0)
            this.addBodyPart(["penis","testicles"]);
        else
            this.addBodyPart(["vagina","clitoris"]);

        if (_species == "fox") {
            if (this.sex == 0) {
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
        else if (_species == "wolf") {
            if (this.sex == 0) {
                this.penisSize = 25;
                this.penisGirth = 16;
                this.addBodyPart("knot");
            }
            else {
                this.vaginaSize = 25;
                this.vaginaGirth = 16;
            }

            this.bodySize = 1.0;
            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (_species == "aardwolf") {
            if (this.sex == 0) {
                this.penisSize = 15;
                this.penisGirth = 10;
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
        else if (_species == "hyena") {
            if (this.sex == 0) {
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
        else if (_species == "sheep") {
            if (this.sex == 0) {
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
        else if (_species == "stoat") {
            if (this.sex == 0) {
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
        else if (_species == "deer") {
            if (this.sex == 0) {
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
        else if (_species == "rabbit") {
            if (this.sex == 0) {
                this.penisSize = 12;
                this.penisGirth = 8;
            }
            else {
                this.vaginaSize = 12;
                this.vaginaGirth = 8;
            }
            
            this.bodySize = 0.4;
            this.predator = false;
            this.setFeet("fur");
            this.setHand("fur");
            this.setEyes("circle");
            this.setFur("fur");
            this.peltSoftness = 75;
        }
        else if (_species == "jackal") {
            if (this.sex == 0) {
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
        else if (_species == "coyote") {
            if (this.sex == 0) {
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
        else if (_species == "tiger") {
            if (this.sex == 0) {
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
        else if (_species == "antelope") {
            if (this.sex == 0) {
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
        else if (_species == "pig") {
            if (this.sex == 0) {
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
        else if (_species == "horse") {
            if (this.sex == 0) {
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
        else if (_species == "mouse") {
            if (this.sex == 0) {
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
    }

    setPenisSize(_blob) {
        if (isNaN(_blob))
            _blob = toCM(_blob);
        
        this.penisSize = _blob;
        
        return _blob;
    }
    getPenisSize() {
        return this.penisSize;
    }

    setPenisGirth(_blob) {
        if (isNaN(_blob))
            _blob = toCM(_blob);
        
        this.penisGirth = _blob;
        
        return _blob;
    }
    getPenisGirth() {
        return this.penisGirth;
    }

    setVaginaSize(_blob) {
        if (isNaN(_blob))
            _blob = toCM(_blob);
        
        this.vaginaSize = _blob;
        
        return _blob;
    }
    getVaginaSize() {
        return this.vaginaSize;
    }

    setVaginaGirth(_blob) {
        if (isNaN(_blob))
            _blob = toCM(_blob);
        
        this.vaginaGirth = _blob;
        
        return _blob;
    }
    getVaginaGirth() {
        return this.vaginaGirth;
    }

    setFollowing(_character) {
        this.follow(_character);
    }
    clearFollowing() {
        this.stay();
    }

    /**
     * Increments sex count with Character
     * @param  {Character} _character Character
     * @return {Boolean}            Whether or not values were incremented
     */
    incSexCount(_character) {
        if (!(_character instanceof Character)){
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                _character = undefined;
        }
        this.virgin = false;
        this.sexCount++;
        if (_character instanceof Character) this.sexCountMap.set(_character, this.sexCountMap.get(_character) + 1);
        return true;
    }
    /**
     * Wrapper function for this.incSexCount(Character)
     * @param {Character}  _character   Character
     * @param {Boolean} _updateChild Whether or not to update the passed Character
     */
    addSexWith(_character, _updateChild = true) {
        this.incSexCount(_character);
        if (_updateChild)
            _character.incSexCount(_character);
    }
    /**
     * Increments vaginal receiving count with Character
     * @param  {Character} _character Character
     * @return {Boolean}            Whether or not values were incremented
     */
    incVaginalReceiveCount(_character) {
        if (!(_character instanceof Character)){
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        this.vaginalReceiveCount++;
        this.vaginalReceiveCountMap.set(_character, this.vaginalReceiveCountMap.get(_character) + 1);
        return true;
    }
    /**
     * Increments vaginal penetration count with Character
     * @param  {Character} _character Character
     * @return {Boolean}            Whether or not values were incremented
     */
    incVaginalGiveCount(_character) {
        if (!(_character instanceof Character)){
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        this.vaginalGiveCount++;
        this.vaginalGiveCountMap.set(_character, this.vaginalGiveCountMap.get(_character) + 1);
        return true;
    }
    /**
     * Increments anal receiving count with Character
     * @param  {Character} _character Character
     * @return {Boolean}            Whether or not values were incremented
     */
    incAnalReceiveCount(_character) {
        if (!(_character instanceof Character)){
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        this.analReceiveCount++;
        this.analReceiveCountMap.set(_character, this.analReceiveCountMap.get(_character) + 1);
        return true;
    }
    /**
     * Increments anal penetration count with Character
     * @param  {Character} _character Character
     * @return {Boolean}            Whether or not values were incremented
     */
    incAnalGiveCount(_character) {
        if (!(_character instanceof Character)){
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        this.analGiveCount++;
        this.analGiveCountMap.set(_character, this.analGiveCountMap.get(_character) + 1);
        return true;
    }
    incCunnilingusReceiveCount(_character) {
        if (!(_character instanceof Character)){
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        this.cunnilingusReceiveCount++;
        this.cunnilingusReceiveCountMap.set(_character, this.cunnilingusReceiveCountMap.get(_character) + 1);
        return true;
    }
    incCunnilingusGiveCount(_character) {
        if (!(_character instanceof Character)){
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        this.cunnilingusGiveCount++;
        this.cunnilingusGiveCountMap.set(_character, this.cunnilingusGiveCountMap.get(_character) + 1);
        return true;
    }
    incAnalingusReceiveCount(_character) {
        if (!(_character instanceof Character)){
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        this.analingusReceiveCount++;
        this.analingusReceiveCountMap.set(_character, this.analingusReceiveCountMap.get(_character) + 1);
        return true;
    }
    incAnalingusGiveCount(_character) {
        if (!(_character instanceof Character)){
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        this.analingusGiveCount++;
        this.analingusGiveCountMap.set(_character, this.analingusGiveCountMap.get(_character) + 1);
        return true;
    }
    incFellatioReceiveCount(_character) {
        if (!(_character instanceof Character)){
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        this.fellatioReceiveCount++;
        this.fellatioReceiveCountMap.set(_character, this.fellatioReceiveCountMap.get(_character) + 1);
        return true;
    }
    incFellatioGiveCount(_character) {
        if (!(_character instanceof Character)){
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        this.fellatioGiveCount++;
        this.fellatioGiveCountMap.set(_character, this.fellatioGiveCountMap.get(_character) + 1);
        return true;
    }
    incHandjobReceiveCount(_character) {
        if (!(_character instanceof Character)){
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        this.handjobReceiveCount++;
        this.handjobReceiveCountMap.set(_character, this.handjobReceiveCountMap.get(_character) + 1);
        return true;
    }
    incHandjobGiveCount(_character) {
        if (!(_character instanceof Character)){
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }
        this.handjobGiveCount++;
        this.handjobGiveCountMap.set(_character, this.handjobGiveCountMap.get(_character) + 1);
        return true;
    }
    incMasturbateCount() {
        this.masturbateCount++;
        return true;
    }
    incAutofellatioCount() {
        this.fellatioGiveCount++;
        this.fellatioReceiveCount++;
        this.masturbateCount++;
        this.autofellatioCount++;
        return true;
    }
    incAutocunnilingusCount() {
        this.cunnilingusGiveCount++;
        this.cunnilingusReceiveCount++;
        this.masturbateCount++;
        this.autocunnilingusCount++;
        return true;
    }
    incAutoanalingusCount() {
        this.analingusGiveCount++;
        this.analingusReceiveCount++;
        this.masturbateCount++;
        this.autoanalingusCount++;
        return true;
    }

    addFollower(_character) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }

        this.followers.add(_character);
    }
    removeFollower(_character) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }

        if (this.followers.has(_character))
            this.followers.delete(_character);
    }
    clearFollowers() {
        this.followers.clear();
    }
    hasFollowers() {
        return this.followers.size > 0;
    }
    isFollowing(_character) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
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
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return 0;
        }
        return this.sexCountMap.has(_character) ? this.sexCountMap.get(_character) : 0;
    }

    addRelative(_character, _updateChild = true) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }

        this.relatives.add(_character);

        if (_updateChild)
            _character.addRelative(this, false);
    }

    addKnownLocation(_location) {
        if (!(_location instanceof Location)) {
            if (locationsIndexes.has(_location))
                _location = locationsIndexes.get(_location);
            else
                return undefined;
        }
        this.knownLocations.add(_location);
        return true;
    }
    addLocation(_location) {
        return this.addKnownLocation(_location);
    }
    removeKnownLocation(_location) {
        if (!(_location instanceof Location)) {
            if (locationsIndexes.has(_location))
                _location = locationsIndexes.get(_location);
            else
                return undefined;
        }
        this.knownLocations.delete(_location);
        return true;
    }
    removeLocation(_location) {
        return this.removeKnownLocation(_location);
    }

    addKnownSpell(_spell) {
        if (!(_spell instanceof Spell)) {
            if (spellsIndexes.has(_spell))
                _spell = spellsIndexes.get(_spell);
            else
                return undefined;
        }
        this.knownSpells.add(_spell);
        return true;
    }
    addSpell(_spell) {
        return this.addKnownSpell(_spell);
    }
    removeKnownSpell(_spell) {
        if (!(_spell instanceof Spell)) {
            if (spellsIndexes.has(_spell))
                _spell = spellsIndexes.get(_spell);
            else
                return undefined;
        }
        this.knownSpells.delete(_spell);
        return true;
    }
    removeSpell(_spell) {
        return this.removeKnownSpell(_spell);
    }

    castSpell(_spell) {
        var _cost = 0;
        if (!isNaN(_spell)) {
            _cost = _spell;
        }
        else if (!(_spell instanceof Spell)) {
            if (spellsIndexes.has(_spell))
                _cost = spellsIndexes.get(_spell).manaCost;
            else
                return undefined;
        }
        else
            _cost = _spell.manaCost;
        var _spellCost = this.calculateManaCost(_cost);
        if (this.mana >= _spellCost) {
            this.decMana(_spellCost);
            return true;
        }
        else
            return false;
    }

    addPreferredSpecies(_species) {
        if (kSpeciesTypes.has(_species)) {
            _species = _species;
            this.prefersSpecies.add(_species);
        }
    }
    likesSpecies(_species) {
        this.addPreferredSpecies(_species);
    }

    addAvoidedSpecies(_species) {
        if (kSpeciesTypes.has(_species)) {
            _species = _species;
            this.avoidsSpecies.add(_species);
        }
    }
    dislikesSpecies(_species) {
        this.addAvoidedSpecies(_species);
    }

    addNewDisposition(_character, erosOffset = 0, philiaOffset = 0, lodusOffset = 0, pragmaOffset = 0, storgeOffset = 0, manicOffset = 0) {
        return this.addNewCharacterDispositionFor(_character, erosOffset, philiaOffset, lodusOffset, pragmaOffset, storgeOffset, manicOffset);
    }
    addNewCharacterDispositionFor(_character, erosOffset = 0, philiaOffset = 0, lodusOffset = 0, pragmaOffset = 0, storgeOffset = 0, manicOffset = 0) {
        if (!(_character instanceof Character)) {
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }

        if (this.prefersSpecies.has(_character.species)) {
            if (this.prefersSex == _character.sex) {
                if (this.sexualOrientation == 0 && _character.sex != this.sex || this.sexualOrientation == 1 && _character.sex == this.sex || this.sexualOrientation == 2) {
                    if (this.philautia > 74) {
                        if (this.agape > 74)
                            erosOffset += 3;
                        else if (this.agape > 49)
                            erosOffset += 2;
                        else {
                            erosOffset++;
                            manicOffset++;
                        }
                        erosOffset++;
                    }
                    else {
                        if (this.agape > 74)
                            erosOffset++;
                        erosOffset += 2;
                    }

                    if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                        erosOffset += 2;
                        manicOffset++;
                    }

                    erosOffset++;
                }
            }

            if (this.age >= _character.age + (this.age/10)) {
                if (this.philautia > 74)
                    manicOffset++;

                if (this.agape > 74)
                    storgeOffset += 3;
                else if (this.agape > 49)
                    storgeOffset += 2;

                storgeOffset++;
            }

            if (this.philautia > 74 && this.agape > 50) {
                if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                    philiaOffset++;
                    lodusOffset++;
                }

                philiaOffset++;
                lodusOffset += 2;
            }

            lodusOffset += 2;
        }
        else if (this.avoidsSpecies.has(_character.species)) {
            if (this.prefersSex == _character.sex) {
                if (this.sexualOrientation == 0 && _character.sex != this.sex || this.sexualOrientation == 1 && _character.sex == this.sex || this.sexualOrientation == 2) {
                    if (this.philautia > 74) {
                        if (this.agape > 74)
                            erosOffset += 2;
                    }
                    else {
                        if (this.agape > 74)
                            erosOffset++;
                    }

                    if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                        erosOffset++;
                        manicOffset++;
                    }
                }
            }

            if (this.age >= _character.age + (this.age/10)) {
                if (this.philautia > 74) {
                    if (this.agape > 74)
                        storgeOffset++;
                }
                else {
                    if (this.agape > 74)
                        storgeOffset++;
                }
                storgeOffset++;
            }

            if (this.philautia > 74 && this.agape > 50) {
                if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                    philiaOffset++;
                    lodusOffset++;
                }

                philiaOffset++;
                lodusOffset += 2;
            }
        }
        else {
            if (this.prefersSex == _character.sex) {
                if (this.sexualOrientation == 0 && _character.sex != this.sex || this.sexualOrientation == 1 && _character.sex == this.sex || this.sexualOrientation == 2) {
                    if (this.philautia > 74) {
                        if (this.agape > 74)
                            erosOffset += 2;
                        else if (this.agape > 49)
                            erosOffset++;
                        else
                            manicOffset++;

                        erosOffset++;
                    }
                    else {
                        if (this.agape > 74)
                            erosOffset++;
                        erosOffset++;
                    }

                    if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                        erosOffset++;
                        manicOffset++;
                    }

                    erosOffset++;
                }
            }
        }

        this.characterDisposition.set(
            _character,
            new Disposition(
                this.defaultDisposition.eros + erosOffset,
                this.defaultDisposition.philia + philiaOffset,
                this.defaultDisposition.lodus + lodusOffset,
                this.defaultDisposition.pragma + pragmaOffset,
                this.defaultDisposition.storge + storgeOffset,
                this.defaultDisposition.manic + manicOffset
            )
        );
    }

    hadSexWith(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        if (!(_character instanceof Character))
            return undefined;

        return this.getSexCount(_character) > 0;
    }
    calculateChanceToFuck(_character, _ignoreLustAndRut = false) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        if (typeof _character == 'undefined')
            return 0;
        if (!_character.characterDisposition.has(this))
            return 0;
        if (typeof _ignoreLustAndRut != "boolean")
            _ignoreLustAndRut = false;
        
        if (debug) console.log("Calculating chance for {0} to fuck {1}.".format(_character.name, this.name));

        var chance = 0;
        var _disposition = _character.getCharacterDisposition(this);

        // Disposition
        if (_character.hadSexWith(this) && !_character.relatives.has(this)) {
            chance += _disposition.eros / 2 + (_character.getSexCount(this) * 3);
            chance += _disposition.philia / 4;
        }
        else {
            chance += _disposition.eros / 3;
            chance += _disposition.philia / 6;
        }
        chance += _disposition.pragma / 2;
        chance += _disposition.manic;
        chance -= _disposition.miseo;

        if (debug) console.log("\tAfter disposition check: " + Math.ceil(chance));

        // Species Preferences
        if (_character.prefersSpecies.has(this.species))
            chance += 5
        else if (_character.avoidsSpecies.has(this.species))
            chance -= 5;

        if (_character.prefersPrey && this.predator == false || _character.prefersPredators && this.predator == true)
            chance += 5;

        if (_character.avoidsPrey && this.predator == false || _character.avoidsPredators && this.predator == true)
            chance -= 5;

        if (debug) console.log("\tAfter species preference check: " + Math.ceil(chance));

        // Sexual Orientation
        if (_character.sexualOrientation == 0 && this.sex != _character.sex || _character.sexualOrientation == 1 && this.sex == _character.sex || _character.sexualOrientation == 2)
            chance += 10;
        else
            chance -= 50;

        if (debug) console.log("\tAfter sexual preference check: " + Math.ceil(chance));

        if (_ignoreLustAndRut) {
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
        
                if (debug) console.log("\tAfter rut and lust check: " + Math.ceil(chance));
        }

        // Exhibitionism
        if (this.room instanceof Room) {
	        if (this.room.characters.size > 2){
	            if (_character.exhibitionism > 0)
	                chance += ((_character.exhibitionism / 5) * (this.room.characters.size - 2));
	            else {
	                this.room.characters.forEach(function(_this) {
	                    if (_this != _character.this && _this != this)
	                        chance += _character.hadSexWith(_this) ? 5 : -5;
	                }, this);
	            }
	        }
	    }

        if (debug) console.log("\tAfter Exhibitionism check: " + Math.ceil(chance));

        // Incest
        if (_character.relatives.has(this)) {
            if (_character.incestual > 66)
                chance += _disposition.storge / 3 + (_character.getSexCount(this) * 2);
            else if (_character.incestual > 33)
                chance += _disposition.storge / 4 + (_character.getSexCount(this));
            else if (_character.incestual > 0)
                chance += _disposition.storge / 5 + (_character.getSexCount(this));
            else
                chance -= 50;
        }

        if (debug) console.log("\tAfter incest check: " + Math.ceil(chance));

        // Intoxication
        chance += _character.intoxication/2.5;

        if (debug) console.log("\tAfter intoxication check: " + Math.ceil(chance));

        // Somnophilia
        if (_character.isSleeping()) {
            if (enableRape)
                chance = 100;
            else if (_character.somnophilia > 50 && _character.hadSexWith(this) && _disposition.eros > 75)
                chance += 10;
        }

        if (debug) console.log("\tAfter Somnophilia check: " + Math.ceil(chance));

        return Math.ceil(chance);
    }

    moveToRoom(_room, _checkLocked = false) {
        if (!(_room instanceof Room))
            _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;

        if (!(_room instanceof Room))
            return false;

        if (_checkLocked && this.room.isLocked(_room))
            return false;

        if (this.room instanceof Room)
            this.room.removeCharacter(this);

        this.previousRoom = this.room;
        this.room = _room;

        if (this.room.cell instanceof Cell)
            this.cell = this.room.cell;

        if (typeof this.room.location != 'undefined')
            this.location = this.room.location;
        else if (this.cell instanceof Cell && typeof this.cell.location != 'undefined')
            this.location = this.cell.location;
        else
            this.location = undefined;

        _room.addCharacter(this);

        if (!this.knownLocations.has(_room.cell.location))
            this.knownLocations.add(_room.cell.location);
        if (!this.knownLocations.has(_room.location))
            this.knownLocations.add(_room.location);

        return true;
    }
    moveTo(_room, _checkLocked = false) {
        return this.moveToRoom(_room, _checkLocked);
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

            locationsIndexes.set(_id, this);
        }
    }
    
    fromJSON(jsonString = "") {
        if (debug) console.log("Running fromJSON");
        
        if (typeof jsonString != "string") {
            if (debug) console.log("Parameter `jsonString` is not a string.");
            return undefined;
        }
        
        if (typeof jsonString == "string") {
            try {
                var json = JSON.parse(jsonString);
            }
            catch (e) {
                if (debug) console.log("Parameter `jsonString` could not be parsed to JSON.");
                return undefined;
            }
        }
        
        if (typeof json["id"] == "undefined" || typeof json["name"] == undefined) {
            if (debug) console.log("ID or Name are undefined.");
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
                if (charactersIndexes.has(_character)) {
                    _tmSet.delete(_character);
                    this.owner.add(charactersIndexes.get(_character));
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
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

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
        if (typeof _character == 'undefined')
            return true;
        else if (_character instanceof Character)
            this.owner.add(_character);
        else if (_character instanceof Set || _character instanceof Array) {
            _character.forEach(function(__character) {
                this.addOwner(__character);
            }, this);
        }
        else {
            if (!(_character instanceof Character))
                _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
            if (_character instanceof Character)
                this.owner.add(_character);
            else
                return true;
        }
        return false;
    }
    setOwner(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        if (_character instanceof Character)
            this.owner.add(_character);
    }
    clearOwner() {
        this.owner.clear();
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

            for (i = 0; i < _arr.length - 1; i++) {
                _blob += _arr[i].toString();
                if (_arr.length > 2)
                    _blob += ", ";
            }
            _blob += " and " + _arr[_arr.length - 1].toString(true);

            return _blob;
        }
    }

    setType(_type) {
        if (kLocationTypes.has(_type))
            this.type = _type;
        else
            this.type = "general";
    }

    addCell(_cell) {
        this.cells.add(_cell);
    }
    removeCell(_cell) {
        if (this.cells.has(_cell))
            this.cells.remove(_cell);
    }

    addRoom(_room) {
        this.rooms.add(_room);
    }
    removeRoom(_room) {
        if (this.rooms.has(_room))
            this.rooms.remove(_room);
    }

    containsCharacter(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

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

            cellsIndexes.set(_id, this);
        }
    }

    addRoom(_room, x, y) {
        if (!(_room instanceof Room))
            _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;

        this.rooms.add(_room);

        if (typeof x != 'undefined' && typeof y != 'undefined')
            this.setRoom(_room, x, y);
    }
    setRoom(_room, x, y) {
        if (!(_room instanceof Room))
            _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;

        if (debug) console.log("\tSetting " + _room.id + " to <" + x + "," + y + ">");

        if (this.grid[x] === undefined)
            this.grid[x] = [];

        this.grid[x][y] = _room;
    }

    setLocation(_location) {
        if (!(_location instanceof Location))
            _location = locationsIndexes.has(_location) ? locationsIndexes.get(_location) : undefined;

        this.location = _location;

        if (this.location instanceof Location)
            this.location.addCell(this);
    }

    containsCharacter(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

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
            this.owner = new Set();

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

            roomsIndexes.set(_id, this);
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
    
    isOwner(_character) {
        return this.location.isOwner(_character) || this.cell.location.isOwner(_character);
    }
    getOwner(_index) {
        if (isNaN(_index) || _index < 0 || _index > this.owner.size)
            _index = 0;
        return Array.from(this.owner)[_index];
    }
    addOwner(_character) {
        if (typeof _character == 'undefined')
            return true;
        else if (_character instanceof Character)
            this.owner.add(_character);
        else if (_character instanceof Set || _character instanceof Array) {
            _character.forEach(function(__character) {
                this.addOwner(__character);
            }, this);
        }
        else {
            if (!(_character instanceof Character))
                _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
            if (_character instanceof Character)
                this.owner.add(_character);
            else
                return true;
        }
        return false;
    }
    setOwner(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        if (_character instanceof Character)
            this.owner.add(_character);
    }
    clearOwner() {
        this.owner.clear();
    }


    setLocation(_location) {
        if (!(_location instanceof Location))
            _location = locationsIndexes.has(_location) ? locationsIndexes.get(_location) : undefined;

        if (typeof _location == 'undefined' && this.cell instanceof Cell && this.cell.location instanceof Location)
            _location = this.cell.location;

        this.location = _location;

        if (this.location instanceof Location)
            this.location.addRoom(this);

    }
    setCell(_cell) {
        if (!(_cell instanceof Cell))
            _cell = cellsIndexes.has(_cell) ? cellsIndexes.get(_cell) : undefined;


        this.cell = _cell;

        if (this.cell instanceof Cell)
            this.cell.addRoom(this, this.x, this.y);
    }

    setType(_type) {
        if (kRoomTypes.has(_type))
        	this.type = _type;
        else
        	this.type = "hallway";
    }

    addCharacter(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        this.characters.add(_character);
    }
    removeCharacter(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        this.characters.delete(_character);
    }

    containsCharacter(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

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
    }

    setAttachedRoom(_direction, _room, _options = {}, _updateChild = false) {
        if (!(_room instanceof Room))
            _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;

        if (debug) console.log("\tAttempting to attach " + _room.id + " to the " + (_direction == 0 ? "north" : (_direction == 1 ? "east" : (_direction == 2 ? "south" : "west"))) + " of " + this.id);

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

        if (_updateChild) {
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
    }
    setNorthRoom(_room, _options = undefined, _updateChild = true) {
        this.setAttachedRoom(0, _room, _options, _updateChild);
    }
    setEastRoom(_room, _options = undefined, _updateChild = true) {
        this.setAttachedRoom(1, _room, _options, _updateChild);
    }
    setSouthRoom(_room, _options = undefined, _updateChild = true) {
        this.setAttachedRoom(2, _room, _options, _updateChild);
    }
    setWestRoom(_room, _options = undefined, _updateChild = true) {
        this.setAttachedRoom(3, _room, _options, _updateChild);
    }
    setDownRoom(_room, _options = undefined, _updateChild = true) {
        this.setAttachedRoom(4, _room, _options, _updateChild);
    }
    setUpRoom(_room, _options = undefined, _updateChild = true) {
        this.setAttachedRoom(5, _room, _options, _updateChild);
    }
    unsetAttachedRoom(_direction, _updateChild = true, _unsetRoom = false) {
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

        if (_updateChild) {
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
    }
    unsetNorthRoom(_updateChild = true) {
        this.unsetAttachedRoom(0, _updateChild);
    }
    unsetEastRoom(_updateChild = true) {
        this.unsetAttachedRoom(1, _updateChild);
    }
    unsetSouthRoom(_updateChild = true) {
        this.unsetAttachedRoom(2, _updateChild);
    }
    unsetWestRoom(_updateChild = true) {
        this.unsetAttachedRoom(3, _updateChild);
    }
    unsetDownRoom(_updateChild = true) {
        this.unsetAttachedRoom(4, _updateChild);
    }
    unsetUpRoom(_updateChild = true) {
        this.unsetAttachedRoom(5, _updateChild);
    }
    clearAttachedRooms() {
        this.attachedRooms.clear();
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

    setNorthWall(wallType, updateChild = true) {
        this.northSide = wallType;
        if (updateChild && this.attachedRooms.has(0) && this.attachedRooms.get(0) instanceof Room)
            this.attachedRooms.get(0).setSouthWall(wallType, false);
    }
    setEastWall(wallType, updateChild = true) {
        this.eastSide = wallType;
        if (updateChild && this.attachedRooms.has(1) && this.attachedRooms.get(1) instanceof Room)
            this.attachedRooms.get(1).setWestWall(wallType, false);
    }
    setSouthWall(wallType, updateChild = true) {
        this.southSide = wallType;
        if (updateChild && this.attachedRooms.has(2) && this.attachedRooms.get(2) instanceof Room)
            this.attachedRooms.get(2).setNorthWall(wallType, false);
    }
    setWestWall(wallType, updateChild = true) {
        this.westSide = wallType;
        if (updateChild && this.attachedRooms.has(3) && this.attachedRooms.get(3) instanceof Room)
            this.attachedRooms.get(3).setEastWall(wallType, false);
    }
    setWalls(_northWallType = 3, _eastWallType = undefined, _southWallType = undefined, _westWallType = undefined, updateChild = true) {
        if (typeof _eastWallType == 'undefined') {
            _eastWallType = _northWallType;
            _southWallType = _northWallType;
            _westWallType = _northWallType;
        }
        if (typeof _northWallType != 'undefined')
            this.setNorthWall(_northWallType, updateChild);
        if (typeof _eastWallType != 'undefined')
            this.setEastWall(_eastWallType, updateChild);
        if (typeof _southWallType != 'undefined')
            this.setSouthWall(_southWallType, updateChild);
        if (typeof _westWallType != 'undefined')
            this.setWestWall(_westWallType, updateChild);
    }

    setFacade(_direction, _image) {
        this.directionsFacades.set(_direction, _image);
    }
    setOwnFacade(_image) {
        this.setFacade(-1, _image);
    }
    setNorthFacade(_image) {
        this.setFacade(0, _image);
    }
    setEastFacade(_image) {
        this.setFacade(1, _image);
    }
    setSouthFacade(_image) {
        this.setFacade(2, _image);
    }
    setWestFacade(_image) {
        this.setFacade(3, _image);
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
                _furniture = furnitureIndexes.get(_furniture);
        }

        _furniture.room = this;
        this.furniture.add(_furniture);
        return _addedFurniture;
    }
    removeFurniture(_furniture) {
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.get(_furniture);

        _furniture.room = undefined;
        this.furniture.delete(_furniture);
    }

    containsFurniture(_furniture) {
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.get(_furniture);

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
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

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
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _plural = false, _specialTypes = undefined) {
        if (_id instanceof Item) {
            super(_id.id, _id._name);
            for (var property in _id) {
                if (_id.hasOwnProperty(property)) {
                    this[property] = _id[property];
                }
            }
            
            itemsIndexes.set(_id, this);
        }
        else {
            super(_id, _name, _description, _image);

            this.addAvailableAction("put");
            this.addAvailableAction("take");
            this.addAvailableAction("hold");

            this.addSpecialType(_specialTypes);

            if (typeof _plural != "boolean")
                _plural = false;
            this.plural = _plural;

            if (typeof _specialTypes == "string" || _specialTypes instanceof Array)
                this.addSpecialType(_specialTypes);

            itemsIndexes.set(_id, this);
        }
    }
    
    moveToEntity(_entity) {
        if (_entity instanceof Character)
            return this.moveToCharacter(_entity);
        else if (_entity instanceof Furniture)
            return this.moveToFurniture(_entity);
        else if (_entity instanceof Room)
            return this.moveToRoom(_entity);
        else if (typeof _entity == 'undefined')
            return true;
        else
            return false;
    }
    moveToFurniture(_furniture) {
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.get(_furniture);

        if (_furniture instanceof Furniture) {
            if (_furniture.room instanceof Room)
                this.room = _furniture.room;
            else
                this.room = undefined;

            return true;
        }
        else
            return false;
    }
    moveToCharacter(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        if (_character instanceof Character) {
            if (_character.room instanceof Room)
                this.room = _character.room;
            else
                this.room = undefined;

            return true;
        }
        else
            return false;
    }
    moveToRoom(_room) {
        if (!(_room instanceof Room))
            _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;

        if (_room instanceof Room) {
            this.room = _room;

            return true;
        }
        else
            return false;
    }
    moveTo(_entity) {
        return this.moveToEntity(_entity);
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
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined) {
        if (_id instanceof Key) {
            super(_id.id, _id._name);
            for (var property in _id) {
                if (_id.hasOwnProperty(property)) {
                    this[property] = _id[property];
                }
            }
            
            keysIndexes.set(_id, this);
        }
        else {
            super(_id, _name, _description, _image);

            keysIndexes.set(_id, this);
        }
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
            
            clothingIndexes.set(_id, this);
        }
        else {
            super(_id, _name, _description, _image, _plural);

            this.addAvailableAction("wear");
            this.addAvailableAction("remove");

            this.setType(_type);

            clothingIndexes.set(_id, this);
        }
    }

    setType(_type) {
        if (kClothingTypes.has(_type))
        	this.type = _type;
        else
        	this.type = "shirt";
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
     * @param  {Stromg}  _specialTypes  specialType
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _type = "food", _plural = false, _specialTypes = undefined) {
        if (_id instanceof Consumable) {
            super(_id.id, _id._name);
            for (var property in _id) {
                if (_id.hasOwnProperty(property))
                    this[property] = _id[property];
            }
        }
        else {
            super(_id, _name, _description, _image, _plural, _specialTypes);

            this.addAvailableAction("consume");

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

        consumableIndexes.set(_id, this);
    }

    setType(_type) {
        if (kConsumableTypes.has(_type))
            this.type = _type;
        else
            this.type = "food";
    }
}
/**
 * Class that represents all Cheque(s)
 * @extends {Item}
 */
class Cheque extends Item {
    constructor(_from, _to, _amount = 1, _memo = "", _signed = false) {
        if (debug) console.log("Attempting to create a Cheque...");
        if (!(_from instanceof Character)) {
            if (charactersIndexes.has(_from))
                _from = charactersIndexes.get(_from);
            else {
                if (debug) console.log("  _from was not a valid Character.");
                return undefined;
            }
        }
        if (!(_to instanceof Character)) {
            if (charactersIndexes.has(_to))
                _to = charactersIndexes.get(_to);
            else {
                if (debug) console.log("  _to was not a valid Character.");
                return undefined;
            }
        }
        _amount = Number.parseInt(_amount);
        if (isNaN(_amount)) {
            if (debug) console.log("  _amount was not a valid number.");
            return undefined;
        }
        else if (_amount < 1) {
            if (debug) console.log("  _amount was less than 1.");
            return undefined;
        }

        super("cheque{0}{1}{2}".format(_from.id.capitalize(), _to.id.capitalize(), _amount, String(currentTime.getTime()).slice(0, -3)), "Cheque");
        this.from = _from;
        this.to = _to;
        this.amount = _amount;
        this.memo = _memo;
        this.signed = _signed == true ? true : false;
        this.description = "A cheque from {0} to {1} for the amount of ${2}, with the memo '{3}'".format(this.from.name, this.to.name, this.amount, this.memo)

        chequesIndexes.set(this.id, this);
    }

    sign(_character) {
        if (!(_character instanceof Character)){
            if (charactersIndexes.has(_character))
                _character = charactersIndexes.get(_character);
            else
                return undefined;
        }

        this.signed = _from == _character;
    }

    delete() {
        chequesIndexes.delete(this.id);
    }
}

/**
 * Class that represents all Furniture
 * @extends {Entity}
 */
class Furniture extends Entity {
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

            this.items = new Array();

            this.setType(_type);

            this.seatingSpace = _seatingSpace;
            this.storageSpace = _storageSpace;
            this.characters = new Set(); // <Character, Action>

            furnitureIndexes.set(_id, this);
        }
    }

    fromJSON(jsonString = "") {
        if (debug) console.log("Running fromJSON");
        
        if (typeof jsonString != "string") {
            if (debug) console.log("Parameter `jsonString` is not a string.");
            return undefined;
        }
        
        if (typeof jsonString == "string") {
            try {
                var json = JSON.parse(jsonString);
            }
            catch (e) {
                if (debug) console.log("Parameter `jsonString` could not be parsed to JSON.");
                return undefined;
            }
        }
        
        if (typeof json["id"] == "undefined" || typeof json["name"] == undefined) {
            if (debug) console.log("ID or Name are undefined.");
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
                if (itemsIndexes.has(_item))
                    this.addItem(itemsIndexes.get(_item));
            }, this);
        } catch (e) {}
        delete json["items"];
        
        // Entities
        if (json.hasOwnProperty("characters"))
            delete(json["characters"]);
        if (roomsIndexes.has(json["room"]))
            roomsIndexes.get(json["room"]).addFurniture(this);
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

    addItem(_item) {
        if (!(_item instanceof Item)) {
            if (itemsIndexes.has(_item))
                _item = itemsIndexes.get(_item);
            else
                return undefined;
        }
        this.items.push(_item);
        if (_item instanceof Phone && _item.owner == this) {
            this.phone = _item;
        }
        
        return true;
    }
    removeItem(_item) {
        if (!(_item instanceof Item)) {
            if (itemsIndexes.has(_item))
                _item = itemsIndexes.get(_item);
            else
                return undefined;
        }
        if (!this.containsItem(_item))
            return true;

        if (this instanceof Character && this.wearing(_item))
            this.takeOff(_item);
        
        this.items.splice(this.items.indexOf(_item), 1);
        return true;
    }

    containsItem(_item) {
        if (!(_item instanceof Item)) {
            if (itemsIndexes.has(_item))
                _item = itemsIndexes.get(_item);
            else
                return undefined;
        }
        return this.items.indexOf(_item) >= 0;
    }
    hasItem(_item) {
        return this.containsItem(_item);
    }
    getItems() {
        return this.items;
    }
    getNumberOfItems() {
        return this.items.length;
    }

    setType(_type) {
        if (kFurnitureTypes.has(_type))
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
    }

    isSeat() {
        return (typeof this.seatingSpace != 'undefined' && this.seatingSpace > 0);
    }
    isStorage() {
        return (typeof this.storageSpace != 'undefined' && this.storageSpace > 0);
    }

    addCharacter(_character, _actionType = "sit") {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        this.characters.add(_character);
    }
    removeCharacter(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        this.characters.delete(_character);
    }

    containsCharacter(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

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
}
/**
 * Class that represents all Electronic Devices
 * @extends {Item}
 */
class ElectronicDevice extends Item {
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined) {
        super(_id, _name, _description, _image);
    }
}
/**
 * Class that represents all Phones
 * @extends {Item}
 */
class Phone extends Item {
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _owner = undefined) {
        super(_id, _name, _description, _image);
        if (!(_owner instanceof Character))
            _owner = charactersIndexes.has(_owner) ? charactersIndexes.get(_owner) : undefined;
        this.owner = _owner;

        this.receivedMessages = new Map();
        this.readMessages = new Map();
        this.sentMessages = new Map();

        phonesIndexes.set(_id, this);
    }

    newReadMessage(_fromPhone, _message, _time = "Thu, 01 Jan 1970 12:00:00 GMT") {
        if (!(_fromPhone instanceof Phone)) {
            if (phonesIndexes.has(_fromPhone))
                _fromPhone = phonesIndexes.get(_fromPhone);
            else if (_fromPhone instanceof Character) {
                if (_fromPhone.phone instanceof Phone)
                    _fromPhone = _fromPhone.phone;
                else
                    return undefined;
            }
            else if (charactersIndexes.has(_fromPhone)) {
                _fromPhone = charactersIndexes.get(_fromPhone);
                if (_fromPhone.phone instanceof Phone)
                    _fromPhone = _fromPhone.phone;
                else
                    return undefined;
            }
            else
                return undefined;
        }

        var _textMessage = new TextMessage(_fromPhone, this, _message);
        _textMessage.time = _time;
        this.readMessages.set(_textMessage.id, _textMessage);
        _fromPhone.sentMessages.set(_textMessage.id, _textMessage);
    }

    sendMessage(_toPhone, _message, _time = undefined) {
        if (!(_toPhone instanceof Phone)) {
            if (phonesIndexes.has(_toPhone))
                _toPhone = phonesIndexes.get(_toPhone);
            else if (_toPhone instanceof Character) {
                if (_toPhone.phone instanceof Phone)
                    _toPhone = _toPhone.phone;
                else
                    return undefined;
            }
            else if (charactersIndexes.has(_toPhone)) {
                _toPhone = charactersIndexes.get(_toPhone);
                if (_toPhone.phone instanceof Phone)
                    _toPhone = _toPhone.phone;
                else
                    return undefined;
            }
            else
                return undefined;
        }

        var _textMessage = new TextMessage(this, _toPhone, _message, _time);
        _toPhone.receivedMessages.set(_textMessage.id, _textMessage);
        this.sentMessages.set(_textMessage.id, _textMessage);

        if (_toPhone == player.phone)
            Content.add("<p>You've received a text message.</p>");
    }

    readMessage(_textMessage) {
        if (!(_textMessage instanceof TextMessage))
            _textMessage = textMessageIndexes.has(_textMessage) ? textMessageIndexes.get(_textMessage) : undefined;
        if (!(_textMessage instanceof TextMessage))
            return undefined;

        if (this.receivedMessages.has(_textMessage.id)) {
            this.receivedMessages.delete(_textMessage.id);
            this.readMessages.set(_textMessage.id, _textMessage);
        }
    }
}
class TextMessage {
    /**
     * Create new TextMessage
     * @param  {Phone} _fromPhone Source
     * @param  {Phone} _toPhone   Destination
     * @param  {String} _message   Text message, can be HTML
     * @param  {String} _time      Optional Time (YYYY-MM-DD HH:mm:SS)
     */
    constructor(_fromPhone, _toPhone, _message = "", _time = undefined) {
        if (!(_fromPhone instanceof Phone))
            _fromPhone = phonesIndexes.has(_fromPhone) ? phonesIndexes.get(_fromPhone) : undefined;
        if (!(_toPhone instanceof Phone))
            _toPhone = phonesIndexes.has(_toPhone) ? phonesIndexes.get(_toPhone) : undefined;

        if (_fromPhone == undefined || _toPhone == undefined)
            return undefined;

        this.id = "{0}{1}{2}".format(_fromPhone.id, _toPhone.id, textMessageIndexes.size);
        this.from = _fromPhone.owner.name;
        this.to = _toPhone.owner.name;
        this.time = _time == undefined ? "{0}/{1}/{2} {3}:{4}:{5}".format(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()) : _time;
        this.message = _message;

        textMessageIndexes.set(this.id, this);
    }
}
class WebPage {
    constructor(_id, _name = undefined, _webSite = undefined, _content = undefined) {
        this.id = _id;
        this.name = _name;

        if (!(_webSite instanceof WebSite))
            _webSite = webSiteIndexes.has(_webSite) ? webSiteIndexes.get(_webSite) : undefined;

        this.webSite = _webSite;
        this.content = _content;

        webPageIndexes.set(this.id, this);
    }
}
class WebSite {
    constructor(_id, _name = undefined, _description = undefined) {
        this.id = _id;
        this.name = _name;
        this.description = _description;
        this.pages = new Set();

        webSiteIndexes.set(this.id, this);
    }

    _addPagePage(_page) {
        if (!(_page instanceof WebPage))
            _page = webPageIndexes.has(_page) ? webPageIndexes.get(_page) : undefined;

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
        if (!(_id instanceof WebPage) && webPageIndexes.has(_id))
            _id = webPageIndexes.get(_id);

        if (_id instanceof WebPage)
            this._addPagePage(_id);
        else
            this._addPageRaw(_id, _name, _content);
    }
    getPage(_page) {
        if (!(_page instanceof WebPage))
            _page = webPageIndexes.has(_page) ? webPageIndexes.get(_page) : undefined;

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
     * @param  {Number} _manaCost    Cost of Spell in Mana
     * @param  {Number} _lifeCost    Cost of Spell in Life
     * @param  {Number} _staminaCost Cost of Spell in Stamina
     */
    constructor(_id, _name = "", _description = undefined, _image = undefined, _manaCost = 0, _lifeCost = 0, _staminaCost = 0) {
        super(_id, _name, _description, _image);

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

        spellsIndexes.set(this.id, this);
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
        if (_date instanceof Date)
            _date = _date.getDate();
        return (this.dom == _date);
    }
    containsMonth(_date) {
        if (_date instanceof Date)
            _date = _date.getMonth();
        return (this.month == _date);
    }
    containsYear(_date) {
        if (_date instanceof Date)
            _date = _date.getFullYear();
        return (this.year == _date);
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
                _characterA = charactersIndexes.has(_characterA) ? charactersIndexes.get(_characterA) : undefined;

            if (!(_characterB instanceof Character))
                _characterB = charactersIndexes.has(_characterB) ? charactersIndexes.get(_characterB) : undefined;

            if (!(_item instanceof Item))
                _item = itemsIndexes.has(_item) ? itemsIndexes.get(_item) : undefined;

            if (!(_location instanceof Location))
                _location = locationsIndexes.has(_location) ? locationsIndexes.get(_location) : undefined;

            if (!(_cell instanceof Cell))
                _cell = cellsIndexes.has(_cell) ? cellsIndexes.get(_cell) : undefined;

            if (!(_room instanceof Room))
                _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;

            if (_cron instanceof Cron || _cron == undefined) {}
            else if (typeof _cron == 'string') {
                var _cronPrefix = Number.parseInt(_cron.slice(0, -1));
                var _cronSuffix = _cron.slice(-1);
                if (_cronPrefix < 0) {
                    if (debug) console.log("   Cron from String contained an invalid number prefix.");
                    return undefined;
                }
                var _cron = new Date(currentTime);
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
                        if (debug) console.log("   Cron from String contained an invalid time suffix.");
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

            eventsIndexes.set(this.id, this);
        }
    }

    execute() {
        if (_eventsExecutedThisTick.has(this))
            return;

        if (debug) console.log("Executing " + this.id);

        lastGameEvent = this;
        unsafeExec(this.nextFunction);
        lastGameEvent = undefined;

        if (this.runOnce) {
            this.delete();
        }

        _eventsExecutedThisTick.add(this);
    }

    delete() {
        if (debug) console.log("Deleting {0}".format(this.id));
        eventsIndexes.delete(this.id);
    }
}