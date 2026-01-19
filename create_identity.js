const { ethers } = require("hardhat");
const fs = require("fs");
const config = require("./did_config.json");

async function main() {
    const [user] = await ethers.getSigners();
    const registry = await ethers.getContractAt("IdentityRegistry", config.REGISTRY_ADDRESS, user);

    console.log(`Creating Identity for ${user.address}...`);

    // In a real app, this CID comes from uploading a JSON file to IPFS
    const mockIPFSCID = "QmXyZ..."; 

    try {
        const tx = await registry.createIdentity(mockIPFSCID);
        await tx.wait();
        console.log("Identity Created Successfully!");
    } catch (e) {
        console.error("Creation failed:", e.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
