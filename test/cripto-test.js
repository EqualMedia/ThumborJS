var vows = require('vows'),
    assert = require('assert'),
    CryptoURL = require('../src/cryptoURL');

vows.describe('The Thumbor Javascript Library').addBatch({
    "The Crypto object": {

        topic: new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),

        "Can encrypt an URL": function(topic) {
            var expectedURL = '/l42l54VqaV_J-EcB5quNMP6CnsN9BX7htrh-QbPuDv0C7adUXX7LTo6DHm_woJtZ/my.server.com/some/path/to/image.jpg';
                actualURL = topic.resize(300, 200).toString();
            assert.equal(actualURL, expectedURL);
        },

        'Can ask an unsafe URL': function(topic) {
            var expectedURL = '/unsafe/300x200/my.server.com/some/path/to/image.jpg';
                actualURL = topic.resize(300, 200).unsafeURL();
            assert.equal(actualURL, expectedURL);

        }
    },
    'The requestPath method': {

        topic: new CryptoURL('my-security-keym', 'my.server.com/some/path/to/image.jpg'),

        'I ask my library for an URL': function(topic) {
            var expected = '84996242f65a4d864aceb125e1c4c5ba',
                actual = topic.requestPath();
            assert.equal(actual, expected);
        },

        'I ask with an image URL of null and get an exception that says image URL is mandatory': function(topic) {
            var cryptoURL = new CryptoURL('my-security-keym', null);
            assert.throws(cryptoURL.requestPath, Error);
        },

        'I ask with an image URL of "" and get an exception that says image URL is mandatory': function(topic) {
            var cryptoURL = new CryptoURL('my-security-keym', '');
            assert.throws(cryptoURL.requestPath, Error);
        },

        'I ask for a width of 300 and get "300x0/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var expectedURL = '300x0/84996242f65a4d864aceb125e1c4c5ba';
                actualURL = topic.resize(300, 0).requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for a height of 300 and get "0x300/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var expectedURL = '0x300/84996242f65a4d864aceb125e1c4c5ba';
                actualURL = topic.resize(0, 300).requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for a width of 200 and height of 300 and get "300x200/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var expectedURL = '200x300/84996242f65a4d864aceb125e1c4c5ba';
                actualURL = topic.resize(200, 300).requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for a width of 200 and height of 300 and smart flag and get "200x300/smart/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var expectedURL = '200x300/smart/84996242f65a4d864aceb125e1c4c5ba';
                actualURL = topic.resize(200, 300).withSmartCropping().requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for a width of 200 and height of 300 and the fit-in flag and get "fit-in/200x300/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),
                expectedURL = 'fit-in/200x300/84996242f65a4d864aceb125e1c4c5ba',
                actualURL = cryptoURL.fitIn(200, 300).requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for the flip flag and get "-0x0/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),
                expectedURL = '-0x0/84996242f65a4d864aceb125e1c4c5ba',
                actualURL = cryptoURL.flipHorizontally().requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for the flop flag and get "0x-0/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),
                expectedURL = '0x-0/84996242f65a4d864aceb125e1c4c5ba',
                actualURL = cryptoURL.flipVertically().requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for the flip and flop flag and get "-0x-0/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),
                expectedURL = '-0x-0/84996242f65a4d864aceb125e1c4c5ba',
                actualURL = cryptoURL.flipHorizontally().flipVertically().requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for the flip and width of 200 and get "-0x-0/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),
                expectedURL = '-200x0/84996242f65a4d864aceb125e1c4c5ba',
                actualURL = cryptoURL.resize(200, 0).flipHorizontally().requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for the flop and height of 200 and get "-0x-0/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),
                expectedURL = '0x-200/84996242f65a4d864aceb125e1c4c5ba',
                actualURL = cryptoURL.resize(0, 200).flipVertically().requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for the "meta" flag and get "meta/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),
                expectedURL = 'meta/84996242f65a4d864aceb125e1c4c5ba',
                actualURL = cryptoURL.metaDataOnly().requestPath();
            assert.equal(actualURL, expectedURL);
        }

    }
}).export(module);
