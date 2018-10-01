var characterAttack = {
    spell_list : [
        {
            name:"Fireball",
            mana_cost:30,
            cooldown:4,
            range:50,
            description:"Shoots a Fireball at the enemy. Caution: Fire is hot",
        },
        {
            name:"Ice Bolt",
            mana_cost:15,
            cooldown:2,
            range:25,
            description:"Shoots an Ice Bolt at the enemy. Caution: Ice is cold",
        },
    ],

    attack : function(monster_x,monster_y,attack_name) {
        var damage = 0;

        if(attack_name==="Basic Attack") {
            damage = this.basicAttack();
        }

        if(attack_name==="Fireball") {
            damage = this.fireball();
        }

        if(attack_name==="Ice Bolt") {
            damage = this.icebolt();
        }
        //reduce damage number using monster stats from world object at x and y
        //add cooldown to character data
        //reduce that monster's health stat
        game.output.push("You did " + damage + " damage to the monster at (" + monster_x + "," + monster_y + ")");
    },

    basicAttack : function() {
        //calculate damage of character's current weapon
    },

    fireball : function() {
        //calculates damage of character using fireball spell
    },

    icebolt : function() {
        //calculates damage of character using icebolt spell
    },

};