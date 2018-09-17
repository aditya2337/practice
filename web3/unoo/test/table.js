var Room = artifacts.require('./Room.sol');

contract('Room', accounts => {
  it("Initially shouldn't be any table", function() {
    return Room.deployed()
      .then(function(instance) {
        return instance.getCreatedTables.call();
      })
      .then(function(tables) {
        assert.equal(tables.length, 0, "10000 wasn't in the first account");
      });
  });
});
