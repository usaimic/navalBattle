import { Controller, Get, Param, ParseIntPipe, Put } from "@nestjs/common";
import { ShipChildFindByIdService } from "src/domain/ship/shipChild/useCase/shipChildFindById";
import { ShipChildHittedService } from "src/domain/ship/shipChild/useCase/shipChildHitted";

@Controller('shipChild')
export class ShipChildController{
    constructor(
        private readonly shipChildHittedService: ShipChildHittedService,
        private readonly shipChildFindByIdService: ShipChildFindByIdService
    ){}

    // @Put(':shipId')
    // childHitted(@Param('shipId', ParseIntPipe) shipId: number){
    //     return this.shipChildHittedService.run(shipId);
    // }

    @Get(':shipId')
    findById(@Param('shipId', ParseIntPipe) shipId: number){
        return this.shipChildFindByIdService.run(shipId);
    }

}