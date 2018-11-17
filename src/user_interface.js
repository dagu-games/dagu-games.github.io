let user_interface = {
    selectSpell: function(event){
        //Highlights and adds onclick methods to each object on the map.
        // Uses findSquare to select bounds, then isinrange to
        // verify the places that can be hit.

        map.render();
        view_controller.render();
    },

    buyUpgrade: function(event){
        //Changes character information to reflect the purchased upgrade and deducts a skill point

        map.render();
        view_controller.render();
    },

    zoomIncrease: function(){
        if(game.settings.zoom_factor > 3){
            game.settings.zoom_factor -= 2;
        }
        game.output.push("Zoom increased to " + game.settings.zoom_factor);
        map.render();
        view_controller.render();
    },

    zoomDecrease: function(){
        if(game.settings.zoom_factor < ZOOM_MAX){
            game.settings.zoom_factor += 2;
        }
        game.output.push("Zoom decreased to " + game.settings.zoom_factor);
        map.render();
        view_controller.render();
    },

    cancelSpell: function(){
        //Clears all highlights and removes the onclick methods from selectSpell

        map.render();
        view_controller.render();
    },

    moveLeft: function(){
        if(util.isWalkable(game.character.x - 1, game.character.y)){
            game.character.x -= 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    moveUpLeft: function(){
        if(util.isWalkable(game.character.x - 1, game.character.y + 1)){
            game.character.x -= 1;
            game.character.y += 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    moveUp: function(){
        if(util.isWalkable(game.character.x, game.character.y + 1)){
            game.character.y += 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    moveUpRight: function(){
        if(util.isWalkable(game.character.x + 1, game.character.y + 1)){
            game.character.x += 1;
            game.character.y += 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    moveRight: function(){
        if(util.isWalkable(game.character.x + 1, game.character.y)){
            game.character.x += 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    moveDownRight: function(){
        if(util.isWalkable(game.character.x + 1, game.character.y - 1)){
            game.character.x += 1;
            game.character.y -= 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    moveDown: function(){
        if(util.isWalkable(game.character.x, game.character.y - 1)){
            game.character.y -= 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    moveDownLeft: function(){
        if(util.isWalkable(game.character.x - 1, game.character.y - 1)){
            game.character.x -= 1;
            game.character.y -= 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    loadGame: function(){
        let i = document.getElementById("load_game_select").value;
        util.loadGame(i);
        map.render();
        view_controller.render();
    },

    saveGame: function(){
        util.saveGame();
        map.render();
        view_controller.render();
    },

    printCredits: function(){
        game.output.push("Game by Douglas Kihlken");
        game.output.push("Special Thanks and Donators:");
        DONATORS.forEach(function(donator){
            game.output.push(donator);
        });
        map.render();
        view_controller.render();
    },

    inspect: function(event){
        let x = $(event.target).data('x');
        let y = $(event.target).data('y');
        game.output.push("inspecting " + x + "," + y);

        game.output.push("terrain is " + map.get(x,y).type);
        if(map.get(x,y).npc != null){
            game.output.push("npc is " + map.get(x,y).npc.type);
        }
        map.render();
        view_controller.render();
    },

    equipItem: function(event){
        //check for ring data value to know what slot to put the ring into 1 or 2
        map.render();
        view_controller.render();
    },

    unequipItem: function(event){

        map.render();
        view_controller.render();
    },

    acceptQuest: function(event){

        map.render();
        view_controller.render();
    },

    abandonQuest: function(event){

        map.render();
        view_controller.render();
    },

    buyItem: function(event){

        map.render();
        view_controller.render();
    },

    sellItem: function(event){

        map.render();
        view_controller.render();
    },

    teleport: function(){
        game.character.x = Number($('#teleport_x').val());
        game.character.y = Number($('#teleport_y').val());
        map.render();
        view_controller.render();
    },

    castSpell: function(event){

    },
};