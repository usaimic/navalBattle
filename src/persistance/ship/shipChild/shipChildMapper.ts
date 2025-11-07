import { shipChild } from "generated/prisma/client";
import { ShipChild } from "src/domain/ship/Ship";
import { enumShipStatus } from "../shipUtilities";

export function MapShipChildEntityToShipChildModel(entity: shipChild): ShipChild{
    const model: ShipChild = {
        id: entity.id,
        parentId: entity.parent_id,
        coordinates: (entity.x !== null && entity.y !== null) 
            ? {x: entity.x, y: entity.y}
            : null,
        status: enumShipStatus(entity.status)
    }
    return model;
}