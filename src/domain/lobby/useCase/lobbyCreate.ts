import { Injectable } from "@nestjs/common";
import { LobbyRepository } from "src/persistance/lobby/lobbyRepository";
import { Lobby } from "../Lobby";

@Injectable()
export class LobbyCreateService{
    constructor (
        private lobbyRepository: LobbyRepository
    ){}
    
    async run(ownerId: number, isPrivate: boolean): Promise<Lobby | null>{
        const lobby: Lobby | null = await this.lobbyRepository.createLobby(ownerId, isPrivate);
        return lobby;
    }
}