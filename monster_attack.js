var monster_attack = {
    spell_list : [
        {
            name:"Basic Attack",
            mana_cost:0,
            cooldown:0,
            range:1,
            calculator:function(){

            },
            description:"Basic attack with your weapon",
        },{
            name:"Fireball",
            mana_cost:30,
            cooldown:4,
            range:50,
            calculator:function(){

            },
            description:"Shoots a Fireball at the enemy. Caution: Fire is hot",
        },
        {
            name:"Ice Bolt",
            mana_cost:15,
            cooldown:2,
            range:25,
            calculator:function(){

            },
            description:"Shoots an Ice Bolt at the enemy. Caution: Ice is cold",
        },
    ],

    attack : function(monster_x,monster_y,attack_name) {
        var damage = 0;
        damage = damage * game.character.strength;


        return damage;
    },

};