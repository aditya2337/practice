pragma solidity ^0.4.0;
import "./Table.sol";

contract Room {
    address[] public Tables;
    function createTable(uint minimum) public payable returns(address[]) {
        address createdTable = (new Table).value(msg.value)(minimum);
        Tables.push(createdTable);
        return Tables;
    }
    
    function getCreatedTables() public view returns(address[]) {
        return Tables;
    }
}
