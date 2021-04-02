import { Client, ClientOptions, Collection } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import BaseCommand from '../utils/structures/BaseCommand';
import BaseMCBotEvent from "../utils/structures/BaseMCBotEvent";
import { ChildProcess, fork} from 'child_process';
import {mcbotIndex} from "./MCBOT_Index";
const fs = require("fs")



const DataDir: string = "./build/Data.json";
const SaveDelay : number = 60000;



export default class DiscordClient extends Client {

  private _commands = new Collection<string, BaseCommand>();
  private _botEvents = new Collection<string, BaseMCBotEvent>();
  private _events = new Collection<string, BaseEvent>();
  private _prefix: string = '!';
  private _data: any = {};
  private _MCBOT: ChildProcess;



  constructor(options?: ClientOptions) {
    super(options);

    //===========================================================
    //Load data file
    fs.readFile(DataDir, "utf-8", (err: any, data: string) =>{
      if(err){
        console.error(err);
      }
      else{
        this._data = JSON.parse(data);
      }
    })
    //===========================================================

    //===========================================================
    //Start the bot proccess
    this._MCBOT = fork("./build/src/client/MinecraftClient", { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });

    //Main bot function where all events are defined. Function can be found in /MCBOT/MCBOT_index.ts
    mcbotIndex(this, this._MCBOT);
    //===========================================================

    //===========================================================
    //Interval that saves the data
    setInterval(async () =>{
      this.SaveData();
    }, SaveDelay);
    //===========================================================

  }

  //Function that saves the data to file (I can't be asked doing it as a DB so a json file will do)
  async SaveData(){
    fs.writeFile(DataDir, JSON.stringify(this._data, null, 2), "utf-8", (err : any) =>{
      if(err){
        console.error(err);
      }
    })
  }



  get MCBOT(): ChildProcess {return this._MCBOT}
  get data(): any { return this._data }
  get commands(): Collection<string, BaseCommand> { return this._commands; }
  get botEvents(): Collection<string, BaseMCBotEvent> {return this._botEvents; }
  get events(): Collection<string, BaseEvent> { return this._events; }
  get prefix(): string { return this._prefix; }

  set prefix(prefix: string) { this._prefix = prefix; }
  set data(data: any) { this._data = data }
  set MCBOT(MCBOT: ChildProcess) {this._MCBOT = MCBOT};

}
