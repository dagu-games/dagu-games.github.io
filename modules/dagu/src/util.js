let util = {
    imageLoader: function(){
        map_icons_loaded++;
        if(map_icons_loaded >= map_icons_to_load){
            map_render_locked = false;
            map.render();
        }
    },

    resizeCanvas: function(){
        let canvas = document.getElementById('map');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    },

    loadGame: function(index){
        let str = localStorage.getItem(STORAGE_STRING);
        if(str === null){
            game_logic.init();
            util.saveGame();
            str = localStorage.getItem(STORAGE_STRING);
        }
        let saves = JSON.parse(LZString.decompressFromUTF16(str));

        let save;
        if(index == null){
            save = saves[0];
        }else{
            save = saves[index];
        }

        if(save.build_number < BUILD_NUMBER){
            game_logic.init();
            util.saveGame();
            str = localStorage.getItem(STORAGE_STRING);
            saves = JSON.parse(LZString.decompressFromUTF16(str));
            if(index == null){
                save = saves[0];
            }else{
                save = saves[index];
            }
        }

        game = save;
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

        if(saves.length > SAVES_LIMIT){
            saves.pop();
        }

        let ans = JSON.stringify(saves);
        //console.log("size before = " + ans.length);

        ans = LZString.compressToUTF16(ans);
        //console.log(ans);
        //console.log("size after = " + ans.length);
        localStorage.setItem(STORAGE_STRING, ans);
    },

    isWalkable: function(x, y){
        let map_entry = map.get(x, y);
        return (map_entry.npc == null && map_entry.object == null);
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

    isPathable: function(x,y){
        return pathfinder.findShortestPath(game.character.x,game.character.y,x,y) !== false;
    },

    isInTown: function(){
        return (map.getChunk(util.getChunk(game.character.x,game.character.y).x,util.getChunk(game.character.x,game.character.y).y).type === 'town');
    },

    isInArray: function(arr, value){
        if(arr == null || value == null || arr.length < 1){
            return false;
        }
        for(let i = 0; i < arr.length; i++){
            if(arr[i] === value){
                return true;
            }
        }
        return false;
    },

    hasLineOfSight: function(x1, y1, x2, y2){
        let points = util.getAllPointsBetween(x1, y1, x2, y2);
        points.forEach(
            function(point){
                if(map.get(point.x, point.y).object != null || map.get(point.x, point.y).npc != null){
                    return false;
                }
            }
        );
        return true;
    },

    hasUpgrade: function(upgrade_index){
        for(let i = 0; i < game.character.upgrades.length; i++){
            if(upgrade_index === game.character.upgrades[i]){
                return true;
            }
        }
        return false;
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
        let m = util.getSlope(A, B);
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

    getAllMonstersByNames: function(monster_names){
        let monsters = [];
        let points = map.getAll();
        for(let i = 0; i < points.length; i++){
            if(map.get(points[i].x, points[i].y).npc != null && map.get(points[i].x, points[i].y).npc.type === "monster" && util.isInArray(monster_names, map.get(points[i].x, points[i].y).npc.name)){
                monsters.push({
                    x: points[i].x,
                    y: points[i].y,
                });
            }
        }
        return monsters;
    },

    getNearestMonsterByNames: function(monster_names){
        let monsters = util.getAllMonstersByNames(monster_names);
        if(monsters.length < 1){
            return null;
        }
        let min_i = 0;
        let min = util.distanceBetween(game.character.x, game.character.y, monsters[0].x, monsters[0].y);
        for(let i = 0; i < monsters.length; i++){
            if(util.distanceBetween(game.character.x, game.character.y, monsters[i].x, monsters[i].y) < min){
                min_i = i;
                min = util.distanceBetween(game.character.x, game.character.y, monsters[i].x, monsters[i].y);
            }
        }
        return monsters[min_i];
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
            {
                x:x+2,
                y:y,
            },
            {
                x:x+2,
                y:y+1,
            },
            {
                x:x+2,
                y:y+2,
            },
            {
                x:x+1,
                y:y+2,
            },
            {
                x:x,
                y:y+2,
            },
            {
                x:x-1,
                y:y+2,
            },
            {
                x:x-2,
                y:y+2,
            },
            {
                x:x-2,
                y:y+1,
            },
            {
                x:x-2,
                y:y,
            },
            {
                x:x-2,
                y:y-1,
            },
            {
                x:x-2,
                y:y-2,
            },
            {
                x:x-1,
                y:y-2,
            },
            {
                x:x,
                y:y-2,
            },
            {
                x:x+1,
                y:y-2,
            },
            {
                x:x+2,
                y:y-2,
            },
            {
                x:x+2,
                y:y-1,
            },
        ];
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

    getExperienceNeededForLevel: function(level){
        return Math.floor(EXP_MULTIPLIER * (Math.pow(level, EXP_EXPONENT)));
    },

    getRandomName: function(){
        return util.getRandomItemInArray(NPC_FIRST_NAMES) + " " + util.getRandomItemInArray(NPC_MIDDLE_NAMES) + " " + util.getRandomItemInArray(NPC_LAST_NAMES);
    },

    getRandomInt: function(max){
        if(max === null){
            return Math.floor(Math.random() * 2);
        }
        return Math.floor(Math.random() * max);
    },

    getRandomItemInArray: function(arr){
        return arr[util.getRandomInt(arr.length)];
    },

    getSlope: function(a, b){
        if(a.x === b.x){
            return null;
        }

        return (b.y - a.y) / (b.x - a.x);
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

    intercept: function(point, slope){
        if(slope === null){
            return point.x;
        }

        return point.y - slope * point.y;
    },

    tileToImage: function(tile){
        if(tile === "grass"){
            return MAP_ICONS.TILES.GRASS;
        }
        if(tile === "stone"){
            return MAP_ICONS.TILES.STONE;
        }
    },

    objectToImage: function(object){
        if(object === "bush"){
            return MAP_ICONS.OBJECTS.BUSH;
        }
        if(object === "tree"){
            return MAP_ICONS.OBJECTS.TREE;
        }
        if(object === "wall"){
            return MAP_ICONS.TILES.WALL;
        }
    },

    formatTime: function(time){
        let d = new Date(time);
        return d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    },

    dumpWorld: function(){
        let points = map.getAll();
        for(let i = 0; i < points.length; i++){
            console.debug(map.get(points[i].x,points[i].y));
        }
    },

    timer: function(){
        let currTime = (new Date()).getTime();
        if(this.timerNum == null || this.timerNum === 0){
            this.timerNum = currTime;
        }else{
            console.log("timer results " + (currTime-this.timerNum) + " milliseconds or " + ((currTime-this.timerNum)/1000.0) + " seconds");
            this.timerNum = 0;
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
            return 'Up';
        }else if(direction === 2){
            return 'Left';
        }else if(direction === 3){
            return 'Down';
        }
    },

    normalizeStat: function(stat){
        if(stat == null || stat <= 0){
            return 0;
        }else if(stat === 1){
            return 1;
        }else if(stat === 2){
            return 2;
        }else if(stat > 2 && stat < 1745){
            return Math.floor((15.0 * Math.log(stat)) - 12.0);
        }else{
            return 100;
        }
    },

    giveCharacterMana: function(amount){
        if(game.character.current_mana < util.characterStats.max_mana()){
            game.character.current_mana += amount;
            if(game.character.current_mana > util.characterStats.max_mana()){
                game.character.current_mana = util.characterStats.max_mana();
            }
        }
    },

    healCharacter: function(amount){
        if(game.character.current_health < util.characterStats.max_health()){
            game.character.current_health += amount;
            if(game.character.current_health > util.characterStats.max_health()){
                game.character.current_health = util.characterStats.max_health();
            }
        }
    },

    damageCharacter: function(damage){
        game.character.current_health -= damage;
        if(game.character.current_health <= 0){
            game.character.current_health = util.characterStats.max_health();
            game.character.x = game.character.home_x;
            game.character.y = game.character.home_y;
            game.output.push('You Died, returning you home...');
        }
    },

    healMonster: function(monster_x, monster_y, amount){
        let monster = map.get(monster_x,monster_y).npc;
        if(monster.current_health < monster.max_health){
            map.get(monster_x,monster_y).npc.current_health += amount;
            if(map.get(monster_x,monster_y).npc.current_health > map.get(monster_x,monster_y).npc.max_health){
                map.get(monster_x,monster_y).npc.current_health = map.get(monster_x,monster_y).npc.max_health;
            }
        }
    },

    shuffle: function(arr){
        let j, x, i;
        for(i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = arr[i];
            arr[i] = arr[j];
            arr[j] = x;
        }
        return arr;
    },

    getWeightedRandomDungeon: function(){
        let r = util.getRandomInt(100);
        let list = [];
        for(let i = 0; i < DUNGEONS.length; i++){
            if(r < DUNGEONS[i].rarity){
                list.push(DUNGEONS[i]);
            }
        }
        return util.getRandomItemInArray(list);
    },

    getWeightedRandomTown: function(){
        let r = util.getRandomInt(100);
        let list = [];
        for(let i = 0; i < TOWNS.length; i++){
            if(r < TOWNS[i].rarity){
                list.push(TOWNS[i]);
            }
        }
        return util.getRandomItemInArray(list);
    },

    getCondensedInventory: function(){
        let ans = [];
        for(let i = 0; i < game.character.inventory.items.length; i++){
            let found = false;
            for(let j = 0; j < ans.length; j++){
                if(game.character.inventory.items[i].type !== ITEM_TYPES.EQUIPMENT && game.character.inventory.items[i].name === ans[j].name){
                    ans[j].num = ans[j].num + 1;
                    found = true;
                }
            }
            if(!found){
                ans.push(game.character.inventory.items[i]);
                ans[ans.length-1].num = 1;
                ans[ans.length-1].index = i;
            }
        }
        return ans;
    },

    getCondensedGoalItems: function(){
        let ans = [];
        for(let i = 0; i < game.character.inventory.items.length; i++){
            let found = false;
            for(let j = 0; j < ans.length; j++){
                if(game.character.inventory.items[i].type === ITEM_TYPES.GOAL_ITEM && game.character.inventory.items[i].name === ans[j].name){
                    ans[j].num = ans[j].num + 1;
                    found = true;
                }
            }
            if(!found){
                ans.push(game.character.inventory.items[i]);
                ans[ans.length-1].num = 1;
                ans[ans.length-1].index = i;
            }
        }
        return ans;
    },

    getCondensedConsumables: function(){
        let ans = [];
        for(let i = 0; i < game.character.inventory.items.length; i++){
            let found = false;
            for(let j = 0; j < ans.length; j++){
                if(game.character.inventory.items[i].type === ITEM_TYPES.CONSUMABLE && game.character.inventory.items[i].name === ans[j].name){
                    ans[j].num = ans[j].num + 1;
                    found = true;
                }
            }
            if(!found){
                ans.push(game.character.inventory.items[i]);
                ans[ans.length-1].num = 1;
                ans[ans.length-1].index = i;
            }
        }
        return ans;
    },

    characterStats: {
        attack_power:function(){
            let attack_power = game.character.attack_power;
            if(game.character.equipped_items.helmet != null){
                attack_power += game.character.equipped_items.helmet.stats.attack_power;
            }
            if(game.character.equipped_items.shoulders != null){
                attack_power += game.character.equipped_items.shoulders.stats.attack_power;
            }
            if(game.character.equipped_items.gauntlets != null){
                attack_power += game.character.equipped_items.gauntlets.stats.attack_power;
            }
            if(game.character.equipped_items.chest != null){
                attack_power += game.character.equipped_items.chest.stats.attack_power;
            }
            if(game.character.equipped_items.belt != null){
                attack_power += game.character.equipped_items.belt.stats.attack_power;
            }
            if(game.character.equipped_items.pants != null){
                attack_power += game.character.equipped_items.pants.stats.attack_power;
            }
            if(game.character.equipped_items.boots != null){
                attack_power += game.character.equipped_items.boots.stats.attack_power;
            }
            if(game.character.equipped_items.main_hand != null){
                attack_power += game.character.equipped_items.main_hand.stats.attack_power;
            }
            if(game.character.equipped_items.off_hand != null){
                attack_power += game.character.equipped_items.off_hand.stats.attack_power;
            }
            if(game.character.equipped_items.necklace != null){
                attack_power += game.character.equipped_items.necklace.stats.attack_power;
            }
            if(game.character.equipped_items.ring1 != null){
                attack_power += game.character.equipped_items.ring1.stats.attack_power;
            }
            if(game.character.equipped_items.ring2 != null){
                attack_power += game.character.equipped_items.ring2.stats.attack_power;
            }
            return attack_power;
        },
        attack_lifesteal:function(){
            let attack_lifesteal = game.character.attack_lifesteal;
            if(game.character.equipped_items.helmet != null){
                attack_lifesteal += game.character.equipped_items.helmet.stats.attack_lifesteal;
            }
            if(game.character.equipped_items.shoulders != null){
                attack_lifesteal += game.character.equipped_items.shoulders.stats.attack_lifesteal;
            }
            if(game.character.equipped_items.gauntlets != null){
                attack_lifesteal += game.character.equipped_items.gauntlets.stats.attack_lifesteal;
            }
            if(game.character.equipped_items.chest != null){
                attack_lifesteal += game.character.equipped_items.chest.stats.attack_lifesteal;
            }
            if(game.character.equipped_items.belt != null){
                attack_lifesteal += game.character.equipped_items.belt.stats.attack_lifesteal;
            }
            if(game.character.equipped_items.pants != null){
                attack_lifesteal += game.character.equipped_items.pants.stats.attack_lifesteal;
            }
            if(game.character.equipped_items.boots != null){
                attack_lifesteal += game.character.equipped_items.boots.stats.attack_lifesteal;
            }
            if(game.character.equipped_items.main_hand != null){
                attack_lifesteal += game.character.equipped_items.main_hand.stats.attack_lifesteal;
            }
            if(game.character.equipped_items.off_hand != null){
                attack_lifesteal += game.character.equipped_items.off_hand.stats.attack_lifesteal;
            }
            if(game.character.equipped_items.necklace != null){
                attack_lifesteal += game.character.equipped_items.necklace.stats.attack_lifesteal;
            }
            if(game.character.equipped_items.ring1 != null){
                attack_lifesteal += game.character.equipped_items.ring1.stats.attack_lifesteal;
            }
            if(game.character.equipped_items.ring2 != null){
                attack_lifesteal += game.character.equipped_items.ring2.stats.attack_lifesteal;
            }
            return attack_lifesteal;
        },
        armor:function(){
            let armor = game.character.armor;
            if(game.character.equipped_items.helmet != null){
                armor += game.character.equipped_items.helmet.stats.armor;
            }
            if(game.character.equipped_items.shoulders != null){
                armor += game.character.equipped_items.shoulders.stats.armor;
            }
            if(game.character.equipped_items.gauntlets != null){
                armor += game.character.equipped_items.gauntlets.stats.armor;
            }
            if(game.character.equipped_items.chest != null){
                armor += game.character.equipped_items.chest.stats.armor;
            }
            if(game.character.equipped_items.belt != null){
                armor += game.character.equipped_items.belt.stats.armor;
            }
            if(game.character.equipped_items.pants != null){
                armor += game.character.equipped_items.pants.stats.armor;
            }
            if(game.character.equipped_items.boots != null){
                armor += game.character.equipped_items.boots.stats.armor;
            }
            if(game.character.equipped_items.main_hand != null){
                armor += game.character.equipped_items.main_hand.stats.armor;
            }
            if(game.character.equipped_items.off_hand != null){
                armor += game.character.equipped_items.off_hand.stats.armor;
            }
            if(game.character.equipped_items.necklace != null){
                armor += game.character.equipped_items.necklace.stats.armor;
            }
            if(game.character.equipped_items.ring1 != null){
                armor += game.character.equipped_items.ring1.stats.armor;
            }
            if(game.character.equipped_items.ring2 != null){
                armor += game.character.equipped_items.ring2.stats.armor;
            }
            return armor;
        },
        magic_power:function(){
            let magic_power = game.character.magic_power;
            if(game.character.equipped_items.helmet != null){
                magic_power += game.character.equipped_items.helmet.stats.magic_power;
            }
            if(game.character.equipped_items.shoulders != null){
                magic_power += game.character.equipped_items.shoulders.stats.magic_power;
            }
            if(game.character.equipped_items.gauntlets != null){
                magic_power += game.character.equipped_items.gauntlets.stats.magic_power;
            }
            if(game.character.equipped_items.chest != null){
                magic_power += game.character.equipped_items.chest.stats.magic_power;
            }
            if(game.character.equipped_items.belt != null){
                magic_power += game.character.equipped_items.belt.stats.magic_power;
            }
            if(game.character.equipped_items.pants != null){
                magic_power += game.character.equipped_items.pants.stats.magic_power;
            }
            if(game.character.equipped_items.boots != null){
                magic_power += game.character.equipped_items.boots.stats.magic_power;
            }
            if(game.character.equipped_items.main_hand != null){
                magic_power += game.character.equipped_items.main_hand.stats.magic_power;
            }
            if(game.character.equipped_items.off_hand != null){
                magic_power += game.character.equipped_items.off_hand.stats.magic_power;
            }
            if(game.character.equipped_items.necklace != null){
                magic_power += game.character.equipped_items.necklace.stats.magic_power;
            }
            if(game.character.equipped_items.ring1 != null){
                magic_power += game.character.equipped_items.ring1.stats.magic_power;
            }
            if(game.character.equipped_items.ring2 != null){
                magic_power += game.character.equipped_items.ring2.stats.magic_power;
            }
            return magic_power;
        },
        magic_lifesteal:function(){
            let magic_lifesteal = game.character.magic_lifesteal;
            if(game.character.equipped_items.helmet != null){
                magic_lifesteal += game.character.equipped_items.helmet.stats.magic_lifesteal;
            }
            if(game.character.equipped_items.shoulders != null){
                magic_lifesteal += game.character.equipped_items.shoulders.stats.magic_lifesteal;
            }
            if(game.character.equipped_items.gauntlets != null){
                magic_lifesteal += game.character.equipped_items.gauntlets.stats.magic_lifesteal;
            }
            if(game.character.equipped_items.chest != null){
                magic_lifesteal += game.character.equipped_items.chest.stats.magic_lifesteal;
            }
            if(game.character.equipped_items.belt != null){
                magic_lifesteal += game.character.equipped_items.belt.stats.magic_lifesteal;
            }
            if(game.character.equipped_items.pants != null){
                magic_lifesteal += game.character.equipped_items.pants.stats.magic_lifesteal;
            }
            if(game.character.equipped_items.boots != null){
                magic_lifesteal += game.character.equipped_items.boots.stats.magic_lifesteal;
            }
            if(game.character.equipped_items.main_hand != null){
                magic_lifesteal += game.character.equipped_items.main_hand.stats.magic_lifesteal;
            }
            if(game.character.equipped_items.off_hand != null){
                magic_lifesteal += game.character.equipped_items.off_hand.stats.magic_lifesteal;
            }
            if(game.character.equipped_items.necklace != null){
                magic_lifesteal += game.character.equipped_items.necklace.stats.magic_lifesteal;
            }
            if(game.character.equipped_items.ring1 != null){
                magic_lifesteal += game.character.equipped_items.ring1.stats.magic_lifesteal;
            }
            if(game.character.equipped_items.ring2 != null){
                magic_lifesteal += game.character.equipped_items.ring2.stats.magic_lifesteal;
            }
            return magic_lifesteal;
        },
        magic_resistance:function(){
            let magic_resistance = game.character.magic_resistance;
            if(game.character.equipped_items.helmet != null){
                magic_resistance += game.character.equipped_items.helmet.stats.magic_resistance;
            }
            if(game.character.equipped_items.shoulders != null){
                magic_resistance += game.character.equipped_items.shoulders.stats.magic_resistance;
            }
            if(game.character.equipped_items.gauntlets != null){
                magic_resistance += game.character.equipped_items.gauntlets.stats.magic_resistance;
            }
            if(game.character.equipped_items.chest != null){
                magic_resistance += game.character.equipped_items.chest.stats.magic_resistance;
            }
            if(game.character.equipped_items.belt != null){
                magic_resistance += game.character.equipped_items.belt.stats.magic_resistance;
            }
            if(game.character.equipped_items.pants != null){
                magic_resistance += game.character.equipped_items.pants.stats.magic_resistance;
            }
            if(game.character.equipped_items.boots != null){
                magic_resistance += game.character.equipped_items.boots.stats.magic_resistance;
            }
            if(game.character.equipped_items.main_hand != null){
                magic_resistance += game.character.equipped_items.main_hand.stats.magic_resistance;
            }
            if(game.character.equipped_items.off_hand != null){
                magic_resistance += game.character.equipped_items.off_hand.stats.magic_resistance;
            }
            if(game.character.equipped_items.necklace != null){
                magic_resistance += game.character.equipped_items.necklace.stats.magic_resistance;
            }
            if(game.character.equipped_items.ring1 != null){
                magic_resistance += game.character.equipped_items.ring1.stats.magic_resistance;
            }
            if(game.character.equipped_items.ring2 != null){
                magic_resistance += game.character.equipped_items.ring2.stats.magic_resistance;
            }
            return magic_resistance;
        },
        max_health:function(){
            let max_health = game.character.max_health;
            if(game.character.equipped_items.helmet != null){
                max_health += game.character.equipped_items.helmet.stats.max_health;
            }
            if(game.character.equipped_items.shoulders != null){
                max_health += game.character.equipped_items.shoulders.stats.max_health;
            }
            if(game.character.equipped_items.gauntlets != null){
                max_health += game.character.equipped_items.gauntlets.stats.max_health;
            }
            if(game.character.equipped_items.chest != null){
                max_health += game.character.equipped_items.chest.stats.max_health;
            }
            if(game.character.equipped_items.belt != null){
                max_health += game.character.equipped_items.belt.stats.max_health;
            }
            if(game.character.equipped_items.pants != null){
                max_health += game.character.equipped_items.pants.stats.max_health;
            }
            if(game.character.equipped_items.boots != null){
                max_health += game.character.equipped_items.boots.stats.max_health;
            }
            if(game.character.equipped_items.main_hand != null){
                max_health += game.character.equipped_items.main_hand.stats.max_health;
            }
            if(game.character.equipped_items.off_hand != null){
                max_health += game.character.equipped_items.off_hand.stats.max_health;
            }
            if(game.character.equipped_items.necklace != null){
                max_health += game.character.equipped_items.necklace.stats.max_health;
            }
            if(game.character.equipped_items.ring1 != null){
                max_health += game.character.equipped_items.ring1.stats.max_health;
            }
            if(game.character.equipped_items.ring2 != null){
                max_health += game.character.equipped_items.ring2.stats.max_health;
            }
            return BASE_HEALTH + util.normalizeStat(max_health);
        },
        health_regeneration:function(){
            let health_regeneration = game.character.health_regeneration;
            if(game.character.equipped_items.helmet != null){
                health_regeneration += game.character.equipped_items.helmet.stats.health_regeneration;
            }
            if(game.character.equipped_items.shoulders != null){
                health_regeneration += game.character.equipped_items.shoulders.stats.health_regeneration;
            }
            if(game.character.equipped_items.gauntlets != null){
                health_regeneration += game.character.equipped_items.gauntlets.stats.health_regeneration;
            }
            if(game.character.equipped_items.chest != null){
                health_regeneration += game.character.equipped_items.chest.stats.health_regeneration;
            }
            if(game.character.equipped_items.belt != null){
                health_regeneration += game.character.equipped_items.belt.stats.health_regeneration;
            }
            if(game.character.equipped_items.pants != null){
                health_regeneration += game.character.equipped_items.pants.stats.health_regeneration;
            }
            if(game.character.equipped_items.boots != null){
                health_regeneration += game.character.equipped_items.boots.stats.health_regeneration;
            }
            if(game.character.equipped_items.main_hand != null){
                health_regeneration += game.character.equipped_items.main_hand.stats.health_regeneration;
            }
            if(game.character.equipped_items.off_hand != null){
                health_regeneration += game.character.equipped_items.off_hand.stats.health_regeneration;
            }
            if(game.character.equipped_items.necklace != null){
                health_regeneration += game.character.equipped_items.necklace.stats.health_regeneration;
            }
            if(game.character.equipped_items.ring1 != null){
                health_regeneration += game.character.equipped_items.ring1.stats.health_regeneration;
            }
            if(game.character.equipped_items.ring2 != null){
                health_regeneration += game.character.equipped_items.ring2.stats.health_regeneration;
            }
            return health_regeneration;
        },
        max_mana:function(){
            let max_mana = game.character.max_mana;
            if(game.character.equipped_items.helmet != null){
                max_mana += game.character.equipped_items.helmet.stats.max_mana;
            }
            if(game.character.equipped_items.shoulders != null){
                max_mana += game.character.equipped_items.shoulders.stats.max_mana;
            }
            if(game.character.equipped_items.gauntlets != null){
                max_mana += game.character.equipped_items.gauntlets.stats.max_mana;
            }
            if(game.character.equipped_items.chest != null){
                max_mana += game.character.equipped_items.chest.stats.max_mana;
            }
            if(game.character.equipped_items.belt != null){
                max_mana += game.character.equipped_items.belt.stats.max_mana;
            }
            if(game.character.equipped_items.pants != null){
                max_mana += game.character.equipped_items.pants.stats.max_mana;
            }
            if(game.character.equipped_items.boots != null){
                max_mana += game.character.equipped_items.boots.stats.max_mana;
            }
            if(game.character.equipped_items.main_hand != null){
                max_mana += game.character.equipped_items.main_hand.stats.max_mana;
            }
            if(game.character.equipped_items.off_hand != null){
                max_mana += game.character.equipped_items.off_hand.stats.max_mana;
            }
            if(game.character.equipped_items.necklace != null){
                max_mana += game.character.equipped_items.necklace.stats.max_mana;
            }
            if(game.character.equipped_items.ring1 != null){
                max_mana += game.character.equipped_items.ring1.stats.max_mana;
            }
            if(game.character.equipped_items.ring2 != null){
                max_mana += game.character.equipped_items.ring2.stats.max_mana;
            }
            return BASE_HEALTH + util.normalizeStat(max_mana);
        },
        mana_regeneration:function(){
            let mana_regeneration = game.character.mana_regeneration;
            if(game.character.equipped_items.helmet != null){
                mana_regeneration += game.character.equipped_items.helmet.stats.mana_regeneration;
            }
            if(game.character.equipped_items.shoulders != null){
                mana_regeneration += game.character.equipped_items.shoulders.stats.mana_regeneration;
            }
            if(game.character.equipped_items.gauntlets != null){
                mana_regeneration += game.character.equipped_items.gauntlets.stats.mana_regeneration;
            }
            if(game.character.equipped_items.chest != null){
                mana_regeneration += game.character.equipped_items.chest.stats.mana_regeneration;
            }
            if(game.character.equipped_items.belt != null){
                mana_regeneration += game.character.equipped_items.belt.stats.mana_regeneration;
            }
            if(game.character.equipped_items.pants != null){
                mana_regeneration += game.character.equipped_items.pants.stats.mana_regeneration;
            }
            if(game.character.equipped_items.boots != null){
                mana_regeneration += game.character.equipped_items.boots.stats.mana_regeneration;
            }
            if(game.character.equipped_items.main_hand != null){
                mana_regeneration += game.character.equipped_items.main_hand.stats.mana_regeneration;
            }
            if(game.character.equipped_items.off_hand != null){
                mana_regeneration += game.character.equipped_items.off_hand.stats.mana_regeneration;
            }
            if(game.character.equipped_items.necklace != null){
                mana_regeneration += game.character.equipped_items.necklace.stats.mana_regeneration;
            }
            if(game.character.equipped_items.ring1 != null){
                mana_regeneration += game.character.equipped_items.ring1.stats.mana_regeneration;
            }
            if(game.character.equipped_items.ring2 != null){
                mana_regeneration += game.character.equipped_items.ring2.stats.mana_regeneration;
            }
            return mana_regeneration;
        },
        cooldown_reduction:function(){
            let cooldown_reduction = game.character.cooldown_reduction;
            if(game.character.equipped_items.helmet != null){
                cooldown_reduction += game.character.equipped_items.helmet.stats.cooldown_reduction;
            }
            if(game.character.equipped_items.shoulders != null){
                cooldown_reduction += game.character.equipped_items.shoulders.stats.cooldown_reduction;
            }
            if(game.character.equipped_items.gauntlets != null){
                cooldown_reduction += game.character.equipped_items.gauntlets.stats.cooldown_reduction;
            }
            if(game.character.equipped_items.chest != null){
                cooldown_reduction += game.character.equipped_items.chest.stats.cooldown_reduction;
            }
            if(game.character.equipped_items.belt != null){
                cooldown_reduction += game.character.equipped_items.belt.stats.cooldown_reduction;
            }
            if(game.character.equipped_items.pants != null){
                cooldown_reduction += game.character.equipped_items.pants.stats.cooldown_reduction;
            }
            if(game.character.equipped_items.boots != null){
                cooldown_reduction += game.character.equipped_items.boots.stats.cooldown_reduction;
            }
            if(game.character.equipped_items.main_hand != null){
                cooldown_reduction += game.character.equipped_items.main_hand.stats.cooldown_reduction;
            }
            if(game.character.equipped_items.off_hand != null){
                cooldown_reduction += game.character.equipped_items.off_hand.stats.cooldown_reduction;
            }
            if(game.character.equipped_items.necklace != null){
                cooldown_reduction += game.character.equipped_items.necklace.stats.cooldown_reduction;
            }
            if(game.character.equipped_items.ring1 != null){
                cooldown_reduction += game.character.equipped_items.ring1.stats.cooldown_reduction;
            }
            if(game.character.equipped_items.ring2 != null){
                cooldown_reduction += game.character.equipped_items.ring2.stats.cooldown_reduction;
            }
            return cooldown_reduction;
        },
    },
};