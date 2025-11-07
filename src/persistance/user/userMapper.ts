import { users } from "generated/prisma/client";
import { usersCreateInput, usersUpdateInput } from "generated/prisma/models";
import { User } from "src/domain/user/User";

//Map from user prisma model to user business model 
export function MapUserEntityToUserModel (entity: users): User{
    const model: User = {
        id : entity.id,
        name: entity.name,
        surname: entity.surname,
        username: entity.username,
        email: entity.email,
    };

    return model;
} 

export function MapUserModelToUserEntity (model: User): usersCreateInput{
    const entity: usersCreateInput = {
        name: model.name,
        surname: model.surname,
        username: model.username,
        //da spostare in loginInfo
        email: model.email,
        //da spostare in loginInfo
        password: "update",
        //da gestire diversamente se siamo su update o create
        history:{
            create: {
                win: 0,
                lose: 0,
                match: 0
            } 
        }
    };

    return entity;
}