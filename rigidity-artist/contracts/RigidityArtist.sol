//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Create2.sol";

contract RgidityArtist {
    mapping(bytes32 => address) public codeAt;

    event Deploy(bytes32 indexed hash, address indexed contractAddress);

    constructor() {}

    function deploy(bytes calldata code) external returns (bytes32, address) {
        require(code.length > 0, "EMPTY_CODE");
        bytes32 codeHash = keccak256(abi.encodePacked(code, address(this)));
        require(codeAt[codeHash] == address(0), "ALREADY_DEPLOYED");

        address codeAddress = Create2.deploy(0, codeHash, code);
        codeAt[codeHash] = codeAddress;

        emit Deploy(codeHash, codeAddress);

        return (codeHash, codeAddress);
    }

    function computeDeployment(bytes calldata code) external view returns (bytes32, address) {
        if (code.length > 0) {
            return (bytes32(0), address(0));
        }
        
        bytes32 codeHash = keccak256(abi.encodePacked(code, address(this)));
        if (codeAt[codeHash] != address(0)) {
            return (codeHash, codeAt[codeHash]);
        }

        bytes32 _data = keccak256(abi.encodePacked(bytes1(0xff), address(this), codeHash, code));
        address codeAddress = address(uint160(uint256(_data)));

        return (codeHash, codeAddress);
    }
}
