import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),  
            items: entity.items.map(item => ({
                id: item.id,
                product_id: item.productId,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
        }, {
            include: [{model: OrderItemModel }]
        });
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total(),
        }, {
            where: {
                id: entity.id,
            }
        });
    }
    
    async find(id: string): Promise<Order> {
        let orderModel;

        try {
            orderModel = await OrderModel.findOne({
                where: {
                    id: id,
                },
                rejectOnEmpty: true,
                include: [{model: OrderItemModel}]
            });
        } catch (error) {
            throw new Error(`Order not found`);
        }

        if (!orderModel.items)
            throw new Error(`Order Items not found`);

        let orderItems = orderModel.items.map(item => 
            new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
        );
        
        const order = new Order(orderModel.id, orderModel.customer_id, orderItems);
        return order;
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({ include: [{model: OrderItemModel}] });

        const orders = orderModels.map(orderModel => {
            if (orderModel.items) {
                let orderItems = orderModel.items.map(item => 
                    new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
                );
                let order = new Order(orderModel.id, orderModel.customer_id, orderItems);
                return order;
            } else
                throw new Error(`Order Items not found to order ${orderModel.id}`);
        });

        if (!orders) throw new Error(`Orders not found`);

        return orders;
    }
}