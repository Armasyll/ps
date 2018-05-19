function remmyApartmentBedroomBedSleep(_character) {
    Content.add("<p>You lay your head on {0} and fall asleep.</p>".format(PSDE.player.room.location.isOwner(PSDE.player) ? "your bed" : "the bed"));
    PSDE.player.sleep(remmyApartmentBedroomBed);
    PSDE.tick("9h");
    PSDE.baseMenu();
}
