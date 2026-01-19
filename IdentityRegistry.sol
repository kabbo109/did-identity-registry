// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract IdentityRegistry is Ownable {
    
    struct Identity {
        address controller;
        uint256 created;
        uint256 updated;
        string didDocumentCID; // IPFS Hash or similar
    }

    mapping(address => Identity) public identities;
    mapping(address => mapping(bytes32 => bytes)) public claims;

    event IdentityCreated(address indexed user, string cid);
    event ClaimAdded(address indexed user, bytes32 key, bytes value);

    function createIdentity(string memory _cid) external {
        require(identities[msg.sender].created == 0, "Identity already exists");
        
        identities[msg.sender] = Identity({
            controller: msg.sender,
            created: block.timestamp,
            updated: block.timestamp,
            didDocumentCID: _cid
        });

        emit IdentityCreated(msg.sender, _cid);
    }

    function updateDIDDocument(string memory _newCid) external {
        require(identities[msg.sender].controller == msg.sender, "Not controller");
        identities[msg.sender].didDocumentCID = _newCid;
        identities[msg.sender].updated = block.timestamp;
    }

    function addClaim(bytes32 _key, bytes memory _value) external {
        require(identities[msg.sender].created != 0, "Identity not found");
        claims[msg.sender][_key] = _value;
        emit ClaimAdded(msg.sender, _key, _value);
    }

    function getIdentity(address _user) external view returns (Identity memory) {
        return identities[_user];
    }

    function getClaim(address _user, bytes32 _key) external view returns (bytes memory) {
        return claims[_user][_key];
    }
}
