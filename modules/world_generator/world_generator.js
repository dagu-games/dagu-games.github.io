var world = [];
var details_i = 0;
var details_j = 0;

var updateMap = function () {
    var len = world.length;

    var out = document.getElementById("world_table");
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
    var len = Number(document.getElementById("world_width_span").innerHTML);

    var out = document.getElementById("details_div");
    var str = "";
    str += "Type: " + world[details_i][details_j].type + "<br>";
    str += "Elevation: " + world[details_i][details_j].elevation + "<br>";
    str += "Terrain: " + world[details_i][details_j].terrain + "<br>";
    
    if (world[details_i][details_j].type === "town") {
        str += "Name: " + world[details_i][details_j].name + "<br>";
        str += "Size: " + world[details_i][details_j].size + "<br>";
        str += "Population: " + world[details_i][details_j].population + "<br>";
        str += "Race Relations: " + world[details_i][details_j].race_relations + "<br>";
        str += "Government: " + world[details_i][details_j].government + "<br>";
        str += "Ruler Status: " + world[details_i][details_j].ruler_status + "<br>";
        str += "Notable Trait: " + world[details_i][details_j].notable_trait + "<br>";
        str += "Known For: " + world[details_i][details_j].known_for + "<br>";
        str += "Current Calamity: " + world[details_i][details_j].current_calamity + "<br>";
        str += "Name: " + world[details_i][details_j].name + "<br><br>";
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
                    str += "</div>";
                }
                if(world[details_i][details_j].buildings[x].occupants.length > 0){
                    str += "<button class=\"collapsible\">Occupants</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].occupants.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].occupants[q]);
                    }
                    str += "</div><br>";
                }
                str += "</div>";
            }
        }
        str += "</div>";
        
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
                    str += "</div>";
                }
                if(world[details_i][details_j].buildings[x].occupants.length > 0){
                    str += "<button class=\"collapsible\">Occupants</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].occupants.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].occupants[q]);
                    }
                    str += "</div><br>";
                }
                str += "</div>";
            }
        }
        str += "</div>";
        
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
                    str += "</div>";
                }
                if(world[details_i][details_j].buildings[x].occupants.length > 0){
                    str += "<button class=\"collapsible\">Occupants</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].occupants.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].occupants[q]);
                    }
                    str += "</div><br>";
                }
                str += "</div>";
            }
        }
        str += "</div>";
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
                    str += "</div>";
                }
                if(world[details_i][details_j].buildings[x].occupants.length > 0){
                    str += "<button class=\"collapsible\">Occupants</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].occupants.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].occupants[q]);
                    }
                    str += "</div><br>";
                }
                str += "</div>";
            }
        }
        str += "</div>";
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
                    str += "</div>";
                }
                if(world[details_i][details_j].buildings[x].occupants.length > 0){
                    str += "<button class=\"collapsible\">Occupants</button><div class=\"content\">";
                    for(let q = 0; q < world[details_i][details_j].buildings[x].occupants.length; q++){
                        str += util.NPCtoHTML(world[details_i][details_j].buildings[x].occupants[q]);
                    }
                    str += "</div><br>";
                }
                str += "</div>";
            }
        }
        str += "</div>";
        str += "</div>";
        str += "<button class=\"collapsible\">Wandering NPCs</button><div class=\"content\">";
        for (let x = 0; x < world[details_i][details_j].wandering_npcs.length; x++) {
            str += util.NPCtoHTML(world[details_i][details_j].wandering_npcs[x]);
        }
        str += "</div>";
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
            if (world[i][j].terrain === "grassland" && util.getRandomInt(25) < 1) {
                world[i][j] = util.generateTown();
                world[i][j].elevation = heightmap.points[i][j].elevation;
            }
        }
    }
    updateMap();
    updateDetails();
};