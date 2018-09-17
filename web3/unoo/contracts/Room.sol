pragma solidity ^0.4.0;
import "./Table.sol";

contract Room {
    address[] public Tables;
    
    function Room() public payable {}
    
    function createTable(uint minimum) public payable {
        address createdTable = (new Table).value(msg.value)(minimum);
        Tables.push(createdTable);
    }
    
    function getCreatedTables() public view returns(address[]) {
        return Tables;
    }
}
