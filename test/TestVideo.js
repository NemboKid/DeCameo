const VideoContract = artifacts.require("./VideoContract.sol");


contract("VideoContract", accounts => {
    var instance;

    beforeEach(async () => {
        instance = await VideoContract.deployed();
    })

    it('Contract deployer becomes owner', async () => {
        const isOwner = await instance.owner.call();
        const isDeployer = await accounts[0];

        assert.equal(isOwner, isDeployer, "they should be the same")
    });

    it('Register celebrity', async () => {
        await instance.registerCelebrity("0x99388CFdb089485A570ED463E8491a57D2Fae0e0", "Hej och hopp", "BUIDLer", "Larsa", "test2.png", {
            from: accounts[1]
        });
        await instance.registerCelebrity("0x17462F7D6607902AC20E0Aa375e0Ccd0C2c1a34C", "Tjennnna", "CTO", "Fille", "t12af.jpeg", {
            from: accounts[2]
        });

        var celebCount = await instance.celebCount();
        const { words } = celebCount;
        console.info("celebCount: ", words[0]);
        assert.equal(words[0], 2, "celebCount should be 2");
    });

    it("Get name from celebrity", async () => {
        var celeb = await instance.registeredCelebs(1);
        console.info("celeb: ", celeb.name);
        assert.equal(celeb.name, "Fille", "Celeb's name should me Fille");
    })

    it("Make orders", async () => {
        await instance.orderVideo(accounts[1], "0x99388CFdb089485A570ED463E8491a57D2Fae0e0", "I wanna hear a joke", "Sune", "Sten", 4, {
            from: accounts[3],
            value: 4000000000000000000
        });
        await instance.orderVideo(accounts[2], "0x17462F7D6607902AC20E0Aa375e0Ccd0C2c1a34C", "Say something fun", "Gary", "Barry", 1, {
            from: accounts[4],
            value: 1000000000000000000
        });

        var order = await instance.orders(1);

        assert.equal(order.name_to, "Gary", "The order nameTo didn't match");
    });

    it("Delete order", async () => {
        const balanceBefore = await web3.eth.getBalance(accounts[5]);

        const receipt1 = await instance.orderVideo(accounts[2], "0x17462F7D6607902AC20E0Aa375e0Ccd0C2c1a34C", "Say something fun", "Larra", "Karsten", 2, {
            from: accounts[5],
            value: 2000000000000000000
        });

        //after order
        const balanceOrder = await web3.eth.getBalance(accounts[5]);
        console.log("balance after order: ", balanceOrder);

        const receipt2 = await instance.deleteOrder(2, { from: accounts[5] });

        const gasUsed1 = receipt1.receipt.gasUsed;
        const gasUsed2 = receipt2.receipt.gasUsed

        // Obtain gasPrice from the transaction
        const tx1 = await web3.eth.getTransaction(receipt1.tx);
        const tx2 = await web3.eth.getTransaction(receipt2.tx);
        const gasPrice1 = tx1.gasPrice;
        const gasPrice2 = tx2.gasPrice;
        const totalGas = (gasPrice1 * gasUsed1) + (gasPrice2 * gasUsed2);

        //adjust also for gas cost
        var balanceAfter = await web3.eth.getBalance(accounts[5]);
        console.log("Balance after: ", balanceAfter);
        //balanceAdjusted = balanceAfter - totalGas;
        console.info("Balance before: ", balanceBefore);
        console.log(`Total gas used: ${totalGas}`);
        console.info("Balance before (- gas): ", balanceBefore - totalGas);

        //equal =
        //deepEqual() ==
        //deepStrictEqual() ===
        assert.equal(balanceAfter.toString(), (balanceBefore - totalGas).toString(), "Sum should be equal");
    });

    it("Send order", async () => {
        const charityBalanceBefore = await web3.eth.getBalance("0x99388CFdb089485A570ED463E8491a57D2Fae0e0");

        const receipt = await instance.sendOrder(0, "ipfsrandomhash", {
            from: accounts[1]
        });
        //console.log("Receipt: ", receipt);

        const charityBalanceAfter = await web3.eth.getBalance("0x99388CFdb089485A570ED463E8491a57D2Fae0e0");
        console.log("Balances Before: ", charityBalanceBefore);
        console.log("Balance After: ", charityBalanceAfter);

        assert(receipt); //fix
    });
});
