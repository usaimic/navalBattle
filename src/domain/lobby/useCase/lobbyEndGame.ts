import { Injectable } from "@nestjs/common";
import { LobbyRepository } from "src/persistance/lobby/lobbyRepository";
import { LobbyGetOpponentIdService } from "./lobbyGetOpponentId";
import { LobbySetWinnerByIdService } from "./lobbySetWinnerById";
import { Lobby } from "../Lobby";
import { HistoryUpdateByIdService } from "src/domain/history/useCase/historyUpdateById";
import { History } from "src/domain/history/History";
import { ActionRemoveByLobbyIdService } from "src/domain/action/useCase/actionRemoveByLobbyId";
import { ShipParentRemoveByLobbyIdService } from "src/domain/ship/shipParent/useCase/shipParentRemoveByLobbyId";

@Injectable()
export class LobbyEndGameService{
    constructor(
        private lobbyRepository: LobbyRepository,
        private lobbyGetOpponentIdService: LobbyGetOpponentIdService,
        private lobbySetWinnerByIdService: LobbySetWinnerByIdService,
        private historyUpdateByIdService: HistoryUpdateByIdService,
        private actionRemoveByLobbyIdService: ActionRemoveByLobbyIdService,
        private shipParentRemoveByLobbyIdService: ShipParentRemoveByLobbyIdService
    ){}

    async run(lobbyId: number, loserId: number): Promise<Lobby | null>{
        const opponentId: number | null = await this.lobbyGetOpponentIdService.run(lobbyId, loserId);
        if(opponentId == null){
            console.log("LobbyEndGame: OpponentId null")
            return null;
        }  

        const finalLobby: Lobby | null = await this.finalSettings(lobbyId, opponentId, loserId);
        return finalLobby;
    }

    async finalSettings(lobbyId: number, winnerId: number, loserId: number): Promise<Lobby | null>{
        const lobby: Lobby | null = await this.lobbySetWinnerByIdService.run(lobbyId, winnerId);
        const winner: History | null = await this.historyUpdateByIdService.run(winnerId, 'win');
        const loser: History | null = await this.historyUpdateByIdService.run(loserId, 'lose');
        
        //clear lobby?
        const action: number = await this.actionRemoveByLobbyIdService.run(lobbyId);
        const shipParent: number = await this.shipParentRemoveByLobbyIdService.run(lobbyId);
        return lobby;
    }
}