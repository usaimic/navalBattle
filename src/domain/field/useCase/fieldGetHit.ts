import { Injectable } from "@nestjs/common";
import { FieldRepository } from "src/persistance/field/fieldRepository";
import { Field } from "../Field";

@Injectable()
export class FieldGetHitService{
    constructor(
        private fieldRepository: FieldRepository
    ){}
    
    async run(lobbyId: number, playerId: number): Promise<Field>{
        const field: Field = await this.fieldRepository.getByIdAndType(lobbyId, playerId, 'picked');
        return field;
    }
}
