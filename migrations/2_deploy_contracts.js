const VideoContract = artifacts.require("VideoContract");

module.exports = function(deployer) {
    deployer.deploy(VideoContract);
};
