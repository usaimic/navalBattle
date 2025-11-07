import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/persistance/user/userRepository";
import { User } from "../User";

@Injectable() 
export class UserFindByIdService{
    constructor(
        private userRepository: UserRepository
    ) {}

    async run(id: number): Promise<User | null>{
        const user: User | null = await this.userRepository.findById(id);
        return user;
    }
}