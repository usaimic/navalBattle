import { Injectable } from "@nestjs/common";
import { ActionRepository } from "src/persistance/action/actionRepository";

@Injectable()
export class ActionRemoveByLobbyIdService{
    constructor(
        private actionRepository: ActionRepository
    ){}

    async run(lobbyId: number): Promise<number>{
        const removedElement: number = await this.actionRepository.removeByLobbyId(lobbyId);
        return removedElement;
    }
}