class Title {
    /**
     * Sets the titles
     *
     * @param _titleTopString
     * @param _titleTopImg
     * @param _titleMidString
     * @param _titleBotString
     *
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
    static set($string) {
        document.getElementById("contentContainerBody").innerHTML = $string;
        $('a[data-toggle=tooltip]').tooltip();
    }
    static add($string) {
        document.getElementById("contentContainerBody").innerHTML += $string;
        $('a[data-toggle=tooltip]').tooltip();
    }
    static clear() {
        document.getElementById("contentContainerBody").innerHTML = "";
    }
}
class Menu {
    static initialize() {
        this.options = [];
        this.showingBaseMenu = false;
        this.page = 1;
        this.numberOfOptions = 12;
        this.useWideMenu = false;
        this.resetNumberOfOptions();
    }

    static clear() {
        this.options = [];
        document.getElementById("choiceContainerBottom").innerHTML = "";
        this.generate();
        this.page = 1;
        this.resetNumberOfOptions();
    }

    static resetNumberOfOptions() {
        if (this.useWideMenu)
            this.numberOfOptions = 15;
        else
            this.numberOfOptions = 12;
    }

    static setOption($index, $functionCall, $title, $subTitle, $hover = undefined, $disabled = false, $invisible = false, $secret = false, _btnClass = "", _softSet = true) {
        if (typeof $disabled != 'boolean')
            $disabled = false;
        if (typeof $invisible != 'boolean')
            $invisible = false;
        if (typeof $secret != 'boolean')
            $secret = false;
        if (typeof _btnClass != 'string')
            _btnClass = "";
        if (typeof _softSet != 'boolean')
            _softSet = false;

        if (isNaN($index)) {
            if (this.numberOfOptions == 12) {
                switch ($index) {
                    case "1": $index = 0; break;
                    case "2": $index = 1; break;
                    case "3": $index = 2; break;
                    case "4": $index = 3; break;
                    case "q": $index = 4; break;
                    case "w": $index = 5; break;
                    case "e": $index = 6; break;
                    case "r": $index = 7; break;
                    case "a": $index = 8; break;
                    case "s": $index = 9; break;
                    case "d": $index = 10; break;
                    case "f": $index = 11; break;
                    default: $index = -1;
                }
            }
            else {
                switch ($index) {
                    case "1": $index = 0; break;
                    case "2": $index = 1; break;
                    case "3": $index = 2; break;
                    case "4": $index = 3; break;
                    case "5": $index = 4; break;
                    case "q": $index = 5; break;
                    case "w": $index = 6; break;
                    case "e": $index = 7; break;
                    case "r": $index = 8; break;
                    case "t": $index = 9; break;
                    case "a": $index = 10; break;
                    case "s": $index = 11; break;
                    case "d": $index = 12; break;
                    case "f": $index = 13; break;
                    case "g": $index = 14; break;
                    default: $index = -1;
                }
            }
        }

        if ($index > -1 && $index < this.numberOfOptions * 10) {
            var _runCond = true;
            var _page = 0;

            if ($index / this.numberOfOptions > 1)
                _page = parseInt($index / this.numberOfOptions);
            else
                _page = 1;

            if ($functionCall.length > 0 && !$functionCall.endsWith(")"))
                $functionCall = $functionCall + "()";

            if ($index == this.numberOfOptions * (_page)) {
                var _tmpArr = new Array();
                var _startIndex = this.numberOfOptions * (_page - 1) + (this.useWideMenu ? 8 : 6);

                for(var _i = _startIndex; _i < this.options.length; _i++) {
                    if (typeof this.options[_i] != 'undefined' && this.options[_i][8] == false) {
                        _tmpArr.push(this.options[_i]);
                        delete this.options[_i];
                    }
                }

                this.options[(this.numberOfOptions * _page) - (this.useWideMenu ? 8 : 6)] = ["Menu.generate({0})".format(_page + 1), "Next", "", false, false, false, false, undefined, true];
                if (_page > 1)
                    this.options[this.numberOfOptions * _page - 2] = ["Menu.generate({0})".format(_page - 1), "Previous", "", false, false, false, false, undefined, true];

                _tmpArr.push([$functionCall, $title, $subTitle, $hover, $disabled, $invisible, $secret, _btnClass, _softSet]);

                $index = (this.numberOfOptions * _page) - (this.useWideMenu ? 8 : 6);

                _tmpArr.forEach(function(_item) {
                    var _runCond = true;
                    while ($index < this.numberOfOptions * 10 && _runCond) {
                        if (typeof this.options[$index] == 'undefined' && (_page == 1 || _page > 1 && $index != this.numberOfOptions * _page - 2)) {
                            this.options[$index] = _item;
                            _runCond = false;
                        }
                        else
                            $index++;
                    }
                }, this);
            }
            else if ($index > this.numberOfOptions && $index == this.numberOfOptions * _page - 2)
                this.options[this.numberOfOptions * _page - 2] = ["Menu.generate({0})".format(_page - 1), "Previous", "", false, false, false, false, undefined, true];
            else {
                if (typeof this.options[$index] != 'undefined') {
                    var _runCond = true;
                    while ($index < this.numberOfOptions * 10 && _runCond) {
                        if (typeof this.options[$index] == 'undefined' && (_page == 1 || _page > 1 && $index != this.numberOfOptions * _page - 2))
                            _runCond = false;
                        else
                            $index++;
                    }
                }

                this.options[$index] = [$functionCall, $title, $subTitle, $hover, $disabled, $invisible, $secret, _btnClass, _softSet];
            }

            return true;
        }
        else
            return false;
    }
    static addOption($functionCall, $title, $subTitle, $hover = "", $disabled = 0, $invisible = 0, $secret = 0, _btnClass = "") {
        var i = 0;
        var _runCond = 1;

        if (this.numberOfOptions == 12) {
            while (i <= this.options.length && _runCond) {
                if (typeof this.options[i] == 'undefined')
                    _runCond = !this.setOption(i, $functionCall, $title, $subTitle, $hover, $disabled, $invisible, $secret, _btnClass, false);
                else
                    i++;
            }
        }
        else if (this.numberOfOptions == 15) {
            while (i <= this.options.length && _runCond) {
                if (typeof this.options[i] == 'undefined')
                    _runCond = !this.setOption(i, $functionCall, $title, $subTitle, $hover, $disabled, $invisible, $secret, _btnClass, false);
                else
                    i++;
            }
        }

        return i;
    }
    static setExplorationOptions(northRoom = undefined, eastRoom = undefined, southRoom = undefined, westRoom = undefined, downRoom = undefined, upRoom = undefined) {
        Menu.showingBaseMenu = true;
        Menu.page = 1;

        var _metaName = "";
        var _secret = false;
        var _room = undefined;

        if (downRoom instanceof Room) {
            _room = downRoom;
            if (player.room.cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (player.room.location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 4 : 5)] = ["roomInteract(" + _room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>Down", _metaName, undefined, undefined, undefined, _room.isHidden(player.room), "btn-info" + (player.room.isLocked(_room) && !player.hasKey(_room) ? " locked" : "")];
        }
        if (northRoom instanceof Room) {
            _room = northRoom;
            if (player.room.cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (player.room.location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 5 : 6)] = ["roomInteract(" + _room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>North", _metaName, undefined, undefined, undefined, _room.isHidden(player.room), "btn-info" + (player.room.isLocked(_room) && !player.hasKey(_room) ? " locked" : "")];
        }
        if (upRoom instanceof Room) {
            _room = upRoom;
            if (player.room.cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (player.room.location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 6 : 7)] = ["roomInteract(" + _room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>Up", _metaName, undefined, undefined, undefined, _room.isHidden(player.room), "btn-info" + (player.room.isLocked(_room) && !player.hasKey(_room) ? " locked" : "")];
        }
        if (westRoom instanceof Room) {
            _room = westRoom;
            if (player.room.cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (player.room.location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 8 : 10)] = ["roomInteract(" + _room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>West", _metaName, undefined, undefined, undefined, _room.isHidden(player.room), "btn-info" + (player.room.isLocked(_room) && !player.hasKey(_room) ? " locked" : "")];
        }
        if (southRoom instanceof Room) {
            _room = southRoom;
            if (player.room.cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (player.room.location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 9 : 11)] = ["roomInteract(" + _room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>South", _metaName, undefined, undefined, undefined, _room.isHidden(player.room), "btn-info" + (player.room.isLocked(_room) && !player.hasKey(_room) ? " locked" : "")];
        }
        if (eastRoom instanceof Room) {
            _room = eastRoom;
            if (player.room.cell.location != _room.cell.location)
                _metaName = _room.cell.location.name;
            else if (player.room.location === _room.location || typeof _room.location === 'undefined')
                _metaName = _room.name;
            else
                _metaName = _room.location.name;

            this.options[(this.numberOfOptions == 12 ? 10 : 12)] = ["roomInteract(" + _room.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>East", _metaName, undefined, undefined, undefined, _room.isHidden(player.room), "btn-info" + (player.room.isLocked(_room) && !player.hasKey(_room) ? " locked" : "")];
        }
        _room = undefined;
    }
    static generate(_page = 1) {
        if (!isNaN(_page) && !Menu.showingBaseMenu)
            Menu.page = _page;

        document.getElementById("choiceContainerBottom").innerHTML = "";

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
                _blob += this.createButton("", "&nbsp;", "&nbsp;", "", "", 1, 1, 0);
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
        document.getElementById("choiceContainerBottom").innerHTML = _blob;
    }
    static createButton($functionCall, $title = "", $subTitle = "&nbsp;", $key = "", $hover = "", $disabled = 0, $invisible = 0, $secret = 0, $btnClass = "") {
        if (typeof $functionCall == 'object') {
            $key = $title;
            $title = (typeof $functionCall[1] === 'undefined' ? $title : $functionCall[1]);
            $subTitle = (typeof $functionCall[2] === 'undefined' || $functionCall[2].length < 1) ? "&nbsp;" : $functionCall[2];
            $hover = (typeof $functionCall[3] === 'undefined' ? "" : $functionCall[3]);
            $disabled = (typeof $functionCall[4] === 'undefined' ? $disabled : $functionCall[4]);
            $invisible = (typeof $functionCall[5] === 'undefined' ? $invisible : $functionCall[5]);
            $secret = (typeof $functionCall[6] === 'undefined' ? $secret : $functionCall[6]);
            $btnClass = (typeof $functionCall[7] === 'undefined' ? $btnClass : $functionCall[7]);
            $functionCall = $functionCall[0];
        }

        if ($functionCall.length > 0 && !$functionCall.endsWith(")"))
            $functionCall = $functionCall + "()";

        var _blob = "";
        _blob += '<div class="btn-group">';
            _blob += '<button class="btn ' + $btnClass + ' ' + ($invisible ? 'invisible' : '') + '" onClick="' + $functionCall + '" title="' + $hover + '" style="' + ($secret ? "opacity:0.0;" : "") + '" ' + ($disabled === true ? "disabled=disabled" : "") + '>';
                _blob += ($key !== false ? '<small style="position:absolute; right:0px; top:-3px;">[' + $key + ']</small>' : '');
                _blob += '<div class="trim"><span class="button-title">' + $title + '</span></div>';
                _blob += '<small class="trim"><span>' + $subTitle + '</span></small>';
            _blob += '</button>';
        _blob += '</div>';
        return _blob;
    }
}
class Minimap {
    static initialize() {
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
        this.canvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    static generateMapFromStartRoom(_room) {
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
     * @param  {Set} _actions        Set or String of actionType(s)
     * @param  {Room} _room          Room
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _actions = undefined, _room = undefined) {
        if (_id instanceof Entity) {
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

            this.availableActions = new Set();

            this.addAction(_actions);
            this.addAction("look");

            if (!(_room instanceof Room)) {
                _room = roomsIndexes.has(_room) ? roomsIndexes.get(_room) : undefined;
                if (!(_room instanceof Room))
                    _room = undefined;
            }
            this.room = _room;

            if (typeof this.room != 'undefined')
                this.cell = this.room.cell;
            else
                this.cell = undefined;

            this.items = new Set();
        }
        
        entityIndexes.set(this.id, this);
    }

    toJSON() {
        var _blob = {};
        var _arr = new Array();
        
        for (var property in this) {
            if (this[property] instanceof Entity) {
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
    
    addItem(_item) {
        if (!(_item instanceof Item))
            _item = itemsIndexes.has(_item) ? itemsIndexes.get(_item) : undefined;

        if (!(_item instanceof Item))
            return undefined;

        this.items.add(_item);
        if (_item instanceof Phone && _item.owner == this) {
            this.hasPhone = true;
            this.phone = _item;
        }
        
        return true;
    }
    removeItem(_item) {
        if (!(_item instanceof Item))
            _item = itemsIndexes.has(_item) ? itemsIndexes.get(_item) : undefined;

        if (!(_item instanceof Item))
            return undefined;

        if (this instanceof Character && this.wearing(_item))
            this.takeOff(_item);
        
        this.items.delete(_item);
    }

    containsItem(_item) {
        if (!(_item instanceof Item))
            _item = itemsIndexes.has(_item) ? itemsIndexes.get(_item) : undefined;

        if (!(_item instanceof Item))
            return undefined;

        return this.items.has(_item);
    }
    hasItem(_item) {
        return this.containsItem(_item);
    }

    addAction(_actions) {
        if (typeof _actions == 'undefined')
            return false;
        else if (_actions instanceof Array) {
            _actions.forEach(function(_action) {
                actionTypes.has(_action) && this.availableActions.add(_action);
            }, this);
            return true;
        }
        else if (actionTypes.has(_actions)) {
            this.availableActions.add(_actions);
            return true;
        }
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
        else if (this instanceof Character) {
            _blob += "<p>{0} year old {1} {2}.</p>".format(this.age, (this.gender ? "female" : "male"), this.species);
        }

        return "<a data-toggle=\"tooltip\" data-placement=\"left\" data-html=\"true\" title=\"{0}\">{1}</a>".format(_blob.replace(/\"/g, '\\"'), this.name);
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
     */
    constructor(_eros = 0, _philia = 0, _lodus = 0, _pragma = 0, _storge = 0, _manic = 0) {
        if (_eros instanceof Object) {
            this.fromObject(_eros);
        }
        else {
            if (debug) console.log("Creating a new instance of Disposition");
            this._setAll(_eros, _philia, _lodus, _pragma, _storge, _manic);
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
        var _return = false;
        try {
            _return = this.fromObject(JSON.parse(_json));
        }
        catch (err) {
            var _return = undefined;
        }
        
        return _return;
    }
    
    setEros(_int) {
        this.eros = _int;
    }
    getEros() {
        return this.eros;
    }
    setPhilia(_int) {
        this.philia = int;
    }
    getPhilia() {
        return this.philia;
    }
    
    set(_eros = 0, _philia = 0, _lodus = 0, _pragma = 0, _storge = 0, _manic = 0) {
        if (isNaN(_eros))
            this._setDispositionType(_eros, _philia);
        else
            this._setAll(_eros, _philia, _lodus, _pragma, _storge, _manic);
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

    _setAll(_eros = 0, _philia = 0, _lodus = 0, _pragma = 0, _storge = 0, _manic = 0) {
        _eros = Number.parseInt(_eros);
        _philia = Number.parseInt(_philia);
        _lodus = Number.parseInt(_lodus);
        _pragma = Number.parseInt(_pragma);
        _storge = Number.parseInt(_storge);
        _manic = Number.parseInt(_manic);
        
        _eros = isNaN(_eros) ? 0 : _eros;
        _philia = isNaN(_philia) ? 0 : _philia;
        _lodus = isNaN(_lodus) ? 0 : _lodus;
        _pragma = isNaN(_pragma) ? 0 : _pragma;
        _storge = isNaN(_storge) ? 0 : _storge;
        _manic = isNaN(_manic) ? 0 : _manic;

        _eros = _eros < 0 ? 0 : _eros;
        _philia = _philia < 0 ? 0 : _philia;
        _lodus = _lodus < 0 ? 0 : _lodus;
        _pragma = _pragma < 0 ? 0 : _pragma;
        _storge = _storge < 0 ? 0 : _storge;
        _manic = _manic < 0 ? 0 : _manic;

        _eros = _eros > 100 ? 100 : _eros;
        _philia = _philia > 100 ? 100 : _philia;
        _lodus = _lodus > 100 ? 100 : _lodus;
        _pragma = _pragma > 100 ? 100 : _pragma;
        _storge = _storge > 100 ? 100 : _storge;
        _manic = _manic > 100 ? 100 : _manic;

        this.eros = _eros;
        this.philia = _philia;
        this.lodus = _lodus;
        this.pragma = _pragma;
        this.storge = _storge;
        this.manic = _manic;
    }

    offset(_eros = 0, _philia = 0, _lodus = 0, _pragma = 0, _storge = 0, _manic = 0) {
        _eros = isNaN(_eros) ? 0 : _eros;
        _philia = isNaN(_philia) ? 0 : _philia;
        _lodus = isNaN(_lodus) ? 0 : _lodus;
        _pragma = isNaN(_pragma) ? 0 : _pragma;
        _storge = isNaN(_storge) ? 0 : _storge;
        _manic = isNaN(_manic) ? 0 : _manic;

        this._setAll(this.eros + _eros, this.philia + _philia, this.lodus + _lodus, this.pragma + _pragma, this.storge + _storge, this.manic + _manic);
    }

    toString() {
        var _blob = "";
        _blob += ("Passion(" + this.eros + "), Friendship(" + this.philia + "), Playfulness(" + this.lodus + "), Soulmate(" + this.pragma + "), Familial(" + this.storge + "), Obsession(" + this.manic + ")");

        return _blob;
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
        
        try {
            var _json = JSON.parse(_id);
        }
        catch (e) {}
        
        if (_json instanceof Object) {
            this.fromJSON(this._json);
            
            delete this._json;
            
            return this;
        }
        
        if (debug) console.log("Creating a new instance of Character with ID `{0}`".format(_id));

        super(_id, _name);
        this.surname = undefined;
        if (this.name.split(", ").length > 1) {
            var tempName = this.name.split(", ");
            this.name = tempName[1];
            this.surname = tempName[0];
        }
        else if (this.name.split(" ").length > 1) {
            var tempName = this.name.split(" ");
            this.name = tempName[0];
            this.surname = tempName[1];
        }
        this.nickname = undefined;
        this.age = this.setAge(_age);
        this.image = "images/characters/{0}.svg".format(this.name.toLowerCase()); // base64 image, or url

        this.addAction("talk");
        this.addAction("sex");
        this.addAction("masturbate");
        this.addAction("attack");
        this.addAction("follow");
        this.addAction("stay");
        this.addAction("hold");
        this.addAction("open"); // inventory... maybe :v
        this.addAction("give");
        this.addAction("remove");
        this.addAction("take");
        this.addAction("wear");

        this.currentActions = new Set();

        this.heldItems = new Set();
        this.hasPhone = false;
        this.phone = undefined;

        this.defaultDisposition = new Disposition(0,0,0,0,0,0);
        this.philautia = 50;     // self
        this.agape = 50;         // others
        this.life = 100;
        this.lifeMax = 100;
        this.mana = 0;
        this.manaMax = 0;
        this.stamina = 100;
        this.staminaMax = 100;
        this.money = 0;
        this.sanity = 100;
        this.lust = 25;
        this.rut = false;
        this.clean = 100;
        this.annoyed = 0;
        this.living = true;

        this.setSex(_sex);
        this.gender = _sex;

        this.furColourA = "orange"; // Body
        this.furColourAHex = undefined;
        this.furColourB = "cream"; // Middle
        this.furColourBHex = undefined;

        // Handled by setSpecies
        this.bodySize = 0.5;
        this.predator = false;
        this.handType = "pad";
        this.feetType = "pad";
        this.relatives = new Set();
        this.eyeType = "circle";
        this.eyeColour = "green";
        this.peltType = "fur";
        this.furTrimmed = 50;
        this.furSoftness = 50;

        /*
            0 - none/flat
            1 - petite
            2 - average
            3 - large
        */
        this.breastSize = 0;

        /*
            0, 0 - none
            8, 7 - marty
            16, 11 - wolter
            24, 13 - remmy
            25, 16 - al
            30, 16 - rex
        */
        this.penisSize = 0;
        this.penisGirth = 0;

        /*
            0, 0 - none
            3, 1 - martina
            7, 4.7 - anneke
            7, 4.5 - charlie
            7, 4.9 - avo
            8, 5.5 - betty
            9, 6 - dora
            7, 5 - velvet
        */
        this.vaginaSize = 0;
        this.vaginaGirth = 0;

        /*
            0 - none
            1 - stubble
            2 - prairy
            3 - 70s
        */
        this.pubicHairSize = 0;


        this.setSpecies(_species);

        this.virgin = true;
        this.sexWithMale = false;
        this.sexWithFemale = false;

        this.sexCount = 0;
        this.characterSexCount = new Map(); // Map<Character, integer>
        this.characterSexRefusalCount = new Map(); // Map<Character, integer>
        this.vaginalReceiveCount = 0;
        this.vaginalGiveCount = 0;
        this.analReceiveCount = 0;
        this.analGiveCount = 0;
        this.cunnilingusReceiveCount = 0;
        this.cunnilingusGiveCount = 0;
        this.analingusReceiveCount = 0;
        this.analingusGiveCount = 0;
        this.fellatioReceiveCount = 0;
        this.fellatioGiveCount = 0;
        this.masturbateCount = 0;
        this.handjobCount = 0;

        this.following = undefined; // Character
        this.followers = new Set(); // Set<Character>

        this.furniture = undefined;

        this.clothing = new Map(); // Map<string, Clothing>
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

        this.characterDisposition = new Map(); // Map<Character, Disposition>
        
        this.prefersSpecies = new Set(); // Set<species>
        this.avoidsSpecies = new Set(); // Set<species>

        this.sexualOrientation = 0; // 0 straight, 1 gay, 2 bi

        this.preferredPenisSize = undefined; // int
        this.preferredPenisGirth = undefined; // int
        this.preferredBreastSize = undefined; // int

        this.prefersPredators = false;
        this.avoidsPredators = false;
        this.prefersPrey = false;
        this.avoidsPrey = false;

        this.exhibitionism = 0; // 0-100, preference for public sex
        this.somnophilia = 0; // 0-100, preference for sleep sex
        this.intoxication = 0; // 0-100, drunkness
        this.incestual = 0; // 0-100, preference for incest

        this.previousRoom = undefined;
        this.room = undefined;
        this.cell = undefined;
        this.location = undefined;

        charactersIndexes.set(_id, this);

        this.stand();
        this.sleep();
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

        this.id = json["id"]; delete json["id"];
        this.setAge(json.hasOwnProperty("age") ? json["age"] : this.age); delete json["age"];
        this.setLife(json.hasOwnProperty("life") ? json["life"] : this.life); delete json["life"];
        this.setLifeMax(json.hasOwnProperty("lifeMax") ? json["lifeMax"] : this.lifeMax); delete json["lifeMax"];
        this.setMana(json.hasOwnProperty("mana") ? json["mana"] : this.mana); delete json["mana"];
        this.setManaMax(json.hasOwnProperty("manaMax") ? json["manaMax"] : this.manaMax); delete json["manaMax"];
        this.setStamina(json.hasOwnProperty("stamina") ? json["stamina"] : this.stamina); delete json["stamina"];
        this.setStaminaMax(json.hasOwnProperty("staminaMax") ? json["staminaMax"] : this.staminaMax); delete json["staminaMax"];
        this.setMoney(json.hasOwnProperty("money") ? json["money"] : this.money); delete json["money"];
        this.setPhilautia(json.hasOwnProperty("philautia") ? json["philautia"] : this.philautia); delete json["philautia"];
        this.setAgape(json.hasOwnProperty("agape") ? json["agape"] : this.agape); delete json["agape"];
        this.setLust(json.hasOwnProperty("lust") ? json["lust"] : this.lust); delete json["lust"];
        this.setExhibitionism(json.hasOwnProperty("exhibitionism") ? json["exhibitionism"] : this.exhibitionism); delete json["exhibitionism"];
        this.setSomnophilia(json.hasOwnProperty("somnophilia") ? json["somnophilia"] : this.somnophilia); delete json["somnophilia"];
        this.setIntoxication(json.hasOwnProperty("intoxication") ? json["intoxication"] : this.intoxication); delete json["intoxication"];
        this.setIncestual(json.hasOwnProperty("incestual") ? json["incestual"] : this.incestual); delete json["incestual"];
        this.setRut(json.hasOwnProperty("rut") ? json["rut"] : this.rut); delete json["rut"];
        this.setLiving(json.hasOwnProperty("living") ? json["living"] : this.living); delete json["living"];
        this.setVirgin(json.hasOwnProperty("virgin") ? json["virgin"] : this.virgin); delete json["virgin"];
        this.setSexualOrientation(json.hasOwnProperty("sexualOrientation") ? json["sexualOrientation"] : this.sexualOrientation); delete json["sexualOrientation"];
        this.setSex(json.hasOwnProperty("sex") ? json["sex"] : this.sex); delete json["sex"];
        
        var _tmpArr = [];
        
        // Sets
        //  availableActions
        try {
            _tmpArr = JSON.parse(json["availableActions"]);
            _tmpArr.forEach(function(_int) {
                this.addAction(_int);
            }, this);
        } catch (e) {}
        delete json["availableActions"];
        //  avoidsSpecies
        try {
            _tmpArr = JSON.parse(json["avoidsSpecies"]);
            _tmpArr.forEach(function(_int) {
                this.addPreferredSpecies(_int);
            }, this);
        } catch (e) {}
        delete json["avoidsSpecies"];
        //  currentActions
        try {
            _tmpArr = JSON.parse(json["currentActions"]);
            _tmpArr.forEach(function(_int) {
                this.addCurrentAction(_int);
            }, this);
        } catch (e) {}
        delete json["currentActions"];
        //  followers
        try {
            _tmpArr = JSON.parse(json["followers"]);
            _tmpArr.forEach(function(_character) {
                if (charactersIndexes.has(_character))
                    this.addFollower(charactersIndexes.get(_character));
            }, this);
        } catch (e) {}
        delete json["followers"];
        //  items
        try {
            _tmpArr = JSON.parse(json["items"]);
            _tmpArr.forEach(function(_item) {
                if (itemsIndexes.has(_item))
                    this.addItem(itemsIndexes.get(_item));
            }, this);
        } catch (e) {}
        delete json["items"];
        //  heldItems
        try {
            _tmpArr = JSON.parse(json["heldItems"]);
            _tmpArr.forEach(function(_item) {
                if (itemsIndexes.has(_item))
                    this.addHeldItem(itemsIndexes.get(_item));
            }, this);
        } catch (e) {}
        delete json["heldItems"];
        //  prefersSpecies
        try {
            _tmpArr = JSON.parse(json["prefersSpecies"]);
            _tmpArr.forEach(function(_int) {
                this.addPreferredSpecies(_int);
            }, this);
        } catch (e) {}
        delete json["prefersSpecies"];
        //  relatives
        try {
            _tmpArr = JSON.parse(json["relatives"]);
            _tmpArr.forEach(function(_character) {
                if (charactersIndexes.has(_character))
                    this.addRelative(charactersIndexes.get(_character), false);
            }, this);
        } catch (e) {}
        delete json["relatives"];
        
        // Maps
        //  characterSexCount
        try {
            _tmpArr = JSON.parse(json["characterSexCount"]);
            _tmpArr.forEach(function(_int, _character) {
                if (charactersIndexes.has(_character)) {
                    _int = Number.parseInt(_int);
                    this.characterSexCount.set(charactersIndexes.get(_character), (_int >= 0 ? _int : 0));
                }
                else
                    return undefined;
            }, this);
        } catch (e) {
            console.log(e);
        }
        delete json["characterSexCount"];
        //  characterSexRefusalCount
        try {
            _tmpArr = JSON.parse(json["characterSexRefusalCount"]);
            _tmpArr.forEach(function(_int, _character) {
                if (charactersIndexes.has(_character)) {
                    _int = Number.parseInt(_int);
                    this.characterSexRefusalCount.set(charactersIndexes.get(_character), (_int >= 0 ? _int : 0));
                }
                else
                    return undefined;
            }, this);
        } catch (e) {
            console.log(e);
        }
        delete json["characterSexRefusalCount"];
        //  characterDisposition
        try {
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
        //  clothing
        try {
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
        
        // Entities
        this.defaultDisposition.fromObject(json["defaultDisposition"]);
        delete json["defaultDisposition"];
        
        if (charactersIndexes.has(json["following"]))
            this.follow(charactersIndexes.get(json["following"]));
        delete json["following"];
        
        if (furnitureIndexes.has(json["furniture"])) {
            furnitureIndexes.get(json["furniture"]).addCharacter(this);
            this.furniture = furnitureIndexes.get(json["furniture"]);
        }
        delete json["furniture"];
        
        if (roomsIndexes.has(json["previousRoom"]))
            this.previousRoom = roomsIndexes.get(json["previousRoom"]);
        delete json["previousRoom"];
        
        if (roomsIndexes.has(json["room"]))
            this.room = roomsIndexes.get(json["room"]);
        delete json["room"];
        delete json["cell"];
        delete json["location"];
        
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

    addHeldItem(_item) {
        if (!(_item instanceof Item)) {
            _item = itemsIndexes.has(_item) ? itemsIndexes.get(_item) : undefined;

	        if (!(_item instanceof Item))
	        	return undefined;
	    }

    	if (this.heldItems.size > 1)
    		return false;
		else {
    		this.heldItems.add(_item);
    		return true;
		}
    }
    hold(_item) {
    	return this.addHeldItem(_item);
    }
    removeHeldItem(_item) {
        if (!(_item instanceof Item)) {
            _item = itemsIndexes.has(_item) ? itemsIndexes.get(_item) : undefined;

	        if (!(_item instanceof Item))
	        	return undefined;
	    }

    	if (this.heldItems.contains(_item)) {
    		this.heldItems.delete(_item);
    		return true;
    	}
    	else
    		return false;
    }

    setAge(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.age = _int;
        return _int;
    }
    incAge(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setAge(this.age + _int);
    }
    addAge(_int) {
        return this.incAge(_int);
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
    incLife(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setLife(this.life + _int);
    }
    addLife(_int) {
        return this.incLife(_int);
    }
    decLife(_int) {
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
    incLifeMax(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setLifeMax(this.lifeMax + _int);
    }
    addLifeMax(_int) {
        return this.incLifeMax(_int);
    }
    decLifeMax(_int) {
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
    incMana(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setMana(this.mana + _int);
    }
    addMana(_int) {
        return this.incMana(_int);
    }
    decMana(_int) {
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
            _int = 1;
        else if (_int < 1)
            _int = 1;
        else if (_int > 100)
            _int = 100;

        if (this.mana > this.manaMax)
            this.mana = this._int;

        this.manaMax = _int;
        return _int;
    }
    incManaMax(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setManaMax(this.manaMax + _int);
    }
    addManaMax(_int) {
        return this.incManaMax(_int);
    }
    decManaMax(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setManaMax(this.manaMax - _int);
    }
    subManaMax(_int) {
        return this.decManaMax(_int);
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
    incStamina(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setStamina(this.stamina + _int);
    }
    addStamina(_int) {
        return this.incStamina(_int);
    }
    decStamina(_int) {
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
    incStaminaMax(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setStaminaMax(this.staminaMax + _int);
    }
    addStaminaMax(_int) {
        return this.incStaminaMax(_int);
    }
    decStaminaMax(_int) {
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
    incMoney(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setMoney(this.money + _int);
    }
    addMoney(_int) {
        return this.incMoney(_int);
    }
    decMoney(_int) {
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
    incSanity(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setSanity(this.sanity + _int);
    }
    addSanity(_int) {
        return this.incSanity(_int);
    }
    decSanity(_int) {
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
    incPhilautia(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setPhilautia(this.philautia + _int);
    }
    addPhilautia(_int) {
        return this.incPhilautia(_int);
    }
    decPhilautia(_int) {
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
    incAgape(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setAgape(this.agape + _int);
    }
    addAgape(_int) {
        return this.incAgape(_int);
    }
    decAgape(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setAgape(this.agape - _int);
    }
    subAgape(_int) {
        return this.decAgape(_int);
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
    incLust(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setLust(this.lust + _int);
    }
    addLust(_int) {
        return this.incLust(_int);
    }
    decLust(_int) {
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
    incExhibitionism(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setExhibitionism(this.exhibitionism + _int);
    }
    addExhibitionism(_int) {
        return this.incExhibitionism(_int);
    }
    decExhibitionism(_int) {
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
    incSomnophilia(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setSomnophilia(this.somnophilia + _int);
    }
    addSomnophilia(_int) {
        return this.incSomnophilia(_int);
    }
    decSomnophilia(_int) {
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
    incIntoxication(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setIntoxication(this.intoxication + _int);
    }
    addIntoxication(_int) {
        return this.incIntoxication(_int);
    }
    decIntoxication(_int) {
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
    incIncestual(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setIncestual(this.incestual + _int);
    }
    addIncestual(_int) {
        return this.incIncestual(_int);
    }
    decIncestual(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setIncestual(this.incestual - _int);
    }
    subIncestual(_int) {
        return this.decIncestual(_int);
    }

    setRut(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.rut = _bool;
        return _bool;
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

    setSexualOrientation(_int) {
    	_int = Number.parseInt(_int);
    	if (isNaN(_int) || _int < 0 || _int > 2)
    		_int = 0;
        this.sexualOrientation = _int;
        return _int;
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
    
    setDefaultDisposition(_eros = 0, _philia = 0, _lodus = 0, _pragma = 0, _storge = 0, _manic = 0) {
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

            _eros = isNaN(_eros) ? this.defaultDisposition.eros : _eros;
            _philia = isNaN(_philia) ? this.defaultDisposition.philia : _philia;
            _lodus = isNaN(_lodus) ? this.defaultDisposition.lodus : _lodus;
            _pragma = isNaN(_pragma) ? this.defaultDisposition.pragma : _pragma;
            _storge = isNaN(_storge) ? this.defaultDisposition.storge : _storge;
            _manic = isNaN(_manic) ? this.defaultDisposition.manic : _manic;

            this.defaultDisposition.set(_eros, _philia, _lodus, _pragma, _storge, _manic);
        }

        return this.defaultDisposition;

    }
    setCharacterDisposition(_character, _eros = undefined, _philia = undefined, _lodus = undefined, _pragma = undefined, _storge = undefined, _manic = undefined) {
        if (debug) console.log("Running setCharacterDisposition");

        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        if (!(_character instanceof Character)) {
            if (debug) console.log("\t_character `{0}` isn't valid".format(_character));
            return false;
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
            
            _eros = isNaN(_eros) ? this.characterDisposition.get(_character).eros : _eros;
            _philia = isNaN(_philia) ? this.characterDisposition.get(_character).philia : _philia;
            _lodus = isNaN(_lodus) ? this.characterDisposition.get(_character).lodus : _lodus;
            _pragma = isNaN(_pragma) ? this.characterDisposition.get(_character).pragma : _pragma;
            _storge = isNaN(_storge) ? this.characterDisposition.get(_character).storge : _storge;
            _manic = isNaN(_manic) ? this.characterDisposition.get(_character).manic : _manic;

            this.characterDisposition.set(_character, this.characterDisposition.get(_character).set(_eros, _philia, _lodus, _pragma, _storge, _manic));
        }
        else {
            _eros = Number.parseInt(_eros);
            _philia = Number.parseInt(_philia);
            _lodus = Number.parseInt(_lodus);
            _pragma = Number.parseInt(_pragma);
            _storge = Number.parseInt(_storge);
            _manic = Number.parseInt(_manic);
            
            _eros = isNaN(_eros) ? this.defaultDisposition.eros : _eros;
            _philia = isNaN(_philia) ? this.defaultDisposition.philia : _philia;
            _lodus = isNaN(_lodus) ? this.defaultDisposition.lodus : _lodus;
            _pragma = isNaN(_pragma) ? this.defaultDisposition.pragma : _pragma;
            _storge = isNaN(_storge) ? this.defaultDisposition.storge : _storge;
            _manic = isNaN(_manic) ? this.defaultDisposition.manic : _manic;

            this.characterDisposition.set(_character, new Disposition(_eros, _philia, _lodus, _pragma, _storge, _manic));
        }

        return this.characterDisposition.get(_character);
    }
    setCharacterEros(_character, _eros) {
        this.setCharacterDisposition(_character, "eros", _eros);
    }
    addCharacterEros(_character, _eros) {
        this.setCharacterEros(_character, this.getCharacterDisposition(_character)["eros"] + _eros);
    }
    incrementCharacterEros(_character) {
        this.addCharacterEros(_character, 1);
    }
    setCharacterPhilia(_character, _philia) {
        this.setCharacterDisposition(_character, "philia", _philia);
    }
    addCharacterPhilia(_character, _philia) {
        this.setCharacterPhilia(_character, this.getCharacterDisposition(_character)["philia"] + _philia);
    }
    incrementCharacterPhilia(_character) {
        this.addCharacterPhilia(_character, 1);
    }
    setCharacterLodus(_character, _lodus) {
        this.setCharacterDisposition(_character, "lodus", _lodus);
    }
    addCharacterLodus(_character, _lodus) {
        this.setCharacterLodus(_character, this.getCharacterDisposition(_character)["lodus"] + _lodus);
    }
    incrementCharacterLodus(_character) {
        this.addCharacterLodus(_character, 1);
    }
    setCharacterPragma(_character, _pragma) {
        this.setCharacterDisposition(_character, "pragma", _pragma);
    }
    addCharacterPragma(_character, _pragma) {
        this.setCharacterPragma(_character, this.getCharacterDisposition(_character)["pragma"] + _pragma);
    }
    incrementCharacterPragma(_character) {
        this.addCharacterPragma(_character, 1);
    }
    setCharacterStorge(_character, _storge) {
        this.setCharacterDisposition(_character, "storge", _storge);
    }
    addCharacterStorge(_character, _storge) {
        this.setCharacterStorge(_character, this.getCharacterDisposition(_character)["storge"] + _storge);
    }
    incrementCharacterStorge(_character) {
        this.addCharacterStorge(_character, 1);
    }
    setCharacterManic(_character, _manic) {
        this.setCharacterDisposition(_character, "manic", _manic);
    }
    addCharacterManic(_character, _manic) {
        this.setCharacterManic(_character, this.getCharacterDisposition(_character)["manic"] + _manic);
    }
    incrementCharacterManic(_character) {
        this.addCharacterManic(_character, 1);
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
        if (clothingTypes.has(_type))
            return this.clothing.get(_clothing.type);
        else
            return undefined;
    }
    setClothing(_clothing) {
        this.putOn(_clothing);
    }

    addCurrentAction(_actionType) {
        actionTypes.has(_actionType) && this.currentActions.add(_actionType);
    }
    removeCurrentAction(_actionType) {
        actionTypes.has(_actionType) && this.currentActions.delete(_actionType);
    }
    hasCurrentAction(_actionType) {
        return this.currentActions.has(_actionType);
    }
    currentActionPosition() {
        if (this.currentActions.has("sleep"))
            return "sleep";
        else if (this.currentActions.has("lay"))
            return "lay";
        else if (this.currentActions.has("sit"))
            return "sit";
        else if (this.currentActions.has("stand"))
            return "stand";
    }
    currentActionPresentParticiplePosition() {
        if (this.currentActions.has("sleep"))
            return "sleeping";
        else if (this.currentActions.has("lay"))
            return "lying";
        else if (this.currentActions.has("sit"))
            return "sitting";
        else if (this.currentActions.has("stand"))
            return "standing";
    }
    currentActionPresentTensePosition() {
        return this.currentActionPresentParticiplePosition();
    }

    sit(_furniture = undefined) {
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.has(_furniture) ? furnitureIndexes.get(_furniture) : undefined;

        this.addCurrentAction("sit");
        this.removeCurrentAction("lay");
        this.removeCurrentAction("sleep");
        this.removeCurrentAction("stand");
        this.removeCurrentAction("walk");
        this.removeCurrentAction("masturbate");
        this.removeCurrentAction("sex");

        if (_furniture instanceof Furniture)
            this.furniture = _furniture

        return this.furniture;
    }
    lay(_furniture = undefined) {
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.has(_furniture) ? furnitureIndexes.get(_furniture) : undefined;
        
        this.addCurrentAction("lay");
        this.removeCurrentAction("sit");
        this.removeCurrentAction("sleep");
        this.removeCurrentAction("stand");
        this.removeCurrentAction("walk");
        this.removeCurrentAction("masturbate");
        this.removeCurrentAction("sex");

        if (_furniture instanceof Furniture)
            this.furniture = _furniture;

        return this.furniture;
    }
    wake() {
        this.removeCurrentAction("sleep");

        return this.furniture;
    }
    sleep(_furniture = undefined) {
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.has(_furniture) ? furnitureIndexes.get(_furniture) : undefined;

        this.addCurrentAction("sleep");
        this.removeCurrentAction("walk");
        this.removeCurrentAction("masturbate");
        this.removeCurrentAction("sex");

        if (_furniture instanceof Furniture)
            this.furniture = _furniture;

        return this.furniture;
    }
    stand() {
        this.addCurrentAction("stand");
        this.removeCurrentAction("sit");
        this.removeCurrentAction("lay");
        this.removeCurrentAction("sleep");
        this.removeCurrentAction("walk");
        this.removeCurrentAction("masturbate");
        this.removeCurrentAction("sex");

        this.furniture = undefined;

        return this.furniture;
    }
    walk() {
        this.addCurrentAction("walk");
        this.removeCurrentAction("sit");
        this.removeCurrentAction("lay");
        this.removeCurrentAction("sleep");
        this.removeCurrentAction("stand");
        this.removeCurrentAction("masturbate");
        this.removeCurrentAction("sex");

        this.furniture = undefined;

        return this.furniture;
    }
    fuck(_character = undefined, _furniture = undefined) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.has(_furniture) ? furnitureIndexes.get(_furniture) : undefined;
        
        if (!(_character instanceof Character))
            return undefined;

        if (_character.sex == 1)
            this.sexWithFemale = true;
        else if (_character.sex == 0)
            this.sexWithMale = true;

        this.removeCurrentAction("masturbate");
        _character.removeCurrentAction("masturbate");
        this.addCurrentAction("sex");
        _character.addCurrentAction("sex");

        this.addSexWith(_character, true);
        
        return true;
    }
    masturbate(_furniture = undefined) {
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.has(_furniture) ? furnitureIndexes.get(_furniture) : undefined;
        
        this.furniture = _furniture;
        
        this.removeCurrentAction("sleep");
        this.removeCurrentAction("walk");
        this.removeCurrentAction("sex");
        
        this.addCurrentAction("masturbate");
        
        return true;
    }

    addSexRefusalCount(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        if (!(_character instanceof Character))
            return undefined;

        if (this.characterSexRefusalCount.has(_character))
            this.characterSexRefusalCount.set(_character, this.characterSexRefusalCount.get(_character) + 1);
        else
            this.characterSexRefusalCount.set(_character, 1);

        return this.characterSexRefusalCount.get(_character);
    }
    getSexRefusalCount(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        if (!(_character instanceof Character))
            return undefined;

        if (this.characterSexRefusalCount.has(_character))
            return this.characterSexRefusalCount.get(_character);
        else
            return 0;
    }

    isSleeping() {
        return this.hasCurrentAction("sleep");
    }
    
    wear(_clothing, _type = undefined) {
        this.putOn(_clothing, _type);
    }
    wearing(_clothing) {
        if (!(_clothing instanceof Clothing))
            _clothing = clothingIndexes.get(_clothing);

        if (_clothing instanceof Clothing) {
            if (clothingTypes.has(_clothing.type))
                return this.clothing.get(_clothing.type) == _clothing;
        }
    }
    putOn(_clothing, _type = undefined) {
        if (!(_clothing instanceof Clothing))
            _clothing = clothingIndexes.get(_clothing);

        if (_clothing instanceof Clothing) {
	        this.items.add(_clothing);

	        if (clothingTypes.has(_clothing.type)) {
	            this.clothing.set(_clothing.type, _clothing);
	            return true;
	        }
	        return false;
        }
        else {
        	if (clothingTypes.has(_type)) {
        		this.takeOff(_type);
        		return true;
        	}
        	else
        		return undefined;
        }
    }
    takeOff(_clothing) {
        if (!(_clothing instanceof Clothing))
            _clothing = clothingIndexes.has(_clothing) ? clothingIndexes.get(_clothing) : _clothing;

        if (_clothing instanceof Clothing) {
            if (clothingTypes.has(_clothing.type))
                this.clothing.set(_clothing.type, undefined);
        }
        else if (clothingTypes.has(_clothing))
        	this.clothing.set(_clothing, undefined);
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
    singularPossesiveName() {
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
        if (handTypes.has(_type))
            this.handType = _type;
        else
            this.handType = "pad";
    }

    setFeet(_type) {
        if (feetTypes.has(_type))
            this.feetType = _type;
        else
            this.feetType = "pad";
    }

    setEyes(_type) {
        if (eyeTypes.has(_type))
            this.eyeType = _type;
        else
            this.eyeType = "circle";
    }
    setEyeColour(_colour) {
        this.eyeColour = _colour
        this.eyeColourHex = colourNameToHex(_colour.replace(/[^a-z]/g, ""));
    }

    setFur(_type) {
        if (peltTypes.has(_type))
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

    setSpecies(_species) {
        if (speciesTypes.has(_species))
            this.species = _species;
        else
            this.species = "fox";

        if (_species == "fox") {
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
        else if (_species == "wolf") {
            if (this.sex == 0) {
                this.penisSize = 25;
                this.penisGirth = 16;
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
            this.furSoftness = 75;
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
            this.furSoftness = 75;
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
            this.furSoftness = 75;
        }
        else if (_species == "jackal") {
            if (this.sex == 0) {
                this.penisSize = 18;
                this.penisGirth = 12;
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
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        if (_character instanceof Character)
            this.following = _character;
    }
    clearFollowing() {
        this.following = undefined;
    }
    follow(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        if (_character instanceof Character)
            this.following = _character;
    }

    addFollower(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        if (_character instanceof Character)
            this.followers.add(_character);
    }
    removeFollower(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        if (_character instanceof Character) {
            if (this.followers.has(_character))
                this.followers.delete(_character);
        }
    }
    clearFollowers() {
        this.followers.clear();
    }
    hasFollowers() {
        return this.followers.size > 0;
    }

    getCharacterSexCount(_character = undefined) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        if (_character instanceof Character)
            return this.characterSexCount.has(_character) ? this.characterSexCount.get(_character) : 0;
        else
            return undefined;
    }
    getSexCount(_character = undefined) {
        if (typeof _character != "undefined")
            return this.getCharacterSexCount(_character);
        else
            return this.sexCount;
    }
    addSexWith(_character, _updateChild = true) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        if (_character instanceof Character) {
            this.virgin = false;
            this.sexCount++;
            if (this.characterSexCount.has(_character))
                this.characterSexCount.set(_character, Number.parseInt(this.characterSexCount.get(_character)) + 1);
            else
                this.characterSexCount.set(_character, 1);

            if (_updateChild)
                _character.addSexWith(this, false);
        }
    }

    addRelative(_character, _updateChild = true) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        if (_character instanceof Character) {
            this.relatives.add(_character);

            if (_updateChild)
                _character.addRelative(this, false);
        }
    }

    addPreferredSpecies(_species) {
        if (speciesTypes.has(_species)) {
            _species = _species;
            this.prefersSpecies.add(_species);
        }
    }
    likesSpecies(_species) {
        this.addPreferredSpecies(_species);
    }

    addAvoidedSpecies(_species) {
        if (speciesTypes.has(_species)) {
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
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        if (!(_character instanceof Character))
            return undefined;

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

        return this.getCharacterSexCount(_character) > 0;
    }
    chanceToFuck(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;

        if (typeof _character == 'undefined')
            return 0;

        if (!_character.characterDisposition.has(this))
            return 0;

        if (debug) console.log("Calculating chance for {0} to fuck {1}.".format(_character.name, this.name));

        var chance = 0;

        // Disposition
        if (_character.hadSexWith(this)) {
            chance += _character.getCharacterDisposition(this, "eros") / 1.5 / _character.getCharacterSexCount(this);
            chance += _character.getCharacterDisposition(this, "philia") / 2.5;
        }
        else {
            chance += _character.getCharacterDisposition(this, "eros") / 2.5;
            chance += _character.getCharacterDisposition(this, "philia") / 6;
        }
        chance += _character.getCharacterDisposition(this, "pragma");
        chance += _character.getCharacterDisposition(this, "manic") * 2;

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

        // Rut and Lust
        if (_character.rut && _character.lust > 98)
            chance += 100;
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
            if (_character.incestual > 0)
                chance += _character.incestual/4;
            else
                chance -= 50;
        }

        if (debug) console.log("\tAfter incest check: " + Math.ceil(chance));

        // Intoxication
        chance += _character.intoxication/2.5;

        if (debug) console.log("\tAfter intoxication check: " + Math.ceil(chance));

        // Somnophilia
        if (_character.sleeping) {
            if (enableRape)
                chance = 100;
            else if (_character.somnophilia > 50 && _character.hadSexWith(this) && _character.getCharacterDisposition(this, "eros") > 75)
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

        return true;
    }
    moveTo(_room, _checkLocked = false) {
        return this.moveToRoom(_room, _checkLocked);
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
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined) {
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
    constructor(_id = undefinend, _sid = undefined, _name = undefined, _type = "hallway", _cell = undefined, _location = undefined) {
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
        if (roomTypes.has(_type))
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

    updateItems() {
        this.items.clear();
        if (this.furniture.size > 0) {
            this.furniture.forEach(function(_furniture) {
                if (_furniture.items.size > 0) {
                    _furniture.items.forEach(function(_item) {
                        this.addItem(_item);
                    }, this);
                }
            }, this);
        }
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
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _plural = false) {
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
            super(_id, _name, _description);

            this.addAction("put");
            this.addAction("take");
            this.addAction("hold");

            if (typeof _image == 'undefined')
                _image = "images/items/genericItem.svg";
            this.image = _image;

            this.plural = _plural;

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
     * @param  {String}  _type        clothingType
     * @param  {String}  _image       Image path of base64
     * @param  {Boolean} _plural      Whether or not the item is plural
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _type = "shirt", _image = undefined, _plural = false) {
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

            this.addAction("wear");
            this.addAction("remove");

            this.setType(_type);

            clothingIndexes.set(_id, this);
        }
    }

    setType(_type) {
        if (clothingTypes.has(_type))
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
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _type = "food", _image = undefined, _plural = false) {
        if (_id instanceof Consumable) {
            super(_id.id, _id._name);
            for (var property in _id) {
                if (_id.hasOwnProperty(property)) {
                    this[property] = _id[property];
                }
            }
            
            consumableIndexes.set(_id, this);
        }
        else {
            super(_id, _name, _description, _image, _plural);

            this.addAction("consume");

            this.setType(_type);

            consumableIndexes.set(_id, this);
        }
    }

    setType(_type) {
        if (consumableTypes.has(_type))
            this.type = _type;
        else
            this.type = "food";
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
    constructor(_id = undefined, _name = undefined, _description = undefined, _type = "chair", _seatingSpace = 1, _storageSpace = 1) {
        if (_id instanceof Furniture) {
            super(_id.id, _id._name);
            for (var property in _id) {
                if (_id.hasOwnProperty(property)) {
                    this[property] = _id[property];
                }
            }
        }
        else {
            super(_id, _name, _description);

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
                this.addAction(_int);
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

    setType(_type) {
        if (furnitureTypes.has(_type))
        	this.type = _type;
        else
        	this.type = "chair";

        switch(this.type) {
            case "bed" : {
                this.addAction("open");
                this.addAction("sleep");
                this.addAction("lay");
                this.addAction("sit");
                break;
            }
            case "chair" : {
                this.addAction("sit");
                this.addAction("sleep");
                break;
            }
            case "recliner" : {
                this.addAction("open");
                this.addAction("sleep");
                this.addAction("lay");
                this.addAction("sit");
                break;
            }
            case "loveseat" : {
                this.addAction("open");
                this.addAction("sleep");
                this.addAction("lay");
                this.addAction("sit");
                break;
            }
            case "couch" : {
                this.addAction("open");
                this.addAction("sleep");
                this.addAction("lay");
                this.addAction("sit");
                break;
            }
            case "table" : {
                this.addAction("open");
                this.addAction("sleep");
                this.addAction("sit");
                break;
            }
            case "desk" : {
                this.addAction("open");
                this.addAction("sleep");
                this.addAction("sit");
                break;
            }
            case "shelf" : {
                this.addAction("open");
                break;
            }
            case "cupboard" : {
                this.addAction("open");
                break;
            }
            case "cabinet" : {
                this.addAction("open");
                break;
            }
            case "bureau" : {
                this.addAction("open");
                break;
            }
            case "hook" : {
                this.addAction("open");
                break;
            }
            case "tv" : {
                this.addAction("use");
                this.addAction("look");
                break;
            }
            case "fridge" : {
                this.addAction("open");
                break;
            }
            case "oven" : {
                this.addAction("use");
                this.addAction("open");
                break;
            }
            case "microwave" : {
                this.addAction("use");
                this.addAction("open");
                break;
            }
            case "toaster" : {
                this.addAction("use");
                this.addAction("open");
                break;
            }
            case "tub" : {
                this.addAction("use");
                this.addAction("sleep");
                this.addAction("lay");
                this.addAction("sit");
                break;
            }
            case "shower" : {
                this.addAction("use");
                this.addAction("sit");
                break;
            }
            case "sink" : {
                this.addAction("use");
                break;
            }
            case "toilet" : {
                this.addAction("use");
                this.addAction("sit");
                break;
            }
            case "mirror" : {
                this.addAction("look");
                this.addAction("use");
                break;
            }
            case "basket" : {
                this.addAction("open");
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
    constructor(_id = undefined, _name = undefined, _description = undefined) {
        super(_id, _name, _description);
    }
}
class Phone extends Item {
    constructor(_id = undefined, _name = undefined, _description = undefined, _owner = undefined) {
        super(_id, _name, _description);
        if (!(_owner instanceof Character))
            _owner = charactersIndexes.has(_owner) ? charactersIndexes.get(_owner) : undefined;
        this.owner = _owner;

        this.receivedMessages = new Map();
        this.readMessages = new Map();
        this.sentMessages = new Map();

        phonesIndexes.set(_id, this);
    }

    sendMessage(_toPhone, _message) {
        if (!(_toPhone instanceof Phone)) {
            if (phonesIndexes.has(_toPhone))
                _toPhone = phonesIndexes.get(_toPhone);
            else if (_toPhone instanceof Character) {
                if (_toPhone.hasPhone)
                    _toPhone = _toPhone.phone;
                else
                    return undefined;
            }
            else if (charactersIndexes.has(_toPhone)) {
                _toPhone = charactersIndexes.get(_toPhone);
                if (_toPhone.hasPhone)
                    _toPhone = _toPhone.phone;
                else
                    return undefined;
            }
            else
                return undefined;
        }

        var _textMessage = new TextMessage(this, _toPhone, _message);
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
     * @param  {DateTime} _time      DateTime of message
     * @param  {String} _message   Text message, can be HTML
     */
    constructor(_fromPhone, _toPhone, _message = "") {
        if (!(_fromPhone instanceof Phone))
            _fromPhone = phonesIndexes.has(_fromPhone) ? phonesIndexes.get(_fromPhone) : undefined;
        if (!(_toPhone instanceof Phone))
            _toPhone = phonesIndexes.has(_toPhone) ? phonesIndexes.get(_toPhone) : undefined;

        if (_fromPhone == undefined || _toPhone == undefined)
            return undefined;

        this.id = "{0}{1}{2}".format(_fromPhone.id, _toPhone.id, textMessageIndexes.size);
        this.from = _fromPhone.owner.name;
        this.to = _toPhone.owner.name;
        this.time = currentTime.toUTCString();
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
        return (this.dom == _date.getDate());
    }
    containsMonth(_date) {
        return (this.month == _date.getMonth() + 1);
    }
    containsYear(_date) {
        return (this.year == _date.getYear());
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
     * @param  {Cron}  _cron           Cron, when to run
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
        if (eventsExecutedThisTick.has(this))
            return;

        if (debug) console.log("Executing " + this.id);

        lastGameEvent = this;
        unsafeExec(this.nextFunction);
        lastGameEvent = undefined;

        if (this.runOnce) {
            this.delete();
        }

        eventsExecutedThisTick.add(this);
    }

    delete() {
        eventsIndexes.delete(this.id);
    }
}