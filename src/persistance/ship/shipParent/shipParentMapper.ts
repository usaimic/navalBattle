import { shipParent } from "generated/prisma/client";
import { ShipParent } from "src/domain/ship/Ship";
import { enumShipStatus } from "../shipUtilities";

export function MapShipParentEntityToShipParentModel(entity: shipParent): ShipParent{
    const model: ShipParent = {
        id: entity.id,
        status: enumShipStatus(entity.status),
        dimension: entity.dimension,
        hittedChild: entity.hitted_child,
        playerId: entity.player_id,
        lobbyId: entity.lobby_id
    }
    return model;
}