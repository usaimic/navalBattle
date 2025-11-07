import { Field } from "src/domain/field/Field";
import { fillFieldCells } from "./fieldUtilities";
import { Action } from "src/domain/action/Action";

export function MapActionsToField(actions : Action[]){
    const field: Field = fillFieldCells(actions);
    return field;
}
