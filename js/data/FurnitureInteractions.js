function remmyApartmentBedroomBedSleep(_character) {
    Content.add("<p>You lay your head on {0} and fall asleep.</p>".format(player.room.isOwner(player) ? "your bed" : "the bed"));
    player.sleep(remmyApartmentBedroomBed);
    tick("9h");
    baseMenu
}