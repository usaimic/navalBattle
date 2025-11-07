import { history } from "generated/prisma/client";
import { History } from "src/domain/history/History";

export function MapHistoryEntityToHistoryModel(entity: history): History{
    const model: History = {
        id: entity.id,
        win: entity.win,
        lose: entity.lose,
        match: entity.match
    }

    return model;
}

export function enumResultType(result: string): string | null{
    if(result == "win" || result == "lose") return result;

    return null; 
}