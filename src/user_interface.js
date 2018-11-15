let user_interface = {
    selectSpell: function(event){
        //Highlights and adds onclick methods to each object on the map.
        // Uses findSquare to select bounds, then isinrange to
        // verify the places that can be hit.

        map.render();
    },

    buyUpgrade: function(event){
        //Changes character information to reflect the purchased upgrade and deducts a skill point

        map.render();
    },

    zoomIncrease: function(){
        if(game.settings.zoom_factor < ZOOM_MAX){
            game.settings.zoom_factor += 2;
        }
        game.output.push("Zoom increased to " + game.settings.zoom_factor);
        map.render();
    },

    zoomDecrease: function(){
        if(game.settings.zoom_factor > 3){
            game.settings.zoom_factor -= 2;
        }
        game.output.push("Zoom decreased to " + game.settings.zoom_factor);
        map.render();
    },

    cancelSpell: function(){
        //Clears all highlights and removes the onclick methods from selectSpell

        map.render();
    },

    moveLeft: function(){
        if(util.isWalkable(game.character.x - 1, game.character.y)){
            game.character.x -= 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
    },

    moveUpLeft: function(){
        if(util.isWalkable(game.character.x - 1, game.character.y + 1)){
            game.character.x -= 1;
            game.character.y += 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
    },

    moveUp: function(){
        if(util.isWalkable(game.character.x, game.character.y + 1)){
            game.character.y += 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
    },

    moveUpRight: function(){
        if(util.isWalkable(game.character.x + 1, game.character.y + 1)){
            game.character.x += 1;
            game.character.y += 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
    },

    moveRight: function(){
        if(util.isWalkable(game.character.x + 1, game.character.y)){
            game.character.x += 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
    },

    moveDownRight: function(){
        if(util.isWalkable(game.character.x + 1, game.character.y - 1)){
            game.character.x += 1;
            game.character.y -= 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
    },

    moveDown: function(){
        if(util.isWalkable(game.character.x, game.character.y - 1)){
            game.character.y -= 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
    },

    moveDownLeft: function(){
        if(util.isWalkable(game.character.x - 1, game.character.y - 1)){
            game.character.x -= 1;
            game.character.y -= 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
    },

    loadGame: function(){
        let i = document.getElementById("load_game_select").value;
        util.loadGame(i);
        map.render();
    },

    saveGame: function(){
        util.saveGame();
        map.render();
    },

    printCredits: function(){
        game.output.push("Game by Douglas Kihlken");
        game.output.push("Special Thanks and Donators:");
        DONATORS.forEach(function(donator){
            game.output.push(donator);
        });
    },

    inspect: function(event){

    },

    equipItem: function(event){
        //check for ring data value to know what slot to put the ring into 1 or 2
    },

    unequipItem: function(event){

    },

    acceptQuest: function(event){

    },

    abandonQuest: function(event){

    },

    buyItem: function(event){

    },

    sellItem: function(event){

    },
};