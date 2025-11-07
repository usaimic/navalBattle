import { Injectable } from "@nestjs/common";
import { LobbyRepository } from "src/persistance/lobby/lobbyRepository";
import { Lobby } from "../Lobby";

@Injectable()
export class LobbyFindByIdService{
    constructor(
        private lobbyRepository: LobbyRepository
    ) {}

    async run(id: number): Promise<Lobby | null>{
        const lobby: Lobby | null = await this.lobbyRepository.findById(id);
        return lobby;
    }
} 