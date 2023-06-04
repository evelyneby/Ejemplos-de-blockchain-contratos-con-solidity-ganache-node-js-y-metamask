// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;

contract Crowfoundme {
    address payable public owner;
    address public contractAddress;
    uint public projectId;
    string public projectName;
    uint public fundingGoal;
    uint public amountRaised;
    uint public deadline;
    mapping(address => uint) public balanceOf;
    bool public fundingComplete;
    string public projectState;

    constructor(uint _projectId, string memory _projectName, uint _fundingGoal, uint _deadline) {
        owner = payable(msg.sender);
        projectId = _projectId;
        projectName = _projectName;
        fundingGoal = _fundingGoal;
        deadline = block.timestamp + _deadline;
        fundingComplete = false;
        projectState = "Active";
        contractAddress = address(this);
    }

    function fundProject(address _contributor) public payable {
        require(keccak256(abi.encodePacked(projectState)) == keccak256("Active"), "The project is not active.");
        require(block.timestamp < deadline, "The deadline for contributions has passed.");
        require(_contributor != owner, "The owner of the contract cannot contribute to their own project.");
        require(msg.value > 0, "Contribution amount must be greater than zero.");
        require(!fundingComplete, "The funding goal has already been reached.");
        balanceOf[_contributor] += msg.value;
        amountRaised += msg.value;
        if (amountRaised >= fundingGoal) {
            fundingComplete = true;
        }
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner of the contract can withdraw funds.");
        require(amountRaised >= fundingGoal, "Funding goal has not been reached yet.");
        owner.transfer(address(this).balance);
    }

    function modifyProjectData(string memory _newName, uint _newFundingGoal, uint _newDeadline) public {
        require(msg.sender == owner, "Only the owner of the contract can modify project data.");
        require(block.timestamp < deadline, "The deadline for contributions has passed.");
        projectName = _newName;
        fundingGoal = _newFundingGoal;
        deadline = block.timestamp + _newDeadline;
        fundingComplete = false;
    }

    function getAmountRaised() public view returns (uint) {
        return amountRaised;
    }

    function getContractAddress() public view returns (address) {
        return contractAddress;
    }

    function changeProjectState(string memory _newState) public {
        require(msg.sender == owner, "Only the owner of the contract can change project state.");
        projectState = _newState;
    }
}