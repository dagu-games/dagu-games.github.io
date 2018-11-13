let character_attack = {
    spell_list: [
        {
            name: "Basic Attack",
            mana_cost: 0,
            cooldown: 0,
            range: 1,
            calculator: function(){
                return (game.character.attack_power * (5 + util.randomInt(5)));
            },
            description: "Basic attack with your weapon",
        }, {
            name: "Fireball",
            mana_cost: 30,
            cooldown: 4,
            range: 50,
            calculator: function(){
                return (game.character.ability_power * (5 + util.randomInt(5)));
            },
            description: "Shoots a Fireball at the enemy. Caution: Fire is hot",
        },
        {
            name: "Ice Bolt",
            mana_cost: 15,
            cooldown: 2,
            range: 25,
            calculator: function(){
                return (game.character.ability_power * (5 + util.randomInt(5)));
            },
            description: "Shoots an Ice Bolt at the enemy. Caution: Ice is cold",
        },
    ],

    getAttack: function(spell_name){
        for(let i = 0; i < character_attack.spell_list.length; i++){
            if(character_attack.spell_list[i].name === spell_name){
                return character_attack.spell_list[i];
            }
        }
    },

    attack: function(monster_x, monster_y, attack_name){
        let damage = 0;
        let attack = character_attack.getAttack(attack_name);
        game.character.current_mana = game.character.current_mana - attack.mana_cost;
        for(let i = 0; i < game.character.spells.length; i++){
            if(game.character.spells[i].name === attack_name){
                game.character.spells[i].cooldown = attack.cooldown;
            }
        }
        damage += attack.calculator();

        map.get(monster_x, monster_y).npc.current_health -= damage;
        if(map.get(monster_x, monster_y).npc.current_health <= 0){
            let loot = map.get(monster_x, monster_y).npc.loot;
            let quest_item = map.get(monster_x, monster_y).npc.quest_item;
            map.get(monster_x, monster_y).npc = null;
            loot.forEach(function(item){
                game.character.inventory.equipment.push(quest_item);
            });
            game.character.inventory.quest_items.push(quest_item);
        }
    },

};