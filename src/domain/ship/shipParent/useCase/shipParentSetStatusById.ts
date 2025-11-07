import { Injectable } from "@nestjs/common";
import { ShipParentRepository } from "src/persistance/ship/shipParent/shipParentRepository";
import { ShipParent } from "../../Ship";
import { enumShipStatus } from "src/persistance/ship/shipUtilities";

@Injectable()
export class ShipParentSetStatusByIdService{
    constructor(
        private shipParentRepository: ShipParentRepository
    ){}

    async run(parentId: number, newStatus: string){
        const updated: ShipParent | null = await this.shipParentRepository.setStatusById(parentId, enumShipStatus(newStatus));
        return updated;
    }
}