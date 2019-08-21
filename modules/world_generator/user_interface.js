var user_interface = {
    generateFirstName : function(){
        document.getElementById("first_name_text").innerHTML = util.generateFirstName();
    },
    generateMiddleName : function(){
        document.getElementById("middle_name_text").innerHTML = util.generateMiddleName();
    },
    generateLastName : function(){
        document.getElementById("last_name_text").innerHTML = util.generateLastName();
    },
    generateTownName : function(){
        document.getElementById("town_name_text").innerHTML = util.generateTownName();
    },
    generateEncounterButton : function(){
        var player_count = Number(document.getElementById("player_count_span").innerHTML);
        var level = Number(document.getElementById("level_span").innerHTML);
        if(world[details_i][details_j].type == "town"){
            world[details_i][details_j].encounters.push(util.generateEncounter('urban', player_count, level));
        }else{
            world[details_i][details_j].encounters.push(util.generateEncounter(world[details_i][details_j].terrain, player_count, level));
        }
        updateDetails();
    },
    generateTownButton : function(){
        util.generateTown(details_i,details_j);
        updateDetails();
    },
    setMarker : function(){
        world[0][0].marker_i = details_i;
        world[0][0].marker_j = details_j;
        updateMap();
    },
    generateUnderdarkEncounterButton : function(){
        var player_count = Number(document.getElementById("player_count_span").innerHTML);
        var level = Number(document.getElementById("level_span").innerHTML);
        world[details_i][details_j].encounters.push(util.generateEncounter('underdark', player_count, level));
        updateDetails();
    },
    increaseWorldWidth : function(){
        let width = Number(document.getElementById("world_width_span").innerHTML);
        if(width < 700){
            width--;
            width = Math.floor(Math.sqrt(width));
            width++;
            width = width*width;
            width++;
            document.getElementById("world_width_span").innerHTML = width;
        }
    },
    decreaseWorldWidth : function(){
        let width = Number(document.getElementById("world_width_span").innerHTML);
        if(width > 65){
            width--;
            width = Math.floor(Math.sqrt(width));
            width--;
            width = width*width;
            width++;
            document.getElementById("world_width_span").innerHTML = width;
        }
    },
    increaseWorldScale : function(){
        let scale = Number(document.getElementById("world_scale_span").innerHTML);
        if(scale < 50){
            scale++;
            document.getElementById("world_scale_span").innerHTML = scale;
            world[0][0].scale = scale;
            updateMap();
        }
    },
    decreaseWorldScale : function(){
        let scale = Number(document.getElementById("world_scale_span").innerHTML);
        if(scale > 2){
            scale--;
            document.getElementById("world_scale_span").innerHTML = scale;
            world[0][0].scale = scale;
            updateMap();
        }
    },
    increaseWaterPercentage : function(){
        let percentage = Number(document.getElementById("water_percentage_span").innerHTML);
        if(percentage < 99){
            percentage++;
            document.getElementById("water_percentage_span").innerHTML = percentage;
        }
    },
    decreaseWaterPercentage : function(){
        let percentage = Number(document.getElementById("water_percentage_span").innerHTML);
        if(percentage > 0){
            percentage--;
            document.getElementById("water_percentage_span").innerHTML = percentage;
        }
    },
    increasePlayerCount : function(){
        let count = Number(document.getElementById("player_count_span").innerHTML);
        if(count < 10){
            count++;
            document.getElementById("player_count_span").innerHTML = count;
        }
    },
    decreasePlayerCount : function(){
        let count = Number(document.getElementById("player_count_span").innerHTML);
        if(count > 1){
            count--;
            document.getElementById("player_count_span").innerHTML = count;
        }
    },
    increaseLevel : function(){
        let level = Number(document.getElementById("level_span").innerHTML);
        if(level < 20){
            level++;
            document.getElementById("level_span").innerHTML = level;
        }
    },
    decreaseLevel : function(){
        let level = Number(document.getElementById("level_span").innerHTML);
        if(level > 1){
            level--;
            document.getElementById("level_span").innerHTML = level;
        }
    },
    showDetails : function(i,j){
        details_i = i;
        details_j = j;
        updateDetails();
    },
    showCanvasDetails : function(canvas, event){
        let rect = canvas.getBoundingClientRect();
        details_j = Math.floor((event.clientX - rect.left)/world[0][0].scale);
        details_i = Math.floor((event.clientY - rect.top)/world[0][0].scale);

        updateMap();
        updateDetails();
    },
    swapFloatingWindowSide: function(){
        let elem = document.getElementById("floating_window");
        if(elem.style.left == "auto" || elem.style.left == ""){
            elem.style.left = "2vw";
            elem.style.right = "auto";
        }else{
            elem.style.right = "2vw";
            elem.style.left = "auto";
        }
    },

    copySaveFile: function(){
        let elem = document.getElementById("save_file_input");
        elem.select();
        document.execCommand("copy");
        elem.value = "done";
    },

    generateSaveFile: function(){
        if(world[0][0].mode === "dm"){
            let elem = document.getElementById("save_file_input");
            elem.value = "working...";
            elem.value = LZString.compressToEncodedURIComponent(JSON.stringify(world)).trim();
        }
    },

    generatePlayerSaveFile: function(){
        world[0][0].mode = "player";
        let elem = document.getElementById("save_file_input");
        elem.value = "working...";
        elem.value = LZString.compressToEncodedURIComponent(JSON.stringify(world)).trim();
    },


    loadSaveFile: function(){
        let elem = document.getElementById("save_file_input");
        world = JSON.parse(LZString.decompressFromEncodedURIComponent(elem.value));
        updateDetails();
        updateMap();
        elem.value = "done";
    },
};