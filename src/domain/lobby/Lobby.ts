import { Field } from "../field/Field"

export type Lobby = {
    id: number,
    idPlayer1: number | null,
    idPlayer2: number | null,
    startTime: Date | null,
    turn: number,
    isReady1: boolean,
    isReady2: boolean,
    winnerId: number | null,
    isPrivate: boolean,
}