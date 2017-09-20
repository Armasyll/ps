$(document).on("click", ".viewPersonalInventory", function(event){
    event.preventDefault();
    var e = $(this);
    var title = player.name + "'s Inventory";
    var body = '';
    
    player.items.forEach(function(_item) {
        var _ownerString = '';
        if (_item.owner instanceof Set && _item.owner.size > 0) {
            _ownerString += "Owned by ";
            
            var _owners = Array.from(_item.owner);
            if (_item.owner.size == 1)
                _ownerString += _owners[0].name;
            else {
                for (i = 0; i < _owners.length - 1; i++) {
                    _ownerString += _owners[i].name;
                    if (_owners.length > 2)
                        _ownerString += ", ";
                }
                _ownerString += " and " + _owners[_owners.length - 1].name + ".";
            }
        }
        
        body += "<div style='display:inline-block; background-color: white; border-radius: 4px; margin: 1em; padding: 0.25em; width:12em; max-width:12em; height:16em; max-height:16em;'><img class='text-center' style='border:0.1em solid white; background-color:white; border-radius:0.5em; max-height: 5em; margin-left:auto; margin-right:auto; display:block;' src='{0}' alt=''/><br/><div style='vertical-align:bottom;'><div class='text-center' style='height: 1em; max-height: 1em;'>{1}</div><div class='small text-center' style='height: 3em; max-height: 3em;'>{2}</div><p class='small' style='background-color: #d3d3d3; padding: 0.25em; height: 6em; max-height: 6em; overflow-y: scroll;'>{3}</p></div></div>".format(_item.image, _item.name, (typeof _item.owner != 'undefiend' ? _ownerString : ''), _item.description);
    }, this);
    $("#personalInventoryModal").modal("show");
    $('#personalInventoryModal-title').html(title);
    $('#personalInventoryModal-body').html(body);
});