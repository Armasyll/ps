/* Static Classes */
class Title {
    /**
     * Sets the titles
     *
     * param _titleTopString
     * param _titleTopImg
     * param _titleMidString
     * param _titleBotString
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
        this.isExploring = false;
    }
    
    static clear() {
        this.options = [];
        document.getElementById("choiceContainerBottom").innerHTML = "";
        this.generate();
    }
    
    static setOption($index, $id, $title, $subTitle, $hover = "", $disabled = 0, $invisible = 0, $secret = 0) {
        if ($id.length > 0 && !$id.endsWith(")"))
            $id = $id + "()";
        
        this.options[$index] = [$id, $title, $subTitle, $hover, $disabled, $invisible, $secret];
    }
    static addOption($id, $title, $subTitle, $hover = "", $disabled = 0, $invisible = 0, $secret = 0) {
        var i = 0;
        var _runCond = 1;
        
        if (numberOfOptions == 12) {
            while (i <= this.options.length && i < numberOfOptions && _runCond) {
                if (!(Menu.isExploring && (i == 4 || i == 5 || i == 6 || i == 8 || i == 9 || i == 10))) {
                    if (typeof this.options[i] == 'undefined') {
                        if ($id.length > 0 && !$id.endsWith(")"))
                            $id = $id + "()";
                        
                        this.options[i] = [$id, $title, $subTitle, $hover, $disabled, $invisible, $secret];
                        _runCond = 0;
                    }
                }
                
                i++;
            }
        }
        else {
            while (i <= this.options.length && i < numberOfOptions && _runCond) {
                if (!(Menu.isExploring && (i == 5 || i == 6 || i == 7 || i == 10 || i == 11 || i == 12))) {
                    if (typeof this.options[i] == 'undefined') {
                        if ($id.length > 0 && !$id.endsWith(")"))
                            $id = $id + "()";
                        
                        this.options[i] = [$id, $title, $subTitle, $hover, $disabled, $invisible, $secret];
                        _runCond = 0;
                    }
                }
                
                i++;
            }
        }
    }
    static setExplorationOptions(northRoom = undefined, eastRoom = undefined, southRoom = undefined, westRoom = undefined, downRoom = undefined, upRoom = undefined) {
        Menu.isExploring = true;
        var _metaName = "";
        var _secret = false;
        
        if (downRoom instanceof Room) {
            if (player.room.cell.location != downRoom.cell.location)
                _metaName = downRoom.cell.location.name;
            else if (player.room.location === downRoom.location || typeof downRoom.location === 'undefined') 
                _metaName = downRoom.name;
            else
                _metaName = downRoom.location.name;
            
            this.options[(numberOfOptions == 12 ? 4 : 5)] = ["roomInteract(" + downRoom.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>Down", _metaName, undefined, undefined, undefined, downRoom.isSecret, "btn-info"];
        }
        if (northRoom instanceof Room) {
            if (player.room.cell.location != northRoom.cell.location)
                _metaName = northRoom.cell.location.name;
            else if (player.room.location === northRoom.location || typeof northRoom.location === 'undefined') 
                _metaName = northRoom.name;
            else
                _metaName = northRoom.location.name;
            
            this.options[(numberOfOptions == 12 ? 5 : 6)] = ["roomInteract(" + northRoom.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>North", _metaName, undefined, undefined, undefined, northRoom.isSecret, "btn-info"];
        }
        if (upRoom instanceof Room) {
            if (player.room.cell.location != upRoom.cell.location)
                _metaName = upRoom.cell.location.name;
            else if (player.room.location === upRoom.location || typeof upRoom.location === 'undefined') 
                _metaName = upRoom.name;
            else
                _metaName = upRoom.location.name;
            
            this.options[(numberOfOptions == 12 ? 6 : 7)] = ["roomInteract(" + upRoom.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>Up", _metaName, undefined, undefined, undefined, upRoom.isSecret, "btn-info"];
        }
        if (westRoom instanceof Room) {
            if (player.room.cell.location != westRoom.cell.location)
                _metaName = westRoom.cell.location.name;
            else if (player.room.location === westRoom.location || typeof westRoom.location === 'undefined') 
                _metaName = westRoom.name;
            else
                _metaName = westRoom.location.name;
            
            this.options[(numberOfOptions == 12 ? 8 : 10)] = ["roomInteract(" + westRoom.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>West", _metaName, undefined, undefined, undefined, westRoom.isSecret, "btn-info"];
        }
        if (southRoom instanceof Room) {
            if (player.room.cell.location != southRoom.cell.location)
                _metaName = southRoom.cell.location.name;
            else if (player.room.location === southRoom.location || typeof southRoom.location === 'undefined') 
                _metaName = southRoom.name;
            else
                _metaName = southRoom.location.name;
            
            this.options[(numberOfOptions == 12 ? 9 : 11)] = ["roomInteract(" + southRoom.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>South", _metaName, undefined, undefined, undefined, southRoom.isSecret, "btn-info"];
        }
        if (eastRoom instanceof Room) {
            if (player.room.cell.location != eastRoom.cell.location)
                _metaName = eastRoom.cell.location.name;
            else if (player.room.location === eastRoom.location || typeof eastRoom.location === 'undefined') 
                _metaName = eastRoom.name;
            else
                _metaName = eastRoom.location.name;
            
            this.options[(numberOfOptions == 12 ? 10 : 12)] = ["roomInteract(" + eastRoom.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>East", _metaName, undefined, undefined, undefined, eastRoom.isSecret, "btn-info"];
        }
    }
    static generate() {
        if (Menu.isExploring)
            this.setExplorationOptions();
        document.getElementById("choiceContainerBottom").innerHTML = "";
        var _blob = "";
        _blob += '<div class="btn-group btn-group-justified">';
        for (var i = 0; i < numberOfOptions; i++) {
            var _key = 0;
            
            if (numberOfOptions == 12) {
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
            
            if (typeof this.options[i] === 'undefined')
                _blob += this.createButton("", "&nbsp;", "&nbsp;", "", "", 1, 1, 0);
            else {
                _blob += this.createButton(this.options[i], _key);
            }
            if (numberOfOptions == 12) {
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
    static createButton($id, $title = "", $subTitle = "&nbsp;", $key = "", $hover = "", $disabled = 0, $invisible = 0, $secret = 0, $btnClass = "") {
        if (typeof $id == 'object') {
            $key = $title;
            $title = (typeof $id[1] === 'undefined' ? $title : $id[1]);
            $subTitle = (typeof $id[2] === 'undefined' || $id[2].length < 1) ? "&nbsp;" : $id[2];
            $hover = (typeof $id[3] === 'undefined' ? "" : $id[3]);
            $disabled = (typeof $id[4] === 'undefined' ? $disabled : $id[4]);
            $invisible = (typeof $id[5] === 'undefined' ? $invisible : $id[5]);
            $secret = (typeof $id[6] === 'undefined' ? $secret : $id[6]);
            $btnClass = (typeof $id[7] === 'undefined' ? $btnClass : $id[7]);
            $id = $id[0];
        }
        
        if ($id.length > 0 && !$id.endsWith(")"))
            $id = $id + "()";
        
        var _blob = "";
        _blob += '<div class="btn-group">';
            _blob += '<button class="btn ' + $btnClass + ' ' + ($invisible ? 'invisible' : '') + '" onClick="' + $id + '" title="' + $hover + '" style="' + ($secret ? "opacity:0.0;" : "") + '" ' + ($disabled === true ? "disabled=disabled" : "") + '>';
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
        });*/
        
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

/* Classes */
class Entity {
    constructor(_id = undefined, _name = undefined, _description = undefined, _owner = undefined, _actions = undefined, _room = undefined) {
        this.id = _id;
        this.name = _name;
        this.description = _description;
        
        this.owner = new Set();
        this.availableActions = new Set();
        
        this.addOwner(_owner);
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
    
    addItem(_item) {
        if (!(_item instanceof Item))
            _item = itemsIndexes.get(_item);
        
        this.items.add(_item);
        _item.moveToEntity(this);
    }
    removeItem(_item) {
        if (!(_item instanceof Item))
            _item = itemsIndexes.get(_item);
        
        this.items.delete(_item);
        _item.moveToEntity(undefined);
    }
    
    containsItem(_item) {
        if (!(_item instanceof Item))
            _item = itemsIndexes.get(_item);
        
        return this.items.has(_item);
    }
    hasItem(_item) {
        return this.containsItem(_item);
    }
    
    isOwner(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        
        if (_character instanceof Character)
            return this.owner.has(_character);
        else
            return false;
    }
    addOwner(_character) {
        if (typeof _character == 'undefined')
            return 1;
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
                return 1;
        }
        return 0;
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
    
    addAction(_actions) {
        if (typeof _actions == 'undefined')
            return 1;
        else if (_actions instanceof Array) {
            _actions.forEach(function(_action) {
                if (isNaN(_action) && ActionsNameIds.has(_action))
                    this.availableActions.add(ActionsNameIds.get(_action));
                else if (ActionsIdNames.has(_action))
                    this.availableActions.add(_action);
                else
                    return 2;
            }, this);
        }
        else if (ActionsNameIds.has(_actions))
            this.availableActions.add(ActionsNameIds.get(_actions));
        else if (ActionsIdNames.has(_actions))
            this.availableActions.add(_actions);
        return 0;
    }
    
    toString() {
        var _blob = "";
        if (typeof this.image !== 'undefined') {
            _blob += "<img class='text-center' style='border:0.1em solid white; background-color:white; border-radius:0.5em;' src='" + this.image + "' alt=''/><br/>";
        }
        _blob += "<div class='text-center'>" + this.name + "</div>";
        if (this.owner instanceof Set && this.owner.size > 0) {
            _blob += "Owned by ";
            
            var _owners = Array.from(this.owner);
            if (this.owner.size == 1)
                _blob += _owners[0].name;
            else {
                for (i = 0; i < _owners.length - 1; i++) {
                    _blob += _owners[i].name;
                    if (_owners.length > 2)
                        _blob += ", ";
                }
                _blob += " and " + _owners[_owners.length - 1].name + ".";
            }
        }
        
        if (typeof this.description != 'undefined')
            _blob += "<p>" + this.description + "</p>";
        else if (this instanceof Character) {
            _blob += "<p>" + this.age + " year old " + (this.gender ? "female" : "male") + " " + this.speciesName() + ".</p>";
        }
        
        return "<a data-toggle=\"tooltip\" data-placement=\"left\" data-html=\"true\" title=\"" + _blob.replace(/\"/g, '\\"') + "\">" + this.name + "</a>";
    }
}

class Disposition {
    /**
     * param int _eros, passion
     * param int _philia, friendship
     * param int _lodus, playfulness
     * param int _pragama, souldmate
     * param int _storge, familial
     * param int _manic, obsession
     */
    constructor(_eros = 0, _philia = 0, _lodus = 0, _pragma = 0, _storge = 0, _manic = 0) {
        if (debug) console.log("Creating a new instance of Disposition");
        this.set(_eros, _philia, _lodus, _pragma, _storge, _manic);
    }
    
    set(_eros = 0, _philia = 0, _lodus = 0, _pragma = 0, _storge = 0, _manic = 0) {
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
        
        this.set(this.eros + _eros, this.philia + _philia, this.lodus + _lodus, this.pragma + _pragma, this.storge + _storge, this.manic + _manic);
    }
    
    toString() {
        var _blob = "";
        _blob += ("Passion(" + this.eros + "), Friendship(" + this.philia + "), Playfulness(" + this.lodus + "), Soulmate(" + this.pragma + "), Familial(" + this.storge + "), Obsession(" + this.manic + ")");
        
        return _blob;
    }
}

class Character extends Entity {
    constructor(_id = "nickWilde", _name = "Wilde, Nicholas", _age = 33, _sex = 0, _species = "fox") {
        if (debug) console.log("Creating a new instance of Character with ID `{0}`".format(_id));
        
        super(_id, _name, undefined, undefined);
        this.surname = "";
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
        this.nickname = "";
        this.age = _age;
        this.appearance = "";
        this.image = "images/characters/avatar.svg"; // base64 image, or url
        
        this.addAction("talk");
        this.addAction("sex");
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
        
        this.defaultDisposition = new Disposition(0,0,0,0,0);
        this.agape = 50;         // self
        this.philautia = 50;     // others
        this.stamina = 100;
        this.staminMax = 100;
        this.lust = 25;
        this.rut = false;
        this.clean = 100;
        this.annoyed = 0;
        this.living = true;
        this.sleeping = false;
        
        this.setSex(_sex);
        this.gender = _sex;
        
        this.furColourA = undefined; // Body
        this.furColourAHex = undefined;
        this.furColourB = undefined; // Middle
        this.furColourBHex = undefined;
        
        // Handled by setSpecies
        this.predator = false;
        this.handType = 1;
        this.feetType = 1;
        this.relatives = new Set();
        this.eyeType = 0;
        this.eyeColour = undefined;
        this.furType = 0;
        this.furTrimmed = 50;
        this.furSoftness = 50;
        
        this.setSpecies(_species);
        
        this.hadSex = false;
        
        this.sexCount = 0;
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
        
        /*
            0 - none/flat
            1 - petite
            2 - average
            3 - large
        */
        this.breastSize = 0;
        
        /*
            0, 0 - none
            3, 2 - marty
            6, 4.5 - wolter
            9.5, 5 - remmy
            10, 6 - al
            12, 6 - rex
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
        
        this.following = undefined; // Character
        this.followers = new Set();
        
        this.furniture = undefined;
        
        this.clothingHead = undefined;
        this.clothingEyes = undefined;
        this.clothingLeftEar = undefined;
        this.clothingRightEar = undefined;
        this.clothingNose = undefined;
        this.clothingLips = undefined;
        this.clothingTongue = undefined;
        this.clothingNeck = undefined;
        this.clothingChest = undefined;
        this.clothingTorso = undefined;
        this.clothingWaist = undefined;
        this.clothingGroin = undefined;
        this.clothingLegs = undefined;
        this.clothingFeet = undefined;
        
        this.disposition = new Map();
        this.hadSexWith = new Set();
        
        this.prefersSpecies = new Set();
        this.avoidsSpecies = new Set();
        
        this.preferredSex = (this.sex == 1 ? 0 : 1); // boolean (undefined either 0 male, 1 female)
        this.avoidedSex = undefined; // "
        this.sexualOrientation = 0; // 0 straight, 1 gay, 2 bi
        
        this.preferredPenisSize = undefined; // int
        this.preferredPenisGirth = undefined; // int
        this.preferredBreastSize = undefined; // int
        this.preferredSexCount = undefined; // int
        
        this.prefersPredators = undefined;
        this.avoidsPredators = undefined;
        this.prefersPrey = undefined;
        this.avoidsPrey = undefined;
        
        this.exhibitionism = 0; // 0-100, preference for public sex
        this.somnophilia = 0; // 0-100, preference for sleep sex
        this.intoxicated = 0; // 0-100, drunkness
        this.incestual = 0; // 0-100, preference for incest
        
        this.previousRoom = undefined;
        this.room = undefined;
        this.cell = undefined;
        this.location = undefined;
        
        charactersIndexes.set(_id, this);
        
        this.stand();
        this.sleep();
    }
    
    setSex(_sex) {
        if (isNaN(_sex)) {
            switch (_sex.slice(0, 1)) {
                case "m" : {
                    this.sex = 0;
                }
                case "f" : {
                    this.sex = 1;
                }
                case "h" : {
                    this.sex = 2;
                }
            }
        }
        else if (_sex >= 0 && _sex < 4) {
            this.sex = Number.parseInt(_sex);
        }
        else
            this.sex = 0;
    }
    sexName() {
        return this.sex == 0 ? "male" : (this.sex == 1 ? "female" : "herm");
    }
    getSex() {
        return this.sexName();
    }
    
    
    setDisposition(_character, _eros = undefined, _philia = undefined, _lodus = undefined, _pragma = undefined, _storge = undefined, _manic = undefined) {
        if (debug) console.log("Running setDisposition");
        
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        
        if (!(_character instanceof Character)) {
            if (debug) console.log("\t_character `{0}` isn't valid".format(_character));
            return false;
        }
        
        if (_eros instanceof Disposition)
            this.disposition.set(_character, _eros);
        else if (this.disposition.has(_character)) {
            _eros = isNaN(_eros) ? this.disposition.get(_character).eros : _eros;
            _philia = isNaN(_philia) ? this.disposition.get(_character).philia : _philia;
            _lodus = isNaN(_lodus) ? this.disposition.get(_character).lodus : _lodus;
            _pragma = isNaN(_pragma) ? this.disposition.get(_character).pragma : _pragma;
            _storge = isNaN(_storge) ? this.disposition.get(_character).storge : _storge;
            _manic = isNaN(_manic) ? this.disposition.get(_character).manic : _manic;
            
            this.disposition.set(_character, this.disposition.get(_character).set(_eros, _philia, _lodus, _pragma, _storge, _manic));
        }
        else {
            _eros = isNaN(_eros) ? this.defaultDisposition.eros : _eros;
            _philia = isNaN(_philia) ? this.defaultDisposition.philia : _philia;
            _lodus = isNaN(_lodus) ? this.defaultDisposition.lodus : _lodus;
            _pragma = isNaN(_pragma) ? this.defaultDisposition.pragma : _pragma;
            _storge = isNaN(_storge) ? this.defaultDisposition.storge : _storge;
            _manic = isNaN(_manic) ? this.defaultDisposition.manic : _manic;
            
            this.disposition.set(_character, new Disposition(_eros, _philia, _lodus, _pragma, _storge, _manic));
        }
        
        return this.disposition.get(_character);
    }
    getDisposition(_character, _disposition = undefined) {
        if (debug) console.log("Running getDisposition");
        
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        
        if (!(_character instanceof Character)) {
            if (debug) console.log("\t_character `{0}` isn't valid".format(_character));
            return false;
        }
        
        if (this.disposition.has(_character)) {
            if (this.disposition.get(_character).hasOwnProperty(_disposition))
                return this.disposition.get(_character)[_disposition];
            else
                return this.disposition.get(_character);
        }
        else
            return false;
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
        return this.clothingHead instanceof Clothing;
    }
    
    hasShirt() {
        return this.clothingTorso instanceof Clothing;
    }
    
    hasBra() {
        return this.clothingChest instanceof Clothing;
    }
    
    hasBelt() {
        return this.clothingWaist instanceof Clothing;
    }
    
    hasUnderwear() {
        return this.clothingGroin instanceof Clothing;
    }
    
    hasPants() {
        return this.clothingLegs instanceof Clothing;
    }
    
    addCurrentAction(_actionType) {
        if (isNaN(_actionType)) {
            if (ActionsNameIds.has(_actionType))
                this.currentActions.add(ActionsNameIds.get(_actionType));
        }
        else {
            if (ActionsIdNames.has(_actionType))
                this.currentActions.add(_actionType);
        }
    }
    removeCurrentAction(_actionType) {
        if (isNaN(_actionType)) {
            if (ActionsNameIds.has(_actionType))
                this.currentActions.delete(ActionsNameIds.get(_actionType));
        }
        else {
            if (ActionsIdNames.has(_actionType))
                this.currentActions.delete(_actionType);
        }
    }
    hasCurrentAction(_actionType) {
        if (isNaN(_actionType)) {
            if (ActionsNameIds.has(_actionType))
                this.currentActions.has(ActionsNameIds.get(_actionType));
        }
        else {
            if (ActionsIdNames.has(_actionType))
                this.currentActions.has(_actionType);
        }
    }
    
    sit(_furniture = undefined) {
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.has(_furniture) ? furnitureIndexes.get(_furniture) : undefined;
        
        this.addCurrentAction("sit");
        this.removeCurrentAction("lay");
        this.removeCurrentAction("sleep");
        this.removeCurrentAction("stand");
        this.removeCurrentAction("walk");
        
        this.furniture = _furniture
        
        return _furniture;
    }
    lay(_furniture = undefined) {
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.has(_furniture) ? furnitureIndexes.get(_furniture) : undefined;
        
        this.addCurrentAction("lay");
        this.removeCurrentAction("sit");
        this.removeCurrentAction("sleep");
        this.removeCurrentAction("stand");
        this.removeCurrentAction("walk");
        
        this.furniture = _furniture
        
        return _furniture;
    }
    sleep(_furniture = undefined) {
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.has(_furniture) ? furnitureIndexes.get(_furniture) : undefined;
        
        this.addCurrentAction("sleep");
        this.removeCurrentAction("walk");
        
        this.furniture = _furniture
        
        return _furniture;
    }
    stand() {
        this.addCurrentAction("stand");
        this.removeCurrentAction("sit");
        this.removeCurrentAction("lay");
        this.removeCurrentAction("sleep");
        this.removeCurrentAction("walk");
        
        this.furniture = undefined;
    }
    walk() {
        this.addCurrentAction("walk");
        this.removeCurrentAction("sit");
        this.removeCurrentAction("lay");
        this.removeCurrentAction("sleep");
        this.removeCurrentAction("stand");
        
        this.furniture = undefined;
    }
    
    wear(_clothing) {
        this.putOn(_clothing);
    }
    wearing(_clothing) {
        if (!(_clothing instanceof Clothing))
            _clothing = itemsIndexes.get(_clothing);
        
        if (_clothing instanceof Clothing) {
            switch (_clothing.bodyPart) {
                case 0 : return this.clothingHead == _clothing; break;
                case 1 : return this.clothingEyes == _clothing; break;
                case 2 : return this.clothingLeftEar == _clothing; break;
                case 3 : return this.clothingRightEar == _clothing; break;
                case 4 : return this.clothingNose == _clothing; break;
                case 5 : return this.clothingLips == _clothing; break;
                case 6 : return this.clothingTongue == _clothing; break;
                case 7 : return this.clothingNeck == _clothing; break;
                case 8 : return this.clothingChest == _clothing; break;
                case 9 : return this.clothingTorso == _clothing; break;
                case 10 : return this.clothingWaist == _clothing; break;
                case 11 : return this.clothingGroin == _clothing; break;
                case 12 : return this.clothingLegs == _clothing; break;
                case 13 : return this.clothingFeet == _clothing; break;
            }
        }
    }
    putOn(_clothing) {
        if (!(_clothing instanceof Clothing))
            _clothing = itemsIndexes.get(_clothing);
        
        if (_clothing instanceof Clothing) {
            switch (_clothing.bodyPart) {
                case 0 : this.clothingHead = _clothing; break;
                case 1 : this.clothingEyes = _clothing; break;
                case 2 : this.clothingLeftEar = _clothing; break;
                case 3 : this.clothingRightEar = _clothing; break;
                case 4 : this.clothingNose = _clothing; break;
                case 5 : this.clothingLips = _clothing; break;
                case 6 : this.clothingTongue = _clothing; break;
                case 7 : this.clothingNeck = _clothing; break;
                case 8 : this.clothingChest = _clothing; break;
                case 9 : this.clothingTorso = _clothing; break;
                case 10 : this.clothingWaist = _clothing; break;
                case 11 : this.clothingGroin = _clothing; break;
                case 12 : this.clothingLegs = _clothing; break;
                case 13 : this.clothingFeet = _clothing; break;
            }
            
            this.items.add(_clothing);
        }
    }
    takeOff(_clothing) {
        if (!(_clothing instanceof Clothing))
            _clothing = itemsIndexes.get(_clothing);
        
        if (_clothing instanceof Clothing) {
            switch (_clothing.bodyPart) {
                case 0 : this.clothingHead = undefined; break;
                case 1 : this.clothingEyes = undefined; break;
                case 2 : this.clothingLeftEar = undefined; break;
                case 3 : this.clothingRightEar = undefined; break;
                case 4 : this.clothingNose = undefined; break;
                case 5 : this.clothingLips = undefined; break;
                case 6 : this.clothingTongue = undefined; break;
                case 7 : this.clothingNeck = undefined; break;
                case 8 : this.clothingChest = undefined; break;
                case 9 : this.clothingTorso = undefined; break;
                case 10 : this.clothingWaist = undefined; break;
                case 11 : this.clothingGroin = undefined; break;
                case 12 : this.clothingLegs = undefined; break;
                case 13 : this.clothingFeet = undefined; break;
            }
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
    grammaticalGender() {
        switch (this.species) {
            case 0 : {
                return this.gender == 0 ? "tod" : "vixen";
            }
            case 1 : {
                return this.gender == 0 ? "wolf" : "wolfen";
            }
            case 2 :
            case 3 : {
                return this.gender == 0 ? "brute" : "fae";
            }
            case 4 : {
                return this.gender == 0 ? "ram" : "ewe";
            }
            case 5 : {
                return this.gender == 0 ? "jack" : "jill";
            }
            case 6 :
            case 7 : 
            case 11 : {
                return this.gender == 0 ? "buck" : "doe";
            }
            case 8 : 
            case 9 : {
                return this.gender == 0 ? "dog" : "bitch";
            }
            case 10 : {
                return this.gender == 0 ? "tiger" : "tigress";
            }
            case 12 : {
                return this.gender == 0 ? "boar" : "sow";
            }
            case 13 : {
                return this.gender == 0 ? "stallion" : "mare";
            }
        }
    }
    
    setHand(_type) {
        if (isNaN(_type))
            this.handType = HandTypeNameIds.has(_type) ? HandTypeNameIds.get(_type) : 0;
        else if (HandTypeIdNames.has(_type))
            this.handType = _type;
        else
            this.handType = 0;
    }
    handName() {
        return HandTypeIdNames.get(this.handType);
    }
    
    setFeet(_type) {
        if (isNaN(_type))
            this.feetType = FeetTypeNameIds.has(_type) ? FeetTypeNameIds.get(_type) : 0;
        else if (FeetTypeIdNames.has(_type))
            this.feetType = _type;
        else
            this.feetType = 0;
    }
    feetName() {
        return FeetTypeIdNames.get(this.feetType);
    }
    
    setEyes(_type) {
        if (isNaN(_type))
            this.eyeType = EyeTypeNameIds.has(_type) ? EyeTypeNameIds.get(_type) : 0;
        else if (EyeTypeIdNames.has(_type))
            this.eyeType = _type;
        else
            this.eyeType = 0;
    }
    eyeName() {
        return EyeTypeIdNames.get(this.eyeType);
    }
    
    setFur(_type) {
        if (isNaN(_type))
            this.furType = FurTypeNameIds.has(_type) ? FurTypeNameIds.get(_type) : 0;
        else if (FurTypeIdNames.has(_type))
            this.furType = _type;
        else
            this.furType = 0;
    }
    furName() {
        return FurTypeIdNames.get(this.furType);
    }
    
    setSpecies(_species) {
        if (isNaN(_species))
            this.species = SpeciesNameIds.has(_species) ? SpeciesNameIds.get(_species) : 0;
        else if (SpeciesIdNames.has(_species))
            this.species = _species;
        else
            this.species = 0;
        
        switch (this.species) {
            case 0 : {// fox
                this.setEyes("slit");
            }
            case 1 : // wolf
            case 2 : // aardwolf
            case 3 : // heyna
            case 5 : // stoat
            case 8 : // jackal
            case 9 : // coyote
            case 10 : { // tiger
                this.predator = true;
                this.setFeet("pad");
                this.setHand("pad");
                this.setFur("fur");
                break;
            }
            case 4 : { // sheep
                this.predator = false;
                this.setFeet("clovenhoof");
                this.setHand("clovenhoof");
                this.setEyes("rectangle");
                this.setFur("wool");
                this.furSoftness = 75;
                break;
            }
            case 6 : // deer
            case 11 : { // antelope
                this.predator = false;
                this.setFeet("clovenhoof");
                this.setHand("clovenhoof");
                this.setEyes("rectangle");
                this.setFur("hair");
                break;
            }
            case 7 : { // rabbit
                this.predator = false;
                this.setFeet("fur");
                this.setHand("fur");
                this.setFur("fur");
                this.furSoftness =75;
                break;
            }
            case 12 : { // pig
                this.predator = false;
                this.setFeet("clovenhoof");
                this.setHand("clovenhoof");
                this.setEyes("circle");
                this.setFur("skin");
                break;
            }
            case 13 : { // horse
                this.predator = false;
                this.setFeet("hoof");
                this.setHand("hoof");
                this.setEyes("rectangle");
                this.setFur("hair");
                break;
            }
        }
    }
    speciesName() {
        return SpeciesIdNames.get(this.species);
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
    
    addSexWith(_character, _updateChild = false) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        
        if (_character instanceof Character) {
            this.hadSexWith.add(_character);
            this.hadSex = true;
            this.sexCount++;
            
            if (_updateChild)
                _character.addSexWith(this, false);
        }
    }
    
    addRelative(_character, _updateChild = false) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        
        if (_character instanceof Character) {
            this.relatives.add(_character);
            
            if (_updateChild)
                _character.addRelative(this, false);
        }
    }
    
    addPreferredSpecies(_species) {
        if (isNaN(_species))
            _species = SpeciesNameIds.has(_species) ? SpeciesNameIds.get(_species) : 0;
        else if (SpeciesIdNames.has(_species))
            _species = _species;
        else
            _species = 0;
        
        this.prefersSpecies.add(_species);
    }
    likesSpecies(_species) {
        this.addprefersSpecies(_species);
    }
    
    addAvoidedSpecies(_species) {
        if (isNaN(_species))
            _species = SpeciesNameIds.has(_species) ? SpeciesNameIds.get(_species) : 0;
        else if (SpeciesIdNames.has(_species))
            _species = _species;
        else
            _species = 0;
        
        this.avoidsSpecies.add(_species);
    }
    dislikesSpecies(_species) {
        this.addavoidsSpecies(_species);
    }
    
    addNewCharacterDispositionFor(_character, erosOffset = 0, philiaOffset = 0, lodusOffset = 0, pragmaOffset = 0, storgeOffset = 0, manicOffset = 0) {
        if (this.prefersSpecies.has(_character.species)) {
            if (this.prefersSex == _character.sex) {
                if (this.sexualOrientation == 0 && _character.sex != this.sex || this.sexualOrientation == 1 && _character.sex == this.sex || this.sexualOrientation == 2) {
                    if (this.agape > 74) {
                        if (this.philautia > 74)
                            erosOffset += 3;
                        else if (this.philautia > 49)
                            erosOffset += 2;
                        else {
                            erosOffset++;
                            manicOffset++;
                        }
                        erosOffset++;
                    }
                    else {
                        if (this.philautia > 74)
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
                if (this.agape > 74)
                    manicOffset++;
                
                if (this.philautia > 74)
                    storgeOffset += 3;
                else if (this.philautia > 49)
                    storgeOffset += 2;
                
                storgeOffset++;
            }
            
            if (this.agape > 74 && this.philautia > 50) {
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
                    if (this.agape > 74) {
                        if (this.philautia > 74)
                            erosOffset += 2;
                    }
                    else {
                        if (this.philautia > 74)
                            erosOffset++;
                    }
                    
                    if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                        erosOffset++;
                        manicOffset++;
                    }
                }
            }
            
            if (this.age >= _character.age + (this.age/10)) {
                if (this.agape > 74) {
                    if (this.philautia > 74)
                        storgeOffset++;
                }
                else {
                    if (this.philautia > 74)
                        storgeOffset++;
                }
                storgeOffset++;
            }
            
            if (this.agape > 74 && this.philautia > 50) {
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
                    if (this.agape > 74) {
                        if (this.philautia > 74)
                            erosOffset += 2;
                        else if (this.philautia > 49)
                            erosOffset++;
                        else
                            manicOffset++;
                        
                        erosOffset++;
                    }
                    else {
                        if (this.philautia > 74)
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
        
        this.disposition.set(
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
    
    willFuck(_character) {
        if (debug) console.log("Calculating chance for {0} to fuck {1}.".format(this.name, _character.name));
        
        var chance = 0;
        
        // Past Relations
        if (this.hadSexWith.has(_character))
            chance += 3;
        
        if (debug) console.log("\tAfter past relations check: " + Math.ceil(chance));
        
        // Disposition
        chance += this.disposition.get(_character).eros / 3;
        chance += this.disposition.get(_character).manic / 2;
        
        if (debug) console.log("\tAfter disposition check: " + Math.ceil(chance));
        
        // Species Preferences
        if (this.prefersSpecies.has(_character.species))
            chance += 5
        else if (this.avoidsSpecies.has(_character.species))
            chance -= 5;
        
        if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true)
            chance += 5;
        
        if (this.avoidsPrey && _character.predator == false || this.avoidsPredators && _character.predator == true)
            chance -= 5;
        
        if (debug) console.log("\tAfter species preference check: " + Math.ceil(chance));
        
        // Sexual Orientation
        if (this.sexualOrientation == 0 && _character.sex != this.sex || this.sexualOrientation == 1 && _character.sex == this.sex || this.sexualOrientation == 2)
            chance += 10;
        else
            chance -= 50;
        
        if (debug) console.log("\tAfter sexual preference check: " + Math.ceil(chance));
        
        // Rut and Lust
        if (this.rut && this.lust > 98)
            chance += 100;
        else if (this.lust > 79)
            chance += (this.rut ? this.lust*2.5 : this.lust*1.5);
        else if (this.lust > 59)
            chance += (this.rut ? this.lust : this.lust/1.5);
        else if (this.lust > 39)
            chance += (this.rut ? this.lust/1.5 : this.lust/3);
        else if (this.lust > 19)
            chance += (this.rut ? this.lust/3 : this.lust/4);
        else
            chance += (this.rut ? this.lust/4 : this.lust/5);
        
        if (debug) console.log("\tAfter rut and lust check: " + Math.ceil(chance));
        
        // Exhibitionism
        if (player.room.characters.size > 2){
            if (this.exhibitionism > 0)
                chance += ((this.exhibitionism / 5) * (player.room.characters.size - 2));
            else {
                _character.room.characters.forEach(function(__character) {
                    if (__character != this._character && __character != player)
                        chance += this.hadSexWith.has(__character) ? 5 : -5;
                }, this);
            }
        }
        
        if (debug) console.log("\tAfter Exhibitionism check: " + Math.ceil(chance));
        
        // Incest
        if (this.relatives.has(_character)) {
            if (this.incestual > 0)
                chance += this.incestual/4;
            else
                chance -= 50;
        }
        
        if (debug) console.log("\tAfter incest check: " + Math.ceil(chance));
        
        // Intoxication
        chance += this.intoxicated/2.5;
        
        if (debug) console.log("\tAfter intoxication check: " + Math.ceil(chance));
        
        // Somnophilia
        if (this.sleeping) {
            if (enableRape)
                chance = 100;
            else if (this.somnophilia > 50 && this.hadSexWith.has(_character) && this.disposition.get(_character).eros > 75)
                chance += 10;
        }
        
        if (debug) console.log("\tAfter Somnophilia check: " + Math.ceil(chance));
        
        if (debug) console.log("\tChecking if {0} is greater than 50: {1}".format(Math.ceil(chance), Math.ceil(chance) >= 50));
        return (Math.ceil(chance) >= 50);
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

class Location {
    constructor(_id = undefined, _name = undefined) {
        this.id = _id;
        this.name = _name;
        this.cells = new Set();
        this.rooms = new Set();
        this.owner = new Set();
        
        this.floorImage = undefined;
        
        locationsIndexes.set(_id, this);
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
    
    isOwner(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        if (_character instanceof Character)
            return this.owner.has(_character);
        return false;
    }
    addOwner(_character) {
        if (typeof _character == 'undefined')
            return 1;
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
                return 1;
        }
        return 0;
    }
    setOwner(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        if (_character instanceof Character)
            this.owner.add(_character);
    }
    getOwner(_index) {
        if (isNaN(_index) || _index < 0 || _index > this.owner.size)
            _index = 0;
        return Array.from(this.owner)[_index];
    }
    clearOwner() {
        this.owner.clear();
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
class Cell {
    constructor(_id = undefined, _name = undefined, _location = undefined) {
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
class Room extends Entity {
    /**
     * Creates a new room
     *
     * param string _id, ID
     * param string _sid, Super ID
     * param string _name, Display name
     * param int _type Integer representing the type of room; review RoomTypeIdNames in GameVariables.js
     * param Cell _cell, Cell
     * param Location _location, Sub location
     *
     */
    constructor(_id = undefinend, _sid = undefined, _name = undefined, _type = 0, _cell = undefined, _location = undefined) {
        super(_id, _name, "", _location);
        
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
        
        roomsIndexes.set(_id, this);
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
        if (isNaN(_type))
            this.type = RoomTypeNameIds.has(_type) ? RoomTypeNameIds.get(_type) : 0;
        else if (RoomTypeIdNames.has(_type))
            this.type = _type;
        else
            this.type = 0;
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
    
    lock(_room) {
        if (_room instanceof Room)
            _room = map_flip(this.attachedRooms).has(_room) ? _room : undefined;
        else if (_room >= 0 && _room < 7)
            _room = this.attachedRooms.has(_room) ? this.attachedRooms.get(_room) : undefined;
        
        if (typeof _room == 'undefined')
            return;
        
        var _options = _room.roomsOptions.get(this);
        _options['isLocked'] = true;
        _room.roomsOptions.set(this, _options);
    }
    unlock(_room) {
        if (_room instanceof Room)
            _room = map_flip(this.attachedRooms).has(_room) ? _room : undefined;
        else if (_room >= 0 && _room < 7)
            _room = this.attachedRooms.has(_room) ? this.attachedRooms.get(_room) : undefined;
        
        if (typeof _room == 'undefined')
            return;
        
        var _options = _room.roomsOptions.get(this);
        _options['isLocked'] = false;
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
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.get(_furniture);
        
        _furniture.room = this;
        this.furniture.add(_furniture);
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
        if (isNaN(_type)) {
            if (FurnitureTypeNameIds.has(_type))
                _type = FurnitureTypeNameIds.get(_type);
            else
                return false;
        }
        else if (!FurnitureTypeIdNames.has(_type))
            return false;
        
        this.furniture.forEach(function(_furniture) {
            if (_furniture.type == this._type) {
                return true;
            }
        }, this);
    }
    
    /**
     * Returns the first available instance of Furniture in the room that can fit the character. References their species against SpeciesSizeUnits.
     * @param Character _character The character to be referenced against
     * @param boolean _considerCharacterPreferences Considers a character's preferences for resting on furniture instead of choosing the first one available
     * @param boolean _lay If true, the results of SpeciesSizeUnits are multiplied by two, as the Character would be taking up double the space.
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
            
            // Filter _furnitureTypePreferences for valid values; can be a number, a string, or array of numbers-and-or-string of furniture types
            /*if (typeof _furnitureTypePreferences == 'number') {
                if (FurnitureTypeIdNames.has(_furnitureTypePreferences))
                    _furnitureTypePreferences = [_furnitureTypePreferences];
                else
                    _furnitureTypePreferences = [];
            }
            else if (_furnitureTypePreferences instanceof Array || _furnitureTypePreferences instanceof Set) {
                var _furnitureTypes = [];
                _furnitureTypePreferences.forEach(function(_type) {
                    if (isNaN(_type) && FurnitureTypeNameIds.has(_type))
                            _furnitureTypes.push(FurnitureTypeNameIds.get(_type));
                    else if (FurnitureTypeIdNames.has(_type))
                        _furnitureTypes.push(_type);
                });
                _furnitureTypePreferences = _furnitureTypes;
            }
            else if (isNaN(_furnitureTypePreferences)) {
                if (FurnitureTypeNameIds.has(_furnitureTypePreferences))
                    _furnitureTypePreferences = [FurnitureTypeNameIds.get(_furnitureTypePreferences)];
                else
                    _furnitureTypePreferences = [];
            }*/
            
            if (_considerCharacterPreferences && typeof _character.preferredSeatType != 'undefined') {
                var _seats = [];
            
                this.furniture.forEach(function(_furniture) {
                    if (_furniture.availableSeatingSpace() >= (SpeciesSizeUnits.get(_character.species) * _requiredSpaceMultiplier))
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
                    if (_furniture.availableSeatingSpace() >= (SpeciesSizeUnits.get(_character.species) * _requiredSpaceMultiplier)) {
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
                    });
                }
            });
        }
    }
    
    typeName() {
        return RoomTypeIdNames.get(this.type);
    }
    
    isLocked(_direction = undefined) {
        if (_direction instanceof Room) {
            if (map_flip(this.attachedRooms).has(_direction)) {
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
                if (map_flip(this.attachedRooms).has(_direction)) {
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

class Item extends Entity {
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _plural = false) {
        super(_id, _name, _description);
        
        this.addAction("use");
        this.addAction("put");
        this.addAction("take");
        this.addAction("hold");
        this.addAction("attack");
        this.addAction("sex");
        
        if (typeof _image == 'undefined')
            _image = "images/items/genericItem.svg";
        this.image = _image;
        
        this.plural = _plural;
        
        itemsIndexes.set(_id, this);
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
class Key extends Item {
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined) {
        super(_id, _name, _description, _image);
        
        keysIndexes.set(_id, this);
    }
}
class Clothing extends Item {
    constructor(_id = undefined, _name = undefined, _description = undefined, _bodyPart = undefined, _image = undefined, _plural = false) {
        super(_id, _name, _description, _image, _plural);
        
        this.addAction("wear");
        this.addAction("remove");
        
        if (isNaN(_bodyPart))
            _bodyPart = BodyPartNameIds.get(_bodyPart);
        this.bodyPart = _bodyPart;
        
        clothingIndexes.set(_id, this);
    }
}

class Furniture extends Entity {
    constructor(_id = undefined, _name = undefined, _description = undefined, _type = 0, _seatingSpace = 1, _storageSpace = 1) {
        super(_id, _name, _description, undefined);
        
        if (isNaN(_type)) {
            if (FurnitureTypeNameIds.has(_type))
                this.type = FurnitureTypeNameIds.get(_type);
            else
                this.type = 0;
        }
        else {
            if (FurnitureTypeIdNames.has(_type))
                this.type = _type;
            else
                this.type = 0;
        }
        
        this.addAction("use");
        this.addAction("sit");
        this.addAction("lay");
        this.addAction("sleep");
        this.addAction("look");
        this.addAction("sex");
        
        this.seatingSpace = _seatingSpace;
        this.storageSpace = _storageSpace;
        this.characters = new Set(); // <Character, Action>
        
        furnitureIndexes.set(_id, this);
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
            
            _charactersSeatingSpaceTotal -= SpeciesSizeUnits.get(_character.species) * _baseMultiplier;
        }, this);
        
        return _charactersSeatingSpaceTotal;
    }
}
class Cron {
    constructor(minutes = undefined, hours = undefined, dom = undefined, month = undefined, dow = undefined, year = undefined) {
        if (typeof minutes == 'undefined' || !Number.isInteger(minutes))
            this.minutes = undefined;
        else if (minutes < 0 || minutes > 59)
            this.minutes = undefined;
        else
            this.minutes = minutes;
        
        if (typeof hours == 'undefined' || !Number.isInteger(hours))
            this.hours = undefined;
        else if (hours < 0 || hours > 23)
            this.hours = undefined;
        else {
            this.hours = hours;
            
            if (typeof this.minutes == 'undefined')
                this.minutes = 0;
        }
        
        if (typeof dom == 'undefined' || !Number.isInteger(dom))
            this.dom = undefined;
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
                default : this.month = undefined;
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
            switch (dow.toUpperCase()) {
                case "SUN" : this.dow = 0; break;
                case "MON" : this.dow = 1; break;
                case "TEU" : this.dow = 2; break;
                case "WED" : this.dow = 3; break;
                case "THU" : this.dow = 4; break;
                case "FRU" : this.dow = 5; break;
                case "SAT" : this.dow = 6; break;
                default : this.dow = undefined;
            }
        }
        else if (dow < 0 || dow > 7)
            this.dow = undefined;
        else {
            if (dow == 7)
                dow = 0;
            
            this.dow = dow;
            
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
class GameEvent {
    constructor(_id, _action = undefined, _characterA = undefined, _characterB = undefined, _item = undefined, _location = undefined, _cell = undefined, _room = undefined, _cron = undefined, _nextFunction = undefined, _runOnce = true) {
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
    
    execute() {
        if (eventsExecutedThisTick.has(this))
            return;
        
        if (debug) console.log("Executing " + this.id);
        
        var fn = new Function(this.nextFunction);
        try {fn();}catch (err) {}
        
        if (this.runOnce) {
            this.delete();
        }
        
        eventsExecutedThisTick.add(this);
    }
    
    delete() {
        eventsIndexes.delete(this.id);
    }
}