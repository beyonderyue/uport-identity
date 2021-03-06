const Owned = artifacts.require('Owned')

contract('Owned', (accounts) => {
  let owned

  before((done) => {
    Owned.new({from: accounts[0]}).then(instance => {
      owned = instance
      done();
    })
  })

  it('Is owned by creator', (done) => {
    owned.isOwner.call(accounts[0]).then((isOwner) => {
      assert.isTrue(isOwner, 'Owner should be owner')
      return owned.isOwner.call(accounts[1])
    }).then((isOwner) => {
      assert.isFalse(isOwner, 'Non-owner should not be owner')
      done()
    }).catch(done)
  })

  it('Non-owner can not change owner', (done) => {
    owned.transfer(accounts[1], {from: accounts[1]}).then(() => {
      return owned.isOwner.call(accounts[1])
    }).then((isOwner) => {
      assert.isFalse(isOwner, 'Owner should not be changed')
      done()
    }).catch(done)
  })

  it('Owner can change owner', (done) => {
    owned.transfer(accounts[1], {from: accounts[0]}).then(() => {
      return owned.isOwner.call(accounts[1])
    }).then((isOwner) => {
      assert.isTrue(isOwner, 'Owner should be changed')
      done()
    }).catch(done)
  })
})
