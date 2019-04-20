var world = [];
var details_i = 0;
var details_j = 0;

var updateMap = function () {
    var len = world.length;

    var out = document.getElementById("world_table");
    out.style.height = (len*16) + "px";
    out.style.width = (len*16) + "px";
    out.innerHTML = "";
    var row;
    for (let i = 0; i < len; i++) {
        row = document.createElement("TR");
        for (let j = 0; j < len; j++) {
            let cell = document.createElement("TD");
            cell.setAttribute('onclick',"user_interface.showDetails(" + i + "," + j + ")");
            let str = "";
            if(world[i][j].type === "town"){
                str += world[i][j].name + "<br>";
            }else if(world[i][j].type === "dungeon"){
                
            }else{
                //str += world[i][j].terrain + "<br>";
                str += " <br>";
            }
            let color = Math.floor((world[i][j].elevation / 100.0) * 255);
            //str += world[i][j].elevation + "<br>";
            if(world[i][j].terrain === "water"){
                cell.style.backgroundColor = "blue";
            }else{
                cell.style.backgroundColor = "rgb(0," + (255-color) + ",0)";
            }
            cell.innerHTML = str;
            row.appendChild(cell);
        }
        out.appendChild(row);
    }
};

var updateDetails = function () {
    console.log(util.generateEncounter(world[details_i][details_j].terrain, Number(document.getElementById("player_count_span").innerHTML), world[details_i][details_j].level));
    var len = Number(document.getElementById("world_width_span").innerHTML);

    var out = document.getElementById("details_div");
    var str = "";
    str += "Type: " + world[details_i][details_j].type + "<br>";
    str += "Elevation: " + world[details_i][details_j].elevation + "<br>";
    str += "Terrain: " + world[details_i][details_j].terrain + "<br>";
    str += "Level: " + world[details_i][details_j].level + "<br>";
    
    if (world[details_i][details_j].type === "town") {
        str += "<table>";
        str += "<tr style=\"font-size:larger;font-weight:bold;\"><td>Name</td><td>" + world[details_i][details_j].name + "</td></tr>";
        str += "<tr><td>Size</td><td>" + world[details_i][details_j].size + "</td></tr>";
        str += "<tr><td>Population</td><td>" + world[details_i][details_j].population + "</td></tr>";
        str += "<tr><td>Race Relations</td><td>" + world[details_i][details_j].race_relations + "</td></tr>";
        str += "<tr><td>Government</td><td>" + world[details_i][details_j].government + "</td></tr>";
        str += "<tr><td>Ruler Status</td><td>" + world[details_i][details_j].ruler_status + "</td></tr>";
        str += "<tr><td>Notable Trait</td><td>" + world[details_i][details_j].notable_trait + "</td></tr>";
        str += "<tr><td>Known For</td><td>" + world[details_i][details_j].known_for + "</td></tr>";
        str += "<tr><td>Current Calamity</td><td>" + world[details_i][details_j].current_calamity + "</td></tr></table><br>";
        str += "<button class=\"collapsible\">Buildings</button><div class=\"content\">";
        
        
        str += "<button class=\"collapsible\">Residences</button><div class=\"content\">";
        for (let x = 0; x < world[details_i][details_j].buildings.length; x++) {
            if(world[details_i][details_j].buildings[x].type === "Residence"){
                str += "<button class=\"collapsible\">Residence</button><div class=\"content\">";
                str += "Residence Type: " + world[details_i][details_j].buildings[x].residence_type + "<br>";
                str += "Owner: " + util.NPCtoHTML(world[details_i][details_j].buildings[x].owner);
                if(world[details_i][details_j].buildings[x].staff.length > 0){
                    str += "<button class=\"collapsible\">Staff</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].staff.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].staff[q]);
                    }
                    str += "</div><br>";
                }
                if(world[details_i][details_j].buildings[x].occupants.length > 0){
                    str += "<button class=\"collapsible\">Occupants</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].occupants.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].occupants[q]);
                    }
                    str += "</div><br>";
                }
                str += "</div><br>";
            }
        }
        str += "</div><br>";
        
        str += "<button class=\"collapsible\">Religious Buildings</button><div class=\"content\">";
        for (let x = 0; x < world[details_i][details_j].buildings.length; x++) {
            if(world[details_i][details_j].buildings[x].type === "Religious"){
                str += "<button class=\"collapsible\">Religious Building</button><div class=\"content\">";
                str += "Religious Building Type: " + world[details_i][details_j].buildings[x].religious_building_type + "<br>";
                str += "Deity: " + world[details_i][details_j].buildings[x].deity + "<br>";
                str += "Leader: " + util.NPCtoHTML(world[details_i][details_j].buildings[x].leader);
                if(world[details_i][details_j].buildings[x].staff.length > 0){
                    str += "<button class=\"collapsible\">Staff</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].staff.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].staff[q]);
                    }
                    str += "</div><br>";
                }
                if(world[details_i][details_j].buildings[x].occupants.length > 0){
                    str += "<button class=\"collapsible\">Occupants</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].occupants.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].occupants[q]);
                    }
                    str += "</div><br>";
                }
                str += "</div><br>";
            }
        }
        str += "</div><br>";
        
        str += "<button class=\"collapsible\">Taverns</button><div class=\"content\">";
        for (let x = 0; x < world[details_i][details_j].buildings.length; x++) {
            if(world[details_i][details_j].buildings[x].type === "Tavern"){
                str += "<button class=\"collapsible\">" + world[details_i][details_j].buildings[x].tavern_name + " " + world[details_i][details_j].buildings[x].type + "</button><div class=\"content\">";
                str += "Tavern Type: " + world[details_i][details_j].buildings[x].tavern_type + "<br>";
                str += "Owner: " + util.NPCtoHTML(world[details_i][details_j].buildings[x].owner);
                if(world[details_i][details_j].buildings[x].staff.length > 0){
                    str += "<button class=\"collapsible\">Staff</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].staff.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].staff[q]);
                    }
                    str += "</div><br>";
                }
                if(world[details_i][details_j].buildings[x].occupants.length > 0){
                    str += "<button class=\"collapsible\">Occupants</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].occupants.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].occupants[q]);
                    }
                    str += "</div><br>";
                }
                str += "</div><br>";
            }
        }
        str += "</div><br>";
        str += "<button class=\"collapsible\">Warehouses</button><div class=\"content\">";
        for (let x = 0; x < world[details_i][details_j].buildings.length; x++) {
            if(world[details_i][details_j].buildings[x].type === "Warehouse"){
                str += "<button class=\"collapsible\">Warehouse</button><div class=\"content\">";
                str += "Warehouse Type: " + world[details_i][details_j].buildings[x].warehouse_type + "<br>";
                str += "Owner: " + util.NPCtoHTML(world[details_i][details_j].buildings[x].owner);
                if(world[details_i][details_j].buildings[x].staff.length > 0){
                    str += "<button class=\"collapsible\">Staff</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].staff.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].staff[q]);
                    }
                    str += "</div><br>";
                }
                if(world[details_i][details_j].buildings[x].occupants.length > 0){
                    str += "<button class=\"collapsible\">Occupants</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].occupants.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].occupants[q]);
                    }
                    str += "</div><br>";
                }
                str += "</div><br>";
            }
        }
        str += "</div><br>";
        str += "<button class=\"collapsible\">Shops</button><div class=\"content\">";
        for (let x = 0; x < world[details_i][details_j].buildings.length; x++) {
            if(world[details_i][details_j].buildings[x].type === "Shop"){
                str += "<button class=\"collapsible\">" + world[details_i][details_j].buildings[x].shop_type + " Shop</button><div class=\"content\">";
                str += "Owner: " + util.NPCtoHTML(world[details_i][details_j].buildings[x].owner);
                if(world[details_i][details_j].buildings[x].staff.length > 0){
                    str += "<button class=\"collapsible\">Staff</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].staff.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].staff[q]);
                    }
                    str += "</div><br>";
                }
                if(world[details_i][details_j].buildings[x].occupants.length > 0){
                    str += "<button class=\"collapsible\">Occupants</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].occupants.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].occupants[q]);
                    }
                    str += "</div><br>";
                }
                str += "</div><br>";
            }
        }
        str += "</div><br>";
        str += "</div><br><br>";
        str += "<button class=\"collapsible\">Wandering NPCs</button><div class=\"content\">";
        for (let x = 0; x < world[details_i][details_j].wandering_npcs.length; x++) {
            str += util.NPCtoHTML(world[details_i][details_j].wandering_npcs[x]);
        }
        str += "</div><br>";
    }else if(world[details_i][details_j].type === "dungeon"){
        
    }else{
        
    }
    out.innerHTML = str;
    util.applyOnClicks();
};

