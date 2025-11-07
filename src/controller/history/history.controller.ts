import { Body, Controller, Get, Param, ParseIntPipe, Put, Query } from "@nestjs/common";
import type { History } from "src/domain/history/History";
import { HistoryFindByUserIdService } from "src/domain/history/useCase/historyFindByUserId";
import { HistoryUpdateByIdService } from "src/domain/history/useCase/historyUpdateById";

@Controller('history')
export class HistoryController{

    constructor(
        private readonly historyFindByUserService: HistoryFindByUserIdService,
        private readonly historyUpdateByIdService: HistoryUpdateByIdService
    ){}
    
    @Get(':userId')
    findByUserId(@Param('userId', ParseIntPipe) userId: number){
        return this.historyFindByUserService.run(userId);
    }

    @Put(':userId')
    updateByUserId(@Param('userId', ParseIntPipe) userId: number, @Query('result') result: string){
        return this.historyUpdateByIdService.run(userId, result);
    }

}

