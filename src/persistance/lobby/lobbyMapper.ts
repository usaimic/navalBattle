import { lobby } from "generated/prisma/client";
import { Lobby } from "src/domain/lobby/Lobby";

export function MapLobbyEntityToLobbyModel (entity: lobby): Lobby{
    const model: Lobby = {
        id: entity.id,
        idPlayer1: entity.user1_id,
        idPlayer2: entity.user2_id,
        startTime: entity.play_time,
        winnerId: entity.winner_id,
        isPrivate: entity.is_private,
        isReady1: entity.is_ready1,
        isReady2: entity.is_ready2,
        turn: entity.turn
    };

    return model; 
}
