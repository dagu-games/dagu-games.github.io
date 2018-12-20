let map = {

    $container: null,

    $tiles_container: null,

    $non_tiles_container: null,

    horizontal_count: null,

    vertical_size: null,

    cell_size: null,

    cached_chunks: [],

    init_run: false,

    render: function(){
        map.$container = $('#map_container');
        map.$tiles_container = $('#map_tiles_container');
        map.$non_tiles_container = $('#map_non_tiles_container');
        map.vertical_size = map.$container.height();
        map.cell_size = map.vertical_size / game.settings.zoom_factor;

        map.horizontal_count = 3;
        while(((map.horizontal_count+2) * map.cell_size) < map.$container.width()){
            map.horizontal_count += 2;
        }

        map.$container.css('width',((map.horizontal_count * map.cell_size) + 1) + 'px');


        if(map.init_run === false){
            map.$tiles_container.empty();
            for(let i = 0; i < game.settings.zoom_factor; i++){
                map.$tiles_container.append('<div id="map_tile_row_' + i + '" class="map_row"></div>');
                for(let j = 0; j < map.horizontal_count; j++){
                    map.initializeTile(i, j);
                }
            }
            map.init_run = true;
        }
        map.$non_tiles_container.empty();

        for(let i = 0; i < game.settings.zoom_factor; i++){
            for(let j = 0; j < map.horizontal_count; j++){
                map.updateTile(i, j);
                map.constructNPC(i, j);
                map.constructObject(i, j);
            }
        }

        let $char = $('<img>');
        $char.attr('src', ICONS.HERO);
        $char.addClass('tile');
        $char.css({'top': ((((game.settings.zoom_factor - 1) / 2)) * Math.floor(map.cell_size))});
        $char.css({'left': ((((map.horizontal_count - 1) / 2)) * Math.floor(map.cell_size))});
        $char.css({'height': Math.floor(map.cell_size)});
        $char.css({'width': Math.floor(map.cell_size)});
        if(!game.character.isFacingRight){
            $char.css({'-webkit-transform': 'scaleX(-1)','transform': 'scaleX(-1)'});
        }
        $char.data("x", game.character.x);
        $char.data("y", game.character.y);
        $char.click(user_interface.inspect);

        $('#character_health_bar_red').css('width',((game.character.current_health / util.characterStats.max_health()) * 100.0) + '%');
        $('#character_health_bar_text').text('Health: (' + game.character.current_health + '/' + util.characterStats.max_health() + ')');
        $('#character_mana_bar_blue').css('width',((game.character.current_mana / util.characterStats.max_mana()) * 100.0) + '%');
        $('#character_mana_bar_text').text('Mana: (' + game.character.current_mana + '/' + util.characterStats.max_mana() + ')');

        map.$non_tiles_container.append($char);
    },

    indexToCoordinate: function(i, j){
        return {
            x: game.character.x - ((map.horizontal_count - 1) / 2) + j,
            y: game.character.y  + ((game.settings.zoom_factor - 1) / 2) - i,
        };
    },

    initializeTile: function(i, j){
        let $tile = $('<img>');
        $tile.attr('id','map_tile_' + i + '_' + j);
        $tile.addClass('tile');
        $tile.css({'position': 'relative'});
        $tile.css({'height': Math.floor(map.cell_size)});
        $tile.css({'width': Math.floor(map.cell_size)});
        $('#map_tile_row_' + i).append($tile);
    },

    updateTile: function(i, j){
        let $tile = $('#map_tile_' + i + '_' + j);
        $tile.off('click');
        let point = map.indexToCoordinate(i, j);
        let map_entry = map.get(point.x, point.y);
        if(map_entry.tile == null){
            game_logic.generateChunk(util.getChunk(point.x, point.y).x,util.getChunk(point.x, point.y).y);
        }
        map_entry = map.get(point.x, point.y);
        $tile.attr('src', util.tileToSrcString(map_entry.tile));
        if(game.status === STATUS.COMBAT_ATTACK_SELECTED){
            $tile.css({'opacity':0.5});
        }else{
            $tile.css({'opacity':''});
        }
        $tile.data("x", point.x);
        $tile.data("y", point.y);
        if(map_entry.direction != null){
            $tile.css('transform','rotate(' + (map_entry.direction * 90) + 'deg)');
        }else{
            $tile.css('transform','');
        }
        if(map_entry.npc == null && map_entry.object == null){
            $tile.click(user_interface.inspect);
        }
    },

    constructNPC: function(i, j){
        let point = map.indexToCoordinate(i, j);
        let map_entry = map.get(point.x, point.y);
        if(map_entry.npc != null){
            let $tile = $('<img>');
            $tile.css({'top': i * Math.floor(map.cell_size)});
            $tile.css({'left': j * Math.floor(map.cell_size)});
            $tile.css({'height': Math.floor(map.cell_size)});
            $tile.css({'width': Math.floor(map.cell_size)});
            $tile.attr('src', map_entry.npc.icon);
            $tile.addClass('tile');
            $tile.data("x", point.x);
            $tile.data("y", point.y);
            if(game.status !== STATUS.COMBAT_ATTACK_SELECTED){
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
            map.$non_tiles_container.append($tile);

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
                map.$non_tiles_container.append($health_bar);
                map.$non_tiles_container.append($red_bar);
            }
        }
    },



    constructObject: function(i, j){
        let point = map.indexToCoordinate(i, j);
        let map_entry = map.get(point.x, point.y);
        if(map_entry.object != null){
            let $tile = $('<img>');
            $tile.css({'top': i * Math.floor(map.cell_size)});
            $tile.css({'left': j * Math.floor(map.cell_size)});
            $tile.css({'height': Math.floor(map.cell_size)});
            $tile.css({'width': Math.floor(map.cell_size)});
            $tile.attr('src', util.objectToSrcString(map_entry.object));
            $tile.addClass('tile');
            $tile.data("x", point.x);
            $tile.data("y", point.y);
            if(game.status !== STATUS.COMBAT_ATTACK_SELECTED){
                $tile.click(user_interface.inspect);
            }else{
                $tile.css({'opacity':0.5});
            }

            if(point.x > game.character.x){
                $tile.css({'-webkit-transform': 'scaleX(-1)','transform': 'scaleX(-1)'});
            }
            map.$non_tiles_container.append($tile);
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
            if(game.chunks[i].points[0].data.tile != null){
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