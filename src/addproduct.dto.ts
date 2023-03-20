import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class AddProductDto {
    @ApiProperty()
    product: ProductDto
}

