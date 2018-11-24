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

        let $char = $('<img>');
        $char.attr('src', util.typeToSrcString('hero'));
        $char.addClass('tile');
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
        let $tile = $('<img>');
        let point = map.indexToCoordinate(i, j);
        let map_entry = map.get(point.x, point.y);
        if(map_entry.type == null){
            game_logic.generateChunk(util.getChunk(point.x, point.y).x,util.getChunk(point.x, point.y).y);
        }
        map_entry = map.get(point.x, point.y);
        $tile.attr('src', util.typeToSrcString(map_entry.type));
        $tile.addClass('tile');
        $tile.css({'top': i * map.cell_size});
        $tile.css({'left': j * map.cell_size});
        $tile.css({'height': map.cell_size});
        $tile.css({'width': map.cell_size});
        if(game.status === STATUS.COMBAT_SPELL_SELECTED){
            $tile.css({'opacity':0.5});
        }
        $tile.data("x", point.x);
        $tile.data("y", point.y);
        if(map_entry.npc == null){
            $tile.click(user_interface.inspect);
        }
        return $tile;
    },

    constructNPCTile: function(i, j){
        let $tile = $('<img>');
        let point = map.indexToCoordinate(i, j);
        let map_entry = map.get(point.x, point.y);
        if(map_entry.npc != null){
            $tile.attr('src', util.typeToSrcString(map_entry.npc.type));
            $tile.addClass('tile');
            $tile.css({'top': i * map.cell_size});
            $tile.css({'left': j * map.cell_size});
            $tile.css({'height': map.cell_size});
            $tile.css({'width': map.cell_size});
            $tile.data("x", point.x);
            $tile.data("y", point.y);
            if(game.status !== STATUS.COMBAT_SPELL_SELECTED){
                $tile.click(user_interface.inspect);
            }else{
                if(map_entry.npc.type === 'monster' && util.isInRange(game.character.x,game.character.y,map_entry.x,map_entry.y,character_attack.getAttack(game.selected_spell).range)){
                    $tile.click(user_interface.attackMonster);
                }
            }
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
        map.sortChunks();

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
        for(let i = 0; i < game.chunks.length; i++){
            if(game.chunks[i].points[0].data.type != null){
                for(let j = 0; j < game.chunks[i].points.length; j++){
                    ans.push({
                        x:game.chunks[i].points[j].x,
                        y:game.chunks[i].points[j].y,
                    });
                }
            }
        }
        return ans;
    },

    getChunk: function(x,y){
        for(let i = 0; i < game.chunks.length; i++){
            if(game.chunks[i].x === x && game.chunks[i].y === y){
                return game.chunks[i];
            }
        }
        return null;
    },

    sortChunks: function(left, right){
        if(left == null){
            left = 0;
        }
        if(right == null){
            left = game.chunks.length - 1;
        }
        let length = game.chunks.length;
        let pivot;
        let partitionIndex;


        if(left < right){
            pivot = right;
            partitionIndex = map.partition(pivot, left, right);

            //sort left and right
            map.sortChunks(left, partitionIndex - 1);
            map.sortChunks(partitionIndex + 1, right);
        }
        return game.chunks;
    },

    swap: function(i, j){
        let temp = game.chunks[i];
        game.chunks[i] = game.chunks[j];
        game.chunks[j] = temp;
    },

    partition: function(pivot, left, right){
        let partitionIndex = left;

        for(let i = left; i < right; i++){
            if(map.compare(i,pivot) === -1){
                map.swap(i, partitionIndex);
                partitionIndex++;
            }
        }
        map.swap(right, partitionIndex);
        return partitionIndex;
    },

    compare: function(i,j){
        if(game.chunks[i].x < game.chunks[j].x){
            return -1;
        }else if(game.chunks[i].x > game.chunks[j].x){
            return 1;
        }else if(game.chunks[i].y > game.chunks[j].y){
            return -1;
        }else{
            return 1;
        }
    },
};