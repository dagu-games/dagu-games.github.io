let consumables = {
    consumable_list:[
        {
            name: "Apple",
            description: "A regular apple. Heals you by 10%",
            value: 1,
            icon: "images/apple.png",
            effect: function(){
                util.healCharacter(Math.floor(game.character.max_health * 0.1));
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