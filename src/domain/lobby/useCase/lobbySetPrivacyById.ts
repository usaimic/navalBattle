import { Injectable } from "@nestjs/common";
import { LobbyRepository } from "src/persistance/lobby/lobbyRepository";
import { Lobby } from "../Lobby";

@Injectable()
export class LobbySetPrivacyByIdService{
    constructor(
        private lobbyRepository: LobbyRepository
    ){}
    
    async run(lobbyId: number, isPrivate: boolean): Promise<Lobby | null>{
        const updatedLobby: Lobby | null = await this.lobbyRepository.setPrivacyById(lobbyId, isPrivate);
        return updatedLobby;
    }
}