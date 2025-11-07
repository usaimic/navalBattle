import { Injectable } from "@nestjs/common";
import { ShipChildRepository } from "src/persistance/ship/shipChild/shipChildRepository";
import { ShipChild } from "../../Ship";

@Injectable()
export class ShipChildFindByIdService{
    constructor(
        private shipChildRepository: ShipChildRepository
    ){}

    async run(childId: number): Promise<ShipChild | null>{
        const ship: ShipChild | null = await this.shipChildRepository.findById(childId);
        return ship;
    }
}