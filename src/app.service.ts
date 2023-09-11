import { Injectable } from '@nestjs/common';

const dataFile = 'data.json';
const fs = require('fs');

@Injectable()
export class AppService {
  getProduct(Id: Number) {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    const product = data.products.find((p: any) => (p.id === Number(Id) && !p.deleted));
    return product;
  }

  getProducts() {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    return data.products.filter(p => !p.deleted);
  }

  deleteProduct(Id: Number) {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    const newData = data.products.map((product) => {
      if (product.id == Number(Id)) {
        product.deleted = true;
      }
      return product;
    });
    fs.writeFileSync(dataFile, JSON.stringify({ products: newData }, null, 2));
    return { response: "ok" };
  }

  async upsertProduct(newProducts) {
    const data = JSON.parse(await fs.readFileSync(dataFile, 'utf8'));
    const products = data.products;
    for (const product of newProducts) {
      if (!products.some((x: any) => x.id === product.id)) {
        products.push(product);
      } else {
        const toUpdate = products.findIndex((x: any) => x.id === product.id);
        products[toUpdate] = product;
      }
    }

    await fs.writeFileSync(dataFile, JSON.stringify({ products }, null, 2));
    return { response: "ok" };
  }
}
