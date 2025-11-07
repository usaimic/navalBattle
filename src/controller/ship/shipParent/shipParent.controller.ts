import { Body, Controller, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { shipChildCoordinates } from "src/domain/ship/Ship";
import { ShipParentCreateService } from "src/domain/ship/shipParent/useCase/shipParentCreate";
import { ShipParentPlaceByIdService } from "src/domain/ship/shipParent/useCase/shipParentPlaceById";
import { ShipParentSetStatusByIdService } from "src/domain/ship/shipParent/useCase/shipParentSetStatusById";

@Controller('shipParent')
export class ShipParentController{
    constructor(
        private readonly shipParentCreateService: ShipParentCreateService,
        private readonly shipParentPlaceService: ShipParentPlaceByIdService,
        private readonly shipParentSetStatusByIdService: ShipParentSetStatusByIdService,
    ){}

    @Post(':playerId/:lobbyId')
    createShip(
        @Param('playerId', ParseIntPipe) playerId: number,
        @Param('lobbyId', ParseIntPipe) lobbyId: number,
        @Body() dimension: number
    ){
        return this.shipParentCreateService.run(playerId, lobbyId, dimension);
    }

    @Put(':playerId/:parentId')
    placeShip(
        @Param('playerId', ParseIntPipe) playerId: number, 
        @Param('parentId', ParseIntPipe) parentId: number,
        @Body() coordinates: shipChildCoordinates[]
    ){
        return this.shipParentPlaceService.run(playerId, parentId, coordinates);
    }

    @Put(':parentId')
    setStatus(@Param('parentId', ParseIntPipe) parentId: number, @Query('newStatus') newStatus: string){
        if(newStatus){
            return this.shipParentSetStatusByIdService.run(parentId, newStatus)
        }
    }

}