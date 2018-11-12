var map = {
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
        for(var i = 0; i < game.settings.zoom_factor; i++){
            for(var j = 0; j < game.settings.zoom_factor; j++){
                var tile = map.constructTile(i,j);
                map.container.appendChild(tile);
            }
        }
    },

    indexToCoordinate: function(i, j){
        return {
            x: game.character.x - ((game.settings.zoom_factor-1)/2) + j,
            y: game.character.y - ((game.settings.zoom_factor-1)/2) + i,
        };
    },

    constructTile: function(i,j){
        var tile = document.createElement("img");
        var point = map.indexToCoordinate(i,j);
        tile.src = util.typeToSrcString(world.get(point.x,point.y).type);
        tile.className = "tile";
        tile.style.top = i * map.cell_size;
        tile.style.left = j * map.cell_size;
        tile.style.height = map.cell_size;
        tile.style.width = map.cell_size;
        tile.data("x",point.x);
        tile.data("y",point.y);
        return tile;
    },
};