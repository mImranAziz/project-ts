import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  NotFoundException,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ProductDto } from './product.dto';
import { ApiParam, ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiBody } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiOkResponse({ description: 'Product details', type: ProductDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @Get(':id')
  getProduct(@Param('id') id: number) {
    const product = this.appService.getProduct(id);
    if (!product) {
      throw new NotFoundException(`product with id ${id} were not found`);
    } else {
      return product;
    }
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({ description: 'Products', type: [ProductDto] })
  @ApiNotFoundResponse({ description: 'Products not found' })
  @Get()
  getProducts() {
    return this.appService.getProducts();
  }

  @ApiOperation({ summary: 'Add a product' })
  @ApiOkResponse({ description: 'Add a product' })
  @ApiBody({ type: [ProductDto] })
  @Post()
  async AddProduct(@Body() ProductDto: [ProductDto]) {
    ProductDto.forEach((p) => {
      if (!p.id || !p.title || !p.price) {
        throw new BadRequestException('Missing required fields: id, title, or price');
      }
    });
    return await this.appService.upsertProduct(ProductDto);
  }

  @ApiOperation({ summary: 'Delete product by ID', description: 'Deletes a product with the specified ID' })
  @ApiParam({ name: 'id', description: 'The ID of the product to delete', type: 'integer', required: true })
  @ApiOkResponse({ description: 'The deleted product' })
  @ApiNotFoundResponse({ description: 'The product with the specified ID was not found' })
  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    const product = this.appService.getProduct(id);
    if (!product) {
      throw new NotFoundException(`product with id ${id} were not found`);
    }
    return this.appService.deleteProduct(id);
  }
}
