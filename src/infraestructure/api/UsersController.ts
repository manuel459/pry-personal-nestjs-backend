import { Body, Controller, Get, HttpStatus, Post, Query, Res } from "@nestjs/common";
import { Knex } from "knex";
import { Response } from 'express';
import { InjectKnex } from "nestjs-knex";
import { insertUsersDto, listUsersDto } from "src/application/dto/listUsersDto";
import {  ResponseHandler, requestGenericPaginate } from "src/application/IResponse";
import { userRepository } from "../repository/usersRepository";

@Controller('users')
export class UsersController {
    constructor(@InjectKnex() private readonly knex: Knex, private readonly _userRepository: userRepository){}

    @Get('')
    async getUsers(@Query() payload: requestGenericPaginate, @Res() res: Response){

        const response = new ResponseHandler();
        try {
            //const query: listUsersDto[] = await this.knex.select('*').from('user');
            const query = await this._userRepository.getAllUsers(payload);
            console.log(query);
            return res.json(response.succest(200,'exito', query));
        } catch (error) {
            console.error(error);
            return res.status(400).json(response.error(400,error.message));
        }
    }

    @Post('')
    insertUsers(@Body() request: insertUsersDto){
        const response = new ResponseHandler();

        try {
            
        } catch (error) {
            
        }
    }

}