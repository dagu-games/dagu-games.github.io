let view_controller = {
    render: function(){
        view_controller.updateCharacter();
        view_controller.updateContextMenu();
        view_controller.updateOutput();
    },

    updateCharacter: function(){
        $('#character_location').text("(" + game.character.x + "," + game.character.y + ")");
        $('#character_level').text(game.character.level);
        $('#character_experience').text(game.character.experience);
        $('#character_experience_next_level').text(util.getExperienceNeededForLevel(game.character.level));
        $('#character_current_health').text(game.character.current_health);
        $('#character_max_health').text(game.character.max_health);
        $('#character_current_mana').text(game.character.current_mana);
        $('#character_max_mana').text(game.character.max_mana);
        $('#character_armor').text(game.character.armor);
        $('#character_magic_resistance').text(game.character.magic_resistance);
        $('#character_cooldown_reduction').text(game.character.cooldown_reduction);
        $('#character_attack_power').text(game.character.attack_power);
        $('#character_attack_lifesteal').text(game.character.attack_lifesteal);
        $('#character_magic_power').text(game.character.magic_power);
        $('#character_magic_lifesteal').text(game.character.magic_lifesteal);

        $('#character_helmet_container').empty();
        $('#character_shoulders_container').empty();
        $('#character_gauntlets_container').empty();
        $('#character_chest_container').empty();
        $('#character_belt_container').empty();
        $('#character_pants_container').empty();
        $('#character_boots_container').empty();
        $('#character_main_hand_container').empty();
        $('#character_off_hand_container').empty();
        $('#character_necklace_container').empty();
        $('#character_ring1_container').empty();
        $('#character_ring2_container').empty();

        $('#character_helmet_container').html(view_controller.generateItem(game.character.equipped_items.helmet,'equipped',null));
        $('#character_shoulders_container').append(view_controller.generateItem(game.character.equipped_items.shoulders,'equipped',null));
        $('#character_gauntlets_container').append(view_controller.generateItem(game.character.equipped_items.gauntlets,'equipped',null));
        $('#character_chest_container').append(view_controller.generateItem(game.character.equipped_items.chest,'equipped',null));
        $('#character_belt_container').append(view_controller.generateItem(game.character.equipped_items.belt,'equipped',null));
        $('#character_pants_container').append(view_controller.generateItem(game.character.equipped_items.pants,'equipped',null));
        $('#character_boots_container').append(view_controller.generateItem(game.character.equipped_items.boots,'equipped',null));
        $('#character_main_hand_container').append(view_controller.generateItem(game.character.equipped_items.main_hand,'equipped',null));
        $('#character_off_hand_container').append(view_controller.generateItem(game.character.equipped_items.off_hand,'equipped',null));
        $('#character_necklace_container').append(view_controller.generateItem(game.character.equipped_items.necklace,'equipped',null));
        $('#character_ring1_container').append(view_controller.generateItem(game.character.equipped_items.ring1,'equipped',null));
        $('#character_ring2_container').append(view_controller.generateItem(game.character.equipped_items.ring2,'equipped',null));

        let $inventory = $('#inventory_container');
        $inventory.empty();
        for(let i = 0; i < game.character.inventory.equipment.length; i++){
            $inventory.append(view_controller.generateItem(game.character.inventory.equipment[i],'inventory',{index:i}));
        }

        let $quest_list = $('#quest_list_container');
        $quest_list.empty();
        for(let i = 0; i < game.character.quests.length; i++){
            $quest_list.append(view_controller.generateQuest(game.character.quests[i]));
        }

        let $upgrades_list = $('#upgrades_container');
        $upgrades_list.empty();
        for(let i = 0; i < upgrades.length; i++){
            $upgrades_list.append(view_controller.generateUpgrade(upgrades[i]));
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
            $save.data('index',$save.index);
            let date = new Date($save.time);
            $save.innerText = $save.index + " - " + date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
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
        if(game.settings === STATUS.COMBAT_SPELL_SELECTED){
            $('#cancel_spell_button').hide();
        }else{
            $('#cancel_spell_button').show();
        }

        if(util.isAround(game.character.x,game.character.y,"shop")){
            let points = util.getAround(game.character.x,game.character.y);
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
        $title_cont.append('Value: ' + item.value + '<br>');
        $title_cont.append('Description: ' + item.description + '<br>');

        let $stats_cont = $('<div></div>');
        $stats_cont.css('width', '49%');
        $stats_cont.css('float', 'right');

        if(mode ==='equipped'){
            let $button = $('<button type="button">Unequip</button>');
            $button.css('float', 'right');
            $button.click(user_interface.unequipItem());
            $button.data('index',item.slot);
            $stats_cont.append($button);
        }
        if(mode === 'inventory'){
            if(item.slot === 'ring'){
                let $button = $('<button type="button">Equip in Ring 2</button>');
                $button.css('float', 'right');
                $button.click(user_interface.equipItem());
                $button.data('ring',2);
                $button.data('index',data.index);
                $stats_cont.append($button);

                $button = $('<button type="button">Equip in Ring 1</button>');
                $button.css('float', 'right');
                $button.click(user_interface.equipItem());
                $button.data('ring',1);
                $button.data('index',data.index);
                $stats_cont.append($button);
            }else{
                let $button = $('<button type="button">Equip</button>');
                $button.css('float', 'right');
                $button.data('index',data.index);
                $button.click(user_interface.equipItem());
                $stats_cont.append($button);
            }
            if(util.isAround(game.character.x,game.character.y,'shop')){
                let $button = $('<button type="button">Sell Item</button>');
                $button.css('float', 'right');
                $button.data('index',data.index);
                $button.click(user_interface.sellItem());
                $stats_cont.append($button);
            }
        }
        if(mode ==='equipped'){
            let $button = $('<button type="button">Buy Item</button>');
            $button.css('float', 'right');
            $button.click(user_interface.buyItem());
            $button.data('index',data.index);
            $button.data('shop_x',data.shop_x);
            $button.data('shop_y',data.shop_y);
            $stats_cont.append($button);
        }

        $stats_cont.append('Max health: ' + item.stats.max_health + '<br>');
        $stats_cont.append('Armor: ' + item.stats.armor + '<br>');
        $stats_cont.append('Magic Resistance: ' + item.stats.magic_resistance + '<br>');
        $stats_cont.append('Attack Power: ' + item.stats.attack_power + '<br>');
        $stats_cont.append('Attack Lifesteal: ' + item.stats.attack_lifesteal + '<br>');
        $stats_cont.append('Magic Power: ' + item.stats.magic_power + '<br>');
        $stats_cont.append('Magic Lifesteal: ' + item.stats.magic_lifesteal + '<br>');
        $stats_cont.append('Cooldown Reduction: ' + item.stats.cooldown_reduction + '<br>');
        $stats_cont.append('Mana Regeneration: ' + item.stats.mana_regeneration + '<br>');
        $stats_cont.append('Max Mana: ' + item.stats.max_mana + '<br>');

        $cont.append($title_cont);
        $cont.append($stats_cont);
        return $cont;
    },

    generateQuest: function(index){

    },

    generateUpgrade: function(name){

    },
};