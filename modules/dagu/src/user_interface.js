let user_interface = {
    selectAttack: function(event){
        let $target = $(event.target);
        game.selected_attack = $target.data('attack_name');
        game.status = STATUS.COMBAT_ATTACK_SELECTED;
        map.render();
        view_controller.render();
    },

    selectHotbarAttack: function(event){
        let $target = $(event.target);
        game.selected_attack = $target.data('attack_name');
        game.status = STATUS.HOTBAR_ATTACK_SELECTED;
        map.render();
        view_controller.render();
    },

    assignHotbarAttack: function(event){
        let $target = $(event.target);
        game.status = STATUS.COMBAT;
        game.character.hotbar[$target.data('index')] = game.selected_attack;
        game.selected_attack = null;
        map.render();
        view_controller.render();
    },

    keybindSelectAttack: function(attack_name){
        if(game.status === STATUS.COMBAT_ATTACK_SELECTED){
            user_interface.cancelAttack();
            return;
        }
        if(character_attack.isOffCooldown(attack_name) && character_attack.hasManaFor(attack_name)){
            game.selected_attack = attack_name;
            game.status = STATUS.COMBAT_ATTACK_SELECTED;
            map.render();
            view_controller.render();
        }
    },

    cancelAttack: function(){
        game.selected_attack = null;
        game.status = STATUS.COMBAT;
        map.render();
        view_controller.render();
    },

    buyUpgrade: function(event){
        let $target = $(event.target);

        let upgrade = upgrades[$target.data('upgrade_index')];

        game.character.unspent_skill_points -= upgrade.skill_point_cost;
        upgrade.effect();
        game.character.upgrades.push($target.data('upgrade_index'));

        map.render();
        view_controller.render();
    },

    refundUpgrade: function(event){
        let $target = $(event.target);

        let upgrade = upgrades[$target.data('upgrade_index')];

        game.character.unspent_skill_points += upgrade.skill_point_cost;
        upgrade.refund();
        for(let i = 0; i < game.character.upgrades.length; i++){
            if(game.character.upgrades[i] === $target.data('upgrade_index')){
                game.character.upgrades.splice(i,1);
            }
        }

        map.render();
        view_controller.render();
    },

    zoomIn: function(){
        if(game.settings.zoom_factor > 3){
            game.settings.zoom_factor -= 2;
        }
        game.output.push("Zoom increased to " + game.settings.zoom_factor);
        map.render();
    },

    zoomOut: function(){
        if(game.settings.zoom_factor < ZOOM_MAX){
            game.settings.zoom_factor += 2;
        }
        game.output.push("Zoom decreased to " + game.settings.zoom_factor);
        map.render();
    },

    moveLeft: function(){
        if(util.isWalkable(game.character.x - 1, game.character.y)){
            game.character.x -= 1;
            game_logic.tick();
        }
        map.render();
        view_controller.render();
    },

    moveUp: function(){
        if(util.isWalkable(game.character.x, game.character.y + 1)){
            game.character.y += 1;
            game_logic.tick();
        }
        map.render();
        view_controller.render();
    },

    moveRight: function(){
        if(util.isWalkable(game.character.x + 1, game.character.y)){
            game.character.x += 1;
            game_logic.tick();
        }
        map.render();
        view_controller.render();
    },

    moveDown: function(){
        if(util.isWalkable(game.character.x, game.character.y - 1)){
            game.character.y -= 1;
            game_logic.tick();
        }
        map.render();
        view_controller.render();
    },

    loadGame: function(){
        let i = document.getElementById("load_game_select").value;
        util.loadGame(i);
        map.render();
        view_controller.render();
    },

    saveGame: function(){
        util.saveGame();
        game.output.push("");
        game.output.push("Game Saved!");
        map.render();
        view_controller.render();
    },

    printCredits: function(){
        game.output.push(CREDITS_STRING);
        game.output.push("Special Thanks and Donators:");
        DONATORS.forEach(function(donator){
            game.output.push(donator);
        });
        game.output.push("");
        map.render();
        view_controller.render();
    },

    inspect: function(event){
        let x = $(event.target).data('x');
        let y = $(event.target).data('y');
        game.output.push("");
        game.output.push("Inspecting " + x + "," + y);
        if(map.get(x,y).npc != null){
            game.output.push("Name: " + map.get(x,y).npc.name);
            game.output.push(map.get(x,y).npc.type);
            game.output.push("Description: " + map.get(x,y).npc.description);
            if(map.get(x,y).npc.type === "shop"){
                for(let i = 0; i < map.get(x,y).npc.items.length; i++){
                    game.output.push(map.get(x,y).npc.items[i].name + " - " + map.get(x,y).npc.items[i].value);
                }
            }
            if(map.get(x,y).npc.type === "quest_giver"){
                let quest = quests.getQuest(map.get(x,y).npc.quest);
                game.output.push("Name: " + map.get(x,y).npc.name);
                game.output.push("Quest name: " + quest.name);
                game.output.push("Quest description: " + quest.description);
            }
            if(map.get(x,y).npc.type === "monster"){
                game.output.push("Health: " + map.get(x,y).npc.current_health + "/" + map.get(x,y).npc.max_health);
                game.output.push("Loot:");
                for(let i = 0; i < map.get(x,y).npc.loot.length; i++){
                    game.output.push(map.get(x,y).npc.loot[i].type + " - " + map.get(x,y).npc.loot[i].name);
                }
            }
        }
        map.render();
        view_controller.render();
    },

    equipItem: function(event){
        let $target = $(event.target);
        let item = game.character.inventory.items[$target.data('index')];
        game.character.inventory.items.splice($target.data('index'),1);
        if(item.slot === 'ring'){
            if(game.character.equipped_items["ring1"] != null){
                if(game.character.equipped_items["ring2"] != null){
                    game.character.inventory.items.push(game.character.equipped_items["ring2"]);
                }
                game.character.equipped_items["ring2"] = game.character.equipped_items["ring1"];
            }
            game.character.equipped_items["ring1"] = item;
        }else{
            game.character.inventory.items.push(game.character.equipped_items[item.slot]);
            game.character.equipped_items[item.slot] = item;
        }

        map.render();
        view_controller.render();
    },

    unequipItem: function(event){
        let $target = $(event.target);
        game.character.inventory.items.push(game.character.equipped_items[$target.data('slot')]);
        game.character.equipped_items[$target.data('slot')] = null;
        map.render();
        view_controller.render();
    },

    acceptQuest: function(event){
        let $target = $(event.target);
        let quest_name = $target.data('quest_name');
        let quest = quests.getQuest(quest_name);
        game.character.quests.push(quest_name);
        quest.onAccept();

        map.render();
        view_controller.render();
    },

    abandonQuest: function(event){
        let $target = $(event.target);
        let quest = quests.getQuest($target.data('quest_name'));
        quest.onAbandon();
        for(let i = 0; i < game.character.quests.length; i++){
            if(game.character.quests[i] === quest.name){
                game.character.quests.splice(i,1);
            }
        }
        map.render();
        view_controller.render();
    },

    completeQuest: function(event){
        let $target = $(event.target);
        let quest = quests.getQuest($target.data('quest_name'));
        quest.onComplete();
        for(let i = 0; i < game.character.quests.length; i++){
            if(game.character.quests[i] === quest.name){
                game.character.quests.splice(i,1);
            }
        }
        game.character.completed_quests.push(quest.name);

        map.render();
        view_controller.render();
    },

    buyItem: function(event){
        let $target = $(event.target);

        let item = map.get($target.data('shop_x'),$target.data('shop_y')).npc.items[$target.data('index')];
        map.get($target.data('shop_x'),$target.data('shop_y')).npc.items.splice($target.data('index'),1);
        game.character.inventory.gold -= item.value;
        game.character.inventory.items.push(item);

        map.render();
        view_controller.render();
    },

    sellItem: function(event){
        let $target = $(event.target);
        let item = game.character.inventory.items[$target.data('index')];
        game.character.inventory.items.splice($target.data('index'),1);
        game.character.inventory.gold += item.value;

        let points_around = util.getAround(game.character.x,game.character.y);

        for(let i = 0; i < points_around.length; i++){
            if(map.get(points_around[i].x,points_around[i].y).npc != null && map.get(points_around[i].x,points_around[i].y).npc.type === 'shop'){
                map.get(points_around[i].x,points_around[i].y).npc.items.push(item);
            }
        }
        map.render();
        view_controller.render();
    },

    teleport: function(){
        game.character.x = game.character.x + Number($('#teleport_x').val());
        game.character.y = game.character.y + Number($('#teleport_y').val());
        map.render();
        view_controller.render();
    },

    setHome: function(){
        game.character.home_x = game.character.x;
        game.character.home_y = game.character.y;
        map.render();
        view_controller.render();
    },

    goHome: function(){
        game.character.x = game.character.home_x;
        game.character.y = game.character.home_y;
        map.render();
        view_controller.render();
    },

    handleKeyDown: function(event){
        //console.log(event.which);
        if(game.key_lock == null || game.key_lock===false){
            game.key_lock = true;
            if(event.which === KEY_CODES.W){
                user_interface.moveUp();
            }
            if(event.which === KEY_CODES.A){
                user_interface.moveLeft();
            }
            if(event.which === KEY_CODES.S){
                user_interface.moveDown();
            }
            if(event.which === KEY_CODES.D){
                user_interface.moveRight();
            }
            if(event.which === KEY_CODES["1"] && game.character.hotbar[1] !== ""){
                user_interface.keybindSelectAttack(game.character.hotbar[1]);
            }
            if(event.which === KEY_CODES["2"] && game.character.hotbar[2] !== ""){
                user_interface.keybindSelectAttack(game.character.hotbar[2]);
            }
            if(event.which === KEY_CODES["3"] && game.character.hotbar[3] !== ""){
                user_interface.keybindSelectAttack(game.character.hotbar[3]);
            }
            if(event.which === KEY_CODES["4"] && game.character.hotbar[4] !== ""){
                user_interface.keybindSelectAttack(game.character.hotbar[4]);
            }
            if(event.which === KEY_CODES["5"] && game.character.hotbar[5] !== ""){
                user_interface.keybindSelectAttack(game.character.hotbar[5]);
            }
            if(event.which === KEY_CODES["6"] && game.character.hotbar[6] !== ""){
                user_interface.keybindSelectAttack(game.character.hotbar[6]);
            }
            if(event.which === KEY_CODES["7"] && game.character.hotbar[7] !== ""){
                user_interface.keybindSelectAttack(game.character.hotbar[7]);
            }
            if(event.which === KEY_CODES["8"] && game.character.hotbar[8] !== ""){
                user_interface.keybindSelectAttack(game.character.hotbar[8]);
            }
            if(event.which === KEY_CODES["9"] && game.character.hotbar[9] !== ""){
                user_interface.keybindSelectAttack(game.character.hotbar[9]);
            }
            if(event.which === KEY_CODES["0"] && game.character.hotbar[0] !== ""){
                user_interface.keybindSelectAttack(game.character.hotbar[0]);
            }
            setTimeout(function(){ game.key_lock = false }, 1);
        }
    },

    attackMonster: function(event){
        let $target = $(event.target);
        character_attack.attack($target.data('x'),$target.data('y'),game.selected_attack);
        game.status = STATUS.COMBAT;
        game.selected_attack = null;
        game_logic.tick();
        map.render();
        view_controller.render();
    },

    openLeftTab: function(event, tab_name, tablink_name){
        $('.tabcontent_left').hide();
        $(tab_name).show();
        $('.tablink_left').removeClass('selected_tab');
        $(tablink_name).addClass('selected_tab');
    },

    openRightTab: function(event, tab_name, tablink_name){
        $('.tabcontent_right').hide();
        $(tab_name).show();
        $('.tablink_right').removeClass('selected_tab');
        $(tablink_name).addClass('selected_tab');
    },

    hoverDiv: function(event){
        let target = $(event.target);
        let tooltip_container = target.data('tooltip_container');
        tooltip_container = $(tooltip_container);
        tooltip_container.css('left',target.offset().left);

        if(target.offset().top < ($(window).height() / 2.0)){
            tooltip_container.css('bottom','auto');
            tooltip_container.css('top','calc(' + target.offset().top + 'px + ' + target.height() + 'px)');
        }else{
            tooltip_container.css('top','auto');
            tooltip_container.css('bottom','calc(100vh - ' + target.offset().top + 'px)');
        }
        tooltip_container.toggle();
        return false;
    },

    useConsumable: function(event){
        let $target = $(event.target);
        let consumable_name = game.character.inventory.items[$target.data('index')].name;
        game.character.inventory.items.splice($target.data('index'),1);
        consumables.getConsumable(consumable_name).effect();
        map.render();
        view_controller.render();
    },
};