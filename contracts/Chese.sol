//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";


/*
@title chese
@author michecode
@desc practicing solidity and ether front end. simple buy and sell nft martketplace. no bidding.
*/
contract Chese is Ownable {
  using Address for address;

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
    uint id;
    bool active;
    string name;
    uint price;
    uint tokenId;
    address nftContract;
    address payable seller;
  }

  // 
  event NewListing(uint id, string name, address seller);
  // 
  event RemovedListing(uint id, string name, address seller);

  // Map listing id to seller
  mapping (uint => address) public listingToSeller;
  // Map address to listing amount
  mapping (address => uint) public sellerListingCount;

  /*
  @dev EXTREMELY BAD!! Should be fine on testnet but this array just grows forever since I don't want to
  rearrange too much and cause a million writes
  */
  Listing[] public listings;
  
  // 
  uint public activeListings = 0;

  constructor() {
    console.log("Deploying chese contract!!");
  }

  /*
  @notice Create a listing
  @dev
  */
  function createListing(string memory _name, uint _price, uint _tokenId, address _nftContract) public payable {
    require(_price > 0, "Price must not be zero");
    listings.push(Listing(listings.length, true, _name, _price, _tokenId, _nftContract, payable(msg.sender)));
    uint id = listings.length - 1;
    listingToSeller[id] = msg.sender;
    sellerListingCount[msg.sender]++;
    activeListings++;
    console.log("Creating a new listing with id: ", id);
    emit NewListing(id, _name, msg.sender);
  }

  // checkes to see if the caller actually owns the listing
  modifier ownsListing(uint _listingId) {
    require(listingToSeller[_listingId] == msg.sender, "You do not own this listing");
    _;
  }

  // Removes listings
  function removeListing(uint _listingId) public ownsListing(_listingId) {
    listings[_listingId].active = false;
    listingToSeller[_listingId] = address(0);
    sellerListingCount[msg.sender]--;
    activeListings--;
    console.log("Removing a listing with id: ", _listingId);
    emit RemovedListing(_listingId, listings[_listingId].name, msg.sender);
  }

  function getNumActiveListings() public view returns(uint) {
    return activeListings;
  }

  // Gets all active listings
  function getActiveListings() public view returns(uint[] memory) {
    uint[] memory result = new uint[](activeListings);
    uint counter = 0;
    for(uint i=0; i < listings.length; i++) {
      if(listings[i].active) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  // Gets price of listing x. No gas cost.
  function getPrice(uint _listingId) public view returns(uint) {
    return listings[_listingId].price;
  }

  // Gets all listings from an address
  function getSellersListings(address _seller) public view returns(uint[] memory) {
    uint[] memory result = new uint[](sellerListingCount[_seller]);
    uint counter = 0;
    for(uint i=0; i < listings.length; i++) {
      if(listingToSeller[i] == _seller) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  // function buyListing(uint _listingId) public returns(boolean) {

  // }
}