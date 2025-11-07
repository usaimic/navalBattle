import { Injectable } from "@nestjs/common";
import { Field } from "src/domain/field/Field";
import { PrismaService } from "src/services/prisma/prisma.service";
import { action } from "generated/prisma/client";
import { MapActionEntityToActionModel } from "../action/actionMapper";
import { MapActionsToField } from "./fieldMapper";

@Injectable()
export class FieldRepository{
    constructor(private readonly prismaService: PrismaService){}

    //Used to find a list of action status
    async getByIdAndType(lobbyId: number, playerId: number, type: string): Promise<Field>{
        const events: action[] | null = await this.prismaService.action.findMany({
            where: {
                lobby_id: lobbyId, 
                player_id: playerId,
                status: type
            }
        })

        const field: Field = MapActionsToField(events.map(MapActionEntityToActionModel));
        return field;
    }
}