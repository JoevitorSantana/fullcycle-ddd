import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import SendConsoleWhenCustomerAddressIsChanged from "./handler/send-console-when-customer-address-is-changed.handler";

describe("Customer Address Changed Event tests", () => {
    it("should register event handler", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendConsoleWhenCustomerAddressIsChanged();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        
        const customer = new Customer("123", "John Doe");
        const address = new Address("Street 1", 123, "ZIP", "City");
        customer.changeAddress(address);

        const newAddress = new Address("Street 2", 123, "ZIP", "City");
        customer.changeAddress(newAddress);

        const customerChangedEvent = new CustomerAddressChangedEvent({
            id: customer.id,
            name: customer.name,
            address: customer.address
        });

        eventDispatcher.notify(customerChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalledTimes(1);
        expect(spyEventHandler).toHaveBeenCalledWith(customerChangedEvent);
    });
});