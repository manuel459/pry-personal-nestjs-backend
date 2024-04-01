import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nestjs-knex';
import { UsersController } from './infraestructure/api/UsersController';
import { UsersModule } from './infraestructure/users.module';
import { attachPaginate } from 'knex-paginate';

attachPaginate();
@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: 'pg',
          connection: {
            host: 'localhost',//process.env.MYSQL_HOST,
            user: 'postgres',//process.env.MYSQL_USER,
            port: 5432,//process.env.MYSQL_PORT,
            password: 'root', //process.env.MYSQL_PASSWORD,
            database: 'postgres' //process.env.MYSQL_DATABASE,
          }
        },
      }),
    }), UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
