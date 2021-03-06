let map_icons_loaded = 0;
let map_icons_to_load = 12;
let map_render_locked = true;

let MAP_ICONS = {};

MAP_ICONS.TILES = {};

MAP_ICONS.TILES.GRASS = new Image();
MAP_ICONS.TILES.GRASS.src = "../../images/pack2/trees_and_bushes_pack/grass.svg";
MAP_ICONS.TILES.GRASS.onload = util.imageLoader;

MAP_ICONS.TILES.STONE = new Image();
MAP_ICONS.TILES.STONE.src = "../../images/stone.png";
MAP_ICONS.TILES.STONE.onload = util.imageLoader;

MAP_ICONS.OBJECTS = {};

MAP_ICONS.OBJECTS.BUSH = new Image();
MAP_ICONS.OBJECTS.BUSH.src = "../../images/pack2/trees_and_bushes_pack/bush.svg";
MAP_ICONS.OBJECTS.BUSH.onload = util.imageLoader;

MAP_ICONS.OBJECTS.TREE = new Image();
MAP_ICONS.OBJECTS.TREE.src = "../../images/pack2/trees_and_bushes_pack/tree.svg";
MAP_ICONS.OBJECTS.TREE.onload = util.imageLoader;

MAP_ICONS.NPCS = [];

MAP_ICONS.NPCS.push(new Image());
MAP_ICONS.NPCS[0].src = "../../images/pack1/rpg-pack/chars/hat-guy/hat-guy.svg";
MAP_ICONS.NPCS[0].onload = util.imageLoader;

MAP_ICONS.NPCS.push(new Image());
MAP_ICONS.NPCS[1].src = "../../images/pack1/rpg-pack/chars/sensei/sensei.svg";
MAP_ICONS.NPCS[1].onload = util.imageLoader;

MAP_ICONS.MONSTERS = {};

MAP_ICONS.MONSTERS.HELLHOUND = new Image();
MAP_ICONS.MONSTERS.HELLHOUND.src = "../../images/hellhound.svg";
MAP_ICONS.MONSTERS.HELLHOUND.onload = util.imageLoader;

MAP_ICONS.HERO = new Image();
MAP_ICONS.HERO.src = "../../images/pack1/rpg-pack/chars/gabe/gabe.svg";
MAP_ICONS.HERO.onload = util.imageLoader;

MAP_ICONS.NPCS_FLIPPED = [];

MAP_ICONS.NPCS_FLIPPED.push(new Image());
MAP_ICONS.NPCS_FLIPPED[0].src = "../../images/pack1/rpg-pack/chars/hat-guy/hat-guy_flipped.svg";
MAP_ICONS.NPCS_FLIPPED[0].onload = util.imageLoader;

MAP_ICONS.NPCS_FLIPPED.push(new Image());
MAP_ICONS.NPCS_FLIPPED[1].src = "../../images/pack1/rpg-pack/chars/sensei/sensei_flipped.svg";
MAP_ICONS.NPCS_FLIPPED[1].onload = util.imageLoader;

MAP_ICONS.MONSTERS_FLIPPED = {};

MAP_ICONS.MONSTERS_FLIPPED.HELLHOUND = new Image();
MAP_ICONS.MONSTERS_FLIPPED.HELLHOUND.src = "../../images/hellhound_flipped.svg";
MAP_ICONS.MONSTERS_FLIPPED.HELLHOUND.onload = util.imageLoader;

MAP_ICONS.HERO_FLIPPED = new Image();
MAP_ICONS.HERO_FLIPPED.src = "../../images/pack1/rpg-pack/chars/gabe/gabe_flipped.svg";
MAP_ICONS.HERO_FLIPPED.onload = util.imageLoader;
