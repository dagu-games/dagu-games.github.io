localStorage.removeItem(STORAGE_STRING);

util.loadGame();

$(document).ready(map.render);
$(document).ready(view_controller.render);

$(window).resize(map.render);

$(document).keydown(user_interface.handleKeyDown);