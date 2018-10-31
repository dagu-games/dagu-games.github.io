util.loadGame();
util.saveGame();
var app = new Vue({
    el: '#app',
    data: {
        game: game,
    },
    methods: {
        util: util,
        user_interface: user_interface,
        character_attack:character_attack,
        monster_attack:monster_attack,
        
    }
});