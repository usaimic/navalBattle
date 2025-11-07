import { Injectable } from "@nestjs/common";
import { LobbyRepository } from "src/persistance/lobby/lobbyRepository";
import { Lobby } from "../Lobby";

@Injectable()
export class LobbyFindByPlayerIdService{
    constructor(
        private lobbyRepository: LobbyRepository
    ){}

    async run(playerId: number): Promise<Lobby[] | null>{
        const lobbies: Lobby[] | null = await this.lobbyRepository.findByPlayerId(playerId);
        return lobbies;
    }
}