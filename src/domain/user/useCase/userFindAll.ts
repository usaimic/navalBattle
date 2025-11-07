import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/persistance/user/userRepository";
import { User } from "../User";

@Injectable()
export class UserFindAllService{
    constructor(
        private userRepository: UserRepository
    ) {}

    async run(): Promise<User[] | null> {
        const users: User[] | null = await this.userRepository.findAll();
        return users;
    }
}