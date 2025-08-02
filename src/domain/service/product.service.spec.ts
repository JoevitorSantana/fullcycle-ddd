import Product from "../domain/entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
    it("should change the prices of all products", () => {
        const product1 = new Product("123", "Product 1", 100);
        const product2 = new Product("456", "Product 2", 200);
        const products = [product1, product2];

        ProductService.increasePrices(products, 10);

        expect(product1.price).toBe(110);
        expect(product2.price).toBe(220);
    });
});