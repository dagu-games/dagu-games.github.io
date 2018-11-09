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
        return( world.get(x+1,y).type === npc_type ||
            world.get(x+1,y+1).type === npc_type ||
            world.get(x,y+1).type === npc_type ||
            world.get(x-1,y).type === npc_type ||
            world.get(x,y-1).type === npc_type ||
            world.get(x-1,y-1).type === npc_type ||
            world.get(x+1,y-1).type === npc_type ||
            world.get(x-1,y+1).type === npc_type
        );
    },

    loadGame: function (index) {
        var str = localStorage.getItem("dagu_saves_array");
        if(str == null){
            game_logic.init();
            util.saveGame();
            str = localStorage.getItem("dagu_saves_array");
        }
        var saves = JSON.parse(str);
        if(index==null){
            game = saves[0];
        }else{
            game = saves[index];
        }
    },

    saveGame: function () {
        var str = localStorage.getItem("dagu_saves_array");
        var saves;
        if(str == null){
            saves = [];
        }else{
            saves = JSON.parse(str);
        }
        saves.push(game);

        localStorage.setItem("dagu_saves_array",JSON.stringify(saves));
    },

    getChunk: function (x,y){
        return {
            x:x/100,
            y:y/100,
        };
    },

    randomInt: function(max){
        if(max=null){
            return Math.floor(Math.random() * 2);
        }
        return Math.floor(Math.random() * max);
    },

    randomItemInArray: function(arr){
        return arr[util.randomInt(arr.length)];
    },

    typeToTile: function (type) {
        if(type==="grass"){
            return GRASS_ICON;
        }
        if(type==="wall"){
            return WALL_ICON;
        }
    },

};