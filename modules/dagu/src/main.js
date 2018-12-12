localStorage.removeItem(STORAGE_STRING);

util.loadGame();

$(document).ready(map.render);
$(document).ready(view_controller.render);

$(window).resize(map.render);

$(document).keydown(user_interface.handleKeyDown);

user_interface.openRightTab(null, '#stats_tab', '#stats_tablink');
user_interface.openLeftTab(null, '#attack_list_tab', '#attack_list_tablink');