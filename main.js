util.loadGame();
util.saveGame();
map.render();
game.output.push(DONATION_STRING);
util.printCredits();

var app = new Vue({
    el: '#app',
    data: {
        game: game,
        upgrades: upgrades,
        map_controller: map,
    },
    methods: {

    }
});