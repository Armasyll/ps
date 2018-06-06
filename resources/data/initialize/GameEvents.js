/*
    constructor(_id, _action, _characterA, _characterB, _item, _location, _cell, _room, _cron, _nextFunction, _runOnce)
*/

// Daily
new GameEvent("newDayWelcomeEvent", undefined, PSDE.player, undefined, undefined, "alBuildingLocation", undefined, undefined, new Cron(undefined, 6), "newDayWelcome('newDayWelcomeEvent')", false);

// Schedules
PSDE.setCharacterRoomScheduleEvent(
	"avoWorkRoutineStartEvent", // Name of the GameEvent
	PSDE.getCharacterByID("avo"), // Character following the schedule
	"pandorasBoxCheckout", // Location of the schedule
	new Cron(30, 7, undefined, undefined, "1-5"), // Time of the schedule; 7:30 AM, Mon-Fri
	new GameEvent( // the Function called when the Character is at the Location; in this case, a new GameEvent
		"avoWorkRoutineStartSitEvent", // Name of the GameEvent
		"walk", // the currentAction of the Character which triggers the GameEvent
		PSDE.getCharacterByID("avo"),  // the Character triggering the GameEvent
		undefined,
		undefined,
		undefined, 
		undefined, 
		"pandorasBoxCheckout", // the Room where the GameEvent is triggered
		undefined, 
		"avo.set(pandorasBoxCheckoutDesk)", // the Function called when the previous conditions are met
		true // Run once
	),
	false // Don't run once
);
PSDE.setCharacterRoomScheduleEvent(
	"avoWorkRoutineEndEvent", // Name of the event
	PSDE.getCharacterByID("avo"), // Character following the schedule
	"avoApartmentBedroomAvo", // Location of the schedule
	new Cron(30, 17, undefined, undefined, "1-5"), // Time of the schedule; 5:30 PM Mon-Fri
	PSDE.getCharacterByID("avo").masturbate(), // Function called when the Character is at the Location
	false // Run once
);

// One-time
new GameEvent("remmyApartmentBathroomWaterbucketEvent", undefined, undefined, undefined, undefined, undefined, undefined, "remmyApartmentBathroom", undefined, "remmyApartmentBathroomWaterbucket('remmyApartmentBathroomWaterbucketEvent')", true);
new GameEvent("rosieReynardTakeCharlieHeart", "take", undefined, PSDE.getCharacterByID("rosieReynard"), PSDE.items.get("charlieBeatingHeart"), undefined, undefined, undefined, undefined, "rosieReynardTakeCharlieHeart('rosieReynardTakeCharlieHeart')", true);
new GameEvent("charlieCheckMirrorEvent", undefined, undefined, PSDE.getCharacterByID("charlie"), undefined, undefined, undefined, PSDE.getCharacterByID("charlie").room, undefined, "charlieCheckMirror('charlieCheckMirrorEvent')", true);

// Repeated
new GameEvent("charlieHeartbeatRosieCellEvent", undefined, PSDE.player, PSDE.getCharacterByID("rosieReynard"), PSDE.items.get("charlieBeatingHeart"), undefined, PSDE.getCharacterByID("rosieReynard").room.cell, undefined, undefined, "charlieHeartbeatRosie('charlieHeartbeatRosieCellEvent')", false);
new GameEvent("charlieHeartbeatRosieRoomEvent", undefined, PSDE.player, PSDE.getCharacterByID("rosieReynard"), PSDE.items.get("charlieBeatingHeart"), undefined, undefined, PSDE.getCharacterByID("rosieReynard").room, undefined, "charlieHeartbeatRosie('charlieHeartbeatRosieRoomEvent')", true);
new GameEvent("charlieRemoveHeartEvent", "remove", PSDE.player, PSDE.getCharacterByID("charlie"), PSDE.items.get("charlieBeatingHeart"), undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieRemoveHeartEvent')", false);
new GameEvent("charlieReceiveHeartEvent", "take", PSDE.getCharacterByID("charlie"), undefined, PSDE.items.get("charlieBeatingHeart"), undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieReceiveHeartEvent')", false);
new GameEvent("charlieRemoveLeftEyeEvent", "remove", PSDE.player, PSDE.getCharacterByID("charlie"), PSDE.items.get("charlieLeftEye"), undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieRemoveLeftEyeEvent')", false);
new GameEvent("charlieReceiveLeftEyeEvent", "take", PSDE.getCharacterByID("charlie"), undefined, PSDE.items.get("charlieLeftEye"), undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieReceiveLeftEyeEvent')", false);
new GameEvent("tellerMicelyReceiveChequeEvent", "take", PSDE.getCharacterByID("tellerMicely"), undefined, undefined, undefined, undefined, undefined, undefined, "PSDE.cashCheque()", false);