# Decentralized Identity (DID) Registry

![License](https://img.shields.io/badge/license-MIT-green)
![Standard](https://img.shields.io/badge/standard-ERC725-blue)
![Status](https://img.shields.io/badge/status-active-success)

## Overview

**DID Identity Registry** is a blockchain-based identity management system. It enables "Self-Sovereign Identity" (SSI), where users control their own data. This repository provides the smart contracts to register identities and the scripts to issue and verify claims (e.g., "User is over 18", "User owns NFT X").

## Features

-   **On-Chain Registry**: Immutable mapping of user addresses to DID Documents (via IPFS hash or raw data).
-   **Claim System**: Add, update, and revoke attributes linked to an identity.
-   **Resolver**: A Node.js utility to fetch and decode identity data from the blockchain.
-   **Gas Optimized**: Uses minimal storage patterns to reduce registration costs.

## Quick Start

1.  **Install**: `npm install`
2.  **Deploy**: `npx hardhat run deploy.js --network localhost`
3.  **Create Identity**: `node create_identity.js`
4.  **Add Claim**: `node add_claim.js`
5.  **Resolve**: `node resolver.js`

## Use Cases

-   KYC/AML Compliance without storing user data.
-   Decentralized Social Media profiles.
-   Reputation systems for DAOs.

## License

MIT License.
