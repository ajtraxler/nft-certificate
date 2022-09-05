// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Certificate is ERC721URIStorage {
    using Counters for Counters.Counter;
    uint256 _tokenIds;
    string artist;
    string title;
    uint256 year;
    string baseURI;

    event CertificateMint(address indexed);

    //even that is emitted everytime intter

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _artist,
        string memory _title,
        string memory _URI,
        uint256 _year
    ) ERC721(_name, _symbol) {
        artist = _artist;
        title = _title;
        year = _year;
        baseURI = _URI;
    }

    function mintNewToken() public {
        require(_tokenIds < 1, " Already minted");
        _tokenIds++;
        _mint(msg.sender, _tokenIds);
        _setTokenURI(_tokenIds, baseURI);
        emit CertificateMint(msg.sender);
    }
}
