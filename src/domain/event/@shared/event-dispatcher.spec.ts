import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
    
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        if (eventDispatcher.getEventHandlers["ProductCreatedEvent"]) {
            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        }
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
    
        if (eventDispatcher.getEventHandlers["ProductCreatedEvent"])
            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        if (eventDispatcher.getEventHandlers["ProductCreatedEvent"])
            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        if (eventDispatcher.getEventHandlers["ProductCreatedEvent"])
            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    
        eventDispatcher.unregisterAll();
    
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("should notify all eventhandlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
    
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
    
        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0
        });
    
        const productCreatedEvent2 = new ProductCreatedEvent({
            name: "Product 2",
            description: "Product 2 description",
            price: 20.0
        });
    
        const productCreatedEvent3 = new ProductCreatedEvent({
            name: "Product 3",
            description: "Product 3 description",
            price: 30.0
        });
    
        // Quando o notify for executado o SendMailWhenProdudctIsCreatedHandler.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);
        eventDispatcher.notify(productCreatedEvent2);
        eventDispatcher.notify(productCreatedEvent3);
    
        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalledTimes(3);
        expect(spyEventHandler).toHaveBeenCalledWith(productCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalledWith(productCreatedEvent2);
        expect(spyEventHandler).toHaveBeenCalledWith(productCreatedEvent3);
    });
});