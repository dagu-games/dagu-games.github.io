let map = {

    container: null,

    size: null,

    cell_size: null,

    render: function(){
        map.container = document.getElementById("map_container");
        map.size = map.container.style.width;
        map.cell_size = map.size / game.settings.zoom_factor;

        while(map.container.hasChildNodes()){
            map.container.removeChild(map.container.firstChild);
        }

        for(let i = 0; i < game.settings.zoom_factor; i++){
            for(let j = 0; j < game.settings.zoom_factor; j++){
                let tile = map.constructTile(i, j);
                map.container.appendChild(tile);
            }
        }

        let char = $('<img class="tile">');
        char.attr('src', util.typeToSrcString('hero'));
        char.css({'top': ((((game.settings.zoom_factor - 1) / 2) + 1) * map.cell_size)});
        char.css({'left': ((((game.settings.zoom_factor - 1) / 2) + 1) * map.cell_size)});
        char.css({'height': map.cell_size});
        char.css({'width': map.cell_size});
        char.data("x", game.character.x);
        char.data("y", game.character.y);
        map.container.appendChild(char);
    },

    indexToCoordinate: function(i, j){
        return {
            x: game.character.x - ((game.settings.zoom_factor - 1) / 2) + j,
            y: game.character.y - ((game.settings.zoom_factor - 1) / 2) + i,
        };
    },

    constructTile: function(i, j){
        let tile = $('<img class="tile">');
        let point = map.indexToCoordinate(i, j);
        tile.attr('src', util.typeToSrcString(map.get(point.x, point.y).type));
        tile.css({'top': i * map.cell_size});
        tile.css({'left': j * map.cell_size});
        tile.css({'height': map.cell_size});
        tile.css({'width': map.cell_size});
        tile.data("x", point.x);
        tile.data("y", point.y);
        return tile;
    },

    get: function(x, y){
        if(x >= 0 && y >= 0){
            while(game.world1.length <= x){
                game.world1.push([]);
            }
            while(game.world1[x].length <= y){
                game.world1[x].push([]);
            }
            if(game.world1[x][y] === null){
                util.generateChunk(util.getChunk(x, y).x, util.getChunk(x, y).y);
            }
            return game.world1[x][y];
        }else if(x >= 0 && y < 0){
            while(game.world2.length <= x){
                game.world2.push([]);
            }
            while(game.world2[x].length <= -1 * y){
                game.world2[x].push([]);
            }
            if(game.world2[x][-1 * y] === null){
                util.generateChunk(util.getChunk(x, y).x, util.getChunk(x, y).y);
            }
            return game.world2[x][-1 * y];
        }else if(x < 0 && y >= 0){
            while(game.world3.length <= -1 * x){
                game.world3.push([]);
            }
            while(game.world3[x].length <= y){
                game.world3[x].push([]);
            }
            if(game.world3[-1 * x][y] === null){
                util.generateChunk(util.getChunk(x, y).x, util.getChunk(x, y).y);
            }
            return game.world3[-1 * x][y];
        }else{
            while(game.world4.length <= -1 * x){
                game.world4.push([]);
            }
            while(game.world4[x].length <= -1 * y){
                game.world4[x].push([]);
            }
            if(game.world4[-1 * x][-1 * y] === null){
                util.generateChunk(util.getChunk(x, y).x, util.getChunk(x, y).y);
            }
            return game.world4[-1 * x][-1 * y];
        }
    },

    getAll: function(){
        let i = 0;
        let j = 0;
        let ans = [];
        for(i = 0; i < game.world1.length; i++){
            for(j = 0; j < game.world1[i].length; j++){
                ans.push({
                    x: i,
                    y: j,
                });
            }
        }
        for(i = 0; i < game.world2.length; i++){
            for(j = 0; j < game.world2[i].length; j++){
                ans.push({
                    x: i,
                    y: -1 * j,
                });
            }
        }
        for(i = 0; i < game.world3.length; i++){
            for(j = 0; j < game.world3[i].length; j++){
                ans.push({
                    x: -1 * i,
                    y: j,
                });
            }
        }
        for(i = 0; i < game.world4.length; i++){
            for(j = 0; j < game.world4[i].length; j++){
                ans.push({
                    x: -1 * i,
                    y: -1 * j,
                });
            }
        }
        return ans;
    },
};