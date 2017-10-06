function roomInteract(_room, _showBaseMenu = false, _clearContent = true, _showContent = true, _checkLocked = true) {
    if (!(_room instanceof Room))
        _room = roomsIndexes.get(_room);
    
    if (player.room.isLocked(_room) && _checkLocked && !player.hasKey(_room)) {
        Content.add("<p>" + _room.name + " is locked from this side.</p>");
    }
    else {
        if (player.room !== _room) {
            if (debug) console.log("Previous Room: " + player.room.id);
            movePlayerToRoom(_room);
            if (debug) console.log("Current Room: " + player.room.id);
        }
        
        Title.set(
            (player.room.isOwner(player) ? "Your "  + (player.room.type !== 'undefined' ? RoomTypeIdNames.get(player.room.type) : "room").capitalize() : player.room.name), 
            undefined, 
            (typeof player.room.location !== 'undefined' ? (player.room.location == player.room.cell.location ? player.room.cell.name : player.room.location.name) : "&nbsp;"), 
            (typeof player.room.cell.location !== 'undefined' ? player.room.cell.location.name : "&nbsp;")
        );
        
        if (_showBaseMenu) {
            if (debug) console.log("\tBase Menu and Room for " + _room.sid);
            fn = new Function(_room.sid + "Interact(" + _showBaseMenu + "," + (!(player.previousRoom instanceof Room) || !(player.previousRoom.sid == player.room.sid)) + "," + (!(player.previousRoom instanceof Room) || !(player.previousRoom.sid == player.room.sid)) + ")");
            try {fn();}catch (err) {}
            
            baseMenu(0, 1);
        }
        else {
            Menu.isExploring = false;
            
            Menu.clear();
            Menu.setOption((numberOfOptions == 12 ? 11 : 14), "baseMenu(" + (!(player.previousRoom instanceof Room) || !(player.previousRoom.sid == player.room.sid)) + ")", "<span class='hidden-md hidden-sm hidden-xs'>Back to </span>Menu");
            
            if (debug) console.log("\tRoom for " + _room.sid);
            fn = new Function(_room.sid + "Interact(" + _showBaseMenu + "," + (!(player.previousRoom instanceof Room) || !(player.previousRoom.sid == player.room.sid)) + "," + (!(player.previousRoom instanceof Room) || !(player.previousRoom.sid == player.room.sid)) + ")");
            try {fn();}catch (err) {}
            
            _room.furniture.forEach(function(_furniture) {
                Menu.addOption("furnitureInteract(" + _furniture.id + ", 0, 1)", "Look at " + _furniture.name, _furniture.description);
            });
            
            Menu.generate();
        }
        
        eventsIndexes.forEach(function(_event) {
            if (typeof _event.cron != 'undefined' || (typeof _event.location == 'undefined' && typeof _event.cell == 'undefined' && typeof _event.room == 'undefined')) {
                return undefined;
            }
            
            if (
                typeof _event.characterA == 'undefined' || 
                (
                    (_event.characterA instanceof Character && _event.characterA == player) &&
                    (typeof _event.item == 'undefined' || _event.characterA.containsItem(_event.item))
                )
            ) {
                if (typeof _event.location == 'undefined' || 
                    (
                        (_event.location instanceof Location && (_event.location == _room.location || _event.location == _room.cell.location)) &&
                        (typeof _event.characterB == 'undefined' || (_event.characterB.room.location == _event.location || _event.characterB.location == _event.location))
                    )
                ) {
                    if (typeof _event.cell == 'undefined' || 
                        (
                            (_event.cell instanceof Cell && _event.cell == _room.cell) && 
                            (typeof _event.characterB == 'undefined' || _event.characterB.room.cell == _event.cell) &&
                            (_event.characterA.previousRoom.cell != _event.characterA.room.cell)
                        )
                    ) {
                        if (typeof _event.room == 'undefined' || 
                            (
                                (_event.room instanceof Room && _event.room == _room) && 
                                (typeof _event.characterB == 'undefined' || _event.characterB.room == _event.room)
                            )
                        ) {
                            _event.execute();
                        }
                    }
                }
            }
        }, this);
    }
}
function limboInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(limbo, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function alApartmentLivingroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(alApartmentLivingroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function alApartmentBathroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(alApartmentBathroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function alApartmentBedroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(alApartmentBedroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function alBuildingMaintenanceInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(alBuildingMaintenanceInteract, false, false, true, false)";
    
    if (_clearContent) {
        if (!(player.previousRoom.sid == player.room.sid))
            Content.clear();
    }
    if (_showContent) {
        Content.add("<p>You're standing in the maintenance room of your Pack's apartment.</p>");
    }
}
function alBuildingBasementInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(alBuildingBasementInteract, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
        Content.add("<p>The basement is dark, and full of terrors.</p>");
    }
    
    if (!_showBaseMenu) {
        Content.add("<p>There's the skittering of something small and insignificant in the distance.</p>");
        if (player.room.furniture.size > 0)
            roomFurnitureExamine(player.room);
    }
}
function avoApartmentLivingroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(avoApartmentLivingroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function avoApartmentBathroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(avoApartmentBathroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function avoApartmentBedroomAInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(avoApartmentBedroomA, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function avoApartmentBedroomBInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(avoApartmentBedroomB, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function chartyApartmentLivingroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(chartyApartmentLivingroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function chartyApartmentBathroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(chartyApartmentBathroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function chartyApartmentBedroomCharlieInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(chartyApartmentBedroomCharlie, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function chartyApartmentBedroomMartyInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(chartyApartmentBedroomMarty, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function ozzyApartmentLivingroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(ozzyApartmentLivingroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function ozzyApartmentBathroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(ozzyApartmentBathroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function ozzyApartmentBedroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(ozzyApartmentBedroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function remmyApartmentLivingroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(remmyApartmentLivingroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
        Content.add("<p>" + (player == remmy ? 'Your' : "Remmy's") + " homely, cramped apartment, with cracked paint along the walls and an oddly splotchy ceiling.</p>");
        Content.add("<p>There's a fairly recent TV on a stand, along with a small coffee table and a somewhat clean couch, and it's joined with an open kitchenette.</p>");
        Content.add("<p>Along the back there's a door to your bedroom, and to the side there's a bathroom. By the kitchenette is a door to the second floor hallway.</p>");
        Content.add("<p>In the event of an emergency, the livingroom window is suppose to open to a fire escape. It was painted shut, though. You'd chip the paint off to get the window open, but you " + (player == charlie ? 'like the smell of sheep' : 'think it may be lead-based') + ".</p>");
        
        if (player.room['ateCharlie']) {
            if (player == charlie)
                Content.add("There are remains of your body on the floor, as well as a pool of dried blood.<br/>");
            else
                Content.add("Charlie's bloody, partially eaten corpse lays in front of your couch.<br/>");
        }
    }
    
    if (!_showBaseMenu) {
        Menu.addOption("chearlieEatFruitypebbles()", "Eat Fruity Pebbles.");
    }
}
function remmyApartmentBedroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(remmyApartmentBedroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
        Content.add("<p>Stepping into " + (player == remmy ? "your" : "Remmy's") + " room, you notice that it smells " + (player == charlie ? "of you. 'Good,' you think" : (player == remmy ? "kind of flowery" : "strongly of Charlie")) + ".</p>");
        
        if (player.room['ateCharlie']) {
            if (player == charlie)
                Content.add("There are remains of your body on the bed, as well as stains of blood along the blanket and floor.<br/>");
            else
                Content.add("Charlie's bloody, partially eaten corpse lays on the bed.<br/>");
        }
    }
}
function remmyApartmentBathroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(remmyApartmentBathroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
        Content.add("<p>You find " + (player == remmy ? 'your' : "Remmy's") + " bathroom hot and muggy, with stray bits of cream-coloured fur strawn about the small room. It doesn't take a trained nose to realize that the room smells strongly of wet canine and violet flowers.</o>");
        Content.add("<p>Beside the sink is " + (player == charlie ? 'your' : 'a') + " thick brush with a few stray cream-coloured hairs, as well as " + (player == remmy ? 'your' : 'a') + " wool pick. There's a cannister of musk-mask by the faucet, and a small bottle of " + (player == charlie ? 'your supply of ewe pheramone' : 'something you can\'t make out') + ".</p>");
        Content.add("<p>Looking over at the tub, you see that it is still a bit damp after " + (player == charlie ? 'you' : 'someone') + " had used it last.");
        
        if (remmyApartmentBathroomTub.hasItem(charlieBigBlackRemmyDildo))
            Content.add((player == remmy ? 'Strangely, or not, given your guest, there\'s a' : (player == charlie ? 'Your' : 'Remmy\'s')) + " big black dildo shaped almost exactly like " + (player == remmy ? 'your' : "Remmy's") + " penis is protruding from the middle of the tub. It's still slick.</p>");
        
        if (player.room['ateCharlie']) {
            if (player == charlie)
                Content.add("There are remains of your body on the floor, as well as a pool of dried blood.<br/>");
            else
                Content.add("Charlie's bloody, partially eaten corpse still lays by the tub.<br/>");
        }
    }
}

function twinsApartmentLivingroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(twinsApartmentLivingroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function twinsApartmentBathroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(twinsApartmentBathroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function twinsApartmentBedroomAnnekeInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(twinsApartmentBedroomAnneke, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function twinsApartmentBedroomWolterInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(twinsApartmentBedroomWolter, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function alBuildingFirstFloorHallwayInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    if (_clearContent) {
        if (!(player.previousRoom.sid == player.room.sid))
            Content.clear();
    }
    if (_showContent) {
        Content.add("<p>You're standing in the first floor lobby of your Pack's apartment.</p>");
    }
}
function alBuildingSecondFloorHallwayInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    if (debug) console.log("\t\t_showBaseMenu: " + _showBaseMenu + ", _clearContent: " + _clearContent);
    
    if (_clearContent) {
        if (!(player.previousRoom.sid == player.room.sid))
            Content.clear();
    }
    if (_showContent) {
        Content.add("<p>You're standing in the second floor hallway of your Pack's apartment.</p>");
    }
}
function alBuildingThirdFloorHallwayInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    if (_clearContent) {
        if (!(player.previousRoom.sid == player.room.sid))
            Content.clear();
    }
    if (_showContent) {
            Content.add("<p>You're standing in the third floor hallway of your Pack's apartment.</p>");
    }
}
function weaverApartmentLivingroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(alBuildingThirdFloorHallwayB, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function weaverApartmentBathroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(weaverApartmentBathroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function weaverApartmentBedroomAInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(weaverApartmentBedroomA, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function weaverApartmentBedroomBInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(weaverApartmentBedroomB, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}

function pandorasBoxCheckoutInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(pandorasBoxCheckoutInteract, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function pandorasBoxFront(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(pandorasBoxFront, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function pandorasBoxBack(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(pandorasBoxBack, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function pandorasBoxIsleA(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(pandorasBoxIsleA, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function pandorasBoxIsleB(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(pandorasBoxIsleB, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function pandorasBoxIsleC(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(pandorasBoxIsleC, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function pandorasBoxGarageInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(pandorasBoxGarageInteract, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function pandorasBoxGarageAInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(pandorasBoxGarageAInteract, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}
function pandorasBoxBasementHiddenBedroomInteract(_showBaseMenu = false, _clearContent = true, _showContent = true) {
    lastMenu = "roomInteract(pandorasBoxBasementHiddenBedroom, false, false, true, false)";
    
    if (_clearContent) {
        Content.clear();
    }
    if (_showContent) {
    }
}