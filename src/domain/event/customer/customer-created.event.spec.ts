import EventDispatcher from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/send-consolelog1.handler";
import EnviaConsoleLog2Handler from "./handler/send-consolelog2.handler";

describe("Customer Created Events tests", () => {
    it("should register event handler 1", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new EnviaConsoleLog1Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        
        const customerCreated = new CustomerCreatedEvent({
            name: "John Doe",
            email: "john.quincy.adams@examplepetstore.com"
        });

        eventDispatcher.notify(customerCreated);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalledTimes(1);
        expect(spyEventHandler).toHaveBeenCalledWith(customerCreated);
    });

    it("should register event handler 2", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new EnviaConsoleLog2Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        
        const customerCreated = new CustomerCreatedEvent({
            name: "John Doe",
            email: "john.quincy.adams@examplepetstore.com"
        });

        eventDispatcher.notify(customerCreated);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalledTimes(1);
        expect(spyEventHandler).toHaveBeenCalledWith(customerCreated);
    });
});