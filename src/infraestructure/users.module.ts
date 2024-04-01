import { Module } from "@nestjs/common";
import { UsersController } from "./api/UsersController";
import { userRepository } from "./repository/usersRepository";

@Module({
    imports: [],
    controllers: [
        UsersController
    ],
    providers: [
        userRepository
    ]
  })
  
  export class UsersModule {}