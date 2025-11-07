import { Injectable } from "@nestjs/common";
import { history } from "generated/prisma/client";
import { History } from "src/domain/history/History";
import { PrismaService } from "src/services/prisma/prisma.service";
import { MapHistoryEntityToHistoryModel } from "./historyMapper";

@Injectable()
export class HistoryRepository{
    constructor(private prismaService: PrismaService){}
    
    async findByUserId(id: number): Promise<History | null>{
        const record: history | null = await this.prismaService.history.findUnique({
            where: {
                userId: id
            }
        })

        if(!record) throw new Error(`History with userId: ${id} not found`)
        
        return MapHistoryEntityToHistoryModel(record);
    }

    async updateById(updatedRecord: History): Promise<History | null>{ 
        const updated: history | null = await this.prismaService.history.update({
            where: {
                id: updatedRecord.id
            },
            data: {
                win: updatedRecord.win,
                lose: updatedRecord.lose,
                match: updatedRecord.match
            }
        })

        return MapHistoryEntityToHistoryModel(updated);
    }
    
}