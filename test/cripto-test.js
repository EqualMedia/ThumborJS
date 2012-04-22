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

        "Ask for resize with smart": function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'http://my.server.com/some/path/to/image.jpg'),
                expectedURL = '/LFS8rnXScOTlQvOJBE8i55p_LwzRr7aEgLYtDBpyAwUTwd2x1TsZr6yOHZpBF_YF/my.server.com/some/path/to/image.jpg';
                actualURL = cryptoURL.resize(300, 200).withSmartCropping().toString();
            assert.equal(actualURL, expectedURL);
        },

        "Ask for meta": function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'http://my.server.com/some/path/to/image.jpg'),
                expectedURL = '/Jj2Xp-__GWUzZ5zemvPGW2B3j5atA7X1ntF0irz-YGXUcE3-QpqkDbDnVUmBhHi-/my.server.com/some/path/to/image.jpg';
                actualURL = cryptoURL.metaDataOnly().toString();
            assert.equal(actualURL, expectedURL);
        },

        "Ask for smart": function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'http://my.server.com/some/path/to/image.jpg'),
                expectedURL = '/YV6ASUwnbI8XwBw6LpMdv1wy7xC-EHp44LIQqyPYPIqa-dX7JCv4LSeObHxPyY17/my.server.com/some/path/to/image.jpg';
                actualURL = cryptoURL.withSmartCropping().toString();
            assert.equal(actualURL, expectedURL);
        },

        "Ask for fitin": function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'http://my.server.com/some/path/to/image.jpg'),
                expectedURL = '/nZlz3CEKZFMVFcNo7KKFzFWKWb7W2fFEqo_LQ2omj13fQPzSSENNk7Iz8Pc4sFen/my.server.com/some/path/to/image.jpg';
                actualURL = cryptoURL.fitIn(0,0).toString();
            assert.equal(actualURL, expectedURL);
        },

        "Ask for flip": function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'http://my.server.com/some/path/to/image.jpg'),
                expectedURL = '/lMySk3L-Z2oa-RXQs4MgWWB3j5atA7X1ntF0irz-YGXUcE3-QpqkDbDnVUmBhHi-/my.server.com/some/path/to/image.jpg';
                actualURL = cryptoURL.flipHorizontally().toString();
            assert.equal(actualURL, expectedURL);
        },

        "Ask for flop": function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'http://my.server.com/some/path/to/image.jpg'),
                expectedURL = '/Yq1tjo95ZWIKrntANgW-UGB3j5atA7X1ntF0irz-YGXUcE3-QpqkDbDnVUmBhHi-/my.server.com/some/path/to/image.jpg';
                actualURL = cryptoURL.flipVertically().toString();
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

        'I ask for the flip and width of 200 and get "-200x0/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),
                expectedURL = '-200x0/84996242f65a4d864aceb125e1c4c5ba',
                actualURL = cryptoURL.resize(200, 0).flipHorizontally().requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for the flop and height of 200 and get "0x-200/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),
                expectedURL = '0x-200/84996242f65a4d864aceb125e1c4c5ba',
                actualURL = cryptoURL.resize(0, 200).flipVertically().requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for the "left" horizontal alignment option and get "left/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),
                expectedURL = 'left/84996242f65a4d864aceb125e1c4c5ba',
                actualURL = cryptoURL.halign('left').requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for the "center" horizontal alignment option and get "center/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),
                expectedURL = 'center/84996242f65a4d864aceb125e1c4c5ba',
                actualURL = cryptoURL.halign('center').requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for the "top" vertical alignment option and get "top/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),
                expectedURL = 'top/84996242f65a4d864aceb125e1c4c5ba',
                actualURL = cryptoURL.valign('top').requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for the "middle" vertical alignment option and get "middle/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),
                expectedURL = 'middle/84996242f65a4d864aceb125e1c4c5ba',
                actualURL = cryptoURL.valign('middle').requestPath();
            assert.equal(actualURL, expectedURL);
        },

        'I ask for the "left" horizontal alignment and "top" as vertical alignment option and get "left/top/84996242f65a4d864aceb125e1c4c5ba" as URL': function(topic) {
            var cryptoURL = new CryptoURL('my-security-key', 'my.server.com/some/path/to/image.jpg'),
                expectedURL = 'left/top/84996242f65a4d864aceb125e1c4c5ba',
                actualURL = cryptoURL.halign('left').valign('top').requestPath();
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
