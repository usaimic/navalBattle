import { Injectable } from "@nestjs/common";
import { LobbyRepository } from "src/persistance/lobby/lobbyRepository";
import { Lobby } from "../Lobby";
import { LobbyJoinByIdService } from "./lobbyJoinById";

@Injectable()
export class LobbyJoinByRandomService{
    constructor(
        private lobbyRepository: LobbyRepository,
        private readonly lobbyJoinByIdService: LobbyJoinByIdService
    ){}

    async run(guestId: number): Promise<Lobby | null>{
        const joinedLobby: Lobby | null = await this.matchmaking(guestId);
        return joinedLobby;
    }

    async matchmaking(guestId: number): Promise<Lobby | null>{
        const availableLobbies: Lobby[] | null = await this.lobbyRepository.findLobbiesWithOnePlayer();
        if(availableLobbies){
            const selectedLobbyId: number = this.getFreeLobbyId(availableLobbies);
            return this.lobbyJoinByIdService.run(selectedLobbyId, guestId);
        }
        
        console.log("Matchmaking error: nessuna lobby accessibile trovata");
        return null;
    }

    getFreeLobbyId(availableLobbies: Lobby[]): number{
        const selectedLobbyIndex: number = Math.floor(Math.random() * availableLobbies.length);
        const selectedLobby: Lobby = availableLobbies[selectedLobbyIndex];
        return selectedLobby.id;
    }
}