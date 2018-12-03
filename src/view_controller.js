let view_controller = {
    render: function(){
        view_controller.updateCharacter();
        view_controller.updateContextMenu();
        view_controller.updateOutput();
        view_controller.updateHotbar();

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

    updateHotbar: function(){
        let $cont = $('#hotbar_container');
        $cont.empty();
        if(game.status !== STATUS.HOTBAR_ATTACK_SELECTED){
            for(let i = 1; i < game.character.hotbar.length; i++){
                if(game.character.hotbar[i] !== ""){
                    $cont.append(view_controller.generateHotbarIcon(game.character.hotbar[i],i));
                }
            }
            if(game.character.hotbar[0] !== ""){
                $cont.append(view_controller.generateHotbarIcon(game.character.hotbar[0],0));
            }
        }else{
            for(let i = 1; i < game.character.hotbar.length; i++){
                $cont.append(view_controller.generateHotbarAssignIcon(game.character.hotbar[i],i));
            }
            $cont.append(view_controller.generateHotbarAssignIcon(game.character.hotbar[0],0));
        }
    },

    generateItem: function(item, mode, data){
        if(item == null){
            return;
        }
        let $cont = $('<div></div>');
        $cont.addClass('container');
        $cont.addClass('item_container');

        let $title_cont = $('<table></table>');
        $title_cont.css('width', '99%');
        $title_cont.addClass('stats_table');

        let $buttons = $('<div></div>');

        if(mode ==='equipped'){
            let $button = $('<button class="button" type="button">Unequip</button>');
            $button.css('float', 'right');
            $button.click(user_interface.unequipItem);
            if(data != null && data.ring != null){
                if(data.ring === 1){
                    $button.data('slot','ring1');
                }else{
                    $button.data('slot','ring2');
                }
            }else{
                $button.data('slot',item.slot);
            }
            $buttons.append($button);
        }
        if(mode === 'inventory'){
            if(item.slot === 'ring'){
                let $button = $('<button class="button" type="button">Equip in Ring 2</button>');
                $button.css('float', 'right');
                $button.click(user_interface.equipItem);
                $button.data('ring',2);
                $button.data('index',data.index);
                $buttons.append($button);

                $button = $('<button class="button" type="button">Equip in Ring 1</button>');
                $button.css('float', 'right');
                $button.click(user_interface.equipItem);
                $button.data('ring',1);
                $button.data('index',data.index);
                $buttons.append($button);
            }else{
                let $button = $('<button class="button" type="button">Equip</button>');
                $button.css('float', 'right');
                $button.data('ring',0);
                $button.data('index',data.index);
                $button.click(user_interface.equipItem);
                $buttons.append($button);
            }
            if(util.isAround(game.character.x,game.character.y,'shop')){
                let $button = $('<button class="button" type="button">Sell Item</button>');
                $button.css('float', 'right');
                $button.data('ring',0);
                $button.data('index',data.index);
                $button.click(user_interface.sellItem);
                $buttons.append($button);
            }
        }
        if(mode ==='shop' && item.value <= game.character.inventory.gold){
            let $button = $('<button class="button" type="button">Buy Item</button>');
            $button.css('float', 'right');
            $button.click(user_interface.buyItem);
            $button.data('index',data.index);
            $button.data('shop_x',data.shop_x);
            $button.data('shop_y',data.shop_y);
            $buttons.append($button);
        }

        let $tr = $('<tr></tr>');
        $tr.append('<td>' + item.name + '</td>');
        let $td = $('<td></td>');
        $td.append($buttons);
        $tr.append($td);
        $title_cont.append($tr);

        $title_cont.append('<tr><td>Rarity</td><td>' + util.rarityToText(item.stats.rarity) + '</td></tr>');
        $title_cont.append('<tr><td>Level</td><td>' + item.level + '</td></tr>');
        $title_cont.append('<tr><td>Value</td><td>' + item.value + '</td></tr>');

        if(item.stats.max_health > 0){
            $title_cont.append('<tr><td>Max Health</td><td>' + item.stats.max_health + '</td></tr>');
        }
        if(item.stats.health_regeneration > 0){
            $title_cont.append('<tr><td>Health Regeneration</td><td>' + item.stats.health_regeneration + '</td></tr>');
        }
        if(item.stats.max_mana > 0){
            $title_cont.append('<tr><td>Max Mana</td><td>' + item.stats.max_mana + '</td></tr>');
        }
        if(item.stats.mana_regeneration > 0){
            $title_cont.append('<tr><td>Mana Regeneration</td><td>' + item.stats.mana_regeneration + '</td></tr>');
        }
        if(item.stats.attack_power > 0){
            $title_cont.append('<tr><td>Attack Power</td><td>' + item.stats.attack_power + '</td></tr>');
        }
        if(item.stats.attack_lifesteal > 0){
            $title_cont.append('<tr><td>Attack Lifesteal</td><td>' + item.stats.attack_lifesteal + '</td></tr>');
        }
        if(item.stats.armor > 0){
            $title_cont.append('<tr><td>Armor</td><td>' + item.stats.armor + '</td></tr>');
        }
        if(item.stats.magic_power > 0){
            $title_cont.append('<tr><td>Magic Power</td><td>' + item.stats.magic_power + '</td></tr>');
        }
        if(item.stats.magic_lifesteal > 0){
            $title_cont.append('<tr><td>Magic Lifesteal</td><td>' + item.stats.magic_lifesteal + '</td></tr>');
        }
        if(item.stats.magic_resistance > 0){
            $title_cont.append('<tr><td>Magic Resistance</td><td>' + item.stats.magic_resistance + '</td></tr>');
        }
        if(item.stats.cooldown_reduction > 0){
            $title_cont.append('<tr><td>Cooldown Reduction</td><td>' + item.stats.cooldown_reduction + '</td></tr>');
        }

        $title_cont.append('<tr><td>Description</td><td>' + item.description + '</td></tr>');
        $cont.append($title_cont);
        return $cont;
    },

    generateQuest: function(quest_name, mode){
        if(quest_name == null || (mode === 'quest_giver' && util.hasQuest(quest_name) && !util.hasQuestItem(quest_name))){
            return;
        }
        let quest = util.getQuest(quest_name);
        let $cont = $('<div></div>');
        $cont.addClass('container');
        $cont.addClass('item_container');

        let $title_cont = $('<table></table>');
        $title_cont.css('width', '99%');
        $title_cont.addClass('stats_table');

        let $buttons = $('<div></div>');
        if(mode === "quest_giver"){
            if(util.hasQuest(quest_name) && util.hasQuestItem(quest_name)){
                let $button = $('<button class="button" type="button">Complete Quest</button>');
                $button.css('float', 'right');
                $button.click(user_interface.completeQuest);
                $button.data('quest_name',quest_name);
                $buttons.append($button);
            }else if(!util.hasQuest(quest_name) && !util.isQuestCompleted(quest_name)){
                let $button = $('<button class="button" type="button">Accept Quest</button>');
                $button.css('float', 'right');
                $button.click(user_interface.acceptQuest);
                $button.data('quest_name',quest_name);
                $buttons.append($button);
            }
        }
        if(mode === 'character'){
            let $button = $('<button class="button" type="button">Abandon Quest</button>');
            $button.css('float', 'right');
            $button.click(user_interface.abandonQuest);
            $button.data('quest_name',quest_name);
            $buttons.append($button);

        }

        let $tr = $('<tr></tr>');
        $tr.append('<td>' + quest.name + '</td>');
        let $td = $('<td></td>');
        $td.append($buttons);
        $tr.append($td);
        $title_cont.append($tr);

        $title_cont.append('<tr><td>Goal Item</td><td>' + quest.goal_item + '</td></tr>');

        if(util.hasQuestItem(quest_name)){
            $title_cont.append('<tr><td>Direction</td><td>' + util.directionToText(util.directionTowardQuestNPC(quest_name)) + '</td></tr>');
        }else{
            $title_cont.append('<tr><td>Direction</td><td>' + util.directionToText(util.directionTowardGoalItem(quest_name)) + '</td></tr>');
        }
        $title_cont.append('<tr><td>Description</td><td>' + quest.description + '</td></tr>');

        $cont.append($title_cont);
        return $cont;
    },

    generateUpgrade: function(upgrade,i){
        if(upgrade == null){
            return;
        }
        let $cont = $('<div></div>');
        $cont.addClass('container');
        $cont.addClass('item_container');

        let $title_cont = $('<table></table>');
        $title_cont.css('width', '99%');
        $title_cont.addClass('stats_table');

        let $buttons = $('<div></div>');

        if(!util.hasUpgrade(i) && upgrade.isAvailable()){
            let $button = $('<button class="button" type="button">Buy Upgrade</button>');
            $button.css('float', 'right');
            $button.click(user_interface.buyUpgrade);
            $button.data('upgrade_index',i);
            $buttons.append($button);
        }else if(util.hasUpgrade(i)){
            let $button = $('<button class="button" type="button">Refund Upgrade</button>');
            $button.css('float', 'right');
            $button.click(user_interface.refundUpgrade);
            $button.data('upgrade_index',i);
            $buttons.append($button);
        }

        let $tr = $('<tr></tr>');
        $tr.append('<td>' + upgrade.name + '</td>');
        let $td = $('<td></td>');
        $td.append($buttons);
        $tr.append($td);
        $title_cont.append($tr);

        $title_cont.append('<tr><td>Skill Point Cost</td><td>' + upgrade.skill_point_cost + '</td></tr>');
        $title_cont.append('<tr><td>Description</td><td>' + upgrade.description + '</td></tr>');

        $cont.append($title_cont);
        return $cont;
    },

    generateQuestItem: function(goal_item_name){
        if(goal_item_name == null){
            return;
        }
        let quest = util.getQuestFromGoalItem(goal_item_name);
        let $cont = $('<div></div>');
        $cont.addClass('container');
        $cont.addClass('item_container');

        let $title_cont = $('<table></table>');
        $title_cont.css('width', '99%');
        $title_cont.addClass('stats_table');
        $title_cont.append('<tr><td>' + goal_item_name + '</td></tr>');
        $title_cont.append('<tr><td>Description</td><td>' + quest.goal_item_description + '</td></tr>');

        $cont.append($title_cont);
        return $cont;
    },

    generateAttack: function(attack_name){
        if(attack_name == null){
            return;
        }
        let attack = character_attack.getAttack(attack_name);

        let $cont = $('<div></div>');
        $cont.addClass('container');
        $cont.addClass('item_container');

        let $left_cont = $('<div></div>');
        $left_cont.addClass('container');
        $left_cont.addClass('left_container');
        $left_cont.css('width', '20%');

        let $right_cont = $('<div></div>');
        $right_cont.addClass('container');
        $right_cont.addClass('right_container');
        $right_cont.css('width', '79%');
        

        let $attack_img = $('<img>');
        $attack_img.attr('src', attack.icon);
        $attack_img.addClass('attack_img');
        $attack_img.data('attack_name',attack_name);

        if(game.status === STATUS.COMBAT_ATTACK_SELECTED){
            $attack_img.click(user_interface.cancelAttack);
        }else{
            if(character_attack.hasManaFor(attack_name) && character_attack.isOffCooldown(attack_name)){
                $attack_img.click(user_interface.selectAttack);
            }
        }

        let $title_cont = $('<table></table>');
        $title_cont.css('width', '99%');
        $title_cont.addClass('stats_table');

        let $tr = $('<tr></tr>');
        let $th = $('<th></th>');
        //$th.css('float','left');
        $th.css('text-align','left');
        $th.attr('colspan',2);
        $th.append($attack_img);
        $th.append(attack.name);
        $tr.append($th);
        $title_cont.append($tr);

        $title_cont.append('<tr><td>Mana Cost</td><td>' + attack.mana_cost + '</td></tr>');
        $title_cont.append('<tr><td>Cooldown</td><td>' + attack.cooldown + '</td></tr>');
        $title_cont.append('<tr><td>Range</td><td>' + attack.range + '</td></tr>');
        $title_cont.append('<tr><td>Description</td><td>' + attack.description + '</td></tr>');

        $right_cont.append($title_cont);
        if(game.status === STATUS.COMBAT_ATTACK_SELECTED){
            $right_cont.append("(click icon to cancel the attack)");
        }else if(game.status !== STATUS.HOTBAR_ATTACK_SELECTED){
            let $button = $('<button class="button" type="button">Assign to Hotbar</button>');
            $button.css('float', 'left');
            $button.click(user_interface.selectHotbarAttack);
            $button.data('attack_name',attack_name);
            $right_cont.append($button);
        }
        $left_cont.append($attack_img);

        $cont.append($left_cont);
        $cont.append($right_cont);

        return $cont;
    },

    generateHotbarIcon: function(attack_name,i){
        if(attack_name == null){
            return;
        }
        let attack = character_attack.getAttack(attack_name);
        let $cont = $('<div></div>');
        $cont.addClass('hotbar_div');


        let $hotbar_img = $('<img>');
        $hotbar_img.attr('src', attack.icon);
        $hotbar_img.addClass('hotbar_img');
        $hotbar_img.css('width','100%');
        $hotbar_img.data('tooltip_container','#hotbar_tooltip_' + i);
        $hotbar_img.data('attack_name',attack_name);
        $hotbar_img.mouseover(user_interface.hoverDiv);
        $hotbar_img.mouseleave(user_interface.hoverDiv);

        if(game.status === STATUS.COMBAT_ATTACK_SELECTED){
            $hotbar_img.click(user_interface.cancelAttack);
        }else if(character_attack.isOffCooldown(attack_name) && character_attack.hasManaFor(attack_name)){
            $hotbar_img.click(user_interface.selectAttack);
        }else{
            $hotbar_img.css('opacity','0.5');
        }

        let $bottom_right_text = $('<span class="bottom_right_text">' + i + '</span>');

        let $bottom_left_text = null;
        if(character_attack.isOffCooldown(attack_name)){
            $bottom_left_text = $('<span class="bottom_left_text"></span>');
        }else{
            $bottom_left_text = $('<span class="bottom_left_text">' + game.character.cooldowns[attack_name] + '</span>');
        }

        let $hotbar_tooltip = $('<div></div>');
        $hotbar_tooltip.attr('id', 'hotbar_tooltip_' + i);
        $hotbar_tooltip.addClass('hotbar_tooltip');

        let $stats_table = $('<table></table>');
        $stats_table.addClass('stats_table');
        $stats_table.append('<tr><th>' + attack.name + '</th></tr>');
        $stats_table.append('<tr><td>Mana Cost</td><td>' + attack.mana_cost + '</td></tr>');
        $stats_table.append('<tr><td>Cooldown</td><td>' + attack.cooldown + '</td></tr>');
        $stats_table.append('<tr><td>Range</td><td>' + attack.range + '</td></tr>');
        $stats_table.append('<tr><td>Description</td><td>' + attack.description + '</td></tr>');
        $hotbar_tooltip.append($stats_table);


        $cont.append($hotbar_img);
        $cont.append($bottom_left_text);
        $cont.append($bottom_right_text);
        $cont.append($hotbar_tooltip);
        return $cont;
    },

    generateHotbarAssignIcon: function(attack_name,i){
        let $cont = $('<div></div>');
        $cont.addClass('hotbar_div');


        let $hotbar_img = $('<img>');

        if(attack_name === ""){
            $hotbar_img.attr('src', "images/center.png");
        }else{
            let attack = character_attack.getAttack(attack_name);
            $hotbar_img.attr('src', attack.icon);
        }
        $hotbar_img.addClass('hotbar_img');
        $hotbar_img.css('width','100%');
        $hotbar_img.data('index',i);
        $hotbar_img.click(user_interface.assignHotbarAttack);

        let $bottom_right_text = $('<span class="bottom_right_text">' + i + '</span>');

        $cont.append($hotbar_img);
        $cont.append($bottom_right_text);
        return $cont;
    },
};