# Bandella's Discord & Minecraft Bot template

This template falls under the The MIT License more can be found here: https://mit-license.org/

This is a template to create discord bots that can interact with a Client that is logged onto a minecraft server.
Its made in typescript. If you don't know what Typescript is fear not and watch this breif introduction: https://youtu.be/zQnBQ4tB3ZA

The majority of the code surronding the discord bot was generated by the Slappey CLI linked below.

## Used Libary's

1. Discord.js (Discord Bot) https://github.com/discordjs/discord.js
2. mineflayer (Minecraft Bot) https://github.com/PrismarineJS/mineflayer
3. TypeScript (Languge im coding in) https://github.com/microsoft/TypeScript
4. slappey (Used to generate the Discord bot) https://github.com/stuyy/slappey

## How to install

1. Install typescript with npm `npm i -g typescript `
2. Install Slappey with `npm i -g slappey`
3. clone this repo (Download it)
4. copy slappey.json from ./CopyOutOfMe/ to your root prohect directory (The one with this README)
5. run `npm install` to install the node modules
6. to transpile the Typescript to runable JS run `tsc` while in your project folder. (This will auto transpile any changes you make)
7. To start the bot do `npm run start`

## How to use

This is just building apon the Slappey discord bot tool.
For a tutorial on that you can either read it's readme or watch this tutorial: https://www.youtube.com/watch?v=uHzZx2b1t7A

### Things I changed

1. I added an event handler for the Minecraft bot and its almost identical to the way the Slappey command and event handler generates.
2. I didn't create a fork of the CLI which you can install sadley so you will have to Copy the base code out of ./CopyOutOfMe/TemplateBotEvent.ts
3. Finally, I added a Data object that is stored in the Discordclient class. So to access it all you have to do is client.data. 
    There is a interface in ./src/utils/structures/DataInterface.ts which lays out how the save data looks with a whitelist example

For anything else visit https://discord.gg/EscPyG7q89 or dm Bandella#0001
