export type actionStatus = 'placed' | 'picked'

export type Action = {
    id: number,
    status: actionStatus,
    x: number,
    y: number,
    shipId: number | null,
    lobbyId: number,
    playerId: number
}