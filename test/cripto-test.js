var vows = require('vows'),
    assert = require('assert'),
    CryptoURL = require('../src/cryptoURL').CriptoURL;

vows.describe('The Thumbor Javascript Library').addBatch({
    "The Crypto object": {

        topic: new CryptoURL("MY_SECURE_KEY", "my.server.com/some/path/to/image.jpg"),

        "Can encrypt an URL": function(topic) {
            var expectedURL = "/l42l54VqaV_J-EcB5quNMP6CnsN9BX7htrh-QbPuDv0C7adUXX7LTo6DHm_woJtZ/my.server.com/some/path/to/image.jpg";
                actualURL = topic.resize(300, 200).toString();
            assert.equal(actualURL, expectedURL);
        }
    }
}).export(module);
