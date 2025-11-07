import { Injectable } from "@nestjs/common";
import { ShipChildRepository } from "src/persistance/ship/shipChild/shipChildRepository";
import { ShipChildSetStatusByIdService } from "./shipChildSetStatusById";
import { ShipChildSetXYService } from "./shipChildSetXY";
import { ShipChild } from "../../Ship";
import { Action } from "src/domain/action/Action";
import { ActionCreateService } from "src/domain/action/useCase/actionCreate";

@Injectable()
export class ShipChildPlaceService{
    constructor(
        private shipChildSetStatusByIdService: ShipChildSetStatusByIdService,
        private shipChildSetXYService: ShipChildSetXYService,
        private actionCreateService: ActionCreateService
    ){}

    async run(playerId: number, lobbyId: number, shipId: number, newStatus: string, newX: number, newY:number): Promise<ShipChild | null>{
        const updatedStatusChild: ShipChild | null = await this.shipChildSetStatusByIdService.run(shipId, newStatus);
        const updatedCoordinatesChild: ShipChild | null = await this.shipChildSetXYService.run(shipId, newX, newY);
        const action: Action | null = await this.createAction(playerId, lobbyId, shipId, newX, newY)
        return updatedCoordinatesChild;
    }

    async createAction(playerId: number, lobbyId: number, shipId: number, newX: number, newY: number): Promise< Action | null>{
        const newAction: Action = {
            id: 0,
            playerId: playerId,
            shipId: shipId,
            lobbyId: lobbyId,
            x: newX,
            y: newY,
            status: 'placed'
        }
        const created: Action | null = await this.actionCreateService.run(newAction);
        return created;
    }
}