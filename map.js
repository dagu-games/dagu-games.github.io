var map = {
    container: null,
    render: function(){
        map.container = document.getElementById("map_container");
        map.size = map.container.style.width;
        map.cell_size = map.size / game.settings.zoom_factor;
        while(map.container.hasChildNodes()){
            map.container.removeChild(map.container.firstChild);
        }
        for(var i = 0; i < game.settings.zoom_factor; i++){
            for(var j = 0; j < game.settings.zoom_factor; j++){
                var tile = map.constructTile(i,j);
                map.container.appendChild(tile);
            }
        }
    },

    indexToSrcString: function(i, j){
        var x = game.character.x - ((game.settings.zoom_factor-1)/2) + j;
        var y = game.character.y - ((game.settings.zoom_factor-1)/2) + i;
        return util.typeToTile(world.get(x,y).type);
    },

    constructTile: function(i,j){
        var tile = document.createElement("img");
        tile.src = map.indexToSrcString(i,j);
        tile.className = "tile";
        tile.style.top = i * map.cell_size;
        tile.style.left = j * map.cell_size;
        tile.style.height = map.cell_size;
        tile.style.width = map.cell_size;
        return tile;
    },
};