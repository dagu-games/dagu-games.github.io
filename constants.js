const GRASS_ICON = "grass.png";
const TREE_ICON = "tree.png";
const STONE_ICON = "stone.png";
const DIRT_ICON = "dirt.png";
const NPC_ICON = "npc.png";
const HELLHOUND_ICON = "hellhound.png";
const WALL_ICON = "wall.png";
const HERO_ICON = "hero.png";

const STATUS = {
    COMBAT: "combat",
    COMBAT_SPELL_SELECTED: "combat_spell_selected",
    NPC_QUEST: "npc_quest",
    NPC_SHOP: "npc_shop",
};

const CHUNK_SIZE = 100;
const STORAGE_STRING = "dagu_saves_array";
const DONATION_STRING = "If you would like to donate to this game and me so that I can develop this game, please donate to dkihlken@gmail.com through paypal! Simply comment on the payment with the word \"dagu\" somewhere and I will add your name to the credits below!";
const DONATORS = [
    "Mackie Welter",
];

const WALKABLE_TILES = [
    "grass",
    "stone",
    "dirt",
];

const ZOOM_MAX = 100;

const VISION_BLOCKING_TILES = [
    "tree",
    "bush",
    "wall",
];

const NPC_FIRST_NAMES = [
    "Jim",
    "Dave",
    "Bob",
    "Mackie",
    "Doug"
];

const NPC_LAST_NAMES = [
    "Kihlken",
    "Anderson",
    "Smith"
];

const RACES = [
    "Human",
    "Elf",
    "Orc",
    "Goblin",
    "Tiefling",
    "Hobbit",
    "Dwarf"
];

const PROFESSIONS = [
    "Miner",
    "Merchant",
    "Farmer",
    "Adventurer",
    "Guard"
];

const NPC_DESCRIPTIONS = [
    "Gross, dirty, and worn from constant work.",
    "Neat and clean, as if from wealth."
];

const QUESTS = [
    {
        name: "Find my dog!",
        description: "I lost my dog! can you help me find it? Some monsters took him from me!",
        goal_item: "Lost Dog",
        goal_item_description: "You found the lost dog! Take him back to his owner and they will reward you!"
    },
];

const ITEM_NAMES = {
    helmets: [
        "helm of cool",
    ],
    shoulders: [
        "shoulder guards of cool",
    ],
    gauntlets: [
        "gauntlets of cool",
    ],
    chests: [
        "chest of cool",
    ],
    belts: [
        "belt of cool",
    ],
    pants: [
        "pants of cool",
    ],
    boots: [
        "boots of cool",
    ],
    main_hands: [
        "sword of cool",
    ],
    off_hands: [
        "shield of cool",
    ],
    necklaces: [
        "necklace of cool",
    ],
    rings: [
        "ring of cool",
    ],
};

const ITEM_DESCRIPTIONS = [
    "old and worn",
    "good as new",
    "made by the finest craftsmen",
];

const ITEM_SLOTS = [
    "helmet",
    "shoulders",
    "gauntlets",
    "chest",
    "belt",
    "pants",
    "boots",
    "main_hand",
    "off_hand",
    "necklace",
    "ring",
];

const TOWN_NAMES = [
    "Springville",
    "Nelthar",
    "Placeburg",
    "CityVillage"
];