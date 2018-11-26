let user_interface = {
    selectAttack: function(event){
        let $target = $(event.target);
        game.selected_attack = $target.data('attack_name');
        game.status = STATUS.COMBAT_SPELL_SELECTED;
        map.render();
        view_controller.render();
    },

    keybindSelectAttack: function(attack_name){
        game.selected_attack = attack_name;
        game.status = STATUS.COMBAT_SPELL_SELECTED;
        map.render();
        view_controller.render();
    },

    buyUpgrade: function(event){
        //Changes character information to reflect the purchased upgrade and deducts a skill point

        map.render();
        view_controller.render();
    },

    zoomIn: function(){
        if(game.settings.zoom_factor > 3){
            game.settings.zoom_factor -= 2;
        }
        game.output.push("Zoom increased to " + game.settings.zoom_factor);
        map.render();
        view_controller.render();
    },

    zoomOut: function(){
        if(game.settings.zoom_factor < ZOOM_MAX){
            game.settings.zoom_factor += 2;
        }
        game.output.push("Zoom decreased to " + game.settings.zoom_factor);
        map.render();
        view_controller.render();
    },

    cancelSpell: function(){
        //Clears all highlights and removes the onclick methods from selectAttack
        game.selected_attack = null;
        game.status = STATUS.COMBAT;
        map.render();
        view_controller.render();
    },

    moveLeft: function(){
        if(util.isWalkable(game.character.x - 1, game.character.y)){
            game.character.x -= 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    moveUpLeft: function(){
        if(util.isWalkable(game.character.x - 1, game.character.y + 1)){
            game.character.x -= 1;
            game.character.y += 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    moveUp: function(){
        if(util.isWalkable(game.character.x, game.character.y + 1)){
            game.character.y += 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    moveUpRight: function(){
        if(util.isWalkable(game.character.x + 1, game.character.y + 1)){
            game.character.x += 1;
            game.character.y += 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    moveRight: function(){
        if(util.isWalkable(game.character.x + 1, game.character.y)){
            game.character.x += 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    moveDownRight: function(){
        if(util.isWalkable(game.character.x + 1, game.character.y - 1)){
            game.character.x += 1;
            game.character.y -= 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    moveDown: function(){
        if(util.isWalkable(game.character.x, game.character.y - 1)){
            game.character.y -= 1;
        }
        game_logic.tick(game.character.x, game.character.y);
        map.render();
        view_controller.render();
    },

    moveDownLeft: function(){
        if(util.isWalkable(game.character.x - 1, game.character.y - 1)){
            game.character.x -= 1;
            game.character.y -= 1;
        }
        game_logic.tick(game.character.x, game.character.y);
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
        map.render();
        view_controller.render();
    },

    inspect: function(event){
        let x = $(event.target).data('x');
        let y = $(event.target).data('y');
        game.output.push("");
        game.output.push("Inspecting " + x + "," + y);
        if(map.get(x,y).npc != null){
            game.output.push("NPC is " + map.get(x,y).npc.type);
            if(map.get(x,y).npc.type === "shop"){
                for(let i = 0; i < map.get(x,y).npc.items.length; i++){
                    game.output.push(map.get(x,y).npc.items[i].name + " - " + map.get(x,y).npc.items[i].value);
                }
            }
            if(map.get(x,y).npc.type === "quest_giver"){
                let quest = util.getQuest(map.get(x,y).npc.quest);
                game.output.push("Quest name: " + quest.name);
                game.output.push("Quest description: " + quest.description);
                game.output.push("Quest goal item: " + quest.goal_item);
            }
            if(map.get(x,y).npc.type === "monster"){
                game.output.push("Monster Name: " + map.get(x,y).npc.name);
                game.output.push("Health: " + map.get(x,y).npc.current_health + "/" + map.get(x,y).npc.max_health);
                game.output.push("Quest Goal Item: " + map.get(x,y).npc.goal_item);
            }
        }
        map.render();
        view_controller.render();
    },

    equipItem: function(event){
        let $target = $(event.target);
        let item = game.character.inventory.equipment[$target.data('index')];
        game.character.inventory.equipment.splice($target.data('index'),1);
        if($target.data('ring') === 0){
            if(game.character.equipped_items[item.slot] != null){
                game.character.inventory.equipment.push(game.character.equipped_items[item.slot]);
                game.character.equipped_items[item.slot] = null;
            }
            game.character.equipped_items[item.slot] = item;
        }
        if($target.data('ring') === 1){
            if(game.character.equipped_items.ring1 != null){
                game.character.inventory.equipment.push(game.character.equipped_items.ring1);
                game.character.equipped_items.ring1 = null;
            }
            game.character.equipped_items.ring1 = item;
        }
        if($target.data('ring') === 2){
            if(game.character.equipped_items.ring2 != null){
                game.character.inventory.equipment.push(game.character.equipped_items.ring2);
                game.character.equipped_items.ring2 = null;
            }
            game.character.equipped_items.ring2 = item;
        }

        map.render();
        view_controller.render();
    },

    unequipItem: function(event){
        let $target = $(event.target);
        game.character.inventory.equipment.push(game.character.equipped_items[$target.data('slot')]);
        game.character.equipped_items[$target.data('slot')] = null;
        map.render();
        view_controller.render();
    },

    acceptQuest: function(event){
        let $target = $(event.target);

        game.character.quests.push($target.data('quest_name'));

        map.render();
        view_controller.render();
    },

    abandonQuest: function(event){
        //removes quest and relevant item from character.
        map.render();
        view_controller.render();
    },

    completeQuest: function(event){
        //gives loot to player and moves quest to character.completed_quests
        map.render();
        view_controller.render();
    },

    buyItem: function(event){

        map.render();
        view_controller.render();
    },

    sellItem: function(event){

        map.render();
        view_controller.render();
    },

    teleport: function(){
        game.character.x = game.character.x + Number($('#teleport_x').val());
        game.character.y = game.character.y + Number($('#teleport_y').val());
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
            if(event.which === 49){
                user_interface.keybindSelectAttack('Basic Attack');
            }
            setTimeout(function(){ game.key_lock = false }, 1);
        }
    },

    toggleNPCShopList: function(event){
        let $cont = $('#npc_shop_list_container');

        if($cont.is(':hidden')){
            $cont.show();
            $(event.target).text("hide");
        }else{
            $cont.hide();
            $(event.target).text("show");
        }
    },

    toggleNPCQuestList: function(event){
        let $cont = $('#npc_quest_list_container');

        if($cont.is(':hidden')){
            $cont.show();
            $(event.target).text("hide");
        }else{
            $cont.hide();
            $(event.target).text("show");
        }
    },

    toggleEquippedItems: function(event){
        let $cont = $('#equipped_items_container');

        if($cont.is(':hidden')){
            $cont.show();
            $(event.target).text("hide");
        }else{
            $cont.hide();
            $(event.target).text("show");
        }
    },

    toggleQuestList: function(event){
        let $cont = $('#quest_list_container');

        if($cont.is(':hidden')){
            $cont.show();
            $(event.target).text("hide");
        }else{
            $cont.hide();
            $(event.target).text("show");
        }
    },

    toggleCompletedQuestList: function(event){
        let $cont = $('#completed_quest_list_container');

        if($cont.is(':hidden')){
            $cont.show();
            $(event.target).text("hide");
        }else{
            $cont.hide();
            $(event.target).text("show");
        }
    },

    toggleInventory: function(event){
        let $cont = $('#inventory_container');

        if($cont.is(':hidden')){
            $cont.show();
            $(event.target).text("hide");
        }else{
            $cont.hide();
            $(event.target).text("show");
        }
    },

    toggleUpgrades: function(event){
        let $cont = $('#upgrades_container');

        if($cont.is(':hidden')){
            $cont.show();
            $(event.target).text("hide");
        }else{
            $cont.hide();
            $(event.target).text("show");
        }
    },

    toggleAttackList: function(event){
        let $cont = $('#attack_list_container');

        if($cont.is(':hidden')){
            $cont.show();
            $(event.target).text("hide");
        }else{
            $cont.hide();
            $(event.target).text("show");
        }
    },

    attackMonster: function(event){
        let $target = $(event.target);
        character_attack.attack($target.data('x'),$target.data('y'),game.selected_attack);
        game.status = STATUS.COMBAT;
        game.selected_attack = null;
        map.render();
        view_controller.render();
    },
};