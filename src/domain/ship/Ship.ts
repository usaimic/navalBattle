// export type shipChildStatus = "placed" | "hitted" | "null"
export type shipStatus = "alive" | "died" | "null"

export type ShipParent = {
    id: number, 
    dimension: number,
    hittedChild: number,
    status: shipStatus,
    playerId: number, 
    lobbyId: number
}


export type ShipChild = {
    id: number, 
    parentId: number,
    coordinates: shipChildCoordinates | null,
    status: shipStatus,
}

export type shipChildCoordinates = {
    x: number,
    y: number
}