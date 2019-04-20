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
//                    content.style.maxHeight = null;
                } else {
                    content.style.display = "block";
//                    content.style.maxHeight = content.scrollHeight + "px";
//                    console.log(this);
//                    this.parentElement.style.maxHeight = this.parentElement.scrollHeight + "px";
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

    generateTown: function () {
        let ans = {
            name: util.generateTownName(),
            type: "town",
            terrain: "urban",
            race_relations: util.getRandomValueInArray(data.race_relations),
            government: util.getRandomValueInArray(data.governments),
            ruler_status: util.getRandomValueInArray(data.ruler_status),
            notable_trait: util.getRandomValueInArray(data.notable_traits),
            known_for: util.getRandomValueInArray(data.known_for),
            current_calamity: util.getRandomValueInArray(data.current_calamity),
            size: util.getRandomValueInArray(data.town_sizes),
            buildings: [],
            urban_encounters: [],
        };
        let building_count = 0;
        if (ans.size === "Village") {
            building_count = 50;
            ans.population = 250 + util.getRandomInt(750);
        } else if (ans.size === "Town") {
            building_count = 250;
            ans.population = 2000 + util.getRandomInt(4000);
        } else {
            building_count = 1250;
            ans.population = 7500 + util.getRandomInt(25000);
        }

        for (let i = 0; i < building_count; i++) {
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
            ans.buildings.push(building);
        }
        ans.buildings.sort(function(a, b){
            if(a.type < b.type) { return -1; }
            if(a.type > b.type) { return 1; }
            return 0;
        });
        ans.wandering_npcs = [];
        let q = util.getRandomInt(50) + 25;
        let qc = 0;
        while (qc < q) {
            ans.wandering_npcs.push(util.generateNPC());
            qc++;
        }
        for (let i = 0; i < 5; i++) {
            ans.urban_encounters.push(util.getRandomValueInArray(data.urban_encounters));
        }
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
        ans += "<tr><td>Profession: " + npc.profession + "</td></tr></table>";
        ans += "</div><br>";
        return ans;
    },

    MonstertoHTML: function (monster) {
        let ans = "";
        ans += "<button class=\"collapsible\">" + monster.name + "</button>";
        ans += "<div class=\"content\">";
        ans += "<table>";
        ans += "<tr><td>Appearance</td><td>" + monster.appearance + "</td></tr>";
        ans += "</div><br>";
        return ans;
    },

    generateEncounter: function (terrain, num_players, level) {
        let ans = [];
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
            console.log('medium');
            threshold = threshold_table.medium[level];
        }
        if(r > 75){
            console.log('hard');
            threshold = threshold_table.hard[level];
        }
        if(r > 95){
            console.log('deadly');
            threshold = threshold_table.deadly[level];
        }
        
        threshold = threshold * num_players;
        
        let num_monsters = 1;
        if(util.getRandomInt(3) === 0){
            num_monsters = util.getRandomInt(10) + 1;
        }
        
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
        
        console.log("CR: " + cr + " with " + num_monsters + " monsters for " + num_players + " level " + level + " players");
        
        let mlist = [];
        if(util.getRandomInt(10) !== 0){
            for(let i = 0; i < data.monsters.length; i++){
                for(let j = 0; j < data.monsters[i].terrains.length; j++){
                    if(data.monsters[i].cr === cr && data.monsters[i].terrains[j] === terrain){
                        mlist.push(data.monsters[i]);   
                    }
                }
            }
        }else{
            for(let i = 0; i < data.monsters.length; i++){
                if(data.monsters[i].terrains.length > 0){
                    for(let j = 0; j < data.monsters[i].terrains.length; j++){
                        if(data.monsters[i].cr === cr && data.monsters[i].terrains[j] === terrain){
                            mlist.push(data.monsters[i]);   
                        }
                    }
                }else{
                    if(data.monsters[i].cr === cr){
                        mlist.push(data.monsters[i]);
                    }
                }
            }
        }
        
        
        let monster = util.getRandomValueInArray(mlist);
        for(let i = 0; i < num_monsters; i++){
            ans.push(monster);
        }
        //calculate number of monsters
        //adjust threshold
        
        
        //adjust threshold based on number of players
        
        
        //determine rare or normal
        
        
        //if normal, trim monster list to given terrain
        //if rare, trim monster list to given terrain and no terrain
        
        
        //trim monster list of challenge rating monsters that don't fit with the number chosen and threshold needed
        
        //pick random monster set of chosen number, push to ans, and return
        
        
        
        
        return ans;
    },

};