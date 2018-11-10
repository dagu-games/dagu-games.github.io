var user_interface = {
    selectSpell : function(spell_name){
        //Highlights and adds onclick methods to each object on the map.
        // Uses findSquare to select bounds, then isinrange to
        // verify the places that can be hit.

        map_controller.render_map();
    },
    buyUpgrade : function(){
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
        //moves the character left if possible

        map_controller.render_map();
    },
    moveRight : function(){
        //moves the character right if possible

        map_controller.render_map();
    },
    moveUp : function(){
        //moves the character up if possible

        map_controller.render_map();
    },
    moveDown : function(){
        //moves the character down if possible

        map_controller.render_map();
    },
    loadGame: function (index) {
        //Reads index and storage. If storage is null, it runs init to init the storage objects and game data
        var i = document.getElementById("load_game_select");
        util.loadGame(i);
        map_controller.render_map();
    },
    saveGame: function () {
        //reads the game data and stores it into the storage space, moving the current data into backups
        util.saveGame();
        map_controller.render_map();
    },
};