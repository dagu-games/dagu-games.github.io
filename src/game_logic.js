let game_logic = {
    init: function(){
        game.settings = {
            zoom_factor: 11,
        };
        game.chunks = [];
        game.character = {
            x: 0,
            y: 0,
            home_x:0,
            home_y:0,
            level: 1,
            experience: 0,
            unspent_skill_points: 1,
            current_health: BASE_HEALTH,
            max_health: BASE_HEALTH,
            health_regeneration: 1,
            current_mana: BASE_MANA,
            max_mana: BASE_MANA,
            mana_regeneration: 1,
            cooldown_reduction: 0,
            armor: 0,
            magic_resistance: 0,
            attack_power: 5,
            attack_lifesteal: 0,
            magic_power: 5,
            magic_lifesteal: 0,
            equipped_items: {
                helmet: null,
                shoulders: null,
                gauntlets: null,
                chest: null,
                belt: null,
                pants: null,
                boots: null,
                main_hand: null,
                off_hand: null,
                necklace: null,
                ring1: null,
                ring2: null,
            },
            inventory: {
                gold: 500,
                equipment: [],
                quest_items: [],
            },
            quests: [],
            completed_quests: [],
            upgrades: [],
            attacks: [
                'Basic Attack',
            ],
            cooldowns: {
                'Basic Attack': 0,
            },

        };
        game.status = STATUS.COMBAT;
        game_logic.generateChunk(0, 0);
        if(map.get(CHUNK_SIZE,0).type === undefined){
            game_logic.generateChunk(1, 0);
        }
        if(map.get(CHUNK_SIZE,CHUNK_SIZE).type === undefined){
            game_logic.generateChunk(1, 1);
        }
        if(map.get(0,CHUNK_SIZE).type === undefined){
            game_logic.generateChunk(0, 1);
        }
        if(map.get(CHUNK_SIZE*-1,CHUNK_SIZE).type === undefined){
            game_logic.generateChunk(-1, 1);
        }
        if(map.get(CHUNK_SIZE*-1,0).type === undefined){
            game_logic.generateChunk(-1, 0);
        }
        if(map.get(CHUNK_SIZE*-1,CHUNK_SIZE*-1).type === undefined){
            game_logic.generateChunk(-1, -1);
        }
        if(map.get(0,CHUNK_SIZE*-1).type === undefined){
            game_logic.generateChunk(0, -1);
        }
        if(map.get(CHUNK_SIZE,CHUNK_SIZE*-1).type === undefined){
            game_logic.generateChunk(1, -1);
        }
    },
    generateChunk: function(chunk_x, chunk_y){
        let r = util.randomInt(100);
        map.get(chunk_x*CHUNK_SIZE,chunk_y*CHUNK_SIZE);
        let monsters;
        let points;
        let point;
        let i;
        let j;
        if((chunk_x === 0 && chunk_y === 0) ||
            (chunk_x === 1 && chunk_y === 0) ||
            (chunk_x === 1 && chunk_y === 1) ||
            (chunk_x === 0 && chunk_y === 1) ||
            (chunk_x === -1 && chunk_y === 1) ||
            (chunk_x === -1 && chunk_y === 0) ||
            (chunk_x === -1 && chunk_y === -1) ||
            (chunk_x === 0 && chunk_y === -1) ||
            (chunk_x === 1 && chunk_y === -1)){
            r = util.randomInt(90);
        }

        if(r < 75){
            //generate wilderness
            map.getChunk(chunk_x,chunk_y).name = "Wilderness";
            map.getChunk(chunk_x,chunk_y).type = "wilderness";
            monsters = game_logic.generateChunkEnemies();

            for(i = CHUNK_SIZE * chunk_x; i < CHUNK_SIZE + (CHUNK_SIZE * chunk_x); i++){
                for(j = CHUNK_SIZE * chunk_y; j < CHUNK_SIZE + (CHUNK_SIZE * chunk_y); j++){
                    //console.log("generating point " + i + "," + j);
                    if(util.randomInt(100) < 10){
                        map.get(i, j).type = 'tree';
                    }else{
                        if(util.randomInt(100) < 30){
                            map.get(i, j).type = 'dirt';
                        }else{
                            map.get(i, j).type = 'grass';
                        }
                    }
                    map.get(i, j).direction = util.randomInt(4);
                }
            }
            if((chunk_x === 0 && chunk_y === 0) ||
                (chunk_x === 1 && chunk_y === 0) ||
                (chunk_x === 1 && chunk_y === 1) ||
                (chunk_x === 0 && chunk_y === 1) ||
                (chunk_x === -1 && chunk_y === 1) ||
                (chunk_x === -1 && chunk_y === 0) ||
                (chunk_x === -1 && chunk_y === -1) ||
                (chunk_x === 0 && chunk_y === -1) ||
                (chunk_x === 1 && chunk_y === -1)){
                monsters = [];
            }
            map.get(0, 0).type = 'grass';
            pathfinder.resetPFVariable();
            for(i = 0; i < monsters.length; i++){
                let c = 0;
                while(c<10){
                    let tx = util.randomInt(CHUNK_SIZE) + (CHUNK_SIZE * chunk_x);
                    let ty = util.randomInt(CHUNK_SIZE) + (CHUNK_SIZE * chunk_y);
                    if(util.isWalkable(tx,ty) && util.isPathable(tx,ty)){
                        map.get(tx, ty).npc = monsters[i];
                        c=11;
                    }else{
                        c++;
                    }
                }
            }
        }else if(r >= 75 && r < 90){
            //generate town
            map.getChunk(chunk_x,chunk_y).name = util.randomItemInArray(TOWN_NAMES);
            map.getChunk(chunk_x,chunk_y).type = 'town';
            for(i = CHUNK_SIZE * chunk_x; i < CHUNK_SIZE + (CHUNK_SIZE * chunk_x); i++){
                for(j = CHUNK_SIZE * chunk_y; j < CHUNK_SIZE + (CHUNK_SIZE * chunk_y); j++){
                    map.get(i, j).type = 'grass';
                    if(util.randomInt(100) < 8){
                        map.get(i, j).npc = game_logic.generateNPC();
                    }
                    map.get(i, j).direction = util.randomInt(4);
                }
            }
            map.get(0, 0).type = 'grass';
            pathfinder.resetPFVariable();
        }else if(r >= 90){
            //generate dungeon
            map.getChunk(chunk_x,chunk_y).name = "Dungeon";
            map.getChunk(chunk_x,chunk_y).type = "dungeon";
            monsters = game_logic.generateChunkEnemies();

            for(i = CHUNK_SIZE * chunk_x; i < CHUNK_SIZE + (CHUNK_SIZE * chunk_x); i++){
                for(j = CHUNK_SIZE * chunk_y; j < CHUNK_SIZE + (CHUNK_SIZE * chunk_y); j++){
                    map.get(i, j).type = 'stone';
                    map.get(i, j).direction = util.randomInt(4);
                }
            }
            if((chunk_x === 0 && chunk_y === 0) ||
                (chunk_x === 1 && chunk_y === 0) ||
                (chunk_x === 1 && chunk_y === 1) ||
                (chunk_x === 0 && chunk_y === 1) ||
                (chunk_x === -1 && chunk_y === 1) ||
                (chunk_x === -1 && chunk_y === 0) ||
                (chunk_x === -1 && chunk_y === -1) ||
                (chunk_x === 0 && chunk_y === -1) ||
                (chunk_x === 1 && chunk_y === -1)){
                monsters = [];
            }
            map.get(0, 0).type = 'grass';
            pathfinder.resetPFVariable();
            for(i = 0; i < monsters.length; i++){
                let c = 0;
                while(c<10){
                    let tx = util.randomInt(CHUNK_SIZE) + (CHUNK_SIZE * chunk_x);
                    let ty = util.randomInt(CHUNK_SIZE) + (CHUNK_SIZE * chunk_y);
                    if(util.isWalkable(tx,ty) && util.isPathable(tx,ty)){
                        map.get(tx, ty).npc = monsters[i];
                        c=11;
                    }else{
                        c++;
                    }
                }
            }
        }
    },

    generateChunkEnemies: function(){
        let ans = [];
        let r = util.randomInt(10) + 1;
        for(let i = 0; i < r; i++){
            let stats = util.generateStatBlock(game.character.level * MONSTER_DIFFICULTY_MULTIPLIER, 10);
            let monster = {
                name: "HellHound",
                type: "monster",
                level: game.character.level,
                max_health: stats.max_health + MONSTER_BASE_HEALTH,
                health_regeneration:stats.health_regeneration,
                armor: stats.armor,
                magic_resistance: stats.magic_resistance,
                attack_power: stats.attack_power + MONSTER_BASE_ATTACK_POWER,
                attack_lifesteal: stats.attack_lifesteal,
                magic_power: stats.magic_power + MONSTER_BASE_MAGIC_POWER,
                magic_lifesteal: stats.magic_lifesteal,
                loot: game_logic.generateLoot(),
                attacks: [
                    "Basic Attack",
                    //"Fireball",
                    //"Ice Bolt",
                ],
                cooldowns: {
                    "Basic Attack":0,
                    //"Fireball":0,
                    //"Ice Bolt":0,
                }
            };
            monster.current_health = monster.max_health;
            if(game.character.quests.length > 0 && util.randomInt(2) < 1){
                monster.goal_item = util.getQuest(util.randomItemInArray(game.character.quests)).goal_item;
                //console.log(util.randomItemInArray(game.character.quests));
                //console.log(game.character.quests);
            }else{
                monster.goal_item = null;
            }
            ans.push(monster);
        }
        return ans;
    },

    tick: function(){
        if(!util.isInTown()){
            let monsters = util.getAllMonsters();
            for(let i = 0; i < monsters.length; i++){
                if(util.distanceBetween(game.character.x,game.character.y,monsters[i].x,monsters[i].y) <= TICK_THRESHOLD){
                    //console.log('doing turn for ' + monsters[i].x + "," + monsters[i].y);
                    monster_attack.handleMonsterTurn(monsters[i].x,monsters[i].y);
                }
            }
        }

        for(let i = 0; i < game.character.attacks.length; i++){
            if(game.character.cooldowns[game.character.attacks[i]] == null){
                game.character.cooldowns[game.character.attacks[i]] = 0;
            }
            if(game.character.cooldowns[game.character.attacks[i]] > 0){
                game.character.cooldowns[game.character.attacks[i]] -= 1;
                if(game.character.cooldowns[game.character.attacks[i]] > 0 && util.randomInt(100) < util.normalizeStat(util.characterStats.cooldown_reduction())){
                        game.character.cooldowns[game.character.attacks[i]] -= 1;
                }
            }
        }

        util.healCharacter(util.characterStats.health_regeneration());

        util.giveCharacterMana(util.characterStats.mana_regeneration());

    },

    generateLoot: function(){
        let n = util.randomInt(10);
        let items = [];
        for(let i = -1; i < n; i++){
            let item = {
                name: null,
                slot: util.randomItemInArray(ITEM_SLOTS),
                stats: util.generateStatBlock(6 + game.character.level),
                level: game.character.level,
                description: util.randomItemInArray(ITEM_DESCRIPTIONS),
                value: util.randomInt(100) + 1,
            };
            item.name = util.randomItemInArray(ITEM_NAMES[item.slot]);

            items.push(item);
        }
        return items;
    },

    generateNPC: function(){
        let npc = {
            name: util.randomItemInArray(NPC_FIRST_NAMES) + " " + util.randomItemInArray(NPC_MIDDLE_NAMES) + " " + util.randomItemInArray(NPC_LAST_NAMES),
            description: util.randomItemInArray(RACES) + " " + util.randomItemInArray(PROFESSIONS) + " - " + util.randomItemInArray(NPC_DESCRIPTIONS),
        };

        if(util.randomInt(2) === 0){
            npc.type = "shop";
            npc.items = game_logic.generateLoot();
        }else{
            npc.type = "quest_giver";
            npc.quest = util.getRandomAvailableQuestName();
        }
        return npc;
    },

    giveEXP: function(experience){
        game.output.push('You Gained ' + experience + ' EXP');
        game.character.experience += experience;
        if(game.character.experience >= util.getExperienceNeededForLevel(game.character.level+1)){
            game_logic.levelUp();
        }
    },

    levelUp: function(){
        game.character.unspent_skill_points += 1;
        game.character.level += 1;
        game.character.experience -= util.getExperienceNeededForLevel(game.character.level);
        game.output.push('You Leveled Up! You are now Level ' + game.character.level + ' and have ' + game.character.unspent_skill_points + ' unspent skill points.');
    }
};