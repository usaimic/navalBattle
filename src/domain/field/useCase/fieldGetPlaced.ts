import { Injectable } from "@nestjs/common";
import { FieldRepository } from "src/persistance/field/fieldRepository";
import { Field } from "../Field";

@Injectable()
export class FieldGetPlacedService{
    constructor(
        private fieldReposiotry: FieldRepository
    ){}
    
    async run(lobbyId: number, playerId: number): Promise<Field>{
        const field: Field = await this.fieldReposiotry.getByIdAndType(lobbyId, playerId, 'placed');
        return field;
    }
}