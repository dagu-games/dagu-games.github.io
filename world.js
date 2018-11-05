var world = {
    get : function(x,y){
        if(x>=0&&y>=0){
            if(game.world1[x][y] === null){
                util.generateChunk(x,y);
            }
            return game.world1[x][y];
        }else if(x>=0&&y<0){
            if(game.world2[x][-1*y] === null){
                util.generateChunk(x,y);
            }
            return game.world2[x][-1*y];
        }else if(x<0&&y>=0){
            if(game.world3[-1*x][y] === null){
                util.generateChunk(x,y);
            }
            return game.world3[-1*x][y];
        }else{
            if(game.world4[-1*x][-1*y] === null){
                util.generateChunk(x,y);
            }
            return game.world4[-1*x][-1*y];
        }
    },
};