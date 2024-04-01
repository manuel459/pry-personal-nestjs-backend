import { Knex } from "knex";
import { IuserRepository } from "../interfaces/IuserRepository";
import { requestGenericPaginate } from "src/application/IResponse";
import { InjectKnex } from "nestjs-knex";

export class userRepository implements IuserRepository {

    constructor(@InjectKnex() private readonly knex: Knex){}
    
    async getAllUsers(payload: requestGenericPaginate): Promise<any>{
        console.log(payload)
        const query = this.knex.select(
                                        'user.id as id_usuario',
                                        this.knex.raw(`CONCAT("user"."name", ' ', "user"."lastname") as nombre_usuario`),
                                        'user.email',
                                        this.knex.raw('upper("roles"."name") as descripcion_rol'),
                                        'user.active as estado_usuario'
                                    )
                                    .from('user')
                                    .innerJoin('roles', 'user.id_rol','roles.id');

        if(payload.filterOne) query.where('user.id', payload.filterOne);
        if(payload.filterTwo) query.where('roles.name', payload.filterTwo);
        if(payload.fecha_inicio && payload.fecha_fin) query.whereRaw(`cast("user"."createdAt" as date) >= '${payload.fecha_inicio}'`)
                                                           .whereRaw(`cast("user"."createdAt" as date) <= '${payload.fecha_fin}'`)

        if (payload.short == 'asc') 
          query.orderBy([{column: payload.order?payload.order:"user.id", order: "asc"}, {column: "user.createdAt", order: "asc"},]);
        else 
          query.orderBy([{column: payload.order?payload.order:"user.id", order: "desc"}, {column: "user.createdAt", order: "desc"},]);
        
        const result = await query.paginate({ perPage: payload.perPage, currentPage: payload.page, isLengthAware: true });

        return result;
    }
}