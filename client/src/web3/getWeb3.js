import Web3 from "web3";

const getWeb3 = async () => {
    var res = await new Promise((resolve, reject) => {
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        window.addEventListener("load", async () => {
            // Modern dapp browsers...
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                try {
                    // Request account access if needed
                    await window.ethereum.enable();
                    // Acccounts now exposed
                    resolve(web3);
                } catch (err) {
                    console.log("error m888: ", err);
                    reject(err);
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                // Metamask
                const web3 = window.web3;
                console.log("Injected web3 detected.");
                resolve(web3);
            }
            // Fallback to localhost
            else {
                const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/58537a43761d41b09c87dd9e07bc6acf");
                const web3 = new Web3(provider);
                console.log("No web3 instance injected, using Local web3.");
                resolve(web3);
            }
        });
    });

    return res;
};


export default getWeb3;
