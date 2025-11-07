import { Injectable } from "@nestjs/common";
import { LobbyRepository } from "src/persistance/lobby/lobbyRepository";
import { Lobby } from "../Lobby";

@Injectable()
export class LobbyFindByWinnerIdService{
    constructor(
        private lobbyRepository: LobbyRepository
    ){}
    
    async run(winnerId: number): Promise<Lobby[] | null>{
        return this.lobbyRepository.findByWinnerId(winnerId);
    }
}