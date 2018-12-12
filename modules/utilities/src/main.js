let util = {
    generateName: function(){
        $('#npc_name_output').text(util.getRandomItemInArray(NPC_FIRST_NAMES) + " " + util.getRandomItemInArray(NPC_MIDDLE_NAMES) + " " + util.getRandomItemInArray(NPC_LAST_NAMES));
    },

    generateTownName: function(){
        $('#town_name_output').text(util.getRandomItemInArray(TOWN_NAMES));
    },

    getRandomItemInArray: function(arr){
        return arr[util.getRandomInt(arr.length)];
    },

    getRandomInt: function(max){
        if(max === null){
            return Math.floor(Math.random() * 2);
        }
        return Math.floor(Math.random() * max);
    },
};