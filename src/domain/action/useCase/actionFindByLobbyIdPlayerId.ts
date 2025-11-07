import { Injectable } from "@nestjs/common";
import { ActionRepository } from "src/persistance/action/actionRepository";
import { Action } from "../Action";

@Injectable()
export class ActionFindByLobbyIdPlayerIdService{
    constructor(
        private actionRepository: ActionRepository
    ){}

    async run(lobbyId: number, playerId: number): Promise<Action[] | null>{
        const actions: Action[] | null = await this.actionRepository.findByLobbyIdPlayerId(lobbyId, playerId);
        return actions;
    }
}