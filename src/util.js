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
        return pathfinder.findShortestPath(game.character.x,game.character.y,x,y) !== false;
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
            game.character.current_health = game.character.max_health;
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

    generateStatBlock: function(points, rarity){
        if(rarity == null || rarity === undefined){
            rarity = util.randomInt(6);
        }

        let stats = [
            "max_health",
            "health_regeneration",
            "max_mana",
            "mana_regeneration",
            "cooldown_reduction",
            "attack_power",
            "attack_lifesteal",
            "armor",
            "magic_power",
            "magic_lifesteal",
            "magic_resistance",
        ];

        stats = util.shuffle(stats);

        let ans = {
            "max_health":0,
            "health_regeneration":0,
            "max_mana":0,
            "mana_regeneration":0,
            "cooldown_reduction":0,
            "attack_power":0,
            "attack_lifesteal":0,
            "armor":0,
            "magic_power":0,
            "magic_lifesteal":0,
            "magic_resistance":0,
            "rarity":rarity,
        };

        if(rarity > (stats.length - 1)){
            rarity = (stats.length - 1);
        }
        for(let i = 0; i <= rarity; i++){
            let points_to_remove = Math.floor(((util.randomInt(50)+25)/100.0)*points);
            points -= points_to_remove;
            let stat = stats.shift();
            ans[stat] += points_to_remove;
            if(points <= 0){
                i = rarity + 1;
                break;
            }
        }


        return ans;
    },

    rarityToText: function(rarity){
        if(rarity === 0){
            return 'Common';
        }
        if(rarity === 1){
            return 'Uncommon';
        }
        if(rarity === 2){
            return 'Rare';
        }
        if(rarity === 3){
            return 'Epic';
        }
        if(rarity === 4){
            return 'Legendary';
        }
        if(rarity === 5){
            return 'Mythic';
        }
        return 'other';
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
            return max_health;
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
            return max_mana;
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