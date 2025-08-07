import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "./product.model";

export function setupAssociations(sequelize: Sequelize): void {
    CustomerModel.hasMany(OrderModel, { foreignKey: "customer_id", as: "orders" });
    OrderModel.belongsTo(CustomerModel, { foreignKey: "customer_id", as: "customer" });
    OrderModel.hasMany(OrderItemModel, { foreignKey: "order_id", as: "items" });
    OrderItemModel.belongsTo(OrderModel, { foreignKey: "order_id", as: "order" });
    OrderItemModel.belongsTo(ProductModel, { foreignKey: "product_id", as: "product" });
}