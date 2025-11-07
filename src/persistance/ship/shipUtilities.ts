import { shipStatus } from "src/domain/ship/Ship";

export function enumShipStatus(status: string): shipStatus{
    switch(status){
        case "alive":
        case "died":
            return status;
        default: 
            return "null"
    }
}