var CryptoLib = require('../lib/ezcrypto/index').Crypto;

var CryptoURL = module.exports = function(securityKey, imageURL) {
    this.key = this.inflateKey(securityKey);
    this.imageURL = imageURL;

    this.filters = {};
    this.width = 0;
    this.height = 0;
    this.smart = false;
    this.fitInFlag = false;
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

    unsafeURL: function() {
        var safeURL = this.urlParts();
        safeURL.push(this.imageURL);
        return '/unsafe/' + safeURL.join('/');
    },

    requestPath: function() {
        var parts = this.urlParts();
        parts.push(this.md5(this.imageURL));
        return parts.join('/');
    },

    urlParts: function() {
        if (!this.imageURL) {
            throw Error('The image url can\'t be null or empty.');
        }
        var parts = [];

        if (this.fitInFlag) {
            parts.push('fit-in');
        }

        if (this.width || this.height) {
            parts.push(this.width + 'x' + this.height);
        }

        if (this.smart) {
            parts.push('smart');
        }

        return parts;
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

    withSmartCropping: function() {
        this.smart = true;
        return this;
    },

    fitIn: function(width, height) {
        this.width = width;
        this.height = height;
        this.fitInFlag = true;
        return this;
    },

    toString: function() {
        return this.generate();
    }

};
