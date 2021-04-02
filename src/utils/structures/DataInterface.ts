/*
In this file you can define how your save data object is built up.
I should of just done this in the form of a class or a MongoDB but thats a project for another day.
If someone wants to do it for me feel free
*/

export interface SaveData {
    Whitelist: {[Key: string]: WhitelistedPlayer}

}

//This is an example on how you would lay out your data interfaces
export interface WhitelistedPlayer {
    IGN: String,
    UUID: String | undefined,
    DiscordID: String,
    Buffers: number,
    Walls: number
}