import { Action, actionStatus } from "src/domain/action/Action";

export function enumActionStatus(status: string): actionStatus{
    switch(status){
        case 'placed':
            return status;
        default:
            return 'picked';
    }
}

export function getLastAction(lobbyId: number, playerId: number, actions: Action[]): number{
    actions.sort((a, b) => b.id - a.id);
    const lastActionId: number = actions[0].id;
    return lastActionId;
}
