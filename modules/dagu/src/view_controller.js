let view_controller = {
    render: function(){
        $('.tooltip').remove();
        view_controller.updateCharacter();
        view_controller.updateContextMenu();
        view_controller.updateOutput();
        view_controller.updateHotbar();

        if(util.isAround(game.character.x,game.character.y,'quest_giver') || util.isAround(game.character.x,game.character.y,'shop')){
            user_interface.openTab(null, '#npc_tab', '#npc_tablink');
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
        $('.character_gold').text(game.character.inventory.gold);
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

        let $quest_list = $('#quest_list_container');
        $quest_list.empty();
        if(game.character.quests.length > 0){
            $quest_list.append('<h2>Quests</h2>');
            for(let i = 0; i < game.character.quests.length; i++){
                $quest_list.append(view_controller.generateQuest(game.character.quests[i],"character"));
            }
        }else{
            $quest_list.append("You don't have any quests yet. Go fight some monsters or find a town and accept a quest!");
        }

        let $inventory = $('#inventory_container');
        $inventory.empty();
        let items = util.getCondensedInventory();
        if(items.length > 0){
            $inventory.append('<h2>Inventory</h2>');
            for(let i = 0; i < items.length; i++){
                $inventory.append(view_controller.generateItem(items[i], 'inventory', null));
            }
        }else{
            $inventory.append("You don't have any items yet. Go fight some monsters or find a town and accept a quest!");
        }

        let $equipment = $('#equipment_container');
        $equipment.empty();
        let item_found = false;
        for(let i = 0; i < game.character.inventory.items.length; i++){
            if(game.character.inventory.items[i].type === ITEM_TYPES.EQUIPMENT){
                if(!item_found){
                    $equipment.append('<h2>Equipment</h2>');
                }
                item_found = true;
                $equipment.append(view_controller.generateItem(game.character.inventory.items[i], 'equipment', {index: i}));
            }
        }
        if(!item_found){
            $equipment.append("You don't have any equipment yet. Go fight some monsters or find a town and accept a quest!");
        }


        let $goal_items_list = $('#goal_items_container');
        $goal_items_list.empty();
        item_found = false;
        for(let i = 0; i < game.character.inventory.items.length; i++){
            if(game.character.inventory.items[i].type === ITEM_TYPES.GOAL_ITEM){
                if(!item_found){
                    $goal_items_list.append('<h2>Quest Items</h2>');
                }
                item_found = true;
                $goal_items_list.append(view_controller.generateItem(game.character.inventory.items[i], 'goal_item', {}));
            }
        }
        if(!item_found){
            $goal_items_list.append("You don't have any quest items yet. Go fight some monsters or find a town and accept a quest!");
        }

        let $consumables_list = $('#consumables_container');
        $consumables_list.empty();
        item_found = false;
        for(let i = 0; i < game.character.inventory.items.length; i++){
            if(game.character.inventory.items[i].type === ITEM_TYPES.CONSUMABLE){
                if(!item_found){
                    $consumables_list.append('<h2>Consumables</h2>');
                }
                item_found = true;
                $consumables_list.append(view_controller.generateItem(game.character.inventory.items[i], 'consumable', {index: i}));
            }
        }
        if(!item_found){
            $consumables_list.append("You don't have any consumables yet. Go fight some monsters or find a town and accept a quest!");
        }

        let $upgrades_list = $('#upgrades_container');
        $upgrades_list.empty();
        item_found = false;
        for(let i = 0; i < upgrades.length; i++){
            if(!util.hasUpgrade(i)){
                if(!item_found){
                    $upgrades_list.append('<h2>Upgrades</h2>');
                }
                item_found = true;
                $upgrades_list.append(view_controller.generateUpgrade(upgrades[i],i));
            }
        }
        if(!item_found){
            $upgrades_list.append("You have bought every upgrade! Great Job!");
        }

        let $purchased_upgrades_list = $('#purchased_upgrades_container');
        $purchased_upgrades_list.empty();
        item_found = false;
        for(let i = 0; i < upgrades.length; i++){
            if(util.hasUpgrade(i)){
                if(!item_found){
                    $purchased_upgrades_list.append('<h2>Purchased Upgrades</h2>');
                }
                item_found = true;
                $purchased_upgrades_list.append(view_controller.generateUpgrade(upgrades[i],i));
            }
        }
        if(!item_found){
            $purchased_upgrades_list.append("You don't have any upgrades yet. Go level up to earn some skill points!");
        }

        let $completed_quest_list = $('#completed_quest_list_container');
        $completed_quest_list.empty();
        if(game.character.completed_quests.length === 0){
            $completed_quest_list.append("You haven't completed any quests yet. Go accept one and complete it to earn rewards!");
        }else{
            $completed_quest_list.append('<h2>Completed Quests</h2>');
            for(let i = 0; i < game.character.completed_quests.length; i++){
                $completed_quest_list.append(view_controller.generateQuest(game.character.completed_quests[i],"completed"));
            }
        }
    },

    updateContextMenu: function(){
        view_controller.updateSaveList();
        if(util.isInTown()){
            $('#set_home_button').show();
        }else{
            $('#set_home_button').hide();
        }

        let $npc_quest_list_container = $('#npc_quest_list_container');
        $npc_quest_list_container.empty();
        if(util.isAround(game.character.x,game.character.y,"quest_giver")){
            let points = util.getAround(game.character.x,game.character.y);
            for(let i = 0; i < points.length; i++){
                let map_entry = map.get(points[i].x,points[i].y);
                if(map_entry.npc != null && map_entry.npc.type === "quest_giver"){
                    let quest_name = map_entry.npc.quest;
                    if(!quests.isQuestCompleted(quest_name) && !quests.hasQuest(quest_name)){
                        $npc_quest_list_container.append("<h2>" + map_entry.npc.name + " has a quest for you!</h2>");
                        $npc_quest_list_container.append(view_controller.generateQuest(map.get(points[i].x,points[i].y).npc.quest,'quest_giver'));
                    }
                }
            }
        }

        let $buy_item_list_container = $('#buy_item_list_container');
        $buy_item_list_container.empty();
        if(util.isAround(game.character.x,game.character.y,"shop")){
            $buy_item_list_container.show();
            $buy_item_list_container.append("<h2>Gold: " + game.character.inventory.gold + "</h2>");
            $buy_item_list_container.append("<h3>(click to buy/sell, hover for details)</h3>");
            let points = util.getAround(game.character.x,game.character.y);
            for(let i = 0; i < points.length; i++){
                let map_entry = map.get(points[i].x,points[i].y);
                if(map_entry.npc != null && map_entry.npc.type === "shop"){
                    let items = map_entry.npc.items;
                    $npc_quest_list_container.append("<h2>Welcome to " + map_entry.npc.name + "'s shop!</h2>");
                    for(let j = 0; j < items.length; j++){
                        $buy_item_list_container.append(view_controller.generateItem(items[j],'buy',{index:j,shop_x:points[i].x,shop_y:points[i].y}));
                    }
                }
            }
        }else{
            $buy_item_list_container.hide();
        }

        let $sell_item_list_container = $('#sell_item_list_container');
        $sell_item_list_container.empty();
        if(util.isAround(game.character.x,game.character.y,"shop")){
            $sell_item_list_container.show();
            let items = util.getCondensedInventory();
            $sell_item_list_container.append("<h2>Your Sellable Items (click to sell, hover for details)</h2>");
            if(items.length === 0){
                $sell_item_list_container.append("<h3>(You don't have any items to sell)</h3>");
            }
            for(let i = 0; i < items.length; i++){
                if(items[i].type === ITEM_TYPES.CONSUMABLE || items[i].type === ITEM_TYPES.EQUIPMENT){
                    $sell_item_list_container.append(view_controller.generateItem(items[i],'sell', null));
                }
            }
        }else{
            $sell_item_list_container.hide();
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
        $cont.addClass('item_div');

        let $item_img = $('<img>');
        $item_img.attr('src', item.icon);
        $item_img.addClass('item_img');

        let $item_tooltip = $('<table></table>');
        $item_tooltip.addClass('stats_table');
        $item_tooltip.addClass('tooltip');

        if(mode ==='equipped'){
            if(item.slot === 'ring'){
                if(data.ring === 1){
                    $item_img.data('slot','ring1');
                    $item_img.data('tooltip_container','#item_tooltip_ring1');
                    $item_tooltip.attr('id', '#item_tooltip_ring1');
                }else{
                    $item_img.data('slot','ring2');
                    $item_img.data('tooltip_container','#item_tooltip_ring2');
                    $item_tooltip.attr('id', '#item_tooltip_ring2');
                }
            }else{
                $item_img.data('slot',item.slot);
                $item_img.data('tooltip_container','#item_tooltip_' + item.slot);
                $item_tooltip.attr('id', 'item_tooltip_' + item.slot);
            }
            $item_img.mouseover(user_interface.hoverDiv);
            $item_img.mouseleave(user_interface.hoverDiv);
            $item_img.click(user_interface.unequipItem);
        }

        if(mode ==='equipment'){
            $item_img.data('index',data.index);
            $item_img.data('tooltip_container','#item_tooltip_' + data.index);
            $item_tooltip.attr('id', 'item_tooltip_' + data.index);
            $item_img.mouseover(user_interface.hoverDiv);
            $item_img.mouseleave(user_interface.hoverDiv);
            $item_img.click(user_interface.equipItem);
        }

        if(mode ==='inventory'){
            $item_img.data('index',item.index);
            $item_img.data('tooltip_container','#inventory_item_tooltip_' + item.index);
            $item_tooltip.attr('id', 'inventory_item_tooltip_' + item.index);
            $item_img.mouseover(user_interface.hoverDiv);
            $item_img.mouseleave(user_interface.hoverDiv);

            if(item.type === ITEM_TYPES.EQUIPMENT){
                $item_img.click(user_interface.equipItem);
            }
            if(item.type === ITEM_TYPES.CONSUMABLE){
                $item_img.click(user_interface.useConsumable);
            }
        }

        if(mode ==='consumable'){
            $item_img.data('index',data.index);
            $item_img.data('tooltip_container','#item_tooltip_' + data.index);
            $item_tooltip.attr('id', 'item_tooltip_' + data.index);
            $item_img.mouseover(user_interface.hoverDiv);
            $item_img.mouseleave(user_interface.hoverDiv);
            $item_img.click(user_interface.useConsumable);
        }

        if(mode === 'buy'){
            $item_img.data('tooltip_container','#shop_tooltip_' + data.shop_x + '_' + data.shop_y + '_' + data.index);
            $item_tooltip.attr('id', 'shop_tooltip_'  + data.shop_x + '_' + data.shop_y + '_' + data.index);
            $item_img.data('index',data.index);
            $item_img.data('shop_x',data.shop_x);
            $item_img.data('shop_y',data.shop_y);
            $item_img.mouseover(user_interface.hoverDiv);
            $item_img.mouseleave(user_interface.hoverDiv);

            if(game.character.inventory.gold < item.value){
                $item_img.css('opacity','0.5');
            }else{
                $item_img.click(user_interface.buyItem);
            }
        }

        if(mode === 'sell'){
            $item_img.data('tooltip_container','#sell_item_tooltip_' + item.index);
            $item_tooltip.attr('id', 'sell_item_tooltip_' + item.index);
            $item_img.click(user_interface.sellItem);
            $item_img.mouseover(user_interface.hoverDiv);
            $item_img.mouseleave(user_interface.hoverDiv);
            $item_img.data('index',item.index);
        }

        if(mode === 'goal_item'){
            $item_img.data('tooltip_container','#item_tooltip_' + data.index);
            $item_tooltip.attr('id', 'item_tooltip_' + data.index);
            $item_img.mouseover(user_interface.hoverDiv);
            $item_img.mouseleave(user_interface.hoverDiv);
            $item_img.data('index',data.index);
        }



        $item_tooltip.append('<tr><th colspan="2">' + item.name + '</th></tr>');

        if(item.type === ITEM_TYPES.EQUIPMENT){
            $item_tooltip.append('<tr><td colspan="2">Level ' + item.level + ' ' + item.stats.rarity + '</td></tr>');
            if(item.stats.rarity === 'Common'){
                $item_img.css('background-color','#ffffff');
            }
            if(item.stats.rarity === 'Uncommon'){
                $item_img.css('background-color','#c3bcb4');
            }
            if(item.stats.rarity === 'Rare'){
                $item_img.css('background-color','#366f42');
            }
            if(item.stats.rarity === 'Epic'){
                $item_img.css('background-color','#5076a3');
            }
            if(item.stats.rarity === 'Legendary'){
                $item_img.css('background-color','#522f65');
            }
            if(item.stats.rarity === 'Mythic'){
                $item_img.css('background-color','#ceae33');
            }
        }
        if(    (mode === 'sell' && item.type === ITEM_TYPES.CONSUMABLE)
            || (mode === 'inventory' && item.type !== ITEM_TYPES.EQUIPMENT)){
            $item_tooltip.append('<tr><td>Quantity</td><td>' + item.num + '</td></tr>');
        }

        if(item.type === ITEM_TYPES.CONSUMABLE || item.type === ITEM_TYPES.EQUIPMENT){
            $item_tooltip.append('<tr><td>Value</td><td>' + item.value + '</td></tr>');
        }

        if(item.type === ITEM_TYPES.EQUIPMENT){
            if(item.stats.max_health > 0){
                $item_tooltip.append('<tr><td>Max Health</td><td>' + item.stats.max_health + '</td></tr>');
            }
            if(item.stats.health_regeneration > 0){
                $item_tooltip.append('<tr><td>Health Regeneration</td><td>' + item.stats.health_regeneration + '</td></tr>');
            }
            if(item.stats.max_mana > 0){
                $item_tooltip.append('<tr><td>Max Mana</td><td>' + item.stats.max_mana + '</td></tr>');
            }
            if(item.stats.mana_regeneration > 0){
                $item_tooltip.append('<tr><td>Mana Regeneration</td><td>' + item.stats.mana_regeneration + '</td></tr>');
            }
            if(item.stats.attack_power > 0){
                $item_tooltip.append('<tr><td>Attack Power</td><td>' + item.stats.attack_power + '</td></tr>');
            }
            if(item.stats.attack_lifesteal > 0){
                $item_tooltip.append('<tr><td>Attack Lifesteal</td><td>' + item.stats.attack_lifesteal + '</td></tr>');
            }
            if(item.stats.armor > 0){
                $item_tooltip.append('<tr><td>Armor</td><td>' + item.stats.armor + '</td></tr>');
            }
            if(item.stats.magic_power > 0){
                $item_tooltip.append('<tr><td>Magic Power</td><td>' + item.stats.magic_power + '</td></tr>');
            }
            if(item.stats.magic_lifesteal > 0){
                $item_tooltip.append('<tr><td>Magic Lifesteal</td><td>' + item.stats.magic_lifesteal + '</td></tr>');
            }
            if(item.stats.magic_resistance > 0){
                $item_tooltip.append('<tr><td>Magic Resistance</td><td>' + item.stats.magic_resistance + '</td></tr>');
            }
            if(item.stats.cooldown_reduction > 0){
                $item_tooltip.append('<tr><td>Cooldown Reduction</td><td>' + item.stats.cooldown_reduction + '</td></tr>');
            }
        }

        $item_tooltip.append('<tr><td>Description</td><td>' + item.description + '</td></tr>');

        $cont.append($item_img);
        $('#app').append($item_tooltip);
        return $cont;
    },

    generateQuest: function(quest_name, mode){
        if(quest_name == null){
            return;
        }
        let quest = quests.getQuest(quest_name);


        let $cont = $('<div></div>');
        $cont.addClass('container');
        $cont.addClass('item_container');

        let $title_cont = $('<table></table>');
        $title_cont.css('width', '99%');
        $title_cont.addClass('stats_table');

        let $buttons = $('<div></div>');
        if(mode === "quest_giver"){
            let $button = $('<button class="button" type="button">Accept Quest</button>');
            $button.css('float', 'right');
            $button.click(user_interface.acceptQuest);
            $button.data('quest_name',quest_name);
            $buttons.append($button);
        }
        if(mode === 'character'){
            if(quest.meetsRequirements()){
                let $button = $('<button class="button" type="button">Complete Quest</button>');
                $button.css('float', 'right');
                $button.click(user_interface.completeQuest);
                $button.data('quest_name',quest_name);
                $buttons.append($button);
            }

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


        let direction = quest.findDirection();
        if(direction != null && direction === '?'){
            $title_cont.append('<tr><td>Direction</td><td>' + direction + '</td></tr>');
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

        if(game.status === STATUS.COMBAT_ATTACK_SELECTED || game.status === STATUS.HOTBAR_ATTACK_SELECTED){
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
        $hotbar_tooltip.addClass('tooltip');
        $hotbar_tooltip.addClass('hotbar_tooltip');

        let $stats_table = $('<table></table>');
        $stats_table.addClass('stats_table');
        $stats_table.append('<tr><th colspan="2">' + attack.name + '</th></tr>');
        $stats_table.append('<tr><td>Mana Cost</td><td>' + attack.mana_cost + '</td></tr>');
        $stats_table.append('<tr><td>Cooldown</td><td>' + attack.cooldown + '</td></tr>');
        $stats_table.append('<tr><td>Range</td><td>' + attack.range + '</td></tr>');
        $stats_table.append('<tr><td>Description</td><td>' + attack.description + '</td></tr>');
        $hotbar_tooltip.append($stats_table);


        $cont.append($hotbar_img);
        $cont.append($bottom_left_text);
        $cont.append($bottom_right_text);
        $('#app').append($hotbar_tooltip);
        return $cont;
    },

    generateHotbarAssignIcon: function(attack_name,i){
        let $cont = $('<div></div>');
        $cont.addClass('hotbar_div');


        let $hotbar_img = $('<img>');

        if(attack_name === ""){
            $hotbar_img.attr('src', INTERFACE_ICONS.MENU_BUTTONS.CENTER);
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