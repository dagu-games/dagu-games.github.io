var util = {
    isInRange : function(x1,y1,x2,y2,max){
        //calculates the distance between the two points and returns true if it is less than or equal to the max
        return true;
    },
    hasLineOfSight : function(x1,y1,x2,y2){
        //returns true if there are no walls and <4 trees between the two points
    },
    findDirection : function (x1,y1,x2,y2){
        //returns 0-7 depending on the direction to the second point from the first
    },
    getAllInRange : function(x,y,range){
        //Returns array of x and y points within range given
    },
    loadGame : function(){
        if(window.localStorage.getItem("dagu_savedata") == null){

        }
        //reads the stored data and puts it into the game object
    },
    saveGame : function () {
        console.log("test");
        //stores the current data into the backups object
    },
    initGame : function () {
        //initiallizes the game object with necessary data if there was no data retrieved from loadGame()
    },
    moveLeft : function(){
        //moves the character left if possible
        this.updateMap();
    },
    moveRight : function(){
        //moves the character right if possible
        this.updateMap();
    },
    moveUp : function(){
        //moves the character up if possible
        this.updateMap();
    },
    moveDown : function(){
        //moves the character down if possible
        this.updateMap();
    },
    generateChunk : function(x,y){
        //calculates the chunk coordinates and fills that area with stuff
        // clears whatever is in the current map object and fills the hole with new terrain in the given coordinates chunk
        // determine chunk with (x/100 - x%100 - 1)
        //     then multiply by 100 to get the starting x
        // choose either (town, wilderness, dungeon) if >=1 quest accepted then 10% dungeon, 15% town, 75% wilderness, if not then 15% town 85% wilderness
        // town - will contain a shop, quest, and upgrade npc
        // wilderness - will contain either enemies, nothing, or loot
        // dungeon - contains a quest item needed for accepted quest and enemies
        // choose a terrain theme for the area (snow, grass, desert) then fill in holes with random grass, trees, sand, snow, or dirt

    },
    generateChunkEnemies : function(){
        //generates an array of monsters to put into a chunk with stats, attacks, etc for each monster
    },


};