window.onload = function(){
	generateWorld();
	var canvas = document.getElementById("world_canvas");

    canvas.addEventListener('mousedown', function(e){
        user_interface.showCanvasDetails(canvas, e);
    });
    
    for(var i = 1; i < 29; i++){
 	    console.log(util.getRandomInt(1));
    }
};
//console.log(util.rollDice('37d20+4'));
// for(var i = 1; i < 29; i++){
// 	console.log(util.generateTreasure(i,2));
// }

// for(var i = 1; i < 21; i++){
//  	util.generateEncounter('grassland',4,i);
//  	util.generateEncounter('urban',4,i);
// }