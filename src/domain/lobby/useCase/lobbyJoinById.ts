import { Injectable } from "@nestjs/common";
import { LobbyRepository } from "src/persistance/lobby/lobbyRepository";
import { Lobby } from "../Lobby";

@Injectable()
export class LobbyJoinByIdService{
    constructor(
        private lobbyRepository: LobbyRepository
    ){}
    
    async run(lobbyId: number, guestId: number): Promise<Lobby | null>{
        const joinedLobby: Lobby | null = await this.lobbyRepository.joinByLobbyId(lobbyId, guestId);
        return joinedLobby;
    }
}