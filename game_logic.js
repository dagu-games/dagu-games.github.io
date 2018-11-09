var game_logic = {
    init: function () {
        game.settings = {
            zoom_factor : 25,
        };
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
    generateChunk: function (x, y) {
        var r = Math.floor(Math.random() * 100); //generates random number 0-99
        r=70;
        if(r<75){
            //generate wilderness
            var monsters = game_logic.generateChunkEnemies();
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
                name:"HellHound",
                max_health:100,
                armor:10,
                magic_resistance:10,
                attack_power:10,
                attack_lifesteal:10,
                ability_power:10,
                magic_lifesteal:10,
                monster_attacks:[
                    "bite",
                    "scratch",
                ],
            }
        ];
    },

    tick: function (x, y) {
        //simulates and makes moves for all monsters withing 500 tiles, if they exist.
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
        }
    },
};