var world = [];
var details_i = 0;
var details_j = 0;

var updateMap = function () {
    var len = world.length;

    var canvas = document.getElementById("world_canvas");

    let ctx = canvas.getContext('2d');
    let scale = world[0][0].scale;
    ctx.canvas.height = len*scale;
    ctx.canvas.width = len*scale;


    let dungeon_img = document.getElementById("dungeon_img");
    let town_img = document.getElementById("town_img");
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if(world[i][j].terrain === "underwater"){
                ctx.fillStyle = "#4AB0C2";
            }
            if(world[i][j].terrain === "grassland"){
                ctx.fillStyle = "#93C989";
            }
            if(world[i][j].terrain === "desert"){
                ctx.fillStyle = "#C2BC8F";
            }
            if(world[i][j].terrain === "mountain"){
                ctx.fillStyle = "#D9D9D9";
            }
            if(world[i][j].terrain === "hill"){
                ctx.fillStyle = "#1FA64C";
            }
            if(world[i][j].terrain === "forest"){
                ctx.fillStyle = "#177A38";
            }
            if(world[i][j].terrain === "swamp"){
                ctx.fillStyle = "#689109";
            }
            if(world[i][j].terrain === "arctic"){
                ctx.fillStyle = "white";
            }
            if(world[i][j].terrain === "urban"){
                ctx.fillStyle = "black";
            }
            if(world[i][j].terrain === "coastal"){
                ctx.fillStyle = "#CCCC9F";
            }
            if(world[0][0].marker_i == i && world[0][0].marker_j == j){
                ctx.fillStyle = "red";
            }
            if(details_i == i && details_j == j){
                ctx.fillStyle = "blue";
            }

            ctx.fillRect(j*scale, i*scale, scale, scale);

            if(world[i][j].type === "town"){
                ctx.drawImage(town_img, j*scale, i*scale, scale, scale);
            }else if(world[i][j].type === "dungeon" && world[0][0].mode == "dm"){ 
                ctx.drawImage(dungeon_img, j*scale, i*scale, scale, scale);
            }
        }
    }
    var a = document.getElementById('dl_link');
    console.log(canvas.toDataURL("image/png"));
    a.setAttribute('href',canvas.toDataURL("image/png"));
};

