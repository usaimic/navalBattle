import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { UserCreateService } from "src/domain/user/useCase/userCreate";
import { UserFindAllService } from "src/domain/user/useCase/userFindAll";
import { UserFindAllOrderByService } from "src/domain/user/useCase/userFindAllOrderBy";
import { UserFindByIdService } from "src/domain/user/useCase/userFindById";
import { UserFindByKeywordService } from "src/domain/user/useCase/userFindByKeyword";
import { UserUpdateService } from "src/domain/user/useCase/userUpdate";
import type { User } from "src/domain/user/User";

@Controller('users')
export class UsersController{

    constructor(
        private readonly userFindAllService: UserFindAllService,
        private readonly userFindAllOrderByService: UserFindAllOrderByService,
        private readonly userFindByIdService: UserFindByIdService,
        private readonly userFindByKeywordService: UserFindByKeywordService,
        private readonly userUpdateService: UserUpdateService,
        private readonly userCreateService: UserCreateService
    ) {}

    @Get()
    find(
        @Query('search') search?: string,
        @Query('orderClause') orderClause?: string, 
        @Query('orderType') orderType?: string): Promise<User[] | null>{
        
        if(search){
            return this.userFindByKeywordService.run(search);
        }else if(orderClause && orderType){
            return this.userFindAllOrderByService.run(orderClause, orderType);
        }else{
            return this.userFindAllService.run();
        }
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number): Promise<User | null>{
        return this.userFindByIdService.run(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updatedUser: User): Promise<User | null>{
        return this.userUpdateService.run(id, updatedUser);
    }

    @Post()
    create(@Body() newUser: User): Promise<User | null>{
        return this.userCreateService.run(newUser);
    }
}