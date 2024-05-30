import { Module } from "@nestjs/common";
import { UsersController } from "./api/UsersController";
import { UserRepository } from "./repository/UsersRepository";
import { AuthController } from "./api/AuthController";
import { AuthServices } from "src/application/services/AuthService";
import { UserServices } from "src/application/services/userService";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JWSToken } from "./const/JWSToken";
import { JWTStrategy } from "./jwt.strategy";
import { PedidosController } from "./api/PedidosController";
import { ProductosRepository } from "./repository/ProductosRepository";
import { PedidosRepository } from "./repository/PedidosRespository";
import { PedidosServices } from "src/application/services/PedidosService";

@Module({
    imports: [
        JwtModule.register({
        global: true,
        secret: JWSToken.secret,
        secretOrPrivateKey: JWSToken.secret,
        signOptions: { expiresIn: '1h' },
      })
    ],
    controllers: [
        UsersController,
        AuthController,
        PedidosController
    ],
    providers: [
        AuthServices,
        UserServices,
        UserRepository,
        ProductosRepository,
        PedidosServices,
        PedidosRepository,
        JWTStrategy
    ]
  })
  
  export class UsersModule {}