const Counter = artifacts.require("Counter");


contract('Counter', (accounts) => {

    let myCounter;

    beforeEach(async () => {
        myCounter = await Counter.new();
    });

    it("incrementar 5 veces, descrementar 1", async () => {
        const newMessage= 4;
        
        await myCounter.inc();
        await myCounter.inc();
        await myCounter.inc();
        await myCounter.inc();
        await myCounter.inc();
        await myCounter.dec();


        const message = await myCounter.get();
        
        await myCounter.get();
        assert.equal(message, newMessage);


    });
});