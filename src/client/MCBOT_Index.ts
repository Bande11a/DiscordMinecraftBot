import DiscordClient from "./client";
import { ChildProcess }  from 'child_process';
const cp = require("child_process");

/*
This is the function that handels the Mineflayer bot Child proccess and all of its events
*/
export async function mcbotIndex(client : DiscordClient, MCBOT : ChildProcess) {
    
    //Logs that the bot ended and restarts it
    MCBOT.on("exit", async (code: number) =>{
        //Will restart the bot on exit
        console.log(`MCBot crashed with error code ${code}`);
        MCBOT = cp.fork("./build/src/client/MinecraftClient", { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
        mcbotIndex(client, MCBOT);
    });

    //This event is called when you do proccess.send() in the MinecraftClient.ts
    MCBOT.on("message", async (data : any) =>{
        let Keys = Object.keys(data);

        //If the minecraft requests to be restarted
        if(Keys.indexOf("relog") != -1){
            //Kills the MCBOT proccess. The exit event will catch it and relog the bot
            console.log("Killing the MCBot to restart it");
            MCBOT.kill();
        }
        else{
            //Loops over every request recived and if there is one that is defined will execute it
            //To create an event create a new ts file somehwere in MCBOT and copy the base code out of TemplateBotEvent 
            Keys.forEach((element : string) =>{
                const MCBOT_Command = client.botEvents.get(element);
                if(MCBOT_Command){
                    MCBOT_Command.run(client, data[element]);
                }
                else{
                    console.log(`Unkown MCBOT Event ${element}`);
                }
            });
        }
    })

}