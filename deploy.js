const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    console.log("Deploying Identity Registry...");

    const Registry = await ethers.getContractFactory("IdentityRegistry");
    const registry = await Registry.deploy();

    await registry.waitForDeployment();
    const address = await registry.getAddress();

    console.log("Registry deployed to:", address);

    // Save configuration
    const config = {
        REGISTRY_ADDRESS: address,
        NETWORK: "localhost"
    };
    fs.writeFileSync("did_config.json", JSON.stringify(config, null, 2));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
