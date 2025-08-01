import Address from "./address";
import Customer from "./customer";

function newCustomer(id: string, name: string) {
    return new Customer(id, name);
}

describe("Customer unit tests", () => {

    it("should thrown error when id is empty", () => {
        expect(() => newCustomer("", "Joe")).toThrow("Id is required");
    });

    it("should thrown error when name is empty", () => {
        expect(() => newCustomer("123", "")).toThrow("Name is required");
    });

    it("should change name", () => {
        //Arrange
        const customer = new Customer("123", "Joe");
        
        // Act
        customer.changeName("Joevitor");

        // Assert
        expect(customer.name).toBe("Joevitor");
    });

    it("should activate customer", () => {
        const customer = new Customer("123", "Joe");
        const address = new Address("Street 1", 123, "19050-570", "Pres. Prudente");
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should activate customer", () => {
        const customer = new Customer("123", "Joe");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should thrown error when address is undefined when you activate a customer", () => {
        const customer = new Customer("123", "Joe");
        expect(() => customer.activate()).toThrow("Address is mandatory to activate customer");
    });
});