import { Injectable } from "@nestjs/common";
import { ShipParentRepository } from "src/persistance/ship/shipParent/shipParentRepository";
import { ShipParentSetStatusByIdService } from "./shipParentSetStatusById";
import { ShipParentFindByLobbyIdPlayerIdService } from "./shipParentFindByLobbyIdPlayerId";
import { LobbyEndGameService } from "src/domain/lobby/useCase/lobbyEndGame";
import { ShipParent } from "../../Ship";

@Injectable()
export class ShipParentChildHittedService{
    constructor(
        private shipParentRepository: ShipParentRepository,
        private shipParentSetStatusByIdService: ShipParentSetStatusByIdService,
        private shipParentFindByLobbyIdPlayerIdService: ShipParentFindByLobbyIdPlayerIdService,
        private lobbyEndGameService: LobbyEndGameService
    ){}

    async run(parentId: number){
        const shipChildUpdate: ShipParent | null = await this.childIsHitted(parentId);
        return shipChildUpdate;
    }

    async childIsHitted(parentId: number): Promise<ShipParent | null>{
        const shipParentUpdate: ShipParent | null = await this.shipParentRepository.childHitted(parentId);
        if(shipParentUpdate && shipParentUpdate.dimension == shipParentUpdate.hittedChild){
            await this.shipParentSetStatusByIdService.run(parentId, 'died');
            await this.checkAllParentDied(shipParentUpdate.lobbyId, shipParentUpdate.playerId);
        }
        return shipParentUpdate;
    }

    async checkAllParentDied(lobbyId: number, playerId: number): Promise<void>{
        const ships: ShipParent[] | null = await this.shipParentFindByLobbyIdPlayerIdService.run(lobbyId, playerId);
        if(!ships){
            console.log(`checkAllParentDied: Ship non trovata`);
            return;
        }  
            
        
        for(const ship of ships){
            if(ship.status == "alive")
                return;
        }

        //Fine game
        await this.lobbyEndGameService.run(lobbyId, playerId);
    }
}