import { Controller, Get, Query, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ProductosServices } from "src/application/services/ProductosService";
import { ProductosRepository } from "../repository/ProductosRepository";
import { Response } from 'express';
import { getAllProductObject } from "src/application/dto/getAllProductObject";

@ApiBearerAuth()
@ApiTags('productos')
@Controller('productos')
export class ProductosController {
    private readonly _productService: ProductosServices;
    constructor(private productosRepository: ProductosRepository){
        this._productService = new ProductosServices(productosRepository);
    }

    @Get('')
    async getAll(@Query() payload: getAllProductObject, @Res() res:Response){
        const response = await this._productService.getAll(payload.sku, payload.nombre);
        return res.status(response.status).json(response);
    }
}