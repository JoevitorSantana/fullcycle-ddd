import { Sequelize } from "sequelize-typescript";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderRepository from "./order.repository";

describe("Order repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("123", "John Doe");
        const address = new Address("Street 1", 123, "ZIP", "City");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("123", product.name, product.price, product.id, 1);

        const orderRepository = new OrderRepository();
        const order = new Order("123", customer.id, [orderItem]);

        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: "123",
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    order_id: "123",
                    name: orderItem.name,
                    product_id: orderItem.productId,
                    quantity: orderItem.quantity,
                    price: product.price,
                },
            ],
        })
    });

    it ("should update an order", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("123", "John Doe");
        const address = new Address("Street 1", 123, "ZIP", "City");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customer2 = new Customer("456", "Zé Joe");
        const address2 = new Address("Street 2", 123, "ZIP", "City");
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("123", product.name, product.price, product.id, 1);

        const orderRepository = new OrderRepository();
        const order = new Order("123", "123", [orderItem]);
        await orderRepository.create(order);

        order.changeCustomer(customer2.id);

        await orderRepository.update(order);

        const orderResult = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });
        
        expect(orderResult?.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "456",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    order_id: order.id,
                    name: product.name,
                    product_id: product.id,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                },
            ]
        });
    });

    it("Should be able to find an order", async () => {
        const orderRepository = new OrderRepository();

        const customerRepository = new CustomerRepository();

        const customer = new Customer("123", "John Doe");
        const address = new Address("Street 1", 123, "ZIP", "City");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("123", product.name, product.price, product.id, 1);

        const order = new Order("123", customer.id, [orderItem]);

        await orderRepository.create(order);

        const orderResult = await orderRepository.find(order.id);

        expect(order).toStrictEqual(orderResult);
    });

    it("Should be able to find all orders", async () => {
        // Creating test customer
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John Doe");
        const address = new Address("Street 1", 123, "ZIP", "City");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        // Creating test product
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        // Creating test order
        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem("123", product.name, product.price, product.id, 1);
        const order = new Order("123", customer.id, [orderItem]);
        await orderRepository.create(order);

        // Creating second test order
        const orderItem2 = new OrderItem("456", product.name, product.price, product.id, 2);
        const order2 = new Order("456", customer.id, [orderItem2]);
        await orderRepository.create(order2);

        const foundOrders = await orderRepository.findAll();

        expect(foundOrders).toEqual([order, order2]);
    });

    afterEach(async () => {
        await sequelize.close();
    });
});