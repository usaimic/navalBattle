import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { FieldGetFinalViewService } from "src/domain/field/useCase/fieldGetFinalView";
import { FieldGetHitService } from "src/domain/field/useCase/fieldGetHit";
import { FieldGetPlacedService } from "src/domain/field/useCase/fieldGetPlaced";
import { FieldHitResponseService } from "src/domain/field/useCase/fieldHitResponse";

@Controller('field')
export class FieldController{
    constructor(
        private readonly fieldGetFinalViewService: FieldGetFinalViewService,
        private readonly fieldGetHitService: FieldGetHitService,
        private readonly fieldGetPlacedService: FieldGetPlacedService,
        private readonly fieldHitReponseService: FieldHitResponseService  
    ){}

    @Get('placed')
    getPlaced(@Query('lobbyId', ParseIntPipe) lobbyId: number, @Query('playerId', ParseIntPipe) playerId: number){
        return this.fieldGetPlacedService.run(lobbyId, playerId);
    }

    @Get('hitted')
    getHitted(@Query('lobbyId', ParseIntPipe) lobbyId: number, @Query('playerId', ParseIntPipe) playerId: number){
        return this.fieldGetHitService.run(lobbyId, playerId);
    }

    @Get('response/:actionId')
    getResponse(@Param('actionId', ParseIntPipe) actionId: number){
        return this.fieldHitReponseService.run(actionId);
    }

    @Get('finalView')
    getFinalField(
        @Query('lobbyId', ParseIntPipe) lobbyId: number,
        @Query('defenderId', ParseIntPipe) defId: number,
        @Query('attackerId', ParseIntPipe) attId: number
    ){
        return this.fieldGetFinalViewService.run(lobbyId, defId, attId);
    }

}