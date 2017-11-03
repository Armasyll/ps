function limboInteract(_showContent = true) {
    if (_showContent) {
    }
}
function alApartmentLivingroomInteract(_showContent = true) {
    if (_showContent) {
    }
}
function alApartmentBathroomInteract(_showContent = true) {
    if (_showContent) {
    }
}
function alApartmentBedroomInteract(_showContent = true) {
    if (_showContent) {
    }
}
function alBuildingMaintenanceInteract(_showContent = true) {
    if (_showContent) {
        Content.add("<p>You're standing in the maintenance room of your Pack's apartment.</p>");
    }
}
function alBuildingBasementInteract(_showContent = true) {
    if (_showContent) {
        Content.add("<p>The basement is dark, and full of terrors.</p>");
    }
    
    if (!Menu.showingBaseMenu) {
        Content.add("<p>There's the skittering of something small and insignificant in the distance.</p>");
        if (player.room.furniture.size > 0)
            roomFurnitureExamine(player.room);
    }
}
function avoApartmentLivingroomInteract(_showContent = true) {
    if (_showContent) {
    }
}
function avoApartmentBathroomInteract(_showContent = true) {
    if (_showContent) {
    }
}
function avoApartmentBedroomAInteract(_showContent = true) {
    if (_showContent) {
    }
}
function avoApartmentBedroomBInteract(_showContent = true) {
    if (_showContent) {
    }
}
function chartyApartmentLivingroomInteract(_showContent = true) {
    if (_showContent) {
    }
}
function chartyApartmentBathroomInteract(_showContent = true) {
    if (_showContent) {
    }
}
function chartyApartmentBedroomCharlieInteract(_showContent = true) {
    if (_showContent) {
    }
}
function chartyApartmentBedroomMartyInteract(_showContent = true) {
    if (_showContent) {
    }
}
function ozzyApartmentLivingroomInteract(_showContent = true) {
    if (_showContent) {
    }
}
function ozzyApartmentBathroomInteract(_showContent = true) {
    if (_showContent) {
    }
}
function ozzyApartmentBedroomInteract(_showContent = true) {
    if (_showContent) {
    }
}
function remmyApartmentLivingroomInteract(_showContent = true) {
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
    
    if (!Menu.showingBaseMenu) {
        Menu.addOption("chearlieEatFruitypebbles()", "Eat Fruity Pebbles.");
    }
}
function remmyApartmentBedroomInteract(_showContent = true) {
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
function remmyApartmentBathroomInteract(_showContent = true) {
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
    
    if (!Menu.showingBaseMenu) {
        
    }
}

function twinsApartmentLivingroomInteract(_showContent = true) {
    if (_showContent) {
    }
}
function twinsApartmentBathroomInteract(_showContent = true) {
    if (_showContent) {
    }
}
function twinsApartmentBedroomAnnekeInteract(_showContent = true) {
    if (_showContent) {
    }
}
function twinsApartmentBedroomWolterInteract(_showContent = true) {
    if (_showContent) {
    }
}
function alBuildingFirstFloorHallwayInteract(_showContent = true) {
    if (_showContent) {
        Content.add("<p>You're standing in the first floor lobby of your Pack's apartment.</p>");
    }
}
function alBuildingSecondFloorHallwayInteract(_showContent = true) {
    if (_showContent) {
        Content.add("<p>You're standing in the second floor hallway of your Pack's apartment.</p>");
    }
}
function alBuildingThirdFloorHallwayInteract(_showContent = true) {
    if (_showContent) {
        Content.add("<p>You're standing in the third floor hallway of your Pack's apartment.</p>");
    }
}
function weaverApartmentLivingroomInteract(_showContent = true) {
    if (_showContent) {
    }
}
function weaverApartmentBathroomInteract(_showContent = true) {
    if (_showContent) {
    }
}
function weaverApartmentBedroomAInteract(_showContent = true) {
    if (_showContent) {
    }
}
function weaverApartmentBedroomBInteract(_showContent = true) {
    if (_showContent) {
    }
}

function pandorasBoxCheckoutInteract(_showContent = true) {
    if (_showContent) {
    }
}
function pandorasBoxFront(_showContent = true) {
    if (_showContent) {
    }
}
function pandorasBoxBack(_showContent = true) {
    if (_showContent) {
    }
}
function pandorasBoxIsleA(_showContent = true) {
    if (_showContent) {
    }
}
function pandorasBoxIsleB(_showContent = true) {
    if (_showContent) {
    }
}
function pandorasBoxIsleC(_showContent = true) {
    if (_showContent) {
    }
}
function pandorasBoxGarageInteract(_showContent = true) {
    if (_showContent) {
    }
}
function pandorasBoxGarageAInteract(_showContent = true) {
    if (_showContent) {
    }
}
function pandorasBoxBasementHiddenBedroomInteract(_showContent = true) {
    if (_showContent) {
    }
}