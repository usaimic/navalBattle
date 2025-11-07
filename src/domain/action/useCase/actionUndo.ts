import { Injectable } from "@nestjs/common";
import { ActionRepository } from "src/persistance/action/actionRepository";
import { Action } from "../Action";

@Injectable()
export class ActionUndoService{
    constructor(
        private actionRepository: ActionRepository
    ){}
    
    async run(lobbyId: number, playerId: number){
        const removed: Action | null = await this.actionRepository.removeLastByLobbyIdPLayerId(lobbyId, playerId);
        return removed;
    }
}