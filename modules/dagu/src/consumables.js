let consumables = {
    consumable_list:[
        {
            name: "Apple",
            description: "A regular apple. Heals you by 10%",
            value: 1,
            icon: ICONS.CONSUMABLES.APPLE,
            effect: function(){
                let heal_amount = Math.floor(util.characterStats.max_health() * 0.1);
                util.healCharacter(heal_amount);
                game.output.push("You eat the apple and get healed for " + heal_amount);
            },
        },
    ],
    getConsumable: function(consumable_name){
        for(let i = 0; i < consumables.consumable_list.length; i++){
            if(consumables.consumable_list[i].name === consumable_name){
                return consumables.consumable_list[i];
            }
        }
        return null;
    },
};