var generateWorld = function () {
    var len = Number(document.getElementById("world_width_span").innerHTML);
    var water_percentage = Number(document.getElementById("water_percentage_span").innerHTML);
    heightmap.generate(len,len);
    world = [];
    details_i = 0;
    details_j = 0;
    for (let i = 0; i < len; i++) {
        world.push([]);
        for (let j = 0; j < len; j++) {
            world[i].push({});
            world[i][j].elevation = heightmap.points[i][j].elevation;
            
            let pos = 0;
            for(let z = 0; z < heightmap.elevations_list.length; z++){
                if(world[i][j].elevation === heightmap.elevations_list[z]){
                    pos = z;
                    break;
                }
            }
            let percentage = ((pos / heightmap.elevations_list.length) * 100);
            
            if (percentage < water_percentage) {
                world[i][j].type = "wilderness";
                world[i][j].terrain = "water";
            } else {
                world[i][j].type = "wilderness";
                world[i][j].terrain = "grassland";
            }
        }
    }
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (world[i][j].terrain === "grassland" && util.getRandomInt(50) < 1) {
                world[i][j] = util.generateTown();
                world[i][j].elevation = heightmap.points[i][j].elevation;
            }
            var start_level = Number(document.getElementById("start_level_span").innerHTML);
            var end_level = Number(document.getElementById("end_level_span").innerHTML);
            var start = Math.floor(len/2);
            var dist_x = Math.abs(Math.floor(start-i));
            var dist_y = Math.abs(Math.floor(start-j));
            var dist_total = Math.floor(Math.sqrt((dist_x*dist_x)+(dist_y*dist_y)));
            var perc = dist_total/(len/2.0);
            var level = Math.floor(perc*(end_level-start_level)) + start_level;
            
            if(level > 20){
                level = 20;
            }
            if(level < 1){
                level = 1;
            }
            world[i][j].level = level;
        }
    }
    updateMap();
    updateDetails();
};