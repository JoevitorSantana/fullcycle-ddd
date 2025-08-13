import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("i1", "Item 1", 100, "o1", 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(50);
        expect(order.total()).toBe(100);
    });


    it("shoud get total of all orders", () => {
        const Item = new OrderItem("123", "Item 1", 100, "o1", 1);
        const Item2 = new OrderItem("1234", "Item 2", 200, "o2", 2);

        const order = new Order("o1", "c1", [Item]);
        const order2 = new Order("o3", "c2", [Item2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(500);

    });
});