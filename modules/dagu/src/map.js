let map = {

    canvas: null,

    context: null,

    horizontal_count: null,

    cell_size: null,

    render: function(){
        if(map_render_locked){
            return;
        }
        util.resizeCanvas();
        map.canvas = document.getElementById('map');
        map.context = map.canvas.getContext('2d');
        map.cell_size = Math.floor(map.canvas.height / game.settings.zoom_factor);

        map.horizontal_count = 3;
        while(((map.horizontal_count+2) * map.cell_size) < map.canvas.width){
            map.horizontal_count += 2;
        }

        for(let i = 0; i < game.settings.zoom_factor+1; i++){
            for(let j = 0; j < map.horizontal_count+2; j++){
                let point = map.indexToCoordinate(i, j);
                let map_entry = map.get(point.x, point.y);
                map.updateTile(i, j, point.x, point.y, map_entry);
                map.updateNPC(i, j, point.x, point.y, map_entry);
                map.updateObject(i, j, point.x, point.y, map_entry);
            }
        }

        if(game.character.isFacingRight){
            map.context.drawImage(MAP_ICONS.HERO, ((((map.horizontal_count - 1) / 2)) * map.cell_size), ((((game.settings.zoom_factor - 1) / 2)) * map.cell_size), map.cell_size, map.cell_size);
        }else{
            map.context.drawImage(MAP_ICONS.HERO_FLIPPED, ((((map.horizontal_count - 1) / 2)) * map.cell_size), ((((game.settings.zoom_factor - 1) / 2)) * map.cell_size), map.cell_size, map.cell_size);
        }

        $('#character_health_bar_red').css('width',((game.character.current_health / util.characterStats.max_health()) * 100.0) + '%');
        $('#character_health_bar_text').text('Health: (' + game.character.current_health + '/' + util.characterStats.max_health() + ')');
        $('#character_mana_bar_blue').css('width',((game.character.current_mana / util.characterStats.max_mana()) * 100.0) + '%');
        $('#character_mana_bar_text').text('Mana: (' + game.character.current_mana + '/' + util.characterStats.max_mana() + ')');
    },

    indexToCoordinate: function(i, j){
        return {
            x: game.character.x - ((map.horizontal_count - 1) / 2) + j,
            y: game.character.y  + ((game.settings.zoom_factor - 1) / 2) - i,
        };
    },

    updateTile: function(i, j, x, y, map_entry){
        if(map_entry.tile == null){
            game_logic.generateChunk(util.getChunk(x, y).x,util.getChunk(x, y).y);
        }
        map_entry = map.get(x, y);

        if(game.status === STATUS.COMBAT_ATTACK_SELECTED){
            map.context.globalAlpha = ATTACK_SELECTED_OPACITY;
        }

        map.context.drawImage(util.tileToImage(map_entry.tile), j * map.cell_size, i * map.cell_size, map.cell_size, map.cell_size);

        if(game.status === STATUS.COMBAT_ATTACK_SELECTED){
            map.context.globalAlpha = 1.0;
        }
    },

    updateNPC: function(i, j, x, y, map_entry){
        if(map_entry.npc != null){

            let image;
            if(map_entry.npc.type === 'monster'){
                if(x > game.character.x){
                    image = monsters.getMonster(map_entry.npc.name).icon_flipped;
                }else{
                    image = monsters.getMonster(map_entry.npc.name).icon;
                }
            }else{
                if(x > game.character.x){
                    image = MAP_ICONS.NPCS_FLIPPED[map_entry.npc.icon];
                }else{
                    image = MAP_ICONS.NPCS[map_entry.npc.icon];
                }
            }

            if(game.status === STATUS.COMBAT_ATTACK_SELECTED){
                if(map_entry.npc.type !== 'monster' || util.distanceBetween(game.character.x,game.character.y,x,y) > character_attack.getAttack(game.selected_attack).range){
                    map.context.globalAlpha = ATTACK_SELECTED_OPACITY;
                }
            }
            map.context.drawImage(image, j * map.cell_size, i * map.cell_size, map.cell_size, map.cell_size);
            if(game.status === STATUS.COMBAT_ATTACK_SELECTED){
                map.context.globalAlpha = 1.0;
            }

            if(map_entry.npc.type === 'monster'){
                map.context.fillStyle = '#9099A2';
                map.context.fillRect(j * map.cell_size, ((i+1) * map.cell_size), Math.floor(map.cell_size / 10.0), map.cell_size);
                map.context.fillStyle = 'red';
                map.context.fillRect(j * map.cell_size, ((i+1) * map.cell_size) - (Math.floor(map.cell_size)/10.0), Math.floor((map.cell_size * (map_entry.npc.current_health / map_entry.npc.max_health))), map.cell_size);
            }
        }
    },

    updateObject: function(i, j, x, y, map_entry){
        if(map_entry.object != null){
            if(game.status === STATUS.COMBAT_ATTACK_SELECTED){
                map.context.globalAlpha = ATTACK_SELECTED_OPACITY;
            }

            map.context.drawImage(util.objectToImage(map_entry.object), j * map.cell_size, i * map.cell_size, map.cell_size, map.cell_size);

            if(game.status === STATUS.COMBAT_ATTACK_SELECTED){
                map.context.globalAlpha = 1.0;
            }
        }
    },

    get: function(x, y){
        let key = x + ',' + y;
        if(game.map_data[key] == null){
            game.map_data[key] = {};
        }
        return game.map_data[key];
    },

    getAll: function(){
        let ans = [];
        for(let key in game.map_data){
            if(game.map_data.hasOwnProperty(key)){
                let arr = key.split(',');
                    ans.push({
                        x:Number(arr[0]),
                        y:Number(arr[1]),
                    });
            }
        }
        return ans;
    },

    getChunk: function(chunk_x,chunk_y){
        let key = chunk_x + ',' + chunk_y;
        if(game.chunks[key] == null){
            game.chunks[key] = {};
        }
        return game.chunks[key];
    },
};