import { Injectable } from "@nestjs/common";
import { FieldRepository } from "src/persistance/field/fieldRepository";
import { FieldGetPlacedService } from "./fieldGetPlaced";
import { Field } from "../Field";
import { LobbyGetOpponentIdService } from "src/domain/lobby/useCase/lobbyGetOpponentId";
import { Action } from "src/domain/action/Action";
import { ActionFindByIdService } from "src/domain/action/useCase/actionFindById";
import { ShipChild } from "src/domain/ship/Ship";
import { ShipChildFindByIdService } from "src/domain/ship/shipChild/useCase/shipChildFindById";
import { ShipParentChildHittedService } from "src/domain/ship/shipParent/useCase/shipParentChildHitted";
import { ShipChildHittedService } from "src/domain/ship/shipChild/useCase/shipChildHitted";

@Injectable()
export class FieldHitResponseService{
    constructor(
        private fieldRepository: FieldRepository,
        private fieldGetPlacedService: FieldGetPlacedService,
        private lobbyGetOpponentIdService: LobbyGetOpponentIdService,
        private actionFindByIdService: ActionFindByIdService,
        private shipChildFindByIdService: ShipChildFindByIdService,
        private shipParentChildHittedService: ShipParentChildHittedService,
        private shipChildHittedService: ShipChildHittedService
    ){}

    async run(actionId: number): Promise<boolean>{
        const isHitted: boolean = await this.checkHit(actionId);
        return isHitted;
    }
    
    async checkHit(actionId: number): Promise<boolean>{
        const action: Action | null = await this.actionFindByIdService.run(actionId);
        if(!action || action.status == 'placed'){
            console.log("FieldHitResponse.checkHit: Azione non esistente o non valida");
            return false;
        }

        const playerId: number = action.playerId;
        const lobbyId: number = action.lobbyId;
        const opponentId: number | null = await this.lobbyGetOpponentIdService.run(lobbyId, playerId);
        if(opponentId == null){
            console.log("FieldHitResponse.checkHit: OpponentId non trovato");
            return false;
        } 

        const opponentField: Field = await this.fieldGetPlacedService.run(lobbyId, opponentId);
        // console.log("opponentField:", opponentField);
        if(opponentField[action.x][action.y].status == 'placed'){
            const shipChildId: number | null = opponentField[action.x][action.y].shipId;
            if(shipChildId){
                const shipChild: ShipChild | null =  await this.shipChildFindByIdService.run(shipChildId);
                if(shipChild){
                    await this.shipChildHittedService.run(shipChild.id);
                    await this.shipParentChildHittedService.run(shipChild.parentId);
                }
            }
            return true;
        }
        return false;
    }
}