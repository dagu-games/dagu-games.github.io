let map = {

    $container: null,

    size: null,

    cell_size: null,

    render: function(){
        map.$container = $('#map_container');
        map.size = map.$container.width();
        map.cell_size = map.size / game.settings.zoom_factor;
        map.$container.empty();

        for(let i = 0; i < game.settings.zoom_factor; i++){
            for(let j = 0; j < game.settings.zoom_factor; j++){
                map.$container.append(map.constructTile(i, j));
                map.$container.append(map.constructNPCTile(i, j));
            }
        }

        let $char = $('<img class="tile">');
        $char.attr('src', util.typeToSrcString('hero'));
        $char.css({'top': ((((game.settings.zoom_factor - 1) / 2)) * map.cell_size)});
        $char.css({'left': ((((game.settings.zoom_factor - 1) / 2)) * map.cell_size)});
        $char.css({'height': map.cell_size});
        $char.css({'width': map.cell_size});
        $char.data("x", game.character.x);
        $char.data("y", game.character.y);
        $char.click(user_interface.inspect);
        map.$container.append($char);
    },

    indexToCoordinate: function(i, j){
        return {
            x: game.character.x - ((game.settings.zoom_factor - 1) / 2) + j,
            y: game.character.y  + ((game.settings.zoom_factor - 1) / 2) - i,
        };
    },

    constructTile: function(i, j){
        let $tile = $('<img></img>');
        let point = map.indexToCoordinate(i, j);
        if(map.get(point.x, point.y).type == null){
            game_logic.generateChunk(util.getChunk(point.x, point.y).x,util.getChunk(point.x, point.y).y);
        }
        $tile.attr('src', util.typeToSrcString(map.get(point.x, point.y).type));
        $tile.addClass('tile');
        $tile.css({'top': i * map.cell_size})
        $tile.css({'left': j * map.cell_size});
        $tile.css({'height': map.cell_size});
        $tile.css({'width': map.cell_size});
        $tile.data("x", point.x);
        $tile.data("y", point.y);
        $tile.click(user_interface.inspect);
        return $tile;
    },

    constructNPCTile: function(i, j){
        let $tile = $('<img></img>');
        let point = map.indexToCoordinate(i, j);
        if(map.get(point.x, point.y).npc != null){
            $tile.attr('src', util.typeToSrcString(map.get(point.x, point.y).npc.type));
            $tile.addClass('tile');
            $tile.css({'top': i * map.cell_size})
            $tile.css({'left': j * map.cell_size});
            $tile.css({'height': map.cell_size});
            $tile.css({'width': map.cell_size});
            $tile.data("x", point.x);
            $tile.data("y", point.y);
            $tile.click(user_interface.inspect);
            return $tile;
        }else{
            return null;
        }
    },

    get: function(x, y){
        x = Math.floor(x);
        y = Math.floor(y);
        if(x >= 0 && y >= 0){
            while(game.world1.length <= x){
                game.world1.push([]);
            }
            while(game.world1[x].length <= y){
                game.world1[x].push({});
            }
            // if(game.world1[x][y] === null){
            //     game_logic.generateChunk(util.getChunk(x, y).x, util.getChunk(x, y).y);
            // }
            return game.world1[x][y];
        }else if(x >= 0 && y < 0){
            while(game.world2.length <= x){
                game.world2.push([]);
            }
            while(game.world2[x].length <= -1 * y){
                game.world2[x].push({});
            }
            // if(game.world2[x][-1 * y] === null){
            //     game_logic.generateChunk(util.getChunk(x, y).x, util.getChunk(x, y).y);
            // }
            return game.world2[x][-1 * y];
        }else if(x < 0 && y >= 0){
            while(game.world3.length <= -1 * x){
                game.world3.push([]);
            }
            while(game.world3[-1 * x].length <= y){
                game.world3[-1 * x].push({});
            }
            // if(game.world3[-1 * x][y] === null){
            //     game_logic.generateChunk(util.getChunk(x, y).x, util.getChunk(x, y).y);
            // }
            return game.world3[-1 * x][y];
        }else{
            while(game.world4.length <= -1 * x){
                game.world4.push([]);
            }
            while(game.world4[-1 * x].length <= -1 * y){
                game.world4[-1 * x].push({});
            }
            // if(game.world4[-1 * x][-1 * y] === null){
            //     game_logic.generateChunk(util.getChunk(x, y).x, util.getChunk(x, y).y);
            // }
            return game.world4[-1 * x][-1 * y];
        }
    },

    getAll: function(){
        let ans = [];
        for(let i = 0; i < game.world1.length; i++){
            for(let j = 0; j < game.world1[i].length; j++){
                ans.push({
                    x: i,
                    y: j,
                });
            }
        }
        for(let i = 0; i < game.world2.length; i++){
            for(let j = 0; j < game.world2[i].length; j++){
                ans.push({
                    x: i,
                    y: -1 * j,
                });
            }
        }
        for(let i = 0; i < game.world3.length; i++){
            for(let j = 0; j < game.world3[i].length; j++){
                ans.push({
                    x: -1 * i,
                    y: j,
                });
            }
        }
        for(let i = 0; i < game.world4.length; i++){
            for(let j = 0; j < game.world4[i].length; j++){
                ans.push({
                    x: -1 * i,
                    y: -1 * j,
                });
            }
        }
        return ans;
    },
};