import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/persistance/user/userRepository";
import { User } from "../User";

@Injectable()
export class UserCreateService{
    constructor(
        private userRepository: UserRepository
    ){}

    async run(newUser: User): Promise<User | null>{
        const user: User | null = await this.userRepository.create(newUser);
        return user;
    }
}