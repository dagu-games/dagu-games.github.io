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
        let chunk_x = util.getChunk(x,y).x;
        let chunk_y = util.getChunk(x,y).y;
        //console.log("point " + x + "," + y + "lies in chunk " + chunk_x + "," + chunk_y);

        for(let i = 0; i < game.chunks.length; i++){
            if(game.chunks[i].x === chunk_x && game.chunks[i].y === chunk_y){
                for(let j = 0; j < game.chunks[i].points.length; j++){
                    if(game.chunks[i].points[j].x === x && game.chunks[i].points[j].y === y){
                        return game.chunks[i].points[j].data;
                    }
                }
            }
        }

        let chunk = {
            x:chunk_x,
            y:chunk_y,
            points:[],
        };

        for(let i = CHUNK_SIZE*chunk_x; i < CHUNK_SIZE*(chunk_x+1); i++){
            for(let j = CHUNK_SIZE*chunk_y; j < CHUNK_SIZE*(chunk_y+1); j++){
                chunk.points.push({
                    x:i,
                    y:j,
                    data:{},
                });
            }
        }

        game.chunks.push(chunk);

        for(let i = 0; i < game.chunks.length; i++){
            if(game.chunks[i].x === chunk_x && game.chunks[i].y === chunk_y){
                for(let j = 0; j < game.chunks[i].points.length; j++){
                    if(game.chunks[i].points[j].x === x && game.chunks[i].points[j].y === y){
                        return game.chunks[i].points[j].data;
                    }
                }
            }
        }
    },

    getAll: function(){
        let ans = [];
        for(let i = 0; i < game.chunks; i++){
            for(let j = 0; j < game.chunks[i].points.length; i++){
                ans.push({
                    x:game.chunks[i].points[j].x,
                    y:game.chunks[i].points[j].y,
                });
            }
        }
        return ans;
    },
};