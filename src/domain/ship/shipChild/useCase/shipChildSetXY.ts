import { Injectable } from "@nestjs/common";
import { ShipChildRepository } from "src/persistance/ship/shipChild/shipChildRepository";
import { ShipChild } from "../../Ship";

@Injectable()
export class ShipChildSetXYService{
    constructor(
        private shipChildRepository: ShipChildRepository
    ){}

    async run(id: number, newX: number, newY: number): Promise<ShipChild | null>{
        const updated: ShipChild | null = await this.shipChildRepository.setXY(id, newX, newY);
        return updated;
    }
}