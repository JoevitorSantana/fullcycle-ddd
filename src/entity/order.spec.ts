import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should thrown error when id is empty", () => {
        expect(() => new Order("", "123", [])).toThrow("Id is required");
    });

    it("should thrown error when customerId is empty", () => {
        expect(() => new Order("123", "", [])).toThrow("CustomerId is required");
    });

    it("should thrown error when items are zero", () => {
        expect(() => new Order("123", "123", [])).toThrow("Items are required");
    });

    it("should calculate total", () => {
        const item = new OrderItem("1", "Item 1", 100, "1", 2);
        const item2 = new OrderItem("2", "Item 2", 200, "2", 2);
        const order = new Order("123", "123", [item, item2]);

        const total = order.total();

        expect(total).toBe(600);
    });

    it("should throw error if the item quantity is greater than zero", () => {
        const item = new OrderItem("1", "Item 1", 100, "1", 0);
        expect(() => new Order("123", "123", [item])).toThrow("Item quantity must be greater than zero");
    });
});