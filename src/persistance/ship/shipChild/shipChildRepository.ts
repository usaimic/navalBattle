import { Inject, Injectable } from "@nestjs/common";
import { shipChild } from "generated/prisma/client";
import { ShipChild } from "src/domain/ship/Ship";
import { PrismaService } from "src/services/prisma/prisma.service";
import { MapShipChildEntityToShipChildModel } from "./shipChildMapper";
import { BatchPayload } from "generated/prisma/internal/prismaNamespace";

@Injectable()
export class ShipChildRepository{
    constructor(
        private readonly prismaService: PrismaService
    ){
    }

    //Used to find a childShip by id
    async findById(shipId: number): Promise<ShipChild | null>{
        const ship: shipChild | null = await this.prismaService.shipChild.findUnique({
            where: {
                id: shipId
            }
        })

        if(!ship) throw new Error(`ShipChild with id: ${shipId} not found`)

        return MapShipChildEntityToShipChildModel(ship);
    }

    //Used to find chils by parentId
    async findByParentId(parentId: number): Promise<ShipChild[] | null>{
        const ships: shipChild[] | null = await this.prismaService.shipChild.findMany({
            where: {
                parent_id: parentId
            }
        })

        return ships.map(MapShipChildEntityToShipChildModel);
    }

    //Used to create childs
    async create(parentId: number): Promise<ShipChild | null>{
        const ship: shipChild | null = await this.prismaService.shipChild.create({
            data: {
                status: "placed",
                parent_id: parentId
            }
        })

        return MapShipChildEntityToShipChildModel(ship);
    }

    //Used to remove childs by parentId, returns number of removed elements
    async removeByParentId(parentId: number): Promise<number>{
        const removed: BatchPayload = await this.prismaService.shipChild.deleteMany({
            where: {
                parent_id: parentId
            }
        })

        return removed.count;
    }

    //Used to set the status of a ship
    async setStatusById(shipId: number, newStatus: string): Promise<ShipChild | null>{
        const updated: shipChild | null = await this.prismaService.shipChild.update({
            where: {
                id: shipId
            },
            data: {
                status: newStatus
            }
        })

        return MapShipChildEntityToShipChildModel(updated);
    }

    //Used to se coordinates
    async setXY(shipId: number, newX: number, newY: number): Promise<ShipChild | null>{
        const updated: shipChild | null = await this.prismaService.shipChild.update({
            where: {
                id: shipId
            },
            data: {
                x: newX,
                y: newY
            }
        })
        return MapShipChildEntityToShipChildModel(updated);
    }
}