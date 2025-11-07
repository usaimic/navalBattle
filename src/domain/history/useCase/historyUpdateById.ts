import { Injectable } from "@nestjs/common";
import { HistoryRepository } from "src/persistance/history/historyRepository";
import { History } from "../History";
import { enumResultType } from "src/persistance/history/historyMapper";

@Injectable()
export class HistoryUpdateByIdService{
    constructor (
        private historyRepository: HistoryRepository
    ){}

    async run(userId: number, result: string): Promise<History| null>{
        //Creo l'oggetto aggiornato 
        const newHistory: History | null = await this.dispatch(userId, result);
        
        if(!newHistory){
            console.log("HistoryUpdate: History non trovata");
            return null;
        }    
        
        //Se esiste lo carico 
        const updated: History | null = await this.historyRepository.updateById(newHistory);
        return updated;
    }

    async dispatch(userId: number, result: string): Promise<History | null>{
        const old: History | null = await this.historyRepository.findByUserId(userId);
        if(!old){
            console.log("HistoryUpdate.Dispatch: Vecchia history non trovata");
            return null;
        }

        const resultType: string | null = enumResultType(result);
        if(!resultType){
            console.log("HistoryUpdate.Dispatch: Passato risultato non valido")
            return old;
        }

        const newHistory: History = {
            ...old, 
            win: resultType === 'win' ? old.win + 1 : old.win,
            lose: resultType === 'lose' ? old.lose + 1 : old.lose,
            match: old.match + 1
        }

        return newHistory;
    }
}