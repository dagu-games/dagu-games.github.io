localStorage.removeItem(STORAGE_STRING);

util.loadGame();
user_interface.printCredits();
//map.render();
view_controller.render();

$(document).ready(map.render);

$(window).resize(map.render);

$(document).keydown(user_interface.handleKeyDown);