import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/persistance/user/userRepository";
import { User } from "../User";

@Injectable()
export class UserUpdateService{
    constructor(
        private userRepository: UserRepository
    ){}
    
    async run(userId: number, updatedUser: User): Promise<User | null>{
        const user: User | null = await this.userRepository.update(userId, updatedUser);
        return user;
    }
}