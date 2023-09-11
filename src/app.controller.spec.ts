import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { skip } from 'rxjs';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let products = [
    {
      id: 1,
      title: 'Product 1',
      price: 10,
      deleted: false
    },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return all products', () => {
      jest.spyOn(appService, 'getProducts').mockImplementation(() => products);
      expect(appController.getProducts()).toBe(products);
    });

    it('should return a product by id', () => {
      jest.spyOn(appService, 'getProduct').mockImplementation(() => products[0]);
      expect(appController.getProduct(1)).toBe(products[0]);
    });

    describe('deleteProduct', () => {
      it('should delete a product with a valid id', () => {
        const id = 1;
        const appServiceSpy = jest.spyOn(appService, 'getProduct').mockReturnValue({ id } as any);
        const deleteProductSpy = jest.spyOn(appService, 'deleteProduct').mockReturnValue({ id } as any);

        const result = appController.deleteProduct(id);

        expect(appServiceSpy).toHaveBeenCalledWith(id);
        expect(deleteProductSpy).toHaveBeenCalledWith(id);
        expect(result).toEqual({ id });
      });

      it('should throw a NotFoundException with an invalid id', () => {
        const id = 1;
        const appServiceSpy = jest.spyOn(appService, 'getProduct').mockReturnValue(undefined);

        expect(() => appController.deleteProduct(id)).toThrow(NotFoundException);
        expect(appServiceSpy).toHaveBeenCalledWith(id);
      });
    });
  });

  describe('AddProduct', () => {
    it('should add products with valid data', async () => {
      const productDto: any = [
        { id: 1, title: 'Product 1', price: 10 },
        { id: 2, title: 'Product 2', price: 20 },
      ];
      const appServiceSpy = jest.spyOn(appService, 'upsertProduct').mockResolvedValue(productDto);
      const result = await appController.AddProduct(productDto);
      expect(appServiceSpy).toHaveBeenCalledWith(productDto);
      expect(result).toEqual(productDto);
    });

    it('should throw BadRequestException with invalid data', async () => {
      const invalidProductDto: any = [
        { id: 1, title: 'Product 1', price: 10 },
        { id: 2, title: 'Product 2' }, // missing price field
      ];

      try {
        await appController.AddProduct(invalidProductDto);
        fail('Expected exception to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Missing required fields: id, title, or price');
      }
    });
  });
});
