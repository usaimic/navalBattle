import { Injectable } from "@nestjs/common";
import { ActionRepository } from "src/persistance/action/actionRepository";
import { Action } from "../Action";
import { FieldHitResponseService } from "src/domain/field/useCase/fieldHitResponse";

@Injectable()
export class ActionCreateService{
    constructor(
        private actionRepository: ActionRepository,
        private fieldHitResponseService: FieldHitResponseService
    ){}
    
    async run(action: Action): Promise<Action | null>{
        const createdAction: Action | null = await this.actionRepository.create(action);
        if(createdAction){
            const isHit: boolean = await this.fieldHitResponseService.run(createdAction.id);
        }
        return createdAction;
    }
}
