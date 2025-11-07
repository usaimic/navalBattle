import { Injectable } from "@nestjs/common";
import { ShipParentRepository } from "src/persistance/ship/shipParent/shipParentRepository";
import { ShipParent } from "../../Ship";

@Injectable()
export class ShipParentRemoveByIdService{
    constructor(
        private shipParentRepository: ShipParentRepository
    ){}
    
    async run(id: number): Promise<ShipParent | null>{
        const removed: ShipParent | null = await this.shipParentRepository.removeById(id);
        return removed; 
    }
}