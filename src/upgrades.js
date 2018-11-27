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

];