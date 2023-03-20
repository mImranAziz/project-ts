import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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

    it.skip('should delete a product by id', () => {
      jest.spyOn(appService, 'getProduct').mockImplementation(() => products[0]);
      jest.spyOn(appService, 'deleteProduct').mockImplementation(() => ({ response: "ok" }));
      expect(appController.deleteProduct(1)).toBe({ response: "ok" });
    });
  });
});
