import fs from 'node:fs';
import { daoProducts } from './index.js';
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import { __dirname } from '../utils/misc_utils.js';
import { fakerES_MX } from '@faker-js/faker';
let faker = fakerES_MX;
class ProductManager {
    async addProduct(product) {
        if (product.thumbnails === undefined) product.thumbnails = [];

        let newProduct = await daoProducts.create(product);
        return newProduct._id;
    }
    async updateProduct(productId, product) {
        if (product.price !== undefined && product.price <= 0) {
            throw Error(`There were values undefined or impossible. Not updating to product ${Object.values(product)}`);
        }
        try { (await daoProducts.update(productId, product)) } catch { throw "No product with ID " + productId; }
    }
    async deleteProduct(productId) {
        try { (await daoProducts.delete(productId)) } catch { throw "No product with ID " + productId; }
    }
    async getProducts(limit, page, query, sort) {
        let check = undefined;
        if (query) {
            switch (query) {
                case "true":
                case "false":
                    check = { stock: query == "true" ? { $gt: 0 } : 0 }
                    break;
                default:
                    if (!isNaN(query)) {
                        check = { price: { $lte: Number(query) } }
                        break;
                    }
                    check = { category: query };
                    break;
            }
        }
        let products = await daoProducts.getPaginated(check, { limit: limit || 10, page: page || 1, sort: sort ? { price: sort } : undefined });
        return products;
    }
    async getProductById(productId) {
        let product = await daoProducts.getById(productId);
        if (product == undefined) {
            throw "No product with ID " + productId;
        }
        return product;
    }
    async getProductStock(productId) {
        let product = await this.getProductById(productId);
        return product.stock;
    }
    async getProductByCode(code) {
        let product = await daoProducts.getByOther({ code: code });
        if (product == undefined) {
            throw "No product of code " + code;
        }
        return product;
    }
    async createTestProducts() {
        return await Promise.all([
        this.addProduct({ title: "kinda", description: "dddd", code: "wwwwq ", price: 54, status: true, stock: 25, category: "w", thumbnails: ["asd.json1", "tt.png"] }),
        this.addProduct({ title: "trueee", description: "dddd", code: "werwer", price: 213123, status: true, stock: 0, category: "w", thumbnails: ["asd.json1", "tt.png"] }),
        this.addProduct({ title: "no", description: "dddd", code: "dfhdfh", price: 2345, status: true, stock: 25, category: "w", thumbnails: ["asd.json1", "tt.png"] }),
        this.addProduct({ title: "FRFR", description: "dddd", code: "asdsgasd", price: 234, status: true, stock: 25, category: "w", thumbnails: ["asd.json1", "tt.png"] }),
        this.addProduct({ title: "insane", description: "dddd", code: "mbmb", price: 2, status: true, stock: 25, category: "z", thumbnails: ["asd.json1", "tt.png"] }),
        this.addProduct({ title: "dammm", description: "dddd", code: "sorrylol", price: 123, status: true, stock: 0, category: "w", thumbnails: ["asd.json1", "tt.png"] }),
        this.addProduct({ title: "How much?", description: "dddd", code: "<v>", price: 56, status: true, stock: 0, category: "z", thumbnails: ["asd.json1", "tt.png"] }),
        this.addProduct({ title: "idqqq", description: "dddd", code: "isthisrealchat", price: 67, status: true, stock: 23, category: "z", thumbnails: ["asd.json1", "tt.png"] }),
        this.addProduct({ title: "Is this loss", description: "dddd", code: "immakms", price: 5, status: true, stock: 11, category: "w", thumbnails: ["asd.json1", "tt.png"] }),
        this.addProduct({ title: "brooooo", description: "dddd", code: "never", price: 345, status: true, stock: 6, category: "w", thumbnails: [] }),
        this.addProduct({ title: "meme", description: "dddd", code: "wwwwwwww", price: 2, status: true, stock: 1, category: "w", thumbnails: [] })
    ]);
    }
    async returnMockProducts() {
        let ret = [];
        
        for(let i = 0; i < 100; i++){
            ret.push({ id: faker.database.mongodbObjectId(), title: faker.commerce.productName(), description: faker.commerce.productDescription(), code: faker.commerce.isbn(), price: faker.commerce.price({min:1, max: 9999}), status: true, stock: faker.commerce.price({min:0, max: 100}), category: faker.commerce.productAdjective(), thumbnails: [faker.image.url()] })
        }
        return ret;
    }
}

const productManager = new ProductManager();

export default productManager;


