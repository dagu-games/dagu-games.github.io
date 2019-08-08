var heightmap = {
    points : null,
    height : 512,
    width : 512,
    rough : 255,
    passSize : 32,
    max : 0,
    elevations_list : [],
    createPoint : function(x, y) {
        let r = {
            x : x,
            y : y,
        };
        
        r.z = 0;

        if (Math.random() > 0.3) {
            r.z = Math.abs(Math.sin(x * y) * heightmap.rough);
        }
        return r;
    },
    getPoint : function (x, y) {
        (x = (x + heightmap.width) % heightmap.width), (y = (y + heightmap.height) % heightmap.height);

        return heightmap.points[x][y].z;
    },
    setPoint : function(x, y, value) {
        (x = (x + heightmap.width) % heightmap.width), (y = (y + heightmap.height) % heightmap.height);

        heightmap.points[x][y].z = value;
    },
    pointFromSquare : function(x, y, size, value) {
        var hs = size / 2,
            // a   b
            //   x
            // c   d
            a = heightmap.getPoint(x - hs, y - hs),
            b = heightmap.getPoint(x + hs, y - hs),
            c = heightmap.getPoint(x - hs, y + hs),
            d = heightmap.getPoint(x + hs, y + hs);

        heightmap.setPoint(x, y, (a + b + c + d) / 4 + value);
    },
    pointFromDiamond : function(x, y, size, value) {
        var hs = size / 2,
            //   c
            //a  x  b
            //   d
            a = heightmap.getPoint(x - hs, y),
            b = heightmap.getPoint(x + hs, y),
            c = heightmap.getPoint(x, y - hs),
            d = heightmap.getPoint(x, y + hs);

        heightmap.setPoint(x, y, (a + b + c + d) / 4 + value);
    },
    diamondSquare : function(stepSize, scale) {
        var halfStep = stepSize / 2;

        for (var y = halfStep; y < heightmap.height + halfStep; y += stepSize) {
            for (var x = halfStep; x < heightmap.width + halfStep; x += stepSize) {
                heightmap.pointFromSquare(x, y, stepSize, Math.random() * scale);
            }
        }

        for (var y = 0; y < this.height; y += stepSize) {
            for (var x = 0; x < this.width; x += stepSize) {
                heightmap.pointFromDiamond(x + halfStep, y, stepSize, Math.random() * scale);
                heightmap.pointFromDiamond(x, y + halfStep, stepSize, Math.random() * scale);
            }
        }
    },
    seed : function(newWidth, newHeight) {
        newWidth = newWidth - 1 || heightmap.width;
        newHeight = newHeight - 1 || heightmap.height;

        for (var x = 0; x < newWidth; x++) {
            for (var y = 0; y < newHeight; y++) {
                if (!heightmap.points[x]) {
                    heightmap.points.push([]);
                }

                if (!heightmap.points[x][y]) {
                    heightmap.points[x].push(heightmap.createPoint(x, y));
                } else {
                    heightmap.setPoint(x, y, Math.random() * heightmap.rough);
                }
            }
        }
    },
    smoothTerrain : function () {
        var sampleSize = heightmap.passSize,
            scaleFactor = 1;

        while (sampleSize > 1) {
            heightmap.diamondSquare(sampleSize, scaleFactor);

            sampleSize /= 2;
            scaleFactor /= 2;
        }
    },
    generate : function(width, height) {
        if(width != 0 && width != null){
            heightmap.width = width;
            heightmap.height = width;
        }
        if(height != 0 && height != null){
            heightmap.height = height;
        }

        heightmap.rough = 255;
        heightmap.passSize = 32;
        heightmap.points = [];
        heightmap.seed();
        heightmap.smoothTerrain();
        heightmap.passSize = 128;
        heightmap.smoothTerrain();
        heightmap.testTerrain();
    },
    testTerrain : function() {
        var tp = heightmap.points;
        var total = 0;
        var count = 0;
        var max = -1000000;
        var min = 1000000;
        for (let i = 0; i < tp.length; i++) {
            for (let j = 0; j < tp[i].length; j++) {
                let tz = tp[i][j].z;
                total += tz;
                count++;
                if (tz > max) {
                    max = tz;
                }
                if (tz < min) {
                    min = tz;
                }
            }
        }
        
        heightmap.max = max;
        // console.log("max = " + max);
        // console.log("min = " + min);
        // console.log("average = " + (total / count));
        // console.log("count = " + count);
        
        for (let i = 0; i < tp.length; i++) {
            for (let j = 0; j < tp[i].length; j++) {
                heightmap.points[i][j].elevation = Math.floor((heightmap.points[i][j].z / heightmap.max)*100);
                heightmap.elevations_list.push(heightmap.points[i][j].elevation);
            }
        }
        heightmap.elevations_list.sort(util.sortInts);
        //console.log(heightmap.elevations_list);

    },
};