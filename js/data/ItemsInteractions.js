function itemInteract(_item, _clearContent = false, _clearMenu = true) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}
function itemUse(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}
function itemPut(_item, _character = player) { // Rewrite this later for entities in general
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}
function itemGive(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}
function itemTake(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}
function itemHold(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}
function itemWear(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    _character.wear(_item);
}
function itemLook(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item))
        return;
    
    Content.add(_item.description);
}
function itemAttack(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}
function itemSex(_item, _character = player) {
    if (!(_item instanceof Item))
        _item = itemsIndexes.get(_item);
    if (!(_character instanceof Character))
        _character = charactersIndexes.has(_character) ? charactersIndexes.get(_character) : undefined;
    
    if (!(_item instanceof Item) || !(_character instanceof Character))
        return;
    
    
}