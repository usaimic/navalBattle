import { Injectable } from "@nestjs/common";
import { ShipParentRepository } from "src/persistance/ship/shipParent/shipParentRepository";
import { ShipParent } from "../../Ship";

@Injectable()
export class ShipParentFindByLobbyIdPlayerIdService{
    constructor(
        private shipParentRepository: ShipParentRepository
    ){}
    
    async run(lobbyId: number, playerId: number): Promise<ShipParent[] | null>{
        const ships: ShipParent[] | null = await this.shipParentRepository.findByLobbyIdPlayerId(lobbyId, playerId);
        return ships;
    }
}