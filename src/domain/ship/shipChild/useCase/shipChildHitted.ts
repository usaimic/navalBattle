import { Injectable } from "@nestjs/common";
import { ShipChildSetStatusByIdService } from "./shipChildSetStatusById";
import { ShipChild, ShipParent } from "../../Ship";

import { ShipParentChildHittedService } from "../../shipParent/useCase/shipParentChildHitted";

@Injectable()
export class ShipChildHittedService{
    constructor(
        private shipChildSetStatusByIdService: ShipChildSetStatusByIdService,
    ){}

    async run(shipId: number): Promise<ShipChild | null>{
        const shipChild: ShipChild | null = await this.shipChildSetStatusByIdService.run(shipId, 'died');
        // if(shipChild){
        //     const shipParent: ShipParent | null = await this.shipParentChildHittedService.run(shipChild.parentId);
        // }

        return shipChild;
    }
}
