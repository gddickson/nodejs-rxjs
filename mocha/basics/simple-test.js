
var sleep = require('sleep');
//import * as sleep from "sleep";
var assert = require('assert');
//import * as assert from "assert";
var fs = require("fs");
//import * as fs from "fs";

describe('Array', function() {
  describe('#indexOf()', function() {
    it('sync test - should return -1 when the value is not present', function() {
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });
    it('async test - should return -1 when the value is not present', function(done){
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
      done();
    });
  });
});

describe('double done()', function() {
    it.skip('done() should only be called once', function(done) {
      setImmediate(done);
      setImmediate(done);
    });

    it('done() is only called once', function(done) {
      setImmediate(done);
    });
});

class User{
  constructor(str){}

  save(data, fx){
    fs.writeFile('testfile.txt', data, fx);
  }

  save_with_promise(data){
    const pp = new Promise(resolve => {
      fs.writeFile('testfile.txt', data, (err) => {
        if(err) 
          resolve(err)
        else
          resolve("file saved");
      });
    });

    return pp
  }
}

describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      
      this.retries(3);

      const data = new Uint8Array(Buffer.from('Hello Node.js'));
      var user = new User('Luna');
      user.save(data, function(err) {
        if (err) done(err);
        else{
          assert.fail("Forced failure");
          done();
        }
      });
    });
  });

  describe('#save(done)', function() {
    it('should save without error', function(done) {
      const data = new Uint8Array(Buffer.from('Hello Node.js'));
      var user = new User('Luna');
      user.save(data, done);
    });
  });

  async function async_save()
  {
    const data = new Uint8Array(Buffer.from('Hello Node.js'));
    var user = new User('Luna');
    const result = await user.save_with_promise(data);
    return result;
  }

  describe('use async await #save() using async function', function() {
    it('should save without error', function(done) {
      const result = async_save();
      result.then(data => {
        assert.strictEqual(data, "file saved");
      }).then(done, done);
    });
  });

  describe('use async await #save()', function() {
    it('with the await nested', async function() {
      const data = new Uint8Array(Buffer.from('Hello Node.js'));
      var user = new User('Luna');
      const result = await user.save_with_promise(data);
        assert.strictEqual(result, "file saved");
    });
  });

  describe('mocha hooks', function() {
    before(function(done) {
      // runs once before the first test in this block
    });
  
    after(function(done) {
      // runs once after the last test in this block
    });
  
    beforeEach(function(done) {
      // runs before each test in this block
      db.clear(function(err) {
        if (err) return done(err);
      });
    });
  
    afterEach("cleanup the Arranges", function(done) {
      // runs after each test in this block
    });
  
    // put the test cases here
  });

  describe('find highest number in array', function() {
    describe('looking at the boundary conditions', function() {
      // pending test below
      it('no values passed in, should throw an exception');
    });
  });

  describe('Test timings', function() {
    describe('Running a slow test', function() {
      // pending test below
    it('This is slow');
      //sleep.sleep(60);
      const expetected = 1;
 
      assert.strictEqual(expetected, 1);
    });
  });

});