var updateDetails = function () {
    //console.log(util.generateEncounter(world[details_i][details_j].terrain, Number(document.getElementById("player_count_span").innerHTML), world[details_i][details_j].level));
    var len = Number(document.getElementById("world_width_span").innerHTML);

    var out = document.getElementById("details_div");
    var str = "";
    str += "<button class=\"styledButton\" onclick=\"user_interface.setMarker()\">Set Marker Here</button>";
    str += "<br><br>";
    str += "<table>";
    str += "<tr><td>Type</td><td>" + world[details_i][details_j].type + "</td></tr>";
    str += "<tr><td>Elevation</td><td>" + world[details_i][details_j].elevation + "</td></tr>";
    str += "<tr><td>Terrain</td><td>" + world[details_i][details_j].terrain + "</td></tr>";
    str += "<tr><td>Temperature</td><td>" + data.weather_temperatures[world[details_i][details_j].temperature] + "</td></tr>";
    str += "<tr><td>Precipitation</td><td>" + data.weather_precipitation[world[details_i][details_j].precipitation] + "</td></tr>";
    str += "<tr><td>Wind</td><td>" + data.weather_wind[world[details_i][details_j].wind] + "</td></tr>";
    str += "</table>";
    
    if (world[details_i][details_j].type === "town") {
        if(world[details_i][details_j].size != null){
            str += "<table>";
            str += "<tr style=\"font-size:larger;font-weight:bold;\"><td>Name</td><td>" + world[details_i][details_j].name + "</td></tr>";
            if(world[0][0].mode == "dm"){
                str += "<tr><td>Size</td><td>" + world[details_i][details_j].size + "</td></tr>";
                str += "<tr><td>Population</td><td>" + world[details_i][details_j].population + "</td></tr>";
                str += "<tr><td>Race Relations</td><td>" + data.race_relations[world[details_i][details_j].race_relations] + "</td></tr>";
                str += "<tr><td>Government</td><td>" + data.governments[world[details_i][details_j].government] + "</td></tr>";
                str += "<tr><td>Ruler Status</td><td>" + data.ruler_status[world[details_i][details_j].ruler_status] + "</td></tr>";
                str += "<tr><td>Notable Trait</td><td>" + data.notable_traits[world[details_i][details_j].notable_trait] + "</td></tr>";
                str += "<tr><td>Known For</td><td>" + data.known_for[world[details_i][details_j].known_for] + "</td></tr>";
                str += "<tr><td>Current Calamity</td><td>" + data.current_calamity[world[details_i][details_j].current_calamity] + "</td></tr></table><br>";

                str += "<table>";
                str += "<tr><td>Dungeon Location</td><td>" + world[details_i][details_j].dungeon_location + "</td></tr>";
                str += "<tr><td>Dungeon Creator</td><td>" + world[details_i][details_j].dungeon_creator + "</td></tr>";
                str += "<tr><td>Dungeon Purpose</td><td>" + data.dungeon_purposes[world[details_i][details_j].dungeon_purpose] + "</td></tr>";
                str += "<tr><td>Dungeon History</td><td>" + data.dungeon_histories[world[details_i][details_j].dungeon_history] + "</td></tr>";
                str += "</table>";


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
                str += "<button class=\"collapsible\">Urban Encounters</button><div class=\"content\">";
                for (let x = 0; x < world[details_i][details_j].urban_encounters.length; x++) {
                    str += world[details_i][details_j].urban_encounters[x] + "<br>";
                }
                str += "</div><br>";
            }
        }else{
            if(world[0][0].mode == "dm"){
                str += "<table>";
                str += "<tr><td>Dungeon Location</td><td>" + world[details_i][details_j].dungeon_location + "</td></tr>";
                str += "<tr><td>Dungeon Creator</td><td>" + world[details_i][details_j].dungeon_creator + "</td></tr>";
                str += "<tr><td>Dungeon Purpose</td><td>" + data.dungeon_purposes[world[details_i][details_j].dungeon_purpose] + "</td></tr>";
                str += "<tr><td>Dungeon History</td><td>" + data.dungeon_histories[world[details_i][details_j].dungeon_history] + "</td></tr>";
                str += "</table>";
            }
            str += "<table>";
            str += "<tr><th>" + world[details_i][details_j].name + "</th>";
            if(world[0][0].mode == "dm"){
                str += "<th><button class=\"styledButton\" onclick=\"user_interface.generateTownButton()\">Generate Town Data</button></th>";
            }
            str += "</tr></table>";
        }
    }else if(world[details_i][details_j].type === "dungeon" && world[0][0].mode == "dm"){
            str += "<table>";
            str += "<tr><td>Dungeon Location</td><td>" + world[details_i][details_j].dungeon_location + "</td></tr>";
            str += "<tr><td>Dungeon Creator</td><td>" + world[details_i][details_j].dungeon_creator + "</td></tr>";
            str += "<tr><td>Dungeon Purpose</td><td>" + data.dungeon_purposes[world[details_i][details_j].dungeon_purpose] + "</td></tr>";
            str += "<tr><td>Dungeon History</td><td>" + data.dungeon_histories[world[details_i][details_j].dungeon_history] + "</td></tr>";
            str += "</table>";
    }
    if(world[0][0].mode == "dm"){
        if(world[details_i][details_j].encounters.length > 0){
            str += "<button class=\"styledButton\" onclick=\"user_interface.generateEncounterButton()\">Generate Encounter</button>";
            str += "<button class=\"styledButton\" onclick=\"user_interface.generateUnderdarkEncounterButton()\">Generate Underdark Encounter</button>";
            str += "<button class=\"collapsible\">Encounters</button><div class=\"content\">";
            for(let x = 0; x < world[details_i][details_j].encounters.length; x++){
                str += util.encountertoHTML(world[details_i][details_j].encounters[x], x);
            }
            str += "</div><br>";
        }else{
            str += "<button class=\"styledButton\" onclick=\"user_interface.generateEncounterButton()\">Generate Encounter</button>";
            str += "<button class=\"styledButton\" onclick=\"user_interface.generateUnderdarkEncounterButton()\">Generate Underdark Encounter</button>";
        }
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
                world[i][j].terrain = "underwater";
            } else {
                world[i][j].type = "wilderness";
                world[i][j].terrain = "grassland";
            }
        }
    }
    util.generateLakes();
    let towns_arr = [];
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (world[i][j].terrain === "grassland" && util.getRandomInt(data.settings.town_chance) == 0) {
                world[i][j].name = util.generateTownName();
                world[i][j].type = "town";

                world[i][j].dungeon_location = util.getRandomValueInArray(data.dungeon_locations['urban']);
                if(world[i][j].dungeon_location == 'exotic'){
                    world[i][j].dungeon_location = util.getRandomValueInArray(data.dungeon_exotic_locations);
                }
                world[i][j].dungeon_creator = util.getRandomValueInArray(data.dungeon_creators);
                if(world[i][j].dungeon_creator == 'cult'){
                    world[i][j].dungeon_creator = util.getRandomValueInArray(data.dungeon_creator_cults);
                }
                if(world[i][j].dungeon_creator == 'humans'){
                    world[i][j].dungeon_creator = util.getRandomValueInArray(data.npc_descriptions.alignments_1) + " " + util.getRandomValueInArray(data.npc_descriptions.alignments_2) + " " + util.getRandomValueInArray(data.dungeon_creator_classes);
                }
                world[i][j].dungeon_purpose = util.getRandomIndexInArray(data.dungeon_purposes);
                world[i][j].dungeon_history = util.getRandomIndexInArray(data.dungeon_histories);
            }
            world[i][j].encounters = [];
            if (world[i][j].type !== "town" && util.getRandomInt(data.settings.dungeon_chance) == 0) {
                world[i][j].type = "dungeon";
                world[i][j].dungeon_location = util.getRandomValueInArray(data.dungeon_locations[world[i][j].terrain]);
                if(world[i][j].dungeon_location == 'exotic'){
                    world[i][j].dungeon_location = util.getRandomValueInArray(data.dungeon_exotic_locations);
                }
                world[i][j].dungeon_creator = util.getRandomValueInArray(data.dungeon_creators);
                if(world[i][j].dungeon_creator == 'cult'){
                    world[i][j].dungeon_creator = util.getRandomValueInArray(data.dungeon_creator_cults);
                }
                if(world[i][j].dungeon_creator == 'humans'){
                    world[i][j].dungeon_creator = util.getRandomValueInArray(data.npc_descriptions.alignments_1) + " " + util.getRandomValueInArray(data.npc_descriptions.alignments_2) + " " + util.getRandomValueInArray(data.dungeon_creator_classes);
                }
                world[i][j].dungeon_purpose = util.getRandomIndexInArray(data.dungeon_purposes);
                world[i][j].dungeon_history = util.getRandomIndexInArray(data.dungeon_histories);
            }
            if (world[i][j].type === "wilderness") {
                world[i][j].wilderness_monument = util.getRandomValueInArray(data.wilderness_monuments);
                world[i][j].wilderness_weird_locale = util.getRandomValueInArray(data.wilderness_weird_locales);
            }
            world[i][j].temperature = util.getRandomIndexInArray(data.weather_temperatures);
            world[i][j].precipitation = util.getRandomIndexInArray(data.weather_precipitation);
            world[i][j].wind = util.getRandomIndexInArray(data.weather_wind);
            if (world[i][j].type=='town') {
                towns_arr.push({
                    i:i,
                    j:j
                });
            }
        }
    }
    util.generateHillAndMountain();
    util.generateDesertAndForestAndSwamp();
    util.generateCoastal();
    world[0][0].mode = "dm";
    world[0][0].scale = 16;



    if(towns_arr.length == 0){
        world[0][0].marker_i = Math.floor(world.length/2);
        world[0][0].marker_j = Math.floor(world.length/2);
    }else{
        let pt = util.getRandomValueInArray(towns_arr);
        world[0][0].marker_i = pt.i;
        world[0][0].marker_j = pt.j;
    }

    details_i = world[0][0].marker_i;
    details_j = world[0][0].marker_j;
    updateMap();
    updateDetails();
};