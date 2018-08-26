"use strict";

var chai  = require('chai');
var expect = chai.expect;
var nconf = require('nconf');
var testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

var postmark = require('../../dist/index.js');

describe('Client - Bounces', function() {
  this.timeout(30000);
  var client = null;
  var serverToken = testingKeys.get('SERVER_TOKEN');

  beforeEach(function() {
    client = new postmark.ServerClient(serverToken);
  });

  it('getBounce', function(done) {
    client.getBounces({
      count: 1
    }, function(err, bounces) {
      client.getBounce(bounces.Bounces[0].ID, done);
    });
  });

  it('getBounces', function(done) {
    client.getBounces({
      count: 10
    }, done);
  });

  it('getBounceBump', function(done) {
    client.getBounces({
      count: 1
    }, function(err, bounces) {
      client.getBounceDump(bounces.Bounces[0].ID, done);
    });
  });

  it('getBounceTags', function(done) {
    client.getBounceTags(done);
  });
});