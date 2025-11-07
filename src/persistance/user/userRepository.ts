import { Injectable } from "@nestjs/common";
import { Prisma, users } from "generated/prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";
import { MapUserEntityToUserModel, MapUserModelToUserEntity } from "./userMapper";
import { User } from "src/domain/user/User";

@Injectable()
export class UserRepository{
    constructor(private prisma: PrismaService) {}

    //Used to show ranking
    async findAll(): Promise<User[] | null>{
        const users: users[] | null = await this.prisma.users.findMany();
        return users.map(MapUserEntityToUserModel);
    }

    async findAllUsernameOrder(order: Prisma.SortOrder){
        const users: users[] | null = await this.prisma.users.findMany({
            orderBy: {
                username: order
            }
        })

        return users.map(MapUserEntityToUserModel);
    }
    async findAllWinOrder(order: Prisma.SortOrder): Promise<User[] | null>{
        const users: users[] | null = await this.prisma.users.findMany({
            orderBy: {
                history: {
                    win: order
                }
            }
        });
        
        return users.map(MapUserEntityToUserModel);
    }

    async findAllLoseOrder(order: Prisma.SortOrder): Promise<User[] | null>{
        const users: users[] | null = await this.prisma.users.findMany({
            orderBy: {
                history: {
                    lose: order
                }
            }
        })

        return users.map(MapUserEntityToUserModel);
    }

    async findAllMatchOrder(order: Prisma.SortOrder): Promise<User[] | null>{
        const users: users[] | null = await this.prisma.users.findMany({
            orderBy: {
                history: {
                    match: order
                }
            }
        })

        return users.map(MapUserEntityToUserModel);
    }

    async findAllRatioOrder(order: Prisma.SortOrder): Promise<User[] | null>{
        const users: users[] | null = await this.prisma.$queryRaw`
            SELECT
                u.*
            FROM 
                "history" as h 
            INNER JOIN 
                "users" as u ON h."userId" = u.id
            ORDER BY 
                CASE 
                    WHEN h.lose = 0 
                        THEN h.win 
                    ELSE 
                        CAST(h.win AS REAL) / h.lose
                END 
                ${order},
            h.win ${order};
        `;

        if(!users)  return null;
        return users.map(MapUserEntityToUserModel);
    }

    //Find user info by ID
    async findById(id: number): Promise<User | null> {
        const user: users | null = await this.prisma.users.findUnique({
            where: {
                id: id
            }
        })

        if(!user) throw new Error (`User with id: ${id} not found`)

        return MapUserEntityToUserModel(user);
    }

    //Find user info by name, surname or username by keyword
    async findByNameSurnameUsername(keyword: string): Promise<User[] | null> {
        const users: users[] | null = await this.prisma.users.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: keyword,
                            mode: 'insensitive'
                        }
                    },
                    {
                        surname: {
                            contains: keyword,
                            mode: 'insensitive'
                        }
                    },
                    {
                        username: {
                            contains: keyword,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        });

        if(!users) throw new Error(`Users with keyword:${keyword} not found`)

        return users.map(MapUserEntityToUserModel)
    }

    //Used to update a user by id
    async update(userId: number, updatedUser: User): Promise<User | null>{
        const user: users | null = await this.prisma.users.update({
            where: {
                id: userId
            },
            data: MapUserModelToUserEntity(updatedUser)
        })

        return MapUserEntityToUserModel(user);
    }

    //User to create new user
    async create(newUser: User): Promise<User | null>{
        const user: users | null = await this.prisma.users.create({
            data: MapUserModelToUserEntity(newUser)
        })

        return MapUserEntityToUserModel(user);
    }
}