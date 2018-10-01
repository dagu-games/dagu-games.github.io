util.loadGame();
util.saveGame();
var app = new Vue({
    el: '#app',
    data: {
        game: game,
    },
    methods: {
        util: util,
    }
});