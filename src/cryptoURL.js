var md5 = require('../lib/md5'),
    aes = require('../lib/aes');

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
        var url = this.requestPath();
        url = this.rightPad(url, '{');
        return url + '/' + this.imageURL;
    },

    requestPath: function() {
        if (!this.imageURL) {
            throw 'The image url can\'t be null or empty.';
        }
        var parts = [];

        if (this.width !== undefined || this.height !== undefined) {
            parts.push((this.width === undefined ? '0' : this.width) + 'x' + (this.height === undefined ? '0' : this.height));
        }

        url = parts.join('/');
        url += this.md5(url).data;
        return url;
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
        var md = md5.create();
        md.update(imageURL);
        return md.digest();
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
