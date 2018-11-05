util.loadGame();
util.saveGame();
var app = new Vue({
    el: '#app',
    data: {
        game: game,
    },
    methods: {
        selectSpell : function(spell_name){
            //Highlights and adds onclick methods to each object on the map.
            // Uses findSquare to select bounds, then isinrange to
            // verify the places that can be hit.
        },
        zoomIncrease : function(){
            if(game.settings.zoom_factor < ZOOM_MAX){
                game.settings.zoom_factor +=2;
            }
        },
        zoomDecrease : function(){
            game.settings.zoom_factor -=2;
        },
        cancelSpell : function(){
            //Clears all highlights and removes the onclick methods from selectSpell
        },
        buyUpgrade : function(){
            //Changes character information to reflect the purchased upgrade and deducts a skill point
        },
        moveLeft : function(){
            //moves the character left if possible
        },
        moveRight : function(){
            //moves the character right if possible
        },
        moveUp : function(){
            //moves the character up if possible
        },
        moveDown : function(){
            //moves the character down if possible
        },
        loadGame: function (index) {
            //Reads index and storage. If storage is null, it runs init to init the storage objects and game data
        },
        saveGame: function () {
            //reads the game data and stores it into the storage space, moving the current data into backups
        },
        
    }
});