
var expect = require('chai').expect;

describe('chai bdd api', function() {
    var foo = 'bar';
    var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

    it('quick list expect', function(done) {
        expect(foo).to.be.a('string');
        expect(foo).to.equal('bar');
        expect(foo).to.have.lengthOf(3);
        expect(beverages, "failed on beverages length").to.have.property('tea').with.lengthOf(3);

        done();
    });
});


var should = require('chai').should();

describe('chai bdd api should', function() {
    var foo = 'bar';
    var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

    it('quick list', function(done) {
        foo.should.be.a('string');
        foo.should.equal('bar');
        foo.should.have.lengthOf(3);
        beverages.should.have.property('tea').with.lengthOf(3);

        done();
    });
});

var chai = require("chai")
    , expect = chai.expect
    , should = chai.should();

db.get(1234, function (err, doc) {
  should.not.exist(err);
  should.exist(doc);
  doc.should.be.an('object');
});

