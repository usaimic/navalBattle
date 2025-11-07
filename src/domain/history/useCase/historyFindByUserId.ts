import { Injectable } from "@nestjs/common";
import { HistoryRepository } from "src/persistance/history/historyRepository";
import { History } from "../History";

@Injectable() 
export class HistoryFindByUserIdService{
    constructor(
        private historyRepository: HistoryRepository
    ){}

    async run(userId: number): Promise<History | null>{
        const history: History | null = await this.historyRepository.findByUserId(userId);
        return history;
    }
}