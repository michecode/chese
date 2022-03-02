//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


/*
@title chese
@author michecode
@desc practicing solidity and ether front end. simple buy and sell nft martketplace. no bidding.
*/
contract Chese is Ownable, ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;
  // Not active contains items that are either sold or delisted.
  Counters.Counter private _itemsNotActive;

  /*
  @params
  id - listing id
  active - false after "removal"
  name - the name lol
  price - price of listing. uint256 because wei is big
  tokenId - nft token id
  nftContract - address of nft contract
  seller - address of account who listed
  */
  struct Listing {
    uint itemId;
    address nftContract;
    uint256 tokenId;
    uint256 price;
    address payable seller;
    address payable owner;
    bool active;
  }


  // 
  event NewListing(
    uint indexed listingId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool active
    );
  //
  event ListingSold(
    uint indexed listingId,
    address owner
  );
  // 
  event RemovedListing(
    uint indexed listingId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller
  );

  mapping (address => uint) public sellerListingCount;
  // Map list ID to listing object. Acts as a Listing[] kinda
  mapping (uint256 => Listing) private idToListing;

  constructor() {
    console.log("Deploying chese contract!!");
  }

  function getApproval(address nftContract) public {

  }

  /*
  @notice Create a listing
  @dev
  */
  function createListing(address nftContract, uint256 tokenId, uint256 price) public payable nonReentrant {
    require(price > 100, "Price must be above 100 wei");
    _itemIds.increment();
    uint256 itemId = _itemIds.current();

    // Create new Listing
    idToListing[itemId] = Listing(
      itemId,
      nftContract,
      tokenId,
      price,
      payable(msg.sender),
      payable(address(0)),
      true
    );

    // Transfer NFT into Chese
    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
    sellerListingCount[msg.sender]++;

    emit NewListing(
      itemId,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      price,
      false
    );
  }

  function createListingSale(address nftContract, uint256 itemId) public payable nonReentrant {
    uint price = idToListing[itemId].price;
    uint tokenId = idToListing[itemId].tokenId;
    bool active = idToListing[itemId].active;

    require(msg.value == price, "Transaction value != Price");
    require(active == true, "This listing is not active.");
    
    emit ListingSold(
      itemId,
      msg.sender
    );

    sellerListingCount[idToListing[itemId].seller]--;
    idToListing[itemId].seller.transfer(msg.value);
    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
    idToListing[itemId].owner = payable(msg.sender);
    _itemsNotActive.increment();
    idToListing[itemId].active = false;
  }

  // Checkes to see if the caller actually owns the listing
  modifier ownsListing(uint itemId) {
    require(idToListing[itemId].seller == msg.sender, "You do not own this listing.");
    _;
  }

  // Removes listings
  function unlist(uint itemId) public ownsListing(itemId) {
    sellerListingCount[idToListing[itemId].seller]--;
    IERC721(idToListing[itemId].nftContract).transferFrom(address(this), msg.sender, idToListing[itemId].tokenId);
    _itemsNotActive.increment();
    idToListing[itemId].active = false;
    idToListing[itemId].owner = payable(msg.sender);
    emit RemovedListing(itemId, idToListing[itemId].nftContract, idToListing[itemId].tokenId, idToListing[itemId].seller);
  }

  function getNumActiveListings() public view returns(uint) {
    return (_itemIds.current() - _itemsNotActive.current());
  }

  // Gets all active listings
  function fetchListings() public view returns (Listing[] memory) {
      uint itemCount = _itemIds.current();
      uint activeItemCount = _itemIds.current() - _itemsNotActive.current();
      uint currentIndex = 0;

      console.log(itemCount);
      console.log(activeItemCount);
      Listing[] memory items = new Listing[](activeItemCount);
      for (uint i = 0; i < itemCount; i++) {
        console.log(i);
          if (idToListing[i + 1].owner == address(0)) {
              console.log("active listing");
              uint currentId = i + 1;
              Listing storage currentItem = idToListing[currentId];
              items[currentIndex] = currentItem;
              currentIndex += 1;
          }
      }
      return items;
  }

  // Fetches all listings including inactive. Not sure when I'll need it.
  function fetchAllListings() public view returns(Listing[] memory) {
    uint itemCount = _itemIds.current();
    Listing[] memory items = new Listing[](itemCount);
    for(uint i = 0; i < itemCount; i++) {
      items[i] = idToListing[i+1];
    }
    return items;
  }

  // Gets all listings from an address
  function fetchSellerListings(address seller) public view returns(Listing[] memory) {
    uint itemCount = _itemIds.current();
    uint sellerItemCount = sellerListingCount[seller];
    uint index = 0;

    Listing[] memory items = new Listing[](sellerItemCount);

    for(uint i = 0; i < itemCount; i++) {
      console.log(i);
      if(idToListing[i + 1].seller == seller && idToListing[i + 1].active) {
        Listing storage currentItem = idToListing[i + 1];
        items[index] = currentItem;
        index += 1;
      }
    }
    return items;
  }

  // Withdraw fees
  // function withdraw() public onlyOwner() {
  //   address owner = owner();
  //   payable(owner).transfer(address(this).balance);
  // }
}