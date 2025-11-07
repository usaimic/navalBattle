import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import type { Action } from "src/domain/action/Action";
import { ActionCreateService } from "src/domain/action/useCase/actionCreate";
import { ActionFindByIdService } from "src/domain/action/useCase/actionFindById";
import { ActionFindByLobbyIdPlayerIdService } from "src/domain/action/useCase/actionFindByLobbyIdPlayerId";
import { ActionRemoveByLobbyIdService } from "src/domain/action/useCase/actionRemoveByLobbyId";
import { ActionUndoService } from "src/domain/action/useCase/actionUndo";

@Controller('action')
export class ActionController{
    
    constructor(
        private readonly actionCreateService: ActionCreateService,
        private readonly actionFindByLobbyIdPlayerIdService: ActionFindByLobbyIdPlayerIdService,
        private readonly actionRemoveByLobbyIdService: ActionRemoveByLobbyIdService,
        private readonly actionUndoService: ActionUndoService,
        private readonly actionFindByIdService: ActionFindByIdService
    ){}

    @Get()
    find(@Query('lobbyId', ParseIntPipe) lobbyId: number, @Query('playerId', ParseIntPipe) playerId: number){
        return this.actionFindByLobbyIdPlayerIdService.run(lobbyId, playerId);
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) actionId: number){
        return this.actionFindByIdService.run(actionId);
    }

    @Post()
    create(@Body() newAction: Action): Promise<Action | null>{
        return this.actionCreateService.run(newAction);
    }

    @Delete('undo')
    remove(@Query('lobbyId', ParseIntPipe) lobbyId: number, @Query('playerId', ParseIntPipe) playerId: number){
        return this.actionUndoService.run(lobbyId, playerId);
    }

    @Delete(':lobbyId')
    removeAll(@Param('lobbyId', ParseIntPipe) lobbyId: number){
        return this.actionRemoveByLobbyIdService.run(lobbyId);
    }
}