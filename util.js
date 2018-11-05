var util = {
    isWalkable: function (x, y) {
        WALKABLE_TILES.forEach(
            function (type) {
                if (world.get(x,y).type === type){
                    return true;
                }
            }
        );
        return false;
    },
    isInRange: function (x1, y1, x2, y2, max) {
        return util.getAllPointsBetween(x1, y1, x2, y2).length < max;
    },
    hasLineOfSight: function (x1, y1, x2, y2) {
        var points = util.getAllPointsBetween(x1, y1, x2, y2);
        VISION_BLOCKING_TILES.forEach(
            function (type) {
                    points.forEach(
                        function (point) {
                            if (world.get(point.x,point.y).type === type){
                                return false;
                            }
                        }
                    );
            }
        );
        return true;
    },
    slope: function(a, b){
        if (a.x === b.x) {
            return null;
        }

        return (b.y - a.y) / (b.x - a.x);
    },
    intercept: function(point, slope){
        if (slope === null) {
            return point.x;
        }

        return point.y - slope * point.y;
    },
    getAllPointsBetween: function(x1, y1, x2, y2){
        var A = {
            x:x1,
            y:y1,
        };
        var B = {
            x:x2,
            y:y2,
        };
        var m = util.slope(A, B);
        var b = util.intercept(A, m);
        var coordinates = [];
        for(var x = A.x; x <= B.x; x++){
            var y = m * x + b;
            coordinates.push({
                x:x,
                y:y,
            });
        }
        return coordinates;
    },
    findDirection: function (x1, y1, x2, y2) {
        return pathfinder.findShortestPath(x1,y1,x2,y2)[0];
    },
    findSquare: function (x, y, length) {
        return {
            x1:x+(length/2),
            x2:x-(length/2),
            y1:y+(length/2),
            y2:y-(length/2),
        };
    },
    getAllInRange: function (x, y, range) {
        var ans = [];
        for(var i=x-range; i<x+range; i++){
            for(var j=y-range; j<y+range; j++){
                if(world.get(i,j)!==null && ((((i-x)*(i-x))+((j-y)*(j-y))) <= (range*range))){
                    ans.push({
                        x:i,
                        y:j,
                    });
                }
            }
        }
        return ans;
    },
    isAround: function (x, y, npc_type) {

    },
    loadGame: function (index) {
        //Reads index and storage. If storage is null, it runs init to init the storage objects and game data
    },
    saveGame: function () {
        //reads the game data and stores it into the storage space, moving the current data into backups
    },
    init: function () {
        game.settings = {
            zoom_factor : 25,
        };
        util.generateChunk(0,0);
        util.generateChunk(1,0);
        util.generateChunk(1,1);
        util.generateChunk(0,1);
        util.generateChunk(-1,1);
        util.generateChunk(-1,0);
        util.generateChunk(-1,-1);
        util.generateChunk(0,-1);
        util.generateChunk(1,-1);
    },
    getChunk: function (x,y){
        return {
            x:x/100,
            y:y/100,
        }
    },
    generateChunk: function (x, y) {
        var r = Math.floor(Math.random() * 100); //generates random number 0-99
        r=70;
        if(r<75){
            //generate wilderness
            var monsters = util.generateChunkEnemies();
            var monster_i = 0;

            for(var i=100*x; i<100+(100*x); i++){
                for(var j=100*y; j<100+(100*y); j++){
                    if(Math.floor(Math.random() * 100) < 30){
                        world.get(i,j).type = 'wall';
                    }else{
                        world.get(i,j).type = 'grass';
                    }
                }
            }
        }else if(r>=75 && r<85){
            //generate dungeon
        }else if(r>=85){
            //generate town
        }
        //clears whatever is in the current map object and fills the hole with new terrain in the given coordinates chunk.
        //determine chunk with (x/100 - x%100 - 1). then multiply by 100 to get the starting x.
        //choose either (town, wilderness, dungeon) if >=1 quest accepted then 10% dungeon, 15% town, 75% wilderness,
        //if not then 15% town 85% wilderness
        //town          will contain npc shops and quests, spawning in given positions.
        //              Selects random shape from list, builds walls according to spec and randomly populates with nps in designated spawn zones
        //dungeon       generates enemies and a quest item for an accepted quest
        //wilderness    will contain either enemies, nothing, or loot contains a quest item needed for accepted quest and enemies fill in holes with random grass, trees, sand, snow, or dirt
    },
    generateChunkEnemies: function () {
        return [
            {

            }
        ];
        //determines character level and generates an appropriate encounter
        //monsters[]
        //name
        // max_health
        // armor
        // magic_resistance
        // attack_power
        // attack_lifesteal
        // ability_power
        // magic_lifesteal
        // Monster_attacks[monster_attack]
    },
    tick: function (x, y) {
        //simulates and makes moves for all monsters withing 500 tiles, if they exist.
    },
    generateLoot: function () {
        //generate appropriate loot for current player level
        //return items[]
    },
}