import { Injectable } from "@nestjs/common";
import { ShipChildRepository } from "src/persistance/ship/shipChild/shipChildRepository";

@Injectable()
export class ShipChildRemoveByParentIdService{
    constructor(
        private shipChildRepository: ShipChildRepository
    ){}
    
    async run(parentId: number): Promise<number>{
        const removed: number = await this.shipChildRepository.removeByParentId(parentId);
        return removed;
    }
}