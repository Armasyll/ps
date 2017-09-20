characterMovements.set(martina, findPathInCell(martina.room, chartyApartmentBathroom));

//constructor(_id, _action, _characterA, _characterB, _item, _location, _cell, _room, _cron, _nextFunction, _runOnce)
newDayWelcomeEvent = new GameEvent("newDayWelcomeEvent", undefined, player, undefined, undefined, alBuildingLocation, undefined, undefined, new Cron(undefined, 6), "newDayWelcome(newDayWelcomeEvent)", false);
remmyApartmentBathroomWaterbucketEvent = new GameEvent("remmyApartmentBathroomWaterbucketEvent", undefined, undefined, undefined, undefined, undefined, undefined, remmyApartmentBathroom, undefined, "remmyApartmentBathroomWaterbucket(remmyApartmentBathroomWaterbucketEvent)", true);
charlieHeartbeatRosieCellEvent = new GameEvent("charlieHeartbeatRosieCellEvent", undefined, player, rosie, charlieBeatingHeart, undefined, rosie.room.cell, undefined, undefined, "charlieHeartbeatRosie(charlieHeartbeatRosieCellEvent)", false);
charlieHeartbeatRosieRoomEvent = new GameEvent("charlieHeartbeatRosieRoomEvent", undefined, player, rosie, charlieBeatingHeart, undefined, undefined, rosie.room, undefined, "charlieHeartbeatRosie(charlieHeartbeatRosieRoomEvent)", false);
charlieRemoveHeartEvent = new GameEvent("charlieTakeHeartEvent", "remove", player, charlie, charlieBeatingHeart, undefined, undefined, undefined, undefined, "charlieRemoveOrgan(charlieRemoveHeartEvent)", false);
charlieGiveHeartEvent = new GameEvent("charlieGiveHeartEvent", "give", charlie, undefined, charlieBeatingHeart, undefined, undefined, undefined, undefined, "charlieRemoveOrgan(charlieGiveHeartEvent)", false);
charlieRemoveLeftEyeEvent = new GameEvent("charlieTakeLeftEyeEvent", "remove", player, charlie, charlieLeftEye, undefined, undefined, undefined, undefined, "charlieRemoveOrgan(charlieRemoveLeftEyeEvent)", false);
charlieGiveLeftEyeEvent = new GameEvent("charlieGiveLeftEyeEvent", "give", charlie, undefined, charlieLeftEye, undefined, undefined, undefined, undefined, "charlieRemoveOrgan(charlieGiveLeftEyeEvent)", false);

martinaToBathroomEvent = new GameEvent("martinaToBathroomEvent", "move", martina, undefined, undefined, undefined, undefined, chartyApartmentBedroomMarty, undefined, "characterMovements.set(martina, findPathInCell(martina.room, chartyApartmentBathroom))", false);
martinaToBedroomEvent = new GameEvent("martinaToBedroomEvent", "move", martina, undefined, undefined, undefined, undefined, chartyApartmentBathroom, undefined, "characterMovements.set(martina, findPathInCell(martina.room, chartyApartmentBedroomMarty))", false);