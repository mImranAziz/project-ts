import {
  Controller,
  Get,
  Post,
  Body,
  Bind,
  Delete,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AddProductDto } from './addproduct.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(':id')
  getProduct(@Param('id') id: number) {
    const product = this.appService.getProduct(id);
    if (!product) {
      throw new NotFoundException(`product with id ${id} were not found`);
    } else {
      return product;
    }
  }

  @Get()
  getProducts() {
    return this.appService.getProducts();
  }

  @Post()
  // @Bind(Body() )
  AddProduct(@Body() ProductDto: AddProductDto) {
    return this.appService.upsertProduct(ProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    const product = this.appService.getProduct(id);
    if (!product) {
      throw new NotFoundException(`product with id ${id} were not found`);
    }
    return this.appService.deleteProduct(id);
  }
}
