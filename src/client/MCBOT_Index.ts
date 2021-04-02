import config from "../../slappey.json";
import DiscordClient from "./client";
import { ChildProcess }  from 'child_process';
const cp = require("child_process");

export async function mcbotIndex(client : DiscordClient, MCBOT : ChildProcess) {
    
    MCBOT.on("exit", async (code: number) =>{
        //Will restart the bot on exit
        console.log(`MCBot crashed with error code ${code}`);
        MCBOT = cp.fork("./build/src/client/MinecraftClient", { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
        mcbotIndex(client, MCBOT);
    });

    MCBOT.on("message", async (data : any) =>{
        let Keys = Object.keys(data);

        //If the minecraft requests to be restarted
        if(Keys.indexOf("relog") != -1){
            //Kills the MCBOT proccess. The exit event will catch it and relog the bot
            console.log("Killing the MCBot to restart it");
            MCBOT.kill();
        }
        else{
            Keys.forEach((element : string) =>{
                const MCBOT_Command = client.botEvents.get(element);
                if(MCBOT_Command){
                    MCBOT_Command.run(client, data[element]);
                }
            });
        }
    })

}