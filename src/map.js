let map = {

    $container: null,

    size: null,

    cell_size: null,

    cached_chunks: [],

    render: function(){
        map.$container = $('#map_container');
        map.size = map.$container.width();
        map.cell_size = map.size / game.settings.zoom_factor;
        map.$container.empty();

        for(let i = 0; i < game.settings.zoom_factor; i++){
            for(let j = 0; j < game.settings.zoom_factor; j++){
                map.$container.append(map.constructTile(i, j));
                map.constructNPCTile(i, j);
            }
        }

        for(let i = 0; i < game.settings.zoom_factor; i++){
            for(let j = 0; j < game.settings.zoom_factor; j++){
                map.constructNPCTile(i, j);
            }
        }

        let $char = $('<img>');
        $char.attr('src', util.typeToSrcString('hero'));
        $char.addClass('tile');
        $char.css({'top': ((((game.settings.zoom_factor - 1) / 2)) * Math.floor(map.cell_size))});
        $char.css({'left': ((((game.settings.zoom_factor - 1) / 2)) * Math.floor(map.cell_size))});
        $char.css({'height': Math.floor(map.cell_size)});
        $char.css({'width': Math.floor(map.cell_size)});
        $char.data("x", game.character.x);
        $char.data("y", game.character.y);
        $char.click(user_interface.inspect);

        let $health_bar = $('<div></div>');
        $health_bar.css({'position':'absolute','background-color':'gray'});
        $health_bar.css({'top': ((((game.settings.zoom_factor - 1) / 2)+1) * Math.floor(map.cell_size))});
        $health_bar.css({'left': ((((game.settings.zoom_factor - 1) / 2)) * Math.floor(map.cell_size))});
        $health_bar.css({'height': Math.floor(map.cell_size / 10.0)});
        $health_bar.css({'width': Math.floor(map.cell_size)});

        let $red_bar = $('<div></div>');
        $red_bar.css({'position':'absolute','background-color':'red'});
        $red_bar.css({'top': ((((game.settings.zoom_factor - 1) / 2)+1) * Math.floor(map.cell_size))});
        $red_bar.css({'left': ((((game.settings.zoom_factor - 1) / 2)) * Math.floor(map.cell_size))});
        $red_bar.css({'height': Math.floor(map.cell_size / 10.0)});
        $red_bar.css({'width': Math.floor((map.cell_size * (game.character.current_health / util.characterStats.max_health())))});

        let $mana_bar = $('<div></div>');
        $mana_bar.css({'position':'absolute','background-color':'gray'});
        $mana_bar.css({'top': ((((game.settings.zoom_factor - 1) / 2)+1) * Math.floor(map.cell_size)) + (Math.floor(map.cell_size) / 10.0)});
        $mana_bar.css({'left': ((((game.settings.zoom_factor - 1) / 2)) * Math.floor(map.cell_size))});
        $mana_bar.css({'height': Math.floor(map.cell_size / 10.0)});
        $mana_bar.css({'width': Math.floor(map.cell_size)});

        let $blue_bar = $('<div></div>');
        $blue_bar.css({'position':'absolute','background-color':'blue'});
        $blue_bar.css({'top': ((((game.settings.zoom_factor - 1) / 2)+1) * Math.floor(map.cell_size)) + (Math.floor(map.cell_size) / 10.0)});
        $blue_bar.css({'left': ((((game.settings.zoom_factor - 1) / 2)) * Math.floor(map.cell_size))});
        $blue_bar.css({'height': Math.floor(map.cell_size / 10.0)});
        $blue_bar.css({'width': Math.floor((map.cell_size * (game.character.current_mana / util.characterStats.max_mana())))});

        map.$container.append($char);
        map.$container.append($health_bar);
        map.$container.append($red_bar);
        map.$container.append($mana_bar);
        map.$container.append($blue_bar);
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
        //$tile.css({'top': i * map.cell_size});
        //$tile.css({'left': j * map.cell_size});
        $tile.css({'position': 'relative'});
        $tile.css({'height': Math.floor(map.cell_size)});
        $tile.css({'width': Math.floor(map.cell_size)});
        if(game.status === STATUS.COMBAT_SPELL_SELECTED){
            $tile.css({'opacity':0.5});
        }
        $tile.data("x", point.x);
        $tile.data("y", point.y);
        if(map_entry.direction != null && map_entry.direction !== 0){
            $tile.css('transform','rotate(' + (map_entry.direction * 90) + 'deg)');
            //$tile.css('margin-right','-1px');
            //$tile.css('margin-bottom','-1px');
        }
        if(map_entry.npc == null){
            $tile.click(user_interface.inspect);
        }
        return $tile;
    },

    constructNPCTile: function(i, j){
        let point = map.indexToCoordinate(i, j);
        let map_entry = map.get(point.x, point.y);
        //console.debug(map_entry);
        if(map_entry.npc != null){
            let $tile = $('<img>');
            $tile.css({'top': i * Math.floor(map.cell_size)});
            $tile.css({'left': j * Math.floor(map.cell_size)});
            $tile.css({'height': Math.floor(map.cell_size)});
            $tile.css({'width': Math.floor(map.cell_size)});
            $tile.attr('src', util.typeToSrcString(map_entry.npc.type));
            $tile.addClass('tile');
            $tile.data("x", point.x);
            $tile.data("y", point.y);
            if(game.status !== STATUS.COMBAT_SPELL_SELECTED){
                $tile.click(user_interface.inspect);
            }else{
                if(map_entry.npc.type === 'monster' && util.distanceBetween(game.character.x,game.character.y,point.x,point.y) <= character_attack.getAttack(game.selected_attack).range){
                    $tile.click(user_interface.attackMonster);
                }else{
                    $tile.css({'opacity':0.5});
                }
            }

            if(point.x > game.character.x){
                $tile.css({'-webkit-transform': 'scaleX(-1)','transform': 'scaleX(-1)'});
            }
            map.$container.append($tile);

            if(map_entry.npc.type === 'monster'){
                let $health_bar = $('<div></div>');
                $health_bar.css({'position':'absolute','background-color':'gray'});
                $health_bar.css({'top': ((i+1) * Math.floor(map.cell_size)) - (Math.floor(map.cell_size)/10.0)});
                $health_bar.css({'left': j * Math.floor(map.cell_size)});
                $health_bar.css({'height': Math.floor(map.cell_size / 10.0)});
                $health_bar.css({'width': Math.floor(map.cell_size)});
                let $red_bar = $('<div></div>');
                $red_bar.css({'position':'absolute','background-color':'red'});
                $red_bar.css({'top': ((i+1) * Math.floor(map.cell_size)) - (Math.floor(map.cell_size)/10.0)});
                $red_bar.css({'left': j *Math.floor(map.cell_size)});
                $red_bar.css({'height': Math.floor(map.cell_size / 10.0)});
                $red_bar.css({'width': Math.floor((map.cell_size * (map_entry.npc.current_health / map_entry.npc.max_health)))});
                map.$container.append($health_bar);
                map.$container.append($red_bar);
            }
        }
    },

    get: function(x, y){
        x = Math.floor(x);
        y = Math.floor(y);
        let chunk_x = util.getChunk(x,y).x;
        let chunk_y = util.getChunk(x,y).y;
        let chunk = map.getChunk(chunk_x,chunk_y);

        for(let i = 0; i < chunk.points.length; i++){
            if(chunk.points[i].x === x && chunk.points[i].y === y){
                return chunk.points[i].data;
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

    getChunk: function(chunk_x,chunk_y){
        for(let i = 0; i < map.cached_chunks.length; i++){
            let k = map.cached_chunks[i];
            if(game.chunks[k].x === chunk_x && game.chunks[k].y === chunk_y){
                return game.chunks[k];
            }
        }

        for(let i = 0; i < game.chunks.length; i++){
            if(game.chunks[i].x === chunk_x && game.chunks[i].y === chunk_y){
                if(map.cached_chunks.length < CACHED_CHUNKS){
                    map.cached_chunks.push(i);
                }else{
                    map.cached_chunks.unshift(i);
                    map.cached_chunks.pop();
                }
                return game.chunks[i];
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
        return game.chunks[game.chunks.length-1];
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