import { Injectable } from "@nestjs/common";
import { shipParent } from "generated/prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";
import { MapShipParentEntityToShipParentModel } from "./shipParentMapper";
import { ShipParent } from "src/domain/ship/Ship";
import { BatchPayload } from "generated/prisma/internal/prismaNamespace";

@Injectable()
export class ShipParentRepository{
    constructor(private readonly prismaService: PrismaService){}

    //Used to find a ship by id
    async findById(shipId: number): Promise<ShipParent | null>{
        const ship: shipParent | null = await this.prismaService.shipParent.findUnique({
            where:{
                id: shipId
            }
        })

        if(!ship) throw new Error(`ShipParent with id: ${shipId} not found`)

        return MapShipParentEntityToShipParentModel(ship);
    }

    //Used to find all the ships of a player from a lobby
    async findByLobbyIdPlayerId(lobbyId: number, playerId: number): Promise<ShipParent[] | null>{
        const ships: shipParent[] | null = await this.prismaService.shipParent.findMany({
            where: {
                lobby_id: lobbyId,
                player_id: playerId
            }
        })

        return ships.map(MapShipParentEntityToShipParentModel);
    }

    //Used to create shipParent
    async create(playerId: number, lobbyId: number, dimension: number): Promise<ShipParent | null>{
        const ship: shipParent | null = await this.prismaService.shipParent.create({
            data: {
                dimension: dimension,
                hitted_child: 0,
                status: "alive",
                player_id: playerId,
                lobby_id: lobbyId
            }
        })

        return MapShipParentEntityToShipParentModel(ship);
    }

    //Used to remove by Id, childs are removed on cascade
    async removeById(parentId: number): Promise<ShipParent | null>{
        const removed: shipParent | null = await this.prismaService.shipParent.delete({
            where: {
                id: parentId
            }
        })

        return MapShipParentEntityToShipParentModel(removed);
    }

    //Used to set status
    async setStatusById(parentId: number, newStatus: string): Promise<ShipParent | null>{
        const updated: shipParent | null = await this.prismaService.shipParent.update({
            where: {
                id: parentId
            },
            data: {
                status: newStatus
            }
        })

        return MapShipParentEntityToShipParentModel(updated);
    }

    async childHitted(parentId: number): Promise<ShipParent | null>{
        const updated: shipParent | null = await this.prismaService.shipParent.update({
            where: {
                id: parentId
            },
            data: {
                hitted_child: {
                    increment: 1
                }
            }
        })

        return MapShipParentEntityToShipParentModel(updated);
    }

    async removeByLobbyID(lobbyId: number): Promise<number>{
        const removed: BatchPayload = await this.prismaService.shipParent.deleteMany({
            where: {
                lobby_id: lobbyId
            }
        })

        return removed.count;
    }
}