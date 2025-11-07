import { Action } from "src/domain/action/Action";
import { Field, fieldCell } from "src/domain/field/Field";


export function createFreeField(): Field{
    const col: number = 10;
    const row: number = 10;

    const field: Field = Array.from({length: row}, () => {
        return Array.from({length: col}, () => ({
            status: 'free',
            shipId: null
        }))
    });
    
    return field;
}

export function fillFieldCells(events: Action[]): Field{
    const field: Field = createFreeField();
    
    events
    .forEach((event) => {
        field[event.x][event.y].status = event.status;
        if(event.status == 'placed'){
            field[event.x][event.y].shipId = event.shipId;
        }
    })

    return field;
}

export function generateMergeField(defensiveField: Field, attackingField: Field): Field{
    const finalField: Field = createFreeField();
    finalField.forEach((row, i) => {
        row.forEach((column, j) => {
            if(attackingField[i][j].status == 'picked' && defensiveField[i][j].status == 'free') 
                finalField[i][j].status = 'miss'
            else if(attackingField[i][j].status == 'picked' && defensiveField[i][j].status == 'placed'){
                finalField[i][j].status = 'hitted'
                finalField[i][j].shipId = defensiveField[i][j].shipId
            }
            else
                finalField[i][j].status = 'free'
        })
    })
    
    return finalField;
}