var user_interface = {
    selectSpell : function(event){
        //Highlights and adds onclick methods to each object on the map.
        // Uses findSquare to select bounds, then isinrange to
        // verify the places that can be hit.

        map_controller.render_map();
    },
    buyUpgrade : function(event){
        //Changes character information to reflect the purchased upgrade and deducts a skill point

        map_controller.render_map();
    },
    zoomIncrease : function(){
        if(game.settings.zoom_factor < ZOOM_MAX){
            game.settings.zoom_factor +=2;
        }
        game.output.push("Zoom increased to " + game.settings.zoom_factor);
        map_controller.render_map();
    },
    zoomDecrease : function(){
        if(game.settings.zoom_factor > 3){
            game.settings.zoom_factor -=2;
        }
        game.output.push("Zoom decreased to " + game.settings.zoom_factor);
        map_controller.render_map();
    },
    cancelSpell : function(){
        //Clears all highlights and removes the onclick methods from selectSpell

        map_controller.render_map();
    },
    moveLeft : function(){
        if(util.isWalkable(game.character.x-1,game.character.y)){
            game.character.x -= 1;
        }
        game_logic.tick(game.character.x,game.character.y);
        map_controller.render_map();
    },
    moveUpLeft : function(){
        if(util.isWalkable(game.character.x-1,game.character.y+1)){
            game.character.x -= 1;
            game.character.y += 1;
        }
        game_logic.tick(game.character.x,game.character.y);
        map_controller.render_map();
    },
    moveUp : function(){
        if(util.isWalkable(game.character.x,game.character.y+1)){
            game.character.y += 1;
        }
        game_logic.tick(game.character.x,game.character.y);
        map_controller.render_map();
    },
    moveUpRight : function(){
        if(util.isWalkable(game.character.x+1,game.character.y+1)){
            game.character.x += 1;
            game.character.y += 1;
        }
        game_logic.tick(game.character.x,game.character.y);
        map_controller.render_map();
    },
    moveRight : function(){
        if(util.isWalkable(game.character.x+1,game.character.y)){
            game.character.x += 1;
        }
        game_logic.tick(game.character.x,game.character.y);
        map_controller.render_map();
    },
    moveDownRight : function(){
        if(util.isWalkable(game.character.x+1,game.character.y-1)){
            game.character.x += 1;
            game.character.y -= 1;
        }
        game_logic.tick(game.character.x,game.character.y);
        map_controller.render_map();
    },
    moveDown : function(){
        if(util.isWalkable(game.character.x,game.character.y-1)){
            game.character.y -= 1;
        }
        game_logic.tick(game.character.x,game.character.y);
        map_controller.render_map();
    },
    moveDownLeft : function(){
        if(util.isWalkable(game.character.x-1,game.character.y-1)){
            game.character.x -= 1;
            game.character.y -= 1;
        }
        game_logic.tick(game.character.x,game.character.y);
        map_controller.render_map();
    },
    loadGame: function (){
        var i = document.getElementById("load_game_select").value;
        util.loadGame(i);
        map_controller.render_map();
    },
    saveGame: function (){
        util.saveGame();
        map_controller.render_map();
    },
    printCredits: function(){
        game.output.push("Game by Douglas Kihlken");
        game.output.push("Special Thanks and Donators:");
        DONATORS.forEach(function (donator) {
            game.output.push(donator);
        });
    },
};