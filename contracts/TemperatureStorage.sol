// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract TemperatureStorage {
    struct Sample {
        string timestamp;
        string value;
    }

    Sample[] private s_sampleArray;

    function store(string memory _timestamp, string memory _value) public {
        s_sampleArray.push(Sample(_timestamp, _value));
    }

    function retrieve() public view returns(Sample [] memory){
        return s_sampleArray;
    }
}