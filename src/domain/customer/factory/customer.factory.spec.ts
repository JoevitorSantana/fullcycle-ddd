import Address from "../value-objects/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
    it("should create a customer", () => {
        let customer = CustomerFactory.create("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();
    });

    it("should create a customer with an address", () => {
        const address = new Address("Stret", 1, "1330-250", "São Paulo");

        let customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBe(address);
    });
});