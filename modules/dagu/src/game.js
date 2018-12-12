let game = {
    output: [
        "Welcome to Dagu!",
        "Loading the game now.....<br>",
        "Current game version is " + VERSION
    ].concat(CHANGE_LOG).concat([
        "",
        DONATION_STRING,
        "",
        "Special Thanks and Donators:"
    ]).concat(DONATORS),
    status: "loading",
};