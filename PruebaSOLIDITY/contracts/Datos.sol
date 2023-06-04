// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Datos{

    uint public idNumber;
    bool public isWorking;
    string public name;
    address public wallet;

    constructor (){
        wallet = msg.sender;
    }

    function set(uint _idNumber, bool _isWorking, string memory _name) public {
        idNumber=_idNumber;
        isWorking= _isWorking;
        name =_name;
    }


    function retNum() public view returns (uint){
        return idNumber;
    }
     function retWork() public view returns (bool){
        return isWorking;
    }
     function retName() public view returns (string memory){
        return name;
    }
    function retWallet() public view returns (address){
        return wallet;
    }



}
