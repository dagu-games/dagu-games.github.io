let util = {
    isWalkable: function(x, y){
        for(let i = 0; i < WALKABLE_TILES.length; i++){
            if(map.get(x, y).type === WALKABLE_TILES[i] &&
                (map.get(x, y).npc == null ||
                    (map.get(x, y).npc.type !== "monster"
                    && map.get(x, y).npc.type !== "quest_giver"
                    && map.get(x, y).npc.type !== "shop"))){
                return true;
            }
        }
        return false;
    },

    isInRange: function(x1, y1, x2, y2, max){
        return util.getAllPointsBetween(x1, y1, x2, y2).length < max;
    },

    hasLineOfSight: function(x1, y1, x2, y2){
        let points = util.getAllPointsBetween(x1, y1, x2, y2);
        VISION_BLOCKING_TILES.forEach(
            function(type){
                points.forEach(
                    function(point){
                        if(map.get(point.x, point.y).type === type){
                            return false;
                        }
                    }
                );
            }
        );
        return true;
    },

    slope: function(a, b){
        if(a.x === b.x){
            return null;
        }

        return (b.y - a.y) / (b.x - a.x);
    },

    intercept: function(point, slope){
        if(slope === null){
            return point.x;
        }

        return point.y - slope * point.y;
    },

    getAllPointsBetween: function(x1, y1, x2, y2){
        let A = {
            x: x1,
            y: y1,
        };
        let B = {
            x: x2,
            y: y2,
        };
        let m = util.slope(A, B);
        let b = util.intercept(A, m);
        let coordinates = [];
        for(let x = A.x; x <= B.x; x++){
            let y = m * x + b;
            coordinates.push({
                x: x,
                y: y,
            });
        }
        return coordinates;
    },

    findDirection: function(x1, y1, x2, y2){
        return pathfinder.findShortestPath(x1, y1, x2, y2)[0];
    },

    getAllInSquare: function(x, y, length){
        let ans = [];
        for( let i = x - ((length-1) / 2); i < x + ((length-1) / 2); i++){
            for( let j = y - ((length-1) / 2); j < y + ((length-1) / 2); j++){
                ans.push({
                    x:i,
                    y:j,
                });
            }
        }
        return ans;
    },

    getAllInRange: function(x, y, range){
        let ans = [];
        for(let i = x - range; i < x + range; i++){
            for(let j = y - range; j < y + range; j++){
                if(map.get(i, j) !== null && ((((i - x) * (i - x)) + ((j - y) * (j - y))) <= (range * range))){
                    ans.push({
                        x: i,
                        y: j,
                    });
                }
            }
        }
        return ans;
    },

    getAround: function(x,y){
        return [
            {
                x:x+1,
                y:y,
            },
            {
                x:x+1,
                y:y+1,
            },
            {
                x:x,
                y:y+1,
            },
            {
                x:x-1,
                y:y+1,
            },
            {
                x:x-1,
                y:y,
            },
            {
                x:x-1,
                y:y-1,
            },
            {
                x:x,
                y:y-1,
            },
            {
                x:x+1,
                y:y-1,
            },
        ];
    },

    isAround: function(x, y, npc_type){
        let points = util.getAround(x,y);
        for(let i = 0; i < points.length; i++){

        }
    },

    loadGame: function(index){
        let str = localStorage.getItem(STORAGE_STRING);
        if(str === null){
            game_logic.init();
            util.saveGame();
            str = localStorage.getItem(STORAGE_STRING);
        }
        let saves = JSON.parse(LZString.decompress(str));
        if(index == null){
            game = saves[0];
        }else{
            game = saves[index];
        }
    },

    saveGame: function(){
        let str = localStorage.getItem(STORAGE_STRING);
        let saves;
        if(str == null){
            saves = [];
        }else{
            saves = JSON.parse(LZString.decompress(str));
        }
        let d = new Date();
        game.save_time = d.getTime();
        saves.push(game);

        let ans = JSON.stringify(saves);
        console.log("size before = " + ans.length);

        ans = LZString.compress(ans);
        console.log("size after = " + ans.length);
        localStorage.setItem(STORAGE_STRING, ans);
    },

    getChunk: function(x, y){
        if(x >= 0 && y >= 0){
            return {
                x: Math.floor(x / CHUNK_SIZE),
                y: Math.floor(y / CHUNK_SIZE),
            };
        }else if(x >= 0 && y < 0){
            return {
                x: Math.floor(x / CHUNK_SIZE),
                y: Math.ceil((y+1) / CHUNK_SIZE) - 1,
            };
        }else if(x < 0 && y >= 0){
            return {
                x: Math.ceil((x+1) / CHUNK_SIZE) - 1,
                y: Math.floor(y / CHUNK_SIZE),
            };
        }else{
            return {
                x: Math.ceil((x+1) / CHUNK_SIZE) - 1,
                y: Math.ceil((y+1) / CHUNK_SIZE) - 1,
            };
        }
    },

    randomInt: function(max){
        if(max === null){
            return Math.floor(Math.random() * 2);
        }
        return Math.floor(Math.random() * max);
    },

    randomItemInArray: function(arr){
        return arr[util.randomInt(arr.length)];
    },

    typeToSrcString: function(type){
        if(type === "grass"){
            return GRASS_ICON;
        }
        if(type === "tree"){
            return TREE_ICON;
        }
        if(type === "dirt"){
            return DIRT_ICON;
        }
        if(type === "stone"){
            return STONE_ICON;
        }
        if(type === "quest_giver" || type === "shop"){
            return NPC_ICON;
        }
        if(type === "monster"){
            return HELLHOUND_ICON;
        }
        if(type === "wall"){
            return WALL_ICON;
        }
        if(type === "hero"){
            return HERO_ICON;
        }
    },

    getSavesList: function(){
        let ans = [];
        let saves = JSON.parse(LZString.decompress(localStorage.getItem(STORAGE_STRING)));
        for(let i = 0; i < saves.length; i++){
            ans.push({
                time: saves[i].save_time,
                index: i,
            });
        }
        return ans;
    },

    canCast: function(spell_name){
        return game.character.current_mana <= character_attack.getAttack(spell_name).mana_cost;
    },

    formatTime: function(time){
        let d = new Date(time);
        return d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    },

    getAllMonsters: function(){
        let monsters = [];
        let points = map.getAll();
        for(let i = 0; i < points.length; i++){
            if(map.get(points[i].x, points[i].y).npc != null && map.get(points[i].x, points[i].y).npc.type === "monster"){
                monsters.push({
                    x: points[i].x,
                    y: points[i].y,
                });
            }
        }
        return monsters;
    },

    getExperienceNeededForLevel: function(level){
        return Math.floor(EXP_MULTIPLIER * (Math.pow(level, EXP_EXPONENT)));
    },

    dumpWorld: function(){
        let points = map.getAll();
        for(let i = 0; i < points.length; i++){
            console.debug(map.get(points[i].x,points[i].y));
        }
    },

    isPathable: function(x,y){
        return pathfinder.findShortestPath(0,0,x,y) !== false;
    },

};