{
    "name": "ThumborJS",
    "description": "An extension library to generate encrypted URLs for Thumbor using Node.js",
    "version": "0.1.0",
    "author": "Rafael Carício <rafael@caricio.com>",
    "contributors": [],
    "main": "./src",
    "dependencies": {
        "ezcrypto": "~0.0.3"
    },
    "devDependencies": {
        "vows": "~0.6.2"
    },
    "keywords": [
        "imaging service",
        "thumbor",
        "api",
        "client"
    ],
    "licenses": [{
        "type": "MIT License",
        "url": "http://www.opensource.org/licenses/mit-license.php"
    }],
    "repository" : {
        "type" : "git",
        "url" : "https://github.com/rafaelcaricio/ThumborJS"
    },
    "scripts": {
        "test": "make vows"
    },
    "engines": {
        "node": ">= 0.6.11"
    }
}
