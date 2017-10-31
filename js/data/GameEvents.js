characterMovements.set(martina, findPathToRoom(martina.room, chartyApartmentBathroom));
martinaToBathroomEvent = new GameEvent("martinaToBathroomEvent", "move", martina, undefined, undefined, undefined, undefined, chartyApartmentBedroomMarty, undefined, "characterMovements.set(martina, findPathToRoom(martina.room, chartyApartmentBathroom))", false);
martinaToBedroomEvent = new GameEvent("martinaToBedroomEvent", "move", martina, undefined, undefined, undefined, undefined, chartyApartmentBathroom, undefined, "characterMovements.set(martina, findPathToRoom(martina.room, chartyApartmentBedroomMarty))", false);

/*
    constructor(_id, _action, _characterA, _characterB, _item, _location, _cell, _room, _cron, _nextFunction, _runOnce)
*/
newDayWelcomeEvent = new GameEvent("newDayWelcomeEvent", undefined, player, undefined, undefined, alBuildingLocation, undefined, undefined, new Cron(undefined, 6), "newDayWelcome('newDayWelcomeEvent')", false);
avoWorkRoutineStartEvent = new GameEvent("avoWorkRoutineStartEvent", undefined, undefined, undefined, undefined, undefined, undefined, undefined, new Cron(30, 7, undefined, undefined, "1-5"), "avoWorkRoutineStart('avoWorkRoutineStartEvent')", false);
avoWorkRoutineStartSitEvent = new GameEvent("avoWorkRoutineStartSitEvent", "move", avo, undefined, undefined, undefined, undefined, pandorasBoxCheckout, undefined, "avoWorkRoutineStartSit('avoWorkRoutineStartSitEvent')", false);
avoWorkRoutineEndEvent = new GameEvent("avoWorkRoutineEndEvent", undefined, undefined, undefined, undefined, undefined, undefined, undefined, new Cron(30, 17, undefined, undefined, "1-5"), "avoWorkRoutineEnd('avoWorkRoutineEndEvent')", false);

remmyApartmentBathroomWaterbucketEvent = new GameEvent("remmyApartmentBathroomWaterbucketEvent", undefined, undefined, undefined, undefined, undefined, undefined, remmyApartmentBathroom, undefined, "remmyApartmentBathroomWaterbucket('remmyApartmentBathroomWaterbucketEvent')", true);
charlieHeartbeatRosieCellEvent = new GameEvent("charlieHeartbeatRosieCellEvent", undefined, player, rosie, charlieBeatingHeart, undefined, rosie.room.cell, undefined, undefined, "charlieHeartbeatRosie('charlieHeartbeatRosieCellEvent')", false);
charlieHeartbeatRosieRoomEvent = new GameEvent("charlieHeartbeatRosieRoomEvent", undefined, player, rosie, charlieBeatingHeart, undefined, undefined, rosie.room, undefined, "charlieHeartbeatRosie('charlieHeartbeatRosieRoomEvent')", false);
charlieTakeHeartEvent = new GameEvent("charlieRemoveHeartEvent", "remove", player, charlie, charlieBeatingHeart, undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieRemoveHeartEvent')", false);
charlieReceiveHeartEvent = new GameEvent("charlieReceiveHeartEvent", "take", charlie, undefined, charlieBeatingHeart, undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieReceiveHeartEvent')", false);
charlieRemoveLeftEyeEvent = new GameEvent("charlieRemoveLeftEyeEvent", "remove", player, charlie, charlieLeftEye, undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieRemoveLeftEyeEvent')", false);
charlieReceiveLeftEyeEvent = new GameEvent("charlieReceiveLeftEyeEvent", "take", charlie, undefined, charlieLeftEye, undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieReceiveLeftEyeEvent')", false);
rosieReceiveCharlieBeatingHeartEvent = new GameEvent("rosieReceiveCharlieBeatingHeartEvent", "give", undefined, rosie, charlieBeatingHeart, undefined, undefined, undefined, undefined, "rosieGiveCharlieHeart('rosieReceiveCharlieBeatingHeartEvent')", true);
