import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-objects/address";

describe("Customer repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize(
            {
                dialect: "sqlite",
                storage: ":memory:",
                logging: false,
                sync: {
                    force: true
                },
            }
        );

        sequelize.addModels([CustomerModel]);

        // setupAssociations(sequelize);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });
        expect(customerModel?.toJSON()).toStrictEqual({
            id: "123",
            name: "Customer 1",
            street: "Street 1",
            number: 123,
            zip: "Zipcode 1",
            city: "City 1",
            active: false,
            rewardPoints: 0,
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        customerRepository.create(customer);
        
        customer.changeName("Updated Customer");

        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "123",
            name: "Updated Customer",
            street: "Street 1",
            number: 123,
            zip: "Zipcode 1",
            city: "City 1",
            active: false,
            rewardPoints: 0,
        });
    });

    it("should find a customer by id", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        
        const customerResult = await customerRepository.find("123");

        expect(customer).toStrictEqual(customerResult);
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("123", "Customer 1");
        const customer2 = new Customer("456", "Customer 2");

        const address1 = new Address("Street 1", 123, "Zipcode 1", "City 1");
        const address2 = new Address("Street 2", 456, "Zipcode 2", "City 2");

        customer1.changeAddress(address1);
        customer2.changeAddress(address2);

        customerRepository.create(customer1);
        customerRepository.create(customer2);   

        const foundCustomers = await customerRepository.findAll();

        const customers = [customer1, customer2];

        expect(foundCustomers).toEqual(customers);
    });

    it("should thrown an error when customer not found", async () => {
        const customerRepository = new CustomerRepository();

        await expect(customerRepository.find("non-existing-id")).rejects.toThrow("Customer not found");
    });
});