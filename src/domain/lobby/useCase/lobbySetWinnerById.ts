import { Injectable } from "@nestjs/common";
import { LobbyRepository } from "src/persistance/lobby/lobbyRepository";
import { Lobby } from "../Lobby";

@Injectable()
export class LobbySetWinnerByIdService{
    constructor(
        private lobbyRepository: LobbyRepository
    ){}
    
    async run(lobbyId: number, winnerId: number): Promise<Lobby | null>{
        const updatedLobby: Lobby | null = await this.lobbyRepository.setWinnerId(lobbyId, winnerId);
        return updatedLobby;
    }
}
