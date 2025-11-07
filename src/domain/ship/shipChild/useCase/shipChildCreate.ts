import { Injectable } from "@nestjs/common";
import { ShipChildRepository } from "src/persistance/ship/shipChild/shipChildRepository";
import { ShipChild } from "../../Ship";

Injectable()
export class ShipChildCreateService{
    constructor(
        private shipChildRepository: ShipChildRepository
    ){}
    
    async run(parentId: number): Promise<ShipChild | null>{
        const ship: ShipChild | null = await this.shipChildRepository.create(parentId);
        return ship;
    }
}