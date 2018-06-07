function limboInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function alApartmentLivingroomInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function alApartmentBathroomInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function alApartmentBedroomInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
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
        if (PSDE.getCharacterCurrentRoom(player).furniture.size > 0)
            roomFurnitureExamine(PSDE.getCharacterCurrentRoom(player));
    }
}
function avoApartmentLivingroomInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function avoApartmentBathroomInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function avoApartmentBedroomAInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function avoApartmentBedroomBInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function chartyApartmentLivingroomInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function chartyApartmentBathroomInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function chartyApartmentBedroomCharlieInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function chartyApartmentBedroomMartyInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function ozzyApartmentLivingroomInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function ozzyApartmentBathroomInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function ozzyApartmentBedroomInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function remmyApartmentLivingroomInteract(_showContent = true) {
    if (_showContent) {
        Content.add("<p>" + (PSDE.player == PSDE.characters.get("remmy") ? 'Your' : "Remmy's") + " homely, cramped apartment, with cracked paint along the walls and an oddly splotchy ceiling.</p>");
        Content.add("<p>There's a fairly recent TV on a stand, along with a small coffee table and a somewhat clean couch, and it's joined with an open kitchenette.</p>");
        Content.add("<p>Along the back there's a door to your bedroom, and to the side there's a bathroom. By the kitchenette is a door to the second floor hallway.</p>");
        Content.add("<p>In the event of an emergency, the livingroom window is suppose to open to a fire escape. It was painted shut, though. You'd chip the paint off to get the window open, but you " + (PSDE.player == PSDE.characters.get("charlie") ? 'like the smell of sheep' : 'think it may be lead-based') + ".</p>");
        
        if (PSDE.getCharacterCurrentRoom(player)['ateCharlie']) {
            if (PSDE.player == PSDE.characters.get("charlie"))
                Content.add("There are remains of your body on the floor, as well as a pool of dried blood.<br/>");
            else
                Content.add("Charlie's bloody, partially eaten corpse lays in front of your couch.<br/>");
        }
    }
    
    if (!Menu.showingBaseMenu) {
        Menu.addOption("charlieEatFruitypebbles()", "Eat Fruity Pebbles.");
    }
}
function remmyApartmentBedroomInteract(_showContent = true) {
    if (_showContent) {
        Content.add("<p>Stepping into " + (PSDE.player == PSDE.characters.get("remmy") ? "your" : "Remmy's") + " room, you notice that it smells " + (PSDE.player == PSDE.characters.get("charlie") ? "of you. 'Good,' you think" : (PSDE.player == PSDE.characters.get("remmy") ? "kind of flowery" : "strongly of Charlie")) + ".</p>");
        
        if (PSDE.getCharacterCurrentRoom(player)['ateCharlie']) {
            if (PSDE.player == PSDE.characters.get("charlie"))
                Content.add("There are remains of your body on the bed, as well as stains of blood along the blanket and floor.<br/>");
            else
                Content.add("Charlie's bloody, partially eaten corpse lays on the bed.<br/>");
        }
    }
}
function remmyApartmentBathroomInteract(_showContent = true) {
    if (_showContent) {
        Content.add("<p>You find " + (PSDE.player == PSDE.characters.get("remmy") ? 'your' : "Remmy's") + " bathroom hot and muggy, with stray bits of cream-coloured fur strawn about the small room. It doesn't take a trained nose to realize that the room smells strongly of wet canine and violet flowers.</o>");
        Content.add("<p>Beside the sink is " + (PSDE.player == PSDE.characters.get("charlie") ? 'your' : 'a') + " thick brush with a few stray cream-coloured hairs, as well as " + (PSDE.player == PSDE.characters.get("remmy") ? 'your' : 'a') + " wool pick. There's a cannister of musk-mask by the faucet, and a small bottle of " + (PSDE.player == PSDE.characters.get("charlie") ? 'your supply of ewe pheramone' : 'something you can\'t make out') + ".</p>");
        Content.add("<p>Looking over at the tub, you see that it is still a bit damp after " + (PSDE.player == PSDE.characters.get("charlie") ? 'you' : 'someone') + " had used it last.");
        
        if (remmyApartmentBathroomTub.hasItem(charlieBigBlackRemmyDildo))
            Content.add((PSDE.player == PSDE.characters.get("remmy") ? 'Strangely, or not, given your guest, there\'s a' : (PSDE.player == PSDE.characters.get("charlie") ? 'Your' : 'Remmy\'s')) + " big black dildo shaped almost exactly like " + (PSDE.player == PSDE.characters.get("remmy") ? 'your' : "Remmy's") + " penis protruding from the middle of the tub. It's still slick.</p>");
        
        if (PSDE.getCharacterCurrentRoom(player)['ateCharlie']) {
            if (PSDE.player == PSDE.characters.get("charlie"))
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
    
    if (!Menu.showingBaseMenu) {
    }
}
function twinsApartmentBathroomInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function twinsApartmentBedroomAnnekeInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function twinsApartmentBedroomWolterInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
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
    
    if (!Menu.showingBaseMenu) {
    }
}
function weaverApartmentBathroomInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function weaverApartmentBedroomAInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function weaverApartmentBedroomBInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}

function pandorasBoxCheckoutInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function pandorasBoxFront(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function pandorasBoxBack(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function pandorasBoxAisleA(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function pandorasBoxAisleB(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function pandorasBoxAisleC(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function pandorasBoxGarageInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function pandorasBoxGarageAInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}
function pandorasBoxBasementHiddenBedroomInteract(_showContent = true) {
    if (_showContent) {
    }
    
    if (!Menu.showingBaseMenu) {
    }
}