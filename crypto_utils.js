const { ethers } = require("ethers");

function stringToBytes32(text) {
    return ethers.encodeBytes32String(text);
}

function stringToBytes(text) {
    return ethers.toUtf8Bytes(text);
}

function bytesToString(bytes) {
    try {
        // Handle bytes32 and dynamic bytes conversion attempts
        return ethers.toUtf8String(bytes).replace(/\0/g, '');
    } catch (e) {
        return ethers.decodeBytes32String(bytes);
    }
}

module.exports = {
    stringToBytes32,
    stringToBytes,
    bytesToString
};
