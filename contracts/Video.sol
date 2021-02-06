pragma solidity ^0.5.0;


/**
TODO:
[] 1. Store and enable video upload (ipfs hash) - Struct
[] 2. Store user - Struct
[] 3. Store order - Individual Struct with
*/
contract Video {
    string public myString = "Hello World";
    address payable public owner; //make payable?
    mapping(uint => Video) public videos; //public accessible?
    uint public videoCount;
    string public videoName;
    bool public paused;
    bool private initialized;

    modifier onlyOwner() {
        require(msg.sender == owner, "onlyOwner");
        _;
    }

    event LogVideoUpload(
        uint id,
        string hash,
        string title,
        address author
    );

    //Events
    event LogPauseContract(bool contractIsPaused);

    //Contract Constructor
    // constructor() public {
    //     // initialize();
    //     // pause();
    // }

    enum VideoStatus { ordered, delivered, refunded } //0, 1, 2?

    /**
     @param id - works as both Order and Video ID - hence no need for an "Order Struct"
     @param videoHash - ipfs hash
     @param title - filenname
     @param userAddress - control that address is registered as user. They send in this from frontend
     @param buyerAddress - msg.sender
     @param charityAddress - charity address chosen by userAddress (mapping storage?). If empty, let it be userAddress?
     @param VideoStatus ordered, delivered or refunded. Until it's delivered, orderer can ask to refund and close order
    */
    struct Video {
        uint id;
        string videoHash;
        string title;
        address payable userAddress;
        address payable buyerAddress;
        address payable charityAddress;
        VideoStatus videoStatus;
    }

    /**
    - Total rank 1-5.
    - After each delivery, buyer can leave a vote. If below 3 after 5 deliveries, shut down.
    - Also give us permission to remove users
    - Can also leave a comment that shows up on profile page?
    - Allow users to upload picture (ipfs hash) + description of themselves + name
    */
    struct User {
        uint id;
        address payable userAddress;
        address payable buyerAddress;
        address payable charityAddress;
        VideoStatus videoStatus;
    }

    function initialize() public {
        require(!initialized, "already initialized");
        owner = msg.sender;
        videoCount = 0;
        videoName = "Video";
        initialized = true;
    }

    function pause() public onlyOwner {
        require(!paused, "already paused");
        paused = true;
        emit LogPauseContract(true);
    }

    function uploadVideo(string memory _videoHash, string memory _title) public {
        // Increment video id
        videoCount++;

        // Add video to the contract
        videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);
        // Trigger an event
        emit LogVideoUpload(videoCount, _videoHash, _title, msg.sender);
    }
}
