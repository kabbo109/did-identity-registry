const { ethers } = require("hardhat");
const fs = require("fs");
const config = require("./did_config.json");
const { stringToBytes32, stringToBytes } = require("./crypto_utils");

async function main() {
    const [user] = await ethers.getSigners();
    const registry = await ethers.getContractAt("IdentityRegistry", config.REGISTRY_ADDRESS, user);

    console.log("Adding 'KYC_VERIFIED' claim...");

    const key = stringToBytes32("KYC_STATUS");
    const value = stringToBytes("VERIFIED_LEVEL_1");

    const tx = await registry.addClaim(key, value);
    await tx.wait();

    console.log("Claim added to Identity!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
