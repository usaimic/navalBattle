import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/persistance/user/userRepository";
import { enumOrderType, enumUserOrderClause, userOrderClause } from "src/persistance/user/userUtilities";
import { User } from "../User";
import { Prisma } from "generated/prisma/client";

@Injectable()
export class UserFindAllOrderByService{
    constructor(
        private userRepository: UserRepository
    ){}

    async run(orderClause: string, orderType: string): Promise<User[] | null>{
        const users: User[] | null = await this.findDispatcher(orderClause, orderType);
        return users;
    }

    async findDispatcher(orderClause: string, orderType: string): Promise<User[] | null>{
        const order: Prisma.SortOrder = enumOrderType(orderType);
        switch(enumUserOrderClause(orderClause)){
            case "win":
                return await this.userRepository.findAllWinOrder(order);
            case "lose":
                return await this.userRepository.findAllLoseOrder(order);
            case "rateo":
                return await this.userRepository.findAllRatioOrder(order);
            case "match":
                return await this.userRepository.findAllMatchOrder(order);
            default: //username
                return await this.userRepository.findAllUsernameOrder(order);
        }
    }
}