var vows = require('vows'),
    assert = require('assert'),
    CryptoURL = require('../src/cryptoURL');

vows.describe('The Thumbor Javascript Library').addBatch({
    "The Crypto object": {

        topic: new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),

        "Can encrypt an URL": function(topic) {
            var expectedURL = "/l42l54VqaV_J-EcB5quNMP6CnsN9BX7htrh-QbPuDv0C7adUXX7LTo6DHm_woJtZ/my.server.com/some/path/to/image.jpg";
                actualURL = topic.resize(300, 200).toString();
            assert.equal(actualURL, expectedURL);
        }
    },
    "The requestPath method": {

        topic: new CryptoURL('my-security-keym', 'my.server.com/some/path/to/image.jpg'),

        "I ask my library for an URL": function(topic) {
            var expected = "84996242f65a4d864aceb125e1c4c5ba",
                actual = topic.requestPath();

            assert.equal(actual, expected);
        }
    }
}).export(module);
