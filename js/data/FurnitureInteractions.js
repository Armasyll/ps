function remmyApartmentBedroomBedSleep(_character) {
    Content.add("You lay your head on {0} and fall asleep.".format(player.room.isOwner(player) ? "your bed" : "the bed"));
    player.sleep(remmyApartmentBedroomBed);
    tick("9h");
    baseMenu
}