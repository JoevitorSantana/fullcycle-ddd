import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "123" } });
        expect(productModel?.toJSON()).toStrictEqual({
            id: "123",
            name: "Product 1",
            price: 100,
        });
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        
        await productRepository.create(product);

        product.changeName("Updated Product");
        product.changePrice(150);
        await productRepository.update(product);

        const productModel = await ProductModel.findOne({ where: { id: "123" } });
        
        expect(productModel?.toJSON()).toStrictEqual({
            id: "123",
            name: "Updated Product",
            price: 150,
        });
    });

    it("should find a product by id", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "123" } });

        const foundProduct = await productRepository.find("123");
        
        expect(productModel?.toJSON()).toStrictEqual({
            id: foundProduct?.id,
            name: foundProduct?.name,
            price: foundProduct?.price,
        });
    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("123", "Product 1", 100);
        const product2 = new Product("456", "Product 2", 200);
        
        await productRepository.create(product1);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();

        const products = [product1, product2];

        expect(foundProducts).toEqual(products);
    });
});