let character_attack = {
    attack_list: [
        {
            name: "Basic Attack",
            mana_cost: 0,
            cooldown: 0,
            range: 2,
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
                return (game.character.magic_power * (5 + util.randomInt(5)));
            },
            description: "Shoots a Fireball at the enemy. Caution: Fire is hot",
        },
        {
            name: "Ice Bolt",
            mana_cost: 15,
            cooldown: 2,
            range: 25,
            calculator: function(){
                return (game.character.magic_power * (5 + util.randomInt(5)));
            },
            description: "Shoots an Ice Bolt at the enemy. Caution: Ice is cold",
        },
    ],

    getAttack: function(attack_name){
        for(let i = 0; i < character_attack.attack_list.length; i++){
            if(character_attack.attack_list[i].name === attack_name){
                return character_attack.attack_list[i];
            }
        }
    },

    attack: function(monster_x, monster_y, attack_name){
        let damage = 0;
        let attack = character_attack.getAttack(attack_name);
        game.character.current_mana = game.character.current_mana - attack.mana_cost;
        game.character.cooldowns[attack_name] = attack.cooldown;
        damage += attack.calculator();

        map.get(monster_x, monster_y).npc.current_health -= damage;
        let map_entry = map.get(monster_x, monster_y);
        game.output.push('You dealt ' + damage + ' damage to the ' + map_entry.npc.name + '(' + map_entry.npc.current_health + '/' + map_entry.npc.max_health);
        if(map_entry.npc.current_health <= 0){
            let loot = map_entry.npc.loot;
            let goal_item = map_entry.npc.goal_item;
            loot.forEach(function(item){
                game.character.inventory.equipment.push(item);
            });
            if(goal_item !== null){
                game.character.inventory.quest_items.push(goal_item);
            }
            game_logic.giveEXP(100);
            map.get(monster_x, monster_y).npc = null;
        }
    },

    hasManaFor: function(attack_name){
        let attack = character_attack.getAttack(attack_name);
        return (game.character.current_mana >= attack.mana_cost);
    },

    isOffCooldown: function(attack_name){
        return (game.character.cooldowns[attack_name] === 0);
    },

};