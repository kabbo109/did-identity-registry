const { ethers } = require("hardhat");
const config = require("./did_config.json");
const { stringToBytes32, bytesToString } = require("./crypto_utils");

async function main() {
    const [verifier, user] = await ethers.getSigners();
    const registry = await ethers.getContractAt("IdentityRegistry", config.REGISTRY_ADDRESS, verifier);

    const targetUser = user.address;
    const claimKey = "KYC_STATUS";

    console.log(`Verifying claim '${claimKey}' for user ${targetUser}...`);

    const keyBytes = stringToBytes32(claimKey);
    const resultBytes = await registry.getClaim(targetUser, keyBytes);
    
    const resultString = bytesToString(resultBytes);

    if (resultString === "VERIFIED_LEVEL_1") {
        console.log("✅ Verification PASSED: User is Verified.");
    } else {
        console.log(`❌ Verification FAILED. Found: ${resultString}`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
