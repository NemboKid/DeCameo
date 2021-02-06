const Video = artifacts.require("./Video.sol");


contract("Video", accounts => {
    it("should store the string 'Hey there!'", async () => {
        const video = await Video.deployed();

        // Set myString to "Hey there!"
        await video.set("Hey there!", { from: accounts[0] });

        // Get myString from public variable getter
        const videoString = await myStringStore.myString.call();

        assert.equal(videoString, "Hey there!", "The string was not stored");
    });
});
