let pathfinder = {
    findShortestPath: function(start_x, start_y, goal_x, goal_y){
        //console.log("pathing out " + x1 + "," + y1 + " to " + x2 + "," + y2);
        let limit = map.getAll().length;
        //console.log("limit is " + limit);
        let start_time = (new Date()).getTime();
        let count = 0;
        let location = {
            x: start_x,
            y: start_y,
            path: [],
            status: 'Start'
        };
        let queue = [location];
        while(queue.length > 0 && count < limit){
            count++;
            let currentLocation = queue.shift();
            for(let i = 0; i < 4; i++){
                let newLocation = this.exploreInDirection(currentLocation, i, start_x, start_y, goal_x, goal_y);
                if(newLocation.status === 'Goal'){
                    pathfinder.resetPFVariable();
                    //console.log("found a path in " + (((new Date).getTime() - start_time)/1000.0) + " seconds after " + count + " tiles checked. that comes to " + ((((new Date).getTime() - start_time)/1000.0)/count));
                    return newLocation.path;
                }else if(newLocation.status === 'Valid'){
                    queue.push(newLocation);
                }
            }
        }
        pathfinder.resetPFVariable();
        //console.log("failed to path " + x1 + "," + y1 + " to " + x2 + "," + y2);
        return false;
    },
    locationStatus: function(x, y, goal_x, goal_y){
        //console.log("checking status of " + x + "," + y);
        if(map.get(x, y).tile == null){
            //console.log('Invalid');
            return 'Invalid';
        }else if(x === goal_x && y === goal_y){
            //console.log('Goal');
            return 'Goal';
        }else if(!util.isWalkable(x, y) || (map.get(x, y).pf != null && map.get(x, y).pf.visited === true)){
            //console.log('Blocked');
            return 'Blocked';
        }else{
            //console.log('Valid');
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
            y++;
        }else if(direction === 2){
            x--;
        }else if(direction === 3){
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