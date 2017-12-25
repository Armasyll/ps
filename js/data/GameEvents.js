setCharacterPath("martina", "chartyApartmentBathroom");
new GameEvent("martinaToBathroomEvent", "walk", "martina", undefined, undefined, undefined, undefined, "chartyApartmentBedroomMarty", undefined, "setCharacterPath(martina, chartyApartmentBathroom)", false);
new GameEvent("martinaToBedroomEvent", "walk", "martina", undefined, undefined, undefined, undefined, "chartyApartmentBathroom", undefined, "setCharacterPath(martina, chartyApartmentBedroomMarty)", false);

/*
    constructor(_id, _action, _characterA, _characterB, _item, _location, _cell, _room, _cron, _nextFunction, _runOnce)
*/
new GameEvent("newDayWelcomeEvent", undefined, player, undefined, undefined, "alBuildingLocation", undefined, undefined, new Cron(undefined, 6), "newDayWelcome('newDayWelcomeEvent')", false);
setCharacterScheduleEvent("avoWorkRoutineStartEvent", avo, "pandorasBoxCheckout", new Cron(30, 7, undefined, undefined, "1-5"), false);
new GameEvent("avoWorkRoutineStartSitEvent", "walk", avo, undefined, undefined, undefined, undefined, "pandorasBoxCheckout", undefined, "characterSit(avo, pandorasBoxCheckoutDesk)", false);
setCharacterScheduleEvent("avoWorkRoutineEndEvent", avo, "avoApartmentBedroomAvo", new Cron(30, 17, undefined, undefined, "1-5"), false);
new GameEvent("remmyApartmentBathroomWaterbucketEvent", undefined, undefined, undefined, undefined, undefined, undefined, "remmyApartmentBathroom", undefined, "remmyApartmentBathroomWaterbucket('remmyApartmentBathroomWaterbucketEvent')", true);
new GameEvent("charlieHeartbeatRosieCellEvent", undefined, player, rosie, "charlieBeatingHeart", undefined, rosie.room.cell, undefined, undefined, "charlieHeartbeatRosie('charlieHeartbeatRosieCellEvent')", false);
new GameEvent("charlieHeartbeatRosieRoomEvent", undefined, player, rosie, "charlieBeatingHeart", undefined, undefined, rosie.room, undefined, "charlieHeartbeatRosie('charlieHeartbeatRosieRoomEvent')", true);
new GameEvent("charlieRemoveHeartEvent", "remove", player, charlie, "charlieBeatingHeart", undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieRemoveHeartEvent')", false);
new GameEvent("charlieReceiveHeartEvent", "take", charlie, undefined, "charlieBeatingHeart", undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieReceiveHeartEvent')", false);
new GameEvent("charlieRemoveLeftEyeEvent", "remove", player, charlie, "charlieLeftEye", undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieRemoveLeftEyeEvent')", false);
new GameEvent("charlieReceiveLeftEyeEvent", "take", charlie, undefined, "charlieLeftEye", undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieReceiveLeftEyeEvent')", false);
new GameEvent("rosieReceiveCharlieBeatingHeartEvent", "give", undefined, rosie, "charlieBeatingHeart", undefined, undefined, undefined, undefined, "rosieGiveCharlieHeart('rosieReceiveCharlieBeatingHeartEvent')", true);
