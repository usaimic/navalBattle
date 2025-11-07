import { Injectable } from "@nestjs/common";
import { LobbyRepository } from "src/persistance/lobby/lobbyRepository";
import { Lobby } from "../Lobby";

@Injectable()
export class LobbyGetOpponentIdService{
    constructor(
        private lobbyRepository: LobbyRepository
    ){}
    
    async run(lobbyId: number, playerId: number): Promise<number | null>{
        const lobby: Lobby | null = await this.lobbyRepository.findById(lobbyId);
        if(!lobby){
            console.log("LobbyGetOpponentId: Nessuna lobby trovata")
            return null;
        }

        const opponentId: number | null = this.getOpponentId(lobby, playerId);
        return opponentId;
    }

    getOpponentId(lobby: Lobby, playerId: number): number | null{
        if(lobby.idPlayer2 == playerId && lobby.idPlayer1 != null)   
            return lobby.idPlayer1;
        else if(lobby.idPlayer1 == playerId && lobby.idPlayer2 != null)     
            return lobby.idPlayer2;
        else{
            console.log("getOpponentId: Errore nel trovare playerID avversario");
            return null;
        }
    }
}