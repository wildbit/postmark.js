"use strict";

var expect = require('expect.js');
var nconf = require('nconf');
var testingKeys = nconf.env().file({file: __dirname + '/../testing_keys.json'});

var postmark = require('../lib/postmark/index.js');

describe('Client', function () {
    // max test length in miliseconds
    this.timeout(30000);
    var client = null;
    var serverToken = testingKeys.get('SERVER_TOKEN');

    beforeEach(function () {
        client = postmark(serverToken);
    });

    describe('.options', function () {
        it('properly initialize options', function () {
            var client = postmark(serverToken, {
                testOption: 'asdf',
                ssl: false
            });

            expect(client).not.to.be(null);
            expect(client.options.apiKey).to.eql(serverToken);
            expect(client.options.testOption).to.eql('asdf');
            expect(client.options.ssl).to.eql(false);
        });

        it('.ssl', function () {
            expect(client.options.apiKey).to.eql(serverToken)
        });

        it('.apiKey', function () {
            expect(client.options.apiKey).to.eql(serverToken)
        });
    });
});

describe('Errors', function () {
    var serverToken = testingKeys.get('SERVER_TOKEN');

    it('get bounces with invalid parameters', function (done) {
        var client = postmark(serverToken)

        client.getBounces({count: "invalid count"}, function (error, result) {
            expect(result).to.be(undefined);
            expect(error.status).to.eql(422);
            expect(error.message).to.be('Parameter \'count\' should be integer value');

            // callback function done
            done();
        });
    });
});