var assert = require('chai').assert
//import assert from "chai";

var foo = 'bar';

var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

assert('foo' !== 'bar', "foo is not bar");
assert.typeOf(foo, 'string'); // without optional message
assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
assert.equal(foo, 'bar', 'foo equal `bar`');
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');

console.log("END");