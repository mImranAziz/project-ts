import { AppService } from './app.service';
const fs = require('fs');

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

describe('AppService', () => {
  let appService: AppService;

  beforeEach(() => {
    jest.clearAllMocks();
    appService = new AppService();
  });

  describe('getProduct', () => {
    it('should return a product by ID', () => {
      const mockData = {
        products: [
          {
            id: 1,
            name: 'Product 1',
            price: 10.0,
            deleted: false,
          },
          {
            id: 2,
            name: 'Product 2',
            price: 20.0,
            deleted: false,
          },
        ],
      };
      (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockData));

      const expectedProduct = {
        id: 1,
        name: 'Product 1',
        price: 10.0,
        deleted: false,
      };
      const result = appService.getProduct(1);
      expect(result).toEqual(expectedProduct);
    });

    it('should return undefined for a non-existent product', () => {
      const mockData = {
        products: [
          {
            id: 1,
            name: 'Product 1',
            price: 10.0,
            deleted: false,
          },
          {
            id: 2,
            name: 'Product 2',
            price: 20.0,
            deleted: false,
          },
        ],
      };
      (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockData));

      const result = appService.getProduct(999);
      expect(result).toBeUndefined();

      expect(fs.readFileSync).toHaveBeenCalledTimes(1);
      expect(fs.readFileSync).toHaveBeenCalledWith('data.json', 'utf8');
    });
  });

  describe('getProducts', () => {
    it('should return all not deleted products', () => {
      const mockData = {
        products: [
          {
            id: 1,
            name: 'Product 1',
            price: 10.0,
            deleted: false,
          },
          {
            id: 2,
            name: 'Product 2',
            price: 20.0,
            deleted: true,
          },
        ],
      };
      (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockData));

      const expectedProducts = [{
        id: 1,
        name: 'Product 1',
        price: 10.0,
        deleted: false,
      }];
      const result = appService.getProducts();
      expect(result).toEqual(expectedProducts);
    });

    it('should return undefined for a non-existent product', () => {
      const mockData = {
        products: [
          {
            id: 1,
            name: 'Product 1',
            price: 10.0,
            deleted: false,
          },
          {
            id: 2,
            name: 'Product 2',
            price: 20.0,
            deleted: false,
          },
        ],
      };
      (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockData));

      const result = appService.getProduct(999);
      expect(result).toBeUndefined();
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by ID', () => {
      const mockData = {
        products: [
          {
            id: 1,
            name: 'Product 1',
            price: 10.0,
            deleted: false,
          },
          {
            id: 2,
            name: 'Product 2',
            price: 20.0,
            deleted: false,
          },
        ],
      };
      (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockData));

      const expectedResponse = { response: 'ok' };
      const result = appService.deleteProduct(1);
      expect(result).toEqual(expectedResponse);
    });

    it('should not delete a product that does not exist', () => {
      const mockData = {
        products: [
          {
            id: 1,
            name: 'Product 1',
            price: 10.0,
            deleted: false,
          },
          {
            id: 2,
            name: 'Product 2',
            price: 20.0,
            deleted: false,
          },
        ],
      };
      (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockData));

      const expectedResponse = { response: 'ok' };
      const result = appService.deleteProduct(999);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('upsertProduct', () => {
    it('should add new products to the data file', async () => {
      const mockData = {
        products: [
          {
            id: 1,
            name: 'Product 1',
            price: 10.0,
            deleted: false,
          },
          {
            id: 2,
            name: 'Product 2',
            price: 20.0,
            deleted: false,
          },
        ],
      };
      (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockData));

      const newProducts = [
        {
          id: 3,
          name: 'Product 3',
          price: 30.0,
        },
        {
          id: 4,
          name: 'Product 4',
          price: 40.0,
        },
      ];

      const expectedResponse = { response: 'ok' };
      const result = await appService.upsertProduct(newProducts);
      expect(result).toEqual(expectedResponse);
    });

    it('should update existing products in the data file', async () => {
      const mockData = {
        products: [
          {
            id: 1,
            name: 'Product 1',
            price: 10.0,
            deleted: false,
          },
          {
            id: 2,
            name: 'Product 2',
            price: 20.0,
            deleted: false,
          },
        ],
      };
      (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockData));

      const newProducts = [
        {
          id: 1,
          name: 'Updated Product 1',
          price: 15.0,
        },
        {
          id: 2,
          name: 'Updated Product 2',
          price: 25.0,
        },
      ];

      const expectedResponse = { response: 'ok' };
      const result = await appService.upsertProduct(newProducts);
      expect(result).toEqual(expectedResponse);
    });
  });
});
