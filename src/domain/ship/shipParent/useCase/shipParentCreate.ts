import { Injectable } from "@nestjs/common";
import { ShipParentRepository } from "src/persistance/ship/shipParent/shipParentRepository";
import { ShipChild, ShipParent } from "../../Ship";
import { ShipChildCreateService } from "../../shipChild/useCase/shipChildCreate";

@Injectable()
export class ShipParentCreateService{
    constructor (
        private shipParentRepository: ShipParentRepository,
        private shipChildService: ShipChildCreateService
    ){}

    async run(playerId: number, lobbyId: number, dimension: number): Promise<ShipParent | null>{
        const shipParent: ShipParent | null = await this.shipParentRepository.create(playerId, lobbyId, dimension)
        
        if(shipParent) this.createChilds(shipParent.id, dimension);

        return shipParent;
    }

    async createChilds(parentId: number, dimension: number): Promise<void>{
        const childs: ShipChild[] | null = [];
        for(let i = 0; i < dimension; i++){
            const child: ShipChild | null = await this.shipChildService.run(parentId);
            if(child){
                childs.push(child);
            }
        }

        // return childs;
    }
}