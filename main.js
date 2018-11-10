util.loadGame();
util.saveGame();
map_controller.render_map();

var app = new Vue({
    el: '#app',
    data: {
        game: game,
    },
    methods: {

    }
});