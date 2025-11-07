import { Injectable } from "@nestjs/common";
import { LobbyRepository } from "src/persistance/lobby/lobbyRepository";
import { Lobby } from "../Lobby";
import { LobbyUpdateTurnByIdService } from "./lobbyUpdateTurnById";

@Injectable()
export class LobbySetReadyByLobbyIdUserIdService{
    constructor(
        private lobbyRepository: LobbyRepository,
        private lobbyUpdateTurnById: LobbyUpdateTurnByIdService
    ){}
    
    async run(lobbyId: number, playerId: number): Promise<Lobby | null>{
        const readyLobby: Lobby | null = await this.lobbyRepository.setReadyByLobbyIdUserId(lobbyId, playerId);
        this.lobbyUpdateTurnById.run(lobbyId);

        return readyLobby;
    }
}