var map_controller = {
    render_map: function(){
        var map_container = document.getElementById("map_container");
        if(map_container.children.length !== game.settings.zoom_factor){
            map_container.innerHTML = "";
            for(var i = 0; i < game.settings.zoom_factor; i++){
                var row_container = document.createElement("div");
                row_container.className = "map_row_container";
                map_container.appendChild(row_container);
                for(var j = 0; j < game.settings.zoom_factor; j++){
                    var tile = document.createElement("img");
                    tile.src = map_controller.indexToSrcString(i,j);
                    tile.className = "tile_img";
                    row_container.appendChild(tile);
                }
            }
        }
        var row_containers = map_container.children;
        for(i = 0; i < game.settings.zoom_factor; i++){
            var tiles = row_containers[i].children;
            for(j = 0; j < game.settings.zoom_factor; j++){
                tiles[j].src = map_container.indexToSrcString(i,j);
            }
        }
    },

    indexToSrcString: function(i, j){
        var x = game.character.x - ((game.settings.zoom_factor-1)/2) + j;
        var y = game.character.y - ((game.settings.zoom_factor-1)/2) + i;
        return util.typeToTile(world.get(x,y).type);
    },
};