let character_attack = {
    attack_list: [
        {
            name: "Basic Attack",
            mana_cost: 0,
            cooldown: 0,
            range: 2,
            icon: "images/basic_attack.png",
            calculator: function(monster_x, monster_y){
                let base_damage = 10;
                let attack_random_factor = 5;
                let damage = base_damage;
                let monster = map.get(monster_x, monster_y).npc;

                damage += Math.floor(DAMAGE_MULTIPLIER * (util.normalizeStat(util.characterStats.attack_power())/(util.normalizeStat(monster.armor)+1)) * util.randomInt(attack_random_factor));
                util.healCharacter(Math.floor(damage * (util.normalizeStat(util.characterStats.attack_lifesteal())/100.0)));
                return damage;
            },
            description: "Basic attack with your weapon",
        }, {
            name: "Fireball",
            mana_cost: 30,
            cooldown: 4,
            range: 50,
            icon: "images/basic_attack.png",
            calculator: function(monster_x, monster_y){
                let base_damage = 20;
                let attack_random_factor = 10;
                let damage = base_damage;
                let monster = map.get(monster_x, monster_y).npc;

                damage += Math.floor(DAMAGE_MULTIPLIER * (util.normalizeStat(util.characterStats.magic_power())/(util.normalizeStat(monster.magic_resistance)+1)) * util.randomInt(attack_random_factor));
                util.healCharacter(Math.floor(damage * (util.normalizeStat(util.characterStats.magic_lifesteal())/100.0)));
                return damage;
            },
            description: "Shoots a Fireball at the enemy. Caution: Fire is hot",
        },
        {
            name: "Ice Bolt",
            mana_cost: 15,
            cooldown: 2,
            range: 25,
            icon: "images/basic_attack.png",
            calculator: function(monster_x, monster_y){
                let base_damage = 20;
                let attack_random_factor = 10;
                let damage = base_damage;
                let monster = map.get(monster_x, monster_y).npc;

                damage += Math.floor(DAMAGE_MULTIPLIER * (util.normalizeStat(util.characterStats.magic_power())/(util.normalizeStat(monster.magic_resistance)+1)) * util.randomInt(attack_random_factor));
                util.healCharacter(Math.floor(damage * (util.normalizeStat(util.characterStats.magic_lifesteal())/100.0)));
                return damage;
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
        damage += attack.calculator(monster_x, monster_y);

        map.get(monster_x, monster_y).npc.current_health -= damage;
        let map_entry = map.get(monster_x, monster_y);
        game.output.push('You dealt ' + damage + ' damage to the ' + map_entry.npc.name + '(' + map_entry.npc.current_health + '/' + map_entry.npc.max_health + ')');
        if(map_entry.npc.current_health <= 0){
            let loot = map_entry.npc.loot;
            let goal_item = map_entry.npc.goal_item;
            loot.forEach(function(item){
                game.character.inventory.equipment.unshift(item);
            });
            if(loot.length > 0){
                user_interface.openRightTab(null, "#inventory_tab", "#inventory_tablink");
            }
            if(goal_item !== null){
                game.character.inventory.quest_items.unshift(goal_item);
            }
            game_logic.giveEXP(MONSTER_EXP_MULTIPLIER*map_entry.npc.level);
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