const { ethers } = require("hardhat");
const config = require("./did_config.json");
const { bytesToString } = require("./crypto_utils");

async function resolveDID(userAddress) {
    const registry = await ethers.getContractAt("IdentityRegistry", config.REGISTRY_ADDRESS);

    console.log(`Resolving DID: did:eth:${userAddress}`);

    const identity = await registry.getIdentity(userAddress);
    
    if (identity.created == 0) {
        console.log("Identity not found.");
        return;
    }

    console.log("--- Identity Document ---");
    console.log("Controller:", identity.controller);
    console.log("DID Document CID:", identity.didDocumentCID);
    console.log("Created At:", new Date(Number(identity.created) * 1000).toISOString());
}

// Example usage: node resolver.js
// For now, we just run the function with the first signer
async function main() {
    const [user] = await ethers.getSigners();
    await resolveDID(user.address);
}

main();
