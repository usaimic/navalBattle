import { action} from "generated/prisma/client";
import { Action } from "src/domain/action/Action";
import { enumActionStatus } from "./actionUtilities";
import { actionCreateInput } from "generated/prisma/models";

export function MapActionEntityToActionModel(entity: action): Action{
    const model: Action = {
        id: entity.id,
        status: enumActionStatus(entity.status),
        x: entity.x,
        y: entity.y,
        shipId: entity.ship_id ? entity.ship_id : null,
        lobbyId: entity.lobby_id,
        playerId: entity.player_id
    };
    
    return model;
}

export function MapActionModelToActionEntity(model: Action): actionCreateInput{
    const entity: actionCreateInput = {
        status: enumActionStatus(model.status),
        x: model.x,
        y: model.y,
        lobby:{
            connect:{
                id: model.lobbyId
            }
        },
        player:{
            connect:{
                id: model.playerId
            }
        },
        ship: 
            undefined
    }
    return entity;
}