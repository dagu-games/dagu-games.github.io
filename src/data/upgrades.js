let upgrades = [
    {
        name: "Go to the Gym!",
        description: "You went to the gym and got stronger",
        skill_point_cost: 1,
        isAvailable: function(){
            return (game.character.unspent_skill_points >= this.skill_point_cost);
        },
        effect: function(){
            game.character.attack_power += 10;
        },
        refund: function(){
            game.character.attack_power -= 10;
        },
    },
    {
        name: "Study some fire",
        description: "You looked at fire for a while and learn to use the spell Fireball!",
        skill_point_cost: 1,
        isAvailable: function(){
            return (game.character.unspent_skill_points >= this.skill_point_cost);
        },
        effect: function(){
            game.character.attacks.push('Fireball');
            game.character.cooldowns['Fireball'] = 0;
        },
        refund: function(){
            for(let i = 0; i < game.character.attacks.length; i++){
                if(game.character.attacks[i] === 'Fireball'){
                    game.character.attacks.splice(i,1);
                }
            }
            for(let i = 0; i < game.character.hotbar.length; i++){
                if(game.character.hotbar[i] === 'Fireball'){
                    game.character.hotbar[i] = "";
                }
            }
        },
    },

];