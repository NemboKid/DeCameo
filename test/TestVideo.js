const VideoContract = artifacts.require("./VideoContract.sol");


contract("VideoContract", accounts => {
    it("Decide what's tested", async () => {
        const video = await VideoContract.deployed();

        await video.someFunction("Hey there!", { from: accounts[0] });

        // Get myString from public variable getter
        const videoFunction = await VideoContract.someVariable.call();

        assert.equal(videoFunction, "Hey there!", "The string was not stored");
    });
});
