// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ONFT721 } from "@layerzerolabs/lz-evm-oapp-v2/contracts/onft721/ONFT721.sol";

contract MyONFT721 is ONFT721 {
    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint,
        address _delegate
    ) ONFT721(_name, _symbol, _lzEndpoint, _delegate) Ownable(_delegate) {}
}
