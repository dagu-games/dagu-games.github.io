let pathfinder = {
    findShortestPath: function(x1, y1, x2, y2){
        //console.log("pathing out " + x1 + "," + y1 + " to " + x2 + "," + y2);
        let limit = map.getAll().length;
        let count = 0;
        let location = {
            x: x1,
            y: y1,
            path: [],
            status: 'Start'
        };
        let queue = [location];
        while(queue.length > 0 && count < limit){
            count++;
            let currentLocation = queue.shift();
            for(let i = 0; i < 8; i++){
                let newLocation = this.exploreInDirection(currentLocation, i, x1, y1, x2, y2);
                if(newLocation.status === 'Goal'){
                    pathfinder.resetPFVariable();
                    return newLocation.path;
                }else if(newLocation.status === 'Valid'){
                    queue.push(newLocation);
                }
            }
        }
        pathfinder.resetPFVariable();
        return false;
    },
    locationStatus: function(x1, y1, x2, y2){
        if(map.get(x1, y1) == null){
            return 'Invalid';
        }else if(x1 === x2 && y1 === y2){
            return 'Goal';
        }else if(!util.isWalkable(x1, y1) || (map.get(x1, y1).pf != null && map.get(x1, y1).pf.visited === true)){
            return 'Blocked';
        }else{
            return 'Valid';
        }
    },
    exploreInDirection: function(currentLocation, direction, x1, y1, x2, y2){
        let newPath = currentLocation.path.slice();
        newPath.push(direction);
        let x = currentLocation.x;
        let y = currentLocation.y;
        if(direction === 0){
            x++;
        }else if(direction === 1){
            x++;
            y++;
        }else if(direction === 2){
            y++;
        }else if(direction === 3){
            x--;
            y++;
        }else if(direction === 4){
            x--;
        }else if(direction === 5){
            x--;
            y--;
        }else if(direction === 6){
            y--;
        }else if(direction === 7){
            x++;
            y--;
        }
        let newLocation = {
            x: x,
            y: y,
            path: newPath,
            status: 'Unknown'
        };
        newLocation.status = pathfinder.locationStatus(x, y, x2, y2);
        if(newLocation.status === 'Valid'){
            map.get(x, y).pf = {
                visited:true
            };
        }
        return newLocation;
    },
    resetPFVariable: function(){
        let points = map.getAll();

        for(let i = 0; i < points.length; i++){
            map.get(points[i].x,points[i].y).pf = {
                visited: false,
            };
        }
    }
};