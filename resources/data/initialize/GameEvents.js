/*
    constructor(_id, _action, _characterA, _characterB, _item, _location, _cell, _room, _cron, _nextFunction, _runOnce)
*/

// Daily
new GameEvent("newDayWelcomeEvent", undefined, player, undefined, undefined, "alBuildingLocation", undefined, undefined, new Cron(undefined, 6), "newDayWelcome('newDayWelcomeEvent')", false);

// Schedules
setEventCharacterLocationSchedule(
	"avoWorkRoutineStartEvent", // Name of the GameEvent
	avo, // Character following the schedule
	"pandorasBoxCheckout", // Location of the schedule
	new Cron(30, 7, undefined, undefined, "1-5"), // Time of the schedule; 7:30 AM, Mon-Fri
	new GameEvent( // the Function called when the Character is at the Location; in this case, a new GameEvent
		"avoWorkRoutineStartSitEvent", // Name of the GameEvent
		"walk", // the currentAction of the Character which triggers the GameEvent
		avo,  // the Character triggering the GameEvent
		undefined,
		undefined,
		undefined, 
		undefined, 
		"pandorasBoxCheckout", // the Room where the GameEvent is triggered
		undefined, 
		"characterSit(avo, pandorasBoxCheckoutDesk)", // the Function called when the previous conditions are met
		true // Run once
	),
	false // Don't run once
);
setEventCharacterLocationSchedule(
	"avoWorkRoutineEndEvent", // Name of the event
	avo, // Character following the schedule
	"avoApartmentBedroomAvo", // Location of the schedule
	new Cron(30, 17, undefined, undefined, "1-5"), // Time of the schedule; 5:30 PM Mon-Fri
	characterMasturbate(avo), // Function called when the Character is at the Location
	false // Run once
);

// One-time
new GameEvent("remmyApartmentBathroomWaterbucketEvent", undefined, undefined, undefined, undefined, undefined, undefined, "remmyApartmentBathroom", undefined, "remmyApartmentBathroomWaterbucket('remmyApartmentBathroomWaterbucketEvent')", true);
new GameEvent("rosieReceiveCharlieBeatingHeartEvent", "give", undefined, rosie, "charlieBeatingHeart", undefined, undefined, undefined, undefined, "rosieGiveCharlieHeart('rosieReceiveCharlieBeatingHeartEvent')", true);
new GameEvent("charlieCheckMirrorEvent", undefined, undefined, charlie, undefined, undefined, undefined, charlie.room, undefined, "charlieCheckMirror('charlieCheckMirrorEvent')", true);

// Repeated
new GameEvent("charlieHeartbeatRosieCellEvent", undefined, player, rosie, "charlieBeatingHeart", undefined, rosie.room.cell, undefined, undefined, "charlieHeartbeatRosie('charlieHeartbeatRosieCellEvent')", false);
new GameEvent("charlieHeartbeatRosieRoomEvent", undefined, player, rosie, "charlieBeatingHeart", undefined, undefined, rosie.room, undefined, "charlieHeartbeatRosie('charlieHeartbeatRosieRoomEvent')", true);
new GameEvent("charlieRemoveHeartEvent", "remove", player, charlie, "charlieBeatingHeart", undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieRemoveHeartEvent')", false);
new GameEvent("charlieReceiveHeartEvent", "take", charlie, undefined, "charlieBeatingHeart", undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieReceiveHeartEvent')", false);
new GameEvent("charlieRemoveLeftEyeEvent", "remove", player, charlie, "charlieLeftEye", undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieRemoveLeftEyeEvent')", false);
new GameEvent("charlieReceiveLeftEyeEvent", "take", charlie, undefined, "charlieLeftEye", undefined, undefined, undefined, undefined, "updateCharlieBuse('charlieReceiveLeftEyeEvent')", false);
