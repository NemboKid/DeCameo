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

    //Logging events
    event UpdatedUser(uint id, address charity, string description, string title, string name, string image);
    event DeliverySent(uint id, address charity, uint amount, string video);

    constructor() public {
        owner = msg.sender;
    }

    //1_Registration by owner
    //Registration variables
    //NOTE: mapping cannot have address payable, has to be cast to payable when needed
    mapping (uint => Celebrity) public registeredCelebs;
    mapping (uint => Video) public orders;


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
        uint order_date;
        uint delivery_date;
        uint donatedAmount;
    }


    //also needs to add charity?
    struct Celebrity {
        uint id;
        //bool isRegistered;
        address payable celebrity;
        address payable charity;
        string description;
        string title;
        string name;
        string image;
        //bytes32[] manyKeys;
        //mapping(bytes32 => uint) manyKeyPointers;
    }


    function registerCelebrity(address payable _charity,
                                string memory _description,
                                string memory _title,
                                string memory _name,
                                string memory _image
                                )
                            public payable {
        registeredCelebs[celebCount] = Celebrity(celebCount, msg.sender, _charity, _description, _title, _name, _image);
        celebCount += 1;
    }


    /**
     * Function for people to order a video
     * x the new value to store
     * stores the number in the state variable 'storedData'
    */
    function orderVideo(
                        address payable _celebrity,
                        address payable _charity,
                        string memory _description,
                        string memory _nameTo,
                        string memory _nameFrom,
                        uint _amount
                        )
                        public payable {

        orders[videoCount] = Video(videoCount,
                                    _celebrity,
                                    _charity,
                                    payable(msg.sender),
                                    _nameTo,
                                    _nameFrom,
                                    _description,
                                    VideoStatus.New,
                                    "0",
                                    block.timestamp,
                                    0,
                                    _amount
                                    );
        //deployedVideos.push(newVideo);
        videoCount += 1;
    }


    //Function to update video status and donate to beneficiary
    //front end to pass which video was selected.
    function sendOrder(uint _id, string memory _hash) public payable returns (bool success) {
        //convert msg.sender to address payable from mapping
        //address payable videoBeneficiary = payable(celebrityBeneficiaryChoice[msg.sender]);
        require(orders[_id].status != VideoStatus.Done, "This order has already been delivered");
        require(msg.sender == orders[_id].celebrity, "Only the registered user can send order");

       //update video struct
        orders[_id].status = VideoStatus.Done;
        orders[_id].video = _hash;
        orders[_id].delivery_date = block.timestamp;

        uint donation = orders[_id].donatedAmount;
        address payable charity = orders[_id].charity;

       //send donation to _charity
        charity.transfer(donation); //fix
        emit DeliverySent(_id, orders[_id].charity, donation, _hash);
        return true;
    }

    //Function to update User
    function updateUser(uint _id,
                        address payable _charity,
                        string memory _description,
                        string memory _title,
                        string memory _name,
                        string memory _image
                        )
                    public returns (bool succeess) {

        require(msg.sender == registeredCelebs[_id].celebrity, "Only the registered address can make changes");

       //update Celebrity Struct
        registeredCelebs[_id].charity = _charity;
        registeredCelebs[_id].description = _description;
        registeredCelebs[_id].title = _title;
        registeredCelebs[_id].name = _name;
        registeredCelebs[_id].image = _image;

        emit UpdatedUser(_id, _charity, _description, _title, _name, _image);
        return true;
    }

    //function to delete orders
    function deleteOrder(uint _id) public payable returns (bool success) {
        require (orders[_id].donor == msg.sender ||
                owner == msg.sender ||
                orders[_id].celebrity == msg.sender
                , "Only the contract owner, the orderer and the registered profile and perform this action");

        orders[_id].donor.transfer(orders[_id].donatedAmount);
        delete orders[_id];
        return true;
    }

    //function to delete orders
    function deleteCelebrity(uint _id) public onlyOwner returns (bool success) {
        delete registeredCelebs[_id];
        return true;
    }
}
