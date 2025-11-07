import { Injectable } from "@nestjs/common";
import { ShipParentRepository } from "src/persistance/ship/shipParent/shipParentRepository";
import { ShipParent } from "../../Ship";

@Injectable()
export class ShipParentFindByIdService{
    constructor(
        private shipParentRepository: ShipParentRepository
    ){}
    
    async run(parentId: number): Promise<ShipParent | null>{
        const ship: ShipParent | null = await this.shipParentRepository.findById(parentId);
        return ship;
    }
}