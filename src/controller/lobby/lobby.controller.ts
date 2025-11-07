import { Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { LobbyCreateService } from "src/domain/lobby/useCase/lobbyCreate";
import { LobbyEndGameService } from "src/domain/lobby/useCase/lobbyEndGame";
import { LobbyFindByIdService } from "src/domain/lobby/useCase/lobbyFindById";
import { LobbyFindByPlayerIdService } from "src/domain/lobby/useCase/lobbyFindByPlayerId";
import { LobbyJoinByIdService } from "src/domain/lobby/useCase/lobbyJoinById";
import { LobbyJoinByRandomService } from "src/domain/lobby/useCase/lobbyJoinByRandom";
import { LobbySetPrivacyByIdService } from "src/domain/lobby/useCase/lobbySetPrivacyById";
import { LobbySetReadyByLobbyIdUserIdService } from "src/domain/lobby/useCase/lobbySetReadyByLobbyIdUserId";
import { LobbyUpdateTurnByIdService } from "src/domain/lobby/useCase/lobbyUpdateTurnById";

@Controller('lobby')
export class LobbyController{
    constructor(
        private readonly lobbyCreateService: LobbyCreateService,
        private readonly lobbySetPrivacyByIdService: LobbySetPrivacyByIdService,
        private readonly lobbyJoinByIdService: LobbyJoinByIdService,
        private readonly lobbyJoinByRandomService: LobbyJoinByRandomService,
        private readonly lobbyFindByPlayerIdService: LobbyFindByPlayerIdService,
        private readonly lobbySetReadyByLobbyIdUserIdService: LobbySetReadyByLobbyIdUserIdService,
        private readonly lobbyFindByIdService: LobbyFindByIdService,
        private readonly lobbyUpdateTurnByIdService: LobbyUpdateTurnByIdService,
        private readonly lobbyEndGameService: LobbyEndGameService,
    ){}

    @Get(':id')
    findById(@Param('id', ParseIntPipe) lobbyId: number){
        return this.lobbyFindByIdService.run(lobbyId);
    }

    @Post(':ownerId')
    create(@Param('ownerId', ParseIntPipe) ownerId: number, @Query('isPrivate', ParseBoolPipe) isPrivate: boolean){
        return this.lobbyCreateService.run(ownerId, isPrivate)
    }

    @Put(':id/privacy')
    updatePrivacy(@Param('id', ParseIntPipe) lobbyId: number, @Query('isPrivate', ParseBoolPipe) isPrivate: boolean){
        return this.lobbySetPrivacyByIdService.run(lobbyId, isPrivate);
    }

    @Put(':id/turn')
    updateTurn(@Param('id', ParseIntPipe) lobbyId: number){
        return this.lobbyUpdateTurnByIdService.run(lobbyId);
    }

    @Put(`join/:guestId`)
    joinRandomLobby(@Param('guestId', ParseIntPipe) guestId: number){
        return this.lobbyJoinByRandomService.run(guestId);
    }

    @Put('join/:guestId/:lobbyId')
    joinLobbyId(@Param('guestId', ParseIntPipe) guestId: number, @Param('lobbyId', ParseIntPipe) lobbyId: number){
        return this.lobbyJoinByIdService.run(lobbyId, guestId);
    }

    @Get()
    findByPlayerId(@Query('playerId', ParseIntPipe) playerId: number){
        return this.lobbyFindByPlayerIdService.run(playerId);
    }

    @Put(':lobbyId/:playerId/ready')
    setReadyById(@Param('lobbyId', ParseIntPipe) lobbyId: number, @Param('playerId', ParseIntPipe) playerId: number){
        return this.lobbySetReadyByLobbyIdUserIdService.run(lobbyId, playerId);
    }

    @Get(':lobbyId/:playerId/end')
    closeGame(@Param('lobbyId', ParseIntPipe) lobbyId: number, @Param('playerId', ParseIntPipe) playerId: number){
        return this.lobbyEndGameService.run(lobbyId, playerId);
    }
}