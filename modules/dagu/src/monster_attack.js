let monster_attack = {
    attack_list: [
        {
            name: "Basic Attack",
            cooldown: 0,
            range: 2,
            calculator: function(monster_x, monster_y){
                let base_damage = 10;
                let attack_random_factor = 5;
                let damage = base_damage;
                let monster = map.get(monster_x,monster_y).npc;

                damage += Math.floor(DAMAGE_MULTIPLIER * (util.normalizeStat(monster.attack_power)/(util.normalizeStat(util.characterStats.armor())+1)) * util.getRandomInt(attack_random_factor));
                util.healMonster(monster_x, monster_y, Math.floor(damage * (util.normalizeStat(monster.attack_lifesteal)/100.0)));

                return damage;
            },
        }, {
            name: "Fireball",
            cooldown: 10,
            range: 50,
            calculator: function(monster_x, monster_y){
                let base_damage = 20;
                let attack_random_factor = 10;
                let damage = base_damage;
                let monster = map.get(monster_x,monster_y).npc;

                damage += Math.floor(DAMAGE_MULTIPLIER * (util.normalizeStat(monster.magic_power)/(util.normalizeStat(util.characterStats.magic_resistance())+1)) * util.getRandomInt(attack_random_factor));
                util.healMonster(monster_x, monster_y, Math.floor(damage * (util.normalizeStat(monster.magic_lifesteal)/100.0)));

                return damage;
            },
        },
        {
            name: "Ice Bolt",
            cooldown: 10,
            range: 25,
            calculator: function(monster_x, monster_y){
                let base_damage = 20;
                let attack_random_factor = 10;
                let damage = base_damage;
                let monster = map.get(monster_x,monster_y).npc;

                damage += Math.floor(DAMAGE_MULTIPLIER * (util.normalizeStat(monster.magic_power)/(util.normalizeStat(util.characterStats.magic_resistance())+1)) * util.getRandomInt(attack_random_factor));
                util.healMonster(monster_x, monster_y, Math.floor(damage * (util.normalizeStat(monster.magic_lifesteal)/100.0)));

                return damage;
            },
        },
    ],

    getAttack: function(attack_name){
        for(let i = 0; i < monster_attack.attack_list.length; i++){
            if(monster_attack.attack_list[i].name === attack_name){
                return monster_attack.attack_list[i];
            }
        }
    },

    attack: function(monster_x, monster_y, attack){
        let damage = attack.calculator(monster_x,monster_y);
        let monster = map.get(monster_x,monster_y).npc;
        game.output.push(monster.name + ' attacked you with ' + attack.name + ' for ' + damage + ' damage');
        util.damageCharacter(damage);
        map.get(monster_x,monster_y).npc.cooldowns[attack.name] = attack.cooldown;
    },

    handleMonsterTurn: function(monster_x, monster_y){
        let monster = map.get(monster_x,monster_y).npc;
        let attacks_off_cooldown = [];
        for(let i = 0; i < monster.attacks.length; i++){
            if(monster.cooldowns[monster.attacks[i]] === 0){
                attacks_off_cooldown.push(monster.attacks[i]);
            }
        }
        let attack = monster_attack.getAttack(util.getRandomItemInArray(attacks_off_cooldown));

        if(util.distanceBetween(game.character.x,game.character.y,monster_x,monster_y) <= attack.range){
            monster_attack.attack(monster_x,monster_y,attack);
        }else{
            let direction = util.findDirection(monster_x,monster_y,game.character.x,game.character.y);
            if(direction === 0){
                map.get(monster_x+1,monster_y).npc = map.get(monster_x,monster_y).npc;
                map.get(monster_x,monster_y).npc = null;
                monster_x += 1;
            }
            if(direction === 1){
                map.get(monster_x,monster_y+1).npc = map.get(monster_x,monster_y).npc;
                map.get(monster_x,monster_y).npc = null;
                monster_y += 1;
            }
            if(direction === 2){
                map.get(monster_x-1,monster_y).npc = map.get(monster_x,monster_y).npc;
                map.get(monster_x,monster_y).npc = null;
                monster_x -= 1;
            }
            if(direction === 3){
                map.get(monster_x,monster_y-1).npc = map.get(monster_x,monster_y).npc;
                map.get(monster_x,monster_y).npc = null;
                monster_y -= 1;
            }
        }

        for(let i = 0; i < monster.attacks.length; i++){
            if(monster.cooldowns[monster.attacks[i]] == null){
                map.get(monster_x,monster_y).npc.cooldowns[monster.attacks[i]] = 0;
            }
            if(monster.cooldowns[monster.attacks[i]] > 0){
                map.get(monster_x,monster_y).npc.cooldowns[monster.attacks[i]] -= 1;
            }
        }

        if(monster.current_health < monster.max_health){
            map.get(monster_x,monster_y).npc.current_health += monster.health_regeneration;
            if(map.get(monster_x,monster_y).npc.current_health > map.get(monster_x,monster_y).npc.max_health){
                map.get(monster_x,monster_y).npc.current_health = monster.max_health;
            }
        }

        if(monster.current_mana < monster.max_mana){
            map.get(monster_x,monster_y).npc.current_mana += monster.mana_regeneration;
            if(monster.current_mana > monster.max_mana){
                map.get(monster_x,monster_y).npc.current_mana = monster.max_mana;
            }
        }
    },

};