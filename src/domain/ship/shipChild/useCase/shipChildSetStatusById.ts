import { Injectable } from "@nestjs/common";
import { ShipChildRepository } from "src/persistance/ship/shipChild/shipChildRepository";
import { ShipChild } from "../../Ship";
import { ShipParentChildHittedService } from "../../shipParent/useCase/shipParentChildHitted";
import { enumShipStatus } from "src/persistance/ship/shipUtilities";

@Injectable()
export class ShipChildSetStatusByIdService{
    constructor(
        private shipChildRepository: ShipChildRepository,
        private shipParentChildHittedService: ShipParentChildHittedService
    ){}
    
    async run(id: number, newStatus: string): Promise<ShipChild | null>{
        const enumStatus: string = enumShipStatus(newStatus);
        const updated: ShipChild | null = await this.shipChildRepository.setStatusById(id, enumStatus);
        if(enumStatus == 'hitted' && updated)
            this.shipParentChildHittedService.run(updated.parentId);

        return updated;
    }
}