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
        ans += "Appearance: " + npc.appearance + "<br>";
        ans += "High Stat: " + npc.high_stat + "<br>";
        ans += "Low Stat: " + npc.low_stat + "<br>";
        ans += "Talent: " + npc.talent + "<br>";
        ans += "Mannerism: " + npc.mannerism + "<br>";
        ans += "Interaction Trait: " + npc.interaction_trait + "<br>";
        ans += "Alignment: " + npc.alignment1 + " " + npc.alignment2 + "<br>";
        ans += "Ideals: " + npc.ideal1 + " and " + npc.ideal2 + "<br>";
        ans += "Bond: " + npc.bond + "<br>";
        ans += "Flaw: " + npc.flaw + "<br>";
        ans += "Profession: " + npc.profession + "<br>";
        ans += "</div><br>";
        return ans;
    },

};