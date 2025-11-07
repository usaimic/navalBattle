import { Injectable } from "@nestjs/common";
import { ShipParentRepository } from "src/persistance/ship/shipParent/shipParentRepository";
import { ShipChildRemoveByParentIdService } from "../../shipChild/useCase/shipChildRemoveByParentId";

@Injectable()
export class ShipParentRemoveByLobbyIdService{
    constructor(
        private shipParentRepository: ShipParentRepository
    ){}

    async run(lobbyId: number): Promise<number>{
        const removed: number = await this.shipParentRepository.removeByLobbyID(lobbyId);
        return removed;
    }

}