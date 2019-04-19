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
    showDetails : function(i,j){
        details_i = i;
        details_j = j;
        updateDetails();
    },
};