let monster_attack = {
    attack_list: [
        {
            name: "Basic Attack",
            cooldown: 0,
            range: 1,
            calculator: function(monster_x, monster_y){
                let damage = 0;

                let monster = map.get(monster_x,monster_y).npc;

                damage += (monster.attack_power * (5 + util.randomInt(5)));
                return damage;
            },
        }, {
            name: "Fireball",
            cooldown: 10,
            range: 50,
            calculator: function(monster_x, monster_y){
                let damage = 0;

                let monster = map.get(monster_x,monster_y).npc;

                damage += (monster.magic_power * (5 + util.randomInt(5)));
                return damage;
            },
        },
        {
            name: "Ice Bolt",
            cooldown: 10,
            range: 25,
            calculator: function(monster_x, monster_y){
                let damage = 0;

                let monster = map.get(monster_x,monster_y).npc;

                damage += (monster.magic_power * (5 + util.randomInt(5)));
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
        game.character.current_health -= damage;
        let monster = map.get(monster_x,monster_y).npc;
        map.get(monster_x,monster_y).npc.cooldowns[attack.name] = attack.cooldown;
        game.output.push(monster.name + ' attacked you with ' + attack.name + ' for ' + damage + ' damage');
        if(game.character.current_health <= 0){
            game.character.current_health = game.character.max_health;
            game.character.x = game.character.home_x;
            game.character.y = game.character.home_y;
            game.output.push('You Died, returning you home...');
        }
    },

    handleMonsterTurn: function(monster_x, monster_y){
        let monster = map.get(monster_x,monster_y).npc;
        let attacks_off_cooldown = [];
        for(let i = 0; i < monster.attacks.length; i++){
            if(monster.cooldowns[monster.attacks[i]] === 0){
                attacks_off_cooldown.push(monster.attacks[i]);
            }
        }
        let attack = monster_attack.getAttack(util.randomItemInArray(attacks_off_cooldown));

        if(util.distanceBetween(game.character.x,game.character.y,monster_x,monster_y) <= attack.range){
            monster_attack.attack(monster_x,monster_y,attack);
        }else{
            let direction = util.findDirection(monster_x,monster_y,game.character.x,game.character.y);
            if(direction === 0){
                map.get(monster_x+1,monster_y).npc = map.get(monster_x,monster_y).npc;
                map.get(monster_x,monster_y).npc = null;
                monster_x += 1;
            }
            if(direction === 2){
                map.get(monster_x,monster_y+1).npc = map.get(monster_x,monster_y).npc;
                map.get(monster_x,monster_y).npc = null;
                monster_y += 1;
            }
            if(direction === 4){
                map.get(monster_x-1,monster_y).npc = map.get(monster_x,monster_y).npc;
                map.get(monster_x,monster_y).npc = null;
                monster_x -= 1;
            }
            if(direction === 6){
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