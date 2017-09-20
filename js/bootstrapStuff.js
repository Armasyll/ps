$(document).on("click", ".viewPersonalInventory", function(event){
    event.preventDefault();
    
    $("#personalInventoryModal").modal("show");
    $('#personalInventoryModal-title').html("<img style='height:2em' src='{0}' alt=''/>Your Inventory".format(player.image));
    $('#personalInventoryModal-body').html(generateEntityItemsGraphicalList(player, undefined, false));
});