let TOWNS = [
    {
        description: "Small, close-knit community",
        tiles:[
            [{type:"grass",npc:true}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass",npc:true}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass",npc:true}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass",npc:true}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass",npc:true}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass",npc:true}, {type:"grass",npc:true}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass",npc:true}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass",npc:true}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass",npc:true}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass",npc:true}, {type:"grass",npc:true}, {type:"grass",npc:true}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
            [{type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}, {type:"grass"}],
        ],
    },
];