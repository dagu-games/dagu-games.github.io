let view_controller = {
    render: function(){
        view_controller.updateCharacter();
        view_controller.updateContextMenu();
        view_controller.updateOutput();

        if(util.isAround(game.character.x,game.character.y,'quest_giver') || util.isAround(game.character.x,game.character.y,'shop')){
            user_interface.openLeftTab(null, '#npc_tab', '#npc_tablink');
            if(util.isAround(game.character.x,game.character.y,'shop')){
                user_interface.openRightTab(null, '#inventory_tab', '#inventory_tablink');
            }
        }else{
            user_interface.openLeftTab(null, '#attack_list_tab', '#attack_list_tablink');
        }
    },

    updateCharacter: function(){
        $('#character_location').text(map.getChunk(util.getChunk(game.character.x,game.character.y).x,util.getChunk(game.character.x,game.character.y).y).name + " (" + game.character.x + "," + game.character.y + ")");
        $('#character_level').text(game.character.level);
        $('#character_experience').text(game.character.experience);
        $('#character_experience_next_level').text(util.getExperienceNeededForLevel(game.character.level+1));
        $('#character_unspent_skill_points').text(game.character.unspent_skill_points);
        $('#character_current_health').text(game.character.current_health);
        $('#character_max_health').text(util.characterStats.max_health());
        $('#character_current_mana').text(game.character.current_mana);
        $('#character_max_mana').text(util.characterStats.max_mana());
        $('#character_armor').text(util.characterStats.armor());
        $('#character_magic_resistance').text(util.characterStats.magic_resistance());
        $('#character_cooldown_reduction').text(util.characterStats.cooldown_reduction());
        $('#character_attack_power').text(util.characterStats.attack_power());
        $('#character_attack_lifesteal').text(util.characterStats.attack_lifesteal());
        $('#character_magic_power').text(util.characterStats.magic_power());
        $('#character_magic_lifesteal').text(util.characterStats.magic_lifesteal());
        $('#character_gold').text(game.character.inventory.gold);
        $('#character_health_regeneration').text(util.characterStats.health_regeneration());
        $('#character_mana_regeneration').text(util.characterStats.mana_regeneration());

        $('#character_helmet_container').empty().append(view_controller.generateItem(game.character.equipped_items.helmet,'equipped',null));
        $('#character_shoulders_container').empty().append(view_controller.generateItem(game.character.equipped_items.shoulders,'equipped',null));
        $('#character_gauntlets_container').empty().append(view_controller.generateItem(game.character.equipped_items.gauntlets,'equipped',null));
        $('#character_chest_container').empty().append(view_controller.generateItem(game.character.equipped_items.chest,'equipped',null));
        $('#character_belt_container').empty().append(view_controller.generateItem(game.character.equipped_items.belt,'equipped',null));
        $('#character_pants_container').empty().append(view_controller.generateItem(game.character.equipped_items.pants,'equipped',null));
        $('#character_boots_container').empty().append(view_controller.generateItem(game.character.equipped_items.boots,'equipped',null));
        $('#character_main_hand_container').empty().append(view_controller.generateItem(game.character.equipped_items.main_hand,'equipped',null));
        $('#character_off_hand_container').empty().append(view_controller.generateItem(game.character.equipped_items.off_hand,'equipped',null));
        $('#character_necklace_container').empty().append(view_controller.generateItem(game.character.equipped_items.necklace,'equipped',null));
        $('#character_ring_1_container').empty().append(view_controller.generateItem(game.character.equipped_items.ring1,'equipped',{ring:1}));
        $('#character_ring_2_container').empty().append(view_controller.generateItem(game.character.equipped_items.ring2,'equipped',{ring:2}));
        //console.debug(view_controller.generateItem(game.character.equipped_items.ring2,'equipped',null));
        //console.debug(game.character.equipped_items.ring2);

        let $inventory = $('#equipment_container');
        $inventory.empty();
        for(let i = 0; i < game.character.inventory.equipment.length; i++){
            $inventory.append(view_controller.generateItem(game.character.inventory.equipment[i],'inventory',{index:i}));
        }

        let $quest_list = $('#quest_list_container');
        $quest_list.empty();
        for(let i = 0; i < game.character.quests.length; i++){
            $quest_list.append(view_controller.generateQuest(game.character.quests[i],"character"));
        }

        let $completed_quest_list = $('#completed_quest_list_container');
        $completed_quest_list.empty();
        for(let i = 0; i < game.character.completed_quests.length; i++){
            $completed_quest_list.append(view_controller.generateQuest(game.character.completed_quests[i],"completed"));
        }

        let $upgrades_list = $('#upgrades_container');
        $upgrades_list.empty();
        for(let i = 0; i < upgrades.length; i++){
            if(!util.hasUpgrade(i)){
                $upgrades_list.append(view_controller.generateUpgrade(upgrades[i],i));
            }
        }

        let $purchased_upgrades_list = $('#purchased_upgrades_container');
        $purchased_upgrades_list.empty();
        for(let i = 0; i < upgrades.length; i++){
            if(util.hasUpgrade(i)){
                $purchased_upgrades_list.append(view_controller.generateUpgrade(upgrades[i],i));
            }
        }

        let $quest_items_list = $('#quest_items_container');
        $quest_items_list.empty();
        for(let i = 0; i < game.character.inventory.quest_items.length; i++){
            $quest_items_list.append(view_controller.generateQuestItem(game.character.inventory.quest_items[i]));
        }
    },

    updateSaveList: function(){
        let $load_game_select = $('#load_game_select');
        $load_game_select.empty();

        let saves = util.getSavesList();

        for(let i = 0; i < saves.length; i++){
            let $save = $('<option></option>');
            if(i===0){
                $save.attr('selected',true);
            }
            $save.data('index',saves[i].index);
            let date = new Date(saves[i].time);
            $save.text(saves[i].index + " - " + date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
            $load_game_select.append($save);
        }
    },

    updateOutput: function(){
        let $out = $('#output_container');
        $out.empty();
        for(let i = 0; i < game.output.length; i++){
            $out.append(game.output[i] + "<br>");
        }
        $out.scrollTop($out[0].scrollHeight - $out[0].clientHeight);
    },

    updateContextMenu: function(){
        view_controller.updateSaveList();
        if(util.isInTown()){
            $('#set_home_button').show();
        }else{
            $('#set_home_button').hide();
        }

        let $npc_shop_list_container = $('#npc_shop_list_container');
        $npc_shop_list_container.empty();
        if(util.isAround(game.character.x,game.character.y,"shop")){
            let points = util.getAround(game.character.x,game.character.y);
            for(let i = 0; i < points.length; i++){
                if(map.get(points[i].x,points[i].y).npc != null && map.get(points[i].x,points[i].y).npc.type === "shop"){
                    let items = map.get(points[i].x,points[i].y).npc.items;
                    for(let j = 0; j < items.length; j++){
                        $npc_shop_list_container.append(view_controller.generateItem(items[j],'shop',{index:j,shop_x:points[i].x,shop_y:points[i].y}));
                    }
                }
            }
        }

        let $npc_quest_list_container = $('#npc_quest_list_container');
        $npc_quest_list_container.empty();
        if(util.isAround(game.character.x,game.character.y,"quest_giver")){
            let points = util.getAround(game.character.x,game.character.y);
            for(let i = 0; i < points.length; i++){
                if(map.get(points[i].x,points[i].y).npc != null && map.get(points[i].x,points[i].y).npc.type === "quest_giver" && !util.isQuestCompleted(map.get(points[i].x,points[i].y).npc.quest)){
                    $npc_quest_list_container.append(view_controller.generateQuest(map.get(points[i].x,points[i].y).npc.quest,'quest_giver'));
                }
            }
        }
        let $attack_list = $('#attack_list_container');
        $attack_list.empty();
        for(let i = 0; i < game.character.attacks.length; i++){
            if(character_attack.isOffCooldown(game.character.attacks[i])){
                $attack_list.append(view_controller.generateAttack(game.character.attacks[i]));
            }
        }
        for(let i = 0; i < game.character.attacks.length; i++){
            if(!character_attack.isOffCooldown(game.character.attacks[i])){
                $attack_list.append(view_controller.generateAttack(game.character.attacks[i]));
            }
        }
    },

    generateItem: function(item, mode, data){
        if(item == null){
            return;
        }
        let $cont = $('<div></div>');
        $cont.addClass('$container');
        $cont.addClass('item_container');

        let $title_cont = $('<div></div>');
        $title_cont.css('width', '49%');
        $title_cont.css('float', 'left');
        $title_cont.append('<h3>' + item.name + '</h3>');
        $title_cont.append('Rarity: ' + util.rarityToText(item.stats.rarity) + '<br>');
        $title_cont.append('Level: ' + item.level + '<br>');
        $title_cont.append('Value: ' + item.value + '<br>');
        $title_cont.append('Description: ' + item.description + '<br>');

        let $stats_cont = $('<div></div>');
        $stats_cont.css('width', '49%');
        $stats_cont.css('float', 'right');

        if(mode ==='equipped'){
            let $button = $('<button type="button">Unequip</button>');
            $button.css('float', 'right');
            $button.click(user_interface.unequipItem);
            if(data.ring != null){
                if(data.ring === 1){
                    $button.data('slot','ring1');
                }else{
                    $button.data('slot','ring2');
                }
            }else{
                $button.data('slot',item.slot);
            }
            $stats_cont.append($button);
        }
        if(mode === 'inventory'){
            if(item.slot === 'ring'){
                let $button = $('<button type="button">Equip in Ring 2</button>');
                $button.css('float', 'right');
                $button.click(user_interface.equipItem);
                $button.data('ring',2);
                $button.data('index',data.index);
                $stats_cont.append($button);

                $button = $('<button type="button">Equip in Ring 1</button>');
                $button.css('float', 'right');
                $button.click(user_interface.equipItem);
                $button.data('ring',1);
                $button.data('index',data.index);
                $stats_cont.append($button);
            }else{
                let $button = $('<button type="button">Equip</button>');
                $button.css('float', 'right');
                $button.data('ring',0);
                $button.data('index',data.index);
                $button.click(user_interface.equipItem);
                $stats_cont.append($button);
            }
            if(util.isAround(game.character.x,game.character.y,'shop')){
                let $button = $('<button type="button">Sell Item</button>');
                $button.css('float', 'right');
                $button.data('index',data.index);
                $button.click(user_interface.sellItem);
                $stats_cont.append($button);
            }
        }
        if(mode ==='shop' && item.value <= game.character.inventory.gold){
            let $button = $('<button type="button">Buy Item</button>');
            $button.css('float', 'right');
            $button.click(user_interface.buyItem);
            $button.data('index',data.index);
            $button.data('shop_x',data.shop_x);
            $button.data('shop_y',data.shop_y);
            $stats_cont.append($button);
        }

        if(item.stats.max_health > 0){
            $stats_cont.append('Max Health: ' + item.stats.max_health + '<br>');
        }
        if(item.stats.health_regeneration > 0){
            $stats_cont.append('Health Regeneration: ' + item.stats.health_regeneration + '<br>');
        }
        if(item.stats.max_mana > 0){
            $stats_cont.append('Max Mana: ' + item.stats.max_mana + '<br>');
        }
        if(item.stats.mana_regeneration > 0){
            $stats_cont.append('Mana Regeneration: ' + item.stats.mana_regeneration + '<br>');
        }
        if(item.stats.attack_power > 0){
            $stats_cont.append('Attack Power: ' + item.stats.attack_power + '<br>');
        }
        if(item.stats.attack_lifesteal > 0){
            $stats_cont.append('Attack Lifesteal: ' + item.stats.attack_lifesteal + '<br>');
        }
        if(item.stats.armor > 0){
            $stats_cont.append('Armor: ' + item.stats.armor + '<br>');
        }
        if(item.stats.magic_power > 0){
            $stats_cont.append('Magic Power: ' + item.stats.magic_power + '<br>');
        }
        if(item.stats.magic_lifesteal > 0){
            $stats_cont.append('Magic Lifesteal: ' + item.stats.magic_lifesteal + '<br>');
        }
        if(item.stats.magic_resistance > 0){
            $stats_cont.append('Magic Resistance: ' + item.stats.magic_resistance + '<br>');
        }
        if(item.stats.cooldown_reduction > 0){
            $stats_cont.append('Cooldown Reduction: ' + item.stats.cooldown_reduction + '<br>');
        }

        $cont.append($title_cont);
        $cont.append($stats_cont);
        return $cont;
    },

    generateQuest: function(quest_name, mode){
        if(quest_name == null || (mode === 'quest_giver' && util.hasQuest(quest_name) && !util.hasQuestItem(quest_name))){
            return;
        }
        let quest = util.getQuest(quest_name);
        let $cont = $('<div></div>');
        $cont.addClass('$container');
        $cont.addClass('item_container');

        let $title_cont = $('<div></div>');
        $title_cont.css('width', '70%');
        $title_cont.css('float', 'left');
        $title_cont.append('<h3>' + quest.name + '</h3>');
        $title_cont.append('Goal Item: ' + quest.goal_item + '<br>');
        $title_cont.append('Description: ' + quest.description + '<br>');

        let $stats_cont = $('<div></div>');
        $stats_cont.css('width', '29%');
        $stats_cont.css('float', 'right');

        if(mode === "quest_giver"){
            if(util.hasQuest(quest_name) && util.hasQuestItem(quest_name)){
                let $button = $('<button type="button">Complete Quest</button>');
                $button.css('float', 'right');
                $button.click(user_interface.completeQuest);
                $button.data('quest_name',quest_name);
                $stats_cont.append($button);
            }else if(!util.hasQuest(quest_name) && !util.isQuestCompleted(quest_name)){
                let $button = $('<button type="button">Accept Quest</button>');
                $button.css('float', 'right');
                $button.click(user_interface.acceptQuest);
                $button.data('quest_name',quest_name);
                $stats_cont.append($button);
            }
        }
        if(mode === 'character'){
            let $button = $('<button type="button">Abandon Quest</button>');
            $button.css('float', 'right');
            $button.click(user_interface.abandonQuest);
            $button.data('quest_name',quest_name);
            $stats_cont.append($button);
            if(util.hasQuestItem(quest_name)){
                $stats_cont.append('Direction: ' + util.directionToText(util.directionTowardQuestNPC(quest_name)) + '<br>');
            }else{
                $stats_cont.append('Direction: ' + util.directionToText(util.directionTowardGoalItem(quest_name)) + '<br>');
            }

        }

        $cont.append($title_cont);
        $cont.append($stats_cont);
        return $cont;
    },

    generateUpgrade: function(upgrade,i){
        if(upgrade == null){
            return;
        }
        let $cont = $('<div></div>');
        $cont.addClass('$container');
        $cont.addClass('item_container');

        let $title_cont = $('<div></div>');
        $title_cont.css('width', '80%');
        $title_cont.css('float', 'left');
        $title_cont.append('<h3>' + upgrade.name + '</h3>');
        $title_cont.append('Skill Point Cost: ' + upgrade.skill_point_cost + '<br>');
        $title_cont.append('Description: ' + upgrade.description + '<br>');

        let $stats_cont = $('<div></div>');
        $stats_cont.css('width', '19%');
        $stats_cont.css('float', 'right');

        if(!util.hasUpgrade(i) && upgrade.isAvailable()){
            let $button = $('<button type="button">Buy Upgrade</button>');
            $button.css('float', 'right');
            $button.click(user_interface.buyUpgrade);
            $button.data('upgrade_index',i);
            $stats_cont.append($button);
        }else if(util.hasUpgrade(i)){
            let $button = $('<button type="button">Refund Upgrade</button>');
            $button.css('float', 'right');
            $button.click(user_interface.refundUpgrade);
            $button.data('upgrade_index',i);
            $stats_cont.append($button);
        }

        $cont.append($title_cont);
        $cont.append($stats_cont);
        return $cont;
    },

    generateQuestItem: function(goal_item_name){
        if(goal_item_name == null){
            return;
        }
        let quest = util.getQuestFromGoalItem(goal_item_name);
        let $cont = $('<div></div>');
        $cont.addClass('$container');
        $cont.addClass('item_container');

        let $title_cont = $('<div></div>');
        $title_cont.css('width', '99%');
        $title_cont.css('float', 'left');
        $title_cont.append('<h3>' + goal_item_name + '</h3>');
        $title_cont.append('Description: ' + quest.goal_item_description + '<br>');

        $cont.append($title_cont);
        return $cont;
    },

    generateAttack: function(attack_name){
        if(attack_name == null){
            return;
        }
        let attack = character_attack.getAttack(attack_name);
        let $cont = $('<div></div>');
        $cont.addClass('$container');
        $cont.addClass('item_container');

        let $title_cont = $('<div></div>');
        $title_cont.css('width', '80%');
        $title_cont.css('float', 'left');
        $title_cont.append('<h3>' + attack.name + '</h3>');
        $title_cont.append('Mana Cost: ' + attack.mana_cost + '<br>');
        $title_cont.append('Cooldown: ' + attack.cooldown + '<br>');
        $title_cont.append('Range: ' + attack.range + '<br>');
        $title_cont.append('Description: ' + attack.description + '<br>');

        let $stats_cont = $('<div></div>');
        $stats_cont.css('width', '19%');
        $stats_cont.css('float', 'right');

        if(game.status === STATUS.COMBAT_SPELL_SELECTED){
            let $button = $('<button type="button">Cancel Spell</button>');
            $button.css('float', 'right');
            $button.click(user_interface.cancelSpell);
            $button.data('attack_name',attack_name);
            $stats_cont.append($button);
        }else{
            if(character_attack.hasManaFor(attack_name) && character_attack.isOffCooldown(attack_name)){
                let $button = $('<button type="button">Use Attack</button>');
                $button.css('float', 'right');
                $button.click(user_interface.selectAttack);
                $button.data('attack_name',attack_name);
                $stats_cont.append($button);
            }
        }

        $cont.append($title_cont);
        $cont.append($stats_cont);
        return $cont;
    },
};