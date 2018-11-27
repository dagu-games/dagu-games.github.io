let util = {
    isWalkable: function(x, y){
        for(let i = 0; i < WALKABLE_TILES.length; i++){
            if(map.get(x, y).type === WALKABLE_TILES[i]
                && (map.get(x, y).npc == null ||
                    (map.get(x, y).npc.type !== "monster"
                    && map.get(x, y).npc.type !== "quest_giver"
                    && map.get(x, y).npc.type !== "shop"))){
                return true;
            }
        }
        return false;
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
        let path = pathfinder.findShortestPath(x1, y1, x2, y2);
        //console.log(path);
        if(path === false){
            return null;
        }else{
            return path[0];
        }
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
            if(map.get(points[i].x,points[i].y).npc != null && map.get(points[i].x,points[i].y).npc.type === npc_type){
                return true;
            }
        }
        return false;
    },

    loadGame: function(index){
        let str = localStorage.getItem(STORAGE_STRING);
        if(str === null){
            game_logic.init();
            util.saveGame();
            str = localStorage.getItem(STORAGE_STRING);
        }
        let saves = JSON.parse(LZString.decompressFromUTF16(str));
        //console.log(LZString.decompressFromUTF16(str));
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
            saves = JSON.parse(LZString.decompressFromUTF16(str));
        }
        let d = new Date();
        game.save_time = d.getTime();
        saves.unshift(game);

        let ans = JSON.stringify(saves);
        //console.log("size before = " + ans.length);

        ans = LZString.compressToUTF16(ans);
        //console.log(ans);
        //console.log("size after = " + ans.length);
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
        let saves = JSON.parse(LZString.decompressFromUTF16(localStorage.getItem(STORAGE_STRING)));
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

    getAvailableQuests: function(){
        let ans = [];
        for(let i = 0; i < QUESTS.SIDE.length; i++){
            if(!util.isQuestCompleted(QUESTS.SIDE[i].name)){
                ans.push(QUESTS.SIDE[i].name);
            }
        }
        let story_quest = util.getNextStoryQuest();
        if(story_quest !== null){
            ans.push(story_quest);
        }
        return ans;
    },

    getNextStoryQuest: function(){
        for(let i = 0; i < QUESTS.STORY.length; i++){
            if(!util.isQuestCompleted(QUESTS.STORY[i].name)){
                return QUESTS.STORY[i].name;
            }
        }
        return null;
    },

    isQuestCompleted: function(quest_name){
        for(let i = 0; i < game.character.completed_quests.length; i++){
            if(quest_name === game.character.completed_quests[i]){
                return true;
            }
        }
        return false;
    },

    hasQuestItem: function(quest_name){
        let quest = util.getQuest(quest_name);
        for(let i = 0; i < game.character.inventory.quest_items.length; i++){
            if(quest.goal_item === game.character.inventory.quest_items[i]){
                return true;
            }
        }
        return false;
    },

    hasQuest: function(quest_name){
        for(let i = 0; i < game.character.quests.length; i++){
            if(game.character.quests[i] === quest_name){
                return true;
            }
        }
        return false;
    },

    getRandomAvailableQuestName: function(){
        let quests = util.getAvailableQuests();
        if(quests.length > 0){
            return util.randomItemInArray(quests);
        }else{
            return null;
        }
    },

    getQuest: function(quest_name){
        for(let i = 0; i < QUESTS.SIDE.length; i++){
            if(quest_name === QUESTS.SIDE[i].name){
                return QUESTS.SIDE[i];
            }
        }
        for(let i = 0; i < QUESTS.STORY.length; i++){
            if(quest_name === QUESTS.STORY[i].name){
                return QUESTS.STORY[i];
            }
        }
        return null;
    },

    timer: function(){
        let currTime = (new Date()).getTime();
        if(this.timerNum == null || this.timerNum === 0){
            this.timerNum = currTime;
        }else{
            console.log("timer results " + (currTime-this.timerNum) + " milliseconds or " + ((currTime-this.timerNum)/1000.0));
            this.timerNum = 0;
        }
    },

    directionTowardGoalItem: function(quest_name){
        let quest = util.getQuest(quest_name);
        let points = map.getAll();
        let goal_items = [];
        for(let i = 0; i < points.length; i++){
            let map_entry = map.get(points[i].x,points[i].y);
            if(map_entry.npc != null && map_entry.npc.type === 'monster' && map_entry.npc.goal_item === quest.goal_item){
                goal_items.push(i);
            }
        }
        if(goal_items.length === 0){
            return null;
        }else{
            let min = util.distanceBetween(game.character.x,game.character.y,points[0].x,points[0].y);
            let min_i = 0;
            for(let i = 1; i < goal_items.length; i++){
                if(min > util.distanceBetween(game.character.x,game.character.y,points[goal_items[i]].x,points[goal_items[i]].y)){
                    min_i = i;
                    min = util.distanceBetween(game.character.x,game.character.y,points[goal_items[i]].x,points[goal_items[i]].y);
                }
            }
            //console.debug(map.get(points[goal_items[min_i]].x,points[goal_items[min_i]].y));
            return util.findDirection(game.character.x,game.character.y,points[goal_items[min_i]].x,points[goal_items[min_i]].y);
        }
    },

    directionTowardQuestNPC: function(quest_name){
        let quest = util.getQuest(quest_name);
        let points = map.getAll();
        let quest_givers = [];
        for(let i = 0; i < points.length; i++){
            let map_entry = map.get(points[i].x,points[i].y);
            if(map_entry.npc != null && map_entry.npc.type === 'quest_giver' && map_entry.npc.quest === quest.name){
                quest_givers.push(i);
            }
        }
        if(quest_givers.length === 0){
            return null;
        }else{
            let min = util.distanceBetween(game.character.x,game.character.y,points[0].x,points[0].y);
            let min_i = 0;
            for(let i = 1; i < quest_givers.length; i++){
                if(min > util.distanceBetween(game.character.x,game.character.y,points[quest_givers[i]].x,points[quest_givers[i]].y)){
                    min_i = i;
                    min = util.distanceBetween(game.character.x,game.character.y,points[quest_givers[i]].x,points[quest_givers[i]].y);
                }
            }
            //console.debug(map.get(points[goal_items[min_i]].x,points[goal_items[min_i]].y));
            return util.findDirection(game.character.x,game.character.y,points[quest_givers[min_i]].x,points[quest_givers[min_i]].y);
        }
    },

    distanceBetween: function(x1,y1,x2,y2){
        let a = x1 - x2;
        let b = y1 - y2;

        return Math.sqrt( a*a + b*b );
    },

    directionToText: function(direction){
        if(direction == null){
            return '?';
        }else if(direction === 0){
            return 'Right';
        }else if(direction === 1){
            return 'Up and Right';
        }else if(direction === 2){
            return 'Up';
        }else if(direction === 3){
            return 'Up and Left';
        }else if(direction === 4){
            return 'Left';
        }else if(direction === 5){
            return 'Down and Left';
        }else if(direction === 6){
            return 'Down';
        }else if(direction === 7){
            return 'Down and Right';
        }
    },

    getQuestFromGoalItem: function(goal_item_name){
        for(let i = 0; i < QUESTS.SIDE.length; i++){
            if(QUESTS.SIDE[i].goal_item === goal_item_name){
                return QUESTS.SIDE[i];
            }
        }
        for(let i = 0; i < QUESTS.STORY.length; i++){
            if(QUESTS.STORY[i].goal_item === goal_item_name){
                return QUESTS.STORY[i];
            }
        }
        return null;
    },

    hasUpgrade: function(upgrade_index){
        for(let i = 0; i < game.character.upgrades.length; i++){
            if(upgrade_index === game.character.upgrades[i]){
                return true;
            }
        }
        return false;
    },

    isInTown: function(){
        return (map.getChunk(util.getChunk(game.character.x,game.character.y).x,util.getChunk(game.character.x,game.character.y).y).type === 'town');
    },
};