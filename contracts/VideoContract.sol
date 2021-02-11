//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.7.0;
pragma experimental ABIEncoderV2;


//To do:
// [] 1. Order Date
// [] 1. Update Celebrity
// [] 2. Only Celeb can update and send videos
// [] 3. Create a relationship between Celeb and Video: https://medium.com/robhitchens/enforcing-referential-integrity-in-ethereum-smart-contracts-a9ab1427ff42
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
    mapping (address => string) public celebrities;
    mapping (address => string) public beneficiaries;
    mapping (address => address) public celebrityBeneficiaryChoice;
    mapping (uint => Celebrity) public registeredCelebs;
    mapping (uint => Video) public orders;

    //array to store celebrity and beneficiary list
    address[] public celebrityList;
    address[] public beneficiaryList;

    //Function for beneficiary to register
    function addBeneficiary(address _address, string memory _name) public {
        beneficiaries[_address] = _name;
        beneficiaryList.push(_address);
    }

    //Function for celebrity register, and he is only able to select from registered beneficiary list above
    function addCelebrity(address _beneficiaryAddress, string memory _name ) public {

        celebrities[msg.sender] = _name;
        celebrityList.push(msg.sender);

        //add mapping of celebrity's choice of beneficiary
        celebrityBeneficiaryChoice[msg.sender] = _beneficiaryAddress;
    }

    //functions to delete celebrities/beneficiaries
    function deleteCelebrity(address _address) public onlyOwner{
        delete celebrities[_address];
        delete celebrityBeneficiaryChoice[_address];
    }

    function deleteBeneficiary(address _address) public onlyOwner {
        delete beneficiaries[_address];
    }

    function removeCeleb(uint _index) public onlyOwner {
        delete registeredCelebs[_index];
    }

    //2_Video variables:
    // enum for video status
    //struct for video properties
    //video array to store all video orders

    enum VideoStatus { New, Done }

    uint public videoCount = 0;
    uint public celebCount = 0;

    struct Video {
        uint videoId; //pointer
        address payable celebrity;
        address payable charity;
        address payable donor;
        string name_to;
        string name_from;
        string description;
        VideoStatus status;
        string video;
        uint donatedAmount;
    }


    //also needs to add charity?
    struct Celebrity {
        uint id;
        address payable celebrity;
        address payable charity;
        string description;
        string image;
        string name;
        string title;
    }

    Video[] public deployedVideos;
    Celebrity[] public registeredCelebrities;

    /*
    function registerCelebrity(address payable _charity, string memory _description, string memory _image) public payable {
        Celebrity memory newCeleb = Celebrity({
           id: celebCount,
           celebrity: msg.sender,
           charity: _charity,
           description: _description,
           image: _image
        });
        registeredCelebrities.push(newCeleb);
        celebCount += 1;
    }*/

    function registerCelebrity(address payable _charity, string memory _description, string memory _image, string memory _name, string memory _title) public payable {
        /*
        Celebrity memory newCeleb = Celebrity({
           id: celebCount,
           celebrity: msg.sender,
           charity: _charity,
           description: _description,
           image: _image
        });*/
        //registeredCelebrities.push(newCeleb);
        registeredCelebs[celebCount] = Celebrity(celebCount, msg.sender, _charity, _description, _image, _name, _title);
        celebCount += 1;
    }

    function getCelebs() public view returns (Celebrity[] memory) {
        return registeredCelebrities;
    }

    function getDeployedVideos() public view returns (Video[] memory) {
        return deployedVideos;
    }


    function orderVideo(
                    address _celebrity,
                    address _charity,
                    string memory _description,
                    string memory _nameTo,
                    string memory _nameFrom,
                    uint _amount
                    )
                    public payable {

        orders[videoCount] = Video(videoCount,
                                    payable(_celebrity),
                                    payable(_charity),
                                    payable(msg.sender),
                                    _nameTo,
                                    _nameFrom,
                                    _description,
                                    VideoStatus.New,
                                    "0",
                                    _amount
                                    );
        //deployedVideos.push(newVideo);
        videoCount += 1;
    }

    /**
     * Function for people to order a video
     * x the new value to store
     * stores the number in the state variable 'storedData'
    */
    /* function orderVideo(address payable _celebrity, string memory _description, uint _amount, string memory _nameTo, string memory _nameFrom) public payable {

        address payable videoBeneficiary = payable(celebrityBeneficiaryChoice[_celebrity]);

        Video memory newVideo = Video({ //memory because it's a new instance of Request
           id: videoCount,
           celebrity: _celebrity,
           donater: msg.sender,
           beneficiary: videoBeneficiary,
           description: _description,
           name_to: _nameTo,
           name_from: _nameFrom,
           status: VideoStatus.New,
           video: '0',
           donatedAmount: _amount
        });
        deployedVideos.push(newVideo);
        videoCount += 1;
    } */

    //Function to update video status and donate to beneficiary
    //front end to pass which video was selected.
    function sendOrder(uint _id, address payable _charity, string memory _hash) public payable {

       //convert msg.sender to address payable from mapping
        //address payable videoBeneficiary = payable(celebrityBeneficiaryChoice[msg.sender]);

       //update video struct
        deployedVideos[_id].video = _hash;
        deployedVideos[_id].status = VideoStatus.Done;

        uint donation = deployedVideos[_id].donatedAmount;

       //send donation to _beneficiary
        _charity.transfer(donation); //fix
    }

    //function to delete orders
    function deleteOrder(uint _id) public onlyOwner {
        delete deployedVideos[_id];
    }
}
