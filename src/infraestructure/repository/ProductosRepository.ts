import { Knex } from "knex";
import { InjectKnex } from "nestjs-knex";
import { IProductosRepository } from "../interfaces/IProductosRepository";

export class ProductosRepository implements IProductosRepository {
    constructor(@InjectKnex() private readonly knex: Knex){}

    async getAll(sku: string, nombre: string){
        const query = this.knex('productos').select();
        if(sku && sku != 'null'){
            query.whereRaw(`sku like '%${sku}%'`)
        }
        if(nombre && nombre != 'null'){
            query.orWhereRaw(`nombre like '%${nombre}%'`);
        }

        return await query;
    }

    async getById(SKU:string){
        return await this.knex('productos').where('sku', SKU).first();
    }
}