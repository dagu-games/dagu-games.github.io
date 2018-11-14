let view_controller = {
    render: function(){
        view_controller.updateCharacter();
        view_controller.updateSaveList();
        view_controller.updateOutput();
    },

    updateCharacter: function(){
        $('#character_location').innerText = "(" + game.character.x + "," + game.character.y + ")";
        $('#character_level').innerText = game.character.level;
        $('#character_experience').innerText = game.character.experience;
        $('#character_experience_next_level').innerText = util.getExperienceNeededForLevel(game.character.level);
        $('#character_current_health').innerText = game.character.current_health;
        $('#character_max_health').innerText = game.character.max_health;
        $('#character_current_mana').innerText = game.character.current_mana;
        $('#character_max_mana').innerText = game.character.max_mana;
        $('#character_armor').innerText = game.character.armor;
        $('#character_magic_resistance').innerText = game.character.magic_resistance;
        $('#character_cooldown_reduction').innerText = game.character.cooldown_reduction;
        $('#character_attack_power').innerText = game.character.attack_power;
        $('#character_attack_lifesteal').innerText = game.character.attack_lifesteal;
        $('#character_magic_power').innerText = game.character.magic_power;
        $('#character_magic_lifesteal').innerText = game.character.magic_lifesteal;

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

        $('#character_helmet_container').append(view_controller.generateEquippedItem('helmet'));
        $('#character_shoulders_container').append(view_controller.generateEquippedItem('shoulders'));
        $('#character_gauntlets_container').append(view_controller.generateEquippedItem('gauntlets'));
        $('#character_chest_container').append(view_controller.generateEquippedItem('chest'));
        $('#character_belt_container').append(view_controller.generateEquippedItem('belt'));
        $('#character_pants_container').append(view_controller.generateEquippedItem('pants'));
        $('#character_boots_container').append(view_controller.generateEquippedItem('boots'));
        $('#character_main_hand_container').append(view_controller.generateEquippedItem('main_hand'));
        $('#character_off_hand_container').append(view_controller.generateEquippedItem('off_hand'));
        $('#character_necklace_container').append(view_controller.generateEquippedItem('necklace'));
        $('#character_ring1_container').append(view_controller.generateEquippedItem('ring1'));
        $('#character_ring2_container').append(view_controller.generateEquippedItem('ring2'));

    },

    updateSaveList: function(){

    },
    updateOutput: function(){

    },
    generateInventoryItem: function(index){

    },
    generateEquippedItem: function(slot){
        let item = game.character.equipped_items[slot];
        if(item === null){
            return null;
        }else{
            return view_controller.generateItem(item, true);
        }
    },
    generateItem: function(item, equipped){
        let cont = $('<div></div>');
        cont.addClass('container');
        cont.addClass('item_container');

        let title_cont = $('<div></div>');
        title_cont.css('width', '49%');
        title_cont.css('float', 'left');
        title_cont.append('<h3>' + item.name + '</h3>');
        title_cont.append('Value: ' + item.value + '<br>');
        title_cont.append('Description: ' + item.description + '<br>');

        let stats_cont = $('<div></div>');
        stats_cont.css('width', '49%');
        stats_cont.css('float', 'right');

        if(equipped){
            let button = $('<button type="button">Unequip</button>');
            button.css('float', 'right');
            button.click(user_interface.unequipItem());
            stats_cont.append(button);
        }else{
            let button = $('<button type="button">Equip</button>');
            button.css('float', 'right');
            button.click(user_interface.equipItem());
            stats_cont.append(button);
        }

        stats_cont.append('Max health: ' + item.stats.max_health + '<br>');
        stats_cont.append('Armor: ' + item.stats.armor + '<br>');
        stats_cont.append('Magic Resistance: ' + item.stats.magic_resistance + '<br>');
        stats_cont.append('Attack Power: ' + item.stats.attack_power + '<br>');
        stats_cont.append('Attack Lifesteal: ' + item.stats.attack_lifesteal + '<br>');
        stats_cont.append('Magic Power: ' + item.stats.magic_power + '<br>');
        stats_cont.append('Magic Lifesteal: ' + item.stats.magic_lifesteal + '<br>');
        stats_cont.append('Cooldown Reduction: ' + item.stats.cooldown_reduction + '<br>');
        stats_cont.append('Mana Regeneration: ' + item.stats.mana_regeneration + '<br>');
        stats_cont.append('Max Mana: ' + item.stats.max_mana + '<br>');

        cont.append(title_cont);
        cont.append(stats_cont);
        return cont;
    },
    generateQuestItem: function(index){

    },
    generateUpgrade: function(name){

    },
};