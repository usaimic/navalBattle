import { Injectable } from "@nestjs/common";
import { ShipChildRepository } from "src/persistance/ship/shipChild/shipChildRepository";
import { ShipChild } from "../../Ship";

@Injectable()
export class ShipChildFindByParentIdService{
    constructor(
        private shipChildRepository: ShipChildRepository
    ){}
    
    async run(parentId: number): Promise<ShipChild[] | null>{
        const ships: ShipChild[] | null = await this.shipChildRepository.findByParentId(parentId);
        return ships;
    }
}