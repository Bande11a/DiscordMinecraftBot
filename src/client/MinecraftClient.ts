const mineflayer = require('mineflayer');
import config from "../../slappey.json";

console.log("Minecraft Bot is logging in!")

const Chat_anti_AFK_delay = 300;

var lastchat = Date.now();
var ChatBuffer: string[] = [];

//Login options
var options = {
    host: config.host,
    username: config.username,
    password: config.password,
    auth: config.auth,
    version: config.version
}

//Creates the bot
var MCBOT = new mineflayer.createBot(options);


console.log(MCBOT.username);

//Message event
MCBOT.on("message", (jsonMsg: any, position: any) => {
    //Reset the chat Watchdog
    lastchat = Date.now();
    //makes sure the message isnt undefined
    if (jsonMsg.extra != undefined) {
        //Removes all colours
        let longmsg = "";
        jsonMsg.extra.forEach((elem: any) => {
            longmsg += elem.text;
        })
        let longmsgarray = longmsg.split("");
        while (longmsgarray.indexOf("§") != -1) {
            longmsgarray.splice(longmsgarray.indexOf("§"), 2);
        }
        longmsg = longmsgarray.join("");

        //Sends the message back to the main thread
        process.send && process.send({ ChatMsg: longmsg });
    }
})


MCBOT.on("login", () => {
    console.log(`${MCBOT.username} has has successfully logged in!`)
})

//Sends the hub command so it logs in
MCBOT.on("spawn", () => {
    ChatBuffer.push(config.hub_command)
    process.send && process.send({Test: "hello, I just spawned in!"}); //Shows hot to call the test command
})


//Message Event thats recived from the parent proccess
process.on("message", (data: any) => {
    try {
        let keys = Object.keys(data);
        if (keys.includes("chat")) {
            //If the key is chat it will push the value to the chat buffer
            ChatBuffer.push(data["chat"]);
        }
    }
    catch (err) { console.error(err) }
})

setInterval(() => {
    //function that is called every 3 secs and clears the chat buffer
    if (ChatBuffer.length != 0) {
        let msg = ChatBuffer.shift();
        MCBOT.chat(msg);
    }
}, 3000);


setInterval(() => {
    // /lag and home command
    ChatBuffer.push(config.hub_command)
    ChatBuffer.push("/lag")
    ChatBuffer.push("/home home");
}, 300000)


setInterval(() => {
    //5 min Chat Watchdog
    if (Date.now() - lastchat > Chat_anti_AFK_delay * 1000) {
        console.log("No chat msg recived in 5 mins restarting the bot")
        process.send && process.send({ relog: true });
    }
}, 30000)
