const VERSION = 0.2;
const BUILD_NUMBER = 4;
const CHUNK_SIZE = 20;
const STORAGE_STRING = "dagu_saves_array";
const ZOOM_MAX = 30;
const EXP_MULTIPLIER = 100;
const EXP_EXPONENT = 2;
const CACHED_CHUNKS = 4;
const TICK_THRESHOLD = 10;
const CREDITS_STRING = "Game by Douglas Kihlken";
const DONATION_STRING = "If you would like to donate to this game and me so that I can develop this game, please donate to dkihlken@gmail.com through paypal! Simply comment on the payment with the word \"dagu\" somewhere and I will add your name to the credits below!";
const DAMAGE_MULTIPLIER = 1.0;
const BASE_HEALTH = 100;
const BASE_MANA = 100;
const MONSTER_DIFFICULTY_MULTIPLIER = 6;
const MONSTER_BASE_HEALTH = 20;
const MONSTER_BASE_ATTACK_POWER = 2;
const MONSTER_BASE_MAGIC_POWER = 2;
const MONSTER_EXP_MULTIPLIER = 100;
const CONSUMABLE_CHANCE = 50;
const MONSTERS_PER_CHUNK = 10;
const TOWN_NPC_CHANCE = 50;
const STEPS_PER_TICK = 5;
const SAVES_LIMIT = 5;
const TICKS_PER_AUTO_SAVE = 5;
const ATTACK_SELECTED_OPACITY = 0.3;

const UNCOMMON_CHANCE = 65;
const RARE_CHANCE = 75;
const EPIC_CHANCE = 85;
const LEGENDARY_CHANCE = 95;
const MYTHIC_CHANCE = 98;

const DONATORS = [
    "Mackie Welter, love and support",
    "Anna Anderson, occasional food provider",
];

const CHANGE_LOG = [
    "0.2 (La Perm) - For Taro, our second cat baby with crossed eyes. <br>First Major Content Update, This includes new art, quests, monsters, attacks, upgrades, town and dungeon pre-built generations, and other data-driven changes. Small quality of life improvements as needed.",
    "0.1 (American Shorthair) - For Menow, our first cat baby with a degenerative mouth disease. <br>Initial, in development version. Movement, attacking, questing, item management, and other major proof of concept items completed. Game does not save any data currently for developmental debugging reasons, but is otherwise fully capable of storing data client-side.",
];

const STATUS = {
    COMBAT: "combat",
    COMBAT_ATTACK_SELECTED: "combat_attack_selected",
    HOTBAR_ATTACK_SELECTED: "hotbar_attack_selected",
};

const ITEM_TYPES = {
    CONSUMABLE: "consumable",
    EQUIPMENT: "equipment",
    GOAL_ITEM: "goal_item",
};

const NPC_RACES = [
    "Human",
    "Elf",
    "Orc",
    "Goblin",
    "Tiefling",
    "Hobbit",
    "Dwarf"
];

const NPC_PROFESSIONS = [
    "Miner",
    "Merchant",
    "Farmer",
    "Adventurer",
    "Guard",
    "Blacksmith",
];

const NPC_DESCRIPTIONS = [
    "Gross, dirty, and worn from constant work.",
    "Neat and clean, as if from wealth.",
];

const QUEST_TYPES = {
    KILL:"kill",
    TALK:"talk",
    COMPLETE_DUNGEON:"complete_dungeon",
    EXPLORE:"explore",
    PAY:"pay",
    ESCORT:"escort",
    GATHER_MATERIALS:"gather_materials",
};

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

const KEY_CODES = {
    W:87,
    A:65,
    S:83,
    D:68,
    1:49,
    2:50,
    3:51,
    4:52,
    5:53,
    6:54,
    7:55,
    8:56,
    9:57,
    0:58,
};