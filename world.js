var world = {
    get: function(x,y){
        if(x>=0&&y>=0){
            while(game.world1.length <= x){
                game.world1.push([]);
            }
            while(game.world1[x].length <= y){
                game.world1[x].push([]);
            }
            if(game.world1[x][y] === null){
                util.generateChunk(util.getChunk(x,y).x,util.getChunk(x,y).y);
            }
            return game.world1[x][y];
        }else if(x>=0&&y<0){
            while(game.world2.length <= x){
                game.world2.push([]);
            }
            while(game.world2[x].length <= -1*y){
                game.world2[x].push([]);
            }
            if(game.world2[x][-1*y] === null){
                util.generateChunk(util.getChunk(x,y).x,util.getChunk(x,y).y);
            }
            return game.world2[x][-1*y];
        }else if(x<0&&y>=0){
            while(game.world3.length <= -1*x){
                game.world3.push([]);
            }
            while(game.world3[x].length <= y){
                game.world3[x].push([]);
            }
            if(game.world3[-1*x][y] === null){
                util.generateChunk(util.getChunk(x,y).x,util.getChunk(x,y).y);
            }
            return game.world3[-1*x][y];
        }else{
            while(game.world4.length <= -1*x){
                game.world4.push([]);
            }
            while(game.world4[x].length <= -1*y){
                game.world4[x].push([]);
            }
            if(game.world4[-1*x][-1*y] === null){
                util.generateChunk(util.getChunk(x,y).x,util.getChunk(x,y).y);
            }
            return game.world4[-1*x][-1*y];
        }
    },

    getAll: function(){
        var i = 0;
        var j = 0;
        var ans = [];
        for(i=0;i<game.world1.length;i++){
            for(j=0;j<game.world1[i].length;j++){
                ans.push({
                    x:i,
                    y:j,
                });
            }
        }
        for(i=0;i<game.world2.length;i++){
            for(j=0;j<game.world2[i].length;j++){
                ans.push({
                    x:i,
                    y:-1*j,
                });
            }
        }
        for(i=0;i<game.world3.length;i++){
            for(j=0;j<game.world3[i].length;j++){
                ans.push({
                    x:-1*i,
                    y:j,
                });
            }
        }
        for(i=0;i<game.world4.length;i++){
            for(j=0;j<game.world4[i].length;j++){
                ans.push({
                    x:-1*i,
                    y:-1*j,
                });
            }
        }
        return ans;
    },
};