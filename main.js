util.loadGame();
util.saveGame();
map_controller.render_map();
game.output.push(DONATION_STRING);
util.printCredits();

var app = new Vue({
    el: '#app',
    data: {
        game: game,
    },
    methods: {

    }
});