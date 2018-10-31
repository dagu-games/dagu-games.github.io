var util = {
    isWalkable:function(x,y) {
        // Returns true or false depending on if the given x and y point to terrain type of one of the walkable types given by the WALKABLE_TILES[] constant
    },
    :function() {
        // 
    },
    isInRange(x1,y1,x2,y2,max)					Returns true or false depending on if the first and second objects are within range max
    hasLineOfSight(x1,y1,x2,y2)					Returns true if there are no walls or <3 trees between the two points
        findDirection(x1,y1,x2,y2)					returns 0-7 depending on the direction to the second point
    findSquare(x,y,length)	return square[]	x1			Finds a square of length on each side, centered on x and y
    x2
    y1
    Y2
    getAllInRange(x,y,range)					Returns array of x and y points within range given
    isAround(x,y,npc_type)					Searches the 9 tiles around the given points and returns true if the npc_type(monster|npc_shop|npc_quest) matches any of the 9 tiles
loadGame(index)					Reads index and storage. If storage is null, it runs init to init the storage objects and game data
saveGame()					reads the game data and stores it into the storage space, moving the current data into backups
init()					initializes all game data and loads it into the game object. Calls generateChunk on 0,0 and the 9 around it.
generateChunk(x,y)	town				clears whatever is in the current map object and fills the hole with new terrain in the given coordinates chunk. determine chunk with (x/100 - x%100 - 1). then multiply by 100 to get the starting x. choose either (town, wilderness, dungeon) if >=1 quest accepted then 10% dungeon, 15% town, 75% wilderness, if not then 15% town 85% wilderness
wilderness				will contain npc shops and quests, spawning in given positions. Selects random shape from list, builds walls according to spec and randomly populates with nps in designated spawn zones
dungeon				will contain either enemies, nothing, or loot contains a quest item needed for accepted quest and enemies fill in holes with random grass, trees, sand, snow, or dirt
return monsters[]	name			determines character level and generates an appropriate encounter
generateChunkEnemies()		max_health
armor
magic_resistance
attack_power
attack_lifesteal
ability_power
magic_lifesteal
Monster_attacks[monster_attack]
return items[]	{ITEM}
tick(x,y)					simulates and makes moves for all monsters withing 500 tiles, if they exist.
};