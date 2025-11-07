import { Injectable } from "@nestjs/common";
import { lobby } from "generated/prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";
import { MapLobbyEntityToLobbyModel } from "./lobbyMapper";
import { Lobby } from "src/domain/lobby/Lobby";

@Injectable()
export class LobbyRepository{
    constructor(private readonly prismaService: PrismaService){}

    //Used to find a lobby by ID
    async findById(id: number): Promise<Lobby | null>{
        const lobby: lobby | null = await this.prismaService.lobby.findUnique({
            where: {
                id: id
            }
        });

        if(!lobby) throw new Error (`Lobby with id: ${id} not found`)

        return MapLobbyEntityToLobbyModel(lobby);
    }

    //Used to find the list of lobby where player plays by playerId 
    async findByPlayerId(playerId: number): Promise<Lobby[] | null>{
        const lobbies: lobby[] | null = await this.prismaService.lobby.findMany({
            where: {
                OR: [
                    {
                        user1_id: playerId
                    },
                    {
                        user2_id: playerId
                    }
                ]
            }
        })

        return lobbies.map(MapLobbyEntityToLobbyModel)
    }

    //Used to find the list of lobby where player win by winnerId
    async findByWinnerId(winnerId: number): Promise<Lobby[] | null>{
        const lobbies: lobby[] | null = await this.prismaService.lobby.findMany({
            where: {
                winner_id: winnerId
            }
        });

        return lobbies.map(MapLobbyEntityToLobbyModel);
    }

    //Used to create lobby
    async createLobby(ownerId:number, isPrivate: boolean): Promise<Lobby | null>{
        const lobby: lobby | null = await this.prismaService.lobby.create({
            data: {
                user1_id: ownerId,
                is_private: isPrivate,
                is_ready1: false,
                is_ready2: false,
                turn: -1
            }
        })

        return MapLobbyEntityToLobbyModel(lobby);
    }

    //Used to set the privacy
    async setPrivacyById(lobbyId: number, isPrivate: boolean): Promise<Lobby | null>{
        const updatedLobby: lobby | null = await this.prismaService.lobby.update({
            where: {
                id: lobbyId
            },
            data: {
                is_private: isPrivate
            }
        })

        return MapLobbyEntityToLobbyModel(updatedLobby)
    }
    
    //Used to set the winnerId
    async setWinnerId(lobbyId: number, winnerId: number): Promise<Lobby | null>{
        const updatedLobby: lobby | null = await this.prismaService.lobby.update({
            where: {
                id: lobbyId
            },
            data: {
                winner_id: winnerId,
                play_time: new Date()
            }
        })

        return MapLobbyEntityToLobbyModel(updatedLobby);
    }

    //Used to join in a private lobby
    async joinByLobbyId(lobbyId: number, guestId: number): Promise<Lobby | null>{
        const updatedLobby: lobby | null = await this.prismaService.lobby.update({
            where: {
                id: lobbyId
            },
            data: {
                user2_id: guestId
            }
        })

        return MapLobbyEntityToLobbyModel(updatedLobby)
    }

    //Used to find lobbies available with one player
    async findLobbiesWithOnePlayer(): Promise<Lobby []| null>{
        const lobbies: lobby[] | null = await this.prismaService.lobby.findMany({
            where: {
                user2_id: null,
                winner_id: null

            }
        })

        return lobbies.map(MapLobbyEntityToLobbyModel);
    }

    async setReadyByLobbyIdUserId(lobbyId: number, userId: number): Promise<Lobby | null>{
        const lobby: lobby | null = await this.prismaService.lobby.findUnique({
            where: {
                id: lobbyId,
            }
        })

        if(!lobby || (lobby.user1_id != userId && lobby.user2_id != userId))  return null;
        
        if(lobby.user1_id == userId){
            const lobby: lobby| null = await this.prismaService.lobby.update({
                where: {
                    id: lobbyId,
                },
                data: {
                    is_ready1: true
                }
            })
            return MapLobbyEntityToLobbyModel(lobby);
        }

        if(lobby.user2_id == userId){
            const lobby: lobby | null = await this.prismaService.lobby.update({
                where: {
                    id: lobbyId
                },
                data: {
                    is_ready2: true
                }
            })
            return MapLobbyEntityToLobbyModel(lobby);
        }

        return null;
    }

    async updateTurnById(lobbyId: number, newTurn: number){
        const updated: lobby | null = await this.prismaService.lobby.update({
            where: {
                id: lobbyId,
            },
            data: {
                turn: newTurn
            }
        })

        return MapLobbyEntityToLobbyModel(updated);
    }
}