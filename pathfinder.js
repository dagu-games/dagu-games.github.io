var pathfinder = {
    findShortestPath:function(x1,y1,x2,y2) {
        var location = {
            x: x1,
            y: y1,
            path: [],
            status: 'Start'
        };
        var queue = [location];
        while(queue.length > 0){
            var currentLocation = queue.shift();
            for(var i = 0; i < 8; i++){
                var newLocation = this.exploreInDirection(currentLocation, i ,x1,y1,x2,y2);
                if (newLocation.status === 'Goal') {
                    return newLocation.path;
                } else if (newLocation.status === 'Valid') {
                    queue.push(newLocation);
                }
            }
        }
        return false;
    },
    locationStatus:function(x1,y1,x2,y2){
        if (world.get(x1,y1)==null){
            return 'Invalid';
        }else if(x1===x2 && y1===y2){
            return 'Goal';
        }else if(!util.isWalkable(x1,y1) || world.get(x1,y1).pf.visited === true){
            return 'Blocked';
        }else{
            return 'Valid';
        }
    },
    exploreInDirection:function(currentLocation, direction, x1,y1,x2,y2){
        var newPath = currentLocation.path.slice();
        newPath.push(direction);
        var x = currentLocation.x;
        var y = currentLocation.y;
        if (direction === 0) {
            x++;
        } else if (direction === 1) {
            x++;
            y++;
        } else if (direction === 2) {
            y++;
        } else if (direction === 3) {
            x--;
            y++;
        } else if (direction === 4) {
            x--;
        } else if (direction === 5) {
            x--;
            y--;
        } else if (direction === 6) {
            y--;
        } else if (direction === 7) {
            x++;
            y--;
        }
        var newLocation = {
            x: x,
            y: y,
            path: newPath,
            status: 'Unknown'
        };
        newLocation.status = this.locationStatus(newLocation,x2,y2);
        if (newLocation.status === 'Valid') {
            world.get(x,y).pf.visited = true;
        }
        return newLocation;
    },
};