import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/persistance/user/userRepository";
import { User } from "../User";

@Injectable() 
export class UserFindByKeywordService{
    constructor(
        private userRepository: UserRepository
    ) {}

    async run(search: string): Promise<User[] | null>{
        const users: User[] | null = await this.userRepository.findByNameSurnameUsername(search);
        return users;
    }
}