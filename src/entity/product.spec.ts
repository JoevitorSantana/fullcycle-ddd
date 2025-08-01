import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => new Product("", "Product 1", 100)).toThrow("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => new Product("1", "", 100)).toThrow("Name is required");
    });

    it("should validate price is greater than or equal to zero", () => {
        expect(() => new Product("1", "Product 1", -10)).toThrow("Price must be greater than or equal to zero");
    });

    it("should change product name", () => {
        const product = new Product("1", "Product 1", 100);
        product.changeName("Updated Product");
        expect(product.name).toBe("Updated Product");
    });

    it("should change product price", () => {
        const product = new Product("1", "Product 1", 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });
});