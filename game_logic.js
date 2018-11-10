var game_logic = {
    init: function () {
        game.settings = {
            zoom_factor : 25,
        };
        game.world1 = [[]];
        game.world2 = [[]];
        game.world3 = [[]];
        game.world4 = [[]];
        game.character = {
            x:0,
            y:0,
            level:1,
            experience:0,
            unspent_skill_points:0,
            current_health:100,
            max_health:100,
            health_regeneration:1,
            current_mana:100,
            max_mana:100,
            mana_regeneration:1,
            cooldown_reduction:0,
            armor:0,
            magic_resistance:0,
            attack_power:1,
            attack_lifesteal:0,
            ability_power:0,
            magic_lifesteal:0,
            equipped_items:{
                helmet:null,
                shoulders:null,
                gauntlets:null,
                chest:null,
                belt:null,
                pants:null,
                boots:null,
                main_hand:null,
                off_hand:null,
                necklace:null,
                ring1:null,
                ring2:null,
            },
            inventory:{
                gold:0,
                equipment:[],
                quest_items:[],
            },
            quests:[],
            upgrades:[],
            spells:[],
        };
        game.status = STATUS.COMBAT;
        game_logic.generateChunk(0,0);
        game_logic.generateChunk(1,0);
        game_logic.generateChunk(1,1);
        game_logic.generateChunk(0,1);
        game_logic.generateChunk(-1,1);
        game_logic.generateChunk(-1,0);
        game_logic.generateChunk(-1,-1);
        game_logic.generateChunk(0,-1);
        game_logic.generateChunk(1,-1);
    },
    generateChunk: function (chunk_x, chunk_y) {
        var r = util.randomInt(100);
        r=70;
        if(r<75){   //generate wilderness
            var monsters = game_logic.generateChunkEnemies();

            for(var i=CHUNK_SIZE*chunk_x; i<CHUNK_SIZE+(CHUNK_SIZE*chunk_x); i++){
                for(var j=CHUNK_SIZE*chunk_y; j<CHUNK_SIZE+(CHUNK_SIZE*chunk_y); j++){
                    if(util.randomInt(100) < 30){
                        world.get(i,j).type = 'wall';
                    }else{
                        if(util.randomInt(100) < 30){
                            world.get(i,j).type = 'dirt';
                        }else{
                            world.get(i,j).type = 'grass';
                        }
                    }
                }
            }

            for(i = 0; i < monsters.length; i++){
                var points = util.getAllPathableTilesInChunk(chunk_x,chunk_y);
                var point = util.randomItemInArray(points);
                world.get(point.x,point.y).npc = monsters[i];
            }
        }else if(r>=75 && r<85){    //generate dungeon
            var monsters = game_logic.generateChunkEnemies();

            for(var i=CHUNK_SIZE*chunk_x; i<CHUNK_SIZE+(CHUNK_SIZE*chunk_x); i++){
                for(var j=CHUNK_SIZE*chunk_y; j<CHUNK_SIZE+(CHUNK_SIZE*chunk_y); j++){
                    if(util.randomInt(100) < 30){
                        world.get(i,j).type = 'wall';
                    }else{
                        world.get(i,j).type = 'stone';
                    }
                }
            }

            for(i = 0; i < monsters.length; i++){
                var points = util.getAllPathableTilesInChunk(chunk_x,chunk_y);
                var point = util.randomItemInArray(points);
                world.get(point.x,point.y).npc = monsters[i];
            }
        }else if(r>=85){    //generate town

            for(var i=CHUNK_SIZE*chunk_x; i<CHUNK_SIZE+(CHUNK_SIZE*chunk_x); i++){
                for(var j=CHUNK_SIZE*chunk_y; j<CHUNK_SIZE+(CHUNK_SIZE*chunk_y); j++){
                    world.get(i,j).type = 'grass';
                    if(util.randomInt(100) < 8){
                        world.get(i,j).npc = game_logic.generateNPC();
                    }
                }
            }
        }
        //clears whatever is in the current map object and fills the hole with new terrain in the given coordinates chunk.
        //determine chunk with (x/CHUNK_SIZE - x%CHUNK_SIZE - 1). then multiply by CHUNK_SIZE to get the starting x.
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
                name:"HellHound",
                type:"monster",
                quest_item:game.character.quests.length>0 ? util.randomItemInArray(game.character.quests).goal_item:null,
                max_health:100,
                armor:10,
                magic_resistance:10,
                attack_power:10,
                attack_lifesteal:10,
                ability_power:10,
                magic_lifesteal:10,
                loot:game_logic.generateLoot(),
                monster_attacks:[
                    "bite",
                    "scratch",
                ],
            }
        ];
    },

    tick: function (x, y) {
        var monsters = util.getAllMonsters();
        for(var i = 0; i < monsters.length; i++){

        }
    },

    generateLoot: function () {
        var n = util.randomInt(10);
        var items = [];
        for(var i = 0; i<n; i++){
            var item = {
                name:null,
                slot:util.randomItemInArray(ITEM_SLOTS),
                stats:{
                    max_health:10,
                    armor:10,
                    magic_resistance:10,
                    attack_power:10,
                    attack_lifesteal:10,
                    ability_power:10,
                    magic_lifesteal:10,
                    cooldown_reduction:10,
                    mana_regeneration:2,
                    max_mana:10,
                },
                description:util.randomItemInArray(ITEM_DESCRIPTIONS),
                value:util.randomInt(100),
            };
            item.name = util.randomItemInArray(ITEM_NAMES[item.slot]);

            items.push(item);
        }
        return items;
    },
    generateNPC: function () {
        var npc = {
            name:util.randomItemInArray(NPC_FIRST_NAMES) + " " + util.randomItemInArray(NPC_LAST_NAMES),
        };
        if(util.randomInt()===0){
            npc.type="shop";
        }else{
            npc.type="quest_giver";
            npc.quest=util.randomItemInArray(QUESTS);
        }
        return npc;
    },
};