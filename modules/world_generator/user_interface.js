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
        if(width > 51){
            width--;
            width = Math.floor(Math.sqrt(width));
            width--;
            width = width*width;
            width++;
            document.getElementById("world_width_span").innerHTML = width;
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
    increaseStartLevel : function(){
        let level = Number(document.getElementById("start_level_span").innerHTML);
        if(level < 20){
            level++;
            document.getElementById("start_level_span").innerHTML = level;
        }
    },
    decreaseStartLevel : function(){
        let level = Number(document.getElementById("start_level_span").innerHTML);
        if(level > 1){
            level--;
            document.getElementById("start_level_span").innerHTML = level;
        }
    },
    increaseEndLevel : function(){
        let level = Number(document.getElementById("end_level_span").innerHTML);
        if(level < 20){
            level++;
            document.getElementById("end_level_span").innerHTML = level;
        }
    },
    decreaseEndLevel : function(){
        let level = Number(document.getElementById("end_level_span").innerHTML);
        if(level > 1){
            level--;
            document.getElementById("end_level_span").innerHTML = level;
        }
    },
    showDetails : function(i,j){
        details_i = i;
        details_j = j;
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
    }
};