localStorage.removeItem(STORAGE_STRING);

util.loadGame();

$(document).ready(map.render);
$(document).ready(view_controller.render);

$(window).resize(util.UIRefresh);

$(document).keydown(user_interface.handleKeyDown);

user_interface.openTab(null, '#stats_tab', '#stats_tablink');
user_interface.toggleTab(null, '#stats_tab', '#stats_tablink');

$('#zoom_in_img').attr('src',ICONS.MENU_BUTTONS.ZOOM_IN);
$('#zoom_out_img').attr('src',ICONS.MENU_BUTTONS.ZOOM_OUT);


let $tutorial = $('#tutorial_content');

$tutorial.append('Welcome to Dagu!<br><br>');
$tutorial.append('You and your companion were traveling along one day when an evil wizard appeared before you. He declared his evil intentions and proclaimed that your companion\'s mythical magical amulet was the key to his plan. In a desperate attempt to save the world, your companion cast a spell of unknown power. The power of the amulet amplified the magic a thousand fold.<br><br>');
$tutorial.append('The world shattered. Everything went white.<br><br>');
$tutorial.append('You wake up days later with no equipment or belongings. Your surroundings are unfamiliar. There is no sign of your companion or the evil wizard anywhere. One thing is certain, You need to find your companion and ensure that amulet doesn\'t fall into that wizard\'s hands. Your best bet is to find the nearest town and get your bearings straight.<br><br>');
$tutorial.append('Move with the arrow keys in the bottom left, or with \'W\' \'A\' \'S\' \'D\'<br><br>');
$tutorial.append('Attacks can be used from the attack list or assigned to the hotbar and used with the number keys, 0-9<br><br>');
$tutorial.append(DONATION_STRING + '<br><br>');
$tutorial.append('Special Thanks and Donators:<br>');
for(let i = 0; i < DONATORS.length; i++){
    $tutorial.append(DONATORS[i] + "<br>");
}

$tutorial.append('<br>CHANGE LOG:<br>');
for(let i = 0; i < CHANGE_LOG.length; i++){
    $tutorial.append(CHANGE_LOG[i] + "<br><br>");
}