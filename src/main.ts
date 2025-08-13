import Address from "./domain/customer/value-objects/address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";

let customer = new Customer("123", "Joevitor");
const address = new Address("Rua Mairiporã", 72, "19050570", "Presidente Prudente");
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "item1", 10, "123", 2);
const item2 = new OrderItem("2", "item2", 20, "123", 3);

const order = new Order("1", "123", [item1, item2]);

console.log(order);