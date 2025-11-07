import { Injectable } from "@nestjs/common";
import { action } from "generated/prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";
import { MapActionEntityToActionModel, MapActionModelToActionEntity } from "./actionMapper";
import { Action } from "src/domain/action/Action";
import { BatchPayload } from "generated/prisma/internal/prismaNamespace";
import { getLastAction } from "./actionUtilities";

@Injectable()
export class ActionRepository{
    constructor(private prismaService: PrismaService){}

    //Used to find action by id
    async findById(actionId: number): Promise<Action | null>{
        const action: action | null = await this.prismaService.action.findUnique({
            where: {
                id: actionId
            }
        })

        if(!action) throw new Error(`Action with id: ${actionId} not found`);

        return MapActionEntityToActionModel(action);
    }

    //Used to find a list of action from a player in a lobby
    async findByLobbyIdPlayerId(lobbyId: number, playerId: number): Promise<Action[] | null>{
        const actions: action[] | null = await this.prismaService.action.findMany({
            where: {
                lobby_id: lobbyId,
                player_id: playerId,
            }
        });

        return actions.map(MapActionEntityToActionModel);
    }

    //Used to remove all the event recorded for a lobby on the end game
    async removeByLobbyId(lobbyId: number): Promise<number>{
        //BatchPayload: {count: 5}
        const removed: BatchPayload = await this.prismaService.action.deleteMany({
            where: {
                lobby_id: lobbyId
            }
        });

        return removed.count;
    }

    //Used to create an action
    async create(newAction: Action): Promise<Action | null>{
        const createdAction = await this.prismaService.action.create({
            data: MapActionModelToActionEntity(newAction)
        })

        return MapActionEntityToActionModel(createdAction); 
    }

    //undo
    async removeLastByLobbyIdPLayerId(lobbyId: number, playerId: number): Promise<Action | null>{
        const actions: Action[] | null = await this.findByLobbyIdPlayerId(lobbyId, playerId);
        if(actions){
            const lastId: number = getLastAction(lobbyId, playerId, actions);
            const removed: action | null = await this.prismaService.action.delete({
                where: {
                    id: lastId
                }
            })
            return MapActionEntityToActionModel(removed);
        }
        return null;
    }
}