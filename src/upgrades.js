let upgrades = [
    {
        name: "Go to the Gym!",
        description: "You went to the gym and got stronger",
        skill_point_cost: 1,
        isAvailable: function(){
            //returns true or false, depending on a set of conditions for that upgrade. (you can't be an archer if you are a wizard)
        },
        effect: function(){
            //modifies the character data to represent that upgrade
        },
    },

];