const MyContract = artifacts.require("MyContract");


contract('MyContract', (accounts) => {

    let myContract;

    beforeEach(async () => {
        myContract = await MyContract.new();
    });

    it("Cambiar el mensaje original", async () => {
        const newMessage="Nuevo mensaje";

        await myContract.setHello(newMessage);

        const message = await myContract.hello();
        
        assert.equal(message, newMessage);

    });
});