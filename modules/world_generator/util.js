

const roller = new rpgDiceRoller.DiceRoller();

//console.log(roller.roll('4d20*100').total);

var util = {
    sortInts: function (a, b) {
        if (a > b) {
            return 1;
        } else if (b > a) {
            return -1;
        } else {
            return 0;
        }
    },

    applyOnClicks: function () {
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display) {
                    content.style.display = null;
                } else {
                    content.style.display = "block";
                }
            });
        }
    },
    getRandomInt: function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    },

    getRandomValueInArray: function (arr) {
        return arr[util.getRandomInt(arr.length)];
    },

    getRandomIndexInArray: function (arr) {
        return util.getRandomInt(arr.length);
    },

    generateFirstName: function () {
        return util.getRandomValueInArray(data.first_names);
    },

    generateMiddleName: function () {
        return util.getRandomValueInArray(data.middle_names);
    },

    generateLastName: function () {
        return util.getRandomValueInArray(data.last_names);
    },

    generateFullName: function () {
        return util.generateFirstName() + " " + util.generateMiddleName() + " " + util.generateLastName();
    },

    generateTownName: function () {
        return util.getRandomValueInArray(data.town_names);
    },

    generateTavernName: function () {
        return util.getRandomValueInArray(data.tavern_name_1) + " " + util.getRandomValueInArray(data.tavern_name_2);
    },

    generateNPC: function () {
        let ans = {
            name: util.generateFullName(),
            appearance: util.getRandomValueInArray(data.npc_descriptions.appearances),
            high_stat: util.getRandomValueInArray(data.npc_descriptions.stats),
            low_stat: util.getRandomValueInArray(data.npc_descriptions.stats),
            talent: util.getRandomValueInArray(data.npc_descriptions.talents),
            mannerism: util.getRandomValueInArray(data.npc_descriptions.mannerisms),
            interaction_trait: util.getRandomValueInArray(data.npc_descriptions.interaction_traits),
            alignment1: util.getRandomValueInArray(data.npc_descriptions.alignments_1),
            alignment2: util.getRandomValueInArray(data.npc_descriptions.alignments_2),
            ideal1: util.getRandomValueInArray(data.npc_descriptions.ideals.neutral),
            ideal2: util.getRandomValueInArray(data.npc_descriptions.ideals.neutral),
            bond: util.getRandomValueInArray(data.npc_descriptions.bonds),
            flaw: util.getRandomValueInArray(data.npc_descriptions.flaws),
            profession: util.getRandomValueInArray(data.npc_descriptions.professions),
        };
        if (ans.alignment1 === "Lawful") {
            ans.ideal1 = util.getRandomValueInArray(data.npc_descriptions.ideals.lawful);
        }
        if (ans.alignment1 === "Chaotic") {
            ans.ideal1 = util.getRandomValueInArray(data.npc_descriptions.ideals.chaotic);
        }
        if (ans.alignment2 === "Good") {
            ans.ideal2 = util.getRandomValueInArray(data.npc_descriptions.ideals.good);
        }
        if (ans.alignment2 === "Evil") {
            ans.ideal2 = util.getRandomValueInArray(data.npc_descriptions.ideals.evil);
        }
        while (ans.high_stat === ans.low_stat) {
            ans.low_stat = util.getRandomValueInArray(data.npc_descriptions.stats);
        }
        return ans;
    },

    generateTown: function (i,j) {
        world[i][j].type = "town";
        world[i][j].race_relations = util.getRandomIndexInArray(data.race_relations);
        world[i][j].government = util.getRandomIndexInArray(data.governments);
        world[i][j].ruler_status = util.getRandomIndexInArray(data.ruler_status);
        world[i][j].notable_trait = util.getRandomIndexInArray(data.notable_traits);
        world[i][j].known_for = util.getRandomIndexInArray(data.known_for);
        world[i][j].current_calamity = util.getRandomIndexInArray(data.current_calamity);
        world[i][j].size = util.getRandomIndexInArray(data.town_sizes);
        world[i][j].buildings = [];
        world[i][j].urban_encounters = [];
        world[i][j].encounters = [];
        let building_count = 0;
        if (data.town_sizes[world[i][j].size] === "Village") {
            building_count = 25;
            world[i][j].population = 250 + util.getRandomInt(750);
        } else if (data.town_sizes[world[i][j].size] === "Town") {
            building_count = 50;
            world[i][j].population = 2000 + util.getRandomInt(4000);
        } else {
            building_count = 60;
            world[i][j].population = 7500 + util.getRandomInt(25000);
        }

        for (let x = 0; x < building_count; x++) {
            let building = {
                type: util.getRandomValueInArray(data.building_types),
                occupants: [],
                staff: [],
            };
            let c = 0;
            let sc = 0;
            if (building.type === "Residence") {
                building.residence_type = util.getRandomValueInArray(data.residence_types);
                building.owner = util.generateNPC();
                c = util.getRandomInt(5) + 2;
                sc = util.getRandomInt(1);
            }
            if (building.type === "Religious") {
                building.religious_building_type = util.getRandomValueInArray(data.religious_building_types);
                if (util.getRandomInt(1) === 0) {
                    building.deity = util.getRandomValueInArray(data.deities.good);
                } else {
                    building.deity = util.getRandomValueInArray(data.deities.neutral);
                }
                building.leader = util.generateNPC();
                c = util.getRandomInt(20) + 8;
                sc = util.getRandomInt(4) + 1;
            }
            if (building.type === "Tavern") {
                building.tavern_type = util.getRandomValueInArray(data.tavern_types);
                building.tavern_name = util.getRandomValueInArray(data.tavern_names_1) + " " + util.getRandomValueInArray(data.tavern_names_2);
                building.owner = util.generateNPC();
                c = util.getRandomInt(25) + 5;
                sc = util.getRandomInt(5) + 2;
            }
            if (building.type === "Warehouse") {
                building.warehouse_type = util.getRandomValueInArray(data.warehouse_types);
                building.owner = util.generateNPC();
                sc = util.getRandomInt(5) + 2;
            }
            if (building.type === "Shop") {
                building.shop_type = util.getRandomValueInArray(data.shop_types);
                building.owner = util.generateNPC();
                c = util.getRandomInt(2);
                sc = util.getRandomInt(3) + 1;
            }
            while (sc > 0) {
                building.staff.push(util.generateNPC());
                sc--;
            }
            while (c > 0) {
                building.occupants.push(util.generateNPC());
                c--;
            }
            world[i][j].buildings.push(building);
        }
        world[i][j].buildings.sort(function(a, b){
            if(a.type < b.type) { return -1; }
            if(a.type > b.type) { return 1; }
            return 0;
        });
        world[i][j].wandering_npcs = [];
        let q = util.getRandomInt(25) + 10;
        let qc = 0;
        while (qc < q) {
            world[i][j].wandering_npcs.push(util.generateNPC());
            qc++;
        }
        for (let x = 0; x < 5; x++) {
            world[i][j].urban_encounters.push(util.getRandomValueInArray(data.urban_encounters));
        }
        
        
        let points = [];
        for(let x = 0; x < 1000; x++){
          if(util.getRandomInt(1)==1){
            if(util.getRandomInt(1)==1){
              points.push(
                {
                 x:(util.getRandomInt(22)*util.getRandomInt(22))+500,
                 y:(util.getRandomInt(22)*util.getRandomInt(22))+500,
                }
              );
            }else{
              points.push(
                {
                  x:(util.getRandomInt(22)*util.getRandomInt(22)* -1)+500,
                  y:(util.getRandomInt(22)*util.getRandomInt(22)* -1)+500,
                }
              );
            }
          }else{
            if(util.getRandomInt(1)==1){
              points.push(
                {
                 x:(util.getRandomInt(22)*util.getRandomInt(22))+500,
                 y:(util.getRandomInt(22)*util.getRandomInt(22)* -1)+500,
                }
              );
            }else{
              points.push(
                {
                  x:(util.getRandomInt(22)*util.getRandomInt(22)* -1)+500,
                  y:(util.getRandomInt(22)*util.getRandomInt(22))+500,
                }
              );
            }
          }
        }
        console.log(points);
        
        world[i][j].border = util.convexHull(points);
        console.log(world[i][j].border);
        var buildings = [];
        
        for(var i = 0; i < 1000; i++){
          var p;
          if(util.getRandomInt(1)==1){
            if(util.getRandomInt(1)==1){
              p = {
                 x:(util.getRandomInt(22)*util.getRandomInt(22))+500,
                 y:(util.getRandomInt(22)*util.getRandomInt(22))+500,
              };
            }else{
              p = {
                  x:(util.getRandomInt(22)*util.getRandomInt(22)* -1)+500,
                  y:(util.getRandomInt(22)*util.getRandomInt(22)* -1)+500,
              };
            }
          }else{
            if(util.getRandomInt(1)==1){
              p = {
                 x:(util.getRandomInt(22)*util.getRandomInt(22))+500,
                 y:(util.getRandomInt(22)*util.getRandomInt(22)* -1)+500,
              };
            }else{
              p = {
                  x:(util.getRandomInt(22)*util.getRandomInt(22)* -1)+500,
                  y:(util.getRandomInt(22)*util.getRandomInt(22))+500,
              };
            }
          }
          var lx = util.getRandomInt(5) + 2;
          var ly = util.getRandomInt(5) + 2;
          var p2 = {
            x:p.x+lx,
            y:p.y+ly,
          };
          if(util.inside(p, world[i][j].border) && util.inside(p2, world[i][j].border)){
            buildings.push([p,p2]);
          }
        }
        world[i][j].map_buildings = buildings;
    },
    
    inside: function(point, vs) {
      var x = point.x, y = point.y;
      var inside = false;
      
      for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          var xi = vs[i].x, yi = vs[i].y;
          var xj = vs[j].x, yj = vs[j].y;
  
          var intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }
  
      return inside;
    },
    
    convexHull: function(points){
      var ans = [];
      
      var orientation = function (p,q,r){
        var val = (q.y - p.y) * (r.x - q.x) - 
                  (q.x - p.x) * (r.y - q.y); 
       
        if(val == 0){ 
          return 0;
        }
        return (val > 0)? 1: 2;
      };
      
      var l = 0;
      
      for (var i = 1; i < points.length; i++){
        if (points[i].x < points[l].x){
            l = i;
        }
      }
      
      var p = l;
      var q;
      
      do{ 
          ans.push(points[p]); 
          q = (p + 1) % points.length; 
            
          for (var i = 0; i < points.length; i++) { 
             if (orientation(points[p], points[i], points[q]) == 2) {
                 q = i; 
             }
          } 
          p = q;
      }while(p != l);
      
      return ans;
    },
    
    

    NPCtoHTML: function (npc) {
        let ans = "";
        ans += "<button class=\"collapsible\">" + npc.name + "</button>";
        ans += "<div class=\"content\">";
        ans += "<table>";
        ans += "<tr><td>Appearance</td><td>" + npc.appearance + "</td></tr>";
        ans += "<tr><td>High Stat</td><td>" + npc.high_stat + "</td></tr>";
        ans += "<tr><td>Low Stat</td><td>" + npc.low_stat + "</td></tr>";
        ans += "<tr><td>Talent</td><td>" + npc.talent + "</td></tr>";
        ans += "<tr><td>Mannerism</td><td>" + npc.mannerism + "</td></tr>";
        ans += "<tr><td>Interaction Trait</td><td>" + npc.interaction_trait + "</td></tr>";
        ans += "<tr><td>Alignment</td><td>" + npc.alignment1 + " " + npc.alignment2 + "</td></tr>";
        ans += "<tr><td>Ideals</td><td>" + npc.ideal1 + " and " + npc.ideal2 + "</td></tr>";
        ans += "<tr><td>Bond</td><td>" + npc.bond + "</td></tr>";
        ans += "<tr><td>Flaw</td><td>" + npc.flaw + "</td></tr>";
        ans += "<tr><td>Profession</td><td>" + npc.profession + "</td></tr></table>";
        ans += "</div><br>";
        return ans;
    },

    encountertoHTML: function (encounter, pos) {
        let ans = "";
        ans += "<button class=\"collapsible\">Encounter " + pos + "</button>";
        ans += "<div class=\"content\">";
        ans += "<table><tr><td>Level</td><td>" + encounter.level + "</td></tr><tr><td>Number of Players</td><td>" + encounter.num_players + "</td></tr></table>";
        ans += "<button class=\"collapsible\">Monsters</button>";
        ans += "<div class=\"content\">";
        for(let i = 0; i < encounter.monsters.length; i++){
            let monster = encounter.monsters[i];
            ans += "<table>";
            ans += "<tr><td>Name</td><td>" + monster.name + "</td></tr>";
            ans += "<tr><td>Health</td><td>" + monster.health + "</td></tr>";
            ans += "<tr><td>CR</td><td>" + monster.cr + "</td></tr></table><br>";
        }
        ans += "</div><br>";
        ans += "<button class=\"collapsible\">Treasure</button>";
        ans += "<div class=\"content\">";
        ans += "<table>";
        if(encounter.treasure.cp != ""){
            ans += "<tr><td>Copper</td><td>" + encounter.treasure.cp + "</td></tr>";          
        }
        if(encounter.treasure.sp != ""){
            ans += "<tr><td>Silver</td><td>" + encounter.treasure.sp + "</td></tr>";
        }
        if(encounter.treasure.ep != ""){
            ans += "<tr><td>Etherium</td><td>" + encounter.treasure.ep + "</td></tr>";
        }
        if(encounter.treasure.gp != ""){
            ans += "<tr><td>Gold</td><td>" + encounter.treasure.gp + "</td></tr>";
        }
        if(encounter.treasure.pp != ""){
            ans += "<tr><td>Platinum</td><td>" + encounter.treasure.pp + "</td></tr>";
        }
        ans += "</table><br>";
        for(let i = 0; i < encounter.treasure.items.length; i++){
            let item = encounter.treasure.items[i];
            ans += "<table>";
            ans += "<tr><td>Name</td><td>" + item.name + "</td></tr>";
            if(item.creator != ""){
                ans += "<tr><td>Creator</td><td>" + item.creator + "</td></tr>";
            }
            if(item.history != ""){
                ans += "<tr><td>History</td><td>" + item.history + "</td></tr>";
            }
            if(item.minor_property != ""){
                ans += "<tr><td>Minor Property</td><td>" + item.minor_property + "</td></tr>";
            }
            if(item.quirk != ""){
                ans += "<tr><td>Quirk</td><td>" + item.quirk + "</td></tr>";
            }
            ans += "</table><br>";
        }
        ans += "</div><br>";
        ans += "</div><br>";
        return ans;
    },

    generateEncounter: function (terrain, num_players, level) {
        let ans = {
            monsters: [],
            treasure: {},
            level: level,
            num_players: num_players,
        };
        let threshold = 0;
        let threshold_table = {
            easy:[
                0,
                25,
                50,
                75,
                125,
                250,
                300,
                350,
                450,
                550,
                600,
                800,
                1000,
                1100,
                1250,
                1400,
                1600,
                2000,
                2100,
                2400,
                2800,
            ],
            medium:[
                0,
                50,
                75,
                125,
                250,
                500,
                600,
                750,
                900,
                1100,
                1200,
                1600,
                2000,
                2200,
                2500,
                2800,
                3200,
                3900,
                4200,
                4900,
                5700,
            ],
            hard:[
                0,
                75,
                150,
                225,
                375,
                750,
                900,
                1100,
                1400,
                1600,
                1900,
                2400,
                3000,
                3400,
                3800,
                4300,
                4800,
                5900,
                6300,
                7300,
                8500,
            ],
            deadly:[
                0,
                100,
                200,
                400,
                500,
                1100,
                1400,
                1700,
                2100,
                2400,
                2800,
                3600,
                4500,
                5100,
                5700,
                6400,
                7200,
                8800,
                9500,
                10900,
                12700,
            ],
        };
        let r = util.getRandomInt(100);
        threshold = threshold_table.easy[level];
        if(r > 50){
            //console.log('medium');
            threshold = threshold_table.medium[level];
        }
        if(r > 75){
            //console.log('hard');
            threshold = threshold_table.hard[level];
        }
        if(r > 95){
            //console.log('deadly');
            threshold = threshold_table.deadly[level];
        }
        
        threshold = threshold * num_players;
        let mlist = [];

        for(let i = 0; i < data.monsters.length; i++){
            for(let j = 0; j < data.monsters[i].terrains.length; j++){
                if(data.monsters[i].terrains[j] === terrain){
                    
                    for(let num_monsters = 0; num_monsters < 15; num_monsters++){
                        let multiplier_table = [
                            1,
                            1,
                            1.5,
                            2,
                            2.5,
                            3,
                            4,
                        ];
                        
                        let pos = 1;
                        
                        if(num_monsters === 1){
                            pos = 1;
                        }else if(num_monsters === 2){
                            pos = 2;
                        }else if(num_monsters > 2 && num_monsters < 7){
                            pos = 3;
                        }else if(num_monsters > 6 && num_monsters < 11){
                            pos = 4;
                        }else if(num_monsters > 10 && num_monsters < 15){
                            pos = 5;
                        }else if(num_monsters > 15){
                            pos = 6;
                        }
                        if(num_players > 5 && pos < 6){
                            pos++;
                        }
                        if(num_players < 3 && pos > 1){
                            pos--;
                        }
                        
                        let multiplier = multiplier_table[pos];
                        let cr = 0;
                        if(num_monsters * multiplier * 25 < threshold){
                            cr = .125;
                        }
                        if(num_monsters * multiplier * 50 < threshold){
                            cr = .25;
                        }
                        if(num_monsters * multiplier * 100 < threshold){
                            cr = .5;
                        }
                        if(num_monsters * multiplier * 200 < threshold){
                            cr = 1;
                        }
                        if(num_monsters * multiplier * 450 < threshold){
                            cr = 2;
                        }
                        if(num_monsters * multiplier * 700 < threshold){
                            cr = 3;
                        }
                        if(num_monsters * multiplier * 1100 < threshold){
                            cr = 4;
                        }
                        if(num_monsters * multiplier * 1800 < threshold){
                            cr = 5;
                        }
                        if(num_monsters * multiplier * 2300 < threshold){
                            cr = 6;
                        }
                        if(num_monsters * multiplier * 2900 < threshold){
                            cr = 7;
                        }
                        if(num_monsters * multiplier * 3900 < threshold){
                            cr = 8;
                        }
                        if(num_monsters * multiplier * 5000 < threshold){
                            cr = 9;
                        }
                        if(num_monsters * multiplier * 5900 < threshold){
                            cr = 10;
                        }
                        if(num_monsters * multiplier * 7200 < threshold){
                            cr = 11;
                        }
                        if(num_monsters * multiplier * 8400 < threshold){
                            cr = 12;
                        }
                        if(num_monsters * multiplier * 10000 < threshold){
                            cr = 13;
                        }
                        if(num_monsters * multiplier * 11500 < threshold){
                            cr = 14;
                        }
                        if(num_monsters * multiplier * 13000 < threshold){
                            cr = 15;
                        }
                        if(num_monsters * multiplier * 15000 < threshold){
                            cr = 16;
                        }
                        if(num_monsters * multiplier * 18000 < threshold){
                            cr = 17;
                        }
                        if(num_monsters * multiplier * 20000 < threshold){
                            cr = 18;
                        }
                        if(num_monsters * multiplier * 22000 < threshold){
                            cr = 19;
                        }
                        if(num_monsters * multiplier * 25000 < threshold){
                            cr = 20;
                        }
                        if(num_monsters * multiplier * 33000 < threshold){
                            cr = 21;
                        }
                        if(num_monsters * multiplier * 41000 < threshold){
                            cr = 22;
                        }
                        if(num_monsters * multiplier * 50000 < threshold){
                            cr = 23;
                        }
                        if(num_monsters * multiplier * 62000 < threshold){
                            cr = 24;
                        }
                        if(num_monsters * multiplier * 75000 < threshold){
                            cr = 25;
                        }
                        if(num_monsters * multiplier * 90000 < threshold){
                            cr = 26;
                        }
                        if(num_monsters * multiplier * 105000 < threshold){
                            cr = 27;
                        }
                        if(num_monsters * multiplier * 120000 < threshold){
                            cr = 28;
                        }
                        if(num_monsters * multiplier * 135000 < threshold){
                            cr = 29;
                        }
                        if(num_monsters * multiplier * 155000 < threshold){
                            cr = 30;
                        }

                        if( cr == data.monsters[i].cr || 
                            cr-1 == data.monsters[i].cr){
                            mlist.push({
                                name: data.monsters[i].name,
                                cr: data.monsters[i].cr,
                                health: data.monsters[i].health,
                                terrains: data.monsters[i].terrains,
                                count: num_monsters,
                            });
                            break;
                        }
                    }      
                }
            }
        }


        if(mlist.length == 0){
            for(let i = 0; i < data.monsters.length; i++){
                for(let num_monsters = 0; num_monsters < 15; num_monsters++){
                    let multiplier_table = [
                        1,
                        1,
                        1.5,
                        2,
                        2.5,
                        3,
                        4,
                    ];
                    
                    let pos = 1;
                    
                    if(num_monsters === 1){
                        pos = 1;
                    }else if(num_monsters === 2){
                        pos = 2;
                    }else if(num_monsters > 2 && num_monsters < 7){
                        pos = 3;
                    }else if(num_monsters > 6 && num_monsters < 11){
                        pos = 4;
                    }else if(num_monsters > 10 && num_monsters < 15){
                        pos = 5;
                    }else if(num_monsters > 15){
                        pos = 6;
                    }
                    if(num_players > 5 && pos < 6){
                        pos++;
                    }
                    if(num_players < 3 && pos > 1){
                        pos--;
                    }
                    
                    let multiplier = multiplier_table[pos];
                    let cr = 0;
                    if(num_monsters * multiplier * 25 < threshold){
                        cr = .125;
                    }
                    if(num_monsters * multiplier * 50 < threshold){
                        cr = .25;
                    }
                    if(num_monsters * multiplier * 100 < threshold){
                        cr = .5;
                    }
                    if(num_monsters * multiplier * 200 < threshold){
                        cr = 1;
                    }
                    if(num_monsters * multiplier * 450 < threshold){
                        cr = 2;
                    }
                    if(num_monsters * multiplier * 700 < threshold){
                        cr = 3;
                    }
                    if(num_monsters * multiplier * 1100 < threshold){
                        cr = 4;
                    }
                    if(num_monsters * multiplier * 1800 < threshold){
                        cr = 5;
                    }
                    if(num_monsters * multiplier * 2300 < threshold){
                        cr = 6;
                    }
                    if(num_monsters * multiplier * 2900 < threshold){
                        cr = 7;
                    }
                    if(num_monsters * multiplier * 3900 < threshold){
                        cr = 8;
                    }
                    if(num_monsters * multiplier * 5000 < threshold){
                        cr = 9;
                    }
                    if(num_monsters * multiplier * 5900 < threshold){
                        cr = 10;
                    }
                    if(num_monsters * multiplier * 7200 < threshold){
                        cr = 11;
                    }
                    if(num_monsters * multiplier * 8400 < threshold){
                        cr = 12;
                    }
                    if(num_monsters * multiplier * 10000 < threshold){
                        cr = 13;
                    }
                    if(num_monsters * multiplier * 11500 < threshold){
                        cr = 14;
                    }
                    if(num_monsters * multiplier * 13000 < threshold){
                        cr = 15;
                    }
                    if(num_monsters * multiplier * 15000 < threshold){
                        cr = 16;
                    }
                    if(num_monsters * multiplier * 18000 < threshold){
                        cr = 17;
                    }
                    if(num_monsters * multiplier * 20000 < threshold){
                        cr = 18;
                    }
                    if(num_monsters * multiplier * 22000 < threshold){
                        cr = 19;
                    }
                    if(num_monsters * multiplier * 25000 < threshold){
                        cr = 20;
                    }
                    if(num_monsters * multiplier * 33000 < threshold){
                        cr = 21;
                    }
                    if(num_monsters * multiplier * 41000 < threshold){
                        cr = 22;
                    }
                    if(num_monsters * multiplier * 50000 < threshold){
                        cr = 23;
                    }
                    if(num_monsters * multiplier * 62000 < threshold){
                        cr = 24;
                    }
                    if(num_monsters * multiplier * 75000 < threshold){
                        cr = 25;
                    }
                    if(num_monsters * multiplier * 90000 < threshold){
                        cr = 26;
                    }
                    if(num_monsters * multiplier * 105000 < threshold){
                        cr = 27;
                    }
                    if(num_monsters * multiplier * 120000 < threshold){
                        cr = 28;
                    }
                    if(num_monsters * multiplier * 135000 < threshold){
                        cr = 29;
                    }
                    if(num_monsters * multiplier * 155000 < threshold){
                        cr = 30;
                    }

                    if( cr == data.monsters[i].cr || 
                        cr-1 == data.monsters[i].cr){
                        mlist.push({
                            name: data.monsters[i].name,
                            cr: data.monsters[i].cr,
                            health: data.monsters[i].health,
                            terrains: data.monsters[i].terrains,
                            count: num_monsters,
                        });
                        break;
                    }
                }      
            }
        }

        //console.log(mlist);
        let monster = util.getRandomValueInArray(mlist);
        monster = {
            name: monster.name,
            cr: monster.cr,
            health: monster.health,
            terrains: monster.terrains,
            count: monster.count,
        }
        let str = monster.health;
        for(let i = 0; i < monster.count; i++){
            monster.health = util.rollDice(str);
            ans.monsters.push({
                name: monster.name,
                cr: monster.cr,
                health: monster.health,
                terrains: monster.terrains,
            });
        }

        ans.treasure = util.generateTreasure(monster.cr, monster.count);
        return ans;
    },

    generateTreasure: function(cr, num_monsters){
        var ans = {
            cp: 0,
            sp: 0,
            ep: 0,
            gp: 0,
            pp: 0,
            items: [],
        };

        var cr_str = "4cr";
        if(cr < 11 && cr > 4){
            cr_str = "10cr";
        }else if(cr < 17 && cr > 10){
            cr_str = "16cr";
        }else if(cr > 16){
            cr_str = "17cr";
        }

        if(num_monsters < 2){
            var currency = util.searchForMax(data.treasure_tables.individual[cr_str], (util.getRandomInt(99) + 1));
            var items = {
                gemstones_count: "",
                gemstones_price: "",
                art_objects_count: "",
                art_objects_price: "",
                magic_table_1_count: "",
                magic_table_1: "",
                magic_table_2_count: "",
                magic_table_2: "",
            };
        }else{
            var currency = data.treasure_tables.hoard_currency[cr_str];
            var items = util.searchForMax(data.treasure_tables.hoard_items[cr_str], (util.getRandomInt(99) + 1));
        }

        if(currency.cp_count != ""){
            ans.cp = util.rollDice(currency.cp_count);
        }
        if(currency.sp_count != ""){
            ans.sp = util.rollDice(currency.sp_count);
        }
        if(currency.ep_count != ""){
            ans.ep = util.rollDice(currency.ep_count);
        }
        if(currency.gp_count != ""){
            ans.gp = util.rollDice(currency.gp_count);
        }
        if(currency.pp_count != ""){
            ans.pp = util.rollDice(currency.pp_count);
        }

        if(items.gemstones_count != ""){
            var c = util.rollDice(items.gemstones_count);

            for(var i = 0; i < c; i++){
                ans.items.push(util.generateMagicItemDescription(util.getRandomValueInArray(data.treasure.gemstones[items.gemstones_price]), true));
            }
        }
        if(items.art_objects_count != ""){
            var c = util.rollDice(items.art_objects_count);

            for(var i = 0; i < c; i++){
                ans.items.push(util.generateMagicItemDescription(util.getRandomValueInArray(data.treasure.art_objects[items.art_objects_price]), true));
            }
        }
        if(items.magic_table_1_count != ""){
            var c = util.rollDice(items.magic_table_1_count);

            for(var i = 0; i < c; i++){
                ans.items.push(util.generateMagicItemDescription(util.getRandomValueInArray(data.treasure.magic_item_tables[items.magic_table_1])));
            }
        }
        if(items.magic_table_2_count != ""){
            var c = util.rollDice(items.magic_table_2_count);

            for(var i = 0; i < c; i++){
                ans.items.push(util.generateMagicItemDescription(util.getRandomValueInArray(data.treasure.magic_item_tables[items.magic_table_2])));
            }
        }

        for(var i = 0; i < ans.items.length; i++){
            if(ans.items[i].name == "Figurine of wondrous power"){
                ans.items[i].name += " - " + util.getRandomValueInArray(data.treasure.magic_item_tables.figurines);
            }
            if(ans.items[i].name == "Magic armor"){
                ans.items[i].name += " - " + util.getRandomValueInArray(data.treasure.magic_item_tables.magic_armor);
            }
            if(ans.items[i].name == "Weapon, +1"){
                ans.items[i].name += " - " + util.getRandomValueInArray(data.treasure.magic_item_tables.magic_weapons);
            }
            if(ans.items[i].name == "Weapon, +2"){
                ans.items[i].name += " - " + util.getRandomValueInArray(data.treasure.magic_item_tables.magic_weapons);
            }
            if(ans.items[i].name == "Weapon, +3"){
                ans.items[i].name += " - " + util.getRandomValueInArray(data.treasure.magic_item_tables.magic_weapons);
            }
            if(ans.items[i].name == "Spell scroll (cantrip)"){
                ans.items[i].name = "Spell scroll (cantrip) - " + util.getRandomValueInArray(data.spells["cantrip"]);
            }
            if(ans.items[i].name == "Spell scroll (1st level)"){
                ans.items[i].name = "Spell scroll (1st level) - " + util.getRandomValueInArray(data.spells["1"]);
            }
            if(ans.items[i].name == "Spell scroll (2nd level)"){
                ans.items[i].name = "Spell scroll (2nd level) - " + util.getRandomValueInArray(data.spells["2"]);
            }
            if(ans.items[i].name == "Spell scroll (3rd level)"){
                ans.items[i].name = "Spell scroll (3rd level) - " + util.getRandomValueInArray(data.spells["3"]);
            }
            if(ans.items[i].name == "Spell scroll (4th level)"){
                ans.items[i].name = "Spell scroll (4th level) - " + util.getRandomValueInArray(data.spells["4"]);
            }
            if(ans.items[i].name == "Spell scroll (5th level)"){
                ans.items[i].name = "Spell scroll (5th level) - " + util.getRandomValueInArray(data.spells["5"]);
            }
            if(ans.items[i].name == "Spell scroll (6th level)"){
                ans.items[i].name = "Spell scroll (6th level) - " + util.getRandomValueInArray(data.spells["6"]);
            }
            if(ans.items[i].name == "Spell scroll (7th level)"){
                ans.items[i].name = "Spell scroll (7th level) - " + util.getRandomValueInArray(data.spells["7"]);
            }
            if(ans.items[i].name == "Spell scroll (8th level)"){
                ans.items[i].name = "Spell scroll (8th level) - " + util.getRandomValueInArray(data.spells["8"]);
            }
            if(ans.items[i].name == "Spell scroll (9th level)"){
                ans.items[i].name = "Spell scroll (9th level) - " + util.getRandomValueInArray(data.spells["9"]);
            }
        }

        return ans;
    },

    generateMagicItemDescription: function(name, blank){
        if(blank == undefined || blank == null || blank == false){
            return {
                name: name,
                creator: util.getRandomValueInArray(data.treasure.magic_item_descriptions.creator),
                history: util.getRandomValueInArray(data.treasure.magic_item_descriptions.creator),
                minor_property: util.getRandomValueInArray(data.treasure.magic_item_descriptions.creator),
                quirk: util.getRandomValueInArray(data.treasure.magic_item_descriptions.creator),
            };
        }else{
            return {
                name: name,
                creator: "",
                history: "",
                minor_property: "",
                quirk: "",
            };
        }
    },

    rollDice: function(str){
        return roller.roll(str).total;
    },

    searchForMax: function(arr, roll){
        for(var i = 0; i < arr.length; i++){
            if(arr[i].max >= roll){
                return arr[i];
            }
        }
    },

    getRandomShape: function(i,j){
        let shapes = [
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j},
                {i:i+2,j:j-2}, {i:i+2,j:j-1},
            ],
            [
                {i:i-2,j:j-2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1},
                {i:i,j:j-2},   {i:i,j:j-1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1},
                {i:i+2,j:j-2},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j},
                {i:i+2,j:j-2}, {i:i+2,j:j-1},
            ],
            [
                {i:i-2,j:j-2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},
                {i:i+1,j:j-2}, {i:i+1,j:j-1},
                {i:i+2,j:j-2},
            ],
            [
                
                {i:i-1,j:j-2},
                {i:i,j:j-2},   {i:i,j:j-1},
                {i:i+1,j:j-2},
                
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                {i:i-1,j:j-2},
                {i:i,j:j-2},   {i:i,j:j-1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j},
                {i:i-1,j:j-2}, {i:i-1,j:j-1},
                {i:i,j:j-2},   {i:i,j:j-1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1},
                {i:i-1,j:j-2},
                {i:i,j:j-2},
                {i:i+1,j:j-2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j},
                {i:i,j:j-2},   {i:i,j:j-1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j},
                {i:i-1,j:j-2}, {i:i-1,j:j-1},
                {i:i,j:j-2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1},
                {i:i-1,j:j-2},
                
                {i:i+1,j:j-2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j},
                {i:i,j:j-2},   {i:i,j:j-1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j},
                {i:i+2,j:j-2}, {i:i+2,j:j-1},
            ],
            [
                {i:i-2,j:j-2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1},
                {i:i,j:j-2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1},
                {i:i+2,j:j-2},
            ],
            [
                {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                
                {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j},
                {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                {i:i-1,j:j},
                {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                {i:i,j:j},
                {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                
                {i:i+1,j:j},
                {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1},
            ],
            [
                {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j+2},
                {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                {i:i-1,j:j+2},
                {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j+2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                {i:i-1,j:j-2}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                {i:i,j:j-2},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                
                {i:i+1,j:j-2}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j+2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                {i:i-1,j:j-2}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                {i:i,j:j-2},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                
                {i:i+1,j:j-2}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-1}, {i:i-2,j:j+1},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                {i:i-1,j:j-1}, {i:i-1,j:j+1},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                {i:i,j:j-1},   {i:i,j:j+1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                
                {i:i+1,j:j-1}, {i:i+1,j:j+1},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j+2},
                {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j+2},
                {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j+2},
            ],
            [
                
                {i:i-1,j:j+2},
                {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j+2},
                
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j+2},
                
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j+2},
                {i:i,j:j+2},
                {i:i+1,j:j+2},
                {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j+2},
                {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j+2},
                
                {i:i+1,j:j+2},
                {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j+2},
                {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j+2},
                {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-1}, {i:i-2,j:j}, {i:i-2,j:j+1},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                
                {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j},
                {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                {i:i-1,j:j},
                {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                {i:i,j:j},
                {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                
                {i:i+1,j:j},
                {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1},
            ],
            [
                {i:i-2,j:j}, {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j+1}, {i:i-2,j:j+2},
                {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j+2},
                {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                {i:i-1,j:j+2},
                {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j+2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                {i:i-1,j:j-2}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                {i:i,j:j-2},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                
                {i:i+1,j:j-2}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-2}, {i:i-2,j:j+2},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                {i:i-1,j:j-2}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                {i:i,j:j-2},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                
                {i:i+1,j:j-2}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                {i:i-2,j:j-1}, {i:i-2,j:j+1},
                {i:i-1,j:j-2}, {i:i-1,j:j-1}, {i:i-1,j:j}, {i:i-1,j:j+1}, {i:i-1,j:j+2},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                {i:i-1,j:j-1}, {i:i-1,j:j+1},
                {i:i,j:j-2},   {i:i,j:j-1},   {i:i,j:j},   {i:i,j:j+1},   {i:i,j:j+2},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                {i:i,j:j-1},   {i:i,j:j+1},
                {i:i+1,j:j-2}, {i:i+1,j:j-1}, {i:i+1,j:j}, {i:i+1,j:j+1}, {i:i+1,j:j+2},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
            [
                
                
                
                {i:i+1,j:j-1}, {i:i+1,j:j+1},
                {i:i+2,j:j-2}, {i:i+2,j:j-1}, {i:i+2,j:j}, {i:i+2,j:j+1}, {i:i+2,j:j+2},
            ],
        ];
        let ans = util.getRandomValueInArray(shapes);
        for(let x = 0; x < ans.length; x++){
            if(ans[x].i < 0 || ans[x].i > world.length-1 || ans[x].j < 0 || ans[x].j > world.length-1){
                ans.splice(x,1);
                x--;
            }
        }
        return ans;
    },

    getRandomBlob: function(i,j, blob_count, radius){
        let ans = [];

        if(blob_count == undefined){
            blob_count = 50;
        }

        if(radius == undefined){
            radius = 3;
        }

        let r = util.getRandomInt(blob_count)+30;

        let ti = i;
        let tj = j;
        for(let x = 0; x < r; x++){
            let angle = Math.random()*Math.PI*2;
            ti = Math.floor(i + Math.sin(angle)*radius*Math.random());
            tj = Math.floor(j + Math.cos(angle)*radius*Math.random());
            ans = ans.concat(util.getRandomShape(ti,tj));
        }

        return ans;
    },

    generateCoastal: function(){
        for (let i = 0; i < world.length; i++) {
            for (let j = 0; j < world.length; j++) {
                let pos = 0;
                for(let z = 0; z < heightmap.elevations_list.length; z++){
                    if(world[i][j].elevation === heightmap.elevations_list[z]){
                        pos = z;
                        break;
                    }
                }
                let percentage = ((pos / heightmap.elevations_list.length) * 100);
                let next_to_water = false;
                let pts = [{i:i-2,j:j-2},{i:i-2,j:j-1},{i:i-2,j:j},{i:i-2,j:j+1},{i:i-2,j:j+2},{i:i-1,j:j-2},
                {i:i-1,j:j-1},{i:i-1,j:j},{i:i-1,j:j+1},{i:i-1,j:j+2},{i:i,j:j-2},{i:i,j:j-1},{i:i,j:j},
                {i:i,j:j+1},{i:i,j:j+2},{i:i+1,j:j-2},{i:i+1,j:j-1},{i:i+1,j:j},{i:i+1,j:j+1},{i:i+1,j:j+2},
                {i:i+2,j:j-2},{i:i+2,j:j-1},{i:i+2,j:j},{i:i+2,j:j+1},{i:i+2,j:j+2}];

                for(let x = 0; x < pts.length; x++){
                    if(pts[x].i > 0 && pts[x].i < world.length && pts[x].j > 0 && pts[x].j < world.length){
                        if(world[pts[x].i][pts[x].j].terrain === 'underwater'){
                            next_to_water = true;
                            break;
                        }
                    }
                }

                if(next_to_water && world[i][j].terrain != "underwater"){
                    world[i][j].terrain = "coastal";
                }
                if (percentage > data.settings.arctic_low
                    || i < 2
                    || i > world.length-3
                    || ((i < 3 || i > world.length-4) && util.getRandomInt(100) <= 75)
                    || ((i < 4 || i > world.length-5) && util.getRandomInt(100) <= 50)
                    || ((i < 5 || i > world.length-6) && util.getRandomInt(100) <= 25)) {
                    world[i][j].terrain = "arctic";
                }
            }
        }
    },

    generateDesertAndForestAndSwamp: function(){
        for (let i = 0; i < world.length; i++) {
            for (let j = 0; j < world.length; j++) {
                if (util.getRandomInt(data.settings.forest_chance) < 1 && (world[i][j].terrain == "grassland" || world[i][j].terrain == "hill" || world[i][j].terrain == "mountain")) {
                    let blob = util.getRandomBlob(i,j, data.settings.forest_blob_count, data.settings.forest_blob_radius);
                    for(let x = 0; x < blob.length; x++){
                        world[blob[x].i][blob[x].j].terrain = "forest";
                    }
                }
                if (util.getRandomInt(data.settings.desert_chance) < 1 && (world[i][j].terrain == "grassland" || world[i][j].terrain == "hill")) {
                    let blob = util.getRandomBlob(i,j, data.settings.desert_blob_count, data.settings.desert_blob_radius);
                    for(let x = 0; x < blob.length; x++){
                        world[blob[x].i][blob[x].j].terrain = "desert";
                    }
                }
                if (util.getRandomInt(data.settings.swamp_chance) < 1 && (world[i][j].terrain == "grassland" || world[i][j].terrain == "hill")) {
                    let blob = util.getRandomBlob(i,j, data.settings.swamp_blob_count, data.settings.swamp_blob_radius);
                    for(let x = 0; x < blob.length; x++){
                        world[blob[x].i][blob[x].j].terrain = "swamp";
                    }
                }
            }
        }
    },

    generateHillAndMountain: function(){
        for (let i = 0; i < world.length; i++) {
            for (let j = 0; j < world.length; j++) {                
                let pos = 0;
                for(let z = 0; z < heightmap.elevations_list.length; z++){
                    if(world[i][j].elevation === heightmap.elevations_list[z]){
                        pos = z;
                        break;
                    }
                }
                let percentage = ((pos / heightmap.elevations_list.length) * 100);
                if (percentage > data.settings.hill_low && percentage <= data.settings.mountain_low) {
                    world[i][j].terrain = "hill";
                }
                if (percentage > data.settings.mountain_low && percentage <= data.settings.arctic_low) {
                    world[i][j].terrain = "mountain";
                }
                if (percentage > data.settings.arctic_low
                    || i < 2
                    || i > world.length-3
                    || ((i < 3 || i > world.length-4) && util.getRandomInt(100) <= 75)
                    || ((i < 4 || i > world.length-5) && util.getRandomInt(100) <= 50)
                    || ((i < 5 || i > world.length-6) && util.getRandomInt(100) <= 25)) {
                    world[i][j].terrain = "arctic";
                }
            }
        }
    },

    generateLakes: function(){
        for (let i = 0; i < world.length; i++) {
            for (let j = 0; j < world.length; j++) {
                if (util.getRandomInt(data.settings.lake_chance) < 1) {
                    let blob = util.getRandomBlob(i,j, data.settings.lake_blob_count, data.settings.lake_blob_radius);
                    for(let x = 0; x < blob.length; x++){
                        world[blob[x].i][blob[x].j].terrain = "underwater";
                    }
                }
            }
        }
    },
};