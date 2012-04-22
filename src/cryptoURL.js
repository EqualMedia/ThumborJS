

var CryptoURL = function(securityKey, imageURL) {
    this.key = this.inflateKey(securityKey);
    this.imageURL = imageURL;
    this.filters = {};
}

CryptoURL.prototype =  {
    inflateKey: function(securityKey) {
        while (securityKey.length() < 16) {
            securityKey += securityKey;
        }
        return securityKey.substring(0, 16);
    },
    resize: function(width, height) {
    }
};



if(typeof(module) !== 'undefined' && module.exports) {
    module.exports = {
        CryptoURL: CryptoURL
    };
}
