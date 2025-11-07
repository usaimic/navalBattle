import { Injectable } from "@nestjs/common";
import { LobbyRepository } from "src/persistance/lobby/lobbyRepository";
import { Lobby } from "../Lobby";

@Injectable()
export class LobbyUpdateTurnByIdService{
    constructor(
        private lobbyRepository: LobbyRepository
    ){}
    
    async run(lobbyId: number): Promise<Lobby | null>{
        const lobby: Lobby | null = await this.lobbyRepository.findById(lobbyId);
        
        if(!lobby){
            console.log("LobbyUpdateTurn: Lobby non esistente");
            return null;
        }

        const check: boolean = await this.checkReady(lobby);
        if(!check){
            console.log("LobbyUpdateTurn: CheckReady fallito")
            return null;
        }  
            
        
        const newLobby: Lobby | null = await this.turnSelector(lobby);
        return newLobby;
    }

    async checkReady(lobby: Lobby): Promise<boolean>{
        return (lobby.isReady1 && lobby.isReady2);
    }

    async turnSelector(lobby: Lobby): Promise<Lobby | null>{
        if(lobby.idPlayer2 != null && lobby.turn == lobby.idPlayer1)
            return await this.lobbyRepository.updateTurnById(lobby.id, lobby.idPlayer2); 
        else if(lobby.idPlayer1 != null && (lobby.turn == lobby.idPlayer2 || lobby.turn == -1))
            return await this.lobbyRepository.updateTurnById(lobby.id, lobby.idPlayer1);
        else{
            console.log("TurnSelector: idPlayer non disponibile o non esistente");
            return null;
        } 
    }
}