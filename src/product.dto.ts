import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
    @ApiProperty({ required: true })
    id: Number;

    @ApiProperty({ required: true })
    title: string;

    @ApiProperty({ required: true })
    price: Number;

    @ApiProperty({ default: false })
    deleted: boolean;
};
