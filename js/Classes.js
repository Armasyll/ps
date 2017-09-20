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
    constructor() {
        var options = [];
        var isExploring = false;
    }
    static options() {
        return Menu.options;
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
        
        while (i <= this.options.length && i < 12 && _runCond) {
            if (!(Menu.isExploring && (i == 4 || i == 5 || i == 6 || i == 8 || i == 9 || i == 10))) {
                if (typeof this.options[i] === 'undefined') {
                    if ($id.length > 0 && !$id.endsWith(")"))
                        $id = $id + "()";
                    
                    this.options[i] = [$id, $title, $subTitle, $hover, $disabled, $invisible, $secret];
                    _runCond = 0;
                }
            }
            
            i++;
        }
    }
    static setExplorationOptions(northRoom = undefined, eastRoom = undefined, southRoom = undefined, westRoom = undefined, downRoom = undefined, upRoom = undefined) {
        Menu.isExploring = true;
        var _metaName = "";
        if (downRoom instanceof Room) {
            if (player.room.cell.location != downRoom.cell.location)
                _metaName = downRoom.cell.location.name;
            else if (player.room.location === downRoom.location || typeof downRoom.location === 'undefined') 
                _metaName = downRoom.name;
            else
                _metaName = downRoom.location.name;
            this.options[4] = ["roomInteract(" + downRoom.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>Down", _metaName, undefined, undefined, undefined, undefined, "btn-info"];
        }
        if (northRoom instanceof Room) {
            if (player.room.cell.location != northRoom.cell.location)
                _metaName = northRoom.cell.location.name;
            else if (player.room.location === northRoom.location || typeof northRoom.location === 'undefined') 
                _metaName = northRoom.name;
            else
                _metaName = northRoom.location.name;
            this.options[5] = ["roomInteract(" + northRoom.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>North", _metaName, undefined, undefined, undefined, undefined, "btn-info"];
        }
        if (upRoom instanceof Room) {
            if (player.room.cell.location != upRoom.cell.location)
                _metaName = upRoom.cell.location.name;
            else if (player.room.location === upRoom.location || typeof upRoom.location === 'undefined') 
                _metaName = upRoom.name;
            else
                _metaName = upRoom.location.name;
            this.options[6] = ["roomInteract(" + upRoom.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>Up", _metaName, undefined, undefined, undefined, undefined, "btn-info"];
        }
        if (westRoom instanceof Room) {
            if (player.room.cell.location != westRoom.cell.location)
                _metaName = westRoom.cell.location.name;
            else if (player.room.location === westRoom.location || typeof westRoom.location === 'undefined') 
                _metaName = westRoom.name;
            else
                _metaName = westRoom.location.name;
            this.options[8] = ["roomInteract(" + westRoom.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>West", _metaName, undefined, undefined, undefined, undefined, "btn-info"];
        }
        if (southRoom instanceof Room) {
            if (player.room.cell.location != southRoom.cell.location)
                _metaName = southRoom.cell.location.name;
            else if (player.room.location === southRoom.location || typeof southRoom.location === 'undefined') 
                _metaName = southRoom.name;
            else
                _metaName = southRoom.location.name;
            this.options[9] = ["roomInteract(" + southRoom.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>South", _metaName, undefined, undefined, undefined, undefined, "btn-info"];
        }
        if (eastRoom instanceof Room) {
            if (player.room.cell.location != eastRoom.cell.location)
                _metaName = eastRoom.cell.location.name;
            else if (player.room.location === eastRoom.location || typeof eastRoom.location === 'undefined') 
                _metaName = eastRoom.name;
            else
                _metaName = eastRoom.location.name;
            this.options[10] = ["roomInteract(" + eastRoom.id + ", true)", "<span class='hidden-md hidden-sm hidden-xs'>Move </span>East", _metaName, undefined, undefined, undefined, undefined, "btn-info"];
        }
    }
    static generate() {
        if (Menu.isExploring)
            this.setExplorationOptions();
        document.getElementById("choiceContainerBottom").innerHTML = "";
        var _blob = "";
        _blob += '<div class="btn-group btn-group-justified">';
        for (var i = 0; i < 12; i++) {
            var _key = 0;
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
            if (typeof this.options[i] === 'undefined')
                _blob += this.createButton("", "&nbsp;", "&nbsp;", "", "", 1, 1, 0);
            else {
                _blob += this.createButton(this.options[i], _key);
            }
            if (i == 3 || i == 7) {
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
    static initializeMap() {
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
            this.initializeMap();
        
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
        
        if (_room.location.owner.size > 0) {
            var _owner = _room.location.getOwner(0);
            if (typeof _owner.furColourAHex != 'undefined')
                _wallColour = _owner.furColourAHex;
        }
        
        _room.characters.forEach(function(_character) {
            _characterPortraitLinks.push(_character.image);
        });
        
        _room.items.forEach(function(_item) {
            _itemPortraitLinks.push(_item.image);
        });
        
        if (typeof _room.floorImage != 'undefined') {
            this.canvas.drawImage(_room.floorImage, originalX, originalY, this.baseSize, this.baseSize);
        }
        
        if (typeof _room.rugImage != 'undefined') {
            this.canvas.drawImage(_room.rugImage, originalX, originalY, this.baseSize, this.baseSize);
        }
        
        if (currentRoom) {
            this.canvas.beginPath();
            this.canvas.rect(originalX + 4, originalY + 4, this.baseSize - 8, this.baseSize - 8);
            this.canvas.setLineDash([2, 15]);
            this.canvas.strokeStyle = (typeof player.furColourAHex != 'undefined' ? player.furColourAHex : (player.hasFurColouration ? player.furColourA : "rgba(255, 255, 0, 0.5)"));
            this.canvas.stroke();
            
            this.canvas.strokeStyle = "rgb(0, 0, 0)";
            this.canvas.setLineDash([]);
        }
        
        if (_characterPortraitLinks.length > 0) {
            for (var i = 0; i < _characterPortraitLinks.length; i++) {
                var characterPortraitLink = new Image();
                characterPortraitLink.src = _characterPortraitLinks[i];
                characterPortraitLink.i = i;
                characterPortraitLink.canvas = this.canvas;
                characterPortraitLink.originalX = originalX;
                characterPortraitLink.originalY = originalY;
                characterPortraitLink.baseSize = this.baseSize;
                characterPortraitLink.onload = function() {
                    switch (this.i) {
                        case 0 : {this.canvas.drawImage(this, this.originalX + this.baseSize/2, this.originalY + 6, this.baseSize/3, this.baseSize/3); break;}
                        case 1 : {this.canvas.drawImage(this, this.originalX + this.baseSize/2 + 18, this.originalY + 12, this.baseSize/3, this.baseSize/3); break;}
                        case 2 : {this.canvas.drawImage(this, this.originalX + this.baseSize/2, this.originalY + 30, this.baseSize/3, this.baseSize/3); break};
                        case 3 : {this.canvas.drawImage(this, this.originalX + this.baseSize/2 + 18, this.originalY + 42, this.baseSize/3, this.baseSize/3); break};
                        case 4 : this.canvas.drawImage(this, this.originalX + this.baseSize/2, this.originalY + 6, this.baseSize/3, this.baseSize/3); break;
                        case 5 : this.canvas.drawImage(this, this.originalX + this.baseSize/2, this.originalY + 6, this.baseSize/3, this.baseSize/3); break;
                    }
                };
            }
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
        
        /*if (_room.attachedRooms.has(5) || _room.attachedRooms.has(4)) {
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
        }*/
        if (_room.attachedRooms.has(5) && _room.attachedRooms.has(4)) {
            if (_room.floorImage == woodenFloor01 || _room.floorImage == woodenFloorDark01 || _room.floorImage == stoneFloor01)
                this.canvas.drawImage(woodenStairsUpLeft01, originalX, originalY, this.baseSize, this.baseSize);
            if (_room.floorImage == woodenFloor01 || _room.floorImage == woodenFloorDark01 || _room.floorImage == stoneFloor01)
                this.canvas.drawImage(woodenStairsDownRight01, originalX, originalY, this.baseSize, this.baseSize);
        }
        else {
            if (_room.attachedRooms.has(5)) {
                if (_room.floorImage == woodenFloor01 || _room.floorImage == woodenFloorDark01 || _room.floorImage == stoneFloor01)
                    this.canvas.drawImage(woodenStairsUpRight01, originalX, originalY, this.baseSize, this.baseSize);
            }
            if (_room.attachedRooms.has(4)) {
                if (_room.floorImage == woodenFloor01 || _room.floorImage == woodenFloorDark01 || _room.floorImage == stoneFloor01)
                    this.canvas.drawImage(woodenStairsDownLeft01, originalX, originalY, this.baseSize, this.baseSize);
            }
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
        this.set(_eros, _philia, _lodus, _pragma, _storge, _manic);
    }
    
    set(_eros = 0, _philia = 0, _lodus = 0, _pragma = 0, _storge = 0, _manic = 0) {
        _eros = isNaN(_eros) ? 0 : _eros
        _philia = isNaN(_philia) ? 0 : _philia
        _lodus = isNaN(_lodus) ? 0 : _lodus
        _pragma = isNaN(_pragma) ? 0 : _pragma
        _storge = isNaN(_storge) ? 0 : _storge
        _manic = isNaN(_manic) ? 0 : _manic
        
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
        super(_id, _name, undefined, undefined);
        this.id = _id;
        this.name = _name;
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
        
        this.currentActions = undefined;
        
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
        this.predator = false;
        this.hooved = false;
        /*
            sex is an int
                0 - male
                1 - female
        */
        this.sex = _sex;
        /*
            gender is an int
                0 - male
                1 - female
        */
        this.gender = _sex;
        this.setSpecies(_species);
        
        /*
            0 - circular
            1 - slitted
            2 - sea-monster
        */
        this.eyeType = 0;
        this.eyeColour = undefined;
        
        this.furColourA = undefined;
        this.furColourB = undefined;
        /*
            0 - none
            1 - short
            2 - long
            3 - wool
        */
        this.furType = 0;
        /*
            0 - none
            1 - spotted
            2 - striped
            3
        */
        this.furPattern = 0;
        this.isFurTrimmed = 0;
        this.isFurSoft = 0;
        this.isFurThick = 0;
        
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
        
        this.previousRoom = undefined;
        
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
        
        this.exhibitionism = 0;
        this.willExhibit = undefined;
        this.somnophilia = 0;
        this.intoxicated = 0;
        this.incestual = 0;
        
        this.room = undefined;
        this.cell = undefined;
        this.location = undefined;
        
        charactersIndexes.set(_id, this);
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
            if (_clothing.container instanceof Character) {
                _clothing.container.takeOff(_clothing);
            }
            
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
            _clothing.container = this;
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
            if (this.containsItem(_room.sid + "Key") || this.containsItem(_room.location.id + "Key") || this.containsItem(_room.cell.location.id + "SkeletonKey") || this.containsItem("masterKey"))
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
            case 7 : {
                return this.gender == 0 ? "buck" : "doe";
            }
            case 8 : 
            case 9 : {
                return this.gender == 0 ? "dog" : "bitch";
            }
            case 10 : {
                return this.gender == 0 ? "tiger" : "tigress";
            }
        }
    }
    
    setSpecies(_species) {
        if (isNaN(_species))
            this.species = SpeciesNameIds.has(_species) ? SpeciesNameIds.get(_species) : 0;
        else if (SpeciesIdNames.has(_species))
            this.species = _species;
        else
            this.species = 0;
        
        switch (this.species) {
            case 0 : 
            case 1 : 
            case 2 : 
            case 3 : 
            case 5 : 
            case 8 : 
            case 9 : 
            case 10 : {
                this.predator = true;
                this.hoovedHands = false;
                this.paddedHands = false;
            }
            case 4 : 
            case 6 : {
                this.predator = false;
                this.hoovedHands = true;
                this.paddedHands = false;
            }
            case 7 : {
                this.predator = false;
                this.hoovedHands = false;
                this.paddedHands = true;
            }
        }
    }
    speciesName() {
        return SpeciesIdNames.get(this.species);
    }
    
    getFollowing() {
        return this.following;
    }
    setFollowing(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        
        if (_character instanceof Character)
            this.following = _character;
    }
    clearFollowing() {
        if (this.following instanceof Character)
            this.following.removeFollower(this);
        
        this.following = undefined;
    }
    follow(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        
        if (_character instanceof Character) {
            if (this.followers.has(_character))
                Content.add(this.name + " cannot follow someone following them.");
            else {
                if (this.following instanceof Character)
                    this.following.removeFollower(this);
                
                this.setFollowing(_character);
                _character.addFollower(this);
            }
        }
    }
    isFollowing(_character = undefined) {
        if (typeof _character == 'undefined')
            return this.following instanceof Character;
        else if (!(_character instanceof Character)) {
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
            if (!(_character instanceof Character))
                return false;
            else
                return this.following == _character;
        }
    }
    
    getFollowers() {
        return this.followers;
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
    lead(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        
        if (_character instanceof Character) {
            this.clearFollowing();
            
            _character.setFollowing(this);
            
            if (_character.hasFollowers && _character.followers.length > 0) {
                for (i = 0; i < _character.followers.length; i++) {
                    _character.followers[i].follow(this);
                }
                _character.clearFollowers();
            }
        }
    }
    hasFollowers() {
        return this.followers.length > 0;
    }
    
    addSexWith(_character) {
        if (!(_character instanceof Character))
            _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
        
        if (_character instanceof Character) {
            this.hadSexWith.add(_character);
            this.hadSex = true;
            this.sexCount++;
            
            _character.hadSexWith.add(this);
            _character.hadSex = true;
            _character.sexCount++;
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
        var chance = 0;
        
        // Past Relations
        if (this.hadSexWith.has(_character))
            chance += 3;
        
        // Disposition
        chance += this.disposition.get(_character).eros / 5;
        chance += this.disposition.get(_character).manic / 2;
        
        // Species Preferences
        if (this.prefersSpecies.has(_character.species))
            chance += 5
        else if (this.avoidsSpecies.has(_character.species))
            chance -= 5;
        
        if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true)
            chance += 5;
        
        if (this.avoidsPrey && _character.predator == false || this.avoidsPredators && _character.predator == true)
            chance -= 5;
        
        // Sexual Orientation
        if (this.sexualOrientation == 0 && _character.sex != this.sex || this.sexualOrientation == 1 && _character.sex == this.sex || this.sexualOrientation == 2)
            chance += 10;
        else
            chance -= 50;
        
        // Rut and Lust
        if (this.lust > 25)
            chance += (this.rut ? this.lust/2 : this.lust/4);
        else
            chance += (this.rut ? this.lust/3 : this.lust/5);
        
        // Exhibitionism
        if (player.room.characters.size > 2){
            if (this.willExhibit == true)
                chance += (this.exhibitionism / 10 + (player.room.characters.size - 2) * 4);
            else if (this.willExhibit == false) {
                _character.room.characters.forEach(function(__character) {
                    if (__character != this._character && __character != player)
                        chance += this.hadSexWith(__character) ? 5 : -5;
                }, this);
            }
        }
        
        // Incest
        if (this.relatives.has(_character) && this.incestual > 50)
            chance += 10;
        else
            chance -= 50;
        
        // Intoxication
        if (this.intoxicated > 50) {
            if (enableRape)
                chance += 40;
            else
                chance += 20;
        }
        
        // Somnophilia
        if (this.sleeping) {
            if (enableRape)
                chance = 100;
            else if (this.somnophilia > 50 && this.hadSexWith(_character) && this.disposition.get(_character).eros > 75)
                chance += 10;
        }
        
        return (chance >= 50);
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
        
        if (this.hasFollowers) {
            this.followers.forEach(function(follower) {
                follower.moveToRoom(_room);
            });
        }
        
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
     * param string _id
     * param string _name
     * param Room _location
     * param int _type Integer representing the type of room; 0 - hallway, lobby, bedroom, livingroom, bathroom, kitchen, diningroom, closet, 8 - basement
     *
     */
    constructor(_id = undefinend, _name = undefined, _type = 0, _cell = undefined, _location = undefined) {
        super(_id, _name, "", _location);
        
        /*
            Super ID; to be modified when there's conjoined Rooms that make up a single 'Room' and I don't want to create character interactions for each part.
        */
        this.sid = _id;
        
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
        
        this.floorImage = undefined;
        
        roomsIndexes.set(_id, this);
    }
    
    setLocation(_location) {
        if (!(_location instanceof Location))
            _location = locationsIndexes.has(_location) ? locationsIndexes.get(_location) : undefined;
        
        if (typeof _location == 'undefined' && this.cell instanceof Cell && this.cell.location instanceof Location)
            _location = this.cell.location
        
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
        return this.characters.size > 1;
    }
    hasCharacters() {
        return this.containsCharacters();
    }
    
    setAttachedRoom(_direction, _room, _options = {}, updateChild = false) {
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
        
        if (updateChild) {
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
    setNorthRoom(room, _options = undefined, updateChild = true) {
        this.setAttachedRoom(0, room, _options, updateChild);
    }
    setEastRoom(room, _options = undefined, updateChild = true) {
        this.setAttachedRoom(1, room, _options, updateChild);
    }
    setSouthRoom(room, _options = undefined, updateChild = true) {
        this.setAttachedRoom(2, room, _options, updateChild);
    }
    setWestRoom(room, _options = undefined, updateChild = true) {
        this.setAttachedRoom(3, room, _options, updateChild);
    }
    setDownRoom(room, _options = undefined, updateChild = true) {
        this.setAttachedRoom(4, room, _options, updateChild);
    }
    setUpRoom(room, _options = undefined, updateChild = true) {
        this.setAttachedRoom(5, room, _options, updateChild);
    }
    unsetAttachedRoom(direction, updateChild = true, unsetRoom = 0) {
        switch(direction) {
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
        
        if (updateChild) {
            var inversedDirection = 4;
            
            switch (direction) {
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
            
            if (inversedDirection < 6)
                this.attachedRooms.get(direction).unsetAttachedRoom(inversedDirection);
            
        }
        
        this.attachedRooms.delete(direction);
        if (unsetRoom)
            this.unsetRoom(room);
    }
    unsetNorthRoom(updateChild = true) {
        this.unsetAttachedRoom(0, updateChild);
    }
    unsetEastRoom(updateChild = true) {
        this.unsetAttachedRoom(1, updateChild);
    }
    unsetSouthRoom(updateChild = true) {
        this.unsetAttachedRoom(2, updateChild);
    }
    unsetWestRoom(updateChild = true) {
        this.unsetAttachedRoom(3, updateChild);
    }
    unsetDownRoom(updateChild = true) {
        this.unsetAttachedRoom(4, updateChild);
    }
    unsetUpRoom(updateChild = true) {
        this.unsetAttachedRoom(5, updateChild);
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
        
        if (_furniture.items.size > 0) {
            _furniture.items.forEach(function(_item) {
                _item.container.room.items.add(_item);
            });
        }
    }
    removeFurniture(_furniture) {
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.get(_furniture);
        
        _furniture.room = undefined;
        this.furniture.delete(_furniture);
        
        if (_furniture.items.size > 0) {
            _furniture.items.forEach(function(_item) {
                _item.container.room.items.delete(_item);
            });
        }
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
    constructor(_id = undefined, _name = undefined, _description = undefined, _owner = undefined, _container = undefined) {
        super(_id, _name, _description, _owner);
        
        if (_container instanceof Room || _container instanceof Character || _container instanceof Furniture)
            this.container = _container;
        this.previousContainer = undefined;
        
        if (_container instanceof Furniture && _container.room instanceof Room)
            this.room = _container.room;
        
        this.image = "images/items/genericItem.svg";
        
        itemsIndexes.set(_id, this);
    }
    
    moveToEntity(_entity) {
        if (this.container instanceof Furniture || this.container instanceof Room || this.container instanceof Character)
            this.container.room.items.delete(this);
        
        if (_entity instanceof Character)
            return this.moveToCharacter(_entity);
        else if (_entity instanceof Furniture)
            return this.moveToFurniture(_entity);
        else if (_entity instanceof Room)
            return this.moveToRoom(_entity);
        else if (typeof _entity == 'undefined') {
            this.previousContainer = this.container;
            this.container = undefined;
            return true;
        }
        else
            return false;
    }
    moveToFurniture(_furniture) {
        if (!(_furniture instanceof Furniture))
            _furniture = furnitureIndexes.get(_furniture);
        
        if (_furniture instanceof Furniture) {
            this.previousContainer = this.container;
            this.container = _furniture;

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
            this.previousContainer = this.container;
            this.container = _character;
            
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
            this.previousContainer = this.container;
            this.container = _room;
            
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
class Clothing extends Item {
    constructor(_id = undefined, _name = undefined, _description = undefined, _owner = undefined, _bodyPart = undefined) {
        super(_id, _name, _description, _owner);
        if (isNaN(_bodyPart))
            _bodyPart = BodyPartNameIds.get(_bodyPart);
        this.bodyPart = _bodyPart;
    }
}

class Furniture extends Entity {
    constructor(_id = undefined, _name = undefined, _description = undefined, _owner = undefined, _actions = undefined, _type = 0, _seatingSpace = 1, _storageSpace = 1) {
        super(_id, _name, _description, _owner, _actions);
        
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
        this.seatingSpace = _seatingSpace;
        this.storageSpace = _storageSpace;
        this.characters = new Map(); // <Character, Action>
        
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
        
        if (isNaN(_actionType)) {
            if (ActionsNameIds.has(_actionType))
                _actionType = ActionsNameIds.get(_actionType);
            else
                _actionType = 2;
        }
        else {
            if (ActionsIdNames.has(_actionType))
                _actionType = _actionType;
            else
                _actionType = 2;
        }
        
        this.characters.set(_character, _actionType);
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
        return this.characters.size > 1;
    }
    hasCharacters() {
        return containsCharacters();
    }
    
    seat(_character, _action = "sit") {
        this.addCharacter(_character, _action);
    }
    unseat(_character) {
        this.removeCharacter(_character);
    }
    
    lie(_character, _action = "lay") {
        this.addCharacter(_character, _action);
    }
    
    availableSeatingSpace() {
        var _charactersSeatingSpaceTotal = this.seatingSpace;
        
        this.characters.forEach(function(_actionType, _character) {
            var _baseMultiplier = 1;
            
            // If they're laying or fucking, they're taking up double the space.
            // But then, if two people are fucking, then it takes double that... which makes no sense :v
            // So, only include laying. 2017/09/06
            //if (_actionType == 11 || _actionType == 3) {
            if (_actionType == 3)
                    _baseMultiplier = 2;
            
            // but what if it's a stoat and a wolf :v
            // wat then :V 2017/09/06
            
            if (debug) console.log(_charactersSeatingSpaceTotal + " -= " + SpeciesSizeUnits.get(_character.species) + " * " + _baseMultiplier);
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
        var fn = new Function(this.nextFunction);
        try {fn();}catch (err) {}
        
        if (this.runOnce) {
            eventsIndexes.delete(this.id);
        }
    }
}