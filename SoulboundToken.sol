// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts@4.7.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.7.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.0/utils/Counters.sol"; 

contract SoulboundToken is ERC721,ERC721URIStorage,Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _nSBTs;

    struct SBTInfo {
        uint256 sBTId;          // ID của SBT
        string fullName;        // Họ và tên của người dùng
        string certificateHash; // Mã hash của hình ảnh chứng chỉ trên IPFS
        string citizenID;       // Số chứng minh nhân dân (CCCD) của người dùng
        string hometown;        // Quê quán của người dùng
        string nationality;     // Quốc tịch của người dùng
        uint256 birthDate;      // Ngày sinh của người dùng 
        address ownerAddress;   // Địa chỉ chủ sở hữu của token
    }

    struct VerifierInfo {
        bool isVerifier;         // Có phải là người xác thực không 
        string organizationCode; // Mã tổ chức
    }

    // Liên kết thông tin của SBT với ID
    mapping(uint256 => SBTInfo) public idToSBT;

    // Liên kết thông tin của verifierInfo với verifierList
    mapping(address => VerifierInfo) public verifierList;
    address[] public verifierAddresses;

    // Mapping để kiểm tra mã tổ chức duy nhất và mảng để lưu trữ các mã duy nhất
    mapping(string => bool) private uniqueOrganizationCodes;
    string[] private organizationCodesList;

    // Khai báo modifier `onlyOwner` để chỉ cho phép chủ sở hữu hợp đồng thực hiện các hành động được quy định
    constructor() ERC721("SoulboundToken", "SBT") Ownable() {}


    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }


    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    // Hàm thêm một địa chỉ vào danh sách các địa chỉ được phép xác thực
    function addVerifier(address verifier, string memory organizationCode) public {
        verifierList[verifier] = VerifierInfo(true, organizationCode);
        verifierAddresses.push(verifier);

        // Thêm mã tổ chức vào danh sách nếu nó chưa tồn tại
        if (!uniqueOrganizationCodes[organizationCode]) {
            uniqueOrganizationCodes[organizationCode] = true;
            organizationCodesList.push(organizationCode);
        }
    }

    // Hàm xóa một địa chỉ từ danh sách các địa chỉ được phép xác thực
    function removeVerifier(address verifier) public onlyOwner {
        require(verifierList[verifier].isVerifier, "Address is not a verifier");

        // Lấy mã tổ chức của verifier
        string memory organizationCode = verifierList[verifier].organizationCode;

        // Xóa địa chỉ khỏi mapping verifierList
        delete verifierList[verifier];

        // Xóa địa chỉ khỏi mảng verifierAddresses
        for (uint256 i = 0; i < verifierAddresses.length; i++) {
            if (verifierAddresses[i] == verifier) {
                verifierAddresses[i] = verifierAddresses[verifierAddresses.length - 1];
                verifierAddresses.pop();
                break;
            }
        }

        // Kiểm tra xem có bất kỳ verifier nào khác sử dụng cùng mã tổ chức hay không
        bool organizationCodeUsed = false;
        for (uint256 i = 0; i < verifierAddresses.length; i++) {
            if (keccak256(bytes(verifierList[verifierAddresses[i]].organizationCode)) == keccak256(bytes(organizationCode))) {
                organizationCodeUsed = true;
                break;
            }
        }

        // Nếu không còn verifier nào sử dụng mã tổ chức này, xóa mã tổ chức
        if (!organizationCodeUsed) {
            uniqueOrganizationCodes[organizationCode] = false;
            for (uint256 i = 0; i < organizationCodesList.length; i++) {
                if (keccak256(bytes(organizationCodesList[i])) == keccak256(bytes(organizationCode))) {
                    organizationCodesList[i] = organizationCodesList[organizationCodesList.length - 1];
                    organizationCodesList.pop();
                    break;
                }
            }
        }
    }

    // Hàm lấy danh sách tất cả các tổ chức duy nhất
    function getOrganizationCodes() public view returns (string[] memory) {
        return organizationCodesList;
    }

    // Hàm kiểm tra xem một địa chỉ có trong danh sách xác thực hay không
    function isVerifier(address addr) public view returns (bool) {
        return verifierList[addr].isVerifier;
    }

    // Hàm lấy mã tổ chức của một địa chỉ xác thực
    function getOrganizationCode(address addr) public view returns (string memory) {
        return verifierList[addr].organizationCode;
    }

     // Hàm phục hồi địa chỉ người ký
    function recover(bytes32 _ethSignedMessageHash, bytes memory _sig) public pure returns (address) {
      (bytes32 r, bytes32 s, uint8 v) = _split(_sig);
      return ecrecover(_ethSignedMessageHash, v, r, s);
    }
    
    // Hàm xác định các thành phần r,s,v trong 1 chữ ký
    function _split(bytes memory _sig) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
      require(_sig.length == 65, "invalid signature length");
      assembly {
        r := mload(add(_sig, 32))
        s := mload(add(_sig, 64))
        v := byte(0, mload(add(_sig, 96)))
      }
    }
    
    // Hàm trả về mảng các SBT thuộc sở hữu của người gọi hàm
    function getMySBTs() public view returns (SBTInfo[] memory) {
      uint totalSBTCount = _nSBTs.current();
      uint sbtCount = 0;
      
      // Đếm số lượng SBT mà người dùng hiện tại sở hữu
      for (uint i = 1; i <= totalSBTCount; i++) {
        if (idToSBT[i].ownerAddress == msg.sender) {
          sbtCount += 1;
        }
      }
      
      // Tạo mảng để lưu trữ thông tin về SBT của người dùng hiện tại
      SBTInfo[] memory sbts = new SBTInfo[](sbtCount);
      uint currentIndex = 0;
      
      // Lặp lại tất cả SBT và lưu trữ thông tin về SBT của người dùng hiện tại vào mảng
      for (uint i = 1; i <= totalSBTCount; i++) {
        if (idToSBT[i].ownerAddress == msg.sender) {
          sbts[currentIndex] = idToSBT[i];
          currentIndex += 1;
        }
      }
      
      return sbts;
    }
    
    //hàm riêng để thiết lập thông tin 
    function setSBTInfo(
        string memory fullName,
        string memory certificateHash,
        string memory citizenID,
        string memory hometown,
        string memory nationality,
        uint256 birthDate
    ) internal pure returns (SBTInfo memory) {
        return SBTInfo({
            fullName: fullName,
            certificateHash: certificateHash,
            citizenID: citizenID,
            hometown: hometown,
            nationality: nationality,
            birthDate: birthDate,
            sBTId: 0, // Khởi tạo sBTId với giá trị mặc định
            ownerAddress: address(0) // Khởi tạo ownerAddress với giá trị mặc định
        });
    }

    // Hàm tạo một SBT mới cho một địa chỉ.
    function mintSBTForAddress(
        address recipient,
        string memory myTokenURI
    ) public   {
        

        _nSBTs.increment(); // Tăng ID SBT
        uint256 newSBTId = _nSBTs.current(); // Lấy ID của SBT mới

        // Gọi hàm `_safeMint` để tạo NFT cho địa chỉ nhận
        _safeMint(recipient, newSBTId);
        
        // Gọi hàm `_setTokenURI` để thiết lập URI cho token mới
        _setTokenURI(newSBTId, myTokenURI);
    }

    // Hàm tìm các địa chỉ có mã tổ chức cụ thể
    function getVerifiersByOrganizationCode(string memory targetOrganizationCode) public view returns (address[] memory) {
        uint verifierCount = 0;
        address[] memory result;

        // Duyệt qua toàn bộ danh sách các địa chỉ verifier
        for (uint i = 0; i < verifierAddresses.length; i++) {
            address verifierAddress = verifierAddresses[i];
            if (keccak256(bytes(verifierList[verifierAddress].organizationCode)) == keccak256(bytes(targetOrganizationCode))) {
                verifierCount++;
            }
        }

        // Khởi tạo mảng để lưu trữ địa chỉ của các verifier có mã tổ chức trùng khớp
        result = new address[](verifierCount);
        uint currentIndex = 0;

        // Duyệt lại danh sách và lưu trữ địa chỉ của các verifier có mã tổ chức trùng khớp
        for (uint i = 0; i < verifierAddresses.length; i++) {
            address verifierAddress = verifierAddresses[i];
            if (keccak256(bytes(verifierList[verifierAddress].organizationCode)) == keccak256(bytes(targetOrganizationCode))) {
                result[currentIndex] = verifierAddress;
                currentIndex++;
            }
        }

        return result;
    }
    // Hàm ngăn chặn chuyển token sang tài khoản khác
    function _beforeTokenTransfer(
        address from, 
        address to, 
        uint256 tokenId
    ) internal override virtual {
        require(from == address(0), "Err: Soulbound token transfer is BLOCKED");   
        super._beforeTokenTransfer(from, to, tokenId);  
    }
    
}
