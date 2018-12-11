const monsters = {
    monster_list: [
        {
            name: "Hellhound",
            icon: ICONS.MONSTERS.HELLHOUND,
            description: "A red, slightly glowing hound. It looks fearsome and aggressive. If you touch it you would probably get burned.",
            preferred_stats: [
                "attack_power",
                "max_health",
            ],
            attacks: [
                "Basic Attack",
            ],
        },
        {
            name: "Alpha Hellhound",
            icon: ICONS.MONSTERS.HELLHOUND,
            description: "A large, red, glowing hound. It looks fearsome and aggressive. If you touch it you would probably get burned. This Hellhound seems to be exceptionally big and in charge of other Hellhounds.",
            preferred_stats: [
                "max_health",
                "attack_power",
                "max_health",
            ],
            attacks: [
                "Basic Attack",
                "Fireball",
            ],
        },
    ],

    unique_monster_list: [
        {
            name: "Evil Wizard Canthdor",
            icon: ICONS.MONSTERS.HELLHOUND,
            description: "An old, evil wizard, long driven mad by his experiments.",
            preferred_stats: [
                "max_health",
                "magic_power",
                "max_health",
                "attack_power",
            ],
            attacks: [
                "Basic Attack",
                "Fireball",
                "Ice Bolt",
            ],
        },
    ],

    getMonster: function(monster_name){
        for(let i = 0; i < monsters.monster_list.length; i++){
            if(monster_name === monsters.monster_list[i].name){
                return monsters.monster_list[i];
            }
        }
        for(let i = 0; i < monsters.unique_monster_list.length; i++){
            if(monster_name === monsters.unique_monster_list[i].name){
                return monsters.unique_monster_list[i];
            }
        }
    },

    getRandomMonster: function(){
        return util.getRandomItemInArray(monsters.monster_list);
    },
};