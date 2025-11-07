import { Injectable } from "@nestjs/common";
import { Action } from "../Action";
import { ActionRepository } from "src/persistance/action/actionRepository";

@Injectable()
export class ActionFindByIdService{
    constructor(
        private actionRepository: ActionRepository
    ){}

    async run(actionId: number): Promise<Action | null>{
        return this.actionRepository.findById(actionId);
    }
}