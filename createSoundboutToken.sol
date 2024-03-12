// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SoundboutToken is ERC721 {
    using ECDSA for bytes32;
    address public owner;
    
    struct RecipientInfo {
        string name;
        string school;
        string signature;
        bool verified;
    }
    
    mapping(address => RecipientInfo) public recipientInfo;
    mapping(address => bool) public verifierList;

    constructor() ERC721("SoundboutToken", "SBT") {
        owner = msg.sender;
    }
    
    // Hàm thêm người xác thực, đầu vào là địa chỉ người xác thực
    function addVerifier(address verifier) public {
        require(msg.sender == owner, "Only the owner can add verifier");
        verifierList[verifier] = true;
    }
    
    // Hàm hash dữ liệu
    function computeDataHash(string memory _data) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_data));
    }
    // 
    function computeEthSignedMessageHash(bytes32 _dataHash) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(
            "\x19Ethereum Signed Message:\n32",
            _dataHash));   
    }
    
    // Hàm sinh khóa riêng tư từ địa chỉ
    function generatePrivateKey(address addr) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(addr));
    }
    //Ham
    function verify(address _signer, string memory _data, bytes memory _sig)
        external pure returns (bool)
        {
            bytes32 messageHash = computeDataHash(_data);
            bytes32 ethSignedMessageHash = computeEthSignedMessageHash(messageHash);

            return recover(ethSignedMessageHash, _sig) == _signer;
        }
    //Hàm xác định địa chỉ kí
    function recover(bytes32 _ethSignedMessageHash, bytes memory _sig)
        public pure returns (address)
    {
        (bytes32 r,bytes32 s,uint8 v) =_split(_sig);
        return ecrecover(_ethSignedMessageHash,v,r,s);
    }
    //
    function _split(bytes memory _sig) internal pure
        returns (bytes32 r,bytes32 s,uint8 v)
    {
        require(_sig.length ==65,"invalid signature length");
        assembly {
            r:=mload(add(_sig,32))
            s:=mload(add(_sig,64))
            v:= byte(0,mload(add(_sig,96)))
        }
    }

    // Hàm thay đổi thông tin của người nhận NFT, đầu vào địa chỉ người nhận, tên người nhận, trường học và chữ ký
    function setRecipientInfo(address recipient, string memory name, string memory school, string memory signature) public {
        require(msg.sender == owner, "Only the owner can set recipient info");
        recipientInfo[recipient] = RecipientInfo(name, school, signature, false);
    }
    
    // Hàm tạo NFT cho account, số lượng NFT là amount
    function mint(address account, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can mint tokens");
        _mint(account, amount);
    }

    // Hàm xác thực, chức năng chuyển từ chưa được xác thực thành xác thực
    function verifyRecipient(address recipient) public {
        require(verifierList[msg.sender], "Only verifiers can verify recipients");
        require(recipientInfo[recipient].verified == false, "Recipient already verified");
        recipientInfo[recipient].verified = true;
    }
    
    // Hàm kiểm tra và tạo NFT cho địa chỉ recipient và số lượng là amount
    function createSoundbout(address recipient, uint256 amount) public {
        require(recipientInfo[recipient].verified == true, "Recipient not verified");
        _mint(recipient, amount);
    }
    
    // Hàm lấy phục hồi địa chỉ người kí,đầu vào hash data và signature


}