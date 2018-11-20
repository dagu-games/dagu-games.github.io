let user_interface = {
    selectSpell: function(event){
        let $target = $(event.target);
        game.selected_spell = $target.data('attack_name');
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
        //Clears all highlights and removes the onclick methods from selectSpell

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

        game.output.push("Terrain is " + map.get(x,y).type);
        if(map.get(x,y).npc != null){
            game.output.push("NPC is " + map.get(x,y).npc.type);
            if(map.get(x,y).npc.type === "shop"){
                for(let i = 0; i < map.get(x,y).npc.items.length; i++){
                    game.output.push(map.get(x,y).npc.items[i].name + " - " + map.get(x,y).npc.items[i].value);
                }
            }
            if(map.get(x,y).npc.type === "quest_giver"){
                game.output.push("Quest name: " + map.get(x,y).npc.quest.name);
                game.output.push("Quest description: " + map.get(x,y).npc.quest.description);
                game.output.push("Quest goal item: " + map.get(x,y).npc.quest.goal_item);
            }
            if(map.get(x,y).npc.type === "monster"){
                game.output.push("Monster Name: " + map.get(x,y).npc.name);
                game.output.push("Health: " + map.get(x,y).npc.current_health + "/" + map.get(x,y).npc.max_health);
            }
        }
        map.render();
        view_controller.render();
    },

    equipItem: function(event){
        //check for ring data value to know what slot to put the ring into 1 or 2
        map.render();
        view_controller.render();
    },

    unequipItem: function(event){

        map.render();
        view_controller.render();
    },

    acceptQuest: function(event){

        map.render();
        view_controller.render();
    },

    abandonQuest: function(event){

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
        game.character.x = Number($('#teleport_x').val());
        game.character.y = Number($('#teleport_y').val());
        map.render();
        view_controller.render();
    },

    castSpell: function(event){

    },

    handleKeyDown: function(event){
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

            setTimeout(function(){ game.key_lock = false }, 100);
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

    attackMonster: function(event){
        let $target = $(event.target);
        game.status = STATUS.COMBAT;
        character_attack.attack($target.data('x'),$target.data('y'),game.selected_spell);
        game.selected_spell = null;
        map.render();
        view_controller.render();
    },
};