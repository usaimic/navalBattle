import { Injectable } from "@nestjs/common";
import { FieldRepository } from "src/persistance/field/fieldRepository";
import { Field } from "../Field";
import { FieldGetHitService } from "./fieldGetHit";
import { FieldGetPlacedService } from "./fieldGetPlaced";
import { generateMergeField } from "src/persistance/field/fieldUtilities";

@Injectable()
export class FieldGetFinalViewService{
    constructor(
        private fieldRepository: FieldRepository,
        private readonly fieldGetHitService: FieldGetHitService,
        private readonly fieldGetPlacedService: FieldGetPlacedService
    ){}
    
    async run(lobbyId: number, defId: number, attId: number): Promise<Field>{
        const field: Field = await this.generateFinalField(lobbyId, defId, attId);
        return field;
    }

    async generateFinalField(lobbyId: number, defId: number, attId: number): Promise<Field>{
        const defensiveField: Field = await this.fieldGetPlacedService.run(lobbyId, defId);
        const attackingField: Field = await this.fieldGetHitService.run(lobbyId, attId);
        const finalField: Field = generateMergeField(defensiveField, attackingField);
        return finalField;
    }
}