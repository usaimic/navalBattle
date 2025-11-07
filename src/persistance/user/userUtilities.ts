import { Prisma } from "generated/prisma/client";

export type userOrderClause = 'win' | 'lose' | 'rateo' | 'username' | 'match'

export function enumUserOrderClause(clause: string): userOrderClause{
    switch(clause){
        case 'win':
        case 'lose':
        case 'rateo':
        case 'match':
            return clause;
        default:
            return 'username'
    }
}

export function enumOrderType(order: string): Prisma.SortOrder{
    if(order == "desc") 
        return "desc";
    else                
        return "asc";    
}
