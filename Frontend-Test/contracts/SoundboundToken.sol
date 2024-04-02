// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SoundboundToken is ERC721 {
  address public owner;
  using Counters for Counters.Counter;
  Counters.Counter private _nSBTs;

  struct SBTInfo {
    uint256 sBTId;      // ID của SBT
    string fullName;     // Họ và tên của người dùng
    string certificateHash; // Mã hash của hình ảnh chứng chỉ trên IPFS
    string citizenID;    // Số chứng minh nhân dân (CCCD) của người dùng
    string hometown;     // Quê quán của người dùng
    string nationality;   // Quốc tịch của người dùng
    uint256 birthDate;    // Ngày sinh của người dùng 
    address ownerAddress;  // Địa chỉ chủ sở hữu của token
  }

  struct VerifierInfo {
    bool isVerifier;      // Có phải là người xác thực không 
    string organizationCode;  // Mã tổ chức
  }

  // Liên kết thông tin của SBT với ID
  mapping(uint256 => SBTInfo) public idToSBT;

  // Liên kết thông tin của verifierInfor với verifierList
  mapping(address => VerifierInfo) public verifierList;

  // Khai báo modifier `onlyOwner` để chỉ cho phép chủ sở hữu hợp đồng thực hiện các hành động được quy định
  constructor() ERC721("SoundboutToken", "SBT") {
    owner = msg.sender;
  }
   
  // Hàm thêm một địa chỉ vào danh sách các địa chỉ được phép xác thực
  function addVerifier(address verifier, string memory organizationCode) public {
    verifierList[verifier] = VerifierInfo(true, organizationCode);
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
    string memory fullName,
    string memory certificateHash,
    string memory citizenID,
    string memory hometown,
    string memory nationality,
    uint256 birthDate
  ) public {
    require(msg.sender == owner, "Only the owner can mint SBTs for addresses");

    _nSBTs.increment(); // Tăng ID SBT
    uint256 newSBTId = _nSBTs.current(); // Lấy ID của SBT mới

    // Gọi hàm setSBTInfo để tạo một đối tượng SBTInfo mới
    SBTInfo memory newSBTInfo = setSBTInfo(
      fullName,
      certificateHash,
      citizenID,
      hometown,
      nationality,
      birthDate
    );
    
    // Cập nhật thông tin cho SBT mới
    newSBTInfo.sBTId = newSBTId;
    newSBTInfo.ownerAddress = recipient;
    
    // Lưu thông tin SBT vào mapping
    idToSBT[newSBTId] = newSBTInfo;

    // Gọi hàm `_safeMint` để tạo NFT cho địa chỉ nhận
    _safeMint(recipient, newSBTId);
  }

  
}