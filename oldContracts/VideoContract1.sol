//SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.7.0;
pragma experimental ABIEncoderV2;


contract VideoContract {
    //owner of contract
    address public owner;

    //onlyOwner modifier
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    //1_Registration by owner
    //Registration variables
    //NOTE: mapping cannot have address payable, has to be cast to payable when needed
    mapping (address => string)  celebrities;
    mapping (address => string)  beneficiaries;
    mapping (address => address) celebrityBeneficiaryChoice;

    //array to store celebrity and beneficiary list
    address[] celebrityList;
    address[] beneficiaryList;

    //Function for beneficiary to register
    function addBeneficiary(address _address, string memory _name) public {
        beneficiaries[_address] = _name;
        beneficiaryList.push(_address);
    }

    //Function for celebrity register, and he is only able to select from registered beneficiary list above
    function addCelebrity(address _address, address _beneficiaryAddress, string memory _name ) public {

        celebrities[_address] = _name;
        celebrityList.push(_address);

        //add mapping of celebrity's choice of beneficiary
        celebrityBeneficiaryChoice[_address] = _beneficiaryAddress;
    }

    //functions to delete celebrities/beneficiaries
    function deleteCelebrity(address _address) public onlyOwner{
        delete celebrities[_address];
        delete celebrityBeneficiaryChoice[_address];
    }
    function deleteBeneficiary(address _address) public onlyOwner {
        delete beneficiaries[_address];
    }

    //2_Video variables:
    // enum for video status
    //struct for video properties
    //video array to store all video orders

    enum VideoStatus { New, Done }

    uint idCount = 0;

    struct Video {
        uint id;
        address payable celebrity;
        address payable donater;
        address payable beneficiary;
        string name_to;
        string name_from;
        string description;
        VideoStatus status;
        string ipfsHash;
        uint donatedAmount;
    }

    Video[] public deployedVideos;

    function getDeployedVideos() public view returns (Video[] memory) {
        return deployedVideos;
    }

    /// Function for people to order a video
    /// @param x the new value to store
    /// @dev stores the number in the state variable `storedData`
    function orderVideo(address payable _celebrity, string memory _description, uint _donation, string memory _nameTo, string memory _nameFrom) public payable {

        address payable videoBeneficiary = payable(celebrityBeneficiaryChoice[_celebrity]);

        Video memory newVideo = Video({ //memory because it's a new instance of Request
           id: idCount,
           celebrity: _celebrity,
           donater: msg.sender,
           beneficiary: videoBeneficiary,
           description: _description,
           name_to: _nameTo,
           name_from: _nameFrom,
           status: VideoStatus.New,
           ipfsHash: '0',
           donatedAmount: _donation
        });
        deployedVideos.push(newVideo);
        idCount += 1;
    }

    //Function to update video status and donate to beneficiary
    //front end to pass which video was selected.
    function sendOrder(uint _id, string memory _hash) public payable {

       //convert msg.sender to address payable from mapping
        address payable videoBeneficiary = payable(celebrityBeneficiaryChoice[msg.sender]);

       //update video struct
        deployedVideos[_id].ipfsHash = _hash;
        deployedVideos[_id].status = VideoStatus.Done;

        uint donation = deployedVideos[_id].donatedAmount;

       //send donation to _beneficiary
        videoBeneficiary.transfer(donation); //fix
    }

    //function to delete orders
    function deleteOrder(uint _id) public onlyOwner {
        delete deployedVideos[_id];
    }

}
