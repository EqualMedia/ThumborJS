var CryptoLib = require('../lib/ezcrypto/index').Crypto;

var CryptoURL = module.exports = function(securityKey, imageURL) {
    this.key = this.inflateKey(securityKey);
    this.imageURL = imageURL;
    this.filters = {};
}

CryptoURL.prototype =  {

    inflateKey: function(securityKey) {
        while (securityKey.length < 16) {
            securityKey += securityKey;
        }
        return securityKey.substring(0, 16);
    },

    generate: function() {
        var url = this.requestPath(),
            encryptedURL;

        url = this.rightPad(url, '{');

        encryptedURL = CryptoLib.AES.encrypt(url, CryptoLib.charenc.UTF8.stringToBytes(this.key), {mode: new CryptoLib.mode.ECB(CryptoLib.pad.NoPadding) });

        return '/' + encryptedURL.replace(/\+/g, '-').replace(/\//g, '_') + '/' + this.imageURL;
    },

    requestPath: function() {
        if (!this.imageURL) {
            throw 'The image url can\'t be null or empty.';
        }
        var parts = [];

        if (this.width || this.height) {
            parts.push((this.width === undefined ? '0' : this.width) + 'x' + (this.height === undefined ? '0' : this.height));
        }

        parts.push(this.md5(this.imageURL));

        return parts.join('/');
    },

    rightPad: function(url, padChar) {
        var numberOfChars = 16 - url.length % 16;

        if (!numberOfChars) {
            return url;
        }

        for (var i=0; i < numberOfChars; i++) {
            url += padChar;
        }

        return url;
    },

    md5: function(imageURL) {
        return CryptoLib.MD5(imageURL);
    },

    resize: function(width, height) {
        this.width = width;
        this.height = height;
        return this;
    },

    toString: function() {
        return this.generate();
    }

};
